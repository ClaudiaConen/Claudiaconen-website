import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Positionierung.
 *
 * Claudia am 19.09.2026 zu einem anderen Text: "Innere Überzeugung,
 * nicht spürbar - das bitte austauschen gegen Brand." Deshalb steht
 * hier "Marke" und nicht "innere Überzeugung": Eine Positionierung ist
 * etwas, das andere von außen erkennen, nicht ein Gefühl.
 *
 * Und: "Transformation" kommt auf dieser Seite nicht vor. Das Wort hat
 * sie ausdrücklich gestrichen.
 *
 * Abgrenzung zu /mentoring-transformation: Dort geht es um Marke und
 * eigene Sprache über mehrere Monate. Hier geht es um einen Satz.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/speaker-positionierung',
  wer: 'Für Speaker & Selbstständige',
  frage: 'Wofür stehen Sie — in einem Satz, den ein anderer wiederholen kann?',
  vorspann:
    'Die Probe ist einfach: Jemand hört Sie einmal und erzählt es am selben Abend weiter. Wenn er dabei ins Stocken gerät, liegt es nicht an ihm. Eine Positionierung ist nicht, was Sie über sich denken, sondern das, was hängenbleibt.',

  problemTitel: 'Warum die meisten Positionierungen nicht tragen',
  problemAbsaetze: [
    'Sie sind zu vollständig. Wer alles nennt, was er kann, zwingt das Gegenüber zu sortieren — und das tut niemand freiwillig. Weglassen ist die eigentliche Arbeit.',
    'Sie beschreiben ein Fachgebiet statt einer Sache, die jemanden angeht. „Kommunikationstrainerin" sagt, in welchem Regal Sie stehen, nicht, warum jemand danach greift.',
    'Oder sie sind so allgemein, dass sie auf zweihundert andere passen. „Ich helfe Menschen, ihr Potenzial zu entfalten" ist kein Satz, den jemand weitererzählt — es ist einer, den er schon hundertmal gehört hat.',
  ],

  angebotName: 'Positionierung',
  angebotZeile: 'Ein halber bis ganzer Tag, zu zweit oder in kleiner Gruppe',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt davon ab, ob es einzeln oder in der Gruppe stattfindet. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Rückwärts suchen: nicht „was kann ich", sondern „wofür haben Menschen mich schon geholt".',
    'Der Satz selbst — kurz genug, dass jemand ihn behält, konkret genug, dass er etwas bedeutet.',
    'Für wen er gilt und für wen nicht. Ohne das Zweite ist das Erste wertlos.',
    'Ihre Marke: woran man Sie erkennt, bevor Ihr Name fällt.',
    'Die Probe an echten Menschen, nicht im Kopf.',
    'Was der Satz für Ihre Seite, Ihr Profil und Ihr Angebot bedeutet.',
  ],

  ablaufTitel: 'Wie wir zu dem Satz kommen',
  ablauf: [
    { schritt: 'Rückwärts', text: 'Wir gehen Ihre letzten zehn Aufträge durch. Wofür wurden Sie wirklich geholt? Das ist selten das, was auf der Webseite steht.' },
    { schritt: 'Weglassen', text: 'Alles streichen, was auch auf andere passt. Was übrig bleibt, ist schmal und fühlt sich zu klein an. Das ist das Zeichen, dass es stimmt.' },
    { schritt: 'Formulieren', text: 'Mehrere Fassungen, laut gesprochen. Ein Satz, der auf Papier gut aussieht und sich beim Sprechen sperrt, ist der falsche.' },
    { schritt: 'Probe', text: 'Sie sagen den Satz drei Menschen, die Sie nicht kennen, und fragen, was sie verstanden haben. Das ist der eigentliche Test.' },
    { schritt: 'Nachziehen', text: 'Der Satz gilt erst, wenn er überall steht: Profil, Seite, Angebot, Vorstellung im Gespräch. Sonst hat man ihn nur gefunden, nicht bezogen.' },
  ],

  fragen: [
    {
      frage: 'Ich mache mehrere Dinge. Muss ich mich auf eines festlegen?',
      antwort:
        'Nicht auf ein Angebot, aber auf einen Satz. Sie dürfen weiter alles tun — nur die Tür, durch die jemand hereinkommt, sollte eine sein. Wer drinnen ist, entdeckt den Rest von allein.',
    },
    {
      frage: 'Verliere ich damit Aufträge?',
      antwort:
        'Möglich, und zwar die, bei denen Sie austauschbar waren. Der Zweck ist nicht, mehr Anfragen zu bekommen, sondern die richtigen — und dass sie kommen, weil jemand Sie empfohlen hat.',
    },
    {
      frage: 'Wie lange dauert das?',
      antwort:
        'Der Satz entsteht an einem halben bis ganzen Tag. Bis er sitzt, braucht er zehn bis zwanzig echte Situationen, in denen Sie ihn sagen. Das ist Ihre Arbeit danach, und ohne sie bleibt er ein Zettel.',
    },
    {
      frage: 'Ist das dasselbe wie ein Elevator Pitch?',
      antwort:
        'Nein, aber sie hängen zusammen. Die Positionierung sagt, wofür Sie stehen. Der Pitch ist die Form, in der Sie das in einer konkreten Situation sagen. Zuerst das eine, dann das andere — umgekehrt entsteht ein guter Satz über nichts.',
    },
    {
      frage: 'Was, wenn ich am Ende nicht zufrieden bin?',
      antwort:
        'Dann sagen Sie es, und wir arbeiten weiter. Ein Satz, mit dem Sie nicht vor Menschen treten wollen, ist kein Ergebnis. Bisher war der häufigere Fall der umgekehrte: Er stimmt, und er fühlt sich zu mutig an.',
    },
    {
      frage: 'Machen Sie auch die Webseite und das Profil?',
      antwort:
        'Die Texte ja, wenn Sie das wollen — die Gestaltung nicht. Wichtiger ist ohnehin, dass Sie selbst wissen, was in den ersten zwei Zeilen stehen muss. Danach kann das jemand umsetzen.',
    },
  ],

  nichtFuer: [
    'Sie wollen einen Satz, den ich Ihnen schreibe. Ein Satz von mir klingt nach mir, und Ihr Gegenüber hört das.',
    'Alle Ihre Angebote sollen darin vorkommen. Das geht nicht, und der Versuch ist der häufigste Grund, warum Positionierungen nicht tragen.',
    'Sie wollen niemanden ausschließen. Dann bleibt der Satz allgemein, und allgemein heißt austauschbar.',
    'Es soll nach dem Tag fertig sein. Der Satz entsteht an einem Tag; bis er sitzt, braucht er Ihre nächsten zwanzig Gespräche.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Sagen Sie mir Ihren jetzigen Satz — den, mit dem Sie sich vorstellen. Ich sage Ihnen ehrlich, woran er hängt, und ob ein Tag reicht.',
  schrittKnopf: 'Vorgespräch anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Redner werden', ziel: '/redner-ausbildungen' }, { name: 'Positionierung' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Tisch mit vielen beschriebenen Zetteln, einer liegt obenauf' },
    { bereich: 'Beim Ablauf', motiv: 'Zwei Menschen an einem Tisch, einer spricht, einer schreibt mit' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Ein einzelner Satz, handschriftlich, sonst leeres Blatt' },
  ],

  weitere: [
    { titel: 'Elevator-Pitch-Kurs', text: 'Die Form, in der Sie den Satz sagen.', ziel: '/elevator-pitch-kurs' },
    { titel: 'Wie finde ich mein Thema als Speaker?', text: 'Der ausführliche Artikel, kostenlos.', ziel: '/wissen/thema-finden-speaker' },
    { titel: 'Marke & eigene Sprache', text: 'Dieselbe Arbeit über mehrere Monate.', ziel: '/mentoring-transformation' },
  ],

  seoTitel: 'Positionierung für Speaker und Selbstständige | Claudia Conen',
  seoText:
    'Wofür stehen Sie — in einem Satz, den ein anderer wiederholen kann? Rückwärts suchen statt nachdenken, weglassen statt aufzählen, und die Probe an echten Menschen.',
};

export default function SpeakerPositionierung() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
