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
        case "upcoming":
          apiEndpoint = "anime?filter&page="; // Update with your API endpoint for new series
          break;
        case "top":
          apiEndpoint = "anime?type&filter&rating&page&limit="; // Update with your API endpoint for top series
          break;
        case "genre":
          apiEndpoint = "anime?filter="; // Update with your API endpoint for genre filter
          break;
        case "season":
          apiEndpoint = "anime?year&season?sfw&filter="; // Update with your API endpoint for season filter
          break;
        default:
          apiEndpoint = "anime?q="; // Default to search by anime name
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
        <option value="upcoming">Upcoming Series</option>
        <option value="top">Top Series</option>
        <option value="genre">By Genre</option>
        <option value="season">By Season</option>
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
