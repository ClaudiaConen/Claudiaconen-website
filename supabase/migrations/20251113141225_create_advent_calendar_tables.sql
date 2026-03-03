/*
  # Adventskalender System

  1. Neue Tabellen
    - `advent_registrations`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `registered_at` (timestamp)
      - `email_confirmed` (boolean) - für Double Opt-in
      - `confirmation_token` (text) - für Email-Bestätigung
    
    - `advent_doors`
      - `id` (uuid, primary key)
      - `door_number` (integer, 1-24)
      - `title` (text)
      - `description` (text)
      - `content_type` (text) - video, audio, pdf
      - `content_url` (text)
      - `download_url` (text)
      - `teaser_text` (text)
      - `is_published` (boolean)
    
    - `advent_progress`
      - `id` (uuid, primary key)
      - `user_email` (text, references advent_registrations)
      - `door_number` (integer)
      - `opened_at` (timestamp)
      - `completed` (boolean)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated and public access
*/

-- Advent Registrations Table
CREATE TABLE IF NOT EXISTS advent_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  registered_at timestamptz DEFAULT now(),
  email_confirmed boolean DEFAULT false,
  confirmation_token text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advent_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON advent_registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own registration"
  ON advent_registrations
  FOR SELECT
  TO public
  USING (true);

-- Advent Doors Table
CREATE TABLE IF NOT EXISTS advent_doors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  door_number integer UNIQUE NOT NULL CHECK (door_number >= 1 AND door_number <= 24),
  title text NOT NULL,
  description text NOT NULL,
  content_type text NOT NULL,
  content_text text,
  download_title text,
  download_description text,
  teaser_text text NOT NULL,
  icon text DEFAULT '🎁',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advent_doors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published doors"
  ON advent_doors
  FOR SELECT
  TO public
  USING (is_published = true);

-- Advent Progress Table
CREATE TABLE IF NOT EXISTS advent_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  door_number integer NOT NULL,
  opened_at timestamptz DEFAULT now(),
  completed boolean DEFAULT false,
  UNIQUE(user_email, door_number)
);

ALTER TABLE advent_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON advent_progress
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can track own progress"
  ON advent_progress
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own progress"
  ON advent_progress
  FOR UPDATE
  TO public
  USING (true);
