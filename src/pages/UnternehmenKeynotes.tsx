import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 1: Unternehmer und Teams. Traegt laut Umsatzrechnung zwei Drittel
 * des Ziels, steht deshalb an erster Stelle.
 *
 * Preis: 3.900 Euro fuer den Workshop-Tag. Das ist KEINE Erfindung, sondern
 * der Wert aus Claudias eigener Preisarchitektur (MARKETINGSTRATEGIE,
 * Abschnitt 7, "Inhouse-Workshop, ein Tag: 3.900").
 *
 * Bewusst EIN Angebot statt drei. Der Kritiker-Check nennt "zu viele Rollen,
 * kein klarer Kaufgrund" als Einwand Nummer eins. Die Keynote steht deshalb
 * in den Fragen, nicht als zweites gleichrangiges Angebot daneben.
 *
 * Keine Marktzahlen im Text. Die Zahlen aus der Marketingstrategie (Anteil
 * der Unternehmen mit KI, Anteil der geschulten Mitarbeitenden) sind dort
 * ohne Quelle notiert. Eine unbelegte Zahl auf einer Seite ueber Vertrauen
 * waere der teuerste denkbare Fehler.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/unternehmen-keynotes',
  wer: 'Unternehmer & Teams',
  frage: 'Wie wird aus Kommunikation Vertrauen – und aus Vertrauen Geschäft?',
  vorspann:
    'Eure Werkzeuge sind da. Was fehlt, ist die Sprache, mit der ihr darüber redet.',

  problemTitel: 'Das Problem sitzt selten in der Technik',
  problemAbsaetze: [
    'Ein Werkzeug wird eingeführt, geschult wird kaum. Wer damit nicht zurechtkommt, fragt nicht nach. Denn im Raum gilt die stille Regel, dass man das heute können muss.',
    'Dann passiert das, was in keinem Protokoll steht: Das Werkzeug wird benutzt, wenn jemand zuschaut. Und liegen gelassen, wenn nicht. Die Führung sieht eine Einführung, die läuft. Die Belegschaft erlebt eine Prüfung, die niemand angekündigt hat.',
    'Dasselbe Muster zeigt sich im Verkaufsgespräch, in der Teambesprechung und in der Präsentation vor dem Kunden. Nicht das Wissen fehlt. Es fehlt die Verbindung.',
  ],

  angebotName: 'Ein Tag im Haus',
  angebotZeile:
    'Ein Workshoptag bei euch vor Ort, mit deinem Team, an euren echten Situationen. Keine Vortragsfolien, sondern die Gespräche, die ihr morgen wirklich führt.',
  angebotPreis: '3.900 €',
  angebotPreisHinweis: 'zuzüglich Umsatzsteuer und Anfahrt, bis 15 Personen, ein voller Tag.',
  angebotPunkte: [
    'Vorgespräch, in dem die zwei, drei echten Reibungspunkte benannt werden',
    'Ein Tag vor Ort mit deinem Team, mit Übungen an euren eigenen Fällen',
    'Jeder geht mit zwei Sätzen heraus, die er am Montag tatsächlich benutzt',
    'Eine kurze Nachbereitung für die Führung, was auffiel und was zu tun bleibt',
  ],

  ablaufTitel: 'So läuft es ab',
  ablauf: [
    {
      schritt: 'Neunzig Minuten, kostenlos',
      text:
        'Ein erstes Format für dein Team, ohne Rechnung. Danach weißt du, wie Claudia arbeitet, und dein Team weiß, ob es anspringt.',
    },
    {
      schritt: 'Das Vorgespräch',
      text:
        'Eine Stunde mit dir oder deiner Personalleitung. Worum geht es wirklich, wer sitzt im Raum, was darf angesprochen werden und was nicht.',
    },
    {
      schritt: 'Der Tag',
      text:
        'Vor Ort bei euch. Gearbeitet wird an euren Situationen, nicht an Beispielen aus einem Buch.',
    },
    {
      schritt: 'Danach',
      text:
        'Eine schriftliche Rückmeldung an die Führung. Was im Raum sichtbar wurde, und woran ihr ohne Claudia weiterarbeiten könnt.',
    },
  ],

  fragen: [
    {
      frage: 'Wir brauchen eher eine Keynote als einen Workshop. Geht das auch?',
      antwort:
        'Ja. Eine Keynote von 45 bis 60 Minuten liegt bei 3.500 bis 5.000 Euro, ein kürzerer Impulsvortrag bei 2.500 Euro. Für mehrteilige Programme über mehrere Termine beginnt die Spanne bei 9.500 Euro. Der Workshoptag steht hier vorn, weil er in den meisten Häusern mehr verändert als ein einzelner Auftritt.',
    },
    {
      frage: 'Ist das ein KI-Training?',
      antwort:
        'Nein. Es geht nicht darum, Werkzeuge zu bedienen. Es geht darum, warum Menschen ein Werkzeug nicht annehmen, dem sie misstrauen, und was Führung und Sprache damit zu tun haben. Wer eine reine Werkzeugschulung sucht, ist woanders besser aufgehoben.',
    },
    {
      frage: 'Funktioniert das auch bei Menschen, die keine Lust auf so etwas haben?',
      antwort:
        'Gerade dann. Widerstand im Raum ist kein Störfall, sondern die ehrlichste Information des Tages. Er wird angesprochen, nicht übergangen.',
    },
    {
      frage: 'Wie viele Personen können teilnehmen?',
      antwort:
        'Bis fünfzehn Personen an einem Tag. Bei größeren Gruppen wird geteilt oder es wird ein anderes Format, das im Vorgespräch geklärt wird.',
    },
    {
      frage: 'Wie kurzfristig geht das?',
      antwort:
        'Termine werden in der Regel mit einigen Wochen Vorlauf vergeben. Sag früh Bescheid, wenn ein Datum feststeht.',
    },
  ],

  schrittTitel: 'Die neunzig Minuten kosten dich nichts',
  schrittText:
    'Kein Angebot, kein Vertrag, kein Gespräch über Geld. Ein Format für dein Team, danach entscheidet ihr. Das ist der ehrlichste Weg herauszufinden, ob es passt.',
  schrittKnopf: 'Gespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Workshops und Keynotes für Unternehmen | Claudia Conen',
  seoText:
    'Ein Workshoptag im Haus für Teams, die klarer kommunizieren und Vertrauen aufbauen wollen. Aus Kommunikation wird Vertrauen, aus Vertrauen Geschäft.',
};

export default function UnternehmenKeynotes() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
