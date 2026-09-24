import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Ausbildung: Speakerin werden. Claudias eigenes Feld - hier steht sie
 * nicht neben dem Markt, sondern mittendrin.
 *
 * RECHERCHE 18.09.2026:
 *   - Der Beruf ist nicht geschuetzt. Es gibt keine gesetzliche
 *     Voraussetzung, sich Keynote Speaker zu nennen. Das ist die
 *     wichtigste Information der ganzen Seite und sie steht deshalb in
 *     den Fragen, nicht im Kleingedruckten.
 *   - Peter Lueder, Speaker-Ausbildung: 4.990 EUR, Wochenendformat.
 *   - Honorarspannen im deutschen Markt: Einsteiger und lokale Anlaesse
 *     500 bis 2.000 EUR, etablierte Fachspeaker 3.000 bis 8.000 EUR,
 *     bekannte Namen 8.000 bis 20.000 EUR je Vortrag.
 *
 * Diese Zahlen stehen als MARKT auf der Seite. Claudias eigener
 * Ausbildungspreis ist nicht entschieden und wird deshalb nicht genannt.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/speaker-ausbildung',
  stimmung: 'dunkel',
  welle: true,
  wer: 'Ausbildung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  // Kopf: Claudias eigener Text, Discord 24.09.2026 09:01 UTC, woertlich. Die fruehere Frage
  // ("Sie haben etwas zu sagen. Warum steht dann jemand anderes auf der Buehne?") ist dadurch ersetzt.
  frage: 'Es kommt nicht darauf an, wie viel du sagst. Sondern was davon bleibt.',
  vorspann:
    'Ein guter Auftritt beginnt nicht auf der Bühne. Er beginnt mit der Klarheit über das, was du anderen mitgeben möchtest.',
  kopfAbsaetze: [
    'Ob als Unternehmer, Führungskraft, Coach, Trainer oder angehender Redner: Wer Menschen erreichen will, braucht mehr als gute Worte. Er braucht Haltung, Persönlichkeit und die Fähigkeit, andere wirklich zu berühren.',
    'Claudia Conen verbindet Rhetorik, Storytelling und persönliche Performance – als Keynote-Speakerin, Coach und Ausbilderin.',
    'Für Bühne, Kamera, Unternehmen und besondere Lebensmomente.',
    'Im gesamten deutschsprachigen Raum · Online & vor Ort',
  ],
  kopfSchluss: 'Perfektion ist klickbar. Persönlichkeit weckt Vertrauen.',

  problemTitel: 'Warum Fachleute selten gebucht werden',
  problemAbsaetze: [
    'Weil sie erklären statt zu erzählen. Ein Vortrag, der wie ein Fachartikel gebaut ist, ist nach zwanzig Minuten anstrengend. Ein Vortrag, der wie eine Geschichte gebaut ist, ist nach zwanzig Minuten am spannendsten Punkt.',
    'Weil sie kein Thema haben, sondern ein Fachgebiet. Ein Fachgebiet beantwortet die Frage, was Sie können. Ein Thema beantwortet die Frage, warum ein Veranstalter gerade Sie anruft. Das ist ein Unterschied von mehreren tausend Euro.',
    'Und weil die Stimme nicht mitgeht. Man kann einen perfekten Text haben und ihn so sprechen, dass niemand ihn behält. Der Inhalt entscheidet, ob man zustimmt. Die Stimme entscheidet, ob man zuhört.',
  ],

  angebotName: 'Die Ausbildung zur Speakerin',
  angebotZeile:
    'Aus Ihrem Fachgebiet wird ein Thema, aus dem Thema ein Vortrag, aus dem Vortrag ein Auftritt. Am Ende steht eine Keynote, die Sie gesprochen haben und die auf Video ist.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Zur Einordnung des Marktes: Vergleichbare Speaker-Ausbildungen in Deutschland liegen bei rund 5.000 Euro. Was bei Ihnen sinnvoll ist, hängt davon ab, wie weit Sie schon sind — das klären wir, bevor Geld im Spiel ist.',
  angebotPunkte: [
    'Vom Fachgebiet zum Thema: der Satz, mit dem ein Veranstalter Sie ankündigt',
    'Der Aufbau einer Keynote: Bogen, Wendepunkt, der Satz, der bleibt',
    'Ihre Stimme: Tragfähigkeit, Tempo, Pausen, der Umgang mit Mikrofon und Saal',
    'Der Körper: Stand, Blick, Gehen auf der Bühne, Umgang mit den eigenen Händen',
    'Fragen aus dem Publikum, auch die unangenehmen',
    'Eine gesprochene Keynote auf Video — Ihr erstes echtes Anfrage-Material',
  ],

  ablaufTitel: 'Der Weg auf die Bühne',
  ablauf: [
    {
      schritt: 'Vorgespräch',
      text:
        'Sie erzählen mir, worüber Sie sprechen wollen. Ich sage Ihnen, ob daraus ein Thema wird oder ob wir erst noch suchen müssen. Kostenlos und ohne Verpflichtung.',
    },
    {
      schritt: 'Das Thema finden',
      text:
        'Der unbequemste Teil und der wichtigste. Die meisten kommen mit drei Themen und gehen mit einem. Erst danach lohnt sich jede weitere Stunde Arbeit.',
    },
    {
      schritt: 'Die Keynote bauen',
      text:
        'Aufbau, Geschichten, Übergänge, der Schluss. Wir schreiben nicht schön, wir schreiben sprechbar — das sind zwei verschiedene Handwerke.',
    },
    {
      schritt: 'Stimme und Auftritt',
      text:
        'Jetzt wird gesprochen. An Ihrer Stimme arbeiten wir so lange, bis der Text sie trägt und nicht umgekehrt. Dazu Stand, Blick und Bewegung im Raum.',
    },
    {
      schritt: 'Aufnahme',
      text:
        'Sie sprechen Ihre Keynote vor Publikum, und wir nehmen sie auf. Ohne Video eines echten Auftritts ist eine Anfrage sehr viel schwerer zu bekommen.',
    },
  ],

  bilder: [
    {
      bereich: 'Auf der Bühne',
      motiv: 'Querformat, du am Mikrofon, Publikum im Bild. Wer Speaker werden will, muss sehen, wohin der Weg führt.',
    },
    {
      bereich: 'Die Arbeit davor',
      motiv: 'Kleine Gruppe, jemand steht und spricht, du hörst zu. Zeigt, dass hier geübt und nicht doziert wird.',
    },
    {
      bereich: 'Video',
      motiv: 'Zwei Minuten aus einer echten Keynote. Ohne Video glaubt niemand, dass der Weg funktioniert.',
    },
  ],

  nichtFuer: [
    'Sie suchen einen Titel oder ein Zertifikat. Ich vergebe keins, und bei diesem Beruf gibt es auch keins, das jemand verlangen würde.',
    'Sie wollen schnell viel verdienen. Die ersten Honorare liegen laut den Spannen der Speaker-Agenturen bei 1.500 bis 2.900 Euro je Vortrag, und bis zum ersten dauert es.',
    'Sie möchten einen fertigen Vortrag kaufen. Ich schreibe Ihnen keinen — Sie schreiben ihn, ich arbeite daran mit.',
    'Ihr Thema soll unangetastet bleiben. Genau daran arbeiten wir zuerst, und das ist der unbequemste Teil.',
  ],

  brotkrumen: [
    { name: 'Ausbildungen', ziel: '/redner-ausbildungen' },
    { name: 'Speaker werden' },
  ],

  fragen: [
    {
      frage: 'Braucht man eine Ausbildung, um Keynote Speaker zu sein?',
      antwort:
        'Nein. Der Beruf ist nicht geschützt, es gibt keine gesetzliche Voraussetzung und keinen Titel, den jemand vergeben müsste. Genau deshalb entscheidet ausschließlich, was im Saal passiert — und das ist der Teil, den man üben kann.',
    },
    {
      frage: 'Was verdient man mit einem Vortrag?',
      antwort:
        'Die Spannen, die Speaker-Agenturen veröffentlichen: Die Agentur 5 Sterne Redner nennt für Einsteiger 1.500 bis 2.900 Euro, für etablierte Speaker 5.000 bis 10.000 Euro; Speakers Excellence arbeitet mit Honorargruppen von unter 3.000 bis über 12.000 Euro je Vortrag; keynotespeakers.eu nennt 3.000 bis 6.000 Euro als üblichen Rahmen (alle Angaben Stand September 2026, ohne Reisekosten und Mehrwertsteuer). Was Sie erreichen, hängt von Ihrem Thema und Ihrer Sichtbarkeit ab. Eine Zahl für Sie persönlich zu nennen, wäre ein Versprechen ohne Deckung.',
    },
    {
      frage: 'Ich habe Angst vor großen Sälen.',
      antwort:
        'Die haben fast alle, auch Menschen, die Sie auf Bühnen sehen. Lampenfieber verschwindet nicht durch Mut, sondern durch Vorbereitung und durch Atemtechnik. Beides lässt sich lernen, und es ist ein Teil der Arbeit.',
    },
    {
      frage: 'Ich bin schon gebucht worden, aber selten wieder.',
      antwort:
        'Das ist ein präzises Signal und meistens kein Inhaltsproblem. Wiederbuchungen hängen daran, ob das Publikum nachher noch über den Vortrag spricht. Dafür braucht es einen Satz, den man weitererzählen kann. Wenn Sie schon Auftritte hatten, schauen wir uns eine Aufnahme an — das ist der schnellste Weg zur Ursache.',
    },
    {
      frage: 'Wie unterscheidet sich das von einem Rhetorikkurs?',
      antwort:
        'Ein Rhetorikkurs macht Sie sicherer im Sprechen. Hier geht es darum, ein Thema zu bauen, das jemand einkauft. Das eine ist Können, das andere ist ein Produkt. Beides gehört zusammen, aber nur eines davon bringt Anfragen.',
    },
  ],

  weitere: [
    {
      titel: 'Elevator-Pitch-Kurs',
      text: 'Der eine Satz auf die Frage, was Sie tun.',
      ziel: '/elevator-pitch-kurs',
    },
    {
      titel: 'Storytelling-Kurs',
      text: 'Geschichten, die jemand weitererzählt.',
      ziel: '/storytelling-kurs',
    },
    {
      titel: 'Workshop an einem Tag',
      text: 'Der kleinere Anfang, in kleiner Gruppe.',
      ziel: '/redner-ausbildungen',
    },
  ],

  schrittTitel: 'Erzählen Sie mir Ihr Thema',
  schrittText:
    'Ein Vorgespräch, ohne Verpflichtung. Wenn ich nach zwanzig Minuten den Eindruck habe, dass Sie mich nicht brauchen, sage ich Ihnen das.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  // Kopfbild (22.09.2026): Claudia Conen bei einer Keynote auf der Bühne
  bild: '/seiten/keynote.webp',
  bildAlt: 'Claudia Conen bei einer Keynote auf der Bühne',

  // Claudias Ansage vom 22.09.2026: Live-Workshop in Köln und in Witten, dazu 1:1 und 6:1.
  formate: [
    { titel: 'Live-Workshop in Köln · Gruppe 6:1', text: 'Ein Tag in kleiner Runde, sechs Teilnehmende. Jeder steht mehrfach auf und redet; die anderen sind dein erstes Publikum.' },
    { titel: 'Live-Workshop in Witten · Gruppe 6:1', text: 'Dasselbe Format bei mir in Witten – sechs Menschen, eine Trainerin, ein Tag.' },
    { titel: 'Live in Witten · 1:1', text: 'Du und ich, ein Tag oder mehrere Termine. Alles dreht sich um deine Stimme, deine Texte, deine Situationen.' },
  ],

  fragenZusatz: ['ausbildung'],
  // Kundenstimme bewusst NICHT hier: Claudia (22.09.2026, 07:29 UTC) will Ann-Kathrin nur auf der Startseite.
  // Stattdessen kommt Ankes Geschichte (50 Jahre Redeangst, erster Preis) - wartet auf Fakten, Bilder, Ankes Ja.
  seoTitel: 'Speaker-Ausbildung in Köln und Witten – Keynote-Speaker werden | Claudia Conen',
  seoText:
    'Ausbildung zur Speakerin und zum Speaker: vom Fachgebiet zum Thema, von der Keynote zum Auftritt. Mit Stimmarbeit und einer Videoaufnahme am Ende.',
};

export default function SpeakerAusbildung() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
