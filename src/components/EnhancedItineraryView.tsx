import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ModernItineraryView } from './ModernItineraryView';
import { DetailedBookingView } from './DetailedBookingView';
import { MediaCarousel, MediaItem } from './MediaCarousel';
import { BudgetOverviewTabs } from './BudgetOverviewTabs';
import { QuickActionsGrid } from './QuickActionsGrid';
import { CurrencyDropdown } from './CurrencyDropdown';
import { ItineraryApiResponse } from '../types/api';
import { TierType } from './TierSelector';
import { useBooking } from '../hooks/useBooking';
import { navigateToConfirmation } from '../utils/navigation';
import tripInspiration1 from '../assets/trip-inspiration1.png';
import tripInspiration2 from '../assets/trip-inspiration2.png';
import { ChevronRight, ShoppingCart } from 'lucide-react';

interface EnhancedItineraryViewProps {
  itinerary: any[];
  destination: string;
  dates: string;
  onBackToChat: () => void;
  selectedTier?: TierType;
  apiResponse?: ItineraryApiResponse;
}

export const EnhancedItineraryView: React.FC<EnhancedItineraryViewProps> = ({
  itinerary,
  destination,
  dates,
  onBackToChat,
  selectedTier = 'budgeted', // Default to budgeted tier
  apiResponse
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'overview' | 'itinerary' | 'media'>('overview');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState('all');
  const [selectedBookingCategory, setSelectedBookingCategory] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<TierType>(selectedTier);
  
  // Booking hook
  const { handleBooking, isBooking } = useBooking({
    onBookingSuccess: (booking) => {
      console.log('Booking successful:', booking);
      // Navigate to confirmation page instead of showing alert
      navigateToConfirmation(navigate, apiResponse?.id || 'default');
    },
    onBookingError: (error) => {
      console.error('Booking failed:', error);
      alert(`Booking failed: ${error}`);
    }
  });
  
  // Get day-wise itinerary directly from the selected tier
  const getTierData = (tier: TierType) => {
    if (!apiResponse?.generatedItinerary) return null;
    
    switch (tier) {
      case 'budgeted':
        return apiResponse.generatedItinerary.budgeted;
      case 'premium':
        return apiResponse.generatedItinerary.premium || apiResponse.generatedItinerary.budgeted;
      case 'luxury':
        return apiResponse.generatedItinerary.luxury || apiResponse.generatedItinerary.budgeted;
      default:
        return apiResponse.generatedItinerary.budgeted;
    }
  };
  
  const selectedTierData = getTierData(currentTier);
  
  // Extract data from the correct paths based on your specification
  const safeDayWiseItinerary = selectedTierData?.days || [];
  const safeUpsellOptions = (selectedTierData as any)?.upsell || [];
  
  // Debug: Log upsell options
  console.log('Current tier:', currentTier);
  console.log('Selected tier data upsell:', (selectedTierData as any)?.upsell);
  console.log('Safe upsell options:', safeUpsellOptions);
  
  // Extract flights and hotels directly from tier
  const flightsData = (selectedTierData as any)?.flights || [];
  const hotelsData = (selectedTierData as any)?.hotels || [];
  
  // Extract activities, meals, and commute from days schedule
  const extractItemsFromDays = (type: 'activity' | 'meal' | 'commute') => {
    const items: any[] = [];
    safeDayWiseItinerary.forEach((day: any) => {
      if (day.schedule && Array.isArray(day.schedule)) {
        day.schedule.forEach((item: any) => {
          if (item.type === type) {
            items.push({
              ...item,
              day: day.day,
              id: `day-${day.day}-${type}-${items.length}`
            });
          }
        });
      }
    });
    return items;
  };
  
  const activitiesData = extractItemsFromDays('activity');
  const mealsData = extractItemsFromDays('meal');
  const commuteData = extractItemsFromDays('commute');
  
  // Debug: Log the day-wise data to see what we're getting
  console.log('Current tier:', currentTier);
  console.log('Selected tier data:', selectedTierData);
  console.log('Day-wise itinerary data:', safeDayWiseItinerary);
  console.log('Day-wise itinerary length:', safeDayWiseItinerary.length);
  console.log('Day numbers in itinerary:', safeDayWiseItinerary.map(d => d.day));
  
  // Get cost breakdown from selected tier
  const costBreakdown = selectedTierData?.overview?.cost_breakdown ? {
    flights: selectedTierData.overview.cost_breakdown.flights || 0,
    hotels: selectedTierData.overview.cost_breakdown.hotels || 0,
    activities: selectedTierData.overview.cost_breakdown.activities || 0,
    meals: selectedTierData.overview.cost_breakdown.meals || 0,
    commute: selectedTierData.overview.cost_breakdown.commute || 0,
    total: selectedTierData.overview.total_cost || 0
  } : null;

  // Experience video
  const experienceVideo = '/experience.mp4';

  // Mock media items for trip inspiration
  const mediaItems = [
    {
      id: 'inspiration-1',
      type: 'image',
      url: tripInspiration1,
      title: 'Parisian Streets',
      description: 'Charming cobblestone streets of Montmartre',
      location: 'Montmartre, Paris',
      category: 'inspiration'
    },
    {
      id: 'inspiration-2',
      type: 'image',
      url: tripInspiration2,
      title: 'Eiffel Tower View',
      description: 'Stunning view of the Eiffel Tower',
      location: 'Central Paris',
      category: 'inspiration'
    }
  ];

  // Convert mediaItems to MediaItem format for carousel
  const carouselMediaItems: MediaItem[] = mediaItems.map(item => ({
    id: item.id,
    type: item.type as 'video' | 'image',
    url: item.url,
    title: item.title,
    description: item.description,
    location: item.location,
    category: item.category
  }));

  // Helper function to count items by type using correct data sources
  const getItemCountByType = (type: string): number => {
    switch (type) {
      case 'flights':
        return flightsData.length;
      case 'hotels':
        return hotelsData.length;
      case 'activities':
        return activitiesData.length;
      case 'dining':
        return mealsData.length;
      case 'transport':
        return commuteData.length;
      default:
        return 0;
    }
  };

  // Get transport count (commute only)
  const getTransportItemCount = (): number => {
    return commuteData.length;
  };

  const renderOverview = () => (
    <div className="flex flex-col col-gap-6">
      {/* Hero Section with Carousel + Budget Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Media Carousel - Left Half */}
        <div className="relative group">
          {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-full -z-10" /> */}
          <div className="rounded-\[8px\] transition-all duration-300">
            <MediaCarousel
              items={carouselMediaItems}
              experienceVideo={experienceVideo}
            destination={apiResponse ? `${apiResponse.from} to ${apiResponse.to}` : destination}
            dates={selectedTierData?.overview?.duration || dates}
            numberOfTravellers={apiResponse?.numberOfTravellers || 1}
              duration={safeDayWiseItinerary.length || itinerary.length}
              onSave={() => {/* Handle save */}}
              onShare={() => {/* Handle share */}}
              className="h-80 w-full"
            />
          </div>
        </div>

        {/* Budget & Overview Tabs - Right Half */}
        <div className="relative group">
          <div className="rounded-\[8px\]  transition-all duration-300">
            <BudgetOverviewTabs
              costBreakdown={costBreakdown ? {
                flights: costBreakdown.flights,
                accommodation: costBreakdown.hotels,
                activities: costBreakdown.activities,
                dining: costBreakdown.meals,
                transport: costBreakdown.commute,
                total: costBreakdown.total
              } : undefined}
              duration={safeDayWiseItinerary.length || itinerary.length}
              numberOfTravellers={apiResponse?.numberOfTravellers || 1}
              rating={4.5}
              className="h-80 w-full"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-12 mt-12">
        <QuickActionsGrid
          itemCounts={{
            flights: getItemCountByType('flights'),
            hotels: getItemCountByType('hotels'),
            activities: getItemCountByType('activities'),
            dining: getItemCountByType('dining'),
            transport: getTransportItemCount()
          }}
          onCategoryClick={setSelectedBookingCategory}
        />
      </div>


      {/* Media Gallery Preview */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">Trip Inspiration</h3>
            <p className="text-muted-foreground">Discover stunning visuals from your destination</p>
          </div>
          <button 
            onClick={() => setViewMode('media')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            View All
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="flex flex-row md:flex-row gap-4">
          {mediaItems.slice(0, 3).map((media) => (
            <div key={media.id} className="relative group cursor-pointer flex-1">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted/30">
                <ImageWithFallback
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
              <div className="absolute bottom-3 left-3 text-white">
                <h5 className="font-medium text-sm mb-1">{media.title}</h5>
                <p className="text-xs text-white/80">{media.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMediaGallery = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Trip Inspiration</h2>
          <p className="text-muted-foreground">Discover stunning visuals from your destination</p>
        </div>
        <button 
          onClick={() => setViewMode('overview')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          Back to Overview
          <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'inspiration', 'accommodation', 'activities'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedMediaCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedMediaCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-6">
        {mediaItems
          .filter(item => selectedMediaCategory === 'all' || item.category === selectedMediaCategory)
          .map((media) => (
            <div key={media.id} className="relative group cursor-pointer flex-1 min-w-0 md:flex-1 lg:flex-1">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted/30">
                <ImageWithFallback
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
              <div className="absolute bottom-3 left-3 text-white">
                <h5 className="font-medium text-sm mb-1">{media.title}</h5>
                <p className="text-xs text-white/80">{media.location}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {mediaItems.filter(item => selectedMediaCategory === 'all' || item.category === selectedMediaCategory).length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-medium text-foreground mb-2">No media found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>
        </div>
      )}
    </div>
  );

  // Show detailed booking view if a category is selected
  if (selectedBookingCategory) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <DetailedBookingView
            category={selectedBookingCategory === 'transport' ? 'commute' : selectedBookingCategory as any}
            selectedTier={currentTier}
            destination={apiResponse?.to || destination}
            onBack={() => setSelectedBookingCategory(null)}
            dayWiseData={safeDayWiseItinerary}
            upsellOptions={safeUpsellOptions}
            tierData={selectedTierData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToChat}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                ← Back to Chat
              </button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">
                {apiResponse?.to || destination}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <CurrencyDropdown />
              
              {/* Tier Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Tier:</span>
                <select
                  value={currentTier}
                  onChange={(e) => setCurrentTier(e.target.value as TierType)}
                  className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors"
                >
                  <option value="budgeted">Budgeted</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
            
            {/* Right side: Tabs and Book Now Button */}
            <div className="flex items-center gap-4">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'overview'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setViewMode('itinerary')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'itinerary'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setViewMode('media')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    viewMode === 'media'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Media
                </button>
              </div>
              
              {/* Global Book Now Button - Prominent Position */}
              <button
                onClick={async () => {
                  if (!apiResponse?.id) {
                    alert('No itinerary ID available for booking');
                    return;
                  }
                  
                  console.log('Global Book Now clicked for tier:', currentTier);
                  await handleBooking(apiResponse.id, currentTier);
                }}
                disabled={isBooking || !apiResponse?.id}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                {isBooking ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'overview' && renderOverview()}
        {viewMode === 'itinerary' && (
          <ModernItineraryView
            dayWiseData={safeDayWiseItinerary}
            onBack={() => setViewMode('overview')}
            dates={selectedTierData?.overview?.duration || dates}
          />
        )}
        {viewMode === 'media' && renderMediaGallery()}
      </div>
    </div>
  );
};
