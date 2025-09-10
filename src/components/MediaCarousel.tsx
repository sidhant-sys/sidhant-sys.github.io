import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Video, Camera, Bookmark, Share, Calendar, Users, MapPin } from 'lucide-react';
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
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create carousel items array - start with video, then add images
  const carouselItems: MediaItem[] = [
    {
      id: 'video-experience',
      type: 'video',
      url: experienceVideo,
      title: 'Experience Preview',
      description: 'Immersive travel experience video',
      location: destination || 'Featured Destination',
      category: 'inspiration'
    },
    ...items
  ];

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
            <video
              key={currentIndex}
              src={currentItem.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ width: '100%', height: '24rem' }}
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
                const fallbackImg = document.createElement('img');
                fallbackImg.src = items[0]?.url || '';
                fallbackImg.className = 'w-full h-full object-cover';
                fallbackImg.style.width = '100%';
                fallbackImg.style.height = '24rem';
                fallbackImg.alt = currentItem.title || '';
                target.parentNode?.appendChild(fallbackImg);
              }}
            />
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
      
      {/* Minimal overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* Navigation arrows - only show if more than 1 item */}
      {carouselItems.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isFirstSlide) prevSlide();
            }}
            disabled={isFirstSlide}
            className={`w-8 h-8 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all z-10 ${
              isFirstSlide
                ? 'bg-white/10 border-white/10 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 border-white/20 cursor-pointer'
            }`}
          >
            <ChevronLeft className={`w-4 h-4 ${isFirstSlide ? 'text-white/40' : 'text-white'}`} strokeWidth={1.5} />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isLastSlide) nextSlide();
            }}
            disabled={isLastSlide}
            className={`w-8 h-8 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all z-10 ${
              isLastSlide
                ? 'bg-white/10 border-white/10 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 border-white/20 cursor-pointer'
            }`}
          >
            <ChevronRight className={`w-4 h-4 ${isLastSlide ? 'text-white/40' : 'text-white'}`} strokeWidth={1.5} />
          </button>
        </div>
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

      {/* Media type indicators (pointers) - only show if more than 1 item */}
      {carouselItems.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {carouselItems.map((item, index) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-6 h-6 rounded-full backdrop-blur-sm border transition-all duration-200 flex items-center justify-center ${
                index === currentIndex
                  ? 'bg-white/40 border-white/60 scale-110'
                  : 'bg-white/15 border-white/30 hover:bg-white/25 hover:scale-105'
              }`}
            >
              {item.type === 'video' ? (
                <Video className="w-3 h-3 text-white" strokeWidth={1.5} />
              ) : (
                <Camera className="w-3 h-3 text-white" strokeWidth={1.5} />
              )}
            </button>
          ))}
        </div>
      )}
      
      {/* Destination info */}
      <div className="absolute bottom-4 left-4 text-white">
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
