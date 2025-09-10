import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plane, Edit, Trash2, CreditCard, ShoppingCart, TrendingUp, Users, DollarSign, Star, Sparkles, ArrowRight, ChevronDown, ChevronUp, Zap, Target, Globe, Loader2, XCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useBooking } from '../hooks/useBooking';
import { TierType } from './TierSelector';

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
  description?: string | null;
  // Flight specific fields
  airline?: string;
  flight_name?: string;
  flight_origin?: string;
  flight_destination?: string;
  flight_duration?: string;
  departure_time?: string;
  arrival_time?: string;
  class?: string;
  // Activity specific fields
  location?: string | {
    longitude: number;
    latitude: number;
  };
  start_time?: string;
  end_time?: string;
  bookingUrl?: string;
  // Hotel specific fields
  check_in?: string;
  check_in_time?: string;
  amenities?: string[];
  // Commute specific fields
  from?: string;
  to?: string;
  mode?: string;
  // Meal specific fields
  time?: string;
  // Common fields
  price?: number | string;
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

interface CostBreakdown {
  flights: number;
  hotels: number;
  activities: number;
  meals: number;
  commute: number;
}

interface FlightDetail {
  flight_name: string;
  flight_origin: string;
  flight_destination: string;
  flight_duration: string;
  flight_price: number;
  flight_date: string;
  flight_time: string;
}

interface HotelDetail {
  hotel_name: string;
  hotel_address: string;
  hotel_room_type: string;
  hotel_hotel_class: string;
  hotel_price: number;
  hotel_check_in_date: string;
  hotel_check_out_date: string;
}

interface TierOverview {
  trip_type: string;
  total_travellers: {
    adults: number;
    kids: number;
  };
  duration: string;
  total_cost: number;
  cost_breakdown: CostBreakdown;
}

