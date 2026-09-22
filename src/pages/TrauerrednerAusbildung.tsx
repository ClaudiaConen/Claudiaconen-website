import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Ausbildung: Trauerrednerin werden. Stimmung "ruhig".
 *
 * Der Abschnitt, den die Wettbewerber am staerksten bespielen, heisst bei
 * freieredner-ausbildung.com "Umgang mit eigenen Emotionen". Zu Recht: Es ist
 * der Grund, aus dem Menschen den Beruf wieder aufgeben. Deshalb steht er
 * hier nicht am Rand, sondern mitten im Angebot.
 *
 * Marktpreise fuer diese Spezialisierung, Stand 18.09.2026: Video-Ausbildung
 * 950 EUR, Trauerredner-Seminar mit IHK 2.950 EUR (5 Seminartage, ab 2027
 * sechs), Sprecher-Akademie ab 660 EUR online, TrauerAkademie Berlin bis
 * 2.680 EUR.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/trauerredner-ausbildung',
  stimmung: 'ruhig',
  wer: 'Ausbildung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Kann man lernen, bei einem Abschied die richtigen Worte zu finden?',
  vorspann:
    'Man kann. Es ist ein Handwerk, und es ist erlernbar. Was Sie mitbringen müssen, ist die Bereitschaft, fremden Menschen an einem ihrer schwersten Tage zuzuhören.',

  problemTitel: 'Was in dieser Arbeit wirklich schwer ist',
  problemAbsaetze: [
    'Nicht das Schreiben. Das Gespräch. Sie sitzen bei Menschen am Küchentisch, die seit drei Tagen kaum geschlafen haben, und müssen aus widersprüchlichen Erinnerungen ein Leben herausholen. Manchmal streitet die Familie noch währenddessen.',
    'Nicht die Trauer der anderen. Die eigene. Wer Abschiede begleitet, nimmt Geschichten mit nach Hause. Wer nie gelernt hat, sie abzulegen, hört nach ein, zwei Jahren wieder auf — und das ist der häufigste Grund, warum Menschen diesen Beruf verlassen.',
    'Und nicht der große Moment, sondern der kleine: Wenn jemand in der ersten Reihe zusammenbricht, während Sie sprechen. Darauf kann man sich vorbereiten. Die meisten tun es nicht.',
  ],

  angebotName: 'Die Ausbildung zur Trauerrednerin',
  angebotZeile:
    'Das Gespräch, die Rede, der Tag — und der Teil, über den selten jemand spricht: wie Sie diese Arbeit über Jahre tragen können, ohne daran müde zu werden.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Zur Einordnung des Marktes: reine Video-Ausbildungen ab rund 950 Euro, Online-Kurse ab etwa 660 Euro, mehrtägige Seminare mit IHK-Zertifikat um 2.950 Euro. Der Umfang entscheidet, und den legen wir vorher gemeinsam fest.',
  angebotPunkte: [
    'Das Angehörigengespräch: fragen, ohne zu verhören; schweigen, ohne zu verlieren',
    'Aus Erinnerungen ein Leben bauen — auch wenn die Familie sich uneins ist',
    'Die Rede sprechbar schreiben: Atemstellen, Tempo, der Satz, der die Tränen trägt',
    'Ihre Stimme in einem Raum, in dem alle weinen',
    'Umgang mit dem, was hängen bleibt: Abstand finden, ohne kalt zu werden',
    'Der Ablauf am Tag: Bestatter, Musik, Technik, Übergaben',
  ],

  ablaufTitel: 'Der Weg dorthin',
  ablauf: [
    {
      schritt: 'Vorgespräch',
      text:
        'Ich frage Sie, warum ausgerechnet dieser Beruf. Die Antwort sagt mehr über Ihre Eignung als jeder Lebenslauf. Es kostet nichts und verpflichtet zu nichts.',
    },
    {
      schritt: 'Zuhören lernen',
      text:
        'Wir üben das Angehörigengespräch, bevor Sie eines führen. Mit echten Fällen, mit echten Widersprüchen, mit dem Moment, in dem jemand nicht weiterreden kann.',
    },
    {
      schritt: 'Die Rede',
      text:
        'Aus Ihrem Gespräch entsteht ein Text. Wir arbeiten ihn so lange durch, bis er beim Sprechen trägt — und nicht nur beim Lesen.',
    },
    {
      schritt: 'Sprechen',
      text:
        'Sie sprechen die Rede laut, vor Menschen. Stimme, Stand, Blick, Pausen. Das ist der Teil, den kaum jemand übt, und der Teil, an dem später alles hängt.',
    },
    {
      schritt: 'Tragfähig bleiben',
      text:
        'Zum Schluss der Teil, den viele Ausbildungen auslassen: Wie Sie eine Trauerfeier hinter sich lassen, ohne sie zu verdrängen. Damit Sie den Beruf in fünf Jahren noch haben.',
    },
  ],

  bilder: [
    {
      bereich: 'Das Gespräch',
      motiv: 'Zwei Menschen am Tisch, gedämpftes Licht, keine Gesichter nötig. Hände, Kaffeetassen, ein Notizbuch.',
    },
    {
      bereich: 'Der Raum',
      motiv: 'Leerer Trauerraum vor der Feier. Ruhig, hell, ohne Symbolik.',
    },
    {
      bereich: 'Nachbereitung',
      motiv: 'Etwas Kleines: ein Notizbuch, eine geschriebene Seite. Zeigt das Handwerk ohne Pathos.',
    },
  ],

  nichtFuer: [
    'Ihr eigener Verlust ist noch frisch. Dann wird jede Feier zur eigenen. Das hilft niemandem, Ihnen am wenigsten.',
    'Sie suchen ein ruhiges Nebeneinkommen. Die Arbeit ist emotional fordernd, und die Termine kommen mit drei bis sieben Tagen Vorlauf.',
    'Sie möchten Vorlagen, die sich anpassen lassen. Es gibt sie, und sie sind der Grund, warum Angehörige hinterher sagen, es habe nicht gepasst.',
    'Sie wollen nicht über sich selbst sprechen. Der Umgang mit dem, was die Arbeit mit einem macht, ist hier Teil der Ausbildung und nicht optional.',
  ],

  brotkrumen: [
    { name: 'Ausbildungen', ziel: '/redner-ausbildungen' },
    { name: 'Trauerredner werden' },
  ],

  fragen: [
    {
      frage: 'Ich habe selbst jemanden verloren. Spricht das gegen mich?',
      antwort:
        'Nein, es ist häufig der Anlass. Wichtig ist nur der zeitliche Abstand. Wenn der eigene Verlust noch frisch ist, wird jede Feier zur eigenen — das hilft niemandem, Ihnen am wenigsten. Darüber sprechen wir offen im Vorgespräch.',
    },
    {
      frage: 'Muss ich religiös sein?',
      antwort:
        'Nein. Eine freie Trauerrede ist keine kirchliche Handlung. Wichtig ist, dass Sie die Überzeugungen der Familie tragen können — auch wenn es nicht Ihre sind. Das ist eine Haltung, keine Frage des Glaubens.',
    },
    {
      frage: 'Bekomme ich ein IHK-Zertifikat?',
      antwort:
        'Nein, das stellen andere Anbieter aus. Wenn es für Sie entscheidend ist, nenne ich Ihnen im Vorgespräch die Adressen. Was ich Ihnen gebe, ist die Arbeit an Stimme, Gesprächsführung und Wirkung.',
    },
    {
      frage: 'Wie oft wird man angefragt?',
      antwort:
        'Das hängt von Ihrer Region ab und davon, welche Bestatter Sie kennen. Eine Zahl zu nennen, die ich für Sie nicht kenne, wäre ein Versprechen ohne Deckung. Was ich Ihnen sagen kann: Der Weg läuft fast immer über Bestatter, nicht über Anzeigen.',
    },
    {
      frage: 'Kann ich das neben meinem Beruf machen?',
      antwort:
        'Ja. Trauerfeiern liegen meist werktags vormittags, die Vorbereitung abends. Viele beginnen so. Rechnen Sie mit mehreren Stunden Vorbereitung je Feier — das Gespräch allein dauert oft zwei.',
    },
  ],

  weitere: [
    {
      titel: 'Freie Rednerin werden',
      text: 'Das Dach über allen Anlässen.',
      ziel: '/freie-redner-ausbildung',
    },
    {
      titel: 'Hochzeitsrednerin werden',
      text: 'Der andere Anlass, dasselbe Handwerk.',
      ziel: '/hochzeitsredner-ausbildung',
    },
    {
      titel: 'Storytelling-Kurs',
      text: 'Aus einem Leben eine erzählbare Geschichte machen.',
      ziel: '/storytelling-kurs',
    },
  ],

  schrittTitel: 'Sprechen Sie mit mir, bevor Sie sich entscheiden',
  schrittText:
    'Ein Vorgespräch, ohne Verpflichtung. Danach wissen Sie, ob diese Arbeit zu Ihnen passt. Und wenn ich den Eindruck habe, dass sie es nicht tut, sage ich es Ihnen.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  // Kopfbild (22.09.2026): Claudia Conen am Schreibtisch, schreibend, mit roter Mappe
  bild: '/seiten/schreibtisch.webp',
  bildAlt: 'Claudia Conen am Schreibtisch, schreibend, mit roter Mappe',
  bildQuer: true,

  // Claudias Ansage vom 22.09.2026: Trauerredner-Ausbildung in Witten, 1:1 und 6:1.
  formate: [
    { titel: 'Live in Witten · 1:1', text: 'Du und ich, ein Tag oder mehrere Termine. Alles dreht sich um deine Stimme, deine Texte, deine Situationen.' },
    { titel: 'Live in Witten · Gruppe 6:1', text: 'Sechs Menschen, eine Trainerin. Jeder steht mehrfach auf und redet; die anderen sind dein erstes Publikum.' },
  ],

  fragenZusatz: ['ausbildung', 'redner'],
  seoTitel: 'Trauerrednerin werden — Ausbildung bei Claudia Conen',
  seoText:
    'Ausbildung zur Trauerrednerin: Angehörigengespräch, Rede, Stimme im Raum — und der Umgang mit dem, was die Arbeit mit einem selbst macht.',
};

export default function TrauerrednerAusbildung() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
