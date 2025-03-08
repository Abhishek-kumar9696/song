import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  useEffect(() => {
    if (song) {
      soundRef.current = new Howl({
        src: [song.preview],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });
    }

    // Listen for playback commands
    socket.on('play', (time) => {
      if (soundRef.current) {
        soundRef.current.seek(time);
        soundRef.current.play();
      }
    });

    socket.on('pause', (time) => {
      if (soundRef.current) {
        soundRef.current.seek(time);
        soundRef.current.pause();
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      socket.disconnect();
    };
  }, [song]);

  const handlePlayPause = () => {
    if (isPlaying) {
      socket.emit('pause', soundRef.current.seek());
    } else {
      socket.emit('play', soundRef.current.seek());
    }
  };

  return (
    <div>
      <h2>{song ? `${song.title} - ${song.artist}` : 'No song selected'}</h2>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;