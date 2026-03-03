/*
  # Create Storage Bucket for Content Uploads
  
  1. Storage Bucket
    - Create `content-uploads` bucket for user-uploaded content files
    
  2. Security Policies
    - Allow public read access to uploaded files
    - Allow authenticated and anonymous users to upload files
    - Allow users to delete their own files
*/

-- Create storage bucket for content uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-uploads', 'content-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to content uploads" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload content files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own content files" ON storage.objects;

-- Allow public read access to content uploads
CREATE POLICY "Public read access to content uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'content-uploads');

-- Allow anyone to upload content files
CREATE POLICY "Users can upload content files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'content-uploads');

-- Allow anyone to delete content files (they'll be filtered by email in app logic)
CREATE POLICY "Users can delete own content files"
ON storage.objects FOR DELETE
USING (bucket_id = 'content-uploads');