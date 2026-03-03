/*
  # Fix RLS Policies für member_welcome_content

  1. Policies
    - Admins können alle Operationen auf member_welcome_content durchführen
    - Studenten können welcome content nur lesen (SELECT)
    - Anonyme Nutzer haben keinen Zugriff
  
  2. Sicherheit
    - Restrictive Policies für maximale Sicherheit
    - Admin-Zugriff basiert auf admin_users Tabelle
    - Student-Zugriff basiert auf member_students Tabelle
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Admins can manage welcome content" ON member_welcome_content;
DROP POLICY IF EXISTS "Students can view welcome content" ON member_welcome_content;
DROP POLICY IF EXISTS "Admins full access to member_welcome_content" ON member_welcome_content;

-- Admin policies: Full access
CREATE POLICY "Admins can select welcome content"
  ON member_welcome_content
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can insert welcome content"
  ON member_welcome_content
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admins can update welcome content"
  ON member_welcome_content
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

CREATE POLICY "Admins can delete welcome content"
  ON member_welcome_content
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
      AND admin_users.is_active = true
    )
  );

-- Student policies: Read-only access to active content
CREATE POLICY "Students can view active welcome content"
  ON member_welcome_content
  FOR SELECT
  TO authenticated
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM member_students
      WHERE member_students.email = auth.jwt() ->> 'email'
      AND member_students.is_active = true
    )
  );
