import { useState, useEffect, useCallback, useMemo } from 'react';
import { SupabaseService } from '../services/supabaseService';
import { supabaseConfig } from '../config/supabase';

export interface UseSupabaseOptions {
  tableName?: string;
  autoFetch?: boolean;
  filters?: Record<string, any>;
}

export interface UseSupabaseReturn<T = any> {
  data: T[] | null;
  loading: boolean;
  error: any;
  create: (item: any) => Promise<{ data: T | null; error: any }>;
  update: (id: string, item: any) => Promise<{ data: T | null; error: any }>;
  delete: (id: string) => Promise<{ data: T | null; error: any }>;
  refresh: () => Promise<void>;
  service: SupabaseService;
}

export function useSupabase<T = any>(
  options: UseSupabaseOptions = {}
): UseSupabaseReturn<T> {
  const {
    tableName = supabaseConfig.tableId,
    autoFetch = true,
    filters = {}
  } = options;

  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const service = useMemo(() => new SupabaseService(tableName), [tableName]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: result, error: fetchError } = await service.readAll(filters);
      
      if (fetchError) {
        setError(fetchError);
      } else {
        setData(result as T[]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [service, JSON.stringify(filters)]);

  const create = useCallback(async (item: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await service.create(item);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setData(prev => prev ? [...prev, result.data as T] : [result.data as T]);
      }
      
      return result;
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [service]);

  const update = useCallback(async (id: string, item: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await service.update(id, item);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setData(prev => 
          prev ? prev.map(item => 
            (item as any).id === id ? result.data as T : item
          ) : [result.data as T]
        );
      }
      
      return result;
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [service]);

  const deleteItem = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await service.delete(id);
      
      if (result.error) {
        setError(result.error);
      } else {
        setData(prev => prev ? prev.filter(item => (item as any).id !== id) : null);
      }
      
      return result;
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [service]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Auto-fetch data on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    create: create as (item: any) => Promise<{ data: T | null; error: any }>,
    update: update as (id: string, item: any) => Promise<{ data: T | null; error: any }>,
    delete: deleteItem as (id: string) => Promise<{ data: T | null; error: any }>,
    refresh,
    service
  };
}

// Hook for real-time subscriptions
export function useSupabaseSubscription(
  tableName: string = supabaseConfig.tableId,
  callback?: (payload: any) => void
) {
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    if (callback) {
      const service = new SupabaseService(tableName);
      const sub = service.subscribeToChanges(callback);
      setSubscription(sub);

      return () => {
        if (sub) {
          sub.unsubscribe();
        }
      };
    }
  }, [tableName, callback]);

  return subscription;
}
