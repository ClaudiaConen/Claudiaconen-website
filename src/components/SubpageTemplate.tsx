import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ContactFormModal from './ContactFormModal';
import SEO from './SEO';

interface SubpageTemplateProps {
  title: string;
  subtitle?: string;
  /** Alter Eingang, wurde nie angezeigt. Bleibt, damit nichts bricht. */
  heroImage?: string;
  /** Foto neben Titel und Vorspann - klein, rechts, nie als riesiges Hintergrundbild
   *  (Claudias Vorgabe vom 22.09.2026, von ihr gelobt: "richtig klasse").
   *  Hochkant 360x640, mit bildQuer 900x600. Dateien in public/seiten/. */
  bild?: string;
  bildAlt?: string;
  bildQuer?: boolean;
  introText: string;
  bodyContent: React.ReactNode;
  ctaText?: string;
  topic: string;
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
  /** Zeigt auf die massgebliche Seite, wenn diese hier nur eine
   *  zweite Adresse desselben Inhalts ist. */
  kanonischPfad?: string;
}

export default function SubpageTemplate({
  title,
  subtitle,
  heroImage: _heroImage,
  bild,
  bildAlt,
  bildQuer,
  introText,
  bodyContent,
  ctaText = "Interessiert? Nimm jetzt Kontakt auf!",
  topic,
  keywords = [],
  seoTitle,
  seoDescription,
  kanonischPfad
}: SubpageTemplateProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-pearl-white">
      <SEO
        title={seoTitle || title}
        description={seoDescription || introText}
        keywords={keywords}
        kanonischPfad={kanonischPfad}
      />
      <Navigation />

      {/* Kein Schwarz: #0A1628 liest Claudia als Schwarz, wenn es eine Flaeche ist
          (ihre Ansage vom 23.09.2026). Dunkle Flaechen laufen in #13233F / #1A2B4C. */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #13233F 0%, #1A2B4C 55%, #13233F 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 215, 77, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div
          className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${
            bild ? 'grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14' : 'max-w-7xl text-center'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-w-0"
          >
            {subtitle && (
              <p className="text-bright-gold font-semibold text-lg mb-4">
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pearl-white mb-6">
              {title}
            </h1>
            <p className={`text-xl text-pearl-white/85 leading-relaxed ${bild ? 'max-w-2xl' : 'max-w-3xl mx-auto'}`}>
              {introText}
            </p>
          </motion.div>
          {bild && (
            <motion.figure
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`m-0 justify-self-start overflow-hidden rounded-xl border border-[#D4AF37]/45 md:justify-self-end ${
                bildQuer ? 'aspect-[3/2] w-full max-w-[460px]' : 'aspect-[9/16] w-[clamp(200px,28vw,300px)]'
              }`}
            >
              <img
                src={bild}
                alt={bildAlt ?? ''}
                width={bildQuer ? 900 : 360}
                height={bildQuer ? 600 : 640}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </motion.figure>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pearl-white to-transparent" />
      </section>

      <section className="py-20 bg-pearl-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {bodyContent}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-pearl-white mb-8">
              {ctaText}
            </h2>
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl text-lg"
            >
              Kontakt aufnehmen
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        topic={topic}
      />
    </div>
  );
}
