import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Keynote und Eventmoderation - Claudia selbst am Mikrofon.
 *
 * WICHTIG ZUR EINORDNUNG: Diese Seite gehört zu "Rednerin buchen",
 * nicht zu "Für Unternehmen". Sie schreibt seit jeher "Die Stimme für
 * Ihre Botschaft" über sich - das ist ihre eigene Zuordnung. Am
 * 20.09.2026 stand sie in beiden Bereichen des Menüs, Claudia hat den
 * Widerspruch gesehen. Wer das hier ändert, prüft vorher mit
 * scratchpad/menue_stimmig.py nach.
 *
 * Abgrenzung zu /unternehmen-events: Dort geht es um die Firma als
 * Auftraggeberin und den internen Anlass. Hier geht es um jede
 * Veranstaltung, auch Verband, Kongress, Preisverleihung. Beide Seiten
 * verweisen aufeinander.
 */
const inhalt: ZielgruppenInhalt = {
  pfad: '/stimme-keynote',
  wer: 'Die Stimme für Ihre Botschaft',
  frage: 'Eine Stimme für Ihre Veranstaltung — oder für Ihre Bühne?',
  vorspann:
    'Beides geht, und es ist nicht dasselbe. Eine Keynote setzt einen Gedanken in den Raum, an den sich Menschen abends noch erinnern. Eine Moderation hält den ganzen Tag zusammen, besonders dort, wo er nicht nach Plan läuft.',

  problemTitel: 'Was der Unterschied in der Praxis bedeutet',
  problemAbsaetze: [
    'Eine Keynote ist ein Auftritt: vierzig bis sechzig Minuten, ein Thema, ein Schlusssatz, den man weitererzählt. Sie wirkt, wenn sie eine Behauptung aufstellt, die das Publikum angeht — und wenn jemand sie nach der Pause noch zitiert.',
    'Eine Moderation ist Arbeit über Stunden. Sie wird dann sichtbar, wenn die Technik streikt, jemand überzieht oder eine Frage aus dem Publikum einen wunden Punkt trifft. In diesen Minuten entscheidet sich, ob der Tag zusammenhält.',
    'Wer beides von derselben Person will, spart eine Person und gewinnt einen roten Faden. Sinnvoll ist es, wenn die Keynote früh liegt — danach bin ich für den Rest des Tages die Moderatorin.',
  ],

  angebotName: 'Keynote, Moderation oder beides',
  angebotZeile: 'Kongress, Verbandstagung, Preisverleihung, Jahresauftakt, Podium',
  angebotPreis: 'Auf Anfrage',
  angebotPreisHinweis:
    'Hängt an Dauer, Ort, Anreise und daran, ob es ein Auftritt ist oder ein ganzer Tag. Sie bekommen den Preis vor der Zusage, schriftlich.',
  angebotPunkte: [
    'Keynote zu Stimme, Wirkung und der Frage, was zwischen Mensch und Maschine bleibt.',
    'Moderation ganzer Veranstaltungen, einschließlich der Stellen, an denen der Plan nicht hält.',
    'Podiumsgespräche, bei denen auch die Stillen zu Wort kommen.',
    'Preisverleihungen und Ehrungen — Namen richtig aussprechen ist die halbe Miete.',
    'Vorbereitung mit Ihnen: Ich will wissen, worum es wirklich geht, nicht nur den Ablauf.',
    'Keynote und Moderation aus einer Hand, wenn der Tag einen roten Faden braucht.',
  ],

  ablaufTitel: 'Wie es abläuft',
  ablauf: [
    { schritt: 'Anfrage', text: 'Datum, Ort, Anlass, Zahl der Gäste. Ich sage innerhalb von zwei Werktagen, ob ich kann — und ob ich die Richtige bin.' },
    { schritt: 'Vorgespräch', text: 'Dreißig bis sechzig Minuten. Was ist der Anlass, und was soll danach anders sein? Die zweite Frage wird selten gestellt und entscheidet den Auftritt.' },
    { schritt: 'Vorbereitung', text: 'Bei einer Keynote schreibe ich für Ihre Veranstaltung, nicht aus dem Regal. Bei einer Moderation spreche ich vorher mit den Vortragenden.' },
    { schritt: 'Am Tag', text: 'Vor Ort, bevor die ersten Gäste kommen. Technik prüfen, Raum ansehen, die Stellen suchen, an denen es eng wird.' },
    { schritt: 'Danach', text: 'Kurze Rückmeldung, was getragen hat und was nicht. Für das nächste Mal ist das mehr wert als ein Dankesschreiben.' },
  ],

  fragen: [
    {
      frage: 'Wie lang ist eine Keynote?',
      antwort:
        'Vierzig bis sechzig Minuten sind üblich, dreißig gehen auch. Unter zwanzig Minuten wird es ein Grußwort — das kann sinnvoll sein, ist aber etwas anderes, und ich sage Ihnen vorher, was bei der Länge möglich ist.',
    },
    {
      frage: 'Halten Sie immer denselben Vortrag?',
      antwort:
        'Nein. Das Thema bleibt, der Aufbau auch — die Beispiele kommen aus dem Vorgespräch. Ein Saal voller Vertriebsleute braucht andere Szenen als eine Verbandstagung, und das merkt man im Raum sofort.',
    },
    {
      frage: 'Wie früh sollte man anfragen?',
      antwort:
        'Drei bis sechs Monate sind komfortabel, für Januar-Termine eher früher. Kurzfristig geht manchmal; fragen Sie einfach, dann sage ich ehrlich, ob die Vorbereitung noch reicht.',
    },
    {
      frage: 'Was brauchen Sie an Technik?',
      antwort:
        'Ein Ansteckmikrofon, damit die Hände frei sind. Folien nutze ich sparsam und kann auch ganz ohne. In kleineren Räumen geht es ohne Technik — meine Stimme trägt, das ist mein Beruf.',
    },
    {
      frage: 'Moderieren Sie auch, wenn es unangenehm wird?',
      antwort:
        'Ja, und dafür wird man gebucht. Ein Stellenabbau, ein Wechsel an der Spitze, eine Zahl, die niemand hören will — solche Tage brauchen jemanden, der die Lage benennt, statt sie zu überspielen. Sagen Sie es mir vorher.',
    },
    {
      frage: 'Reisen Sie auch weiter?',
      antwort:
        'Ja, deutschlandweit und im deutschsprachigen Ausland. Anreise und Übernachtung kommen dazu und stehen im Angebot. Bei weiter entfernten Terminen frage ich, ob der Abend davor möglich ist — ein Auftritt nach vier Stunden Bahn ist ein anderer Auftritt.',
    },
  ],

  nichtFuer: [
    'Sie brauchen jemanden, der nur Namen ansagt. Das kann jemand aus dem Haus, und es kostet Sie nichts.',
    'Das Programm steht und soll nicht mehr besprochen werden. Ohne Vorgespräch trete ich nicht auf — dann wäre ich genauso überrascht wie das Publikum.',
    'Es soll lustig werden. Humor entsteht im Raum oder gar nicht; angekündigter Humor ist keiner.',
    'Der Vortrag soll ein bestimmtes Produkt bewerben. Das merkt ein Publikum in der zweiten Minute, und danach hört niemand mehr zu.',
  ],

  schrittTitel: 'Der nächste Schritt',
  schrittText:
    'Datum, Anlass, Zahl der Gäste — mehr brauche ich nicht für eine erste Antwort. Ich melde mich innerhalb von zwei Werktagen, auch wenn ich absagen muss.',
  schrittKnopf: 'Anfrage senden',
  schrittZiel: '/#contact',

  brotkrumen: [{ name: 'Freie Rednerin', ziel: '/freie-rednerin' }, { name: 'Keynote & Eventmoderation' }],

  bilder: [
    { bereich: 'Kopf der Seite', motiv: 'Claudia auf großer Bühne, Publikum sichtbar, Blick ins Licht' },
    { bereich: 'Beim Ablauf', motiv: 'Moderation eines Podiums, vier Stühle, Claudia am Rand' },
    { bereich: 'Vor dem nächsten Schritt', motiv: 'Saal von hinten fotografiert, volle Reihen, Bühne im Licht' },
  ],

  weitere: [
    { titel: 'Interne Events & Moderation', text: 'Wenn es um Ihre eigene Firmenveranstaltung geht.', ziel: '/unternehmen-events' },
    { titel: 'Keynote für Ihr Unternehmen', text: 'Der Vortrag zum Thema Mensch und KI.', ziel: '/unternehmen-keynotes' },
    { titel: 'Voice-Over & Podcast', text: 'Wenn die Stimme aufgenommen werden soll statt live.', ziel: '/stimme-voiceover' },
  ],

  // Kopfbild (22.09.2026): Claudia Conen auf einer großen, rot beleuchteten Bühne
  bild: '/seiten/grosse-buehne.webp',
  bildAlt: 'Claudia Conen auf einer großen, rot beleuchteten Bühne',

  seoTitel: 'Keynote Speakerin und Moderatorin buchen | Claudia Conen',
  seoText:
    'Keynote oder Moderation für Kongress, Verbandstagung, Preisverleihung und Jahresauftakt — mit Vorgespräch und Beispielen aus Ihrer Veranstaltung, nicht aus dem Regal.',
};

export default function StimmeKeynote() {
  return <ZielgruppenSeite inhalt={inhalt} />;
}
