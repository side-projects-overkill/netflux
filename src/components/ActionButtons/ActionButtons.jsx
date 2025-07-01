import React, { useState } from 'react';
import { useCart } from '../../context/context';
import './ActionButtons.scss';

const ActionButtons = ({ 
  onPlay, 
  onAddToCart, 
  onBuyNow, 
  movie,
  variant = 'primary' // primary, secondary, compact
}) => {
  const { cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const isInCart = cart.some(item => item.id === movie?.id);

  const handleAddToCart = async () => {
    if (isInCart || isAdding) return;
    
    setIsAdding(true);
    await onAddToCart();
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const getAddToCartText = () => {
    if (isAdding) return '✓ Adding...';
    if (isInCart) return '✓ In Cart';
    return '+ My List';
  };

  const getAddToCartClass = () => {
    let baseClass = `action-buttons__btn action-buttons__btn--${variant}`;
    if (isInCart) baseClass += ' action-buttons__btn--added';
    if (isAdding) baseClass += ' action-buttons__btn--adding';
    return baseClass;
  };

  return (
    <div className={`action-buttons action-buttons--${variant}`}>
      {onPlay && (
        <button 
          onClick={onPlay}
          className="action-buttons__btn action-buttons__btn--play"
          aria-label="Play trailer"
        >
          <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Play
        </button>
      )}

      <button
        onClick={handleAddToCart}
        className={getAddToCartClass()}
        disabled={isInCart || isAdding}
        aria-label={isInCart ? 'Already in list' : 'Add to my list'}
      >
        {variant === 'compact' ? (
          <svg className="list-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        ) : (
          getAddToCartText()
        )}
      </button>

      {onBuyNow && (
        <button
          onClick={onBuyNow}
          className="action-buttons__btn action-buttons__btn--buy"
          aria-label="Buy now"
        >
          <svg className="buy-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
          Buy ${movie?.price || 9.99}
        </button>
      )}

      <button
        className="action-buttons__btn action-buttons__btn--more"
        aria-label="More options"
      >
        <svg className="more-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
    </div>
  );
};

export default ActionButtons; 