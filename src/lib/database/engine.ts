
import { createClient } from '@supabase/supabase-js'
import type { Database } from '$lib/database/supabase'

const supabaseUrl = 'supabaseurl';
const supabaseKey = 'supabaseapikey';
// Create a single supabase client for interacting with your database
export const engine = createClient<Database>(supabaseUrl, supabaseKey)