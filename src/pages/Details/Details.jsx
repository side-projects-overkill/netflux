// src/components/Details/Details.jsx

import React, { useState, useEffect } from 'react';
import './Details.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/context';

// This helper component is no longer needed for ratings, but let's keep it in case the API changes
const Rating = ({ source, value }) => (
  <div className="rating">
    <span className="rating-source">{source}</span>
    <span className="rating-value">{value}</span>
  </div>
);

function Details() {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  // ... (useEffect for fetching data should be here) ...

  // NEW: Carousel navigation functions
  const goToPrevious = () => {
    // Check if images exist before trying to access length
    if (!movieData || !movieData.Images) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? movieData.Images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    // Check if images exist
    if (!movieData || !movieData.Images) return;
    const isLastSlide = currentIndex === movieData.Images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // NEW: Cart functionality
  const handleAddToCart = () => {
    if (!movieData) return;
    
    const movie = {
      id: movieData.imdbID || movieData.title,
      title: movieData.title,
      poster: movieData.Poster,
      year: movieData.year,
      genre: movieData.genre,
      price: 9.99 // Default price, could be dynamic
    };
    
    addToCart(movie);
    
    // Show feedback to user
    const button = document.querySelector('.btn-info');
    if (button) {
      const originalText = button.textContent;
      button.textContent = '✓ Added!';
      button.style.background = '#28a745';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }
  };

  const handleBuyNow = () => {
    if (!movieData) return;
    
    const movie = {
      id: movieData.imdbID || movieData.title,
      title: movieData.title,
      poster: movieData.Poster,
      year: movieData.year,
      genre: movieData.genre,
      price: 9.99 // Default price, could be dynamic
    };
    
    addToCart(movie);
    navigate('/checkout');
  };

  const API_URL = `https://www.apirequest.in/movie/api/title/${title}`; // Using a mocky URL with your exact data

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // The API returns an array, we take the first element
        const movie = data[0]; 

        if (movie.Response === "False") {
          throw new Error(movie.Error);
        }
        
        setMovieData(movie);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [title]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h1>Error: {error}</h1>
        <button onClick={() => navigate('/netflux')} className="btn-back">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      {movieData && (
        <>
          {/* Background Hero Section */}
          <div 
            className="details-hero" 
            // CHANGE: Property name is Poster (capital P)
            style={{ backgroundImage: `url(${movieData.Images && movieData.Images[0] ? movieData.Images[0] : movieData.Poster})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              {/* CHANGE: Properties are capitalized */}
              <h1 className="movie-title">{movieData.title}</h1>
              <div className="movie-meta">
                <span>{movieData.year}</span>
                <span className="rated">{movieData.rated}</span>
                <span>{movieData.runtime}</span>
                <span className="price">$9.99</span>
              </div>
              <p className="movie-plot">{movieData.plot}</p>
              <div className="hero-buttons">
                <button onClick={handleBuyNow} className="btn-play">＄ Buy Now</button>
                <button onClick={handleAddToCart} className="btn-info">🛒 Add to Cart</button>
              </div>
            </div>
          </div>

          {/* Detailed Info Section */}
          <div className="details-body">
            <div className="info-section">
               {/* CHANGE: Properties are capitalized */}
              <p><strong>Genre:</strong> {movieData.genre}</p>
              <p><strong>Director:</strong> {movieData.director}</p>
              <p><strong>Actors:</strong> {movieData.actors}</p>
              <p><strong>Language:</strong> {movieData.language}</p>
              {movieData.Awards !== 'N/A' && <p><strong>Awards:</strong> {movieData.Awards}</p>}
            </div>
            {/* CHANGE: Displaying ratings from new properties */}
            <div className="ratings-section">
              <h3>Ratings</h3>
              {movieData.imdbRating && <Rating source="IMDb" value={movieData.imdbRating} />}
              {movieData.Metascore && <Rating source="Metascore" value={movieData.Metascore} />}
            </div>
          </div>
          
          {/* NEW: Image Gallery Section */}
          {movieData.Images && movieData.Images.length > 0 && (
            <div className="carousel-section">
              <h2>Gallery</h2>
              <div className="carousel">
                <button onClick={goToPrevious} className="carousel-btn prev">‹</button>
                <div className="carousel-inner-container">
                    <div 
                      className="carousel-inner"
                      // This inline style moves the entire strip of images left or right
                      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                      {movieData.Images.map((image, index) => (
                        <div key={index} className="carousel-item">
                          <img src={image} alt={`Scene ${index + 1} from ${movieData.title}`} />
                        </div>
                      ))}
                    </div>
                </div>
                <button onClick={goToNext} className="carousel-btn next">›</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Details;
