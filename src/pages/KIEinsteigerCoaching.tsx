import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 4: KI-Einsteiger und Neugierige.
 *
 * Claudia hat die Zielgruppe am 18.09.2026 selbst von "Einsteiger ab 50" in
 * "KI-Einsteiger & Neugierige" umbenannt. Das ist die klaerere Wahl: Niemand
 * wird gern auf sein Alter reduziert, und die Angst vor der ersten Frage hat
 * mit dem Geburtsjahr wenig zu tun.
 *
 * Preis 89 Euro fuer den Online-Kurs stammt aus der Angebotstreppe und ist
 * dort als gesetzt gefuehrt, nicht als Entwurf. Deshalb steht er hier.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/ki-einsteiger-coaching',
  wer: 'KI-Einsteiger & Neugierige',
  frage: 'Wie nutzt du KI als Abkürzung – und bleibst trotzdem unverwechselbar?',
  vorspann:
    'KI kann Zeit schenken, Ideen beschleunigen und Arbeit erleichtern. Entscheidend ist, zu verstehen, was wirklich zu dir und deinem Business passt.',

  problemTitel: 'Das Problem ist nicht die Technik. Es ist die Scham.',
  problemAbsaetze: [
    'Alle reden davon, als wäre es selbstverständlich. Und genau deshalb fragt niemand mehr nach. Wer nicht fragt, probiert heimlich, gibt auf und sagt nichts.',
    'Dazu kommt die zweite Sorge, und die ist berechtigt: Wenn alle dieselben Werkzeuge benutzen, klingen am Ende alle gleich. Dann hast du Zeit gespart und dich selbst verloren.',
    'Beides lässt sich lösen. Aber nicht mit tausend Werkzeugen, sondern mit drei, die zu dir passen, und mit der Erlaubnis, jede Frage zu stellen.',
  ],

  angebotName: 'Der Online-Kurs Unverwechselbar',
  angebotZeile:
    'Der Einstieg in deinem Tempo. Ohne Fachbegriffe, ohne Eile, ohne dass dir jemand über die Schulter schaut.',
  angebotPreis: '89 €',
  angebotPreisHinweis: 'Einmalig. Du arbeitest ihn durch, wann du willst, und so oft du willst.',
  angebotPunkte: [
    'Die ersten Schritte, erklärt für Menschen, die noch nie damit gearbeitet haben',
    'Drei Werkzeuge, die wirklich etwas sparen, statt einer Liste mit dreißig',
    'Wie du KI nutzt, ohne dass deine Texte nach KI klingen',
    'Was du besser selbst machst, weil es sonst austauschbar wird',
  ],

  ablaufTitel: 'Was dich erwartet',
  ablauf: [
    {
      schritt: 'Verstehen',
      text:
        'Was diese Werkzeuge tun und was nicht. In normaler Sprache, ohne dass du vorher etwas wissen musst.',
    },
    {
      schritt: 'Sicher anwenden',
      text:
        'Die ersten eigenen Versuche, an deinen echten Aufgaben. Nicht an erfundenen Beispielen.',
    },
    {
      schritt: 'Zeit gewinnen',
      text:
        'Wo sich wirklich Stunden sparen lassen. Und was mit der gewonnenen Zeit passieren sollte, damit sie nicht gleich wieder verschwindet.',
    },
    {
      schritt: 'Unverwechselbar bleiben',
      text:
        'Der wichtigste Teil. Wie deine Persönlichkeit im Ergebnis sichtbar bleibt, statt zwischen tausend ähnlichen Texten zu verschwinden.',
    },
  ],

  fragen: [
    {
      frage: 'Ich bin nicht technikbegeistert. Ist das trotzdem etwas für mich?',
      antwort:
        'Ja, genau dafür ist es gemacht. Es wird nichts vorausgesetzt außer der Bereitschaft, etwas auszuprobieren. Fragen sind ausdrücklich erwünscht, auch die, die du dir woanders nicht traust.',
    },
    {
      frage: 'Gibt es das auch mit einem Menschen statt als Kurs?',
      antwort:
        'Ja. Es gibt Einzelbegleitung und Workshops für Gruppen und Teams. Für viele ist der Kurs der richtige Anfang, weil er nichts kostet außer 89 Euro und niemand zuschaut.',
    },
    {
      frage: 'Werde ich danach ersetzt?',
      antwort:
        'Nein, und das ist der Kern. Was sich ersetzen lässt, ist das Wiederholbare. Was du mitbringst, deine Erfahrung, deine Art zu sprechen, dein Urteil, lässt sich nicht auf Knopfdruck erzeugen. Der Kurs zeigt dir, wo die Grenze verläuft.',
    },
    {
      frage: 'Wie lange brauche ich dafür?',
      antwort:
        'So lange du willst. Es gibt keinen Zeitplan und keine Gruppe, die auf dich wartet. Die meisten arbeiten ihn über zwei, drei Abende durch.',
    },
  ],

  schrittTitel: 'Fang klein an',
  schrittText:
    'Der Kurs ist der Einstieg mit dem geringsten Risiko. Wenn du lieber erst reden möchtest, geht das auch. Eine Frage zu stellen kostet hier nichts.',
  schrittKnopf: 'Einfach mit KI starten',
  schrittZiel: '/termin-buchen',

  seoTitel: 'KI für Einsteiger, ohne Fachchinesisch | Claudia Conen',
  seoText:
    'Der Einstieg in KI für Menschen ohne Vorkenntnisse. Verstehen, sicher anwenden, Zeit gewinnen und dabei unverwechselbar bleiben.',
};

export default function KIEinsteigerCoaching() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
