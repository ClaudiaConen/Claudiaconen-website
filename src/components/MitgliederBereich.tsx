import { useEffect, useRef, useState } from 'react';
import Helix from './Helix';
import NetzwerkTag8 from './NetzwerkTag8';
import { TAGE as TAG_TEXTE } from '../data/challengeTage';

/**
 * Inhalt des Mitgliederbereichs (Seite /mein-bereich, Claudia 25.10.2026 16:21): jeden Morgen um 7 Uhr oeffnet sich
 * ein Tag mit Audio, Erklaerung, Workbook und der Aufforderung, das eigene Video in der Gruppe zu posten.
 * Stil wie community.claudiaconen.com (dunkel, Cormorant-Versalien, Goldrand).
 * PFLEGE: audio = Dateiname in /public/a27/p/mitglieder/audio/, anleitung = Text. Leer = Platzhalter.
 */
export const ZUGANGSCODE = 'WIRKUNG7';
export const BEREICH_SCHLUESSEL = 'mein-bereich-login';

type Tag = { nr: number; titel: string; datum: string; ab: string; audio: string; anleitung: string; feedback?: boolean };

const TAGE: Tag[] = [
  { nr: 1, titel: 'Deine Kernbotschaft', datum: 'Di 27.10.', ab: '2026-10-27T07:00:00+01:00', audio: 'tag1.mp3', anleitung: '' },
  { nr: 2, titel: 'Die Zielgruppenbrille', datum: 'Mi 28.10.', ab: '2026-10-28T07:00:00+01:00', audio: '', anleitung: '', feedback: true },
  { nr: 3, titel: 'Raus aus der Redeangst', datum: 'Do 29.10.', ab: '2026-10-29T07:00:00+01:00', audio: '', anleitung: '' },
  { nr: 4, titel: 'Deine Stimme: Betonung & Pause', datum: 'Fr 30.10.', ab: '2026-10-30T07:00:00+01:00', audio: '', anleitung: '' },
  { nr: 5, titel: 'Storytelling: Der Kunde ist der Held', datum: 'Sa 31.10.', ab: '2026-10-31T07:00:00+01:00', audio: '', anleitung: '' },
  { nr: 6, titel: 'Wie Kunden entscheiden', datum: 'So 1.11.', ab: '2026-11-01T07:00:00+01:00', audio: '', anleitung: '', feedback: true },
  { nr: 7, titel: 'Dein Elevator Pitch', datum: 'Mo 2.11.', ab: '2026-11-02T07:00:00+01:00', audio: '', anleitung: '' },
];

const WHATSAPP = 'https://chat.whatsapp.com/IWSuqZ9ZrMn3dYNgVY1sp6?s=qt&p=i&mlu=4&ilr=4';
const TELEGRAM = 'https://t.me/+Tn_rHmElfidjYzcy';
const ZOOM = 'https://us02web.zoom.us/j/3240814498';
const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const SERIF = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

/** Audio mit animierter Tonspur und Play-Knopf (Claudia 16:22). Ohne Datei: Platzhalter, Spur laeuft ruhig, Knopf ausgegraut. */
function AudioSpur({ datei }: { datei: string }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [laeuft, setLaeuft] = useState(false);
  const balken = Array.from({ length: 28 }, (_, i) => 30 + ((i * 37) % 70));
  function umschalten() {
    const a = ref.current;
    if (!a) return;
    if (a.paused) { void a.play(); } else { a.pause(); }
  }
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={umschalten} disabled={!datei} aria-label={datei ? (laeuft ? 'Audio pausieren' : 'Audio abspielen') : 'Audio folgt'}
        className={`grid h-11 w-11 flex-none place-items-center rounded-full text-midnight-blue ${GOLD} ${datei ? '' : 'opacity-60'}`}>
        {laeuft ? <span className="flex gap-1"><span className="h-4 w-1.5 rounded bg-midnight-blue" /><span className="h-4 w-1.5 rounded bg-midnight-blue" /></span>
          : <span className="ml-0.5 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-midnight-blue" />}
      </button>
      <div className="flex h-10 min-w-0 flex-1 items-center gap-[3px]" aria-hidden="true">
        {balken.map((h, i) => (
          <span key={i} className={`w-[3px] rounded-full bg-[#C9A961] ${laeuft || !datei ? 'cc-spur-an' : ''}`}
            style={{ height: `${h}%`, animationDelay: `${(i % 7) * 0.12}s`, opacity: datei ? 0.95 : 0.45 }} />
        ))}
      </div>
      {!datei && <span className="flex-none font-inter text-xs font-bold text-[#C9A961]">folgt</span>}
      {datei && <audio ref={ref} src={`/a27/p/mitglieder/audio/${datei}`} preload="none" onPlay={() => setLaeuft(true)} onPause={() => setLaeuft(false)} onEnded={() => setLaeuft(false)} />}
    </div>
  );
}

