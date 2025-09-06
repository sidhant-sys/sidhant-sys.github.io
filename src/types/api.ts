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
