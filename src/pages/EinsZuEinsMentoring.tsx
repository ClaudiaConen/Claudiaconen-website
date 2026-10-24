import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Deine Abkuerzung - 1:1-Coaching, 90 Minuten (Claudia, 24.10.2026: "wir koennen die Mentoring-Seite nutzen und
 * anpassen"; "erfinde keine Sprueche"). Texte nur aus drei Quellen: Claudias Ueberschrift vom 24.10.2026 13:05,
 * ihr Satz zum Treffen vor Ort (13:04) und das PDF "Website-Texte & Launchplan" (Kapitel 4), ein Ergebnisversprechen
 * entschaerft. Die fruehere Zwoelf-Wochen-Einzelbegleitung (Preis im Erstgespraech) stand bis hierher auf dieser Seite.
 * Preis wie in Tentary: 180 EUR netto fuer 90 Minuten. Das 3er-Paket wird nicht gezeigt.
 */
const TENTARY_1ZU1 = 'https://umsatzstimme-claudiaconen.mytentary.com/p/zJYlWu';

const INHALT: ZielgruppenInhalt = {
  pfad: '/1-zu-1-mentoring',
  wer: '1:1-Coaching mit Claudia',
  frage: 'Du weißt, was du kannst. Nimm die Abkürzung. Und zeig es.',
  vorspann:
    'Stell dir deinen nächsten Auftritt vor. Du stehst da, ruhig und klar, und spürst: Sie hören dir zu. Genau dahin arbeiten wir – gezielt an dem, was dich gerade noch zurückhält. Ich höre, was andere überhören. Du nimmst den direkten Weg.',

  problemTitel: 'Kein Standardprogramm. Keine Schablone. Wir arbeiten an deinem echten Anliegen.',
  problemAbsaetze: [
    'Du brauchst keine zwölf Wochen, um ein konkretes Problem anzupacken. Manchmal brauchst du jemanden, der genau hinhört, die entscheidenden Fragen stellt und mit dir auf den Punkt bringt, was bisher noch nicht sitzt.',
    'Du hast einen wichtigen Auftritt vor dir? Du möchtest deinen Elevator Pitch schärfen? Du brauchst eine Keynote, die deine Botschaft trägt? Oder du willst in Gesprächen souveräner auftreten?',
  ],

  angebotName: 'Deine Abkürzung. 1:1 mit Claudia',
  angebotZeile: '90 Minuten, nur du und ich. Online per Zoom.',
  angebotPreis: '180 € zzgl. MwSt. · 214,20 € inkl. MwSt.',
  angebotPreisHinweis: 'Den Termin wählst du nach der Buchung in meinem Kalender.',
  angebotPunkte: [
    'Dein Elevator Pitch: verständlich machen, wer du bist, wofür du stehst und warum das relevant ist.',
    'Deine Keynote oder Präsentation: einen roten Faden entwickeln, Geschichten gezielt einsetzen und deine Kernbotschaft herausarbeiten.',
    'Deine Stimme und Präsenz: Sprechtempo, Pausen, Betonung und Haltung bewusst einsetzen.',
    'Deine persönliche Wirkung: erkennen, was bereits überzeugt und was deine Kompetenz noch verdeckt.',
    'Deine Kommunikation mit KI: Ideen strukturieren, Varianten entwickeln und Texte verdichten, ohne dass deine persönliche Stimme verloren geht.',
  ],

  ablaufTitel: 'So läuft die Zusammenarbeit ab',
  ablauf: [
    { schritt: 'Wir klären dein Ziel', text: 'Was möchtest du erreichen? Was steht an? Was soll nach unserer Zusammenarbeit anders sein?' },
    { schritt: 'Wir arbeiten an deinem konkreten Fall', text: 'Du bekommst direktes, ehrliches und wertschätzendes Feedback. Wir formulieren um, strukturieren neu, trainieren und probieren aus.' },
    { schritt: 'Dein nächster Schritt', text: 'Du weißt, was du verändern kannst, worauf du achten solltest und wie du deinen nächsten Schritt umsetzt.' },
  ],

  brotkrumen: [{ name: '3 Wege', ziel: '/3-wege' }, { name: 'Deine Abkürzung' }],

  fragen: [
    {
      frage: 'Was kostet das?',
      antwort: '180 € zzgl. MwSt. (214,20 € inkl. MwSt.) für 90 Minuten.',
    },
    {
      frage: 'Reicht ein Termin?',
      antwort:
        'Du kannst einen einzelnen Termin buchen, wenn du gezielte Unterstützung brauchst. Wenn dein Anliegen umfangreicher ist, klären wir in einem persönlichen Gespräch, welches Format sinnvoll ist und wie viele Termine du benötigst.',
    },
    {
      frage: 'Geht das auch vor Ort?',
      antwort: 'Oder an einem Ort deiner Wahl. Lass uns auf einen Kaffee treffen und herausfinden, wo du dich am wohlsten fühlst.',
    },
    {
      frage: 'Was soll ich mitbringen?',
      antwort: 'Ein Thema, an dem dir etwas liegt: dein Angebot, eine Präsentation oder ein Gespräch, das bald ansteht.',
    },
  ],

  schrittTitel: 'Du entscheidest, wie intensiv du arbeiten möchtest',
  schrittText: 'Buche deine 90 Minuten und wähle danach deinen Termin.',
  schrittKnopf: 'Meinen Termin buchen',
  schrittZiel: TENTARY_1ZU1,

  bild: '/a27/p/angebote/mentoring-tisch.webp',
  bildAlt: 'Claudia Conen im Gespräch am Tisch',
  bildQuer: true,

  seoTitel: '1:1-Coaching mit Claudia Conen: Pitch, Rede, Video, Kundengespräch',
  seoText:
    '1:1-Coaching online, 90 Minuten: Elevator Pitch, Keynote, Stimme und persönliche Wirkung. Mit Claudia Conen, Expertin für menschliche Wirkungskraft im KI-Zeitalter.',
};

export default function EinsZuEinsMentoring() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
