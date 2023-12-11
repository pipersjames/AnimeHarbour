// Component
// Search anime based on user input
// Makes fetch request on submit
// Returns informations

import React, { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiProvider";

export function ApiSearchList() {
  const { url } = useContext(ApiContext);
  const [ animeList, setAnimeList ] = useState([]); // Use local state
  const [searchData, setSearchData] = useState("");

  const searchForAnime = async () => {
    try {
      const response = await fetch (url + "anime?q=" + searchData); // Update the API endpoint for anime
      console.log(animeList)
      if (!response.ok) {
        throw new Error("Network response was not ok" );
      }
      
      const data = await response.json();
      setAnimeList({ id: new Date(Date.now()).getTime(), anime: data }); // Update the context state
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  return (
    <div className="ApiSearchListContainer">
      <h5 className="ApiSearchListHeading">Enter an Anime name:</h5>
      <input
        type="text"
        name="animeName"
        id="animeName"
        value={searchData}
        onChange={(event) => setSearchData(event.target.value)}
      />
      <button className="ApiSearchListButton" onClick={searchForAnime} type="submit">Search</button>
    </div>
  );
}