import { useState, useCallback, useRef } from 'react';

interface UseSimpleLoaderOptions {
  minDuration?: number; // Minimum duration in milliseconds
}

export const useSimpleLoader = (options: UseSimpleLoaderOptions = {}) => {
  const { minDuration = 5000 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showLoader = useCallback(() => {
    setIsVisible(true);
    startTimeRef.current = Date.now();
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const hideLoader = useCallback(() => {
    const now = Date.now();
    const elapsed = startTimeRef.current ? now - startTimeRef.current : 0;
    const remaining = Math.max(0, minDuration - elapsed);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      startTimeRef.current = null;
      timeoutRef.current = null;
    }, remaining);
  }, [minDuration]);

  const forceHide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
    startTimeRef.current = null;
  }, []);

  return {
    isVisible,
    showLoader,
    hideLoader,
    forceHide
  };
};
