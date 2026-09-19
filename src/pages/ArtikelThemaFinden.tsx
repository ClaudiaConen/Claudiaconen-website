import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Wie finde ich mein Thema als Speaker?"
 *
 * Von Claudia am 19.09.2026 benannt, und von allen Artikeln der mit dem
 * direktesten Geldbezug: Der Sprung von der ersten in die zweite
 * Honorarstufe (500 bis 2.000 gegenueber 3.000 bis 8.000 Euro) passiert
 * nicht durch einen besseren Vortrag, sondern dadurch, dass ein
 * Veranstalter in einem Satz sagen kann, wofuer er anruft.
 *
 * Zugleich ist es der erste Schluessel ihrer eigenen Methode - Klarheit.
 * Der Artikel ist deshalb die inhaltliche Eingangstuer zur
 * Speaker-Ausbildung, ohne dass er verkauft.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/thema-finden-speaker',
  bereich: 'Bühne & Vortrag',
  aktualisiert: '2026-09-19',
  frage: 'Wie finde ich mein Thema als Speaker?',

  kurzantwort:
    'Nicht durch Nachdenken, sondern durch Rückwärtsgehen. Schauen Sie auf die letzten drei Jahre: Welche Frage haben Menschen Ihnen immer wieder gestellt? Wobei sind Sie um Rat gefragt worden, ohne sich anzubieten? Ihr Thema ist selten das, worin Sie am besten sind — es ist das, wofür man Sie ohnehin schon holt. Ein Fachgebiet beantwortet, was Sie können. Ein Thema beantwortet, warum jemand ausgerechnet Sie anruft.',

  vorspann:
    'Die meisten suchen ihr Thema in dem, was sie gelernt haben. Es liegt fast immer in dem, was andere an ihnen bemerkt haben.',

  motiv: 'Später hier: Claudia im Gespräch mit einer Teilnehmerin, nah, konzentriert.',

  abschnitte: [
    {
      titel: 'Warum ein Fachgebiet kein Thema ist',
      absaetze: [
        '„Ich spreche über Kommunikation." „Mein Thema ist Führung." „Ich mache etwas mit Digitalisierung." Das sind Fachgebiete. Sie beantworten, in welcher Schublade jemand liegt.',
        'Ein Veranstalter braucht aber etwas anderes: einen Satz, mit dem er Sie ankündigen kann, und einen Grund, warum die Leute sitzen bleiben. „Kommunikation" ist kein Grund.',
        'Das ist nicht nur ein Formulierungsproblem. Im deutschen Markt liegen Einsteiger und lokale Anlässe bei 500 bis 2.000 Euro je Vortrag, etablierte Fachspeaker bei 3.000 bis 8.000. Der Sprung dazwischen passiert selten durch einen besseren Vortrag. Er passiert, wenn der Kaufgrund benannt ist.',
      ],
    },
    {
      titel: 'Rückwärts suchen, nicht vorwärts',
      absaetze: [
        'Die übliche Methode ist, sich hinzusetzen und zu überlegen, wofür man stehen möchte. Das führt zu Themen, die gut klingen und niemandem gehören.',
        'Der bessere Weg geht rückwärts. Nehmen Sie sich die letzten zwei bis drei Jahre vor und beantworten Sie vier Fragen — schriftlich, nicht im Kopf:',
        '**Welche Frage haben Menschen Ihnen mehr als dreimal gestellt?** Nicht, welche Sie beantworten könnten. Welche tatsächlich kam.',
        '**Wobei sind Sie um Rat gefragt worden, ohne sich angeboten zu haben?** Das ist der ehrlichste Hinweis, den es gibt — jemand hat bei Ihnen etwas vermutet, ohne dass Sie es bewerben mussten.',
        '**Worüber regen Sie sich zuverlässig auf?** Ärger ist ein Kompass. Wer sich über etwas ärgert, hat eine Haltung dazu — und Haltung ist die halbe Miete.',
        '**Was haben Sie erlebt, das die meisten nicht erlebt haben?** Nicht spektakulär, sondern anders. Ihre Biografie ist der einzige Teil Ihres Angebots, den niemand kopieren kann.',
      ],
    },
    {
      titel: 'Der Test, der über das Thema entscheidet',
      absaetze: [
        'Wenn Sie einen Kandidaten haben, prüfen Sie ihn mit einer einzigen Frage: **Kann ein Veranstalter Ihr Thema in einem Satz weitererzählen, nachdem er ihn einmal gehört hat?**',
        'Nicht wiederholen — weitererzählen. In eigenen Worten, am Telefon, gegenüber jemandem, der Sie nicht kennt. Wenn er dafür zweimal ansetzen muss, ist das Thema noch zu weit.',
        'Der zweite Test ist unbequemer: **Gibt es Menschen, für die Ihr Thema ausdrücklich nicht ist?** Ein Thema, das für alle passt, holt niemanden. Wer keine Gruppe ausschließt, hat keine gewählt.',
      ],
    },
    {
      titel: 'Was passiert, wenn das Thema steht',
      absaetze: [
        'Drei Dinge werden leichter, und zwar sofort.',
        'Die Ansprache von Veranstaltern, weil es etwas zu sagen gibt außer „Ich halte Vorträge". Die Vorbereitung, weil nicht mehr jeder Auftritt neu erfunden wird. Und die Wiederbuchung, weil Menschen im Saal etwas mitnehmen, das sie weitererzählen können.',
        'Und ein viertes, das selten genannt wird: Absagen werden leichter. Wer sein Thema kennt, kann Anfragen ablehnen, die nicht passen — und genau diese Fähigkeit macht am Markt den Unterschied zwischen jemandem, der Vorträge hält, und jemandem, der gebucht wird.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Ich habe mehrere Themen. Muss ich mich entscheiden?',
      antwort:
        'Für den einen Satz ja, für Ihr Leben nein. Sie dürfen über vieles sprechen — aber angekündigt werden Sie mit einem. Wer drei Themen nennt, wird für keines erinnert. Die anderen bleiben, sie stehen nur nicht im Schaufenster.',
    },
    {
      frage: 'Was, wenn mein Thema schon besetzt ist?',
      antwort:
        'Themen sind nie besetzt, Zugänge schon. Über Führung sprechen Hunderte. Über Führung aus Sicht von jemandem, der zwanzig Jahre in der Pflege gearbeitet hat, spricht eine. Der Zugang ist Ihre Biografie, und die ist unbesetzt.',
    },
    {
      frage: 'Wie lange dauert es, ein Thema zu finden?',
      antwort:
        'Der Kandidat oft ein Gespräch, die Formulierung Wochen. Der häufigste Fehler ist, zu früh aufzuhören — beim erstbesten Satz, der akzeptabel klingt. Ein Thema ist fertig, wenn Sie es dreimal fremden Menschen gesagt haben und keiner nachfragen musste, wie das gemeint ist.',
    },
    {
      frage: 'Brauche ich Fachwissen, das andere nicht haben?',
      antwort:
        'Seltener, als man denkt. Die meisten erfolgreichen Vortragenden wissen nicht mehr als ihre Zuhörenden — sie haben es nur geordnet und können es erzählen. Was Sie brauchen, ist ein Blickwinkel, keine Wissenslücke bei den anderen.',
    },
    {
      frage: 'Kann sich mein Thema später ändern?',
      antwort:
        'Ja, und es sollte sich entwickeln. Aber es ändert sich durch Auftritte, nicht durch Nachdenken. Nehmen Sie das erste Thema als Arbeitsfassung und lassen Sie es sich im Saal korrigieren.',
    },
  ],

  quiz: [
    {
      frage: 'Wo liegt Ihr Thema am wahrscheinlichsten?',
      antworten: [
        {
          text: 'In dem, worin Sie am besten sind.',
          warum: 'Naheliegend, führt aber oft in die Irre. Worin man gut ist, merkt man selbst — worum man gefragt wird, merken andere. Das zweite ist der verlässlichere Hinweis.',
        },
        {
          text: 'In dem, wofür man Sie ohnehin schon holt.',
          richtig: true,
          warum: 'Wenn jemand Sie um Rat fragt, ohne dass Sie sich angeboten haben, hat er etwas bei Ihnen vermutet. Das ist Marktforschung, die schon stattgefunden hat.',
        },
        {
          text: 'In dem, was gerade gefragt ist.',
          warum: 'Das führt zu Themen, die aktuell sind und Ihnen nicht gehören. Sie merken es spätestens, wenn Sie nach dem dritten Vortrag keine Lust mehr haben.',
        },
      ],
    },
    {
      frage: 'Ein Veranstalter hat Ihr Thema gehört. Was muss er können?',
      antworten: [
        {
          text: 'Es wörtlich wiederholen.',
          warum: 'Das kann er auch bei einem Satz, den er nicht verstanden hat. Wiederholen ist Gedächtnis, nicht Verständnis.',
        },
        {
          text: 'Es in eigenen Worten weitererzählen.',
          richtig: true,
          warum: 'Das ist der eigentliche Test. Wer etwas in eigenen Worten weitergeben kann, hat es verstanden — und genau das passiert im Entscheidungsgremium, wenn Sie nicht im Raum sind.',
        },
        {
          text: 'Es einordnen können in eine Kategorie.',
          warum: 'Kategorien hat er genug. Was ihm fehlt, ist ein Grund, warum ausgerechnet Sie.',
        },
      ],
    },
    {
      frage: 'Ihr Thema passt für alle. Was bedeutet das?',
      antworten: [
        {
          text: 'Sehr gut — größerer Markt.',
          warum: 'Der Gedanke ist verständlich und kostet regelmäßig Aufträge. Wer für alle spricht, gibt niemandem das Gefühl, gemeint zu sein.',
        },
        {
          text: 'Es ist noch nicht fertig.',
          richtig: true,
          warum: 'Ein Thema, das keine Gruppe ausschließt, hat keine gewählt. Die unbequeme Übung: Sagen Sie laut, für wen Ihr Thema ausdrücklich nicht ist.',
        },
        {
          text: 'Kommt auf die Branche an.',
          warum: 'Auf die Branche kommt der Zugang an, nicht die Schärfe. Auch ein sehr breites Feld braucht einen engen Einstieg.',
        },
      ],
    },
  ],

  weiter: {
    text: 'Wenn Sie Ihr Thema nicht allein finden wollen: Genau dort fange ich an, und das Vorgespräch kostet nichts.',
    knopf: 'Vorgespräch vereinbaren',
    ziel: '/termin-buchen',
  },

  seoText:
    'Wie Sie Ihr Thema als Speaker finden: rückwärts suchen statt nachdenken, vier Fragen, zwei Tests — und warum ein Fachgebiet kein Thema ist.',
};

export default function ArtikelThemaFinden() {
  return <ArtikelSeite inhalt={INHALT} />;
}
