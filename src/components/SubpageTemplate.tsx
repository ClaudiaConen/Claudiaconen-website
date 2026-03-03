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
  heroImage?: string;
  introText: string;
  bodyContent: React.ReactNode;
  ctaText?: string;
  topic: string;
  keywords?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export default function SubpageTemplate({
  title,
  subtitle,
  heroImage: _heroImage,
  introText,
  bodyContent,
  ctaText = "Interessiert? Nimm jetzt Kontakt auf!",
  topic,
  keywords = [],
  seoTitle,
  seoDescription
}: SubpageTemplateProps) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-pearl-white">
      <SEO
        title={seoTitle || title}
        description={seoDescription || introText}
        keywords={keywords}
      />
      <Navigation />

      <section className="relative pt-32 pb-20 bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 215, 77, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {subtitle && (
              <p className="text-bright-gold font-semibold text-lg mb-4">
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pearl-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-pearl-white/80 max-w-3xl mx-auto leading-relaxed">
              {introText}
            </p>
          </motion.div>
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

      <section className="py-20 bg-gradient-to-br from-midnight-blue via-royal-navy to-midnight-blue">
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
              className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl text-lg"
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
