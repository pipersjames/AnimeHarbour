import { useContext } from "react";
import { FavouritesDataContext } from "../contexts/FavouritesDataProvider";
import AnimeList from "./AnimeCards";
import { RecommendationsContext } from "../contexts/RecommendationsProvider";

export default function Favourites() {
  const { favouritesData } = useContext(FavouritesDataContext);
  const { recommendations } = useContext(RecommendationsContext);

  return (
    <div className="FavouritesContainer">
      <h1>Favourited Anime</h1>
      <div className="FavouritesResults">
        {favouritesData.length > 0 && (
          /*console.log(favouritesData)*/ <AnimeList data={favouritesData} />
        )}
      </div>
      <h1>Recommendations</h1>
      <div className="RecommendationsResults">
        {recommendations.length > 0 && (
          /*console.log(favouritesData)*/ <AnimeList data={recommendations} />
        )}
      </div>
    </div>
  );
}
