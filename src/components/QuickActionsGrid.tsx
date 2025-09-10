import React from 'react';
import { Plane, Hotel, Star, Utensils, Car } from 'lucide-react';

interface QuickActionsGridProps {
  itemCounts: {
    flights: number;
    hotels: number;
    activities: number;
    dining: number;
    transport: number;
  };
  onCategoryClick: (category: string) => void;
  className?: string;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  itemCounts,
  onCategoryClick,
  className = ''
}) => {
  const categories = [
    { key: 'flights', name: 'Flights', icon: Plane, count: itemCounts.flights },
    { key: 'hotels', name: 'Hotels', icon: Hotel, count: itemCounts.hotels },
    { key: 'activities', name: 'Activities', icon: Star, count: itemCounts.activities },
    { key: 'dining', name: 'Dining', icon: Utensils, count: itemCounts.dining },
    { key: 'transport', name: 'Transport', icon: Car, count: itemCounts.transport }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Title */}
      <div className="text-left">
        <h3 className="text-2xl font-bold text-foreground mb-2">Available for Booking</h3>
        <p className="text-muted-foreground">Explore and book different aspects of your trip</p>
      </div>

      {/* Actions Grid */}
      <div className="flex flex-wrap gap-2">
        {categories.map(({ key, name, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => onCategoryClick(key)}
            className="p-3 rounded-xl border border-border bg-background hover:bg-muted/50 transition-all text-center group flex-1 min-w-0 cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-8 h-8 mb-2">
                <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                {name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {count} item{count !== 1 ? 's' : ''}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
