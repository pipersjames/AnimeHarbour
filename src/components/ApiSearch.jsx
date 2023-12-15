// Component
// Search anime based on user input
// Makes fetch request on submit
// Returns informations

import React, { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiProvider";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";
import { useNavigate } from "react-router-dom";

export function ApiSearch() {
  const { url } = useContext(ApiContext);
  // eslint-disable-next-line no-unused-vars
  const { animeList, setAnimeList } = useContext(SearchResultsContext);
  const [searchData, setSearchData] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("anime"); // Default filter
  const navigate = useNavigate();

  const handleEnterSearch = (event) => {
    if (event.key === "Enter") {
      searchForAnime();
    }
  };

  const searchForAnime = async () => {
    try {
      let apiEndpoint = "";
      // Added logic for different filters
      switch (selectedFilter) {
        case "type":
          apiEndpoint = "anime?sfw&type="; 
          break;
        case "min_score":
          apiEndpoint = "anime?sfw&score="; 
          break;  
        case "genre":
          const idPull = await fetch(url + "genres/anime")
          const idData = await idPull.json()
          let idSearch = () => {
            for (let i = 0; i < idData.data.length; i++) {
              if (idData.data[i].name.toLowerCase().includes(searchData)) {
                return idData.data[i].mal_id
              }
            }
          }  
          apiEndpoint = `anime?sfw&genres=${idSearch()}` 
          break;
        default:
          apiEndpoint = "anime?sfw&q="; 
      }

      const response = await fetch(url + apiEndpoint + searchData);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnimeList(data); // Updating the context data
      
      navigate("/search");

      // Updating the URL based on the selected filter and search term
      const newUrl = `search/${apiEndpoint}${searchData}`;
      window.history.replaceState({}, "", newUrl);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  return (
    <div className="ApiSearchContainer">
      <h5 className="ApiSearchHeading">Enter an Anime name:</h5>
      <input
        type="text"
        name="animeName"
        id="animeName"
        value={searchData}
        onKeyDown={handleEnterSearch}
        onChange={(event) => setSearchData(event.target.value)}
      />
      <select
        value={selectedFilter}
        onChange={(event) => setSelectedFilter(event.target.value)}
      >
        <option value="anime">Anime Name</option>
        <option value="type">Type e.g. movie,tv</option>
        <option value="score">Min Score e.g. 1-10</option>
        <option value="genre">By Genre e.g. comedy, romance</option>
      </select>
      <button
        className="ApiSearchButton"
        onClick={searchForAnime}
        type="submit"
      >
        Search
      </button>
    </div>
  );
}
