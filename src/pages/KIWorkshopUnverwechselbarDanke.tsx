import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Mail, Sparkles, Calendar, ArrowLeft, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface DankeState {
  vorname?: string;
  tier?: string;
  tierPriceNetto?: number;
}

const TIER_LABEL: Record<string, string> = {
  basis: 'Basis',
  plus: 'Plus (Empfohlen)',
  vip: 'VIP',
};

export default function KIWorkshopUnverwechselbarDanke() {
  const location = useLocation();
  const state = (location.state ?? {}) as DankeState;
  const vorname = state.vorname || 'du';
  const tier = state.tier;
  const price = state.tierPriceNetto;

  return (
    <div className="min-h-screen bg-[#0A1428] text-[#FDFCFA] font-inter antialiased selection:bg-[#FF3FA1] selection:text-[#FDFCFA]">
      <SEO
        title="Anmeldung eingegangen — KI-Workshop Die Unverwechselbaren | Claudia Conen"
        description="Deine Anmeldung zum KI-Workshop ist bei uns eingegangen. So geht es weiter."
        noindex
      />
      <Navigation />

      <section className="relative overflow-hidden pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 500px at 20% 0%, rgba(255,63,161,0.18) 0%, transparent 60%),' +
                'radial-gradient(700px 400px at 90% 30%, rgba(255,206,61,0.22) 0%, transparent 60%),' +
                'linear-gradient(180deg, #0A1428 0%, #131D3B 100%)',
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-[0_12px_32px_rgba(255,206,61,0.4)]"
            style={{ background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)' }}
          >
            <CheckCircle2 size={42} className="text-[#0A1428]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur border border-white/10 mb-5"
          >
            <Sparkles size={16} className="text-[#FFCE3D]" />
            <span className="text-sm font-semibold">Anmeldung eingegangen</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Wir freuen uns auf{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {vorname}!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed"
          >
            Deine verbindliche Anmeldung zum <strong>KI-Workshop „Die Unverwechselbaren"</strong> ist bei uns
            eingegangen. In wenigen Minuten findest du eine Bestätigung in deinem Postfach.
          </motion.p>

          {tier && price && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 inline-block rounded-2xl bg-white/5 backdrop-blur border border-[#FFCE3D]/30 px-6 py-4 text-left"
            >
              <div className="text-xs uppercase tracking-wider font-bold text-[#FFCE3D] mb-1">Deine Buchung</div>
              <div className="font-bold text-lg">
                Tier {TIER_LABEL[tier] ?? tier}
                <span className="text-white/70 font-normal"> · {price.toLocaleString('de-DE')} € netto (zzgl. MwSt.)</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-[#FF6BB8] mb-3">So geht es weiter</p>
            <h2 className="font-montserrat font-black text-3xl md:text-4xl">Die nächsten Schritte</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: 'Rechnung per E-Mail',
                desc: 'In den nächsten 1–2 Werktagen bekommst du von uns eine Rechnung per E-Mail. Die wird an die von dir angegebene Anschrift adressiert.',
              },
              {
                icon: Sparkles,
                title: 'Dein Platz ist gesichert',
                desc: 'Sobald die Zahlung bei uns eingegangen ist, ist dein Platz endgültig gesichert. Du bekommst eine Bestätigung von uns.',
              },
              {
                icon: Calendar,
                title: 'Kostenloser Vorbereitungs-Call',
                desc: 'Etwa eine Woche vor dem Workshop gibt es einen kostenlosen Zoom-Vorbereitungs-Call. Dort richten wir gemeinsam alle Tools-Zugänge ein.',
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
                  className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-[#0A1428]"
                    style={{ background: 'linear-gradient(135deg, #FFCE3D 0%, #FF3FA1 100%)' }}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold text-[#FFCE3D] mb-1">Schritt {i + 1}</div>
                    <h3 className="font-montserrat font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-white/70 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-5">
              <Heart size={24} className="text-[#FF6BB8]" />
            </div>
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-3">Fragen? Wir sind für dich da.</h3>
            <p className="text-white/70 mb-6">Antworte einfach auf die Bestätigungs-E-Mail — oder erreich uns direkt:</p>
            <div className="inline-flex flex-col items-center gap-2">
              <a
                href="mailto:claudiaconen@umsatzstimme.de"
                className="font-bold text-[#FF6BB8] hover:text-[#FFCE3D] underline underline-offset-4"
              >
                claudiaconen@umsatzstimme.de
              </a>
              <a
                href="https://wa.me/4916093102073"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6BB8] hover:text-[#FFCE3D] underline underline-offset-4"
              >
                WhatsApp: +49 160 93102073
              </a>
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-white/5 backdrop-blur border border-white/15 text-white hover:bg-white/10 transition-all"
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
