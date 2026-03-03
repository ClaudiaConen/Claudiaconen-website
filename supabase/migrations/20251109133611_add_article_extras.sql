/*
  # Add Extra Fields to Knowledge Articles

  1. Changes
    - Add `self_test` (jsonb) - Self-test section with questions and evaluation
    - Add `call_to_action` (jsonb) - Call-to-action box with title, description, and links
    - Add `related_articles` (text[]) - Array of related article slugs
    
  2. Structure
    - self_test: {title, questions: [], evaluation: {high, medium, low}, download_link}
    - call_to_action: {title, description, links: [{text, href}]}
    - related_articles: Array of article slugs for cross-linking
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'knowledge_articles' AND column_name = 'self_test'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN self_test jsonb DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'knowledge_articles' AND column_name = 'call_to_action'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN call_to_action jsonb DEFAULT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'knowledge_articles' AND column_name = 'related_articles'
  ) THEN
    ALTER TABLE knowledge_articles ADD COLUMN related_articles text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;