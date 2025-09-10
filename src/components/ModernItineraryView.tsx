import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plane, 
  ShoppingCart, 
  Star, 
  ChevronDown, 
  CheckCircle2,
  ArrowRight,
  Building,
  Utensils,
  Car,
  Activity
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DayScheduleItem {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name?: string;
  description?: string | null;
  airline?: string;
  flight_name?: string;
  flight_origin?: string;
  flight_destination?: string;
  flight_duration?: string;
  departure_time?: string;
  arrival_time?: string;
  class?: string;
  location?: string | {
    longitude: number;
    latitude: number;
  };
  start_time?: string;
  end_time?: string;
  bookingUrl?: string;
  check_in?: string;
  check_in_time?: string;
  amenities?: string[];
  from?: string;
  to?: string;
  mode?: string;
  price?: number | string;
  duration?: string;
  time?: string;
}

interface DayData {
  day: number;
  schedule: DayScheduleItem[];
}

interface ModernItineraryViewProps {
  dayWiseData: DayData[];
  onBack?: () => void;
  dates?: string;
}

const getTypeIcon = (type: string) => {
  const iconClass = "w-4 h-4";
  switch (type) {
    case 'flight':
      return <Plane className={iconClass} />;
    case 'hotel':
      return <Building className={iconClass} />;
    case 'activity':
      return <Activity className={iconClass} />;
    case 'meal':
      return <Utensils className={iconClass} />;
    case 'commute':
      return <Car className={iconClass} />;
    default:
      return <Clock className={iconClass} />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'flight':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'hotel':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'activity':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'meal':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'commute':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'flight':
      return 'Flight';
    case 'hotel':
      return 'Hotel';
    case 'activity':
      return 'Activity';
    case 'meal':
      return 'Dining';
    case 'commute':
      return 'Transport';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

export const ModernItineraryView: React.FC<ModernItineraryViewProps> = ({
  dayWiseData,
  onBack,
  dates
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // Default to day 1 expanded

  // Ensure day 1 is expanded when component mounts or data changes
  useEffect(() => {
    if (dayWiseData && dayWiseData.length > 0 && expandedDay === null) {
      setExpandedDay(1);
    }
  }, [dayWiseData, expandedDay]);

  const formatTime = (time: string) => {
    if (!time) return '';
    // Simple time formatting - you can enhance this
    return time;
  };

  const formatPrice = (price: number | string) => {
    if (!price) return '';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numPrice.toLocaleString()}`;
  };

  const getItemTitle = (item: DayScheduleItem) => {
    if (item.name) return item.name;
    if (item.flight_name) return item.flight_name;
    if (item.airline) return `${item.airline} Flight`;
    if (item.from && item.to) return `${item.from} to ${item.to}`;
    return getTypeLabel(item.type);
  };

  const getItemSubtitle = (item: DayScheduleItem) => {
    if (item.airline && item.flight_name) return `${item.airline} ${item.flight_name}`;
    if (item.flight_origin && item.flight_destination) return `${item.flight_origin} → ${item.flight_destination}`;
    if (item.from && item.to) return `${item.from} → ${item.to}`;
    if (item.location && typeof item.location === 'string') return item.location;
    return '';
  };

  const getItemTime = (item: DayScheduleItem) => {
    return item.departure_time || item.start_time || item.check_in_time || item.time || '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Itinerary</h1>
          {dates && (
            <p className="text-gray-600 mt-1">{dates}</p>
          )}
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back
          </Button>
        )}
      </div>

      {/* Days */}
      <div className="space-y-4">
        {(dayWiseData || []).map((dayData, index) => {
          const isExpanded = expandedDay === dayData.day;
          const safeSchedule = dayData.schedule || [];
          const dayTotal = safeSchedule.reduce((sum, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price || 0;
            return sum + price;
          }, 0);

          return (
            <Card key={`day-${dayData.day}-${index}`} className={`overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 ${
              isExpanded ? 'shadow-lg' : ''
            }`}>
              {/* Day Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => {
                  // Toggle expansion: if this day is expanded, collapse it; otherwise expand it
                  console.log('Clicking day', dayData.day, 'isExpanded:', isExpanded, 'current expandedDay:', expandedDay);
                  if (isExpanded) {
                    setExpandedDay(null);
                  } else {
                    setExpandedDay(dayData.day);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-semibold">
                      {dayData.day}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Day {dayData.day}</h3>
                      <p className="text-sm text-gray-500">
                        {safeSchedule.length} {safeSchedule.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {dayTotal > 0 && (
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{formatPrice(dayTotal)}</div>
                        <div className="text-xs text-gray-500">total</div>
                      </div>
                    )}
                    <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className={`transform transition-transform duration-300 ease-in-out ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-gray-100">
                  <div className="p-6 space-y-4">
                    {safeSchedule.map((item, index) => (
                      <div
                        key={`${dayData.day}-${index}`}
                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 group animate-in slide-in-from-top-2 fade-in-0"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Icon */}
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-gray-100 transition-colors">
                          {getTypeIcon(item.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs font-medium ${getTypeColor(item.type)}`}
                                >
                                  {getTypeLabel(item.type)}
                                </Badge>
                                {getItemTime(item) && (
                                  <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(getItemTime(item))}
                                  </div>
                                )}
                              </div>
                              
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {getItemTitle(item)}
                              </h4>
                              
                              {getItemSubtitle(item) && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {getItemSubtitle(item)}
                                </p>
                              )}
                              
                              {item.description && (
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {item.description}
                                </p>
                              )}

                              {/* Location */}
                              {item.location && typeof item.location === 'string' && (
                                <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </div>
                              )}

                              {/* Additional Info */}
                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                {item.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {item.duration}
                                  </div>
                                )}
                                {item.class && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {item.class}
                                  </div>
                                )}
                                {item.amenities && item.amenities.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {item.amenities.length} amenities
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 ml-4">
                              {item.price && (
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">
                                    {formatPrice(item.price)}
                                  </div>
                                </div>
                              )}
                              
                              {item.bookingUrl && (
                                  <Button
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                  >
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Book
                                  </Button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {(dayWiseData || []).length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No itinerary available</h3>
          <p className="text-gray-600">Your travel itinerary will appear here once generated.</p>
        </div>
      )}
    </div>
  );
};
