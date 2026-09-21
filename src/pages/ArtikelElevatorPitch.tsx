import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Was ist ein Elevator Pitch?"
 *
 * Aus der Fragenerhebung vom 21.09.2026: "was ist elevator pitch", "elevator
 * pitch einfach erklaert", "elevator pitch aufbau", "elevator pitch dauer",
 * "elevator pitch beispiele", "elevator pitch bewerbungsgespraech",
 * "elevator pitch ki". Die Kursseite /elevator-pitch-kurs beantwortet das nur
 * verstreut; eine Definition stand nirgends.
 *
 * Gedanken und Beispiel (Steuerberaterin) stammen von der Kursseite - dieselbe
 * Haltung, damit sich die Seiten nicht widersprechen: Ergebnis statt Beruf,
 * ein Ding statt drei, zwei Laengen (dreissig Sekunden, zwei Minuten).
 *
 * KEINE Studienzahlen. Die Beispiele sind erfunden und als Beispiele erkennbar -
 * keine echten Kunden, keine echten Firmen.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/elevator-pitch',
  bereich: 'Auftritt & Gespräch',
  aktualisiert: '2026-09-21',
  frage: 'Was ist ein Elevator Pitch?',

  kurzantwort:
    'Ein Elevator Pitch ist eine Selbstvorstellung von etwa dreißig Sekunden, nach der Ihr Gegenüber weiß, was Sie für wen bewirken, und weiterfragen möchte. Der Name kommt vom Bild der Fahrstuhlfahrt: so viel Zeit, wie man mit jemandem im Aufzug hat. Ich baue ihn aus drei Teilen. Für wen Sie arbeiten. Welches Ergebnis diese Menschen durch Sie haben. Und ein Satz, der das Gespräch öffnet. Er nennt das Ergebnis, nicht die Berufsbezeichnung, und nur eine Sache, nicht drei.',

  vorspann:
    'Die Frage kommt auf Empfängen, in Vorstellungsrunden, am Messestand: „Und was machen Sie so?" Die meisten antworten mit ihrem Beruf. Gemeint war aber: Warum sollte ich weiterfragen?',

  motiv: 'Später hier: zwei Menschen im Gespräch an einem Stehtisch, von der Seite, einer hört sichtbar zu. Keine erkennbaren Gesichter.',

  abschnitte: [
    {
      titel: 'Wozu man ihn braucht',
      absaetze: [
        'Nicht für den Fahrstuhl. Sie brauchen ihn überall dort, wo jemand früh entscheidet, ob er nachfragt: beim Netzwerken, am Messestand, in der Vorstellungsrunde eines Seminars, am Telefon, im Bewerbungsgespräch, im Profiltext.',
        'Wer seinen Satz nicht festgelegt hat, erfindet ihn in jeder Situation neu und hört sich dabei selbst beim Suchen zu. Das merken alle im Raum.',
      ],
    },
    {
      titel: 'Der Aufbau in drei Teilen',
      absaetze: [
        'Erstens: für wen. „Ich arbeite mit Familienbetrieben." Je genauer die Gruppe, desto eher erkennt sich jemand wieder oder denkt an eine Person, die passt.',
        'Zweitens: das Ergebnis. Nicht, was Sie tun, sondern wie es hinterher ist. „… damit sie ihre Firma an die nächste Generation übergeben können, ohne sich zu zerstreiten."',
        'Drittens: die offene Tür. Ein Satz oder eine Frage, die das Gespräch weitergibt: „Kennen Sie das aus Ihrem Umfeld?" Eine Frage am Ende macht aus der Vorstellung ein Gespräch.',
      ],
    },
    {
      titel: 'Vorher und nachher: drei ausgedachte Beispiele',
      absaetze: [
        'Üblich: „Ich bin Steuerberaterin." Besser: „Ich sorge dafür, dass Familienbetriebe ihre Firma an die nächste Generation übergeben können, ohne sich zu zerstreiten." Warum es wirkt: Der erste Satz nennt die Schublade. Der zweite zeigt ein Bild, und bei einem Bild fragt man nach.',
        'Üblich: „Wir machen Software für Handwerker, also Zeiterfassung, Angebote, Rechnungen und so weiter." Besser: „Handwerksmeister, die mit uns arbeiten, schreiben abends keine Rechnungen mehr." Warum es wirkt: Eine Aufzählung beschreibt den Weg. Der andere will wissen, wie es am Ziel aussieht.',
        'Üblich: „Ich bin Coach, Trainerin und Speakerin und mache außerdem Workshops." Besser: eines davon, passend zu dem Menschen, der gerade vor Ihnen steht. Warum es wirkt: Wer drei Dinge nennt, wird für keines erinnert.',
      ],
    },
    {
      titel: 'Wie lang er sein darf',
      absaetze: [
        'Etwa dreißig Sekunden, das sind ungefähr sechzig bis siebzig gesprochene Wörter. Die kürzeste Form ist ein einziger Satz, wie in den Beispielen oben. Dazu lohnt sich eine zweite Fassung von etwa zwei Minuten für Vorstellungsrunden, in denen ausdrücklich mehr Zeit ist. Der Kern ist in beiden derselbe.',
        'Die kurze Fassung ist die schwerere. Wenn sie steht, ergibt sich die lange fast von selbst.',
      ],
    },
    {
      titel: 'Im Bewerbungsgespräch',
      absaetze: [
        '„Erzählen Sie etwas über sich" ist dieselbe Frage in anderer Kleidung. Auch hier gilt: nicht den Lebenslauf nacherzählen, den hat Ihr Gegenüber vor sich. Sagen Sie, was Sie können, woran man das sieht, und warum es zu genau dieser Stelle passt. Drei Sätze, dann eine Pause.',
      ],
    },
    {
      titel: 'Mit KI schreiben lassen?',
      absaetze: [
        'Für Varianten und zum Kürzen ist sie brauchbar. Als Verfasserin taugt sie nicht, aus einem einfachen Grund: Ein Satz, den jemand anderes für Sie schreibt, klingt nicht nach Ihnen. Sie merken das beim Sprechen, und Ihr Gegenüber merkt es auch. Schreiben Sie den ersten Entwurf selbst und sprechen Sie ihn laut. Was beim Sprechen stolpert, fliegt raus.',
      ],
    },
    {
      titel: 'Wie er sitzt',
      absaetze: [
        'Nicht durch Auswendiglernen, sondern durch Benutzen. Ein Satz braucht zehn bis zwanzig echte Situationen, bis er sich nicht mehr wie ein Text anfühlt. Achten Sie dabei auf eine einzige Sache: Fragt der andere nach? Wenn ja, stimmt der Satz. Wenn nicht, stimmt meist das Ergebnis noch nicht, das Sie nennen.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Was ist ein Elevator Pitch, einfach erklärt?',
      antwort:
        'Ein Elevator Pitch ist eine Selbstvorstellung von etwa dreißig Sekunden, nach der Ihr Gegenüber weiß, was Sie für wen bewirken, und weiterfragen möchte. Der Name kommt vom Bild der Fahrstuhlfahrt: so viel Zeit, wie man mit jemandem im Aufzug hat.',
    },
    {
      frage: 'Wie ist ein Elevator Pitch aufgebaut?',
      antwort:
        'In drei Teilen: für wen Sie arbeiten, welches Ergebnis diese Menschen durch Sie haben, und ein Satz oder eine Frage, die das Gespräch öffnet. Das Ergebnis steht im Mittelpunkt, nicht die Berufsbezeichnung und nicht die Methode.',
    },
    {
      frage: 'Wie lange dauert ein Elevator Pitch?',
      antwort:
        'Etwa dreißig Sekunden, also ungefähr sechzig bis siebzig gesprochene Wörter. Für Vorstellungsrunden mit mehr Zeit lohnt sich eine zweite Fassung von etwa zwei Minuten mit demselben Kern.',
    },
    {
      frage: 'Haben Sie ein Beispiel für einen Elevator Pitch?',
      antwort:
        'Statt „Ich bin Steuerberaterin": „Ich sorge dafür, dass Familienbetriebe ihre Firma an die nächste Generation übergeben können, ohne sich zu zerstreiten. Kennen Sie das aus Ihrem Umfeld?" Der Satz nennt die Gruppe, das Ergebnis und öffnet das Gespräch.',
    },
    {
      frage: 'Wie nutze ich den Elevator Pitch im Bewerbungsgespräch?',
      antwort:
        'Als Antwort auf „Erzählen Sie etwas über sich". Nicht den Lebenslauf wiederholen, sondern in drei Sätzen sagen, was Sie können, woran man das sieht und warum es zu dieser Stelle passt. Dann eine Pause lassen.',
    },
    {
      frage: 'Ich mache mehrere Dinge. Welches nenne ich?',
      antwort:
        'Eines. Nicht für immer, aber in diesem Satz. Wer drei Dinge nennt, wird für keines erinnert. Welches es wird, hängt davon ab, wen Sie gerade vor sich haben.',
    },
  ],

  weiter: {
    text: 'Wenn Sie Ihren Satz nicht allein suchen wollen: Im Elevator-Pitch-Kurs stelle ich die Fragen, Sie formulieren, und wir schleifen gemeinsam.',
    knopf: 'Zum Elevator-Pitch-Kurs',
    ziel: '/elevator-pitch-kurs',
  },

  seoText:
    'Elevator Pitch einfach erklärt: Definition, Aufbau in drei Teilen, Länge, Beispiele im Vorher-Nachher, Einsatz im Bewerbungsgespräch und was KI dabei kann.',
};

export default function ArtikelElevatorPitch() {
  return <ArtikelSeite inhalt={INHALT} />;
}
