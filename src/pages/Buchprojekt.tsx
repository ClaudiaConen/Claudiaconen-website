import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  Quote,
  Check,
  Star,
  GraduationCap,
  Mic,
  ChevronDown,
} from 'lucide-react';
import BuchprojektFormModal from '../components/BuchprojektFormModal';

/* --------------------------------------------------------------------------
 * THE POWER OF AI – Die 80 Stimmen deiner Stadt
 * Apple-inspirierte Landingpage in der hellen POAI-Palette.
 * -------------------------------------------------------------------------- */

const LAUNCH_DEADLINE = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 42); // 6 Wochen
  d.setHours(23, 59, 59, 999);
  return d;
})();

const PARTICIPANTS = { current: 36, target: 77 };

const CITIES = [
  { name: 'Hauptbuch 2026', status: 'start', meta: 'DACH · Premiere Edition' },
  { name: 'Köln 2027', status: 'planned', meta: 'in Planung' },
  { name: 'Leipzig', status: 'planned', meta: 'in Planung' },
  { name: 'Berlin', status: 'planned', meta: 'in Planung' },
  { name: 'Frankfurt', status: 'planned', meta: 'in Planung' },
];

export default function Buchprojekt() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-poai-bg text-poai-text font-inter selection:bg-poai-magenta selection:text-white antialiased">
      <AuroraBackdrop />
      <PageProgress />
      <StickyNav onCTA={() => setModalOpen(true)} />

      <main className="relative">
        <Hero onCTA={() => setModalOpen(true)} />
        <ParticipantStrip />
        <OfferSection onCTA={() => setModalOpen(true)} />
        <WhyBookSection />
        <MechanikSection />
        <CountdownSection deadline={LAUNCH_DEADLINE} onCTA={() => setModalOpen(true)} />
        <CitiesSection />
        <SocialProofSection />
        <UpsellSection onCTA={() => setModalOpen(true)} />
        <FAQSection />
        <FinalCTASection onCTA={() => setModalOpen(true)} />
      </main>

      <Footer />
      <FloatingCTA onCTA={() => setModalOpen(true)} />
      <BuchprojektFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

/* ============================================================
 * Aurora Backdrop — sehr dezenter, animierter Mesh-Gradient
 * ============================================================ */
function AuroraBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* warmer Basis-Wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,56,143,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(15,181,166,0.05),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(185,142,31,0.05),transparent_65%)]" />
      {/* schwebende Lichtflächen */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-poai-magenta/15 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 -right-20 h-[600px] w-[600px] rounded-full bg-poai-turquoise/12 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 25, -15, 0], y: [0, -10, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-poai-gold/10 blur-[120px]"
      />
      {/* feine Noise-Layer für Tiefe */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/* ============================================================
 * Top Page Progress (Apple-style hairline)
 * ============================================================ */
function PageProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[80] bg-gradient-to-r from-poai-magenta via-poai-magenta-2 to-poai-turquoise"
    />
  );
}

/* ============================================================
 * Sticky Nav — frosted glass, becomes opaque on scroll
 * ============================================================ */
