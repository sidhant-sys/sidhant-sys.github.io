import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const TypewriterText: React.FC<{ text: string; delay?: number; speed?: number }> = ({ 
  text, 
  delay = 1000, 
  speed = 50 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start animation after delay
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Hide cursor after typing is complete
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, 1000);

      return () => clearTimeout(cursorTimer);
    }
  }, [currentIndex, text, speed, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  return (
    <span className="relative">
      {displayedText}
      {hasStarted && (
        <span 
          className={`inline-block w-0.5 h-4 bg-primary ml-0.5 transition-opacity duration-100 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">

      <div className="relative px-6 py-16 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Amadeus Logo - Top Left */}
          <div className="flex items-center">
            <img 
              src="/amadeus-logo.png" 
              alt="Amadeus Logo" 
              className="w-[104px] h-4 opacity-80"
            />
          </div>
          
          {/* Professional Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered</span>
          </div>
        </div>
        
        {/* Main Content - Centered */}
        <div className="text-center mt-8">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Hermes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md mx-auto text-balance">
              Intelligent Travel Planning Assistant
            </p>
            <p className="text-sm text-muted-foreground/80 max-w-lg mx-auto min-h-[1.5rem]">
              <TypewriterText 
                text="Powered by advanced AI to create personalized itineraries that match your preferences, budget, and travel style"
                delay={1500}
                speed={40}
              />
            </p>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
};
