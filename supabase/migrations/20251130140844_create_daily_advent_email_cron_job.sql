/*
  # Create Daily Advent Email Cron Job
  
  1. Cron Job
    - Schedules automatic daily email sending at 6:00 AM CET (5:00 AM UTC)
    - Calls the send-daily-advent-notification edge function
    - Runs every day during December
  
  2. Security
    - Uses pg_net extension to make HTTP requests
    - Calls edge function with proper authentication
  
  3. Notes
    - CET is UTC+1, so 6:00 AM CET = 5:00 AM UTC
    - The edge function itself checks if it's December 1-24
    - Cron expression: '0 5 * 12 *' means "at 5:00 AM every day in December"
*/

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove existing cron job if it exists
SELECT cron.unschedule('send-daily-advent-email') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'send-daily-advent-email'
);

-- Create cron job to send daily advent emails at 6:00 AM CET (5:00 AM UTC)
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
