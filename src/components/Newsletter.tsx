import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] relative overflow-hidden" aria-labelledby="newsletter-headline">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #DAA520 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full mb-4">
            <Sparkles size={16} className="text-bright-gold" />
            <span className="text-bright-gold font-semibold text-xs">Exklusives Wissen</span>
          </div>

          <h2 id="newsletter-headline" className="text-3xl md:text-4xl font-montserrat font-bold text-pearl-white mb-4">
            Bleib auf dem{' '}
            <span className="gold-text-animated">
              neuesten Stand
            </span>
          </h2>

          <p className="text-base text-pearl-white/80 max-w-xl mx-auto leading-relaxed">
            Erhalte exklusive Einblicke und kraftvolle Impulse für deine persönliche Wirkung.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-royal-navy/50 to-midnight-blue/50 backdrop-blur-sm rounded-2xl border border-luxury-gold/20 p-6 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DAA520] to-[#F4D03F] flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-midnight-blue" />
            </div>
            <div>
              <h3 className="text-lg font-montserrat font-bold text-pearl-white">
                Newsletter abonnieren
              </h3>
              <p className="text-pearl-white/60 text-xs">
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

          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-pearl-white/70">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-bright-gold"></div>
              <span>Praxisnahe Tipps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-bright-gold"></div>
              <span>Exklusive Einblicke</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-bright-gold"></div>
              <span>Wertvolle Ressourcen</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
