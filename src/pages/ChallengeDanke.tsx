import { useLocation, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ZUGANGSCODE } from '../components/MitgliederBereich';

/**
 * Danke-Seite nach dem Eintragen – kurz und neugierig machend (Claudia, 25.10.2026 16:21).
 * Drei Schritte: Gruppe, Zoom, Mitgliederbereich (Login mit E-Mail + Zugangscode, taeglich 7 Uhr ein neuer Schritt).
 * Gruppen-, Zoom-Link und Zugangscode stehen nur hier, deshalb noindex. Der Vorname kommt aus dem Formular (Router-State).
 */
const WHATSAPP = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const TELEGRAM = 'https://t.me/+Tn_rHmElfidjYzcy';
const ZOOM = 'https://us02web.zoom.us/j/3240814498';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
/** Tripwire „Unverwechselbar PLUS" (47 €) – Stripe Payment-Link (Claudia, 09.11.2026). */
const PLUS_LINK = 'https://buy.stripe.com/dRmcN57E4bSU1jO7rq3oA04';
const PLUS_INHALT = [
  '4 Wochen exklusiver Zugang zu den wertvollen Challenge-Inhalten',
  '7 Workbooks + 7 Audios zum Mitnehmen',
  '2 persönliche Feedbacks von Claudia',
  'Exklusive Betreuung & Support',
];

