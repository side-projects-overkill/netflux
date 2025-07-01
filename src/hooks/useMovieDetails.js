import { useState, useEffect } from 'react';
import movieService from '../services/movieService';

export const useMovieDetails = (title) => {
  const [movieData, setMovieData] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const rawData = await movieService.fetchMovieByTitle(title);
        
        if (rawData.Response === "False") {
          throw new Error(rawData.Error);
        }

        const transformedData = movieService.transformMovieData(rawData);
        setMovieData(transformedData);

        // Fetch similar movies if genre is available
        if (transformedData.genre) {
          try {
            const similar = await movieService.fetchSimilarMovies(
              transformedData.genre, 
              transformedData.title
            );
            setSimilarMovies(similar);
          } catch (similarError) {
            console.warn('Failed to fetch similar movies:', similarError);
            setSimilarMovies([]);
          }
        }

      } catch (err) {
        setError(err.message);
        setMovieData(null);
        setSimilarMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [title]);

  return {
    movieData,
    similarMovies,
    isLoading,
    error,
    refetch: () => {
      if (title) {
        const fetchMovieData = async () => {
          try {
            setIsLoading(true);
            setError(null);
            const rawData = await movieService.fetchMovieByTitle(title);
            const transformedData = movieService.transformMovieData(rawData);
            setMovieData(transformedData);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchMovieData();
      }
    }
  };
}; 