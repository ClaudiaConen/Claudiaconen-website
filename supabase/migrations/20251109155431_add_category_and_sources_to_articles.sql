/*
  # Add Category and Sources to Knowledge Articles

  1. Changes
    - Add `category` (text) - Article category for filtering (e.g., "Neurowissenschaft", "Speaker")
    - Add `sources` (text[]) - Array of source citations
    
  2. Notes
    - These fields enhance article organization and credibility
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'knowledge_articles' AND column_name = 'category'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN category text DEFAULT 'Allgemein';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'knowledge_articles' AND column_name = 'sources'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN sources text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;