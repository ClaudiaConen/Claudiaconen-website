import { useEffect, useRef, useState } from 'react';
import { Calendar, Pause, Play } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AudioButton from './AudioButton';
import ChallengeBand from './ChallengeBand';
import VideoButton from './VideoButton';
import VideoModal from './VideoModal';

/**
 * Kopfbereich mit Video ueber die volle Breite (Claudia, 23.09.2026 09:23 UTC:
 * "ein Vorschlag, wie es aussehen wuerde, wenn ein Video ueber die ganze Seite geht -
 * ich moechte es nicht so dunkel").
 *
 * Aufbau, von hinten nach vorn:
 *   1. Standbild (public/hero-video/poster-*.webp, das Vorschaubild des Vimeo-Videos
 *      1143907515) - das ist der vollstaendige erste Zustand: ohne JavaScript, bei
 *      abgeschalteter Bewegung, im Stromsparmodus und auf dem Telefon steht genau das.
 *   2. Das Video, stumm und in Schleife, nur ab 1024 px Breite und nur, wenn niemand
 *      Bewegung oder Datensparen eingestellt hat. Es wird erst nach dem Laden der Seite
 *      eingehaengt und blendet ein, sobald es wirklich laeuft - vorher bleibt das Standbild.
 *      Ausserhalb des Bildes und im versteckten Tab haelt es an. Ein kleiner Knopf unten
 *      rechts haelt es an und startet es wieder.
 *   3. Der Schleier: links deckend in der Farbe der Seite, nach rechts auslaufend. Die
 *      Schrift steht immer auf dem deckenden Teil (gemessen am Standbild: linkes Drittel
 *      Helligkeit 59/255, Mitte 118 - der Schleier ist auf den hellsten Frame ausgelegt).
 *   4. Der Text: Ueberschrift, zwei Saetze, ein Knopf. Nicht mehr - alles Weitere steht
 *      im hellen Streifen darunter (die sieben Schluessel, das Laufband).
 *
 * HELL = true: Seite in Pearl, Schrift Nachtblau, Gold nur als Linie, Knopf und Rand
 * (Claudias Regel: Gold nie als Schrift auf Hell). HELL = false: Nachtblau-Schleier,
 * Schrift Pearl, Gold-Schimmer wie bisher.
 *
 * Video-Quelle: Solange keine MP4-Datei vorliegt, laeuft der Vimeo-Hintergrundplayer
 * (Konto ist "pro", background=1 ist damit erlaubt). Liegt spaeter ein geschnittener
 * Loop in public/hero-video/, wird LOOP ausgefuellt und das <video>-Element uebernimmt.
 */
export const HERO_HELL = true;
/** Der Kachelstreifen unter dem Video bleibt nachtblau, auch wenn der Kopf hell ist - Claudia, 23.09.2026 09:55 UTC:
 *  "die Buttons darunter bleiben auf blau, damit der Gold-Effekt passt". Gold-Schimmer und Goldrand wirken auf Nachtblau. */
const STREIFEN_DUNKEL = true;
const VIMEO_ID = '1143907515';
const LOOP = { mp4: '', webm: '' };

interface StepMedia {
  step_number: number;
  media_type: 'audio' | 'video';
  media_url: string;
  platform: 'youtube' | 'vimeo' | null;
}

const SCHLUESSEL = [
  { icon: 'klarheit', title: 'KLARHEIT.', subtitle: 'Wofür du stehst.', href: '#schritt3', stepNumber: 3 },
  { icon: 'botschaft', title: 'BOTSCHAFT.', subtitle: 'Die Vertrauen schafft.', href: '#schritt2', stepNumber: 2 },
  { icon: 'story', title: 'STORY.', subtitle: 'Die Emotionen weckt.', href: '#schritt4', stepNumber: 4 },
  { icon: 'stimme', title: 'STIMME.', subtitle: 'Die unaufhaltbar ist.', href: '#schritt6', stepNumber: 6 },
  { icon: 'praesenz', title: 'PRÄSENZ.', subtitle: 'Die wirkt, bevor du sprichst.', href: '#schritt5', stepNumber: 5 },
  { icon: 'ki', title: 'KI.', subtitle: 'Die dich beschleunigt.', href: '#schritt1', stepNumber: 1 },
  { icon: 'wirkung', title: 'WIRKUNG.', subtitle: 'Die bleibt.', href: '#schritt7', stepNumber: 7 },
];

