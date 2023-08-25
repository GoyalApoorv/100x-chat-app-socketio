const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the 'path' module

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the route to serve the index.html file


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chat message', (msg) => {
    console.log("mssnccn", msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
