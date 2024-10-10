import React from 'react';
import { addToWatchlist } from '../api';

function MovieInfo({ movie }) {
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(movie.id);
      alert('Movie added to watchlist!');
    } catch (error) {
      alert('You must be logged in to add movies to your watchlist.');
    }
  };

  return (
    <div className="movie-info">
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
    </div>
  );
}

export default MovieInfo;

