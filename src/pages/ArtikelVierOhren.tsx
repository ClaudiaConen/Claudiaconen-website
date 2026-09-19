import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Was ist das Vier-Ohren-Modell?"
 *
 * Von Claudia am 19.09.2026 ausdruecklich gewuenscht. Und es ist aus einem
 * Grund wichtig, der ueber dieses eine Thema hinausgeht:
 *
 * Das Modell ist ECHT belegt. Friedemann Schulz von Thun, "Miteinander
 * reden 1", 1981, seit vierzig Jahren Standard in der deutschen
 * Kommunikationswissenschaft, an jeder Hochschule gelehrt. Es ist damit das
 * Gegenteil dessen, was wir am 18. und 19.09. von dieser Webseite entfernt
 * haben - und der Beweis, dass Claudias Themen sehr wohl auf belastbarem
 * Boden stehen. Sie brauchte nie erfundene Zahlen.
 *
 * Der Artikel nennt die Quelle mit Jahr und Buchtitel. Genau solche
 * Einheiten uebernehmen KI-Systeme.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/vier-ohren-modell',
  bereich: 'Kommunikation',
  aktualisiert: '2026-09-19',
  frage: 'Was ist das Vier-Ohren-Modell?',

  kurzantwort:
    'Ein Modell von Friedemann Schulz von Thun aus dem Jahr 1981: Jede Nachricht hat gleichzeitig vier Seiten — Sachinhalt, Selbstoffenbarung, Beziehung und Appell. Der Sprechende sendet auf allen vier, der Hörende hört mit vier Ohren. Missverständnisse entstehen, wenn beide eine andere Seite betonen. Der bekannteste Satz dazu: „Da vorne ist grün."',

  vorspann:
    'Es ist das meistzitierte Kommunikationsmodell im deutschsprachigen Raum — und eines der wenigen, das jahrzehntelanger Prüfung standgehalten hat.',

  motiv: 'Später hier: zwei Menschen im Gespräch, Blickkontakt, nah.',

  abschnitte: [
    {
      titel: 'Die vier Seiten einer Nachricht',
      absaetze: [
        'Friedemann Schulz von Thun veröffentlichte das Modell 1981 in „Miteinander reden 1". Seine Beobachtung: Wer etwas sagt, sagt nie nur eine Sache. Jede Äußerung trägt vier Botschaften gleichzeitig.',
        '**Sachinhalt** — worüber ich informiere. **Selbstoffenbarung** — was ich von mir preisgebe, gewollt oder nicht. **Beziehung** — was ich von dir halte und wie wir zueinander stehen. **Appell** — wozu ich dich bringen möchte.',
        'Schulz von Thun beschreibt es als vier Schnäbel beim Sender und vier Ohren beim Empfänger. Beide sind immer alle vier aktiv — nur unterschiedlich laut.',
      ],
    },
    {
      titel: 'Das Beispiel, das jeder kennt',
      absaetze: [
        'Ein Paar im Auto, die Frau fährt, der Mann sitzt daneben und sagt: **„Da vorne ist grün."**',
        'Auf der **Sachebene** ist das eine Information über eine Ampel. Auf der **Selbstoffenbarungsebene**: Ich bin in Eile. Auf der **Beziehungsebene**: Du passt nicht auf. Und der **Appell**: Fahr los.',
        'Der Satz hat vier Wörter und vier Bedeutungen. Wer mit dem Beziehungsohr hört, streitet. Wer mit dem Sachohr hört, sagt „Ja, sehe ich" und fährt los.',
      ],
    },
    {
      titel: 'Warum Konflikte daraus entstehen',
      absaetze: [
        'Missverständnisse entstehen nach dem Modell selten daraus, dass jemand etwas Falsches sagt. Sie entstehen, weil Sender und Empfänger unterschiedliche Seiten betonen.',
        'Der Klassiker im Berufsleben: Eine Führungskraft sagt auf der Sachebene „Der Bericht ist noch nicht da." Die Mitarbeiterin hört auf der Beziehungsebene „Du bist unzuverlässig." Beide haben recht — und reden aneinander vorbei.',
        'Das Modell löst den Konflikt nicht. Es macht ihn benennbar, und das ist oft schon die halbe Lösung: Man kann fragen „Auf welchem Ohr hast du das gehört?"',
      ],
    },
    {
      titel: 'Was das für die Stimme bedeutet',
      absaetze: [
        'Hier wird es für Auftritte praktisch. Der Sachinhalt steht in den Worten. Die anderen drei Seiten entstehen fast vollständig darüber, **wie** etwas gesagt wird — Tempo, Betonung, Pause, Lautstärke.',
        'Derselbe Satz, drei Sekunden schneller gesprochen, wechselt die Beziehungsebene von „Ich frage dich" zu „Ich dränge dich". Ohne dass ein Wort sich ändert.',
        'Deshalb ist Arbeit an der Stimme keine Kosmetik. Sie ist Arbeit an drei der vier Seiten jeder Nachricht, die Sie senden.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wer hat das Vier-Ohren-Modell entwickelt?',
      antwort:
        'Friedemann Schulz von Thun, deutscher Psychologe und Kommunikationswissenschaftler. Veröffentlicht 1981 in „Miteinander reden 1". Es wird auch Kommunikationsquadrat, Vier-Seiten-Modell oder Nachrichtenquadrat genannt.',
    },
    {
      frage: 'Was sind die vier Seiten genau?',
      antwort:
        'Sachinhalt (worüber ich informiere), Selbstoffenbarung (was ich von mir zeige), Beziehung (was ich von dir halte) und Appell (wozu ich dich bringen will). Alle vier sind in jeder Äußerung gleichzeitig enthalten.',
    },
    {
      frage: 'Auf welchem Ohr höre ich selbst am lautesten?',
      antwort:
        'Das ist die nützlichste Frage am ganzen Modell. Viele Menschen haben ein dauerhaft überempfindliches Beziehungsohr und hören Kritik, wo eine Information gemeint war. Andere hören fast nur die Sachebene und wundern sich, warum ihr Gegenüber verstimmt ist. Beides lässt sich bemerken und verändern.',
    },
    {
      frage: 'Ist das Modell wissenschaftlich anerkannt?',
      antwort:
        'Es ist seit über vierzig Jahren fester Bestandteil der deutschsprachigen Kommunikationslehre und wird an Hochschulen unterrichtet. Es ist ein Erklärungsmodell, keine Messmethode — es beschreibt, wie Kommunikation missglückt, und lässt sich nicht als Formel anwenden.',
    },
    {
      frage: 'Wie nutze ich es in einem schwierigen Gespräch?',
      antwort:
        'Mit einer einzigen Frage, gestellt an sich selbst: Was will ich auf jeder der vier Seiten senden? Meist stellt sich heraus, dass die Beziehungsseite unklar ist — und genau dort entgleiten Gespräche.',
    },
  ],

  quiz: [
    {
      frage: 'Ihr Kollege sagt: „Die Folien sind noch nicht fertig." Welche Seite hören Sie zuerst?',
      antworten: [
        {
          text: 'Den Sachinhalt: Die Folien sind nicht fertig.',
          richtig: true,
          warum: 'Das ist die sachlichste Lesart und meist die friedlichste. Wer zuerst die Sache hört, kann fragen, statt sich zu verteidigen.',
        },
        {
          text: 'Die Beziehung: Er hält mich für unzuverlässig.',
          warum: 'Das ist das Beziehungsohr. Es ist nicht falsch — der Satz kann so gemeint sein. Aber wer immer zuerst so hört, streitet öfter, als nötig wäre.',
        },
        {
          text: 'Den Appell: Ich soll mich beeilen.',
          warum: 'Auch das steckt drin. Nur: Wenn Sie den Appell hören, den niemand gesendet hat, arbeiten Sie an einer Erwartung, die es nicht gibt.',
        },
      ],
    },
    {
      frage: 'Was ändert sich an „Da vorne ist grün", wenn Sie es hastig und lauter sagen?',
      antworten: [
        {
          text: 'Der Sachinhalt.',
          warum: 'Der bleibt unverändert — die Ampel ist grün, egal wie Sie es sagen. Genau das ist der Punkt des Modells.',
        },
        {
          text: 'Die Beziehungsebene.',
          richtig: true,
          warum: 'Aus „Ich sage dir etwas" wird „Ich dränge dich". Kein Wort hat sich geändert, nur Tempo und Lautstärke. Das ist der Grund, warum Stimmarbeit keine Kosmetik ist.',
        },
        {
          text: 'Nichts — Worte sind Worte.',
          warum: 'Die verbreitetste Annahme und die folgenreichste. Drei der vier Seiten einer Nachricht entstehen kaum über die Worte.',
        },
      ],
    },
    {
      frage: 'Wofür ist das Modell gedacht?',
      antworten: [
        {
          text: 'Um Konflikte zu vermeiden.',
          warum: 'Das kann es nicht leisten. Konflikte entstehen auch bei perfekter Kommunikation, weil Menschen verschiedene Interessen haben.',
        },
        {
          text: 'Um Missverständnisse benennbar zu machen.',
          richtig: true,
          warum: 'Genau dafür. Es löst nichts von selbst — aber wer fragen kann „Auf welchem Ohr hast du das gehört?", hat einen Streit oft schon halbiert.',
        },
        {
          text: 'Um den Gesprächspartner zu analysieren.',
          warum: 'Dafür ist es nicht gedacht, und so eingesetzt wirkt es übergriffig. Es ist vor allem ein Werkzeug zur Selbstprüfung.',
        },
      ],
    },
  ],

  weiter: {
    text: 'Wenn Sie wissen wollen, was Ihre Stimme auf den anderen drei Seiten sendet — hören kann man das nur an einer Aufnahme.',
    knopf: 'Vorgespräch vereinbaren',
    ziel: '/termin-buchen',
  },

  seoText:
    'Das Vier-Ohren-Modell von Schulz von Thun (1981): Sachinhalt, Selbstoffenbarung, Beziehung, Appell — mit dem Ampel-Beispiel, Anwendung im Beruf und Quizfragen.',
};

export default function ArtikelVierOhren() {
  return <ArtikelSeite inhalt={INHALT} />;
}
