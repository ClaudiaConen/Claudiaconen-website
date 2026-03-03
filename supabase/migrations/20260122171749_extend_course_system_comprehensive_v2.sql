/*
  # Umfassende Erweiterung des Kurs-Systems

  ## Übersicht
  Diese Migration erweitert das bestehende Mitgliederbereich-Kurs-System um folgende Funktionen:
  - Medien-Upload (Thumbnails, Audio, PDFs)
  - Video-Plattform-Auswahl (YouTube/Vimeo/Self-hosted)
  - QR-Codes und Bonus-Seiten pro Modul
  - Modul-Abschluss-Quiz (verpflichtend)
  - Empfehlungen/Affiliate-Links
  - Willkommensbereich-Verwaltung

  ## 1. Neue Felder in bestehenden Tabellen

  ### member_course_modules
  - `thumbnail_url`: Modul-Vorschaubild
  - `module_quiz_id`: Referenz zum Abschluss-Quiz
  - `bonus_page_enabled`: Bonus-Seite aktiviert
  - `qr_code_data`: QR-Code URL/Daten

  ### member_course_lessons
  - `audio_url`: Audio-Datei URL
  - `audio_duration_seconds`: Audio-Dauer
  - `video_platform`: Plattform-Typ (youtube/vimeo/self-hosted)

  ## 2. Neue Tabellen

  ### course_recommendations
  Verwaltung von Tool-/Produkt-Empfehlungen mit Affiliate-Links

  ### lesson_recommendations
  Verknüpfung zwischen Lektionen und Empfehlungen

  ### module_bonus_content
  Bonus-Inhalte pro Modul (für QR-Code-Seiten)

  ### member_welcome_content
  Willkommensbereich-Inhalte für Mitglieder

  ## 3. Security
  - RLS aktiviert für alle neuen Tabellen
  - Admin-Policies für Verwaltung
  - Lesezugriff für authentifizierte Member
*/

-- Felder zu member_course_modules hinzufügen (einzeln prüfen)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_modules' AND column_name = 'thumbnail_url'
  ) THEN
    ALTER TABLE member_course_modules ADD COLUMN thumbnail_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_modules' AND column_name = 'module_quiz_id'
  ) THEN
    ALTER TABLE member_course_modules ADD COLUMN module_quiz_id uuid REFERENCES member_quizzes(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_modules' AND column_name = 'bonus_page_enabled'
  ) THEN
    ALTER TABLE member_course_modules ADD COLUMN bonus_page_enabled boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_modules' AND column_name = 'qr_code_data'
  ) THEN
    ALTER TABLE member_course_modules ADD COLUMN qr_code_data text;
  END IF;
END $$;

-- Felder zu member_course_lessons hinzufügen (einzeln prüfen)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_lessons' AND column_name = 'audio_url'
  ) THEN
    ALTER TABLE member_course_lessons ADD COLUMN audio_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_lessons' AND column_name = 'audio_duration_seconds'
  ) THEN
    ALTER TABLE member_course_lessons ADD COLUMN audio_duration_seconds integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'member_course_lessons' AND column_name = 'video_platform'
  ) THEN
    ALTER TABLE member_course_lessons ADD COLUMN video_platform text DEFAULT 'youtube';
  END IF;
END $$;

-- Constraint für video_platform hinzufügen (falls noch nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'member_course_lessons_video_platform_check'
  ) THEN
    ALTER TABLE member_course_lessons ADD CONSTRAINT member_course_lessons_video_platform_check 
    CHECK (video_platform IN ('youtube', 'vimeo', 'self-hosted'));
  END IF;
END $$;

-- Tabelle: course_recommendations
CREATE TABLE IF NOT EXISTS course_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  affiliate_link text,
  logo_url text,
  category text DEFAULT 'Software',
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'course_recommendations_category_check'
  ) THEN
    ALTER TABLE course_recommendations ADD CONSTRAINT course_recommendations_category_check 
    CHECK (category IN ('Software', 'Buch', 'Kurs', 'Tool', 'Service', 'Sonstiges'));
  END IF;
END $$;

ALTER TABLE course_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage recommendations" ON course_recommendations;
CREATE POLICY "Admins can manage recommendations"
  ON course_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

