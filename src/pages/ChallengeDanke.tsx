import { useLocation, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

/**
 * Eigene Seite nach dem Eintragen (Claudia, 24.10.2026 20:00: "die Unterseite nach dem Trag dich ein und waehle ...
 * WhatsApp oder Telegram, wo fuehlst du dich wohl"; Webby-Muster: Danke-Seite als eigener Schritt).
 * Gruppen- und Zoom-Links stehen nur hier, deshalb noindex. Der Vorname kommt aus dem Formular (Router-State).
 */
const WHATSAPP = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const TELEGRAM = 'https://t.me/+Tn_rHmElfidjYzcy';
const ZOOM = 'https://us02web.zoom.us/j/3240814498';
const KALENDER = 'https://meet.brevo.com/claudia-conen';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';

/** Wegweiser: die sieben Tagestitel laut Claudias Grafik (23.10.2026), Feedback an Tag 2 und 6, dazu Tag 8. */
const WEG: { tag: string; datum: string; titel: string; zusatz?: string }[] = [
  { tag: 'Start', datum: 'Mo 26.10. · 19 Uhr', titel: 'Auftakt live im Zoom' },
  { tag: 'Tag 1', datum: 'Mo 26.10.', titel: 'Deine Kernbotschaft' },
  { tag: 'Tag 2', datum: 'Di 27.10.', titel: 'Die Zielgruppenbrille', zusatz: 'Wirkungscheck' },
  { tag: 'Tag 3', datum: 'Mi 28.10.', titel: 'Raus aus der Redeangst' },
  { tag: 'Tag 4', datum: 'Do 29.10.', titel: 'Deine Stimme' },
  { tag: 'Tag 5', datum: 'Fr 30.10.', titel: 'Storytelling' },
  { tag: 'Tag 6', datum: 'Sa 31.10.', titel: 'Wie Kunden entscheiden', zusatz: 'Wirkungscheck' },
  { tag: 'Tag 7', datum: 'Mo 2.11. · 19 Uhr', titel: 'Dein Elevator Pitch, live im Zoom' },
  { tag: 'Tag 8', datum: 'Di 3.11.', titel: 'Netzwerken in der Gruppe' },
];

export default function ChallengeDanke() {
  const ort = useLocation();
  const vorname = ((ort.state as { vorname?: string } | null)?.vorname ?? '').trim();
  return (
    <div className="min-h-screen bg-white text-midnight-blue">
      <SEO title="Danke – du bist eingetragen" description="Dein nächster Schritt in der 7-Tage-Challenge: Wähle deine Gruppe bei WhatsApp oder Telegram." path="/challenge/danke" noindex />
      <Navigation hell />

      <header className="bg-[#13233F] pt-28 pb-12 text-pearl-white sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-montserrat text-sm font-extrabold uppercase tracking-[0.18em] text-[#C9A961]">Video-Challenge · eingetragen</p>
          <h1 className="mt-4 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl">Danke{vorname ? `, ${vorname}` : ''} – du bist dabei.</h1>
          <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue sm:text-base ${GOLD}`}>
            Start: Montag, 26. Oktober 2026 · 19 Uhr · live im Zoom
          </p>
        </div>
      </header>

      <section className="py-14 sm:py-20" aria-labelledby="gruppe-titel">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue/70">Schritt 1 · deine Gruppe</p>
          <h2 id="gruppe-titel" className="mt-3 text-center font-montserrat text-3xl font-extrabold sm:text-4xl">Wo fühlst du dich wohl?</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {[
              { name: 'WhatsApp', zusatz: 'empfohlen – dort ist am meisten los', link: WHATSAPP, qr: '/challenge/qr-whatsapp.png', voll: true },
              { name: 'Telegram', zusatz: 'ohne WhatsApp – gleiche Inhalte, gleiches Feedback', link: TELEGRAM, qr: '/challenge/qr-telegram.png', voll: false },
            ].map((g) => (
              <div key={g.name} className={`flex flex-col items-center gap-4 rounded-[12px] border-2 px-6 py-7 text-center ${g.voll ? 'border-[#C9A961]' : 'border-midnight-blue/15'}`}>
                <p className="font-montserrat text-2xl font-extrabold">{g.name}</p>
                <p className="font-inter text-sm text-midnight-blue/75">{g.zusatz}</p>
                <a href={g.link} target="_blank" rel="noopener noreferrer" aria-label={`QR-Code: zur ${g.name}-Gruppe`}>
                  <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-36 w-36 rounded-md bg-white ring-1 ring-midnight-blue/10" />
                </a>
                <a href={g.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold ${g.voll ? `${GOLD} text-midnight-blue` : 'border-2 border-midnight-blue text-midnight-blue hover:bg-midnight-blue hover:text-pearl-white'}`}>
                  Zur {g.name}-Gruppe →
                </a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-inter text-sm text-midnight-blue/65">Am Handy: Knopf antippen. Am Computer: QR-Code mit dem Handy scannen.</p>
        </div>
      </section>

      <section className="bg-pearl-white py-14 sm:py-20" aria-labelledby="zoom-titel">
        <div className="mx-auto grid max-w-4xl items-center gap-6 px-6 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue/70">Schritt 2 · Auftakt</p>
            <h2 id="zoom-titel" className="mt-3 font-montserrat text-2xl font-extrabold sm:text-3xl">Montag, 26. Oktober, 19 Uhr, live im Zoom</h2>
            <p className="mt-2 font-inter text-base">Speichere dir den Link gleich.</p>
          </div>
          <a href={ZOOM} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center rounded-full px-8 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Zoom-Raum</a>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="weg-titel">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue/70">Dein Wegweiser</p>
          <h2 id="weg-titel" className="mt-3 font-montserrat text-2xl font-extrabold sm:text-3xl">Sieben Tage – sieben Schritte.</h2>
          <ol className="mt-8 grid list-none gap-0 border-l-2 border-[#C9A961] p-0 pl-6">
            {WEG.map((w) => (
              <li key={w.tag + w.datum} className="relative py-3">
                <span aria-hidden="true" className="absolute -left-[31px] top-[18px] h-3 w-3 rounded-full bg-[#C9A961]" />
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-midnight-blue/70">{w.tag} · {w.datum}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 font-montserrat text-lg font-extrabold">
                  {w.titel}
                  {w.zusatz && <span className={`rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-midnight-blue ${GOLD}`}>{w.zusatz}</span>}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-inter text-[15px] text-midnight-blue/80">Jeden Tag bis 9 Uhr: Audio-Impuls und Workbook in deiner Gruppe – wahlweise bei WhatsApp oder Telegram. Für dein 1-Minuten-Video hast du 24 Stunden Zeit.</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/challenge#programm" className="font-montserrat text-sm font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4">Die Tage im Detail ansehen</Link>
            <a href={KALENDER} target="_blank" rel="noopener" className="inline-flex items-center rounded-full border-2 border-midnight-blue px-5 py-2.5 font-montserrat text-sm font-bold hover:bg-midnight-blue hover:text-pearl-white">Ruf mich an – zum Kalender →</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
