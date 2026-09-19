import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CookieBanner from '../components/CookieBanner';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="relative">
      <SEO
        title="Newsletter - Bleib auf dem neuesten Stand"
        description="Erhalte exklusive Einblicke und kraftvolle Impulse für deine persönliche Wirkung. Abonniere den Newsletter von Claudia Conen."
        keywords={['Newsletter', 'Claudia Conen', 'Wirkung', 'Persönlichkeitsentwicklung', 'Voice-to-Brain', 'Exklusive Einblicke']}
      />
      <Navigation />

      <section className="min-h-screen py-24 bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full mb-6">
              <Sparkles size={16} className="text-bright-gold" />
              <span className="text-bright-gold font-semibold text-xs">Exklusives Wissen</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-pearl-white mb-6">
              Bleib auf dem{' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">
                neuesten Stand
              </span>
            </h1>

            <p className="text-lg text-pearl-white/80 max-w-2xl mx-auto leading-relaxed">
              Erhalte exklusive Einblicke und kraftvolle Impulse für deine persönliche Wirkung.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-royal-navy/50 to-midnight-blue/50 backdrop-blur-sm rounded-2xl border border-luxury-gold/20 p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DAA520] to-[#F4D03F] flex items-center justify-center flex-shrink-0">
                <Mail size={24} className="text-midnight-blue" />
              </div>
              <div>
                <h2 className="text-xl font-montserrat font-bold text-pearl-white">
                  Newsletter abonnieren
                </h2>
                <p className="text-pearl-white/60 text-sm">
                  Kostenlos. Jederzeit abbestellbar.
                </p>
              </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: '520px' }}>
              <style dangerouslySetInnerHTML={{
                __html: `
                  iframe[title="Newsletter Anmeldung"] {
                    color-scheme: dark;
                    filter: brightness(0.95) sepia(0.08) hue-rotate(180deg) saturate(0.9);
                  }
                `
              }} />
              <iframe
                src="https://app.mailingboss.com/lists/68f4b11b5342c/subscribe"
                width="100%"
                height="520px"
                frameBorder="0"
                scrolling="no"
                className="rounded-lg relative"
                title="Newsletter Anmeldung"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-pearl-white/70">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bright-gold"></div>
                <span>Praxisnahe Tipps</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bright-gold"></div>
                <span>Exklusive Einblicke</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bright-gold"></div>
                <span>Wertvolle Ressourcen</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
