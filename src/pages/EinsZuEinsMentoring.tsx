import { motion } from 'framer-motion';
import { Star, Target, Zap, Award } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function EinsZuEinsMentoring() {
  return (
    <div className="min-h-screen bg-midnight-blue text-pearl-white">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-violet-400 rounded-3xl mb-6">
              <Star size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              1:1{' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Mentoring
              </span>
            </h1>
            <p className="text-xl text-pearl-white/70 max-w-3xl mx-auto">
              Vom Hören zur Wirkung – dein persönlicher Durchbruch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: 'Individuelle Begleitung',
                description: 'Maßgeschneidertes Coaching, das exakt auf deine Bedürfnisse zugeschnitten ist.',
              },
              {
                icon: Zap,
                title: 'Schnelle Ergebnisse',
                description: 'Intensive Sessions, die dich direkt weiterbringen und transformieren.',
              },
              {
                icon: Award,
                title: 'Persönlicher Durchbruch',
                description: 'Erreiche das nächste Level in deiner persönlichen und beruflichen Entwicklung.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-royal-navy/30 backdrop-blur-sm rounded-2xl p-8 border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300"
                >
                  <Icon size={48} className="text-bright-gold mb-4" />
                  <h3 className="font-montserrat font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-pearl-white/70">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-royal-navy/50 to-midnight-blue/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-luxury-gold/20"
          >
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Dein persönlicher Weg zur Wirkung
            </h2>
            <p className="text-pearl-white/80 text-lg leading-relaxed mb-6">
              Im 1:1 Mentoring arbeiten wir intensiv an deinen individuellen Herausforderungen und Zielen.
              Ob es um deine Stimme, deine Präsenz oder deine gesamte Kommunikationsstrategie geht –
              ich begleite dich persönlich auf jedem Schritt deines Weges.
            </p>
            <p className="text-pearl-white/80 text-lg leading-relaxed">
              Mit meiner Erfahrung aus über tausenden Coachings weiß ich genau, wo die Hebel liegen,
              um deine Wirkung zu maximieren. Lass uns gemeinsam deinen Durchbruch schaffen.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