function StickyNav({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/70 border-b border-poai-violet-soft/60 shadow-[0_1px_0_rgba(139,92,246,0.06),0_8px_24px_-12px_rgba(124,58,237,0.18)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm font-medium text-poai-text-dim hover:text-poai-text transition flex items-center gap-1.5"
        >
          <span className="text-poai-magenta">←</span> claudiaconen.com
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-poai-text-dim">
          <a href="#angebot" className="hover:text-poai-text transition">Angebot</a>
          <a href="#mechanik" className="hover:text-poai-text transition">So funktioniert's</a>
          <a href="#staedte" className="hover:text-poai-text transition">Städte</a>
          <a href="#faq" className="hover:text-poai-text transition">FAQ</a>
        </nav>
        <button
          onClick={onCTA}
          className="px-4 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-sm shadow-poai-magenta/30 hover:shadow-md hover:shadow-poai-magenta/40 transition"
        >
          Anmelden
        </button>
      </div>
    </header>
  );
}

/* ============================================================
 * Hero
 * ============================================================ */
function Hero({ onCTA }: { onCTA: () => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <section className="relative pt-12 md:pt-24 pb-16 md:pb-28 overflow-hidden">
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-7xl px-5 md:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <FadeIn delay={0}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-poai-violet-soft/70 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-poai-magenta shadow-[0_2px_8px_-2px_rgba(139,92,246,0.18)]">
                <Sparkles className="h-3.5 w-3.5 text-poai-magenta" />
                Unkopierbar im KI-Zeitalter
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-6 font-montserrat text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5rem] font-bold tracking-[-0.025em] leading-[0.98] text-poai-text">
                Schreib dich ins{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-br from-poai-magenta via-poai-magenta-2 to-poai-turquoise bg-clip-text text-transparent">
                    Gedächtnis
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-3 -z-10 bg-gradient-to-br from-poai-magenta/15 via-transparent to-poai-turquoise/15 blur-2xl"
                  />
                </span>
                .
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mt-7 max-w-xl text-2xl md:text-3xl text-poai-text font-semibold leading-tight tracking-tight">
                77 Mittelstand-Unternehmer.
              </p>
              <p className="mt-3 max-w-xl text-sm md:text-base text-poai-text-mute font-mono tracking-[0.15em] uppercase">
                Premiere &middot; The Power of AI &middot; 2026
              </p>
              <p className="mt-6 max-w-xl text-base md:text-lg text-poai-text-dim leading-relaxed">
                Ein <strong className="text-poai-text font-semibold">Handbuch des Mittelstands</strong>:
                77 Persönlichkeiten zeigen, wie sich Unternehmen, Selbstständigkeit und Unternehmertum
                im KI-Zeitalter verändern.{' '}
                <strong className="text-poai-text font-semibold">
                  Im Zeitalter der KI-Perfektion wird Persönlichkeit unbezahlbar.
                </strong>
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onCTA}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-lg shadow-poai-magenta/25 hover:shadow-xl hover:shadow-poai-magenta/35 hover:-translate-y-0.5 transition"
                >
                  Hier anmelden
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
                <a
                  href="#angebot"
                  className="poai-glass inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-poai-text font-semibold transition !shadow-none hover:!shadow-[0_18px_50px_-18px_rgba(124,58,237,0.32)]"
                >
                  Was du bekommst
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.28}>
              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-poai-text-mute">
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-poai-gold fill-current" /> Premiere-Edition
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-poai-turquoise" /> Hardcover-Qualität
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-poai-turquoise" /> Limitiert auf 77
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Hero Visual */}
          <FadeIn delay={0.2} className="lg:col-span-5">
            <BookHero />
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}

/* Rotating 3D book — front uses the actual cover image, back is themed.
 * Pause on hover, respects prefers-reduced-motion. */
