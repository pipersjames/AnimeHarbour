// Components
// Display title of Search Anime

export default function AnimeList(props) {
  return (
    <div className="AnimeCards">
      {props.data.map((element, index) => {
        return (
          <div className="AnimeCard" key={index}>
            <h5>{element.title}</h5>
            <img
              src={element.images.jpg.small_image_url}
              alt={element.title + " small image"}
            />
          </div>
        );
      })}
    </div>
  );
}
  