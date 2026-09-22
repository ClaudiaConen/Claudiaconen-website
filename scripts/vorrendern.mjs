/**
 * Schreibt fuer jede oeffentliche Adresse eine fertige HTML-Datei.
 *
 * DAS PROBLEM, gemessen am 19.09.2026: claudiaconen.com liefert auf JEDER
 * Adresse dieselben 2.882 Byte ohne ein Wort sichtbaren Text.
 * /speaker-ausbildung war Byte fuer Byte identisch mit der Startseite. Der
 * Inhalt entsteht erst, wenn ein Browser JavaScript ausfuehrt. Google tut
 * das mit Verzoegerung, viele KI-Systeme tun es gar nicht.
 *
 * DIE LOESUNG: Nach dem Bau wird jede Seite einmal ausgerechnet und als
 * Datei abgelegt. Netlify liefert eine vorhandene Datei aus, BEVOR es die
 * Weiterleitung /* -> /index.html anwendet. Wer ohne JavaScript abruft,
 * bekommt also echten Text; der Browser uebernimmt danach wie bisher.
 *
 * KEIN VERSTECKSPIEL: Ausgeliefert wird genau der Text, den auch ein Mensch
 * sieht - dieselbe Komponente, dieselben Klassen. Suchmaschinen etwas
 * anderes zu zeigen als Besuchern waere Cloaking und wuerde bestraft.
 *
 * SCHEITERT NIE DEN BAU: Jede Seite einzeln abgesichert, und das Skript
 * endet immer mit Code 0. Ein Fehler beim Vorrendern darf die Auslieferung
 * nicht blockieren - dann fehlt eben der Text, wie bisher.
 */
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';

const DIST = path.resolve('dist');
const BUENDEL = path.resolve('dist-vorrender/vorrender-eintrag.js');

function ersetzen(html, muster, neu) {
  return muster.test(html) ? html.replace(muster, neu) : html;
}

