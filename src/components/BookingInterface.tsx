import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
  Utensils
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
}

interface BookingInterfaceProps {
  selectedTier: TierType;
  destination: string;
  onBookItem: (item: BookingItem) => void;
  bookedItems: string[];
}

export const BookingInterface: React.FC<BookingInterfaceProps> = ({
  selectedTier,
  destination,
  onBookItem,
  bookedItems
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock booking data based on tier
  const getBookingItems = (): BookingItem[] => {
    const baseItems: BookingItem[] = [
      // Flights
      {
        id: 'flight-1',
        type: 'flight',
        name: 'Air France - Economy',
        location: 'JFK → CDG',
        price: selectedTier === 'economy' ? 450 : selectedTier === 'premium' ? 850 : 2200,
        originalPrice: selectedTier === 'economy' ? 520 : selectedTier === 'premium' ? 950 : 2500,
        rating: 4.2,
        reviewCount: 1240,
        image: 'https://images.unsplash.com/photo-1556388158-158dc78cd3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodHxlbnwxfHx8fDE3NTcxNTMzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: selectedTier === 'economy' ? 'Direct flight with standard amenities' : selectedTier === 'premium' ? 'Business class with priority boarding' : 'First class with luxury amenities',
        features: selectedTier === 'economy' ? ['Direct flight', 'In-flight meal', 'Entertainment system'] : selectedTier === 'premium' ? ['Business class', 'Priority boarding', 'Lounge access', 'Extra legroom'] : ['First class', 'Private suite', 'Gourmet dining', 'Personal butler'],
        duration: '8h 30m',
        available: true,
        tier: ['economy', 'premium', 'luxury']
      },
      // Hotels
      {
        id: 'hotel-1',
        type: 'hotel',
        name: selectedTier === 'economy' ? 'Hotel des Arts' : selectedTier === 'premium' ? 'Le Meurice' : 'The Ritz Paris',
        location: 'Central Paris',
        price: selectedTier === 'economy' ? 120 : selectedTier === 'premium' ? 450 : 800,
        originalPrice: selectedTier === 'economy' ? 150 : selectedTier === 'premium' ? 520 : 950,
        rating: selectedTier === 'economy' ? 4.1 : selectedTier === 'premium' ? 4.7 : 4.9,
        reviewCount: selectedTier === 'economy' ? 890 : selectedTier === 'premium' ? 1340 : 2100,
        image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MTUzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: selectedTier === 'economy' ? 'Comfortable 3-star hotel in central location' : selectedTier === 'premium' ? 'Luxury 4-star hotel with exceptional service' : '5-star palace hotel with world-class amenities',
        features: selectedTier === 'economy' ? ['Free WiFi', 'Continental breakfast', 'Central location'] : selectedTier === 'premium' ? ['Concierge service', 'Spa access', 'Fine dining', 'Room service'] : ['Butler service', 'Michelin restaurant', 'Private spa', 'Chauffeur service'],
        available: true,
        tier: [selectedTier]
      },
      // Activities
      {
        id: 'activity-1',
        type: 'activity',
        name: selectedTier === 'economy' ? 'Eiffel Tower Group Tour' : selectedTier === 'premium' ? 'Private Eiffel Tower Experience' : 'VIP Eiffel Tower with Champagne',
        location: 'Eiffel Tower',
        price: selectedTier === 'economy' ? 35 : selectedTier === 'premium' ? 120 : 350,
        rating: 4.6,
        reviewCount: 2840,
        image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHx8MTc1NzE1MzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description: selectedTier === 'economy' ? 'Group tour with skip-the-line access' : selectedTier === 'premium' ? 'Private guide with historical insights' : 'Exclusive VIP access with champagne tasting',
        features: selectedTier === 'economy' ? ['Skip-the-line', 'Audio guide', '2-hour tour'] : selectedTier === 'premium' ? ['Private guide', 'Skip-the-line', 'Photo session', '3-hour experience'] : ['VIP access', 'Private guide', 'Champagne tasting', 'Professional photos'],
        duration: selectedTier === 'economy' ? '2 hours' : selectedTier === 'premium' ? '3 hours' : '4 hours',
        available: true,
        tier: [selectedTier]
      },
      // Restaurants
      {
        id: 'restaurant-1',
        type: 'restaurant',
        name: selectedTier === 'economy' ? 'Bistrot Paul Bert' : selectedTier === 'premium' ? 'Le Grand Véfour' : 'L\'Ambroisie',
        location: 'Paris',
        price: selectedTier === 'economy' ? 45 : selectedTier === 'premium' ? 150 : 300,
        rating: selectedTier === 'economy' ? 4.3 : selectedTier === 'premium' ? 4.8 : 5.0,
        reviewCount: selectedTier === 'economy' ? 650 : selectedTier === 'premium' ? 890 : 450,
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc1NzE1MzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description: selectedTier === 'economy' ? 'Traditional French bistro with authentic cuisine' : selectedTier === 'premium' ? 'Michelin-starred restaurant with refined dishes' : '3 Michelin-starred temple of French gastronomy',
        features: selectedTier === 'economy' ? ['Traditional cuisine', 'Wine pairing', 'Cozy atmosphere'] : selectedTier === 'premium' ? ['Michelin star', 'Wine sommelier', 'Tasting menu', 'Historic venue'] : ['3 Michelin stars', 'Master chef', 'Exclusive wines', 'Private dining'],
        category: 'French',
        available: true,
        tier: [selectedTier]
      }
    ];

    return baseItems.filter(item => item.tier.includes(selectedTier));
  };

  const bookingItems = getBookingItems();
  
  const categories = [
    { id: 'all', name: 'All', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'flight', name: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { id: 'hotel', name: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
    { id: 'activity', name: 'Activities', icon: <span className="text-sm">🎯</span> },
    { id: 'restaurant', name: 'Dining', icon: <Utensils className="w-4 h-4" /> },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? bookingItems 
    : bookingItems.filter(item => item.type === selectedCategory);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-4 h-4" />;
      case 'hotel':
        return <Hotel className="w-4 h-4" />;
      case 'activity':
        return <span className="text-sm">🎯</span>;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'transport':
        return <Car className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: TierType) => {
    switch (tier) {
      case 'economy':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'luxury':
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Book Your {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Experience</span>
          </h2>
          <p className="text-muted-foreground">
            Curated {selectedTier} options for {destination}
          </p>
        </div>
        
        <Badge className={getTierColor(selectedTier)}>
          {selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Tier
        </Badge>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            {category.icon}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Booking Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(item.id)}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    favorites.includes(item.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`} 
                />
              </Button>
              <div className="absolute top-2 left-2">
                <Badge className={`${
                  item.type === 'flight' ? 'bg-blue-500' :
                  item.type === 'hotel' ? 'bg-green-500' :
                  item.type === 'activity' ? 'bg-orange-500' :
                  item.type === 'restaurant' ? 'bg-purple-500' :
                  'bg-gray-500'
                } text-white`}>
                  {getTypeIcon(item.type)}
                  <span className="ml-1">{item.type}</span>
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base line-clamp-1">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({item.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {item.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Duration */}
              {item.duration && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
              )}

              <Separator className="my-3" />

              {/* Price and Booking */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    per {item.type === 'hotel' ? 'night' : item.type === 'flight' ? 'person' : 'person'}
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => onBookItem(item)}
                  disabled={bookedItems.includes(item.id)}
                  className={bookedItems.includes(item.id) ? 'bg-green-600' : ''}
                >
                  {bookedItems.includes(item.id) ? (
                    <>
                      <CreditCard className="w-4 h-4 mr-1" />
                      Booked
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Book
                    </>
                  )}
                </Button>
              </div>

              {!item.available && (
                <Badge variant="destructive" className="w-full justify-center mt-2">
                  Currently Unavailable
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-2">
            <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground" />
            <h3>No items found</h3>
            <p className="text-muted-foreground">
              No {selectedCategory === 'all' ? 'booking options' : selectedCategory + ' options'} 
              available for the {selectedTier} tier.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};