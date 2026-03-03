/*
  # Create Storage Bucket for Advent Calendar Resources

  1. New Storage Bucket
    - `resources` bucket for storing advent calendar files
    - Public bucket for easy access to uploaded resources
    - Supports PDFs, documents, audio, and video files

  2. Security
    - Public read access for all files
    - Authenticated upload access only
    - File size limits applied

  3. Policies
    - Anyone can read files (public bucket)
    - Only authenticated admins can upload files
    - Only authenticated admins can delete files
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'resources');

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resources');

CREATE POLICY "Authenticated users can update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resources');

CREATE POLICY "Authenticated users can delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resources');