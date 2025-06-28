import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/context';
import './MovieCard.scss';

function MovieCard({ title, poster, id, year, genre, price = 9.99 }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Create movie object from props
  const movie = {
    id: id || title, // Use id if provided, otherwise use title as fallback
    title,
    poster,
    year,
    genre,
    price
  };

  // Check if movie is already in cart
  const isInCart = cart.some(item => item.id === movie.id);

  // Reset justAdded state when item is removed from cart
  useEffect(() => {
    if (!isInCart && justAdded) {
      setJustAdded(false);
    }
  }, [isInCart, justAdded]);

  const handleAddToCart = () => {
    if (isInCart || isAdding) return; // Prevent adding if already in cart or currently adding
    
    setIsAdding(true);
    addToCart(movie);
    
    // Show success animation
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      
      // Reset the "just added" state after animation
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 300);
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(movie);
    }
    navigate('/checkout');
  };

  const navigateToCard = () => {
    navigate(`/details/${title}`);
  };

  const getButtonText = () => {
    if (isAdding) return 'Adding...';
    if (isInCart || justAdded) return 'Added to Cart ✓';
    return 'Add to Cart';
  };

  const getButtonClass = () => {
    let baseClass = 'movie-card__btn movie-card__btn--primary';
    if (isAdding) baseClass += ' movie-card__btn--adding';
    if (isInCart || justAdded) baseClass += ' movie-card__btn--added';
    return baseClass;
  };

  return (
    <div className="movie-card">
      <div className="movie-card__glow" />
      
      <div className="movie-card__poster-container">
        <img 
          src={poster} 
          alt={title} 
          className="movie-card__poster"
          onClick={navigateToCard}
          loading="lazy"
        />
        <div className="movie-card__overlay" />
      </div>

      <div className="movie-card__content">
        <div className="movie-card__title-section">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__title-underline" />
        </div>
        <div className="movie-card__actions">
          <button
            onClick={handleAddToCart}
            className={getButtonClass()}
            disabled={isInCart || isAdding}
            aria-label={isInCart ? 'Already in cart' : 'Add to cart'}
          >
            {getButtonText()}
          </button>
          <button
            onClick={handleBuyNow}
            className="movie-card__btn movie-card__btn--secondary"
            aria-label="Buy now"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="movie-card__corner-accent" />
    </div>
  );
}

export default MovieCard;
