import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Reden auf Social Media.
 *
 * EIN SATZ AUS DER ALTEN FASSUNG IST NICHT MITGEKOMMEN:
 * "Erreichen Sie tausende Menschen mit einem einzigen Video - organisch
 * und kostenfrei." Das ist ein Reichweitenversprechen, das niemand
 * halten kann - am wenigsten bei organischer Reichweite, die von
 * Entscheidungen der Plattformen abhaengt, auf die weder Claudia noch
 * ich Einfluss haben.
 *
 * Was bleibt, sind ihre eigenen Schwerpunkte: Einstieg, Storytelling,
 * Stimme vor der Kamera, Formate, Regelmaessigkeit. Nur ohne die
 * Zahl davor.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/speaker-social',
  wer: 'Für Speaker & Selbstständige',
  frage: 'Vor Menschen können Sie sprechen. Warum nicht vor der Kamera?',
  vorspann:
    'Weil die Kamera nicht zurückschaut. Im Raum merkt man, ob jemand folgt, und passt sich an. Vor der Linse fehlt genau diese Rückmeldung — und das Ergebnis klingt entweder gehetzt oder wie vorgelesen.',

  problemTitel: 'Woran Videos scheitern, obwohl der Inhalt gut ist',
  problemAbsaetze: [
    'Am Anfang. Die ersten drei Sekunden entscheiden, ob jemand weiterschaut — und die meisten verwenden sie für eine Begrüßung. „Hallo zusammen, heute möchte ich über…" ist die häufigste Stelle, an der weggewischt wird.',
    'An der Länge. Wer alles sagen will, sagt nichts. Ein Video, das einen einzigen Gedanken zu Ende bringt, wirkt mehr als eines, das fünf anreißt.',
    'Und an der Unregelmäßigkeit. Drei Videos in einer Woche, dann sechs Wochen nichts — das ist die häufigste Form des Aufgebens, und sie sieht aus wie Pech.',
  ],

  angebotName: 'Reden auf Social Media',
  angebotZeile: 'Für alle, die vor Menschen sicher sind und vor der Kamera nicht',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt an Umfang und Form — einzeln oder in der Gruppe. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Der Einstieg: die ersten drei Sekunden als eigene Arbeit, nicht als Nebensache.',
    'Ein Gedanke pro Video, zu Ende gebracht. Das ist schwerer, als es klingt.',
    'Sprechen vor der Kamera: Tempo, Pausen, und wohin man schaut, wenn niemand zurückschaut.',
    'Ihre eigenen Geschichten in Formate bringen, die ohne Ton funktionieren.',
    'Ein Plan, den Sie durchhalten — lieber ein Video pro Woche über ein Jahr als zehn in einem Monat.',
    'Was Sie brauchen und was nicht. Für den Anfang reichen Telefon, Fenster und ein ruhiger Raum.',
  ],

  ablaufTitel: 'Wie es abläuft',
  ablauf: [
    { schritt: 'Bestandsaufnahme', text: 'Wir sehen an, was Sie bisher gemacht haben — oder warum Sie noch nicht angefangen haben. Beides ist ein guter Ausgangspunkt.' },
    { schritt: 'Themen finden', text: 'Nicht „Content-Ideen", sondern die Fragen, die Ihnen Kunden wirklich stellen. Davon haben Sie mehr, als Sie denken.' },
    { schritt: 'Aufnehmen', text: 'Noch am selben Tag, mit dem Telefon. Erst ohne Anspruch, dann mit Arbeit am Einstieg.' },
    { schritt: 'Ansehen', text: 'Gemeinsam. Sie sehen sich selbst, und das ist unangenehm — danach wissen Sie genau, woran Sie arbeiten.' },
    { schritt: 'Plan', text: 'Ein Rhythmus, der zu Ihrem Kalender passt. Lieber wenig und verlässlich als viel und einmal.' },
  ],

  fragen: [
    {
      frage: 'Wie viele Menschen erreiche ich damit?',
      antwort:
        'Das kann ich nicht sagen, und wer es Ihnen sagt, weiß es auch nicht. Reichweite hängt an Entscheidungen der Plattformen, auf die niemand von uns Einfluss hat. Was Sie beeinflussen können, ist, ob jemand nach drei Sekunden weiterschaut — und daran arbeiten wir.',
    },
    {
      frage: 'Welche Plattform ist die richtige?',
      antwort:
        'Die, auf der Ihre Kunden sind, nicht die mit den meisten Nutzern. Für die meisten selbstständigen Sprecherinnen und Sprecher im deutschsprachigen Raum ist das LinkedIn — aber das prüfen wir an Ihrem Fall, nicht an einer Regel.',
    },
    {
      frage: 'Brauche ich gute Technik?',
      antwort:
        'Für den Anfang nicht. Telefon, Tageslicht von vorn, ein Raum ohne Hall. Ein Ansteckmikrofon für dreißig Euro bringt mehr als eine teure Kamera — Ton ist wichtiger als Bild, und zwar deutlich.',
    },
    {
      frage: 'Ich mag mich auf Videos nicht sehen. Geht es trotzdem?',
      antwort:
        'Ja, und das geht fast allen so. Es wird erträglicher, sobald man sich ein paar Mal gesehen hat — nicht weil man sich plötzlich mag, sondern weil man anfängt, auf die Sache zu achten statt auf sich.',
    },
    {
      frage: 'Wie oft sollte ich etwas veröffentlichen?',
      antwort:
        'So oft, wie Sie es ein Jahr lang durchhalten. Für die meisten ist das einmal pro Woche. Dreimal pro Woche klingt besser und endet nach sechs Wochen — das ist der häufigste Verlauf.',
    },
    {
      frage: 'Darf ich Videos mit KI erzeugen lassen?',
      antwort:
        'Können Sie, und es fällt auf. Der Sinn eines Videos ist, dass jemand Sie sieht und hört; ein erzeugter Avatar nimmt genau das weg. Für Zwischentitel und Schnitt ist KI nützlich — für das Gesicht und die Stimme rate ich ab.',
    },
  ],

  nichtFuer: [
    'Sie wollen schnell viele Follower. Darum geht es hier nicht, und ich kann es Ihnen auch nicht versprechen.',
    'Sie möchten Texte bekommen, die Sie ablesen. Abgelesenes hört man, und dann ist die Kamera das falsche Werkzeug.',
    'Es soll ohne eigenes Gesicht gehen. Dann ist ein Podcast oder ein Newsletter der bessere Weg — ich sage Ihnen das auch.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Sagen Sie mir, was Sie bisher versucht haben — oder warum nicht. Beides reicht als Anfang.',
  schrittKnopf: 'Vorgespräch anfragen',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Redner werden', ziel: '/redner-ausbildungen' }, { name: 'Reden auf Social Media' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Telefon auf einem Stativ, Person unscharf dahinter, Tageslicht' },
    { bereich: 'Beim Ablauf', motiv: 'Blick auf den Telefonbildschirm während einer Aufnahme' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Notizzettel mit Themenideen, handschriftlich' },
  ],

  weitere: [
    { titel: 'Storytelling-Kurs', text: 'Aus Erlebtem wird eine Geschichte.', ziel: '/storytelling-kurs' },
    { titel: 'Elevator-Pitch-Kurs', text: 'Ein Satz, der erklärt, was Sie tun.', ziel: '/elevator-pitch-kurs' },
    { titel: 'Voice-Over & Podcast', text: 'Wenn die Stimme ohne Bild tragen soll.', ziel: '/stimme-voiceover' },
  ],

  seoTitel: 'Vor der Kamera sprechen: Videos für LinkedIn und Social Media | Claudia Conen',
  seoText:
    'Warum Videos scheitern, obwohl der Inhalt gut ist — und was die ersten drei Sekunden damit zu tun haben. Mit Telefon aufnehmen, gemeinsam ansehen, einen Rhythmus finden, den Sie durchhalten.',
};

export default function SpeakerSocial() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
