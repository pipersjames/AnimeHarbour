// ApiSearchList.jsx
import React, { useContext, useState, useEffect } from "react";
import { ApiContext } from "../contexts/ApiProvider";
import AnimeCardDisplay from "./AnimeCardDisplay";

export function ApiSearchList() {
  const { url } = useContext(ApiContext);
  const [animeList, setAnimeList] = useState([]); // Use local state
  const [searchData, setSearchData] = useState("");

  const searchForAnime = async () => {
      // Check if searchData is not empty before making the API call
      if (searchData.trim() === "") {
        return; // Don't proceed if search bar is empty
      }
  
    try {
      const response = await fetch(url + "anime?q=" + searchData); // Update the API endpoint for anime
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("API Response:", data);
      // Set animeList to an array containing the latest search result
      setAnimeList([
        { id: new Date(Date.now()).getTime(), anime: data }
      ]);
      
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Anime List:", animeList);
  }, [animeList]); // This useEffect runs whenever animeList changes


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
      <button className="ApiSearchListButton" onClick={searchForAnime} type="submit">
        Search
      </button>

      <div className="AnimeCardContainer">
        {animeList.map((anime) => (
          <AnimeCardDisplay key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
