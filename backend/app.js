

// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Broadcast play event with timestamp
//   socket.on('playSong', ({ url }) => {
//     const startTime = Date.now() + 2000; // Schedule playback 2 seconds later
//     io.emit('playSong', { url, startTime });
//   });

//   // Sync playback across devices
//   socket.on('sync', (data) => {
//     io.emit('sync', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });



// app.get('/', (req, res) => {
//   res.send("<h1>Welcome to SONG</h1>");
// });
// const PORT = process.env.PORT || 3001;

// server.listen(PORT, '0.0.0.0', () => {
//   console.log(`Backend server is running on port ${PORT}`);
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
// Store the start time for synchronization
let globalStartTime = null;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // Handle ping messages to measure latency
  socket.on('ping', (callback) => {
    callback(); // Respond immediately
  });
    // Handle playSong events
    // socket.on('playSong', (data) => {
    //   console.log('Play song received:', data);
    //   globalStartTime = data.startTime; // Update global start time
    //   io.emit('playSong', data); // Broadcast to all clients
    // });

    socket.on('playSong', (data) => {
      console.log('Play song received:', data);
      globalStartTime = Date.now() + 2000; // Delay by 2s for synchronization
      io.emit('playSong', { url: data.url, startTime: globalStartTime });
    });
    

  // socket.on('playSong', (data) => {
  //   console.log('Play song received:', data); 
  //   io.emit('playSong', data); 
  // });

  // socket.on('playSong', (data) => {
  //   const timestamp = Date.now(); // Capture the exact time of the event
  //   io.emit('playSong', { url: data.url, startTime: timestamp });
  // });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// server.listen(3001, () => {
//   console.log('Backend server is running on port 3001');
// });
app.get('/', (req, res) => {
  res.send("<h1>Welcome to SONG</h1>");
});
const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${PORT}`);
});