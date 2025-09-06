import { apiClient } from './apiClient';

// Utility API Service
export class UtilityApiService {
  // Weather
  static async getWeather(location: string, date?: string) {
    return apiClient.get('/weather', { 
      params: { location, date } 
    });
  }

  static async getWeatherForecast(location: string, days: number = 7) {
    return apiClient.get('/weather/forecast', { 
      params: { location, days } 
    });
  }

  // Currency
  static async convertCurrency(from: string, to: string, amount: number) {
    return apiClient.get('/currency/convert', { 
      params: { from, to, amount } 
    });
  }

  static async getExchangeRates(baseCurrency: string = 'USD') {
    return apiClient.get('/currency/rates', { 
      params: { base: baseCurrency } 
    });
  }

  // Location Services
  static async searchLocations(query: string) {
    return apiClient.get('/locations/search', { 
      params: { q: query } 
    });
  }

  static async getLocationDetails(locationId: string) {
    return apiClient.get(`/locations/${locationId}`);
  }

  static async getNearbyPlaces(lat: number, lng: number, radius: number = 1000) {
    return apiClient.get('/locations/nearby', { 
      params: { lat, lng, radius } 
    });
  }

  // Time Zone
  static async getTimeZone(location: string) {
    return apiClient.get('/timezone', { 
      params: { location } 
    });
  }

  // Translation
  static async translateText(text: string, targetLanguage: string, sourceLanguage?: string) {
    return apiClient.post('/translate', { 
      text, 
      targetLanguage, 
      sourceLanguage 
    });
  }

  // Image Processing
  static async processImage(imageData: any, operations: string[]) {
    return apiClient.post('/images/process', { 
      image: imageData, 
      operations 
    });
  }

  // File Upload
  static async uploadFile(file: File, category: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
