import ZielgruppenSeite, { ZielgruppenInhalt } from '../components/ZielgruppenSeite';

/**
 * Tuer 2: Speaker und freie Redner.
 *
 * Preis bewusst OFFEN gelassen. Die Angebotstreppe nennt fuer den Workshop
 * einen Entwurf von 690 bis 990 Euro, also keine gesetzte Zahl. Eine Spanne
 * aus einem internen Entwurf oeffentlich als Preis auszugeben waere geraten,
 * nicht belegt. Claudia setzt die Zahl, danach steht sie hier.
 *
 * Freie Redner stehen hier mit drin, weil Claudia es am 18.09.2026 so
 * entschieden hat. Das FUNDAMENT haelt Trauer- und Hochzeitsreden aus dem
 * Schaufenster heraus; die AUSBILDUNG fuer freie Redner ist etwas anderes
 * als das eigene Anbieten dieser Reden.
 */
const INHALT: ZielgruppenInhalt = {
  pfad: '/redner-ausbildungen',
  wer: 'Speaker & freie Redner',
  frage: 'Wie bleibt deine Botschaft im Kopf, wenn du längst aufgehört hast zu sprechen?',
  vorspann:
    'Eine gute Rede reicht nicht, wenn Story, Persönlichkeit und Performance keinen bleibenden Eindruck hinterlassen.',

  problemTitel: 'Gut vorbereitet ist nicht dasselbe wie unvergesslich',
  problemAbsaetze: [
    'Der Inhalt stimmt. Die Struktur steht. Und trotzdem erinnert sich am nächsten Tag niemand an den einen Satz, für den du auf der Bühne standest.',
    'Das liegt selten am Thema. Es liegt daran, dass Inhalt bis zur ersten Reihe trägt und alles dahinter von deiner Präsenz entschieden wird. Von deiner Stimme, deinem Körper, deinem Mut zur Pause.',
    'Wer das nicht geübt hat, merkt es genau dann, wenn es zählt: wenn der Saal größer ist als gedacht, wenn die Technik klemmt, wenn der erste Zwischenruf kommt.',
  ],

  angebotName: 'Der Workshop, an einem Tag',
  angebotZeile:
    'Ein Tag in kleiner Gruppe, höchstens zwölf Menschen. Du arbeitest an deiner eigenen Rede, nicht an einer Übungsaufgabe.',
  angebotPreis: 'Preis auf Anfrage',
  angebotPreisHinweis:
    'Die Termine liegen einmal im Quartal. Schreib kurz, dann bekommst du Datum und Preis.',
  angebotPunkte: [
    'Höchstens zwölf Teilnehmende, damit jeder mehrfach auf die Bühne kommt',
    'Deine eigene Rede oder dein eigener Pitch als Arbeitsmaterial',
    'Aufnahme und Rückmeldung, damit du hörst, was andere hören',
    'Die sieben Schlüssel der Voice-to-Brain-Methode als roter Faden',
  ],

  ablaufTitel: 'So läuft der Tag',
  ablauf: [
    {
      schritt: 'Vorher',
      text:
        'Du schickst deine Rede oder dein Thema. So steht am Tag selbst nichts Fremdes auf der Bühne.',
    },
    {
      schritt: 'Erkennen',
      text:
        'Klarheit und Geschichte. Was willst du wirklich sagen, und warum ausgerechnet du.',
    },
    {
      schritt: 'Formen',
      text:
        'Botschaft, Stimme, Präsenz. Hier wird geübt, nicht erklärt. Mehrfach, vor Publikum.',
    },
    {
      schritt: 'Wirken',
      text:
        'Was beim Gegenüber ankommt. Du hörst deine eigene Aufnahme, und zum ersten Mal hörst du dich so, wie andere dich hören.',
    },
  ],

  fragen: [
    {
      frage: 'Ich bin freier Redner, keine Bühnen-Speakerin. Passt das trotzdem?',
      antwort:
        'Ja. Trauerrede, Hochzeitsrede, Moderation und Keynote unterscheiden sich im Anlass, nicht im Handwerk. Es geht immer darum, dass Menschen dir zuhören und behalten, was du gesagt hast.',
    },
    {
      frage: 'Muss ich schon Bühnenerfahrung haben?',
      antwort:
        'Nein. Es hilft, wenn du eine eigene Rede oder ein eigenes Thema mitbringst, auch als Rohfassung. Ohne Vorerfahrung funktioniert der Tag genauso, nur arbeitest du an anderen Stellen.',
    },
    {
      frage: 'Wird gefilmt?',
      antwort:
        'Es wird aufgenommen, damit du dich hören und sehen kannst. Die Aufnahmen gehören dir und werden nicht weitergegeben. Wer das nicht möchte, sagt es und wird nicht aufgenommen.',
    },
    {
      frage: 'Gibt es das auch einzeln statt in der Gruppe?',
      antwort:
        'Ja, als Einzelbegleitung über zwölf Wochen. Das ist ein anderes Format mit anderem Umfang, dazu gern ein Gespräch.',
    },
  ],

  schrittTitel: 'Schreib kurz, worum es bei dir geht',
  schrittText:
    'Ein, zwei Sätze genügen. Du bekommst die nächsten Termine, den Preis und eine ehrliche Einschätzung, ob der Tag für dich der richtige ist oder etwas anderes besser passt.',
  schrittKnopf: 'Termin ansehen',
  schrittZiel: '/termin-buchen',

  seoTitel: 'Workshop für Speaker und freie Redner | Claudia Conen',
  seoText:
    'Ein Tag in kleiner Gruppe für Menschen, die auf der Bühne stehen: Storytelling, Präsenz, Performance und hörbare Persönlichkeit.',
};

export default function RednerAusbildungen() {
  return <ZielgruppenSeite inhalt={INHALT} />;
}
