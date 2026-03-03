/*
  # Fix RLS Policies für welcome_guide_cards

  1. Policies
    - Admins können alle Operationen auf welcome_guide_cards durchführen
    - Studenten können guide cards nur lesen (SELECT)
    - Anonyme Nutzer haben keinen Zugriff
  
  2. Sicherheit
    - Restrictive Policies für maximale Sicherheit
    - Admin-Zugriff basiert auf admin_users Tabelle
    - Student-Zugriff basiert auf member_students Tabelle
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Admins can manage guide cards" ON welcome_guide_cards;
DROP POLICY IF EXISTS "Students can view guide cards" ON welcome_guide_cards;

-- Admin policies: Full access
CREATE POLICY "Admins can select guide cards"
  ON welcome_guide_cards
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can insert guide cards"
  ON welcome_guide_cards
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can update guide cards"
  ON welcome_guide_cards
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can delete guide cards"
  ON welcome_guide_cards
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

-- Student policies: Read-only access
CREATE POLICY "Students can view guide cards"
  ON welcome_guide_cards
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM member_students
      WHERE member_students.email = auth.jwt() ->> 'email'
      AND member_students.is_active = true
    )
  );
