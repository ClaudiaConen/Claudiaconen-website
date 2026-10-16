import { Link } from 'react-router-dom';

/**
 * Ruhige Durchlaufzeile zur Challenge direkt unter dem Kopfvideo. Ersetzt am 16.10.2026 das grosse goldene
 * Laufband (ChallengeBand.tsx, bleibt im Code). Claudia, 16.10.2026 23:03 UTC: „unscheinbar als Durchlaufschrift“,
 * 23:06 UTC: „es muss etwas Ruhe sein … ein bisschen too much und viel zu schnell“.
 * Kleine Schrift, Nachtblau auf Pearl, langsam (150 s), haelt beim Darueberfahren an.
 */
const SAETZE = [
  '7-Tage-Video-Challenge',
  'Zeig dich. Sei dabei.',
  'Jeden Tag eine Aufgabe · 30 Minuten · Feedback in der Gruppe',
  'Start: Montag, 26. Oktober',
  'Kostenfrei mitmachen – klick hier',
];

export default function ChallengeZeile() {
  const durchlauf = [...SAETZE, ...SAETZE, ...SAETZE, ...SAETZE];
  return (
    <Link
      to="/challenge"
      className="cc-chal-zeile group flex items-center border-b border-[#D4AF37]/30 bg-[#FDFBF7] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
      aria-label="Aktuell: 7-Tage-Video-Challenge, Start Montag, 26. Oktober – zur Challenge"
    >
      <span className="flex shrink-0 items-center gap-2 pl-4 pr-3 font-montserrat text-[10px] font-bold uppercase tracking-[0.22em] text-midnight-blue/70 sm:pl-6">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
        Aktuell
      </span>
      <span className="cc-lauf min-w-0 flex-1 py-2" aria-hidden="true">
        <span className="cc-lauf-spur cc-chal-zeile-spur items-center">
          {durchlauf.map((s, i) => (
            <span key={i} className="flex items-center whitespace-nowrap text-[13px] font-medium text-midnight-blue/80">
              {s}
              <span className="mx-4 inline-block h-1 w-1 rounded-full bg-[#D4AF37]/60" />
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
