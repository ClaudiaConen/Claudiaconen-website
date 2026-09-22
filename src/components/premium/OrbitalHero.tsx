import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const RINGS = [
  { size: 520, className: 'orbital-ring-1', borderStyle: 'border-t-[#D4AF37] border-r-[#D4AF37]/40 border-b-transparent border-l-transparent', nodes: [0, 120, 240] },
  { size: 400, className: 'orbital-ring-2', borderStyle: 'border-t-transparent border-r-[#F7E7CE]/50 border-b-[#F7E7CE] border-l-transparent', nodes: [60, 200] },
  { size: 280, className: 'orbital-ring-3', borderStyle: 'border-t-[#F7E7CE]/60 border-r-transparent border-b-transparent border-l-[#F7E7CE]/30', nodes: [30, 170, 310] },
  { size: 160, className: 'orbital-ring-4', borderStyle: 'border-t-transparent border-r-transparent border-b-[#D4AF37]/40 border-l-[#D4AF37]/60', nodes: [90, 270] },
];

function OrbitalNode({ angle, ringSize }: { angle: number; ringSize: number }) {
  const rad = (angle * Math.PI) / 180;
  const r = ringSize / 2;
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;

  return (
    <div
      className="orbital-node absolute w-2 h-2 rounded-full bg-[#D4AF37]"
      style={{
        left: `calc(50% + ${x}px - 4px)`,
        top: `calc(50% + ${y}px - 4px)`,
        boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
        animationDelay: `${angle * 10}ms`,
      }}
    />
  );
}

export default function OrbitalHero() {
  const scrollToCards = () => {
    const el = document.getElementById('pathway-cards');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-pearl-white pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F7E7CE]/[0.03] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative flex-shrink-0 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[520px] lg:h-[520px]" aria-hidden="true">
            <div className="orbital-system absolute inset-0">
              {RINGS.map((ring, i) => (
                <div
                  key={i}
                  className={`${ring.className} absolute rounded-full border-2 ${ring.borderStyle}`}
                  style={{
                    width: `${(ring.size / 520) * 100}%`,
                    height: `${(ring.size / 520) * 100}%`,
                    top: `${((520 - ring.size) / 520) * 50}%`,
                    left: `${((520 - ring.size) / 520) * 50}%`,
                  }}
                >
                  {ring.nodes.map((angle, j) => (
                    <OrbitalNode key={j} angle={angle} ringSize={ring.size * (280 / 520)} />
                  ))}
                </div>
              ))}

              <div
                className="orbital-core absolute rounded-full"
                style={{
                  width: '15%',
                  height: '15%',
                  top: '42.5%',
                  left: '42.5%',
                  background: 'radial-gradient(circle, #F7E7CE 0%, #D4AF37 60%, #B8860B 100%)',
                }}
              />

              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: '1px',
                    height: '50%',
                    top: '0',
                    left: '50%',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${i * 45}deg)`,
                    background: 'linear-gradient(to top, transparent 20%, rgba(212, 175, 55, 0.06) 50%, transparent 100%)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-8">
                <Sparkles size={16} className="text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#1a2744]">Premiumangebote</span>
              </div>
            </motion.div>

            <motion.h1
              className="font-montserrat text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
              style={{ color: '#1a2744' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Die Stimme zwischen
              <br />
              <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#F7E7CE] bg-clip-text text-transparent">
                Mensch & Maschine
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
              style={{ color: '#1e3a5f' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Unverwechselbar im KI-Zeitalter. Deine Einzigartigkeit ist Gold wert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <button
                onClick={scrollToCards}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-[#1a2744] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #F7E7CE 0%, #D4AF37 100%)',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
                }}
              >
                Entdecke deine Wirkung
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
