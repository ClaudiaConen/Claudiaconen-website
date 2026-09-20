/**
 * Kundenstimmen beim Bauen aus Supabase holen.
 *
 * Schreibt public/stimmen.json. Die Startseite liest das als
 * Anfangsstand, damit die Stimmen schon im HTML stehen - und laedt im
 * Browser trotzdem aus der Datenbank nach, damit nichts veraltet.
 *
 * NUR STIMMEN MIT ECHTEM NAMEN. Am 20.09.2026 trugen alle zehn als
 * Namen "Was Kunden sagen." plus eine Nummer: die Abschnitts-
 * ueberschrift, versehentlich ins Namensfeld geraten. Diese im
 * Quelltext zu haben waere schlechter als nichts - eine KI haelt sie
 * sonst fuer Menschen.
 */
import * as fs from 'fs';
import * as path from 'path';

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY;

/** Ist das ein echter Name oder ein Platzhalter? */
function echterName(name) {
  if (!name) return false;
  const n = String(name).trim();
  if (n.length < 3) return false;
  // "Was Kunden sagen." 4.  |  Testimonial 3  |  Kunde 7  |  nur eine Zahl
  if (/was kunden sagen/i.test(n)) return false;
  if (/^(testimonial|kunde|stimme|video)\s*\d*\.?$/i.test(n)) return false;
  if (/^[\d.\s]+$/.test(n)) return false;
  return true;
}

async function main() {
  const ziel = path.resolve('public/stimmen.json');
  if (!URL || !KEY) {
    console.log('  ! Kundenstimmen uebersprungen - VITE_SUPABASE_URL/KEY fehlen');
    fs.writeFileSync(ziel, '[]', 'utf8');
    return;
  }
  try {
    const r = await fetch(
      `${URL}/rest/v1/testimonials?select=id,name,role,vimeo_url,thumbnail_path,display_order&is_active=eq.true&order=display_order.asc&limit=10`,
      { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
    );
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const alle = await r.json();
    const echte = alle.filter((t) => echterName(t.name));
    fs.writeFileSync(ziel, JSON.stringify(echte), 'utf8');
    const weg = alle.length - echte.length;
    console.log(`> Kundenstimmen: ${echte.length} von ${alle.length} mitgeliefert`);
    if (weg > 0) {
      console.log(`  ! ${weg} ohne echten Namen - bleiben aus dem HTML draussen.`);
      console.log('    Namen eintragen unter /admin/testimonials, dann erscheinen sie von selbst.');
    }
  } catch (e) {
    console.log(`  ! Kundenstimmen nicht erreichbar (${e.message}) - Bau laeuft weiter`);
    fs.writeFileSync(ziel, '[]', 'utf8');
  }
}

main();
