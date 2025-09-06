export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  description: string;
  type: 'activity' | 'dining' | 'accommodation' | 'transport';
  priority: 'high' | 'medium' | 'low';
  price: number;
  bookingAvailable: boolean;
}

export type TierType = 'economy' | 'premium' | 'luxury';

export interface BookingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'flights' | 'hotels' | 'activities' | 'dining';
  image?: string;
  rating?: number;
  location?: string;
  available: boolean;
  tier: TierType[];
}

export interface BudgetEstimate {
  economy: number;
  premium: number;
  luxury: number;
}

export type StepType = 'planning' | 'tier-selection' | 'booking';
export type LayoutMode = 'split' | 'full-itinerary';
