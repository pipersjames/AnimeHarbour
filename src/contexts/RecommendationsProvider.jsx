import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./ApiProvider";
import { AnimeFavouritesContext } from "./AnimeFavouritesProvider";

export const RecommendationsContext = createContext([]);

export function RecommendationsProvider(props) {
  // allows up to n recommendations per favourite, change this to increase
  // number of reccomendations per favourite.
  const MAX_RECOMMENDATIONS_PER_FAVOURITE = 5;

  const { url } = useContext(ApiContext);
  let { favourites } = useContext(AnimeFavouritesContext);
  let [recommendations, setRecommendations] = useState([]);
  //let [recommendationsData, setRecommendationsData] = useState([]);

  let apiEndpoint = "anime/";
  let apiEndpointSuffix = "/recommendations";

  // keep unique recommendations only
  function keepUniqueElements(array) {
    return [...new Map(array.map((x) => [x.mal_id, x])).values()];
  }

  // Fisher-Yates algorithm to shuffle array:
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const retrieveRecommendations = async () => {
    let newRecommendations = [];
    try {
      for (let i = favourites.length - 1; i >= 0; i--) {
        try {
          const response = await fetch(
            url + apiEndpoint + favourites[i] + apiEndpointSuffix
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          if (data.data.length > MAX_RECOMMENDATIONS_PER_FAVOURITE) {
            data.data.length = MAX_RECOMMENDATIONS_PER_FAVOURITE;
          }
          let favouriteRecommendations = data.data.map((e) => e.entry);
          newRecommendations.push(...favouriteRecommendations);
        } catch (error) {
          console.error("Error fetching favourite data: ", error);
        }
      }
      newRecommendations = keepUniqueElements(newRecommendations);
      shuffleArray(newRecommendations);
      setRecommendations(newRecommendations);
    } catch (error) {}
  };

  // if favourites is updated, retrieve recommendation from API
  useEffect(() => {
    if (favourites.length > 0) {
      retrieveRecommendations();
    } else {
      setRecommendations([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <RecommendationsContext.Provider
      value={{ recommendations, setRecommendations }}
    >
      {props.children}
    </RecommendationsContext.Provider>
  );
}
