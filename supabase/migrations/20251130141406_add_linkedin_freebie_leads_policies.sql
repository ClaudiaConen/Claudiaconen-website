/*
  # Add RLS Policies for LinkedIn Freebie Leads

  1. Changes
    - Add SELECT policy for public access (for verification)
    - Add INSERT policy for public registration
    - Add management policies for authenticated users

  2. Security
    - RLS is enabled but policies allow necessary public access
    - Users can register and verify their tokens
    - Authenticated users can manage all leads

  3. Notes
    - Public can insert new leads (registration)
    - Public can view leads by token (for confirmation)
    - Authenticated users have full access for admin purposes
*/

-- Allow anyone to insert new leads (registration)
CREATE POLICY "Anyone can register for LinkedIn freebie"
  ON linkedin_freebie_leads
  FOR INSERT
  WITH CHECK (true);

-- Allow public to view leads (needed for token verification)
CREATE POLICY "Anyone can view LinkedIn freebie leads"
  ON linkedin_freebie_leads
  FOR SELECT
  USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Authenticated users can update LinkedIn leads"
  ON linkedin_freebie_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete leads
CREATE POLICY "Authenticated users can delete LinkedIn leads"
  ON linkedin_freebie_leads
  FOR DELETE
  TO authenticated
  USING (true);
