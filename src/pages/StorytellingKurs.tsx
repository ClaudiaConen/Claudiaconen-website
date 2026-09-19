import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Storytelling-Kurs.
 *
 * Von Claudia am 18.09.2026 um 21:46 benannt.
 *
 * ACHTUNG, hier lag die groesste Versuchung: Der ganze Markt bewirbt
 * Storytelling mit "Geschichten wirken 60.000x schneller als Fakten". Diese
 * Zahl wird seit Jahren einer Studie zugeschrieben, die es nicht gibt. Sie
 * stand auf Claudias eigener Seite an mehreren Stellen und wird gerade
 * entfernt (Aufgabe 16). Sie taucht hier deshalb nirgends auf - auch nicht
 * abgeschwaecht als "vielfach schneller".
 *
 * Was stattdessen dasteht, ist ueberpruefbar und reicht voellig: Menschen
 * erzaehlen weiter, was sie erlebt haben, nicht was sie gelesen haben.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/storytelling-kurs',
  stimmung: 'dunkel',
  wer: 'Kurs',
  zurueck: { text: 'Speaker und freie Redner', ziel: '/redner-ausbildungen' },
  frage: 'Warum erzählt jemand Ihren Vortrag weiter — und warum meistens nicht?',
  vorspann:
    'Weitererzählt wird, was sich nacherzählen lässt. Eine Zahl kann man nicht nacherzählen. Eine Szene schon.',

  problemTitel: 'Warum die meisten Geschichten nicht tragen',
  problemAbsaetze: [
    'Weil sie der Reihe nach erzählt werden. „Dann kam das, dann kam jenes." Das ist ein Bericht. Eine Geschichte beginnt an dem Punkt, an dem etwas kippt — alles davor ist Anlauf und kann weg.',
    'Weil niemand etwas riskiert. Die meisten erzählen Geschichten, in denen sie gut aussehen. Zugehört wird aber dort, wo jemand etwas zugibt. Das heißt nicht, sich kleinzumachen; es heißt, den Moment zu zeigen, in dem es unklar war.',
    'Und weil die Moral hinterhergeschoben wird. Wer am Schluss erklärt, was die Geschichte bedeutet, nimmt dem Publikum die Arbeit ab — und damit das Erlebnis. Eine Geschichte, die man erklären muss, hat nicht funktioniert.',
  ],

  angebotName: 'Der Storytelling-Kurs',
  angebotZeile:
    'Sie gehen mit drei erzählbaren Geschichten heraus: einer über sich, einer über einen Kunden, einer über einen Fehler. Alle drei gesprochen, nicht nur geschrieben.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Als Einzelarbeit oder in kleiner Gruppe. In der Gruppe lernt man zusätzlich beim Zuhören — man hört an anderen sofort, was man selbst falsch macht.',
  angebotPunkte: [
    'Geschichten finden: die drei Sorten, die in jedem Berufsleben liegen',
    'Den Einstieg an die richtige Stelle legen, nicht an den Anfang',
    'Szene statt Zusammenfassung: ein Ort, eine Uhrzeit, ein Satz, den jemand gesagt hat',
    'Der Bruch: der Moment, in dem es hätte schiefgehen können',
    'Aufhören, bevor Sie es erklären',
    'Dieselbe Geschichte in einer Minute, in fünf Minuten und in einem Satz',
  ],

  ablaufTitel: 'So entsteht Ihr Vorrat',
  ablauf: [
    {
      schritt: 'Sammeln',
      text:
        'Wir suchen nicht die beste Geschichte, sondern zwanzig kleine. Die meisten Menschen halten ihr Material für belanglos, weil sie es selbst erlebt haben.',
    },
    {
      schritt: 'Zuschneiden',
      text:
        'Aus jedem Rohstück wird der Kern geschnitten. Was bleibt, ist oft ein Drittel — und wirkt doppelt.',
    },
    {
      schritt: 'Sprechen',
      text:
        'Geschichten werden erzählt, nicht vorgelesen. Deshalb wird hier gesprochen und aufgenommen. Sie hören sich selbst zu, und das ist der lehrreichste Teil.',
    },
    {
      schritt: 'Einbauen',
      text:
        'Zum Schluss setzen wir die Geschichten dorthin, wo sie gebraucht werden: in den Vortrag, ins Kundengespräch, auf die erste Seite Ihrer Webseite.',
    },
  ],

  fragen: [
    {
      frage: 'Ich habe nichts Spannendes erlebt.',
      antwort:
        'Das sagen fast alle im Vorgespräch, und fast alle haben nach zwei Stunden drei Geschichten. Spannend ist nicht das Ereignis, sondern der Moment der Entscheidung. Den gibt es in jedem Berufsleben, oft mehrmals im Monat.',
    },
    {
      frage: 'Muss ich Privates erzählen?',
      antwort:
        'Nein. Sie bestimmen die Grenze, und wir legen sie ausdrücklich fest, bevor Sie anfangen. Eine gute Geschichte braucht Nähe, nicht Intimität. Wer sich auf der Bühne mehr auszieht, als ihm lieb ist, merkt es hinterher — und dann ist es zu spät.',
    },
    {
      frage: 'Wirkt das nicht manipulativ?',
      antwort:
        'Es kann manipulativ sein, ja. Eine erfundene Geschichte ist eine Lüge mit Gefühl obendrauf. Deshalb arbeiten wir nur mit Erlebtem und sagen dazu, wenn etwas gekürzt oder zusammengezogen wurde. Wer Geschichten erfindet, fliegt irgendwann auf — meistens bei jemandem, der dabei war.',
    },
    {
      frage: 'Funktioniert das auch schriftlich?',
      antwort:
        'Ja, und es ist derselbe Handgriff. Der Unterschied ist das Tempo: Beim Schreiben können Sie kürzen, bis nichts Überflüssiges übrig ist. Beim Sprechen brauchen Sie Pausen, wo beim Lesen ein Absatz steht.',
    },
    {
      frage: 'Was ist mit Zahlen? Die brauche ich doch auch.',
      antwort:
        'Natürlich. Die Reihenfolge entscheidet: erst die Szene, dann die Zahl. Eine Zahl nach einer Geschichte wird als Beleg gehört. Eine Zahl davor wird als Behauptung gehört, die man erst mal prüfen müsste.',
    },
  ],

  weitere: [
    {
      titel: 'Elevator-Pitch-Kurs',
      text: 'Der eine Satz, bevor die Geschichte kommt.',
      ziel: '/elevator-pitch-kurs',
    },
    {
      titel: 'Speakerin werden',
      text: 'Aus dem Thema eine Keynote machen und sie sprechen.',
      ziel: '/speaker-ausbildung',
    },
    {
      titel: 'Freie Rednerin werden',
      text: 'Aus einem Leben eine Rede machen, für Hochzeit und Abschied.',
      ziel: '/freie-redner-ausbildung',
    },
  ],

  schrittTitel: 'Erzählen Sie mir eine',
  schrittText:
    'Im Vorgespräch bitte ich Sie um eine kleine Geschichte aus Ihrem letzten Monat. Daran sieht man in wenigen Minuten, wo Ihr Material liegt. Das kostet nichts.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Storytelling-Kurs | Claudia Conen',
  seoText:
    'Storytelling lernen mit eigenem Material: Geschichten finden, zuschneiden, sprechen. Drei erzählbare Geschichten für Vortrag, Kundengespräch und Webseite.',
};

export default function StorytellingKurs() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
