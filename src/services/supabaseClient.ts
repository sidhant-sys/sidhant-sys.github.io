import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Database types (you can generate these from your Supabase dashboard)
export interface Database {
  public: {
    Tables: {
      [supabaseConfig.tableId]: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          // Add other columns based on your table structure
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          // Add other columns based on your table structure
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          // Add other columns based on your table structure
        };
      };
    };
  };
}

// Typed client
export const typedSupabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.anonKey
);
