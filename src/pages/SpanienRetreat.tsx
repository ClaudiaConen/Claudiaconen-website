import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
const HOURS_PER_DAY = 6;
const DAYS = 5;
const PRICE_PER_HOUR = 33;
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

const LEARN_SLOT_MORNING = '09:00 – 13:00 Uhr';
const LEARN_SLOT_AFTERNOON = '16:00 – 18:00 Uhr';

const weekPlan = [
  { day: 'Mo · Tag 1', title: 'Ankommen, Klarheit & Positionierung', desc: 'Kennenlernen, deine Position finden, dein Angebot schärfen — der Boden für die ganze Woche.', type: 'learn' as const },
  { day: 'Di · Tag 2', title: 'Claude & Claude Code Live', desc: 'Mit Claude umgehen lernen, erste Skills nutzen, Claude Code als Werkzeug entdecken — auch ohne Programmiererfahrung.', type: 'learn' as const },
  { day: 'Mi · Tag 3', title: 'KI-Agenten & Workflows', desc: 'Wir bauen gemeinsam einen Agenten, automatisieren Workflows, kombinieren Tools sinnvoll.', type: 'learn' as const },
  { day: 'Do · Tag 4', title: 'Deine KI-Landingpage', desc: 'Eine Landingpage entsteht vor deinen Augen — du baust mit, du verstehst jeden Schritt.', type: 'learn' as const },
  { day: 'Fr · Tag 5', title: 'Content, Sichtbarkeit & 30-Tage-Plan', desc: 'Bei Google gefunden werden, Content-Strategie mit KI, Lead-Magnet bauen — und ein klarer Plan für die Wochen danach.', type: 'learn' as const },
  { day: 'Sa · Tag 6', title: 'Aktivitäten & Freizeit', desc: 'Auszeit zum Wochenausklang — frei zur individuellen Verfügung. Strand, Pool, Ausflug, Siesta, in Ruhe das Gelernte sacken lassen.', type: 'free' as const },
];

const faqItems = [
  {
    q: 'Wann genau findet die Workshop-Woche statt?',
    a: `Vom ${RETREAT_DATE_LONG}. Anreisetag ist Sonntag, der 28.06.2026 — komm in Ruhe an, lerne den Ort und die Gruppe kennen. Die Lerntage sind Montag bis Freitag (29.06. – 03.07.2026), Samstag (04.07.) ist Aktivitäten- und Freizeit-Tag. Abreisetag ist Sonntag, der 05.07.2026. An jedem Lerntag lernen wir von 09:00 – 13:00 Uhr und von 16:00 – 18:00 Uhr (6 Stunden) gemeinsam mit Claudia & Gabi.`,
  },
  {
    q: 'Brauche ich KI-Vorkenntnisse?',
    a: 'Nein. Wir holen jede Teilnehmerin und jeden Teilnehmer dort ab, wo sie gerade stehen. Wichtig ist nur die Offenheit, Neues auszuprobieren.',
  },
  {
    q: 'Was ist im Preis enthalten?',
    a: 'Im Preis enthalten sind 5 Lerntage × 6 Stunden Lernzeit (insgesamt 30 Stunden) gemeinsam mit Claudia Conen & Gabi Lindemann — plus 1 Aktivitäten-/Freizeit-Tag mittendrin. Alle Preise verstehen sich netto, zzgl. gesetzlicher MwSt. Anreise, Unterkunft und Verpflegung organisierst du selbst — das gibt dir maximale Freiheit beim Komfort und Budget.',
  },
  {
    q: 'Wie viele Stunden muss ich mindestens dabei sein?',
    a: 'An jedem Lerntag lernen wir von 09:00 – 13:00 Uhr und von 16:00 – 18:00 Uhr — insgesamt 6 Stunden. Die Mindestteilnahme sind 4 Stunden pro Lerntag. Wir empfehlen aber dringend, alle 6 Stunden mitzumachen — denn jede Einheit baut auf der vorigen auf.',
  },
  {
    q: 'Was passiert nach den Lernstunden?',
    a: 'Danach ist Freizeit zur freien Verfügung. Pool, Strand, Siesta, gemeinsames Abendessen, ausschlafen — du entscheidest. Dazu kommt 1 kompletter Aktivitäten-/Freizeit-Tag mittendrin in der Woche. Genau diese Mischung macht diese Woche aus.',
  },
  {
    q: 'Wo genau in Spanien findet die Workshop-Woche statt?',
    a: 'Den genauen Ort und das empfohlene Hotel verraten wir nach erfolgreicher Buchung. So bleibt die Gruppe übersichtlich und wir können alles persönlich abstimmen.',
  },
  {
    q: 'Wie viele Plätze gibt es?',
    a: 'Insgesamt nur 12 Plätze. Diese kleine Gruppengröße ist uns wichtig, damit jede:r ein echtes AHA-Erlebnis bekommt und persönlich begleitet wird.',
  },
  {
    q: 'Wie läuft die Buchung ab?',
    a: 'Über das Buchungsformular ganz unten auf der Seite. Du erhältst sofort eine Bestätigung per E-Mail. Innerhalb von 1–2 Werktagen schicken wir dir die Rechnung. Mit Zahlungseingang ist dein Platz endgültig gesichert.',
  },
];

