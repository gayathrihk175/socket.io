const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
// Since we are using socket.io we can't directly use app.listen. We need to attach http module.
const server = http.createServer(app);
const io = new Server(server); //io - stands for input/output

// Socket.io
io.on("connection", (socket) => {
  // console.log("A new connection has been established", socket.id);
  socket.on("user-message", (message) => {
    // console.log("New message", message);
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});
server.listen(9000, () => {
  console.log(`Server is running on PORT 9000`);
});
