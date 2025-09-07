import React from 'react';
import { Calendar, MapPin, Clock, Plane, Edit, Trash2, CreditCard, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  description: string;
  type: 'activity' | 'dining' | 'transport' | 'accommodation';
  priority: 'high' | 'medium' | 'low';
  price?: number;
  bookingAvailable?: boolean;
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
  location?: string;
  amenities?: string[];
}

interface DayWiseData {
  day: number;
  schedule: DayScheduleItem[];
}

interface UpsellOption {
  type: 'flight' | 'hotel' | 'activity';
  name: string;
  upgrade_cost: number;
  benefits: string[];
}

interface ItineraryDisplayProps {
  itinerary: ItineraryItem[];
  destination: string;
  dates: string;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  dayWiseData?: DayWiseData[];
  upsellOptions?: UpsellOption[];
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  destination,
  dates,
  onEditItem,
  onDeleteItem,
  dayWiseData = [],
  upsellOptions = []
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activity':
        return <span className="text-sm">🎯</span>;
      case 'dining':
        return <MapPin className="w-4 h-4" />;
      case 'transport':
        return <Plane className="w-4 h-4" />;
      case 'accommodation':
        return <Calendar className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'activity':
        return 'bg-blue-100 text-blue-800';
      case 'dining':
        return 'bg-green-100 text-green-800';
      case 'transport':
        return 'bg-purple-100 text-purple-800';
      case 'accommodation':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedByDay = itinerary.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<number, ItineraryItem[]>);

  // Prioritize day-wise data from API if available
  const hasApiData = dayWiseData && dayWiseData.length > 0;

  if (!hasApiData && itinerary.length === 0) {
    return (
      <div className="w-full border-0 shadow-none p-6">
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" style={{ borderRadius: '1.5rem' }}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1.5rem' }}>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-4 right-1/3 w-12 h-12 bg-indigo-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative px-16 py-20 text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-1 py-4">
              <div className="w-20 h-20 mx-auto flex items-center justify-center  transform hover:scale-105 transition-transform duration-300" >
                <Calendar className="w-10 h-10 text-blue-900 animate-pulse" />
              </div>
              {/* Floating particles around icon */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 max-w-md mx-auto">
              {/* Clean Hero Text */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Smart Travel Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Budget-aware • Real-time • Personalized
                </p>
              </div>

              {/* Compact Strengths */}
              <div className="flex justify-center space-x-6">
                {[
                  { icon: "💰", label: "Budget Smart" },
                  { icon: "⚡", label: "Live Pricing" },
                  { icon: "🎯", label: "Multi-Tier" }
                ].map((strength, index) => (
                  <div 
                    key={index}
                    className="text-center group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      {strength.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{strength.label}</span>
                  </div>
                ))}
              </div>

              {/* Simple Voice Prompt */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span className="text-base">🎤</span>
                  <span>Just say your destination & budget</span>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                  <p className="text-sm font-medium text-gray-800">
                    "Plan a ₹30K trip to Goa"
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-8 pb-4">
                <div className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" style={{
                  background: 'linear-gradient(to right, #dbeafe, #93c5fd, #1e40af)'
                }}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-medium text-blue-900">Click the Record Icon to Begin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{destination || 'Your Trip'}</span>
          </CardTitle>
          {dates && (
            <p className="text-muted-foreground flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{dates}</span>
            </p>
          )}
        </CardHeader>
      </Card>

      {/* Daily Itinerary */}
      {hasApiData ? (
        // Render day-wise data from API
        dayWiseData.map((dayData) => (
          <Card key={dayData.day}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Day {dayData.day}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dayData.schedule.map((scheduleItem, index) => (
                  <div
                    key={`${dayData.day}-${index}`}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(scheduleItem.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={getTypeColor(scheduleItem.type)}>
                              {scheduleItem.type}
                            </Badge>
                            {(scheduleItem.departure_time || scheduleItem.start_time || scheduleItem.check_in) && (
                              <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {scheduleItem.departure_time || scheduleItem.start_time || scheduleItem.check_in}
                              </span>
                            )}
                          </div>
                          
                          <h4 className="font-medium">
                            {scheduleItem.name || 
                             (scheduleItem.airline && `${scheduleItem.airline} Flight`) ||
                             (scheduleItem.from && scheduleItem.to && `${scheduleItem.from} to ${scheduleItem.to}`) ||
                             `${scheduleItem.type.charAt(0).toUpperCase() + scheduleItem.type.slice(1)}`}
                          </h4>
                          
                          {scheduleItem.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {scheduleItem.description}
                            </p>
                          )}
                          
                          {scheduleItem.location && (
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {scheduleItem.location}
                            </p>
                          )}
                          
                          {scheduleItem.price && (
                            <div className="flex items-center mt-2 p-2 bg-muted/30 rounded">
                              <div className="flex items-center space-x-2 text-sm">
                                <CreditCard className="w-4 h-4 text-green-600" />
                                <span className="font-medium">₹{scheduleItem.price}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        // Fallback to old itinerary format
        Object.entries(groupedByDay)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([day, items]) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Day {day}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {item.time}
                              </span>
                            </div>
                            
                            <h4 className="font-medium">{item.activity}</h4>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              {item.location}
                            </p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {item.description}
                              </p>
                            )}
                            
                            {/* Price and Booking Info */}
                            {item.price && (
                              <div className="flex items-center justify-between mt-3 p-2 bg-muted/30 rounded">
                                <div className="flex items-center space-x-2 text-sm">
                                  <CreditCard className="w-4 h-4 text-green-600" />
                                  <span className="font-medium">${item.price}</span>
                                  <span className="text-muted-foreground">
                                    per {item.type === 'accommodation' ? 'night' : 'person'}
                                  </span>
                                </div>
                                {item.bookingAvailable && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Bookable
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEditItem(item.id)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Upsell Options */}
      {upsellOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Available Upgrades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upsellOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {getTypeIcon(option.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{option.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {option.benefits.map((benefit, benefitIndex) => (
                          <Badge key={benefitIndex} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      +₹{option.upgrade_cost}
                    </div>
                    <Button size="sm" className="mt-1">
                      Upgrade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};