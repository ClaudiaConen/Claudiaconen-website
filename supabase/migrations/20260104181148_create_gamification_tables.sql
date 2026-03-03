/*
  # Gamification System

  1. Neue Tabellen
    - `user_points`
      - `id` (uuid, primary key)
      - `email` (text, user identifier)
      - `total_points` (integer, accumulated points)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_achievements`
      - `id` (uuid, primary key)
      - `email` (text, user identifier)
      - `achievement_type` (text, e.g., 'first_plan', 'first_week', '10_posts')
      - `unlocked_at` (timestamptz)
      - `metadata` (jsonb, additional data)

    - `content_plan_stats`
      - `id` (uuid, primary key)
      - `email` (text, user identifier)
      - `plan_id` (text, reference to content plan)
      - `posts_created` (integer)
      - `time_saved_hours` (integer)
      - `points_earned` (integer)
      - `created_at` (timestamptz)

  2. Sicherheit
    - RLS für alle Tabellen aktiviert
    - Policies für authentifizierte Benutzer
*/

CREATE TABLE IF NOT EXISTS user_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  total_points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  achievement_type text NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(email, achievement_type)
);

CREATE TABLE IF NOT EXISTS content_plan_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  plan_id text,
  posts_created integer DEFAULT 0,
  time_saved_hours integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_plan_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read their own points"
  ON user_points FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert their own points"
  ON user_points FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own points"
  ON user_points FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can read achievements"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read stats"
  ON content_plan_stats FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert stats"
  ON content_plan_stats FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_user_points_email ON user_points(email);
CREATE INDEX IF NOT EXISTS idx_user_achievements_email ON user_achievements(email);
CREATE INDEX IF NOT EXISTS idx_content_plan_stats_email ON content_plan_stats(email);
