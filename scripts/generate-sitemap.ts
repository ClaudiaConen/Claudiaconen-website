import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const SITE_URL = 'https://claudia-conen-expert-platform.bolt.host';

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
  { path: '/wissensmagazin', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/newsletter', priority: '0.7', changefreq: 'monthly' },

  { path: '/mentoring-gold', priority: '0.9', changefreq: 'monthly' },
  { path: '/mentoring-transformation', priority: '0.9', changefreq: 'monthly' },
  { path: '/mentoring-online', priority: '0.9', changefreq: 'monthly' },
  { path: '/eins-zu-eins-mentoring', priority: '0.9', changefreq: 'monthly' },

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

  { path: '/blog/ki', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog/neuro', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog/wirkung', priority: '0.7', changefreq: 'weekly' },

  { path: '/claudia-ai-beta', priority: '0.6', changefreq: 'monthly' },

  { path: '/impressum', priority: '0.3', changefreq: 'yearly' },
  { path: '/datenschutz', priority: '0.3', changefreq: 'yearly' },
  { path: '/agb', priority: '0.3', changefreq: 'yearly' },
];

async function generateSitemap() {
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

  articles.forEach(article => {
    const lastmod = article.published_at ? new Date(article.published_at).toISOString().split('T')[0] : today;
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/wissensbibliothek/${article.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`✓ Sitemap erstellt: ${sitemapPath}`);
  console.log(`✓ Insgesamt ${staticPages.length + articles.length} URLs in Sitemap`);
  console.log(`  - ${staticPages.length} statische Seiten`);
  console.log(`  - ${articles.length} Wissensbibliothek-Artikel`);
}

generateSitemap().catch(console.error);
