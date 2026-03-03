/*
  # Move pg_net Extension from Public Schema

  1. Changes
    - Drop pg_net extension from public schema
    - Recreate pg_net extension in extensions schema
    - Update cron job to reference correct schema

  2. Security
    - Extensions should not be in public schema for security best practices
    - Reduces attack surface by isolating extensions
    - Follows Supabase security recommendations

  3. Notes
    - pg_net is used by cron jobs for HTTP requests
    - Moving to extensions schema is best practice
    - Functionality remains the same
*/

-- Drop pg_net from public schema
DROP EXTENSION IF EXISTS pg_net CASCADE;

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Recreate pg_net in extensions schema
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Drop existing cron job
SELECT cron.unschedule('send-daily-advent-email') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'send-daily-advent-email'
);

-- Recreate cron job with correct schema reference
SELECT cron.schedule(
  'send-daily-advent-email',
  '0 5 * 12 *',
  $$
  SELECT extensions.http_post(
    url := 'https://szilqjmcqdydwwtitxyb.supabase.co/functions/v1/send-daily-advent-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aWxxam1jcWR5ZHd3dGl0eHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDEzODYsImV4cCI6MjA3NjExNzM4Nn0.qTu_0iHZNnkAfgYyJzmqIAFl6Mk53Wv_5gnXXqfeOAo'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
