// Export all API services
export { apiClient, HttpClient } from './apiClient';
export { UtilityApiService } from './utilityApi';

// Re-export types
export type { 
  ApiResponse, 
  ApiError, 
  ApiConfig, 
  RequestConfig, 
  ApiClient 
} from '../types/api';

// Create a unified API service
export class ApiService {
  static utility = UtilityApiService;
  
  // Generic methods
  static async get<T = any>(url: string, config?: any) {
    return apiClient.get<T>(url, config);
  }
  
  static async post<T = any>(url: string, data?: any, config?: any) {
    return apiClient.post<T>(url, data, config);
  }
  
  static async put<T = any>(url: string, data?: any, config?: any) {
    return apiClient.put<T>(url, data, config);
  }
  
  static async delete<T = any>(url: string, config?: any) {
    return apiClient.delete<T>(url, config);
  }
  
  static async patch<T = any>(url: string, data?: any, config?: any) {
    return apiClient.patch<T>(url, data, config);
  }
}
