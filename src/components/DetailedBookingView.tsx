import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getFormattedPrice } from '../utils/itineraryTransform';
import { 
  Plane, 
  Hotel, 
  MapPin, 
  Clock, 
  Utensils,
  ArrowLeft
} from 'lucide-react';
import { TierType } from './TierSelector';

interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  name?: string;
  location?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  description?: string;
  features?: string[];
  duration?: string;
  available?: boolean;
  tier?: TierType[];
  departureTime?: string;
  arrivalTime?: string;
  airline?: string;
  flightNumber?: string;
  checkIn?: string;
  checkOut?: string;
  roomType?: string;
  amenities?: string[];
  cuisine?: string;
  dressCode?: string;
  groupSize?: string;
  difficulty?: string;
}

interface DayScheduleItem {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name?: string;
  description?: string;
  airline?: string;
  departure_time?: string;
  arrival_time?: string;
  class?: string;
  price?: number;
  from?: string;
  to?: string;
  mode?: string;
  check_in?: string;
  start_time?: string;
  end_time?: string;
  location?: string | {
    longitude: number;
    latitude: number;
  };
  amenities?: string[];
}

interface DayWiseData {
  day: number;
  schedule: DayScheduleItem[];
}

interface UpsellOption {
  upsell_type: 'flight' | 'hotel' | 'activity';
  upsell_name: string;
  upsell_price: number;
  upsell_benefits: string[];
  upsell_description?: string;
  upsell_link?: string;
}

interface DetailedBookingViewProps {
  category: 'flights' | 'hotels' | 'activities' | 'dining';
  selectedTier: TierType;
  destination: string;
  onBack: () => void;
  dayWiseData?: DayWiseData[];
  upsellOptions?: UpsellOption[];
}

