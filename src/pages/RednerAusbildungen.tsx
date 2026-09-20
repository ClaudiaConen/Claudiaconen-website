import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 2: Speaker und freie Redner.
 *
 * Vollstaendig ausgearbeitet am 19.09.2026 auf Claudias Auftrag: Sie soll
 * hier von Menschen und von KI-Systemen als Expertin gefunden werden.
 *
 * DIE LEITFRAGE ist bewusst die unangenehme. "Wie bleibt deine Botschaft im
 * Kopf" klingt gut, beschreibt aber kein Problem, das jemand nachts wach
 * haelt. Was Menschen wach haelt, die auf die Buehne wollen: Sie haben
 * etwas zu sagen und werden nicht gefragt. Das ist die Frage, die sie
 * tatsaechlich eingeben.
 *
 * DIE ZAHLEN sind Marktzahlen mit Quelle, keine Versprechen. Nach zwei
 * Tagen Aufraeumen ist das die Regel: Jede Zahl auf dieser Seite laesst
 * sich anklicken und nachpruefen.
 *
 * PREIS bleibt "auf Anfrage". In Claudias Produktdokument steht fuer diesen
 * Workshop ein Entwurf von 690 bis 990 Euro, ausdruecklich markiert mit
 * "Preise: als Entwurf markieren, bis Claudia sie freigibt". Die Preise
 * werden am 20.09.2026 gemeinsam festgelegt.
 *
 * DAS SPEAKER-HANDBUCH steht als Zugabe in der Leistungsliste, weil Claudia
 * am 19.09.2026 bestaetigt hat, dass sie es besitzt. Sobald die Datei da
 * ist, wird daraus ein Download. Vorher wird nichts verlinkt, was es auf
 * der Seite nicht gibt.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/redner-ausbildungen',
  stimmung: 'dunkel',
  wer: 'Speaker & freie Redner',
  welle: true,
  hinweisRednerin: true,
  frage: 'Sie haben etwas zu sagen. Warum steht dann jemand anderes auf der Bühne?',
  vorspann:
    'Meistens nicht, weil der andere mehr weiß. Sondern weil er gelernt hat, sein Wissen so zu erzählen, dass ein Saal es behält — und weil ein Veranstalter in einem Satz sagen kann, wofür er ihn einlädt.',

  problemTitel: 'Woran es wirklich hängt',
  problemAbsaetze: [
    'Am Thema, nicht am Vortrag. Ein Fachgebiet beantwortet, was Sie können. Ein Thema beantwortet, warum jemand ausgerechnet Sie anruft. Das ist der Unterschied zwischen der ersten und der zweiten Honorarstufe — mehrere tausend Euro, für dieselbe Person.',
    'Am fehlenden Beweis. Ohne Mitschnitt eines echten Auftritts muss ein Veranstalter Ihnen glauben. Das tut kaum jemand, der ein Budget verantwortet.',
    'An der Stimme. Man kann einen perfekten Text haben und ihn so sprechen, dass niemand ihn behält. Der Inhalt entscheidet, ob man zustimmt. Die Stimme entscheidet, ob man zuhört.',
    'Und an der Wiederbuchung. Einmal gebucht zu werden ist Glück. Wieder gebucht zu werden heißt, dass hinterher jemand über den Vortrag gesprochen hat — und dafür braucht es einen Satz, den man weitererzählen kann.',
  ],

  belegeTitel: 'Was der Markt zahlt',
  belegeVorspann:
    'Honorare im deutschsprachigen Raum. Keine Versprechen — eine Einordnung, damit Sie wissen, worüber Sie verhandeln.',
  belege: [
    {
      zahl: '500 – 2.000 €',
      aussage: 'je Vortrag für Einsteiger und lokale Anlässe. Hier beginnt fast jeder.',
      quelle: 'SpeakingStage, Honorar-Guide 2026',
      url: 'https://speakingstage.com/was-kostet-ein-keynote-speaker-honorar-guide-2026',
    },
    {
      zahl: '3.000 – 8.000 €',
      aussage: 'für etablierte Fachspeaker mit eigenem Thema, Videomaterial und Wiederbuchungen.',
      quelle: 'SpeakingStage, Honorar-Guide 2026',
      url: 'https://speakingstage.com/was-kostet-ein-keynote-speaker-honorar-guide-2026',
    },
    {
      zahl: 'keine',
      aussage: 'gesetzliche Voraussetzung. Der Beruf ist nicht geschützt — es gibt keinen Titel, den jemand vergeben müsste. Es entscheidet ausschließlich, was im Saal passiert.',
      quelle: 'Listando, Keynote Speaker',
      url: 'https://www.listando.de/blog/keynote-speaker/',
    },
    {
      zahl: '60 – 70 %',
      aussage: 'des Vor-Ort-Honorars sind für Online-Vorträge marktüblich. Gut zu wissen, bevor Sie zu billig zusagen.',
      quelle: 'SpeakingStage, Honorar-Guide 2026',
      url: 'https://speakingstage.com/was-kostet-ein-keynote-speaker-honorar-guide-2026',
    },
  ],

  anlaesseTitel: 'Wohin Sie danach gebucht werden',
  anlaesseVorspann:
    'Damit Sie wissen, worauf Sie hinarbeiten. Das sind die Anlässe, zu denen Unternehmen und Veranstalter tatsächlich Redner suchen.',
  anlaesse: [
    {
      titel: 'Fachkonferenz und Kongress',
      text: 'Dreißig bis sechzig Minuten vor Publikum, das Ihr Thema kennt. Hier entscheidet Tiefe, nicht Show.',
    },
    {
      titel: 'Kick-off und Jahresauftakt',
      text: 'Unternehmen setzen den Ton für zwölf Monate. Der häufigste bezahlte Anlass überhaupt.',
    },
    {
      titel: 'Führungskräftetagung',
      text: 'Kleines Publikum, hohe Honorare, wenig Nachsicht. Wer hier besteht, wird empfohlen.',
    },
    {
      titel: 'Kundenveranstaltung',
      text: 'Sie sprechen für ein Unternehmen zu dessen Kunden. Anspruchsvoll, weil Sie zwei Erwartungen gleichzeitig bedienen.',
    },
    {
      titel: 'Verbands- und Branchentreffen',
      text: 'Oft der Einstieg. Niedrigere Honorare, aber die Menschen im Saal buchen später selbst.',
    },
    {
      titel: 'Messe und Bühnenprogramm',
      text: 'Kurz, laut, ablenkungsreich. Die härteste Schule für den Einstieg in einen Vortrag.',
    },
    {
      titel: 'Freie Anlässe',
      text: 'Trauerfeier, freie Trauung, Jubiläum. Andere Welt, gleiches Handwerk — und ganzjährig Nachfrage.',
    },
    {
      titel: 'Podcast, Kamera, Online-Bühne',
      text: 'Wächst am schnellsten. Eine Kamera verzeiht weniger als ein Saal, und genau das macht sie zum besten Training.',
    },
  ],

  angebotName: 'Der Workshop, an einem Tag',
  angebotZeile:
    'Ein Tag in kleiner Gruppe, höchstens zwölf Menschen. Sie arbeiten an Ihrer eigenen Rede, nicht an einer Übungsaufgabe — und Sie sprechen mehrfach, nicht einmal zum Schluss.',
  angebotPreis: 'Preis auf Anfrage',
  angebotPreisHinweis:
    'Termine einmal im Quartal. Schreiben Sie kurz, dann bekommen Sie Datum und Honorar. Die Preise für 2027 werden gerade festgelegt.',
  angebotPunkte: [
    'Höchstens zwölf Teilnehmende, damit jede und jeder mehrfach auf die Bühne kommt',
    'Ihre eigene Rede oder Ihr eigener Pitch als Arbeitsmaterial',
    'Vom Fachgebiet zum Thema: der Satz, mit dem ein Veranstalter Sie ankündigt',
    'Arbeit an der Stimme — Tempo, Pausen, Tragfähigkeit im Raum',
    'Aufnahme und Rückmeldung, damit Sie hören, was andere hören',
    'Die sieben Schlüssel der Voice-to-Brain®-Methode als roter Faden',
    'Zugabe: das Speaker-Handbuch als Unterlage zum Mitnehmen',
  ],

  ablaufTitel: 'So läuft der Tag',
  ablauf: [
    {
      schritt: 'Vorher',
      text:
        'Sie schicken Ihre Rede oder Ihr Thema. So steht am Tag selbst nichts Fremdes auf der Bühne, und ich weiß, woran wir arbeiten.',
    },
    {
      schritt: 'Erkennen',
      text:
        'Klarheit und Geschichte. Was wollen Sie wirklich sagen, und warum ausgerechnet Sie? Der unbequemste Teil und der wichtigste.',
    },
    {
      schritt: 'Formen',
      text:
        'Botschaft, Stimme, Präsenz. Hier wird geübt, nicht erklärt. Mehrfach, vor Publikum, mit Aufnahme.',
    },
    {
      schritt: 'Wirken',
      text:
        'Der Auftritt und was danach kommt: Wie Sie sich sichtbar machen, ohne sich zu verbiegen, und wie aus einem Auftritt der nächste wird.',
    },
  ],

  bilder: [
    {
      bereich: 'Im Workshop',
      motiv: 'Kleine Gruppe, jemand steht und spricht, die anderen hören zu. Zeigt das Format besser als jede Beschreibung.',
    },
    {
      bereich: 'Rückmeldung',
      motiv: 'Nahaufnahme: Claudia im Gespräch mit einer Teilnehmerin. Das ist der Moment, für den Menschen kommen.',
    },
    {
      bereich: 'Video',
      motiv: 'Ein bis zwei Minuten aus einem echten Workshop, mit Einverständnis der Teilnehmenden.',
    },
  ],

  nichtFuer: [
    'Sie erwarten einen fertigen Vortrag zum Mitnehmen. Sie bringen Ihren eigenen mit und arbeiten daran.',
    'Sie möchten zuhören statt sprechen. An diesem Tag steht jede und jeder mehrfach vorn.',
    'Sie wollen nicht aufgenommen werden. Die Aufnahme ist der Teil, an dem die meisten am meisten lernen — ohne sie fehlt der halbe Tag.',
  ],

  brotkrumen: [
    { name: 'Ausbildungen' },
  ],

  fragen: [
    {
      frage: 'Braucht man eine Ausbildung, um Speaker zu werden?',
      antwort:
        'Nein. Der Beruf ist nicht geschützt, es gibt keine gesetzliche Voraussetzung und keinen Titel, den jemand vergeben müsste. Genau deshalb entscheidet ausschließlich, was im Saal passiert — und das ist der Teil, den man üben kann.',
    },
    {
      frage: 'Was verdient man mit einem Vortrag?',
      antwort:
        'Einsteiger und lokale Anlässe liegen bei 500 bis 2.000 Euro, etablierte Fachspeaker bei 3.000 bis 8.000 Euro, bekannte Namen darüber. Was Sie erreichen, hängt von Ihrem Thema und Ihrer Sichtbarkeit ab. Eine Zahl für Sie persönlich zu nennen, wäre ein Versprechen ohne Deckung.',
    },
    {
      frage: 'Ich bin freier Redner, keine Bühnen-Speakerin. Passt das trotzdem?',
      antwort:
        'Ja. Die Grundlagen sind dieselben: zuhören, eine Geschichte finden, sie sprechbar machen. Was sich unterscheidet, ist der Anlass, nicht das Handwerk.',
    },
    {
      frage: 'Muss ich schon Bühnenerfahrung haben?',
      antwort:
        'Nein. Ein Ausschlussgrund wäre etwas anderes: kein echtes Interesse an den Menschen im Raum. Das lässt sich nicht nachschulen, alles andere schon.',
    },
    {
      frage: 'Wird gefilmt?',
      antwort:
        'Ja, für Sie selbst. Die Aufnahmen gehören Ihnen und werden nirgends veröffentlicht. Wenn Sie nicht gefilmt werden wollen, sagen Sie es — dann arbeiten wir mit Tonaufnahme.',
    },
    {
      frage: 'Gibt es das auch einzeln statt in der Gruppe?',
      antwort:
        'Ja, als Voice-to-Brain® Intensiv über zwölf Wochen. Der Workshop ist der Einstieg, das Intensiv ist der ganze Weg — mit eigener Keynote und Aufnahme am Ende.',
    },
    {
      frage: 'Ich habe Angst vor großen Sälen.',
      antwort:
        'Die haben fast alle, auch Menschen, die Sie regelmäßig auf Bühnen sehen. Lampenfieber verschwindet nicht durch Mut, sondern durch Vorbereitung und Atemtechnik. Beides ist Teil der Arbeit, kein Hindernis davor.',
    },
    {
      frage: 'Ich wurde schon gebucht, aber selten wieder.',
      antwort:
        'Das ist ein präzises Signal und meistens kein Inhaltsproblem. Wiederbuchungen hängen daran, ob hinterher jemand über den Vortrag gesprochen hat. Dafür braucht es einen Satz, den man weitererzählen kann. Bringen Sie eine Aufnahme mit, dann finden wir die Stelle.',
    },
  ],

  weitere: [
    {
      titel: 'Speakerin werden',
      text: 'Der ganze Weg auf die Bühne, mit Aufnahme am Ende.',
      ziel: '/speaker-ausbildung',
    },
    {
      titel: 'Elevator-Pitch-Kurs',
      text: 'Der eine Satz, mit dem ein Veranstalter Sie ankündigt.',
      ziel: '/elevator-pitch-kurs',
    },
    {
      titel: 'Storytelling-Kurs',
      text: 'Drei Geschichten, die Sie wirklich erzählen können.',
      ziel: '/storytelling-kurs',
    },
  ],

  schrittTitel: 'Erzählen Sie mir Ihr Thema',
  schrittText:
    'Zwanzig Minuten, kostenlos und ohne Verpflichtung. Wenn ich danach den Eindruck habe, dass Sie mich nicht brauchen, sage ich Ihnen das.',
  schrittKnopf: 'Vorgespräch vereinbaren',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Speaker und freie Redner werden: Workshop und Ausbildung | Claudia Conen',
  seoText:
    'Vom Fachgebiet zum Thema, von der Rede zum Auftritt: Workshop und Ausbildung für Speaker und freie Redner. Mit Stimmarbeit, Aufnahme und ehrlicher Rückmeldung.',
};

export default function RednerAusbildungen() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
