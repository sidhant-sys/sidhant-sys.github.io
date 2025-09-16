import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Video, Camera, Calendar, Users, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface MediaItem {
  id: string;
  type: 'video' | 'image';
  url: string;
  title: string;
  description?: string;
  location?: string;
  category?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  experienceVideo: string;
  destination?: string;
  dates?: string;
  numberOfTravellers?: number;
  duration?: number;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
  showVideo?: boolean; // New prop to control video display
  toIata?: string; // Destination IATA code for video selection
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  experienceVideo,
  destination,
  dates,
  numberOfTravellers,
  duration,
  onSave,
  onShare,
  className = '',
  showVideo = true, // Default to true for backward compatibility
  toIata
}) => {
  // Select video based on destination IATA code
  const getVideoUrl = () => {
    if (toIata === 'DXB') {
      return '/Dubai_video.mp4';
    } else if (toIata === 'CDG') {
      return '/Paris_video.mp4';
    }
    // Fallback to experienceVideo for other destinations
    return experienceVideo;
  };

  // Create carousel items array - conditionally include video, then add images
  const carouselItems: MediaItem[] = [
    // Only include video if showVideo is true
    ...(showVideo ? [{
      id: 'video-experience',
      type: 'video' as const,
      url: getVideoUrl(),
      title: 'Experience Preview',
      description: 'Immersive travel experience video',
      location: destination || 'Featured Destination',
      category: 'inspiration'
    }] : []),
    ...items
  ];

  // Initialize currentIndex - start with video (index 0) if luxury tier, otherwise start with first item
  const [currentIndex, setCurrentIndex] = useState(() => {
    // If showVideo is true (luxury tier), start with video at index 0
    // If showVideo is false, start with first image at index 0
    return 0;
  });

  // Check if current carousel has video
  const hasVideo = carouselItems.length > 0 && carouselItems[0].type === 'video';

  // Reset carousel to index 0 when showVideo prop changes (tier switching)
  useEffect(() => {
    setCurrentIndex(0);
  }, [showVideo]);

  // Auto-play functionality - only for images, not when video is present
  useEffect(() => {
    // Don't autoplay if:
    // 1. Only one or no items
    // 2. Video is present in the carousel
    if (carouselItems.length <= 1 || hasVideo) return;

    const autoPlayInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move to next item, loop back to 0 if at the end
        return prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1;
      });
    }, 3000); // 3 second interval

    // Clean up interval on component unmount or when dependencies change
    return () => clearInterval(autoPlayInterval);
  }, [carouselItems.length, hasVideo]); // Re-run effect when number of items changes or video presence changes

  // Navigation functions - finite carousel
  const nextSlide = () => {
    if (carouselItems.length > 0 && currentIndex < carouselItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (carouselItems.length > 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < carouselItems.length) {
      setCurrentIndex(index);
    }
  };

  // Check if navigation buttons should be disabled
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === carouselItems.length - 1;

  // Ensure carousel index is within bounds when items change
  useEffect(() => {
    if (currentIndex >= carouselItems.length) {
      setCurrentIndex(0);
    }
  }, [carouselItems.length, currentIndex]);

  const currentItem = carouselItems[currentIndex];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 w-full h-full ${className} rounded-\[8px\]`}>
      {/* Current Media Item */}
      <div className="relative w-full h-full">
        {carouselItems.length > 0 && currentItem ? (
          currentItem.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                key={`video-${currentIndex}`}
                src={currentItem.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                controlsList="nodownload"
                className="w-full h-full object-cover relative z-10"
                style={{ 
                  width: '100%', 
                  height: '24rem',
                  position: 'relative',
                  zIndex: 10
                }}
                onError={(e) => {
                  console.error('Video loading error:', e);
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <ImageWithFallback
              key={currentIndex}
              src={currentItem.url || ''}
              alt={currentItem.title || ''}
              className="w-full h-full object-cover"
              style={{ width: '100%', height: '24rem' }}
            />
          )
        ) : (
          <div className="w-full h-full bg-muted/30 flex items-center justify-center" style={{ height: '24rem' }}>
            <div className="text-muted-foreground text-sm">No media available</div>
          </div>
        )}
      </div>
      
      {/* Minimal overlay - only for images, not videos */}
      {currentItem && currentItem.type !== 'video' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      )}
      
      {/* Navigation arrows - only show if more than 1 item and positioned to not interfere with video controls */}
      {carouselItems.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isFirstSlide) prevSlide();
            }}
            disabled={isFirstSlide}
            className={`absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all z-20 ${
              isFirstSlide
                ? 'bg-white/10 border-white/10 cursor-not-allowed opacity-50'
                : 'bg-white/20 hover:bg-white/30 border-white/20 cursor-pointer hover:scale-110'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${isFirstSlide ? 'text-white/40' : 'text-white'}`} strokeWidth={2} />
          </button>
          
          {/* Right arrow */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isLastSlide) nextSlide();
            }}
            disabled={isLastSlide}
            className={`absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all z-20 ${
              isLastSlide
                ? 'bg-white/10 border-white/10 cursor-not-allowed opacity-50'
                : 'bg-white/20 hover:bg-white/30 border-white/20 cursor-pointer hover:scale-110'
            }`}
          >
            <ChevronRight className={`w-5 h-5 ${isLastSlide ? 'text-white/40' : 'text-white'}`} strokeWidth={2} />
          </button>
        </>
      )}
      
      {/* Action buttons */}
      {/* <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-medium transition-all"
        >
          <Bookmark className="w-3.5 h-3.5" strokeWidth={1.5} />
          Save
        </button>
        <button 
          onClick={onShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-medium transition-all"
        >
          <Share className="w-3.5 h-3.5" strokeWidth={1.5} />
          Share
        </button>
      </div> */}

      {/* Media type indicators (pointers) - positioned to not interfere with video controls */}
      {carouselItems.length > 1 && (
        <div className={`absolute flex gap-2 z-20 ${
          currentItem && currentItem.type === 'video' 
            ? 'top-4 right-4' // Move to top-right corner for videos to avoid overlapping content
            : 'bottom-4 left-1/2 -translate-x-1/2' // Keep centered at bottom for images
        }`}>
          {carouselItems.map((item, index) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              // className={`w-8 h-8  backdrop-blur-sm border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              //   index === currentIndex
              //     ? 'bg-white/50 border-white/70 scale-110 shadow-lg'
              //     : 'bg-white/20 border-white/40 hover:bg-white/30 hover:scale-105'
              // }`}
            >
              {/* {item.type === 'video' && (
                <Video className="w-4 h-4 text-white" strokeWidth={1.5} />
              ) } */}
            </button>
          ))}
        </div>
      )}
      
      {/* Destination info - positioned to not interfere with video controls */}
      <div className={`absolute left-4 text-white z-5 ${
        currentItem && currentItem.type === 'video'
          ? 'top-4' // Move to top for videos to avoid controls
          : 'bottom-4' // Keep at bottom for images
      }`}>
        <h1 className="text-2xl font-bold mb-2 tracking-tight">
          {destination || 'Featured Destination'}
        </h1>
        <div className="flex items-center gap-4 text-white/90 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{dates || 'Duration'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{numberOfTravellers || 1} traveler{(numberOfTravellers || 1) > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{duration || 0} days</span>
          </div>
        </div>
      </div>
    </div>
  );
};
