import { motion } from 'framer-motion';
import { Smartphone, Video, TrendingUp, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function SocialMediaWirkung() {
  return (
    <div className="min-h-screen bg-midnight-blue text-pearl-white">
      <SEO
        title="Social Media Wirkung — vor der Kamera sprechen"
        description="Wie Sie in kurzen Videos zur Sache kommen und dabei Sie selbst bleiben. Video, Reichweite und Auftritt."
        path="/social-media-wirkung"
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
            <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl mb-6">
              <Smartphone size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Social Media{' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">
                Wirkung
              </span>
            </h1>
            <p className="text-xl text-pearl-white/70 max-w-3xl mx-auto">
              Reden, die wirken – in Sekunden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Video,
                title: 'Video-Content',
                description: 'Erstelle fesselnde Videos, die in Sekunden Aufmerksamkeit erzeugen.',
              },
              {
                icon: TrendingUp,
                title: 'Reichweite aufbauen',
                description: 'Nutze Social Media strategisch, um deine Sichtbarkeit zu maximieren.',
              },
              {
                icon: MessageCircle,
                title: 'Community-Engagement',
                description: 'Baue eine loyale Community auf, die mit dir interagiert und wächst.',
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
              Maximale Wirkung in kürzester Zeit
            </h2>
            <p className="text-pearl-white/80 text-lg leading-relaxed mb-6">
              In der digitalen Welt hast du oft nur wenige Sekunden, um Aufmerksamkeit zu erzeugen.
              Lerne, wie du deine Botschaft so verpackst, dass sie sofort wirkt – ob im Reel,
              Story oder Post.
            </p>
            <p className="text-pearl-white/80 text-lg leading-relaxed">
              Ich zeige dir, wie du mit authentischer Präsenz und cleveren Storytelling-Techniken
              aus der Masse herausstichst und eine Community aufbaust, die dir vertraut und folgt.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
