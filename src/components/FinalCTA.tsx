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
          {/* Schluss-Slogan nach Claudias Diktat vom 22.09.2026, 17:08 UTC ("nicht fuer KI, nicht gegen KI, sondern
              Fortschritt"; "hinter jedem Kunden steckt eine Persoenlichkeit"), fuer Geschaeftsleute, warm. Gold nur als
              Unterstreichung, nicht als Schriftfarbe auf Weiss (Designliste). */}
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-midnight-blue">
            Nutze den Fortschritt. Gewinne Zeit.
            <span className="mt-2 block underline decoration-[#D4AF37] decoration-[4px] underline-offset-[6px]">Und schenk sie den Menschen, die dir vertrauen sollen.</span>
          </h2>

          <p className="font-cormorant text-2xl md:text-3xl italic leading-snug text-midnight-blue max-w-2xl mx-auto">
            Denn hinter jedem Kunden steckt eine Persönlichkeit.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center pt-2 md:pt-4">
            <a
              href="https://claudiaconen.com/termin-buchen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl text-sm md:text-base"
            >
              <Calendar size={20} />
              Kostenloses Erstgespräch buchen
              <ArrowRight size={20} />
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
