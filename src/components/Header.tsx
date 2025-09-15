import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStackedFixedContext } from '../contexts/StackedFixedContext';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  title?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  showBackButton = false, 
  onBackClick,
  title,
  className = ""
}) => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const { registerFixedElement, unregisterFixedElement, getTopPosition } = useStackedFixedContext();
  
  const HEADER_ID = 'main-header';
  const HEADER_HEIGHT = 84; // h-16 (64px) + py-2 (16px) + border (1px) + some buffer

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    // Use actual measured height if available, otherwise fallback to estimated height
    const actualHeight = headerRef.current?.offsetHeight || HEADER_HEIGHT;
    
    // Register this header as a fixed element
    registerFixedElement(HEADER_ID, actualHeight, 100); // High z-index for header
    
    return () => {
      unregisterFixedElement(HEADER_ID);
    };
  }, [registerFixedElement, unregisterFixedElement]);
  
  // Update height when component resizes
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        const actualHeight = headerRef.current.offsetHeight;
        registerFixedElement(HEADER_ID, actualHeight, 100);
      }
    };
    
    // Update height after render
    const timeoutId = setTimeout(updateHeight, 0);
    
    return () => clearTimeout(timeoutId);
  });

  const topPosition = getTopPosition(HEADER_ID);

  return (
    <header 
      ref={headerRef}
      className={`fixed left-0 right-0 z-[100] bg-white border-b border-gray-200 ${className} py-2`}
      style={{ top: `${topPosition}px` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-16 ${title ? 'justify-between' : 'justify-start'}`}>
          {/* Left Section */}
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer mr-4"
                aria-label="Go back"
              >
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
            )}
            
            {/* Logo with padding */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src="/amadeus-logo.png" 
                alt="Amadeus Logo" 
                className="h-4 w-auto"
              />
              {/* <span className="text-xl font-bold text-gray-900 font-circular">
                Hermes
              </span> */}
            </button>
          </div>

          {/* Center Section - Title */}
          {title && (
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-gray-900 font-circular">
                {title}
              </h1>
            </div>
          )}

          {/* Right Section - Empty for clean layout */}
          <div className="flex items-center">
            {/* Empty space for balanced layout */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
