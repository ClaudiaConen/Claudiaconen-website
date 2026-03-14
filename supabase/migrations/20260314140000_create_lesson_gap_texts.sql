-- Create gap text (Lückentext) exercises for lessons
CREATE TABLE IF NOT EXISTS member_lesson_gap_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  template text NOT NULL DEFAULT '',
  correct_answers text[] NOT NULL DEFAULT '{}',
  word_bank text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(lesson_id)
);

ALTER TABLE member_lesson_gap_texts ENABLE ROW LEVEL SECURITY;

-- Students (anon role) can read gap texts
CREATE POLICY "gap_texts_anon_select" ON member_lesson_gap_texts
  FOR SELECT TO anon USING (true);

CREATE POLICY "gap_texts_authenticated_select" ON member_lesson_gap_texts
  FOR SELECT TO authenticated USING (true);

-- Service role has full access for admin operations
CREATE POLICY "gap_texts_service_role_all" ON member_lesson_gap_texts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
