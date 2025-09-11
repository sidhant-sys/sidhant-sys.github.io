import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ItineraryApiResponse } from '../types/api';

interface ItineraryContextType {
  apiResponse: ItineraryApiResponse | null;
  setApiResponse: (response: ItineraryApiResponse | null) => void;
  clearApiResponse: () => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryProviderProps {
  children: ReactNode;
}

export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
  const [apiResponse, setApiResponse] = useState<ItineraryApiResponse | null>(null);

  const clearApiResponse = () => {
    setApiResponse(null);
  };

  return (
    <ItineraryContext.Provider value={{ apiResponse, setApiResponse, clearApiResponse }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
