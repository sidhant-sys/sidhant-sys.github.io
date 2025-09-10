import { useState, useCallback } from 'react';
import { createBooking, BookingRequest, BookingResponse } from '../services/itineraryApi';
import { TierType } from '../components/TierSelector';

export interface UseBookingOptions {
  onBookingSuccess?: (booking: BookingResponse) => void;
  onBookingError?: (error: string) => void;
}

export const useBooking = (options: UseBookingOptions = {}) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [lastBooking, setLastBooking] = useState<BookingResponse | null>(null);

  const { onBookingSuccess, onBookingError } = options;

  const handleBooking = useCallback(async (
    itineraryId: string, 
    classType: TierType
  ): Promise<BookingResponse | null> => {
    if (!itineraryId || !classType) {
      const error = 'Missing required booking information';
      setBookingError(error);
      onBookingError?.(error);
      return null;
    }

    setIsBooking(true);
    setBookingError(null);

    try {

      // Map tier types to API class types
      const classTypeMapping: Record<TierType, BookingRequest['classType']> = {
        'budgeted': 'budgeted',
        'premium': 'premium', 
        'luxury': 'luxury'
      };

      const bookingRequest: BookingRequest = {
        itineraryId,
        classType: classTypeMapping[classType] || 'budgeted'
      };

      const response = await createBooking(bookingRequest);

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Booking failed');
      }

      setLastBooking(response.data);
      onBookingSuccess?.(response.data);
      
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setBookingError(errorMessage);
      onBookingError?.(errorMessage);
      return null;
    } finally {
      setIsBooking(false);
    }
  }, [onBookingSuccess, onBookingError]);

  const resetBookingState = useCallback(() => {
    setBookingError(null);
    setLastBooking(null);
  }, []);

  return {
    isBooking,
    bookingError,
    lastBooking,
    handleBooking,
    resetBookingState
  };
};