export const DetailedBookingView: React.FC<DetailedBookingViewProps> = ({
  category,
  selectedTier,
  destination,
  onBack,
  dayWiseData = [],
  upsellOptions = []
}) => {

  // Extract booking items from day-wise schedule AND upsell options based on category
  const getBookingItems = (): BookingItem[] => {
    const categoryMap: Record<string, string> = {
      'flights': 'flight',
      'hotels': 'hotel', 
      'activities': 'activity',
      'dining': 'meal'
    };
    
    const targetType = categoryMap[category];
    const allItems: BookingItem[] = [];
    
    // 1. Extract all items of the target type from day-wise schedule
    dayWiseData.forEach((dayData) => {
      dayData.schedule
        .filter(item => item.type === targetType)
        .forEach((scheduleItem, itemIndex) => {
          const bookingItem: BookingItem = {
            id: `day-${dayData.day}-${targetType}-${itemIndex}`,
            type: scheduleItem.type as 'flight' | 'hotel' | 'activity' | 'restaurant',
            name: scheduleItem.name || 
                  (scheduleItem.airline && `${scheduleItem.airline} Flight`) ||
                  (scheduleItem.from && scheduleItem.to && `${scheduleItem.from} to ${scheduleItem.to}`) ||
                  `${scheduleItem.type.charAt(0).toUpperCase() + scheduleItem.type.slice(1)}`,
            location: typeof scheduleItem.location === 'string' 
              ? scheduleItem.location 
              : scheduleItem.location 
                ? `${scheduleItem.location.latitude}, ${scheduleItem.location.longitude}`
                : scheduleItem.to || scheduleItem.from,
            price: scheduleItem.price,
            available: true,
            tier: [selectedTier],
            // Flight-specific fields
            ...(scheduleItem.type === 'flight' && {
              departureTime: scheduleItem.departure_time,
              arrivalTime: scheduleItem.arrival_time,
              airline: scheduleItem.airline,
              flightNumber: scheduleItem.airline, // Using airline as flight number for now
            }),
            // Hotel-specific fields
            ...(scheduleItem.type === 'hotel' && {
              checkIn: scheduleItem.check_in,
              amenities: scheduleItem.amenities,
            }),
            // Activity-specific fields
            ...(scheduleItem.type === 'activity' && {
              description: scheduleItem.description,
              duration: scheduleItem.start_time && scheduleItem.end_time 
                ? `${scheduleItem.start_time} - ${scheduleItem.end_time}`
                : undefined,
            }),
            // Meal-specific fields
            ...(scheduleItem.type === 'meal' && {
              description: scheduleItem.description,
              location: typeof scheduleItem.location === 'string' 
                ? scheduleItem.location 
                : scheduleItem.location 
                  ? `${scheduleItem.location.latitude}, ${scheduleItem.location.longitude}`
                  : undefined,
            })
          };
          
          allItems.push(bookingItem);
        });
    });
    
    // 2. Add upsell options of the target type
    upsellOptions
      .filter(option => option.upsell_type === targetType)
      .forEach((upsellItem, index) => {
        const bookingItem: BookingItem = {
          id: `upsell-${targetType}-${index}`,
          type: upsellItem.upsell_type as 'flight' | 'hotel' | 'activity' | 'restaurant',
          name: upsellItem.upsell_name,
          price: upsellItem.upsell_price,
          features: upsellItem.upsell_benefits,
          available: true,
          tier: [selectedTier],
          description: `Upgrade option: ${upsellItem.upsell_benefits.join(', ')}`
        };
        
        allItems.push(bookingItem);
      });
    
    return allItems;
  };

  const bookingItems = getBookingItems();

  const categoryInfo = {
    flights: { icon: <Plane className="w-4 h-4" />, color: 'bg-blue-500', title: 'Flight Options' },
    hotels: { icon: <Hotel className="w-4 h-4" />, color: 'bg-green-500', title: 'Hotel Options' },
    activities: { icon: <span className="text-sm">🎯</span>, color: 'bg-orange-500', title: 'Activity Options' },
    dining: { icon: <Utensils className="w-4 h-4" />, color: 'bg-purple-500', title: 'Dining Options' }
  };

  const currentCategory = categoryInfo[category];

  const items = bookingItems;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className={`w-8 h-8 rounded-full ${currentCategory.color} text-white flex items-center justify-center`}>
            {currentCategory.icon}
          </div>
          <div>
            <h2 className="text-base font-semibold">{currentCategory.title}</h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Tier
          </Badge>
        </div>
      </div>


      {/* Booking Items Grid or Empty State */}
      <div className="grid gap-3">
        {items.length === 0 ? (
          <Card className="border border-gray-200">
            <CardContent className="p-8 text-center">
              <div className={`inline-flex p-3 rounded-full ${currentCategory.color} text-white mb-4`}>
                {currentCategory.icon}
        </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {currentCategory.title.toLowerCase()} available
              </h3>
              <p className="text-gray-500 mb-4">
                We're working on adding {category} options for {destination}. 
                Please check back later or contact our support team.
              </p>
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Button>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
              <div className="flex h-28">
                {/* Compact Image with Fallback */}
                <div className="w-28 h-28 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {item.image ? (
                <ImageWithFallback
                  src={item.image}
                      alt={item.name || 'Booking item'}
                  className="w-full h-full object-cover"
                />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                      {category === 'flights' && <Plane className="w-4 h-4 text-blue-500" />}
                      {category === 'hotels' && <Hotel className="w-4 h-4 text-green-500" />}
                      {category === 'activities' && <span className="text-xl">🎯</span>}
                      {category === 'dining' && <Utensils className="w-4 h-4 text-purple-500" />}
                    </div>
                  )}
              </div>
              
                {/* Compact Content */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex-1 min-w-0">
                        {item.name && (
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
                            {item.id.startsWith('upsell-') && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700">
                                Upgrade
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                          {item.location && (
                      <div className="flex items-center space-x-1">
                              <MapPin className="w-2.5 h-2.5" />
                              <span className="truncate">{item.location}</span>
                      </div>
                          )}
                      {item.departureTime && (
                        <div className="flex items-center space-x-1">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{item.departureTime}</span>
                        </div>
                      )}
                      {item.duration && (
                        <div className="flex items-center space-x-1">
                              <Clock className="w-2.5 h-2.5" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                      <div className="text-right ml-3">
                        {item.price && (
                      <div className="flex items-center space-x-1">
                            {item.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {getFormattedPrice(item.originalPrice)}
                              </span>
                            )}
                            <span className="text-sm font-bold text-gray-900">
                              {getFormattedPrice(item.price)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-1.5">{item.description}</p>
                    )}
                </div>

                  {/* Compact Features Only */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 flex-1">
                      {item.features && item.features.length > 0 && (
                        <>
                          {item.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 border-0">
                      {feature}
                    </Badge>
                  ))}
                          {item.features.length > 2 && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 border-0">
                              +{item.features.length - 2}
                            </Badge>
                          )}
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};