/*
  # Add checklist column to knowledge_articles

  1. Changes
    - Add `checklist` column to `knowledge_articles` table
      - Type: jsonb (array of strings)
      - Default: NULL
      - Contains actionable checklist items for each article
  
  2. Notes
    - Checklist items are stored as JSON array for flexibility
    - Can be populated per article as needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'knowledge_articles' AND column_name = 'checklist'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN checklist jsonb DEFAULT NULL;
  END IF;
END $$;