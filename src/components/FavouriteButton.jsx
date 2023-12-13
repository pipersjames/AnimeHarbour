// ★☆

import { useContext, useEffect, useState } from "react";
import { AnimeFavouritesContext } from "../contexts/AnimeFavouritesProvider";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";

export function FavouriteButton(props) {
  let { favourites, setFavourites } = useContext(AnimeFavouritesContext);
  const { animeList } = useContext(SearchResultsContext);
  let [favourite, setFavourite] = useState(false);

  const toggleFavourite = (event) => {
    setFavourite(!favourite);
    if (!favourite) {
      setFavourites([...favourites, props.id]);
    } else {
      let favouritesCopy = favourites.filter((id) => {
        return id !== props.id;
      });
      setFavourites(favouritesCopy);
    }
  };

  function favouriteCheck() {
    if (favourites.includes(props.id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }

  // When component loads, check if it is favourited
  useEffect(() => {
    favouriteCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When search is updated, check if it is favourited
  useEffect(() => {
    favouriteCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeList]);

  return (
    <button className="FavouriteButton" onClick={toggleFavourite} type="button">
      {favourite ? "★" : "☆"}
    </button>
  );
}