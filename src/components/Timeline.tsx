import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Ear, Mic, Shield, MessageSquare, Sparkles, Target, Heart } from 'lucide-react';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = [
    {
      number: 1,
      kurz: 'Sie berechnet blitzschnell – du berührst bleibend.',
      icon: Ear,
      title: 'KI spart Zeit. Du schenkst Bedeutung - denn Maschinen rechnen – Menschen berühren.',
      description: 'Sie berechnet blitzschnell – du berührst bleibend.\nSie schenkt dir Zeit – damit du sie mit Menschen teilst.\nKI kann Daten verarbeiten – du kannst Verbindung schaffen.\nUnd genau darin liegt Wirkungskraft:\nPerfektion klickt. Persönlichkeit bleibt.',
      side: 'left',
    },
    {
      number: 2,
      kurz: 'Verstehen, was Menschen bewegt – bevor sie entscheiden.',
      icon: Mic,
      title: 'Entdecke was Menschen bewegt – bevor sie entscheiden.',
      description: 'Verstehen, was Menschen bewegt – bevor sie entscheiden.\nDas Gefühl ist da, bevor der Gedanke es einholt.\nWenn du weißt, wie Vertrauen entsteht, berührst du Menschen tiefer, als Worte je können.',
      side: 'right',
    },
    {
      number: 3,
      kurz: 'Selbsterkenntnis ist der Schlüssel zu Wirkungskraft.',
      icon: Shield,
      title: 'Jede Wirkung beginnt mit einer Geschichte – deiner.',
      description: 'Selbsterkenntnis ist der Schlüssel zu Wirkungskraft.\nWer seine Berufung lebt und seine Persönlichkeit klar positioniert, wird unverwechselbar – im Business und im Leben. Nutze deine Einzigartigkeit.',
      side: 'left',
    },
    {
      number: 4,
      kurz: 'Der Elevator Pitch zeigt, wer du bist – und warum Menschen dir zuhören.',
      icon: MessageSquare,
      title: 'Klarheit verkauft. Storytelling verbindet.',
      description: 'Der Elevator Pitch zeigt, wer du bist – und warum Menschen dir zuhören.\nEine Geschichte erreicht Menschen schneller als eine Aufzählung,\nweil Bilder Emotionen auslösen und im Gedächtnis bleiben.\nOb auf Social Media, im Kundengespräch oder live auf der Bühne:\nFrag dich: Welche Emotion willst du wecken – und was sollen Menschen fühlen, denken oder tun?',
      side: 'right',
    },
    {
      number: 5,
      kurz: 'Deine Geschichte, dein Erlebtes – sie sind dein unverwechselbarer Klang.',
      icon: Sparkles,
      title: 'Du wirkst, bevor du sprichst.\nVon Selbsterkenntnis zu Wirkungskraft – durch Haltung, Persönlichkeit, Stimme und Blick.',
      description: 'Deine Geschichte, dein Erlebtes – sie sind dein unverwechselbarer Klang.\nRhetorik ist nicht das Spiel mit Worten, sondern die Kunst, echt zu wirken.\nWenn Stimme, Körpersprache und Worte dieselbe Sprache sprechen,\nentsteht Charisma – und die unsichtbare Brücke vom Ohr, über den Kopf, direkt ins Herz',
      side: 'left',
    },
    {
      number: 6,
      kurz: 'Menschen entscheiden mit dem Herzen, lange bevor der Verstand folgt.',
      icon: Target,
      title: 'Werde zum Privatdetektiv deiner Wirkung.\nWorte sind unaufhaltbar. Beobachte, was du im anderen auslöst – und welche Energie du sendest, wenn du sprichst.',
      description: 'Menschen sind emotionale Wesen – sie entscheiden mit dem Herzen, lange bevor der Verstand folgt.\nDeine Worte können begeistern, motivieren, trösten, faszinieren oder verletzen.\nSie können Vertrauen schaffen – oder zerstören.\nNutze die unsichtbare Brücke:\nvom Ohr über den Kopf direkt ins Herz.',
      side: 'right',
    },
    {
      number: 7,
      kurz: 'Bleib das, was kein Algorithmus je sein kann – ein Original.',
      icon: Heart,
      title: 'Unverwechselbar DU. Nicht ersetzbar.',
      description: 'Bleib das, was kein Algorithmus je sein kann – ein Original.\nNutze die 7 Schritte zu echter Wirkung.\nPerfektion klickt. Persönlichkeit bleibt.',
      side: 'left',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-labelledby="timeline-headline">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/WhatsApp Image 2025-10-18 at 09.35.25.jpeg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] opacity-90"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full border border-luxury-gold/30">
            <span className="text-bright-gold font-semibold">Die Voice-to-Brain™ Methode</span>
          </div>
          <h2 id="timeline-headline" className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            <span className="text-pearl-white">KI spart Zeit. Du schenkst Bedeutung - denn </span>
            <span className="text-bright-gold">Maschinen rechnen – Menschen berühren.</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-luxury-gold/20 -translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#D4AF37] to-[#FFD700]"
            />
          </div>

          <div className="space-y-10 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.side === 'left';

              return (
                <motion.div
                  key={index}
                  id={`schritt${step.number}`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2, margin: '-50px' }}
                  transition={{ duration: 0.2 }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    isLeft ? '' : (step.number === 2 || step.number === 4 || step.number === 6) ? '' : 'lg:text-right'
                  }`}
                >
                  <div className={`${isLeft ? 'lg:pr-16' : 'lg:pl-16 lg:col-start-2'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-royal-navy/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300"
                    >
                      <div
                        className={`flex items-center gap-4 mb-6 ${
                          isLeft ? '' : (step.number === 2 || step.number === 4 || step.number === 6) ? '' : 'lg:flex-row-reverse'
                        }`}
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(212, 175, 55, 0.3)',
                              '0 0 30px rgba(212, 175, 55, 0.5)',
                              '0 0 20px rgba(212, 175, 55, 0.3)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center flex-shrink-0"
                        >
                          <Icon size={28} className="text-midnight-blue" />
                        </motion.div>
                        <div>
                          <div className="text-sm text-bright-gold font-semibold mb-1">
                            Schritt {step.number}
                          </div>
                          <h3 className="font-montserrat font-bold text-lg sm:text-xl md:text-2xl text-pearl-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      {/* Immer sichtbar: ein Satz. Der Rest steht im
                          Quelltext und ist damit fuer Suchmaschinen und KI
                          vollstaendig lesbar, nur eingeklappt. */}
                      <p className="font-inter text-pearl-white/85 leading-relaxed">{step.kurz}</p>

                      <details className="cc-mehr mt-4">
                        <summary className="inline-flex items-center gap-2 font-montserrat text-sm font-semibold text-bright-gold transition-colors hover:text-luxury-gold">
                          <span className="cc-mehr-zu">Mehr dazu</span>
                          <span className="cc-mehr-auf">Weniger</span>
                          <span aria-hidden="true" className="cc-mehr-pfeil">&#8964;</span>
                        </summary>
                        <p className="mt-3 whitespace-pre-line font-inter leading-relaxed text-pearl-white/75">
                          {step.description}
                        </p>
                      </details>
                    </motion.div>
                  </div>

                  <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center h-full"
                    >
                      <div className="relative w-12 h-12">
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bright-gold z-0"
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-luxury-gold/30 z-10"
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center font-montserrat font-bold text-midnight-blue text-xl z-20">
                          {step.number}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="lg:hidden flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center font-montserrat font-bold text-midnight-blue text-xl">
                      {step.number}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(212, 175, 55, 0.4)',
                  '0 0 50px rgba(212, 175, 55, 0.7)',
                  '0 0 30px rgba(212, 175, 55, 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center"
            >
              <Sparkles size={40} className="text-midnight-blue" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.2 }}
          className="text-center mt-16 md:mt-32"
        >
          <p className="text-base md:text-xl text-pearl-white/80 mb-4 md:mb-6">
            Bereit, diese sieben Schritte zu gehen?
          </p>
          <a
            href="#offers"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Sprich mit mir
          </a>
        </motion.div>
      </div>
    </section>
  );
}
