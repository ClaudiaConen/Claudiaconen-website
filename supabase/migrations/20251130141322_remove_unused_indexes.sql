/*
  # Remove Unused Database Indexes

  1. Changes
    - Drop unused indexes from coaching_inquiries table
    - Drop unused indexes from beta_waitlist table
    - Drop unused indexes from linkedin_freebie_leads table
    - Drop unused indexes from checklist_downloads table
    - Drop unused indexes from advent_downloads table
    - Drop unused indexes from knowledge_articles table

  2. Security
    - Improves database performance by removing overhead
    - Reduces storage requirements
    - Maintains necessary indexes for actual query patterns

  3. Notes
    - These indexes were created but never used in actual queries
    - Primary keys and foreign keys remain intact
    - Can be recreated if query patterns change in the future
*/

-- Drop unused indexes from coaching_inquiries
DROP INDEX IF EXISTS idx_coaching_inquiries_email;
DROP INDEX IF EXISTS idx_coaching_inquiries_status;
DROP INDEX IF EXISTS idx_coaching_inquiries_created_at;

-- Drop unused indexes from beta_waitlist
DROP INDEX IF EXISTS beta_waitlist_email_idx;
DROP INDEX IF EXISTS beta_waitlist_created_at_idx;

-- Drop unused indexes from linkedin_freebie_leads
DROP INDEX IF EXISTS idx_linkedin_leads_opted_in;

-- Drop unused indexes from checklist_downloads
DROP INDEX IF EXISTS idx_checklist_downloads_email;
DROP INDEX IF EXISTS idx_checklist_downloads_article_slug;
DROP INDEX IF EXISTS idx_checklist_downloads_created_at;
DROP INDEX IF EXISTS idx_checklist_downloads_token;
DROP INDEX IF EXISTS idx_checklist_downloads_confirmed;

-- Drop unused indexes from advent_downloads
DROP INDEX IF EXISTS idx_advent_downloads_email_door;

-- Drop unused indexes from knowledge_articles
DROP INDEX IF EXISTS idx_knowledge_articles_tags;
