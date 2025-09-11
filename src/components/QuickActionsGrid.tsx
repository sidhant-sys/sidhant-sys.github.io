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
    { 
      key: 'flights', 
      name: 'Flights', 
      icon: Plane, 
      count: itemCounts.flights,
      color: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:from-blue-100 hover:to-blue-200',
      description: 'Book your flights'
    },
    { 
      key: 'hotels', 
      name: 'Hotels', 
      icon: Hotel, 
      count: itemCounts.hotels,
      color: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200',
      description: 'Reserve accommodations'
    },
    { 
      key: 'activities', 
      name: 'Activities', 
      icon: Star, 
      count: itemCounts.activities,
      color: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverColor: 'hover:from-green-100 hover:to-green-200',
      description: 'Plan your experiences'
    },
    { 
      key: 'dining', 
      name: 'Dining', 
      icon: Utensils, 
      count: itemCounts.dining,
      color: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:from-orange-100 hover:to-orange-200',
      description: 'Discover restaurants'
    },
    { 
      key: 'transport', 
      name: 'Transport', 
      icon: Car, 
      count: itemCounts.transport,
      color: 'from-gray-50 to-gray-100',
      iconColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      hoverColor: 'hover:from-gray-100 hover:to-gray-200',
      description: 'Arrange local transport'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Minimal Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-900">Explore Categories</h3>
        </div>
        <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
          Click to view details
        </div>
      </div>

      {/* Minimal Actions Grid */}
      <div className="flex flex-wrap gap-2">
        {categories.map(({ key, name, icon: Icon, count, iconColor, bgColor, borderColor, hoverColor }) => (
          <button
            key={key}
            onClick={() => onCategoryClick(key)}
            className={`group relative flex items-center space-x-2 px-3 py-2 rounded-full ${bgColor} ${borderColor} border hover:shadow-md transition-all duration-200 ${hoverColor} cursor-pointer`}
          >
            {/* Icon */}
            <div className={`w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}>
              <Icon className={`w-3 h-3 ${iconColor}`} strokeWidth={2} />
            </div>

            {/* Category Name */}
            <span className="text-sm font-medium text-gray-900 group-hover:text-gray-800 transition-colors">
              {name}
            </span>

            {/* Count Badge */}
            <div className={`w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm`}>
              <span className={`text-xs font-bold ${iconColor}`}>
                {count}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
