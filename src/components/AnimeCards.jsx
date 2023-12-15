// Components
// Display title of Search Anime

import { FavouriteButton } from "./FavouriteButton";

export default function AnimeList(props) {
  
  if (!props.data) {
    console.error("AnimeList - props.data is undefined or null");
    return null; // or render a placeholder, an empty state, or any appropriate fallback
  }

  const handleCardClick = (title) => {
    const formattedTitle = encodeURIComponent(title); // Encode title for URL
    const searchUrl = `https://www7.gogoanime.me//search.html?keyword=${formattedTitle}`;
    window.location.href = searchUrl
  };
  
  return (
    <div className="AnimeCards">
      {props.data.map((element, index) => {
        const { images, genres, title, mal_id } = element;
        const imageUrl =
          images?.webp?.large_image_url || images?.jpg?.large_image_url;
        return (
          <div className="AnimeCard" key={index}>
            <h5 onClick={() => handleCardClick(title)}>{title}</h5>
            <img
              src={imageUrl}
              alt={title + " small image"}
              onClick={() => handleCardClick(title)}
            />
            <p>
              Genres:{" "}
              {genres && 
              genres.length > 0 && 
              genres.map((genre) => (
                <span key={genre.mal_id}>
                  {genre.name}
                  {genres.indexOf(genre) < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <FavouriteButton id={mal_id} />
          </div>
        );
      })}
    </div>
  );
}



  