import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * Der Begriff mit dem hoechsten Suchvolumen im Feld (rund 2.900 Suchen im
 * Monat, Messung September 2026). Wer so sucht, sucht keine Definition,
 * sondern eine Entscheidungshilfe.
 *
 * Bewusst ohne Eigenwerbung im Text. Ein Artikel, der bei jeder Frage auf
 * die eigene Person zeigt, wird weder gelesen noch zitiert. Der Hinweis auf
 * das eigene Angebot steht einmal am Ende, klar getrennt.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/keynote-speaker-finden',
  bereich: 'Keynote & Bühne',
  aktualisiert: '2026-09-18',
  frage: 'Wie finde ich den richtigen Keynote Speaker für mein Unternehmen?',

  kurzantwort:
    'Nicht über die Themenliste, sondern über drei Fragen: Was soll am Montag nach der Veranstaltung anders sein? Wer sitzt wirklich im Saal? Und gibt es ein Video von einem echten Auftritt vor vergleichbarem Publikum? Wer diese drei Antworten hat, trifft in zwanzig Minuten eine bessere Wahl als mit einer Woche Recherche.',

  vorspann:
    'Die meisten Entscheidungen fallen falsch, weil zuerst nach Themen gesucht wird. Das Thema ist aber austauschbar. Die Wirkung im Raum ist es nicht.',

  motiv: 'Später hier: der Blick von der Bühne in einen vollen Saal.',

  abschnitte: [
    {
      titel: 'Frage eins: Was soll sich danach verändert haben?',
      absaetze: [
        'Ein Vortrag, der nur begeistert, verpufft bis Mittwoch. Bevor ihr sucht, schreibt einen einzigen Satz auf, der beschreibt, was am Montag danach anders sein soll. Nicht "mehr Motivation", sondern etwas, das jemand bemerken würde.',
        'Dieser Satz ist danach euer Maßstab. Wenn ein Speaker nicht beschreiben kann, wie er darauf einzahlt, passt er nicht, egal wie gut sein Ruf ist.',
      ],
    },
    {
      titel: 'Frage zwei: Wer sitzt im Saal?',
      absaetze: [
        'Ein Vortrag vor der Geschäftsführung funktioniert anders als einer vor der Belegschaft. Ein Saal, der freiwillig da ist, ist ein anderer als eine Pflichtveranstaltung am Freitagnachmittag.',
        'Sagt das offen, bevor ihr anfragt. Wer danach fragt, kann sich darauf einstellen. Wer nicht danach fragt, kann es nicht.',
      ],
    },
    {
      titel: 'Frage drei: Gibt es ein Video von einem echten Auftritt?',
      absaetze: [
        'Nicht der gefilmte Werbespot, sondern ein Mitschnitt vor Publikum. Achtet weniger auf die Person und mehr auf den Saal: Sitzen die Leute vorgebeugt oder am Telefon?',
        'Wenn es kein Video eines echten Auftritts gibt, fragt danach. Oft gibt es eines, es steht nur nicht öffentlich.',
      ],
    },
    {
      titel: 'Woran ihr im Gespräch erkennt, ob es passt',
      absaetze: [
        'Das Vorgespräch verrät mehr als jede Website.',
      ],
      liste: [
        'Wird mehr gefragt als erzählt? Wer nur sein Programm abspult, wird es auch auf der Bühne tun.',
        'Wird nachgehakt, wenn ihr ausweicht? Gute Vorträge entstehen an den unangenehmen Stellen.',
        'Wird auch gesagt, was nicht geht? Wer alles verspricht, hat nichts geprüft.',
        'Kommt ein Vorschlag, der von eurer Anfrage abweicht? Das ist meistens ein gutes Zeichen.',
      ],
    },
    {
      titel: 'Zwei Fehler, die teuer werden',
      absaetze: [
        'Der erste: den bekanntesten Namen buchen, den das Budget hergibt. Bekanntheit füllt den Saal, verändert aber nichts darin. Wenn niemand kommt, ist Bekanntheit das richtige Mittel. Wenn etwas hängen bleiben soll, nicht.',
        'Der zweite: den Vortrag ans Ende einer langen Tagung legen, ohne Pause davor. Dann entscheidet nicht die Qualität, sondern die Aufmerksamkeitsspanne eines erschöpften Saals.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wie früh muss ich anfragen?',
      antwort:
        'Für gefragte Termine wie Jahresauftakt oder Herbsttagung sind drei bis sechs Monate üblich. Kurzfristig geht oft mehr als gedacht, weil Termine auch abgesagt werden. Fragt trotzdem früh, dann habt ihr die Wahl.',
    },
    {
      frage: 'Brauche ich eine Agentur?',
      antwort:
        'Nicht zwingend. Eine Agentur hilft bei Auswahl und Abwicklung und kostet Provision. Bei einem einzelnen Termin lohnt sich meist die direkte Anfrage.',
    },
    {
      frage: 'Wie lange sollte eine Keynote dauern?',
      antwort:
        'Fünfundvierzig bis sechzig Minuten sind üblich. Kürzer wirkt oft besser als länger. Wichtiger als die Dauer ist, was danach im Programm kommt: Direkt danach eine Pause zu setzen, kostet nichts und verdoppelt die Wirkung.',
    },
    {
      frage: 'Worauf achte ich bei der Technik?',
      antwort:
        'Ton vor Bild. Ein Headset statt eines Handmikrofons, wenn sich der Vortragende bewegt. Und eine Person vor Ort, die zuständig ist, statt einer Nummer, die man im Notfall anruft.',
    },
  ],

  weiter: {
    text:
      'Wenn ihr gerade sucht und die drei Fragen für euch geklärt sind: Claudia Conen bietet ein kostenloses Format von neunzig Minuten für Teams an. Danach wisst ihr, wie sie arbeitet, bevor über einen Auftrag gesprochen wird.',
    knopf: 'Zu den Angeboten für Unternehmen',
    ziel: '/unternehmen-keynotes',
  },

  seoText:
    'Wie finde ich den richtigen Keynote Speaker? Drei Fragen, die vor der Suche zu klären sind, woran ihr im Vorgespräch erkennt, ob es passt, und zwei Fehler, die teuer werden.',
};

export default function ArtikelSpeakerFinden() {
  return <ArtikelSeite inhalt={INHALT} />;
}
