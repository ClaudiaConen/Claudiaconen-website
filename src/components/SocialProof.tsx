import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import VideoModal from './VideoModal';

/**
 * Kundenstimmen: vorn die Person, daneben das laufende Band der Videos.
 *
 * Claudias Idee vom 21.09.2026 (ihr Fund vollekurse.com, "natuerlich alles in unseren Farben"):
 * Ein Band aus Hochformat-Videos laeuft durch; tippt man eines an, "oeffnet sich vorne die
 * Seite mit dem Profilbild der Person und dem Text, den sie ueber mich gesprochen hat".
 *
 * WAS SIE AN DEN ENTWUERFEN KORRIGIERT HAT - bitte nicht zurueckbauen
 * (projects/claudiaconen/DESIGN_PRAEFERENZEN.md, Nachtrag 21.09.2026):
 *   - Videos so hoch wie die Karte (eine Linie).
 *   - KEIN rundes Foto aus einem Videoausschnitt ("sieht sehr unecht aus") - die Karte lebt von
 *     der Schrift: Ergebnis auf Gold, gross das Zitat, unten wie eine Unterschrift Name (Gold),
 *     Beruf, Ort, Verweis - auf JEDER Karte dieselbe Ordnung.
 *   - KEIN deckender Abspiel-Punkt im Gesicht: das Zeichen sitzt unten neben dem Namen,
 *     durchsichtig, der Pfeil bewegt sich leicht.
 *   - Die Karte hat NIE eine feste Hoehe - sonst laeuft Text unten aus dem Blauen (so
 *     verschwanden Verenas Ort und Melanies Verweis). Mindesthoehe ja, feste Hoehe nein.
 *   - Deckende Flaechen, kein Milchglas ("schmierig"), kein Grau, Gold nie als Schrift auf Hell.
 *
 * WARUM DIE NAMEN IM CODE STEHEN und nicht aus der Datenbank kommen: In der Tabelle
 * `testimonials` heissen alle zehn "Was Kunden sagen." plus Nummer. Claudia hat die Menschen am
 * 21./22.09.2026 einzeln benannt (Webseite oder LinkedIn je Person) und erklaert, dass sie von
 * allen das Ja zur Veroeffentlichung hat. So stehen Namen, Berufe und Saetze ausserdem schon im
 * ausgelieferten HTML - ein Video kann keine Suchmaschine und keine KI lesen.
 * Die Datenbank wird trotzdem befragt: Was dort abgeschaltet ist, verschwindet; was neu
 * dazukommt, erscheint mit dem Namen aus der Datenbank.
 *
 * VERWEIS-REGEL: Webseite bei Selbststaendigen, LinkedIn bei Angestellten.
 * ZITAT-REGEL: woertlich, nur von Fuellwoertern befreit; nichts hinzudichten; keine
 * Neuro-Begriffe uebernehmen. Verena: aus dem Video (Transkript in der Ablage). Melanie Miniaci:
 * ihre GESCHRIEBENE, schon veroeffentlichte Kundenstimme von claudia-conen.webflow.io.
 */

type Stimme = {
  id: string;
  name: string;
  /** Zeilen der Unterschrift unter dem Namen: Beruf, dann Ort. */
  rolle: string[];
  /** Kurze Zeile auf der Videokachel. */
  kurz: string;
  bild: string;
  vimeo?: string;
  /** Eigenes Video statt Vimeo (Verena). */
  video?: { quelle: string; standbild: string; dauer: string };
  ergebnis?: string;
  zitat?: string;
  saetze?: string[];
  verweis?: { text: string; ziel: string };
};

const kachel = (id: string) => `/kundenstimmen/${id}.webp`;

