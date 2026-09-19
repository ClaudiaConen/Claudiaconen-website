import { motion } from 'framer-motion';
import { Headphones, Podcast, Radio, Smartphone } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function WissenToGo() {
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
            <div className="inline-block p-4 bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl mb-6">
              <Headphones size={64} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Wissen{' '}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">
                to go
              </span>
            </h1>
            <p className="text-xl text-pearl-white/70 max-w-3xl mx-auto">
              Impulse, Routinen, Wissen aus der Hosentasche.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Podcast,
                title: 'Audio-Impulse',
                description: 'Tägliche Inspiration und Wissen direkt in dein Ohr – überall und jederzeit.',
              },
              {
                icon: Radio,
                title: 'Telegram & WhatsApp',
                description: 'Exklusive Community-Inhalte und direkte Verbindung zu Gleichgesinnten.',
              },
              {
                icon: Smartphone,
                title: 'Flexibles Lernen',
                description: 'Lerne in deinem Tempo, wann und wo es dir passt – mobil optimiert.',
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
              Lerne flexibel und mobil
            </h2>
            <p className="text-pearl-white/80 text-lg leading-relaxed mb-6">
              Mit "Wissen to go" bekommst du wertvollen Content direkt auf dein Smartphone.
              Ob beim Sport, auf dem Weg zur Arbeit oder in der Mittagspause – nutze jede freie
              Minute für deine persönliche Weiterentwicklung.
            </p>
            <p className="text-pearl-white/80 text-lg leading-relaxed">
              Erhalte tägliche Impulse, Audio-Trainings und exklusive Einblicke in die Welt der
              wirkungsvollen Kommunikation. Bleib connected mit unserer Community und profitiere
              vom kontinuierlichen Austausch.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
