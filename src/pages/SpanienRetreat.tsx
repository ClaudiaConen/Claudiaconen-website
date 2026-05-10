import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Sparkles,
  Users,
  Clock,
  CheckCircle2,
  Bot,
  Workflow,
  Globe2,
  Search,
  FileText,
  Magnet,
  MessageSquare,
  Code2,
  Layers,
  Target,
  Send,
  Heart,
  ArrowRight,
  ChevronDown,
  MapPin,
  Calendar,
  Coffee,
  Waves,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

const TOTAL_SEATS = 12;
const HOURS_PER_DAY = 5;
const DAYS = 6;
const PRICE_PER_HOUR = 27;
const TOTAL_PRICE = PRICE_PER_HOUR * HOURS_PER_DAY * DAYS;
const RETREAT_DATE_SHORT = '28.06. – 05.07.2026';
const RETREAT_DATE_LONG = '28. Juni bis 5. Juli 2026';

const learnTopics = [
  { icon: Target, title: 'Positionierung & Angebot', desc: 'Klar werden, wofür du stehst — und ein Angebot bauen, das wirklich verkauft.' },
  { icon: Sparkles, title: 'Claude verstehen & nutzen', desc: 'Den smartesten KI-Partner kennenlernen und produktiv im Alltag einsetzen.' },
  { icon: Code2, title: 'Claude Code für alle', desc: 'Auch ohne Programmierkenntnisse: Mit Claude Code Tools, Seiten und Automationen bauen.' },
  { icon: Bot, title: 'KI-Agenten bauen', desc: 'Eigene Agenten entwickeln, die Aufgaben für dich übernehmen — Tag und Nacht.' },
  { icon: Workflow, title: 'KI-Workflows & Tools', desc: 'Die richtigen Tools sinnvoll kombinieren, statt im Tool-Dschungel zu versinken.' },
  { icon: Globe2, title: 'KI-Landingpage bauen', desc: 'Eine Landingpage, die wirkt — entstanden mit dir, vor Ort, in einem Tag.' },
  { icon: Search, title: 'Bei Google gefunden werden', desc: 'Die SEO-Basics, die heute wirklich Reichweite bringen.' },
  { icon: FileText, title: 'Content sinnvoll erstellen', desc: 'Mit KI Content produzieren, der nach DIR klingt — und Wirkung zeigt.' },
  { icon: Magnet, title: 'Lead-Magnet bauen', desc: 'Ein digitales Geschenk, das deine Wunschkunden anzieht und Vertrauen aufbaut.' },
  { icon: MessageSquare, title: 'Prompts erstellen', desc: 'Die Sprache der KI sprechen — und Ergebnisse bekommen, die du nicht mehr nachpolieren musst.' },
  { icon: Layers, title: 'Claude Cowork Skills', desc: 'Skills nutzen und eigene bauen — dein persönlicher KI-Mitarbeiter.' },
  { icon: Heart, title: 'AHA-Erlebnisse garantiert', desc: 'Wir kreieren alles vor Ort und gemeinsam. Du schaust uns über die Schulter.' },
];

const weekPlan = [
  { day: 'Tag 1', title: 'Ankommen & Klarheit', desc: 'Kennenlernen, deine Position finden, dein Angebot schärfen — der Boden für die ganze Woche.' },
  { day: 'Tag 2', title: 'Claude & Claude Code Live', desc: 'Mit Claude umgehen lernen, erste Skills nutzen, Claude Code als Werkzeug entdecken.' },
  { day: 'Tag 3', title: 'KI-Agenten & Workflows', desc: 'Wir bauen gemeinsam einen Agenten, automatisieren Workflows, kombinieren Tools sinnvoll.' },
  { day: 'Tag 4', title: 'Deine KI-Landingpage', desc: 'Eine Landingpage entsteht vor deinen Augen — du baust mit, du verstehst jeden Schritt.' },
  { day: 'Tag 5', title: 'Sichtbarkeit & Content', desc: 'Bei Google gefunden werden, Content-Strategie mit KI, Lead-Magnet bauen.' },
  { day: 'Tag 6', title: 'Integration & nächste Schritte', desc: 'Alles zusammenführen, dein 30-Tage-Plan, gemeinsamer Abschluss in der Sonne.' },
];

