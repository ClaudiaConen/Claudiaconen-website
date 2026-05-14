import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Send,
  Clock,
  Target,
  Globe2,
  Magnet,
  Video,
  Bot,
  Workflow,
  ChevronDown,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

type Tier = 'basis' | 'plus' | 'vip';

const TIER_PRICES: Record<Tier, number> = {
  basis: 497,
  plus: 697,
  vip: 997,
};

const TIER_LABELS: Record<Tier, string> = {
  basis: 'Basis',
  plus: 'Plus',
  vip: 'VIP',
};

const outcomes = [
  { num: '01 · Fundament', title: 'Klare Positionierung', desc: 'Zielgruppe, Botschaft, Storytelling, Markenwirkung — in einem Satz so präzise, dass dein Wunschkunde erkennt: Das bin ich.', icon: Target, ki: false },
  { num: '02 · Live', title: 'Sofort nutzbare KI-Landingpage', desc: 'Du nutzt sofort deine fertig erstellte, KI-generierte Landingpage — genau wie diese hier. Am Ende von Tag 2 online, mit Kontaktformular, anklickbar und teilbar.', icon: Globe2, ki: false, flag: 'Live · Diese Seite' },
  { num: '03 · Lead', title: 'Dein Freebie', desc: 'Checkliste, Mini-Guide oder Workbook — ein Leadmagnet, der echten Mehrwert liefert und automatisch Adressen sammelt.', icon: Magnet, ki: false },
  { num: '04 · Präsenz', title: 'Avatar- oder Intro-Video', desc: 'Begrüßung, Vorstellung, Call-to-Action — direkt in deine Landingpage integriert. Auch wenn du nicht vor der Kamera leben willst.', icon: Video, ki: false },
  { num: '05 · Stimme', title: 'Dein eigenes KI-GPT', desc: 'Ein KI-Assistent, der in deinem Stil schreibt. Schluss mit dem generischen ChatGPT-Tonfall, der alle gleich klingen lässt.', icon: Bot, ki: true },
  { num: '06 · System', title: 'Einfacher KI-Workflow', desc: 'Wiederverwendbar, klar, ohne Technik-Chaos. Du verstehst, wie alles zusammenspielt — und führst es selbst weiter.', icon: Workflow, ki: true },
];

const coaches = [
  {
    name: 'Claudia Conen',
    role: 'Performance Coach · Die Umsatzstimme',
    badge: 'Performance · Stimme',
    initials: 'CC',
    bio: 'Damit du wirkst, bevor das System überhaupt anfängt zu denken. 35 Jahre Erfahrung, 2.100+ Kunden, Voice-to-Brain®-Methodik. Co-Autorin „Brainset".',
    specialty: 'Positionierung · Storytelling · 180-ms-Wirkung',
    ki: false,
  },
  {
    name: 'Gabi Lindemann',
    role: 'Webseiten-Expertin mit KI',
    badge: 'Webseiten · KI',
    initials: 'GL',
    bio: 'Aus Konzept wird Page — live, sichtbar, deine. Gabi baut mit KI-Tools in Tagen, wofür Agenturen Monate brauchen. Pragmatisch, schnell, mit gutem Auge.',
    specialty: 'Landingpage-Konzept · Aufbau · Veröffentlichung',
    ki: false,
  },
  {
    name: 'Ann-Kathrin Andresen',
    role: 'Ingenieurin · HeyGen-Vermittlerin',
    badge: 'Engineering · HeyGen',
    initials: 'AKA',
    bio: 'Avatar-Videos, KI-Workflows, technische Klarheit. Ann übersetzt komplexe KI-Welt in deine Sprache — und sorgt dafür, dass nichts an der Technik scheitert.',
    specialty: 'Avatar-KI · HeyGen · KI-Workflow',
    ki: true,
  },
];

const dayOne = [
  { num: '01', title: 'Positionierung & Storytelling', duration: '2,5 Stunden', items: ['Wer bist du wirklich?', 'Für wen arbeitest du?', 'Welches Problem löst du?', 'Was macht dich einzigartig?', 'Deine Unverwechselbarkeit, Deine Stimme', 'Deine Markenbotschaft'], result: 'Eine klare Markenbotschaft und eine eindeutige Kommunikationsrichtung.', ki: false },
  { num: '02', title: 'KI richtig nutzen — als Abkürzung', duration: '2 Stunden', items: ['KI endlich wirklich verstehen & anwenden', 'KI nutzen statt von KI überfordert sein', 'Mit KI schneller zu besseren Ergebnissen', 'KI als Werkzeug statt als Verwirrung', 'Die Abkürzung zu mehr Klarheit, Content & Produktivität', 'KI praktisch nutzen — ohne Technikfrust', 'Wie du KI für dich arbeiten lässt', 'Von Chaos zu klaren Ergebnissen mit KI'], result: 'Du verstehst, wie du mit KI sprichst, damit sie für dich arbeitet — nicht umgekehrt.', ki: true },
  { num: '03', title: 'Landingpage-Konzept', duration: '2 Stunden', items: ['Farben mit emotionaler Wirkung', 'Stil und visuelle Richtung der Marke', 'Klaren Aufbau und visuelle Hierarchie', 'Sprachwirkung und Tonalität', 'Den optimalen Kommunikationsfluss', 'Erste visuelle Entwürfe und Ideen'], result: 'Eine klare Vision deiner Landingpage — bereit für die Umsetzung am nächsten Tag.', ki: false },
];

