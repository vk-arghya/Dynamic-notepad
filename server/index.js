const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Serve the index.html.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('text-change', (data) => {
    socket.broadcast.emit('text-update', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});