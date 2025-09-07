# Supabase Integration

This project has been integrated with Supabase for database operations.

## Configuration

The Supabase configuration is located in `src/config/supabase.ts`:

- **URL**: https://dpilotjqeddivhuddcig.supabase.co
- **Table ID**: tracking_id
- **Anon Key**: Configured in the config file

## Files Added

### Configuration
- `src/config/supabase.ts` - Supabase configuration with URL and anon key

### Services
- `src/services/supabaseClient.ts` - Supabase client setup and database types
- `src/services/supabaseService.ts` - Generic CRUD operations and real-time subscriptions

### Hooks
- `src/hooks/useSupabase.ts` - React hook for easy Supabase integration in components

### Components
- `src/components/SupabaseExample.tsx` - Example component demonstrating Supabase usage

## Usage

### Basic Usage with Hook

```tsx
import { useSupabase } from '../hooks/useSupabase';

function MyComponent() {
  const { data, loading, error, create, update, delete: deleteRecord } = useSupabase();

  // Your component logic here
}
```

### Direct Service Usage

```tsx
import { supabaseService } from '../services/supabaseService';

// Create a record
const { data, error } = await supabaseService.create({ field: 'value' });

// Read all records
const { data, error } = await supabaseService.readAll();

// Update a record
const { data, error } = await supabaseService.update('id', { field: 'new value' });

// Delete a record
const { data, error } = await supabaseService.delete('id');
```

### Real-time Subscriptions

```tsx
import { useSupabaseSubscription } from '../hooks/useSupabase';

function MyComponent() {
  useSupabaseSubscription('table_name', (payload) => {
    console.log('Real-time update:', payload);
  });
}
```

## Database Schema

The current setup assumes a table with the following basic structure:
- `id` (string) - Primary key
- `created_at` (string) - Timestamp
- `updated_at` (string) - Timestamp

You can extend the `Database` interface in `src/services/supabaseClient.ts` to match your actual table schema.

## Accessing the Example

The Supabase example component is accessible through the main application:
1. Navigate to the planning step
2. Click on the "Database" tab
3. You'll see the Supabase example interface with CRUD operations

## Next Steps

1. Update the database schema types in `src/services/supabaseClient.ts` to match your actual table structure
2. Add more specific business logic to the services
3. Implement proper error handling and loading states
4. Add authentication if needed
5. Set up proper environment variables for production
