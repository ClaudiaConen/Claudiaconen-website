import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * Die sieben Schritte - als ruhige Treppe.
 *
 * Neu gebaut am 21.09.2026, nachdem Claudia den Bereich "so nicht" fand.
 * Vorher: 21 Endlos-Animationen gleichzeitig (pulsierende Symbole, pulsierende
 * Zahlen, rotierende Ringe), am Handy lief der goldene Strich mitten durch die
 * Kacheln, die Symbole passten nicht zum Inhalt, und "Sprich mit mir" zeigte
 * auf #offers - einen Anker, den es auf der Startseite nicht gibt.
 *
 * Jetzt:
 *   - EIN Strich links, der sich beim Scrollen mit Gold fuellt (nur transform,
 *     kein Layout) - die einzige Bewegung im ganzen Abschnitt.
 *   - Zahlen statt Symbole.
 *   - Glasflaechen statt dunkler Kaesten (ihr Wunsch vom 21.09.).
 *   - Am Rechner bleibt die Ueberschrift links stehen, rechts ziehen die
 *     Schritte vorbei. FALLE: Der Abschnitt darf dafuer kein overflow-hidden
 *     haben, sonst faellt "sticky" lautlos aus - deshalb overflow-clip.
 *
 * CLAUDIAS TEXTE SIND UNVERAENDERT (titel, kurz, lang). Der lange Text steht
 * eingeklappt im HTML und bleibt damit fuer Suchmaschinen und KI lesbar.
 *
 * TON: 'hell' oder 'dunkel' - eine Zeile, Claudia hat in der Vorschau gewaehlt.
 */
const TON: 'hell' | 'dunkel' = 'hell';

const FARBEN = {
  hell: {
    abschnitt: 'bg-pearl-white text-midnight-blue',
    leise: 'text-midnight-blue/70',
    auge: 'text-[#8A6508]',
    glas: 'border-white/90 bg-white/60 shadow-[0_0_0_1px_rgba(10,22,40,0.08),0_24px_50px_-34px_rgba(10,22,40,0.45)]',
    spur: 'bg-dark-gold/25',
    marke: 'border-dark-gold/30 bg-white text-midnight-blue/60',
    mehr: 'text-[#8A6508] hover:text-dark-gold',
    fleckOben: 'bg-luxury-gold/30',
    fleckUnten: 'bg-royal-navy/20',
  },
  dunkel: {
    abschnitt: 'bg-midnight-blue text-pearl-white',
    leise: 'text-pearl-white/70',
    auge: 'text-bright-gold',
    glas: 'border-white/15 bg-white/[0.07] shadow-[0_24px_50px_-34px_rgba(0,0,0,0.6)]',
    spur: 'bg-luxury-gold/25',
    marke: 'border-luxury-gold/30 bg-[#0F1F3A] text-pearl-white/70',
    mehr: 'text-bright-gold hover:text-luxury-gold',
    fleckOben: 'bg-luxury-gold/20',
    fleckUnten: 'bg-[#3C5FAA]/30',
  },
} as const;

