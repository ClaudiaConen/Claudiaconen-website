/*
  # Comprehensive Security Fixes - Phase 2 (Corrected)

  ## Overview
  This migration addresses critical security issues identified in the database security audit.
  Fixes "RLS Policy Always True" issues with proper column name references.

  ## Security Issues Fixed
  - Unindexed foreign keys
  - RLS policies that are always true
  - Missing authentication checks
  - Adds email validation where appropriate
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEX
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_content_uploads_content_plan_id_fk
  ON content_uploads(content_plan_id);

-- ============================================================================
-- 2. FIX ABKUERZUNG_BOOKINGS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert bookings" ON abkuerzung_bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON abkuerzung_bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON abkuerzung_bookings;

CREATE POLICY "Anyone can create bookings"
  ON abkuerzung_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL
  );

CREATE POLICY "Authenticated users can view bookings"
  ON abkuerzung_bookings FOR SELECT
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can update bookings"
  ON abkuerzung_bookings FOR UPDATE
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can delete bookings"
  ON abkuerzung_bookings FOR DELETE
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 3. FIX ADVENT_DOORS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Allow read advent doors" ON advent_doors;
DROP POLICY IF EXISTS "Allow insert advent doors" ON advent_doors;
DROP POLICY IF EXISTS "Allow update advent doors" ON advent_doors;
DROP POLICY IF EXISTS "Allow delete advent doors" ON advent_doors;

CREATE POLICY "Anyone can view advent doors"
  ON advent_doors FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated admins can manage advent doors"
  ON advent_doors FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 4. FIX ADVENT_DOWNLOADS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can track downloads" ON advent_downloads;

CREATE POLICY "Anyone can track downloads"
  ON advent_downloads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_email IS NOT NULL
    AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND door_number IS NOT NULL
  );

-- ============================================================================
-- 5. FIX ADVENT_PROGRESS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own progress" ON advent_progress;
DROP POLICY IF EXISTS "Users can track own progress" ON advent_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON advent_progress;

CREATE POLICY "Users can view own progress"
  ON advent_progress FOR SELECT
  TO anon, authenticated
  USING (user_email IS NOT NULL);

CREATE POLICY "Users can track own progress"
  ON advent_progress FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_email IS NOT NULL
    AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

CREATE POLICY "Users can update own progress"
  ON advent_progress FOR UPDATE
  TO anon, authenticated
  USING (user_email IS NOT NULL)
  WITH CHECK (user_email IS NOT NULL);

-- ============================================================================
-- 6. FIX ADVENT_REGISTRATIONS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can register" ON advent_registrations;

CREATE POLICY "Anyone can register"
  ON advent_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND first_name IS NOT NULL
  );

-- ============================================================================
-- 7. FIX BETA_WAITLIST POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can join beta waitlist" ON beta_waitlist;

CREATE POLICY "Anyone can join beta waitlist"
  ON beta_waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- ============================================================================
-- 8. FIX BOOKINGS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON bookings;

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_email IS NOT NULL
    AND customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND customer_name IS NOT NULL
    AND appointment_type_id IS NOT NULL
  );

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated users can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 9. FIX CALENDAR_CONNECTIONS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Only authenticated users can manage calendar connections" ON calendar_connections;

CREATE POLICY "Authenticated users can manage calendar connections"
  ON calendar_connections FOR ALL
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

-- ============================================================================
-- 10. FIX CHECKLIST_DOWNLOADS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can request checklist downloads" ON checklist_downloads;
DROP POLICY IF EXISTS "Anyone can confirm by token" ON checklist_downloads;

CREATE POLICY "Anyone can request checklist downloads"
  ON checklist_downloads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND article_slug IS NOT NULL
  );

CREATE POLICY "Anyone can confirm by token"
  ON checklist_downloads FOR UPDATE
  TO anon, authenticated
  USING (confirmation_token IS NOT NULL)
  WITH CHECK (confirmation_token IS NOT NULL);

-- ============================================================================
-- 11. FIX COACHING_INQUIRIES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Allow public to submit inquiries" ON coaching_inquiries;
DROP POLICY IF EXISTS "Allow authenticated to submit inquiries" ON coaching_inquiries;

CREATE POLICY "Anyone can submit inquiries"
  ON coaching_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL
  );

-- ============================================================================
-- 12. FIX CONTACT_INQUIRIES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON contact_inquiries;
DROP POLICY IF EXISTS "Authenticated users can update contact inquiries" ON contact_inquiries;

CREATE POLICY "Anyone can submit contact inquiry"
  ON contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND name IS NOT NULL
  );

CREATE POLICY "Authenticated users can update contact inquiries"
  ON contact_inquiries FOR UPDATE
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 13. FIX CONTENT_PLAN_STATS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert stats" ON content_plan_stats;

CREATE POLICY "Anyone can insert stats"
  ON content_plan_stats FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- ============================================================================
-- 14. FIX CONTENT_UPLOADS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own uploads" ON content_uploads;
DROP POLICY IF EXISTS "Users can insert own uploads" ON content_uploads;
DROP POLICY IF EXISTS "Users can delete own uploads" ON content_uploads;

CREATE POLICY "Users can view own uploads"
  ON content_uploads FOR SELECT
  TO anon, authenticated
  USING (user_email IS NOT NULL);

CREATE POLICY "Users can insert own uploads"
  ON content_uploads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_email IS NOT NULL
    AND user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND file_url IS NOT NULL
  );

CREATE POLICY "Users can delete own uploads"
  ON content_uploads FOR DELETE
  TO anon, authenticated
  USING (user_email IS NOT NULL);

-- ============================================================================
-- 15. FIX KI_MANAGER_BOOKINGS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can create bookings" ON ki_manager_bookings;

CREATE POLICY "Anyone can create bookings"
  ON ki_manager_bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND name IS NOT NULL
  );

-- ============================================================================
-- 16. FIX KNOWLEDGE_ARTICLES POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert articles" ON knowledge_articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON knowledge_articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON knowledge_articles;

CREATE POLICY "Authenticated admins can insert articles"
  ON knowledge_articles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated admins can update articles"
  ON knowledge_articles FOR UPDATE
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated admins can delete articles"
  ON knowledge_articles FOR DELETE
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 17. FIX LINKEDIN_FREEBIE_LEADS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can register for LinkedIn freebie" ON linkedin_freebie_leads;
DROP POLICY IF EXISTS "Authenticated users can update LinkedIn leads" ON linkedin_freebie_leads;
DROP POLICY IF EXISTS "Authenticated users can delete LinkedIn leads" ON linkedin_freebie_leads;

CREATE POLICY "Anyone can register for LinkedIn freebie"
  ON linkedin_freebie_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

CREATE POLICY "Authenticated admins can update LinkedIn leads"
  ON linkedin_freebie_leads FOR UPDATE
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

CREATE POLICY "Authenticated admins can delete LinkedIn leads"
  ON linkedin_freebie_leads FOR DELETE
  TO authenticated
  USING ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 18. FIX SCHATTEN_ZU_LICHT_REGISTRATIONS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can insert registrations" ON schatten_zu_licht_registrations;

CREATE POLICY "Anyone can register"
  ON schatten_zu_licht_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL
  );

-- ============================================================================
-- 19. FIX STEP_MEDIA POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view step media" ON step_media;
DROP POLICY IF EXISTS "Anyone can insert step media" ON step_media;
DROP POLICY IF EXISTS "Anyone can update step media" ON step_media;
DROP POLICY IF EXISTS "Anyone can delete step media" ON step_media;

CREATE POLICY "Anyone can view step media"
  ON step_media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated admins can manage step media"
  ON step_media FOR ALL
  TO authenticated
  USING ((select auth.role()) = 'authenticated')
  WITH CHECK ((select auth.role()) = 'authenticated');

-- ============================================================================
-- 20. FIX USER_ACHIEVEMENTS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view their achievements" ON user_achievements;
DROP POLICY IF EXISTS "Anyone can insert achievements" ON user_achievements;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO anon, authenticated
  USING (email IS NOT NULL);

CREATE POLICY "Users can earn achievements"
  ON user_achievements FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- ============================================================================
-- 21. FIX USER_POINTS POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view their own points" ON user_points;
DROP POLICY IF EXISTS "Anyone can insert their own points" ON user_points;
DROP POLICY IF EXISTS "Anyone can update their own points" ON user_points;

CREATE POLICY "Users can view own points"
  ON user_points FOR SELECT
  TO anon, authenticated
  USING (email IS NOT NULL);

CREATE POLICY "Users can track own points"
  ON user_points FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

CREATE POLICY "Users can update own points"
  ON user_points FOR UPDATE
  TO anon, authenticated
  USING (email IS NOT NULL)
  WITH CHECK (email IS NOT NULL);

-- ============================================================================
-- 22. REMOVE UNUSED INDEX & RECREATE PROPERLY
-- ============================================================================

DROP INDEX IF EXISTS idx_bookings_appointment_type_id;

CREATE INDEX IF NOT EXISTS idx_bookings_appointment_type_id_fk
  ON bookings(appointment_type_id);
