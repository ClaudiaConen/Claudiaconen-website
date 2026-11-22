import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { START2_LABEL, FRUEH, ABEND } from '../data/masterclassDaten';

/**
 * Danke-Seite nach dem Eintragen – kurz und neugierig machend (Claudia, 25.10.2026 16:21).
 * Drei Schritte: Mitgliederbereich, Zoom, Gruppe (Claudia, 22.11.2026 17:43; Community ohne Zugangscode, täglich 5 Uhr ein neuer Schritt).
 * Hell gestaltet (Claudia, 22.11.2026 18:07: "mach das nicht so dunkel alles"): Weiß + #F5F5F7, Dunkelblau als Schrift, Gold sparsam.
 * Gruppen- und Zoom-Link stehen nur hier, deshalb noindex. Der Vorname kommt aus dem Formular (Router-State).
 */
const WHATSAPP = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const TELEGRAM = 'https://t.me/+Tn_rHmElfidjYzcy';
const ZOOM = 'https://us02web.zoom.us/j/3240814498';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
/** Goldton für Schrift auf Weiß (der helle Verlauf wäre auf Weiß nicht lesbar). */
const GOLD_TEXT = 'text-[#A8894A]';
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
/** Tripwire „Unverwechselbar PLUS" (47 €) – Stripe Payment-Link (Claudia, 09.11.2026). */
const PLUS_LINK = 'https://buy.stripe.com/dRmcN57E4bSU1jO7rq3oA04';
const PLUS_INHALT = [
  '3 Monate exklusiver Zugang zu den wertvollen Challenge-Inhalten',
  '7 Workbooks und 7 Audios',
  '3 persönliche Feedbacks von Claudia',
  '3 Monate kostenfreie Mitgliedschaft in der Community',
];
const TAGE = ['Deine Kernbotschaft', 'Die Zielgruppenbrille', 'Raus aus der Redeangst', 'Deine Stimme', 'Storytelling', 'Wie Kunden entscheiden', 'Dein Elevator Pitch'];
const KARTE = 'rounded-[18px] bg-white p-6 shadow-[0_14px_40px_-24px_rgba(19,35,63,0.35)]';

