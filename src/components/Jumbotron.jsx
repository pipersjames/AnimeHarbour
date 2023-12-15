import { useContext, useEffect } from "react";
import { SearchResultsContext } from "../contexts/SearchResultsProvider";
import { ApiContext } from "../contexts/ApiProvider";
import { useLocation } from "react-router-dom";
import  Carousel  from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Jumbotron() {

    const { url } = useContext(ApiContext);
    const {animeList, setAnimeList} = useContext(SearchResultsContext)
    const location = useLocation();
    
    //let apiEndpoint = "top/anime?sfw"
    let apiEndpoint = "seasons/now?sfw"

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
        <div className="Jumbotron">
            {animeList.data && 
            animeList.data.length > 0 && 
            <Carousel className="AnimeScreens" >
                {animeList.data.map((element, index) => {
                    const { trailer, title, images } = element;
                    const imageUrl =
                    trailer.images.maximum_image_url || images.jpg.large_image_url

                    return (
                    <Carousel.Item className="AnimeScreen" key={index}>
                        <h5>{title}</h5>
                        <img
                        src={imageUrl}
                        alt={title + " small image"}
                        />
                      
                    </Carousel.Item>
                    );
                })}
                </Carousel>}
        </div>
    )
}




