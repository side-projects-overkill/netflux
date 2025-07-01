import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import './ImageCarousel.scss';

const ImageCarousel = ({ images, title, className = '' }) => {
  const { currentIndex, goToPrevious, goToNext, goToSlide } = useCarousel(images?.length || 0);

  if (!images || images.length === 0) return null;

  return (
    <div className={`image-carousel ${className}`}>
      <div className="image-carousel__header">
        <h3 className="image-carousel__title">Gallery</h3>
        <div className="image-carousel__indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="image-carousel__container">
        <button 
          className="image-carousel__btn image-carousel__btn--prev"
          onClick={goToPrevious}
          aria-label="Previous image"
          disabled={images.length <= 1}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <div className="image-carousel__viewport">
          <div 
            className="image-carousel__track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="image-carousel__slide">
                <img 
                  src={image} 
                  alt={`Scene ${index + 1} from ${title}`}
                  className="image-carousel__image"
                  loading="lazy"
                />
                <div className="image-carousel__slide-overlay">
                  <span className="slide-number">{index + 1} / {images.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="image-carousel__btn image-carousel__btn--next"
          onClick={goToNext}
          aria-label="Next image"
          disabled={images.length <= 1}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>

      <div className="image-carousel__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 