import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.scss';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const url = 'https://www.apirequest.in/movie/api';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Netflux</h1>
        <p>Your ultimate destination for digital movie streaming</p>
      </div>
      
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading awesome movies...</p>
          </div>
        ) : (
          <>
            <h2 className="section-title">Featured Movies</h2>
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <MovieCard
                  key={movie.imdbID || index}
                  id={movie.imdbID || index}
                  title={movie.title}
                  poster={movie.Poster}
                  year={movie.year}
                  genre={movie.genre}
                  price={Math.floor(Math.random() * 15) + 5.99} // Random price between $5.99 and $19.99
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Home;

