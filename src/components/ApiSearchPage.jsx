// Component
// Search anime based on user input
// Makes fetch request on submit
// Returns informations
//({ pagination: {}, data: [] })

import { ApiSearch } from "./ApiSearch";
import SearchResults from "./SearchResults";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";
import { useContext } from "react";

export function ApiSearchPage() {

    const {animeList} = useContext(SearchResultsContext)

    return (
        <>
            <ApiSearch/>
            {animeList.pagination && <SearchResults/>}
        </>
        
    )

}
