import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/**
 * Danke-Seite nach dem Kauf von „Unverwechselbar PLUS" (47-€-Tripwire, Claudia 09.11.2026).
 * Stripe leitet nach erfolgreicher Zahlung hierher weiter (Payment-Link → „Nach der Zahlung weiterleiten").
 * noindex, weil es eine reine Bestätigungsseite ist.
 */
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

const ENTHALTEN = [
  '4 Wochen exklusiver Zugang zu den wertvollen Challenge-Inhalten',
  'Elevator-Pitch-Selbstlernkurs im Wert von 249 €',
  '7 Workbooks + 7 Audios zum Mitnehmen',
  '2 persönliche Feedbacks von Claudia',
  'Exklusive Betreuung & Support',
];

export default function ChallengePlusDanke() {
  return (
    <div className="min-h-screen bg-[#13233F] text-pearl-white">
      <SEO title="Dein Komplett-Paket ist da" description="Vielen Dank – dein Unverwechselbar-PLUS-Paket ist bestätigt." path="/challenge/plus-danke" noindex />
      <Navigation />

      <header className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,#2A4170_0%,#1A2B4C_45%,#13233F_100%)] pt-32 pb-14 text-center sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] text-[#C9A961]"><span className="h-px w-10 bg-[#C9A961]" />Unverwechselbar PLUS<span className="h-px w-10 bg-[#C9A961]" /></p>
          <h1 className="mt-6 font-cormorant text-[34px] font-semibold uppercase leading-[1.05] tracking-[0.03em] sm:text-6xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Herzlichen Glückwunsch!
            <span className="mt-2 block bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">Dein Paket ist gesichert.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/85">Danke für dein Vertrauen. Du hast dir den vollen Weg gesichert – mit allem, was dich wirklich sichtbar macht.</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        <section className="rounded-[18px] border border-[#C9A961]/35 bg-[linear-gradient(180deg,#1E3257,#13233F)] p-7 sm:p-8">
          <h2 className="font-montserrat text-xl font-extrabold text-white">Das gehört jetzt dir</h2>
          <ul className="mt-4 grid gap-2.5">
            {ENTHALTEN.map((z) => (
              <li key={z} className="flex items-start gap-3 font-inter text-[15px] text-pearl-white/90">
                <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#C9A961] text-[12px] font-black text-midnight-blue">✓</span>
                {z}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-[18px] border-2 border-[#C9A961] bg-[linear-gradient(180deg,#24396A,#13233F)] p-7 sm:p-8">
          <h2 className="font-montserrat text-xl font-extrabold text-white">So geht es weiter</h2>
          <p className="mt-3 font-inter text-[15px] leading-relaxed text-pearl-white/85">
            Deine Zugangsdaten und alle Inhalte kommen in den nächsten Minuten per E-Mail. Schau auch im Spam-Ordner nach,
            falls nichts ankommt. Deinen Mitgliederbereich erreichst du jederzeit hier:
          </p>
          <a href="https://community.claudiaconen.com/mein-bereich/start" className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Mitgliederbereich →</a>
          <p className="mt-4 font-inter text-sm text-pearl-white/70">Eine Frage oder etwas kommt nicht an? Schreib uns einfach – wir kümmern uns persönlich um dich.</p>
        </section>

        <section className="mx-auto mt-12 max-w-2xl border-l-4 border-[#C9A961] pl-6 font-inter text-lg leading-relaxed text-pearl-white/90" aria-label="Ein Wort von Claudia">
          <p className="font-montserrat text-xl font-extrabold text-white">Ich freue mich, dass du den ganzen Weg gehst.</p>
          <p className="mt-3">Genau hier entsteht der Unterschied: dranbleiben, üben, Feedback bekommen – und wachsen. Ich bin dabei.</p>
          <p className="mt-3 font-montserrat text-base font-bold text-[#C9A961]">Claudia</p>
        </section>

        <div className="mt-12 text-center">
          <Link to="/challenge/danke" className="font-inter text-sm font-bold text-[#F7E7CE] underline decoration-[#C9A961] underline-offset-4">← Zurück zu deinen Challenge-Schritten</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