function BookHero() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px] md:w-[340px] aspect-[3/4]" style={{ perspective: '2000px' }}>
      {/* Soft ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-12 rounded-[60px] bg-gradient-to-br from-poai-magenta/22 via-poai-violet/18 to-poai-turquoise/15 blur-3xl"
      />
      {/* Floor reflection blur (poor man's contact shadow) */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-30px] h-8 w-3/4 rounded-full bg-poai-text/30 blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative w-full h-full"
      >
        <div
          className="absolute inset-0 animate-book-spin hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front cover — das echte Buch */}
          <div
            className="absolute inset-0 rounded-[10px] overflow-hidden ring-1 ring-white/15 shadow-[0_50px_80px_-30px_rgba(15,10,42,0.55)]"
            style={{ transform: 'translateZ(14px)', backfaceVisibility: 'hidden' }}
          >
            <img
              src="/buchprojekt-cover.png"
              alt="THE POWER OF AI – Unverwechselbar – Wie KI unseren Mittelstand verändert"
              className="w-full h-full object-cover select-none"
              draggable={false}
              loading="eager"
            />
            {/* Foil-Sweep über das Cover */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)]"
            />
          </div>

          {/* Back cover — dunkles Premium-Design */}
          <div
            className="absolute inset-0 rounded-[10px] bg-gradient-to-br from-[#1a1530] via-[#0f0a26] to-[#0a0820] ring-1 ring-poai-violet/30 overflow-hidden"
            style={{ transform: 'rotateY(180deg) translateZ(14px)', backfaceVisibility: 'hidden' }}
          >
            <span aria-hidden className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-poai-magenta/25 blur-2xl" />
            <span aria-hidden className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-poai-turquoise/20 blur-2xl" />
            <div className="relative h-full p-7 md:p-9 flex flex-col">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-poai-turquoise font-mono">
                <Sparkles className="h-3.5 w-3.5" /> Power of AI
              </div>
              <div className="mt-auto">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/55 mb-3">
                  Premiere Edition &middot; 2026
                </div>
                <div className="font-montserrat text-2xl md:text-3xl font-bold leading-[1.1] text-white">
                  77 Persönlichkeiten.
                  <br />
                  <span className="bg-gradient-to-r from-poai-magenta to-poai-turquoise bg-clip-text text-transparent">
                    Ein Werk.
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] text-white/55 border-t border-white/10 pt-4">
                  <span>Hardcover &middot; DACH</span>
                  <span className="flex items-center gap-1 text-poai-gold">
                    <Star className="h-3 w-3 fill-current" /> Premiere
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buchrücken (links) */}
          <div
            className="absolute top-0 left-0 h-full w-[28px] bg-gradient-to-b from-[#1a1530] via-[#0f0a26] to-[#0a0820] flex items-center justify-center"
            style={{
              transform: 'translateX(-14px) rotateY(-90deg) translateZ(0)',
              transformOrigin: '100% 50%',
            }}
          >
            <span
              className="font-montserrat font-bold text-[10px] tracking-[0.25em] text-white/85 uppercase whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              The Power of AI · Hauptbuch 2026
            </span>
          </div>

          {/* Page-Edge (rechts) — simulierte Seitenkanten */}
          <div
            className="absolute top-0 right-0 h-full w-[28px] bg-[linear-gradient(to_right,#fff8e7,#ece2c7)]"
            style={{
              transform: 'translateX(14px) rotateY(90deg) translateZ(0)',
              transformOrigin: '0% 50%',
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px), linear-gradient(to right, #fff8e7, #ece2c7)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
 * Participant Strip — Apple-style sticky info bar feel
 * ============================================================ */
function ParticipantStrip() {
  const pct = Math.min(100, Math.round((PARTICIPANTS.current / PARTICIPANTS.target) * 100));
  return (
    <section className="relative -mt-8 mb-16 z-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="poai-glass rounded-3xl px-6 md:px-10 py-7"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-poai-text-mute">
                Live · Aktueller Stand
              </p>
              <h3 className="mt-1 font-montserrat text-2xl md:text-3xl font-bold tracking-tight">
                <span className="text-poai-magenta">{PARTICIPANTS.current}</span>
                <span className="text-poai-text"> / {PARTICIPANTS.target} Premiere-Plätze</span>
              </h3>
            </div>
            <p className="text-sm text-poai-text-dim">
              Bis Ende 2026 wird produziert. Premiere-Edition — einmalige Ausgabe.
            </p>
          </div>

          <div className="mt-5 h-2 rounded-full bg-poai-line overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-poai-magenta via-poai-magenta-2 to-poai-turquoise relative"
            >
              <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shimmer_2.4s_linear_infinite]" />
            </motion.div>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-poai-text-mute">
            <span>Reserviert</span>
            <span className="font-mono text-poai-turquoise font-semibold">{pct}%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
 * Offer
 * ============================================================ */
function OfferSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="angebot" className="relative mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeader
        kicker="Was du bekommst"
        title="Dein Platz unter den 77."
        sub="Du kannst selbst schreiben oder schreiben lassen."
      />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <OfferCard
          icon={<BookOpen className="h-5 w-5" />}
          title="Eigene Doppelseite"
          text="Mindestens eine eigene Doppelseite — DIN A5, Hardcover, Vierfarbendruck."
          highlight
        />
        <OfferCard
          icon={<Users className="h-5 w-5" />}
          title="50–70 Hardcover"
          text="Hochwertig gedruckte Bücher gehen direkt an dich — als Geschenk oder Verkaufswerkzeug."
        />
        <OfferCard
          icon={<MapPin className="h-5 w-5" />}
          title="Mittelstand-Edition"
          text="Du bist Teil der Premiere-Edition. 77 Persönlichkeiten aus dem gesamten DACH-Mittelstand, kuratierte Auswahl."
        />
        <OfferCard
          icon={<Sparkles className="h-5 w-5" />}
          title="Foto, Story & QR"
          text="Portrait-Foto, dein Beitrag und QR-Code — mit allem, was Menschen zu dir bringt."
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <TierCard
          name="Standard"
          price="555 €"
          pages="4 Seiten"
          spread="1 Doppelseite"
          perPage="≈ 139 € pro Seite"
          features={[
            '4 Seiten (DIN A5) im Buch',
            '50 Hardcover-Bücher',
            'Portrait-Foto im Beitrag',
            'QR-Code im Buch',
          ]}
          onCTA={onCTA}
        />
        <TierCard
          name="Business"
          price="777 €"
          pages="6 Seiten"
          spread="1,5 Doppelseiten"
          perPage="≈ 130 € pro Seite · 7 % Vorteil"
          features={[
            '6 Seiten (DIN A5) im Buch',
            '60 Hardcover-Bücher',
            'Portrait-Foto im Beitrag',
            'Cover-Foto am Kapitelanfang',
            'QR-Code im Buch',
          ]}
          onCTA={onCTA}
          featured
        />
        <TierCard
          name="Premium"
          price="999 €"
          pages="8 Seiten"
          spread="2 Doppelseiten"
          perPage="≈ 125 € pro Seite · 10 % Vorteil"
          features={[
            '8 Seiten (DIN A5) im Buch',
            '70 Hardcover-Bücher',
            'Portrait-Foto im Beitrag',
            'Cover-Foto am Kapitelanfang',
            'Reportage-Foto im Beitrag',
            'Premium-Platzierung im vorderen Buchteil',
            'QR-Code im Buch',
          ]}
          onCTA={onCTA}
        />
      </div>

      <p className="mt-6 text-center text-sm text-poai-text-mute max-w-2xl mx-auto leading-relaxed">
        Vierfarbendruck im Innenteil. Einzelne Seiten ggf. schwarzweiß, je nach eingereichtem Bildmaterial.
        Alle Preise zzgl. MwSt. Rechnung vor Produktionsbeginn.
      </p>
    </section>
  );
}

function OfferCard({
  icon,
  title,
  text,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group poai-glass rounded-3xl p-7 ${
        highlight ? 'poai-glass-tinted' : ''
      }`}
    >
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
          highlight
            ? 'bg-gradient-to-br from-poai-magenta to-poai-magenta-2 text-white shadow-md shadow-poai-magenta/25'
            : 'bg-poai-bg-3 text-poai-magenta ring-1 ring-poai-line'
        }`}
      >
        {icon}
      </div>
      <h3 className="mt-5 font-montserrat font-bold text-lg tracking-tight text-poai-text">
        {title}
      </h3>
      <p className="mt-2 text-sm text-poai-text-dim leading-relaxed">{text}</p>
    </motion.div>
  );
}

