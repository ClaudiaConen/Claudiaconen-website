import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import VideoModal from './VideoModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  vimeo_url: string;
  thumbnail_path: string | null;
  display_order: number;
}

/**
 * Der Anfangsstand, beim Bauen aus Supabase geholt
 * (scripts/stimmen-holen.mjs, Ergebnis in public/stimmen.json).
 *
 * Damit stehen die Stimmen schon im ausgelieferten HTML - vorher stand
 * dort nur "Testimonials werden geladen…", und eine KI sah keine
 * einzige. Im Browser wird trotzdem nachgeladen, damit nichts
 * veraltet.
 *
 * Es sind nur Stimmen MIT ECHTEM NAMEN dabei. Am 20.09.2026 trugen
 * alle zehn als Namen die Abschnittsueberschrift plus eine Nummer;
 * die im Quelltext zu haben waere schlechter als nichts gewesen.
 */
import stimmenAnfang from '../../public/stimmen.json';

/**
 * Vorschaubilder, die es in einer eigenen, aufgehellten Fassung gibt
 * (public/kundenstimmen/<id>.webp).
 *
 * Gemessen am 21.09.2026: Die zehn Bilder im Speicher "testimonial-thumbnails"
 * sind 1080x1920-PNGs mit zusammen 13,1 MB - und in JEDES ist ein dunkler
 * Schleier fest eingerechnet (rund zwei Drittel Deckkraft, Helligkeit 53 bis 76
 * von 255; das Originalvideo zu Nr. 9 liegt bei 128). Deshalb halfen hellere
 * Filter im Code nichts: Das Dunkel steckt in den Dateien. Und weil die Bilder
 * ohne loading="lazy" eingebunden waren, lud jeder Besucher der Startseite
 * diese 13 MB mit.
 *
 * Die eigenen Fassungen sind der herausgerechnete Schleier (Werte an Nr. 9
 * gegen das Originalvideo bestimmt), 540x960, WebP, zusammen 293 KB.
 * Kommt im Adminbereich eine neue Stimme dazu, greift fuer sie wie bisher das
 * Bild aus dem Speicher - bitte dann ein HELLES Bild hochladen.
 */
const AUFGEHELLT = new Set<string>([
  '08454326-b1e9-4ff6-8d83-ad919a77f471',
  '14e3877b-1e92-412b-b8a7-2efa39b84b0e',
  '50715858-3031-4425-8699-390ef9ccfd09',
  '591c6945-460f-4e6a-8ae6-567bdd3f3024',
  '7558459a-a382-4f80-8516-fa693a79d6b0',
  '8a1870dc-1b72-4eec-a206-5ecc93a12568',
  'c84ef2dd-bfc5-4fba-af01-693552fc0918',
  'e24ec4f8-58df-4622-b0a3-f2498fa7dae9',
  'e64fb9d8-f655-4f6c-a8b6-9a07fb398980',
  'f5bf13c7-0387-45ed-aaec-18a91a0b318f',
]);

export default function SocialProof() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    stimmenAnfang as Testimonial[]
  );
  const [loading, setLoading] = useState((stimmenAnfang as Testimonial[]).length === 0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(10);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getThumbnailUrl = (path: string | null, id?: string) => {
    // Eigene, aufgehellte Fassung zuerst - siehe AUFGEHELLT oben.
    if (id && AUFGEHELLT.has(id)) return `/kundenstimmen/${id}.webp`;
    if (!path) return null;
    const { data } = supabase.storage
      .from('testimonial-thumbnails')
      .getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <section id="social-proof" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-blue via-[#1A2B4C]/60 to-white" aria-labelledby="testimonials-headline">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 id="testimonials-headline" className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            <span className="gold-text-animated">
              Menschen, mit denen ich
            </span>
            <span className="text-white"> gearbeitet habe</span>
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Keine ausgedachten Zitate. Menschen, die mit mir gearbeitet haben, und die
            selbst erzählen, was sich verändert hat.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/80 py-12">
            Testimonials werden geladen...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-white/80 py-12">
            Noch keine Testimonials vorhanden
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedVideo(testimonial.vimeo_url)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold/70 hover:shadow-[0_18px_40px_-18px_rgba(218,165,32,0.45)]">
                  {testimonial.thumbnail_path ? (
                    <img
                      src={getThumbnailUrl(testimonial.thumbnail_path, testimonial.id) || ''}
                      alt={testimonial.name}
                      width={540}
                      height={960}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#F7F3EB] via-[#F2E8D5] to-[#E8DCC4] flex items-center justify-center">
                      <Play className="w-12 h-12 text-dark-gold/60" />
                    </div>
                  )}

                  {/* Claudia am 21.09.2026: "nicht so dunkel die Felder". Vorher lag
                      ein schwarzer Verlauf ueber den unteren 40 Prozent jedes Bildes.
                      Jetzt bleibt das Bild hell; lesbar wird der Name durch ein
                      kleines Glasschild statt durch Abdunkeln der ganzen Flaeche. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }}
                  />

                  {/* Oben rechts statt mittig: der Knopf sass vorher genau
                      auf dem Gesicht. Claudias Hinweis vom 19.09.2026. */}
                  <div className="absolute right-2.5 top-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-white/20 shadow-[0_6px_18px_-8px_rgba(10,22,40,0.55)] backdrop-blur-md backdrop-saturate-150 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
                      <Play className="ml-0.5 h-4 w-4 text-white drop-shadow" />
                    </div>
                  </div>

                  <div className="absolute inset-x-2 bottom-2 rounded-xl border border-white/25 bg-[#0F1F3A]/40 px-3 py-2 text-white shadow-[0_10px_28px_-14px_rgba(10,22,40,0.7)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 group-hover:border-luxury-gold/60 group-hover:bg-[#0F1F3A]/30 motion-reduce:transition-none">
                    <h3 className="font-semibold text-sm sm:text-base leading-tight">
                      {testimonial.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/85 leading-tight">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {selectedVideo && (
        <VideoModal
          vimeoUrl={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}
