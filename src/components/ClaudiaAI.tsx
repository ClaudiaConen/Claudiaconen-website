import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Target, Lightbulb, Sparkles } from 'lucide-react';
import BetaWaitlistModal from './BetaWaitlistModal';

export default function ClaudiaAI() {
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: 'Emotional packende Stories',
      description: 'Entwickle Stories, die Herzen berühren und verkaufen',
    },
    {
      icon: Target,
      title: 'Positionierung schärfen',
      description: 'Finde und kommuniziere deine Einzigartigkeit',
    },
    {
      icon: Lightbulb,
      title: 'Perfekte Elevator Pitches',
      description: 'In 30 Sekunden überzeugen und begeistern',
    },
  ];

  return (
    <section id="claudia-ai" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-royal-navy via-midnight-blue to-royal-navy overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6B800]/20 to-[#FFA500]/20 rounded-full border border-[#FFA500]/30">
              <Sparkles size={20} className="text-[#FFA500]" />
              <span className="text-[#FFA500] font-semibold">Neu: KI-Revolution</span>
            </div>

            <div>
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
                <span className="bg-gradient-to-r from-[#E6B800] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                  Claudia AI – Entdecke, was kein Algorithmus kann: DICH.
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-lg leading-relaxed">
              <p className="font-semibold text-xl text-white">
                Du willst wissen, wie du Menschen wirklich erreichst?
              </p>
              <p className="text-white">
                Wie du mit deiner Persönlichkeit Emotionen weckst, Geschichten erzählst und Vertrauen aufbaust?
              </p>
              <p className="text-white">
                Dann sprich mit Claudia AI – deinem persönlichen Coach im KI-Zeitalter.<br />
                Er zeigt dir in Sekunden, wie du wirksam, spürbar und unverwechselbar wirst.
              </p>
              <p className="font-semibold text-white">
                Nutze KI als Abkürzung – nicht als Ersatz.<br />
                Denn Maschinen berechnen.<br />
                Menschen berühren.
              </p>
              <p className="text-xl font-bold bg-gradient-to-r from-[#E6B800] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                🔸 Starte jetzt – entdecke deine Wirkungskraft.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4 bg-royal-navy/30 backdrop-blur-sm p-4 rounded-xl border border-[#FFA500]/10"
                  >
                    <div className="p-2 rounded-full bg-gradient-to-r from-[#E6B800] to-[#FFA500]">
                      <Icon size={24} className="text-midnight-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-white/90 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div>
              <button
                onClick={() => setIsBetaModalOpen(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E6B800] to-[#FFA500] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <Sparkles size={20} />
                Zur Beta-Warteliste
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="relative w-24 h-24"
              >
                <div className="absolute inset-0 rounded-full border-4 border-[#FFA500]/30"></div>
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#FFA500]">
                  <img
                    src="/claudia20.jpeg"
                    alt="Claudia Conen"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <div className="h-0.5 w-20 bg-gradient-to-r from-[#FFA500] to-transparent"></div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px rgba(255, 165, 0, 0.3)',
                    '0 0 40px rgba(255, 165, 0, 0.6)',
                    '0 0 20px rgba(255, 165, 0, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E6B800] to-[#FFA500] flex items-center justify-center"
              >
                <Bot size={32} className="text-midnight-blue" />
              </motion.div>
            </div>

            <div className="text-center mb-12">
              <p className="text-xl font-semibold">
                <span className="bg-gradient-to-r from-[#E6B800] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                  37 Jahre Expertise × KI-Power
                </span>
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(255, 165, 0, 0.4)',
                      '0 0 80px rgba(255, 165, 0, 0.6)',
                      '0 0 40px rgba(255, 165, 0, 0.4)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-48 h-48 rounded-full bg-gradient-to-r from-[#E6B800] to-[#FFA500] flex items-center justify-center"
                >
                  <Bot size={120} className="text-midnight-blue" />
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-72 h-72 rounded-full border-2 border-[#FFA500]/20">
                  {[0, 90, 180, 270].map((rotation, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${rotation}deg) translateY(-144px) translateX(-50%)`,
                      }}
                      className="w-3 h-3 rounded-full bg-[#FFA500]"
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-96 h-96 rounded-full border border-[#FFA500]/10"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <BetaWaitlistModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
      />
    </section>
  );
}
