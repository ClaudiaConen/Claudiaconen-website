/*
  # Optimize Admin RLS Policies

  1. Performance Optimization
    - Wrap auth.uid() in SELECT for admin checks
    - Fix policies that check against admin_users table
    
  2. Tables Fixed
    - member_lesson_downloads
    - member_achievements  
    - member_student_achievements
    - member_forum_categories
    - member_forum_threads
    - member_forum_posts
    - member_live_sessions
    - member_student_session_registrations
    - member_announcements
    - member_student_announcement_reads
    - member_welcome_content
    - course_recommendations
    - lesson_recommendations
    - module_bonus_content
    - welcome_guide_cards
*/

-- member_lesson_downloads: Admin policies
DROP POLICY IF EXISTS "Admins can create downloads" ON member_lesson_downloads CASCADE;
DROP POLICY IF EXISTS "Admins can delete downloads" ON member_lesson_downloads CASCADE;
DROP POLICY IF EXISTS "Admins can update downloads" ON member_lesson_downloads CASCADE;
DROP POLICY IF EXISTS "Admins can view all downloads" ON member_lesson_downloads CASCADE;

CREATE POLICY "Admins can create downloads"
  ON member_lesson_downloads FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete downloads"
  ON member_lesson_downloads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update downloads"
  ON member_lesson_downloads FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can view all downloads"
  ON member_lesson_downloads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_achievements: Admin policies
DROP POLICY IF EXISTS "Admins can create achievements" ON member_achievements CASCADE;
DROP POLICY IF EXISTS "Admins can delete achievements" ON member_achievements CASCADE;
DROP POLICY IF EXISTS "Admins can update achievements" ON member_achievements CASCADE;
DROP POLICY IF EXISTS "Admins can view all achievements" ON member_achievements CASCADE;

CREATE POLICY "Admins can create achievements"
  ON member_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete achievements"
  ON member_achievements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update achievements"
  ON member_achievements FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can view all achievements"
  ON member_achievements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_student_achievements: Admin policies
DROP POLICY IF EXISTS "Admins can create student achievements" ON member_student_achievements CASCADE;
DROP POLICY IF EXISTS "Admins can delete student achievements" ON member_student_achievements CASCADE;
DROP POLICY IF EXISTS "Admins can view all student achievements" ON member_student_achievements CASCADE;

CREATE POLICY "Admins can create student achievements"
  ON member_student_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete student achievements"
  ON member_student_achievements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can view all student achievements"
  ON member_student_achievements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_forum_categories: Admin policies
DROP POLICY IF EXISTS "Admins can create categories" ON member_forum_categories CASCADE;
DROP POLICY IF EXISTS "Admins can delete categories" ON member_forum_categories CASCADE;
DROP POLICY IF EXISTS "Admins can update categories" ON member_forum_categories CASCADE;
DROP POLICY IF EXISTS "Admins can view all categories" ON member_forum_categories CASCADE;

CREATE POLICY "Admins can create categories"
  ON member_forum_categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete categories"
  ON member_forum_categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update categories"
  ON member_forum_categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can view all categories"
  ON member_forum_categories FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_forum_threads: Admin moderation policy
DROP POLICY IF EXISTS "Admins can moderate all threads" ON member_forum_threads CASCADE;

CREATE POLICY "Admins can moderate all threads"
  ON member_forum_threads FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_forum_posts: Admin moderation policy
DROP POLICY IF EXISTS "Admins can moderate all posts" ON member_forum_posts CASCADE;

CREATE POLICY "Admins can moderate all posts"
  ON member_forum_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_live_sessions: Admin policies
DROP POLICY IF EXISTS "Admins can create sessions" ON member_live_sessions CASCADE;
DROP POLICY IF EXISTS "Admins can delete sessions" ON member_live_sessions CASCADE;
DROP POLICY IF EXISTS "Admins can update sessions" ON member_live_sessions CASCADE;

