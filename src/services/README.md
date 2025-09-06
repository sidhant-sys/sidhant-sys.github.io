# API Layer Documentation

## Overview
This API layer provides a clean, generic interface for making HTTP requests to various services. It's designed to be flexible and easy to use.

## Basic Usage

### 1. Direct API Client Usage
```typescript
import { apiClient } from './services';

// GET request
const response = await apiClient.get('/users/123');

// POST request
const response = await apiClient.post('/users', { name: 'John', email: 'john@example.com' });

// With custom headers
const response = await apiClient.get('/protected', {
  headers: { Authorization: 'Bearer token' }
});
```

### 2. Service-Specific APIs
```typescript
import { UtilityApiService } from './services';

// Utility APIs
const weather = await UtilityApiService.getWeather('Paris');
const currency = await UtilityApiService.convertCurrency('USD', 'EUR', 100);
const locations = await UtilityApiService.searchLocations('Paris');
```

### 3. Using React Hooks
```typescript
import { useApi } from './hooks/useApi';
import { UtilityApiService } from './services';

function WeatherWidget() {
  const { data, loading, error, execute } = useApi(UtilityApiService.getWeather);
  
  const handleGetWeather = async () => {
    await execute('Paris');
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Temperature: {data.temperature}°C</p>}
      <button onClick={handleGetWeather}>Get Weather</button>
    </div>
  );
}
```

### 4. Unified API Service
```typescript
import { ApiService } from './services';

// Using the unified service
const weather = await ApiService.utility.getWeather(location);
const currency = await ApiService.utility.convertCurrency('USD', 'EUR', 100);

// Or direct API calls
const response = await ApiService.get('/custom-endpoint');
```

## Configuration

### Environment Variables
Create a `.env` file in your project root:
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_UTILITY_API_URL=http://localhost:3001/api/utility
REACT_APP_WEATHER_API_KEY=your_weather_key
REACT_APP_MAPS_API_KEY=your_maps_key
```

### Custom API Client
```typescript
import { HttpClient } from './services/apiClient';

const customClient = new HttpClient({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 1,
  headers: {
    'Authorization': 'Bearer token',
    'X-Custom-Header': 'value'
  }
});
```

## Error Handling

All API calls return a standardized response:
```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
```

Example error handling:
```typescript
const response = await apiClient.get('/users/123');

if (response.success) {
  console.log('Data:', response.data);
} else {
  console.error('Error:', response.error);
}
```

## Features

- ✅ Generic HTTP client with TypeScript support
- ✅ Automatic JSON parsing
- ✅ Request/response interceptors
- ✅ Timeout handling
- ✅ Retry logic
- ✅ Error standardization
- ✅ React hooks integration
- ✅ Service-specific APIs
- ✅ Environment configuration
- ✅ Custom headers support
- ✅ Query parameter handling
