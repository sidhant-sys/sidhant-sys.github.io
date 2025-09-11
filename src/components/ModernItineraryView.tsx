import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Plane, 
  ArrowRight,
  Building,
  Utensils,
  Car,
  Activity,
  ChevronUp
} from 'lucide-react';
import { Badge } from './ui/badge';
import { DailyIntelligence } from './DailyIntelligence';

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
  daily_intelligence?: {
    weather?: { conditions?: string; recommendations?: string[]; };
    daily_tips?: { best_times?: string[]; local_insights?: string[]; cultural_notes?: string[]; };
    highlights?: { must_see?: string[]; food_recommendations?: string[]; hidden_gems?: string[]; };
  };
}

interface ModernItineraryViewProps {
  dayWiseData: DayData[];
  onBack?: () => void;
  dates?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'flight':
      return <Plane className="w-5 h-5" />;
    case 'hotel':
      return <Building className="w-5 h-5" />;
    case 'activity':
      return <Activity className="w-5 h-5" />;
    case 'meal':
      return <Utensils className="w-5 h-5" />;
    case 'commute':
      return <Car className="w-5 h-5" />;
    default:
      return <Activity className="w-5 h-5" />;
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

  // Auto-scroll to top when day changes
  useEffect(() => {
    if (expandedDay) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [expandedDay]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const formatTime = (time: string) => {
    if (!time) return '';
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
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Compact Trip Header */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="text-md font-bold text-gray-900">Your Trip</div>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-full">
              {dayWiseData?.length || 0} days
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">
            {dates || 'A carefully crafted itinerary designed just for you'}
          </span>
        </div>
      </div> */}

      {/* Compact Day Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Daily Itinerary</h2>
          <div className="flex space-x-2">
            {(dayWiseData || []).map((dayData) => (
              <button
                key={dayData.day}
                onClick={() => setExpandedDay(expandedDay === dayData.day ? null : dayData.day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-200 cursor-pointer ${
                  expandedDay === dayData.day
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Day {dayData.day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Day Content */}
      {expandedDay && (() => {
        const dayData = dayWiseData?.find(d => d.day === expandedDay);
        if (!dayData) return null;
        
        const safeSchedule = dayData.schedule || [];
        const dayTotal = safeSchedule.reduce((sum, item) => {
          const price = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price || 0;
          return sum + price;
        }, 0);

        return (
          <div className="space-y-4">
            {/* Day Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 px-4">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Day {dayData.day}</h3>
                    <p className="text-sm text-gray-600">{safeSchedule.length} activities planned</p>
                  </div>
                </div>
                {dayTotal > 0 && (
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{formatPrice(dayTotal)}</div>
                    <div className="text-xs text-gray-500">estimated cost</div>
                  </div>
                )}
              </div>
            </div>

            {/* Daily Intelligence - Compact */}
            {dayData.daily_intelligence && (
              <div className="bg-white rounded-lg shadow-sm">
                <DailyIntelligence 
                  data={dayData.daily_intelligence}
                  day={dayData.day}
                  variant="compact"
                />
              </div>
            )}

            {/* Activities List - Compact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Activities</h4>
              <div className="space-y-3">
                {safeSchedule.map((item, itemIndex) => (
                  <div
                    key={`${dayData.day}-${itemIndex}`}
                    className="flex items-center space-x-4 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    {/* Activity Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600">
                        {getTypeIcon(item.type)}
                      </div>
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={`${getTypeColor(item.type)} font-medium px-2 py-1 text-xs`}>
                              {getTypeLabel(item.type)}
                            </Badge>
                            {getItemTime(item) && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {formatTime(getItemTime(item))}
                              </span>
                            )}
                            {item.duration && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {item.duration}
                              </span>
                            )}
                          </div>
                          
                          <h5 className="font-semibold text-gray-900 text-sm mb-1">
                            {getItemTitle(item)}
                          </h5>
                          
                          {getItemSubtitle(item) && (
                            <p className="text-xs text-gray-600 mb-1">
                              {getItemSubtitle(item)}
                            </p>
                          )}

                          {item.location && typeof item.location === 'string' && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        {item.price && (
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">{formatPrice(item.price)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Scroll to Top Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          title="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};