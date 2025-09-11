import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2">
          <p className="text-sm  text-white font-medium">
            Created with ❤️ by Cleartrip team
          </p>
          <p className="text-xs text-white/80">
            Powered by Amadeus API • Built with modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};
