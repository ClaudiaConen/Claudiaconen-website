import { createClient } from '@supabase/supabase-js';

// CMS Supabase Client - für editierbare Inhalte (Events, Mentoring, Seiteninhalte)
// Verwendet Einstein's Supabase-Projekt
const CMS_SUPABASE_URL = 'https://eammlfkjtbqcubxpfxes.supabase.co';
const CMS_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbW1sZmtqdGJxY3VieHBmeGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0OTcxNDcsImV4cCI6MjA4MDA3MzE0N30.6aBH-iPGT5Ez7f1GDphvplKde-ZBsiENZqB_5XgXBPQ';

export const supabaseCms = createClient(CMS_SUPABASE_URL, CMS_SUPABASE_ANON_KEY);

// Types
export interface WebsiteEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  event_date: string | null;
  event_time: string;
  end_date: string | null;
  location: string;
  event_type: 'online' | 'offline' | 'hybrid';
  category: 'keynote' | 'workshop' | 'mentoring' | 'webinar' | 'networking' | 'other';
  image_url: string;
  registration_link: string;
  price_text: string;
  max_participants: number | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MentoringPackage {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  features: string[];
  price_text: string;
  duration_text: string;
  cta_text: string;
  cta_link: string;
  is_highlighted: boolean;
  is_active: boolean;
  display_order: number;
  icon: string;
  color_theme: string;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  page_slug: string;
  section_key: string;
  content: string;
  content_type: 'text' | 'richtext' | 'json';
  label: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
