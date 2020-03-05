const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const router = require("./router.js");
const app = express();
const server = http.createServer(app);

app.use(router);

const io = socketIo(server);

io.on("connection", socket => {
  console.log("we have a new connection");

  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
