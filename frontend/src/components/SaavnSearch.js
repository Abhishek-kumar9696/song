

// import React, { useState } from "react";
// import axios from "axios";

// const SaavnSearch = ({ socket, setCurrentSong }) => {
//   const [query, setQuery] = useState("");
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError(null);
//     setSongs([]);

//     try {
//       const response = await axios.get(
//         `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
//       );
//       if (response.data?.data?.results) {
//         setSongs(response.data.data.results);
//       } else {
//         setSongs([]);
//       }
//     } catch (err) {
//       setError("Failed to fetch songs. Please try again.");
//     }

//     setLoading(false);
//   };

//   const clickPlay = (url) => {
//     setCurrentSong(url);
//     socket.emit("playSong", { url });
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-xl font-bold mb-2">Search Songs</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter song name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="p-2 w-full border rounded text-black"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 rounded text-white">
//           Search
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <ul className="space-y-2">
//         {songs.map((song, index) => (
//           <li
//             key={index}
//             className="p-2 bg-gray-800 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700"
//             onClick={() => clickPlay(song?.downloadUrl?.[2]?.url)}
//           >
//             <img src={song?.image[0]?.url} alt={song?.name} className="w-16 h-16 rounded" />
//             <div>
//               <p className="font-semibold">{song?.name}</p>
//               <p className="text-sm">{song?.primaryArtists}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SaavnSearch;





import React, { useState } from 'react';
import axios from 'axios';

const SaavnSearch = ({ socket, setCurrentSong }) => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSongs([]);
    try {
      const response = await axios.get(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`);
      setSongs(response.data?.data?.results || []);
    } catch (err) {
      setError('Failed to fetch songs. Please try again.');
    }
    setLoading(false);
  };

  const clickPlay = (url) => {
    setCurrentSong(url);
    socket.emit('playSong', { url });
  };

  return (
    <div className="p-4 max-w-md mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-2">Search Songs</h1>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Enter song name..." value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 w-full border rounded text-black" />
        <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 rounded text-white">Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li key={index} className="p-2 bg-gray-800 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700" onClick={() => clickPlay(song?.downloadUrl?.[2]?.url)}>
            <img src={song?.image[0]?.url} alt={song?.name} className="w-16 h-16 rounded" />
            <div>
              <p className="font-semibold">{song.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaavnSearch;
