// Component
// Search anime based on user input
// Makes fetch request on submit
// Returns informations

import React, { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiProvider";
import SearchResults from "./SearchResults";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";

export function ApiSearchList() {
  const { url } = useContext(ApiContext);
  const {animeList, setAnimeList} = useContext(SearchResultsContext) // Use local state
  const [searchData, setSearchData] = useState("");


  // WILL NEED TO CHANGE IN FUTURE DEPENDING ON SEARCH TYPE
  let apiEndpoint = "anime?q="

  const handleEnterSearch = (event) => {
    if (event.key === 'Enter') {
      searchForAnime()
    }
  }

  const searchForAnime = async () => {
    try {
      const response = await fetch( url + apiEndpoint + searchData); // Update the API endpoint for anime
      console.log(animeList);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnimeList(data); // Update the context state

      // WILL NEED TO ADJUST HARD CODE OF THE SEARCH WORD
      const newUrl = `search/${apiEndpoint}${searchData}`;
      window.history.replaceState({}, "", newUrl);
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
        onKeyDown={handleEnterSearch}
        onChange={(event) => setSearchData(event.target.value)}
      />
      <button
        className="ApiSearchListButton"
        onClick={searchForAnime}
        type="submit"
      >
        Search
      </button>
      <SearchResults/>
    </div>
    )
}
