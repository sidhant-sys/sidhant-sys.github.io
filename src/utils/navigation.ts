// Navigation utility functions
export const navigateToItinerary = (navigate: (path: string) => void, itineraryId: string) => {
  navigate(`/itinerary/${itineraryId}/view`);
};

export const navigateToConfirmation = (navigate: (path: string) => void, itineraryId: string) => {
  navigate(`/itinerary/${itineraryId}/confirmation`);
};

export const navigateToHome = (navigate: (path: string) => void) => {
  navigate('/');
};

// Route constants
export const ROUTES = {
  HOME: '/',
  ITINERARY: (id: string) => `/itinerary/${id}/view`,
  CONFIRMATION: (id: string) => `/itinerary/${id}/confirmation`,
} as const;
