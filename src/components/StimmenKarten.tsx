import { useState } from 'react';
import { ALLE, type Stimme } from './SocialProof';
import VideoModal from './VideoModal';

/**
 * Kundenstimmen fuer die Challenge-Seite: ruhige Karten, Bild oben, Worte darunter.
 *
 * Claudia, 25.10.2026 02:29: "da fehlen ja teilweise die Texte ... bei Sommerfeld Text drin, bei den andern nicht,
 * das ist verwirrend ... Text unter dem Bild statt oben drueber und alles nicht so gedrungen, sondern etwas freier".
 * Deshalb hier nur Menschen, von denen es wirklich Worte gibt (woertlich, siehe SocialProof.tsx), und JEDE Karte in
 * derselben Ordnung: Foto, Zitat, ein Satz, Name. Wer nur ein Video ohne Abschrift hat, steht auf der Startseite.
 * Schrift nur Montserrat und Inter (Liste 24.10.2026, Punkt 1), der Abspielknopf in der Bildecke, nie im Gesicht.
 */

// Freimuth Gorter: woertlich aus seinem Video (Abschrift sichtung/kundenvideos/neu_1011/freimuth_gorter.txt).
const ERGAENZT: Record<string, Partial<Stimme>> = {
  'e24ec4f8-58df-4622-b0a3-f2498fa7dae9': {
    zitat: 'Du hast das so gut immer wieder aufgefangen, mich begleitet, mich wieder reingeführt.',
    saetze: ['Also ich finde das total super, mit dir zu arbeiten.'],
  },
};

const AUSWAHL = [
  'verena-sommerfeld',
  'ann-kathrin-andresen',
  'e24ec4f8-58df-4622-b0a3-f2498fa7dae9', // Freimuth Gorter
  '08454326-b1e9-4ff6-8d83-ad919a77f471', // Melanie Miniaci
  'mario-fuerst',
  'julien-backhaus',
  '14e3877b-1e92-412b-b8a7-2efa39b84b0e', // Stephan
  'aimee-bastian',
  'fabian-mahnke',
];

const KARTEN: Stimme[] = AUSWAHL.map((id) => {
  const s = ALLE.find((x) => x.id === id);
  return s ? { ...s, ...ERGAENZT[id] } : undefined;
}).filter((s): s is Stimme => Boolean(s && s.zitat && s.bild));

const ZUERST = 6;

export default function StimmenKarten() {
  const [alle, setAlle] = useState(false);
  const [vimeo, setVimeo] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState<string | null>(null);

  return (
    <section className="bg-white py-16 text-midnight-blue sm:py-24" aria-labelledby="stimmen-titel">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="stimmen-titel" className="font-montserrat text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Menschen, mit denen ich gearbeitet habe
        </h2>
        <p className="mt-3 max-w-2xl font-inter text-lg leading-relaxed text-midnight-blue/75">In ihren eigenen Worten.</p>
      </div>

      {/* Handy: seitlich wischen, eine Karte nach der anderen. Computer: drei nebeneinander, mit viel Luft. */}
      <ul className="cc-ohne-leiste mx-auto mt-10 flex max-w-6xl list-none snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-4 sm:mt-14 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-16 md:overflow-visible lg:grid-cols-3">
        {KARTEN.map((s, i) => {
          const video = Boolean(s.vimeo || s.video);
          const spielt = laeuft === s.id && s.video;
          return (
            <li key={s.id} className={`flex w-[82%] flex-none snap-start flex-col sm:w-[60%] md:w-auto ${!alle && i >= ZUERST ? 'md:hidden' : ''}`}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-midnight-blue">
                {spielt ? (
                  <video controls autoPlay playsInline poster={s.video!.standbild} className="h-full w-full bg-midnight-blue object-contain" aria-label={`${s.name} erzählt von der Zusammenarbeit`}>
                    <source src={s.video!.quelle} type="video/mp4" />
                  </video>
                ) : (
                  <img src={s.bild} alt={s.name} width={540} height={960} loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_22%]" />
                )}
                {video && !spielt && (
                  <button
                    type="button"
                    onClick={() => (s.vimeo ? setVimeo(s.vimeo) : setLaeuft(s.id))}
                    className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-montserrat text-xs font-bold text-midnight-blue shadow-[0_6px_18px_-8px_rgba(19,35,63,0.55)] transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
                    aria-label={`Video von ${s.name} ansehen`}
                  >
                    <span aria-hidden="true">▶</span> Video
                  </button>
                )}
              </div>

              <blockquote className="mt-6 font-montserrat text-lg font-semibold leading-snug text-midnight-blue">„{s.zitat}“</blockquote>
              {s.saetze?.[0] && <p className="mt-3 font-inter text-[15px] leading-relaxed text-midnight-blue/70">„{s.saetze[0]}“</p>}

              <div className="mt-auto pt-6">
                <span aria-hidden="true" className="block h-0.5 w-10 bg-[#C9A961]" />
                <p className="mt-3 font-montserrat text-base font-extrabold">{s.name}</p>
                {s.rolle[0] && <p className="mt-0.5 font-inter text-sm text-midnight-blue/65">{s.rolle[0]}</p>}
                {s.verweis && (
                  <a href={s.verweis.ziel} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-inter text-sm text-midnight-blue underline decoration-[#C9A961] decoration-[1.5px] underline-offset-4 hover:text-royal-navy">
                    {s.verweis.text} ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {KARTEN.length > ZUERST && !alle && (
        <div className="mt-12 hidden justify-center md:flex">
          <button type="button" onClick={() => setAlle(true)} className="rounded-full border-2 border-[#C9A961] bg-white px-7 py-3 font-montserrat text-sm font-bold text-midnight-blue transition-colors hover:bg-[#C9A961]/10">
            Weitere Stimmen ansehen
          </button>
        </div>
      )}

      {vimeo && <VideoModal vimeoUrl={vimeo} onClose={() => setVimeo(null)} />}
    </section>
  );
}
