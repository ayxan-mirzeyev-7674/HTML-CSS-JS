import "./Card.css";
import Heart from "../../images/heart.svg";
import HeartFilled from "../../images/heartfilled.svg";
import Comment from "../../images/comment.svg";
import Share from "../../images/share.svg";
import Info from "../../images/info.svg";
import {useState} from "react"


function Card({ post, socket, user }) {
    const [liked, setLiked] = useState(false)

    const handleNotification = (type) => {
      if (!(type === 1 && liked === true)){
        socket.emit("sendNotification", {
          senderName: user,
          recieverName: post.username,
          type: type
        })
      }
    }

  return (
    <div className="card">
      <div>
        <div className="info">
            <img src={post.userImg} alt="" className="userImg"/>
            <span>{post.fullname}</span>
        </div>
        <img alt="" className="postImg" src={post.postImg}/>
        <div className="interaction">
            <img onClick={() => {setLiked(!liked);handleNotification(1);}} src={!liked ? Heart : HeartFilled} alt="" className="cardIcon" />
            <img onClick={() => handleNotification(2)} src={Comment} alt="" className="cardIcon" />
            <img onClick={() => handleNotification(3)} src={Share} alt="" className="cardIcon" />
            <img src={Info} alt="" className="cardIcon infoIcon" />
        </div>
      </div>
    </div>
  );
}

export default Card;
