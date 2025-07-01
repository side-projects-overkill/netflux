import { useState, useCallback } from 'react';

export const useCarousel = (itemsLength = 0) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    if (itemsLength === 0) return;
    setCurrentIndex(prev => (prev === 0 ? itemsLength - 1 : prev - 1));
  }, [itemsLength]);

  const goToNext = useCallback(() => {
    if (itemsLength === 0) return;
    setCurrentIndex(prev => (prev === itemsLength - 1 ? 0 : prev + 1));
  }, [itemsLength]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentIndex(index);
    }
  }, [itemsLength]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    currentIndex,
    goToPrevious,
    goToNext,
    goToSlide,
    reset,
    isFirst: currentIndex === 0,
    isLast: currentIndex === itemsLength - 1
  };
}; 