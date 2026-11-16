import type { Stimme } from '../components/SocialProof';

/**
 * Echte Stimmen aus der 7-Tage-Challenge (Durchgang Oktober/November 2026), Videos und eine Sprachnachricht aus dem
 * Drive-Ordner des Auftraggebers (16.11.2026). Zitate WOERTLICH aus den Aufnahmen (automatisch abgeschrieben,
 * nur Verschreiber geglaettet). Dateien in public/kundenstimmen/challenge/. Reihenfolge: staerkste zuerst.
 */
const DIR = '/kundenstimmen/challenge';
const ROLLE = ['Teilnehmerin der 7-Tage-Challenge'];
const v = (slug: string, dauer: string) => ({ quelle: `${DIR}/${slug}.mp4`, standbild: `${DIR}/${slug}.webp`, dauer, hochkant: true });

export const CHALLENGE_STIMMEN: Stimme[] = [
  {
    id: 'challenge-nicole-schwuchow', name: 'Nicole Schwuchow', rolle: ROLLE, kurz: 'Nicole', bild: `${DIR}/nicole-schwuchow.webp`,
    video: v('nicole-schwuchow', '1 Minute'),
    zitat: 'Ich habe so das Gefühl, bei mir ist so ein Knoten geplatzt.',
    saetze: ['Eine Kollegin sagte mir: Deine Reels sind noch lebendiger, interessanter, und ich bleibe noch lieber bis zum Schluss dabei.'],
  },
  {
    id: 'challenge-cordula-wetzel', name: 'Cordula Wetzel', rolle: ROLLE, kurz: 'Cordula', bild: `${DIR}/cordula-wetzel.webp`,
    video: v('cordula-wetzel', '1 Minute'),
    zitat: 'Besonders toll war die tägliche Unterstützung mit dem Feedback.',
    saetze: ['Das Ganze hat sich im Laufe der Woche wirklich entwickelt.'],
  },
  {
    id: 'challenge-annette-welsch', name: 'Annette Welsch', rolle: ROLLE, kurz: 'Annette', bild: `${DIR}/annette-welsch.webp`,
    video: v('annette-welsch', '1 Minute'),
    zitat: 'Es ist einfach kein Vergleich zum ersten Tag.',
    saetze: ['Ihr habt das mit so viel Liebe zum Detail gemacht und mich so viel weitergebracht.'],
  },
  {
    id: 'challenge-sybille', name: 'Sybille', rolle: ROLLE, kurz: 'Sybille', bild: `${DIR}/sybille.webp`,
    video: v('sybille', '20 Sekunden'),
    zitat: 'Sie hat mich in meiner Sichtbarkeit ganz schön weitergebracht.',
    saetze: ['Diese 7-Tages-Challenge war wirklich super, kann ich immer nur wieder weiterempfehlen.'],
  },
  {
    id: 'challenge-kornelia', name: 'Kornelia', rolle: ROLLE, kurz: 'Kornelia', bild: `${DIR}/kornelia.webp`,
    video: v('kornelia', '4 Minuten'),
    zitat: 'Ich habe so viel Energie, so viel Kraft geschöpft.',
    saetze: ['Allein deine Videos, deine Beispiele haben mir gezeigt, wie leicht es doch ist, eine Botschaft rüberzubringen.'],
  },
  {
    id: 'challenge-gaby-brueckmann', name: 'Gaby Brückmann', rolle: ROLLE, kurz: 'Gaby', bild: `${DIR}/gaby-brueckmann.webp`,
    video: v('gaby-brueckmann', '40 Sekunden'),
    zitat: 'Ich mache direkt weiter, weil es so gut war.',
    saetze: ['Ich bin ein Stück weit weitergekommen. Ich kann es nur empfehlen.'],
  },
  {
    id: 'challenge-ellen', name: 'Ellen', rolle: ROLLE, kurz: 'Ellen', bild: `${DIR}/ellen.webp`,
    video: v('ellen', '1 Minute'),
    zitat: 'So viel zu lernen und so tolle Aufmachung.',
    saetze: ['Ich nehme ganz, ganz viel mit. Macht weiter so, ihr werdet gebraucht.'],
  },
  {
    id: 'challenge-rosi', name: 'Rosi', rolle: ROLLE, kurz: 'Rosi', bild: `${DIR}/rosi.webp`,
    video: v('rosi', '40 Sekunden'),
    zitat: 'Mit meinen 69 Jahren bin ich immer noch am Lernen, Lernen, Lernen.',
    saetze: ['Die Woche war sehr inspirierend, mit ganz, ganz vielen tollen Tipps.'],
  },
  {
    id: 'challenge-stephanie', name: 'Stephanie', rolle: ROLLE, kurz: 'Stephanie', bild: `${DIR}/stephanie.webp`,
    video: v('stephanie', '1 Minute'),
    zitat: 'Ich glaube schon, dass mir das sehr viel gebracht hat.',
    saetze: ['Ich habe vieles daraus mitnehmen können.'],
  },
  {
    id: 'challenge-monika', name: 'Monika', rolle: ROLLE, kurz: 'Monika', bild: `${DIR}/monika.webp`,
    audio: `${DIR}/monika.m4a`,
    zitat: 'Es war herausfordernd, aber es hat sich gelohnt in vollem Maße.',
    saetze: ['Danke für diese wahnsinnig vielen Impulse.'],
  },
];
