import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Bühnenwirkung & Auftritt.
 *
 * ZWEI SÄTZE AUS DER ALTEN FASSUNG SIND NICHT MITGEKOMMEN:
 *
 * "Ihre Körpersprache spricht lauter als Worte" - das ist der
 * Mehrabian-Mythos in anderer Verpackung. Mehrabian hat 1967 gemessen,
 * wie Menschen WIDERSPRÜCHLICHE Signale auflösen, wenn ein einzelnes
 * Wort in unterschiedlichem Tonfall gesprochen wird. Daraus wurde in
 * der Ratgeberliteratur "93 Prozent der Kommunikation sind nonverbal".
 * Mehrabian selbst hat dieser Verallgemeinerung widersprochen.
 *
 * "Stimmgewalt" ist ebenfalls raus. Es geht nicht um Lautstärke.
 *
 * Was bleibt, sind Claudias eigene Schwerpunkte: Präsenz, Stimme,
 * Körper, Nervosität, Publikum, Technik des Auftritts. Nur ohne die
 * geborgte Autorität.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/speaker-buehne',
  wer: 'Für Speaker & Selbstständige',
  frage: 'Der Inhalt sitzt. Warum wirkt der Auftritt trotzdem unsicher?',
  vorspann:
    'Weil Wirkung auf der Bühne nicht am Text hängt, sondern an drei Dingen, die man vergisst, sobald man aufgeregt ist: wo man steht, wohin man schaut, und ob man eine Pause aushält. Alle drei lassen sich üben, und zwar schneller, als die meisten denken.',

  problemTitel: 'Was das Publikum wirklich sieht',
  problemAbsaetze: [
    'Es sieht, dass jemand wandert. Wer aufgeregt ist, geht — und das Publikum folgt der Bewegung statt dem Gedanken. Stehenbleiben ist die erste und unbequemste Übung.',
    'Es sieht den Blick auf die Folien. Jeder Blick nach hinten ist ein Satz, der ins Leere geht. Wer seine Folien kennt, braucht sie nicht anzusehen.',
    'Und es hört, dass niemand eine Pause macht. Wer durchspricht, gibt dem Zuhörer keine Zeit zuzustimmen. Die Pause ist unangenehm für die sprechende Person und angenehm für alle anderen.',
  ],

  angebotName: 'Bühnenwirkung & Auftritt',
  angebotZeile: 'Ein Tag oder mehrere — Sie stehen die ganze Zeit vorn',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt davon ab, ob es einzeln oder in der Gruppe stattfindet und wie lang. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Stand und Bewegung: wann man geht, wann man stehen bleibt und warum das ein Unterschied ist.',
    'Der Blick: Wohin schaut man in einem Saal mit dreihundert Leuten, und wohin in einem Raum mit zwölf.',
    'Pausen setzen und aushalten. Der am schnellsten sichtbare Gewinn des ganzen Tages.',
    'Stimme im Raum: tragen statt lauter werden. Das sind zwei verschiedene Dinge.',
    'Die ersten neunzig Sekunden — sie entscheiden, ob zugehört wird, und sie lassen sich auswendig können.',
    'Was tun, wenn etwas schiefgeht: Technik weg, Blackout, Zwischenruf.',
    'Aufnahme und gemeinsames Ansehen. Unangenehm, und der wirksamste Teil.',
  ],

  ablaufTitel: 'Wie es abläuft',
  ablauf: [
    { schritt: 'Sie bringen mit', text: 'Einen echten Vortrag, den Sie wirklich halten werden. Nicht ein Übungsthema — die Arbeit wirkt nur an etwas, das ansteht.' },
    { schritt: 'Erste Runde', text: 'Sie sprechen fünf Minuten, ohne Unterbrechung. Ich sage danach nichts Nettes und nichts Vernichtendes, sondern was ich gesehen habe.' },
    { schritt: 'Arbeit an einer Sache', text: 'Nicht an allem. Eine Sache pro Runde — Stand, oder Blick, oder Pause. Mehrere gleichzeitig ändern heißt keine ändern.' },
    { schritt: 'Wiederholung', text: 'Dieselben fünf Minuten noch einmal. Der Unterschied ist im Raum hörbar, und Sie hören ihn selbst.' },
    { schritt: 'Aufnahme', text: 'Am Ende ein Durchlauf mit Kamera. Sie nehmen die Aufnahme mit; sie gehört Ihnen und bleibt bei Ihnen.' },
  ],

  fragen: [
    {
      frage: 'Ich habe Lampenfieber. Ist das hier falsch?',
      antwort:
        'Nein, es ist der richtige Ort — vorausgesetzt, es ist Lampenfieber und keine Redeangst. Lampenfieber legt sich nach den ersten Minuten und verschwindet mit Übung. Wenn der Gedanke an den Auftritt Sie schon Tage vorher beschäftigt, reden wir darüber; das ist eine andere Arbeit.',
    },
    {
      frage: 'Muss ich vor anderen sprechen?',
      antwort:
        'In der Gruppe ja, und das ist der Punkt. Wer nur vor mir spricht, bekommt keine Bühnensituation. Einzeln arbeiten geht auch, dann ersetzen wir die Gruppe durch Kamera und Publikum im zweiten Schritt.',
    },
    {
      frage: 'Wie viel ändert ein Tag?',
      antwort:
        'Stand, Blick und Pausen sind an einem Tag hörbar anders — das erleben Sie selbst bei der zweiten Runde. Was Zeit braucht, ist, dass es unter Druck hält. Dafür gibt es die Aufnahme zum Mitnehmen und auf Wunsch einen zweiten Termin nach einigen Wochen.',
    },
    {
      frage: 'Arbeiten Sie mit Körpersprache-Regeln?',
      antwort:
        'Nicht mit Regeln wie „offene Handflächen wirken vertrauenswürdig". Solche Listen führen dazu, dass jemand über seine Hände nachdenkt statt über seinen Satz — und das sieht man. Wir arbeiten an dem, was stört, nicht an einem Katalog.',
    },
    {
      frage: 'Was ist mit den 93 Prozent Körpersprache?',
      antwort:
        'Die Zahl stammt aus einem Versuch von 1967, bei dem es um widersprüchliche Signale bei einzelnen Wörtern ging. Der Forscher selbst hat der Verallgemeinerung widersprochen. Auf Ihrer Bühne gilt: Inhalt und Auftreten müssen zusammenpassen — welcher Anteil wie viel Prozent ausmacht, weiß niemand.',
    },
    {
      frage: 'Ich benutze immer Folien. Muss ich darauf verzichten?',
      antwort:
        'Nein, aber wir sehen sie uns an. Die häufigste Ursache für einen unsicheren Auftritt sind Folien, die dasselbe sagen wie der Sprecher — dann liest das Publikum, statt zuzuhören, und der Sprecher merkt, dass er überflüssig ist.',
    },
  ],

  nichtFuer: [
    'Sie wollen zusehen und mitschreiben. Hier wird gesprochen, und zwar mehrfach.',
    'Sie möchten nicht aufgenommen werden. Ohne Aufnahme fehlt der Teil, an dem die meisten am meisten lernen.',
    'Sie erwarten Regeln für Gestik und Mimik. Die gibt es hier nicht, weil sie beim Sprechen im Weg stehen.',
    'Ihr Thema und Ihr Aufbau sollen unangetastet bleiben. Manchmal liegt das Problem nicht am Auftritt, und dann sage ich das.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Sagen Sie mir, welcher Auftritt ansteht und was Sie daran unsicher macht. Danach weiß ich, ob ein Tag reicht — und Sie, ob es passt.',
  schrittKnopf: 'Vorgespräch anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Redner werden', ziel: '/redner-ausbildungen' }, { name: 'Bühnenwirkung & Auftritt' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Person auf einer Bühne, von hinten, Publikum im Licht' },
    { bereich: 'Beim Ablauf', motiv: 'Kamera auf Stativ, im Hintergrund jemand beim Sprechen' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Zwei Menschen sehen gemeinsam eine Aufnahme an' },
  ],

  weitere: [
    { titel: 'Was hilft gegen Lampenfieber?', text: 'Der ausführliche Artikel, kostenlos.', ziel: '/wissen/lampenfieber' },
    { titel: 'Warum sind Sprechpausen so wichtig?', text: 'Die Pause, ausführlich erklärt.', ziel: '/wissen/sprechpausen' },
    { titel: 'Speaker werden', text: 'Wenn es nicht um einen Auftritt geht, sondern um den Beruf.', ziel: '/speaker-ausbildung' },
  ],

  // Kopfbild (22.09.2026): Claudia Conen auf einer großen, rot beleuchteten Bühne
  bild: '/seiten/grosse-buehne.webp',
  bildAlt: 'Claudia Conen auf einer großen, rot beleuchteten Bühne',

  seoTitel: 'Bühnenpräsenz und Auftritt trainieren | Claudia Conen',
  seoText:
    'Bühnenwirkung trainieren an Ihrem echten Vortrag: Stand, Blick, Pausen, die ersten neunzig Sekunden. Mit Aufnahme — und ohne Körpersprache-Regeln, die beim Sprechen im Weg stehen.',
};

export default function SpeakerBuehne() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
