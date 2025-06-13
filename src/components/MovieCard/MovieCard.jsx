import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.scss';

function MovieCard({ title, poster }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  console.log(poster)

  const handleAddToCart = () => {

  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { title, poster } });;
  };

  return (
    <div className="movie-card">
      {/* Animated background glow */}
      <div className="movie-card__glow" />
      
      {/* Main poster container */}
      <div className="movie-card__poster-container">
        <img 
          src={poster} 
          alt={title} 
          className="movie-card__poster"
        />
        
        {/* Gradient overlay */}
        <div className="movie-card__overlay" />
        
        {/* Floating action buttons */}
        <div className="movie-card__floating-actions">
          <button className="movie-card__floating-btn">
            <svg className="movie-card__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="movie-card__floating-btn">
            <svg className="movie-card__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content section */}
      <div className="movie-card__content">
        {/* Title with animated underline */}
        <div className="movie-card__title-section">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__title-underline" />
        </div>
        {/* Action buttons */}
        <div className="movie-card__actions">
          <button
            onClick={handleAddToCart}
            className="movie-card__btn movie-card__btn--primary"
          >
            Add to Cart
          </button>
          
          <button
            onClick={handleBuyNow}
            className="movie-card__btn movie-card__btn--secondary"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Animated corner accent */}
      <div className="movie-card__corner-accent" />
    </div>
  );
}

export default MovieCard;