function maskieren(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function kopfSetzen(html, seo) {
  if (seo.title) {
    html = ersetzen(html, /<title>[\s\S]*?<\/title>/, `<title>${maskieren(seo.title)}</title>`);
    html = ersetzen(html, /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${maskieren(seo.title)}"`);
    html = ersetzen(html, /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${maskieren(seo.title)}"`);
  }
  if (seo.description) {
    html = ersetzen(html, /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${maskieren(seo.description)}"`);
    html = ersetzen(html, /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${maskieren(seo.description)}"`);
    html = ersetzen(html, /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${maskieren(seo.description)}"`);
  }
  // Die Robots-Angabe. Sie fehlte bis zum 19.09.2026: Zwei Danke-Seiten
  // setzen noindex, und in der ausgelieferten Datei stand trotzdem
  // "index, follow". Die SEO-Komponente setzt es erst im Browser - was
  // Google sieht, die meisten KI-Crawler aber nicht.
  // follow bleibt auch bei noindex: die Seite soll nicht in den Index,
  // ihre Verweise duerfen aber weiterverfolgt werden.
  if (seo.noindex) {
    html = ersetzen(html, /<meta name="robots" content="[^"]*"/,
      '<meta name="robots" content="noindex, follow"');
  }
  // Das Vorschaubild je Seite (og:image). Fehlte bis zum 22.09.2026: Die
  // Challenge-Seite lieferte in Discord und WhatsApp das Standardbild der
  // Startseite, obwohl SEO.tsx ein eigenes mitgab - nur im Browser gesetzt.
  if (seo.ogImage) {
    html = ersetzen(html, /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${maskieren(seo.ogImage)}"`);
    html = ersetzen(html, /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${maskieren(seo.ogImage)}"`);
  }
  if (seo.canonicalUrl) {
    html = ersetzen(html, /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${maskieren(seo.canonicalUrl)}"`);
    html = ersetzen(html, /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${maskieren(seo.canonicalUrl)}"`);
  }
  return html;
}

async function main() {
  console.log('> Vorrendern gestartet');

  if (!fs.existsSync(BUENDEL)) {
    console.log('  Serverbuendel fehlt - uebersprungen, Bau bleibt gueltig.');
    return;
  }
  const huellePfad = path.join(DIST, 'index.html');
  if (!fs.existsSync(huellePfad)) {
    console.log('  dist/index.html fehlt - uebersprungen.');
    return;
  }
  const huelle = fs.readFileSync(huellePfad, 'utf-8');
  if (!huelle.includes('<div id="root"></div>')) {
    console.log('  Kein leeres root-Element - abgebrochen, nichts veraendert.');
    return;
  }

  // WICHTIG, sonst entsteht ein stiller Schaden: Die Startseite wird am Ende
  // nach dist/index.html geschrieben. Genau diese Datei ist aber auch das
  // Auffangnetz fuer alle Adressen ohne eigene Datei (_redirects: /* -> ...).
  // Ohne Gegenmassnahme wuerden rund 120 Adressen im Quelltext behaupten, sie
  // seien die Startseite - mitsamt deren Titel und deren kanonischer Adresse.
  // Deshalb bekommt das Auffangnetz eine eigene, unveraenderte Datei.
  //
  // Das Auffangnetz darf ausserdem NICHT behaupten, die Startseite zu sein.
  // Gemessen am 21.09.2026: Alle 85 Artikel unter /wissensbibliothek/ trugen
  // im ausgelieferten HTML die kanonische Adresse https://claudiaconen.com/ -
  // jede Suchmaschine bekam also gesagt, der Artikel sei nur eine Kopie der
  // Startseite. Die Zeilen fliegen hier raus; SEO.tsx setzt sie im Browser
  // fuer die jeweilige Seite neu (legt das Element an, wenn es fehlt).
  const auffangnetz = huelle
    .replace(/^[ \t]*<link rel="canonical" href="[^"]*"\s*\/?>\s*\n/m, '')
    .replace(/^[ \t]*<meta property="og:url" content="[^"]*"\s*\/?>\s*\n/m, '')
    .replace(/^[ \t]*<meta name="twitter:url" content="[^"]*"\s*\/?>\s*\n/m, '');
  fs.writeFileSync(path.join(DIST, 'app.html'), auffangnetz, 'utf-8');
  console.log('  + Auffangnetz nach dist/app.html gesichert'
    + (auffangnetz.includes('rel="canonical"') ? ' - ACHTUNG: kanonische Adresse steht noch drin' : ' (ohne kanonische Adresse)'));

  const mod = await import(pathToFileURL(BUENDEL).href);
  let fertig = 0;
  let uebersprungen = 0;
  let startseite = null;

  for (const eintrag of mod.SEITEN) {
    const pfad = eintrag.pfad;
    try {
      const { markup, seo, textLaenge } = await mod.rendern(pfad);

      // Eine fast leere Seite deutet auf einen Fehler hin, nicht auf einen
      // kurzen Text. Dann lieber die Huelle behalten als Muell ausliefern.
      if (textLaenge < 400) {
        throw new Error(`nur ${textLaenge} Zeichen Text`);
      }

      // Warnen, wenn eine Seite keine eigenen Kopfangaben mitbringt. Dann
      // erbt sie Titel, Beschreibung und kanonische Adresse der Huelle - und
      // erklaert sich damit selbst zur Startseite. Genau das war am
      // 19.09.2026 bei /unverwechselbare der Fall, und es faellt sonst
      // niemandem auf, weil die Seite ja funktioniert.
      const erwartet = `https://claudiaconen.com${pfad === '/' ? '/' : pfad}`;
      if (!seo.canonicalUrl) {
        console.log(`  ! ${pfad.padEnd(42)} ohne eigene Kopfangaben - erbt die der Huelle`);
      } else if (seo.canonicalUrl !== erwartet) {
        console.log(`  ! ${pfad.padEnd(42)} kanonisch ${seo.canonicalUrl} statt ${erwartet}`);
      }

      let html = huelle.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
      html = kopfSetzen(html, seo);

      if (pfad === '/') {
        startseite = html;
      } else {
        // WICHTIG: als <adresse>.html ablegen, NICHT als <adresse>/index.html.
        // Gemessen am 19.09.2026: Bei einem Ordner mit index.html antwortet
        // Netlify auf /speaker-ausbildung mit einer 301-Umleitung auf
        // /speaker-ausbildung/ - erst der zweite Abruf liefert die Seite.
        // Das kostet einen Umweg, es passt nicht zu den Adressen im
        // Seitenverzeichnis und nicht zu der kanonischen Adresse in der Seite
        // selbst. Bei einer flachen Datei entfaellt die Umleitung.
        const datei = path.join(DIST, pfad.replace(/^\//, '') + '.html');
        fs.mkdirSync(path.dirname(datei), { recursive: true });
        fs.writeFileSync(datei, html, 'utf-8');
      }
      fertig++;
      console.log(`  + ${pfad.padEnd(42)} ${String(textLaenge).padStart(5)} Zeichen Text`);
    } catch (e) {
      uebersprungen++;
      console.log(`  - ${pfad.padEnd(42)} uebersprungen: ${String(e.message).split('\n')[0].slice(0, 70)}`);
    }
  }

  // Die Startseite zuletzt, damit die Huelle bis dahin unveraendert bleibt.
  if (startseite) {
    fs.writeFileSync(huellePfad, startseite, 'utf-8');
    console.log('  + Startseite in dist/index.html geschrieben');
  }

  // Das Serverbuendel gehoert nicht in die Auslieferung.
  fs.rmSync(path.resolve('dist-vorrender'), { recursive: true, force: true });

  console.log(`> Vorrendern fertig: ${fertig} Seiten, ${uebersprungen} uebersprungen`);

  // NOTBREMSE 1: Die Startseite darf nicht fehlen.
  // Am 19.09.2026 wurde sie mit "supabaseUrl is required" uebersprungen
  // und der Bau meldete trotzdem Erfolg - ausgeliefert worden waere eine
  // leere Huelle. Fehlende Umgebungswerte sind die haeufigste Ursache:
  //   set -a; . /opt/vinci/secrets/supabase.env; set +a
  const start = path.join(DIST, 'index.html');
  const startGross = fs.existsSync(start) ? fs.statSync(start).size : 0;
  if (startGross < 20000) {
    console.error('');
    console.error(`! ABBRUCH: dist/index.html ist nur ${startGross} Byte gross.`);
    console.error('! Die Startseite wurde nicht vorgerendert - vermutlich fehlen');
    console.error('! VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY in der Umgebung.');
    console.error('! Ein Livegang damit waere eine leere Startseite.');
    process.exit(1);
  }

  // NOTBREMSE 2: Eine Seite ohne interne Verweise ist eine Sackgasse.
  // Das Aufklappmenue ist aus Knoepfen gebaut und hat keine href-Angaben;
  // ohne die Seitenuebersicht kommt ein Suchprogramm von der Startseite
  // aus nirgendwo hin. Byte-Zahl allein beweist das nicht.
  const verweise = new Set(
    (fs.readFileSync(start, 'utf8').match(/href="\/[a-z0-9/-]*"/g) || [])
  );
  if (verweise.size < 20) {
    console.error('');
    console.error(`! ABBRUCH: Die Startseite hat nur ${verweise.size} interne Verweise.`);
    console.error('! Ohne Verweisnetz findet kein Suchprogramm die Unterseiten.');
    console.error('! Steht <Seitenuebersicht /> noch im Vorrender-Einstieg?');
    process.exit(1);
  }
  console.log(`> Startseite: ${startGross} Byte, ${verweise.size} interne Verweise`);
}

main().catch((e) => {
  console.log('Vorrendern fehlgeschlagen, Bau bleibt gueltig:', e.message);
});
