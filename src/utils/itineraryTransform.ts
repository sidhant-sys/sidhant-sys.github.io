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

  // Transform budget estimates with fallbacks
  const budgetEstimate: BudgetEstimate = {
    budgeted: generatedItinerary.budgeted?.overview?.total_cost || 0,
    premium: generatedItinerary.premium?.overview?.total_cost || generatedItinerary.budgeted?.overview?.total_cost || 0,
    luxury: generatedItinerary.luxury?.overview?.total_cost || generatedItinerary.budgeted?.overview?.total_cost || 0,
  };

  // Transform itinerary items for each tier with fallbacks
  const transformedItineraries = {
    budgeted: generatedItinerary.budgeted ? transformTierItinerary(generatedItinerary.budgeted, 'budgeted') : [],
    premium: generatedItinerary.premium ? transformTierItinerary(generatedItinerary.premium, 'premium') : 
             generatedItinerary.budgeted ? transformTierItinerary(generatedItinerary.budgeted, 'premium') : [],
    luxury: generatedItinerary.luxury ? transformTierItinerary(generatedItinerary.luxury, 'luxury') : 
            generatedItinerary.budgeted ? transformTierItinerary(generatedItinerary.budgeted, 'luxury') : [],
  };

  return {
    globalData,
    budgetEstimate,
    itineraries: transformedItineraries,
    rawResponse: apiResponse,
  };
}

// Transform individual tier itinerary
function transformTierItinerary(tier: ItineraryTier | undefined, tierType: TierType) {
  const itineraryItems: ItineraryItem[] = [];
  const bookingItems: BookingItem[] = [];

  // Return empty arrays if no tier data
  if (!tier || !tier.days) {
    return itineraryItems;
  }

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

  // Group items by day for day-wise display, ensuring no duplicate days
  const dayMap = new Map();
  
  console.log(`Processing ${tierType} tier with ${tier.days?.length || 0} days`);
  
  if (tier.days) {
    tier.days.forEach((day, dayIndex) => {
      const dayNumber = day.day;
      console.log(`Processing day ${dayNumber} (index ${dayIndex}) with ${day.schedule?.length || 0} items`);
      
      if (!dayMap.has(dayNumber)) {
        dayMap.set(dayNumber, {
          day: dayNumber,
          schedule: []
        });
        console.log(`Created new day entry for day ${dayNumber}`);
      } else {
        console.log(`Day ${dayNumber} already exists, adding items to existing schedule`);
      }
      
      // Add all schedule items for this day
      if (day.schedule) {
        day.schedule.forEach((item, index) => {
          dayMap.get(dayNumber).schedule.push({
            ...item,
            id: `${tierType}-day${dayNumber}-${index}`,
          });
        });
        console.log(`Added ${day.schedule.length} items to day ${dayNumber}. Total items now: ${dayMap.get(dayNumber).schedule.length}`);
      }
    });
  }
  
  // Convert map to array and sort by day number
  const dayWiseData = Array.from(dayMap.values()).sort((a, b) => a.day - b.day);
  console.log(`Final dayWiseData for ${tierType}:`, dayWiseData.map(d => ({ day: d.day, itemCount: d.schedule.length })));
  
  // Additional validation
  const dayNumbers = dayWiseData.map(d => d.day);
  const uniqueDayNumbers = [...new Set(dayNumbers)];
  if (dayNumbers.length !== uniqueDayNumbers.length) {
    console.error(`DUPLICATE DAYS DETECTED! Total days: ${dayNumbers.length}, Unique days: ${uniqueDayNumbers.length}`);
    console.error('Day numbers:', dayNumbers);
  }

  return {
    overview: tier.overview,
    items: itineraryItems,
    bookings: bookingItems,
    upsell: tier.upsell,
    dayWiseData: dayWiseData,
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
export function getCostBreakdown(tier: ItineraryTier | undefined) {
  if (!tier || !tier.overview || !tier.overview.cost_breakdown) {
    return {
      flights: 0,
      hotels: 0,
      activities: 0,
      meals: 0,
      commute: 0,
      total: 0,
    };
  }
  
  return {
    flights: tier.overview.cost_breakdown.flights || 0,
    hotels: tier.overview.cost_breakdown.hotels || 0,
    activities: tier.overview.cost_breakdown.activities || 0,
    meals: tier.overview.cost_breakdown.meals || 0,
    commute: tier.overview.cost_breakdown.commute || 0,
    total: tier.overview.total_cost || 0,
  };
}

// Get formatted duration
export function getFormattedDuration(duration: string) {
  return duration.replace(' days, ', 'D ').replace(' nights', 'N');
}

// Get formatted price
export function getFormattedPrice(price: number, currency: string = 'USD') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}
