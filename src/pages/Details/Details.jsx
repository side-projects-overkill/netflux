import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import MovieHero from '../../components/MovieHero/MovieHero';
import MovieRatings from '../../components/MovieRatings/MovieRatings';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import SimilarMovies from '../../components/SimilarMovies/SimilarMovies';
import './Details.scss';

// Loading component following Single Responsibility Principle
const LoadingState = () => (
  <div className="details-page__loading">
    <div className="loading-spinner" />
    <h1>Loading movie details...</h1>
    <p>Please wait while we fetch the information</p>
  </div>
);

// Error component following Single Responsibility Principle
const ErrorState = ({ error, onRetry, onGoHome }) => (
  <div className="details-page__error">
    <div className="error-icon">🎬</div>
    <h1>Oops! Something went wrong</h1>
    <p className="error-message">{error}</p>
    <div className="error-actions">
      <button onClick={onRetry} className="btn-retry">
        Try Again
      </button>
      <button onClick={onGoHome} className="btn-home">
        Back to Home
      </button>
    </div>
  </div>
);

// Movie info section component
const MovieInfo = ({ movieData }) => {
  if (!movieData) return null;

  const infoItems = [
    { label: 'Genre', value: movieData.genre },
    { label: 'Director', value: movieData.director },
    { label: 'Cast', value: movieData.actors },
    { label: 'Language', value: movieData.language },
    { label: 'Runtime', value: movieData.runtime }
  ].filter(item => item.value && item.value !== 'N/A');

  return (
    <div className="movie-info">
      <h2 className="movie-info__title">Movie Information</h2>
      <div className="movie-info__content">
        {infoItems.map(({ label, value }) => (
          <div key={label} className="info-item">
            <dt className="info-label">{label}:</dt>
            <dd className="info-value">{value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Details component following SOLID principles
function Details() {
  const { title } = useParams();
  const navigate = useNavigate();
  const { movieData, similarMovies, isLoading, error, refetch } = useMovieDetails(title);

  // Event handlers following Single Responsibility Principle
  const handleRetry = () => refetch();
  const handleGoHome = () => navigate('/');

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState 
        error={error} 
        onRetry={handleRetry} 
        onGoHome={handleGoHome} 
      />
    );
  }

  // No data state
  if (!movieData) {
    return (
      <ErrorState 
        error="Movie not found" 
        onRetry={handleRetry} 
        onGoHome={handleGoHome} 
      />
    );
  }

  return (
    <div className="details-page">
      {/* Hero Section */}
      <MovieHero movieData={movieData} />

      {/* Content Section */}
      <div className="details-page__content">
        <div className="details-page__main">
          <MovieInfo movieData={movieData} />
        </div>
        
        <div className="details-page__sidebar">
          <MovieRatings movieData={movieData} />
        </div>
      </div>

      {/* Image Gallery */}
      {movieData.images && movieData.images.length > 0 && (
        <section className="details-page__gallery">
          <ImageCarousel 
            images={movieData.images} 
            title={movieData.title} 
          />
        </section>
      )}

      {/* Similar Movies */}
      <SimilarMovies movies={similarMovies} />
    </div>
  );
}

export default Details;
