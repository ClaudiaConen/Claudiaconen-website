import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AudioButton from './AudioButton';
import VideoButton from './VideoButton';
import VideoModal from './VideoModal';
import { HERO_HELL } from './Hero';

/**
 * Die sieben Schluessel als Kacheln (mit Claudias Audios/Videos). Bis 16.10.2026 klebten sie direkt unter dem
 * Kopfvideo, zusammen mit zwei Laufbaendern. Claudia, 16.10.2026 23:06 UTC: „es muss etwas Ruhe sein … ein bisschen
 * too much und viel zu schnell“. Deshalb eigener Abschnitt weiter unten, direkt vor den sieben Schritten (Timeline),
 * auf die die Kacheln verlinken.
 */
/** Der Kachelstreifen unter dem Video bleibt nachtblau, auch wenn der Kopf hell ist - Claudia, 23.09.2026 09:55 UTC:
 *  "die Buttons darunter bleiben auf blau, damit der Gold-Effekt passt". Gold-Schimmer und Goldrand wirken auf Nachtblau. */
const STREIFEN_DUNKEL = true;

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

export default function SchluesselStreifen() {
  const [stepMediaData, setStepMediaData] = useState<Record<number, StepMedia>>({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; platform: 'youtube' | 'vimeo'; title: string } | null>(null);

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

  const handleVideoClick = (url: string, platform: 'youtube' | 'vimeo', title: string) => {
    setCurrentVideo({ url, platform, title });
    setVideoModalOpen(true);
  };

  const hell = HERO_HELL;
  const streifenHell = hell && !STREIFEN_DUNKEL;

  return (
    <>
      {/* Der Streifen: die sieben Schluessel als Kacheln, darunter das Laufband. Liegt leicht ueber der
          Unterkante des Videos und laeuft von Rand zu Rand (Claudia, 23.09.2026 10:13 UTC: "ganz nach rechts
          und links an den Rand ... einheitlicher"); der Inhalt sitzt in der Breite der Menueleiste (1600 px).
          Kachel-Regeln vom 23.09.2026 ("die Schrift in den kleinen Audios ist nicht mehr lesbar"): Titel bricht
          nie um, Unterzeile in voller Staerke, Abspielknopf hat seine eigene Ecke. */}
      <div
        className={`cc-hero-streifen relative z-10 border-y shadow-[0_24px_60px_-30px_rgba(10,22,40,0.35)] ${
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
                      <div
                        className="-mr-1 -mt-1 flex-shrink-0 scale-90"
                        onClick={(e) => {
                          // preventDefault ist der Punkt: ohne ihn folgt der Browser dem href
                          // der Kachel, obwohl unser eigener Behandler gestoppt wurde.
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
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
