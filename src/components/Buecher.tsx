/**
 * Claudias Veroeffentlichungen - der Beleg fuer "Autorin".
 *
 * Von Claudia am 22.09.2026 bestaetigt: sechs Buecher ("durchbruch das buch bitte auch mit
 * nehmen und den coaching Guide das muessten dann 6 sein"). Drei davon fuehrt sie selbst auf ihrer
 * frueheren Webseite unter "Meine Veroeffentlichungen" (Brainself, Durchbruch, Coaching-Guide).
 *
 * Jede Angabe ist nachgelesen (Stand 22.09.2026) - nichts aus dem Gedaechtnis:
 *   - Trauerreden Ratgeber: ihr eigenes Buch, ISBN 978-3-9824878-0-9; ihre Seite
 *     diestimme-claudiaconen.de verlinkt es.
 *   - Brainself: Google Books, ISBN 978-3-9816118-8-5.
 *   - Durchbruch!: Hrsg. Dr. Stefan Fraedrich und Alexander Mueller, GEDANKENtanken 2018;
 *     nicht im Buchhandel erschienen, deshalb ohne ISBN.
 *   - Der grosse Coach-Guide: Monica Deters, tredition 2022, ISBN 978-3-347-61888-6.
 *   - Aus der Krise ins Happy-End: Monica Deters (Hrsg.), tredition 2023, ISBN 978-3-384-05961-1;
 *     "Claudia Conen" steht in der Autorenliste der Haendler.
 *   - #CatchUpCall: Hrsg. Alexander Niggemann und Ute Guetschow, 2024; ihr Name in der Autorenliste.
 *
 * ACHTUNG NAMENSVETTERIN: "Wirtschaftsmediation" (Peter Lang, 2014) stammt von Dr. iur. Claudia
 * Conen, einer anderen Person - gehoert NICHT hierher.
 *
 * Bewusst KEINE Kaufknoepfe: Die Seite "Ueber mich" traegt ihre Geschichte, und ihre Regel lautet:
 * nie ein Verkaufsangebot in deren Naehe. Deshalb nur zwei leise Verweise bei den Titeln, die sie
 * selbst schon verlinkt hat.
 *
 * Dieselben Buecher stehen als Book-Eintraege in den strukturierten Daten (index.html).
 */

type Buch = {
  titel: string;
  untertitel?: string;
  jahr: string;
  rolle: string;
  angabe: string;
  verweis?: string;
};

export const BUECHER: Buch[] = [
  {
    titel: 'Trauerreden Ratgeber',
    untertitel: 'Todsicher einzigartig wie der Mensch selbst',
    jahr: '2022',
    rolle: 'Autorin',
    angabe: 'Taschenbuch und E-Book',
    verweis: 'https://www.amazon.de/dp/3982487803',
  },
  {
    titel: 'Brainself',
    untertitel: 'Es geht um dich selbst',
    jahr: '2022',
    rolle: 'Mitautorin',
    angabe: 'Gemeinschaftswerk mehrerer Autorinnen und Autoren',
    verweis: 'https://www.amazon.de/dp/3981611888',
  },
  {
    titel: '#CatchUpCall',
    untertitel: 'Experten im Scheinwerferlicht und die Geheimnisse für erfolgreiche Online-Events',
    jahr: '2024',
    rolle: 'Mitautorin',
    angabe: 'Herausgegeben von Alexander Niggemann und Ute Gütschow',
  },
  {
    titel: 'Aus der Krise ins Happy-End',
    jahr: '2023',
    rolle: 'Mitautorin',
    angabe: 'Herausgegeben von Monica Deters',
  },
  {
    titel: 'Der große Coach-Guide',
    untertitel: 'Mit wem deine Träume wirklich wahr werden',
    jahr: '2022',
    rolle: 'Mit einem Beitrag vertreten',
    angabe: 'Von Monica Deters',
  },
  {
    titel: 'Durchbruch!',
    untertitel: '45 inspirierende Geschichten aus dem Leben',
    jahr: '2018',
    rolle: 'Mitautorin',
    angabe: 'Herausgegeben von Dr. Stefan Frädrich und Alexander Müller, GEDANKENtanken',
  },
];

export default function Buecher() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="buecher">
      <div className="mx-auto max-w-2xl px-6">
        <h2
          id="buecher"
          className="flex items-center gap-3 font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-midnight-blue"
        >
          <span aria-hidden="true" className="h-[3px] w-7 rounded-full bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]" />
          Veröffentlichungen
        </h2>
        <p className="mt-6 font-inter text-lg leading-relaxed text-midnight-blue/80">
          Ein eigenes Buch und fünf Bücher, an denen ich mitgewirkt habe.
        </p>

        <ol className="mt-8 flex list-none flex-col p-0">
          {BUECHER.map((b) => (
            <li
              key={b.titel}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-midnight-blue/15 py-5 last:border-b"
            >
              <span className="font-montserrat text-sm font-bold tabular-nums text-midnight-blue/70">{b.jahr}</span>
              <div>
                <p className="font-cormorant text-2xl font-semibold italic leading-snug text-midnight-blue">
                  {b.titel}
                  {b.untertitel && (
                    <span className="font-normal">
                      {/[!?.]$/.test(b.titel) ? ' ' : '. '}
                      {b.untertitel}
                    </span>
                  )}
                </p>
                <p className="mt-1.5 font-inter text-[15px] leading-relaxed text-midnight-blue/80">
                  <span className="font-semibold text-midnight-blue">{b.rolle}.</span> {b.angabe}.
                  {b.verweis && (
                    <>
                      {' '}
                      <a
                        href={b.verweis}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap underline decoration-[#D4AF37] decoration-2 underline-offset-4 transition-colors hover:text-midnight-blue"
                      >
                        Zum Buch ↗
                      </a>
                    </>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
