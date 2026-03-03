/*
  # KI-Manager Memberbereich - Community Forum

  ## Übersicht
  Diese Migration erstellt das komplette Community-Forum-System:
  - Forum Categories (Kategorien für Organisation)
  - Forum Threads (Diskussions-Themen)
  - Forum Posts (Antworten in Threads)
  - Forum Reactions (Likes, Helpful, Insightful)

  ## Neue Tabellen

  ### `member_forum_categories`
  Forum-Kategorien:
  - Name und Beschreibung
  - Icon (für UI)
  - Reihenfolge
  - Aktiv/Inaktiv Status

  ### `member_forum_threads`
  Diskussions-Threads:
  - Titel
  - Kategorie
  - Autor (Student)
  - Pinned/Locked Status
  - View Counter
  - Timestamps

  ### `member_forum_posts`
  Posts innerhalb von Threads:
  - Content (Markdown Support)
  - Autor (Student)
  - Admin-Post Flag (für Hervorhebung)
  - Edit Timestamps

  ### `member_forum_reactions`
  Reaktionen auf Posts:
  - Like, Helpful, Insightful
  - Pro Student/Post nur eine Reaktion pro Typ

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Alle authentifizierten Students können lesen
  - Students können eigene Threads/Posts erstellen/bearbeiten
  - Admins können alles moderieren
*/

-- ============================================================================
-- FORUM CATEGORIES TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text DEFAULT '💬',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index für Sortierung
CREATE INDEX IF NOT EXISTS idx_member_forum_categories_order ON member_forum_categories(order_index);
CREATE INDEX IF NOT EXISTS idx_member_forum_categories_active ON member_forum_categories(is_active);

-- RLS aktivieren
ALTER TABLE member_forum_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten User können aktive Kategorien sehen
CREATE POLICY "Everyone can view active categories"
  ON member_forum_categories FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policy: Admins können alle Kategorien sehen
CREATE POLICY "Admins can view all categories"
  ON member_forum_categories FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Kategorien erstellen
CREATE POLICY "Admins can create categories"
  ON member_forum_categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Kategorien aktualisieren
CREATE POLICY "Admins can update categories"
  ON member_forum_categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Kategorien löschen
CREATE POLICY "Admins can delete categories"
  ON member_forum_categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- FORUM THREADS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_forum_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES member_forum_categories(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  title text NOT NULL,
  
  -- Moderation
  is_pinned boolean DEFAULT false,
  is_locked boolean DEFAULT false,
  
  -- Stats
  view_count integer DEFAULT 0 CHECK (view_count >= 0),
  post_count integer DEFAULT 0 CHECK (post_count >= 0),
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_post_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_forum_threads_category ON member_forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_member_forum_threads_student ON member_forum_threads(student_id);
CREATE INDEX IF NOT EXISTS idx_member_forum_threads_pinned ON member_forum_threads(is_pinned);
CREATE INDEX IF NOT EXISTS idx_member_forum_threads_updated ON member_forum_threads(updated_at DESC);

-- RLS aktivieren
ALTER TABLE member_forum_threads ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten User können Threads sehen
CREATE POLICY "Everyone can view threads"
  ON member_forum_threads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_forum_categories
      WHERE id = member_forum_threads.category_id
      AND is_active = true
    )
  );

-- Policy: Authenticated Students können Threads erstellen
CREATE POLICY "Students can create threads"
  ON member_forum_threads FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Students können eigene Threads aktualisieren (nur Titel)
CREATE POLICY "Students can update own threads"
  ON member_forum_threads FOR UPDATE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können alle Threads moderieren
CREATE POLICY "Admins can moderate all threads"
  ON member_forum_threads FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- FORUM POSTS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES member_forum_threads(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_admin_post boolean DEFAULT false,
  
  -- Edit tracking
  is_edited boolean DEFAULT false,
  edited_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_forum_posts_thread ON member_forum_posts(thread_id);
CREATE INDEX IF NOT EXISTS idx_member_forum_posts_student ON member_forum_posts(student_id);
CREATE INDEX IF NOT EXISTS idx_member_forum_posts_created ON member_forum_posts(created_at);

-- RLS aktivieren
ALTER TABLE member_forum_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten User können Posts sehen
CREATE POLICY "Everyone can view posts"
  ON member_forum_posts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_forum_threads mft
      JOIN member_forum_categories mfc ON mft.category_id = mfc.id
      WHERE mft.id = member_forum_posts.thread_id
      AND mfc.is_active = true
    )
  );

-- Policy: Students können Posts erstellen (wenn Thread nicht locked)
CREATE POLICY "Students can create posts"
  ON member_forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
    AND NOT EXISTS (
      SELECT 1 FROM member_forum_threads
      WHERE id = member_forum_posts.thread_id
      AND is_locked = true
    )
  );

-- Policy: Students können eigene Posts aktualisieren
CREATE POLICY "Students can update own posts"
  ON member_forum_posts FOR UPDATE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  )
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Students können eigene Posts löschen
CREATE POLICY "Students can delete own posts"
  ON member_forum_posts FOR DELETE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Policy: Admins können alle Posts moderieren
CREATE POLICY "Admins can moderate all posts"
  ON member_forum_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- FORUM REACTIONS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_forum_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES member_forum_posts(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  reaction_type text NOT NULL CHECK (reaction_type IN ('like', 'helpful', 'insightful')),
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  
  -- Constraint: Pro Student/Post/Typ nur eine Reaktion
  UNIQUE(post_id, student_id, reaction_type)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_forum_reactions_post ON member_forum_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_member_forum_reactions_student ON member_forum_reactions(student_id);

-- RLS aktivieren
ALTER TABLE member_forum_reactions ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten User können Reaktionen sehen
CREATE POLICY "Everyone can view reactions"
  ON member_forum_reactions FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Students können Reaktionen hinzufügen
CREATE POLICY "Students can add reactions"
  ON member_forum_reactions FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Students können eigene Reaktionen löschen
CREATE POLICY "Students can delete own reactions"
  ON member_forum_reactions FOR DELETE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- ============================================================================
-- TRIGGERS: Update Thread Stats
-- ============================================================================

CREATE OR REPLACE FUNCTION update_thread_post_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE member_forum_threads
  SET 
    post_count = (
      SELECT COUNT(*) FROM member_forum_posts
      WHERE thread_id = COALESCE(NEW.thread_id, OLD.thread_id)
    ),
    last_post_at = COALESCE(NEW.created_at, now()),
    updated_at = now()
  WHERE id = COALESCE(NEW.thread_id, OLD.thread_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_update_thread_post_count_insert ON member_forum_posts;
CREATE TRIGGER trigger_update_thread_post_count_insert
  AFTER INSERT
  ON member_forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_post_count();

DROP TRIGGER IF EXISTS trigger_update_thread_post_count_delete ON member_forum_posts;
CREATE TRIGGER trigger_update_thread_post_count_delete
  AFTER DELETE
  ON member_forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_post_count();
