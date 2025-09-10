import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { getFormattedPrice } from '../utils/itineraryTransform';
import { 
  Plane, 
  Hotel, 
  MapPin, 
  Clock, 
  Utensils,
  ArrowLeft,
  Car,
  Calendar,
  Users,
  Star
} from 'lucide-react';
import { TierType } from './TierSelector';
import FallBack from './FallBack';

interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'commute';
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
  time?: string;
  groupSize?: string;
  difficulty?: string;
}

interface DayScheduleItem {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name?: string;
  description?: string;
  location?: string | { latitude: number; longitude: number };
  price?: number;
  start_time?: string;
  end_time?: string;
  duration?: string;
  airline?: string;
  flight_number?: string;
  departure_time?: string;
  arrival_time?: string;
  from?: string;
  to?: string;
  check_in?: string;
  check_out?: string;
  room_type?: string;
  amenities?: string[];
  cuisine?: string;
  dress_code?: string;
  group_size?: string;
  difficulty?: string;
}

interface DayWiseData {
  day: number;
  schedule: DayScheduleItem[];
}

interface UpsellOption {
  upsell_type: string;
  upsell_name: string;
  upsell_price: number;
  upsell_benefits: string[];
  upsell_description?: string;
  upsell_link?: string;
}

interface DetailedBookingViewProps {
  category: 'flights' | 'hotels' | 'activities' | 'dining' | 'commute';
  selectedTier: TierType;
  destination: string;
  onBack: () => void;
  dayWiseData?: DayWiseData[];
  upsellOptions?: UpsellOption[];
  tierData?: any; // Direct access to tier data
}

