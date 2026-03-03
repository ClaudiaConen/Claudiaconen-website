/*
  # Create Testimonials Table and Storage

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `role` (text) - Position/Company
      - `vimeo_url` (text) - Vimeo video URL
      - `thumbnail_path` (text) - Path to uploaded thumbnail in storage
      - `display_order` (integer) - Order for display
      - `is_active` (boolean) - Active/Inactive toggle
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Storage
    - Create `testimonial-thumbnails` bucket for thumbnail uploads
    - Public read access
    - Authenticated users can upload

  3. Security
    - Enable RLS on `testimonials` table
    - Public can read active testimonials
    - Authenticated users can manage testimonials
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  vimeo_url text NOT NULL,
  thumbnail_path text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read active testimonials
CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all testimonials
CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert testimonials
CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update testimonials
CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete testimonials
CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for testimonial thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('testimonial-thumbnails', 'testimonial-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for testimonial thumbnails
CREATE POLICY "Anyone can view testimonial thumbnails"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'testimonial-thumbnails');

CREATE POLICY "Authenticated users can upload testimonial thumbnails"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'testimonial-thumbnails');

CREATE POLICY "Authenticated users can update testimonial thumbnails"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'testimonial-thumbnails');

CREATE POLICY "Authenticated users can delete testimonial thumbnails"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'testimonial-thumbnails');

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);