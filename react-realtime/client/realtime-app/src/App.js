import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import {posts} from "./data"
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://192.168.31.94:8000"));
  }, [])

  useEffect(() => {
    if (socket && user){
      socket.emit("newUser", user);
    }
  }, [socket, user])

  console.log(user);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket = {socket}/>
          {posts.map((post) => (
                      <Card key={post.id} post = {post} user = {user} socket={socket}/>
          ))}

          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
