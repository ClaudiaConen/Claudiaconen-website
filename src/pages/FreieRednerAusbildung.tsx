import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Ausbildung: freie Rednerin oder freier Redner werden. Das Dach ueber den
 * zwei spezialisierten Ausbildungen.
 *
 * MARKTLAGE (recherchiert am 18.09.2026, Quellen im Aufgaben-Journal):
 *   RedeKunstWerk        3.590 EUR   8 Tage, IHK
 *   Redner Campus        3.300 EUR   Praesenzbloecke, IHK
 *   Freie Redner (IHK)   3.480 EUR   4 Online- + 3 Praesenztage
 *   Trauerredner-Seminar 2.950 EUR   5 Seminartage
 *   Video-Ausbildung       950 EUR   10 Stunden Video
 *
 * WAS DARAUS FOLGT, ehrlich: Fast der ganze Markt verkauft ueber ein
 * IHK-Zertifikat. Claudia hat keines. Also wird auch keines behauptet. Ihr
 * Unterscheidungsmerkmal ist ein anderes und es ist echt: fuenfunddreissig
 * Jahre Arbeit an Stimme und Wirkung. Die Wettbewerber bringen Menschen bei,
 * eine Rede zu SCHREIBEN. Sie bringt ihnen bei, wie eine Rede KLINGT.
 *
 * KEIN PREIS auf der Seite, solange Claudia keinen entschieden hat. Eine
 * geratene Zahl waere eine Zusage in ihrem Namen. Stattdessen steht die
 * Marktspanne da - das ist ehrlich und beantwortet die Frage trotzdem.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/freie-redner-ausbildung',
  stimmung: 'dunkel',
  wer: 'Ausbildung',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Kann ich lernen, vor fremden Menschen die richtigen Worte zu finden?',
  vorspann:
    'Ja. Das Schreiben einer Rede ist Handwerk und lässt sich in Wochen lernen. Das, was danach im Raum passiert, ist Stimme und Haltung — und genau daran arbeiten wir.',

  problemTitel: 'Warum gute Reden trotzdem nicht ankommen',
  problemAbsaetze: [
    'Weil sie auf dem Papier funktionieren. Ein Text, der beim Lesen bewegt, kann beim Sprechen zerfallen: zu lange Sätze, keine Atemstellen, ein Höhepunkt, den die Stimme nicht trägt. Eine Rede wird gehört, nicht gelesen.',
    'Weil viele Ausbildungen beim Schreiben aufhören. Der Text ist fertig, der Zertifikatsbogen ist unterschrieben, und die erste echte Feier ist trotzdem ein Sprung ins kalte Wasser.',
    'Und weil niemand darüber spricht, was der Beruf mit einem selbst macht. Wer Abschiede begleitet, trägt Geschichten mit nach Hause. Wer das nicht gelernt hat zu sortieren, hört nach zwei Jahren wieder auf.',
  ],

  angebotName: 'Die Ausbildung zur freien Rednerin',
  angebotZeile:
    'Ein Weg in drei Teilen: die Stimme, das Handwerk, der Auftritt. Am Ende haben Sie eine eigene Rede geschrieben, gesprochen und Rückmeldung darauf bekommen.',
  angebotPreis: 'Preis im Vorgespräch',
  angebotPreisHinweis:
    'Zur Einordnung des Marktes: Reine Video-Ausbildungen beginnen bei rund 950 Euro, mehrtägige Seminare mit IHK-Zertifikat liegen zwischen 2.950 und 3.590 Euro. Was bei Ihnen sinnvoll ist, hängt vom Umfang ab — das klären wir, bevor Geld im Spiel ist.',
  angebotPunkte: [
    'Arbeit an Ihrer Stimme: Atem, Tempo, Pausen, Tragfähigkeit im Raum',
    'Das Gespräch, aus dem eine Rede entsteht — mit Angehörigen, mit Paaren, mit Familien',
    'Vom Gespräch zum Text: Aufbau, Bilder, der Satz, der bleibt',
    'Der Auftritt: Stand, Blick, Umgang mit Technik, Umgang mit Tränen',
    'Eine eigene Rede, gesprochen und besprochen',
    'Wie Sie sich als Rednerin sichtbar machen, ohne sich zu verbiegen',
  ],

  ablaufTitel: 'Wie die Ausbildung aufgebaut ist',
  ablauf: [
    {
      schritt: 'Vorgespräch',
      text:
        'Kostenlos und ohne Verpflichtung. Ich höre Ihnen zu und sage Ihnen ehrlich, ob der Beruf zu Ihnen passt. Manchmal lautet die Antwort nein, und dann sage ich das auch.',
    },
    {
      schritt: 'Teil eins: Ihre Stimme',
      text:
        'Bevor wir über Texte reden, arbeiten wir an dem Instrument, das sie tragen muss. Die meisten hören sich zum ersten Mal wirklich zu.',
    },
    {
      schritt: 'Teil zwei: das Handwerk',
      text:
        'Das Gespräch führen, die Geschichte finden, die Rede bauen. Sie schreiben mit, nicht ab: Wir arbeiten an einem Fall, den Sie mitbringen.',
    },
    {
      schritt: 'Teil drei: der Auftritt',
      text:
        'Sie sprechen Ihre Rede. Vor Menschen, nicht vor einem Spiegel. Danach bekommen Sie Rückmeldung — konkret, nicht nett.',
    },
    {
      schritt: 'Danach',
      text:
        'Sie haben eine fertige Rede, eine Aufnahme Ihrer Stimme und eine Liste dessen, woran Sie weiterarbeiten. Auf Wunsch begleite ich Ihre erste echte Feier.',
    },
  ],

  bilder: [
    {
      bereich: 'Im Seminar',
      motiv: 'Teilnehmende im Halbkreis, eine Person spricht. Querformat, echtes Licht, nicht gestellt.',
    },
    {
      bereich: 'Rückmeldung',
      motiv: 'Nah: du im Gespräch mit einer Teilnehmerin. Das ist der Moment, für den Menschen kommen.',
    },
    {
      bereich: 'Der erste Auftritt',
      motiv: 'Jemand aus der Ausbildung bei einer echten Feier — mit Einverständnis. Der stärkste Beleg, den es gibt.',
    },
  ],

  nichtFuer: [
    'Sie brauchen ein IHK-Zertifikat. Mehrere Anbieter vergeben eines, ich nicht. Im Vorgespräch nenne ich Ihnen die Adressen.',
    'Sie wollen den Beruf ausprobieren, ohne vor Menschen zu sprechen. Hier wird ab dem ersten Tag laut gesprochen.',
    'Sie erwarten eine feste Zahl von Aufträgen danach. Die hängt von Ihrer Region und Ihrer Sichtbarkeit ab — eine Zahl zu nennen, die ich nicht kenne, wäre ein Versprechen ohne Deckung.',
    'Fremde Lebensgeschichten interessieren Sie nicht wirklich. Das ist der einzige Teil, den ich nicht beibringen kann.',
  ],

  brotkrumen: [
    { name: 'Ausbildungen', ziel: '/redner-ausbildungen' },
    { name: 'Freier Redner werden' },
  ],

  fragen: [
    {
      frage: 'Bekomme ich ein Zertifikat?',
      antwort:
        'Kein IHK-Zertifikat. Mehrere Anbieter im Markt vergeben eines, ich nicht. Wenn ein Zertifikat für Sie entscheidend ist, sagen Sie es im Vorgespräch — dann nenne ich Ihnen die Anbieter, die eines ausstellen. Was Sie bei mir bekommen, ist Arbeit an Stimme, Wirkung und Handwerk.',
    },
    {
      frage: 'Ich habe keine Bühnenerfahrung. Ist das ein Ausschlussgrund?',
      antwort:
        'Nein. Die meisten kommen ohne. Ein Ausschlussgrund wäre etwas anderes: kein echtes Interesse an fremden Lebensgeschichten. Das lässt sich nicht nachschulen, alles andere schon.',
    },
    {
      frage: 'Kann ich davon leben?',
      antwort:
        'Am Anfang selten. Die meisten beginnen nebenberuflich. Freie Trauungen liegen am Wochenende, Trauerfeiern werktags — wer beides anbietet, kommt schneller auf eine tragfähige Zahl von Aufträgen. Wie viele Aufträge Sie bekommen, hängt von Ihrer Region ab und davon, wie sichtbar Sie sind. Zahlen, die ich nicht kenne, nenne ich Ihnen nicht.',
    },
    {
      frage: 'Wie lange dauert es?',
      antwort:
        'Das hängt vom Format ab und davon, wie viel Sie zwischen den Terminen üben. Im Markt reicht die Spanne von zwei Seminartagen bis achtzehn Wochen. Wir legen den Umfang im Vorgespräch gemeinsam fest.',
    },
    {
      frage: 'Ich weiß noch nicht, ob Trauer oder Hochzeit.',
      antwort:
        'Dann fangen Sie hier an. Die Grundlagen sind dieselben: zuhören, eine Geschichte finden, sie sprechbar machen. Die Unterschiede kommen danach, und dafür gibt es die beiden vertiefenden Wege.',
    },
  ],

  weitere: [
    {
      titel: 'Trauerrednerin werden',
      text: 'Der vertiefende Weg für Abschiede.',
      ziel: '/trauerredner-ausbildung',
    },
    {
      titel: 'Hochzeitsrednerin werden',
      text: 'Der vertiefende Weg für freie Trauungen.',
      ziel: '/hochzeitsredner-ausbildung',
    },
    {
      titel: 'Speakerin werden',
      text: 'Wenn es auf die Bühne gehen soll.',
      ziel: '/speaker-ausbildung',
    },
  ],

  schrittTitel: 'Reden wir, bevor Sie sich entscheiden',
  schrittText:
    'Ein Vorgespräch kostet nichts und verpflichtet zu nichts. Danach wissen Sie, ob das Ihr Weg ist — und ich weiß, ob ich die Richtige dafür bin.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  // Kopfbild (22.09.2026): Claudia Conen als freie Rednerin am Mikrofon, dazu Momente einer Trauung
  bild: '/seiten/freie-rednerin.webp',
  bildAlt: 'Claudia Conen als freie Rednerin am Mikrofon, dazu Momente einer Trauung',

  // Claudias Ansage vom 22.09.2026: Live-Workshop in Köln und in Witten, dazu 1:1 und 6:1.
  formate: [
    { titel: 'Live-Workshop in Köln · Gruppe 6:1', text: 'Ein Tag in kleiner Runde, sechs Teilnehmende. Jeder steht mehrfach auf und redet; die anderen sind dein erstes Publikum.' },
    { titel: 'Live-Workshop in Witten · Gruppe 6:1', text: 'Dasselbe Format bei mir in Witten – sechs Menschen, eine Trainerin, ein Tag.' },
    { titel: 'Live in Witten · 1:1', text: 'Du und ich, ein Tag oder mehrere Termine. Alles dreht sich um deine Stimme, deine Texte, deine Situationen.' },
  ],

  fragenZusatz: ['ausbildung', 'redner'],
  seoTitel: 'Freie Rednerin werden — Ausbildung bei Claudia Conen',
  seoText:
    'Ausbildung zur freien Rednerin und zum freien Redner: Stimme, Handwerk und Auftritt in einem Weg. Für Trauerfeiern, freie Trauungen und besondere Anlässe.',
};

export default function FreieRednerAusbildung() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
