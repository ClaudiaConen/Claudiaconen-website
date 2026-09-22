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

export default function ChallengeBand() {
  const durchlauf = [...SAETZE, ...SAETZE];
  return (
    <Link
      to="/challenge"
      className="cc-chal group mt-6 flex items-stretch overflow-hidden rounded-full border border-[#D4AF37]/40 bg-white/[0.04] no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-[#F7E7CE]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F7E7CE]"
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
              <span className="gold-text-animated">{s}</span>
              <span className="mx-5 inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]/70 sm:mx-6" />
            </span>
          ))}
        </span>
      </span>
      <span className="hidden shrink-0 items-center pr-5 font-montserrat text-sm font-bold text-[#F7E7CE] transition-transform group-hover:translate-x-0.5 sm:flex">
        Mitmachen →
      </span>
    </Link>
  );
}
