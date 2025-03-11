

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Broadcast play event with timestamp
  socket.on('playSong', ({ url }) => {
    const startTime = Date.now() + 2000; // Schedule playback 2 seconds later
    io.emit('playSong', { url, startTime });
  });

  // Sync playback across devices
  socket.on('sync', (data) => {
    io.emit('sync', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



app.get('/', (req, res) => {
  res.send("<h1>Welcome to SONG</h1>");
});
const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${PORT}`);
});