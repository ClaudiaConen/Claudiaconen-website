import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="overflow-hidden bg-white px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
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
          {/* Fassung vom 22.09.2026, 17:40 UTC nach Claudias zweitem Diktat ("Fortschritt ist jeden Tag, jeder Moment ...
              setze die Zeit dort ein, wo du nicht vergleichbar bist ... durch deine unverwechselbare Menschlichkeit
              Vertrauen aufbauen, Kunden gewinnen, unvergleichbar sein"). */}
          {/* Grosse durchlaufende Schrift (Claudia, 22.09.2026 17:40 UTC: "Waere das gut mit einer grossen, durchlaufenden
              Schrift?" - laut Designliste ausdruecklich hell mit farbigem Text). Der Satz steht als Ueberschrift im
              Quelltext (sr-only), das Laufband ist die sichtbare Fassung. */}
          <h2 className="sr-only">Fortschritt passiert jeden Tag. Nutze ihn – gewinne Zeit. Und setze sie ein, wo dich niemand vergleichen kann: bei Menschen.</h2>
          <div aria-hidden="true" className="cc-slogan -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
            <div className="cc-slogan-spur">
              {[0, 1].map((k) => (
                <span key={k} className="flex flex-none items-center gap-8 pr-8 font-montserrat text-3xl font-black uppercase leading-none tracking-tight text-midnight-blue sm:text-5xl md:text-6xl">
                  <span>Fortschritt passiert jeden Tag.</span><span className="cc-slogan-punkt" />
                  <span>Nutze ihn – gewinne Zeit.</span><span className="cc-slogan-punkt" />
                  <span>Und setze sie ein, wo dich niemand vergleichen kann:</span><span className="cc-slogan-punkt" />
                  <span>bei Menschen.</span><span className="cc-slogan-punkt" />
                </span>
              ))}
            </div>
          </div>

          <p className="font-cormorant text-2xl md:text-3xl italic leading-snug text-midnight-blue max-w-2xl mx-auto">
            Mit deiner Persönlichkeit entsteht Vertrauen. Aus Vertrauen werden Kunden.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center pt-2 md:pt-4">
            <a
              href="https://claudiaconen.com/termin-buchen"
              target="_blank"
              rel="noopener noreferrer"
              className="cc-knopf"
            >
              <Calendar size={18} />
              Kostenloses Erstgespräch buchen
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
