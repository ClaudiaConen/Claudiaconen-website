import ArtikelSeite, { ArtikelInhalt } from '../components/ArtikelSeite';

/**
 * "Warum sind Sprechpausen so wichtig?"
 *
 * Claudia am 19.09.2026: "Das Thema Sprechpausen ist mir auch sehr
 * wichtig." Und es ist das Thema, bei dem sie am wenigsten beweisen muss -
 * eine Pause laesst sich in einem Gespraech vorfuehren, und danach ist die
 * Diskussion vorbei.
 *
 * KEINE ERFUNDENEN ZAHLEN. Es gibt Forschung zu Sprechtempo und Wirkung,
 * aber keine belastbare Zahl der Form "eine Pause von X Sekunden erhoeht
 * die Glaubwuerdigkeit um Y Prozent". Der Artikel nennt deshalb Spannen
 * und beobachtbare Wirkungen, keine Messwerte.
 */
const INHALT: ArtikelInhalt = {
  pfad: '/wissen/sprechpausen',
  bereich: 'Stimme & Wirkung',
  aktualisiert: '2026-09-19',
  frage: 'Warum sind Sprechpausen so wichtig?',

  kurzantwort:
    'Weil Zuhören Zeit braucht. Wer ohne Pause spricht, gibt dem Gegenüber keine Gelegenheit, das Gehörte einzuordnen — und was nicht eingeordnet wird, bleibt nicht. Eine Pause nach einem wichtigen Satz wirkt für die Sprecherin endlos und für den Saal souverän. Das ist der größte Wirkungsunterschied, den man ohne jede Vorbereitung erzielen kann, und er kostet nichts außer Mut.',

  vorspann:
    'Die Pause ist das einzige Werkzeug der Rhetorik, das man nicht lernen muss. Man muss es nur aushalten.',

  motiv: 'Später hier: Claudia am Mikrofon, Moment der Stille, Augen geschlossen.',

  abschnitte: [
    {
      titel: 'Was in der Pause passiert',
      absaetze: [
        'Sprechen und Verstehen laufen nicht gleich schnell. Während Sie den nächsten Satz formulieren, ordnet Ihr Gegenüber noch den letzten ein. Wer ohne Unterbrechung weiterspricht, redet über diese Arbeit hinweg.',
        'Das Ergebnis kennt jeder aus eigener Erfahrung: Man hat zugehört, alles verstanden — und kann hinterher nichts wiedergeben. Nicht weil der Inhalt schlecht war, sondern weil nie Zeit war, ihn abzulegen.',
        'Die Pause ist also kein Stilmittel. Sie ist der Moment, in dem beim anderen etwas passiert.',
      ],
    },
    {
      titel: 'Warum sie sich so falsch anfühlt',
      absaetze: [
        'Auf der Bühne dehnt sich Zeit. Drei Sekunden Stille fühlen sich an wie zehn, und der Körper meldet Gefahr: Jetzt denken alle, ich weiß nicht weiter.',
        'Im Saal passiert das Gegenteil. Dort wirkt dieselbe Pause wie Selbstverständlichkeit — als hätte jemand die Ruhe, den Raum stehen zu lassen. Niemand denkt an einen Aussetzer; die Zuhörenden benutzen die Zeit.',
        'Diese Diskrepanz ist der ganze Grund, warum so wenige Menschen Pausen machen. Nicht Unwissen, sondern eine Körperreaktion, die zuverlässig in die falsche Richtung zeigt.',
      ],
    },
    {
      titel: 'Vier Stellen, an denen eine Pause den Unterschied macht',
      absaetze: [
        '**Vor dem ersten Satz.** Hinstellen, Blick in den Raum, atmen, dann anfangen. Die meisten beginnen zu sprechen, während sie noch gehen. Damit verschenken sie den einzigen Moment, in dem ihnen alle ungeteilt zuhören.',
        '**Nach der wichtigsten Aussage.** Der Satz, den man mitnehmen soll, braucht Platz dahinter. Wer sofort weiterspricht, überschreibt ihn.',
        '**Vor einer Antwort.** Zwei Sekunden Nachdenken vor der Antwort auf eine schwierige Frage wirken nicht unsicher, sondern gewissenhaft. Sofortige Antworten klingen vorbereitet — und vorbereitet klingt nach Ausweichen.',
        '**Statt Füllwörtern.** „Äh", „sozusagen", „quasi" sind fast immer gefüllte Pausen. Wer die Pause zulässt, braucht die Wörter nicht. Das ist der schnellste Weg, Füllwörter loszuwerden: nicht sie sich abgewöhnen, sondern das zulassen, was sie ersetzen.',
      ],
    },
    {
      titel: 'Wie man es übt, ohne es zu merken',
      absaetze: [
        'Nehmen Sie zwei Minuten Ihres eigenen Sprechens auf — ein Anruf, eine Sprachnachricht, ein Probevortrag. Hören Sie es ab und zählen Sie die Stellen, an denen Sie Luft geholt haben, ohne dass es eine Pause war.',
        'Dann sprechen Sie dieselben zwei Minuten noch einmal und setzen an drei Stellen bewusst eine Pause. Es wird sich beim Sprechen falsch anfühlen und beim Anhören richtig. Genau diese Diskrepanz ist die Übung.',
        'Nach zwei bis drei Wochen verschiebt sich das Gefühl. Dann fühlen sich die Pausen normal an — und das Sprechen ohne sie gehetzt.',
      ],
    },
  ],

  fragen: [
    {
      frage: 'Wie lang darf eine Pause sein?',
      antwort:
        'Nach einem wichtigen Satz zwei bis drei Sekunden, vor dem Anfang etwas länger. Es gibt keine gültige Formel dafür — was zählt, ist, ob der Gedanke davor Gewicht hatte. Eine Pause nach einem belanglosen Satz wirkt tatsächlich seltsam.',
    },
    {
      frage: 'Wirke ich in einer Pause nicht unsicher?',
      antwort:
        'Nur wenn Sie in der Pause unsicher aussehen — Blick nach unten, Gewicht verlagern, nach Worten suchen. Eine Pause mit Blickkontakt und ruhigem Stand wirkt wie eine Entscheidung. Es ist derselbe Zeitraum, der Unterschied liegt im Körper.',
    },
    {
      frage: 'Was mache ich gegen Füllwörter?',
      antwort:
        'Nicht sie bekämpfen, sondern die Pause zulassen. Füllwörter sind fast immer Platzhalter für Stille, die jemand nicht aushält. Wer die Stille zulässt, braucht den Platzhalter nicht mehr — und merkt das oft innerhalb weniger Tage.',
    },
    {
      frage: 'Gilt das auch am Telefon und in Videokonferenzen?',
      antwort:
        'Dort sogar stärker. Ohne Blickkontakt fehlen alle anderen Signale, und die Pause ist das einzige verbliebene Mittel, um etwas zu betonen. Achtung bei Videokonferenzen: Wegen der Verzögerung lohnt sich eine zusätzliche halbe Sekunde, bevor Sie antworten.',
    },
    {
      frage: 'Kann man zu viele Pausen machen?',
      antwort:
        'Ja, und es fällt sofort auf. Wenn jede Aussage gleich viel Gewicht bekommt, hat keine mehr welches. Drei bis fünf bewusste Pausen in einem halbstündigen Vortrag reichen völlig — sie sollen Höhepunkte markieren, nicht den Takt vorgeben.',
    },
  ],

  quiz: [
    {
      frage: 'Sie werden etwas Unangenehmes gefragt. Was tun Sie zuerst?',
      antworten: [
        {
          text: 'Sofort antworten, damit es souverän wirkt.',
          warum: 'Genau das wirkt selten souverän. Eine Antwort, die zu schnell kommt, klingt vorbereitet — und vorbereitet klingt bei unangenehmen Fragen nach Ausweichen.',
        },
        {
          text: 'Zwei Sekunden schweigen, dann antworten.',
          richtig: true,
          warum: 'Die Pause zeigt, dass Sie die Frage ernst nehmen. Und sie verschafft Ihnen etwas, das kaum jemand hat: Zeit zum Denken, ohne dass es nach Zögern aussieht.',
        },
        {
          text: 'Die Frage erst einmal wiederholen.',
          warum: 'Ein bekannter Trick, und er funktioniert — aber nur einmal. Beim zweiten Mal merkt jeder im Raum, dass Sie Zeit schinden.',
        },
      ],
    },
    {
      frage: 'Woher kommen Füllwörter wie „äh" und „sozusagen"?',
      antworten: [
        {
          text: 'Aus mangelnder Vorbereitung.',
          warum: 'Auch gut vorbereitete Menschen benutzen sie. Vorbereitung hilft, ist aber nicht die Ursache.',
        },
        {
          text: 'Sie füllen eine Stille, die jemand nicht aushält.',
          richtig: true,
          warum: 'Deshalb hilft es wenig, sie sich abzugewöhnen. Wer die Pause zulässt, braucht den Platzhalter nicht mehr — meist innerhalb weniger Tage.',
        },
        {
          text: 'Aus Gewohnheit, die sich kaum ändern lässt.',
          warum: 'Gewohnheit ja, unveränderlich nein. Die Änderung setzt nur an einer anderen Stelle an als gedacht.',
        },
      ],
    },
    {
      frage: 'Wie viele bewusste Pausen braucht ein halbstündiger Vortrag?',
      antworten: [
        {
          text: 'So viele wie möglich.',
          warum: 'Wenn jede Aussage gleich viel Gewicht bekommt, hat keine mehr welches. Zu viele Pausen wirken manieriert.',
        },
        {
          text: 'Drei bis fünf.',
          richtig: true,
          warum: 'Sie sollen Höhepunkte markieren, nicht den Takt vorgeben. Drei bis fünf gesetzte Pausen verändern die Wirkung eines Vortrags spürbar.',
        },
        {
          text: 'Keine — der Redefluss ist wichtiger.',
          warum: 'Redefluss ohne Pausen ist genau das, woran sich hinterher niemand erinnert. Der Fluss trägt den Inhalt, die Pause legt ihn ab.',
        },
      ],
    },
  ],

  weiter: {
    text: 'Eine Pause lässt sich nicht lesen, nur hören. Im Vorgespräch führe ich sie Ihnen an Ihrem eigenen Satz vor — danach ist das Thema meistens erledigt.',
    knopf: 'Vorgespräch vereinbaren',
    ziel: '/termin-buchen',
  },

  seoText:
    'Warum Sprechpausen wirken: was in der Pause passiert, warum sie sich falsch anfühlt, vier Stellen für eine Pause und wie man sie übt.',
};

export default function ArtikelSprechpausen() {
  return <ArtikelSeite inhalt={INHALT} />;
}
