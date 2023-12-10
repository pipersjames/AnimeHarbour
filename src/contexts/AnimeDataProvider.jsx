import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export const AnimeFavouritesContext = createContext([]);

export function AnimeDataProvider(props) {
  let [favourites, setFavourites] = useState([]);

  let [storedFavourites, setStoredFavourites] = useLocalStorage(
    "animeFavouritesData",
    favourites
  );

  // On app start, load localstorage to state
  useEffect(() => {
    setFavourites(storedFavourites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When team updates, save to localstorage
  useEffect(() => {
    setStoredFavourites(favourites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <AnimeFavouritesContext.Provider value={{ favourites, setFavourites }}>
      {props.children}
    </AnimeFavouritesContext.Provider>
  );
}
