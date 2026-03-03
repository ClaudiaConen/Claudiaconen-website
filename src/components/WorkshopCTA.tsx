import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WorkshopCTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-royal-navy via-midnight-blue to-royal-navy">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-r from-[#1a1a2e]/80 to-[#0f0f1e]/80 backdrop-blur-sm rounded-3xl border border-luxury-gold/20 shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-[400px_1fr] gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="flex justify-center items-center p-8"
            >
              <div className="relative w-full max-w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/6c920d948933c61c673a0cc58062b84bac32ce19768ff41424e15fd16ff670d5.png"
                  alt="Von Schatten zu Licht - Workshop und Buchprojekt"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="p-8 sm:p-12 space-y-6"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full border border-luxury-gold/30"
                >
                  <span className="text-luxury-gold font-semibold">Von Schatten zu Licht</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="font-montserrat font-bold text-2xl sm:text-3xl"
                >
                  Dein Workshop & Buchprojekt
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="text-lg sm:text-xl text-pearl-white/90 italic"
                >
                  "Nutze die unsichtbare Brücke ins Herz - entdecke wie du dich im Kopf deiner Zuhörer verankerst"
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2 }}
                  className="text-pearl-white/80"
                >
                  Ich begleite dich, damit deine Geschichte Teil von etwas Größerem wird.
                </motion.p>
              </div>

              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                href="https://claudiaconen-akademie.de/von-schatten-ins-licht"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Zur Workshop-Anmeldung
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