export const DetailedBookingView: React.FC<DetailedBookingViewProps> = ({
  category,
  selectedTier,
  destination,
  onBack,
  upsellOptions = [],
  tierData
}) => {

  // Get fallback content using the FallBack component
  const getFallbackContent = () => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200">
        <FallBack />
      </div>
    );
  };

  // Open location in Google Maps
  const openInGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Extract booking items using correct data sources based on category
  const getBookingItems = (): BookingItem[] => {
    const allItems: BookingItem[] = [];
    
    // Debug: Log the tier data being processed
    console.log('DetailedBookingView - Category:', category);
    console.log('DetailedBookingView - Selected tier:', selectedTier);
    console.log('DetailedBookingView - Tier data:', tierData);
    
    if (!tierData) {
      console.log('No tier data available');
      return allItems;
    }
    
    let categoryItems: any[] = [];
    
    // Get items from correct data sources based on category
    switch (category) {
      case 'flights':
        categoryItems = tierData.flights || [];
        break;
      case 'hotels':
        categoryItems = tierData.hotels || [];
        break;
      case 'activities':
        // Extract from days schedule
        categoryItems = [];
        if (tierData.days && Array.isArray(tierData.days)) {
          tierData.days.forEach((day: any) => {
            if (day.schedule && Array.isArray(day.schedule)) {
              day.schedule.forEach((item: any) => {
                if (item.type === 'activity') {
                  categoryItems.push({
                    ...item,
                    day: day.day,
                    id: `day-${day.day}-activity-${categoryItems.length}`
                  });
                }
              });
            }
          });
        }
        break;
      case 'dining':
        // Extract from days schedule
        categoryItems = [];
        if (tierData.days && Array.isArray(tierData.days)) {
          tierData.days.forEach((day: any) => {
            if (day.schedule && Array.isArray(day.schedule)) {
              day.schedule.forEach((item: any) => {
                if (item.type === 'meal') {
                  categoryItems.push({
                    ...item,
                    day: day.day,
                    id: `day-${day.day}-meal-${categoryItems.length}`
                  });
                }
              });
            }
          });
        }
        break;
      case 'commute':
        // Extract from days schedule
        categoryItems = [];
        if (tierData.days && Array.isArray(tierData.days)) {
          tierData.days.forEach((day: any) => {
            if (day.schedule && Array.isArray(day.schedule)) {
              day.schedule.forEach((item: any) => {
                if (item.type === 'commute') {
                  categoryItems.push({
                    ...item,
                    day: day.day,
                    id: `day-${day.day}-commute-${categoryItems.length}`
                  });
                }
              });
            }
          });
        }
        break;
    }
    
    console.log(`Category ${category} items:`, categoryItems);
    
    // Convert items to BookingItem format
    categoryItems.forEach((item: any, index: number) => {
      // Create proper name for different categories
      let itemName = item.name || item[`${category.slice(0, -1)}_name`];
      if (category === 'commute' && !itemName) {
        itemName = `${item.mode || 'Transport'} from ${item.from || 'Unknown'} to ${item.to || 'Unknown'}`;
      } else if (category === 'activities' && !itemName) {
        itemName = `Activity ${index + 1}`;
      } else if (category === 'dining' && !itemName) {
        itemName = `Restaurant ${index + 1}`;
      } else if (!itemName) {
        itemName = `${category.charAt(0).toUpperCase() + category.slice(1)} ${index + 1}`;
      }

      const bookingItem: BookingItem = {
        id: item.id || `${category}-${index}`,
        type: category as 'flight' | 'hotel' | 'activity' | 'restaurant' | 'commute',
        name: itemName,
        location: item.location || item.address || item[`${category.slice(0, -1)}_address`] || 
                 (category === 'commute' ? `${item.from} → ${item.to}` : 
                  category === 'flights' && item.flight_origin && item.flight_destination ? 
                  `${item.flight_origin} → ${item.flight_destination}` : undefined),
        price: item.price || item[`${category.slice(0, -1)}_price`] || undefined,
        description: item.description || item[`${category.slice(0, -1)}_description`] || 
                   (category === 'commute' ? `${item.mode} transportation` : undefined),
        duration: item.duration || item[`${category.slice(0, -1)}_duration`] || 
                 (category === 'commute' && item.departure_time && item.arrival_time ? 
                  `${item.departure_time} - ${item.arrival_time}` : 
                  category === 'flights' ? item.flight_duration : undefined),
        available: true,
        tier: [selectedTier],
        // Flight specific data
        departureTime: item.departure_time || item[`${category.slice(0, -1)}_departure_time`] || item.flight_time,
        arrivalTime: item.arrival_time || item[`${category.slice(0, -1)}_arrival_time`],
        airline: item.airline || item[`${category.slice(0, -1)}_airline`] || (item.flight_name ? item.flight_name.split(' ')[0] : undefined),
        flightNumber: item.flight_number || item[`${category.slice(0, -1)}_number`] || item.flight_name,
        // Hotel specific data
        checkIn: item.check_in || item[`${category.slice(0, -1)}_check_in`] || item.hotel_check_in_date,
        checkOut: item.check_out || item[`${category.slice(0, -1)}_check_out`] || item.hotel_check_out_date,
        roomType: item.room_type || item[`${category.slice(0, -1)}_room_type`] || item.hotel_room_type,
        amenities: item.amenities || item[`${category.slice(0, -1)}_amenities`],
        // Restaurant specific data
        cuisine: item.cuisine || item[`${category.slice(0, -1)}_cuisine`],
        dressCode: item.dress_code || item[`${category.slice(0, -1)}_dress_code`],
        time: item.time || item[`${category.slice(0, -1)}_time`],
        // Activity specific data
        groupSize: item.group_size || item[`${category.slice(0, -1)}_group_size`],
        difficulty: item.difficulty || item[`${category.slice(0, -1)}_difficulty`]
      };
      allItems.push(bookingItem);
    });
    
    // Note: Upsell options are displayed separately in the upsell section below
    // They are not added to the main items list to avoid duplication
    
    console.log(`Total items found for ${category}:`, allItems.length);
    return allItems;
  };

  const bookingItems = getBookingItems();

  const categoryInfo = {
    flights: { icon: <Plane className="w-4 h-4 stroke-1" />, color: '', title: 'Flight Options' },
    hotels: { icon: <Hotel className="w-4 h-4 stroke-1" />, color: '', title: 'Hotel Options' },
    activities: { icon: <span className="text-sm">🎯</span>, color: '', title: 'Activity Options' },
    dining: { icon: <Utensils className="w-4 h-4 stroke-1" />, color: '', title: 'Dining Options' },
    commute: { icon: <Car className="w-4 h-4 stroke-1" />, color: '', title: 'Commute Options' }
  };

  const currentCategory = categoryInfo[category];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        <div className="flex items-center gap-3">
            {currentCategory.icon}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentCategory.title}</h1>
            <p className="text-muted-foreground">Available options for {destination}</p>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {bookingItems.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <div className="text-muted-foreground mb-4">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold mb-2">No {category} available</h3>
              <p>There are currently no {category} options available for this tier.</p>
        </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="h-48 bg-muted relative">
                      {getFallbackContent()}
                      {item.available && (
                        <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
                          Available
                        </Badge>
                  )}
              </div>
              
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {item.name}
                        </h3>
                        {/* Only show price if it exists and is greater than 0 */}
                        {item.price && typeof item.price === 'number' && item.price > 0 && (
                          <div className="text-right ml-2">
                            <div className="text-lg font-bold text-primary">
                              {getFormattedPrice(item.price)}
                            </div>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <div className="text-sm text-muted-foreground line-through">
                                {getFormattedPrice(item.originalPrice)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                          {item.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <div className="flex items-center gap-2">
                            {typeof item.location === 'string' ? (
                              <span className="line-clamp-1">{item.location}</span>
                            ) : typeof item.location === 'object' && 
                                 item.location && 
                                 (item.location as any).latitude && 
                                 (item.location as any).longitude ? (
                              <button
                                onClick={() => openInGoogleMaps((item.location as any).latitude, (item.location as any).longitude)}
                                className="text-blue-600 hover:text-blue-800 underline text-xs font-medium cursor-pointer"
                              >
                                Open in Google Maps
                              </button>
                            ) : null}
                          </div>
                        </div>
                      )}

                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Category-specific details */}
                      {category === 'flights' && (
                        <div className="space-y-2 mb-3">
                          {item.departureTime && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{item.departureTime}</span>
                            </div>
                          )}
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {category === 'hotels' && (
                        <div className="space-y-2 mb-3">
                          {item.roomType && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Hotel className="w-4 h-4" />
                              <span>{item.roomType}</span>
                            </div>
                          )}
                          {item.checkIn && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Check-in: {item.checkIn}</span>
                            </div>
                          )}
                          {item.checkOut && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Check-out: {item.checkOut}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {category === 'activities' && (
                        <div className="space-y-2 mb-3">
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                          {item.difficulty && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Star className="w-4 h-4" />
                              <span>{item.difficulty}</span>
                            </div>
                          )}
                          {item.groupSize && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{item.groupSize}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {category === 'dining' && (
                        <div className="space-y-2 mb-3">
                          {item.cuisine && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Utensils className="w-4 h-4" />
                              <span>{item.cuisine}</span>
                            </div>
                          )}
                          {item.time && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{item.time}</span>
                            </div>
                          )}
                          {item.dressCode && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Star className="w-4 h-4" />
                              <span>{item.dressCode}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {category === 'commute' && (
                        <div className="space-y-2 mb-3">
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Features */}
                      {item.features && item.features.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {item.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {item.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{item.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        
            {/* Upsell Options Section - only show if there are filtered upsells */}
            {(() => {
              const filteredUpsells = upsellOptions?.filter(upsell => {
                if (category === 'flights') return upsell.upsell_type === 'flight';
                if (category === 'hotels') return upsell.upsell_type === 'hotel';
                if (category === 'activities') return upsell.upsell_type === 'activity';
                if (category === 'dining') return upsell.upsell_type === 'restaurant';
                if (category === 'commute') return false; // No commute upsells in current data
                return false;
              }) || [];
              
              return filteredUpsells.length > 0 ? (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">Upgrade Your Experience</h3>
                      <p className="text-muted-foreground">Enhance your trip with these premium options</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUpsells.map((upsell, index) => (
                      <div key={`upsell-${index}`} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center">
                              <span className="text-lg">
                                {upsell.upsell_type === 'flight' && '✈️'}
                                {upsell.upsell_type === 'hotel' && '🏨'}
                                {upsell.upsell_type === 'activity' && '🎯'}
                                {upsell.upsell_type === 'restaurant' && '🍽️'}
                                {upsell.upsell_type === 'transport' && '🚗'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{upsell.upsell_name}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{upsell.upsell_type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ${upsell.upsell_price}
                            </div>
                            <div className="text-xs text-muted-foreground">per person</div>
                      </div>
                    </div>
                    
                        {upsell.upsell_description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {upsell.upsell_description}
                          </p>
                        )}
                        
                        {upsell.upsell_benefits && upsell.upsell_benefits.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {upsell.upsell_benefits.slice(0, 3).map((benefit, benefitIndex) => (
                                <span 
                                  key={benefitIndex}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {benefit}
                                </span>
                              ))}
                              {upsell.upsell_benefits.length > 3 && (
                                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                  +{upsell.upsell_benefits.length - 3} more
                                </span>
                    )}
                </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                            Coming soon...
                          </button>
                          {upsell.upsell_link && (
                            <button className="px-4 py-2 border border-border text-sm font-medium rounded-lg hover:bg-muted transition-colors">
                              Learn More
                            </button>
                          )}
                        </div>
                  </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
        </>
        )}
    </div>
  );
};