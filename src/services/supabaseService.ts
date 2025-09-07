import { supabase, typedSupabase, Database } from './supabaseClient';
import { supabaseConfig } from '../config/supabase';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];

export class SupabaseService {
  private tableName: string;

  constructor(tableName: string = supabaseConfig.tableId) {
    this.tableName = tableName;
  }

  // Generic CRUD operations
  async create<T extends TableName>(
    data: TableInsert<T>
  ): Promise<{ data: TableRow<T> | null; error: any }> {
    const { data: result, error } = await typedSupabase
      .from(this.tableName as T)
      .insert(data)
      .select()
      .single();

    return { data: result, error };
  }

  async read<T extends TableName>(
    id: string
  ): Promise<{ data: TableRow<T> | null; error: any }> {
    const { data, error } = await typedSupabase
      .from(this.tableName as T)
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }

  async readAll<T extends TableName>(
    filters?: Record<string, any>
  ): Promise<{ data: TableRow<T>[] | null; error: any }> {
    let query = typedSupabase.from(this.tableName as T).select('*');

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    return { data, error };
  }

  async update<T extends TableName>(
    id: string,
    data: TableUpdate<T>
  ): Promise<{ data: TableRow<T> | null; error: any }> {
    const { data: result, error } = await typedSupabase
      .from(this.tableName as T)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    return { data: result, error };
  }

  async delete<T extends TableName>(
    id: string
  ): Promise<{ data: TableRow<T> | null; error: any }> {
    const { data, error } = await typedSupabase
      .from(this.tableName as T)
      .delete()
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  // Real-time subscriptions
  subscribeToChanges(
    callback: (payload: any) => void
  ) {
    let subscription = typedSupabase
      .channel(`${this.tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: this.tableName,
        },
        callback
      )
      .subscribe();

    return subscription;
  }

  // Utility methods
  async getTableInfo(): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('*')
      .eq('table_name', this.tableName);

    return { data, error };
  }
}

// Export a default instance for the main table
export const supabaseService = new SupabaseService();
