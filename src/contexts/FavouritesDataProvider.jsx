import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./ApiProvider";
import { AnimeFavouritesContext } from "./AnimeFavouritesProvider";

export const FavouritesDataContext = createContext([]);

export function FavouritesDataProvider(props) {
  const { url } = useContext(ApiContext);
  let { favourites } = useContext(AnimeFavouritesContext);
  let [favouritesData, setFavouritesData] = useState([]);

  let apiEndpoint = "anime/";

  const retrieveFavouritesData = async () => {
    let newData = [];
    for (let i = favourites.length - 1; i >= 0; i--) {
      try {
        const response = await fetch(url + apiEndpoint + favourites[i]);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        newData.push(data.data);
      } catch (error) {
        console.error("Error fetching favourite data: ", error);
      }
    }

    setFavouritesData(newData);
  };

  // On load, retrieve data from API
  useEffect(() => {
    retrieveFavouritesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If favourites list is updated, retrieve data from API
  useEffect(() => {
    retrieveFavouritesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <FavouritesDataContext.Provider
      value={{ favouritesData, setFavouritesData }}
    >
      {props.children}
    </FavouritesDataContext.Provider>
  );
}