CREATE POLICY "Admins can create sessions"
  ON member_live_sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete sessions"
  ON member_live_sessions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update sessions"
  ON member_live_sessions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_student_session_registrations: Admin policies
DROP POLICY IF EXISTS "Admins can delete registrations" ON member_student_session_registrations CASCADE;
DROP POLICY IF EXISTS "Admins can update attendance" ON member_student_session_registrations CASCADE;

CREATE POLICY "Admins can delete registrations"
  ON member_student_session_registrations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update attendance"
  ON member_student_session_registrations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_announcements: Admin policies
DROP POLICY IF EXISTS "Admins can create announcements" ON member_announcements CASCADE;
DROP POLICY IF EXISTS "Admins can delete announcements" ON member_announcements CASCADE;
DROP POLICY IF EXISTS "Admins can update announcements" ON member_announcements CASCADE;
DROP POLICY IF EXISTS "Admins can view all announcements" ON member_announcements CASCADE;

CREATE POLICY "Admins can create announcements"
  ON member_announcements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can delete announcements"
  ON member_announcements FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update announcements"
  ON member_announcements FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can view all announcements"
  ON member_announcements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_student_announcement_reads: Admin policy
DROP POLICY IF EXISTS "Admins can view all read status" ON member_student_announcement_reads CASCADE;

CREATE POLICY "Admins can view all read status"
  ON member_student_announcement_reads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- member_welcome_content: Admin policies
DROP POLICY IF EXISTS "Admins can delete welcome content" ON member_welcome_content CASCADE;
DROP POLICY IF EXISTS "Admins can insert welcome content" ON member_welcome_content CASCADE;
DROP POLICY IF EXISTS "Admins can select welcome content" ON member_welcome_content CASCADE;
DROP POLICY IF EXISTS "Admins can update welcome content" ON member_welcome_content CASCADE;
DROP POLICY IF EXISTS "Students can view active welcome content" ON member_welcome_content CASCADE;

CREATE POLICY "Admins can delete welcome content"
  ON member_welcome_content FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can insert welcome content"
  ON member_welcome_content FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can select welcome content"
  ON member_welcome_content FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update welcome content"
  ON member_welcome_content FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Students can view active welcome content"
  ON member_welcome_content FOR SELECT
  TO authenticated
  USING (is_active = true);

-- course_recommendations: Admin policy
DROP POLICY IF EXISTS "Admins can manage recommendations" ON course_recommendations CASCADE;

CREATE POLICY "Admins can manage recommendations"
  ON course_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- lesson_recommendations: Admin policy
DROP POLICY IF EXISTS "Admins can manage lesson recommendations" ON lesson_recommendations CASCADE;

CREATE POLICY "Admins can manage lesson recommendations"
  ON lesson_recommendations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- module_bonus_content: Admin policy
DROP POLICY IF EXISTS "Admins can manage bonus content" ON module_bonus_content CASCADE;

CREATE POLICY "Admins can manage bonus content"
  ON module_bonus_content FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- welcome_guide_cards: Admin policies
DROP POLICY IF EXISTS "Admins can delete guide cards" ON welcome_guide_cards CASCADE;
DROP POLICY IF EXISTS "Admins can insert guide cards" ON welcome_guide_cards CASCADE;
DROP POLICY IF EXISTS "Admins can select guide cards" ON welcome_guide_cards CASCADE;
DROP POLICY IF EXISTS "Admins can update guide cards" ON welcome_guide_cards CASCADE;
DROP POLICY IF EXISTS "Students can view guide cards" ON welcome_guide_cards CASCADE;

CREATE POLICY "Admins can delete guide cards"
  ON welcome_guide_cards FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can insert guide cards"
  ON welcome_guide_cards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can select guide cards"
  ON welcome_guide_cards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Admins can update guide cards"
  ON welcome_guide_cards FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

CREATE POLICY "Students can view guide cards"
  ON welcome_guide_cards FOR SELECT
  TO authenticated
  USING (true);