import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Helix from '../components/Helix';
import { TAGE as TAGE_DATEN } from '../data/challengeTage';
import { START2_LABEL, FRUEH, ABEND } from '../data/masterclassDaten';

/**
 * Danke-Seite nach dem Bestätigen – im Stil der Challenge-Seite (Claudia, 22.11.2026 18:39: "noch hässlich ... wie bei der
 * Webseite die schöne DNA-Welle und die Inhalte klar so schön wie sie da sind und oben ein Bild von mir wie überall").
 * Drei Schritte: Mitgliederbereich, Zoom, Gruppe (Claudia, 22.11.2026 17:43). Hell: Weiß + #F5F5F7, Dunkelblau als Schrift, Gold sparsam.
 * Gruppen- und Zoom-Link stehen nur hier, deshalb noindex. Der Vorname kommt aus dem Formular (Router-State), falls vorhanden.
 */
const WHATSAPP = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const TELEGRAM = 'https://t.me/+Tn_rHmElfidjYzcy';
const ZOOM = 'https://us02web.zoom.us/j/3240814498';
const MITGLIEDER = 'https://community.claudiaconen.com/community/s/challenge-tage';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const GOLD_TEXT = 'text-[#A8894A]';
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const KACHEL = 'rounded-[12px] border border-[#13233F]/[0.13] bg-white';
/** Tripwire „Unverwechselbar PLUS" (47 €) – Stripe Payment-Link (Claudia, 09.11.2026). */
const PLUS_LINK = 'https://buy.stripe.com/dRmcN57E4bSU1jO7rq3oA04';
const PLUS_INHALT = [
  '3 Monate exklusiver Zugang zu den wertvollen Challenge-Inhalten',
  '7 Workbooks und 7 Audios',
  '3 persönliche Feedbacks von Claudia',
  '3 Monate kostenfreie Mitgliedschaft in der Community',
];
/** Die sieben Tage wie in den Mails und im Event-Bild (Claudia, 22.11.2026); Icons von der Challenge-Seite. */
const TAGE = [
  { titel: 'Deine Kernbotschaft', datum: 'Mo., 7. Dez.', text: 'Positionierung in einem Satz', live: true },
  { titel: 'Die Zielgruppenbrille', datum: 'Di., 8. Dez.', text: 'Dein Video mit Kundenaugen', feedback: true },
  { titel: 'Raus aus der Redeangst', datum: 'Mi., 9. Dez.', text: 'Auch vor der Kamera: Stand, Atem, Hände', live: true },
  { titel: 'Deine Stimme', datum: 'Do., 10. Dez.', text: 'Betonung und Pausen' },
  { titel: 'Storytelling', datum: 'Fr., 11. Dez.', text: 'Der Kunde ist der Held' },
  { titel: 'Wie Kunden entscheiden', datum: 'Mo., 14. Dez.', text: 'Zuhören und Call to Action', live: true, feedback: true },
  { titel: 'Dein Elevator Pitch', datum: 'Di., 15. Dez.', text: 'Alles in drei Sätzen' },
].map((t, i) => ({ ...t, icon: TAGE_DATEN[i]?.icon ?? 'schritt-1' }));

