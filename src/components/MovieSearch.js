import React, { useEffect, useState } from 'react';
import { searchMovies, fetchGenres, fetchMoviesByGenre } from '../api';
import { useNavigate } from 'react-router-dom';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genreMovies, setGenreMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    const results = await fetchMoviesByGenre(genreId);
    setGenreMovies(results);
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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

      <h2>Select a Genre</h2>
      <select onChange={handleGenreChange} value={selectedGenre}>
        <option value="">Select a genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div>
        {movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MovieInfo
              >
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        )}

        {genreMovies.length > 0 && (
          <div>
            <h2>Movies in {genres.find((g) => g.id === parseInt(selectedGenre))?.name}</h2>
            <div className="movie-grid">
              {genreMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MovieInfo
                >
                  <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  <h3>{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
