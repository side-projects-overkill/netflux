import React, { useEffect, useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.scss'; // Assuming you have some styles for Home

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
        console.log('Fetched movies:', data);
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
    <>
      <main className="main-content">
        <h2>Featured Movies</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <MovieCard
                key={index}
                title={movie.title}
                poster={movie.Poster}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Home;

