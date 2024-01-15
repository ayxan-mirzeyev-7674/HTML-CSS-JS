import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://192.168.31.94:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    console.log(onlineUsers);
  });

  socket.on("sendNotification", ({senderName, recieverName, type}) => {
    const reciever = getUser(recieverName)
    io.to(reciever.socketId).emit("getNotification",{senderName, type})
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(onlineUsers);
  });
});

io.listen(8000);
