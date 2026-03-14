/**
 * Setup-Script: Erstellt den "event-images" Storage-Bucket im CMS Supabase-Projekt.
 * Einmalig ausführen mit: npx tsx scripts/setup-event-images-bucket.ts
 */

import { createClient } from '@supabase/supabase-js';

const CMS_SUPABASE_URL = 'https://eammlfkjtbqcubxpfxes.supabase.co';
// Service-Role-Key benötigt (nicht anon) – aus dem Supabase Dashboard unter Settings > API
const SERVICE_ROLE_KEY = process.env.CMS_SUPABASE_SERVICE_ROLE_KEY || '';

if (!SERVICE_ROLE_KEY) {
  console.error('❌ CMS_SUPABASE_SERVICE_ROLE_KEY fehlt. Bitte als Umgebungsvariable setzen.');
  process.exit(1);
}

const supabase = createClient(CMS_SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log('🔧 Erstelle event-images Bucket...');

  const { data, error } = await supabase.storage.createBucket('event-images', {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024, // 10 MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  });

  if (error && error.message !== 'The resource already exists') {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }

  if (error?.message === 'The resource already exists') {
    console.log('ℹ️  Bucket existiert bereits.');
  } else {
    console.log('✅ Bucket "event-images" erstellt:', data);
  }
}

main();