const dayTwo = [
  { num: '04', title: 'Landingpage-Erstellung', duration: '3 Stunden', items: ['Struktur & Aufbau', 'Visuelle Gestaltung', 'Effekte mit Bedacht', 'Textaufbau, der verkauft', 'Kontaktformular einbauen', 'Veröffentlichung live'], result: 'Deine Landingpage ist online — sichtbar, anklickbar, teilbar.', ki: false },
  { num: '05', title: 'Freebie / Leadmagnet', duration: '1,5 Stunden', items: ['Mehrwert definieren', 'Nutzen klar kommunizieren', 'Einfache PDF-Erstellung', 'Visuelle Aufbereitung'], result: 'Ein fertiges Freebie, das echten Mehrwert liefert.', ki: false },
  { num: '06', title: 'Avatar- / Intro-Video mit HeyGen', duration: '1,5 Stunden', items: ['Skript & Begrüßung', 'Positionierung im Video', 'Call-to-Action', 'Einbindung in die Page'], result: 'Dein persönliches Video — direkt in der Landingpage integriert.', ki: true },
  { num: '07', title: 'Dein eigener KI-Workflow', duration: '2 Stunden', items: ['Dein persönliches GPT', 'Einfache KI-Prozesse', 'Content-Unterstützung', 'Wiederverwendbarkeit'], result: 'Ein funktionierender Workflow, den du ab Montag selbstständig nutzt.', ki: true },
];

const audienceYes = [
  'als Coach, Berater, Dienstleister oder Selbstständige arbeitest',
  'eine Business-Idee oder Dienstleistung hast',
  'online sichtbarer werden willst — ohne austauschbar zu klingen',
  'bereit bist, zwei Tage aktiv mitzuarbeiten',
  'grundlegende Computerkenntnisse mitbringst',
  'endlich umsetzen willst, was du seit Monaten vor dir herschiebst',
];

const audienceNo = [
  'noch keine Business-Idee hast',
  'nicht aktiv mitarbeiten willst, sondern „berieselt" werden möchtest',
  'keine Grundkenntnisse am Computer hast',
  'eine komplette Webseiten-Entwicklung erwartest',
  'Code, komplexe Funnels oder Datenbanken lernen willst',
];

const tools = [
  { name: 'Claude', role: 'Sprache & Klarheit', ki: true },
  { name: 'ChatGPT', role: 'Eigenes KI-GPT', ki: true },
  { name: 'Canva', role: 'Design & Freebie', ki: false },
  { name: 'HeyGen', role: 'Avatar-Video', ki: true },
  { name: 'YouTube', role: 'Video-Hosting', ki: false },
  { name: '+ Helfer', role: 'Nach Bedarf', ki: false },
];

const checklist = ['Laptop', 'Funktionierende E-Mail-Adresse', 'Zugang zu Claude & ChatGPT', 'HeyGen-Zugang', 'YouTube-Kanal', '2–3 eigene Fotos', 'Stabile Internetverbindung'];

const tiers: Array<{ id: Tier; name: string; desc: string; features: string[]; featured?: boolean }> = [
  {
    id: 'basis',
    name: 'Basis',
    desc: 'Fokussiert mitarbeiten. Fertiges Ergebnis mitnehmen.',
    features: ['2 Tage Live-Workshop', 'Zoom-Vorbereitungscall', 'Alle 7 Module', 'Arbeitsunterlagen', 'Fotos mit allen 3 Expertinnen — für deine Social Media'],
  },
  {
    id: 'plus',
    name: 'Plus',
    desc: 'Mit persönlichem 1:1-Vorgespräch & Social-Media-Interview.',
    features: ['Alles aus Basis', '1:1 Feedback im Workshop', '1:1 Call zur Vorbereitung', '1:1 Interview für deine Social Media'],
    featured: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    desc: 'Persönliche Begleitung vom Pre-Call bis zum Follow-up.',
    features: ['Alles aus Plus', 'Premium-Location', '1:1 Pre- & Post-Call', 'Individuelle KI-Setup-Hilfe', 'Begrenzte Plätze'],
  },
];

