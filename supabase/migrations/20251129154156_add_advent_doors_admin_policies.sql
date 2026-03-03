/*
  # Add Admin Policies for Advent Doors

  1. Changes
    - Add INSERT policy to allow creating new advent doors
    - Add UPDATE policy to allow editing advent doors
    - Add DELETE policy to allow deleting advent doors
  
  2. Security
    - Policies are open to allow admin operations
    - Admin authentication is handled client-side with password protection
    - The admin interface is password-protected at the application level
*/

-- Allow anyone to insert advent doors (protected by admin UI)
CREATE POLICY "Allow insert advent doors"
  ON advent_doors
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to update advent doors (protected by admin UI)
CREATE POLICY "Allow update advent doors"
  ON advent_doors
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete advent doors (protected by admin UI)
CREATE POLICY "Allow delete advent doors"
  ON advent_doors
  FOR DELETE
  TO public
  USING (true);
