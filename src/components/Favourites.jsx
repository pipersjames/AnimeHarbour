import { useContext } from "react";
import { FavouritesDataContext } from "../contexts/FavouritesDataProvider";
import AnimeList from "./AnimeCards";

export default function Favourites() {
  const { favouritesData } = useContext(FavouritesDataContext);

  return (
    <div className="FavouritesContainer">
      <h1>Favourited Anime</h1>
      <div className="FavouritesResults">
        {favouritesData.length > 0 && (
          /*console.log(favouritesData)*/ <AnimeList data={favouritesData} />
        )}
      </div>
    </div>
  );
}
