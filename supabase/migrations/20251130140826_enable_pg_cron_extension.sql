/*
  # Enable pg_cron Extension
  
  1. Extension
    - Enable pg_cron for scheduled jobs
  
  2. Notes
    - pg_cron allows scheduling of SQL commands to run at specific times
    - Required for automated daily advent email sending
*/

CREATE EXTENSION IF NOT EXISTS pg_cron;
