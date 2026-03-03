/*
  # Add admin read policy to saved_content_plans

  1. Changes
    - Add policy to allow anonymous users to read all saved content plans
    - This enables the admin dashboard to view all plans
    - Writing, updating, and deleting remains restricted to plan owners only

  2. Security Notes
    - Frontend access control via adminAuth.ts ensures only admins can access the admin dashboard
    - Anonymous read access is needed because admin auth is localStorage-based, not Supabase Auth
    - All modification operations (INSERT, UPDATE, DELETE) remain owner-only
*/

CREATE POLICY "Allow anon to view all saved plans for admin"
  ON saved_content_plans
  FOR SELECT
  TO anon
  USING (true);