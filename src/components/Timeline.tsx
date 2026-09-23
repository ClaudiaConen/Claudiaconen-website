import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * Die sieben Schritte - als ruhige Treppe. Neu gebaut am 22.09.2026.
 *
 * Claudia zur Vorschau: "Diese sieben Schritte finde ich hast du sehr schoen geloest."
 * Diese Fassung deshalb NICHT ohne ihr Wort umbauen.
 *
 * Vorher: 21 Endlos-Animationen gleichzeitig (pulsierende Symbole, pulsierende Zahlen,
 * rotierende Ringe), am Handy lief der goldene Strich mitten durch die Kacheln, die Symbole
 * passten nicht zum Inhalt (ein Ohr fuer "KI spart Zeit"), und "Sprich mit mir" zeigte auf
 * #offers - einen Anker, den es auf der Startseite nicht gibt.
 *
 * Jetzt:
 *   - IHRE Kacheln: deckendes Dunkelblau, Goldrand, beim Darueberfahren hellerer Rand und der
 *     kleine Goldschein. KEIN Milchglas, kein Weichzeichner (ihr Urteil dazu: "schmierig").
 *   - Ihr Gold-Schimmer (.gold-text-animated) in der Ueberschrift.
 *   - EIN Strich links, der sich beim Scrollen mit Gold fuellt (nur transform) - die einzige
 *     Bewegung im ganzen Abschnitt. Zahlen statt Symbole.
 *   - Am Rechner bleibt die Ueberschrift links stehen (sticky). FALLE: Der Abschnitt darf dafuer
 *     kein overflow-hidden haben, sonst faellt "sticky" lautlos aus.
 *
 * CLAUDIAS TEXTE SIND UNVERAENDERT (titel, kurz, lang). Der lange Text steht eingeklappt im
 * HTML und bleibt damit fuer Suchmaschinen und KI lesbar.
 */

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
      className="relative scroll-mt-24 bg-midnight-blue px-4 py-14 text-pearl-white sm:px-6 md:py-24 lg:px-8"
      aria-labelledby="timeline-headline"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div className="flex flex-col items-start gap-4 lg:sticky lg:top-32">
          <span className="flex items-center gap-2.5 font-montserrat text-xs font-extrabold uppercase tracking-[0.18em]">
            <span aria-hidden="true" className="h-[3px] w-6 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
            Die Voice-to-Brain™ Methode
          </span>
          <h2
            id="timeline-headline"
            className="font-montserrat text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl"
          >
            {/* Claudias Text vom 23.09.2026, 00:13 UTC ("tausche den Text gegen den") - Wort fuer Wort. */}
            <span className="block">Worte vermitteln Wissen.</span>
            <span className="block gold-text-animated">Persönlichkeit weckt Vertrauen.</span>
          </h2>
          <p className="max-w-md font-inter text-base leading-relaxed text-pearl-white/85 sm:text-lg">
            Bring Worte, Stimme und Haltung in Einklang – damit du Menschen erreichst und deine Botschaft im Gedächtnis bleibt.
          </p>
          <p className="font-montserrat text-sm font-bold tabular-nums text-pearl-white/80" aria-hidden="true">
            <span className="mr-1 text-2xl font-extrabold text-[#EBD197]">{erreicht + 1}</span>
            von {SCHRITTE.length}
          </p>
        </div>

        <div ref={treppe} className="relative pl-[58px]">
          <div aria-hidden="true" className="absolute bottom-[22px] left-5 top-[22px] w-[3px] rounded-full bg-[#D4AF37]/30">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,#D4AF37,#F7E7CE_50%,#C9A961)]"
            />
          </div>

          <ol className="flex list-none flex-col gap-4 p-0">
            {SCHRITTE.map((s, i) => (
              <li key={s.titel} id={`schritt${i + 1}`} className="relative scroll-mt-28">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[58px] top-4 grid h-11 w-11 place-items-center rounded-full border-2 border-[#D4AF37] font-montserrat text-[17px] font-extrabold tabular-nums transition-[background,color,box-shadow] duration-300 motion-reduce:transition-none ${
                    i <= erreicht
                      ? 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_50%,#D4AF37)] text-midnight-blue shadow-[0_0_0_5px_rgba(212,175,55,0.2)]'
                      : 'bg-[#0F1F3A] text-pearl-white'
                  }`}
                >
                  {i + 1}
                </span>

                <div className="flex flex-col gap-2 rounded-2xl border-[1.5px] border-[#D4AF37]/55 bg-[#13233F] px-6 py-[22px] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <h3 className="font-montserrat text-lg font-bold leading-snug tracking-tight md:text-[1.32rem]">
                    <span className="sr-only">Schritt {i + 1}: </span>
                    {s.titel}
                  </h3>
                  <p className="font-inter leading-relaxed text-pearl-white/85">{s.kurz}</p>

                  {/* Der Rest steht im Quelltext und ist damit fuer Suchmaschinen
                      und KI vollstaendig lesbar, nur eingeklappt. */}
                  <details className="cc-mehr mt-1">
                    <summary className="inline-flex items-center gap-2 font-montserrat text-sm font-bold text-[#EBD197] underline decoration-[#D4AF37] decoration-2 underline-offset-[5px] transition-colors hover:text-[#F7E7CE]">
                      <span className="cc-mehr-zu">Mehr dazu</span>
                      <span className="cc-mehr-auf">Weniger</span>
                      <span aria-hidden="true" className="cc-mehr-pfeil">&#8964;</span>
                    </summary>
                    <p className="mt-3 whitespace-pre-line font-inter text-[15.5px] leading-relaxed text-pearl-white/85">
                      {s.lang}
                    </p>
                  </details>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start gap-4">
            <p className="font-cormorant text-2xl font-semibold italic leading-snug sm:text-[1.6rem]">
              Bereit, diese sieben Schritte zu gehen?
            </p>
            {/* Vorher "#offers" - diesen Anker gibt es auf der Startseite nicht. */}
            <a
              href="#contact"
              className="cc-knopf"
            >
              Sprich mit mir
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
