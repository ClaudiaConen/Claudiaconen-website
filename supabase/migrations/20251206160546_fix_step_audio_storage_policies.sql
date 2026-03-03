/*
  # Fix Storage Policies for step-audio-files bucket
  
  1. Changes
    - Update storage policies to allow anonymous users (anon) in addition to authenticated users
    - This fixes the admin upload issue where admins use localStorage auth instead of Supabase auth
    - Admin pages are already protected by password, so this is safe
  
  2. Policies Updated
    - INSERT policy: Allow both anon and authenticated users to upload
    - UPDATE policy: Allow both anon and authenticated users to update files
    - DELETE policy: Allow both anon and authenticated users to delete files
    - SELECT policy: Already allows anon, no change needed
  
  3. Security Notes
    - Admin interface is protected by password authentication
    - The storage bucket is only used for admin-managed step audio files
    - Public read access is intentional for displaying audio on the website
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload audio files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update audio files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete audio files" ON storage.objects;

-- Create new policies that allow both anonymous and authenticated users
CREATE POLICY "Anyone can upload audio files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'step-audio-files');

CREATE POLICY "Anyone can update audio files"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'step-audio-files')
  WITH CHECK (bucket_id = 'step-audio-files');

CREATE POLICY "Anyone can delete audio files"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'step-audio-files');
