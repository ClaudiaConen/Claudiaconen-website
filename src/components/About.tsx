import { motion } from 'framer-motion';
import { Users, Clock, Star, Award } from 'lucide-react';

export default function About() {
  const stats = [
    {
      icon: Users,
      value: '300+',
      label: 'Erfolgreiche Kunden',
    },
    {
      icon: Clock,
      value: '35',
      label: 'Jahre Expertise',
    },
    {
      icon: Star,
      value: '5.0',
      label: 'Durchschnittsbewertung',
    },
    {
      icon: Award,
      value: '47%',
      label: 'Avg. Umsatzsteigerung',
    },
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-midnight-blue via-[#1A2B4C]/60 to-white" aria-labelledby="about-claudia">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="relative mt-20 lg:mt-24"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-luxury-gold/30">
                <img
                  src="/claudiaconen.jpg"
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
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#DAA520]/20 to-[#F4D03F]/20 rounded-full border border-luxury-gold/30">
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
              <p className="text-white">
                bekannt als „Die Umsatzstimme" – Expertin für emotionale Wirkungskraft, Speakerin, freie Rednerin, Coach, Trainerin und Autorin.
              </p>
              <p className="text-white">
                Sie schärft das Bewusstsein für eines der wertvollsten Marketinginstrumente unserer Zeit: die menschliche Persönlichkeit.
              </p>
              <p className="text-white">
                Als elfjähriges Mädchen erlebte sie, wie Stimmen und Worte sich tief im Gehirn verankern – unauslöschlich. Aus dieser Erfahrung wurde ihre Berufung: Menschen zu zeigen, wie Sprache berührt, Vertrauen schafft und Wirkung entfaltet.
              </p>
              <p className="text-white">
                Heute vereint sie Kommunikation und künstliche Intelligenz. Sie zeigt Unternehmern, Führungskräften, Coaches und Speakern, wie sie sich im Zeitalter der KI mit echter Persönlichkeit abheben, wie sie Vertrauen aufbauen, Kunden gewinnen und Botschaften mit höchster Wirkungskraft transportieren.
              </p>
              <p className="text-white">
                Menschen reden überall – im Business, auf Social Media, in Meetings oder in der Familie. Claudia Conen lehrt, Kommunikation spürbar zu machen: vom Ohr über den Kopf direkt ins Herz.
              </p>
              <p className="text-white">
                Sie inspiriert, KI als Fortschritt zu nutzen, um Prozesse zu vereinfachen – und mehr Zeit für Menschen zu gewinnen. Denn KI kann berechnen, doch Persönlichkeit begeistert, fasziniert und berührt.
              </p>
              <p className="text-white">
                In einer Zeit, in der Technologie rasanter wächst als je zuvor, bleibt eines konstant: Der Mensch ist – und bleibt – einzigartig und unverwechselbar auf der Welt.
              </p>
              <p className="font-semibold text-bright-gold">
                Perfektion klickt. Persönlichkeit bleibt.
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
                    className="bg-midnight-blue/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-luxury-gold/10"
                  >
                    <Icon size={24} className="text-bright-gold mb-2" />
                    <div className="font-montserrat font-bold text-2xl text-pearl-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-pearl-white/60">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <a
              href="/ueber-mich"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg mt-6"
            >
              Mehr über Claudia erfahren
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
