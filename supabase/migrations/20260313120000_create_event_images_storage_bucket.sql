/*
  # Create Storage Bucket for Event Images

  1. Storage Bucket
    - Create `event-images` bucket for admin-uploaded event images

  2. Security Policies
    - Allow public read access (images shown on public website)
    - Allow admin (anon key) to upload/update/delete files
*/

-- Create storage bucket for event images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-images',
  'event-images',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to event images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload event images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update event images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete event images" ON storage.objects;

-- Allow public read access
CREATE POLICY "Public read access to event images"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-images');

-- Allow anyone to upload (admin-only via app logic)
CREATE POLICY "Admin can upload event images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-images');

-- Allow update
CREATE POLICY "Admin can update event images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'event-images');

-- Allow delete
CREATE POLICY "Admin can delete event images"
ON storage.objects FOR DELETE
USING (bucket_id = 'event-images');
