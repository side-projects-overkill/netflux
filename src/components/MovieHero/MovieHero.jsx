import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/context';
import { createMovieObject, formatRuntime, getImageWithFallback } from '../../utils/movieUtils';
import ActionButtons from '../ActionButtons/ActionButtons';
import './MovieHero.scss';

const MovieHero = ({ movieData }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!movieData) return null;

  const movie = createMovieObject(movieData);
  const heroImage = getImageWithFallback(
    movieData.images?.[0], 
    movieData.poster
  );

  const handleAddToCart = () => {
    addToCart(movie);
  };

  const handleBuyNow = () => {
    addToCart(movie);
    navigate('/checkout');
  };

  const handlePlayTrailer = () => {
    // In a real app, this would open a trailer modal or navigate to trailer
    console.log('Play trailer for:', movieData.title);
  };

  return (
    <div 
      className="movie-hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="movie-hero__overlay" />
      
      <div className="movie-hero__content">
        <div className="movie-hero__badge">
          {movieData.rated && (
            <span className="rating-badge">{movieData.rated}</span>
          )}
        </div>

        <h1 className="movie-hero__title">{movieData.title}</h1>
        
        <div className="movie-hero__meta">
          {movieData.year && <span className="meta-item year">{movieData.year}</span>}
          {movieData.runtime && <span className="meta-item runtime">{formatRuntime(movieData.runtime)}</span>}
          {movieData.genre && (
            <span className="meta-item genres">
              {movieData.genre.split(',').slice(0, 3).map(genre => (
                <span key={genre.trim()} className="genre-tag">{genre.trim()}</span>
              ))}
            </span>
          )}
        </div>

        <p className="movie-hero__plot">{movieData.plot}</p>

        <div className="movie-hero__cast">
          {movieData.director && (
            <div className="cast-info">
              <span className="cast-label">Director:</span>
              <span className="cast-value">{movieData.director}</span>
            </div>
          )}
          {movieData.actors && (
            <div className="cast-info">
              <span className="cast-label">Cast:</span>
              <span className="cast-value">{movieData.actors.split(',').slice(0, 3).join(', ')}</span>
            </div>
          )}
        </div>

        <ActionButtons
          onPlay={handlePlayTrailer}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          movie={movie}
        />
      </div>
    </div>
  );
};

export default MovieHero; 