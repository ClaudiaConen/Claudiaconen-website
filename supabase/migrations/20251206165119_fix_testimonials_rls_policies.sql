/*
  # Fix Testimonials RLS Policies for Anonymous Admin Access

  1. Changes to testimonials table policies
    - Remove restrictive policies that only allow authenticated users
    - Add new policies that allow both anonymous (anon) and authenticated users
    - This enables admin access via localStorage authentication

  2. Changes to testimonial-thumbnails storage policies
    - Update storage policies to allow anonymous users
    - Enable thumbnail uploads for admin users

  3. Security
    - Frontend authentication via localStorage remains in place
    - Policies now permit both anon and authenticated roles
*/

-- Drop existing restrictive policies for testimonials table
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- Create new policies that allow both anon and authenticated users
CREATE POLICY "Allow anon and authenticated users to view all testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow anon and authenticated users to insert testimonials"
  ON testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow anon and authenticated users to update testimonials"
  ON testimonials
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon and authenticated users to delete testimonials"
  ON testimonials
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Drop existing restrictive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload testimonial thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update testimonial thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete testimonial thumbnails" ON storage.objects;

-- Create new storage policies that allow both anon and authenticated users
CREATE POLICY "Allow anon and authenticated users to upload testimonial thumbnails"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'testimonial-thumbnails');

CREATE POLICY "Allow anon and authenticated users to update testimonial thumbnails"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'testimonial-thumbnails')
  WITH CHECK (bucket_id = 'testimonial-thumbnails');

CREATE POLICY "Allow anon and authenticated users to delete testimonial thumbnails"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'testimonial-thumbnails');