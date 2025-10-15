import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Part = {
  id: string;
  part_number: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  order_index: number;
  created_at: string;
};

export type Section = {
  id: string;
  part_id: string;
  section_number: string;
  title: string;
  content: string;
  content_html: string | null;
  summary: string;
  summary_html: string | null;
  order_index: number;
  created_at: string;
};

export type Resource = {
  id: string;
  section_id: string | null;
  resource_type: 'video' | 'tool' | 'article';
  title: string;
  description: string;
  url: string;
  thumbnail_url: string | null;
  created_at: string;
};
