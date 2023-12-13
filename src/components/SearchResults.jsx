import { useContext } from "react";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";
import AnimeList from "./AnimeCards";

export default function SearchResults() {

    const { animeList } = useContext(SearchResultsContext)

    return ( 
          <div className="ApiSearchResults">
            {animeList.data.length > 0 && <AnimeList data={animeList.data} />}
          </div>
      );
    }