const STIMMEN: Stimme[] = [
  {
    id: 'verena-sommerfeld',
    name: 'Verena Sommerfeld',
    rolle: ['Bauingenieurin und Energieberaterin', 'Esslingen'],
    kurz: 'Energieberaterin',
    bild: '/kundenstimmen/verena-sommerfeld.webp',
    video: { quelle: '/kundenstimmen/verena-sommerfeld.mp4', standbild: '/kundenstimmen/verena-sommerfeld-video.jpg', dauer: '2 Minuten' },
    ergebnis: 'Die Scheu vor der Kamera abgelegt',
    zitat: 'Ich habe sie wirklich abgelegt, diese Scheu vor der Kamera.',
    saetze: [
      'Ich möchte mich nie wieder im Leben verstellen.',
      'Ich interessiere mich für den Menschen dahinter, und zu dem rede ich. Und nicht dieses ganze Kopfkino. Das hast du mir wirklich sehr deutlich beigebracht.',
      'Du bist wahnsinnig vertrauensvoll, und ich habe mich gleich gut aufgehoben gefühlt.',
    ],
    verweis: { text: 'Zur Webseite von Verena Sommerfeld', ziel: 'https://sommerfeld-energieberatung.de/' },
  },
  {
    id: 'e24ec4f8-58df-4622-b0a3-f2498fa7dae9',
    name: 'Freimuth Gorter',
    rolle: ['Heilpraktiker, Pohl®-Therapeut, Masseur', 'Köln und Essen'],
    kurz: 'Heilpraktiker und Pohl®-Therapeut',
    bild: kachel('e24ec4f8-58df-4622-b0a3-f2498fa7dae9'),
    vimeo: 'https://vimeo.com/1144142816',
    verweis: { text: 'Zur Webseite von Freimuth Gorter', ziel: 'https://gorter-pohltherapie.de/' },
  },
  {
    id: '08454326-b1e9-4ff6-8d83-ad919a77f471',
    name: 'Melanie Miniaci',
    rolle: ['Gründerin von Miderma', 'Permanent Make-up und Medical Beauty'],
    kurz: 'Gründerin von Miderma',
    bild: kachel('08454326-b1e9-4ff6-8d83-ad919a77f471'),
    vimeo: 'https://vimeo.com/1144287147',
    ergebnis: 'Hat mich unheimlich nach vorne gebracht',
    zitat: 'Die Texte fühlen sich für mich so an, als hätte ich sie selber gesagt.',
    saetze: [
      'Die Zusammenarbeit mit Claudia Conen hat mich unheimlich nach vorne gebracht – mir viel Zeit erspart und es war das Beste, was mir passieren konnte.',
      'Sie konnte sich im Vorfeld ganz mit mir identifizieren, so dass sie wusste, worum es bei mir und meiner Arbeit geht.',
    ],
    verweis: { text: 'Zur Webseite von Melanie Miniaci', ziel: 'https://miderma.de/' },
  },
  {
    id: '14e3877b-1e92-412b-b8a7-2efa39b84b0e',
    name: 'Stephan',
    rolle: ['Kameramann', 'gemeinsame Videoproduktionen'],
    kurz: 'Kameramann',
    bild: kachel('14e3877b-1e92-412b-b8a7-2efa39b84b0e'),
    vimeo: 'https://vimeo.com/1144142728',
  },
  {
    id: '7558459a-a382-4f80-8516-fa693a79d6b0',
    name: 'Anke Elsa Delfs',
    rolle: ['Coach für innere Freiheit', 'Altenhof, Schleswig-Holstein'],
    kurz: 'Coach für innere Freiheit',
    bild: kachel('7558459a-a382-4f80-8516-fa693a79d6b0'),
    vimeo: 'https://vimeo.com/1144142752',
    verweis: { text: 'Anke Elsa Delfs bei LinkedIn', ziel: 'https://www.linkedin.com/in/anke-elsa-delfs-969a58261/' },
  },
  {
    id: '50715858-3031-4425-8699-390ef9ccfd09',
    name: 'Führungskraft bei Dometic',
    rolle: [],
    kurz: 'Dometic',
    bild: kachel('50715858-3031-4425-8699-390ef9ccfd09'),
    vimeo: 'https://vimeo.com/1144142331',
  },
  {
    id: 'e64fb9d8-f655-4f6c-a8b6-9a07fb398980',
    name: 'Thomas Kampmann',
    rolle: ['Dometic', 'Velbert'],
    kurz: 'Dometic',
    bild: kachel('e64fb9d8-f655-4f6c-a8b6-9a07fb398980'),
    vimeo: 'https://vimeo.com/1144142195',
    verweis: { text: 'Thomas Kampmann bei LinkedIn', ziel: 'https://www.linkedin.com/in/thomas-kampmann-851557131/' },
  },
  {
    id: 'c84ef2dd-bfc5-4fba-af01-693552fc0918',
    name: 'Cornelia Strunz',
    rolle: ['Autorin und Podcasterin', 'Magdeburg'],
    kurz: 'Autorin und Podcasterin',
    bild: kachel('c84ef2dd-bfc5-4fba-af01-693552fc0918'),
    vimeo: 'https://vimeo.com/1144278359',
    verweis: { text: 'Cornelia Strunz bei LinkedIn', ziel: 'https://www.linkedin.com/in/corneliastrunz/' },
  },
  {
    id: '591c6945-460f-4e6a-8ae6-567bdd3f3024',
    name: 'Regina Volz',
    rolle: ['Inhaberin der Volz Personalberatung', 'Köln'],
    kurz: 'Headhunterin und Leadership-Coach',
    bild: kachel('591c6945-460f-4e6a-8ae6-567bdd3f3024'),
    vimeo: 'https://vimeo.com/1144281010',
    verweis: { text: 'Zur Webseite von Regina Volz', ziel: 'https://www.volz-personalberatung.de/' },
  },
  // Nummer 9 und 10 hat Claudia noch nicht benannt (Stand 22.09.2026).
  {
    id: '8a1870dc-1b72-4eec-a206-5ecc93a12568',
    name: 'Kundenstimme',
    rolle: [],
    kurz: 'im Video',
    bild: kachel('8a1870dc-1b72-4eec-a206-5ecc93a12568'),
    vimeo: 'https://vimeo.com/1144280791',
  },
  {
    id: 'f5bf13c7-0387-45ed-aaec-18a91a0b318f',
    name: 'Kundenstimme',
    rolle: [],
    kurz: 'im Video',
    bild: kachel('f5bf13c7-0387-45ed-aaec-18a91a0b318f'),
    vimeo: 'https://vimeo.com/1144280941',
  },
];

