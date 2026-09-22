import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Voice-Over und Podcast.
 *
 * Vorher 1.128 Zeichen, sechs Stichpunkte, kein einziges Wort darüber,
 * wie eine Aufnahme abläuft oder was sie kostet.
 *
 * Die Leistungen stammen aus der alten Fassung und sind ihre eigenen:
 * Podcast-Trailer, Imagefilm, E-Learning, Werbung, Hörbuch, dazu das
 * eigene Studio. Nur ausformuliert statt aufgezählt.
 *
 * Im Shop steht dazu ein konkretes Produkt: "Professionell
 * eingesprochene Werbung (wahlweise 30, 60 oder 90 Sekunden)" für
 * 279 Euro. Deshalb steht hier KEIN Preis - solange nicht geklärt ist,
 * welcher Preis öffentlich gilt, wäre eine zweite Zahl eine dritte
 * Wahrheit. Das ist ausdrücklich vermerkt, damit es nicht vergessen
 * wird.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/stimme-voiceover',
  wer: 'Die Stimme für Ihre Botschaft',
  frage: 'Sie haben den Text. Wer spricht ihn?',
  vorspann:
    'Ein guter Text, falsch gesprochen, klingt wie Werbung. Derselbe Text, richtig gesprochen, klingt wie jemand, der weiß, wovon er redet. Der Unterschied liegt nicht in der Stimme, sondern darin, ob jemand verstanden hat, was der Satz tun soll.',

  problemTitel: 'Woran man eine schlechte Aufnahme erkennt',
  problemAbsaetze: [
    'Sie klingt gleichmäßig. Jeder Satz hat dieselbe Betonung, dieselbe Geschwindigkeit, dasselbe Lächeln. Das ist der Klang von jemandem, der den Text vorliest, statt ihn zu meinen.',
    'Und sie hat keine Pausen. Wer im Studio steht und die Uhr im Kopf hat, spricht durch. Dabei ist die Pause das Einzige, was dem Zuhörer Zeit gibt, dem Gesagten zuzustimmen.',
    'Beides hört man sofort und kann es nicht benennen. Man denkt nur: klingt nach Werbung. Und schaltet weg.',
  ],

  angebotName: 'Aufnahme mit meiner Stimme',
  angebotZeile: 'Podcast, Imagefilm, Kurs, Werbung, Telefonansage, Hörbuch',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Der Preis hängt an der Länge, an der Nutzung und daran, ob eine Sprecherfassung reicht oder mehrere. Sie bekommen ihn vor der Aufnahme, schriftlich.',
  angebotPunkte: [
    'Eigenes Studio, keine Miete, keine Terminkette. Kurzfristiges geht meistens.',
    'Ich lese den Text vorher und frage nach, wenn ein Satz nicht trägt — das ist oft der eigentliche Gewinn.',
    'Zwei bis drei Fassungen zur Auswahl: sachlich, wärmer, schneller. Sie hören den Unterschied und entscheiden.',
    'Lieferung im gewünschten Format, geschnitten und ausgesteuert.',
    'Korrekturschleife inbegriffen, solange es um dieselbe Aufnahme geht.',
    'Auf Wunsch Regie, wenn jemand anderes spricht — auch das ist eine Leistung.',
  ],

  ablaufTitel: 'Wie eine Aufnahme abläuft',
  ablauf: [
    { schritt: 'Text und Zweck', text: 'Sie schicken den Text und sagen, wo er läuft. Ein Satz für einen Messefilm wird anders gesprochen als derselbe Satz in einem Kurs.' },
    { schritt: 'Rückfragen', text: 'Ich melde mich, wenn eine Stelle beim Sprechen nicht funktioniert. Das kostet Sie zehn Minuten und rettet die Aufnahme.' },
    { schritt: 'Aufnahme', text: 'Meist am selben oder nächsten Tag. Ich nehme mehrere Fassungen auf, nicht eine perfekte.' },
    { schritt: 'Auswahl', text: 'Sie hören die Fassungen und sagen, welche. Oder: „Die zweite, aber langsamer" — dann nehme ich das nach.' },
    { schritt: 'Lieferung', text: 'Geschnitten, ausgesteuert, im Format Ihrer Wahl. Mit Nutzungsrecht für den vereinbarten Zweck.' },
  ],

  fragen: [
    {
      frage: 'Wie schnell geht es?',
      antwort:
        'Kurze Texte bis etwa drei Minuten meist innerhalb eines Werktags nach der Freigabe. Längeres, etwa ein Kurs mit vielen Modulen, braucht ein paar Tage — nicht wegen der Aufnahme, sondern wegen der Abstimmung.',
    },
    {
      frage: 'Was ist mit den Nutzungsrechten?',
      antwort:
        'Die werden vorher festgelegt und stehen im Angebot: wofür, wo und wie lange. Eine Aufnahme für einen internen Kurs ist etwas anderes als eine für einen Fernsehspot, und der Preis unterscheidet sich entsprechend.',
    },
    {
      frage: 'Können Sie auch in einem bestimmten Tonfall sprechen?',
      antwort:
        'Ja, und dafür sind die mehreren Fassungen da. Sagen Sie mir lieber, was der Text bewirken soll, als welchen Tonfall Sie sich vorstellen — „Die Leute sollen sich trauen anzurufen" führt zu einer besseren Aufnahme als „bitte freundlich".',
    },
    {
      frage: 'Übernehmen Sie auch die Regie, wenn jemand anderes spricht?',
      antwort:
        'Ja. Manchmal ist es besser, wenn die Geschäftsführerin selbst spricht — dann übernehme ich die Regie und sorge dafür, dass es nicht nach Vorlesen klingt. Das ist oft die wirkungsvollere Lösung.',
    },
    {
      frage: 'Was, wenn mir das Ergebnis nicht gefällt?',
      antwort:
        'Eine Korrekturschleife ist inbegriffen, solange es um dieselbe Aufnahme geht. Wird der Text inhaltlich geändert, ist es eine neue Aufnahme — das sage ich vorher, damit es hinterher keine Diskussion gibt.',
    },
    {
      frage: 'Warum nicht einfach eine KI-Stimme?',
      antwort:
        'Für eine Telefonansage oder einen Zwischentext kann das reichen, und es ist billiger. Was eine KI-Stimme nicht kann, ist auf die Bedeutung reagieren — sie betont, was nach Regel betont wird, nicht, was in diesem Satz wichtig ist. Wenn es darauf nicht ankommt, nehmen Sie die KI. Ich sage Ihnen das auch, wenn Sie mich fragen.',
    },
  ],

  // Claudias Ja vom 22.09.2026 ("ja bitte ..."). Saetze woertlich aus seinem Video, dieselben wie auf der Startseite.
  kundenstimme: {
    titel: 'Die Stimme am Telefon von Kloster Kitchen',
    name: 'Mario Fürst',
    rolle: 'Gründer von Kloster Kitchen',
    saetze: [
      'Wir wollten einen extrem guten Text besprochen auf unserem normalen Anrufbeantworter und auf anderen Medien nutzen.',
      'Die Zusammenarbeit war echt gut und sehr harmonisch und hat auch sehr viel Spaß gemacht.',
      'Ich kann nur die Zusammenarbeit mit Claudia wärmstens empfehlen.',
    ],
    video: { quelle: '/kundenstimmen/mario-fuerst.mp4', standbild: '/kundenstimmen/mario-fuerst-video.jpg', breite: 848, hoehe: 472 },
    verweis: { text: 'Mario Fürst bei LinkedIn', ziel: 'https://www.linkedin.com/in/mario-f%C3%BCrst-0b644a208/' },
  },

  nichtFuer: [
    'Es soll möglichst billig sein. Dann ist eine KI-Stimme die richtige Wahl, und ich sage Ihnen das auch.',
    'Der Text steht fest und darf nicht angefasst werden. Ich frage nach, wenn ein Satz beim Sprechen nicht trägt — das ist Teil der Arbeit.',
    'Sie brauchen viele verschiedene Stimmen. Ich bin eine; für ein Hörspiel mit Rollen brauchen Sie ein Studio mit Besetzung.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Schicken Sie mir den Text und sagen Sie, wo er läuft. Sie bekommen eine Einschätzung und den Preis — und wenn eine KI-Stimme für Ihren Zweck reicht, sage ich Ihnen das.',
  schrittKnopf: 'Text schicken',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Freie Rednerin', ziel: '/freie-rednerin' }, { name: 'Voice-Over & Podcast' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Mikrofon im Studio, nah, weiches Licht — Claudia unscharf dahinter' },
    { bereich: 'Beim Ablauf', motiv: 'Blick auf den Bildschirm mit der Tonspur, Hände am Regler' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Claudia mit Kopfhörern, konzentriert, kein Blick in die Kamera' },
  ],

  weitere: [
    { titel: 'Keynote & Eventmoderation', text: 'Wenn eine Stimme den Raum halten soll, nicht nur die Aufnahme.', ziel: '/stimme-keynote' },
    { titel: 'Freie Rednerin', text: 'Alle Anlässe auf einer Seite.', ziel: '/freie-rednerin' },
    { titel: 'Reden auf Social Media', text: 'Wenn Sie selbst vor die Kamera wollen.', ziel: '/speaker-social' },
  ],

  seoTitel: 'Voice-Over Sprecherin für Podcast, Imagefilm und Kurs | Claudia Conen',
  seoText:
    'Professionell eingesprochene Texte für Podcast-Trailer, Imagefilme, E-Learning und Werbung. Eigenes Studio, mehrere Fassungen zur Auswahl, Korrekturschleife inbegriffen.',
};

export default function StimmeVoiceover() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
