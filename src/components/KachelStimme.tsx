import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

/**
 * Kleiner Hoer-Knopf fuer Kacheln: Mikrofon, daneben eine ruhige Wellenlinie.
 *
 * Claudias Auftrag vom 21.09.2026: "auf jeder Kachel so ein kleines Mikrofon
 * und eine Tonspur laufen lassen, dass man weiss, was einen erwartet." Die
 * Sprechtexte dazu liegen in projects/claudiaconen/SPRECHTEXTE_Startseite_*.md;
 * sie liest selbst ein.
 *
 * DREI ENTSCHEIDUNGEN, die nicht zufaellig sind:
 *
 * 1. Das Audio entsteht ERST BEIM KLICK. Der vorhandene AudioButton legt
 *    "new Audio(url)" schon beim Einbau an - bei sechs Knoepfen auf der
 *    Startseite waeren das sechs Dateien, die jeder Besucher laedt, ob er
 *    hoert oder nicht. Hier: null Byte, bis jemand klickt.
 *
 * 2. Ohne Aufnahme KEIN Knopf. Ein Mikrofon, das nichts abspielt, ist
 *    schlechter als keines. Die Komponente rendert nichts, solange "quelle"
 *    fehlt - sie kann also schon eingebaut sein, bevor die Aufnahmen da sind.
 *
 * 3. Es laeuft immer nur EINE Stimme. Wer die naechste Kachel anklickt,
 *    stoppt die vorige. Die Wellenlinie bewegt sich nur, waehrend gesprochen
 *    wird, und steht still, wenn das System Bewegung abgeschaltet hat.
 */

let laeuftGerade: { audio: HTMLAudioElement; stoppen: () => void } | null = null;

type Props = {
  /** Adresse der Aufnahme, z. B. "/audio/tuer-unternehmen.mp3". Fehlt sie, erscheint nichts. */
  quelle?: string;
  /** Was man hoert - fuer Vorleseprogramme. Z. B. "Claudia erzaehlt, was hinter dieser Tuer liegt". */
  beschreibung: string;
  /** Kurze sichtbare Zeile neben dem Mikrofon. */
  text?: string;
  /** Auf hellem Grund dunkle Schrift, auf dunklem helle. */
  aufHell?: boolean;
  className?: string;
};

export default function KachelStimme({
  quelle,
  beschreibung,
  text = 'Reinhören',
  aufHell = false,
  className = '',
}: Props) {
  const [spielt, setSpielt] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (laeuftGerade?.audio === audioRef.current) laeuftGerade = null;
      }
    };
  }, []);

  if (!quelle) return null;

  const stoppen = () => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    setSpielt(false);
  };

  const umschalten = (e: React.MouseEvent) => {
    // Die Kachel selbst ist oft ein Verweis - der Klick aufs Mikrofon soll
    // abspielen, nicht die Seite wechseln.
    e.preventDefault();
    e.stopPropagation();

    if (spielt) {
      stoppen();
      if (laeuftGerade?.audio === audioRef.current) laeuftGerade = null;
      return;
    }

    if (laeuftGerade && laeuftGerade.audio !== audioRef.current) laeuftGerade.stoppen();

    if (!audioRef.current) {
      const a = new Audio();
      a.preload = 'none';
      a.src = quelle;
      a.addEventListener('ended', () => {
        setSpielt(false);
        if (laeuftGerade?.audio === a) laeuftGerade = null;
      });
      audioRef.current = a;
    }

    const a = audioRef.current;
    laeuftGerade = { audio: a, stoppen };
    a.play().then(
      () => setSpielt(true),
      () => setSpielt(false) // z. B. Datei fehlt oder Browser verweigert: still bleiben statt Fehler zeigen
    );
  };

  const farbe = aufHell ? 'text-midnight-blue' : 'text-pearl-white';
  const rand = aufHell ? 'border-midnight-blue/20 bg-white/60' : 'border-white/25 bg-white/10';

  return (
    <button
      type="button"
      onClick={umschalten}
      aria-pressed={spielt}
      aria-label={spielt ? `Stoppen: ${beschreibung}` : `Anhören: ${beschreibung}`}
      className={`cc-kachelstimme inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 backdrop-blur-md transition-colors duration-300 hover:border-luxury-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luxury-gold motion-reduce:transition-none ${rand} ${farbe} ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-luxury-gold/90 text-midnight-blue">
        {spielt ? <Square size={12} fill="currentColor" /> : <Mic size={14} />}
      </span>

      {/* Fuenf Striche als Tonspur. Sie bewegen sich nur, waehrend gesprochen wird. */}
      <span aria-hidden="true" className="flex h-4 items-center gap-[3px]">
        {[0.45, 0.9, 0.6, 1, 0.5].map((hoehe, i) => (
          <span
            key={i}
            className={`cc-kachelstimme-strich block w-[2px] rounded-full bg-luxury-gold ${spielt ? 'cc-kachelstimme-laeuft' : ''}`}
            style={{ height: `${Math.round(hoehe * 100)}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </span>

      <span className="font-montserrat text-xs font-semibold tracking-wide">
        {spielt ? 'Stopp' : text}
      </span>
    </button>
  );
}
