import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AspectRatio } from './ui/aspect-ratio';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ItineraryDisplay } from './ItineraryDisplay';
import { DetailedBookingView } from './DetailedBookingView';
import { transformItineraryResponse, getCostBreakdown, getFormattedPrice } from '../utils/itineraryTransform';
import { ItineraryApiResponse } from '../types/api';
import { TierType } from './TierSelector';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Play, 
  Heart,
  Share,
  Camera,
  Video,
  Plane,
  Hotel,
  Utensils,
  Settings,
  ArrowRight,
  MessageSquare,
  Grid,
  List,
  BarChart3
} from 'lucide-react';

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

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  location: string;
  category: string;
}

interface BookingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  itemCount: number;
  priceRange: string;
  image: string;
  color: string;
}


interface EnhancedItineraryViewProps {
  itinerary: ItineraryItem[];
  destination: string;
  dates: string;
  onEditItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onBackToChat: () => void;
  onProceedToTiers: () => void;
  selectedTier?: string;
  apiResponse?: ItineraryApiResponse; // New prop for API response
}

export const EnhancedItineraryView: React.FC<EnhancedItineraryViewProps> = ({
  itinerary,
  destination,
  dates,
  onEditItem,
  onDeleteItem,
  onBackToChat,
  onProceedToTiers,
  selectedTier,
  apiResponse
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'itinerary' | 'media'>('overview');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState('all');
  const [selectedBookingCategory, setSelectedBookingCategory] = useState<string | null>(null);

  // Transform API response if available
  const transformedData = apiResponse ? transformItineraryResponse(apiResponse) : null;
  
  // Map tier names correctly (UI uses economy/premium/luxury, API uses budgeted/premium/luxury)
  const tierMapping: Record<TierType, string> = {
    'economy': 'budgeted',
    'premium': 'premium', 
    'luxury': 'luxury'
  };
  
  const currentTier = selectedTier as TierType || 'economy';
  const apiTierName = tierMapping[currentTier];
  // Extract day-wise itinerary from API response
  const rawTierData = (transformedData?.rawResponse?.generatedItinerary as any)?.[apiTierName] || 
                      (transformedData?.rawResponse?.generatedItinerary as any)?.['budgeted'] || 
                      Object.values(transformedData?.rawResponse?.generatedItinerary || {})[0];
  
  const dayWiseItinerary = rawTierData?.days || [];
  const upsellOptions = rawTierData?.upsell || [];
  
  // Handle cost breakdown with proper fallbacks
  let costBreakdown = null;
  if (transformedData?.rawResponse?.generatedItinerary) {
    const tierData = (transformedData.rawResponse.generatedItinerary as any)[apiTierName] || 
                    (transformedData.rawResponse.generatedItinerary as any)['budgeted'] || 
                    Object.values(transformedData.rawResponse.generatedItinerary)[0];
    costBreakdown = getCostBreakdown(tierData);
  } else {
    // Fallback cost breakdown when no data is available
    costBreakdown = getCostBreakdown(undefined);
  }

  // Mock media data based on destination
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1574631034909-0343b5ad92a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwdHJhdmVsfGVufDF8fHx8MTc1NzA2MjQ3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Eiffel Tower at Sunrise',
      description: 'Experience the magic of Paris iconic landmark in the early morning light',
      location: 'Champ de Mars',
      category: 'attractions'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1697599211453-4d9ada19c72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGxvdXZyZSUyMG11c2V1bXxlbnwxfHx8fDE3NTcxNTIwOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Louvre Museum',
      description: 'World\'s largest art museum with incredible masterpieces',
      location: 'Rue de Rivoli',
      category: 'culture'
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1621327017866-6fb07e6c96ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGZyZW5jaCUyMGZvb2QlMjBkaW5pbmd8ZW58MXx8fHwxNzU3MTU0MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'French Cuisine Experience',
      description: 'Authentic French dining in charming bistros',
      location: 'Latin Quarter',
      category: 'dining'
    },
    {
      id: '4',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHx8MTc1NzE1MzMzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Paris City Walk',
      description: 'A virtual tour through the streets of Paris',
      location: 'Various',
      category: 'attractions'
    },
    {
      id: '5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MTUzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Luxury Hotel Rooms',
      description: 'Elegant accommodations in the heart of Paris',
      location: 'Central Paris',
      category: 'accommodation'
    }
  ];

  // Helper function to count items by type from day-wise schedule AND upsell options
  const getItemCountByType = (type: string): number => {
    // Count from day-wise schedule
    const scheduleCount = dayWiseItinerary.reduce((count: number, day: any) => {
      return count + day.schedule.filter((item: any) => item.type === type).length;
    }, 0);
    
    // Count from upsell options
    const upsellCount = upsellOptions.filter((option: any) => option.type === type).length;
    
    return scheduleCount + upsellCount;
  };

  // Generate booking categories from API data
  const bookingCategories: BookingCategory[] = [
    {
      id: 'flights',
      name: 'Flights',
      icon: <Plane className="w-5 h-5" />,
      description: 'Direct flights and connections',
      itemCount: getItemCountByType('flight'),
      priceRange: costBreakdown ? `${getFormattedPrice(costBreakdown.flights)}` : '₹37,000 - ₹1,80,000',
      image: 'https://images.unsplash.com/photo-1556388158-158dc78cd3f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodHxlbnwxfHx8fDE3NTcxNTMzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'bg-blue-500'
    },
    {
      id: 'hotels',
      name: 'Hotels',
      icon: <Hotel className="w-5 h-5" />,
      description: 'From boutique to luxury stays',
      itemCount: getItemCountByType('hotel'),
      priceRange: costBreakdown ? `${getFormattedPrice(costBreakdown.hotels)}` : '₹10,000 - ₹65,000',
      image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB0cmF2ZWx8ZW58MXx8fHwxNzU3MTUzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'bg-green-500'
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: <span className="text-lg">🎯</span>,
      description: 'Tours, attractions & experiences',
      itemCount: getItemCountByType('activity'),
      priceRange: costBreakdown ? `${getFormattedPrice(costBreakdown.activities)}` : '₹3,000 - ₹28,000',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzfGVufDF8fHwxNzU3MTUzMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'bg-orange-500'
    },
    {
      id: 'dining',
      name: 'Dining',
      icon: <Utensils className="w-5 h-5" />,
      description: 'Restaurants & culinary experiences',
      itemCount: getItemCountByType('meal'),
      priceRange: costBreakdown ? `${getFormattedPrice(costBreakdown.meals)}` : '₹3,700 - ₹25,000',
      image: 'https://images.unsplash.com/photo-1621327017866-6fb07e6c96ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGZyZW5jaCUyMGZvb2QlMjBkaW5pbmd8ZW58MXx8fHwxNzU3MTU0MDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      color: 'bg-purple-500'
    }
  ];

  const mediaCategories = [
    { id: 'all', name: 'All Media' },
    { id: 'attractions', name: 'Attractions' },
    { id: 'dining', name: 'Dining' },
    { id: 'culture', name: 'Culture' },
    { id: 'accommodation', name: 'Hotels' }
  ];

  const filteredMedia = selectedMediaCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedMediaCategory);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Destination Hero */}
      <Card className="overflow-hidden">
        <div className="relative h-64">
          <ImageWithFallback
            src={mediaItems[0]?.url || ''}
            alt={transformedData?.globalData.destination || destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{transformedData?.globalData.destination || destination}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{transformedData?.globalData.duration || dates}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{dayWiseItinerary.length || itinerary.length} days planned</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{transformedData?.globalData.numberOfTravellers || 1} traveler(s)</span>
              </div>
            </div>
          </div>
          <div className="absolute top-6 right-6 flex space-x-2">
            <Button size="sm" variant="secondary">
              <Heart className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="secondary">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{dayWiseItinerary.length || itinerary.length}</div>
            <p className="text-sm text-muted-foreground">Days</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{rawTierData?.overview?.duration || '7 days'}</div>
            <p className="text-sm text-muted-foreground">Duration</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{transformedData?.globalData.numberOfTravellers || 1}</div>
            <p className="text-sm text-muted-foreground">People</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {costBreakdown ? getFormattedPrice(costBreakdown.total) : '$2.5k'}
            </div>
            <p className="text-sm text-muted-foreground">Est. Budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Ultra Compact Cost Breakdown */}
      {costBreakdown && (
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">Cost Breakdown</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{getFormattedPrice(costBreakdown.total)}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'flights', label: 'Flights', icon: '✈️', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                { key: 'hotels', label: 'Hotels', icon: '🏨', color: 'bg-green-100 text-green-700 border-green-200' },
                { key: 'activities', label: 'Activities', icon: '🎯', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { key: 'meals', label: 'Meals', icon: '🍽️', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                { key: 'commute', label: 'Transport', icon: '🚗', color: 'bg-gray-100 text-gray-700 border-gray-200' }
              ].map((category) => {
                const amount = costBreakdown[category.key as keyof typeof costBreakdown];
                const percentage = costBreakdown.total > 0 ? (amount / costBreakdown.total) * 100 : 0;
                
                return (
                  <div key={category.key} className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${category.color} text-xs font-medium`}>
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                    <span className="font-semibold">{getFormattedPrice(amount)}</span>
                    <span className="opacity-75">({percentage.toFixed(0)}%)</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      

      {/* Booking Categories Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Available for Booking</h2>
          <Button variant="outline" onClick={onProceedToTiers}>
            View All Options <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookingCategories.map((category) => (
            <Card 
              key={category.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                console.log('Category clicked:', category.id);
                setSelectedBookingCategory(category.id);
              }}
            >
              <div className="relative h-32">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <div className={`${category.color} text-white p-1 rounded`}>
                    {category.icon}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{category.itemCount} options</span>
                  <span className="font-medium">{category.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Media Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trip Inspiration</h2>
          <Button variant="outline" onClick={() => setViewMode('media')}>
            <Camera className="w-4 h-4 mr-1" />
            View All Media
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {mediaItems.slice(0, 3).map((media) => (
            <Card key={media.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <AspectRatio ratio={16/10}>
                <div className="relative">
                  <ImageWithFallback
                    src={media.url}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <h4 className="text-white font-medium text-sm">{media.title}</h4>
                    <p className="text-white/80 text-xs">{media.location}</p>
                  </div>
                </div>
              </AspectRatio>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMediaGallery = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Camera className="w-5 h-5" />
          <span>Trip Media & Inspiration</span>
        </h2>
        <Button variant="outline" onClick={() => setViewMode('overview')}>
          Back to Overview
        </Button>
      </div>

      {/* Media Category Filter */}
      <div className="flex flex-wrap gap-2">
        {mediaCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedMediaCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMediaCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((media) => (
          <Card key={media.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <AspectRatio ratio={16/10}>
              <div className="relative">
                <ImageWithFallback
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover"
                />
                {media.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {media.type === 'video' ? (
                      <><Video className="w-3 h-3 mr-1" />Video</>
                    ) : (
                      <><Camera className="w-3 h-3 mr-1" />Photo</>
                    )}
                  </Badge>
                </div>
              </div>
            </AspectRatio>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">{media.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{media.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{media.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Show detailed booking view if a category is selected
  console.log('selectedBookingCategory:', selectedBookingCategory);
  if (selectedBookingCategory) {
    console.log('Rendering DetailedBookingView for:', selectedBookingCategory);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DetailedBookingView
          category={selectedBookingCategory as 'flights' | 'hotels' | 'activities' | 'dining'}
          selectedTier={(selectedTier || 'economy') as TierType}
          destination={destination}
          onBack={() => setSelectedBookingCategory(null)}
          dayWiseData={dayWiseItinerary}
          upsellOptions={upsellOptions}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Debug info */}
      {selectedBookingCategory && (
        <div className="bg-blue-100 p-4 rounded-lg">
          <p>Debug: Selected category: {selectedBookingCategory}</p>
          <Button onClick={() => setSelectedBookingCategory(null)}>Clear Selection</Button>
        </div>
      )}
      
      {/* Header with Chat Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onBackToChat}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Back to Chat
              </Button>
              
              {/* View Mode Tabs */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                <Button
                  variant={viewMode === 'overview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('overview')}
                >
                  <Grid className="w-4 h-4 mr-1" />
                  Overview
                </Button>
                <Button
                  variant={viewMode === 'itinerary' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('itinerary')}
                >
                  <List className="w-4 h-4 mr-1" />
                  Itinerary
                </Button>
                <Button
                  variant={viewMode === 'media' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('media')}
                >
                  <Camera className="w-4 h-4 mr-1" />
                  Media
                </Button>
              </div>
            </div>
            
            <Button onClick={onProceedToTiers}>
              <Settings className="w-4 h-4 mr-1" />
              Choose a Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content based on view mode */}
      {viewMode === 'overview' && renderOverview()}
      {viewMode === 'media' && renderMediaGallery()}
      {viewMode === 'itinerary' && (
        <ItineraryDisplay
          itinerary={itinerary}
          destination={destination}
          dates={dates}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          dayWiseData={dayWiseItinerary}
          upsellOptions={upsellOptions}
        />
      )}
    </div>
  );
};