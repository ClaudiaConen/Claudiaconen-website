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

      let html = huelle.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
      html = kopfSetzen(html, seo);

      if (pfad === '/') {
        startseite = html;
      } else {
        const ordner = path.join(DIST, pfad.replace(/^\//, ''));
        fs.mkdirSync(ordner, { recursive: true });
        fs.writeFileSync(path.join(ordner, 'index.html'), html, 'utf-8');
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
}

main().catch((e) => {
  console.log('Vorrendern fehlgeschlagen, Bau bleibt gueltig:', e.message);
});
