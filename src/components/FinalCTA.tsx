import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <h2 className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-midnight-blue">Bereit für deine </span>
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Transformation?
            </span>
          </h2>

          <p className="text-base md:text-xl text-midnight-blue/80 max-w-2xl mx-auto leading-relaxed">
            In nur 180ms entscheidet sich, ob du Vertrauen gewinnst oder austauschbar bleibst.
            Lass uns gemeinsam sicherstellen, dass du die ersten 180ms gewinnst.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center pt-2 md:pt-4">
            <a
              href="https://claudiaconen.com/termin-buchen"
              target="_blank"
              rel="noopener noreferrer"
              className="kriss-cta flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full shadow-2xl text-sm md:text-base"
            >
              <Calendar size={20} />
              Kostenloses Erstgespräch buchen
              <span className="kriss-cta-arrow">
                <ArrowRight size={20} />
              </span>
            </a>
          </div>

          <p className="text-midnight-blue/60 text-xs md:text-sm">
            Keine Verpflichtung. Keine Kosten. Nur ein ehrliches Gespräch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
