import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * Die Frage mit der hoechsten Kaufabsicht im ganzen Feld. Wer sie stellt,
 * hat bereits ein Budget im Kopf und sucht eine Einordnung.
 *
 * Die Marktspannen stammen aus Claudias eigener Marktrecherche
 * (MARKETINGSTRATEGIE, Abschnitt 7, "Marktwerte aus der Recherche"). Sie
 * werden hier als Marktwerte benannt und nicht als eigene Preise ausgegeben.
 * Claudias eigene Preise stehen getrennt und sind als ihre gekennzeichnet.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/was-kostet-ein-keynote-speaker',
  bereich: 'Keynote & Bühne',
  aktualisiert: '2026-09-18',
  frage: 'Was kostet ein Keynote Speaker?',

  kurzantwort:
    'Im deutschsprachigen Raum liegt das Honorar für eine Keynote von 45 bis 60 Minuten meist zwischen 2.500 und 10.000 Euro. Ein kürzerer Impulsvortrag beginnt bei etwa 800 Euro, ein ganzer Workshoptag im Unternehmen liegt in der Regel zwischen 1.900 und 4.300 Euro. Dazu kommen Reisekosten und Umsatzsteuer.',

  vorspann:
    'Die Spanne ist groß, und das hat Gründe, die sich benennen lassen. Wer sie kennt, kann ein Angebot einordnen, statt nur auf die Zahl am Ende zu schauen.',

  motiv: 'Später hier: Claudia auf der Bühne, Totale mit Publikum.',

  abschnitte: [
    {
      titel: 'Was den Preis wirklich bestimmt',
      absaetze: [
        'Nicht die Länge des Vortrags entscheidet, sondern wie viel Vorbereitung er verlangt und wie ersetzbar die Person auf der Bühne ist.',
      ],
      liste: [
        'Bekanntheit: Wer aus Fernsehen oder Sport bekannt ist, verlangt ein Vielfaches, unabhängig vom Inhalt.',
        'Vorbereitung: Ein Vortrag, der auf euer Haus zugeschnitten wird, kostet mehr als ein Standardvortrag, wirkt aber auch anders.',
        'Reise und Zeit: Ein Termin am anderen Ende des Landes bindet einen ganzen Tag, nicht eine Stunde.',
        'Exklusivität: Wer im selben Jahr nicht bei eurem Wettbewerber auftreten soll, zahlt dafür.',
        'Verwertung: Aufzeichnung, Ausschnitte für Social Media oder interne Weiterverwendung werden getrennt vereinbart.',
      ],
    },
    {
      titel: 'Was üblicherweise im Preis enthalten ist',
      absaetze: [
        'In den meisten Angeboten enthalten sind ein Vorgespräch, die Anpassung des Vortrags auf euer Thema, der Auftritt selbst und eine kurze Abstimmung mit der Technik vor Ort.',
        'Nicht enthalten sind in der Regel Reisekosten, Übernachtung, Umsatzsteuer und alles, was nach dem Auftritt weiterverwendet wird. Das ist kein versteckter Aufschlag, sondern Branchenüblichkeit. Fragt vorher danach, dann gibt es hinterher keine Überraschung.',
      ],
    },
    {
      titel: 'Wann ein niedrigerer Preis sinnvoll ist, und wann nicht',
      absaetze: [
        'Ein Rabatt auf dieselbe Leistung ist selten ein gutes Zeichen. Wer den Preis schnell senkt, ohne dass sich der Umfang ändert, hat ihn vorher zu hoch angesetzt oder braucht den Termin dringend.',
        'Sinnvoll ist dagegen ein kleineres Format zum kleineren Preis: ein Impulsvortrag statt einer Keynote, ein halber Tag statt eines ganzen, ein Online-Termin statt einer Anreise. Das ist ehrlich und für beide Seiten planbar.',
      ],
    },
    {
      titel: 'Claudia Conens Honorare',
      absaetze: [
        'Zur Einordnung die eigenen Preise, damit dieser Text nicht nur über andere spricht: Ein Impulsvortrag liegt bei 2.500 Euro. Eine Keynote von 45 bis 60 Minuten liegt zwischen 3.500 und 5.000 Euro. Ein Workshoptag im Unternehmen kostet 3.900 Euro. Mehrteilige Programme über mehrere Termine beginnen bei 9.500 Euro. Alle Angaben zuzüglich Umsatzsteuer und Reisekosten.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Warum nennen viele Speaker ihren Preis nicht öffentlich?',
      antwort:
        'Weil der Aufwand sich stark unterscheidet und ein einzelner Betrag in die Irre führen kann. Eine Spanne zu nennen ist trotzdem möglich, und wer gar keine nennt, kostet euch Zeit.',
    },
    {
      frage: 'Ist ein teurerer Speaker automatisch besser?',
      antwort:
        'Nein. Der Preis bildet häufig Bekanntheit ab, nicht Wirkung im Saal. Fragt stattdessen nach einem Video eines echten Auftritts und nach zwei Ansprechpartnern aus früheren Veranstaltungen.',
    },
    {
      frage: 'Was kostet es, wenn der Vortrag aufgezeichnet werden soll?',
      antwort:
        'Das wird getrennt vereinbart, üblich ist ein Aufschlag oder eine Befristung der Nutzung. Klärt vorher, wo das Material erscheinen soll und wie lange.',
    },
    {
      frage: 'Gibt es Rabatte für gemeinnützige Veranstalter?',
      antwort:
        'Häufig ja, meist über ein kleineres Format statt über einen Nachlass auf dasselbe. Fragt offen danach, das ist in der Branche üblich.',
    },
  ],

  weiter: {
    text:
      'Wenn ihr gerade einen Vortrag für euer Unternehmen plant: Ein kostenloses Format von neunzig Minuten für euer Team ist der einfachste Weg herauszufinden, ob es passt, bevor über Honorare gesprochen wird.',
    knopf: 'Zu den Angeboten für Unternehmen',
    ziel: '/unternehmen-keynotes',
  },

  seoText:
    'Was kostet ein Keynote Speaker? Übliche Honorare zwischen 2.500 und 10.000 Euro, was den Preis bestimmt, was enthalten ist und wann ein kleineres Format die bessere Wahl ist.',
};

export default function ArtikelKeynotePreis() {
  return <ArtikelSeite inhalt={INHALT} />;
}
