/**
 * Kundenstimmen mit Namen - als TEXT, nicht nur als Video.
 *
 * Warum es diese Komponente gibt: Ein Video kann keine Suchmaschine und keine KI
 * lesen. Zwei Minuten gesprochenes Lob sind fuer sie unsichtbar. Hier stehen die
 * Saetze im HTML - mit Name, Beruf und einem Verweis, ueber den ein Fremder
 * nachpruefen kann, dass es den Menschen gibt.
 *
 * Aufbau, mit Claudia am 21.09.2026 abgestimmt (ihre Idee: aufklappbar,
 * minimalistischer Hinweis, nicht von der eigenen Seite ablenken):
 *   sichtbar:    Bild, Name, Beruf und Ort, EIN Satz
 *   aufgeklappt: drei weitere Saetze, klein darunter der Verweis (neues Fenster)
 * Verweis-Regel: Webseite bei Selbststaendigen, LinkedIn bei Angestellten.
 *
 * Aufklappen ueber <details>: steht vollstaendig im HTML, braucht kein Skript.
 *
 * REGELN FUER NEUE EINTRAEGE:
 * - Nur mit Einwilligung der Person (Name, Beruf, Zitat, Verweis).
 * - Die Saetze sind woertlich aus dem Video, nur von Fuellwoertern und
 *   Satzabbruechen befreit. Nichts hinzudichten.
 * - Keine Neuro-Begriffe uebernehmen, auch wenn sie im Video fallen.
 *
 * Verena Sommerfeld: Transkript und Auswahl in
 * projects/claudiaconen/ablage/kundenstimmen/ (Vinci-Server). Freigabe durch
 * Claudia am 21.09.2026 ("Ja, die Saetze darf ich posten").
 */

type Stimme = {
  name: string;
  beruf: string;
  ort?: string;
  bild: string;
  zitat: string;
  weitere: string[];
  verweis?: { text: string; ziel: string };
};

const STIMMEN: Stimme[] = [
  {
    name: 'Verena Sommerfeld',
    beruf: 'Bauingenieurin und Energieberaterin',
    ort: 'Esslingen',
    bild: '/kundenstimmen/verena-sommerfeld.webp',
    zitat: 'Ich habe sie wirklich abgelegt, diese Scheu vor der Kamera.',
    weitere: [
      'Am Anfang war ich ein bisschen aufgeregt, und dann konzentriert man sich auf sich: Kann ich das so sagen? Muss ich mich jetzt verstellen? Ich möchte mich nie wieder im Leben verstellen.',
      'Ich interessiere mich für den Menschen dahinter, und zu dem rede ich. Und nicht dieses ganze Kopfkino. Das hast du mir wirklich sehr deutlich beigebracht.',
      'Du bist wahnsinnig vertrauensvoll, und ich habe mich gleich gut aufgehoben gefühlt.',
    ],
    verweis: { text: 'Zur Webseite von Verena Sommerfeld', ziel: 'https://sommerfeld-energieberatung.de/' },
  },
];

export default function NamentlicheStimmen() {
  if (STIMMEN.length === 0) return null;

  return (
    <div className="mx-auto mb-10 grid max-w-5xl gap-5 md:mb-14">
      {STIMMEN.map((s) => (
        <figure
          key={s.name}
          className="grid items-start gap-5 rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-[0_18px_50px_-28px_rgba(10,22,40,0.8)] backdrop-blur-md backdrop-saturate-150 sm:grid-cols-[112px_1fr] sm:p-7"
        >
          <img
            src={s.bild}
            alt={`${s.name}, ${s.beruf}`}
            width={224}
            height={224}
            loading="lazy"
            decoding="async"
            className="h-24 w-24 rounded-full border border-luxury-gold/50 object-cover sm:h-28 sm:w-28"
          />

          <div>
            <blockquote className="font-cormorant text-2xl italic leading-snug text-pearl-white sm:text-3xl">
              „{s.zitat}"
            </blockquote>

            <figcaption className="mt-3 font-montserrat text-sm font-semibold tracking-wide text-luxury-gold">
              {s.name}
              <span className="font-inter font-normal text-white/80">
                {' '}
                · {s.beruf}
                {s.ort ? ` · ${s.ort}` : ''}
              </span>
            </figcaption>

            <details className="group mt-4">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-montserrat text-sm font-semibold text-white/90 underline decoration-luxury-gold/50 underline-offset-4 transition-colors hover:text-luxury-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-luxury-gold [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Mehr von {s.name.split(' ')[0]} lesen</span>
                <span className="hidden group-open:inline">Weniger</span>
              </summary>

              <div className="mt-4 grid gap-3 border-l border-luxury-gold/40 pl-4">
                {s.weitere.map((satz) => (
                  <p key={satz} className="font-inter text-base leading-relaxed text-white/90">
                    „{satz}"
                  </p>
                ))}

                {s.verweis && (
                  <a
                    href={s.verweis.ziel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 font-inter text-xs text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                  >
                    {s.verweis.text} ↗
                  </a>
                )}
              </div>
            </details>
          </div>
        </figure>
      ))}
    </div>
  );
}
