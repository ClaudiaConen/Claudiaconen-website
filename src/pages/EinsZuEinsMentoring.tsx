import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 3: Coaches und Trainer. Das 1:1 ist laut Strategie das
 * Referenzprodukt und liefert die Geschichten, die Motor A auf der Buehne
 * verkauft.
 *
 * Preis bewusst OFFEN. Die Marketingstrategie sagt dazu ausdruecklich "von
 * Claudia zu setzen", die Angebotstreppe nennt nur einen Entwurf von 5.000
 * bis 7.500 Euro. Bei einem Betrag dieser Groesse ist eine geratene Zahl
 * auf einer oeffentlichen Seite nicht vertretbar.
 *
 * Der Kritiker-Check verlangt fuer dieses Format ein messbares oder
 * sichtbares Ergebnis. Deshalb steht am Ende ein Ergebnis, das man vorzeigen
 * kann, und nicht nur ein Gefuehl.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/1-zu-1-mentoring',
  wer: 'Coaches & Trainer',
  frage: 'Warum sollte man dich buchen – und nicht den nächsten Experten?',
  vorspann:
    'Kompetenz allein macht noch keine unverwechselbare Marke. Entscheidend ist, ob Menschen erkennen, wofür du stehst, dir vertrauen und dich im Kopf behalten.',

  problemTitel: 'Dein Problem ist nicht Können. Es ist Vergleichbarkeit.',
  problemAbsaetze: [
    'Du bist gut in dem, was du tust. Das bestreitet niemand. Nur steht neben dir jemand, der dasselbe verspricht, und für den, der bucht, sieht beides gleich aus.',
    'Je mehr Texte, Bilder und Angebote auf Knopfdruck entstehen, desto ähnlicher wird alles. Perfektion ist klickbar geworden. Was nicht klickbar ist, bist du.',
    'Die Frage ist also nicht, wie du besser wirst. Sie lautet, woran man dich erkennt, wenn dein Name nicht danebensteht.',
  ],

  angebotName: 'Voice-to-Brain® Intensiv, zwölf Wochen',
  angebotZeile:
    'Eine Einzelbegleitung über zwölf Wochen. Am Ende steht kein gutes Gefühl, sondern etwas, das du vorzeigen kannst.',
  angebotPreis: 'Preis im Erstgespräch',
  angebotPreisHinweis:
    'Der Umfang wird vorher gemeinsam festgelegt. Ohne Gespräch wäre jede Zahl geraten.',
  angebotPunkte: [
    'Zwölf Wochen, feste Termine, dazwischen Arbeit an deinen echten Auftritten',
    'Die drei Phasen der Methode: erkennen, formen, wirken',
    'Am Ende ein vorzeigbares Ergebnis: eine fertige Keynote, ein sitzender Pitch oder ein Kameraauftritt',
    'Deine Positionierung in einem Satz, den du selbst überzeugend sagen kannst',
  ],

  ablaufTitel: 'Die drei Phasen',
  ablauf: [
    {
      schritt: 'Erkennen',
      text:
        'Klarheit und Geschichte. Woher dein Wert kommt, und welche deiner Erfahrungen dafür tragen. Das ist der unbequemste Teil und der wichtigste.',
    },
    {
      schritt: 'Formen',
      text:
        'Botschaft, Stimme, Präsenz. Aus dem, was du erkannt hast, wird etwas, das andere hören und behalten.',
    },
    {
      schritt: 'Wirken',
      text:
        'Brücke und Wirkung. Wie du KI nutzt, ohne austauschbar zu werden, und woran du merkst, dass es ankommt.',
    },
    {
      schritt: 'Danach',
      text:
        'Du hast ein fertiges Stück Arbeit in der Hand. Kein Zertifikat, sondern etwas, das du buchstäblich vorzeigen kannst.',
    },
  ],

  brotkrumen: [
    { name: 'Mentoring' },
  ],

  fragen: [
    {
      frage: 'Was kostet das?',
      antwort:
        'Das wird im Erstgespräch festgelegt, weil der Umfang sich unterscheidet. Es handelt sich um eine Begleitung über zwölf Wochen im vierstelligen Bereich, nicht um ein Paket von der Stange. Wer eine schnelle günstige Lösung sucht, ist mit dem Online-Kurs oder einem Workshoptag besser bedient.',
    },
    {
      frage: 'Ist das Stimmtraining?',
      antwort:
        'Nein. Die Stimme ist der Zugang, die Persönlichkeit ist das Ergebnis. Über die Stimme wird erkennbar, wie jemand zu sich steht. Daran wird gearbeitet, nicht an Tonhöhe und Atemtechnik allein.',
    },
    {
      frage: 'Woher weiß ich, dass die Methode wissenschaftlich fundiert ist?',
      antwort:
        'Sie ist Erfahrungswissen aus über siebenunddreißig Jahren Arbeit mit Stimme, Bühne und Menschen. Wissenschaftliche Versprechen werden hier keine gemacht. Was zählt, ist, ob sich dein Auftritt verändert — und das hörst du selbst, wenn du deine Aufnahme aus Woche eins neben die aus Woche zwölf legst.',
    },
    {
      frage: 'Ich habe wenig Zeit. Wie viel muss ich einplanen?',
      antwort:
        'Feste Termine über zwölf Wochen, dazwischen Arbeit an Auftritten, die du ohnehin hast. Es kommt also nichts zusätzlich auf den Kalender, es wird anders vorbereitet.',
    },
  ],

  schrittTitel: 'Erst reden, dann entscheiden',
  schrittText:
    'Ein Gespräch, in dem geklärt wird, woran es bei dir wirklich hakt. Wenn etwas anderes besser passt als zwölf Wochen Einzelbegleitung, hörst du das auch.',
  schrittKnopf: 'Erstgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  // Kopfbild (22.09.2026): Claudia Conen lächelt mit dem Telefon in der Hand
  bild: '/seiten/am-telefon.webp',
  bildAlt: 'Claudia Conen lächelt mit dem Telefon in der Hand',
  bildQuer: true,

  seoTitel: 'Voice-to-Brain Intensiv für Coaches und Trainer | Claudia Conen',
  seoText:
    'Einzelbegleitung über zwölf Wochen für Coaches und Trainer, die unverwechselbar werden wollen. Positionierung, Persönlichkeit, Vertrauen, Kundengewinnung.',
};

export default function EinsZuEinsMentoring() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
