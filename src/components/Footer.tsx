import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto" style={{padding: '64px 0 0 0'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2">
          <p className="text-sm  text-muted font-medium">
            Created with ❤️ by Cleartrip Team
          </p>
          <p className="text-xs text-gray-600">
            Powered by Amadeus API • Built with modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};
