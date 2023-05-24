import React, { useState } from "react";
import { Navigate} from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';

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
  
  const [redirect, setRedirect] = useState(false)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <AiOutlineSearch onClick={handleSearch} />

      <ul className="search-list">
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => setRedirect(true)}>
          {result.title}
          {redirect && <Navigate to={'/music/album/'+ parseInt(result.album.id)} />} 
          {console.log(result.album.id)}</li>
        ))}
      </ul>

    </div>
  );
}