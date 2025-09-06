import { ItineraryApiResponse, ItineraryTier, ScheduleItem, TierType } from '../types/api';
import { ItineraryItem, BookingItem, BudgetEstimate } from '../types';

// Transform API response to app format
export function transformItineraryResponse(apiResponse: ItineraryApiResponse) {
  const { generatedItinerary, from, to, timeframe, typeOfTrip, budget } = apiResponse;
  
  // Extract global data
  const globalData = {
    destination: `${from} to ${to}`,
    duration: timeframe,
    tripType: typeOfTrip,
    budget: budget,
    fromIata: apiResponse.fromIata,
    toIata: apiResponse.toIata,
    numberOfTravellers: apiResponse.numberOfTravellers,
    numberOfAdults: apiResponse.numberOfAdults,
    numberOfKids: apiResponse.numberOfKids,
  };

  // Transform budget estimates
  const budgetEstimate: BudgetEstimate = {
    economy: generatedItinerary.budgeted.overview.total_cost,
    premium: generatedItinerary.premium.overview.total_cost,
    luxury: generatedItinerary.luxury.overview.total_cost,
  };

  // Transform itinerary items for each tier
  const transformedItineraries = {
    economy: transformTierItinerary(generatedItinerary.budgeted, 'economy'),
    premium: transformTierItinerary(generatedItinerary.premium, 'premium'),
    luxury: transformTierItinerary(generatedItinerary.luxury, 'luxury'),
  };

  return {
    globalData,
    budgetEstimate,
    itineraries: transformedItineraries,
    rawResponse: apiResponse,
  };
}

// Transform individual tier itinerary
function transformTierItinerary(tier: ItineraryTier, tierType: TierType) {
  const itineraryItems: ItineraryItem[] = [];
  const bookingItems: BookingItem[] = [];

  // Process each day
  tier.days.forEach((day) => {
    day.schedule.forEach((item, index) => {
      const itemId = `${tierType}-day${day.day}-${index}`;
      
      // Create itinerary item
      const itineraryItem: ItineraryItem = {
        id: itemId,
        day: day.day,
        time: item.departure_time || item.start_time || item.check_in || item.time || 'TBD',
        activity: item.name || `${item.type} activity`,
        location: item.location || item.from || item.to || 'TBD',
        description: item.description || `${item.type} - ${item.name || 'Activity'}`,
        type: mapScheduleTypeToItineraryType(item.type),
        priority: 'high',
        price: item.price,
        bookingAvailable: true,
      };

      itineraryItems.push(itineraryItem);

      // Create booking item
      const bookingItem: BookingItem = {
        id: itemId,
        name: item.name || `${item.type} - ${item.airline || 'Service'}`,
        description: item.description || `${item.type} booking`,
        price: item.price,
        category: mapScheduleTypeToBookingCategory(item.type),
        location: item.location || item.from || item.to,
        available: true,
        tier: [tierType],
        rating: 4.5, // Default rating
      };

      bookingItems.push(bookingItem);
    });
  });

  return {
    overview: tier.overview,
    items: itineraryItems,
    bookings: bookingItems,
    upsell: tier.upsell,
  };
}

// Map schedule item type to itinerary type
function mapScheduleTypeToItineraryType(scheduleType: string): 'activity' | 'dining' | 'accommodation' | 'transport' {
  switch (scheduleType) {
    case 'flight':
    case 'commute':
      return 'transport';
    case 'hotel':
      return 'accommodation';
    case 'meal':
      return 'dining';
    case 'activity':
      return 'activity';
    default:
      return 'activity';
  }
}

// Map schedule item type to booking category
function mapScheduleTypeToBookingCategory(scheduleType: string): 'flights' | 'hotels' | 'activities' | 'dining' {
  switch (scheduleType) {
    case 'flight':
      return 'flights';
    case 'hotel':
      return 'hotels';
    case 'meal':
      return 'dining';
    case 'activity':
      return 'activities';
    default:
      return 'activities';
  }
}

// Extract cost breakdown for display
export function getCostBreakdown(tier: ItineraryTier) {
  return {
    flights: tier.overview.cost_breakdown.flights,
    hotels: tier.overview.cost_breakdown.hotels,
    activities: tier.overview.cost_breakdown.activities,
    meals: tier.overview.cost_breakdown.meals,
    commute: tier.overview.cost_breakdown.commute,
    total: tier.overview.total_cost,
  };
}

// Get formatted duration
export function getFormattedDuration(duration: string) {
  return duration.replace(' days, ', 'D ').replace(' nights', 'N');
}

// Get formatted price
export function getFormattedPrice(price: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}
