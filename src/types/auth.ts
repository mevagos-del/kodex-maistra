import type { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'editor' | 'user';

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type AuthState = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isConfigured: boolean;
  isAdmin: boolean;
  canAccessAdmin: boolean;
};
