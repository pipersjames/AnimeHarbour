// Components
// Display title of Search Anime


export default function AnimeList() {
    const [animeList, setAnimeList] = useState([]);

    // Fetch anime data and update animeList state as needed
  
    return (
      <div>
        <h1>My Anime App</h1>

        <AnimeList animeList={animeList} />
      </div>
    );
  }
  