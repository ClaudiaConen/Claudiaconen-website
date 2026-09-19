import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MarkeUndPositionierung() {
  return (
    <div className="min-h-screen bg-midnight-blue text-pearl-white">
      <SEO
        title="Marke und Positionierung im KI-Zeitalter"
        description="Keynotes, Vorträge und Trainings dazu, wie Menschen erkennbar bleiben, wenn Inhalte auf Knopfdruck entstehen."
        path="/marke-und-positionierung"
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
            <div className="inline-block p-4 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-3xl mb-6">
              <Sparkles size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-tight">
              DU + KI ={' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">
                UNSCHLAGBAR
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl-white/70 max-w-3xl mx-auto">
              Keynotes • Vorträge • Trainings für das KI-Zeitalter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Zap,
                title: 'KI-Power nutzen',
                description: 'Entdecke, wie du künstliche Intelligenz als deinenpersönlichen Turbo-Booster einsetzt.',
              },
              {
                icon: Brain,
                title: 'Menschliche Stärken betonen',
                description: 'Lerne, was dich unersetzbar macht und wie du deine einzigartigen Qualitäten hervorhebst.',
              },
              {
                icon: Lightbulb,
                title: 'Zukunftssicher auftreten',
                description: 'Positioniere dich als Experte, der Mensch und Technologie perfekt verbindet.',
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
              Im KI-Zeitalter unschlagbar werden
            </h2>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              Die Zukunft gehört nicht der KI allein – sondern der perfekten Kombination aus menschlicher
              Intelligenz und künstlicher Unterstützung. In meinen Keynotes, Vorträgen und Trainings zeige ich dir,
              wie du KI-Tools strategisch einsetzt, ohne dabei deine menschliche Einzigartigkeit zu verlieren.
            </p>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
              Entdecke, wie du durch die richtige Balance von Technologie und Persönlichkeit zur
              unverwechselbaren Stimme in deiner Branche wirst. Gemeinsam entwickeln wir deinen Weg,
              um im KI-Zeitalter nicht nur mitzuhalten, sondern zu führen.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
