// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import audioFile from './hiriye1.mp3';

// const socket = io('http://localhost:3001'); // Connect to the backend

// const audio = new Audio(audioFile); // Load the audio file

// const App = () => {
//   const [role, setRole] = useState('');
//   const [playing, setPlaying] = useState('');

//   useEffect(() => {
//     const receiveMessage = (m) => {
//       console.log('Received play message:', m);
//       if (role === 'server') {
//         audio.src = m.path || audioFile; // Use the provided path or fallback to the default audio file
//         audio.play();
//       }
//       setPlaying(m.name);
//     };

//     socket.on('play', receiveMessage); // Listen for 'play' events

//     return () => {
//       socket.off('play', receiveMessage); // Clean up the event listener
//     };
//   }, [role]);

//   const handlePlaySound = () => {
//     socket.emit('play', { name: 'sound1', path: audioFile }); // Emit the 'play' event
//   };

//   return (
//     <div className="App">
//       <h1>SoundBot</h1>
//       <div>
//         <div>
//           <h4>Role</h4>
//           <button onClick={() => setRole('client')}>Client</button>
//           <button onClick={() => setRole('server')}>Server</button>
//         </div>
//       </div>
//       <h4>Choose Sound</h4>
//       <button onClick={handlePlaySound}>Play Sound</button>
//       <div>
//         <h4>Playing: {playing}</h4>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './App.css';

// //const socket = io('http://localhost:3001'); // Connect to the backend
// const socket = io('http://192.168.151.112:3001'); 


// const App = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   // Handle play/pause
//   const handlePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//       } else {
//         audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
//         audioRef.current.play()
//           .then(() => {
//             setIsPlaying(true);
//             socket.emit('playSong', { url: audioRef.current.src }); // Broadcast the song to all devices
//           })
//           .catch((error) => {
//             console.error('Error playing audio:', error);
//           });
//       }
//     }
//   };

//   // Listen for server events
//   useEffect(() => {
//     socket.on('playSong', (data) => {
//       if (audioRef.current) {
//         audioRef.current.src = data.url;
//         audioRef.current.play()
//           .then(() => setIsPlaying(true))
//           .catch((error) => console.error('Error playing audio:', error));
//       }
//     });

//     return () => {
//       socket.off('playSong');
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

// Replace with your machine's local IP address
//const socket = io('http://192.168.151.112:3001'); 
const socket = io('http://localhost:3001');

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = 'https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4';
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            socket.emit('playSong', { url: audioRef.current.src });
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
          });
      }
    }
  };

  useEffect(() => {
    socket.on('playSong', (data) => {
      if (audioRef.current) {
        audioRef.current.src = data.url;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error('Error playing audio:', error));
      }
    });

    return () => {
      socket.off('playSong');
    };
  }, []);

  return (
    <div className="App">
      <h1>Multi-Device Music Sync</h1>
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <audio
        ref={audioRef}
        controls
        onEnded={() => setIsPlaying(false)}
      >
        <source src="https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_48.mp4" type="audio/mp4" />
      </audio>
    </div>
  );
};

export default App;