const faqs = [
  { q: 'Ich bin technisch nicht so versiert. Komme ich mit?', a: 'Ja — wenn du grundlegende Computerkenntnisse hast (E-Mails, Browser, Dateien). Im Vorbereitungs-Call eine Woche vor dem Workshop richten wir gemeinsam alle Zugänge ein, sodass du am ersten Tag startklar bist. Ann-Kathrin als Ingenieurin sorgt während des Workshops dafür, dass nichts an der Technik scheitert.' },
  { q: 'Welche Kosten kommen außer dem Workshop-Preis dazu?', a: 'Mögliche Zusatzkosten betreffen die KI-Tools selbst — etwa ein ChatGPT-Plus-Account oder HeyGen für Avatar-Videos. Wir kommunizieren das vor der Anmeldung transparent, sodass du keine Überraschungen erlebst. Vieles funktioniert auch mit kostenlosen Versionen.' },
  { q: 'Bekomme ich am Ende wirklich eine fertige Landingpage?', a: 'Ja. Das ist der ganze Punkt. Wir verlassen den zweiten Tag nicht, bevor deine Page online und teilbar ist. Keine offenen Baustellen, kein „mach ich noch zuhause fertig" — das ist das Versprechen.' },
  { q: 'Was, wenn ich noch keine ganz klare Positionierung habe?', a: 'Perfekt — dann bist du genau richtig. Modul 1 an Tag 1 ist exakt dafür da, und Claudias Spezialgebiet seit über drei Jahrzehnten. Voraussetzung ist nur, dass du eine Business-Idee oder Dienstleistung hast. Den Rest schärfen wir gemeinsam.' },
  { q: 'Warum drei Coaches?', a: 'Weil es drei unterschiedliche Disziplinen sind: Positionierung & Stimme (Claudia), Webseiten-Bau mit KI (Gabi), Engineering & Avatar-Technik (Ann-Kathrin). In klassischen Workshops fehlt immer mindestens eines davon. Hier sind alle drei im Raum — und du profitierst direkt.' },
  { q: 'Ist der Workshop barrierefrei?', a: 'Wir arbeiten daran. Die Räumlichkeiten und Materialien werden so gewählt und aufbereitet, dass möglichst viele Menschen teilnehmen können. Wenn du konkrete Anforderungen hast (Hör- oder Seheinschränkungen, motorische Themen, sensorische Reizempfindlichkeit), melde dich bitte vorab — wir richten ein, was möglich ist.' },
  { q: 'Was lerne ich nicht?', a: 'Wir bauen bewusst kein komplettes Funnel-System, keine komplexen Automatisierungen, keine Datenbanken und kein Coding. Diese Themen gehören in Fortgeschrittenen-Programme. Hier geht es um den sichtbaren, sofort nutzbaren ersten Schritt.' },
];