function TierCard({
  name,
  price,
  pages,
  spread,
  perPage,
  features,
  featured,
  onCTA,
}: {
  name: string;
  price: string;
  pages: string;
  spread: string;
  perPage: string;
  features: string[];
  featured?: boolean;
  onCTA: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`poai-glass rounded-3xl p-9 ${featured ? 'poai-glass-tinted' : ''}`}
    >
      {featured && (
        <span className="absolute -top-3 left-9 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-md shadow-poai-magenta/30">
          <Star className="h-3 w-3 fill-current" /> Meistgewählt
        </span>
      )}
      <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-poai-turquoise font-mono font-semibold">
        {name}
      </span>
      <div className="mt-2 text-sm text-poai-text">
        <span className="font-semibold">{pages}</span>
        <span className="text-poai-text-mute"> · {spread}</span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-montserrat text-5xl md:text-6xl font-bold text-poai-text tracking-tight">
          {price}
        </span>
      </div>
      <p className="mt-1 text-xs text-poai-text-mute">{perPage}</p>
      <ul className="mt-7 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14.5px]">
            <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-poai-turquoise-soft">
              <Check className="h-3.5 w-3.5 text-poai-turquoise-2" />
            </span>
            <span className="text-poai-text-dim">{f}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onCTA}
        className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold transition ${
          featured
            ? 'bg-gradient-to-r from-poai-magenta to-poai-magenta-2 text-white shadow-lg shadow-poai-magenta/25 hover:shadow-xl hover:shadow-poai-magenta/35'
            : 'bg-poai-bg-3 hover:bg-poai-line text-poai-text'
        }`}
      >
        Platz reservieren
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ============================================================
 * Why-Book section — Apple-style three-up
 * ============================================================ */
function WhyBookSection() {
  const items = [
    {
      icon: <Star className="h-5 w-5" />,
      number: '01',
      title: 'Autorität',
      lead: 'Du positionierst dich als Experte in deinem Thema.',
      text: 'Posts vergisst der Algorithmus in 48 Stunden. Bücher zitiert man noch in zehn Jahren.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      number: '02',
      title: 'Vertrieb',
      lead: 'Dein Buch wird zu deinem stärksten Verkaufsinstrument.',
      text: 'Eine Visitenkarte landet im Müll. Ein Buch landet im Regal, neben den Standardwerken deiner Branche.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      number: '03',
      title: 'Zukunft',
      lead: 'Du zeigst, wie du dich im KI-Zeitalter unverwechselbar positionierst.',
      text: 'Die nächsten Jahre werden Texte und Posts massenhaft generieren. Was bleibt unverwechselbar? Eine echte Geschichte, ein echter Name, ein echtes Foto. Auf echtem Papier.',
    },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-5 md:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-poai-magenta font-mono">
          Drei Gründe
        </p>
        <h2 className="mt-3 font-montserrat text-2xl md:text-3xl font-bold tracking-tight text-poai-text leading-tight">
          Eine Maschine liefert Inhalte. <span className="text-poai-text-dim">Ein Mensch schafft Verbindung.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="poai-glass rounded-3xl p-7"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-poai-line shadow-sm text-poai-magenta">
                {it.icon}
              </div>
              <span className="font-mono text-xs font-semibold text-poai-magenta tracking-widest">
                {it.number}
              </span>
            </div>
            <h3 className="mt-5 font-montserrat font-bold text-lg tracking-tight">{it.title}</h3>
            <p className="mt-2 text-[15px] font-semibold text-poai-text leading-snug">{it.lead}</p>
            <p className="mt-2 text-sm text-poai-text-dim leading-relaxed">{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * Mechanik
 * ============================================================ */
function MechanikSection() {
  const steps = [
    { title: 'Du meldest dich an', text: 'Verbindlich, mit deinem Beitrag, Foto und QR-Code.' },
    { title: 'Wir warten auf 77', text: 'Bis Ende 2026 wird produziert. Premiere-Edition, einmalige Ausgabe.' },
    { title: 'Du bekommst die Rechnung', text: 'Die Rechnung wird vor Produktionsbeginn gestellt.' },
    { title: 'Buch in der Hand', text: '50–70 Hardcover gehen direkt an dich — je nach Tier.' },
  ];
  const team = [
    { role: 'Visionär', name: 'Ronny Barthel', org: 'The Power of AI · Strategische Leitung' },
    { role: 'Ansprechpartnerin', name: 'Claudia Conen', org: 'Buch-Ideengeberin · Direkter Draht' },
    { role: 'Buchverlag', name: 'Arno Müller', org: 'One World Distribution · Lektorat, ISBN, Vertrieb' },
  ];
  return (
    <section id="mechanik" className="relative mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeader
        kicker="So funktioniert es"
        title="Vier Schritte bis zu deinem Buch."
        sub="Klar geregelt. Kein Risiko, kein Kleingedrucktes."
      />
      <ol className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="poai-glass rounded-3xl p-7"
          >
            <span className="font-mono text-xs font-semibold text-poai-magenta tracking-widest">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 className="mt-4 font-montserrat font-bold text-lg tracking-tight">{s.title}</h4>
            <p className="mt-2 text-sm text-poai-text-dim leading-relaxed">{s.text}</p>
          </motion.li>
        ))}
      </ol>

      {/* Hinter dem Buch — Team-Bullets innerhalb der Mechanik-Sektion */}
      <div className="mt-12 max-w-4xl mx-auto">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-poai-magenta font-mono mb-5">
          Hinter dem Buch
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {team.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="poai-glass rounded-2xl px-5 py-4 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-poai-turquoise-2 font-mono">
                {t.role}
              </p>
              <p className="mt-1.5 font-montserrat font-bold text-base text-poai-text">{t.name}</p>
              <p className="mt-1 text-xs text-poai-text-mute leading-snug">{t.org}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * Countdown
 * ============================================================ */
function CountdownSection({
  deadline,
  onCTA,
}: {
  deadline: Date;
  onCTA: () => void;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = useMemo(() => {
    const ms = Math.max(0, deadline.getTime() - now.getTime());
    return {
      days: Math.floor(ms / 86400000),
      hours: Math.floor((ms / 3600000) % 24),
      minutes: Math.floor((ms / 60000) % 60),
      seconds: Math.floor((ms / 1000) % 60),
    };
  }, [now, deadline]);

  return (
    <section className="relative mx-auto max-w-6xl px-5 md:px-8 py-12">
      <div className="poai-glass rounded-3xl p-8 md:p-14 overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-poai-magenta/15 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-poai-turquoise/12 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-poai-turquoise font-mono">
              <Clock className="h-4 w-4" /> Zeitfenster
            </p>
            <h3 className="mt-3 font-montserrat text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Noch{' '}
              <span className="bg-gradient-to-r from-poai-magenta to-poai-turquoise bg-clip-text text-transparent">
                {remaining.days} Tage
              </span>
              <br className="hidden md:block" /> bis Bewerbungsschluss.
            </h3>
            <p className="mt-4 text-poai-text-dim leading-relaxed">
              Wir nehmen Bewerbungen für die Premiere-Edition entgegen.
              Produktion bis Ende 2026 — Auslieferung an alle Autor:innen und in den Buchhandel.
              Stadt-Editionen folgen ab 2027.
            </p>
            <button
              onClick={onCTA}
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-lg shadow-poai-magenta/25 hover:shadow-xl hover:shadow-poai-magenta/35 transition"
            >
              Platz jetzt sichern
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-4">
            <CountdownCell value={remaining.days} label="Tage" />
            <CountdownCell value={remaining.hours} label="Std" />
            <CountdownCell value={remaining.minutes} label="Min" />
            <CountdownCell value={remaining.seconds} label="Sek" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="poai-glass rounded-2xl px-2 py-4 md:px-3 md:py-5 text-center">
      <div className="font-mono tabular-nums text-3xl md:text-4xl font-bold text-poai-text leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.22em] text-poai-text-mute font-semibold">
        {label}
      </div>
    </div>
  );
}

/* ============================================================
 * Cities
 * ============================================================ */
function CitiesSection() {
  return (
    <section id="staedte" className="relative mx-auto max-w-6xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeader
        kicker="Die Reihe"
        title="Hauptbuch zuerst. Die Städte folgen."
        sub="Das Hauptbuch ist der Auftakt der Reihe. Die Stadt-Editionen sind Erweiterungen, keine Wiederholungen. Wer hier dabei ist, ist Tag eins."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CITIES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`poai-glass rounded-3xl p-7 ${c.status === 'start' ? 'poai-glass-tinted' : ''}`}
          >
            {c.status === 'start' && (
              <span className="absolute -top-2 right-5 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] rounded-full bg-poai-gold text-white font-bold shadow-sm">
                Start
              </span>
            )}
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                c.status === 'start'
                  ? 'bg-white text-poai-magenta ring-1 ring-poai-line shadow-sm'
                  : 'bg-poai-bg-3 text-poai-text-mute'
              }`}
            >
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-montserrat font-bold text-2xl tracking-tight">{c.name}</h3>
            <p className="mt-1 text-sm text-poai-text-mute">{c.meta}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
 * Social Proof
 * ============================================================ */