interface ItineraryDisplayProps {
  itinerary: ItineraryItem[];
  destination: string;
  dates: string;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  dayWiseData?: DayWiseData[];
  upsellOptions?: UpsellOption[];
  budgetedOverview?: TierOverview;
  premiumOverview?: TierOverview;
  luxuryOverview?: TierOverview;
  flightsData?: FlightDetail[];
  hotelsData?: HotelDetail[];
  apiResponse?: any; // API response containing itinerary ID
  selectedTier?: TierType;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({
  itinerary,
  destination,
  dates,
  onEditItem,
  onDeleteItem,
  dayWiseData = [],
  upsellOptions = [],
  budgetedOverview,
  premiumOverview,
  luxuryOverview,
  // flightsData = [],
  // hotelsData = []
  apiResponse,
  selectedTier: propSelectedTier
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState<'budgeted' | 'premium' | 'luxury'>('budgeted');
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  // Booking functionality
  const { isBooking, bookingError, lastBooking, handleBooking, resetBookingState } = useBooking({
    onBookingSuccess: (booking) => {
      console.log('Booking successful:', booking);
    },
    onBookingError: (error) => {
      console.error('Booking failed:', error);
    }
  });


  const onBookCompleteTrip = async () => {
    if (!apiResponse?.id || !propSelectedTier) {
      alert('Missing booking information. Please try again.');
      return;
    }

    resetBookingState();
    await handleBooking(apiResponse.id, propSelectedTier);
  };

  // Animation effect for cost values
  useEffect(() => {
    if (budgetedOverview) {
      const targetValues = budgetedOverview.cost_breakdown;
      Object.keys(targetValues).forEach(key => {
        let start = 0;
        const end = targetValues[key as keyof CostBreakdown];
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const current = start + (end - start) * progress;
          
          setAnimatedValues(prev => ({ ...prev, [key]: current }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      });
    }
  }, [budgetedOverview]);
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
      <div className="w-full border-rounded-lg shadow-none">
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden rounded-2xl p-4 border-rounded-lg">
          {/* Simplified Background */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="relative px-6 py-12 text-center">
            {/* Compact Hero Section */}
            {/* <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300">
                <Sparkles className="w-10 h-10 text-blue-900 animate-pulse"  color='blue'/>
              </div>
            </div> */}

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Compact Hero Text */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  AI-Powered Travel Planner
                </h2>
                <p className="text-gray-600">
                  Multi-tier budgets • Real-time pricing • Voice-first experience
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  <span>Powered by Amadeus API</span>
                </div>
              </div>

              {/* Horizontal Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-2">
                {[
                  { 
                    icon: <Target className="w-4 h-4" color='blue'/>, 
                    label: "Smart Budgeting", 
                    desc: "3-tier pricing options", 
                    color: "from-green-400 to-emerald-500",
                    bgColor: "from-green-50 to-emerald-50"
                  },
                  { 
                    icon: <Zap className="w-4 h-4" color='blue'/>, 
                    label: "Live Data", 
                    desc: "Real-time prices & availability", 
                    color: "from-yellow-400 to-orange-500",
                    bgColor: "from-yellow-50 to-orange-50"
                  },
                  { 
                    icon: <Users className="w-4 h-4" color='blue'/>, 
                    label: "AI Personalized", 
                    desc: "Smart recommendations", 
                    color: "from-purple-400 to-pink-500",
                    bgColor: "from-purple-50 to-pink-50"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300 h-24"
                  >
                    <div className={`bg-gradient-to-br ${feature.bgColor} border border-white/50 rounded-xl p-4 hover:shadow-sm transition-shadow duration-300 h-full`}>
                      <div className="flex items-center h-full">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white flex-shrink-0 px-3`}>
                          {feature.icon}
                        </div>
                        <div className="text-left flex-1 ml-3">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight">{feature.label}</h4>
                          <p className="text-xs text-gray-600 leading-tight mt-1">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Demo Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-sm px-4 py-2">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Voice Input Example</span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border-l-3 border-blue-400 mb-3">
                  <p className="text-sm font-medium text-gray-800">
                    "Plan a ₹50K entertainment trip to New York for 7 days"
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3" />
                    <span>Budgeted: ₹40K</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3" />
                    <span>Premium: ₹65K</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ArrowRight className="w-3 h-3" />
                    <span>Luxury: ₹90K</span>
                  </span>
                </div>
              </div>

              {/* Compact Call to Action */}
              <div className="pt-2">
                <div className="group">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="font-medium">Start Planning Your Trip</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Click the microphone icon to begin voice planning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cost breakdown visualization component
  const CostBreakdownChart = ({ overview }: { overview: TierOverview }) => {
    const costItems = [
      { key: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" />, color: 'bg-blue-500' },
      { key: 'hotels', label: 'Hotels', icon: <MapPin className="w-4 h-4" />, color: 'bg-green-500' },
      { key: 'activities', label: 'Activities', icon: <Star className="w-4 h-4" />, color: 'bg-purple-500' },
      { key: 'meals', label: 'Meals', icon: <span className="text-sm">🍽️</span>, color: 'bg-orange-500' },
      { key: 'commute', label: 'Transport', icon: <span className="text-sm">🚗</span>, color: 'bg-red-500' }
    ];

    const maxValue = Math.max(...Object.values(overview.cost_breakdown));

    return (
      <div className="space-y-4">
        {costItems.map((item) => {
          const value = overview.cost_breakdown[item.key as keyof CostBreakdown];
          const percentage = (value / overview.total_cost) * 100;
          const animatedValue = animatedValues[item.key] || 0;
          
          return (
            <div key={item.key} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">₹{Math.round(animatedValue).toLocaleString()}</span>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out group-hover:opacity-80`}
                    style={{ width: `${(animatedValue / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Header with Trip Overview */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 ">
          <CardHeader className="bg-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <span>{destination || 'Your Trip'}</span>
                </CardTitle>
          {dates && (
                  <p className="text-muted-foreground flex items-center space-x-2 mt-2">
              <Calendar className="w-4 h-4" />
              <span>{dates}</span>
            </p>
          )}
              </div>
              
              {budgetedOverview && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{budgetedOverview.total_cost.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{budgetedOverview.duration}</div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                    <Users className="w-3 h-3" />
                    <span>{budgetedOverview.total_travellers.adults + budgetedOverview.total_travellers.kids} travelers</span>
                  </div>
                </div>
              )}
            </div>
        </CardHeader>
        </div>
      </Card>

      {/* Interactive Cost Breakdown */}
      {budgetedOverview && (
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Cost Breakdown</span>
              <Badge className="bg-green-100 text-green-800">Budgeted Tier</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
            <CostBreakdownChart overview={budgetedOverview} />
          </CardContent>
        </Card>
      )}

      {/* Tier Comparison Widget */}
      {(budgetedOverview || premiumOverview || luxuryOverview) && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Compare Tiers</span>
              <Badge className="bg-blue-100 text-blue-800">Multi-Tier Planning</Badge>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Choose your perfect balance of budget and experience
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  tier: 'budgeted', 
                  overview: budgetedOverview, 
                  name: 'Budgeted', 
                  color: 'from-green-500 to-emerald-600',
                  bgColor: 'from-green-50 to-emerald-50',
                  icon: <Target className="w-5 h-5" />,
                  description: 'Smart savings'
                },
                { 
                  tier: 'premium', 
                  overview: premiumOverview, 
                  name: 'Premium', 
                  color: 'from-blue-500 to-indigo-600',
                  bgColor: 'from-blue-50 to-indigo-50',
                  icon: <Star className="w-5 h-5" />,
                  description: 'Enhanced comfort'
                },
                { 
                  tier: 'luxury', 
                  overview: luxuryOverview, 
                  name: 'Luxury', 
                  color: 'from-purple-500 to-pink-600',
                  bgColor: 'from-purple-50 to-pink-50',
                  icon: <Sparkles className="w-5 h-5" />,
                  description: 'Ultimate experience'
                }
              ].map((tierData) => {
                if (!tierData.overview) return null;
                
                const isSelected = selectedTier === tierData.tier;
                
                return (
                  <div
                    key={tierData.tier}
                    className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-1 ${
                      isSelected 
                        ? `bg-gradient-to-br ${tierData.color} shadow-lg scale-105` 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedTier(tierData.tier as 'budgeted' | 'premium' | 'luxury')}
                  >
                    <div className={`bg-white rounded-xl p-6 h-full ${isSelected ? 'shadow-inner' : ''}`}>
                      <div className="text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${tierData.color} flex items-center justify-center text-white`}>
                          {tierData.icon}
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                          {tierData.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4">{tierData.description}</p>
                        
                        <div className="space-y-3">
                          <div className={`text-2xl font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                            ₹{tierData.overview.total_cost.toLocaleString()}
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            {Object.entries(tierData.overview.cost_breakdown).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key}:</span>
                                <span className="font-medium">₹{value.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                          
                          {isSelected && (
                            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                              <div className="flex items-center space-x-2 text-sm text-blue-800">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">Currently Selected</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Daily Itinerary */}
      {hasApiData ? (
        // Render day-wise data from API with enhanced styling
        dayWiseData.map((dayData) => {
          const isExpanded = expandedDay === dayData.day;
          const dayTotal = dayData.schedule.reduce((sum, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price || 0;
            return sum + price;
          }, 0);
          
          return (
            <Card key={dayData.day} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-1">
                <CardHeader 
                  className="bg-white rounded-lg cursor-pointer"
                  onClick={() => setExpandedDay(isExpanded ? null : dayData.day)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                        {dayData.day}
                      </div> */}
                      <div>
                        <span className="text-lg">Day {dayData.day}</span>
                        <div className="text-sm text-gray-500 font-normal">
                          {dayData.schedule.length} activities
                        </div>
                      </div>
                    </CardTitle>
                    
                    <div className="flex items-center space-x-3">
                      {dayTotal > 0 && (
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">₹{dayTotal.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">day total</div>
                        </div>
                      )}
                      <div className="transition-transform duration-200">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </div>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Timeline visualization */}
                    <div className="relative">
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200"></div>
                      
                      {dayData.schedule.map((scheduleItem, index) => (
                        <div
                          key={`${dayData.day}-${index}`}
                          className="relative flex items-start space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group"
                        >
                          {/* Timeline dot */}
                          <div className="relative z-10 w-12 h-12 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center group-hover:border-blue-300 transition-colors">
                      {getTypeIcon(scheduleItem.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <Badge className={`${getTypeColor(scheduleItem.type)} font-medium`}>
                              {scheduleItem.type}
                            </Badge>
                            {(scheduleItem.departure_time || scheduleItem.start_time || scheduleItem.check_in || scheduleItem.time) && (
                                    <span className="text-sm text-gray-600 flex items-center bg-gray-100 px-2 py-1 rounded-full">
                                <Clock className="w-3 h-3 mr-2" />
                                {scheduleItem.departure_time || scheduleItem.start_time || scheduleItem.check_in || scheduleItem.time}
                              </span>
                            )}
                          </div>
                          
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">
                            {scheduleItem.name || 
                             scheduleItem.flight_name ||
                             (scheduleItem.airline && `${scheduleItem.airline} Flight`) ||
                             (scheduleItem.from && scheduleItem.to && `${scheduleItem.from} to ${scheduleItem.to}`) ||
                             `${scheduleItem.type.charAt(0).toUpperCase() + scheduleItem.type.slice(1)}`}
                          </h4>
                          
                          {scheduleItem.description && (
                                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                              {scheduleItem.description}
                            </p>
                          )}
                          
                          {scheduleItem.location && (
                            <div className="text-sm text-gray-600 mb-2">
                              {typeof scheduleItem.location === 'string' ? (
                                <p className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{scheduleItem.location}</span>
                                </p>
                              ) : (
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium">Location Coordinates</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                      <span className="text-gray-500">Latitude:</span>
                                      <span className="ml-1 font-mono">
                                        {typeof scheduleItem.location === 'object' ? scheduleItem.location.latitude : ''}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">Longitude:</span>
                                      <span className="ml-1 font-mono">
                                        {typeof scheduleItem.location === 'object' ? scheduleItem.location.longitude : ''}
                                      </span>
                                    </div>
                                  </div>
                                  <button 
                                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                                    onClick={() => {
                                      if (scheduleItem.location && typeof scheduleItem.location === 'object') {
                                        window.open(`https://maps.google.com/?q=${scheduleItem.location.latitude},${scheduleItem.location.longitude}`, '_blank');
                                      }
                                    }}
                                  >
                                    <Globe className="w-3 h-3" />
                                    <span>View on Map</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Activity booking URL */}
                          {scheduleItem.type === 'activity' && scheduleItem.bookingUrl && (
                            <div className="mt-2">
                              <Button 
                                size="sm" 
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                onClick={() => window.open(scheduleItem.bookingUrl, '_blank')}
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Book Activity
                              </Button>
                            </div>
                          )}
                                
                                {/* Enhanced flight details */}
                                {scheduleItem.type === 'flight' && (
                                  <div className="bg-blue-50 rounded-lg p-4 mt-2">
                                    <div className="space-y-3">
                                      {scheduleItem.flight_origin && scheduleItem.flight_destination && (
                                        <div className="bg-white rounded-lg p-3">
                                          <div className="flex items-center justify-between">
                                            <div className="text-center">
                                              <div className="font-bold text-lg text-blue-800">{scheduleItem.flight_origin}</div>
                                              <div className="text-xs text-gray-500">Departure</div>
                                              {scheduleItem.departure_time && (
                                                <div className="text-sm font-medium">{scheduleItem.departure_time}</div>
                                              )}
                                            </div>
                                            <div className="flex items-center space-x-2 text-blue-600">
                                              <Plane className="w-5 h-5" />
                                              {scheduleItem.flight_duration && (
                                                <span className="text-xs font-medium">{scheduleItem.flight_duration}</span>
                                              )}
                                            </div>
                                            <div className="text-center">
                                              <div className="font-bold text-lg text-blue-800">{scheduleItem.flight_destination}</div>
                                              <div className="text-xs text-gray-500">Arrival</div>
                                              {scheduleItem.arrival_time && (
                                                <div className="text-sm font-medium">{scheduleItem.arrival_time}</div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        {scheduleItem.class && (
                                          <div>
                                            <span className="text-gray-500">Class:</span>
                                            <span className="ml-2 font-medium">{scheduleItem.class}</span>
                                          </div>
                                        )}
                                        {scheduleItem.airline && (
                                          <div>
                                            <span className="text-gray-500">Airline:</span>
                                            <span className="ml-2 font-medium">{scheduleItem.airline}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Enhanced hotel details */}
                                {scheduleItem.type === 'hotel' && (
                                  <div className="bg-green-50 rounded-lg p-4 mt-2">
                                    <div className="space-y-3">
                                      {/* Hotel timing information */}
                                      {(scheduleItem.check_in || scheduleItem.check_in_time) && (
                                        <div className="bg-white rounded-lg p-3">
                                          <div className="flex items-center justify-center">
                                            <div className="text-center">
                                              <div className="text-sm text-gray-500 mb-1">Check-in</div>
                                              <div className="font-semibold text-green-700">
                                                {scheduleItem.check_in_time || scheduleItem.check_in}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {/* Amenities */}
                                      {scheduleItem.amenities && scheduleItem.amenities.length > 0 && (
                                        <div className="text-sm">
                                          <span className="text-gray-500 font-medium">Amenities:</span>
                                          <div className="mt-2 flex flex-wrap gap-1">
                                            {scheduleItem.amenities.map((amenity, i) => (
                                              <span key={i} className="bg-white px-2 py-1 rounded text-xs text-gray-600 border">
                                                {amenity}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                          
                          {scheduleItem.price && (
                                  <div className="flex items-center justify-between mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                    <div className="flex items-center space-x-2">
                                      <CreditCard className="w-5 h-5 text-green-600" />
                                      <span className="font-semibold text-green-800">₹{scheduleItem.price.toLocaleString()}</span>
                              </div>
                                    {/* <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <ShoppingCart className="w-4 h-4 mr-2" />
                                      Book Now
                                    </Button> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                    </div>
              </div>
            </CardContent>
              )}
          </Card>
          );
        })
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
                              <span>{item.location}</span>
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

      {/* Enhanced Upsell Options */}
      {upsellOptions.length > 0 && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 p-1">
            <CardHeader className="bg-white rounded-lg">
            <CardTitle className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div> */}
                <span>Upgrade Your Experience</span>
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-0">
                  Limited Time
                </Badge>
            </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Enhance your trip with premium upgrades
              </p>
          </CardHeader>
          </div>
          
          <CardContent className="pt-4">
            <div className="space-y-3 mb-4">
              {upsellOptions.map((option, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-700 border-rounded-lg"
                  style={{border: '1px solid #e0e0e0', borderRadius: '10px'}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 via-amber-50/50 to-orange-50/0 border-rounded-lg"></div>
                  
                  <div className="relative p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {getTypeIcon(option.upsell_type)}
                    </div> */}
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg text-gray-900">{option.upsell_name}</h4>
                            <Badge className={getTypeColor(option.upsell_type)}>
                              {option.upsell_type}
                          </Badge>
                          </div>
                          
                          {option.upsell_benefits && option.upsell_benefits.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              {option.upsell_benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Value proposition */}
                          <div className="flex items-center space-x-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                {option.upsell_type === 'flight' ? '50% more comfort' : 
                                 option.upsell_type === 'hotel' ? '4-star experience' : 
                                 'Premium experience'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-600">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>Highly recommended</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="mb-2">
                          <div className="text-sm text-gray-500 line-through">
                            ₹{(option.upsell_price * 1.2).toLocaleString()}
                          </div>
                          <div className="text-2xl font-bold text-orange-600">
                            +₹{option.upsell_price.toLocaleString()}
                          </div>
                          <div className="text-xs text-green-600 font-medium">Save 20%</div>
                        </div>
                        
                        {/* <Button 
                          size="lg" 
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Upgrade Now
                        </Button> */}
                        
                        
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating badge for popular upgrades */}
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                      Most Popular
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Upgrade summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Total Upgrades Available</h4>
                    <p className="text-sm text-gray-600">
                      Save up to ₹{(upsellOptions.reduce((sum, opt) => sum + opt.upsell_price, 0) * 0.2).toLocaleString()} with bundle
                    </p>
                  </div>
                </div>
                {/* <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  View All Upgrades
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Action Center */}
      {(hasApiData || itinerary.length > 0) && (
        <Card className="overflow-hidden sticky bottom-4 z-10">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
            <CardContent className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white">Ready to Book?</h3>
                    <p className="text-sm text-white">
                      {budgetedOverview ? 
                        `Complete trip for ₹${budgetedOverview.total_cost.toLocaleString()}` : 
                        'Secure your perfect trip today'
                      }
                    </p>
                    
                    {/* Progress indicators */}
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-xs text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Itinerary Ready</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-blue-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Real-time Pricing</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-purple-600">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Amadeus Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Customize
                  </Button> */}
                  
                  <Button 
                    size="lg" 
                    onClick={onBookCompleteTrip}
                    disabled={isBooking || !apiResponse?.id || !propSelectedTier}
                    className={`${lastBooking ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700'} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8`}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : lastBooking ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Trip Booked!
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Book Complete Trip
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Booking error display */}
              {bookingError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Booking Failed</span>
                  </div>
                  <p className="text-red-700 mt-1">{bookingError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetBookingState}
                    className="mt-2 text-red-700 border-red-300 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {/* Success message */}
              {lastBooking && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Booking Successful!</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    Your complete trip has been booked successfully! 
                    {lastBooking.bookingReference && (
                      <span className="font-medium"> Reference: {lastBooking.bookingReference}</span>
                    )}
                  </p>
                </div>
              )}
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-8 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span>Free Cancellation</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">🔒</span>
                  </div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">⚡</span>
                  </div>
                  <span>Instant Confirmation</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xs">📞</span>
                  </div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  );
};