

// const express = require('express');
// const { Server } = require('socket.io');
// const http = require('http');
// const cors = require('cors'); // Import CORS

// const app = express();
// app.use(cors()); // Enable CORS for all routes

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', 
//     methods: ['GET', 'POST'], ]
//   },
// });

// io.on('connection', (socket) => {
//   console.log('User connected');

//   socket.on('play', (playMsg) => {
//     console.log('Play message received:', playMsg);
//     io.emit('play', playMsg); 
//   });
// });

// server.listen(3001, () => {
//   console.log('Backend server is running on port 3001');
// });


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    //origin: '*',  // Allow all origins
    methods: ['GET', 'POST'], 
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('playSong', (data) => {
    console.log('Play song received:', data); 
    io.emit('playSong', data); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// server.listen(3001, () => {
//   console.log('Backend server is running on port 3001');
// });
const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${PORT}`);
});