/*
  # Create Course Welcome Content System

  1. New Tables
    - `member_course_welcome_content`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to member_courses)
      - `title` (text) - Welcome section title
      - `description` (text) - Welcome description
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `member_course_welcome_cards`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to member_courses)
      - `title` (text) - Card title
      - `description` (text) - Card description
      - `icon_name` (text) - Lucide icon name
      - `link_url` (text, nullable) - Optional link URL
      - `link_text` (text, nullable) - Optional link text
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow anyone to read welcome content
    - Only admins can modify content

  3. Initial Data
    - Seed welcome content for KI-Manager Kurs
*/

-- Create course welcome content table
CREATE TABLE IF NOT EXISTS member_course_welcome_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES member_courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(course_id, order_index)
);

-- Create course welcome cards table
CREATE TABLE IF NOT EXISTS member_course_welcome_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES member_courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  icon_name text DEFAULT 'Sparkles'::text,
  link_url text,
  link_text text,
  order_index integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE member_course_welcome_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_course_welcome_cards ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view course welcome content"
  ON member_course_welcome_content FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view course welcome cards"
  ON member_course_welcome_cards FOR SELECT
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_course_welcome_content_course_id ON member_course_welcome_content(course_id);
CREATE INDEX IF NOT EXISTS idx_course_welcome_cards_course_id ON member_course_welcome_cards(course_id);

-- Seed initial welcome content for KI-Manager Kurs
DO $$
DECLARE
  ki_manager_course_id uuid;
BEGIN
  -- Get KI-Manager course ID
  SELECT id INTO ki_manager_course_id 
  FROM member_courses 
  WHERE slug = 'ki-manager-ausbildung';
  
  IF ki_manager_course_id IS NOT NULL THEN
    -- Insert welcome content
    INSERT INTO member_course_welcome_content (course_id, title, description, order_index)
    VALUES (
      ki_manager_course_id,
      'Willkommen zur KI-Manager Ausbildung!',
      'Herzlich willkommen zu deiner KI-Manager Ausbildung! Hier lernst du, wie du KI-Tools effektiv in deinem Business einsetzt und deine Produktivität maximierst. Diese umfassende Ausbildung vermittelt dir alles, was du brauchst, um zum KI-Experten zu werden.',
      1
    ) ON CONFLICT (course_id, order_index) DO NOTHING;

    -- Insert welcome cards
    INSERT INTO member_course_welcome_cards (course_id, title, description, icon_name, order_index)
    VALUES 
      (
        ki_manager_course_id,
        'Schritt für Schritt lernen',
        'Jedes Modul baut auf dem vorherigen auf. Arbeite die Lektionen in deinem eigenen Tempo durch.',
        'BookOpen',
        1
      ),
      (
        ki_manager_course_id,
        'Praktische Übungen',
        'Wende das Gelernte direkt in praktischen Übungen an und sammle wertvolle Erfahrungen.',
        'Target',
        2
      ),
      (
        ki_manager_course_id,
        'Zertifikat erhalten',
        'Nach erfolgreichem Abschluss erhältst du ein offizielles Zertifikat.',
        'Award',
        3
      ),
      (
        ki_manager_course_id,
        'Community Support',
        'Tausche dich mit anderen Teilnehmern aus und profitiere von der Community.',
        'Users',
        4
      )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
