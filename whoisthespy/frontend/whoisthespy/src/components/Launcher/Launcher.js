import styles from "./Launcher.module.css";
import Background from "./images/background.webp";
import EditIcon from "./images/edit.svg";
import Form from "react-bootstrap/Form";
import images from "../../Iconpack";
import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context";

function JoinRoomModal(props) {
  const [roomId, setRoomId] = useState(null);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-320w"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Join a room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Room ID:</Form.Label>
          <Form.Control
            onInput={(e) => {
              setRoomId(e.target.value);
            }}
            type="text"
            placeholder=""
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className={styles.createButton}
          onClick={() => {
            props.onConfirm(roomId);
          }}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function ChangeProfileModal(props) {
  const [selectedImage, setSelectedImage] = useState(props.selectedone);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-320w"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Set Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.hiddenradio}>
          {images.map((image, i) => (
            <div key={i} className={styles.eachAvatarDiv}>
              <label>
                <input
                  onChange={() => {
                    setSelectedImage(i);
                  }}
                  type="radio"
                  name="test"
                  value="small"
                  checked={i === selectedImage}
                />
                <img alt="Avatar" className={styles.editAvatar} src={image} />
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className={styles.createButton}
          onClick={() => {
            props.onHide(selectedImage);
          }}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function Launcher() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [username, setUsername] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [joinModalShow, setJoinModalShow] = useState(false);

  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("removeFromRooms");
  }, [socket]);

  const connectToRoom = (roomId) => {
    navigate("/game", {
      replace: false,
      state: { roomId, username, avatar: selectedImage },
    });
  };

  const createRoom = () => {
    if (username !== "" && username) {
      const user = { username: username, avatar: selectedImage };
      socket.emit("createRoom", user);
      socket.on("roomCreated", (roomId) => {
        console.log(roomId);
        connectToRoom(roomId);
      });
    }
  };

  const joinRoom = (joinRoomId) => {
    if (username !== "" && username && joinRoomId !== "" && joinRoomId) {
      console.log(joinRoomId);
      const user = { username: username, avatar: selectedImage };
      socket.emit("joinRoom", user, joinRoomId, (response) => {
        console.log(response);
        if (response.found) {
          connectToRoom(joinRoomId);
        } else {
          console.log("Room not found.");
        } // ok
      });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className={styles.body}
    >
      <div className={styles.main}>
        <div className={styles.changeImageDiv}>
          <div className={styles.innerDiv}>
            <img
              alt="Avatar"
              className={styles.pp}
              src={images[selectedImage]}
            ></img>
            <button
              onClick={() => {
                setModalShow(true);
              }}
              className={styles.editDiv}
            >
              <img alt="Edit" className={styles.edit} src={EditIcon}></img>
            </button>
          </div>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder=""
          />
        </Form.Group>
        <button onClick={createRoom} className={styles.createButton}>
          Create a Room
        </button>
        <button
          onClick={() => {
            setJoinModalShow(true);
          }}
          className={styles.joinButton}
        >
          Join a room
        </button>
      </div>
      <ChangeProfileModal
        show={modalShow}
        onHide={(index) => {
          setModalShow(false);
          index && setSelectedImage(index);
          console.log(selectedImage);
        }}
        selectedone={selectedImage}
      />
      <JoinRoomModal
        show={joinModalShow}
        onHide={() => {
          setJoinModalShow(false);
        }}
        onConfirm={(joinRoomId) => joinRoom(joinRoomId)}
      />
    </div>
  );
}

export default Launcher;
