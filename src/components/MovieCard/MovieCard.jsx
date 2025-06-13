import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/context';
import { Link } from 'react-router-dom';
import './MovieCard.scss';

function MovieCard({ title, poster }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/checkout', { state: { title, poster } });
  };

  const navigateToCard = () => {
    navigate(`/details/${title}`, { state: { title, poster } });
  }
  return (
    <div className="movie-card" >
      <div className="movie-card__glow" />
      
      <div className="movie-card__poster-container">
        <img 
          src={poster} 
          alt={title} 
          className="movie-card__poster"
          onClick={navigateToCard}
        />
        <div className="movie-card__overlay" />
        <div className="movie-card__floating-actions">
          {/* like/view icons */}
        </div>
      </div>

      <div className="movie-card__content">
        <div className="movie-card__title-section">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__title-underline" />
        </div>
        <div className="movie-card__actions">
          <button
            onClick={() => addToCart(movie)}
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
      <div className="movie-card__corner-accent" />
    </div>
  );
}

export default MovieCard;
