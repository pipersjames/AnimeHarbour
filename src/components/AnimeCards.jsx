// // Components
// // Display title of Search Anime

import React from "react";

export default function AnimeCardDisplay(props) {
  const animeListData = props.anime.anime.data;

  if (!animeListData || animeListData.length === 0) {
    // Handle the case when animeListData is not available or empty
    return null;
  }

  return (
    <div>
      {animeListData.map((animeData) => {
        const { mal_id, genres, title, images } = animeData;
        const imageUrl = images?.webp?.large_image_url || images?.jpg?.large_image_url;

        return (
          <div key={mal_id}>
            <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
            <h2>{title}</h2>
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
