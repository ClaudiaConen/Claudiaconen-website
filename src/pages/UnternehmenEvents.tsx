import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Interne Events & Moderation.
 *
 * Die alte Fassung nannte fünf Leistungen, darunter eine, die sonst
 * nirgends auf der Seite vorkommt und ungewöhnlich genug ist, um sie
 * zu behalten: Firewalk-Begleitung. So etwas erfindet man nicht - es
 * stand dort, weil sie es kann.
 *
 * Ebenfalls aus der alten Fassung, weil es ihre eigenen Sätze sind und
 * beobachtbar statt behauptet: "Meine Stimme trägt - auch bei großen
 * Veranstaltungen ohne Technik."
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/unternehmen-events',
  wer: 'Für Unternehmen',
  frage: 'Wer hält den Tag zusammen, wenn das Programm kippt?',
  vorspann:
    'Eine Firmenveranstaltung besteht zur Hälfte aus dem, was geplant ist, und zur Hälfte aus dem, was dazwischen passiert: Der Redner überzieht, die Technik streikt, eine Frage aus dem Publikum trifft einen wunden Punkt. Moderation ist die Arbeit an dieser zweiten Hälfte.',

  problemTitel: 'Was eine Moderation von einer Ansage unterscheidet',
  problemAbsaetze: [
    'Viele Veranstaltungen werden angesagt, nicht moderiert: Jemand nennt den nächsten Programmpunkt und dankt für den Applaus. Das funktioniert, solange nichts dazwischenkommt.',
    'Kommt etwas dazwischen — und es kommt immer etwas dazwischen — braucht der Raum jemanden, der ihn hält. Nicht mit einem Witz, sondern damit, dass er die Lage benennt und den Faden wieder aufnimmt.',
    'Und es gibt den Moment, in dem die Stimmung nach der Mittagspause weg ist. Den kann man nicht ansagen. Den muss jemand merken.',
  ],

  angebotName: 'Moderation Ihrer Veranstaltung',
  angebotZeile: 'Jahresauftakt, Kickoff, Jubiläum, Preisverleihung, Mitarbeiterversammlung',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt von Dauer, Ort und Vorbereitung ab — ein halber Tag im Haus ist etwas anderes als zwei Tage mit Abendprogramm. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Vorbereitung mit Ihnen: Ich will wissen, worum es wirklich geht — auch das, was nicht ins Programm geschrieben wird.',
    'Führung durch den Tag, einschließlich der Stellen, an denen der Plan nicht hält.',
    'Übergänge, die etwas verbinden, statt nur den nächsten Namen zu nennen.',
    'Podiumsgespräche, bei denen auch die Stillen zu Wort kommen.',
    'Impulse und Kickoff-Beiträge, wenn der Tag einen Anfang braucht.',
    'Firewalk-Begleitung, wenn Sie etwas planen, das über Reden hinausgeht.',
  ],

  ablaufTitel: 'Wie die Zusammenarbeit läuft',
  ablauf: [
    { schritt: 'Erstes Gespräch', text: 'Was ist der Anlass, und was soll danach anders sein? Diese zweite Frage wird selten gestellt und entscheidet den ganzen Tag.' },
    { schritt: 'Vorbereitung', text: 'Ablauf durchgehen, Namen lernen, mit den Vortragenden sprechen. Ich will wissen, wer vor mir auf der Bühne steht und was er vorhat.' },
    { schritt: 'Am Tag selbst', text: 'Vor Ort, bevor die ersten Gäste kommen. Technik prüfen, Raum ansehen, die Stellen suchen, an denen es eng wird.' },
    { schritt: 'Während der Veranstaltung', text: 'Führen, Übergänge setzen, Zeit halten. Und eingreifen, wenn es nötig ist — das ist der Teil, für den man jemanden bucht.' },
    { schritt: 'Danach', text: 'Kurze Rückmeldung: Was hat getragen, was nicht. Für das nächste Mal ist das mehr wert als ein Dankesschreiben.' },
  ],

  fragen: [
    {
      frage: 'Wie früh sollte man anfragen?',
      antwort:
        'Für einen festen Termin drei bis sechs Monate vorher, für Jahresauftakte eher früher — Januar ist voll. Kurzfristig geht manchmal auch; fragen Sie einfach, dann sage ich Ihnen ehrlich, ob die Vorbereitung noch reicht.',
    },
    {
      frage: 'Was brauchen Sie an Technik?',
      antwort:
        'Ein Handmikrofon reicht, lieber wäre mir ein Ansteckmikrofon, damit die Hände frei sind. In kleineren Räumen geht es auch ohne — meine Stimme trägt, das ist mein Beruf. Was ich brauche, ist ein Blick auf die Uhr und eine Absprache mit der Technik vorher.',
    },
    {
      frage: 'Moderieren Sie auch, wenn es unangenehm wird?',
      antwort:
        'Ja, und dafür wird man gebucht. Stellenabbau, ein Wechsel in der Geschäftsführung, eine Zahl, die niemand hören will: Solche Tage brauchen jemanden, der die Lage benennt, statt sie zu überspielen. Sagen Sie mir vorher, was ansteht.',
    },
    {
      frage: 'Können Sie auch einen Vortrag halten und moderieren?',
      antwort:
        'Ja, und es spart Ihnen eine Person. Sinnvoll ist es, wenn der Vortrag früh liegt — danach bin ich für den Rest des Tages die Moderatorin, und das trägt besser als umgekehrt.',
    },
    {
      frage: 'Was ist Firewalk-Begleitung?',
      antwort:
        'Das Gehen über glühende Kohlen, begleitet und abgesichert. Es steht hier, weil ich es kann und es gelegentlich nachgefragt wird — nicht, weil ich es empfehle. Ob es zu Ihrer Veranstaltung passt, klären wir im Gespräch, und meistens ist die Antwort nein.',
    },
    {
      frage: 'Wie halten Sie den Zeitplan, wenn jemand überzieht?',
      antwort:
        'Vorher abgesprochene Zeichen mit den Vortragenden, und wenn das nicht reicht, gehe ich auf die Bühne. Das ist unangenehm für einen Moment und rettet den Nachmittag. Wer das nicht will, sollte mich nicht buchen.',
    },
  ],

  nichtFuer: [
    'Sie brauchen jemanden, der nur Namen ansagt. Das kann jemand aus dem Haus, und es kostet Sie nichts.',
    'Das Programm steht und soll nicht mehr besprochen werden. Ohne Vorbereitung moderiere ich nicht — dann bin ich genauso überrascht wie das Publikum.',
    'Es soll lustig werden. Humor entsteht im Raum oder gar nicht; angekündigter Humor ist keiner.',
    'Die unangenehme Nachricht soll nicht vorkommen. Wenn alle sie kennen und niemand sie ausspricht, merkt das jeder — und der ganze Tag wirkt unecht.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Sagen Sie mir Datum, Anlass und die Zahl der Gäste. Ich melde mich mit einer ehrlichen Einschätzung, ob ich die richtige bin — und wenn nicht, nenne ich Ihnen jemanden.',
  schrittKnopf: 'Termin anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Für Unternehmen', ziel: '/unternehmen-keynotes' }, { name: 'Interne Events & Moderation' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Claudia mit Mikrofon auf einer Firmenbühne, Saal im Hintergrund' },
    { bereich: 'Beim Ablauf', motiv: 'Podiumsgespräch, vier Stühle, Claudia am Rand' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Saal von hinten, volle Stuhlreihen, Bühne im Licht' },
  ],

  weitere: [
    { titel: 'Keynote für Ihr Unternehmen', text: 'Wenn es einen Vortrag braucht und keine Moderation.', ziel: '/unternehmen-keynotes' },
    { titel: 'Führung & Kommunikation', text: 'Für die Zeit zwischen den Veranstaltungen.', ziel: '/unternehmen-leadership' },
    { titel: 'Claudia als Rednerin', text: 'Auch für Anlässe außerhalb der Firma.', ziel: '/freie-rednerin' },
  ],

  seoTitel: 'Moderation für Firmenveranstaltungen und interne Events | Claudia Conen',
  seoText:
    'Moderation für Jahresauftakt, Kickoff, Jubiläum und Mitarbeiterversammlung — einschließlich der Stellen, an denen das Programm kippt. Mit Vorbereitung, nicht nur Ansagen.',
};

export default function UnternehmenEvents() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
