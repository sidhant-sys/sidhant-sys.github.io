import { ApiResponse } from '../types/api';
import { ItineraryApiResponse } from '../types/api';

// Booking request interface
export interface BookingRequest {
  itineraryId: string;
  classType: 'economy' | 'premium' | 'luxury' | 'budgeted';
}

// Booking response interface
export interface BookingResponse {
  id: string;
  itineraryId: string;
  classType: string;
  status: string;
  bookingReference?: string;
  message?: string;
}

// Create API client for Amadeus endpoint
class ItineraryApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://amadeus.cltp.in/api';
  }


  async getItinerary(trackingId: string): Promise<ApiResponse<ItineraryApiResponse>> {
    try {
      if (!trackingId || trackingId.trim() === '') {
        throw new Error('Tracking ID is required');
      }

      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`${this.baseUrl}/v1/itineraries/?trackingId=${encodeURIComponent(trackingId)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message || errorData.error) {
            errorMessage = errorData.message || errorData.error;
          }
        } catch (e) {
          // If we can't parse error response, use status text
        }
        
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      
      
      if (!responseData) {
        throw new Error('Invalid response format from API');
      }
      
      // Check if response is an empty array - this means data is not ready yet
      if (Array.isArray(responseData) && responseData.length === 0) {
        return {
          data: null as any,
          success: true, // Success but no data yet
          isEmpty: true
        };
      }
      
      // Extract the first element from the array response or use the response directly
      const data: ItineraryApiResponse = Array.isArray(responseData) ? responseData[0] : responseData;
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from API - no valid data found');
      }
      
      
      return {
        data,
        success: true,
      };
    } catch (error) {
      
      let errorMessage = 'Failed to fetch itinerary';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return {
        data: null as any,
        success: false,
        error: errorMessage,
      };
    }
  }

  async createBooking(bookingRequest: BookingRequest): Promise<ApiResponse<BookingResponse>> {
    try {
      if (!bookingRequest.itineraryId || !bookingRequest.classType) {
        throw new Error('Itinerary ID and class type are required');
      }

      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(`${this.baseUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequest),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message || errorData.error) {
            errorMessage = errorData.message || errorData.error;
          }
        } catch (e) {
          // If we can't parse error response, use status text
        }
        
        throw new Error(errorMessage);
      }

      const data: BookingResponse = await response.json();
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from API');
      }
      
      
      return {
        data,
        success: true,
      };
    } catch (error) {
      
      let errorMessage = 'Failed to create booking';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timed out. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return {
        data: null as any,
        success: false,
        error: errorMessage,
      };
    }
  }
}

// Export singleton instance
export const itineraryApiClient = new ItineraryApiClient();

// Export functions for direct use
export const getItineraryByTrackingId = (trackingId: string) => 
  itineraryApiClient.getItinerary(trackingId);

export const createBooking = (bookingRequest: BookingRequest) =>
  itineraryApiClient.createBooking(bookingRequest);
