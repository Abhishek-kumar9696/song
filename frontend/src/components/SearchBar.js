import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const SearchBar = ({ onSelectSong }) => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://saavn.dev/api/search/songs?query=${query}`);
      setSongs(response.data);
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  const handleSelectSong = (song) => {
    onSelectSong(song);
    socket.emit('selectSong', song.preview);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => handleSelectSong(song)}>
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;