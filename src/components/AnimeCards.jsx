// AnimeCards.jsx
import { useNavigate } from 'react-router-dom';

export default function AnimeList(props) {
  const navigate = useNavigate();


  const handleCardClick = (title) => {
    const formattedTitle = encodeURIComponent(title); // Encode title for URL
    const searchUrl = `https://www7.gogoanime.me//search.html?keyword=${formattedTitle}`;
    navigate(searchUrl);
  };

  return (
    <div className="AnimeCards">
      {props.data.map((element, index) => {
        const { images, genres, title } = element;
        const imageUrl = images?.webp?.large_image_url || images?.jpg?.large_image_url;
        return (
          <div className="AnimeCard" key={index} onClick={() => handleCardClick(title)}>
            <h5>{title}</h5>
            <img src={imageUrl} alt={title + " small image"} />
            <p>
              Genres:{" "}
              {genres.map((genre) => (
                <span key={genre.mal_id}>
                  {genre.name}
                  {genres.indexOf(genre) < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
}