const SCHRITTE = [
  {
    titel: 'KI spart Zeit. Du gibst ihr Bedeutung.',
    kurz: 'Sie berechnet blitzschnell – du berührst bleibend.',
    lang: 'Sie berechnet blitzschnell – du berührst bleibend.\nSie schenkt dir Zeit – damit du sie mit Menschen teilst.\nKI kann Daten verarbeiten – du kannst Verbindung schaffen.\nUnd genau darin liegt Wirkungskraft:\nPerfektion klickt. Persönlichkeit bleibt.',
  },
  {
    titel: 'Entdecke was Menschen bewegt – bevor sie entscheiden.',
    kurz: 'Verstehen, was Menschen bewegt – bevor sie entscheiden.',
    lang: 'Verstehen, was Menschen bewegt – bevor sie entscheiden.\nDas Gefühl ist da, bevor der Gedanke es einholt.\nWenn du weißt, wie Vertrauen entsteht, berührst du Menschen tiefer, als Worte je können.',
  },
  {
    titel: 'Jede Wirkung beginnt mit einer Geschichte – deiner.',
    kurz: 'Selbsterkenntnis ist der Schlüssel zu Wirkungskraft.',
    lang: 'Selbsterkenntnis ist der Schlüssel zu Wirkungskraft.\nWer seine Berufung lebt und seine Persönlichkeit klar positioniert, wird unverwechselbar – im Business und im Leben. Nutze deine Einzigartigkeit.',
  },
  {
    titel: 'Klarheit verkauft. Storytelling verbindet.',
    kurz: 'Der Elevator Pitch zeigt, wer du bist – und warum Menschen dir zuhören.',
    lang: 'Der Elevator Pitch zeigt, wer du bist – und warum Menschen dir zuhören.\nEine Geschichte erreicht Menschen schneller als eine Aufzählung,\nweil Bilder Emotionen auslösen und im Gedächtnis bleiben.\nOb auf Social Media, im Kundengespräch oder live auf der Bühne:\nFrag dich: Welche Emotion willst du wecken – und was sollen Menschen fühlen, denken oder tun?',
  },
  {
    titel: 'Du wirkst, bevor du sprichst.',
    kurz: 'Deine Geschichte, dein Erlebtes – sie sind dein unverwechselbarer Klang.',
    lang: 'Von Selbsterkenntnis zu Wirkungskraft – durch Haltung, Persönlichkeit, Stimme und Blick.\nDeine Geschichte, dein Erlebtes – sie sind dein unverwechselbarer Klang.\nRhetorik ist nicht das Spiel mit Worten, sondern die Kunst, echt zu wirken.\nWenn Stimme, Körpersprache und Worte dieselbe Sprache sprechen,\nentsteht Charisma – und die unsichtbare Brücke vom Ohr, über den Kopf, direkt ins Herz',
  },
  {
    titel: 'Werde zum Privatdetektiv deiner Wirkung.',
    kurz: 'Menschen entscheiden mit dem Herzen, lange bevor der Verstand folgt.',
    lang: 'Worte sind unaufhaltbar. Beobachte, was du im anderen auslöst – und welche Energie du sendest, wenn du sprichst.\nMenschen sind emotionale Wesen – sie entscheiden mit dem Herzen, lange bevor der Verstand folgt.\nDeine Worte können begeistern, motivieren, trösten, faszinieren oder verletzen.\nSie können Vertrauen schaffen – oder zerstören.\nNutze die unsichtbare Brücke:\nvom Ohr über den Kopf direkt ins Herz.',
  },
  {
    titel: 'Unverwechselbar DU. Nicht ersetzbar.',
    kurz: 'Bleib das, was kein Algorithmus je sein kann – ein Original.',
    lang: 'Bleib das, was kein Algorithmus je sein kann – ein Original.\nNutze die 7 Schritte zu echter Wirkung.\nPerfektion klickt. Persönlichkeit bleibt.',
  },
];

