import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Verkauf & Auftreten.
 *
 * Vorher eine Schablone mit einer Gegenüberstellung "früher/heute" und
 * fünf Stichpunkten. Die Stichpunkte sind Claudias eigene und bleiben;
 * die Gegenüberstellung war ein Werbemuster und fällt weg.
 *
 * ACHTUNG BEI DIESEM THEMA: Verkaufstrainings sind der Ort, an dem
 * erfundene Zahlen am dichtesten stehen - "93 Prozent Körpersprache",
 * "Menschen entscheiden in X Sekunden". Hier steht keine einzige. Was
 * gesagt wird, ist beobachtbar oder es steht nicht da.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/unternehmen-selling',
  wer: 'Für Unternehmen',
  frage: 'Ihr Angebot ist gut. Warum kauft trotzdem der andere?',
  vorspann:
    'Weil Menschen selten das beste Angebot nehmen, sondern das, bei dem sie sich sicher fühlen. Diese Sicherheit entsteht im Gespräch — und zwar daran, wie jemand fragt, wie er zuhört und was er sagt, wenn er die Antwort nicht kennt.',

  problemTitel: 'Woran Verkaufsgespräche scheitern',
  problemAbsaetze: [
    'Der häufigste Fehler ist nicht zu wenig Fachwissen, sondern zu viel davon zur falschen Zeit. Wer auf eine Frage mit drei Vorteilen antwortet, hat die Frage nicht beantwortet — er hat verkauft. Das hört man.',
    'Der zweite ist die Angst vor der Stille. Nach einem Preis kommt eine Pause. Wer sie füllt, verhandelt gegen sich selbst.',
    'Und der dritte: auswendig gelernte Einwandbehandlung. Sie funktioniert, bis jemand etwas sagt, das nicht im Handbuch steht — und danach ist das Gespräch kälter als vorher.',
  ],

  angebotName: 'Verkauf & Auftreten',
  angebotZeile: 'Für Vertriebsteams und alle, die verkaufen, ohne dass es im Titel steht',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt von der Gruppengröße und der Dauer ab. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Fragen, die etwas öffnen — statt Fragen, die zur nächsten Folie führen.',
    'Zuhören als Handwerk: woran man merkt, dass das eigentliche Thema noch nicht auf dem Tisch liegt.',
    'Die Pause nach dem Preis. Aushalten lässt sich üben, und es ist der am schnellsten sichtbare Gewinn.',
    'Einwände als Information behandeln statt als Angriff. Wer widerspricht, ist noch im Gespräch.',
    'Die eigene Geschichte: eine Szene aus der eigenen Arbeit, die man in dreißig Sekunden erzählen kann.',
    'Stimme im Gespräch: Tempo herausnehmen, ohne langsam zu wirken.',
  ],

  ablaufTitel: 'Wie ein Training abläuft',
  ablauf: [
    { schritt: 'Vorher', text: 'Ich frage nach zwei echten Gesprächen: eines, das gut lief, und eines, das verloren ging. Mit diesen beiden arbeiten wir.' },
    { schritt: 'Erster Teil', text: 'Gespräche zu zweit, im Wechsel, mit Beobachtung. Kurze Runden, sofortige Rückmeldung — nicht am Ende des Tages.' },
    { schritt: 'Zweiter Teil', text: 'Die unangenehmen Stellen: der Preis, der Vergleich mit dem Wettbewerb, die Frage, auf die man keine gute Antwort hat.' },
    { schritt: 'Dritter Teil', text: 'Jede Person erzählt ihre Szene. Einmal wie üblich, einmal nach der Arbeit daran. Der Unterschied ist im Raum hörbar.' },
    { schritt: 'Danach', text: 'Auf Wunsch eine Runde nach sechs Wochen — mit den Gesprächen, die inzwischen wirklich stattgefunden haben.' },
  ],

  fragen: [
    {
      frage: 'Ist das eine Verkaufsmethode?',
      antwort:
        'Nein. Es gibt keinen Ablauf, den Sie danach abarbeiten. Methoden funktionieren, bis das Gegenüber von ihnen abweicht — und genau dann entscheidet sich ein Gespräch. Wir arbeiten daran, was Sie tun, wenn der Plan nicht greift.',
    },
    {
      frage: 'Funktioniert das auch im Telefon- und Videogespräch?',
      antwort:
        'Ja, und dort ist es wichtiger. Ohne Raum und Körper trägt die Stimme allein. Wir üben beides, und der Unterschied zwischen einem guten Gespräch vor Ort und am Bildschirm ist ein eigener Punkt im Ablauf.',
    },
    {
      frage: 'Unser Team verkauft seit Jahren erfolgreich. Was bringt es dann?',
      antwort:
        'Erfahrene Verkäufer haben meist eine Stelle, an der sie zuverlässig verlieren, und kennen sie nicht — weil niemand ihnen zuhört, während sie arbeiten. Genau dafür ist die Beobachtung da. Wenn sich nichts findet, sage ich das auch.',
    },
    {
      frage: 'Wie groß darf die Gruppe sein?',
      antwort:
        'Sechs bis zwölf. Bei mehr kommt nicht jede Person mehrfach dran, und ein Verkaufstraining ohne eigenes Sprechen ist ein Vortrag.',
    },
    {
      frage: 'Arbeiten Sie mit Druck oder Abschlusstechniken?',
      antwort:
        'Nein. Techniken, die Druck erzeugen, funktionieren einmal und kosten den zweiten Auftrag. Wer nach dem Kauf das Gefühl hat, überredet worden zu sein, kommt nicht wieder und erzählt es weiter.',
    },
    {
      frage: 'Was, wenn das Produkt wirklich teurer ist als beim Wettbewerb?',
      antwort:
        'Dann muss der Unterschied im Gespräch vorkommen, nicht in der Preisliste. Das ist Arbeit an der Sache, nicht an der Formulierung — und manchmal ist das Ergebnis, dass ein Angebot wirklich nicht passt. Das sagen zu können ist auch ein Ergebnis.',
    },
  ],

  nichtFuer: [
    'Sie suchen Abschlusstechniken oder Druckmittel. Die gibt es hier nicht, und sie kosten den zweiten Auftrag.',
    'Das Team soll motiviert werden. Dafür gibt es einen Vortrag; ein Training verändert, wie gesprochen wird, nicht die Stimmung.',
    'Niemand soll sich beim Üben unwohl fühlen. Das wird er stellenweise — genau dort liegt der Unterschied zum Zuhören.',
    'Sie erwarten eine Zahl, um wie viel der Umsatz steigt. Die nenne ich nicht, weil ich sie nicht wissen kann.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Nennen Sie mir zwei Gespräche: eines, das gut lief, und eines, das Sie verloren haben. Dreißig Minuten, ohne Kosten — danach wissen wir beide, ob es passt.',
  schrittKnopf: 'Vorgespräch anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Für Unternehmen', ziel: '/unternehmen-keynotes' }, { name: 'Verkauf & Auftreten' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Zwei Menschen im Verkaufsgespräch, seitlich, kein Blick in die Kamera' },
    { bereich: 'Beim Ablauf', motiv: 'Kleine Gruppe beim Üben, eine Person beobachtet und macht Notizen' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Handschlag nach einem Gespräch, Ausschnitt, ohne Gesichter' },
  ],

  weitere: [
    { titel: 'Führung & Kommunikation', text: 'Dieselbe Arbeit, gerichtet auf das Führen.', ziel: '/unternehmen-leadership' },
    { titel: 'Keynote für Ihr Unternehmen', text: 'Wenn erst einmal alle dasselbe gehört haben sollen.', ziel: '/unternehmen-keynotes' },
    { titel: 'Elevator-Pitch-Kurs', text: 'Ein Satz, der erklärt, was Sie tun.', ziel: '/elevator-pitch-kurs' },
  ],

  seoTitel: 'Verkaufstraining: Emotional Selling für Vertriebsteams | Claudia Conen',
  seoText:
    'Verkaufstraining ohne Abschlusstechniken: Fragen, die etwas öffnen, die Pause nach dem Preis aushalten, Einwände als Information behandeln. An zwei echten Gesprächen aus Ihrem Haus.',
};

export default function UnternehmenSelling() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
