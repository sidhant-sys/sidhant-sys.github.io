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
  const [loaderStartTime, setLoaderStartTime] = useState<number | null>(null);
  
  // Add ref to prevent accidental state resets
  const isGeneratingRef = useRef(false);
  const loaderStartTimeRef = useRef<number | null>(null);
  const [hasGeneratedItinerary, setHasGeneratedItinerary] = useState(false);
  const [isApiPolling, setIsApiPolling] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const apiPollingRef = useRef<NodeJS.Timeout | null>(null);

  const stopApiPolling = useCallback(() => {
    if (apiPollingRef.current) {
      clearInterval(apiPollingRef.current);
      apiPollingRef.current = null;
    }
    setIsApiPolling(false);
  }, []);

  const startItineraryPolling = useCallback((trackingId: string) => {
    // Clear any existing polling
    stopApiPolling();
    
    setIsApiPolling(true);
    
    const makeApiCall = async () => {
      try {
        const apiResponse = await getItineraryByTrackingId(trackingId);
        
        if (!apiResponse.success) {
          return; // Continue polling
        }
        
        // Check if API explicitly returned isEmpty flag (empty array case)
        if (apiResponse.isEmpty) {
          return; // Continue polling
        }
        
        // Check if response data is null/undefined
        const data = apiResponse.data;
        if (!data) {
          return; // Continue polling
        }
        
        // We have valid data - stop polling and process it
        stopApiPolling();
        
        // BULLETPROOF: Enforce minimum 5-second display time
        const minDisplayTime = 5000; // 5 seconds minimum
        const currentTime = Date.now();
        const startTime = loaderStartTimeRef.current || loaderStartTime;
        const elapsedTime = startTime ? currentTime - startTime : 0;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
        
        // Safety check: Only proceed if we're actually in generating state
        if (!isGeneratingRef.current) {
          return;
        }
        
        if (onItineraryGenerated) {
          onItineraryGenerated(data);
        }
        
        setHasGeneratedItinerary(true);
        
        // Hide loader after minimum display time
        setTimeout(() => {
          setIsGeneratingItinerary(false);
          isGeneratingRef.current = false;
          setLoaderStartTime(null);
          loaderStartTimeRef.current = null;
        }, remainingTime);
        
      } catch (err) {
        // Continue polling on error
      }
    };
    
    // Wait a moment before first call to ensure loader is properly visible
    setTimeout(() => {
      makeApiCall();
    }, 5000);
    
    // Set up interval for subsequent calls (starting after initial delay)
    setTimeout(() => {
      apiPollingRef.current = setInterval(() => {
        makeApiCall();
      }, 5000);
    }, 0);
    
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
        setError(fetchError.message);
        return;
      }

      if (data) {
        const currentTrackingId = data.tracking_id;
        
        // Check if tracking_id has changed
        if (previousTrackingId !== null && currentTrackingId !== previousTrackingId) {
          
          // First, close ElevenLabs widget if it exists
          if ((window as any).closeElevenLabsWidget) {
            (window as any).closeElevenLabsWidget();
          }
          
          setNewTrackingId(currentTrackingId);
          setShowSuccessMessage(true);
          
          // STEP 1: Stop database polling
          stopPolling();
          
          // STEP 2: Start showing loading screen immediately
          setIsGeneratingItinerary(true);
          isGeneratingRef.current = true;
          const startTime = Date.now();
          setLoaderStartTime(startTime);
          loaderStartTimeRef.current = startTime;
          
          if (onItineraryGenerationStart) {
            onItineraryGenerationStart();
          }
          
          // STEP 3: Start API polling for itinerary data
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
    
    // Fetch immediately
    fetchEntries();
    
    // Then poll at intervals (every 2 seconds)
    intervalRef.current = setInterval(fetchEntries, interval);
  }, [fetchEntries, interval]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
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
      startPolling();
    } else if (isApiPolling) {
      stopPolling();
    } else if (hasGeneratedItinerary) {
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
