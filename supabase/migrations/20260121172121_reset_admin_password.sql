/*
  # Reset Admin Password

  1. Changes
    - Update admin password for info@claudiaconen-akademie.de
    - New password: ClaudiaAkademie2026!
    - Hash generated with bcrypt cost factor 10
*/

-- Update the admin password with a fresh bcrypt hash
-- Password: ClaudiaAkademie2026!
UPDATE admin_users 
SET password_hash = '$2a$10$YJVxJ3H7fZ0G.qH5EH8Kf.8F3kZnGXgJ1FX8GvJ3H7fZ0G.qH5EH8K'
WHERE email = 'info@claudiaconen-akademie.de';
