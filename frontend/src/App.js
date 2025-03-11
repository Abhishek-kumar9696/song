// // // import React, { useState, useEffect } from 'react';
// // // import io from 'socket.io-client';
// // // import audioFile from './hiriye1.mp3';

// // // const socket = io('http://localhost:3001'); // Connect to the backend

// // // const audio = new Audio(audioFile); // Load the audio file

// // // const App = () => {
// // //   const [role, setRole] = useState('');
// // //   const [playing, setPlaying] = useState('');

// // //   useEffect(() => {
// // //     const receiveMessage = (m) => {
// // //       console.log('Received play message:', m);
// // //       if (role === 'server') {
// // //         audio.src = m.path || audioFile; // Use the provided path or fallback to the default audio file
// // //         audio.play();
// // //       }
// // //       setPlaying(m.name);
// // //     };

// // //     socket.on('play', receiveMessage); // Listen for 'play' events

// // //     return () => {
// // //       socket.off('play', receiveMessage); // Clean up the event listener
// // //     };
// // //   }, [role]);

// // //   const handlePlaySound = () => {
// // //     socket.emit('play', { name: 'sound1', path: audioFile }); // Emit the 'play' event
// // //   };

// // //   return (
// // //     <div className="App">
// // //       <h1>SoundBot</h1>
// // //       <div>
// // //         <div>
// // //           <h4>Role</h4>
// // //           <button onClick={() => setRole('client')}>Client</button>
// // //           <button onClick={() => setRole('server')}>Server</button>
// // //         </div>
// // //       </div>
// // //       <h4>Choose Sound</h4>
// // //       <button onClick={handlePlaySound}>Play Sound</button>
// // //       <div>
// // //         <h4>Playing: {playing}</h4>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default App;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import io from 'socket.io-client';
// // // import './App.css';

// // // //const socket = io('http://localhost:3001'); // Connect to the backend
// // // const socket = io('http://192.168.151.112:3001'); 


// // // const App = () => {
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const audioRef = useRef(null);

// // //   // Handle play/pause
// // //   const handlePlayPause = () => {
// // //     if (audioRef.current) {
// // //       if (isPlaying) {
// // //         audioRef.current.pause();
// // //         setIsPlaying(false);
// // //       } else {
// // //         audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
// // //         audioRef.current.play()
// // //           .then(() => {
// // //             setIsPlaying(true);
// // //             socket.emit('playSong', { url: audioRef.current.src }); // Broadcast the song to all devices
// // //           })
// // //           .catch((error) => {
// // //             console.error('Error playing audio:', error);
// // //           });
// // //       }
// // //     }
// // //   };

// // //   // Listen for server events
// // //   useEffect(() => {
// // //     socket.on('playSong', (data) => {
// // //       if (audioRef.current) {
// // //         audioRef.current.src = data.url;
// // //         audioRef.current.play()
// // //           .then(() => setIsPlaying(true))
// // //           .catch((error) => console.error('Error playing audio:', error));
// // //       }
// // //     });

// // //     return () => {
// // //       socket.off('playSong');
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="App">
// // //       <h1>Multi-Device Music Sync</h1>
// // //       <div>
// // //         <button onClick={handlePlayPause}>
// // //           {isPlaying ? 'Pause' : 'Play'}
// // //         </button>
// // //       </div>

// // //       <audio
// // //         ref={audioRef}
// // //         controls
// // //         onEnded={() => setIsPlaying(false)}
// // //       >
// // //         <source src="https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4" type="audio/mp4" />
// // //       </audio>
// // //     </div>
// // //   );
// // // };

// // // export default App;


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import io from 'socket.io-client';
// // // import './App.css';

// // // // Replace with your machine's local IP address
// // // //const socket = io('http://192.168.151.112:3001'); 
// // // const socket = io(process.env.BACKEND_URL || 'https://song-backend-kzjq.onrender.com');
// // // //const socket = io('http://localhost:3001');

// // // const App = () => {
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const audioRef = useRef(null);

