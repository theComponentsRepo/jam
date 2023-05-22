import React, { useState } from "react";
import { useMusicData } from "../contexts/MusicContext"

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul className="search-list">
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}