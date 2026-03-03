import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function RednerAusbildungen() {
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
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl mb-6">
              <Heart size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                DEINE BERUFUNG.<br/>
                DEINE GESCHICHTE.<br/>
                DEINE MARKE.
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl-white/70 max-w-3xl mx-auto">
              Die Keynote-Ausbildung für Menschen, die etwas bewegen wollen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Deine Berufung finden',
                description: 'Entdecke, was dich wirklich antreibt und wozu du berufen bist.',
              },
              {
                icon: Star,
                title: 'Deine Geschichte entwickeln',
                description: 'Forme deine persönliche Geschichte zu einer kraftvollen Botschaft.',
              },
              {
                icon: Sparkles,
                title: 'Deine Marke aufbauen',
                description: 'Werde zur unverwechselbaren Marke, die Menschen bewegt.',
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
              Die Keynote-Ausbildung, die dein Leben verändert
            </h2>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-6">
              Diese Ausbildung ist für Menschen, die spüren, dass mehr in ihnen steckt. Die eine Botschaft haben,
              die gehört werden muss. Die nicht nur reden wollen, sondern Menschen wirklich bewegen möchten.
              In dieser Ausbildung findest du deine Berufung, formst deine authentische Geschichte und baust
              daraus eine Marke, die wirkt.
            </p>
            <p className="text-pearl-white/80 text-base sm:text-lg md:text-xl leading-relaxed">
              Du lernst nicht nur sprechen – du lernst, wie du mit deiner einzigartigen Geschichte Menschen
              berührst, inspirierst und zum Handeln bewegst. Werde zur Stimme, die bleibt.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
