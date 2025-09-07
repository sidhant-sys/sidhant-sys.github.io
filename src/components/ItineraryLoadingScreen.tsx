import React, { useEffect } from 'react';
import { Plane } from 'lucide-react';

interface ItineraryLoadingScreenProps {
  className?: string;
}

export const ItineraryLoadingScreen: React.FC<ItineraryLoadingScreenProps> = ({ 
  className = '' 
}) => {
  // Hide ElevenLabs widget when loading overlay is active
  useEffect(() => {
    // Small delay to allow ElevenLabs widget to close gracefully first
    const timer = setTimeout(() => {
      const style = document.createElement('style');
      style.id = 'loading-overlay-style';
      style.textContent = `
        /* Hide ElevenLabs widget when loading overlay is active */
        elevenlabs-convai,
        elevenlabs-convai iframe,
        [data-elevenlabs-widget],
        .elevenlabs-widget,
        .elevenlabs-overlay {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          z-index: -1 !important;
        }
      `;
      document.head.appendChild(style);
    }, 100); // Small delay to allow graceful closing

    return () => {
      clearTimeout(timer);
      // Clean up the style when component unmounts
      const existingStyle = document.getElementById('loading-overlay-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 2147483647
      }}
    >
      <div className="text-center">
        {/* Reliable Brewing Animation */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Main spinner container */}
          <div className="relative w-20 h-20">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin"></div>
            
            {/* Inner counter-spinning ring */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-400" 
                 style={{ animation: 'spin 1.5s linear infinite reverse' }}></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Plane className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
        
        {/* Pulsing dots indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>
        
        {/* Modern Typography */}
        <div className="space-y-3">
          <h2 className="text-2xl font-light text-gray-800 tracking-wide">
            Creating your journey
          </h2>
          <p className="text-sm text-gray-500 font-light max-w-xs mx-auto leading-relaxed">
            Personalizing experiences just for you
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 w-48 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
