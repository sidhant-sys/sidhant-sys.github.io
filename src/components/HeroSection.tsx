import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative h-64 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
      {/* Amadeus Logo - Top Left */}
      <div className="absolute top-4 left-6 z-10">
        <img 
          src="/amadeus-logo.png" 
          alt="Amadeus Logo" 
          className="w-[104px] h-4"
        />
      </div>
      
      {/* Project Name - Centered */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-bold mb-2 drop-shadow-2xl" style={{
            background: 'linear-gradient(to right, #D3CCE3, #E9E4F0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Hermes
          </h1>
          <p className="text-lg text-white font-medium">
            AI Itinerary Oracle
          </p>
          <p className="text-sm text-white max-w-md mx-auto">
            Divine travel planning powered by intelligent voice guidance
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
};
