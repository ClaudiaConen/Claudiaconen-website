import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function GlowWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="cc-glow-word relative inline-block font-semibold">
      <span className="cc-glow-word-halo" />
      {children}
    </span>
  );
}

function SoundWaves() {
  const sizes = [300, 500, 700, 900, 1100];
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.08] pointer-events-none">
      {sizes.map((size, i) => (
        <div
          key={i}
          className="cc-wave absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-luxury-gold md:border-2"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${i}s`,
          }}
        />
      ))}
    </div>
  );
}

function LightParticles() {
  const particles = [
    { left: '10%', delay: '0s', duration: '12s' },
    { left: '30%', delay: '2s', duration: '14s' },
    { left: '50%', delay: '4s', duration: '16s' },
    { left: '70%', delay: '6s', duration: '13s' },
    { left: '90%', delay: '8s', duration: '15s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="cc-particle absolute w-1 h-1 rounded-full"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent)',
          }}
        />
      ))}
    </div>
  );
}

export default function HeroBrainSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden py-12 md:py-16 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(180deg, #FDFBF7 0%, #FAF8F3 50%, #F7F3EB 100%)',
      }}
    >
      <SoundWaves />
      <LightParticles />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-montserrat text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-[1.2] tracking-[-0.02em] text-midnight-blue mb-8"
        >
          <GlowWord>Fortschritt</GlowWord> nutzen.
          <br />
          <GlowWord>Persönlich</GlowWord> bleiben.
          <br />
          <GlowWord>Unverwechselbar</GlowWord> wirken.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="font-inter text-[clamp(1.15rem,2.5vw,1.75rem)] font-light leading-relaxed text-royal-navy/90 mb-10 md:mb-12"
        >
          <span className="font-medium text-midnight-blue"><GlowWord>Perfektion</GlowWord></span>{' '}
          ist klickbar &ndash;{' '}
          <span className="font-medium text-midnight-blue"><GlowWord>Vertrauen</GlowWord></span>{' '}
          entsteht durch{' '}
          <span className="font-medium text-midnight-blue"><GlowWord>dich</GlowWord></span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          <Link
            to="/premiumangebote"
            className="cc-cta-hero-brain group inline-flex items-center gap-4 px-10 py-5 md:px-14 md:py-6 text-xl md:text-2xl font-semibold text-white rounded-full transition-all duration-400"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F7E7CE)',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1)',
            }}
          >
            <span className="relative z-10">Klick rein – und entdecke dein Angebot</span>
            <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
