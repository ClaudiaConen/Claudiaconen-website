/*
  # Seed Default Welcome Content
  
  1. Changes
    - Insert default welcome content if none exists
    - This prevents RLS errors when admin first accesses the welcome content page
  
  2. Security
    - No RLS changes needed
    - Data is inserted as part of migration (bypasses RLS)
*/

-- Insert default welcome content only if the table is empty
INSERT INTO member_welcome_content (welcome_title, welcome_message, video_url, video_platform, is_active)
SELECT 
  'Willkommen in der KI-Manager Ausbildung',
  'Schön, dass du dabei bist! Hier findest du alle Kursinhalte und Ressourcen für deine Ausbildung.',
  '',
  'youtube',
  true
WHERE NOT EXISTS (SELECT 1 FROM member_welcome_content LIMIT 1);