const faqItems = [
  {
    q: 'Wann genau findet die Workshop-Woche statt?',
    a: `Vom ${RETREAT_DATE_LONG}. Anreisetag ist Sonntag, der 28. Juni; Abreisetag ist Sonntag, der 5. Juli. Dazwischen liegen 6 volle Tage Lernzeit (Mo–Sa) — gemeinsam mit Claudia & Gabi.`,
  },
  {
    q: 'Brauche ich KI-Vorkenntnisse?',
    a: 'Nein. Wir holen jede Teilnehmerin und jeden Teilnehmer dort ab, wo sie gerade stehen. Wichtig ist nur die Offenheit, Neues auszuprobieren.',
  },
  {
    q: 'Was ist im Preis enthalten?',
    a: 'Im Preis enthalten sind 6 Tage × 5 Stunden Lernzeit (insgesamt 30 Stunden) gemeinsam mit Claudia Conen & Gabi Lindemann. Anreise, Unterkunft und Verpflegung organisierst du selbst — das gibt dir maximale Freiheit beim Komfort und Budget.',
  },
  {
    q: 'Wie viele Stunden muss ich mindestens dabei sein?',
    a: 'Die Mindestteilnahme sind 4 Stunden pro Tag. Wir empfehlen aber dringend, alle 5 Stunden mitzumachen — denn jede Einheit baut auf der vorigen auf.',
  },
  {
    q: 'Was passiert nach den Lernstunden?',
    a: 'Danach ist Freizeit zur freien Verfügung. Pool, Strand, Siesta, gemeinsames Abendessen, ausschlafen — du entscheidest. Genau diese Mischung macht diese Woche aus.',
  },
  {
    q: 'Wo genau in Spanien findet die Workshop-Woche statt?',
    a: 'Den genauen Ort und das empfohlene Hotel verraten wir nach erfolgreicher Bewerbung. So bleibt die Gruppe übersichtlich und wir können alles persönlich abstimmen.',
  },
  {
    q: 'Wie viele Plätze gibt es?',
    a: 'Insgesamt nur 12 Plätze. Diese kleine Gruppengröße ist uns wichtig, damit jede:r ein echtes AHA-Erlebnis bekommt und persönlich begleitet wird.',
  },
  {
    q: 'Wie läuft die Anmeldung ab?',
    a: 'Über das Bewerbungsformular ganz unten. Wir melden uns persönlich bei dir, wir lernen uns kurz kennen — und entscheiden gemeinsam, ob es passt.',
  },
];

