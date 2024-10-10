import React, { useEffect, useState } from 'react';
import { fetchWatchlist, removeFromWatchlist } from '../api';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const movies = await fetchWatchlist();
      setWatchlist(movies);
    };
    loadWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(movieId);
      setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
    } catch (error) {
      alert('Failed to remove movie from watchlist.');
    }
  };

  return (
    <div>
      <h2>Your Watchlist</h2>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <button onClick={() => handleRemove(movie.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;
