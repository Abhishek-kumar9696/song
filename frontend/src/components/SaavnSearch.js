// import React, { useState } from "react";

// const SaavnSearch = () => {
//   const [query, setQuery] = useState(""); // The song name input by the user
//   const [songs, setSongs] = useState([]); // List of songs fetched from the API
//   const [loading, setLoading] = useState(false); // To show loading status
//   const [error, setError] = useState(null); // To show error if any occurs
//   const [audio, setAudio] = useState(null); // To play the selected song

//   // Function to play the selected song
//   const clickPlay = (url) => {
//     if (audio) {
//       audio.pause(); // Stop the current audio
//     }
//     const newAudio = new Audio(url);
//     newAudio.play(); // Play the new song
//     setAudio(newAudio); // Update the audio state
//   };

//   // Function to handle the search logic
//   const handleSearch = async () => {
//     if (!query.trim()) return; // If the query is empty, do nothing

//     setLoading(true); // Set loading to true to show a loading indicator
//     setError(null); // Reset any previous errors
//     setSongs([]); // Clear any previous songs before fetching new ones

//     try {
//       // Fetch the data from the Saavn API
//       const response = await fetch(
//         `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
//       );
//       const data = await response.json(); // Parse the JSON response

//       // Check if the response has results
//       if (data?.data?.results) {
//         setSongs(data.data.results); // Set the songs in the state
//       } else {
//         setSongs([]); // No results found, clear the song list
//       }
//     } catch (err) {
//       setError("Failed to fetch songs. Please try again."); // Handle any errors
//     }

//     setLoading(false); // Set loading to false once the request is complete
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-xl font-bold mb-2">Search Songs</h1>

//       {/* Search input field and search button */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter song name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update the query on input change
//           className="p-2 w-full border rounded text-black"
//         />
//         <button
//           onClick={handleSearch} // Trigger the search function when clicked
//           className="bg-blue-500 px-4 py-2 rounded text-white"
//         >
//           Search
//         </button>
//       </div>

//       {/* Show loading status */}
//       {loading && <p>Loading...</p>}

//       {/* Show error if any occurs */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* List of search results */}
//       <ul className="space-y-2">
//         {songs.map((song, index) => (
//           <li
//             key={index} // Use index for simplicity, or use a unique ID if available
//             className="p-2 bg-gray-800 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700"
//             onClick={() => clickPlay(song?.downloadUrl?.[2]?.url)} // Play the song on click
//           >
//             <img
//               src={song?.image[0]?.url} // Display song image
//               alt={song?.name}
//               className="w-16 h-16 rounded"
//             />
//             <div>
//               <p className="font-semibold">{song?.name}</p>
//               <p className="text-sm">{song?.primaryArtists}</p> {/* Display artist */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SaavnSearch;


// import React, { useState } from "react";

// const SaavnSearch = ({ socket }) => {
//   const [query, setQuery] = useState(""); 
//   const [songs, setSongs] = useState([]); 
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!query.trim()) return; 

//     setLoading(true); // Set loading to true to show a loading indicator
//     setError(null); // Reset any previous errors
//     setSongs([]); // Clear any previous songs before fetching new ones

//     try {
//       // Fetch the data from the Saavn API
//       const response = await fetch(
//         `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
//       );
//       const data = await response.json(); // Parse the JSON response

//       // Check if the response has results
//       if (data?.data?.results) {
//         setSongs(data.data.results); // Set the songs in the state
//       } else {
//         setSongs([]); // No results found, clear the song list
//       }
//     } catch (err) {
//       setError("Failed to fetch songs. Please try again."); // Handle any errors
//     }

//     setLoading(false); // Set loading to false once the request is complete
//   };

//   // Function to play the selected song on all devices
//   const clickPlay = (url) => {
//     if (socket) {
//       socket.emit('playSong', { url }); // Emit the song URL to the server
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-xl font-bold mb-2">Search Songs</h1>

//       {/* Search input field and search button */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter song name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update the query on input change
//           className="p-2 w-full border rounded text-black"
//         />
//         <button
//           onClick={handleSearch} // Trigger the search function when clicked
//           className="bg-blue-500 px-4 py-2 rounded text-white"
//         >
//           Search
//         </button>
//       </div>

//       {/* Show loading status */}
//       {loading && <p>Loading...</p>}

//       {/* Show error if any occurs */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* List of search results */}
//       <ul className="space-y-2">
//         {songs.map((song, index) => (
//           <li
//             key={index} // Use index for simplicity, or use a unique ID if available
//             className="p-2 bg-gray-800 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700"
//             onClick={() => clickPlay(song?.downloadUrl?.[2]?.url)} // Play the song on click
//           >
//             <img
//               src={song?.image[0]?.url} // Display song image
//               alt={song?.name}
//               className="w-16 h-16 rounded"
//             />
//             <div>
//               <p className="font-semibold">{song?.name}</p>
//               <p className="text-sm">{song?.primaryArtists}</p> {/* Display artist */}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SaavnSearch;


import React, { useState } from "react";
import axios from "axios";

const SaavnSearch = ({ socket, setCurrentSong }) => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSongs([]);

    try {
      const response = await axios.get(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`
      );
      if (response.data?.data?.results) {
        setSongs(response.data.data.results);
      } else {
        setSongs([]);
      }
    } catch (err) {
      setError("Failed to fetch songs. Please try again.");
    }

    setLoading(false);
  };

  const clickPlay = (url) => {
    setCurrentSong(url);
    socket.emit("playSong", { url });
  };

  return (
    <div className="p-4 max-w-md mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-2">Search Songs</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter song name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 w-full border rounded text-black"
        />
        <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 rounded text-white">
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            className="p-2 bg-gray-800 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700"
            onClick={() => clickPlay(song?.downloadUrl?.[2]?.url)}
          >
            <img src={song?.image[0]?.url} alt={song?.name} className="w-16 h-16 rounded" />
            <div>
              <p className="font-semibold">{song?.name}</p>
              <p className="text-sm">{song?.primaryArtists}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaavnSearch;
