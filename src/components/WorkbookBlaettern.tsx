import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Workbook "Entdecke deine Stimmwirkung" zum Blaettern - Claudias Wunsch vom 22.09.2026 (02:54 UTC):
 * "dass man das richtig blaettern kann, dieses Blaettergeraeusch, ... dass die Leute es anklicken koennen".
 *
 * Ohne dass die Seite langsam wird: Die Seite selbst traegt nur das Deckblatt. Erst beim Oeffnen laedt
 * die aktuelle Seite, dazu je eine davor und danach (41 WebP-Seiten, je rund 65 KB, in
 * public/unverwechselbar/workbook/). Blaettern per Klick, Pfeiltaste oder Wischen; das leise
 * Blaettergeraeusch (2 KB) spielt nur nach einer Beruehrung - so verlangen es die Browser.
 *
 * Inhalt: die korrigierte Fassung (sichtung/workbooks/Workbook_..._korrigiert.pdf, Skript
 * scratchpad/wb_fix.py): keine Millisekunden-Zahl, kein "Opfer", 37 Jahre, Nachtblau statt Hellblau.
 */

const SEITEN = 41;
const PFAD = '/unverwechselbar/workbook';
const PDF = '/unverwechselbar/workbook-entdecke-deine-stimmwirkung.pdf';

function seite(n: number) {
  return `${PFAD}/seite-${String(n).padStart(2, '0')}.webp`;
}

export default function WorkbookBlaettern({ offen, schliessen }: { offen: boolean; schliessen: () => void }) {
  const [n, setN] = useState(1);
  const [richtung, setRichtung] = useState<'vor' | 'zurueck' | null>(null);
  const ton = useRef<HTMLAudioElement | null>(null);
  const start = useRef<number | null>(null);

  const blaettern = useCallback(
    (ziel: number) => {
      if (ziel < 1 || ziel > SEITEN || ziel === n) return;
      setRichtung(ziel > n ? 'vor' : 'zurueck');
      if (!ton.current) ton.current = new Audio('/unverwechselbar/blaettern.mp3');
      ton.current.currentTime = 0;
      ton.current.play().catch(() => undefined);
      window.setTimeout(() => {
        setN(ziel);
        setRichtung(null);
      }, 260);
    },
    [n]
  );

  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') blaettern(n + 1);
      if (e.key === 'ArrowLeft') blaettern(n - 1);
      if (e.key === 'Escape') schliessen();
    };
    window.addEventListener('keydown', taste);
    const vorher = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', taste);
      document.body.style.overflow = vorher;
    };
  }, [offen, n, blaettern, schliessen]);

  if (!offen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Workbook Entdecke deine Stimmwirkung, zum Blättern"
      className="fixed inset-0 z-[100] flex flex-col bg-[#0A1628]/95 text-pearl-white"
      onClick={schliessen}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.18em] text-[#EBD197]">
          Workbook · Seite {n} von {SEITEN}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={PDF}
            download
            className="hidden rounded-full border border-[#D4AF37] px-4 py-2 font-montserrat text-xs font-bold text-pearl-white hover:text-[#EBD197] sm:inline-flex"
          >
            Als PDF speichern
          </a>
          <button
            type="button"
            onClick={schliessen}
            className="rounded-full bg-white/10 px-4 py-2 font-montserrat text-xs font-bold hover:bg-white/20"
            aria-label="Workbook schließen"
          >
            Schließen ✕
          </button>
        </div>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          start.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (start.current === null) return;
          const dx = e.changedTouches[0].clientX - start.current;
          start.current = null;
          if (dx < -40) blaettern(n + 1);
          if (dx > 40) blaettern(n - 1);
        }}
      >
        <button
          type="button"
          onClick={() => blaettern(n - 1)}
          disabled={n === 1}
          aria-label="Vorherige Seite"
          className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl hover:bg-white/20 disabled:opacity-30 sm:flex"
        >
          ‹
        </button>

        <div className="cc-buch relative h-full max-h-[calc(100vh-110px)] w-auto" style={{ aspectRatio: '900 / 1273' }}>
          {/* Die naechste bzw. vorherige Seite liegt darunter, die aktuelle klappt darueber weg. */}
          {richtung && (
            <img
              src={seite(richtung === 'vor' ? n + 1 : n - 1)}
              alt=""
              className="absolute inset-0 h-full w-full rounded-md object-contain"
              width={900}
              height={1273}
            />
          )}
          <img
            key={n}
            src={seite(n)}
            alt={`Workbook, Seite ${n}`}
            width={900}
            height={1273}
            decoding="async"
            className={`cc-buchseite absolute inset-0 h-full w-full cursor-pointer rounded-md object-contain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ${
              richtung === 'vor' ? 'cc-blatt-vor' : richtung === 'zurueck' ? 'cc-blatt-zurueck' : ''
            }`}
            onClick={(e) => {
              const box = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
              blaettern(e.clientX - box.left > box.width / 2 ? n + 1 : n - 1);
            }}
          />
          {/* Vorladen der Nachbarseiten */}
          {n < SEITEN && <link rel="prefetch" as="image" href={seite(n + 1)} />}
          {n > 1 && <link rel="prefetch" as="image" href={seite(n - 1)} />}
        </div>

        <button
          type="button"
          onClick={() => blaettern(n + 1)}
          disabled={n === SEITEN}
          aria-label="Nächste Seite"
          className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl hover:bg-white/20 disabled:opacity-30 sm:flex"
        >
          ›
        </button>
      </div>

      <p className="pb-4 text-center font-inter text-xs text-pearl-white/70" onClick={(e) => e.stopPropagation()}>
        Tippe rechts oder links auf die Seite, wische, oder nutze die Pfeiltasten.{' '}
        <a href={PDF} download className="underline decoration-[#D4AF37] underline-offset-4 sm:hidden">
          Als PDF speichern
        </a>
      </p>
    </div>
  );
}
