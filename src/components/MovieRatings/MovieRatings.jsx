import React from 'react';
import { parseRating, getRatingColor } from '../../utils/movieUtils';
import './MovieRatings.scss';

const MovieRatings = ({ movieData }) => {
  if (!movieData) return null;

  const ratings = [
    {
      source: 'IMDb',
      value: movieData.imdbRating,
      maxValue: 10,
      icon: '⭐'
    },
    {
      source: 'Metacritic',
      value: movieData.metascore,
      maxValue: 100,
      icon: '🎯'
    }
  ].filter(rating => rating.value && rating.value !== 'N/A');

  if (ratings.length === 0) return null;

  const renderRatingBar = (rating) => {
    const numericValue = parseRating(rating.value);
    if (!numericValue) return null;

    const percentage = (numericValue / rating.maxValue) * 100;
    const color = getRatingColor(numericValue);

    return (
      <div key={rating.source} className="movie-ratings__item">
        <div className="rating-header">
          <span className="rating-icon">{rating.icon}</span>
          <span className="rating-source">{rating.source}</span>
          <span className="rating-value" style={{ color }}>
            {rating.value}
            {rating.maxValue === 10 && '/10'}
            {rating.maxValue === 100 && '/100'}
          </span>
        </div>
        <div className="rating-bar">
          <div 
            className="rating-fill"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="movie-ratings">
      <h3 className="movie-ratings__title">Ratings & Reviews</h3>
      <div className="movie-ratings__list">
        {ratings.map(renderRatingBar)}
      </div>
      
      {movieData.awards && movieData.awards !== 'N/A' && (
        <div className="movie-ratings__awards">
          <div className="awards-header">
            <span className="awards-icon">🏆</span>
            <span className="awards-title">Awards</span>
          </div>
          <p className="awards-text">{movieData.awards}</p>
        </div>
      )}
    </div>
  );
};

export default MovieRatings; 