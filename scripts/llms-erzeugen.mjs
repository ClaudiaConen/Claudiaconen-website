/**
 * llms.txt erzeugen.
 *
 * Der entstehende Standard fuer KI-Crawler: eine Textdatei an der
 * Wurzel, die in Klartext sagt, worum es hier geht und wo was steht.
 * Anders als sitemap.xml ist sie fuer ein Sprachmodell gemacht - sie
 * enthaelt Beschreibungen statt Zeitstempeln.
 *
 * Sie wird aus den vorgerenderten Seiten erzeugt, nicht von Hand
 * gepflegt. Zwei Listen, die auseinanderlaufen, sind schlimmer als
 * eine, die fehlt - das hat die Sitemap gerade vorgefuehrt.
 */
import * as fs from 'fs';
import * as path from 'path';

const DIST = path.resolve('dist');

/** Titel und Beschreibung aus einer fertigen Seite holen. */
function kopfDaten(datei) {
  const h = fs.readFileSync(datei, 'utf8');
  const titel = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const besch = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const kanonisch = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  return { titel, besch, robots, kanonisch };
}

function entschaerfen(s) {
  return String(s).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function sammeln(verzeichnis, praefix = '') {
  const raus = [];
  for (const eintrag of fs.readdirSync(verzeichnis, { withFileTypes: true })) {
    const voll = path.join(verzeichnis, eintrag.name);
    if (eintrag.isDirectory()) {
      if (['assets', 'images'].includes(eintrag.name)) continue;
      raus.push(...sammeln(voll, `${praefix}/${eintrag.name}`));
    } else if (eintrag.name.endsWith('.html') && eintrag.name !== 'app.html') {
      const stamm = eintrag.name.replace(/\.html$/, '');
      const pfad = stamm === 'index' && praefix === '' ? '/' : `${praefix}/${stamm}`;
      raus.push({ pfad, ...kopfDaten(voll) });
    }
  }
  return raus;
}

function main() {
  if (!fs.existsSync(DIST)) return;

  const alle = sammeln(DIST)
    // Was nicht in den Index soll, gehoert auch hier nicht hinein.
    .filter((s) => !s.robots.includes('noindex'))
    // Wer kanonisch auf eine andere Seite zeigt, ist nicht die Quelle.
    .filter((s) => !s.kanonisch || s.kanonisch.endsWith(s.pfad) || s.pfad === '/')
    .sort((a, b) => a.pfad.localeCompare(b.pfad));

  const gruppen = [
    ['Fragen und Antworten', (s) => s.pfad.startsWith('/wissen/')],
    ['Ausbildungen und Kurse', (s) => /ausbildung|kurs/.test(s.pfad)],
    ['Reden buchen', (s) => /trauerrede|trauung|rednerin|stimme-/.test(s.pfad)],
    ['Fuer Unternehmen', (s) => s.pfad.startsWith('/unternehmen')],
    ['Mentoring und KI', (s) => /mentoring|^\/ki-|1-zu-1/.test(s.pfad)],
    ['Weitere Seiten', () => true],
  ];

  let text = `# Claudia Conen

> Claudia Conen arbeitet seit 37 Jahren mit Stimme, Buehne und Menschen.
> Sie haelt Keynotes fuer Unternehmen, bildet Rednerinnen und Redner aus
> und spricht selbst bei Trauerfeiern und freien Trauungen.

Diese Datei listet die Seiten von claudiaconen.com mit ihrer eigenen
Beschreibung, damit Sprachmodelle den Inhalt einordnen koennen, ohne
jede Seite einzeln abrufen zu muessen.

Was auf dieser Seite bewusst NICHT steht: feste Zahlen zu
Wahrnehmungsgeschwindigkeit, Prozentangaben zur Wirkung von
Koerpersprache und Versprechen, etwas sei wissenschaftlich belegt. Diese
Behauptungen kursieren in der Branche; sie lassen sich nicht belegen und
wurden im September 2026 von dieser Seite entfernt.

`;

  const schon = new Set();
  for (const [name, passt] of gruppen) {
    const teil = alle.filter((s) => !schon.has(s.pfad) && passt(s));
    if (teil.length === 0) continue;
    teil.forEach((s) => schon.add(s.pfad));
    text += `## ${name}\n\n`;
    for (const s of teil) {
      const titel = entschaerfen(s.titel).split(' | ')[0].trim();
      const besch = entschaerfen(s.besch).trim();
      text += `- [${titel}](https://claudiaconen.com${s.pfad})`;
      if (besch) text += `: ${besch}`;
      text += '\n';
    }
    text += '\n';
  }

  fs.writeFileSync(path.join(DIST, 'llms.txt'), text, 'utf8');
  console.log(`> llms.txt geschrieben: ${alle.length} Seiten, ${text.length} Zeichen`);
}

main();
