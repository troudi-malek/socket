const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoconnection = require("./config/mongoconnection.json");

mongoose.connect(mongoconnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.get("/", (req, res) => {
  res.render("chat");
});

io.on('connection', (socket) => {
  console.log('User Connected..');

  socket.emit("msg", "Please enter your name");

  socket.on('set username', (username) => {
    socket.username = username;
    io.emit('msg', `${username} has joined the chat`);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit("msg", `${socket.username} has left the chat`);
    }
  });

  socket.on('chat message', (data) => {
    if (socket.username) {
      io.emit('chat message', { username: socket.username, message: data });
    }
  });
  socket.on('typing', (data) => {
    io.emit('user typing', { username: data.username });
  });
  
  socket.on('end typing', (data) => {
    io.emit('user typing', { username: '' });
  });
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