export default function SpanienRetreat() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seatBadge = useMemo(() => `Nur ${TOTAL_SEATS} Plätze · klein, fein, persönlich`, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      const composedMessage =
        `[SPANIEN-WORKSHOP-WOCHE BEWERBUNG]\n` +
        `Ziel: ${formData.goal || '—'}\n\n` +
        `Nachricht:\n${formData.message}`;
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: composedMessage,
        },
      ]);
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', goal: '', message: '' });
    } catch (err) {
      console.error('Spanien-Workshop-Woche form error:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('bewerbung')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#2A1F3D] font-inter antialiased selection:bg-[#E8B4C8] selection:text-[#2A1F3D]">
      <SEO
        title="KI-Workshop-Woche in Spanien — Umsetzung & Wachstum unter der spanischen Sonne | Claudia Conen"
        description="Eine KI-Workshop-Woche in Spanien mit Claudia Conen & Gabi Lindemann. 6 Tage × 5 Stunden Lernzeit, danach Freizeit. Nur 12 Plätze. Bewirb dich jetzt."
        noindex
      />
      <Navigation />

      {/* === HERO === */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
        {/* Soft gradient backdrop */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(1200px 600px at 20% 0%, rgba(244,194,215,0.45) 0%, transparent 60%),' +
                'radial-gradient(900px 500px at 90% 30%, rgba(212,175,55,0.30) 0%, transparent 60%),' +
                'linear-gradient(180deg, #FFFBF3 0%, #FBF7F0 60%, #F7E7CE 100%)',
            }}
          />
          {/* Sun image — soft hero photo */}
          <div className="absolute right-0 top-0 w-full md:w-2/3 h-full opacity-25 md:opacity-35 pointer-events-none">
            <img
              src="https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0] via-[#FBF7F0]/60 to-transparent" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-[#E8B4C8]/50 shadow-sm mb-6"
              >
                <Sun size={16} className="text-[#D4AF37]" />
                <span className="text-sm font-semibold text-[#2A1F3D]">KI-Workshop-Woche · Spanien · {RETREAT_DATE_SHORT} · {seatBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
              >
                <span className="text-[#2A1F3D]">Erlebe eine Woche </span>
                <span
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 50%, #C9A961 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  KI, Umsetzung &amp; Wachstum
                </span>
                <span className="text-[#2A1F3D]"> unter der spanischen Sonne.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 text-lg md:text-xl text-[#4A3F5C] max-w-2xl leading-relaxed"
              >
                Eine intensive Woche voller KI-Wissen, Praxis und echter AHA-Momente.{' '}
                <strong className="text-[#2A1F3D]">Gemeinsam lernen und wachsen</strong> — mit{' '}
                <strong className="text-[#2A1F3D]">Claudia Conen</strong> &amp;{' '}
                <strong className="text-[#2A1F3D]">Gabi Lindemann</strong>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm md:text-base tracking-wide shadow-[0_8px_24px_rgba(212,175,55,0.35)] hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(212,175,55,0.45)] transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 100%)',
                    color: '#2A1F3D',
                  }}
                >
                  <Send size={18} />
                  Jetzt bewerben
                </button>
                <a
                  href="#programm"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm md:text-base bg-white/80 backdrop-blur border border-[#D4AF37]/40 text-[#2A1F3D] hover:bg-white hover:border-[#D4AF37] transition-all duration-300"
                >
                  Mehr erfahren
                  <ArrowRight size={18} />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#4A3F5C]"
              >
                <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#C97AAF]" /> Spanien · genauer Ort nach Bewerbung</span>
                <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-[#D4AF37]" /> {RETREAT_DATE_SHORT} · 6 Lerntage</span>
                <span className="inline-flex items-center gap-2"><Clock size={16} className="text-[#C97AAF]" /> {HOURS_PER_DAY} h Lernzeit pro Tag</span>
                <span className="inline-flex items-center gap-2"><Users size={16} className="text-[#D4AF37]" /> max. {TOTAL_SEATS} Teilnehmer:innen</span>
              </motion.div>
            </div>

            {/* Hero card with price + seats */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-[#E8B4C8]/40 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.35)] p-8">
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8B4C8] text-[#2A1F3D] text-xs font-bold tracking-wider uppercase shadow">
                  Premiere Edition
                </div>

                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDE8F2] border border-[#C97AAF]/30">
                  <Calendar size={14} className="text-[#C97AAF]" />
                  <span className="text-xs font-bold text-[#C97AAF] tracking-wide">{RETREAT_DATE_SHORT}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={24} className="text-[#D4AF37] mt-1" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#C97AAF]">Investition</p>
                    <p className="font-montserrat text-4xl md:text-5xl font-black text-[#2A1F3D] mt-1">
                      {TOTAL_PRICE.toLocaleString('de-DE')} €
                    </p>
                    <p className="text-sm text-[#6B5F7A] mt-1">
                      pro Teilnehmer:in · {DAYS} Tage × {HOURS_PER_DAY} Std. Lernzeit · {PRICE_PER_HOUR} € / Std.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-[#2A1F3D]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>30 Stunden Lernzeit mit Claudia &amp; Gabi — live, praktisch, vor Ort</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Wir bauen alles gemeinsam — du schaust uns über die Schulter</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Mini-Gruppe von max. {TOTAL_SEATS} Menschen — persönliche Begleitung</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span>Nachmittage frei: Pool, Strand, Siesta, zusammenwachsen</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#FDE8F2] to-[#FBF1D8] border border-[#E8B4C8]/40">
                  <p className="text-xs uppercase tracking-wider text-[#C97AAF] font-bold mb-1">Wichtig</p>
                  <p className="text-sm text-[#4A3F5C]">
                    Anreise, Hotel und Verpflegung organisierst du selbst — das gibt dir Freiheit bei Komfort und Budget.
                  </p>
                </div>

                <button
                  onClick={scrollToForm}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold tracking-wide shadow-[0_8px_24px_rgba(212,175,55,0.35)] hover:translate-y-[-2px] transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 100%)',
                    color: '#2A1F3D',
                  }}
                >
                  Platz sichern <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === DIFFERENZIERUNG === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Kein Workshop. Echtes Bauen.</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D] leading-tight">
              Theorie kannst du überall hören.<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Bei uns wird umgesetzt.
              </span>
            </h2>
            <p className="mt-6 text-lg text-[#4A3F5C] leading-relaxed">
              Wir kreieren alles vor Ort und gemeinsam. Du schaust uns nicht nur über die Schulter —
              du machst mit, du verstehst jeden Schritt, du nimmst echte Ergebnisse mit nach Hause.
              Wir <strong className="text-[#2A1F3D]">lernen und wachsen miteinander</strong> — und genau das ist das Versprechen:{' '}
              <strong className="text-[#2A1F3D]">echte AHA-Erlebnisse</strong> statt Folien.
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: 'Live & gemeinsam', desc: 'Wir bauen jedes Beispiel vor deinen Augen — und mit dir.' },
              { icon: Users, title: 'Mini-Gruppe', desc: 'Nur 12 Plätze. Jede Frage findet ihre Antwort.' },
              { icon: Heart, title: 'AHA-Erlebnisse', desc: 'Du gehst nicht mit Notizen heim. Du gehst mit Klarheit heim.' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl bg-white border border-[#E8B4C8]/30 p-7 shadow-[0_10px_30px_-12px_rgba(212,175,55,0.25)] hover:shadow-[0_18px_42px_-12px_rgba(212,175,55,0.35)] hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2] flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-[#2A1F3D] mb-2">{p.title}</h3>
                  <p className="text-[#6B5F7A] leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WAS DU LERNST === */}
      <section id="programm" className="relative py-20 md:py-28 bg-gradient-to-b from-[#FBF7F0] via-[#F7E7CE]/40 to-[#FBF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Das Programm</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D] leading-tight">
              Was du in dieser Woche wirklich kannst.
            </h2>
            <p className="mt-5 text-lg text-[#4A3F5C]">
              12 Themen — und nach jedem Tag ist eines davon nicht mehr Theorie, sondern Teil deines Alltags.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {learnTopics.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="group rounded-2xl bg-white border border-[#E8B4C8]/25 p-6 hover:border-[#D4AF37]/60 hover:shadow-[0_18px_42px_-14px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2] group-hover:from-[#D4AF37]/30 group-hover:to-[#E8B4C8]/40 transition-colors">
                      <Icon size={20} className="text-[#D4AF37] group-hover:text-[#A8801F]" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-[#2A1F3D] text-lg leading-snug">{t.title}</h3>
                      <p className="mt-2 text-sm text-[#6B5F7A] leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WOCHENPLAN === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Der Wochenplan</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D] leading-tight">
              6 Tage. 30 Stunden Lernzeit.<br />
              <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Und jede Menge Spanien drumherum.
              </span>
            </h2>
            <p className="mt-5 text-lg text-[#4A3F5C]">
              Vormittags &amp; früher Nachmittag: 5 Stunden Lernzeit (Mindestteilnahme: 4 Stunden).
              Danach gehört der Tag dir.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {weekPlan.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl bg-white border border-[#E8B4C8]/30 p-7 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                       style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)' }}>
                    {i + 1}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C97AAF]">{d.day}</span>
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-[#2A1F3D] mb-2">{d.title}</h3>
                <p className="text-[#6B5F7A] leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Coffee, label: 'Lange Mittagspausen' },
              { icon: Waves, label: 'Pool, Strand & Siesta' },
              { icon: Heart, label: 'Gemeinsame Abende' },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-[#FDE8F2] to-[#FBF1D8] border border-[#E8B4C8]/30">
                  <Icon size={20} className="text-[#C97AAF]" />
                  <span className="font-semibold text-[#2A1F3D]">{b.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === GASTGEBERINNEN === */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#FBF7F0] to-[#FDE8F2]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Eure Gastgeberinnen</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D] leading-tight">
              Gemeinsam lernen, bauen und wachsen.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Claudia Conen',
                role: 'Marken- & Wirkungs-Mentorin · Speakerin',
                img: '/claudiaconen.jpg',
                tags: ['Positionierung', 'Content', 'KI als Marken-Verstärker'],
                bio: 'Claudia bringt 25+ Jahre Erfahrung als Stimme, Speakerin und Marken-Mentorin mit. In Spanien zeigt sie dir, wie du KI nutzt, um deiner Marke und deinem Angebot eine glasklare Bühne zu geben.',
              },
              {
                name: 'Gabi Lindemann',
                role: 'KI-Builderin · Claude Code Expertin',
                img: '/Claudia18.jpeg',
                tags: ['Claude & Claude Code', 'KI-Agenten', 'KI-Workflows'],
                bio: 'Gabi baut mit Claude Code Webseiten, Agenten und Workflows — auch ohne klassische Programmiererfahrung. Sie zeigt dir live, wie aus einer Idee in wenigen Stunden ein echtes Tool wird.',
              },
            ].map((host, i) => (
              <motion.div
                key={host.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-white border border-[#E8B4C8]/30 overflow-hidden shadow-[0_18px_42px_-18px_rgba(212,175,55,0.4)]"
              >
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2]">
                  <img src={host.img} alt={host.name} className="w-full h-full object-cover object-center" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-montserrat font-black text-2xl text-[#2A1F3D]">{host.name}</h3>
                  <p className="text-[#C97AAF] font-semibold mt-1">{host.role}</p>
                  <p className="mt-4 text-[#4A3F5C] leading-relaxed">{host.bio}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {host.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF1D8] text-[#A8801F] border border-[#D4AF37]/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FÜR WEN === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Für wen</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D] leading-tight">
              Ist diese Workshop-Woche für dich?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Du startest mit KI',
                desc: 'Du spürst, dass KI dein Business verändern wird — und willst endlich konkret werden, statt weiter Tutorials zu schauen.',
              },
              {
                title: 'Du nutzt KI schon — willst aber mehr',
                desc: 'ChatGPT war der Einstieg. Jetzt willst du Claude, Claude Code, Agenten und Workflows wirklich verstehen.',
              },
              {
                title: 'Du willst sichtbar werden',
                desc: 'Du willst eine eigene KI-Landingpage, einen Lead-Magnet, eine Content-Strategie — und Klarheit über deine Positionierung.',
              },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-7 border bg-white border-[#E8B4C8]/30 hover:border-[#D4AF37]/50 hover:-translate-y-1 transition-all shadow-sm hover:shadow-[0_18px_42px_-18px_rgba(212,175,55,0.4)]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2]">
                  <CheckCircle2 size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-[#2A1F3D] mb-3">{p.title}</h3>
                <p className="text-[#6B5F7A] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === INVESTITION === */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#FBF1D8] via-[#FBF7F0] to-[#FDE8F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#D4AF37]/30 p-8 md:p-14 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.4)]"
          >
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Deine Investition</p>
              <h2 className="font-montserrat font-black text-4xl md:text-6xl text-[#2A1F3D] leading-tight">
                <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {TOTAL_PRICE.toLocaleString('de-DE')} €
                </span>
                <span className="text-[#2A1F3D] block text-lg md:text-xl font-semibold mt-3">
                  pro Teilnehmer:in · für die Lernzeit
                </span>
              </h2>
              <p className="mt-4 text-[#4A3F5C]">
                Das ergibt sich aus <strong>{DAYS} Tagen × {HOURS_PER_DAY} Stunden × {PRICE_PER_HOUR} €</strong> — also 30 Stunden Live-Begleitung mit Claudia &amp; Gabi.
                Mindestteilnahme: 4 Stunden pro Tag.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-gradient-to-br from-[#FBF1D8] to-white p-6 border border-[#D4AF37]/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={20} className="text-[#D4AF37]" />
                  <h4 className="font-montserrat font-bold text-[#2A1F3D]">Im Preis enthalten</h4>
                </div>
                <ul className="space-y-2 text-sm text-[#4A3F5C]">
                  <li>· 30 Stunden Live-Lernzeit (6 × 5 h)</li>
                  <li>· Persönliche Begleitung in einer Mini-Gruppe</li>
                  <li>· Alle Materialien, Prompts &amp; Vorlagen</li>
                  <li>· Live-Bauen von Landingpage, Lead-Magnet, Agent &amp; Workflows</li>
                  <li>· Gemeinsame Abschluss-Session mit 30-Tage-Plan</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-[#FDE8F2] to-white p-6 border border-[#E8B4C8]/40">
                <div className="flex items-center gap-2 mb-3">
                  <Sun size={20} className="text-[#C97AAF]" />
                  <h4 className="font-montserrat font-bold text-[#2A1F3D]">Du organisierst selbst</h4>
                </div>
                <ul className="space-y-2 text-sm text-[#4A3F5C]">
                  <li>· Anreise nach Spanien</li>
                  <li>· Hotel / Unterkunft (wir geben Empfehlungen)</li>
                  <li>· Verpflegung &amp; Restaurants</li>
                  <li>· Eigenes Equipment (Laptop ist Pflicht)</li>
                </ul>
                <p className="mt-3 text-xs text-[#6B5F7A] italic">So bleibst du flexibel bei Komfort &amp; Budget.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FDE8F2] border border-[#C97AAF]/40 text-[#C97AAF] font-bold text-sm mb-5">
                <Sparkles size={16} /> Nur {TOTAL_SEATS} Plätze · klein, fein, persönlich
              </div>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold tracking-wide shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_rgba(212,175,55,0.55)] transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 100%)',
                  color: '#2A1F3D',
                }}
              >
                <Send size={18} />
                Jetzt Platz sichern
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">FAQ</p>
            <h2 className="font-montserrat font-black text-3xl md:text-5xl text-[#2A1F3D]">Häufige Fragen</h2>
          </motion.div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div key={item.q} className="rounded-2xl bg-white border border-[#E8B4C8]/30 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#FDE8F2]/30 transition-colors"
                >
                  <span className="font-montserrat font-bold text-[#2A1F3D]">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#D4AF37] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-[#4A3F5C] leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === BEWERBUNGSFORMULAR === */}
      <section
        id="bewerbung"
        className="relative py-20 md:py-28 bg-gradient-to-br from-[#FDE8F2] via-[#FBF7F0] to-[#FBF1D8]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Bewerbung</p>
              <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[#2A1F3D] leading-tight">
                Bewirb dich für deinen Platz.
              </h2>
              <p className="mt-5 text-lg text-[#4A3F5C] leading-relaxed">
                Wir vergeben die {TOTAL_SEATS} Plätze persönlich. Schreib uns kurz, wer du bist und was du dir
                von dieser Woche erhoffst. Wir melden uns innerhalb von 48 Stunden bei dir.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Du bekommst eine persönliche Antwort von uns — kein Auto-Reply.',
                  'Wir lernen uns in einem kurzen Gespräch kennen.',
                  'Erst dann fließt Geld — und nur, wenn es für beide Seiten passt.',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                    <span className="text-[#2A1F3D]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 rounded-2xl bg-white/70 backdrop-blur border border-[#E8B4C8]/40">
                <p className="text-sm text-[#6B5F7A]">
                  <strong className="text-[#2A1F3D]">Direkter Kontakt:</strong><br />
                  E-Mail: <a className="text-[#C97AAF] underline" href="mailto:info@claudiaconen-akademie.de">info@claudiaconen-akademie.de</a><br />
                  WhatsApp: <a className="text-[#C97AAF] underline" href="https://wa.me/4916093102073" target="_blank" rel="noopener noreferrer">+49 160 93102073</a>
                </p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white border border-[#D4AF37]/30 p-7 md:p-9 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.4)] space-y-5"
            >
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-[#FBF1D8] border border-[#D4AF37]/40 flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-[#A8801F] mt-0.5" />
                  <div>
                    <p className="font-bold text-[#2A1F3D]">Danke! Deine Bewerbung ist bei uns angekommen.</p>
                    <p className="text-sm text-[#6B5F7A] mt-1">Wir melden uns innerhalb von 48 Stunden bei dir.</p>
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
                  Etwas ist schiefgegangen. Bitte versuche es erneut oder schreib uns direkt.
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Dein Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  placeholder="Max Musterfrau"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">E-Mail *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="du@beispiel.de"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Telefon (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="+49 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Was ist dein Ziel? *</label>
                <select
                  name="goal"
                  required
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                >
                  <option value="">Bitte wählen ...</option>
                  <option value="Mit KI starten">Mit KI starten — endlich Klarheit gewinnen</option>
                  <option value="KI-Skills vertiefen">Meine KI-Skills vertiefen (Claude, Agenten, Workflows)</option>
                  <option value="Sichtbarkeit & Landingpage">Sichtbarkeit gewinnen — eigene KI-Landingpage</option>
                  <option value="Positionierung & Angebot">Positionierung &amp; Angebot schärfen</option>
                  <option value="Auszeit + Wachstum">Auszeit nehmen &amp; gleichzeitig wachsen</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Erzähl uns kurz von dir *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                  placeholder="Was machst du heute? Was würde sich für dich nach dieser Woche verändert haben?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold tracking-wide shadow-[0_12px_32px_rgba(212,175,55,0.4)] hover:translate-y-[-2px] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 100%)',
                  color: '#2A1F3D',
                }}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#2A1F3D]/30 border-t-[#2A1F3D] rounded-full animate-spin" />
                    Wird gesendet ...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Bewerbung absenden
                  </>
                )}
              </button>
              <p className="text-xs text-center text-[#6B5F7A]">
                Mit dem Absenden stimmst du unserer{' '}
                <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
