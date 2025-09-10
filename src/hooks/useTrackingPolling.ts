import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../services/supabaseClient';
import { getItineraryByTrackingId } from '../services/itineraryApi';

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
  const [isApiPolling, setIsApiPolling] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const apiPollingRef = useRef<NodeJS.Timeout | null>(null);

  const stopApiPolling = useCallback(() => {
    if (apiPollingRef.current) {
      clearInterval(apiPollingRef.current);
      apiPollingRef.current = null;
      console.log('Stopped API polling');
    }
    setIsApiPolling(false);
  }, []);

  const startItineraryPolling = useCallback((trackingId: string) => {
    // Clear any existing polling
    stopApiPolling();
    
    console.log('🚀 Starting API polling for tracking_id:', trackingId);
    setIsApiPolling(true);
    
    const makeApiCall = async () => {
      try {
        console.log('🔄 Making API call...');
        const apiResponse = await getItineraryByTrackingId(trackingId);
        
        if (!apiResponse.success) {
          console.log('❌ API call failed:', apiResponse.error);
          return; // Continue polling
        }
        
        // Check if API explicitly returned isEmpty flag (empty array case)
        if (apiResponse.isEmpty) {
          console.log('📭 API returned empty array - data not ready yet');
          return; // Continue polling
        }
        
        // Check if response data is null/undefined
        const data = apiResponse.data;
        if (!data) {
          console.log('📭 API returned null/undefined data');
          return; // Continue polling
        }
        
        // We have valid data - stop polling and process it
        console.log('✅ API returned valid data - stopping polling');
        stopApiPolling();
        
        if (onItineraryGenerated) {
          onItineraryGenerated(data);
        }
        
        setHasGeneratedItinerary(true);
        setIsGeneratingItinerary(false);
        
      } catch (err) {
        console.error('💥 Error in API call:', err);
        // Continue polling on error
      }
    };
    
    // Make first call immediately
    makeApiCall();
    
    // Set up interval for subsequent calls
    apiPollingRef.current = setInterval(() => {
      console.log('⏰ 10 seconds passed - making next API call');
      makeApiCall();
    }, 10000);
    
    console.log('📅 Polling interval started');
    
  }, [onItineraryGenerated, stopApiPolling]);

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
          console.log('🎯 NEW TRACKING ID DETECTED!', {
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
          
          // STEP 1: Stop database polling
          console.log('🚫 STEP 1: Stopping database polling');
          stopPolling();
          
          // STEP 2: Start showing loading screen immediately
          console.log('📺 STEP 2: Starting loading screen');
          setIsGeneratingItinerary(true);
          if (onItineraryGenerationStart) {
            onItineraryGenerationStart();
          }
          
          // STEP 3: Start API polling for itinerary data
          console.log('🚀 STEP 3: Starting API polling for itinerary data');
          startItineraryPolling(currentTrackingId);
          
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
    console.log('📊 Starting DATABASE polling for tracking_id changes...');
    
    // Fetch immediately
    fetchEntries();
    
    // Then poll at intervals (every 2 seconds)
    intervalRef.current = setInterval(fetchEntries, interval);
    console.log('📊 Database polling interval set for every', interval, 'ms');
  }, [fetchEntries, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
    console.log('🚫 Stopped database tracking polling');
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

  // Auto-start/stop DATABASE polling based on enabled prop
  useEffect(() => {
    if (enabled && !hasGeneratedItinerary && !isApiPolling) {
      console.log('📊 Starting database polling for tracking_id changes');
      startPolling();
    } else if (isApiPolling) {
      console.log('📊 API polling active - keeping database polling stopped');
      stopPolling();
    } else if (hasGeneratedItinerary) {
      console.log('📊 Itinerary generated - stopping database polling');
      stopPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, hasGeneratedItinerary, isApiPolling, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (apiPollingRef.current) {
        clearInterval(apiPollingRef.current);
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
    isApiPolling,
    startPolling,
    stopPolling,
    clearEntry,
    dismissSuccessMessage,
    fetchEntries,
    stopApiPolling,
    startItineraryPolling
  };
};
