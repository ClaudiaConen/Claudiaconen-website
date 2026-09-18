import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Ausbildung: Speakerin werden. Claudias eigenes Feld - hier steht sie
 * nicht neben dem Markt, sondern mittendrin.
 *
 * RECHERCHE 18.09.2026:
 *   - Der Beruf ist nicht geschuetzt. Es gibt keine gesetzliche
 *     Voraussetzung, sich Keynote Speaker zu nennen. Das ist die
 *     wichtigste Information der ganzen Seite und sie steht deshalb in
 *     den Fragen, nicht im Kleingedruckten.
 *   - Peter Lueder, Speaker-Ausbildung: 4.990 EUR, Wochenendformat.
 *   - Honorarspannen im deutschen Markt: Einsteiger und lokale Anlaesse
 *     500 bis 2.000 EUR, etablierte Fachspeaker 3.000 bis 8.000 EUR,
 *     bekannte Namen 8.000 bis 20.000 EUR je Vortrag.
 *
 * Diese Zahlen stehen als MARKT auf der Seite. Claudias eigener
 * Ausbildungspreis ist nicht entschieden und wird deshalb nicht genannt.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/speaker-ausbildung',
  stimmung: 'dunkel',
  wer: 'Ausbildung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Sie haben etwas zu sagen. Warum steht dann jemand anderes auf der Bühne?',
  vorspann:
    'Meistens nicht, weil der andere mehr weiß. Sondern weil er gelernt hat, sein Wissen so zu erzählen, dass ein Saal es behält.',

  problemTitel: 'Warum Fachleute selten gebucht werden',
  problemAbsaetze: [
    'Weil sie erklären statt zu erzählen. Ein Vortrag, der wie ein Fachartikel gebaut ist, ist nach zwanzig Minuten anstrengend. Ein Vortrag, der wie eine Geschichte gebaut ist, ist nach zwanzig Minuten am spannendsten Punkt.',
    'Weil sie kein Thema haben, sondern ein Fachgebiet. Ein Fachgebiet beantwortet die Frage, was Sie können. Ein Thema beantwortet die Frage, warum ein Veranstalter gerade Sie anruft. Das ist ein Unterschied von mehreren tausend Euro.',
    'Und weil die Stimme nicht mitgeht. Man kann einen perfekten Text haben und ihn so sprechen, dass niemand ihn behält. Der Inhalt entscheidet, ob man zustimmt. Die Stimme entscheidet, ob man zuhört.',
  ],

  angebotName: 'Die Ausbildung zur Speakerin',
  angebotZeile:
    'Aus Ihrem Fachgebiet wird ein Thema, aus dem Thema ein Vortrag, aus dem Vortrag ein Auftritt. Am Ende steht eine Keynote, die Sie gesprochen haben und die auf Video ist.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Zur Einordnung des Marktes: Vergleichbare Speaker-Ausbildungen in Deutschland liegen bei rund 5.000 Euro. Was bei Ihnen sinnvoll ist, hängt davon ab, wie weit Sie schon sind — das klären wir, bevor Geld im Spiel ist.',
  angebotPunkte: [
    'Vom Fachgebiet zum Thema: der Satz, mit dem ein Veranstalter Sie ankündigt',
    'Der Aufbau einer Keynote: Bogen, Wendepunkt, der Satz, der bleibt',
    'Ihre Stimme: Tragfähigkeit, Tempo, Pausen, der Umgang mit Mikrofon und Saal',
    'Der Körper: Stand, Blick, Gehen auf der Bühne, Umgang mit den eigenen Händen',
    'Fragen aus dem Publikum, auch die unangenehmen',
    'Eine gesprochene Keynote auf Video — Ihr erstes echtes Anfrage-Material',
  ],

  ablaufTitel: 'Der Weg auf die Bühne',
  ablauf: [
    {
      schritt: 'Vorgespräch',
      text:
        'Sie erzählen mir, worüber Sie sprechen wollen. Ich sage Ihnen, ob daraus ein Thema wird oder ob wir erst noch suchen müssen. Kostenlos und ohne Verpflichtung.',
    },
    {
      schritt: 'Das Thema finden',
      text:
        'Der unbequemste Teil und der wichtigste. Die meisten kommen mit drei Themen und gehen mit einem. Erst danach lohnt sich jede weitere Stunde Arbeit.',
    },
    {
      schritt: 'Die Keynote bauen',
      text:
        'Aufbau, Geschichten, Übergänge, der Schluss. Wir schreiben nicht schön, wir schreiben sprechbar — das sind zwei verschiedene Handwerke.',
    },
    {
      schritt: 'Stimme und Auftritt',
      text:
        'Jetzt wird gesprochen. An Ihrer Stimme arbeiten wir so lange, bis der Text sie trägt und nicht umgekehrt. Dazu Stand, Blick und Bewegung im Raum.',
    },
    {
      schritt: 'Aufnahme',
      text:
        'Sie sprechen Ihre Keynote vor Publikum, und wir nehmen sie auf. Ohne Video eines echten Auftritts ist eine Anfrage sehr viel schwerer zu bekommen.',
    },
  ],

  fragen: [
    {
      frage: 'Braucht man eine Ausbildung, um Keynote Speaker zu sein?',
      antwort:
        'Nein. Der Beruf ist nicht geschützt, es gibt keine gesetzliche Voraussetzung und keinen Titel, den jemand vergeben müsste. Genau deshalb entscheidet ausschließlich, was im Saal passiert — und das ist der Teil, den man üben kann.',
    },
    {
      frage: 'Was verdient man mit einem Vortrag?',
      antwort:
        'Im deutschen Markt bewegen sich Einsteiger und lokale Anlässe zwischen 500 und 2.000 Euro, etablierte Fachspeaker zwischen 3.000 und 8.000 Euro, bekannte Namen zwischen 8.000 und 20.000 Euro. Was Sie erreichen, hängt von Ihrem Thema und Ihrer Sichtbarkeit ab. Eine Zahl für Sie persönlich zu nennen, wäre ein Versprechen ohne Deckung.',
    },
    {
      frage: 'Ich habe Angst vor großen Sälen.',
      antwort:
        'Die haben fast alle, auch Menschen, die Sie auf Bühnen sehen. Lampenfieber verschwindet nicht durch Mut, sondern durch Vorbereitung und durch Atemtechnik. Beides lässt sich lernen, und es ist ein Teil der Arbeit.',
    },
    {
      frage: 'Ich bin schon gebucht worden, aber selten wieder.',
      antwort:
        'Das ist ein präzises Signal und meistens kein Inhaltsproblem. Wiederbuchungen hängen daran, ob das Publikum nachher noch über den Vortrag spricht. Dafür braucht es einen Satz, den man weitererzählen kann. Wenn Sie schon Auftritte hatten, schauen wir uns eine Aufnahme an — das ist der schnellste Weg zur Ursache.',
    },
    {
      frage: 'Wie unterscheidet sich das von einem Rhetorikkurs?',
      antwort:
        'Ein Rhetorikkurs macht Sie sicherer im Sprechen. Hier geht es darum, ein Thema zu bauen, das jemand einkauft. Das eine ist Können, das andere ist ein Produkt. Beides gehört zusammen, aber nur eines davon bringt Anfragen.',
    },
  ],

  schrittTitel: 'Erzählen Sie mir Ihr Thema',
  schrittText:
    'Ein Vorgespräch, ohne Verpflichtung. Wenn ich nach zwanzig Minuten den Eindruck habe, dass Sie mich nicht brauchen, sage ich Ihnen das.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Speaker werden — Keynote-Speaker-Ausbildung bei Claudia Conen',
  seoText:
    'Ausbildung zur Speakerin und zum Speaker: vom Fachgebiet zum Thema, von der Keynote zum Auftritt. Mit Stimmarbeit und einer Videoaufnahme am Ende.',
};

export default function SpeakerAusbildung() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
