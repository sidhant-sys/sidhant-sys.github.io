import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getFormattedPrice } from '../utils/itineraryTransform';
import { 
  Plane, 
  Hotel, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  CreditCard,
  ShoppingCart,
  Heart,
  Wifi,
  Car,
  Utensils,
  ArrowLeft,
  Filter,
  SortAsc,
  Star as StarIcon,
  CheckCircle,
  X
} from 'lucide-react';
import { TierType } from './TierSelector';

interface BookingItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'restaurant' | 'transport';
  name: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  duration?: string;
  category?: string;
  available: boolean;
  tier: TierType[];
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

interface DetailedBookingViewProps {
  category: 'flights' | 'hotels' | 'activities' | 'dining';
  selectedTier: TierType;
  destination: string;
  onBookItem: (item: BookingItem) => void;
  bookedItems: string[];
  onBack: () => void;
}

export const DetailedBookingView: React.FC<DetailedBookingViewProps> = ({
  category,
  selectedTier,
  destination,
  onBookItem,
  bookedItems,
  onBack
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('price');
  const [filterBy, setFilterBy] = useState<string>('all');

  // Generate detailed booking items based on category and tier
  const getBookingItems = (): BookingItem[] => {
    const baseItems: BookingItem[] = [];

    if (category === 'flights') {
      baseItems.push(
        {
          id: 'flight-1',
          type: 'flight',
          name: selectedTier === 'economy' ? 'Air France Economy' : selectedTier === 'premium' ? 'Air France Premium Economy' : 'Air France Business',
          location: `${destination} (CDG)`,
          price: selectedTier === 'economy' ? 450 : selectedTier === 'premium' ? 850 : 2200,
          originalPrice: selectedTier === 'economy' ? 550 : selectedTier === 'premium' ? 950 : 2500,
          rating: 4.2,
          reviewCount: 1200,
          image: 'https://images.unsplash.com/photo-1556388158-158dc78cd3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodHxlbnwxfHx8fDE3NTcxNTMzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          description: selectedTier === 'economy' ? 'Comfortable economy class with meal service' : selectedTier === 'premium' ? 'Premium economy with extra legroom and priority boarding' : 'Business class with lie-flat seats and premium dining',
          features: selectedTier === 'economy' ? ['Meal included', 'Entertainment system', 'WiFi available'] : selectedTier === 'premium' ? ['Extra legroom', 'Priority boarding', 'Premium meals', 'Lounge access'] : ['Lie-flat seats', 'Premium dining', 'Lounge access', 'Priority check-in'],
          duration: '8h 30m',
          departureTime: '14:30',
          arrivalTime: '08:00+1',
          airline: 'Air France',
          flightNumber: 'AF123',
          available: true,
          tier: [selectedTier]
        },
        {
          id: 'flight-2',
          type: 'flight',
          name: selectedTier === 'economy' ? 'Lufthansa Economy' : selectedTier === 'premium' ? 'Lufthansa Premium Economy' : 'Lufthansa Business',
          location: `${destination} (CDG)`,
          price: selectedTier === 'economy' ? 420 : selectedTier === 'premium' ? 780 : 2000,
          originalPrice: selectedTier === 'economy' ? 520 : selectedTier === 'premium' ? 880 : 2300,
          rating: 4.4,
          reviewCount: 980,
          image: 'https://images.unsplash.com/photo-1556388158-158dc78cd3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodHxlbnwxfHx8fDE3NTcxNTMzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
          description: selectedTier === 'economy' ? 'Reliable service with good value' : selectedTier === 'premium' ? 'Enhanced comfort with premium service' : 'Luxury business class experience',
          features: selectedTier === 'economy' ? ['Meal included', 'Entertainment', 'WiFi'] : selectedTier === 'premium' ? ['Extra space', 'Priority service', 'Premium meals'] : ['Flat-bed seats', 'Fine dining', 'Lounge access'],
          duration: '9h 15m',
          departureTime: '16:45',
          arrivalTime: '10:00+1',
          airline: 'Lufthansa',
          flightNumber: 'LH456',
          available: true,
          tier: [selectedTier]
        }
      );
    } else if (category === 'hotels') {
      baseItems.push(
        {
          id: 'hotel-1',
          type: 'hotel',
          name: selectedTier === 'economy' ? 'Hotel des Grands Boulevards' : selectedTier === 'premium' ? 'Hotel Plaza Athénée' : 'The Ritz Paris',
          location: 'Paris, France',
          price: selectedTier === 'economy' ? 120 : selectedTier === 'premium' ? 350 : 800,
          originalPrice: selectedTier === 'economy' ? 150 : selectedTier === 'premium' ? 400 : 950,
          rating: selectedTier === 'economy' ? 4.1 : selectedTier === 'premium' ? 4.7 : 4.9,
          reviewCount: selectedTier === 'economy' ? 450 : selectedTier === 'premium' ? 680 : 320,
          image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MTUzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
          description: selectedTier === 'economy' ? 'Comfortable boutique hotel in central Paris' : selectedTier === 'premium' ? 'Luxury hotel with exceptional service' : 'Iconic luxury hotel with world-class amenities',
          features: selectedTier === 'economy' ? ['WiFi', 'Breakfast', 'Central location'] : selectedTier === 'premium' ? ['Spa', 'Fine dining', 'Concierge', 'Room service'] : ['Michelin restaurant', 'Spa', 'Butler service', 'Historic suites'],
          checkIn: '15:00',
          checkOut: '12:00',
          roomType: selectedTier === 'economy' ? 'Standard Room' : selectedTier === 'premium' ? 'Deluxe Suite' : 'Presidential Suite',
          amenities: selectedTier === 'economy' ? ['WiFi', 'Breakfast', 'Gym'] : selectedTier === 'premium' ? ['Spa', 'Restaurant', 'Concierge', 'Pool'] : ['Michelin restaurant', 'Spa', 'Butler', 'Historic rooms'],
          available: true,
          tier: [selectedTier]
        }
      );
    } else if (category === 'activities') {
      baseItems.push(
        {
          id: 'activity-1',
          type: 'activity',
          name: selectedTier === 'economy' ? 'Eiffel Tower Skip-the-Line' : selectedTier === 'premium' ? 'Private Eiffel Tower Tour' : 'VIP Eiffel Tower Experience',
          location: 'Champ de Mars, Paris',
          price: selectedTier === 'economy' ? 35 : selectedTier === 'premium' ? 120 : 350,
          originalPrice: selectedTier === 'economy' ? 45 : selectedTier === 'premium' ? 150 : 450,
          rating: selectedTier === 'economy' ? 4.3 : selectedTier === 'premium' ? 4.8 : 5.0,
          reviewCount: selectedTier === 'economy' ? 1200 : selectedTier === 'premium' ? 450 : 120,
          image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHx8MTc1NzE1MzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
          description: selectedTier === 'economy' ? 'Skip the long lines and enjoy the iconic tower' : selectedTier === 'premium' ? 'Private guided tour with expert commentary' : 'Exclusive VIP access with champagne service',
          features: selectedTier === 'economy' ? ['Skip-the-line', 'Audio guide', 'Summit access'] : selectedTier === 'premium' ? ['Private guide', 'Summit access', 'Photo service'] : ['VIP access', 'Champagne', 'Private elevator', 'Photographer'],
          duration: selectedTier === 'economy' ? '2 hours' : selectedTier === 'premium' ? '3 hours' : '4 hours',
          groupSize: selectedTier === 'economy' ? 'Group tour' : selectedTier === 'premium' ? 'Small group (max 8)' : 'Private (max 4)',
          difficulty: 'Easy',
          available: true,
          tier: [selectedTier]
        }
      );
    } else if (category === 'dining') {
      baseItems.push(
        {
          id: 'restaurant-1',
          type: 'restaurant',
          name: selectedTier === 'economy' ? 'Bistrot Paul Bert' : selectedTier === 'premium' ? 'Le Grand Véfour' : 'L\'Ambroisie',
          location: 'Paris, France',
          price: selectedTier === 'economy' ? 45 : selectedTier === 'premium' ? 150 : 300,
          originalPrice: selectedTier === 'economy' ? 55 : selectedTier === 'premium' ? 180 : 350,
          rating: selectedTier === 'economy' ? 4.3 : selectedTier === 'premium' ? 4.8 : 5.0,
          reviewCount: selectedTier === 'economy' ? 650 : selectedTier === 'premium' ? 890 : 450,
          image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc1NzE1MzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
          description: selectedTier === 'economy' ? 'Traditional French bistro with authentic cuisine' : selectedTier === 'premium' ? 'Michelin-starred restaurant with refined dishes' : '3 Michelin-starred temple of French gastronomy',
          features: selectedTier === 'economy' ? ['Traditional cuisine', 'Wine pairing', 'Cozy atmosphere'] : selectedTier === 'premium' ? ['Michelin star', 'Wine sommelier', 'Tasting menu', 'Historic venue'] : ['3 Michelin stars', 'Master chef', 'Exclusive wines', 'Private dining'],
          cuisine: 'French',
          dressCode: selectedTier === 'economy' ? 'Casual' : selectedTier === 'premium' ? 'Smart casual' : 'Formal',
          available: true,
          tier: [selectedTier]
        }
      );
    }

    return baseItems;
  };

  const bookingItems = getBookingItems();

  const categoryInfo = {
    flights: { icon: <Plane className="w-6 h-6" />, color: 'bg-blue-500', title: 'Flight Options' },
    hotels: { icon: <Hotel className="w-6 h-6" />, color: 'bg-green-500', title: 'Hotel Options' },
    activities: { icon: <Star className="w-6 h-6" />, color: 'bg-orange-500', title: 'Activity Options' },
    dining: { icon: <Utensils className="w-6 h-6" />, color: 'bg-purple-500', title: 'Dining Options' }
  };

  const currentCategory = categoryInfo[category];

  const sortedItems = [...bookingItems].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className={`p-2 rounded-lg ${currentCategory.color} text-white`}>
            {currentCategory.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentCategory.title}</h2>
            <p className="text-muted-foreground">for {destination}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Tier
          </Badge>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4" />
          <span className="text-sm font-medium">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'name')}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Booking Items Grid */}
      <div className="grid gap-6">
        {sortedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex">
              {/* Image */}
              <div className="w-48 h-48 flex-shrink-0">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      {item.departureTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.departureTime} - {item.arrivalTime}</span>
                        </div>
                      )}
                      {item.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        {getFormattedPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{item.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                  {item.airline && (
                    <div className="flex items-center space-x-1">
                      <Plane className="w-4 h-4" />
                      <span>{item.airline} {item.flightNumber}</span>
                    </div>
                  )}
                  {item.roomType && (
                    <div className="flex items-center space-x-1">
                      <Hotel className="w-4 h-4" />
                      <span>{item.roomType}</span>
                    </div>
                  )}
                  {item.cuisine && (
                    <div className="flex items-center space-x-1">
                      <Utensils className="w-4 h-4" />
                      <span>{item.cuisine}</span>
                    </div>
                  )}
                  {item.groupSize && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{item.groupSize}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {bookedItems.includes(item.id) ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Booked
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Available
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    {!bookedItems.includes(item.id) ? (
                      <Button 
                        onClick={() => onBookItem(item)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Book Now
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={() => {/* Handle unbook */}}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Booking Summary</h4>
              <p className="text-sm text-muted-foreground">
                {bookingItems.length} options available for {selectedTier} tier
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                ${bookingItems.reduce((sum, item) => sum + item.price, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total estimated cost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
