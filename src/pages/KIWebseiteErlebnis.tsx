import { motion } from 'framer-motion';
import { Globe, ArrowRight, Sparkles, Heart, Zap, Eye, Palette } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

export default function KIWebseiteErlebnis() {
  const features = [
    { icon: Heart, title: 'Emotion trifft Technik', desc: 'KI-Tools nutzen, um eine Webseite zu bauen, die Menschen beruehrt' },
    { icon: Palette, title: 'Design mit Persoenlichkeit', desc: 'Deine Marke visuell zum Leben erwecken -- authentisch & einzigartig' },
    { icon: Sparkles, title: 'Content-Erstellung mit KI', desc: 'Texte, Bilder und Videos, die nach DIR klingen und aussehen' },
    { icon: Eye, title: 'Nutzererlebnis optimieren', desc: 'Deine Besucher fuehlen sich gesehen, verstanden und abgeholt' },
    { icon: Zap, title: 'Schnell & professionell', desc: 'Von der Idee zur fertigen Webseite in kuerzester Zeit' },
  ];

  return (
    <>
      <SEO
        title="KI Webseite als Emotionales Erlebnis | Claudia Conen"
        description="Erstelle mit KI eine Webseite, die Technik und Menschlichkeit vereint und deine Besucher emotional beruehrt."
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
              <Globe size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">KI & Mensch</span>
            </div>
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ color: 'white' }}>
              <span className="headline-line2">KI Webseite</span>
              <br />
              <span className="text-white text-3xl md:text-4xl">als Emotionales Erlebnis</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem' }}>
              Technik trifft Menschlichkeit -- deine Webseite als digitale Visitenkarte, die beruehrt und verkauft.
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
