import { createContext, useEffect, useState } from "react";

export const SearchResultsContext = createContext({ pagination: {}, data: [] });

export function SearchResultsProvider(props) {
    let [animeList, setAnimeList] = useState({ pagination: {}, data: [] })

    useEffect(() => {
        setAnimeList(animeList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [animeList]);


  return (
    <SearchResultsContext.Provider value={{ animeList, setAnimeList }}>
      {props.children}
    </SearchResultsContext.Provider>
  );
}