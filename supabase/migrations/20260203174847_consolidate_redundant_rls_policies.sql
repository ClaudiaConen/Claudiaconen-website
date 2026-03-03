/*
  # Consolidate Redundant RLS Policies

  1. Policy Consolidation
    - Merge multiple permissive SELECT policies into single policies
    - Reduces policy evaluation overhead
    - Makes access control logic clearer
    
  2. Tables Fixed
    - member_welcome_content (4 SELECT policies → 1)
    - welcome_guide_cards (3 SELECT policies → 1)
    
  Note: Other tables with multiple policies (admin + student) are intentionally
  separate for clarity and maintainability, which is a valid design pattern.
*/

-- member_welcome_content: Consolidate 4 SELECT policies into 1
DROP POLICY IF EXISTS "Admins can select welcome content" ON member_welcome_content;
DROP POLICY IF EXISTS "Authenticated users can read active welcome content" ON member_welcome_content;
DROP POLICY IF EXISTS "Members can view active welcome content" ON member_welcome_content;
DROP POLICY IF EXISTS "Students can view active welcome content" ON member_welcome_content;

CREATE POLICY "Authenticated users can view welcome content"
  ON member_welcome_content FOR SELECT
  TO authenticated
  USING (
    is_active = true 
    OR EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = (select auth.uid()) AND is_active = true
    )
  );

-- welcome_guide_cards: Consolidate 3 SELECT policies into 1
DROP POLICY IF EXISTS "Admins can select guide cards" ON welcome_guide_cards;
DROP POLICY IF EXISTS "Members can view guide cards" ON welcome_guide_cards;
DROP POLICY IF EXISTS "Students can view guide cards" ON welcome_guide_cards;

CREATE POLICY "Authenticated users can view guide cards"
  ON welcome_guide_cards FOR SELECT
  TO authenticated
  USING (true);