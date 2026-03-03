/*
  # KI-Manager Memberbereich - Live Sessions

  ## Übersicht
  Diese Migration erstellt das Live-Session-System:
  - Live Sessions (Termine für Online-Meetings)
  - Student Session Registrations (Anmeldungen)

  ## Neue Tabellen

  ### `member_live_sessions`
  Live-Session Termine:
  - Titel und Beschreibung
  - Datum und Uhrzeit
  - Meeting Link (Zoom, Teams, etc.)
  - Recurring Flag
  - Max Participants (optional)
  - Recording URL (nach Session)
  - Created by Admin

  ### `member_student_session_registrations`
  Student-Anmeldungen für Sessions:
  - Student ID
  - Session ID
  - Registrierungs-Timestamp
  - Attended Flag (nach Session)

  ## Features
  - Admins erstellen Sessions
  - Students melden sich an
  - Admins markieren Teilnahme
  - Automatische Benachrichtigungen möglich
  - Recording URLs für vergangene Sessions

  ## Sicherheit
  - RLS aktiviert auf allen Tabellen
  - Alle authentifizierten Students können Sessions sehen
  - Students können sich selbst an/abmelden
  - Admins haben vollen Zugriff
*/

-- ============================================================================
-- LIVE SESSIONS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_live_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  
  -- Timing
  session_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  timezone text DEFAULT 'Europe/Berlin',
  
  -- Meeting Info
  meeting_link text,
  meeting_password text,
  
  -- Capacity
  max_participants integer CHECK (max_participants IS NULL OR max_participants > 0),
  
  -- Recurring
  is_recurring boolean DEFAULT false,
  recurrence_pattern text, -- 'weekly', 'biweekly', 'monthly'
  
  -- Recording
  recording_url text,
  
  -- Admin
  created_by_admin_id uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_live_sessions_date ON member_live_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_member_live_sessions_created_by ON member_live_sessions(created_by_admin_id);

-- RLS aktivieren
ALTER TABLE member_live_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Alle authentifizierten Students können Sessions sehen
CREATE POLICY "Everyone can view sessions"
  ON member_live_sessions FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Admins können Sessions erstellen
CREATE POLICY "Admins can create sessions"
  ON member_live_sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Sessions aktualisieren
CREATE POLICY "Admins can update sessions"
  ON member_live_sessions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Sessions löschen
CREATE POLICY "Admins can delete sessions"
  ON member_live_sessions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- STUDENT SESSION REGISTRATIONS TABELLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS member_student_session_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES member_live_sessions(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES member_students(id) ON DELETE CASCADE,
  
  -- Status
  attended boolean DEFAULT false,
  
  -- Timestamps
  registered_at timestamptz DEFAULT now(),
  
  -- Constraint: Ein Student kann sich nur einmal pro Session anmelden
  UNIQUE(session_id, student_id)
);

-- Indices für Performance
CREATE INDEX IF NOT EXISTS idx_member_student_session_registrations_session ON member_student_session_registrations(session_id);
CREATE INDEX IF NOT EXISTS idx_member_student_session_registrations_student ON member_student_session_registrations(student_id);

-- RLS aktivieren
ALTER TABLE member_student_session_registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Students können Anmeldungen sehen (alle)
CREATE POLICY "Everyone can view registrations"
  ON member_student_session_registrations FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Students können sich selbst anmelden
CREATE POLICY "Students can register for sessions"
  ON member_student_session_registrations FOR INSERT
  TO authenticated
  WITH CHECK (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
    -- Check capacity
    AND (
      SELECT max_participants FROM member_live_sessions WHERE id = member_student_session_registrations.session_id
    ) IS NULL
    OR (
      SELECT COUNT(*) FROM member_student_session_registrations
      WHERE session_id = member_student_session_registrations.session_id
    ) < (
      SELECT max_participants FROM member_live_sessions WHERE id = member_student_session_registrations.session_id
    )
  );

-- Policy: Students können eigene Anmeldungen löschen (abmelden)
CREATE POLICY "Students can cancel own registrations"
  ON member_student_session_registrations FOR DELETE
  TO authenticated
  USING (
    student_id IN (
      SELECT id FROM member_students
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
    )
    -- Nur vor der Session abmelden
    AND EXISTS (
      SELECT 1 FROM member_live_sessions
      WHERE id = member_student_session_registrations.session_id
      AND session_date >= CURRENT_DATE
    )
  );

-- Policy: Admins können Teilnahme markieren
CREATE POLICY "Admins can update attendance"
  ON member_student_session_registrations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- Policy: Admins können Anmeldungen löschen
CREATE POLICY "Admins can delete registrations"
  ON member_student_session_registrations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
      AND is_active = true
    )
  );

-- ============================================================================
-- HELPER FUNCTION: Check if session is full
-- ============================================================================

CREATE OR REPLACE FUNCTION is_session_full(p_session_id uuid)
RETURNS boolean AS $$
DECLARE
  v_max_participants integer;
  v_current_registrations integer;
BEGIN
  -- Get max participants
  SELECT max_participants INTO v_max_participants
  FROM member_live_sessions
  WHERE id = p_session_id;
  
  -- If no limit, not full
  IF v_max_participants IS NULL THEN
    RETURN false;
  END IF;
  
  -- Count current registrations
  SELECT COUNT(*) INTO v_current_registrations
  FROM member_student_session_registrations
  WHERE session_id = p_session_id;
  
  RETURN v_current_registrations >= v_max_participants;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================================================
-- HELPER FUNCTION: Get registration count
-- ============================================================================

CREATE OR REPLACE FUNCTION get_session_registration_count(p_session_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM member_student_session_registrations
    WHERE session_id = p_session_id
  );
END;
$$ LANGUAGE plpgsql STABLE;