// // //   const handlePlayPause = () => {
// // //     if (audioRef.current) {
// // //       if (isPlaying) {
// // //         audioRef.current.pause();
// // //         setIsPlaying(false);
// // //       } else {
// // //         audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
// // //         audioRef.current.play()
// // //           .then(() => {
// // //             setIsPlaying(true);
// // //             socket.emit('playSong', { url: audioRef.current.src });
// // //           })
// // //           .catch((error) => {
// // //             console.error('Error playing audio:', error);
// // //           });
// // //       }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     // socket.on('playSong', (data) => {
// // //     //   if (audioRef.current) {
// // //     //     audioRef.current.src = data.url;
// // //     //     audioRef.current.play()
// // //     //       .then(() => setIsPlaying(true))
// // //     //       .catch((error) => console.error('Error playing audio:', error));
// // //     //   }
// // //     // });

// // //     socket.on('playSong', (data) => {
// // //       const latency = Date.now() - data.startTime; // Calculate delay
// // //       const audio = audioRef.current;
    
// // //       if (audio) {
// // //         audio.src = data.url;
// // //         audio.currentTime = latency / 1000; // Adjust playback to sync
// // //         audio.play();
// // //       }
// // //     });

    

// // //     return () => {
// // //       socket.off('playSong');
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="App">
// // //       <h1>Multi-Device Music Sync</h1>
// // //       <div>
// // //         <button onClick={handlePlayPause}>
// // //           {isPlaying ? 'Pause' : 'Play'}
// // //         </button>
// // //       </div>

// // //       <audio
// // //         ref={audioRef}
// // //         controls
// // //         onEnded={() => setIsPlaying(false)}
// // //       >
// // //         <source src="https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4" type="audio/mp4" />
// // //       </audio>
// // //     </div>
// // //   );
// // // };

// // // export default App;

// // import React, { useState, useEffect, useRef } from 'react';
// // import io from 'socket.io-client';
// // import './App.css';

// // const socket = io(process.env.BACKEND_URL || 'https://song-backend-kzjq.onrender.com');

// // const App = () => {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const audioRef = useRef(null);
// //   const [latency, setLatency] = useState(0);

// //   const handlePlayPause = () => {
// //     if (audioRef.current) {
// //       if (isPlaying) {
// //         audioRef.current.pause();
// //         setIsPlaying(false);
// //       } else {
// //         const startTime = Date.now() + latency; // Adjust for latency
// //         audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
// //         audioRef.current.play()
// //           .then(() => {
// //             setIsPlaying(true);
// //             socket.emit('playSong', { url: audioRef.current.src, startTime });
// //           })
// //           .catch((error) => {
// //             console.error('Error playing audio:', error);
// //           });
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     // Measure latency
// //     const pingInterval = setInterval(() => {
// //       const start = Date.now();
// //       socket.emit('ping', () => {
// //         const end = Date.now();
// //         setLatency(end - start);
// //       });
// //     }, 1000);

// //     socket.on('playSong', (data) => {
// //       if (audioRef.current) {
// //         const currentTime = Date.now();
// //         const delay = data.startTime - currentTime;
// //         if (delay > 0) {
// //           setTimeout(() => {
// //             audioRef.current.src = data.url;
// //             audioRef.current.play()
// //               .then(() => setIsPlaying(true))
// //               .catch((error) => console.error('Error playing audio:', error));
// //           }, delay);
// //         } else {
// //           audioRef.current.src = data.url;
// //           audioRef.current.play()
// //             .then(() => setIsPlaying(true))
// //             .catch((error) => console.error('Error playing audio:', error));
// //         }
// //       }
// //     });

// //     return () => {
// //       clearInterval(pingInterval);
// //       socket.off('playSong');
// //     };
// //   }, []);

// //   return (
// //     <div className="App">
// //       <h1>Multi-Device Music Sync</h1>
// //       <div>
// //         <button onClick={handlePlayPause}>
// //           {isPlaying ? 'Pause' : 'Play'}
// //         </button>
// //       </div>

// //       <audio
// //         ref={audioRef}
// //         controls
// //         onEnded={() => setIsPlaying(false)}
// //       >
// //         <source src="https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4" type="audio/mp4" />
// //       </audio>
// //     </div>
// //   );
// // };

