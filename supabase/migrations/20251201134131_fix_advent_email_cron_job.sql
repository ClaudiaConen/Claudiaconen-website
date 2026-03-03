/*
  # Fix Advent Email Cron Job

  1. Changes
    - Fix cron job to use correct function name: net.http_post() instead of extensions.http_post()
    - The pg_net extension provides functions in the 'net' schema, not 'extensions'

  2. Notes
    - This fixes the error: "function extensions.http_post(...) does not exist"
    - The correct function is net.http_post() from the pg_net extension
*/

-- Drop existing cron job
SELECT cron.unschedule('send-daily-advent-email') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'send-daily-advent-email'
);

-- Recreate cron job with correct function name
SELECT cron.schedule(
  'send-daily-advent-email',
  '0 5 * 12 *',
  $$
  SELECT net.http_post(
    url := 'https://szilqjmcqdydwwtitxyb.supabase.co/functions/v1/send-daily-advent-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aWxxam1jcWR5ZHd3dGl0eHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDEzODYsImV4cCI6MjA3NjExNzM4Nn0.qTu_0iHZNnkAfgYyJzmqIAFl6Mk53Wv_5gnXXqfeOAo'
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