export default function Timeline() {
  const f = FARBEN[TON];
  const treppe = useRef<HTMLDivElement>(null);
  const [erreicht, setErreicht] = useState(0);

  // Der Strich fuellt sich, waehrend die Treppe an der Bildschirmmitte vorbeizieht.
  const { scrollYProgress } = useScroll({ target: treppe, offset: ['start 55%', 'end 55%'] });

  // Neu gerechnet wird nur, wenn ein weiterer Schritt erreicht ist - nicht bei jedem Pixel.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(SCHRITTE.length - 1, Math.floor(p * (SCHRITTE.length - 1) + 0.15));
    setErreicht((vorher) => (vorher === i ? vorher : i));
  });

  return (
    <section
      id="methode"
      className={`relative scroll-mt-24 overflow-clip px-4 py-14 sm:px-6 md:py-24 lg:px-8 ${f.abschnitt}`}
      aria-labelledby="timeline-headline"
    >
      <div aria-hidden="true" className={`pointer-events-none absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full blur-[70px] ${f.fleckOben}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -bottom-44 -left-56 h-[560px] w-[560px] rounded-full blur-[70px] ${f.fleckUnten}`} />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div className="flex flex-col items-start gap-4 lg:sticky lg:top-32">
          <span className={`font-montserrat text-xs font-semibold uppercase tracking-[0.18em] ${f.auge}`}>
            Die Voice-to-Brain™ Methode
          </span>
          <h2
            id="timeline-headline"
            className="font-montserrat text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl"
          >
            <span className="block">Maschinen rechnen.</span>
            <span className="block bg-gradient-to-r from-dark-gold via-luxury-gold to-bright-gold bg-clip-text text-transparent">
              Menschen berühren.
            </span>
          </h2>
          <p className={`max-w-sm font-inter text-base leading-relaxed sm:text-lg ${f.leise}`}>
            KI spart Zeit. Was du daraus machst, entscheidet, ob man sich an dich erinnert.
          </p>
          <p className={`font-montserrat text-sm font-semibold tabular-nums ${f.leise}`} aria-hidden="true">
            <span className={`mr-1 text-2xl font-extrabold ${TON === 'hell' ? 'text-midnight-blue' : 'text-pearl-white'}`}>
              {erreicht + 1}
            </span>
            von {SCHRITTE.length}
          </p>
        </div>

        <div ref={treppe} className="relative pl-[54px]">
          <div aria-hidden="true" className={`absolute bottom-5 left-[19px] top-5 w-0.5 rounded-full ${f.spur}`}>
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-luxury-gold to-bright-gold"
            />
          </div>

          <ol className="flex list-none flex-col gap-4 p-0 md:gap-5">
            {SCHRITTE.map((s, i) => (
              <li key={s.titel} id={`schritt${i + 1}`} className="relative scroll-mt-28">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[54px] top-[18px] grid h-10 w-10 place-items-center rounded-full border-2 font-montserrat text-[15px] font-bold tabular-nums transition-[background,color,border-color,transform] duration-300 motion-reduce:transition-none ${
                    i <= erreicht
                      ? 'scale-105 border-transparent bg-gradient-to-br from-luxury-gold to-bright-gold text-midnight-blue'
                      : f.marke
                  }`}
                >
                  {i + 1}
                </span>

                <div
                  className={`flex flex-col gap-2 rounded-[20px] border p-5 backdrop-blur-lg backdrop-saturate-150 transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-6 ${f.glas}`}
                >
                  <h3 className="font-montserrat text-lg font-bold leading-snug tracking-tight md:text-xl">
                    <span className="sr-only">Schritt {i + 1}: </span>
                    {s.titel}
                  </h3>
                  <p className={`font-inter leading-relaxed ${f.leise}`}>{s.kurz}</p>

                  {/* Der Rest steht im Quelltext und ist damit fuer Suchmaschinen
                      und KI vollstaendig lesbar, nur eingeklappt. */}
                  <details className="cc-mehr mt-1">
                    <summary className={`inline-flex items-center gap-2 font-montserrat text-sm font-semibold transition-colors ${f.mehr}`}>
                      <span className="cc-mehr-zu">Mehr dazu</span>
                      <span className="cc-mehr-auf">Weniger</span>
                      <span aria-hidden="true" className="cc-mehr-pfeil">&#8964;</span>
                    </summary>
                    <p className={`mt-3 whitespace-pre-line font-inter text-[15px] leading-relaxed ${f.leise}`}>{s.lang}</p>
                  </details>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="font-cormorant text-2xl italic leading-snug sm:text-3xl">
              Bereit, diese sieben Schritte zu gehen?
            </p>
            {/* Vorher "#offers" - diesen Anker gibt es auf der Startseite nicht. */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-luxury-gold to-bright-gold px-7 py-3.5 font-montserrat text-[15px] font-bold text-midnight-blue shadow-[0_14px_30px_-16px_rgba(218,165,32,0.9)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-luxury-gold motion-reduce:transition-none"
            >
              Sprich mit mir
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
