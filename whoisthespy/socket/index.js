import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://192.168.31.94:3000",
  },
});

function generateRoomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomId = "";
  for (let i = 0; i < length; i++) {
    roomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomId;
}

let rooms = [];

const createNewRoom = (socketId, user) => {
  const roomId = generateRoomId(6);
  rooms.push({
    roomId,
    users: [
      {
        socketId: socketId,
        username: user.username,
        avatar: user.avatar,
        host: true,
      },
    ],
  });
  return roomId;
};

const joinRoom = (socketId, user, roomId) => {
  let found = false;
  for (const room of rooms) {
    if (room.roomId === roomId) {
      room.users.push({
        socketId: socketId,
        username: user.username,
        avatar: user.avatar,
        host: false,
      });
      found = true;
      break;
    }
  }
  return found;
};

const findRoom = (roomId) => {
  for (const room of rooms) {
    if (room.roomId === roomId) {
      return room;
    }
  }
  return null;
};

const removeFromRooms = (socket) => {
  let emptyRooms = [];
  for (let i = 0; i < rooms.length; i++) {
    for (let b = 0; b < rooms[i].users.length; b++) {
      let user = rooms[i].users[b];
      if (user.socketId === socket.id) {
        rooms[i].users.splice(b, 1);
        if (rooms[i].users.length >= 1) {
          rooms[i].users[0].host = true;
        }
        rooms[i].users.forEach((member) =>
          io.to(member.socketId).emit("newMemberJoined", rooms[i].users)
        );
        if (rooms[i].users.length === 0) {
          emptyRooms.push(i);
        }
      }
    }
  }
  for (const index of emptyRooms) {
    rooms.splice(index, 1);
  }
};

// const addNewUser = (userId, socketId) => {
//   !onlineUsers.some((user) => user.userId === userId) &&
//     onlineUsers.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUsers.find((user) => user.userId === userId);
// };

io.on("connection", (socket) => {
  socket.on("createRoom", (user) => {
    const roomId = createNewRoom(socket.id, user);
    io.to(socket.id).emit("roomCreated", roomId);
    console.log(rooms);
  });

  socket.on("joinRoom", (user, roomId, callback) => {
    let found = joinRoom(socket.id, user, roomId);
    const members = findRoom(roomId)?.users;
    callback({
      found,
    });
    members?.forEach((member) => {
      io.to(member.socketId).emit("newMemberJoined", members);
    });
    console.log(rooms);
  });

  socket.on("getMembers", (roomId, callback) => {
    const members = findRoom(roomId)?.users;
    callback({
      members,
    });
    console.log(rooms);
  });

  // socket.on("logOut", (userId) => {
  //   const reciever = getUser(userId);
  //   removeUser(reciever.socketId);
  //   console.log(reciever, onlineUsers);
  //   for (const user of onlineUsers) {
  //     io.to(user.socketId).emit("newUser", onlineUsers);
  //   }
  // });

  socket.on("removeFromRooms", () => {
    removeFromRooms(socket);
  });

  socket.on("disconnect", () => {
    removeFromRooms(socket);
  });
});

io.listen(8000);
