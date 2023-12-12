// Components
// Display title of Search Anime

export default function AnimeList(props) {
  return (
    <div className="AnimeCards">
      {props.data.map((element, index) => {
        const { images, genres } = element;
        const imageUrl = images?.webp?.large_image_url || images?.jpg?.large_image_url;
        return (
          <div className="AnimeCard" key={index}>
            <h5>{element.title}</h5>
            <img
              src={imageUrl}
              alt={element.title + " small image"}
            />
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

  