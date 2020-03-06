const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const router = require("./router.js");
const app = express();
const server = http.createServer(app);
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(router);

const io = socketIo(server);

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("play", () => {
    socket.broadcast.emit('play');
  })

  socket.on("pause", () => {
    socket.broadcast.emit('pause');
  })

  socket.on("changeVideo", ({video}) => {
    socket.broadcast.emit('changeVideo', {video});
  })

  socket.on("seek", ({time}) => {
    socket.broadcast.emit("seek", {time})
  })

  //   callback();
  // })

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`
      });
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
