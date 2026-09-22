import { Link } from 'react-router-dom';

/**
 * "Momente, die bleiben": die laufende Bildreihe vor dem Schluss der Startseite.
 *
 * Ersetzt die vier leeren Bildplaetze (Impressionen.tsx, 18.09.2026). Claudias Idee vom
 * 21.09.2026 ("so ne Seite wo lauter Bilder durchlaufen ... Momente des Lebens"), gebaut nach
 * ihrer Slider-Werkstatt wie das kleine Band oben: eine Reihe, langsam, Pause beim Darueberfahren,
 * Goldrand, weiche Maskenraender. Alle Bilder gleich hoch, Hochkant und Quer gemischt.
 *
 * REGELN aus dem Abend des 22.09.2026:
 * - "doppelte sollten nicht drin sein": hier laeuft KEIN Bild, das im Band oben schon vorkommt.
 * - Fotos, auf denen andere Menschen erkennbar sind, gehen erst live, wenn die Personen Ja gesagt
 *   haben. Deshalb stehen hier sechs von zwoelf Fotos; die uebrigen liegen in
 *   projects/claudiaconen/ablage/eingang-2026-09-22/ (Tabelle in ABLAGE.md) und kommen dazu,
 *   sobald ihr Ja da ist. Nicht freigegebene Fotos NIE nach public/ kopieren - dort sind sie abrufbar.
 * - Die Reihe darf nie kuerzer sein als der sichtbare Ausschnitt (.cc-mom-band), sonst sieht man
 *   beide Durchgaenge gleichzeitig. Sechs Bilder = rund 1.500 px bei 236 px Hoehe, das reicht.
 *
 * Alt-Texte sagen, was zu sehen ist - keine Namen Dritter, kein Ort.
 * Bilder: public/momente/, 480 px hoch, zusammen rund 100 KB, gebaut mit scratchpad/momente_bilder.py.
 */

type Bild = { datei: string; breite: number; hoehe: number; alt: string };

const BILDER: Bild[] = [
  { datei: 'steinmauer', breite: 270, hoehe: 480, alt: 'Claudia Conen sitzt lachend an einer alten Natursteinmauer' },
  { datei: 'am-laptop', breite: 853, hoehe: 480, alt: 'Claudia Conen am Fenster mit Laptop und aufgeschlagener roter Mappe' },
  { datei: 'rote-mappe', breite: 270, hoehe: 480, alt: 'Claudia Conen im dunklen Blazer mit Stift und roter Mappe' },
  { datei: 'benefiz', breite: 587, hoehe: 480, alt: 'Claudia Conen mit Mikrofon auf einer kleinen Bühne bei einer Benefizveranstaltung' },
  { datei: 'heller-mantel', breite: 270, hoehe: 480, alt: 'Claudia Conen im hellen Mantel vor einer Steinwand' },
  { datei: 'am-telefon', breite: 653, hoehe: 480, alt: 'Claudia Conen lächelt mit dem Telefon in der Hand' },
];

function Reihe({ still }: { still?: boolean }) {
  return (
    <div className="flex gap-3 pr-3" aria-hidden={still ? true : undefined}>
      {BILDER.map((b) => (
        <figure
          key={b.datei}
          className="cc-mom m-0 flex-none overflow-hidden rounded-[10px] border border-[#D4AF37]/55 bg-[#13233F] transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]"
          style={{ aspectRatio: `${b.breite} / ${b.hoehe}` }}
        >
          <img
            src={`/momente/${b.datei}.webp`}
            alt={still ? '' : b.alt}
            width={b.breite}
            height={b.hoehe}
            loading="lazy"
            decoding="async"
            className="block h-full w-auto"
          />
        </figure>
      ))}
    </div>
  );
}

export default function Momente() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' }}
      aria-labelledby="momente"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="flex items-center gap-3 font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-[#EBD197]">
          <span aria-hidden="true" className="h-[3px] w-7 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
          Impressionen
        </p>
        <h2
          id="momente"
          className="mt-5 max-w-2xl font-cormorant text-3xl italic leading-tight text-pearl-white sm:text-5xl"
        >
          Momente, die bleiben.
        </h2>
        <p className="mt-4 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/80">
          Auf der Bühne, im Raum, vor der Kamera, am Telefon.
        </p>
      </div>

      <div className="cc-lauf cc-mom-band mt-10 sm:mt-12">
        <div className="cc-lauf-spur cc-mom-spur">
          <Reihe />
          <Reihe still />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <p className="mt-10 max-w-xl font-inter text-base leading-relaxed text-pearl-white/60">
          Wie das klingt, hörst du an anderer Stelle: sieben Gedanken, die meine Arbeit tragen,
          in meiner Stimme.
        </p>
        <Link
          to="/hoeren"
          className="mt-6 inline-block border-b-2 border-[#D4AF37] pb-1 font-montserrat text-sm font-semibold text-pearl-white transition-colors hover:text-[#EBD197]"
        >
          Zur Hören-Seite →
        </Link>
      </div>
    </section>
  );
}
