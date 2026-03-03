/*
  # Create coaching inquiries table

  ## Overview
  This migration creates a table to store coaching inquiry form submissions from the Voice-to-Brain 1:1 Coaching offer.

  ## New Tables
  
  ### `coaching_inquiries`
  Stores all coaching inquiry form submissions with contact details and messages.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each inquiry
  - `first_name` (text) - Inquirer's first name
  - `last_name` (text) - Inquirer's last name
  - `email` (text) - Inquirer's email address
  - `phone` (text, optional) - Inquirer's phone number (optional field)
  - `message` (text, optional) - Additional message or inquiry details
  - `created_at` (timestamptz) - Timestamp when the inquiry was submitted
  - `status` (text) - Inquiry status (new, contacted, closed)
  
  ## Security
  
  ### Row Level Security (RLS)
  - **Enabled**: Yes
  - **Policies**:
    - **INSERT**: Anyone can submit an inquiry (allows public form submissions)
    - **SELECT**: No public access (only authenticated admins can view inquiries through dashboard)
  
  ## Notes
  - Public users can INSERT their inquiries but cannot read any data
  - This ensures privacy while allowing form submissions
  - Default status is 'new' for all incoming inquiries
  - Email field is indexed for faster lookups
*/

-- Create coaching_inquiries table
CREATE TABLE IF NOT EXISTS coaching_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE coaching_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to submit inquiries (public form access)
CREATE POLICY "Allow public to submit inquiries"
  ON coaching_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to submit inquiries
CREATE POLICY "Allow authenticated to submit inquiries"
  ON coaching_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_coaching_inquiries_email ON coaching_inquiries(email);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_coaching_inquiries_status ON coaching_inquiries(status);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_coaching_inquiries_created_at ON coaching_inquiries(created_at DESC);
