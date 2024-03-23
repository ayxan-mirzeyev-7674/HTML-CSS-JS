import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import UserChat from "../User-Chat/UserChat";
import AddIcon from "./images/add.svg";
import ProfilePicture from "./images/pp.svg";
import EditIcon from "./images/edit.svg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ChatScreen from "../Chat-Screen/ChatScreen";
import { io } from "socket.io-client";
import useSound from "use-sound";
import blast from "./sound.wav";
import sound2 from "./sound2.mp3";
import axios from "axios";

function Main() {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState({ id: "", username: "" });
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPP, setShowPP] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ppMessage, setPPMessage] = useState("");

  const IP = "http://192.168.31.94:4000";
  const socketIP = "http://192.168.31.94:8000";

  const USERS_API_URL = IP + "/get_users";
  const CREATE_CHAT_API_URL = IP + "/create_chat";
  const GET_CHATS_API_URL = IP + "/get_chats?user_id=";
  const GET_MESSAGES_API_URL = IP + "/get_messages?chat_id=";
  const SEND_MESSAGE_API_URL = IP + "/send-message";
  const PP_API_URL = IP + "/upload";
  const PP_GET_API_URL = IP + "/get_image/";

  const [playSound] = useSound(sound2);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setLoggedUser(JSON.parse(user));
      setSocket(io(socketIP));
    } else {
      window.location.replace("/login");
    }
  }, []);

  useEffect(() => {
    fetch(USERS_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (loggedUser.id !== "" && users.length > 0) {
      refreshChats();
      socket.emit("newUser", loggedUser.id);
    }
  }, [loggedUser, users]);

  const getMessages = (chat_id) => {
    fetch(GET_MESSAGES_API_URL + chat_id.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const createChat = (secondId, e) => {
    e.preventDefault();
    const data = { user1_id: loggedUser.id, user2_id: secondId };
    console.log(data);
    fetch(CREATE_CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setShowModal(false);
        refreshChats();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const refreshChats = () => {
    fetch(GET_CHATS_API_URL + loggedUser.id.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let rawChats = data.map((chat) => ({
          ...chat,
          userId:
            users.find(
              (user) =>
                user.id !== loggedUser.id &&
                [chat.user1_id, chat.user2_id].includes(user.id)
            )?.id || null,
        }));
        rawChats = rawChats.sort(
          (a, b) => new Date(b.change_date) - new Date(a.change_date)
        );
        setChats(rawChats);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    users &&
      socket?.on("newMessage", (chatId) => {
        if (selectedChat) {
          if (selectedChat.id === chatId) {
            getMessages(chatId);
            console.log(chatId);
          }
        }
        refreshChats();
        setRefresh((prev) => prev + 1);
        playSound();
      });
    users &&
      socket?.on("newUser", (onlineUsers) => {
        console.log(onlineUsers);
        setOnlineUsers(onlineUsers);
      });
    return () => {
      socket?.off("newMessage");
      socket?.off("newUser");
    };
  }, [socket, selectedChat, chats]);

  useEffect(() => {
    console.log(refresh);
  }, [refresh]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const logOut = () => {
    localStorage.clear();
    socket.emit("logOut", loggedUser.id);
    navigate("/login");
  };

  const selectChat = (chatId) => {
    setSelectedChat(null);
    setTimeout(() => {
      setSelectedChat(chats.find((chat) => chat.id === chatId));
    }, 10);
    getMessages(chatId);
  };

  useEffect(() => {
    messages.length > 0 && console.log(messages);
  }, [messages]);

  const sendMessage = (message) => {
    const data = {
      chatId: selectedChat.id,
      senderId: loggedUser.id,
      content: message,
    };
    console.log(data);
    fetch(SEND_MESSAGE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        getMessages(selectedChat.id);
        socket.emit("sendMessage", {
          userId: selectedChat.userId,
          chatId: selectedChat.id,
        });
        refreshChats();
        console.log(selectedChat);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (selectedFile === null) {
      setPPMessage("Please select a photo firstly.");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("userId", loggedUser.id);
      console.log(selectedFile);

      // Make a POST request to your Flask backend to handle the file upload
      await axios.post(PP_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // You can handle success or navigate to another page after successful upload
      console.log("File uploaded successfully");
      setPPMessage("Profile photo updated successfully. Please refresh page.");
    } catch (error) {
      // Handle error
      console.error("Error uploading file", error);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.users}>
          <div className={styles.currentUserDiv}>
            <div className={styles.currentUserImageDiv}>
              <img src={EditIcon} className={styles.edit} />
              <img
                onClick={() => {
                  setShowPP(!showPP);
                }}
                alt=""
                className={styles.userImage}
                src={PP_GET_API_URL + loggedUser.id}
                onLoadStart={(e) => {
                  e.target.src = ProfilePicture;
                }}
                onError={(e) => {
                  e.target.src = ProfilePicture;
                  e.target.style.width = "40px";
                  e.target.style.height = "40px";
                }}
              />
              {showPP && (
                <div className={styles.setPP}>
                  <Form.Control type="file" onChange={handleFileChange} />
                  <Button variant="light" onClick={uploadFile}>
                    Submit
                  </Button>
                  <div style={{ color: "white" }}>{ppMessage}</div>
                </div>
              )}
            </div>
            <div className={styles.userTextDiv}>
              <p className={styles.userText}>{loggedUser.username}</p>
              <button onClick={logOut} className={styles.logOutButton}>
                Log out
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className={styles.addDiv}
          >
            <div className={styles.imageDiv}>
              <img alt="" className={styles.image} src={AddIcon} />
            </div>
            <div className={styles.textDiv}>
              <p className={styles.text}>Create a new chat.</p>
            </div>
          </button>
          {showModal && (
            <div className={styles.addList}>
              {users
                .filter((user) => user.username !== loggedUser.username)
                .map((user) => (
                  <div key={user.id} className={styles.addListItem}>
                    <div className={styles.addListItemImageDiv}>
                      <img
                        alt=""
                        className={styles.addListItemImage}
                        src={PP_GET_API_URL + user.id}
                        onLoadStart={(e) => {
                          e.target.src = ProfilePicture;
                        }}
                        onError={(e) => {
                          e.target.src = ProfilePicture;
                          e.target.style.width = "49px";
                          e.target.style.height = "49px";
                        }}
                      />
                    </div>
                    <div
                      style={{ marginLeft: "5px" }}
                      className={styles.addListItemText}
                    >
                      {user.username}
                    </div>
                    <Button
                      onClick={(e) => {
                        createChat(user.id, e);
                      }}
                      style={{ marginLeft: "auto" }}
                      variant="light"
                    >
                      Create
                    </Button>
                  </div>
                ))}
            </div>
          )}
          {chats.length > 0 &&
            chats.map((chat) => (
              <UserChat
                key={chat.id}
                data={{
                  chatId: chat.id,
                  username:
                    users.find((user) => user.id === chat.userId)?.username ||
                    null,
                  lastMessage: chat.last_message,
                  onClick: () => selectChat(chat.id),
                  selectedChat: selectedChat ? selectedChat.id : null,
                  userId: chat.userId,
                }}
              />
            ))}
        </div>
        <div className={styles.chat}>
          {selectedChat && (
            <ChatScreen
              data={{
                user: users.find(
                  (user) =>
                    user.id ===
                    chats.find((chat) => chat.id === selectedChat.id).userId
                ),
                online: onlineUsers.some(
                  (user) => user.userId === selectedChat.userId
                ),
                messages: messages,
                onSend: sendMessage,
                PP: PP_GET_API_URL + selectedChat.userId,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
