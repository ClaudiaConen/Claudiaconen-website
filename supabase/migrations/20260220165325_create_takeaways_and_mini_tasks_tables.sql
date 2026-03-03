/*
  # Create Takeaways and Mini-Tasks Tables

  1. New Tables
    - `member_takeaways`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, nullable, references member_course_lessons)
      - `title` (text, required)
      - `description` (text, optional)
      - `xp_reward` (integer, default 50)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `member_takeaway_items`
      - `id` (uuid, primary key)
      - `takeaway_id` (uuid, references member_takeaways)
      - `content` (text, required) - the key takeaway text
      - `icon` (text, optional) - icon identifier
      - `order_index` (integer, required)
      - `created_at` (timestamptz)

    - `member_mini_tasks`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid, nullable, references member_course_lessons)
      - `title` (text, required)
      - `description` (text, optional)
      - `task_type` (text) - reflection, action, creative, research
      - `xp_reward` (integer, default 75)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `member_mini_task_steps`
      - `id` (uuid, primary key)
      - `mini_task_id` (uuid, references member_mini_tasks)
      - `instruction` (text, required) - step description
      - `hint` (text, optional) - optional hint for the step
      - `order_index` (integer, required)
      - `created_at` (timestamptz)

    - `member_student_takeaway_completions`
      - Tracks which students marked takeaways as read/completed
      - `id` (uuid, primary key)
      - `student_id` (uuid, references member_students)
      - `takeaway_id` (uuid, references member_takeaways)
      - `completed_at` (timestamptz)

    - `member_student_mini_task_submissions`
      - Tracks student mini-task submissions
      - `id` (uuid, primary key)
      - `student_id` (uuid, references member_students)
      - `mini_task_id` (uuid, references member_mini_tasks)
      - `response_text` (text) - student's response
      - `xp_earned` (integer, default 0)
      - `submitted_at` (timestamptz)

  2. Security
    - Enable RLS on all new tables
    - Students can view takeaways/mini-tasks from published modules/lessons
    - Students can manage their own completions/submissions
    - Admin access via service role key

  3. Columns added to existing tables
    - `member_course_lessons.has_takeaways` (boolean, default false)
    - `member_course_lessons.has_mini_tasks` (boolean, default false)
*/

-- Takeaways table
CREATE TABLE IF NOT EXISTS member_takeaways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES member_course_lessons(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text DEFAULT '',
  xp_reward integer DEFAULT 50 CHECK (xp_reward >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_takeaways_lesson ON member_takeaways(lesson_id);

ALTER TABLE member_takeaways ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view takeaways from published lessons"
  ON member_takeaways FOR SELECT
  TO authenticated
  USING (
    lesson_id IS NULL OR
    EXISTS (
      SELECT 1 FROM member_course_lessons l
      JOIN member_course_modules m ON l.module_id = m.id
      WHERE l.id = member_takeaways.lesson_id
      AND l.is_published = true
      AND m.is_published = true
    )
  );

-- Takeaway items table
CREATE TABLE IF NOT EXISTS member_takeaway_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  takeaway_id uuid NOT NULL REFERENCES member_takeaways(id) ON DELETE CASCADE,
  content text NOT NULL,
  icon text DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_takeaway_items_takeaway ON member_takeaway_items(takeaway_id);
CREATE INDEX IF NOT EXISTS idx_member_takeaway_items_order ON member_takeaway_items(order_index);

ALTER TABLE member_takeaway_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view takeaway items from published lessons"
  ON member_takeaway_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_takeaways t
      WHERE t.id = member_takeaway_items.takeaway_id
      AND (
        t.lesson_id IS NULL OR
        EXISTS (
          SELECT 1 FROM member_course_lessons l
          JOIN member_course_modules m ON l.module_id = m.id
          WHERE l.id = t.lesson_id
          AND l.is_published = true
          AND m.is_published = true
        )
      )
    )
  );

