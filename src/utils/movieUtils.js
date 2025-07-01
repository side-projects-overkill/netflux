// Utility functions for movie-related operations
export const createMovieObject = (movieData) => ({
  id: movieData.id || movieData.imdbID || movieData.title,
  title: movieData.title,
  poster: movieData.poster,
  year: movieData.year,
  genre: movieData.genre,
  price: movieData.price || 9.99
});

export const formatRuntime = (runtime) => {
  if (!runtime || runtime === 'N/A') return '';
  // Convert "120 min" to "2h 0m" format
  const match = runtime.match(/(\d+)/);
  if (!match) return runtime;
  
  const minutes = parseInt(match[1]);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${minutes}m`;
  return remainingMinutes === 0 ? `${hours}h` : `${hours}h ${remainingMinutes}m`;
};

export const parseRating = (rating) => {
  if (!rating || rating === 'N/A') return null;
  const numericRating = parseFloat(rating);
  return isNaN(numericRating) ? null : numericRating;
};

export const getRatingColor = (rating) => {
  if (!rating) return '#666';
  if (rating >= 8) return '#4CAF50'; // Green
  if (rating >= 6) return '#FF9800'; // Orange
  return '#f44336'; // Red
};

export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatGenres = (genreString) => {
  if (!genreString) return [];
  return genreString.split(',').map(genre => genre.trim());
};

export const getImageWithFallback = (primaryImage, fallbackImage) => {
  return primaryImage && primaryImage !== 'N/A' ? primaryImage : fallbackImage;
}; 