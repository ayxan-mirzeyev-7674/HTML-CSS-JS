import { useNavigate, useLocation } from "react-router-dom";
import { SocketContext } from "../context";
import { useContext, useEffect, useState } from "react";
import images from "../../Iconpack";
import styles from "./Game.module.css";
import Profile from "./images/pp.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const MembersSidebar = ({ members }) => {
  let tenmembers = [];
  for (let i = 0; i < 10; i++) {
    if (i < members.length) {
      tenmembers.push(members[i]);
    } else {
      tenmembers.push({ username: "Empty", avatar: Profile });
    }
  }
  return (
    <div className={styles.membersContainer}>
      {tenmembers.map((member, i) => (
        <div key={i} className={styles.main}>
          <div className={styles.innerDiv}>
            <div className={styles.avatarDiv}>
              <img
                alt="Avatar"
                className={
                  member.username === "Empty"
                    ? styles.emptyAvatar
                    : styles.avatar
                }
                src={
                  member.username === "Empty"
                    ? member.avatar
                    : images[member.avatar]
                }
              ></img>
            </div>
            <div className={styles.textDiv}>
              <p>{member.username}</p>
              {member.host && (
                <div className={styles.hostDiv}>
                  <FontAwesomeIcon
                    className={styles.crownIcon}
                    icon={faCrown}
                  />
                  Host
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function Game() {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let found = false;
    if (members?.length > 0) {
      members.forEach((member) => {
        if (member.socketId === socket.id) {
          found = true;
        }
      });
      if (!found) {
        navigate("/start");
      }
    }
  }, [members, navigate, socket]);

  useEffect(() => {
    location &&
      socket.emit("getMembers", location.state.roomId, (response) => {
        if (!(response.members?.length > 0)) {
          navigate("/start");
        }
        setMembers(response.members);
        console.log(response.members);
        console.log("Socket id: " + socket.id);
      });
  }, [location]);

  useEffect(() => {
    socket.on("newMemberJoined", (members) => {
      setMembers(members);
      location.state.members = members;
      console.log(members);
    });
  }, [socket]);

  return (
    <>
      Room id: {location.state.roomId}{" "}
      {members?.length > 0 && <MembersSidebar members={members} />}{" "}
    </>
  );
}

export default Game;