function sanftZu(selector: string) {
  const target = document.querySelector(selector);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.pageYOffset - 100;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

/** Darf das Video ueberhaupt laufen? Nur breit, nur ohne Bewegungs- oder Datensparwunsch. */
function videoErlaubt(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const verbindung = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (verbindung && verbindung.saveData) return false;
  return true;
}

export default function Hero() {
  const [stepMediaData, setStepMediaData] = useState<Record<number, StepMedia>>({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; platform: 'youtube' | 'vimeo'; title: string } | null>(null);

  // Video-Zustand: eingehaengt (nach dem Laden), sichtbar (laeuft wirklich), angehalten (per Knopf).
  const [videoEingehaengt, setVideoEingehaengt] = useState(false);
  const [videoSichtbar, setVideoSichtbar] = useState(false);
  const [angehalten, setAngehalten] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imBildRef = useRef(true);
  const angehaltenRef = useRef(false);

  useEffect(() => {
    loadStepMedia();
  }, []);

  const loadStepMedia = async () => {
    try {
      const { data, error } = await supabase.from('step_media').select('*');
      if (error) throw error;
      if (data) {
        const mediaMap: Record<number, StepMedia> = {};
        data.forEach((item) => {
          mediaMap[item.step_number] = item;
        });
        setStepMediaData(mediaMap);
      }
    } catch (error) {
      console.error('Error loading step media:', error);
    }
  };

  // Erst nach dem Laden der Seite einhaengen - das Standbild ist der erste Eindruck, nicht das Video.
  useEffect(() => {
    if (!videoErlaubt()) return;
    let fertig = false;
    const einhaengen = () => {
      if (fertig) return;
      fertig = true;
      setVideoEingehaengt(true);
    };
    if (document.readyState === 'complete') {
      const id = window.setTimeout(einhaengen, 400);
      return () => window.clearTimeout(id);
    }
    window.addEventListener('load', einhaengen, { once: true });
    return () => window.removeEventListener('load', einhaengen);
  }, []);

  // Vimeo meldet ueber postMessage, ob es laeuft. Erst dann blenden wir ein - sonst bleibt das Standbild.
  const anVimeo = (method: string, value?: unknown) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), 'https://player.vimeo.com');
  };

  useEffect(() => {
    if (!videoEingehaengt || LOOP.mp4) return;
    const aufNachricht = (e: MessageEvent) => {
      if (e.origin !== 'https://player.vimeo.com') return;
      let daten: { event?: string; method?: string } = {};
      try {
        daten = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (daten.event === 'ready') {
        anVimeo('addEventListener', 'play');
        anVimeo('addEventListener', 'timeupdate');
        anVimeo('setVolume', 0);
      }
      if (daten.event === 'play' || daten.event === 'timeupdate') {
        setVideoSichtbar(true);
      }
    };
    window.addEventListener('message', aufNachricht);
    return () => window.removeEventListener('message', aufNachricht);
  }, [videoEingehaengt]);

  // Anhalten, sobald der Kopf aus dem Bild ist oder der Tab versteckt wird - eine Schleife, die niemand sieht, kostet nur.
  const spielen = () => {
    if (angehaltenRef.current || !imBildRef.current || document.hidden) return;
    if (LOOP.mp4) videoRef.current?.play().catch(() => setVideoSichtbar(false));
    else anVimeo('play');
  };
  const pausieren = () => {
    if (LOOP.mp4) videoRef.current?.pause();
    else anVimeo('pause');
  };

  useEffect(() => {
    if (!videoEingehaengt || !sectionRef.current) return;
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        imBildRef.current = eintrag.isIntersecting;
        if (eintrag.isIntersecting) spielen();
        else pausieren();
      },
      { threshold: 0.05 }
    );
    beobachter.observe(sectionRef.current);
    const aufSichtbarkeit = () => (document.hidden ? pausieren() : spielen());
    document.addEventListener('visibilitychange', aufSichtbarkeit);
    return () => {
      beobachter.disconnect();
      document.removeEventListener('visibilitychange', aufSichtbarkeit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoEingehaengt]);

  const knopfUmschalten = () => {
    const neu = !angehaltenRef.current;
    angehaltenRef.current = neu;
    setAngehalten(neu);
    if (neu) pausieren();
    else spielen();
  };

  const handleVideoClick = (url: string, platform: 'youtube' | 'vimeo', title: string) => {
    setCurrentVideo({ url, platform, title });
    setVideoModalOpen(true);
  };

  const hell = HERO_HELL;
  const streifenHell = hell && !STREIFEN_DUNKEL;
  const vimeoSrc = `https://player.vimeo.com/video/${VIMEO_ID}?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&quality=720p`;

  return (
    <>
      <section
        ref={sectionRef}
        className={`cc-hero ${hell ? 'cc-hero--hell' : 'cc-hero--dunkel'} relative overflow-hidden`}
        aria-labelledby="hero-headline"
      >
        {/* Buehne: Standbild zuerst, Video darueber, sobald es laeuft. Rein dekorativ. */}
        <div className="cc-hero-buehne" aria-hidden="true">
          <picture>
            <source media="(min-width: 768px)" srcSet="/hero-video/poster-1280.webp" type="image/webp" />
            <source srcSet="/hero-video/poster-768.webp" type="image/webp" />
            <img
              src="/hero-video/poster-1280.jpg"
              alt=""
              width={1280}
              height={720}
              loading="eager"
              decoding="async"
              // @ts-expect-error fetchpriority ist in React 18 noch nicht typisiert, der Browser kennt es.
              fetchpriority="high"
              className="cc-hero-bild"
            />
          </picture>
          {videoEingehaengt && LOOP.mp4 && (
            <video
              ref={videoRef}
              className={`cc-hero-video ${videoSichtbar ? 'ist-sichtbar' : ''}`}
              muted
              playsInline
              autoPlay
              loop
              preload="metadata"
              poster="/hero-video/poster-1280.jpg"
              onPlaying={() => setVideoSichtbar(true)}
              tabIndex={-1}
            >
              {LOOP.webm && <source src={LOOP.webm} type="video/webm" />}
              <source src={LOOP.mp4} type="video/mp4" />
            </video>
          )}
          {videoEingehaengt && !LOOP.mp4 && (
            <iframe
              ref={iframeRef}
              src={vimeoSrc}
              className={`cc-hero-video ${videoSichtbar ? 'ist-sichtbar' : ''}`}
              title=""
              tabIndex={-1}
              allow="autoplay"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => {
                // Falls das "ready" des Players schon vor unserem Lauscher kam: Ereignisse nochmals anmelden.
                anVimeo('addEventListener', 'play');
                anVimeo('addEventListener', 'timeupdate');
              }}
            />
          )}
        </div>
        <div className="cc-hero-schleier" aria-hidden="true" />

        <div className="cc-hero-inhalt relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="cc-hero-text max-w-[40rem]">
            <div className="accent-line" />
            <h1 id="hero-headline" className="font-montserrat font-bold text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className={hell ? 'cc-hero-zeile1' : 'headline-line1'}>Würdest du DIR selbst zuhören?</span>
              <span className={`${hell ? 'cc-hero-zeile2' : 'headline-line2'} mt-3 block text-xl sm:text-2xl md:text-3xl`}>
                Berühre das Herz. Bleib im Kopf.
              </span>
            </h1>

            <p className={`cc-hero-satz mt-6 font-inter text-lg leading-relaxed sm:text-xl md:text-2xl ${hell ? 'text-midnight-blue' : 'text-pearl-white/90'}`}>
              <span className="block">
                KI liefert <strong className={hell ? 'cc-kw-hell' : 'keyword-highlight'}>Perfektion</strong> auf Mausklick.
              </span>
              <span className="mt-2 block">
                Deine <strong className={hell ? 'cc-kw-hell' : 'keyword-highlight'}>Unverwechselbarkeit</strong> schafft{' '}
                <strong className={hell ? 'cc-kw-hell' : 'keyword-highlight'}>Vertrauen</strong>.
              </span>
            </p>

            <div className="mt-8">
              <a
                href="#schritt1"
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] px-6 py-4 text-sm font-semibold text-midnight-blue sm:w-auto sm:px-8 sm:text-base shadow-[0_14px_30px_-14px_rgba(10,22,40,0.45)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                onClick={(e) => {
                  e.preventDefault();
                  sanftZu('#schritt1');
                }}
              >
                <Calendar size={20} />
                JETZT UNVERWECHSELBAR WERDEN
              </a>
            </div>
          </div>
        </div>

        {videoEingehaengt && (
          <button
            type="button"
            onClick={knopfUmschalten}
            aria-pressed={angehalten}
            aria-label={angehalten ? 'Hintergrundvideo abspielen' : 'Hintergrundvideo anhalten'}
            className={`cc-hero-pause absolute bottom-24 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
              hell
                ? 'border-[#D4AF37]/70 bg-white/85 text-midnight-blue hover:bg-white'
                : 'border-[#D4AF37]/60 bg-[#0A1628]/70 text-[#F7E7CE] hover:bg-[#0A1628]'
            }`}
          >
            {angehalten ? <Play size={18} className="ml-0.5" /> : <Pause size={18} />}
          </button>
        )}
      </section>

      {/* Der Streifen: die sieben Schluessel als Kacheln, darunter das Laufband. Liegt leicht ueber der
          Unterkante des Videos und laeuft von Rand zu Rand (Claudia, 23.09.2026 10:13 UTC: "ganz nach rechts
          und links an den Rand ... einheitlicher"); der Inhalt sitzt in der Breite der Menueleiste (1600 px).
          Kachel-Regeln vom 23.09.2026 ("die Schrift in den kleinen Audios ist nicht mehr lesbar"): Titel bricht
          nie um, Unterzeile in voller Staerke, Abspielknopf hat seine eigene Ecke. */}
      <div
        className={`cc-hero-streifen relative z-20 border-y shadow-[0_24px_60px_-30px_rgba(10,22,40,0.35)] ${
          streifenHell ? 'border-[#D4AF37]/45 bg-white/95' : 'border-[#D4AF37]/35 bg-[#0F1F3A]'
        } ${hell ? '' : 'cc-hero-streifen--dunkel'}`}
      >
        <div className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="hero-kacheln flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 lg:grid-cols-7">
            {SCHLUESSEL.map((point) => {
              const media = stepMediaData[point.stepNumber];
              return (
                <a
                  key={point.icon}
                  href={point.href}
                  className={`cc-schluessel group relative flex w-[10.75rem] flex-shrink-0 snap-start flex-col gap-2 rounded-xl border p-3 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:w-auto sm:flex-shrink ${
                    streifenHell ? 'border-[#D4AF37]/50 bg-white hover:border-[#D4AF37]' : 'border-[#D4AF37]/40 bg-[#13233F] hover:border-[#EBD197]'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    sanftZu(point.href);
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={`/icons/${point.icon}.webp`}
                      alt=""
                      width={256}
                      height={256}
                      loading="eager"
                      decoding="async"
                      className="h-10 w-10 flex-shrink-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                    />
                    {media && (
                      <div className="-mr-1 -mt-1 flex-shrink-0 scale-90" onClick={(e) => e.stopPropagation()}>
                        {media.media_type === 'audio' ? (
                          <AudioButton audioUrl={media.media_url} ariaLabel={`${point.title} anhören`} />
                        ) : media.media_type === 'video' && media.platform ? (
                          <VideoButton
                            onClick={() => handleVideoClick(media.media_url, media.platform as 'youtube' | 'vimeo', point.title)}
                            ariaLabel={`${point.title} als Video`}
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                  <p className={`whitespace-nowrap font-montserrat text-[0.92rem] font-bold uppercase leading-none tracking-[0.02em] ${streifenHell ? 'text-midnight-blue' : 'text-pearl-white'}`}>
                    {point.title}
                  </p>
                  <p className={`text-[0.8rem] font-medium leading-snug ${streifenHell ? 'text-midnight-blue/85' : 'text-pearl-white/85'}`}>
                    {point.subtitle}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Laufband "Aktuell: 7-Tage-Video-Challenge" - Claudia, 22.09.2026 (unter die Audio-Kacheln). */}
          <ChallengeBand hell={streifenHell} />
        </div>
      </div>

      {currentVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={currentVideo.url}
          platform={currentVideo.platform}
          title={currentVideo.title}
        />
      )}
    </>
  );
}
