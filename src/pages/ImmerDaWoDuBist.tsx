import { motion } from 'framer-motion';
import { MapPin, Globe, Phone, Video } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ImmerDaWoDuBist() {
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
            <div className="inline-block p-4 bg-gradient-to-br from-teal-500 to-cyan-400 rounded-3xl mb-6">
              <MapPin size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Immer da{' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                wo du bist
              </span>
            </h1>
            <p className="text-xl text-pearl-white/70 max-w-3xl mx-auto">
              Ich bin da – vor Ort, online, live oder am Telefon.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Globe,
                title: 'Vor Ort & Online',
                description: 'Wähle zwischen persönlichen Treffen oder virtuellen Sessions – ganz nach deinen Bedürfnissen.',
              },
              {
                icon: Video,
                title: 'Live-Sessions',
                description: 'Interaktive Live-Trainings und Workshops, die dich direkt weiterbringen.',
              },
              {
                icon: Phone,
                title: 'Flexible Erreichbarkeit',
                description: 'Schneller Support und Beratung, wenn du sie brauchst – per Telefon oder Video-Call.',
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
              Maximale Flexibilität für deinen Erfolg
            </h2>
            <p className="text-pearl-white/80 text-lg leading-relaxed mb-6">
              Egal ob du aus Hamburg, München oder einem kleinen Dorf kommst – ich arbeite mit dir
              auf die Weise, die für dich am besten funktioniert. Vor Ort bei dir im Unternehmen,
              in meinem Studio oder ganz bequem von zu Hause aus.
            </p>
            <p className="text-pearl-white/80 text-lg leading-relaxed">
              Deine Zeit ist wertvoll. Deshalb biete ich dir maximale Flexibilität in der
              Zusammenarbeit. Ob kurzes Telefon-Coaching, intensive Video-Session oder mehrtägiges
              Live-Training – ich bin da, wo du mich brauchst.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