export default function ChallengeDanke() {
  const ort = useLocation();
  // Kein Zugangs-Schutz mehr (Claudia, 22.11.2026): Beim Double-Opt-in wird diese Seite ERST nach dem Klick
  // auf den Bestätigungslink in der E-Mail aufgerufen – also ohne Formular-Zustand. Deshalb immer anzeigen.
  // Der Vorname (falls direkt aus dem Formular vorhanden) wird weiter zur Begrüßung genutzt, ist aber optional.
  const zustand = (ort.state || {}) as { vorname?: string };
  const name = zustand.vorname?.trim();
  return (
    <div className="min-h-screen bg-white text-midnight-blue">
      <SEO title="Du bist dabei" description="Deine nächsten Schritte in der 7-Tage-Challenge UNVERWECHSELBAR." path="/challenge/danke" noindex />
      <Navigation hell />

      <header className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F5F7_100%)] pt-44 pb-14 text-center sm:pt-48 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className={`inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] ${GOLD_TEXT}`}><span className="h-px w-10 bg-[#C9A961]" />7 Tage UNVERWECHSELBAR<span className="h-px w-10 bg-[#C9A961]" /></p>
          <h1 className="mt-6 font-cormorant text-[34px] font-semibold uppercase leading-[1.05] tracking-[0.03em] text-[#13233F] sm:text-6xl" style={SERIF}>
            Du bist dabei{name ? `, ${name}` : ''}.
            <span className={`mt-2 block ${GOLD_TEXT}`}>Es geht los.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-inter text-lg leading-relaxed text-midnight-blue/80">Drei kleine Schritte, dann bist du startklar. Ab dem 7. Dezember öffnet sich jeden Morgen um 5 Uhr eine neue Tür.</p>
        </div>
      </header>

      <div className="bg-[#F5F5F7] pb-16">
        <ol className="mx-auto grid max-w-5xl list-none gap-6 px-6 lg:grid-cols-3">
          <li className={`${KARTE} border-2 border-[#C9A961]`}>
            <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 1</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-[#13233F]">Dein Mitgliederbereich</h2>
            <p className="mt-2 font-inter text-sm text-midnight-blue/75">Täglich um 5 Uhr öffnet sich dort eine neue Tür, mit Audio-Impuls und Workbook. An manchen Tagen erwartet dich dort ein persönliches Feedback.</p>
            <a href="https://community.claudiaconen.com/community/s/challenge-tage" className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Mitgliederbereich →</a>
          </li>
          <li className={`${KARTE} border border-[#E4E6EC]`}>
            <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 2</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-[#13233F]">Speichere den Zoom-Link</h2>
            <div className="mt-3 grid gap-2">
              {['Mo 7. Dez.', 'Mi 9. Dez.', 'Mo 14. Dez.'].map((t) => (
                <a key={t} href={ZOOM} target="_blank" rel="noopener noreferrer" className="block rounded-md bg-[#FF7A00] px-3 py-2 font-montserrat text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">{t} · 18:18–19:48 Uhr →</a>
              ))}
            </div>
            <p className="mt-3 font-inter text-sm text-midnight-blue/75">Deine 3 Live-Termine, je 90 Minuten. Immer derselbe Zoom-Raum.</p>
            <a href={ZOOM} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Zoom-Raum</a>
          </li>
          <li className={`${KARTE} border border-[#E4E6EC]`}>
            <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 3</p>
            <h2 className="mt-2 font-montserrat text-xl font-extrabold text-[#13233F]">Tritt deiner Gruppe bei</h2>
            <p className="mt-2 font-inter text-sm font-semibold text-[#13233F]">Wähle deine Gruppe, wenn du die Audios von Claudia auch in WhatsApp oder Telegram hören willst.</p>
            <p className="mt-2 font-inter text-sm text-midnight-blue/75">Am Handy antippen, am Computer den QR-Code scannen. Ohne WhatsApp und Telegram? Auch das geht: Die ganze Challenge läuft auch ausschließlich im Mitgliederbereich (Schritt 1).</p>
            <div className="mt-4 grid gap-3">
              {[
                { name: 'WhatsApp', zusatz: 'empfohlen', link: WHATSAPP, qr: '/challenge/qr-whatsapp.png' },
                { name: 'Telegram', zusatz: 'ohne WhatsApp', link: TELEGRAM, qr: '/challenge/qr-telegram.png' },
              ].map((g) => (
                <a key={g.name} href={g.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[12px] border border-[#E4E6EC] bg-white p-3 text-midnight-blue transition-transform hover:-translate-y-0.5">
                  <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-16 w-16 flex-none rounded-md" />
                  <span><b className="block font-montserrat font-extrabold">{g.name}</b><small className="font-inter text-xs text-midnight-blue/70">{g.zusatz}</small><span className="block font-inter text-[13px] font-bold underline decoration-[#C9A961] underline-offset-2">Zur Gruppe →</span></span>
                </a>
              ))}
            </div>
          </li>
        </ol>
      </div>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        {/* Ziel der Challenge (Claudia, 22.11.2026), Text mit ihren Sätzen. */}
        <section className="mx-auto mt-16 max-w-4xl" aria-labelledby="ziel-titel">
          <p className={`text-center font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] ${GOLD_TEXT}`}>Starte 2027 glasklar</p>
          <h2 id="ziel-titel" className="mt-3 text-center font-cormorant text-[32px] font-semibold leading-[1.1] text-[#13233F] sm:text-5xl" style={SERIF}>
            Was macht dich 2027
            <span className={`block ${GOLD_TEXT}`}>unverwechselbar?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center font-inter text-lg leading-relaxed text-midnight-blue/80">Und wie gewinnst du das Vertrauen deiner potenziellen Kunden? Perfektion ist klickbar. Persönlichkeit weckt Vertrauen. Heb dich aus der Masse der Angebote heraus: authentisch, echt, vertrauenswürdig.</p>
          <p className="mx-auto mt-8 max-w-2xl text-center font-cormorant text-2xl italic text-[#13233F] sm:text-3xl" style={SERIF}>„Weil du dir selbst vertraust, vertrauen dir auch deine Kunden.“</p>
          <p className={`mt-2 text-center font-montserrat text-sm font-bold ${GOLD_TEXT}`}>Claudia</p>
        </section>

        {/* Alle sieben Workbooks (Claudia, 22.11.2026: nicht nur Tag 1, 4, 7). */}
        <section className="mt-16 text-center" aria-labelledby="neugier-titel">
          <h2 id="neugier-titel" className="font-cormorant text-3xl italic text-[#13233F] sm:text-4xl" style={SERIF}>Das wartet auf dich …</h2>
          <p className="mx-auto mt-3 max-w-xl font-inter text-[15px] text-midnight-blue/70">Sieben Workbooks, sieben Audios. Jeden Morgen um 5 Uhr öffnet sich eine neue Tür.</p>
          <div className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
            {TAGE.map((t, i) => (
              <div key={t} className="overflow-hidden rounded-[12px] border border-[#E4E6EC] bg-white text-left shadow-[0_10px_30px_-22px_rgba(19,35,63,0.4)]">
                <img src={`/a27/p/mitglieder/bilder/tag${i + 1}.webp`} alt="" width={640} height={906} loading="lazy" className="aspect-[640/906] w-full object-cover blur-[3px]" />
                <div className="px-2.5 py-2">
                  <p className={`font-montserrat text-[10px] font-extrabold uppercase tracking-[0.16em] ${GOLD_TEXT}`}>Tag {i + 1}</p>
                  <p className="mt-0.5 font-inter text-[12px] font-bold leading-snug text-[#13233F]">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIP-Fassung der Challenge (Claudia, 22.11.2026): für alle, die ohne Gruppe und festen Termin mitmachen wollen.
            Kein "einmaliges Angebot / nur für neue Teilnehmer", kein "statt 97 €" mehr. */}
        <section aria-labelledby="plus-titel" className="mt-16">
          <div className="rounded-[22px] border-2 border-[#C9A961] bg-white p-7 shadow-[0_24px_60px_-34px_rgba(19,35,63,0.45)] sm:p-10">
            <p className={`inline-flex items-center gap-2 rounded-full border border-[#C9A961] px-3 py-1 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] ${GOLD_TEXT}`}>Für dich allein</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h2 id="plus-titel" className="font-cormorant text-[30px] font-semibold leading-[1.1] text-[#13233F] sm:text-4xl" style={SERIF}>
                  Die Challenge als VIP:
                  <span className={`block ${GOLD_TEXT}`}>Unverwechselbar PLUS</span>
                </h2>
                <p className="mt-3 font-inter text-[15px] leading-relaxed text-midnight-blue/80">Du willst die Challenge für dich allein durchgehen und dir alle Inhalte sichern? Dann ist das dein Weg: ohne Gruppe, ohne festen Termin, in deinem Tempo.</p>
                <ul className="mt-5 grid gap-2.5">
                  {PLUS_INHALT.map((z) => (
                    <li key={z} className="flex items-start gap-3 font-inter text-[15px] text-midnight-blue/90">
                      <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#C9A961] text-[12px] font-black text-white">✓</span>
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] bg-[#F5F5F7] p-6 text-center">
                <p className="font-inter text-xs uppercase tracking-[0.16em] text-midnight-blue/60">VIP-Zugang</p>
                <p className="mt-1 font-cormorant text-6xl font-bold text-[#13233F]" style={SERIF}>47 €</p>
                <a href={PLUS_LINK} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-7 py-4 font-montserrat text-sm font-extrabold text-midnight-blue ${GOLD}`}>VIP-Zugang sichern →</a>
                <p className="mt-3 font-inter text-xs text-midnight-blue/60">Sichere Zahlung über Stripe · danach geht es direkt weiter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Masterclass als zweites Fenster (Claudia, 22.11.2026): für Zielbewusste, die gleich umsetzen wollen. Daten aus masterclassDaten. */}
        <section aria-labelledby="mc-titel" className="mt-8">
          <div className="grid gap-6 rounded-[22px] bg-[#F5F5F7] p-7 text-midnight-blue sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className={`font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Für alle, die gleich umsetzen wollen</p>
              <h2 id="mc-titel" className="mt-3 font-cormorant text-[30px] font-semibold leading-[1.1] sm:text-4xl" style={SERIF}>Masterclass UNVERWECHSELBAR<span className={`block ${GOLD_TEXT}`}>4 Wochen intensiv</span></h2>
              <p className="mt-3 font-inter text-[15px] leading-relaxed text-midnight-blue/80">Du weißt schon jetzt, dass du nicht nur ausprobieren willst, sondern dranbleiben. In der Masterclass gehst du die sieben Schritte in der Tiefe, live mit Claudia, mit Feedback auf deine Videos.</p>
            </div>
            <div className="rounded-[16px] bg-white p-6">
              <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.16em] text-midnight-blue/60">Start</p>
              <p className="mt-1 font-cormorant text-2xl font-bold" style={SERIF}>{START2_LABEL}</p>
              <p className="mt-2 font-inter text-sm text-midnight-blue/75">4 Live-Termine, donnerstags<br />{FRUEH} oder {ABEND}</p>
              <a href="/masterclass" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#13233F] px-7 py-3.5 font-montserrat text-sm font-bold text-white">Masterclass ansehen →</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
