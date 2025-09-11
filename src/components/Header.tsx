import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 ${className} py-2`}>
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
