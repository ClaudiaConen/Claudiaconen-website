/*
  # Create Admin Authentication System

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique) - Admin email address
      - `password_hash` (text) - Bcrypt hashed password
      - `name` (text) - Admin display name
      - `is_active` (boolean) - Whether admin can log in
      - `created_at` (timestamptz) - Account creation time
      - `last_login_at` (timestamptz) - Last successful login time
    
    - `admin_password_resets`
      - `id` (uuid, primary key)
      - `admin_user_id` (uuid, foreign key) - Reference to admin user
      - `token` (text, unique) - Secure reset token
      - `expires_at` (timestamptz) - When token expires (24 hours)
      - `used_at` (timestamptz) - When token was used (null if unused)
      - `created_at` (timestamptz) - Token creation time

  2. Security
    - Enable RLS on both tables
    - No direct public access (only via Edge Functions with service role key)
    - Admin functions will use service role to bypass RLS

  3. Initial Setup
    - Create first admin user with email and bcrypt-hashed password
    - Password should be changed after first login
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  last_login_at timestamptz,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create admin_password_resets table
CREATE TABLE IF NOT EXISTS admin_password_resets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON admin_password_resets(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_admin_user_id ON admin_password_resets(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON admin_password_resets(expires_at);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_password_resets ENABLE ROW LEVEL SECURITY;

-- Create restrictive policies (only service role can access)
-- These tables should only be accessed via Edge Functions with service role key
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage password resets"
  ON admin_password_resets
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert initial admin user
-- Password: "ChangeMe2024!" (This should be changed immediately after first login)
-- The password_hash is bcrypt hash of "ChangeMe2024!" with cost factor 10
-- Generated with: bcrypt.hash("ChangeMe2024!", 10)
INSERT INTO admin_users (email, password_hash, name, is_active)
VALUES (
  'info@claudiaconen-akademie.de',
  '$2a$10$rPXLJvzO8YlqxH.FVZ8XZOQqF1YvN3H7U9gKUxGsG5vQT2kZ.W8CW',
  'Super Admin',
  true
)
ON CONFLICT (email) DO NOTHING;