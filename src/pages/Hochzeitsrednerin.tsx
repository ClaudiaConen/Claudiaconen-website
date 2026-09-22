import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Anlass-Seite: freie Trauung.
 *
 * Wie die Trauerseite gedacht als eigenstaendige Seite fuer den QR-Code, etwa
 * auf einer Hochzeitsmesse. Stimmung "hell": festlich, mehr Gold, warme
 * helle Flaechen.
 *
 * Marktzahlen aus der Recherche vom 18.09.2026: Der Durchschnitt liegt bei
 * rund 1.000 Euro, erfahrene Redner zwischen 1.100 und 1.600, die Spanne
 * insgesamt zwischen 800 und 2.500. Der Arbeitsaufwand je Trauung betraegt
 * 25 bis 35 Stunden. Diese Zahlen stehen als MARKT auf der Seite, nicht als
 * Claudias Preis: Ihr eigenes Honorar ist nirgends dokumentiert, und eine
 * geratene Zahl waere eine Zusage in ihrem Namen.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/freie-trauung',
  stimmung: 'hell',
  wer: 'Freie Trauung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Wer erzählt eure Geschichte, wenn ihr vor euren Menschen steht?',
  vorspann:
    'Eine freie Trauung ist kein Programmpunkt zwischen Sekt und Fotos. Sie ist der Moment, an den sich alle erinnern, auch in zwanzig Jahren.',

  problemTitel: 'Woran freie Trauungen scheitern',
  problemAbsaetze: [
    'An Austauschbarkeit. Es gibt Reden, die auf jedes Paar passen würden, und genau das spüren die Gäste. Freundlich, gut gemeint, und nach zehn Minuten vergessen.',
    'An der Angst vor Kitsch. Viele Paare wollen bewegend, aber nicht rührselig. Das ist eine Frage des Handwerks, nicht des Geschmacks.',
    'Und an Technik. Eine wunderbare Rede, die in der dritten Reihe nicht mehr zu hören ist, war keine wunderbare Rede.',
  ],

  angebotName: 'Eure Trauung',
  angebotZeile:
    'Ein Kennenlernen, ein ausführliches Gespräch, eine Zeremonie, die nur zu euch passt. Mit Ritual, wenn ihr wollt, und ohne, wenn ihr nicht wollt.',
  angebotPreis: 'Honorar auf Anfrage',
  angebotPreisHinweis:
    'Zur Einordnung: Der Durchschnitt liegt in Deutschland bei rund 1.000 Euro je Trauung, erfahrene Rednerinnen liegen zwischen 1.100 und 1.600 Euro, die gesamte Spanne reicht von etwa 800 bis 2.500. Dahinter stecken 25 bis 35 Arbeitsstunden je Trauung. Was es bei euch ist, sage ich euch nach dem Kennenlernen.',
  angebotPunkte: [
    'Ein Kennenlernen ohne Verpflichtung, online oder bei einem Kaffee',
    'Ein ausführliches Gespräch, in dem eure Geschichte entsteht',
    'Die geschriebene Zeremonie, vorab zum Lesen und Ändern',
    'Abstimmung mit Location, Musik und Technik vor dem Tag',
    'Die Trauung selbst, und eine gedruckte Fassung der Rede für euch',
  ],

  ablaufTitel: 'Von der Anfrage bis zum Ja',
  ablauf: [
    {
      schritt: 'Kennenlernen',
      text:
        'Zwanzig Minuten reichen, um zu merken, ob es passt. Es kostet nichts und verpflichtet zu nichts. Wenn es nicht passt, sage ich es, und ihr habt nichts verloren.',
    },
    {
      schritt: 'Euer Gespräch',
      text:
        'Zwei bis drei Stunden, gern bei euch. Wie ihr euch kennengelernt habt, was schiefging, was euch trägt. Aus diesem Gespräch entsteht alles Weitere.',
    },
    {
      schritt: 'Die Zeremonie entsteht',
      text:
        'Ihr bekommt den Text vorab. Was euch zu privat ist, fliegt raus. Was fehlt, kommt dazu. Nichts wird euch vorgesetzt.',
    },
    {
      schritt: 'Der Tag',
      text:
        'Ich bin früh da, spreche mit Location und Technik, und sorge dafür, dass ihr euch um nichts kümmern müsst außer umeinander.',
    },
  ],

  bilder: [
    {
      bereich: 'Der Moment',
      motiv: 'Das Paar während der Zeremonie, du im Anschnitt. Querformat, Tageslicht.',
    },
    {
      bereich: 'Die Gäste',
      motiv: 'Zuhörende Gesichter, echte Reaktionen. Der Beleg, dass die Rede ankommt.',
    },
  ],

  brotkrumen: [
    { name: 'Freie Rednerin', ziel: '/freie-rednerin' },
    { name: 'Freie Trauung' },
  ],

  fragen: [
    {
      // Gesucht wird "freie Rednerin in der Naehe" - siehe Trauerrednerin.tsx.
      frage: 'Wo bist du als freie Rednerin unterwegs?',
      antwort:
        'Ich lebe in Witten und begleite freie Trauungen im Ruhrgebiet. Weitere Wege sind nach Absprache möglich. Schreibt mir, wo ihr feiert, dann sage ich euch gleich, ob ich kommen kann.',
    },
    {
      frage: 'Wie früh sollten wir anfragen?',
      antwort:
        'Für Samstage zwischen Mai und September sind zwölf bis achtzehn Monate üblich. Kurzfristig geht öfter, als man denkt, weil Termine auch frei werden. Fragt einfach.',
    },
    {
      frage: 'Wir wollen es bewegend, aber nicht kitschig.',
      antwort:
        'Das ist der häufigste Satz in Erstgesprächen und der richtige. Kitsch entsteht durch große Worte an Stellen, die klein sind. Es lässt sich vermeiden, indem konkret erzählt wird statt allgemein: eine Szene aus eurem Leben trägt weiter als jedes Zitat über die Liebe.',
    },
    {
      frage: 'Können wir eigene Rituale einbauen?',
      antwort:
        'Ja, und es müssen keine gekauften sein. Die besten entstehen aus etwas, das es bei euch schon gibt. Im Gespräch fällt das meist von selbst auf.',
    },
    {
      frage: 'Dürfen Gäste mitwirken?',
      antwort:
        'Sehr gern. Wer sprechen möchte, wird von mir kurz vorbereitet, damit es sitzt. Für viele Gäste ist das der schönste Teil.',
    },
    {
      frage: 'Was, wenn jemand weint und nicht weitersprechen kann?',
      antwort:
        'Dann stehe ich daneben und übernehme. Das ist eingeplant und nie ein Bruch. Es gehört dazu.',
    },
  ],

  schrittTitel: 'Lernt mich einfach kennen',
  schrittText:
    'Zwanzig Minuten, ohne Verpflichtung. Danach wisst ihr, ob ich die Richtige für euren Tag bin. Und wenn nicht, sage ich euch, wer es sein könnte.',
  schrittKnopf: 'Kennenlernen vereinbaren',
  schrittZiel: '/termin-buchen',

  // Kopfbild (22.09.2026): Claudia Conen im hellen Kleid auf einer Wiese, dahinter die Buchstaben LOVE und Seifenblasen
  bild: '/seiten/love.webp',
  bildAlt: 'Claudia Conen im hellen Kleid auf einer Wiese, dahinter die Buchstaben LOVE und Seifenblasen',
  bildQuer: true,

  telefonImKopf: true,
  seoTitel: 'Freie Trauung und Hochzeitsrednerin | Claudia Conen',
  seoText:
    'Eine freie Trauung, die nur zu euch passt: persönliches Gespräch, geschriebene Zeremonie zum Mitlesen und Ändern, Abstimmung mit Location und Technik.',
};

export default function Hochzeitsrednerin() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
