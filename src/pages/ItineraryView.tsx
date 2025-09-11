import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EnhancedItineraryView } from '../components/EnhancedItineraryView';
import { Header } from '../components/Header';
import { useItinerary } from '../contexts/ItineraryContext';
import { navigateToHome } from '../utils/navigation';
import { CurrencyProvider } from '../contexts/CurrencyContext';
import { getItineraryByTrackingId } from '../services/itineraryApi';

export const ItineraryView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { apiResponse, setApiResponse } = useItinerary();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch itinerary data if not available in context (e.g., on page refresh)
  useEffect(() => {
    const fetchItineraryData = async () => {
      if (!apiResponse && id) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await getItineraryByTrackingId(id);
          
          if (response.success && response.data) {
            setApiResponse(response.data);
          } else {
            setError(response.error || 'Failed to load itinerary');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItineraryData();
  }, [apiResponse, id, setApiResponse]);
  
  // Show loading state while fetching data
  if (isLoading || (!apiResponse && id)) {
    return (
      <CurrencyProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading itinerary...</p>
          </div>
        </div>
      </CurrencyProvider>
    );
  }
  
  // Show error state if fetch failed
  if (error) {
    return (
      <CurrencyProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Itinerary</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                if (id) {
                  setApiResponse(null);
                  // Trigger refetch
                  setIsLoading(true);
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </CurrencyProvider>
    );
  }
  
  // Show message if no ID provided and no data in context
  if (!apiResponse && !id) {
    return (
      <CurrencyProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No Itinerary Found</h2>
            <p className="text-muted-foreground mb-4">Please start by planning a trip from the home page.</p>
            <button
              onClick={() => navigateToHome(navigate)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </CurrencyProvider>
    );
  }
  
  // Extract itinerary data from the API response
  const itinerary = apiResponse?.generatedItinerary?.budgeted?.days?.map(day => ({
    id: `day-${day.day}`,
    day: day.day,
    title: `Day ${day.day}`,
    items: day.schedule?.map((item, index) => ({
      id: `day-${day.day}-item-${index}`,
      type: item.type,
      name: item.name || `${item.type} ${index + 1}`,
      time: item.start_time || item.departure_time || item.check_in,
      location: typeof item.location === 'string' ? item.location : 
                item.from && item.to ? `${item.from} → ${item.to}` : '',
      price: item.price || 0,
      description: item.description || '',
      bookingUrl: null // No bookingUrl in ScheduleItem interface
    })) || []
  })) || [];

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-background">
        <Header 
          showBackButton={true}
          onBackClick={() => navigateToHome(navigate)}
          title="Travel Itinerary"
        />
        <EnhancedItineraryView
          itinerary={itinerary}
          destination={apiResponse?.to || ''}
          dates={apiResponse?.timeframe || ''}
          selectedTier="budgeted"
          onBackToChat={() => {
            // Navigate back to home
            navigateToHome(navigate);
          }}
          apiResponse={apiResponse || undefined}
        />
      </div>
    </CurrencyProvider>
  );
};
