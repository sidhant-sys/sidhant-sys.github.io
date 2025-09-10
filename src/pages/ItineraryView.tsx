import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnhancedItineraryView } from '../components/EnhancedItineraryView';
import { mockItineraryResponse } from '../data/mockApiResponse';
import { ItineraryApiResponse } from '../types/api';
import { navigateToHome } from '../utils/navigation';
import { CurrencyProvider } from '../contexts/CurrencyContext';

export const ItineraryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // For now, we'll use the mock data. In a real app, you'd fetch data based on the ID
  const apiResponse: ItineraryApiResponse = mockItineraryResponse;
  
  // Extract itinerary data from the API response
  const itinerary = apiResponse.generatedItinerary?.budgeted?.days?.map(day => ({
    id: `day-${day.day}`,
    day: day.day,
    title: `Day ${day.day}`,
    items: day.schedule?.map((item, index) => ({
      id: `day-${day.day}-item-${index}`,
      type: item.type,
      name: item.name || item.flight_name || `${item.type} ${index + 1}`,
      time: item.start_time || item.departure_time || item.check_in_time,
      location: typeof item.location === 'string' ? item.location : 
                item.flight_origin && item.flight_destination ? 
                `${item.flight_origin} → ${item.flight_destination}` : 
                item.from && item.to ? `${item.from} → ${item.to}` : '',
      price: item.price || 0,
      description: item.description || '',
      bookingUrl: item.bookingUrl || null
    })) || []
  })) || [];

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background">
        <EnhancedItineraryView
          itinerary={itinerary}
          destination={apiResponse.to}
          dates={apiResponse.timeframe}
          selectedTier="budgeted"
          onBackToChat={() => {
            // Navigate back to home
            navigateToHome(navigate);
          }}
          onProceedToTiers={() => {
            // Handle tier selection if needed
          }}
          apiResponse={apiResponse}
        />
      </div>
    </CurrencyProvider>
  );
};