const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

export default function SocialProof() {
  const [stimmen, setStimmen] = useState<Stimme[]>(STIMMEN);
  const [gewaehlt, setGewaehlt] = useState(0);
  const [vimeoOffen, setVimeoOffen] = useState<string | null>(null);
  const [videoOffen, setVideoOffen] = useState(false);
  const reihe = useRef<HTMLDivElement>(null);

  // Datenbank: Abgeschaltetes verschwindet, Neues kommt dazu. Die Namen oben bleiben massgeblich.
  useEffect(() => {
    let lebt = true;
    supabase
      .from('testimonials')
      .select('id,name,role,vimeo_url,thumbnail_path,is_active,display_order')
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (!lebt || error || !data) return;
        if (data.length === 0) return; // leere Antwort (z. B. Zugriffsregel) - lieber nichts ausblenden
        const aktiv = new Set(data.filter((z) => z.is_active !== false).map((z) => z.id));
        // "aus" = ein Vimeo-Eintrag von oben, den die Datenbank nicht (mehr) als aktiv liefert
        const aus = new Set(STIMMEN.filter((s) => s.vimeo && !aktiv.has(s.id)).map((s) => s.id));
        const bekannt = new Set(STIMMEN.map((s) => s.id));
        const neu: Stimme[] = data
          .filter((z) => z.is_active && !bekannt.has(z.id) && z.vimeo_url)
          .map((z) => ({
            id: z.id,
            name: z.name || 'Kundenstimme',
            rolle: z.role ? [z.role] : [],
            kurz: z.role || 'im Video',
            bild: z.thumbnail_path
              ? supabase.storage.from('testimonial-thumbnails').getPublicUrl(z.thumbnail_path).data.publicUrl
              : '',
            vimeo: z.vimeo_url,
          }));
        if (aus.size === 0 && neu.length === 0) return;
        setStimmen([...STIMMEN.filter((s) => !aus.has(s.id)), ...neu]);
        setGewaehlt(0);
      });
    return () => {
      lebt = false;
    };
  }, []);

  // Sanftes, endloses Treiben des Bandes: die Kacheln stehen zweimal hintereinander; ist der
  // erste Durchgang durchgelaufen, springt die Position unsichtbar zurueck. Ein einziger
  // scrollLeft-Schreibvorgang je Bild, kein Neuzeichnen. Haelt an, sobald jemand das Band
  // beruehrt, und laeuft vier Sekunden danach weiter. Wischen geht immer.
  useEffect(() => {
    const el = reihe.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pause = false;
    let sichtbar = false;
    let pos = el.scrollLeft;
    let zeit: number | undefined;
    let bild = 0;
    const halt = () => {
      pause = true;
      window.clearTimeout(zeit);
    };
    const weiter = () => {
      window.clearTimeout(zeit);
      zeit = window.setTimeout(() => {
        pause = false;
        pos = el.scrollLeft;
      }, 4000);
    };
    const an = ['pointerdown', 'touchstart', 'wheel', 'focusin', 'mouseenter'] as const;
    const ab = ['pointerup', 'touchend', 'mouseleave', 'focusout'] as const;
    an.forEach((n) => el.addEventListener(n, halt, { passive: true }));
    ab.forEach((n) => el.addEventListener(n, weiter, { passive: true }));
    const io = new IntersectionObserver((e) => {
      sichtbar = e[0].isIntersecting;
    });
    io.observe(el);
    const schritt = () => {
      const k = el.children;
      const halb = k.length > 1 ? (k[k.length / 2] as HTMLElement).offsetLeft - (k[0] as HTMLElement).offsetLeft : 0;
      if (halb > 0) {
        if (!pause && sichtbar) {
          pos += 0.4;
          if (pos >= halb) pos -= halb;
          el.scrollLeft = pos;
        } else if (el.scrollLeft >= halb) {
          el.scrollLeft -= halb;
        }
      }
      bild = requestAnimationFrame(schritt);
    };
    bild = requestAnimationFrame(schritt);
    return () => {
      cancelAnimationFrame(bild);
      window.clearTimeout(zeit);
      io.disconnect();
      an.forEach((n) => el.removeEventListener(n, halt));
      ab.forEach((n) => el.removeEventListener(n, weiter));
    };
  }, [stimmen.length]);

  const s = stimmen[Math.min(gewaehlt, stimmen.length - 1)];
  if (!s) return null;

  const waehle = (i: number) => {
    setGewaehlt(i);
    setVideoOffen(false);
  };
  const spiele = (st: Stimme, i: number) => {
    setGewaehlt(i);
    if (st.vimeo) setVimeoOffen(st.vimeo);
    else setVideoOffen(true);
  };

  return (
    <section
      id="social-proof"
      className="bg-pearl-white py-14 text-midnight-blue md:py-20 [--h:clamp(400px,118vw,470px)] lg:[--h:clamp(460px,40vw,540px)]"
      aria-labelledby="testimonials-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-headline"
          className="font-montserrat text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl"
        >
          Menschen, mit denen ich{' '}
          <span className="bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-[length:100%_0.15em] bg-[position:0_96%] bg-no-repeat pb-[0.05em]">
            gearbeitet
          </span>{' '}
          habe
        </h2>
        <p className="mt-3 max-w-2xl font-inter text-base leading-relaxed text-midnight-blue/80 md:text-lg">
          Keine ausgedachten Zitate. Tippe ein Video an – und lies, was sie sagen.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:px-8">
        {/* Die Person - vorn. Alle Karten stehen unten noch einmal vollstaendig im HTML. */}
        <article
          key={s.id}
          aria-live="polite"
          className="cc-herein mx-4 flex min-h-[var(--h)] min-w-0 flex-col gap-4 rounded-[18px] border-2 border-[#D4AF37] bg-midnight-blue p-6 text-pearl-white shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:mx-6 sm:p-8 lg:mx-0"
        >
          {s.ergebnis && (
            <p className={`self-start rounded-md px-3.5 py-2 font-montserrat text-xs font-extrabold uppercase leading-snug tracking-[0.1em] text-midnight-blue ${GOLD}`}>
              {s.ergebnis}
            </p>
          )}

          {s.zitat ? (
            <blockquote className="font-cormorant text-[1.6rem] font-semibold italic leading-[1.28] text-white sm:text-[1.8rem]">
              „{s.zitat}"
            </blockquote>
          ) : (
            <p className="font-cormorant text-[1.6rem] font-semibold italic leading-[1.28] text-white sm:text-[1.8rem]">
              Im Video: die Zusammenarbeit – in eigenen Worten.
            </p>
          )}

          {s.saetze && s.saetze.length > 0 && (
            <ul className="flex list-none flex-col gap-2.5 p-0">
              {s.saetze.map((satz) => (
                <li key={satz} className="grid grid-cols-[22px_1fr] gap-1.5 font-inter text-[15.5px] leading-[1.45] text-white/90">
                  <span aria-hidden="true" className={`mt-[0.72em] h-0.5 w-3 ${GOLD}`} />
                  <span>„{satz}"</span>
                </li>
              ))}
            </ul>
          )}

          {videoOffen && s.video && (
            <video
              controls
              autoPlay
              playsInline
              poster={s.video.standbild}
              className="block aspect-video w-full rounded-xl border border-[#D4AF37]/55 bg-black"
              aria-label={`${s.name} erzählt von der Zusammenarbeit, ${s.video.dauer}`}
            >
              <source src={s.video.quelle} type="video/mp4" />
            </video>
          )}

          <div className="mt-auto flex flex-col items-start gap-2.5 border-t border-[#D4AF37]/55 pt-4">
            <div>
              <p className="font-montserrat text-xl font-extrabold leading-tight text-[#EBD197]">{s.name}</p>
              {s.rolle.map((zeile, i) => (
                <p key={zeile} className={`mt-1 font-inter text-[15px] font-medium leading-snug ${i === 0 ? 'text-white' : 'text-white/80'}`}>
                  {zeile}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {!(videoOffen && s.video) && (
                <button
                  type="button"
                  onClick={() => spiele(s, gewaehlt)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-montserrat text-sm font-extrabold text-midnight-blue transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EBD197] motion-reduce:transition-none ${GOLD}`}
                >
                  <span aria-hidden="true">▶</span>
                  Video ansehen{s.video ? ` · ${s.video.dauer}` : ''}
                </button>
              )}
              {s.verweis && (
                <a
                  href={s.verweis.ziel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter text-[13.5px] text-pearl-white underline decoration-[#D4AF37] decoration-[1.5px] underline-offset-4 transition-colors hover:text-[#EBD197]"
                >
                  {s.verweis.text} ↗
                </a>
              )}
            </div>
          </div>
        </article>

        {/* Das Band - so hoch wie die Karte. Zweimal hintereinander fuer das endlose Treiben. */}
        <div
          ref={reihe}
          className="cc-ohne-leiste flex items-stretch gap-3.5 overflow-x-auto px-4 pb-5 pt-1.5 sm:px-6 lg:px-0"
          aria-label="Kundenvideos, seitlich wischen"
        >
          {[0, 1].map((runde) =>
            stimmen.map((st, i) => (
              <div
                key={`${runde}-${st.id}`}
                aria-hidden={runde === 1 ? true : undefined}
                className={`group relative aspect-[9/16] h-[var(--h)] flex-none overflow-hidden rounded-2xl bg-[#0F1F3A] transition-[border-color,box-shadow] duration-200 hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] ${
                  i === gewaehlt ? 'border-[3px] border-[#D4AF37] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]' : 'border-[1.5px] border-midnight-blue/15 hover:border-[#D4AF37]'
                }`}
              >
                <button
                  type="button"
                  tabIndex={runde === 1 ? -1 : undefined}
                  onClick={() => waehle(i)}
                  aria-pressed={i === gewaehlt}
                  aria-label={`${st.name}: lesen, was im Video gesagt wird`}
                  className="absolute inset-0 block h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-[#EBD197]"
                >
                  {st.bild && (
                    <img
                      src={st.bild}
                      alt=""
                      width={540}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0)_52%,rgba(10,22,40,0.5)_74%,rgba(10,22,40,0.92)_100%)]"
                  />
                </button>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2.5 px-4 pb-[18px] pt-4 text-white">
                  <button
                    type="button"
                    tabIndex={runde === 1 ? -1 : undefined}
                    onClick={() => spiele(st, i)}
                    aria-label={`Video von ${st.name} abspielen`}
                    className={`cc-pfeil pointer-events-auto grid h-[42px] w-[42px] flex-none cursor-pointer place-items-center rounded-full border-[1.5px] bg-midnight-blue/20 transition-colors hover:bg-midnight-blue/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EBD197] ${
                      i === gewaehlt ? 'border-[#EBD197] text-[#EBD197]' : 'border-white/85 text-white'
                    }`}
                  />
                  <span className="flex min-w-0 flex-col gap-0.5 text-left">
                    <span className="font-montserrat text-[14.5px] font-extrabold leading-tight tracking-[0.02em]">{st.name}</span>
                    <span className="font-inter text-xs font-medium leading-snug text-white/85">{st.kurz}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Alle Stimmen noch einmal als Text: Die Karte oben zeigt immer nur EINE Person; hier stehen
          alle im HTML - fuer Vorleseprogramme, Suchmaschinen und KI. Sichtbar ist es nicht. */}
      <div className="sr-only">
        <h3>Alle Kundenstimmen im Überblick</h3>
        {stimmen
          .filter((st) => st.name !== 'Kundenstimme')
          .map((st) => (
            <figure key={st.id}>
              {st.zitat && <blockquote>„{st.zitat}"</blockquote>}
              {st.saetze?.map((satz) => <p key={satz}>„{satz}"</p>)}
              <figcaption>
                {st.name}
                {st.rolle.length > 0 ? ` – ${st.rolle.join(', ')}` : ''}
              </figcaption>
            </figure>
          ))}
      </div>

      {vimeoOffen && <VideoModal vimeoUrl={vimeoOffen} onClose={() => setVimeoOffen(null)} />}
    </section>
  );
}
