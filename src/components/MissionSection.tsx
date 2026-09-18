import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="hidden relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pearl-white via-[#f8f6f3] to-pearl-white">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-midnight-blue mb-6">
            Wir machen deine{' '}
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Wirkungskraft
            </span>
            <br />
            unverwechselbar.
          </h2>
          <p className="text-xl md:text-2xl text-royal-navy font-medium">
            Damit du dich im Kopf von Menschen speicherst. Begeisterst. Berührst. Bewegst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border-2 border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex-shrink-0">
                <Sparkles className="text-midnight-blue" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-midnight-blue pt-2">
                Nutzt du deine unverwechselbare Persönlichkeit?
              </h3>
            </div>

            <div className="space-y-4 text-royal-navy/90 text-lg leading-relaxed">
              <p className="font-semibold text-midnight-blue">
                Klartext: Im KI-Zeitalter ist Perfektion klickbar.
              </p>

              <p>
                Und deswegen werden die meisten unsichtbar. Es sei denn, du nutzt deine Einzigartigkeit.
              </p>

              <p className="font-medium">
                Deine Botschaft ist nur so viel wert wie die Fähigkeit, sie zu kommunizieren. Punkt.
              </p>

              <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 rounded-xl p-6 my-6">
                <p className="text-2xl md:text-3xl font-bold text-midnight-blue mb-2">
                  Der erste Moment
                </p>
                <p className="text-lg">
                  Deine Chance. Emotional zu berühren, bevor der Verstand deiner Zuhörer nachzieht.
                </p>
              </div>

              <p>
                <span className="font-semibold text-midnight-blue">Authentisch und unverwechselbar</span> – du, das kann KI nicht – und hebt dich aus der Masse heraus.
              </p>

              <p>
                Perfektion kann bald jeder. Mit KI kostet es nichts. Aber die unsichtbare Brücke – vom Ohr ins Herz? Die Bedürfnisse deines Gesprächspartners wahrnehmen, das ist{' '}
                <span className="font-semibold bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Goldwert
                </span>{' '}
                in einer Zeit, wo Menschlichkeit zur seltenen Währung wird.
              </p>

              <div className="pt-4 border-t-2 border-luxury-gold/20">
                <p className="font-semibold text-midnight-blue text-xl">
                  Deine Persönlichkeit. Deine Echtheit. Dein Vertrauen.
                </p>
                <p className="mt-2">
                  Deine akustische Visitenkarte ist dein Türöffner, um aus der Masse der Angebote herauszustechen.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-midnight-blue to-royal-navy rounded-2xl p-8 shadow-lg border-2 border-luxury-gold/30 text-pearl-white"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex-shrink-0">
                <Heart className="text-midnight-blue" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold pt-2">
                Meine Berufung. Meine Leidenschaft.
              </h3>
            </div>

            <div className="space-y-4 text-pearl-white/90 text-lg leading-relaxed">
              <p>
                Als junges Mädchen habe ich erfahren: Es gibt Menschen, deren Stimmen bleiben unauslöschlich im Kopf gespeichert. Wie eingebrannt.
              </p>

              <blockquote className="border-l-4 border-luxury-gold pl-4 py-2 my-6 italic text-pearl-white">
                "Worte sind die mächtigste Droge der Menschheit"
                <footer className="text-sm mt-2 text-pearl-white/70">— Rudyard Kipling</footer>
              </blockquote>

              <p className="font-medium">
                Es ist die Emotion. Sie entscheidet, ob du unauslöschlich gespeichert bist oder ob deine Worte morgen in deinem Zuhörer verpuffen.
              </p>

              <p>
                Seit über{' '}
                <span className="font-bold text-luxury-gold">35 Jahren</span>{' '}
                beschäftige ich mich mit Sprechwirkungsforschung, Neurowissenschaft, Rhetorik, Storytelling, emotionalem Verkauf.
              </p>

              <p>
                Als Vortragsrednerin, Keynote-Speakerin, Coach, Trainerin.
              </p>

              <div className="bg-pearl-white/10 backdrop-blur-sm rounded-xl p-6 my-6">
                <p>
                  Mit über 50 habe ich KI entdeckt – nicht um zu ersetzen, sondern um Zeit zu gewinnen. Um näher und intensiver mit Menschen zu arbeiten.
                </p>
              </div>

              <p className="font-medium">
                Da liegt die Verbindung. Im Hinzuhören. Da liegt der Unterschied zu KI.
              </p>

              <p className="text-xl font-semibold text-luxury-gold">
                Ich befähige dich und dein Team zur vollen Wirkungskraft.
              </p>

              <div className="pt-6 border-t-2 border-luxury-gold/30">
                <p className="font-bold text-pearl-white mb-3">Mein Motto:</p>
                <p>
                  Nutze KI, weil Fortschritt sich nicht aufhalten lässt – und nutze das, was niemand außer dir besitzt: deine wirkungsvolle Persönlichkeit, um dich unersetzbar zu machen.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border-2 border-luxury-gold/30"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
              <Zap className="text-midnight-blue" size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-midnight-blue">
              Als Sparringspartner & Rednerin an deiner Seite
            </h3>
          </div>

          <p className="text-lg md:text-xl text-royal-navy/90 leading-relaxed">
            In folgenden Bereichen stehe ich gerne als Sparringspartner oder als Rednerin an deiner Seite: Mit einer klaren Botschaft, die wirkt. Deine Mitarbeitenden motivieren. Zuhörende inspirieren. Interessierte in Kunden transformieren.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
