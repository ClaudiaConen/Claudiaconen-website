/*
  # Create Member Courses System

  1. New Tables
    - `member_courses`
      - `id` (uuid, primary key)
      - `title` (text) - Course title (e.g., "KI-Manager Ausbildung")
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Course description
      - `thumbnail_url` (text, nullable) - Course thumbnail image
      - `difficulty` (text) - Difficulty level: Einsteiger, Fortgeschritten, Expert
      - `instructor_name` (text) - Instructor name
      - `total_duration_minutes` (integer) - Estimated total duration
      - `is_published` (boolean) - Whether course is published
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `member_student_course_progress`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key to member_students)
      - `course_id` (uuid, foreign key to member_courses)
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz, nullable)
      - `completion_percentage` (integer, 0-100)
      - `total_modules` (integer)
      - `completed_modules` (integer)
      - `updated_at` (timestamptz)

  2. Changes
    - Add `course_id` column to `member_course_modules` table
    - Update existing modules to link to the KI-Manager course

  3. Security
    - Enable RLS on all new tables
    - Allow anonymous and authenticated users to read published courses
    - Students can read their own course progress
    - Students can update their own course progress

  4. Initial Data
    - Create the "KI-Manager Ausbildung" course
    - Link existing modules to this course
*/

-- Create member_courses table
CREATE TABLE IF NOT EXISTS member_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  difficulty text DEFAULT 'Einsteiger'::text CHECK (difficulty IN ('Einsteiger', 'Fortgeschritten', 'Expert')),
  instructor_name text DEFAULT 'Claudia Conen'::text,
  total_duration_minutes integer DEFAULT 0 CHECK (total_duration_minutes >= 0),
  is_published boolean DEFAULT false,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE member_courses ENABLE ROW LEVEL SECURITY;

-- Create policies for member_courses
CREATE POLICY "Anyone can view published courses"
  ON member_courses FOR SELECT
  USING (is_published = true);

-- Add course_id to member_course_modules
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_modules' AND column_name = 'course_id'
  ) THEN
    ALTER TABLE member_course_modules 
    ADD COLUMN course_id uuid REFERENCES member_courses(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create member_student_course_progress table
CREATE TABLE IF NOT EXISTS member_student_course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES member_courses(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  total_modules integer DEFAULT 0 CHECK (total_modules >= 0),
  completed_modules integer DEFAULT 0 CHECK (completed_modules >= 0),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id)
);

-- Enable RLS
ALTER TABLE member_student_course_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for member_student_course_progress
CREATE POLICY "Students can view own course progress"
  ON member_student_course_progress FOR SELECT
  USING (student_id = (SELECT id FROM member_students WHERE access_code = current_setting('request.jwt.claims', true)::json->>'access_code'));

CREATE POLICY "Students can insert own course progress"
  ON member_student_course_progress FOR INSERT
  WITH CHECK (student_id = (SELECT id FROM member_students WHERE access_code = current_setting('request.jwt.claims', true)::json->>'access_code'));

CREATE POLICY "Students can update own course progress"
  ON member_student_course_progress FOR UPDATE
  USING (student_id = (SELECT id FROM member_students WHERE access_code = current_setting('request.jwt.claims', true)::json->>'access_code'));

-- Insert initial KI-Manager course
INSERT INTO member_courses (
  title,
  slug,
  description,
  difficulty,
  instructor_name,
  total_duration_minutes,
  is_published,
  order_index
) VALUES (
  'KI-Manager Ausbildung',
  'ki-manager-ausbildung',
  'Lerne, wie du KI-Tools effektiv in deinem Business einsetzt und deine Produktivität maximierst. Diese umfassende Ausbildung vermittelt dir alles, was du brauchst, um zum KI-Experten zu werden.',
  'Einsteiger',
  'Claudia Conen',
  480,
  true,
  1
) ON CONFLICT (slug) DO NOTHING;

-- Link existing modules to the KI-Manager course
DO $$
DECLARE
  ki_manager_course_id uuid;
BEGIN
  SELECT id INTO ki_manager_course_id 
  FROM member_courses 
  WHERE slug = 'ki-manager-ausbildung';
  
  IF ki_manager_course_id IS NOT NULL THEN
    UPDATE member_course_modules
    SET course_id = ki_manager_course_id
    WHERE course_id IS NULL;
  END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_member_course_modules_course_id ON member_course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_member_student_course_progress_student_id ON member_student_course_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_member_student_course_progress_course_id ON member_student_course_progress(course_id);
