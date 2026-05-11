import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Mail, Calendar, ArrowLeft, Sun, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function SpanienBookingDanke() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#2A1F3D] font-inter antialiased selection:bg-[#E8B4C8] selection:text-[#2A1F3D]">
      <SEO
        title="Danke für deine Buchung — Spanien KI-Workshop | Claudia Conen"
        description="Deine Buchung der KI-Workshop-Woche in Spanien ist bei uns eingegangen. So geht es weiter."
        noindex
      />
      <Navigation />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 500px at 20% 0%, rgba(244,194,215,0.45) 0%, transparent 60%),' +
                'radial-gradient(700px 400px at 90% 30%, rgba(212,175,55,0.35) 0%, transparent 60%),' +
                'linear-gradient(180deg, #FFFBF3 0%, #FBF7F0 60%, #F7E7CE 100%)',
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-[0_12px_32px_rgba(212,175,55,0.4)]"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E8B4C8 100%)' }}
          >
            <CheckCircle2 size={42} className="text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-[#E8B4C8]/50 shadow-sm mb-5"
          >
            <Sun size={16} className="text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#2A1F3D]">Buchung eingegangen</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            <span className="text-[#2A1F3D]">Wir freuen uns </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              auf dich!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-[#4A3F5C] leading-relaxed"
          >
            Deine verbindliche Buchung der <strong className="text-[#2A1F3D]">KI-Workshop-Woche in Spanien</strong> ist
            bei uns eingegangen. In wenigen Minuten findest du eine Bestätigung in deinem Postfach.
          </motion.p>
        </div>
      </section>

      {/* WIE GEHT ES WEITER */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-3">So geht es weiter</p>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-[#2A1F3D]">
              Die nächsten Schritte
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: 'Rechnung per E-Mail',
                desc: 'In den nächsten 1–2 Werktagen bekommst du von uns eine Rechnung per E-Mail über 990 € netto (zzgl. gesetzlicher MwSt.) an die von dir angegebene Anschrift.',
              },
              {
                icon: Sparkles,
                title: 'Dein Platz ist gesichert',
                desc: 'Sobald die Zahlung bei uns eingegangen ist, ist dein Platz endgültig gesichert. Du bekommst eine Bestätigung von uns.',
              },
              {
                icon: Calendar,
                title: 'Alle Infos vor Reisebeginn',
                desc: 'Wenige Wochen vor dem Workshop bekommst du von uns alle Infos zu Hotel-Empfehlungen, Anreise und dem genauen Ablauf der Woche.',
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-[#E8B4C8]/30 shadow-sm"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C97AAF 100%)' }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold text-[#C97AAF] mb-1">
                      Schritt {i + 1}
                    </div>
                    <h3 className="font-montserrat font-bold text-xl text-[#2A1F3D] mb-2">{step.title}</h3>
                    <p className="text-[#6B5F7A] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEINE TERMINE */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-[#FBF1D8] via-[#FBF7F0] to-[#FDE8F2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-[#D4AF37]/30 p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.4)]"
          >
            <div className="text-center mb-7">
              <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#C97AAF] mb-3">Deine Termine</p>
              <h2 className="font-montserrat font-black text-3xl text-[#2A1F3D]">28.06. – 05.07.2026</h2>
            </div>

            <ul className="space-y-3 text-[#2A1F3D]">
              {[
                { day: 'So, 28.06.2026', label: 'Anreisetag' },
                { day: 'Mo, 29.06.2026', label: 'Workshop-Beginn' },
                { day: 'Mo – Fr', label: 'Lernzeit 09:00 – 13:00 & 16:00 – 18:00 Uhr' },
                { day: 'Sa, 04.07.2026', label: 'Aktivitäten- & Freizeit-Tag' },
                { day: 'So, 05.07.2026', label: 'Abreisetag' },
              ].map((t) => (
                <li key={t.day + t.label} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8B4C8]/30">
                  <Clock size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#2A1F3D]">{t.day}</strong>
                    <span className="text-[#6B5F7A]"> · {t.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* KONTAKT + ZURÜCK */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#FBF1D8] to-[#FDE8F2] mb-5">
              <Heart size={24} className="text-[#C97AAF]" />
            </div>
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-[#2A1F3D] mb-3">
              Fragen? Wir sind für dich da.
            </h3>
            <p className="text-[#4A3F5C] mb-6">
              Antworte einfach auf die Bestätigungs-E-Mail — oder erreich uns direkt:
            </p>
            <div className="inline-flex flex-col items-center gap-2 text-[#2A1F3D]">
              <a
                href="mailto:claudiaconen@umsatzstimme.de"
                className="font-bold text-[#C97AAF] hover:text-[#A85A8E] underline underline-offset-4"
              >
                claudiaconen@umsatzstimme.de
              </a>
              <a
                href="https://wa.me/4916093102073"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C97AAF] hover:text-[#A85A8E] underline underline-offset-4"
              >
                WhatsApp: +49 160 93102073
              </a>
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-white/80 backdrop-blur border border-[#D4AF37]/40 text-[#2A1F3D] hover:bg-white hover:border-[#D4AF37] transition-all"
              >
                <ArrowLeft size={16} />
                Zurück zur Startseite
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