export default function KIWorkshopUnverwechselbar() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState<Tier>('plus');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const tierPrice = TIER_PRICES[selectedTier];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const scrollToForm = (tier?: Tier) => {
    if (tier) setSelectedTier(tier);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const fullName = `${formData.vorname} ${formData.nachname}`.trim();
    const messageBlocks = [
      `[KI-WORKSHOP UNVERWECHSELBAR — VERBINDLICHE BUCHUNG]`,
      ``,
      `Tier: ${TIER_LABELS[selectedTier]} — ${tierPrice.toLocaleString('de-DE')} € netto (zzgl. MwSt.)`,
      ``,
      `Rechnungsdaten:`,
      fullName,
      formData.firma || null,
      formData.strasse,
      `${formData.plz} ${formData.ort}`,
      formData.land,
      formData.ustIdNr ? `USt-IdNr.: ${formData.ustIdNr}` : null,
      ``,
      `E-Mail: ${formData.email}`,
      formData.telefon ? `Telefon: ${formData.telefon}` : null,
      ``,
      `AGB: ja · Datenschutz: ja`,
      formData.nachricht ? `\nNachricht:\n${formData.nachricht}` : null,
    ].filter(Boolean).join('\n');

    try {
      const { error: dbError } = await supabase.from('contact_inquiries').insert([{
        name: fullName,
        email: formData.email,
        phone: formData.telefon || null,
        message: messageBlocks,
      }]);
      if (dbError) throw dbError;

      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
        await fetch(`${supabaseUrl}/functions/v1/send-ki-workshop-booking-notification`, {
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
            tier: selectedTier,
            tierPriceNetto: tierPrice,
            agbAccepted: formData.agbAccepted,
            privacyAccepted: formData.privacyAccepted,
          }),
        });
      } catch (mailErr) {
        console.error('Mail-Notification fehlgeschlagen (Buchung gespeichert):', mailErr);
      }

      navigate('/ki-workshop-unverwechselbar/danke', {
        state: { vorname: formData.vorname, tier: selectedTier, tierPriceNetto: tierPrice },
      });
    } catch (err) {
      console.error('KI-Workshop Buchung Fehler:', err);
      setSubmitError('Etwas ist schiefgegangen beim Speichern deiner Buchung. Bitte versuche es noch einmal oder schreib uns direkt.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1428] text-[#FDFCFA] font-inter antialiased selection:bg-[#FF3FA1] selection:text-[#FDFCFA]">
      <SEO
        title="KI-Workshop · Die Unverwechselbaren — Sichtbar werden im KI-Zeitalter | Claudia Conen"
        description="In zwei Tagen zu klarer Positionierung, fertiger Landingpage und einem KI-System in deiner Sprache. Mit Claudia Conen, Gabi Lindemann und Ann-Kathrin Andresen."
      />
      <Navigation />

      {/* === HERO === */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 600px at 15% 20%, rgba(255,206,61,0.18) 0%, transparent 60%),' +
                'radial-gradient(700px 500px at 85% 30%, rgba(255,63,161,0.18) 0%, transparent 60%),' +
                'radial-gradient(800px 600px at 50% 90%, rgba(183,148,244,0.10) 0%, transparent 60%),' +
                'linear-gradient(180deg, #0A1428 0%, #131D3B 100%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF3FA1] animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-white/90">Premium-Workshop · 3 Coaches · 2 Tage live</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-medium leading-[1.05] tracking-tight"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                Sichtbar werden.<br />
                <em style={{ fontStyle: 'italic', color: '#FFE066' }}>Ohne</em> in der<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  KI-Masse
                </span> zu verschwinden.
              </motion.h1>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-lg text-white/80 leading-relaxed"
                >
                  In <strong>zwei Tagen</strong> baust du das, wofür andere Agenturen bezahlen: eine{' '}
                  <em style={{ fontStyle: 'italic', color: '#FFE066' }}>klare Positionierung</em>, eine{' '}
                  <em style={{ fontStyle: 'italic', color: '#FFE066' }}>fertige Landingpage</em> und ein{' '}
                  <em style={{ fontStyle: 'italic', color: '#FF6BB8' }}>KI-System in deiner Sprache</em> — begleitet von drei Expertinnen mit jeweils eigenem Spezialgebiet.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="space-y-3"
                >
                  {[
                    { label: 'Format', value: '2 Tage · live & klein' },
                    { label: 'Begleitet von', value: '3 Expertinnen' },
                    { label: 'Du gehst nach Hause mit', value: 'Einer fertigen Präsenz', highlight: true },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
                      <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">{m.label}</span>
                      <span className={`text-sm font-bold ${m.highlight ? 'text-[#FF6BB8]' : 'text-white'}`}>{m.value}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm md:text-base tracking-wide shadow-[0_8px_24px_rgba(255,206,61,0.35)] hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(255,63,161,0.5)] transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)',
                    color: '#0A1428',
                  }}
                >
                  Jetzt Platz sichern
                  <ArrowRight size={18} />
                </button>
                <a
                  href="#programm"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm md:text-base bg-white/5 backdrop-blur border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  Programm ansehen
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_30px_80px_-20px_rgba(255,63,161,0.3)]">
                <div
                  className="relative aspect-video flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #131D3B 0%, #1E2A52 100%)',
                  }}
                >
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3FA1] animate-pulse" /> Trailer · 90 Sek.
                  </span>
                  <button
                    type="button"
                    aria-label="Workshop-Trailer abspielen"
                    onClick={() => alert('Workshop-Trailer kommt bald! 🎬')}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-[0_8px_24px_rgba(255,63,161,0.5)]"
                    style={{ background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)', color: '#0A1428' }}
                  >
                    <Play size={22} fill="currentColor" />
                  </button>
                </div>
                <div className="p-5 border-t border-white/10">
                  <div className="font-bold text-white">Was in 2 Tagen entsteht</div>
                  <div className="text-sm text-white/60 mt-0.5">3 Coaches · 1 fertige Präsenz</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === MARQUEE === */}
      <div className="relative overflow-hidden py-4 border-y border-white/10 bg-gradient-to-r from-[#0A1428] via-[#131D3B] to-[#0A1428]">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-sm font-semibold tracking-wider uppercase text-white/60">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12 items-center">
              <span>Positionierung</span><span className="w-1 h-1 rounded-full bg-[#FFCE3D]" />
              <span>Landingpage</span><span className="w-1 h-1 rounded-full bg-[#FFCE3D]" />
              <span>Freebie</span><span className="w-1 h-1 rounded-full bg-[#FF3FA1]" />
              <span className="text-[#FF6BB8]">Eigenes KI-GPT</span><span className="w-1 h-1 rounded-full bg-[#FF3FA1]" />
              <span>Avatar-Video</span><span className="w-1 h-1 rounded-full bg-[#FFCE3D]" />
              <span>KI-Workflow</span><span className="w-1 h-1 rounded-full bg-[#FF3FA1]" />
              <span>Storytelling</span><span className="w-1 h-1 rounded-full bg-[#FFCE3D]" />
            </div>
          ))}
        </div>
      </div>

      {/* === PROMISE === */}
      <section className="relative py-20 md:py-28 bg-[#FFF1D3] text-[#0A1428]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#E5A500] mb-5">Das Versprechen</div>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 text-4xl md:text-5xl font-medium leading-[1.1]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              Du gehst nicht mit <em style={{ fontStyle: 'italic' }}>Notizen</em> nach Hause. Du gehst mit einem{' '}
              <span style={{ background: 'linear-gradient(135deg, #E91E63 0%, #FF3FA1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                fertigen System
              </span>.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 text-lg text-[#0A1428]/80 space-y-4"
            >
              <p>Die meisten <span className="text-[#E91E63] font-semibold">KI-Workshops</span> sind <strong>Tool-Paraden</strong>. Du lernst zehn Plattformen kennen und setzt am Ende keine davon ein. Wir machen das Gegenteil.</p>
              <p>An Tag 1 entsteht deine <strong>Klarheit</strong>. An Tag 2 entsteht dein <strong>sichtbares Ergebnis</strong>. Keine offenen Baustellen. Kein „mache ich dann zuhause". Du gehst mit etwas raus, das online und benutzbar ist.</p>
              <p className="pt-2 italic text-[#E5A500] font-medium">
                Echt. Persönlich. Authentisch. <span className="text-[#0A1428]/70 not-italic">Statt perfekt auf Mausklick.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === OUTCOMES === */}
      <section id="ergebnisse" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFCE3D] mb-4">Was am Ende fertig ist</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Sechs Bausteine.<br />
              Eine <em style={{ fontStyle: 'italic', color: '#FFE066' }}>komplette</em> Präsenz.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {outcomes.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.article
                  key={o.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                    o.ki
                      ? 'bg-gradient-to-br from-[#FF3FA1]/10 to-[#FF3FA1]/5 border-[#FF3FA1]/30 hover:border-[#FF3FA1]/60'
                      : 'bg-white/5 backdrop-blur border-white/10 hover:border-[#FFCE3D]/40'
                  }`}
                >
                  {o.flag && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#FFCE3D]/20 border border-[#FFCE3D]/40 text-[10px] font-bold uppercase tracking-wider text-[#FFE066]">
                      {o.flag}
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: o.ki ? 'linear-gradient(135deg, #FF3FA1 0%, #E91E63 100%)' : 'linear-gradient(135deg, #FFCE3D 0%, #E5A500 100%)' }}>
                    <Icon size={20} className="text-[#0A1428]" />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-white/40 mb-2">{o.num}</div>
                  <h3 className="font-cormorant text-2xl font-medium mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{o.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{o.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* === COACHES === */}
      <section id="coaches" className="relative py-20 md:py-28 bg-gradient-to-b from-[#0A1428] to-[#131D3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFCE3D] mb-4">Drei Coaches · Ein Workshop</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Drei <em style={{ fontStyle: 'italic', color: '#FFE066' }}>Frauen</em>.<br />
              Drei Spezialgebiete.<br />
              Ein <span style={{ background: 'linear-gradient(135deg, #FF3FA1 0%, #FFCE3D 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>fertiges Ergebnis</span>.
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Du bekommst nicht eine, sondern <strong>drei Perspektiven</strong>:{' '}
              <span className="text-[#FFE066]">Performance & Stimme</span>,{' '}
              <span className="text-[#FFE066]">Webseiten mit KI</span> und{' '}
              <span className="text-[#FF6BB8]">Engineering & Avatar-Technik</span>. So entsteht in zwei Tagen, was keine Einzelperson allein liefern könnte.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {coaches.map((c, i) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl border overflow-hidden transition-all hover:-translate-y-1 ${
                  c.ki
                    ? 'bg-gradient-to-br from-[#FF3FA1]/10 to-[#FF3FA1]/5 border-[#FF3FA1]/30 hover:shadow-[0_30px_80px_-20px_rgba(255,63,161,0.5)]'
                    : 'bg-white/5 backdrop-blur border-white/10 hover:shadow-[0_30px_80px_-20px_rgba(255,206,61,0.3)]'
                }`}
              >
                <div className="relative aspect-square flex items-center justify-center"
                  style={{
                    background: c.ki
                      ? 'linear-gradient(135deg, #131D3B 0%, #2A1230 50%, #1E2A52 100%)'
                      : 'linear-gradient(135deg, #131D3B 0%, #1E2A52 100%)',
                  }}>
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white/90">
                    {c.badge}
                  </span>
                  <span
                    className="text-6xl md:text-7xl font-black"
                    style={{
                      background: c.ki
                        ? 'linear-gradient(135deg, #FF6BB8 0%, #FF3FA1 100%)'
                        : 'linear-gradient(135deg, #FFE066 0%, #E5A500 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {c.initials}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-2xl font-semibold mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{c.name}</h3>
                  <div className={`text-sm font-semibold mb-3 ${c.ki ? 'text-[#FF6BB8]' : 'text-[#FFE066]'}`}>{c.role}</div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{c.bio}</p>
                  <div className="text-xs uppercase tracking-wider font-bold text-white/50 pt-3 border-t border-white/10">
                    {c.specialty}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === CURRICULUM === */}
      <section id="programm" className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFCE3D] mb-4">Das Programm</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Zwei Tage.<br />
              Sieben <em style={{ fontStyle: 'italic', color: '#FFE066' }}>Module</em>.<br />
              Ein fertiges Ergebnis.
            </h2>
          </motion.div>

          {[
            { tag: 'Tag 1', name: 'Klarheit & Konzept', italic: 'Klarheit', modules: dayOne },
            { tag: 'Tag 2', name: 'Umsetzung & Sichtbarkeit', italic: 'Umsetzung', mag: 'Sichtbarkeit', modules: dayTwo },
          ].map((day) => (
            <div key={day.tag} className="mb-16 last:mb-0">
              <div className="flex items-baseline gap-6 mb-8 pb-5 border-b border-white/10">
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFCE3D] to-[#FF3FA1] text-[#0A1428] font-black text-sm tracking-wider uppercase shadow-[0_4px_12px_rgba(255,63,161,0.3)]">
                  {day.tag}
                </div>
                <div className="font-cormorant text-2xl md:text-3xl font-medium" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                  <em style={{ fontStyle: 'italic', color: '#FFE066' }}>{day.italic}</em>
                  {day.mag ? <> & <span style={{ background: 'linear-gradient(135deg, #FF3FA1 0%, #FF6BB8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{day.mag}</span></> : <> & Konzept</>}
                </div>
              </div>

              <div className="space-y-4">
                {day.modules.map((m, i) => (
                  <motion.article
                    key={m.num}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`rounded-2xl p-6 md:p-7 border ${
                      m.ki
                        ? 'bg-gradient-to-br from-[#FF3FA1]/10 to-[#FF3FA1]/5 border-[#FF3FA1]/30'
                        : 'bg-white/5 backdrop-blur border-white/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-4 mb-4">
                      <span
                        className="font-black text-3xl"
                        style={{
                          background: m.ki ? 'linear-gradient(135deg, #FF6BB8 0%, #FF3FA1 100%)' : 'linear-gradient(135deg, #FFE066 0%, #FFCE3D 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.num}
                      </span>
                      <h3 className="font-cormorant text-2xl font-medium flex-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{m.title}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/60 font-semibold">
                        <Clock size={13} /> {m.duration}
                      </span>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/70 mb-5">
                      {m.items.map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.ki ? 'bg-[#FF6BB8]' : 'bg-[#FFCE3D]'}`} />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`text-sm font-semibold pt-4 border-t border-white/10 ${m.ki ? 'text-[#FF6BB8]' : 'text-[#FFE066]'}`}>
                      → {m.result}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === AUDIENCE === */}
      <section className="relative py-20 md:py-28 bg-[#FFF1D3] text-[#0A1428]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#E5A500] mb-4">Für wen — und für wen nicht</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Ehrliche Antwort:<br />
              Nicht für <em style={{ fontStyle: 'italic' }}>jeden</em>.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white border-2 border-[#E5A500]/30 p-8 shadow-[0_12px_30px_rgba(229,165,0,0.15)]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#FFE066] to-[#E5A500] text-[#0A1428] font-black text-xl mb-5">
                Ja.
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Dieser Workshop ist für dich, wenn du …</h3>
              <ul className="space-y-3 text-[#0A1428]/80">
                {audienceYes.map((y) => (
                  <li key={y} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#E5A500] mt-0.5 flex-shrink-0" />
                    <span>{y}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white border-2 border-[#E91E63]/30 p-8 shadow-[0_12px_30px_rgba(233,30,99,0.12)]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#FF6BB8] to-[#E91E63] text-white font-black text-xl mb-5">
                Nein.
              </div>
              <h3 className="font-cormorant text-2xl font-semibold mb-5" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Lass es lieber, wenn du …</h3>
              <ul className="space-y-3 text-[#0A1428]/80">
                {audienceNo.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <XCircle size={18} className="text-[#E91E63] mt-0.5 flex-shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === TOOLS === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FF6BB8] mb-4">
              Transparenz · <span className="text-[#FF3FA1]">KI-Tools</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Womit wir arbeiten.<br />
              Und was du <span style={{ background: 'linear-gradient(135deg, #FF3FA1 0%, #FF6BB8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>brauchst</span>.
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Wir verstecken nichts. Hier sind die <span className="text-[#FF6BB8]">KI-Tools</span>, mit denen wir an beiden Tagen arbeiten. Manche kostenlos, manche kostenpflichtig — wir sagen dir vorab genau, was nötig ist.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
            {tools.map((t) => (
              <div
                key={t.name}
                className={`rounded-xl p-4 text-center border ${
                  t.ki ? 'bg-gradient-to-br from-[#FF3FA1]/10 to-[#FF3FA1]/5 border-[#FF3FA1]/30' : 'bg-white/5 backdrop-blur border-white/10'
                }`}
              >
                <div className={`font-bold text-lg ${t.ki ? 'text-[#FF6BB8]' : 'text-[#FFE066]'}`}>{t.name}</div>
                <div className="text-xs text-white/60 mt-1">{t.role}</div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-7">
            <div className="font-bold text-[#FFE066] mb-4">Das brauchst du:</div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80">
              {checklist.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#FFCE3D] mt-0.5 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-white/50 mt-5 pt-4 border-t border-white/10">
              Mögliche Tool-Kosten kommunizieren wir transparent vor der Anmeldung.
            </p>
          </div>
        </div>
      </section>

      {/* === PRICING === */}
      <section id="anmelden" className="relative py-20 md:py-28 bg-[#FFF1D3] text-[#0A1428]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#E5A500] mb-4">Anmeldung</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-5" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Drei Wege rein.<br />
              Ein <em style={{ fontStyle: 'italic' }}>fertiges Ergebnis</em>.
            </h2>
            <p className="text-lg text-[#0A1428]/80 max-w-3xl mx-auto">
              Vor jedem Workshop bekommst du <strong>einen kostenlosen Zoom-Vorbereitungscall</strong>. Während der zwei Tage sind{' '}
              <strong>Fotos mit allen drei Expertinnen erlaubt</strong> — für deine eigene Social-Media-Nutzung.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 border-2 transition-all hover:-translate-y-1 ${
                  t.featured
                    ? 'bg-gradient-to-br from-[#0A1428] to-[#131D3B] text-white border-[#E5A500] shadow-[0_30px_80px_-20px_rgba(229,165,0,0.5)]'
                    : 'bg-white border-[#E5A500]/30 shadow-[0_12px_30px_rgba(229,165,0,0.12)]'
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFCE3D] to-[#FF3FA1] text-[#0A1428] text-xs font-black uppercase tracking-wider shadow-lg">
                    Empfohlen
                  </div>
                )}
                <div className={`text-xs uppercase tracking-wider font-bold mb-2 ${t.featured ? 'text-[#FFE066]' : 'text-[#E5A500]'}`}>{t.name}</div>
                <p className={`text-sm mb-5 ${t.featured ? 'text-white/70' : 'text-[#0A1428]/70'}`}>{t.desc}</p>
                <div className="font-black text-5xl mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 600 }}>
                  {TIER_PRICES[t.id]}
                  <span className="text-2xl ml-1">€</span>
                </div>
                <div className={`text-xs mb-6 ${t.featured ? 'text-white/60' : 'text-[#0A1428]/60'}`}>
                  zzgl. MwSt. · pro Person
                </div>
                <ul className="space-y-2 mb-7">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className={`${t.featured ? 'text-[#FFE066]' : 'text-[#E5A500]'} mt-0.5 flex-shrink-0`} />
                      <span className={t.featured ? 'text-white/85' : 'text-[#0A1428]/85'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToForm(t.id)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all hover:translate-y-[-2px] ${
                    t.featured
                      ? 'bg-gradient-to-r from-[#FFCE3D] to-[#FF3FA1] text-[#0A1428] shadow-[0_8px_24px_rgba(255,206,61,0.35)]'
                      : 'bg-[#0A1428] text-white hover:bg-[#131D3B]'
                  }`}
                >
                  Platz sichern <ArrowRight size={16} />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FFCE3D] mb-4">Häufige Fragen</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Du bist <em style={{ fontStyle: 'italic', color: '#FFE066' }}>nicht der Erste</em>,<br />
              der das fragt.
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={item.q} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-cormorant text-lg font-semibold" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{item.q}</span>
                  <ChevronDown size={20} className={`text-[#FFCE3D] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/75 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === BUCHUNGS-FORMULAR === */}
      <section
        ref={formRef}
        id="buchung"
        className="relative py-20 md:py-28 bg-gradient-to-br from-[#0A1428] via-[#131D3B] to-[#0A1428]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#FF6BB8] mb-4">Buchung</div>
              <h2 className="text-4xl md:text-5xl font-medium leading-tight" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                Hier verbindlich buchen.
              </h2>
              <p className="mt-5 text-lg text-white/70 leading-relaxed">
                Sichere dir deinen Platz im KI-Workshop. Mit dem Klick auf <em>„Verbindlich buchen"</em> kommt
                ein kostenpflichtiger Vertrag zustande. Du bekommst innerhalb von 1–2 Werktagen eine{' '}
                <strong className="text-white">Rechnung per E-Mail</strong>.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  'Wir bestätigen deine Buchung sofort per E-Mail.',
                  'Du bekommst innerhalb von 1–2 Werktagen die Rechnung per E-Mail.',
                  'Mit Zahlungseingang ist dein Platz endgültig gesichert.',
                  'Vor dem Workshop: kostenloser Zoom-Vorbereitungs-Call.',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#FFCE3D] mt-1 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                <p className="text-sm text-white/70">
                  <strong className="text-white">Fragen vor der Buchung?</strong><br />
                  E-Mail: <a className="text-[#FF6BB8] underline" href="mailto:claudiaconen@umsatzstimme.de">claudiaconen@umsatzstimme.de</a><br />
                  WhatsApp: <a className="text-[#FF6BB8] underline" href="https://wa.me/4916093102073" target="_blank" rel="noopener noreferrer">+49 160 93102073</a>
                </p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 p-7 md:p-9 shadow-[0_30px_80px_-20px_rgba(255,63,161,0.3)] space-y-5"
            >
              {submitError && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-100 text-sm">
                  {submitError}
                </div>
              )}

              {/* Tier-Auswahl */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#FF6BB8] mb-3">Dein Tier *</label>
                <div className="grid grid-cols-3 gap-2">
                  {tiers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTier(t.id)}
                      className={`px-3 py-3 rounded-xl border text-center transition-all ${
                        selectedTier === t.id
                          ? 'bg-gradient-to-br from-[#FFCE3D]/20 to-[#FF3FA1]/20 border-[#FFCE3D] shadow-[0_4px_12px_rgba(255,206,61,0.3)]'
                          : 'bg-white/5 border-white/15 hover:border-white/30'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{t.name}</div>
                      <div className={`text-xs mt-0.5 ${selectedTier === t.id ? 'text-[#FFE066]' : 'text-white/50'}`}>
                        {TIER_PRICES[t.id]} € netto
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-gradient-to-r from-[#FFCE3D]/10 to-[#FF3FA1]/10 border border-[#FFCE3D]/30 p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-[#FF6BB8]">Gebuchte Leistung</div>
                  <div className="font-bold text-white mt-1">KI-Workshop · Die Unverwechselbaren · Tier {TIER_LABELS[selectedTier]}</div>
                  <div className="text-2xl font-black text-[#FFE066] mt-2">
                    {tierPrice.toLocaleString('de-DE')} €
                    <span className="text-sm font-semibold text-white/60 ml-2">netto · zzgl. MwSt.</span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">Vorname *</label>
                  <input type="text" name="vorname" required value={formData.vorname} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="Max" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">Nachname *</label>
                  <input type="text" name="nachname" required value={formData.nachname} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="Musterfrau" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">E-Mail *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="du@beispiel.de" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">Telefon (optional)</label>
                  <input type="tel" name="telefon" value={formData.telefon} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="+49 ..." />
                </div>
              </div>

              <p className="text-xs uppercase tracking-wider font-bold text-[#FF6BB8] pt-2">Rechnungsadresse</p>

              <div>
                <label className="block text-sm font-bold text-white/90 mb-2">Firma (optional)</label>
                <input type="text" name="firma" value={formData.firma} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                  placeholder="Musterfrau GmbH" />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/90 mb-2">Straße & Hausnummer *</label>
                <input type="text" name="strasse" required value={formData.strasse} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                  placeholder="Musterstraße 12" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">PLZ *</label>
                  <input type="text" name="plz" required value={formData.plz} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="50667" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-white/90 mb-2">Ort *</label>
                  <input type="text" name="ort" required value={formData.ort} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="Köln" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">Land *</label>
                  <input type="text" name="land" required value={formData.land} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/90 mb-2">USt-IdNr. (optional)</label>
                  <input type="text" name="ustIdNr" value={formData.ustIdNr} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all"
                    placeholder="DE123456789" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white/90 mb-2">Nachricht an uns (optional)</label>
                <textarea name="nachricht" rows={3} value={formData.nachricht} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/30 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFCE3D] transition-all resize-none"
                  placeholder="Besondere Anforderungen, Fragen, oder einfach 'Hallo!'" />
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="privacyAccepted" required checked={formData.privacyAccepted} onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-white/30 text-[#FFCE3D] focus:ring-[#FFCE3D]" />
                  <span className="text-sm text-white/80 leading-relaxed">
                    Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="text-[#FF6BB8] underline">Datenschutzerklärung</a> gelesen und akzeptiert. *
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agbAccepted" required checked={formData.agbAccepted} onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-white/30 text-[#FFCE3D] focus:ring-[#FFCE3D]" />
                  <span className="text-sm text-white/80 leading-relaxed">
                    Ich habe die <a href="/agb" target="_blank" rel="noopener noreferrer" className="text-[#FF6BB8] underline">AGB</a> gelesen und akzeptiert. Mir ist bewusst, dass mit dem Absenden eine{' '}
                    <strong className="text-white">verbindliche, kostenpflichtige Buchung</strong> über {tierPrice.toLocaleString('de-DE')} € netto (zzgl. MwSt.) zustande kommt. *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.agbAccepted || !formData.privacyAccepted}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold tracking-wide shadow-[0_12px_32px_rgba(255,206,61,0.35)] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)', color: '#0A1428' }}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0A1428]/30 border-t-[#0A1428] rounded-full animate-spin" />
                    Wird gesendet ...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Verbindlich buchen — {tierPrice.toLocaleString('de-DE')} € netto
                  </>
                )}
              </button>
              <p className="text-xs text-center text-white/50">
                Du erhältst direkt eine Bestätigungs-E-Mail. Die Rechnung folgt innerhalb von 1–2 Werktagen.
              </p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 600px at 30% 50%, rgba(255,206,61,0.15) 0%, transparent 60%),' +
                'radial-gradient(700px 500px at 75% 50%, rgba(255,63,161,0.20) 0%, transparent 60%),' +
                'linear-gradient(180deg, #131D3B 0%, #0A1428 100%)',
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            Sei die <em style={{ fontStyle: 'italic', color: '#FFE066' }}>gelbe Ente</em>.<br />
            Nicht der nächste{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF3FA1 0%, #FF6BB8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              KI-Klon
            </span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg text-white/75 leading-relaxed"
          >
            In zwei Tagen baust du, wofür andere Wochen brauchen. Begleitet von <em style={{ fontStyle: 'italic' }}>drei Expertinnen</em> — mit einem{' '}
            <span className="text-[#FF6BB8] font-semibold">System</span>, das danach allein für dich arbeitet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <button
              onClick={() => scrollToForm()}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold tracking-wide shadow-[0_12px_32px_rgba(255,206,61,0.4)] hover:translate-y-[-2px] transition-all"
              style={{ background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)', color: '#0A1428' }}
            >
              Jetzt Platz sichern <ArrowRight size={18} />
            </button>
            <div className="mt-4 text-sm text-white/50">
              Begrenzte Plätze · Persönliche Auswahl · Antwort innerhalb 24h
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
