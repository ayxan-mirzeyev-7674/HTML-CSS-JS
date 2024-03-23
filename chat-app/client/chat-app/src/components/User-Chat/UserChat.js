import styles from "./UserChat.module.css";
import ProfilePicture from "./images/pp.svg";

function UserChat({ data }) {
  const IP = "http://192.168.31.94:4000";
  const PP_GET_API_URL = IP + "/get_image/";

  return (
    <button
      onClick={data.onClick}
      className={
        data.selectedChat === data.chatId ? styles.selectedChat : styles.main
      }
    >
      <div className={styles.imageDiv}>
        <img
          alt=""
          src={PP_GET_API_URL + data.userId}
          onLoadStart={(e) => {
            e.target.src = ProfilePicture;
          }}
          onError={(e) => {
            e.target.src = ProfilePicture;
            e.target.style.width = "60px";
            e.target.style.height = "60px";
          }}
          className={styles.image}
        />
      </div>
      <div className={styles.textDiv}>
        <p className={styles.username}>{data.username}</p>
        <p className={styles.lastMessage}>{data.lastMessage}</p>
      </div>
    </button>
  );
}

export default UserChat;
