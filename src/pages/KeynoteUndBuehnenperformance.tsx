import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function KeynoteUndBuehnenperformance() {
  return (
    <div className="min-h-screen bg-midnight-blue text-pearl-white">
      <SEO
        title="Keynote und Bühnenperformance"
        description="Positionierung, Persönlichkeit, Performance und Stimmwirkung — Coaching, Mentoring, Workshops und Vorträge von Claudia Conen."
        path="/keynote-und-buehnenperformance"
      />
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-rose-500 to-pink-400 rounded-3xl mb-6">
              <Target size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">
                POSITIONIERUNG<br/>
                PERSÖNLICHKEIT<br/>
                PERFORMANCE<br/>
                STIMMWIRKUNG
              </span>
              <br/>
              = KUNDENMAGNET
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl-white/70 max-w-3xl mx-auto">
              Coaching • Mentoring • Workshops • Vorträge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Target,
                title: 'Klare Positionierung',
                description: 'Finde deine einzigartige Position und kommuniziere sie kraftvoll.',
              },
              {
                icon: TrendingUp,
                title: 'Persönlichkeitsentwicklung',
                description: 'Entwickle deine authentische Persönlichkeit als Markenkern.',
              },
              {
                icon: Zap,
                title: 'Performance-Optimierung',
                description: 'Verbessere deine Ausstrahlung und Stimmwirkung für maximale Wirkung.',
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
            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl mb-6">
              Werde zum Kundenmagneten
            </h2>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              Erfolg entsteht aus der perfekten Kombination: Klare Positionierung, authentische Persönlichkeit,
              überzeugende Performance und wirkungsvolle Stimme. In meinen Coachings, Mentorings und Workshops
              entwickelst du alle vier Säulen, um Kunden magnetisch anzuziehen.
            </p>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
              Ob im Einzel-Coaching oder in intensiven Workshops – ich begleite dich dabei, deine einzigartige
              Markenbotschaft zu finden und so zu kommunizieren, dass Kunden automatisch auf dich zukommen.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
