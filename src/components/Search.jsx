import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Track from "../components/Track";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "795a6357demsh86ab0e1151acb21p137dadjsn2ba8063e32bb",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      // Extract the search results from the API response
      const results = data.data || [];

      // Update the searchResults state with the retrieved search results
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = (track) => {
    setSelectedTrack(track);
    setRedirect(true);
  };

  if (redirect && selectedTrack) {
    return (
      <Navigate to={"/music/album/" + parseInt(selectedTrack.album.id)} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Enter a search term"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleSearch}
        >
          <AiOutlineSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((result) => (
          <Track
            key={result.id}
            data={result}
            img={result.album.cover_small}
            artist={result.artist.name}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}