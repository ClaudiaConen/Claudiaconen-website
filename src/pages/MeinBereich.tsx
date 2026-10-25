import { useEffect, useState, type FormEvent } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import MitgliederBereich, { ZUGANGSCODE, BEREICH_SCHLUESSEL } from '../components/MitgliederBereich';
import { supabaseCms } from '../lib/supabaseCms';

/**
 * Mitgliederbereich der 7-Tage-Challenge mit Login (Claudia, 25.10.2026 16:21): E-Mail + Zugangscode.
 * Jeder Login landet in eamm contact_inquiries (Nachricht beginnt mit "MEIN-BEREICH-LOGIN"), so kommen auch die
 * E-Mail-Adressen der WhatsApp-Teilnehmenden an. Danach bleibt der Bereich auf dem Geraet offen (localStorage).
 * Ein echter Passwort-Login je Person folgt mit Supabase Auth (Gabi richtet ein).
 */
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

export default function MeinBereich() {
  const [name, setName] = useState<string | null>(null);
  const [geladen, setGeladen] = useState(false);
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [meldung, setMeldung] = useState('');
  const [sendet, setSendet] = useState(false);

  useEffect(() => {
    try { setName(window.localStorage.getItem(BEREICH_SCHLUESSEL)); } catch { /* privater Modus */ }
    // Vorschau fuer Claudia ohne Login: /mein-bereich?vorschau=alle
    if (/[?&]vorschau=alle/.test(window.location.search)) setName((n) => n || 'Claudia');
    setGeladen(true);
  }, []);

  async function einloggen(e: FormEvent) {
    e.preventDefault();
    setMeldung('');
    if (!vorname.trim()) { setMeldung('Bitte trag deinen Vornamen ein.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setMeldung('Bitte prüf deine E-Mail-Adresse.'); return; }
    if (code.trim().toUpperCase() !== ZUGANGSCODE) { setMeldung('Der Zugangscode stimmt nicht. Du findest ihn auf deiner Danke-Seite und in deiner Gruppe.'); return; }
    setSendet(true);
    const { error } = await supabaseCms.from('contact_inquiries').insert([{
      name: vorname.trim(),
      email: email.trim(),
      message: 'MEIN-BEREICH-LOGIN – Login in den Mitgliederbereich (claudiaconen.com/mein-bereich)', // bewusst ohne das Wort "Challenge": Zeilen mit diesem Wort sind per anon-Policy oeffentlich lesbar
    }]);
    setSendet(false);
    if (error) { console.error('Login-Eintrag fehlgeschlagen:', error); setMeldung('Das hat leider nicht geklappt. Bitte versuch es gleich noch einmal.'); return; }
    try { window.localStorage.setItem(BEREICH_SCHLUESSEL, vorname.trim()); } catch { /* privater Modus */ }
    setName(vorname.trim());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-[#13233F] text-pearl-white">
      <SEO title="Dein Mitgliederbereich · UNVERWECHSELBAR" description="Nutze die Inhalte für deine Unverwechselbarkeit im KI-Zeitalter." path="/mein-bereich" ogImage="https://claudiaconen.com/a27/og/og-mein-bereich-v2.jpg" noindex />
      <Navigation />
      {!geladen ? <div className="min-h-[60vh]" /> : name ? (
        <MitgliederBereich name={name} />
      ) : (
        <main className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,#2A4170_0%,#1A2B4C_45%,#13233F_100%)] px-6 pt-32 pb-24 sm:pt-40">
          <div className="mx-auto max-w-md text-center">
            <p className="inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] text-[#C9A961]"><span className="h-px w-10 bg-[#C9A961]" />Mitgliederbereich<span className="h-px w-10 bg-[#C9A961]" /></p>
            <h1 className="mt-6 text-[34px] font-semibold uppercase leading-[1.05] tracking-[0.03em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Login
              <span className="mt-1 block whitespace-nowrap bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent" style={{ fontSize: "min(1em, calc((100vw - 56px) / 10.6))" }}>Unverwechselbar</span>
            </h1>
            <p className="mt-4 font-inter text-base text-pearl-white/80">Hier warten jeden Morgen um 7 Uhr dein Audio, deine Erklärung und dein Workbook.</p>
          </div>
          <form onSubmit={einloggen} noValidate className="mx-auto mt-8 grid max-w-md gap-4 rounded-[20px] border border-[#C9A961]/50 bg-white/[0.05] p-6 text-left sm:p-8">
            <label className="grid gap-1.5 font-inter text-sm font-bold">Vorname
              <input value={vorname} onChange={(e) => setVorname(e.target.value)} autoComplete="given-name" className="rounded-[10px] border border-white/25 bg-white px-4 py-3 font-normal text-midnight-blue" />
            </label>
            <label className="grid gap-1.5 font-inter text-sm font-bold">E-Mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="rounded-[10px] border border-white/25 bg-white px-4 py-3 font-normal text-midnight-blue" />
            </label>
            <label className="grid gap-1.5 font-inter text-sm font-bold">Zugangscode
              <input value={code} onChange={(e) => setCode(e.target.value)} autoCapitalize="characters" className="rounded-[10px] border border-white/25 bg-white px-4 py-3 font-normal uppercase tracking-[0.12em] text-midnight-blue" />
            </label>
            <p className="font-inter text-xs leading-relaxed text-pearl-white/70">Mit dem Login werden Vorname und E-Mail für deinen Zugang gespeichert. Mehr in der <a href="/datenschutz" className="underline decoration-[#C9A961]">Datenschutzerklärung</a>.</p>
            <button type="submit" disabled={sendet} className={`mt-1 rounded-full px-7 py-4 font-montserrat text-sm font-bold uppercase tracking-[0.08em] text-midnight-blue ${GOLD}`}>{sendet ? 'Einen Moment …' : 'Einloggen'}</button>
            {meldung && <p role="status" className="font-inter text-sm font-semibold text-[#F7B48A]">{meldung}</p>}
          </form>
          <p className="mx-auto mt-6 max-w-md text-center font-inter text-sm text-pearl-white/70">Noch nicht angemeldet? <a href="/challenge#anmeldung" className="font-bold text-[#F7E7CE] underline decoration-[#C9A961]">Zur kostenfreien 7-Tage-Challenge →</a></p>
        </main>
      )}
      <Footer />
    </div>
  );
}