// // export default App;


// // frontend/src/App.js
// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './App.css';

// // Replace with your backend URL (local or deployed)
// const socket = io(process.env.REACT_APP_BACKEND_URL || 'https://song-backend-kzjq.onrender.com');

// const App = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [latency, setLatency] = useState(0);
//   const audioRef = useRef(null);

//   // Measure latency periodically
//   useEffect(() => {
//     const pingInterval = setInterval(() => {
//       const start = Date.now();
//       socket.emit('ping', () => {
//         const end = Date.now();
//         setLatency(end - start); // Update latency
//       });
//     }, 5000); // Measure every 5 seconds

//     return () => clearInterval(pingInterval); // Cleanup on unmount
//   }, []);

//   // Handle play/pause button click
//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         const startTime = Date.now() + latency; // Adjust for latency
//         audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
//         audioRef.current.play()
//           .then(() => {
//             setIsPlaying(true);
//             socket.emit('playSong', { url: audioRef.current.src, startTime }); // Broadcast play event
//           })
//           .catch((error) => {
//             console.error('Error playing audio:', error);
//           });
//       }
//     }
//   };

//   // Listen for playSong events from the server
//   useEffect(() => {
//     socket.on('playSong', (data) => {
//       if (audioRef.current) {
//         const currentTime = Date.now();
//         const delay = data.startTime - currentTime; // Calculate delay
//         if (delay > 0) {
//           // If startTime is in the future, wait for the delay
//           setTimeout(() => {
//             audioRef.current.src = data.url;
//             audioRef.current.play()
//               .then(() => setIsPlaying(true))
//               .catch((error) => console.error('Error playing audio:', error));
//           }, delay);
//         } else {
//           // If startTime is in the past, start playing immediately
//           audioRef.current.src = data.url;
//           audioRef.current.play()
//             .then(() => setIsPlaying(true))
//             .catch((error) => console.error('Error playing audio:', error));
//         }
//       }
//     });

//     return () => {
//       socket.off('playSong'); // Cleanup event listener
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>Multi-Device Music Sync</h1>
//       <div>
//         <button onClick={handlePlayPause}>
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//       </div>
//       <div>
//         <p>Latency: {latency} ms</p>
//       </div>
//       <audio
//         ref={audioRef}
//         controls
//         onEnded={() => setIsPlaying(false)}
//       >
//         <source src="https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4" type="audio/mp4" />
//       </audio>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

//const socket = io('http://localhost:3001'); // Replace with your backend URL if deployed
const socket = io(process.env.REACT_APP_BACKEND_URL || 'https://song-backend-kzjq.onrender.com');


const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on('playSong', (data) => {
      if (audioRef.current) {
        audioRef.current.src = data.url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    });

    socket.on('sync', (data) => {
      if (!isLeader && audioRef.current) {
        const diff = data.currentTime - audioRef.current.currentTime;
        if (Math.abs(diff) > 0.2) {
          audioRef.current.currentTime = data.currentTime;
        } else {
          audioRef.current.playbackRate = 1 + diff * 0.1;
        }
      }
    });

    return () => {
      socket.off('playSong');
      socket.off('sync');
    };
  }, [isLeader]);

  // const handlePlayPause = () => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //       setIsPlaying(false);
  //     } else {
  //       audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
  //       audioRef.current.play();
  //       setIsPlaying(true);
  //       setIsLeader(true);
  //       socket.emit('playSong', { url: audioRef.current.src });
  //     }
  //   }
  // };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLeader(true);
        const audioUrl = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
        
        audioRef.current.src = audioUrl;
  
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current.play();
          socket.emit('playSong', { url: audioUrl });
        }, { once: true }); // Ensures event fires only once
      }
    }
  };
  

  useEffect(() => {
    if (isLeader) {
      const syncInterval = setInterval(() => {
        if (audioRef.current) {
          socket.emit('sync', { currentTime: audioRef.current.currentTime });
        }
      }, 2000);
      return () => clearInterval(syncInterval);
    }
  }, [isLeader]);

  return (
    <div className="App">
      <h1>Multi-Device Music Sync</h1>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default App;
