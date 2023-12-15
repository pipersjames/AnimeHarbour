import { useContext, useEffect } from "react";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";
import { ApiContext } from "../contexts/ApiProvider";
import { useLocation } from "react-router-dom";
import AnimeList from "./AnimeCards";

export default function Popular() {

    const { url } = useContext(ApiContext);
    const {animeList, setAnimeList} = useContext(SearchResultsContext)
    const location = useLocation();
    
    let apiEndpoint = "top/anime?sfw"


  const searchForApiRecommendations = async () => {
    try {
      const response = await fetch( url + apiEndpoint)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnimeList(data); // Update the context state

    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    searchForApiRecommendations()

    return () => { 
        setAnimeList({ pagination: {}, data: [] })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])
  
  console.log(animeList)

    return (
      <>
        <h1>Popular</h1>
        <div>
            {animeList.data.length > 0 && <AnimeList data={animeList.data} />}
        </div>

        </>
      
      
        
    )
}