/*
  # Add Role-Based Access Control to Admin Users

  Adds two new columns to admin_users:
  - `role` (text): 'super_admin' | 'admin' | 'editor' | 'viewer'
  - `allowed_sections` (text[]): Array of allowed section keys

  Section keys:
  - 'dashboard'
  - 'kursverwaltung'
  - 'terminverwaltung'
  - 'inhalte'
  - 'projektmanagement'
  - 'verwaltung'

  Super-Admins always have full access regardless of allowed_sections.
  Only Super-Admins can change roles and permissions.
*/

-- Add role column with default 'viewer' for new users
ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'viewer'
  CONSTRAINT valid_role CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer'));

-- Add allowed_sections column (array of section keys)
ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS allowed_sections text[] NOT NULL DEFAULT '{}';

-- Set the existing initial admin (info@claudiaconen-akademie.de) as super_admin with all sections
UPDATE admin_users
SET role = 'super_admin',
    allowed_sections = ARRAY['dashboard', 'kursverwaltung', 'terminverwaltung', 'inhalte', 'projektmanagement', 'verwaltung']
WHERE email = 'info@claudiaconen-akademie.de';

-- Create index for role-based queries
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
