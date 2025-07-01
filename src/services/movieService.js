// Movie service for handling all API interactions
class MovieService {
  constructor() {
    this.baseURL = 'https://www.apirequest.in/movie/api';
  }

  async fetchMovieByTitle(title) {
    try {
      const response = await fetch(`${this.baseURL}/title/${title}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      throw new Error(`Failed to fetch movie: ${error.message}`);
    }
  }

  async fetchSimilarMovies(genre, excludeTitle) {
    try {
      // This would typically be a real API call
      // For now, we'll simulate it with a mock response
      const mockSimilarMovies = [
        {
          id: 'similar1',
          title: 'Similar Movie 1',
          Poster: 'https://via.placeholder.com/300x400',
          Year: '2023',
          Genre: genre
        },
        {
          id: 'similar2', 
          title: 'Similar Movie 2',
          Poster: 'https://via.placeholder.com/300x400',
          Year: '2022',
          Genre: genre
        }
      ];
      return mockSimilarMovies.filter(movie => movie.title !== excludeTitle);
    } catch (error) {
      throw new Error(`Failed to fetch similar movies: ${error.message}`);
    }
  }

  // Transform API response to consistent format
  transformMovieData(apiData) {
    return {
      id: apiData.imdbID || apiData.title,
      title: apiData.title || apiData.Title,
      poster: apiData.Poster,
      year: apiData.year || apiData.Year,
      rated: apiData.rated || apiData.Rated,
      runtime: apiData.runtime || apiData.Runtime,
      genre: apiData.genre || apiData.Genre,
      director: apiData.director || apiData.Director,
      actors: apiData.actors || apiData.Actors,
      plot: apiData.plot || apiData.Plot,
      language: apiData.language || apiData.Language,
      awards: apiData.Awards,
      imdbRating: apiData.imdbRating,
      metascore: apiData.Metascore,
      images: apiData.Images || [],
      price: 9.99 // Default price
    };
  }
}

export default new MovieService(); 