export default function MitgliederBereich({ name, onLogout }: { name?: string; onLogout?: () => void }) {
  // Vorschau fuer Claudia: /mein-bereich?vorschau=alle zeigt alle Tage offen (fuer Teilnehmende nicht verlinkt).
  const vorschau = typeof window !== 'undefined' && /[?&]vorschau=alle/.test(window.location.search);
  const [uhr, setJetzt] = useState(() => Date.now());
  const jetzt = vorschau ? Date.parse('2026-11-03T08:00:00+01:00') : uhr;
  useEffect(() => { const u = window.setInterval(() => setJetzt(Date.now()), 60_000); return () => window.clearInterval(u); }, []);
  const gruss = name && name !== '1' ? `, ${name}` : '';
  const letzterFrei = TAGE.reduce((n, t, i) => (jetzt >= Date.parse(t.ab) ? i : n), -1);

  // DNA-Spur: Sprossen neben die Tage setzen, der Tag in Bildschirmmitte leuchtet (wie auf der Challenge-Seite).
  const listeRef = useRef<HTMLOListElement>(null);
  const [aktiverTag, setAktiverTag] = useState(0);
  const [sprossen, setSprossen] = useState<{ ys: number[]; h: number }>({ ys: [], h: 0 });
  useEffect(() => {
    const liste = listeRef.current;
    if (!liste) return;
    const messen = () => {
      const oben = liste.getBoundingClientRect().top;
      const ys = [...liste.querySelectorAll<HTMLElement>('[data-tag]')].map((z) => {
        const r = z.querySelector('h2')?.getBoundingClientRect() ?? z.getBoundingClientRect();
        return r.top - oben + r.height / 2;
      });
      setSprossen({ ys, h: liste.offsetHeight });
    };
    const pruefen = () => {
      let n = 0;
      liste.querySelectorAll<HTMLElement>('[data-tag]').forEach((z) => { if (z.getBoundingClientRect().top < window.innerHeight * 0.55) n = Number(z.dataset.tag); });
      setAktiverTag(n);
    };
    messen(); pruefen();
    const ro = new ResizeObserver(messen); ro.observe(liste);
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener('scroll', pruefen); };
  }, []);

  return (
    <section id="mitgliederbereich" className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_60%_at_70%_10%,#2A4170_0%,#1A2B4C_45%,#13233F_100%)] pt-32 pb-20 text-pearl-white sm:pt-36" aria-labelledby="bereich-titel">
      <style>{`.cc-mb-licht{animation:ccSchweben 9s ease-in-out infinite}@keyframes ccSchweben{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}
.cc-spur-an{animation:ccSpur 1.1s ease-in-out infinite alternate;transform-origin:center}@keyframes ccSpur{from{transform:scaleY(.35)}to{transform:scaleY(1)}}
@media(prefers-reduced-motion:reduce){.cc-mb-licht,.cc-spur-an{animation:none}}`}</style>
      <span aria-hidden="true" className="cc-mb-licht pointer-events-none absolute left-[6%] top-[14%] h-36 w-36 rounded-full bg-[radial-gradient(circle,#F7E7CE,rgba(201,169,97,0)_70%)] opacity-40" />
      <span aria-hidden="true" className="cc-mb-licht pointer-events-none absolute bottom-[8%] right-[4%] h-48 w-48 rounded-full bg-[radial-gradient(circle,#F7E7CE,rgba(201,169,97,0)_70%)] opacity-30 [animation-delay:-4s]" />
      <div className="relative mx-auto max-w-6xl px-6">
        {onLogout && (
          <div className="mb-6 flex justify-end">
            <button type="button" onClick={onLogout} className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-pearl-white/60 underline decoration-[#C9A961]/50 underline-offset-4 transition-colors hover:text-pearl-white">Ausloggen</button>
          </div>
        )}
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.26em] text-[#C9A961]"><span className="h-px w-10 bg-[#C9A961]" />Dein Mitgliederbereich<span className="h-px w-10 bg-[#C9A961]" /></p>
          <h1 id="bereich-titel" className="mt-6 text-[29px] font-semibold uppercase leading-[1.08] tracking-[0.02em] text-white min-[420px]:text-4xl sm:text-6xl sm:tracking-[0.06em]" style={SERIF}>
            Willkommen{gruss}
            <span className="mt-2 block whitespace-nowrap bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)] bg-clip-text text-transparent" style={{ fontSize: "min(1em, calc((100vw - 56px) / 10.6))" }}>Unverwechselbar</span>
          </h1>
          <p className="mt-4 text-xl italic text-[#F7E7CE] sm:text-2xl" style={SERIF}>Nutze die Inhalte für deine Unverwechselbarkeit im KI-Zeitalter.</p>
          <p className="mt-2 font-inter text-sm text-pearl-white/75">Jeden Morgen um 7 Uhr öffnet sich dein nächster Schritt.</p>
        </div>

        {/* Einstiegs-Workbook (Tag 0): ganz oben, getrennt von den Tagen – fuer den Start heute Abend/Zoom (Claudia/Anke 26.10.2026). */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-[18px] border-2 border-[#C9A961]/70 bg-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#C9A961]">Hier beginnst du</p>
            <b className="mt-1 block font-montserrat text-lg font-extrabold text-white">Dein Einstiegs-Workbook</b>
            <span className="font-inter text-sm text-pearl-white/75">Der Überblick, der Ablauf und dein Vorher-Video – dein Einstieg für den Start heute Abend. Lad es dir herunter und leg direkt los.</span>
          </div>
          <a href="/a27/p/mitglieder/workbooks/Workbook_Tag0_Starter.pdf" download className={`inline-flex flex-none items-center rounded-full px-6 py-3 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Einstiegs-Workbook herunterladen (PDF)</a>
        </div>

        {/* Ueberblick wie auf der Startseite: drei klare Kacheln */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { sym: '♪', titel: 'Hören', text: 'Dein Audio-Impuls für den Tag' },
            { sym: '↓', titel: 'Üben', text: 'Erklärung und Workbook zum Herunterladen' },
            { sym: '▶', titel: 'Zeigen', text: 'Dein Video in der Gruppe posten' },
          ].map((k) => (
            <div key={k.titel} className="flex items-center gap-4 rounded-[16px] border border-[#C9A961]/35 bg-white/[0.04] p-5">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-[#C9A961]/70 text-xl font-bold text-[#C9A961]">{k.sym}</span>
              <span><b className="block font-montserrat text-lg font-extrabold text-white">{k.titel}</b><span className="font-inter text-sm text-pearl-white/75">{k.text}</span></span>
            </div>
          ))}
        </div>

        {/* Starter-Workbook (Tag 0): sofort verfügbar, zum Loslegen (Anke 26.10.2026). */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-[18px] border border-[#C9A961]/50 bg-white/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#C9A961]">Dein Start</p>
            <b className="mt-1 block font-montserrat text-lg font-extrabold text-white">Starter-Workbook</b>
            <span className="font-inter text-sm text-pearl-white/75">Überblick, Ablauf und dein Vorher-Video. Lad es dir jetzt herunter und leg direkt los.</span>
          </div>
          <a href="/a27/p/mitglieder/workbooks/Workbook_Tag0_Starter.pdf" download className={`inline-flex flex-none items-center rounded-full px-6 py-3 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Starter-Workbook herunterladen (PDF)</a>
        </div>

        {/* Ablauf wie auf der Challenge-Seite: goldene DNA-Spur links, die Tage rechts (Claudia 25.10.2026 16:28). */}
        <div className="mt-12 grid items-start gap-6 md:grid-cols-[140px_minmax(0,1fr)]">
          <Helix aktiv={aktiverTag} ys={sprossen.ys} hoehe={sprossen.h} />
          <ol ref={listeRef} className="grid list-none gap-5 p-0">
          {TAGE.map((t, i) => {
            const frei = jetzt >= Date.parse(t.ab);
            const text = TAG_TEXTE[i];
            return (
              <li key={t.nr} data-tag={i}>
                {/* Zum Aufklappen wie auf der Challenge-Seite (Claudia 25.10.2026 16:59); der aktuelle Tag ist offen. */}
                <details open={i === letzterFrei} className={`group overflow-hidden rounded-[18px] border bg-[linear-gradient(180deg,#1E3257,#13233F)] shadow-[0_22px_44px_-28px_rgba(0,0,0,0.7)] transition-[border-color] duration-300 ${frei ? 'border-[#C9A961]/60' : 'border-[#C9A961]/25'} ${i === aktiverTag ? 'md:border-[#C9A961]' : ''}`}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
                    <img src={`/a27/p/mitglieder/bilder/tag${t.nr}.webp`} alt="" width={640} height={906} loading="lazy" className={`h-[72px] w-[51px] flex-none rounded-md object-cover ${frei ? '' : 'blur-[1px] brightness-75'}`} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 font-inter text-[11px] font-black uppercase tracking-[0.12em] text-midnight-blue ${GOLD}`}>Tag {t.nr}</span>
                        {t.feedback && <span className="rounded-full bg-[#F28C3A] px-3 py-1 font-inter text-[11px] font-black uppercase tracking-[0.12em] text-midnight-blue">Feedback</span>}
                        <span className="font-inter text-xs font-bold uppercase tracking-[0.08em] text-[#C9A961]">{t.datum}</span>
                      </span>
                      <h2 className="mt-1.5 font-montserrat text-lg font-extrabold leading-snug text-white">{t.titel}</h2>
                      <span className="font-inter text-xs text-pearl-white/70">{frei ? 'Offen · antippen zum Öffnen' : `Öffnet am ${t.datum} um ${Number(t.ab.slice(11, 13))} Uhr`}</span>
                    </span>
                    <span aria-hidden="true" className="grid h-9 w-9 flex-none place-items-center rounded-full border border-[#C9A961]/60 text-[#C9A961] transition-transform duration-300 group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="grid gap-4 border-t border-white/10 p-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-5">
                    <div className="relative self-start overflow-hidden rounded-xl bg-[#13233F]">
                      <img src={`/a27/p/mitglieder/bilder/tag${t.nr}.webp`} alt={`Workbook Tag ${t.nr}: ${t.titel}`} width={640} height={906} loading="lazy"
                        className={`aspect-[640/906] w-full object-contain ${frei ? '' : 'blur-[2px] brightness-75'}`} />
                    </div>
                    {frei ? (
                      <div className="grid content-start gap-2 font-inter text-sm">
                        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3"><b className="mb-2 block text-white">Dein Audio</b><AudioSpur datei={t.audio} /></div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3"><b className="block text-white">Deine Erklärung</b>
                          {t.anleitung ? <span className="text-pearl-white/80">{t.anleitung}</span> : text ? (
                            <span className="grid gap-1.5 text-pearl-white/85">
                              <span className="italic text-[#F7E7CE]">„{text.einstieg}“</span>
                              <span>{text.inhalt}</span>
                              <span><b className="text-white">Deine Aufgabe:</b> {text.aufgabe}</span>
                              {text.zusatz && <span className="text-pearl-white/75">{text.zusatz}</span>}
                              <span><b className="text-white">Zum Nachdenken:</b> {text.reflexion}</span>
                            </span>
                          ) : <span className="text-[#C9A961]">folgt heute</span>}
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3"><b className="block text-white">Dein Workbook</b><a href={`/a27/p/mitglieder/workbooks/Workbook_Tag${t.nr}.pdf`} download className="font-bold text-[#F7E7CE] underline decoration-[#C9A961] underline-offset-2">Herunterladen (PDF)</a></div>
                        <div className="rounded-xl border border-[#F28C3A]/60 bg-[#F28C3A]/10 p-3"><b className="block text-white">Dein Video</b><span className="text-pearl-white/85">Nimm dein 1-Minuten-Video auf und poste es in deiner Gruppe.</span>
                          <span className="mt-2 flex flex-wrap gap-2"><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-3 py-1.5 font-bold text-midnight-blue">WhatsApp →</a><a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/40 px-3 py-1.5 font-bold text-white">Telegram →</a></span></div>
                      </div>
                    ) : (
                      <p className="font-inter text-sm leading-relaxed text-pearl-white/70">Audio, Erklärung, Workbook und dein Video-Auftrag öffnen sich am {t.datum} um {Number(t.ab.slice(11, 13))} Uhr.</p>
                    )}
                  </div>
                </details>
              </li>
            );
          })}
          </ol>
        </div>

        <NetzwerkTag8 jetzt={jetzt} />

        <div className="mt-14 grid gap-6 rounded-[20px] border border-[#C9A961]/40 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0">
            <h2 className="font-montserrat text-2xl font-extrabold text-white">Deine Gruppe</h2>
            <p className="mt-2 font-inter text-[15px] leading-relaxed text-pearl-white/80">Dort laufen Austausch, Feedback und eure Videos.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: 'WhatsApp', zusatz: 'empfohlen', link: WHATSAPP, qr: '/challenge/qr-whatsapp.png' },
                { name: 'Telegram', zusatz: 'ohne WhatsApp', link: TELEGRAM, qr: '/challenge/qr-telegram.png' },
              ].map((g) => (
                <a key={g.name} href={g.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[14px] bg-white p-3 text-midnight-blue transition-transform hover:-translate-y-0.5">
                  <img src={g.qr} alt={`QR-Code ${g.name}-Gruppe`} width={328} height={328} className="h-16 w-16 flex-none rounded-md" />
                  <span><b className="block font-montserrat font-extrabold">{g.name}</b><small className="font-inter text-xs text-midnight-blue/70">{g.zusatz}</small><span className="block font-inter text-[13px] font-bold underline decoration-[#C9A961] underline-offset-2">Zur Gruppe →</span></span>
                </a>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <ul className="grid gap-3 font-inter text-[15px]">
              <li className="rounded-xl border border-[#C9A961]/40 px-4 py-3"><b className="text-[#F7E7CE]">Mo 26. Oktober, 19 Uhr</b><br />Live-Start im Zoom</li>
              <li className="rounded-xl border border-[#C9A961]/40 px-4 py-3"><b className="text-[#F7E7CE]">Mo 2. November, 19 Uhr</b><br />Dein Pitch, live im Zoom</li>
            </ul>
            <a href={ZOOM} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zum Zoom-Raum</a>
          </div>
        </div>
          {/* Zu den drei Wegen / Abkuerzung (Anke 26.10.2026) */}
          <div className="mt-16 rounded-[18px] border border-[#C9A961]/50 bg-white/[0.05] p-6 text-center">
            <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#C9A961]">Dein nächster Schritt</p>
            <p className="mt-2 font-inter text-pearl-white/85">Du brauchst eine Abkürzung? Dann hier entlang.</p>
            <a href="/3-wege" className={`mt-4 inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>Zu den drei Wegen →</a>
          </div>
      </div>
    </section>
  );
}
