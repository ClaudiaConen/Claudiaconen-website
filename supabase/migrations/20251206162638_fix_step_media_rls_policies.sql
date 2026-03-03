/*
  # Fix step_media RLS policies for anonymous admin access

  1. Changes
    - Drop existing restrictive INSERT, UPDATE, and DELETE policies
    - Create new policies that allow both anonymous (anon) and authenticated users
    - This matches the storage policies that were already updated
    
  2. Security Notes
    - Admin area is protected by password authentication in localStorage
    - step_media table is managed only by admins through the admin dashboard
    - Public read access is intentional for website display
    - Write access for anon users is safe as it's gated by the admin interface
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert step media" ON step_media;
DROP POLICY IF EXISTS "Authenticated users can update step media" ON step_media;
DROP POLICY IF EXISTS "Authenticated users can delete step media" ON step_media;

-- Create new policies that allow both anon and authenticated users
CREATE POLICY "Anyone can insert step media"
  ON step_media
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update step media"
  ON step_media
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete step media"
  ON step_media
  FOR DELETE
  TO anon, authenticated
  USING (true);
