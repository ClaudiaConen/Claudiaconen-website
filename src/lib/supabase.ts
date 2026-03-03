import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface BetaSignup {
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  interest: string;
}
