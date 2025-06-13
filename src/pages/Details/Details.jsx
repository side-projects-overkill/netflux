// src/components/Details/Details.jsx

import React, { useState, useEffect } from 'react';
import './Details.scss';
import { useParams } from 'react-router-dom';

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
  console.log(title);

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
  }, []);

  if (isLoading) {
    return <div className="loading-state"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="error-state"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className="details-page">
      {movieData && (
        <>
          {/* Background Hero Section */}
          <div 
            className="details-hero" 
            // CHANGE: Property name is Poster (capital P)
            style={{ backgroundImage: `url(${movieData.Poster})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              {/* CHANGE: Properties are capitalized */}
              <h1 className="movie-title">{movieData.title}</h1>
              <div className="movie-meta">
                <span>{movieData.year}</span>
                <span className="rated">{movieData.rated}</span>
                <span>{movieData.runtime}</span>
              </div>
              <p className="movie-plot">{movieData.plot}</p>
              <div className="hero-buttons">
                <button className="btn-play">▶ Play</button>
                <button className="btn-info">ⓘ More Info</button>
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
          <div className="gallery-section">
            <h2>Gallery</h2>
            <div className="image-gallery">
              {movieData.Images && movieData.Images.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img src={image} alt={`Scene ${index + 1} from ${movieData.title}`} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
