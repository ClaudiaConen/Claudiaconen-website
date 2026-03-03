/*
  # Create Knowledge Library Table

  1. New Tables
    - `knowledge_articles`
      - `id` (uuid, primary key)
      - `letter` (text) - The letter of the alphabet (A-Z)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Article title (usually a question)
      - `description` (text) - Short description/preview
      - `reading_time` (integer) - Estimated reading time in minutes
      - `story` (text) - Opening story/scenario
      - `content` (jsonb) - Structured content with sections
      - `scientific_source` (text) - Scientific background source
      - `scientific_content` (text) - Scientific explanation
      - `practical_steps` (jsonb) - Array of practical steps
      - `common_mistakes` (jsonb) - Array of common mistakes
      - `tags` (text[]) - Array of tags for filtering
      - `search_volume` (integer) - Search volume for SEO (optional)
      - `image_url` (text) - Article image
      - `published_at` (timestamptz) - Publication date
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      - `is_published` (boolean) - Publication status
      - `author` (text) - Author name

  2. Security
    - Enable RLS on `knowledge_articles` table
    - Add policy for public read access to published articles
    - Add policy for authenticated admin users to manage articles
*/

CREATE TABLE IF NOT EXISTS knowledge_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  letter text NOT NULL CHECK (letter ~ '^[A-Z]$'),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  reading_time integer NOT NULL DEFAULT 5,
  story text NOT NULL,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  scientific_source text,
  scientific_content text,
  practical_steps jsonb DEFAULT '[]'::jsonb,
  common_mistakes jsonb DEFAULT '[]'::jsonb,
  tags text[] DEFAULT ARRAY[]::text[],
  search_volume integer DEFAULT 0,
  image_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true,
  author text DEFAULT 'Claudia Hupprich'
);

CREATE INDEX IF NOT EXISTS idx_knowledge_articles_letter ON knowledge_articles(letter);
CREATE INDEX IF NOT EXISTS idx_knowledge_articles_slug ON knowledge_articles(slug);
CREATE INDEX IF NOT EXISTS idx_knowledge_articles_published ON knowledge_articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_articles_tags ON knowledge_articles USING GIN(tags);

ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON knowledge_articles
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage articles"
  ON knowledge_articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);