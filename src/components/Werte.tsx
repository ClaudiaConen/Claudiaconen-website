import { useEffect, useRef } from 'react';

/**
 * Sechs Werte in drei Woertern - ein stiller Block, keine Kacheln, keine Icons.
 *
 * Claudias Vergleichsseite (22.09.2026, speakrbrand.com/about) hatte "What We Believe In": sechs
 * Werte in je drei Woertern, viel Luft. Bei ihr sind es ihre eigenen starken Saetze aus
 * projects/claudiaconen/POSITIONIERUNG_und_starke_Texte.md - nichts Neues, nur verdichtet.
 * "Ueberall ist Buehne." ist die Kurzform von "Ueberall, wo wir den Mund aufmachen, ist Buehne."
 * (ihr gesprochener Satz; "den Mund aufmachen" schreiben wir nicht).
 *
 * Beim Scrollen tauchen die Saetze nacheinander auf (eigener Beobachter, damit der Block auch auf
 * Seiten ohne den Beobachter der Angebotsvorlage funktioniert). Rueckgaengig: Block aus der Seite
 * nehmen - er aendert nichts Bestehendes.
 */
const WERTE = [
  'Berühre das Herz.',
  'Bleib im Kopf.',
  'Perfektion ist klickbar.',
  'Persönlichkeit weckt Vertrauen.',
  'Der Mensch ist das Unikat.',
  'Überall ist Bühne.',
];

/** Claudias siebter Wert (23.09.2026). Er steht bewusst allein über die volle Breite -
 *  als siebte Kachel in einem Dreierraster waere er ein Rest, so ist er ein Schluss. */
const SIEBTER = 'Achtsamkeit.';

/** Der Satz darunter, in ihrer zarten Schrift, von ganz links bis ganz rechts. Ihre Worte. */
const UNTERZEILE = 'Fortschritt nutzen, um mehr Zeit für Menschlichkeit zu gewinnen.';

export default function Werte({ hell = true }: { hell?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('da');
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.add('da');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`cc-r py-20 sm:py-28 ${hell ? 'bg-pearl-white text-midnight-blue' : 'text-pearl-white'}`}
      style={hell ? undefined : { background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }}
      aria-label="Wofür Claudia Conen steht"
    >
      <div className="mx-auto max-w-5xl px-6">
        <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#EBD197]'}`}>
          <span aria-hidden="true" className="cc-linie h-[3px] w-7 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
          Wofür ich stehe
        </p>
        <ul className="mt-10 grid list-none gap-x-12 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {WERTE.map((w, i) => (
            <li
              key={w}
              style={{ ['--i' as string]: i }}
              className={`cc-stufe border-t pt-5 font-montserrat text-2xl font-extrabold leading-tight tracking-tight sm:text-[1.7rem] ${
                hell ? 'border-[#D4AF37]/60' : 'border-[#D4AF37]/50'
              }`}
            >
              {w}
            </li>
          ))}
          <li
            style={{ ['--i' as string]: WERTE.length }}
            className={`cc-stufe border-t pt-5 font-montserrat text-2xl font-extrabold leading-tight tracking-tight sm:col-span-2 sm:text-[1.7rem] lg:col-span-3 ${
              hell ? 'border-[#D4AF37]/60' : 'border-[#D4AF37]/50'
            }`}
          >
            {SIEBTER}
          </li>
        </ul>

        <p
          style={{ ['--i' as string]: 3 }}
          className={`cc-schreib mt-12 border-t pt-8 text-center font-script text-[1.75rem] leading-[1.45] sm:text-[2.4rem] ${
            hell ? 'border-[#D4AF37]/60 text-midnight-blue' : 'border-[#D4AF37]/50 text-[#EBD197]'
          }`}
        >
          {UNTERZEILE}
        </p>
      </div>
    </section>
  );
}