function Kicker({ text, mitte }: { text: string; mitte?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#13233F] ${mitte ? 'justify-center' : ''}`}>
      <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

export default function ChallengeDanke() {
  const ort = useLocation();
  // Kein Zugangs-Schutz (Claudia, 22.11.2026): Beim Double-Opt-in kommt man ERST über den Bestätigungslink hierher.
  const zustand = (ort.state || {}) as { vorname?: string };
  const name = zustand.vorname?.trim();

  // DNA-Welle neben den sieben Tagen: Sprossen auf Höhe der Zeilen, der Tag in der Bildschirmmitte leuchtet (wie /challenge).
  const tageRef = useRef<HTMLOListElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const [sprossen, setSprossen] = useState<{ ys: number[]; h: number }>({ ys: [], h: 0 });
  useEffect(() => {
    const liste = tageRef.current;
    if (!liste) return;
    const messen = () => {
      const oben = liste.getBoundingClientRect().top;
      const ys = [...liste.querySelectorAll<HTMLElement>('[data-tag]')].map((z) => { const r = z.getBoundingClientRect(); return r.top - oben + r.height / 2; });
      setSprossen({ ys, h: liste.offsetHeight });
    };
    const pruefen = () => {
      let n = 0;
      liste.querySelectorAll<HTMLElement>('[data-tag]').forEach((z) => { if (z.getBoundingClientRect().top < window.innerHeight * 0.55) n = Number(z.dataset.tag); });
      setAktiv(n);
    };
    messen(); pruefen();
    const ro = new ResizeObserver(messen); ro.observe(liste);
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', pruefen); };
  }, []);

  const foto = (
    <figure className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[16px] shadow-[0_24px_50px_-28px_rgba(19,35,63,0.6)]">
      <img src="/a27/p/ueber-claudia/erfahrung.webp" alt="Claudia Conen im dunkelblauen Blazer, lächelnd" width={900} height={1350} decoding="async" className="aspect-[4/5] w-full object-cover object-top" />
    </figure>
  );

  return (
    <div className="cc-2027 min-h-screen bg-white text-[#13233F]">
      <SEO title="Du bist dabei" description="Deine nächsten Schritte in der 7-Tage-Challenge UNVERWECHSELBAR." path="/challenge/danke" noindex />
      <Navigation hell />

      {/* Kopf wie auf der Challenge-Seite: links Text, rechts Claudias Foto (Handy: Foto unter der Überschrift). */}
      <header className="bg-white pt-36 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[minmax(0,1fr)_340px] md:gap-16">
          <div className="min-w-0">
            <span aria-hidden="true" className={`block h-[3px] w-16 rounded-full ${GOLD}`} />
            <p className="mt-5 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] sm:text-sm">7 Tage UNVERWECHSELBAR · kostenfrei</p>
            <h1 className="mt-3 font-montserrat text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              Du bist dabei{name ? `, ${name}` : ''}.
              <span className="block text-[#A8894A]">Es geht los.</span>
            </h1>
            <div className="mt-7 md:hidden">{foto}</div>
            <p className="mt-6 max-w-xl font-inter text-lg leading-relaxed text-[#13233F]/85">Drei kleine Schritte, dann bist du startklar. Ab dem 7. Dezember öffnet sich jeden Morgen um 5 Uhr eine neue Tür.</p>
            <p className="mt-6 whitespace-pre-line border-l-4 border-[#C9A961] pl-4 font-montserrat text-lg font-extrabold uppercase leading-snug tracking-[0.04em] sm:text-2xl">{'Start: Montag, 7. Dezember 2026\n18:18 Uhr · live im Zoom'}</p>
            <a href="#schritte" className={`mt-7 inline-flex items-center rounded-full px-8 py-4 font-montserrat text-base font-extrabold text-[#13233F] shadow-[0_10px_24px_-12px_rgba(19,35,63,0.45)] transition-transform hover:-translate-y-px ${GOLD}`}>Zu deinen 3 Schritten ↓</a>
          </div>
          <div className="hidden md:block">{foto}</div>
        </div>
      </header>

      {/* Die drei Schritte (Claudia, 22.11.2026 17:43: 1 Mitgliederbereich, 2 Zoom-Link, 3 Gruppe). */}
      <section id="schritte" className="scroll-mt-24 bg-[#F5F5F7] py-14 sm:py-16" aria-labelledby="schritte-titel">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker text="Deine nächsten Schritte" />
          <h2 id="schritte-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Drei Schritte – dann bist du startklar.</h2>
          <ol className="mt-8 grid list-none gap-5 p-0 lg:grid-cols-3">
            <li className={`${KACHEL} border-2 border-[#C9A961] p-6 shadow-[0_14px_34px_-18px_rgba(201,169,97,0.75)]`}>
              <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 1</p>
              <h3 className="mt-2 font-montserrat text-xl font-extrabold">Dein Mitgliederbereich</h3>
              <p className="mt-2 font-inter text-[15px] leading-relaxed text-[#13233F]/80">Täglich um 5 Uhr öffnet sich dort eine neue Tür, mit Audio-Impuls und Workbook. An manchen Tagen erwartet dich dort ein persönliches Feedback.</p>
              <a href={MITGLIEDER} className={`mt-5 inline-flex items-center rounded-full px-7 py-3.5 font-montserrat text-sm font-bold text-[#13233F] ${GOLD}`}>Zum Mitgliederbereich →</a>
            </li>
            <li className={`${KACHEL} p-6`}>
              <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 2</p>
              <h3 className="mt-2 font-montserrat text-xl font-extrabold">Speichere den Zoom-Link</h3>
              <div className="mt-3 grid gap-2">
                {['Mo 7. Dez.', 'Mi 9. Dez.', 'Mo 14. Dez.'].map((t) => (
                  <a key={t} href={ZOOM} target="_blank" rel="noopener noreferrer" className="block rounded-md bg-[#FF7A00] px-3 py-2 font-montserrat text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">{t} · 18:18–19:48 Uhr →</a>
                ))}
              </div>
              <p className="mt-3 font-inter text-[15px] text-[#13233F]/80">Deine 3 Live-Termine, je 90 Minuten. Immer derselbe Zoom-Raum.</p>
              <a href={ZOOM} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center rounded-full bg-[#13233F] px-7 py-3.5 font-montserrat text-sm font-bold text-white">Zum Zoom-Raum</a>
            </li>
            <li className={`${KACHEL} p-6`}>
              <p className={`font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Schritt 3</p>
              <h3 className="mt-2 font-montserrat text-xl font-extrabold">Tritt deiner Gruppe bei</h3>
              <p className="mt-2 font-inter text-[15px] font-semibold leading-relaxed">Wähle deine Gruppe, wenn du die Audios von Claudia auch in WhatsApp oder Telegram hören willst.</p>
              <p className="mt-2 font-inter text-sm leading-relaxed text-[#13233F]/75">Am Handy antippen, am Computer den QR-Code scannen. Ohne WhatsApp und Telegram? Auch das geht: Die ganze Challenge läuft auch ausschließlich im Mitgliederbereich (Schritt 1).</p>
              <div className="mt-4 grid gap-3">
                {[
                  { name: 'WhatsApp', zusatz: 'empfohlen', link: WHATSAPP, qr: '/challenge/qr-whatsapp.png' },
                  { name: 'Telegram', zusatz: 'ohne WhatsApp', link: TELEGRAM, qr: '/challenge/qr-telegram.png' },
                ].map((g) => (
                  <a key={g.name} href={g.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[12px] border border-[#E4E6EC] bg-white p-3 transition-transform hover:-translate-y-0.5">
                    <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-16 w-16 flex-none rounded-md" />
                    <span><b className="block font-montserrat font-extrabold">{g.name}</b><small className="font-inter text-xs text-[#13233F]/70">{g.zusatz}</small><span className="block font-inter text-[13px] font-bold underline decoration-[#C9A961] underline-offset-2">Zur Gruppe →</span></span>
                  </a>
                ))}
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Claudias Text (22.11.2026 17:43). */}
      <section className="bg-white py-14 sm:py-20" aria-labelledby="ziel-titel">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Kicker text="Starte 2027 glasklar" mitte />
          <h2 id="ziel-titel" className="mt-5 font-montserrat text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Was macht dich 2027
            <span className="block text-[#A8894A]">unverwechselbar?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-relaxed text-[#13233F]/85 sm:text-xl">Und wie gewinnst du das Vertrauen deiner potenziellen Kunden? Perfektion ist klickbar. Persönlichkeit weckt Vertrauen. Heb dich aus der Masse der Angebote heraus: authentisch, echt, vertrauenswürdig.</p>
          <p className="mx-auto mt-8 max-w-2xl font-cormorant text-2xl italic sm:text-3xl" style={SERIF}>„Weil du dir selbst vertraust, vertrauen dir auch deine Kunden.“</p>
          <p className={`mt-2 font-montserrat text-sm font-bold ${GOLD_TEXT}`}>Claudia</p>
        </div>
      </section>

      {/* Die sieben Tage mit der DNA-Welle wie auf /challenge (Claudia, 22.11.2026 18:39). */}
      <section className="bg-[#F5F5F7] py-14 sm:py-16" aria-labelledby="tage-titel">
        <div className="mx-auto max-w-5xl px-6">
          <Kicker text="Dein Wegweiser" />
          <h2 id="tage-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Sieben Tage – sieben Schritte.</h2>
          <p className="mt-3 max-w-2xl font-inter text-[15px] leading-relaxed text-[#13233F]/80">Jeden Morgen um 5 Uhr öffnet sich im Mitgliederbereich eine neue Tür: dein Audio-Impuls und dein Workbook.</p>
          <div className="mt-8 grid grid-cols-[64px_minmax(0,1fr)] items-start gap-3 sm:gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
            <div className="md:hidden"><Helix aktiv={aktiv} ys={sprossen.ys} hoehe={sprossen.h} immer breite={64} /></div>
            <div className="hidden md:block"><Helix aktiv={aktiv} ys={sprossen.ys} hoehe={sprossen.h} /></div>
            <ol ref={tageRef} className="grid list-none content-start gap-3 p-0">
              {TAGE.map((t, i) => (
                <li key={t.titel} data-tag={i} className={`${KACHEL} flex items-start gap-3 px-4 py-4 transition-[border-color,box-shadow] duration-500 sm:gap-5 sm:px-6 ${i === aktiv ? 'border-[#C9A961] shadow-[0_14px_34px_-18px_rgba(201,169,97,0.75)]' : ''}`}>
                  <img src={`/icons/${t.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="mt-0.5 h-10 w-10 flex-none sm:h-12 sm:w-12" />
                  <div className="min-w-0">
                    <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.12em] text-[#13233F]/65">
                      Tag {i + 1} · {t.datum}
                      {t.live && <span className="ml-1 text-[#FF7A00]">· 18:18 Uhr live</span>}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 font-montserrat text-lg font-extrabold leading-snug">
                      {t.titel}
                      {t.feedback && <span className={`rounded-md px-2 py-1 font-montserrat text-[10px] font-black uppercase tracking-[0.14em] text-[#13233F] ${GOLD}`}>Feedback</span>}
                    </p>
                    <p className="mt-0.5 font-inter text-[15px] text-[#13233F]/75">{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 grid items-center gap-6 sm:grid-cols-[220px_minmax(0,1fr)]">
            <img src="/challenge/sieben-workbooks.webp" alt="Die sieben Workbooks der Challenge" width={600} height={400} loading="lazy" decoding="async" className="mx-auto w-56 sm:w-full" />
            <div className="min-w-0">
              <p className="font-montserrat text-lg font-extrabold">Sieben Workbooks, sieben Audios.</p>
              <p className="mt-1 font-inter text-[15px] leading-relaxed text-[#13233F]/80">Für jeden Tag ein Workbook und ein Audio-Impuls von Claudia, im Mitgliederbereich und auf Wunsch in deiner Gruppe.</p>
              <a href={MITGLIEDER} className="mt-4 inline-flex items-center font-montserrat text-sm font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4">Zum Mitgliederbereich →</a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        {/* VIP-Fassung der Challenge (Claudia, 22.11.2026). Kein "einmaliges Angebot", kein "statt 97 €". */}
        <section aria-labelledby="plus-titel" className="mt-16">
          <div className="rounded-[22px] border-2 border-[#C9A961] bg-white p-7 shadow-[0_24px_60px_-34px_rgba(19,35,63,0.45)] sm:p-10">
            <p className={`inline-flex items-center gap-2 rounded-full border border-[#C9A961] px-3 py-1 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.18em] ${GOLD_TEXT}`}>Für dich allein</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h2 id="plus-titel" className="font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
                  Die Challenge als VIP:
                  <span className={`block ${GOLD_TEXT}`}>Unverwechselbar PLUS</span>
                </h2>
                <p className="mt-3 font-inter text-[15px] leading-relaxed text-[#13233F]/80">Du willst die Challenge für dich allein durchgehen und dir alle Inhalte sichern? Dann ist das dein Weg: ohne Gruppe, ohne festen Termin, in deinem Tempo.</p>
                <ul className="mt-5 grid gap-2.5">
                  {PLUS_INHALT.map((z) => (
                    <li key={z} className="flex items-start gap-3 font-inter text-[15px] text-[#13233F]/90">
                      <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#C9A961] text-[12px] font-black text-white">✓</span>
                      {z}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[16px] bg-[#F5F5F7] p-6 text-center">
                <p className="font-inter text-xs uppercase tracking-[0.16em] text-[#13233F]/60">VIP-Zugang</p>
                <p className="mt-1 font-montserrat text-5xl font-extrabold">47 €</p>
                <a href={PLUS_LINK} target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-7 py-4 font-montserrat text-sm font-extrabold text-[#13233F] ${GOLD}`}>VIP-Zugang sichern →</a>
                <p className="mt-3 font-inter text-xs text-[#13233F]/60">Sichere Zahlung über Stripe · danach geht es direkt weiter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Masterclass als zweites Fenster (Claudia, 22.11.2026). Daten aus masterclassDaten. */}
        <section aria-labelledby="mc-titel" className="mt-8">
          <div className="grid gap-6 rounded-[22px] bg-[#F5F5F7] p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className={`font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] ${GOLD_TEXT}`}>Für alle, die gleich umsetzen wollen</p>
              <h2 id="mc-titel" className="mt-3 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Masterclass UNVERWECHSELBAR<span className={`block ${GOLD_TEXT}`}>4 Wochen intensiv</span></h2>
              <p className="mt-3 font-inter text-[15px] leading-relaxed text-[#13233F]/80">Du weißt schon jetzt, dass du nicht nur ausprobieren willst, sondern dranbleiben. In der Masterclass gehst du die sieben Schritte in der Tiefe, live mit Claudia, mit Feedback auf deine Videos.</p>
            </div>
            <div className="rounded-[16px] bg-white p-6">
              <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.16em] text-[#13233F]/60">Start</p>
              <p className="mt-1 font-montserrat text-xl font-extrabold">{START2_LABEL}</p>
              <p className="mt-2 font-inter text-sm text-[#13233F]/75">4 Live-Termine, donnerstags<br />{FRUEH} oder {ABEND}</p>
              <a href="/masterclass" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#13233F] px-7 py-3.5 font-montserrat text-sm font-bold text-white">Masterclass ansehen →</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
