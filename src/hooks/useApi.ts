import { useState, useCallback } from 'react';
import { ApiResponse } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<ApiResponse<T>>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]): Promise<ApiResponse<T>> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiFunction(...args);
      
      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'An error occurred',
        });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
      
      return {
        data: null,
        success: false,
        error: errorMessage,
      };
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Specialized hooks for common patterns
export function useApiCall<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  immediate = false
) {
  const api = useApi(apiFunction);
  
  const call = useCallback(async (...args: any[]) => {
    return api.execute(...args);
  }, [api.execute]);

  return {
    ...api,
    call,
  };
}
