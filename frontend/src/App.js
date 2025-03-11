

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './App.css';

// //const socket = io('http://localhost:3001'); // Replace with your backend URL if deployed
// const socket = io(process.env.REACT_APP_BACKEND_URL || 'https://song-backend-kzjq.onrender.com');


// const App = ({link}) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLeader, setIsLeader] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     socket.on('playSong', (data) => {
//       if (audioRef.current) {
//         audioRef.current.src = data.url;
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     });

//     socket.on('sync', (data) => {
//       if (!isLeader && audioRef.current) {
//         const diff = data.currentTime - audioRef.current.currentTime;
//         if (Math.abs(diff) > 0.2) {
//           audioRef.current.currentTime = data.currentTime;
//         } else {
//           audioRef.current.playbackRate = 1 + diff * 0.1;
//         }
//       }
//     });

//     return () => {
//       socket.off('playSong');
//       socket.off('sync');
//     };
//   }, [isLeader]);

//   // const handlePlayPause = () => {
//   //   if (audioRef.current) {
//   //     if (isPlaying) {
//   //       audioRef.current.pause();
//   //       setIsPlaying(false);
//   //     } else {
//   //       audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
//   //       audioRef.current.play();
//   //       setIsPlaying(true);
//   //       setIsLeader(true);
//   //       socket.emit('playSong', { url: audioRef.current.src });
//   //     }
//   //   }
//   // };

//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         setIsLeader(true);
//         const audioUrl = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
        
//         audioRef.current.src = audioUrl;
  
//         audioRef.current.addEventListener('canplaythrough', () => {
//           audioRef.current.play();
//           socket.emit('playSong', { url: audioUrl });
//         }, { once: true }); // Ensures event fires only once
//       }
//     }
//   };
  

//   useEffect(() => {
//     if (isLeader) {
//       const syncInterval = setInterval(() => {
//         if (audioRef.current) {
//           socket.emit('sync', { currentTime: audioRef.current.currentTime });
//         }
//       }, 1000);
//       return () => clearInterval(syncInterval);
//     }
//   }, [isLeader]);

//   return (
//     <div>
//       <div className="App">
//       <h1>Multi-Device Music Sync</h1>
//       <button onClick={handlePlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//       <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)} />
//     </div>
    
//     </div>
//   );
// };

// export default App;




// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import SaavnSearch from './components/SaavnSearch';
// import './App.css';

// const socket = io(process.env.REACT_APP_BACKEND_URL || 'https://song-backend-kzjq.onrender.com');

// const App = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLeader, setIsLeader] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     socket.on('playSong', (data) => {
//       if (audioRef.current) {
//         audioRef.current.src = data.url;
//         audioRef.current.play();
//         setIsPlaying(true);
//       }
//     });

//     socket.on('sync', (data) => {
//       if (!isLeader && audioRef.current) {
//         const diff = data.currentTime - audioRef.current.currentTime;
//         if (Math.abs(diff) > 0.2) {
//           audioRef.current.currentTime = data.currentTime;
//         } else {
//           audioRef.current.playbackRate = 1 + diff * 0.1;
//         }
//       }
//     });

//     return () => {
//       socket.off('playSong');
//       socket.off('sync');
//     };
//   }, [isLeader]);

//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         setIsLeader(true);
//         const audioUrl = audioRef.current.src || 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
        
//         audioRef.current.src = audioUrl;
  
//         audioRef.current.addEventListener('canplaythrough', () => {
//           audioRef.current.play();
//           socket.emit('playSong', { url: audioUrl });
//         }, { once: true }); // Ensures event fires only once
//       }
//     }
//   };

//   useEffect(() => {
//     if (isLeader) {
//       const syncInterval = setInterval(() => {
//         if (audioRef.current) {
//           socket.emit('sync', { currentTime: audioRef.current.currentTime });
//         }
//       }, 1000);
//       return () => clearInterval(syncInterval);
//     }
//   }, [isLeader]);

//   return (
//     <div>
//       <div className="App">
//         <h1>Multi-Device Music Sync</h1>
//         <button onClick={handlePlayPause}>
//           {isPlaying ? 'Pause' : 'Play'}
//         </button>
//         <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)} />
//       </div>
//       <SaavnSearch socket={socket} /> {/* Pass the socket object to SaavnSearch */}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import SaavnSearch from './components/SaavnSearch';
import './App.css';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001');

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    socket.on('playSong', ({ url, startTime }) => {
      setCurrentSong(url);
      preloadAndPlay(url, startTime);
    });

    socket.on('sync', ({ currentTime }) => {
      if (!isLeader && audioRef.current) {
        const diff = currentTime - audioRef.current.currentTime;
        if (Math.abs(diff) > 0.2) {
          audioRef.current.currentTime = currentTime;
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

  const preloadAndPlay = (url, startTime) => {
    const latency = Date.now() - startTime;
    audioRef.current.src = url;
    audioRef.current.load();
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, Math.max(0, startTime - Date.now()));
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLeader(true);
        const audioUrl = currentSong || 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
        socket.emit('playSong', { url: audioUrl });
      }
    }
  };

  useEffect(() => {
    if (isLeader) {
      const syncInterval = setInterval(() => {
        if (audioRef.current) {
          socket.emit('sync', { currentTime: audioRef.current.currentTime });
        }
      }, 1000);
      return () => clearInterval(syncInterval);
    }
  }, [isLeader]);

  return (
    <div className="App">
      <h1>Multi-Device Music Sync 🎶</h1>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <audio ref={audioRef} controls onEnded={() => setIsPlaying(false)} />
      <SaavnSearch socket={socket} setCurrentSong={setCurrentSong} />
    </div>
  );
};

export default App;
