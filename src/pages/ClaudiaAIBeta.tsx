import { useState } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Lightbulb, Sparkles, ArrowLeft, User, Mail, Briefcase, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ClaudiaAIBeta() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: 'Story Development',
      description: 'Entwickle emotional packende Stories, die verkaufen und begeistern',
    },
    {
      icon: Target,
      title: 'Positionierungs-Coaching',
      description: 'Finde und kommuniziere deine unkopierbare Einzigartigkeit',
    },
    {
      icon: Lightbulb,
      title: 'Elevator Pitch Perfection',
      description: 'Perfektioniere deinen 30-Sekunden-Pitch für maximale Wirkung',
    },
  ];

  const benefits = [
    {
      title: '37 Jahre Expertise',
      description: 'Claudias gesammeltes Wissen in einem KI-Coach',
    },
    {
      title: '24/7 Verfügbar',
      description: 'Dein persönlicher Coach, immer wenn du ihn brauchst',
    },
    {
      title: 'Datenschutz',
      description: 'Vertraulich und sicher - deine Daten gehören dir',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628] flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 20px rgba(218, 165, 32, 0.3)',
                '0 0 60px rgba(218, 165, 32, 0.6)',
                '0 0 20px rgba(218, 165, 32, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#DAA520] to-[#DAA520] flex items-center justify-center"
          >
            <CheckCircle size={48} className="text-midnight-blue" />
          </motion.div>

          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl">
            Willkommen an Bord!
          </h1>

          <p className="text-xl text-pearl-white/80">
            Du stehst jetzt auf der Beta-Warteliste für ClaudiaAI.
          </p>

          <div className="bg-royal-navy/30 backdrop-blur-sm p-8 rounded-2xl border border-luxury-gold/20 text-left space-y-4">
            <h3 className="font-montserrat font-bold text-2xl mb-4 text-center">
              Was passiert jetzt?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-bright-gold flex-shrink-0 mt-1" />
                <p className="text-pearl-white/80">Du erhältst eine Bestätigungs-E-Mail</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-bright-gold flex-shrink-0 mt-1" />
                <p className="text-pearl-white/80">
                  Wir sagen dir Bescheid, sobald die Beta öffnet
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-bright-gold flex-shrink-0 mt-1" />
                <p className="text-pearl-white/80">
                  Du bekommst 1 Monat kostenlosen Zugang als Beta-Tester
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft size={20} />
            Zurück zur Hauptseite
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
      <SEO
        title="ClaudiaAI — Story-Coach in der Beta"
        description="Ein KI-Assistent für Positionierung, Storytelling und Pitch, gebaut auf Claudia Conens Arbeitsweise. Derzeit in der Beta."
        path="/claudia-ai"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-pearl-white/80 hover:text-bright-gold transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Zurück zur Hauptseite
        </motion.button>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DAA520]/20 to-[#DAA520]/20 rounded-full border border-[#DAA520]/30 mb-6"
          >
            <Sparkles size={20} className="text-[#DAA520]" />
            <span className="text-[#DAA520] font-semibold">Beta in Vorbereitung</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6"
          >
            <span className="bg-gradient-to-r from-[#DAA520] via-[#DAA520] to-[#B8860B] bg-clip-text text-transparent">
              ClaudiaAI
            </span>
            <br />
            Dein persönlicher Story-Coach
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-pearl-white/80 max-w-3xl mx-auto"
          >
            37 Jahre Expertise × KI-Power = Deine neue Dimension
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-royal-navy/30 backdrop-blur-sm p-6 rounded-2xl border border-[#DAA520]/10"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#DAA520] to-[#DAA520] flex items-center justify-center mb-4">
                  <Icon size={28} className="text-midnight-blue" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-pearl-white/70">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-montserrat font-bold text-3xl mb-8">Warum ClaudiaAI?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#DAA520] to-[#DAA520] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={24} className="text-midnight-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{benefit.title}</h3>
                    <p className="text-pearl-white/70">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-royal-navy/30 backdrop-blur-sm p-6 rounded-2xl border border-luxury-gold/20">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="relative w-16 h-16 flex-shrink-0"
                >
                  <div className="absolute inset-0 rounded-full border-4 border-[#DAA520]"></div>
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                      src="/photo_2025-09-25 23.28.37 (2).jpeg"
                      alt="Claudia Conen"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                <div>
                  <h4 className="font-bold text-lg">Claudia Conen</h4>
                  <p className="text-pearl-white/60 text-sm">37 Jahre Expertise</p>
                </div>
              </div>
              <p className="text-pearl-white/80 italic">
                "ClaudiaAI bringt meine 37 Jahre Erfahrung in Persönlichkeitsentwicklung und Storytelling
                zu dir - wann immer du sie brauchst. 24/7 verfügbar, immer persönlich."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-royal-navy/30 backdrop-blur-sm p-8 rounded-2xl border border-luxury-gold/20"
          >
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Zur Beta-Warteliste
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-pearl-white/80">
                  Name *
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-pearl-white/40" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="Dein vollständiger Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-pearl-white/80">
                  E-Mail *
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-pearl-white/40" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="deine@email.de"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-pearl-white/80">
                  Unternehmen
                </label>
                <div className="relative">
                  <Briefcase size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-pearl-white/40" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white focus:outline-none focus:border-luxury-gold transition-colors"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-pearl-white/80">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white focus:outline-none focus:border-luxury-gold transition-colors"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-pearl-white/80">
                  Interesse
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-xl text-pearl-white focus:outline-none focus:border-luxury-gold transition-colors"
                >
                  <option value="">Bitte wählen</option>
                  <option value="stories">Emotional packende Stories</option>
                  <option value="positioning">Positionierung schärfen</option>
                  <option value="pitches">Elevator Pitches perfektionieren</option>
                  <option value="all">Alles davon</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#DAA520] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Wird gespeichert...'
                ) : (
                  <>
                    <Sparkles size={20} />
                    Auf Warteliste eintragen
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-royal-navy/30 backdrop-blur-sm p-8 rounded-2xl border border-luxury-gold/20"
        >
          <div className="text-center mb-6">
            <h3 className="font-montserrat font-bold text-2xl mb-2">Beta-Tester Feedback</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-pearl-white/80 italic text-lg text-center mb-4">
              "ClaudiaAI hat mir in 10 Minuten geholfen, eine Story zu entwickeln,
              für die ich sonst Stunden gebraucht hätte. Und sie war emotionaler und packender!"
            </p>
            <p className="text-center text-pearl-white/60">
              - Sarah M., Startup-Gründerin (Beta-Testerin)
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
