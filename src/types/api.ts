// Generic API Types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiClient {
  get<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
  post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
  put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
  delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
  patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>>;
}

// Itinerary API Response Types
export interface ItineraryApiResponse {
  id: string;
  from: string;
  to: string;
  fromIata: string;
  toIata: string;
  numberOfTravellers: number;
  budget: number;
  typeOfTrip: string;
  timeframe: string;
  numberOfAdults: number;
  numberOfKids: number;
  generatedItinerary: {
    budgeted: ItineraryTier;
    premium: ItineraryTier;
    luxury: ItineraryTier;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryTier {
  overview: {
    trip_type: string;
    total_travellers: {
      adults: number;
      kids: number;
    };
    duration: string;
    total_cost: number;
    cost_breakdown: {
      flights: number;
      hotels: number;
      activities: number;
      meals: number;
      commute: number;
    };
  };
  days: ItineraryDay[];
  upsell: UpsellOption[];
}

export interface ItineraryDay {
  day: number;
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name?: string;
  description?: string;
  airline?: string;
  departure_time?: string;
  arrival_time?: string;
  class?: string;
  check_in?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  from?: string;
  to?: string;
  mode?: string;
  price: number;
  amenities?: string[];
  time?: string;
}

export interface UpsellOption {
  type: 'flight' | 'hotel' | 'activity' | 'meal' | 'commute';
  name: string;
  upgrade_cost: number;
  benefits: string[];
}