export default function SpanienRetreat() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    firma: '',
    email: '',
    telefon: '',
    strasse: '',
    plz: '',
    ort: '',
    land: 'Deutschland',
    ustIdNr: '',
    nachricht: '',
    agbAccepted: false,
    privacyAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seatBadge = useMemo(() => `Nur ${TOTAL_SEATS} Plätze · klein, fein, persönlich`, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const fullName = `${formData.vorname} ${formData.nachname}`.trim();
    const messageBlocks = [
      `[SPANIEN-WORKSHOP-WOCHE VERBINDLICHE BUCHUNG]`,
      ``,
      `Rechnungsdaten:`,
      `${fullName}`,
      formData.firma ? formData.firma : null,
      `${formData.strasse}`,
      `${formData.plz} ${formData.ort}`,
      `${formData.land}`,
      formData.ustIdNr ? `USt-IdNr.: ${formData.ustIdNr}` : null,
      ``,
      `E-Mail: ${formData.email}`,
      formData.telefon ? `Telefon: ${formData.telefon}` : null,
      ``,
      `Gebuchte Leistung: KI-Workshop-Woche Spanien · 28.06. – 05.07.2026`,
      `Preis: ${TOTAL_PRICE.toLocaleString('de-DE')} € netto (zzgl. gesetzlicher MwSt.)`,
      `AGB akzeptiert: ja`,
      `Datenschutz akzeptiert: ja`,
      formData.nachricht ? `\nNachricht:\n${formData.nachricht}` : null,
    ].filter(Boolean).join('\n');

    try {
      // 1) In Datenbank speichern (immer — auch wenn die Mail-Function fehlschlägt)
      const { error: dbError } = await supabase.from('contact_inquiries').insert([
        {
          name: fullName,
          email: formData.email,
          phone: formData.telefon || null,
          message: messageBlocks,
        },
      ]);
      if (dbError) throw dbError;

      // 2) E-Mail-Benachrichtigung via Edge Function (an claudiaconen@umsatzstimme.de + Kunden-Bestätigung)
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
        await fetch(`${supabaseUrl}/functions/v1/send-spanien-booking-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            vorname: formData.vorname,
            nachname: formData.nachname,
            email: formData.email,
            telefon: formData.telefon || null,
            firma: formData.firma || null,
            strasse: formData.strasse,
            plz: formData.plz,
            ort: formData.ort,
            land: formData.land,
            ustIdNr: formData.ustIdNr || null,
            nachricht: formData.nachricht || null,
            totalPriceNetto: TOTAL_PRICE,
            agbAccepted: formData.agbAccepted,
            privacyAccepted: formData.privacyAccepted,
          }),
        });
      } catch (mailErr) {
        // Mail-Fehler dürfen den Buchungsfluss nicht blockieren — Daten sind in der DB.
        console.error('Mail-Notification fehlgeschlagen (Buchung gespeichert):', mailErr);
      }

      // 3) Zur Danke-Seite navigieren
      navigate('/spanien-ki-workshop/danke');
    } catch (err) {
      console.error('Spanien-Buchung Fehler:', err);
      setSubmitError('Etwas ist schiefgegangen beim Speichern deiner Buchung. Bitte versuche es noch einmal oder schreib uns direkt.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('buchung')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#2A1F3D] font-inter antialiased selection:bg-[#E8B4C8] selection:text-[#2A1F3D]">
      <SEO
        title="KI-Workshop-Woche in Spanien — Umsetzung & Wachstum unter der spanischen Sonne | Claudia Conen"
        description="Eine KI-Workshop-Woche in Spanien mit Claudia Conen & Gabi Lindemann. 5 Lerntage × 6 Stunden Lernzeit + 1 Aktivitäten-Tag. Nur 12 Plätze. Bewirb dich jetzt."
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
                  Jetzt verbindlich buchen
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
                <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#C97AAF]" /> Spanien · genauer Ort nach Buchung</span>
                <span className="inline-flex items-center gap-2"><Calendar size={16} className="text-[#D4AF37]" /> Anreise: So, 28.06. · Workshop-Start: Mo, 29.06.2026</span>
                <span className="inline-flex items-center gap-2"><Clock size={16} className="text-[#C97AAF]" /> Lernzeit: 9–13 &amp; 16–18 Uhr · Sa frei</span>
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

                <div className="mb-5 rounded-2xl bg-[#FDE8F2] border border-[#C97AAF]/30 px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-[#C97AAF]" />
                    <span className="text-xs font-bold text-[#C97AAF] tracking-wide uppercase">{RETREAT_DATE_SHORT}</span>
                  </div>
                  <ul className="space-y-1 text-[12px] text-[#4A3F5C] leading-snug">
                    <li><strong className="text-[#2A1F3D]">So, 28.06.2026</strong> · Anreisetag</li>
                    <li><strong className="text-[#2A1F3D]">Mo, 29.06.2026</strong> · Workshop-Beginn</li>
                    <li><strong className="text-[#2A1F3D]">So, 05.07.2026</strong> · Abreisetag</li>
                  </ul>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles size={24} className="text-[#D4AF37] mt-1" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#C97AAF]">Investition</p>
                    <p className="font-montserrat text-4xl md:text-5xl font-black text-[#2A1F3D] mt-1">
                      {TOTAL_PRICE.toLocaleString('de-DE')} €
                      <span className="text-sm font-semibold text-[#6B5F7A] ml-2">zzgl. MwSt.</span>
                    </p>
                    <p className="text-sm text-[#6B5F7A] mt-1">
                      pro Teilnehmer:in · {DAYS} Tage × {HOURS_PER_DAY} Std. Lernzeit · {PRICE_PER_HOUR} € / Std. netto
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
              Aus Theorie{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                wird Praxis.
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
              5 Lerntage. 1 Auszeit-Tag.<br />
              <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                30 Stunden Lernzeit — und jede Menge Spanien drumherum.
              </span>
            </h2>
            <p className="mt-5 text-lg text-[#4A3F5C]">
              An jedem Lerntag (Mo–Fr) lernen wir in zwei Slots: <strong className="text-[#2A1F3D]">{LEARN_SLOT_MORNING}</strong> und{' '}
              <strong className="text-[#2A1F3D]">{LEARN_SLOT_AFTERNOON}</strong> — insgesamt 6 Stunden Lernzeit pro Tag (Mindestteilnahme: 4 Stunden).
              Dazwischen ist Siesta. <strong className="text-[#2A1F3D]">Samstag</strong> ist komplett frei für Aktivitäten &amp; Freizeit.
            </p>

            <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm">
                <Clock size={18} className="text-[#D4AF37]" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#C97AAF]">Vormittags-Slot</div>
                  <div className="font-bold text-[#2A1F3D]">{LEARN_SLOT_MORNING}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm">
                <Clock size={18} className="text-[#D4AF37]" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#C97AAF]">Nachmittags-Slot</div>
                  <div className="font-bold text-[#2A1F3D]">{LEARN_SLOT_AFTERNOON}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {weekPlan.map((d, i) => {
              const isFree = d.type === 'free';
              return (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={
                    isFree
                      ? 'rounded-2xl bg-gradient-to-br from-[#FDE8F2] to-[#FBF1D8] border-2 border-dashed border-[#C97AAF]/50 p-7 shadow-sm hover:shadow-lg transition-all'
                      : 'rounded-2xl bg-white border border-[#E8B4C8]/30 p-7 shadow-sm hover:shadow-lg transition-all'
                  }
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                      style={{
                        background: isFree
                          ? 'linear-gradient(135deg, #C97AAF 0%, #E8B4C8 100%)'
                          : 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)',
                      }}
                    >
                      {isFree ? <Sun size={18} /> : i + 1}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C97AAF]">
                      {d.day}{isFree && ' · Auszeit'}
                    </span>
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl text-[#2A1F3D] mb-2">{d.title}</h3>
                  <p className="text-[#6B5F7A] leading-relaxed">{d.desc}</p>
                  {!isFree && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FBF1D8] border border-[#D4AF37]/30 text-[11px] font-bold text-[#A8801F]">
                        <Clock size={11} /> {LEARN_SLOT_MORNING}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FBF1D8] border border-[#D4AF37]/30 text-[11px] font-bold text-[#A8801F]">
                        <Clock size={11} /> {LEARN_SLOT_AFTERNOON}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
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
                <span className="block text-sm font-semibold text-[#C97AAF] mt-2">
                  Alle Preise verstehen sich netto · zzgl. gesetzlicher MwSt.
                </span>
              </h2>
              <p className="mt-4 text-[#4A3F5C]">
                Das ergibt sich aus <strong>{DAYS} Tagen × {HOURS_PER_DAY} Stunden × {PRICE_PER_HOUR} € netto</strong> — also 30 Stunden Live-Begleitung mit Claudia &amp; Gabi.
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
                  <li>· 30 Stunden Live-Lernzeit (5 Tage × 6 h)</li>
                  <li>· + 1 kompletter Aktivitäten- & Freizeit-Tag mittendrin</li>
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

      {/* === VERBINDLICHE BUCHUNG === */}
      <section
        id="buchung"
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
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-4">Buchung</p>
              <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[#2A1F3D] leading-tight">
                Hier verbindlich buchen.
              </h2>
              <p className="mt-5 text-lg text-[#4A3F5C] leading-relaxed">
                Sichere dir einen der nur {TOTAL_SEATS} Plätze. Mit dem Klick auf <em>„Verbindlich buchen"</em> kommt
                ein kostenpflichtiger Vertrag zustande. Du bekommst innerhalb von 1–2 Werktagen eine{' '}
                <strong className="text-[#2A1F3D]">Rechnung per E-Mail</strong> über {TOTAL_PRICE.toLocaleString('de-DE')} € netto (zzgl. MwSt.).
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Wir bestätigen deine Buchung sofort per E-Mail.',
                  'Du bekommst innerhalb von 1–2 Werktagen die Rechnung per E-Mail.',
                  'Mit Zahlungseingang ist dein Platz endgültig gesichert.',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                    <span className="text-[#2A1F3D]">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 rounded-2xl bg-white/70 backdrop-blur border border-[#E8B4C8]/40">
                <p className="text-sm text-[#6B5F7A]">
                  <strong className="text-[#2A1F3D]">Fragen vor der Buchung?</strong><br />
                  E-Mail: <a className="text-[#C97AAF] underline" href="mailto:claudiaconen@umsatzstimme.de">claudiaconen@umsatzstimme.de</a><br />
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
              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
                  {submitError}
                </div>
              )}

              <div className="rounded-2xl bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2] border border-[#D4AF37]/30 p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider font-bold text-[#C97AAF]">Gebuchte Leistung</p>
                <p className="font-montserrat font-bold text-[#2A1F3D] mt-1">KI-Workshop-Woche Spanien · 28.06. – 05.07.2026</p>
                <p className="text-2xl font-black text-[#2A1F3D] mt-2">
                  {TOTAL_PRICE.toLocaleString('de-DE')} €
                  <span className="text-sm font-semibold text-[#6B5F7A] ml-2">netto · zzgl. MwSt.</span>
                </p>
              </div>

              <p className="text-xs uppercase tracking-wider font-bold text-[#C97AAF]">Persönliche Daten</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Vorname *</label>
                  <input type="text" name="vorname" required value={formData.vorname} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="Max" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Nachname *</label>
                  <input type="text" name="nachname" required value={formData.nachname} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="Musterfrau" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">E-Mail *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="du@beispiel.de" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Telefon (optional)</label>
                  <input type="tel" name="telefon" value={formData.telefon} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="+49 ..." />
                </div>
              </div>

              <p className="text-xs uppercase tracking-wider font-bold text-[#C97AAF] pt-2">Rechnungsadresse</p>

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Firma (optional)</label>
                <input type="text" name="firma" value={formData.firma} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  placeholder="Musterfrau GmbH" />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Straße & Hausnummer *</label>
                <input type="text" name="strasse" required value={formData.strasse} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  placeholder="Musterstraße 12" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">PLZ *</label>
                  <input type="text" name="plz" required value={formData.plz} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="50667" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Ort *</label>
                  <input type="text" name="ort" required value={formData.ort} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="Köln" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Land *</label>
                  <input type="text" name="land" required value={formData.land} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="Deutschland" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2A1F3D] mb-2">USt-IdNr. (optional)</label>
                  <input type="text" name="ustIdNr" value={formData.ustIdNr} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="DE123456789" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2A1F3D] mb-2">Nachricht an uns (optional)</label>
                <textarea name="nachricht" rows={3} value={formData.nachricht} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4C8]/50 bg-[#FBF7F0]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                  placeholder="Allergien, besondere Wünsche, oder einfach 'Hallo!'" />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="privacyAccepted" required checked={formData.privacyAccepted} onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-[#E8B4C8] text-[#D4AF37] focus:ring-[#D4AF37]" />
                  <span className="text-sm text-[#4A3F5C] leading-relaxed">
                    Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#C97AAF] underline">Datenschutzerklärung</a> gelesen und akzeptiert. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agbAccepted" required checked={formData.agbAccepted} onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-[#E8B4C8] text-[#D4AF37] focus:ring-[#D4AF37]" />
                  <span className="text-sm text-[#4A3F5C] leading-relaxed">
                    Ich habe die <a href="/agb" target="_blank" rel="noopener noreferrer" className="text-[#C97AAF] underline">AGB</a> gelesen und akzeptiert. Mir ist bewusst, dass mit dem Absenden eine <strong>verbindliche, kostenpflichtige Buchung</strong> über {TOTAL_PRICE.toLocaleString('de-DE')} € netto (zzgl. MwSt.) zustande kommt. *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.agbAccepted || !formData.privacyAccepted}
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
                    Verbindlich buchen — {TOTAL_PRICE.toLocaleString('de-DE')} € netto
                  </>
                )}
              </button>
              <p className="text-xs text-center text-[#6B5F7A]">
                Du erhältst direkt eine Bestätigungs-E-Mail. Die Rechnung folgt innerhalb von 1–2 Werktagen.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
