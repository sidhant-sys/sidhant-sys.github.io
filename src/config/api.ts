// API Configuration
export const API_CONFIG = {
  // Base URLs for different services
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  
  // Service-specific endpoints
  services: {
    utility: process.env.REACT_APP_UTILITY_API_URL || 'http://localhost:3001/api/utility',
  },
  
  // Default settings
  timeout: 10000,
  retries: 3,
  
  // Headers
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  
  // API Keys (from environment variables)
  keys: {
    amadeus: process.env.REACT_APP_AMADEUS_API_KEY,
    openai: process.env.REACT_APP_OPENAI_API_KEY,
    weather: process.env.REACT_APP_WEATHER_API_KEY,
    maps: process.env.REACT_APP_MAPS_API_KEY,
  },
};

// Create service-specific API clients
export const createApiClient = (baseUrl: string, customHeaders: Record<string, string> = {}) => {
  return {
    baseUrl,
    headers: {
      ...API_CONFIG.headers,
      ...customHeaders,
    },
    timeout: API_CONFIG.timeout,
    retries: API_CONFIG.retries,
  };
};
