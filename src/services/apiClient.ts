import { ApiResponse, ApiError, ApiConfig, RequestConfig, ApiClient } from '../types/api';

class HttpClient implements ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async makeRequest<T = any>(requestConfig: RequestConfig): Promise<ApiResponse<T>> {
    const { method, url, data, params, headers = {}, timeout } = requestConfig;
    
    // Build full URL
    const fullUrl = this.buildUrl(url, params);
    
    // Merge headers
    const mergedHeaders = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...headers,
    };

    // Create request options
    const requestOptions: RequestInit = {
      method,
      headers: mergedHeaders,
      signal: timeout ? AbortSignal.timeout(timeout) : undefined,
    };

    // Add body for non-GET requests
    if (data && method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(fullUrl, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      return {
        data: responseData,
        success: true,
      };
    } catch (error) {
      const apiError: ApiError = {
        code: 'REQUEST_FAILED',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      };

      return {
        data: null,
        success: false,
        error: apiError.message,
      };
    }
  }

  private buildUrl(url: string, params?: Record<string, any>): string {
    const baseUrl = this.config.baseUrl.endsWith('/') 
      ? this.config.baseUrl.slice(0, -1) 
      : this.config.baseUrl;
    
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return `${fullUrl}?${searchParams.toString()}`;
    }
    
    return fullUrl;
  }

  async get<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'GET',
      url,
      ...config,
    });
  }

  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'POST',
      url,
      data,
      ...config,
    });
  }

  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'PUT',
      url,
      data,
      ...config,
    });
  }

  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'DELETE',
      url,
      ...config,
    });
  }

  async patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({
      method: 'PATCH',
      url,
      data,
      ...config,
    });
  }
}

// Create default API client instance
const defaultConfig: ApiConfig = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 5000,
  retries: 3,
  headers: {
    'Accept': 'application/json',
  },
};

export const apiClient = new HttpClient(defaultConfig);

// Export the class for custom instances
export { HttpClient };
