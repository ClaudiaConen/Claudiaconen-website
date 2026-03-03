import { motion } from 'framer-motion';
import { Users, ArrowRight, Sparkles, Target, Compass, Zap, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

export default function KI1zu1() {
  const features = [
    { icon: Users, title: 'Persoenliche Begleitung', desc: '1:1 Coaching -- individuell auf dich und deine Ziele abgestimmt' },
    { icon: Target, title: 'Massgeschneiderte Strategie', desc: 'Dein persoenlicher KI-Fahrplan fuer dein Business' },
    { icon: Sparkles, title: 'Sofort umsetzbar', desc: 'Praktische Loesungen, die du direkt nach der Session anwenden kannst' },
    { icon: Compass, title: 'Tool-Auswahl', desc: 'Die richtigen KI-Tools fuer genau deine Beduerfnisse finden' },
    { icon: Zap, title: 'Effizienz steigern', desc: 'Zeitfresser eliminieren und Prozesse intelligent automatisieren' },
    { icon: Clock, title: 'Flexible Termine', desc: 'Online oder vor Ort -- wann und wo es fuer dich passt' },
  ];

  return (
    <>
      <SEO
        title="KI 1:1 | Persoenliche KI-Begleitung | Claudia Conen"
        description="Dein persoenliches 1:1 KI-Coaching mit Claudia Conen. Individuell, praxisnah und auf deine Ziele zugeschnitten."
      />
      <Navigation />

      <main className="min-h-screen bg-midnight-blue pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] mb-6">
              <Users size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">KI & Mensch</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ color: 'white' }}>
              <span className="headline-line2">KI 1:1</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem' }}>
              Persoenliche KI-Begleitung fuer dich -- massgeschneidert, praxisnah und mit dem Fokus auf das, was dich wirklich weiterbringt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-6 hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[rgba(212,175,55,0.1)] flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-white mb-2">{f.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C9A961 100%)',
                color: '#0A1F44',
                boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
              }}
            >
              Jetzt anfragen
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </>
  );
}