DROP POLICY IF EXISTS "Members can view active recommendations" ON course_recommendations;
CREATE POLICY "Members can view active recommendations"
  ON course_recommendations FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Tabelle: lesson_recommendations (Verknüpfung)
CREATE TABLE IF NOT EXISTS lesson_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES member_course_lessons(id) ON DELETE CASCADE,
  recommendation_id uuid NOT NULL REFERENCES course_recommendations(id) ON DELETE CASCADE,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(lesson_id, recommendation_id)
);

ALTER TABLE lesson_recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage lesson recommendations" ON lesson_recommendations;
CREATE POLICY "Admins can manage lesson recommendations"
  ON lesson_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

DROP POLICY IF EXISTS "Members can view lesson recommendations" ON lesson_recommendations;
CREATE POLICY "Members can view lesson recommendations"
  ON lesson_recommendations FOR SELECT
  TO authenticated
  USING (true);

-- Tabelle: module_bonus_content
CREATE TABLE IF NOT EXISTS module_bonus_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES member_course_modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  content_type text NOT NULL,
  content_url text,
  content_text text,
  description text,
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'module_bonus_content_content_type_check'
  ) THEN
    ALTER TABLE module_bonus_content ADD CONSTRAINT module_bonus_content_content_type_check 
    CHECK (content_type IN ('video', 'quiz', 'pdf', 'link', 'text'));
  END IF;
END $$;

ALTER TABLE module_bonus_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage bonus content" ON module_bonus_content;
CREATE POLICY "Admins can manage bonus content"
  ON module_bonus_content FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

DROP POLICY IF EXISTS "Members can view published bonus content" ON module_bonus_content;
CREATE POLICY "Members can view published bonus content"
  ON module_bonus_content FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Tabelle: member_welcome_content
CREATE TABLE IF NOT EXISTS member_welcome_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Willkommen in der KI-Manager Ausbildung',
  welcome_message text,
  video_url text,
  video_platform text DEFAULT 'youtube',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'member_welcome_content_video_platform_check'
  ) THEN
    ALTER TABLE member_welcome_content ADD CONSTRAINT member_welcome_content_video_platform_check 
    CHECK (video_platform IN ('youtube', 'vimeo', 'self-hosted'));
  END IF;
END $$;

ALTER TABLE member_welcome_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage welcome content" ON member_welcome_content;
CREATE POLICY "Admins can manage welcome content"
  ON member_welcome_content FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

DROP POLICY IF EXISTS "Members can view active welcome content" ON member_welcome_content;
CREATE POLICY "Members can view active welcome content"
  ON member_welcome_content FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Tabelle: welcome_guide_cards
CREATE TABLE IF NOT EXISTS welcome_guide_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  welcome_id uuid REFERENCES member_welcome_content(id) ON DELETE CASCADE,
  icon text NOT NULL DEFAULT 'BookOpen',
  title text NOT NULL,
  description text NOT NULL,
  link_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE welcome_guide_cards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage guide cards" ON welcome_guide_cards;
CREATE POLICY "Admins can manage guide cards"
  ON welcome_guide_cards FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
    )
  );

DROP POLICY IF EXISTS "Members can view guide cards" ON welcome_guide_cards;
CREATE POLICY "Members can view guide cards"
  ON welcome_guide_cards FOR SELECT
  TO authenticated
  USING (true);

-- Standard Willkommens-Inhalt erstellen (falls nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM member_welcome_content LIMIT 1) THEN
    INSERT INTO member_welcome_content (title, welcome_message, is_active)
    VALUES (
      'Willkommen in der KI-Manager Ausbildung',
      'Schön, dass du dabei bist! Hier lernst du alles, was du brauchst, um KI effektiv in deinem Business einzusetzen.',
      true
    );
  END IF;
END $$;

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_lesson_recommendations_lesson ON lesson_recommendations(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_recommendations_recommendation ON lesson_recommendations(recommendation_id);
CREATE INDEX IF NOT EXISTS idx_module_bonus_module ON module_bonus_content(module_id);
CREATE INDEX IF NOT EXISTS idx_guide_cards_welcome ON welcome_guide_cards(welcome_id);
CREATE INDEX IF NOT EXISTS idx_course_modules_quiz ON member_course_modules(module_quiz_id);
