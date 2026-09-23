import { Link } from 'react-router-dom';

/**
 * Laufband "aktuelle Challenge" im Kopf der Startseite - Claudias Ansage vom 22.09.2026, 08:50 UTC:
 * Am Wochenende hat sie ein Buehnenprogramm und will die Leute von dort in eine 7-Tage-Video-Challenge
 * holen (jeden Tag eine Minute Video, Feedback, danach Einladung zum Performance-Coaching und in die
 * Netzwerk-Community). Wunsch: "durchlaufende Schrift ... klicke hier und mache mit, ein bisschen
 * breiter, in der grossen Schrift, edel, unter die Audio-Buttons, dass man es direkt sieht".
 *
 * Ziel ist die kurze Challenge-Seite /challenge (Claudia, 09:13 UTC: 'nicht so eine lange Seite').
 * "Kostenfrei" ist ihr Wort ("Kostenfrei mitmachen") - sie war noch unentschieden; ein Preis wird hier
 * erst eingetragen, wenn sie ihn nennt. Zum Abschalten: die Zeile <ChallengeBand /> in Hero.tsx entfernen.
 */
const SAETZE = [
  '7-Tage-Video-Challenge',
  'Zeig dich. Sei dabei.',
  'Jeden Tag eine Aufgabe · 30 Minuten · Feedback in der Gruppe',
  'Start: Montag, 26. Oktober',
  'Kostenfrei mitmachen – klick hier',
];

/** hell: Fassung fuer den hellen Streifen unter dem Video-Kopf (23.09.2026) - weisser Grund, Laufschrift
 *  nachtblau (Gold ist auf Hell keine Schriftfarbe), das Etikett "Aktuell" bleibt gold. */
export default function ChallengeBand({ hell = false }: { hell?: boolean } = {}) {
  const durchlauf = [...SAETZE, ...SAETZE];
  return (
    <Link
      to="/challenge"
      className={`cc-chal group flex items-stretch overflow-hidden rounded-full border no-underline transition-colors focus-visible:outline focus-visible:outline-2 ${
        hell
          ? 'mt-4 border-[#D4AF37]/55 bg-white hover:border-[#D4AF37] focus-visible:outline-[#D4AF37]'
          : 'mt-6 border-[#D4AF37]/40 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-[#F7E7CE]/70 focus-visible:outline-[#F7E7CE]'
      }`}
      aria-label="Aktuelle Challenge: 7-Tage-Video-Challenge, kostenfrei mitmachen"
    >
      <span className="flex shrink-0 items-center gap-2 bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] px-4 font-montserrat text-[11px] font-black uppercase tracking-[0.2em] text-midnight-blue sm:px-5 sm:text-xs">
        <span aria-hidden="true" className="cc-chal-punkt h-2 w-2 rounded-full bg-midnight-blue" />
        Aktuell
      </span>
      <span className="cc-lauf min-w-0 flex-1 py-3 sm:py-3.5" aria-hidden="true">
        <span className="cc-lauf-spur cc-chal-spur items-center">
          {durchlauf.map((s, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-montserrat text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
              <span className={hell ? 'text-midnight-blue' : 'gold-text-animated'}>{s}</span>
              <span className="mx-5 inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70 sm:mx-6" />
            </span>
          ))}
        </span>
      </span>
      {/* Deckender Grund mit weichem Uebergang nach links - vorher lief die Laufschrift unter "Mitmachen" durch
          (Claudias Foto 23.09.2026 00:00 UTC). */}
      <span
        className={`relative z-10 hidden shrink-0 items-center pl-9 pr-5 font-montserrat text-sm font-bold transition-transform group-hover:translate-x-0.5 sm:flex ${
          hell
            ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,#FFFFFF_26%)] text-midnight-blue'
            : 'bg-[linear-gradient(90deg,rgba(10,22,40,0)_0%,#0A1628_26%)] text-[#F7E7CE]'
        }`}
      >
        Mitmachen →
      </span>
    </Link>
  );
}
