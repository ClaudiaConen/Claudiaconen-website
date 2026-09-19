import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Anlass-Seite: Trauerrede.
 *
 * Gedacht als eigenstaendige Seite, die per QR-Code weitergegeben wird, etwa
 * ueber ein Bestattungshaus. Sie muss fuer sich allein tragen, ohne dass
 * jemand vorher die Startseite gesehen hat.
 *
 * Stimmung "ruhig": wenig Gold, gedeckte Flaechen, viel Weissraum. Kitsch
 * entsteht durch Ueberschmueckung, deshalb hier bewusst weniger als
 * anderswo. Kein Verkaufsdruck, keine Knappheitsformeln, keine
 * Erfolgsgeschichten. Wer diese Seite oeffnet, hat gerade jemanden verloren.
 *
 * Preis: Claudias eigenes Honorar ist nirgends dokumentiert. Statt eine Zahl
 * zu erfinden, steht hier die Markteinordnung und der Hinweis, dass das
 * Honorar im Gespraech genannt wird. Das hilft dem Leser und behauptet
 * nichts.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/trauerrede',
  stimmung: 'ruhig',
  wer: 'Trauerrede',
  zurueck: { text: 'Freie Rednerin', ziel: '/freie-rednerin' },
  frage: 'Wer spricht, wenn die Worte fehlen?',
  vorspann:
    'Eine Trauerrede ist keine Rede über einen Verstorbenen. Sie ist das, was von ihm bleibt, gesagt vor den Menschen, die ihn gekannt haben.',

  problemTitel: 'Was in diesen Tagen schwerfällt',
  problemAbsaetze: [
    'Zwischen Behörden, Bestattung und Verwandten bleibt kaum Zeit, um zu überlegen, was eigentlich gesagt werden soll. Und genau das ist das Einzige, woran sich später alle erinnern.',
    'Viele Familien fürchten zwei Dinge: dass die Rede allgemein klingt und auf jeden passen würde. Und dass sie selbst sprechen müssten und es nicht schaffen.',
    'Beides lässt sich abnehmen. Sie erzählen mir von dem Menschen. Den Rest übernehme ich.',
  ],

  angebotName: 'Die Trauerrede',
  angebotZeile:
    'Ein Gespräch mit Ihnen, eine geschriebene Rede, gehalten bei der Trauerfeier. Frei von Konfession, wenn Sie das möchten, und mit ihr, wenn Sie das wünschen.',
  angebotPreis: 'Honorar im Gespräch',
  angebotPreisHinweis:
    'Zur Einordnung: Freie Redner liegen in Deutschland je nach Umfang und Anfahrt meist im dreistelligen bis niedrigen vierstelligen Bereich. Was es bei Ihnen ist, sage ich Ihnen im ersten Telefonat, bevor Sie sich entscheiden.',
  angebotPunkte: [
    'Ein persönliches Gespräch, telefonisch oder bei Ihnen zu Hause',
    'Die geschriebene Rede, vorab zum Lesen, mit der Möglichkeit zu ändern',
    'Die Rede bei der Trauerfeier, in Absprache mit dem Bestattungshaus',
    'Die Rede als gedrucktes Exemplar für die Familie, wenn Sie es möchten',
  ],

  ablaufTitel: 'Wie es abläuft',
  ablauf: [
    {
      schritt: 'Der Anruf',
      text:
        'Sie sagen mir, wann die Trauerfeier ist und wo. Mehr brauche ich zunächst nicht. Wenn es zeitlich nicht geht, sage ich das sofort und nenne Ihnen jemanden, der es kann.',
    },
    {
      schritt: 'Das Gespräch',
      text:
        'Eine bis zwei Stunden. Sie erzählen. Ich frage nach. Es gibt kein Formular und keine Liste, die abgearbeitet wird. Oft sind es die kleinen Geschichten, die später im Raum tragen.',
    },
    {
      schritt: 'Die Rede',
      text:
        'Sie bekommen den Text vorab. Was nicht stimmt, wird geändert. Was zu privat ist, bleibt draußen. Sie entscheiden, nicht ich.',
    },
    {
      schritt: 'Die Trauerfeier',
      text:
        'Ich bin vorher da, spreche mit dem Bestattungshaus und der Technik. Sie müssen sich um nichts kümmern.',
    },
  ],

  bilder: [
    {
      bereich: 'Stille',
      motiv: 'Ein ruhiger Raum, weiches Licht, keine Menschen. Zurückhaltend.',
    },
    {
      bereich: 'Ein Leben in Worten',
      motiv: 'Nah: aufgeschlagenes Notizbuch, Handschrift. Kein Gesicht, keine Trauerkleidung.',
    },
  ],

  fragen: [
    {
      frage: 'Wie kurzfristig geht das?',
      antwort:
        'Oft innerhalb weniger Tage. Rufen Sie an, auch wenn es sehr schnell gehen muss. Wenn ich es nicht schaffe, sage ich es Ihnen sofort und nenne Ihnen jemanden aus meinem Netzwerk.',
    },
    {
      frage: 'Wir wissen gar nicht, was gesagt werden soll.',
      antwort:
        'Das ist der Normalfall und kein Problem. Sie müssen nichts vorbereiten und nichts formulieren. Erzählen Sie einfach von dem Menschen, wie Ihnen zumute ist. Das Ordnen ist meine Aufgabe.',
    },
    {
      frage: 'Muss die Rede religiös sein?',
      antwort:
        'Nein. Sie kann ganz ohne Konfession sein, sie kann Gebete und Segen enthalten, und sie kann beides verbinden. Es ist Ihre Entscheidung, und sie wird nicht hinterfragt.',
    },
    {
      frage: 'Was, wenn wir uns in der Familie nicht einig sind?',
      antwort:
        'Das kommt häufig vor. Dann spreche ich mit den Beteiligten getrennt. Die Rede muss nicht alles erzählen, und sie muss nicht alles glätten. Sie muss nur wahr sein.',
    },
    {
      frage: 'Darf auch jemand aus der Familie mitsprechen?',
      antwort:
        'Ja, gern. Ich bereite denjenigen vor und bin daneben, falls die Stimme versagt. Das ist häufiger, als man denkt, und es ist nie peinlich.',
    },
  ],

  schrittTitel: 'Rufen Sie einfach an',
  schrittText:
    'Sie müssen sich nichts überlegen und nichts vorbereiten. Ein Anruf genügt, und wir klären in zehn Minuten, ob es passt.',
  schrittKnopf: 'Kontakt aufnehmen',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Trauerrednerin | Claudia Conen',
  seoText:
    'Eine persönliche Trauerrede, geschrieben nach einem Gespräch mit der Familie und gehalten bei der Trauerfeier. Frei oder mit Konfession, kurzfristig möglich.',
};

export default function Trauerrednerin() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
