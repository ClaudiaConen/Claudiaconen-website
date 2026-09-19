import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Elevator-Pitch-Kurs.
 *
 * Von Claudia am 18.09.2026 um 21:46 benannt. Die Verbindung zu ihrer
 * eigenen Positionierung ist eng: Ihr Kritiker-Check nennt als Einwand
 * Nummer eins "zu viele Rollen, kein klarer Kaufgrund" - genau das Problem,
 * das ein Elevator Pitch loest. Sie verkauft hier also etwas, das sie an
 * sich selbst geuebt hat.
 *
 * KEINE ZAHLEN. Der Markt bewirbt Pitch-Kurse gern mit "Sie haben sieben
 * Sekunden" oder "dreissig Sekunden im Aufzug". Das sind Merksaetze, keine
 * Messungen. Hier steht stattdessen, was wirklich passiert: Ein Gegenueber
 * entscheidet frueh, ob es nachfragt - wie frueh, weiss niemand genau.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/elevator-pitch-kurs',
  stimmung: 'dunkel',
  wer: 'Kurs',
  zurueck: { text: 'Speaker und freie Redner', ziel: '/redner-ausbildungen' },
  frage: 'Was antworten Sie, wenn jemand fragt: Und was machen Sie so?',
  vorspann:
    'Die meisten antworten mit ihrem Beruf. Das ist die Frage nach dem Etikett, aber gemeint war: Warum sollte ich weiterfragen?',

  problemTitel: 'Warum der Satz meistens nicht sitzt',
  problemAbsaetze: [
    'Weil er den Beruf nennt statt das Ergebnis. „Ich bin Steuerberaterin" beantwortet, in welcher Schublade Sie liegen. „Ich sorge dafür, dass Familienbetriebe ihre Firma an die nächste Generation übergeben können, ohne sich zu zerstreiten" beantwortet, warum jemand weiterredet.',
    'Weil er jedes Mal anders klingt. Wer seinen Satz nicht festgelegt hat, erfindet ihn in jeder Situation neu — und hört sich dabei selbst beim Suchen zu. Das merken alle im Raum.',
    'Und weil er den Weg beschreibt statt das Ziel. Viele erzählen ihre Methode: Schritte, Werkzeuge, Ablauf. Der andere will aber wissen, wie es hinterher ist.',
  ],

  angebotName: 'Der Elevator-Pitch-Kurs',
  angebotZeile:
    'Am Ende haben Sie einen Satz, den Sie sagen können, ohne nachzudenken — und zwei Varianten davon: eine für dreißig Sekunden, eine für zwei Minuten.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Der Kurs ist als Einzelarbeit und in kleiner Gruppe möglich. Was sinnvoll ist, hängt davon ab, ob Sie an einem Satz arbeiten oder ein ganzes Team denselben Satz braucht.',
  angebotPunkte: [
    'Ihr Ergebnis in Worte fassen: was hinterher anders ist, nicht was Sie tun',
    'Der Satz in drei Längen: ein Halbsatz, dreißig Sekunden, zwei Minuten',
    'Die Anschlussfrage einbauen, damit ein Gespräch entsteht statt einer Pause',
    'Laut sprechen, aufnehmen, hören, ändern — so lange, bis er sitzt',
    'Was tun, wenn das Gegenüber abwinkt, unterbricht oder etwas ganz anderes will',
  ],

  ablaufTitel: 'So entsteht Ihr Satz',
  ablauf: [
    {
      schritt: 'Das Ergebnis suchen',
      text:
        'Wir fangen nicht beim Satz an, sondern bei Ihren letzten drei Kunden. Was war vorher, was war nachher. Aus diesen Unterschieden kommt der Satz, nicht aus dem Kopf.',
    },
    {
      schritt: 'Kürzen',
      text:
        'Der erste Entwurf ist immer zu lang und zu vorsichtig. Wir streichen alles, was erklärt, und behalten, was behauptet.',
    },
    {
      schritt: 'Sprechen',
      text:
        'Ein Satz, der sich gut liest, kann beim Sprechen stolpern. Deshalb wird er laut geprüft, nicht auf dem Papier.',
    },
    {
      schritt: 'Gegenwind',
      text:
        'Ich frage zurück, unterbreche, wirke gelangweilt. Wer seinen Satz einmal unter Druck gesagt hat, sagt ihn auf der Messe ruhig.',
    },
  ],

  fragen: [
    {
      frage: 'Ist ein Elevator Pitch nicht längst abgenutzt?',
      antwort:
        'Das Wort schon. Die Sache nicht. Es geht nicht um einen auswendig gelernten Werbespruch, sondern darum, dass Sie auf eine ganz normale Frage eine ruhige Antwort haben. Wer die nicht hat, redet zu lang — und das merkt jeder.',
    },
    {
      frage: 'Ich mache mehrere Dinge. Welches nenne ich?',
      antwort:
        'Das ist die häufigste Frage und sie hat eine unbequeme Antwort: eines. Nicht für immer, aber in diesem Satz. Wer drei Dinge nennt, wird für nichts davon erinnert. Welches es wird, hängt davon ab, wen Sie gerade vor sich haben — deshalb bauen wir zwei Varianten.',
    },
    {
      frage: 'Bekomme ich einen fertigen Satz von Ihnen?',
      antwort:
        'Nein, und das ist Absicht. Ein Satz, den ich Ihnen schreibe, klingt nach mir. Sie merken das beim Sprechen, und Ihr Gegenüber merkt es auch. Ich stelle die Fragen, Sie formulieren, wir schleifen gemeinsam.',
    },
    {
      frage: 'Wie lange dauert das?',
      antwort:
        'Der Satz entsteht meist an einem halben Tag. Dass er sitzt, dauert länger: Er braucht zehn bis zwanzig echte Situationen. Deshalb gehört zum Kurs eine Rückmeldeschleife nach ein paar Wochen.',
    },
    {
      frage: 'Wir sind ein Team. Sollen alle denselben Satz sagen?',
      antwort:
        'Denselben Kern, nicht denselben Wortlaut. Wenn fünf Menschen denselben Satz auswendig aufsagen, wirkt es einstudiert. Wenn fünf Menschen dasselbe Ergebnis in eigenen Worten nennen, wirkt es wahr.',
    },
  ],

  weitere: [
    {
      titel: 'Storytelling-Kurs',
      text: 'Wenn der Satz sitzt, kommt die Geschichte dahinter.',
      ziel: '/storytelling-kurs',
    },
    {
      titel: 'Speakerin werden',
      text: 'Aus dem Thema eine Keynote machen und sie sprechen.',
      ziel: '/speaker-ausbildung',
    },
    {
      titel: 'Workshop an einem Tag',
      text: 'Der kleinere Anfang, in kleiner Gruppe.',
      ziel: '/redner-ausbildungen',
    },
  ],

  schrittTitel: 'Sagen Sie mir Ihren jetzigen Satz',
  schrittText:
    'Im Vorgespräch frage ich Sie, was Sie heute antworten. Meistens sieht man daran in zwei Minuten, woran es hängt. Das kostet nichts.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Elevator-Pitch-Kurs | Claudia Conen',
  seoText:
    'Ein Satz, der sitzt: Im Elevator-Pitch-Kurs entsteht Ihre Antwort auf die Frage, was Sie tun — in drei Längen, laut geprüft und unter Gegenwind getestet.',
};

export default function ElevatorPitchKurs() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
