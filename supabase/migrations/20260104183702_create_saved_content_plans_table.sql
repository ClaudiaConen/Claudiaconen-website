/*
  # Create saved_content_plans table

  1. New Tables
    - `saved_content_plans`
      - `id` (uuid, primary key) - Unique identifier for each saved plan
      - `user_id` (uuid, foreign key) - References auth.users
      - `created_at` (timestamptz) - When the plan was created
      - `updated_at` (timestamptz) - When the plan was last updated
      - `plan_name` (text) - Optional name for the plan
      - `user_name` (text) - User's first name from the form
      - `business_type` (text) - Industry/business type
      - `main_goal` (text) - Content goal
      - `platforms` (text array) - Social media platforms
      - `content_posts` (jsonb) - Generated content posts
      - `total_posts` (integer) - Total number of posts generated
      
  2. Security
    - Enable RLS on `saved_content_plans` table
    - Add policy for authenticated users to read their own plans
    - Add policy for authenticated users to insert their own plans
    - Add policy for authenticated users to update their own plans
    - Add policy for authenticated users to delete their own plans
*/

CREATE TABLE IF NOT EXISTS saved_content_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  plan_name text,
  user_name text,
  business_type text NOT NULL,
  main_goal text NOT NULL,
  platforms text[] DEFAULT '{}' NOT NULL,
  content_posts jsonb DEFAULT '[]' NOT NULL,
  total_posts integer DEFAULT 0 NOT NULL
);

ALTER TABLE saved_content_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own plans"
  ON saved_content_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans"
  ON saved_content_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans"
  ON saved_content_plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own plans"
  ON saved_content_plans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_content_plans_user_id ON saved_content_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_content_plans_created_at ON saved_content_plans(created_at DESC);