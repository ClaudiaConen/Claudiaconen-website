import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const SITE_URL = 'https://claudiaconen.com';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: any = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/ueber-mich', priority: '0.9', changefreq: 'monthly' },
  { path: '/wissensbibliothek', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/newsletter', priority: '0.7', changefreq: 'monthly' },
  { path: '/buchprojekt', priority: '0.9', changefreq: 'weekly' },

  { path: '/mentoring-gold', priority: '0.9', changefreq: 'monthly' },
  { path: '/mentoring-transformation', priority: '0.9', changefreq: 'monthly' },
  { path: '/mentoring-online', priority: '0.9', changefreq: 'monthly' },
  { path: '/1-zu-1-mentoring', priority: '0.9', changefreq: 'monthly' },

  { path: '/speaker-training', priority: '0.9', changefreq: 'monthly' },
  { path: '/speaker-positionierung', priority: '0.8', changefreq: 'monthly' },
  { path: '/speaker-buehne', priority: '0.8', changefreq: 'monthly' },
  { path: '/speaker-social', priority: '0.8', changefreq: 'monthly' },
  { path: '/speaker-storytelling', priority: '0.8', changefreq: 'monthly' },

  { path: '/redner-ausbildungen', priority: '0.9', changefreq: 'monthly' },
  { path: '/stimme-hochzeit', priority: '0.8', changefreq: 'monthly' },
  { path: '/stimme-trauer', priority: '0.8', changefreq: 'monthly' },
  { path: '/stimme-voiceover', priority: '0.7', changefreq: 'monthly' },
  { path: '/stimme-keynote', priority: '0.8', changefreq: 'monthly' },

  { path: '/unternehmen-keynotes', priority: '0.9', changefreq: 'monthly' },
  { path: '/unternehmen-selling', priority: '0.8', changefreq: 'monthly' },
  { path: '/unternehmen-leadership', priority: '0.8', changefreq: 'monthly' },
  { path: '/unternehmen-events', priority: '0.8', changefreq: 'monthly' },

  { path: '/marke-und-positionierung', priority: '0.8', changefreq: 'monthly' },
  { path: '/keynote-und-buehnenperformance', priority: '0.8', changefreq: 'monthly' },
  { path: '/social-media-wirkung', priority: '0.7', changefreq: 'monthly' },

  { path: '/ausbildung-beruf', priority: '0.8', changefreq: 'monthly' },
  { path: '/ausbildung-zertifizierung', priority: '0.8', changefreq: 'monthly' },
  { path: '/ki-manager-ausbildung', priority: '0.9', changefreq: 'weekly' },

  { path: '/wissen-webinare', priority: '0.7', changefreq: 'monthly' },
  { path: '/wissen-community', priority: '0.7', changefreq: 'monthly' },
  { path: '/wissen-whatsapp', priority: '0.7', changefreq: 'monthly' },
  { path: '/wissen-telegram', priority: '0.7', changefreq: 'monthly' },
  { path: '/wissen-to-go', priority: '0.7', changefreq: 'monthly' },

  { path: '/immer-da-wo-du-bist', priority: '0.7', changefreq: 'monthly' },
  { path: '/von-schatten-zu-licht', priority: '0.7', changefreq: 'monthly' },

  { path: '/generatoren', priority: '0.8', changefreq: 'monthly' },
  { path: '/workbook-generator', priority: '0.7', changefreq: 'monthly' },
  { path: '/quiz-generator', priority: '0.7', changefreq: 'monthly' },

  { path: '/blog-ki', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog-neuro', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog-wirkung', priority: '0.7', changefreq: 'weekly' },

  { path: '/claudia-ai', priority: '0.6', changefreq: 'monthly' },

  // Freie Rednerin: Dachseite, Anlaesse, Ausbildungen (18.09.2026)
  { path: '/freie-rednerin', priority: '0.9', changefreq: 'monthly' },
  { path: '/trauerrede', priority: '0.8', changefreq: 'monthly' },
  { path: '/freie-trauung', priority: '0.8', changefreq: 'monthly' },
  { path: '/speaker-ausbildung', priority: '0.9', changefreq: 'monthly' },
  { path: '/elevator-pitch-kurs', priority: '0.8', changefreq: 'monthly' },
  { path: '/storytelling-kurs', priority: '0.8', changefreq: 'monthly' },
  { path: '/freie-redner-ausbildung', priority: '0.9', changefreq: 'monthly' },
  { path: '/trauerredner-ausbildung', priority: '0.8', changefreq: 'monthly' },
  { path: '/hochzeitsredner-ausbildung', priority: '0.8', changefreq: 'monthly' },

  { path: '/hoeren', priority: '0.8', changefreq: 'monthly' },
  { path: '/unverwechselbare', priority: '0.8', changefreq: 'monthly' },

  { path: '/wissen/was-kostet-ein-keynote-speaker', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/keynote-speaker-finden', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/stimme-trainieren', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/lampenfieber', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/charisma-lernen', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/thema-finden-speaker', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/sprechpausen', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/trauerrede-schreiben', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/keynote-speaker-werden', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/freie-trauung-ablauf', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/elevator-pitch', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/vier-ohren-modell', priority: '0.8', changefreq: 'monthly' },
  { path: '/wissen/keynote-aufbauen', priority: '0.8', changefreq: 'monthly' },

  // Vorhandene Seiten, die bisher in keiner Sitemap standen (18.09.2026)
  { path: '/premiumangebote', priority: '0.9', changefreq: 'monthly' },
  { path: '/termin-buchen', priority: '0.8', changefreq: 'monthly' },
  { path: '/events', priority: '0.8', changefreq: 'weekly' },
  { path: '/experten', priority: '0.7', changefreq: 'monthly' },
  { path: '/wirkungskraft-quiz', priority: '0.7', changefreq: 'monthly' },
  { path: '/ki-workshop-unverwechselbar', priority: '0.8', changefreq: 'monthly' },
  { path: '/ki-einsteiger-coaching', priority: '0.7', changefreq: 'monthly' },

  { path: '/impressum', priority: '0.3', changefreq: 'yearly' },
  { path: '/datenschutz', priority: '0.3', changefreq: 'yearly' },
  { path: '/agb', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Seiten, die ABSICHTLICH nicht in die Sitemap gehoeren.
 * Die vier Bestaetigungsseiten tragen noindex: Wer ueber die Suche auf
 * "Vielen Dank, dein Workbook wartet" landet, ohne das Formular
 * ausgefuellt zu haben, findet dort nichts.
 * /wissensmagazin ist dieselbe Seite wie /wissensbibliothek unter einer
 * zweiten Adresse - zwei Adressen fuer einen Inhalt schwaechen beide.
 */
const NICHT_IN_DIE_SITEMAP = new Set([
  '/checklist-bestaetigung',
  '/linkedin-freebie-confirmed',
  '/spanien-ki-workshop/danke',
  // Traegt selbst noindex (SpanienRetreat.tsx). Eine Sitemap, die eine Seite
  // anmeldet, die sich selbst abmeldet, widerspricht sich.
  '/spanien-ki-workshop',
  '/ki-workshop-unverwechselbar/danke',
  '/wissensmagazin',
  // Nicht oeffentlich, obwohl die Adresse es nicht verraet: diese drei
  // pruefen eine Anmeldung oder eine hinterlegte E-Mail und zeigen ohne
  // sie gar nichts. Sie werden auch nicht vorgerendert.
  '/meine-plaene',
  '/jahres-contentplan',
  '/adventskalender/kalender',
  // Diese vier zeigen mit ihrer kanonischen Angabe auf eine andere
  // Seite - sie sind aeltere Schablonenfassungen desselben Themas. Eine
  // Sitemap, die sie auffuehrt, widerspricht der kanonischen Angabe.
  '/stimme-trauer',
  '/stimme-hochzeit',
  '/ausbildung-beruf',
  '/speaker-storytelling',
]);

/**
 * Was vorgerendert wird, gehoert auch in die Sitemap. Die Liste der
 * vorgerenderten Seiten ist die eine Wahrheit; diese Funktion holt sich
 * von dort, was in der Aufzaehlung oben noch fehlt.
 */
function fehlendeErgaenzen() {
  const quelle = path.resolve('src/vorrender-eintrag.tsx');
  if (!fs.existsSync(quelle)) return;

  const text = fs.readFileSync(quelle, 'utf8');
  const vorhanden = new Set(staticPages.map(s => s.path));
  const ergaenzt: string[] = [];

  for (const treffer of text.matchAll(/pfad: '([^']+)'/g)) {
    const pfad = treffer[1];
    if (vorhanden.has(pfad) || NICHT_IN_DIE_SITEMAP.has(pfad)) continue;
    staticPages.push({ path: pfad, priority: '0.6', changefreq: 'monthly' });
    vorhanden.add(pfad);
    ergaenzt.push(pfad);
  }

  if (ergaenzt.length > 0) {
    console.log(`  ! ${ergaenzt.length} Seiten fehlten in der Sitemap und wurden mit Prioritaet 0.6 ergaenzt:`);
    ergaenzt.forEach(p => console.log(`      ${p}`));
    console.log('    Wenn eine davon wichtiger ist, gehoert sie mit eigener Prioritaet nach oben.');
  }
}

/**
 * Ausschliessen, was ausdruecklich nicht hineingehoert.
 *
 * Diese Funktion fehlte beim ersten Versuch: Die Ausnahmeliste wurde
 * nur beim ERGAENZEN geprueft, nicht bei dem, was von Hand oben in
 * staticPages steht. Die vier kanonisch umgeleiteten Seiten standen
 * dort - und blieben trotz Ausnahme in der Sitemap.
 *
 * Gefunden durch Nachzaehlen im fertigen Ergebnis, nicht durch Lesen
 * des Codes.
 */
function ausgeschlosseneEntfernen() {
  const vorher = staticPages.length;
  for (let i = staticPages.length - 1; i >= 0; i--) {
    if (NICHT_IN_DIE_SITEMAP.has(staticPages[i].path)) {
      staticPages.splice(i, 1);
    }
  }
  const weg = vorher - staticPages.length;
  if (weg > 0) {
    console.log(`  ! ${weg} Seiten aus der Sitemap genommen (noindex oder kanonisch auf eine andere Seite)`);
  }
}

async function generateSitemap() {
  fehlendeErgaenzen();
  ausgeschlosseneEntfernen();

  console.log('🚀 Generiere Sitemap...');

  let articles = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('knowledge_articles')
        .select('slug, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.warn('⚠️  Warnung: Konnte Artikel nicht laden:', error.message);
      } else {
        articles = data || [];
        console.log(`✓ ${articles.length} Artikel aus Datenbank geladen`);
      }
    } catch (error) {
      console.warn('⚠️  Warnung: Datenbankverbindung fehlgeschlagen');
    }
  } else {
    console.warn('⚠️  Keine Supabase-Verbindung konfiguriert, nur statische Seiten werden generiert');
  }

  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // ABGESCHALTET am 21.09.2026 - und das ist kein Versehen:
  // Die Sitemap hat hier 85 Adressen der Form /wissensbibliothek/<slug>
  // gemeldet. Fuer diese Adressen gibt es in App.tsx KEINE Route und gab es
  // nie eine - wer sie aufruft, landet auf der "nicht gefunden"-Seite. Die
  // Artikel leben nur als Aufklapp-Inhalt innerhalb von /wissensbibliothek.
  // Eine Sitemap, die 85 nicht existierende Seiten anmeldet, schadet dem
  // Vertrauen einer Suchmaschine in alle anderen Eintraege.
  // Wieder einschalten, sobald es die Artikelseiten wirklich gibt UND der
  // jeweilige Artikel inhaltlich geprueft ist (Zahlen, Quellen, Autor).
  const ARTIKELSEITEN_GIBT_ES = false;
  if (ARTIKELSEITEN_GIBT_ES) {
    articles.forEach(article => {
      const lastmod = article.published_at ? new Date(article.published_at).toISOString().split('T')[0] : today;
      xml += '  <url>\n';
      xml += `    <loc>${SITE_URL}/wissensbibliothek/${article.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += '  </url>\n';
    });
  }

  xml += '</urlset>';

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`✓ Sitemap erstellt: ${sitemapPath}`);
  const gemeldeteArtikel = ARTIKELSEITEN_GIBT_ES ? articles.length : 0;
  console.log(`✓ Insgesamt ${staticPages.length + gemeldeteArtikel} URLs in Sitemap`);
  console.log(`  - ${staticPages.length} statische Seiten`);
  console.log(`  - ${gemeldeteArtikel} Wissensbibliothek-Artikel (${articles.length} in der Datenbank, nicht gemeldet: es gibt keine Artikelseiten)`);
}

generateSitemap().catch(console.error);