export default function ChallengeDanke() {
  const ort = useLocation();
  const zustand = (ort.state || {}) as { angemeldet?: boolean; vorname?: string };
  if (!zustand.angemeldet) {
    return (
      <div className="min-h-screen bg-white text-midnight-blue">
        <SEO title="Anmeldung zur Challenge" description="Melde dich zuerst zur kostenfreien 7-Tage-Challenge an." path="/challenge/danke" noindex />
        <Navigation hell />
        <main className="mx-auto max-w-2xl px-6 pt-36 pb-24 text-center">
          <h1 className="font-montserrat text-3xl font-extrabold">Bitte melde dich zuerst an.</h1>
          <p className="mt-4 font-inter text-lg">Nach deiner Anmeldung geht es hier weiter.</p>
          <Link to="/challenge#anmeldung" className={`mt-8 inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zur Anmeldung →</Link>
        </main>
        <Footer />
      </div>
    );
  }
  const name = zustand.vorname?.trim();
  return (
    <div className="min-h-screen bg-[#13233F] text-pearl-white">
      <SEO title="Du bist dabei" description="Deine nächsten Schritte in der 7-Tage-Challenge UNVERWECHSELBAR." path="/challenge/danke" noindex />
      <Navigation />

      <header className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,#2A4170_0%,#1A2B4C_45%,#13233F_100%)] pt-32 pb-14 text-center sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] text-[#C9A961]"><span className="h-px w-10 bg-[#C9A961]" />7 Tage UNVERWECHSELBAR<span className="h-px w-10 bg-[#C9A961]" /></p>
          <h1 className="mt-6 font-cormorant text-[34px] font-semibold uppercase leading-[1.05] tracking-[0.03em] sm:text-6xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Du bist dabei{name ? `, ${name}` : ''}.
            <span className="mt-2 block bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">Es geht los.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-inter text-lg leading-relaxed text-pearl-white/85">Drei kleine Schritte, dann bist du startklar. Und jeden Morgen um 5 Uhr wartet etwas Neues auf dich.</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        <ol className="grid list-none gap-6 p-0 lg:grid-cols-3">
          <li className="rounded-[18px] border border-[#C9A961]/35 bg-[linear-gradient(180deg,#1E3257,#13233F)] p-6">
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A961]">Schritt 1</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-white">Tritt deiner Gruppe bei</h2>
            <p className="mt-2 font-inter text-sm text-pearl-white/75">Am Handy antippen, am Computer den QR-Code scannen.</p>
            <div className="mt-4 grid gap-3">
              {[
                { name: 'WhatsApp', zusatz: 'empfohlen', link: WHATSAPP, qr: '/challenge/qr-whatsapp.png' },
                { name: 'Telegram', zusatz: 'ohne WhatsApp', link: TELEGRAM, qr: '/challenge/qr-telegram.png' },
              ].map((g) => (
                <a key={g.name} href={g.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[12px] bg-white p-3 text-midnight-blue transition-transform hover:-translate-y-0.5">
                  <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-16 w-16 flex-none rounded-md" />
                  <span><b className="block font-montserrat font-extrabold">{g.name}</b><small className="font-inter text-xs text-midnight-blue/70">{g.zusatz}</small><span className="block font-inter text-[13px] font-bold underline decoration-[#C9A961] underline-offset-2">Zur Gruppe →</span></span>
                </a>
              ))}
            </div>
          </li>
          <li className="rounded-[18px] border border-[#C9A961]/35 bg-[linear-gradient(180deg,#1E3257,#13233F)] p-6">
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A961]">Schritt 2</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-white">Speichere den Zoom-Link</h2>
            <p className="mt-3 inline-block rounded-md bg-[#F28C3A] px-3 py-2 font-montserrat text-sm font-extrabold text-midnight-blue">Mo 23. November · 19 Uhr</p>
            <p className="mt-3 font-inter text-sm text-pearl-white/75">Unser Live-Start. Und am Di 1. Dezember, 19 Uhr, präsentierst du deinen Pitch.</p>
            <a href={ZOOM} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Zoom-Raum</a>
          </li>
          <li className="rounded-[18px] border-2 border-[#C9A961] bg-[linear-gradient(180deg,#24396A,#13233F)] p-6">
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#C9A961]">Schritt 3</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-white">Dein Mitgliederbereich</h2>
            <p className="mt-2 font-inter text-sm text-pearl-white/80">Jeden Morgen um 5 Uhr öffnet sich dort dein nächster Schritt: Erklärung, Audio und Workbook.</p>
            <div className="mt-4 rounded-[12px] border border-[#C9A961]/50 bg-white/[0.06] p-4 text-center">
              <p className="font-inter text-xs uppercase tracking-[0.16em] text-pearl-white/70">Dein Zugangscode</p>
              <p className="mt-1 font-montserrat text-2xl font-black tracking-[0.12em] text-[#F7E7CE]">{ZUGANGSCODE}</p>
            </div>
            <a href="https://community.claudiaconen.com/mein-bereich/start" className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Mitgliederbereich →</a>
          </li>
        </ol>

        {/* Tripwire: einmaliges Angebot direkt nach der Anmeldung (Claudia, 09.11.2026). Hauptsache bleibt oben
            der Gratis-Zugang + Zoom; dieses Angebot kommt als eigene, ruhige Karte darunter. */}
        <section aria-labelledby="plus-titel" className="mt-14">
          <div className="relative overflow-hidden rounded-[22px] border-2 border-[#C9A961] bg-[radial-gradient(ellipse_80%_90%_at_80%_0%,#2A4170_0%,#1A2B4C_50%,#13233F_100%)] p-7 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#C9A961]/60 px-3 py-1 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F7E7CE]">Nur für neue Teilnehmer · einmaliges Angebot</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h2 id="plus-titel" className="font-cormorant text-[30px] font-semibold leading-[1.1] text-white sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Mach mehr aus deinen 7 Tagen:
                  <span className="block bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent">Unverwechselbar PLUS</span>
                </h2>
                <p className="mt-3 font-inter text-[15px] leading-relaxed text-pearl-white/80">Dein Komplett-Paket, das die Challenge verlängert und vertieft – damit aus Üben echtes Können wird.</p>
                <ul className="mt-5 grid gap-2.5">
                  {PLUS_INHALT.map((z) => (
                    <li key={z} className="flex items-start gap-3 font-inter text-[15px] text-pearl-white/90">
                      <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#C9A961] text-[12px] font-black text-midnight-blue">✓</span>
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] border border-[#C9A961]/50 bg-white/[0.06] p-6 text-center">
                <p className="font-inter text-xs uppercase tracking-[0.16em] text-pearl-white/60">Einmaliges Angebot · nur für neue Teilnehmer</p>
                <p className="mt-1 font-cormorant text-6xl font-bold text-[#F7E7CE]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>47 €</p>
                <a href={PLUS_LINK} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-7 py-4 font-montserrat text-sm font-extrabold text-midnight-blue ${GOLD}`}>Jetzt sichern – 47 € →</a>
                <p className="mt-3 font-inter text-xs text-pearl-white/60">Sichere Zahlung über Stripe · sofort danach geht’s weiter</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 text-center" aria-labelledby="neugier-titel">
          <h2 id="neugier-titel" className="font-cormorant text-3xl italic text-[#F7E7CE] sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Das wartet auf dich …</h2>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
            {[1, 4, 7].map((n) => (
              <div key={n} className="relative overflow-hidden rounded-[12px] border border-[#C9A961]/30">
                <img src={`/a27/p/mitglieder/bilder/tag${n}.webp`} alt="" width={640} height={906} loading="lazy" className="aspect-[640/906] w-full object-cover blur-[3px] brightness-75" />
                <span className="absolute inset-x-2 bottom-2 rounded-md bg-[#13233F]/85 px-2 py-1 font-inter text-[11px] font-extrabold text-[#F7E7CE] sm:text-xs">Tag {n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Claudias Worte zur Begruessung (25.10.2026 00:13). */}
        <section className="mx-auto mt-14 max-w-2xl border-l-4 border-[#C9A961] pl-6 font-inter text-lg leading-relaxed text-pearl-white/90" aria-label="Ein Wort von Claudia">
          <p className="font-montserrat text-xl font-extrabold text-white">Schön, dass du dabei bist.</p>
          <p className="mt-3">Manche bremst die Redeangst, andere wollen ihre Performance verbessern. Für beides sind die nächsten sieben Tage da.</p>
          <p className="mt-3">Ich freue mich auf dich.</p>
          <p className="mt-3 font-montserrat text-base font-bold text-[#C9A961]">Claudia</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