function SocialProofSection() {
  return (
    <section className="relative mx-auto max-w-4xl px-5 md:px-8 py-12">
      <SectionHeader
        kicker="Die Idee"
        title="77 Persönlichkeiten. Ein Werk."
      />
      <motion.figure
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="poai-glass rounded-3xl p-8 md:p-12 mt-12 text-center"
      >
        <Quote className="h-7 w-7 text-poai-magenta mx-auto" />
        <blockquote className="mt-6 font-montserrat text-xl md:text-3xl font-bold tracking-tight text-poai-text leading-snug">
          Eine Maschine kann Inhalte generieren.
          <br />
          Aber sie kann dir nicht zuhören.
          <br />
          Nicht zwischen den Zeilen lesen.
          <br />
          Nicht fühlen, was dich wirklich ausmacht.
        </blockquote>
        <p className="mt-6 text-base md:text-lg text-poai-text-dim leading-relaxed">
          Genau deshalb braucht es dich. <strong className="text-poai-text">Deine Geschichte. Deine Perspektive.</strong>
        </p>
        <p className="mt-8 inline-block px-5 py-2 rounded-full bg-poai-magenta-soft text-poai-magenta-2 text-sm font-semibold tracking-wide">
          Perfektion ist klickbar. Persönlichkeit bleibt.
        </p>
      </motion.figure>
    </section>
  );
}

