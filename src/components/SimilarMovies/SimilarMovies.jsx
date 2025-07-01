import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButtons from '../ActionButtons/ActionButtons';
import { createMovieObject } from '../../utils/movieUtils';
import { useCart } from '../../context/context';
import './SimilarMovies.scss';

const SimilarMovies = ({ movies, title = "More Like This" }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!movies || movies.length === 0) return null;

  const handleMovieClick = (movieTitle) => {
    navigate(`/details/${movieTitle}`);
  };

  const handleAddToCart = (movieData) => {
    const movie = createMovieObject(movieData);
    addToCart(movie);
  };

  const handleBuyNow = (movieData) => {
    const movie = createMovieObject(movieData);
    addToCart(movie);
    navigate('/checkout');
  };

  return (
    <section className="similar-movies">
      <div className="similar-movies__header">
        <h2 className="similar-movies__title">{title}</h2>
        <div className="similar-movies__subtitle">
          Because you're interested in this genre
        </div>
      </div>

      <div className="similar-movies__grid">
        {movies.map((movie, index) => (
          <div key={movie.id || index} className="similar-movie-card">
            <div className="similar-movie-card__poster-container">
              <img
                src={movie.Poster || movie.poster}
                alt={movie.title || movie.Title}
                className="similar-movie-card__poster"
                onClick={() => handleMovieClick(movie.title || movie.Title)}
                loading="lazy"
              />
              <div className="similar-movie-card__overlay">
                <div className="similar-movie-card__info">
                  <h3 className="movie-title">{movie.title || movie.Title}</h3>
                  <div className="movie-meta">
                    <span className="year">{movie.Year || movie.year}</span>
                    <span className="genre">{movie.Genre || movie.genre}</span>
                  </div>
                </div>
                <ActionButtons
                  onAddToCart={() => handleAddToCart(movie)}
                  onBuyNow={() => handleBuyNow(movie)}
                  movie={createMovieObject(movie)}
                  variant="compact"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarMovies; 