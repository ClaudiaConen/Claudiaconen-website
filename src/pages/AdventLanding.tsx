import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Gift, Sparkles, Check, X } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Snowfall from '../components/Snowfall';
import AdventRegistrationModal from '../components/AdventRegistrationModal';

export default function AdventLanding() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSuccess = (firstName: string, _email: string) => {
    setIsModalOpen(false);
    setUserName(firstName);
    setShowSuccessModal(true);
    setTimeout(() => {
      navigate('/adventskalender/kalender');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-sky-100 relative overflow-hidden">
      <Snowfall />

      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-20 left-10 text-9xl">🎄</div>
        <div className="absolute top-40 right-20 text-8xl">⭐</div>
        <div className="absolute bottom-40 left-20 text-9xl">🎁</div>
        <div className="absolute bottom-20 right-10 text-8xl">🎅</div>
        <div className="absolute top-1/2 left-1/3 text-7xl">✨</div>
        <div className="absolute top-1/3 right-1/4 text-7xl">🔔</div>
        <div className="absolute top-60 right-1/3 text-6xl">🧤</div>
        <div className="absolute bottom-60 left-1/4 text-6xl">❄️</div>
      </div>

      <SEO
        title="Adventskalender 2026 | 24 Tage Business-Wissen | Claudia Conen"
        description="Dein Adventskalender für mehr Erfolg, Sichtbarkeit und emotionale Intelligenz im Business. Vom 1. bis 24. Dezember täglich wertvolle Impulse."
        keywords={['Adventskalender', 'Business', 'Coaching', 'Persönlichkeitsentwicklung', 'Wissen']}
      />

      <Navigation />

      <section className="pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="inline-block mb-6"
            >
              <Gift className="text-bright-gold mx-auto" size={64} />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-midnight-blue mb-6">
              24 Tage Business-Wissen,
              <span className="block mt-2 bg-gradient-to-r from-bright-gold to-luxury-gold bg-clip-text text-transparent">
                das wirklich wirkt
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Dein Adventskalender für mehr Erfolg, Sichtbarkeit und emotionale Intelligenz im Business
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-bright-gold/30">
              <Sparkles className="text-bright-gold mx-auto mb-6" size={48} />

              <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
                Deine 24-Tage-Reise beginnt hier
              </h2>

              <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed max-w-2xl mx-auto">
                Öffne jeden Tag vom <strong>1. bis 24. Dezember</strong> ein neues Türchen und entdecke
                praxisnahe Strategien, bewährte Methoden und sofort umsetzbare Impulse für dein Business.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-3 bg-blue-100 border-2 border-blue-300 rounded-xl mb-8">
                <Calendar className="text-blue-600" size={20} />
                <p className="text-sm font-semibold text-blue-800">
                  Ab dem 1. Dezember öffnet sich täglich ein Türchen
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="font-bold text-midnight-blue mb-2">24 Geschenke</h3>
                  <p className="text-sm text-gray-600">Täglich neues Wissen</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-bold text-midnight-blue mb-2">Praxisnah</h3>
                  <p className="text-sm text-gray-600">Sofort umsetzbar</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="text-4xl mb-3">💎</div>
                  <h3 className="font-bold text-midnight-blue mb-2">Kostenlos</h3>
                  <p className="text-sm text-gray-600">Dein Geschenk von mir</p>
                </div>
              </div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.5)',
                    '0 0 40px rgba(212, 175, 55, 0.8)',
                    '0 0 20px rgba(212, 175, 55, 0.5)'
                  ]
                }}
                transition={{
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
              >
                <Gift size={24} />
                Jetzt kostenlos anmelden
                <Sparkles size={24} />
              </motion.button>

              <div className="space-y-2 mt-6">
                <p className="text-sm text-gray-500">
                  ✨ Keine Zahlungsdaten erforderlich • Jederzeit abmeldbar
                </p>
                <p className="text-xs text-gray-400">
                  📅 Start: 1. Dezember • Täglich ein neues Türchen
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-bright-gold/10 to-luxury-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
              Kennst du das?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              'Du willst sichtbarer werden, weißt aber nicht wie',
              'Social Media fühlt sich überwältigend an',
              'Du bist unsicher bei Reden und Präsentationen',
              'Deine Positionierung ist nicht klar',
              'KI-Tools verwirren dich mehr als sie helfen',
              'Du brauchst mehr Struktur in deinem Business'
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-6 bg-white rounded-xl shadow-md"
              >
                <X className="flex-shrink-0 text-red-500 mt-1" size={20} />
                <p className="text-gray-700">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
              Dein Weg zu mehr Erfolg
              <span className="block mt-2 bg-gradient-to-r from-bright-gold to-luxury-gold bg-clip-text text-transparent">
                in 24 Schritten
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Vom 1. bis 24. Dezember öffnest du jeden Tag ein neues Türchen mit praxisnahen Tipps,
              bewährten Strategien und sofort umsetzbaren Impulsen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'Positionierung & Storytelling',
                desc: 'Finde deine einzigartige Position und lerne Geschichten zu erzählen, die verkaufen'
              },
              {
                icon: '🎤',
                title: 'Stimme & Präsenz',
                desc: 'Entwickle eine Stimme, die überzeugt und eine Präsenz, die Räume füllt'
              },
              {
                icon: '❤️',
                title: 'Emotionale Intelligenz',
                desc: 'Nutze EQ für bessere Führung, stärkere Beziehungen und mehr Erfolg'
              },
              {
                icon: '🤖',
                title: 'KI & Tools',
                desc: 'Meistere moderne Tools und bleibe dabei authentisch menschlich'
              },
              {
                icon: '💰',
                title: 'Marketing & Sales',
                desc: 'Lerne zu verkaufen ohne dich zu verkaufen - ethisch und erfolgreich'
              },
              {
                icon: '🌟',
                title: 'Persönlichkeitsentwicklung',
                desc: 'Wachse als Mensch und als Unternehmer - nachhaltig und authentisch'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-bright-gold/20 hover:border-bright-gold/50 transition-colors"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-midnight-blue mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-midnight-blue to-royal-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Calendar className="mx-auto mb-6 text-bright-gold" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Starte jetzt deine
              <span className="block mt-2 text-bright-gold">
                24-Tage-Transformation
              </span>
            </h2>
            <p className="text-xl mb-8 text-pearl-white/90">
              Melde dich kostenlos an und öffne jeden Tag ein neues Türchen voller wertvollem Wissen
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-8 py-4 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-xl"
            >
              Jetzt kostenlos anmelden
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <AdventRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center border-2 border-green-500/30 shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check size={40} className="text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-midnight-blue mb-4">
              Willkommen, {userName}!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Du hast jetzt Zugang zu allen 24 Türchen. Wir leiten dich gleich zu deinem Adventskalender weiter...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bright-gold"></div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
