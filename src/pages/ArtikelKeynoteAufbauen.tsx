import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie baue ich eine Keynote auf?"
 *
 * Erste der Unterseiten, die Claudia am 19.09.2026 vorgeschlagen hat: statt
 * alles auf eine lange Seite zu packen, je eine Seite fuer je eine Frage.
 * Ihr Argument war die Ladezeit, das bessere ist die Auffindbarkeit - eine
 * lange Seite konkurriert mit sich selbst.
 *
 * Das Material stammt aus ihren Workbooks. Beim Uebertragen fallen die drei
 * unbelegten Zahlen weg (180 Millisekunden, 70.000 Einzelinformationen,
 * 500 bis 700 Millisekunden) und die Zuschreibung an Karsten Brocke, den
 * ihr eigenes Produktdokument ausdruecklich nicht mehr genannt haben will.
 *
 * Wo die fruehe emotionale Verarbeitung vorkommt, steht die belegbare
 * Fassung, auf die sich Claudia am 19.09.2026 festgelegt hat: "etwa ein-
 * bis zweihundert Millisekunden".
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/keynote-aufbauen',
  bereich: 'Bühne & Vortrag',
  aktualisiert: '2026-09-19',
  frage: 'Wie baue ich eine Keynote auf?',

  kurzantwort:
    'In vier Teilen: ein Einstieg, der mitten in eine Szene fällt statt sich vorzustellen. Ein Bruch, an dem klar wird, warum es nicht so weitergeht. Ein Mittelteil mit höchstens drei Gedanken. Und ein Schluss, der einen Satz hinterlässt, den jemand weitererzählen kann. Wer mehr als drei Gedanken unterbringt, hinterlässt keinen.',

  vorspann:
    'Die meisten Keynotes scheitern nicht am Inhalt. Sie scheitern daran, dass der Inhalt in der Reihenfolge erzählt wird, in der er entstanden ist — und nicht in der, in der ihn jemand hören will.',

  motiv: 'Später hier: Claudia auf der Bühne, Publikum im Bild, Querformat.',

  abschnitte: [
    {
      titel: 'Der Einstieg: mitten hinein, nicht davor',
      absaetze: [
        'Die häufigste Eröffnung im deutschsprachigen Raum lautet sinngemäß: „Vielen Dank für die Einladung, mein Name ist, ich beschäftige mich seit soundso vielen Jahren mit." In diesen zwanzig Sekunden entscheidet sich mehr, als den meisten bewusst ist — denn es ist exakt die Eröffnung, die alle anderen auch benutzen.',
        'Die Alternative ist keine Show. Sie ist eine Szene: ein Ort, eine Uhrzeit, ein Satz, den jemand gesagt hat. „Es ist Dienstagmorgen, halb neun, und der Vertriebsleiter sagt zu mir: Unsere Leute können das alles, sie sagen es nur nicht." Danach darf die Begrüßung kommen. Sie wird dann sogar gehört.',
        'Der Grund ist einfach: Ein Publikum entscheidet früh, ob es zuhört — früher, als der Verstand mitkommt. Emotionale Reize verarbeitet das Gehirn in etwa ein- bis zweihundert Millisekunden. Was daraus wird, entscheidet sich langsamer. Aber die Tür geht in den ersten Sätzen auf oder zu.',
      ],
    },
    {
      titel: 'Der Bruch: warum es nicht so weitergeht',
      absaetze: [
        'Nach der Szene braucht es einen Moment, an dem klar wird, dass das Bekannte nicht mehr reicht. Ohne diesen Bruch ist ein Vortrag eine freundliche Bestätigung — und Bestätigung merkt sich niemand.',
        'Der Bruch darf unbequem sein, aber er darf niemandem im Saal die Schuld geben. „Sie machen das falsch" schließt zu. „Das hat funktioniert, solange es funktioniert hat" öffnet.',
      ],
    },
    {
      titel: 'Der Mittelteil: höchstens drei Gedanken',
      absaetze: [
        'Die Versuchung ist immer dieselbe: Man weiß viel und will zeigen, dass man viel weiß. Das Ergebnis sind sieben Punkte, von denen keiner bleibt.',
        'Drei Gedanken sind die Obergrenze für einen Vortrag von dreißig bis sechzig Minuten. Jeder Gedanke braucht eine eigene Szene, sonst bleibt er eine Behauptung. Und jeder Gedanke braucht einen Satz, der ihn zusammenfasst — den Satz, den jemand mitschreibt.',
        'Eine gute Probe: Erzählen Sie Ihren Vortrag jemandem in drei Minuten. Was dabei wegfällt, war nie tragend.',
      ],
    },
    {
      titel: 'Der Schluss: ein Satz, kein Dank',
      absaetze: [
        'Die meisten Vorträge enden mit „Vielen Dank für Ihre Aufmerksamkeit". Das ist höflich und verschenkt den wertvollsten Moment des Abends: den letzten.',
        'Was dort hingehört, ist der Satz, den jemand in der Kaffeepause weitererzählt. Er muss kurz sein, er darf zugespitzt sein, und er sollte zu der Szene vom Anfang zurückführen. Ein Vortrag, der sich schließt, wirkt zu Ende gedacht — auch wenn er es nicht ist.',
      ],
    },
    {
      titel: 'Was danach kommt',
      absaetze: [
        'Eine Keynote ist fertig, wenn sie gesprochen ist, nicht wenn sie geschrieben ist. Der Unterschied zwischen beidem ist größer, als man beim Schreiben glaubt: Sätze, die auf Papier gut aussehen, stolpern im Mund.',
        'Deshalb gehört zum Aufbau ein Schritt, den fast alle auslassen: laut sprechen, aufnehmen, anhören. Die Stellen, an denen Sie selbst beim Zuhören abschalten, sind die Stellen, an denen ein Saal es auch tut.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wie lang sollte eine Keynote sein?',
      antwort:
        'Üblich sind dreißig bis sechzig Minuten. Vierzig ist oft die beste Länge: lang genug für drei Gedanken, kurz genug, dass niemand auf die Uhr schaut. Was die Länge nicht rettet, ist fehlende Struktur — eine schlecht gebaute halbe Stunde ist länger als eine gut gebaute volle.',
    },
    {
      frage: 'Brauche ich Folien?',
      antwort:
        'Nein. Wenn Sie welche benutzen, gilt eine Regel: Die Folie zeigt, was man nicht sagen kann — ein Bild, eine Zahl, eine Gegenüberstellung. Alles, was Sie ohnehin sagen, gehört nicht auf die Folie. Text auf der Leinwand wird gelesen, nicht gehört, und Sie verlieren den Saal an die Wand hinter Ihnen.',
    },
    {
      frage: 'Wie fange ich an, wenn ich noch nie eine Keynote gehalten habe?',
      antwort:
        'Nicht mit dem Aufbau, sondern mit dem Thema. Ein Fachgebiet beantwortet, was Sie können. Ein Thema beantwortet, warum jemand ausgerechnet Sie einlädt. Solange das nicht steht, ist jeder Aufbau nur Umsortieren.',
    },
    {
      frage: 'Soll ich die Keynote auswendig lernen?',
      antwort:
        'Den Einstieg und den Schlusssatz ja, alles dazwischen nicht. Ein auswendig gelernter Mittelteil klingt wie aufgesagt, und wenn man einmal herausfällt, findet man nicht zurück. Merken Sie sich die drei Gedanken und ihre Szenen — die Sätze entstehen dann von selbst.',
    },
    {
      frage: 'Was, wenn niemand lacht oder reagiert?',
      antwort:
        'Das ist normaler, als es sich anfühlt. Ein Publikum, das konzentriert zuhört, sieht ernst aus. Gefährlich sind nicht ernste Gesichter, sondern Telefone. Wenn die Telefone hochkommen, haben Sie den Bruch nicht gesetzt oder zu viele Gedanken aufgemacht.',
    },
  ],

  weiter: {
    text: 'Wenn Sie an Ihrer eigenen Keynote arbeiten wollen, statt nur darüber zu lesen: Im Workshop bringen Sie Ihre Rede mit und sprechen sie mehrfach.',
    knopf: 'Zum Workshop',
    ziel: '/redner-ausbildungen',
  },

  seoText:
    'Eine Keynote aufbauen: Einstieg als Szene, Bruch, höchstens drei Gedanken, ein Schlusssatz zum Weitererzählen. Mit den Fragen, die Einsteiger wirklich stellen.',
};

export default function ArtikelKeynoteAufbauen() {
  return <ArtikelSeite inhalt={INHALT} />;
}
