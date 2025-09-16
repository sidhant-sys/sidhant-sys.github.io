import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ModernItineraryView } from './ModernItineraryView';
import { DetailedBookingView } from './DetailedBookingView';
import { MediaCarousel, MediaItem } from './MediaCarousel';
import { BudgetOverviewTabs } from './BudgetOverviewTabs';
import { QuickActionsGrid } from './QuickActionsGrid';
import { CurrencyDropdown } from './CurrencyDropdown';
import { TravelIntelligenceWidget } from './TravelIntelligenceWidget';
import { Footer } from './Footer';
import { ItineraryApiResponse } from '../types/api';
import { TierType } from './TierSelector';
import { useBooking } from '../hooks/useBooking';
import { navigateToConfirmation } from '../utils/navigation';
import tripInspiration1 from '../assets/trip-inspiration1.png';
import tripInspiration2 from '../assets/trip-inspiration2.png';
import { ChevronRight, ShoppingCart, ChevronDown, Crown, Wallet, Gem } from 'lucide-react';

interface TierDropdownProps {
  currentTier: TierType;
  onTierChange: (tier: TierType) => void;
}

const TierDropdown: React.FC<TierDropdownProps> = ({ currentTier, onTierChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tiers = [
    { id: 'budgeted' as TierType, name: 'Budgeted', icon: <Wallet className="w-4 h-4" /> },
    { id: 'premium' as TierType, name: 'Premium', icon: <Crown className="w-4 h-4" /> },
    { id: 'luxury' as TierType, name: 'Luxury', icon: <Gem className="w-4 h-4" /> }
  ];

  const currentTierData = tiers.find(tier => tier.id === currentTier);

  const handleTierSelect = (tier: TierType) => {
    onTierChange(tier);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between gap-2 px-3 py-2 text-sm border border-border rounded-md bg-background hover:bg-muted/50 text-foreground font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-w-[100px] cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {currentTierData?.icon}
          <span>{currentTierData?.name}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          strokeWidth={1.5} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border border-border rounded-md shadow-lg">
            <div className="py-1">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleTierSelect(tier.id)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
                    currentTier === tier.id 
                      ? 'bg-muted text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  role="option"
                  aria-selected={currentTier === tier.id}
                >
                  {tier.icon}
                  <span>{tier.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

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
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [hasModifications, setHasModifications] = useState(false);
  const [showModificationWarning, setShowModificationWarning] = useState(false);
  const [pendingViewMode, setPendingViewMode] = useState<'overview' | 'itinerary' | 'media' | null>(null);

  // Handle category click with scroll to top
  const handleCategoryClick = (category: string) => {
    setSelectedBookingCategory(category);
    // Scroll to top when category is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle view mode changes with modification check
  const handleViewModeChange = (newViewMode: 'overview' | 'itinerary' | 'media') => {
    // If switching away from itinerary and there are modifications, show warning
    if (viewMode === 'itinerary' && hasModifications && newViewMode !== 'itinerary') {
      setPendingViewMode(newViewMode);
      setShowModificationWarning(true);
      return;
    }
    
    // Direct switch if no modifications or not leaving itinerary
    setViewMode(newViewMode);
  };

  // Handle modification warning actions
  const handleContinueWithoutSaving = () => {
    setShowModificationWarning(false);
    setHasModifications(false);
    if (pendingViewMode) {
      setViewMode(pendingViewMode);
      setPendingViewMode(null);
    }
  };

  const handleCancelSwitch = () => {
    setShowModificationWarning(false);
    setPendingViewMode(null);
  };

  const handleBookNow = async () => {
    if (!apiResponse?.id) {
      alert('No itinerary ID available for booking');
      return;
    }
    
    setShowModificationWarning(false);
    await handleBooking(apiResponse.id, currentTier);
  };

  // Scroll detection for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const navbarElement = document.querySelector('[data-navbar-header]') as HTMLElement;
        if (navbarElement) {
          const rect = navbarElement.getBoundingClientRect();
          // Trigger fixed navbar when the original navbar scrolls past with buffer
          setIsNavbarFixed(rect.bottom <= -10);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown visibility when modal is open
  useEffect(() => {
    if (showModificationWarning) {
      // Add comprehensive CSS to hide all possible dropdown patterns
      const style = document.createElement('style');
      style.id = 'modal-dropdown-hide';
      style.textContent = `
        /* Hide specific dropdown patterns but protect our modal */
        [role="listbox"]:not([data-modal] *),
        [role="menu"]:not([data-modal] *),
        [data-radix-popper-content-wrapper]:not([data-modal] *),
        [data-radix-popper-content]:not([data-modal] *),
        .dropdown-menu:not([data-modal] *),
        [data-state="open"] > div:not([data-modal] *),
        [data-state="open"] + div:not([data-modal] *) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* Force our modal to always be visible with highest priority */
        [data-modal="modification-warning"] {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
          z-index: 999999 !important;
        }
        
        [data-modal="modification-warning"] > * {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        
        [data-modal="modification-warning"] .flex {
          display: flex !important;
        }
      `;
      document.head.appendChild(style);

      // Multiple approaches to close dropdowns
      const closeDropdowns = () => {
        // Method 1: Escape key
        document.dispatchEvent(new KeyboardEvent('keydown', { 
          key: 'Escape',
          keyCode: 27,
          which: 27,
          bubbles: true 
        }));
        
        // Method 2: Click outside at multiple locations
        const locations = [
          { x: 0, y: 0 },
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          { x: 10, y: 10 }
        ];
        
        locations.forEach(loc => {
          document.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: loc.x,
            clientY: loc.y
          }));
        });

        // Method 3: Focus away from dropdowns
        document.body.focus();
      };

      // Try multiple times with different delays
      const timers = [
        setTimeout(closeDropdowns, 0),
        setTimeout(closeDropdowns, 50),
        setTimeout(closeDropdowns, 100)
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
        const existingStyle = document.getElementById('modal-dropdown-hide');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [showModificationWarning]);
  
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
  
  // Extract data from the correct paths based on your specification - memoized to prevent re-renders
  const safeDayWiseItinerary = useMemo(() => selectedTierData?.days || [], [selectedTierData?.days]);
  const safeUpsellOptions = useMemo(() => (selectedTierData as any)?.upsell || [], [(selectedTierData as any)?.upsell]);
  
  // Debug: Log upsell options (removed to prevent console spam)
  
  // Extract flights and hotels directly from tier - memoized to prevent re-renders
  const flightsData = useMemo(() => (selectedTierData as any)?.flights || [], [(selectedTierData as any)?.flights]);
  const hotelsData = useMemo(() => (selectedTierData as any)?.hotels || [], [(selectedTierData as any)?.hotels]);
  
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
  
  const activitiesData = useMemo(() => extractItemsFromDays('activity'), [safeDayWiseItinerary]);
  const mealsData = useMemo(() => extractItemsFromDays('meal'), [safeDayWiseItinerary]);
  const commuteData = useMemo(() => extractItemsFromDays('commute'), [safeDayWiseItinerary]);
  
  // Debug: Log the day-wise data (removed to prevent console spam)
  
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

  // Dynamic media items from generated images (both general and activity-specific)
  const mediaItems = useMemo(() => {
    const allMediaItems: any[] = [];
    const baseUrl = 'https://amadeus.cltp.in/api/files/images/';

    // Add general generated images (trip inspiration)
    if (apiResponse?.generatedImages && apiResponse.generatedImages.length > 0) {
      const inspirationImages = apiResponse.generatedImages.map((imageUrl, index) => {
        const fullImageUrl = imageUrl.startsWith('/') 
          ? `${baseUrl}${imageUrl.slice(1)}`
          : `${baseUrl}${imageUrl}`;
        
        return {
          id: `generated-image-${index}`,
          type: 'image',
          url: fullImageUrl,
          title: `Destination Image ${index + 1}`,
          description: `Beautiful view of ${destination}`,
          location: destination,
          category: 'inspiration'
        };
      });
      allMediaItems.push(...inspirationImages);
    }

    // Add activity-specific generated images
    if (safeDayWiseItinerary && safeDayWiseItinerary.length > 0) {
      safeDayWiseItinerary.forEach((dayData, dayIndex) => {
        if (dayData.schedule) {
          dayData.schedule.forEach((activity, activityIndex) => {
            if (activity.generated_images && activity.generated_images.length > 0) {
              const activityImages = activity.generated_images.map((imageUrl, imageIndex) => {
                const fullImageUrl = `${baseUrl}${imageUrl}`;
                
                // Determine category based on activity type
                let category = 'activities';
                if (activity.type === 'hotel') category = 'accommodation';
                else if (activity.type === 'meal') category = 'activities';
                else if (activity.type === 'flight' || activity.type === 'commute') category = 'activities';
                
                return {
                  id: `activity-image-${dayIndex}-${activityIndex}-${imageIndex}`,
                  type: 'image',
                  url: fullImageUrl,
                  title: activity.name || `${activity.type} on Day ${dayData.day}`,
                  description: activity.description || `${activity.type} activity`,
                  location: typeof activity.location === 'string' ? activity.location : destination,
                  category,
                  day: dayData.day,
                  activityType: activity.type
                };
              });
              allMediaItems.push(...activityImages);
            }
          });
        }
      });
    }

    // Return all media items or fallback to static images
    if (allMediaItems.length > 0) {
      return allMediaItems;
    }
    
    // Fallback to static images if no generated images available
    return [
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
  }, [apiResponse?.generatedImages, destination, safeDayWiseItinerary]);

  // Trip inspiration carousel - collect all generated_images from activities
  const carouselMediaItems: MediaItem[] = useMemo(() => {
    const baseUrl = 'https://amadeus.cltp.in/api/files/images/';
    const allGeneratedImages: MediaItem[] = [];

    // Collect all generated_images from all activities across all days
    if (safeDayWiseItinerary && safeDayWiseItinerary.length > 0) {
      safeDayWiseItinerary.forEach((dayData, dayIndex) => {
        if (dayData.schedule) {
          dayData.schedule.forEach((activity, activityIndex) => {
            if (activity.generated_images && activity.generated_images.length > 0) {
              const activityImages = activity.generated_images.map((imageUrl, imageIndex) => ({
                id: `trip-inspiration-${dayIndex}-${activityIndex}-${imageIndex}`,
                type: 'image' as const,
                url: `${baseUrl}${imageUrl}`,
                title: activity.name || `${activity.type} on Day ${dayData.day}`,
                description: activity.description || `Experience ${activity.type} in ${destination}`,
                location: typeof activity.location === 'string' ? activity.location : destination,
                category: 'inspiration' as const
              }));
              allGeneratedImages.push(...activityImages);
            }
          });
        }
      });
    }

    // If we have generated images, use them; otherwise fallback to static images
    if (allGeneratedImages.length > 0) {
      return allGeneratedImages;
    }

    // Fallback to static images
    return [
      {
        id: 'carousel-1',
        type: 'image',
        url: tripInspiration1,
        title: 'Trip Inspiration',
        description: `Beautiful views of ${destination}`,
        location: destination,
        category: 'inspiration'
      },
      {
        id: 'carousel-2',
        type: 'image',
        url: tripInspiration2,
        title: 'Travel Destination',
        description: `Stunning scenery from ${destination}`,
        location: destination,
        category: 'inspiration'
      }
    ];
  }, [safeDayWiseItinerary, destination]);

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

  // Format price helper

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Hero Section with Carousel + Budget Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media Carousel - Left Half */}
        <div className="relative group">
          <div className="rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
            <MediaCarousel
              items={carouselMediaItems}
              experienceVideo={experienceVideo}
              destination={apiResponse ? `${apiResponse.from} to ${apiResponse.to}` : destination}
              dates={selectedTierData?.overview?.duration || dates}
              numberOfTravellers={apiResponse?.numberOfTravellers || 1}
              duration={safeDayWiseItinerary.length || itinerary.length}
              onSave={() => {/* Handle save */}}
              onShare={() => {/* Handle share */}}
              className="h-96 w-full"
              showVideo={currentTier === 'luxury'} // Only show video for luxury tier
              toIata={apiResponse?.toIata} // Pass destination IATA code for video selection
            />
          </div>
        </div>

        {/* Budget & Overview Tabs - Right Half */}
        <div className="relative group">
          <div className="rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
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
              className="h-96 w-full"
            />
          </div>
        </div>
      </div>

      {/* Trip Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{getItemCountByType('flights')}</div>
              <div className="text-sm text-gray-600">Flights</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{getItemCountByType('hotels')}</div>
              <div className="text-sm text-gray-600">Hotels</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{getItemCountByType('activities')}</div>
              <div className="text-sm text-gray-600">Activities</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{getItemCountByType('dining')}</div>
              <div className="text-sm text-gray-600">Dining</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Budget Overview Card */}
      {/* {costBreakdown && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Trip Budget</h3>
              <p className="text-gray-600">Estimated costs for your journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{formatPrice(costBreakdown.total)}</div>
              <div className="text-sm text-gray-600">Total Estimated Cost</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{formatPrice(costBreakdown.flights)}</div>
              <div className="text-xs text-gray-600">Flights</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{formatPrice(costBreakdown.hotels)}</div>
              <div className="text-xs text-gray-600">Hotels</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{formatPrice(costBreakdown.activities)}</div>
              <div className="text-xs text-gray-600">Activities</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{formatPrice(costBreakdown.meals)}</div>
              <div className="text-xs text-gray-600">Dining</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-semibold text-gray-900">{formatPrice(costBreakdown.commute)}</div>
              <div className="text-xs text-gray-600">Transport</div>
            </div>
          </div>
        </div>
      )} */}

      {/* Travel Intelligence Widget */}
      {selectedTierData?.travel_intelligence && (
        <TravelIntelligenceWidget
          data={selectedTierData.travel_intelligence}
          destination={apiResponse?.to || destination}
        />
      )}

      {/* Quick Actions Grid */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        {/* <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Explore Your Trip</h3>
          <p className="text-gray-600">Dive deeper into each aspect of your journey</p>
        </div>
         */}
        <QuickActionsGrid
          itemCounts={{
            flights: getItemCountByType('flights'),
            hotels: getItemCountByType('hotels'),
            activities: getItemCountByType('activities'),
            dining: getItemCountByType('dining'),
            transport: getTransportItemCount()
          }}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Trip Inspiration Preview */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trip Inspiration</h3>
            <p className="text-gray-600">Get excited about your destination</p>
          </div>
          <button 
            onClick={() => handleViewModeChange('media')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mediaItems.slice(0, 3).map((media, index) => (
            <div key={media.id} className="group relative overflow-hidden rounded-xl bg-gray-100">
              <div className="aspect-video">
                <ImageWithFallback
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h5 className="font-semibold text-lg mb-1 group-hover:text-blue-300 transition-colors">{media.title}</h5>
                <p className="text-sm text-white/90">{media.location}</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMediaGallery = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Trip Inspiration</h2>
            <p className="text-muted-foreground">Discover stunning visuals from your destination</p>
          </div>
          <button 
            onClick={() => handleViewModeChange('overview')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Back to Overview
            <ChevronRight className="w-4 h-4 rotate-180" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-wrap gap-2">
          {['all', 'inspiration', 'accommodation', 'activities'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedMediaCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                selectedMediaCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {mediaItems
          .filter(item => selectedMediaCategory === 'all' || item.category === selectedMediaCategory)
          .map((media) => (
            <div key={media.id} className="relative group cursor-pointer">
              <div className="w-[200px] h-[200px] rounded-xl overflow-hidden bg-muted/30">
                <ImageWithFallback
                  src={media.url}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
              <div className="absolute bottom-3 left-3 text-white">
                <h5 className="font-medium text-sm mb-1 line-clamp-1">{media.title}</h5>
                <p className="text-xs text-white/80 line-clamp-1">{media.location}</p>
              </div>
            </div>
        ))}
      </div>

      {/* Empty State */}
      {mediaItems.filter(item => selectedMediaCategory === 'all' || item.category === selectedMediaCategory).length === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
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
      {/* Fixed Navbar - appears when scrolled past original */}
      {isNavbarFixed && (
        <div 
          className="fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-border animate-in slide-in-from-top-2 fade-in duration-300"
          style={{
            backgroundColor: '#ffffff',
            opacity: 1
          }}
        >
        <div className="max-w-7xl mx-auto px-4 py-4" style={{marginTop: '53px'}}>
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
                  <TierDropdown
                    currentTier={currentTier}
                    onTierChange={setCurrentTier}
                  />
                </div>
              </div>
              
              {/* Right side: Tabs and Book Now Button */}
              <div className="flex items-center gap-4">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                  <button
                    onClick={() => handleViewModeChange('overview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      viewMode === 'overview'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => handleViewModeChange('itinerary')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      viewMode === 'itinerary'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Itinerary
                  </button>
                  <button
                    onClick={() => handleViewModeChange('media')}
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
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer text-md"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isBooking ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer when fixed navbar is active */}
      {isNavbarFixed && <div className="h-20" />}

      {/* Modification Warning Modal */}
      {showModificationWarning && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" data-modal="modification-warning">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancelSwitch} />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full animate-in fade-in zoom-in-95 duration-300 rounded" style={{ backgroundColor: '#ffffff', zIndex: 100000 }}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Unsaved Changes</h3>
                <p className="text-sm text-gray-600">You have modifications to your itinerary</p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                You've made changes to your day-wise itinerary selections. If you continue, these changes will be lost. 
                Would you like to book your current selections or continue without saving?
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelSwitch}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleContinueWithoutSaving}
                className="flex-1 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Continue
              </button>
              <button
                onClick={handleBookNow}
                disabled={isBooking}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                {isBooking ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm" data-navbar-header style={{marginTop: '53px'}}>
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
                <TierDropdown
                  currentTier={currentTier}
                  onTierChange={setCurrentTier}
                />
              </div>
            </div>
            
            {/* Right side: Tabs and Book Now Button */}
            <div className="flex items-center gap-4">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
                <button
                  onClick={() => handleViewModeChange('overview')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors  ${
                    viewMode === 'overview'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => handleViewModeChange('itinerary')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors  ${
                    viewMode === 'itinerary'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => handleViewModeChange('media')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors  ${
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
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md  text-md"
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
        {/* Category Detail View */}
        {selectedBookingCategory && (
          <div className="mb-8">
            <DetailedBookingView
              category={selectedBookingCategory === 'transport' ? 'commute' : selectedBookingCategory as 'flights' | 'hotels' | 'activities' | 'dining' | 'commute'}
              selectedTier={currentTier}
              destination={destination}
              onBack={() => setSelectedBookingCategory(null)}
              dayWiseData={safeDayWiseItinerary}
              tierData={selectedTierData}
            />
          </div>
        )}

        {/* Main Views */}
        {!selectedBookingCategory && (
          <>
            {viewMode === 'overview' && renderOverview()}
            {viewMode === 'itinerary' && (
              <div>
                <ModernItineraryView
                  dayWiseData={safeDayWiseItinerary}
                  onBack={() => handleViewModeChange('overview')}
                  dates={selectedTierData?.overview?.duration || dates}
                  onModificationsChange={setHasModifications}
                  globalUpsells={safeUpsellOptions}
                />
              </div>
            )}
            {viewMode === 'media' && renderMediaGallery()}
          </>
        )}
      </div>

      {/* Footer
      <div className="mt-16">
        <Footer />
      </div> */}
      <div style={{paddingBottom: '32px'}}> <Footer /></div>
      
    </div>
  );
};