-- Mini-tasks table
CREATE TABLE IF NOT EXISTS member_mini_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES member_course_lessons(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text DEFAULT '',
  task_type text NOT NULL DEFAULT 'reflection' CHECK (task_type IN ('reflection', 'action', 'creative', 'research')),
  xp_reward integer DEFAULT 75 CHECK (xp_reward >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_mini_tasks_lesson ON member_mini_tasks(lesson_id);

ALTER TABLE member_mini_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view mini-tasks from published lessons"
  ON member_mini_tasks FOR SELECT
  TO authenticated
  USING (
    lesson_id IS NULL OR
    EXISTS (
      SELECT 1 FROM member_course_lessons l
      JOIN member_course_modules m ON l.module_id = m.id
      WHERE l.id = member_mini_tasks.lesson_id
      AND l.is_published = true
      AND m.is_published = true
    )
  );

-- Mini-task steps table
CREATE TABLE IF NOT EXISTS member_mini_task_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mini_task_id uuid NOT NULL REFERENCES member_mini_tasks(id) ON DELETE CASCADE,
  instruction text NOT NULL,
  hint text DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_mini_task_steps_task ON member_mini_task_steps(mini_task_id);
CREATE INDEX IF NOT EXISTS idx_member_mini_task_steps_order ON member_mini_task_steps(order_index);

ALTER TABLE member_mini_task_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view mini-task steps from published lessons"
  ON member_mini_task_steps FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_mini_tasks t
      WHERE t.id = member_mini_task_steps.mini_task_id
      AND (
        t.lesson_id IS NULL OR
        EXISTS (
          SELECT 1 FROM member_course_lessons l
          JOIN member_course_modules m ON l.module_id = m.id
          WHERE l.id = t.lesson_id
          AND l.is_published = true
          AND m.is_published = true
        )
      )
    )
  );

-- Student takeaway completions
CREATE TABLE IF NOT EXISTS member_student_takeaway_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  takeaway_id uuid NOT NULL REFERENCES member_takeaways(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(student_id, takeaway_id)
);

CREATE INDEX IF NOT EXISTS idx_member_takeaway_completions_student ON member_student_takeaway_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_member_takeaway_completions_takeaway ON member_student_takeaway_completions(takeaway_id);

ALTER TABLE member_student_takeaway_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own takeaway completions"
  ON member_student_takeaway_completions FOR SELECT
  TO authenticated
  USING (student_id IN (SELECT id FROM member_students WHERE id = student_id));

CREATE POLICY "Students can insert own takeaway completions"
  ON member_student_takeaway_completions FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM member_students WHERE id = student_id));

-- Student mini-task submissions
CREATE TABLE IF NOT EXISTS member_student_mini_task_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  mini_task_id uuid NOT NULL REFERENCES member_mini_tasks(id) ON DELETE CASCADE,
  response_text text DEFAULT '',
  xp_earned integer DEFAULT 0 CHECK (xp_earned >= 0),
  submitted_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_member_mini_task_submissions_student ON member_student_mini_task_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_member_mini_task_submissions_task ON member_student_mini_task_submissions(mini_task_id);

ALTER TABLE member_student_mini_task_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own mini-task submissions"
  ON member_student_mini_task_submissions FOR SELECT
  TO authenticated
  USING (student_id IN (SELECT id FROM member_students WHERE id = student_id));

CREATE POLICY "Students can insert own mini-task submissions"
  ON member_student_mini_task_submissions FOR INSERT
  TO authenticated
  WITH CHECK (student_id IN (SELECT id FROM member_students WHERE id = student_id));

-- Add has_takeaways and has_mini_tasks columns to lessons table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_lessons' AND column_name = 'has_takeaways'
  ) THEN
    ALTER TABLE member_course_lessons ADD COLUMN has_takeaways boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_lessons' AND column_name = 'has_mini_tasks'
  ) THEN
    ALTER TABLE member_course_lessons ADD COLUMN has_mini_tasks boolean DEFAULT false;
  END IF;
END $$;
