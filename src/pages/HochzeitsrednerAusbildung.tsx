import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Ausbildung: Hochzeitsrednerin werden. Stimmung "hell".
 *
 * Die haeufigste Bitte von Paaren ist laut Recherche und laut Claudias
 * eigener Seite: bewegend, aber nicht kitschig. Genau daran scheitern die
 * meisten Anfaenger, und genau deshalb steht es hier im Mittelpunkt statt
 * im Kleingedruckten.
 *
 * Verdienstrahmen, recherchiert am 18.09.2026: Durchschnittshonorar rund
 * 1.000 EUR, erfahrene Redner 1.100 bis 1.600 EUR, Gesamtspanne 800 bis
 * 2.500 EUR, Arbeitsaufwand 25 bis 35 Stunden je Trauung. Diese Zahlen
 * stehen auf der Seite, weil sie fuer die Entscheidung zaehlen - aber als
 * Marktzahlen, nicht als Versprechen.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/hochzeitsredner-ausbildung',
  stimmung: 'hell',
  wer: 'Ausbildung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Wie wird aus einer Liebesgeschichte eine Rede, die trägt?',
  vorspann:
    'Indem Sie die richtigen Fragen stellen, bevor Sie das erste Wort schreiben. Die Zeremonie entsteht im Gespräch mit dem Paar — alles andere ist Handwerk darauf.',

  problemTitel: 'Woran Anfängerinnen scheitern',
  problemAbsaetze: [
    'An der Austauschbarkeit. Es gibt Reden, die auf jedes Paar passen würden, und genau das hören die Gäste. Freundlich, gut gemeint, nach zehn Minuten vergessen. Der Grund liegt nie im Text, sondern im Gespräch davor: zu wenig gefragt.',
    'Am Kitsch. Die häufigste Bitte von Paaren ist bewegend, aber bitte nicht rührselig. Kitsch entsteht durch große Worte an kleinen Stellen. Eine Szene aus dem Leben der beiden trägt weiter als jedes Zitat über die Liebe.',
    'Und an allem, was nichts mit Sprache zu tun hat: Wind, ein Mikrofon, das rückkoppelt, eine Trauzeugin, die nach zwei Sätzen nicht weitersprechen kann. Der Tag ist ein Handwerk für sich.',
  ],

  angebotName: 'Die Ausbildung zur Hochzeitsrednerin',
  angebotZeile:
    'Vom ersten Paargespräch bis zum Moment, in dem Sie draußen im Wind stehen und trotzdem gehört werden.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Zur Einordnung des Marktes: zweitägige Seminare gibt es ab wenigen hundert Euro, mehrtägige Ausbildungen mit IHK-Zertifikat liegen zwischen 2.950 und 3.590 Euro. Den Umfang legen wir im Vorgespräch fest.',
  angebotPunkte: [
    'Das Paargespräch: die Fragen, aus denen eine eigene Geschichte wird',
    'Bewegend schreiben, ohne kitschig zu werden — an Beispielen, nicht an Regeln',
    'Rituale aufbauen, auch ohne gekaufte Bausteine',
    'Ihre Stimme im Freien, im Zelt, im Saal',
    'Der Ablauf am Tag: Location, Musik, Technik, Übergaben, Wetter',
    'Was tun, wenn jemand weint und nicht weitersprechen kann',
  ],

  ablaufTitel: 'Der Weg dorthin',
  ablauf: [
    {
      schritt: 'Vorgespräch',
      text:
        'Kostenlos, ohne Verpflichtung. Ich höre Ihnen zu und sage Ihnen, ob das zu Ihnen passt. Manchmal ist die Antwort nein, und dann sage ich das auch.',
    },
    {
      schritt: 'Fragen lernen',
      text:
        'Wir üben das Paargespräch. Die meisten fragen zu höflich und bekommen deshalb die Geschichte nicht, die sie brauchen.',
    },
    {
      schritt: 'Die Zeremonie bauen',
      text:
        'Aufbau, Bögen, Rituale, der Moment des Ja-Worts. Sie schreiben an einem echten Fall, den Sie mitbringen.',
    },
    {
      schritt: 'Sprechen und stehen',
      text:
        'Sie sprechen Ihre Zeremonie. Draußen, wenn es geht. Stimme, Stand, Blick, Umgang mit dem Mikrofon.',
    },
    {
      schritt: 'Der Tag als Handwerk',
      text:
        'Technik, Ablauf, Absprachen, Notfälle. Am Ende haben Sie eine Checkliste, die Sie am Hochzeitsmorgen wirklich benutzen.',
    },
  ],

  bilder: [
    {
      bereich: 'Zeremonie im Freien',
      motiv: 'Querformat, Paar und Gäste, Tageslicht. Warm, aber ohne Kitsch.',
    },
    {
      bereich: 'Das Paargespräch',
      motiv: 'Drei Menschen an einem Tisch, entspannt. Hier entsteht die Rede.',
    },
    {
      bereich: 'Technik am Tag',
      motiv: 'Mikrofon, Kabel, Wind. Das, woran es scheitert, und worüber niemand spricht.',
    },
  ],

  fragen: [
    {
      frage: 'Was verdient man als Hochzeitsrednerin?',
      antwort:
        'Im deutschen Markt liegt das Durchschnittshonorar bei rund 1.000 Euro je Trauung, erfahrene Redner zwischen 1.100 und 1.600 Euro, die Gesamtspanne zwischen 800 und 2.500. Wichtig dabei: Hinter einer Trauung stecken 25 bis 35 Arbeitsstunden. Wer nur den Tag rechnet, verrechnet sich.',
    },
    {
      frage: 'Wie viele Trauungen schafft man im Jahr?',
      antwort:
        'Die Saison ist kurz: Der Schwerpunkt liegt zwischen Mai und September, vor allem an Samstagen. Wie viele Aufträge Sie bekommen, hängt von Ihrer Region ab. Eine Zahl zu nennen, die ich für Sie nicht kenne, wäre ein Versprechen ohne Deckung.',
    },
    {
      frage: 'Bekomme ich ein Zertifikat?',
      antwort:
        'Kein IHK-Zertifikat, das stellen andere Anbieter aus. Wenn Ihnen das wichtig ist, nenne ich Ihnen im Vorgespräch die Adressen. Bei mir arbeiten Sie an Stimme, Gesprächsführung und Wirkung.',
    },
    {
      frage: 'Ich bin schüchtern. Geht das trotzdem?',
      antwort:
        'Häufiger, als Sie denken. Schüchternheit und Präsenz schließen sich nicht aus — viele der ruhigsten Menschen sind vor Publikum die glaubwürdigsten. Was Sie brauchen, ist eine Stimme, die den Raum erreicht, und das ist trainierbar.',
    },
    {
      frage: 'Lohnt es sich, beides zu machen: Trauung und Trauerfeier?',
      antwort:
        'Wirtschaftlich ja. Trauungen liegen am Wochenende und im Sommer, Trauerfeiern werktags und ganzjährig. Wer beides anbietet, hat kein leeres Winterhalbjahr. Inhaltlich ist es derselbe Beruf: zuhören, eine Geschichte finden, sie sprechbar machen.',
    },
  ],

  weitere: [
    {
      titel: 'Freie Rednerin werden',
      text: 'Das Dach über allen Anlässen.',
      ziel: '/freie-redner-ausbildung',
    },
    {
      titel: 'Trauerrednerin werden',
      text: 'Der Anlass, der das Winterhalbjahr füllt.',
      ziel: '/trauerredner-ausbildung',
    },
    {
      titel: 'Storytelling-Kurs',
      text: 'Bewegend erzählen, ohne kitschig zu werden.',
      ziel: '/storytelling-kurs',
    },
  ],

  schrittTitel: 'Lernen Sie mich kennen, bevor Sie sich entscheiden',
  schrittText:
    'Ein Vorgespräch kostet nichts. Danach wissen Sie, ob das Ihr Weg ist — und ob ich die Richtige bin, um Sie darauf zu begleiten.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Hochzeitsrednerin werden — Ausbildung bei Claudia Conen',
  seoText:
    'Ausbildung zur Hochzeitsrednerin und zum Trauredner: Paargespräch, Zeremonie, Stimme im Freien und der Ablauf am Hochzeitstag.',
};

export default function HochzeitsrednerAusbildung() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
