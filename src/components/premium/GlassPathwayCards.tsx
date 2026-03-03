import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic2, Diamond, GraduationCap, Bot, ArrowRight, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PathwayCard {
  icon: typeof Mic2;
  iconBg: string;
  title: string;
  subtitle: string;
  bullets: string[];
  videoLabel: string;
  link: string;
}

const PATHWAYS: PathwayCard[] = [
  {
    icon: Mic2,
    iconBg: '#F4D03F',
    title: 'Vorträge & Events',
    subtitle: 'Für Unternehmen, Kongresse, Veranstaltungen',
    bullets: [
      'Keynotes: Mensch & KI, Wirkung, Storytelling',
      'Moderation von Panels & Firmen-Events',
      'Event-Stimme & Voice-Over für Audio/Video',
    ],
    videoLabel: 'Video: Keynote-Highlight einfügen',
    link: '/unternehmen-keynotes',
  },
  {
    icon: Diamond,
    iconBg: '#5BB5E8',
    title: 'Coaching & Mentoring',
    subtitle: 'Individuelle Entwicklung & Performance',
    bullets: [
      'Auftritt & Präsenz authentisch stärken',
      'Story & Pitch unverwechselbar entwickeln',
      'Emotional Selling mit Leichtigkeit meistern',
    ],
    videoLabel: 'Video: Coaching-Session einfügen',
    link: '/mentoring-transformation',
  },
  {
    icon: GraduationCap,
    iconBg: '#F4D03F',
    title: 'Ausbildung',
    subtitle: 'Werde Speaker, Trainer oder freier Redner',
    bullets: [
      'Speaker-Ausbildung: Von 0 zur Bühne',
      'Freie Redner-Ausbildung: Zeremonien gestalten',
      'Keynote-Entwicklung: Deine Botschaft perfektionieren',
    ],
    videoLabel: 'Video: Ausbildungs-Einblick einfügen',
    link: '/ausbildung-beruf',
  },
  {
    icon: Bot,
    iconBg: '#F4D03F',
    title: 'Mensch & KI',
    subtitle: 'KI verstehen, nutzen, übertreffen',
    bullets: [
      'KI für Menschen 50+: Einstieg ohne Überforderung',
      'KI im Unternehmen: Strategie & Implementierung',
      'Der Mensch als Unterschied: Wenn KI perfekt ist',
    ],
    videoLabel: 'Video: KI-Integration einfügen',
    link: '/ki-manager-ausbildung',
  },
];

function PathwayCardItem({ card, index }: { card: PathwayCard; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isFinePointer || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 6;
      const rotateY = (x / rect.width) * 6;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    },
    [isFinePointer]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
  }, []);

  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        className="premium-glass-card p-6 sm:p-8 h-full flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: 'transform' }}
      >
        <div className="rounded-2xl border-2 border-dashed border-[#DAA520]/30 bg-[#FDFBF7] flex items-center justify-center h-40 mb-6 relative">
          <Video size={28} className="text-[#DAA520]/40 mb-2" />
          <span className="absolute bottom-3 left-4 text-xs text-[#1a2744]/50 font-medium">
            {card.videoLabel}
          </span>
        </div>

        <div
          className="premium-icon-float w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md"
          style={{
            backgroundColor: card.iconBg,
            animationDelay: `${index * 0.6}s`,
          }}
        >
          <Icon size={26} className="text-white" />
        </div>

        <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-[#1a2744] mb-2">
          {card.title}
        </h3>

        <p className="text-[#1e3a5f]/70 text-sm sm:text-base mb-5">
          {card.subtitle}
        </p>

        <ul className="space-y-3 mb-6 flex-1">
          {card.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <ArrowRight size={16} className="text-[#DAA520] flex-shrink-0 mt-0.5" />
              <span className="text-[#1e3a5f] text-sm leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        <Link
          to={card.link}
          className="group inline-flex items-center gap-2 text-[#DAA520] font-semibold text-sm hover:text-[#B8860B] transition-colors duration-300"
        >
          Mehr erfahren
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export default function GlassPathwayCards() {
  return (
    <section id="pathway-cards" className="bg-pearl-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2744] mb-4">
            Deine Wegweiser zur Unverwechselbarkeit
          </h2>
          <p className="text-lg sm:text-xl text-[#1e3a5f]/70 max-w-2xl mx-auto">
            Vier Bereiche, eine Mission: Dich sichtbar machen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {PATHWAYS.map((card, i) => (
            <PathwayCardItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
