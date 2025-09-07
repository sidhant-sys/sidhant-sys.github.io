import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import { mockItineraryResponse } from '../data/mockApiResponse';

interface TrackingEntry {
  id: string;
  tracking_id: string;
  created_at: string;
  updated_at: string;
  status?: string;
  [key: string]: any;
}

interface UseTrackingPollingOptions {
  enabled?: boolean;
  interval?: number; // in milliseconds
  maxEntries?: number;
  onItineraryGenerated?: (data: any) => void;
  onItineraryGenerationStart?: () => void;
}

export const useTrackingPolling = (options: UseTrackingPollingOptions = {}) => {
  const {
    enabled = true,
    interval = 2000, // Poll every 2 seconds
    onItineraryGenerated,
    onItineraryGenerationStart
  } = options;

  const [currentEntry, setCurrentEntry] = useState<TrackingEntry | null>(null);
  const [previousTrackingId, setPreviousTrackingId] = useState<string | null>(null);
  const [newTrackingId, setNewTrackingId] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [hasGeneratedItinerary, setHasGeneratedItinerary] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const callItineraryAPI = useCallback(async (trackingId: string) => {
    try {
      setIsGeneratingItinerary(true);
      if (onItineraryGenerationStart) {
        onItineraryGenerationStart();
      }
      console.log('Calling /getItineraryDetails with tracking_id:', trackingId);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, use mock response
      const response = mockItineraryResponse;
      
      console.log('Itinerary API response:', response);
      
      if (onItineraryGenerated) {
        onItineraryGenerated(response);
      }
      
      // Mark that we've generated an itinerary to prevent restarting polling
      setHasGeneratedItinerary(true);
      
    } catch (err) {
      console.error('Error calling itinerary API:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate itinerary');
    } finally {
      setIsGeneratingItinerary(false);
    }
  }, [onItineraryGenerated]);

  const fetchEntries = useCallback(async () => {
    if (!enabled) return;

    try {
      setLoading(true);
      setError(null);

      // Get the single entry from the database
      const { data, error: fetchError } = await supabase
        .from('tracking_id')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError) {
        console.error('Error fetching tracking entry:', fetchError);
        setError(fetchError.message);
        return;
      }

      if (data) {
        const currentTrackingId = data.tracking_id;
        
        // Check if tracking_id has changed
        if (previousTrackingId !== null && currentTrackingId !== previousTrackingId) {
          console.log('Tracking ID changed!', {
            previous: previousTrackingId,
            current: currentTrackingId
          });
          
          // First, close ElevenLabs widget if it exists
          if ((window as any).closeElevenLabsWidget) {
            (window as any).closeElevenLabsWidget();
            console.log('Closing ElevenLabs widget before showing loading screen');
          }
          
          setNewTrackingId(currentTrackingId);
          setShowSuccessMessage(true);
          
          // Stop polling
          stopPolling();
          
          // Add a small delay to ensure smooth transition, then call itinerary API
          setTimeout(() => {
            callItineraryAPI(currentTrackingId);
          }, 500); // 500ms delay for smooth transition
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
        }
        
        // Update the current entry and previous tracking ID
        setCurrentEntry(data);
        setPreviousTrackingId(currentTrackingId);
      }
    } catch (err) {
      console.error('Error in fetchEntries:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [enabled, previousTrackingId]);

  const startPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsPolling(true);
    console.log('Starting tracking polling...');
    
    // Fetch immediately
    fetchEntries();
    
    // Then poll at intervals
    intervalRef.current = setInterval(fetchEntries, interval);
  }, [fetchEntries, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
    console.log('Stopped tracking polling');
  }, []);

  const clearEntry = useCallback(() => {
    setCurrentEntry(null);
    setPreviousTrackingId(null);
    setNewTrackingId(null);
    setShowSuccessMessage(false);
  }, []);

  const dismissSuccessMessage = useCallback(() => {
    setShowSuccessMessage(false);
  }, []);

  // Auto-start/stop polling based on enabled prop
  useEffect(() => {
    if (enabled && !hasGeneratedItinerary) {
      startPolling();
    } else {
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, hasGeneratedItinerary, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentEntry,
    previousTrackingId,
    newTrackingId,
    showSuccessMessage,
    loading,
    error,
    isPolling,
    isGeneratingItinerary,
    hasGeneratedItinerary,
    startPolling,
    stopPolling,
    clearEntry,
    dismissSuccessMessage,
    fetchEntries
  };
};
