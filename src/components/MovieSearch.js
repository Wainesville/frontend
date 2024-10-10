import React, { useState } from 'react';
import { searchMovies } from '../api'; // Import the searchMovies API function
import MovieInfo from './MovieInfo';
import './MovieSearch.css'; // Add your styles here

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  return (
    <div className="movie-search">
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      
      <div>
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieInfo movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;