/* ============================================================
 * Upsell
 * ============================================================ */
function UpsellSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 md:px-8 py-12">
      <SectionHeader
        kicker="Optional dazubuchen"
        title="Manche schreiben selbst. Andere lassen schreiben."
        sub="Zwei Wege zu deinem fertigen Beitrag im Buch. Beide buchbar zusammen mit deinem Autorenplatz, beide vom Lektorat des Verlags abgenommen."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Story-Sparring */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="poai-glass rounded-3xl p-8 md:p-10 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-poai-magenta font-mono">
              <Mic className="h-4 w-4" /> Story-Sparring
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-poai-text-mute font-mono">
              2× Live
            </span>
          </div>
          <h3 className="mt-4 font-montserrat text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Du schreibst. <span className="text-poai-text-dim">Wir schärfen.</span>
          </h3>
          <p className="mt-3 text-poai-text-dim leading-relaxed text-sm md:text-base">
            Für alle, die selbst formulieren wollen, aber ein Gegenüber brauchen.
          </p>
          <ul className="mt-6 space-y-2.5 text-[14.5px] flex-grow">
            {[
              '2 × 60 Min Live-Sparring via Zoom',
              'Schärfung von Thema, Aufbau und Haltung',
              'Manuskript-Lektorat deines Beitrags',
              'Sprachstil-Feedback in Magazin-Tonalität',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-poai-text-dim">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-poai-turquoise-soft">
                  <Check className="h-3.5 w-3.5 text-poai-turquoise-2" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-5 border-t border-poai-line/70 flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-poai-text-mute font-mono">
              Einmalig
            </span>
            <span className="font-montserrat text-4xl font-bold text-poai-text tracking-tight">
              333 €
            </span>
          </div>
          <button
            onClick={onCTA}
            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-poai-bg-3 hover:bg-poai-line text-poai-text transition"
          >
            Im Bewerbungsformular dazubuchen
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Persönlicher Chronist */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="poai-glass poai-glass-tinted rounded-3xl p-8 md:p-10 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-poai-magenta font-mono">
              <GraduationCap className="h-4 w-4" /> Persönlicher Chronist
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-poai-gold font-mono">
              1:1
            </span>
          </div>
          <h3 className="mt-4 font-montserrat text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Du erzählst. <span className="text-poai-text-dim">Wir schreiben.</span>
          </h3>
          <p className="mt-3 text-poai-text-dim leading-relaxed text-sm md:text-base">
            Persönlichkeit weckt Vertrauen. Perfektion auf Mausklick nicht. Für alle, die ihre
            Geschichte haben, aber das Schreiben jemand anderem überlassen wollen.
          </p>
          <ul className="mt-6 space-y-2.5 text-[14.5px] flex-grow">
            {[
              '3 × 60 Min Story-Interviews, immer 1:1',
              'Recherche aus Webseite, LinkedIn und Sprachstil',
              'Vollständiger Beitrags-Entwurf in deiner Tone of Voice',
              'Eigenes Zitat oder Kernsatz in deiner Stimme',
              'Lektorat eingeschlossen, durch den Verlag',
              '2 Korrektur-Runden mit dir',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-poai-text-dim">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-poai-turquoise-soft">
                  <Check className="h-3.5 w-3.5 text-poai-turquoise-2" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-5 border-t border-poai-violet-soft/60 flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-poai-text-mute font-mono">
              Einmalig
            </span>
            <span className="font-montserrat text-4xl font-bold text-poai-text tracking-tight">
              1.555 €
            </span>
          </div>
          <button
            onClick={onCTA}
            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold bg-gradient-to-r from-poai-magenta to-poai-magenta-2 text-white shadow-lg shadow-poai-magenta/25 hover:shadow-xl hover:shadow-poai-magenta/35 transition"
          >
            Im Bewerbungsformular dazubuchen
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      <p className="mt-6 text-center text-sm text-poai-text-mute">
        Beide Angebote sind unabhängig vom Buchpreis. Buchung als Checkbox im Bewerbungsformular.
      </p>
    </section>
  );
}

/* ============================================================
 * FAQ
 * ============================================================ */
function FAQSection() {
  const faqs = [
    {
      q: 'Wann erscheint das Buch?',
      a: 'Das Hauptbuch wird bis Ende 2026 produziert. Ab dann beginnen wir mit der Auslieferung an alle Autor:innen und in den Buchhandel. Stadt-Editionen starten ab 2027.',
    },
    {
      q: 'Bekomme ich mein Geld zurück?',
      a: 'Nein. Mit der Buchung sicherst du verbindlich einen der 77 Premiere-Plätze. Dafür reservieren wir dir Layout, Druckkapazität und einen Slot in der Marketing-Kampagne der Reihe.',
    },
    {
      q: 'Lohnt sich das Hauptbuch, wenn meine Stadt später folgt?',
      a: 'Business ist heute übergreifend, die Online-Welt zeigt täglich, dass Sichtbarkeit längst nicht mehr an der Stadtgrenze endet. Das Hauptbuch versammelt 77 Persönlichkeiten aus dem gesamten DACH-Mittelstand und ist gleichzeitig ein hochwertiges Sammlerstück, das du als Geschenk an Schlüsselkund:innen weitergibst. Wer auf beiden Bühnen sichtbar sein will, bucht beides.',
    },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 md:px-8 py-24 md:py-32">
      <SectionHeader kicker="FAQ" title="Häufige Fragen." />
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <motion.div
              key={i}
              layout
              transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              className="poai-glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open}
              >
                <span className="font-semibold text-poai-text">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-none text-poai-magenta transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-poai-text-dim leading-relaxed">{f.a}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
 * Final CTA — Apple-style premium card
 * ============================================================ */
function FinalCTASection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 md:px-8 pb-28">
      <div className="relative rounded-[32px] p-10 md:p-20 text-center bg-gradient-to-br from-[#1a1230] via-[#0f0a26] to-[#0a0820] ring-1 ring-white/10 shadow-[0_50px_100px_-30px_rgba(15,10,42,0.4)] overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-poai-magenta/30 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-poai-turquoise/25 blur-3xl" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(214,56,143,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(15,181,166,0.15), transparent 50%)',
          }}
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-[11px] uppercase tracking-[0.25em] text-white/85 font-mono">
            <Star className="h-3.5 w-3.5 text-poai-gold fill-current" /> Einmalige Ausgabe · Erstedition
          </span>
          <h3 className="mt-6 font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.02em] leading-[1]">
            Sei eine{' '}
            <span className="bg-gradient-to-r from-poai-magenta to-poai-turquoise bg-clip-text text-transparent">
              der 77
            </span>
            <br /> Persönlichkeiten.
          </h3>
          <p className="mt-6 text-white/85 max-w-2xl mx-auto text-lg leading-relaxed">
            Wenn du fühlst, dass du da reingehörst — du tust es vermutlich. Trag dich verbindlich
            ein, bevor jemand anderes deinen Platz nimmt.
          </p>
          <button
            onClick={onCTA}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-poai-text font-bold shadow-2xl shadow-black/30 hover:shadow-3xl hover:-translate-y-0.5 transition"
          >
            Hier verbindlich anmelden
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Footer & Floating CTA
 * ============================================================ */
function Footer() {
  return (
    <footer className="relative border-t border-poai-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-poai-text-mute">
        <div>© {new Date().getFullYear()} Claudia Conen &middot; Power of AI Buchprojekt</div>
        <div className="flex items-center gap-5">
          <Link to="/impressum" className="hover:text-poai-text transition">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-poai-text transition">Datenschutz</Link>
          <Link to="/agb" className="hover:text-poai-text transition">AGB</Link>
        </div>
      </div>
    </footer>
  );
}

function FloatingCTA({ onCTA }: { onCTA: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.button
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 30,
        pointerEvents: show ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={onCTA}
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-poai-magenta to-poai-magenta-2 shadow-xl shadow-poai-magenta/30 hover:shadow-2xl hover:shadow-poai-magenta/40 hover:-translate-y-0.5 transition"
    >
      Jetzt anmelden
      <ArrowRight className="h-4 w-4" />
    </motion.button>
  );
}

/* ============================================================
 * Helpers
 * ============================================================ */
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto"
    >
      {kicker && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-poai-magenta font-mono">
          {kicker}
        </p>
      )}
      <h2 className="mt-4 font-montserrat text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-poai-text">
        {title}
      </h2>
      {sub && <p className="mt-5 text-poai-text-dim leading-relaxed text-lg">{sub}</p>}
    </motion.div>
  );
}
