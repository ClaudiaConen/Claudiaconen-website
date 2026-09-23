import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Clock, BookOpen, Award } from 'lucide-react';

export default function About() {
  // Vier Angaben, die jeder nachzaehlen kann.
  //
  // Vorher standen hier: "300+ Erfolgreiche Kunden" (widersprach den
  // "2.100 Kunden" an vier anderen Stellen derselben Seite),
  // "35 Jahre Expertise" (Claudia hat am 18.09.2026 auf 37 korrigiert,
  // ueberall sonst steht 37), "5.0 Durchschnittsbewertung" (das
  // verlinkte Profil hatte null Bewertungen - dieselbe Angabe wurde
  // deshalb schon aus den Kundenstimmen entfernt) und "47% Avg.
  // Umsatzsteigerung" (ohne jede Grundlage).
  //
  // Die Kundenzahl fehlt bewusst, bis geklaert ist, welche stimmt.
  // Eine falsche Zahl ist schlimmer als keine.
  const stats = [
    {
      icon: Clock,
      value: '37',
      label: 'Jahre Erfahrung',
    },
    {
      icon: Award,
      value: '4',
      label: 'Wege zum Rednerberuf',
    },
    {
      icon: BookOpen,
      value: '85',
      label: 'Artikel, kostenlos lesbar',
    },
    {
      icon: Users,
      value: '0 €',
      label: 'Erstgespräch',
    },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #13233F 30%, #1A2B4C 58%, #FDFBF7 100%)' }}
      aria-labelledby="about-claudia"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="relative mt-20 lg:mt-24"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-luxury-gold/30">
                <img
                  src="/claudiaconen.webp"
                  width={853}
                  height={1280}
                  alt="Claudia Conen - Die Umsatzstimme"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#F7E7CE]/20 rounded-full border border-luxury-gold/30">
                <span className="text-bright-gold font-semibold">Über Claudia</span>
              </div>
              <h2 id="about-claudia" className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
                <span className="text-white">Wer ist </span>
                <span className="gold-text-animated">
                  Claudia Conen
                </span>
              </h2>
            </div>

            <article className="space-y-3 md:space-y-4 leading-relaxed text-sm md:text-base">
              {/*
                Text am 21.09.2026 mit Claudia abgestimmt: ihre freigegebene Definition
                (Wortlaut wie in index.html und SEO.tsx), ihr eigener KI-Satz aus der
                alten Fassung, ihr neuer Claim. Ihre Geschichte wird hier nicht mehr
                erzaehlt, nur angedeutet - der Verweis-Satz ist IHRE Formulierung
                ("Warum sie hoert, was andere ueberhoeren" empfand sie als Unterstellung).
              */}
              <p className="text-white">
                Claudia Conen ist Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung – bekannt als „Die Umsatzstimme".
              </p>
              <p className="text-white">
                Sie trainiert Rhetorik, Storytelling, Präsentation und den Auftritt vor der Kamera. Sie arbeitet mit Unternehmern, Führungskräften, Speakern und Teams – seit 37 Jahren.
              </p>
              <p className="text-white">
                Ihr Schwerpunkt ist die hörbare Persönlichkeit: das Zusammenspiel von Worten, Stimme und Haltung. Denn die Bühne beginnt dort, wo jemand das Wort ergreift.
              </p>
              <p className="text-white">
                Heute verbindet sie Kommunikation und künstliche Intelligenz. Denn KI kann berechnen, doch Persönlichkeit begeistert, fasziniert und berührt.
              </p>
              <p className="text-white">
                Warum sie weiß, dass Menschen sich für immer im Gehirn verankern können, erzählt sie auf{' '}
                <Link to="/ueber-mich" className="underline decoration-luxury-gold/60 underline-offset-4 transition-colors hover:text-bright-gold">
                  „Über mich"
                </Link>
                .
              </p>
              <p className="font-semibold text-bright-gold">
                Perfektion ist klickbar. Persönlichkeit weckt Vertrauen. Und bleibt.
              </p>
            </article>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#13233F] p-3 md:p-4 rounded-xl border border-[#D4AF37]/50 transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]"
                  >
                    <Icon size={24} className="text-bright-gold mb-2" />
                    <div className="font-montserrat font-bold text-2xl text-pearl-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-pearl-white/85">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <a
              href="/ueber-mich"
              className="cc-knopf cc-knopf--zweit mt-6"
            >
              Mehr über Claudia
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
