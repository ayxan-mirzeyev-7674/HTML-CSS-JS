import "./Navbar.css";
import Notifications from "../../images/notifications.svg";
import Message from "../../images/message.svg";
import Settings from "../../images/settings.svg";
import { useEffect, useState } from "react";

function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else if (type === 3) {
      action = "shared";
    }
    return (
      <span className="notification">
        {senderName} {action} your post
      </span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  console.log(notifications);
  return (
    <div className="navbar">
      <span className="logo">Realtime-App</span>
      <div className="icons">
        <div
          className="icon"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img src={Notifications} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon">
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button onClick={handleRead} className="nButton">
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
