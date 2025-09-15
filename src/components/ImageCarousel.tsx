import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  baseUrl?: string;
  fallbackImages?: string[];
  alt: string;
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  baseUrl = 'https://amadeus.cltp.in/api/files/images/',
  fallbackImages = ['/trip-inspiration1.png', '/trip-inspiration2.png'],
  alt,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use generated images if available, otherwise fallback
  const imagesToDisplay = images.length > 0 
    ? images.map(img => `${baseUrl}${img}`)
    : fallbackImages;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imagesToDisplay.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => 
      prevIndex === imagesToDisplay.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (imagesToDisplay.length === 0) return null;

  return (
    <div className={`relative w-full h-32 rounded-lg overflow-hidden bg-gray-100 ${className}`}>
      {/* Main Image */}
      <img
        src={imagesToDisplay[currentIndex]}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          // If generated image fails, try fallback
          if (images.length > 0 && fallbackImages.length > 0) {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImages[0];
          }
        }}
      />
      
      {/* Navigation Arrows - Only show if more than 1 image */}
      {imagesToDisplay.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
      
      {/* Dots Indicator - Only show if more than 1 image */}
      {imagesToDisplay.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {imagesToDisplay.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
