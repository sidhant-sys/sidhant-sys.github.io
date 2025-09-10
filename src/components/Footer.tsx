import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            Created with ❤️ by Cleartrip team
          </p>
          <p className="text-xs text-muted-foreground/80">
            Powered by Amadeus API • Built with modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};
