import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

/**
 * Eintragungsseite "Die Unverwechselbaren".
 *
 * Alle Worte stammen aus Claudias eigenem Umsetzungsplan vom 12.09.2026,
 * einschliesslich des Satzes ueber die Gespraeche, den sie am Eventtag von der
 * Buehne sagt. Die Regeln dieses Plans gelten hier: kein Preis, kein
 * Funktionsumfang, keine Plattformbeschreibung. Was die Seite trotzdem tragen
 * darf, ist ihr Gesicht und ihr Ton — leer wirken heisst nicht zurueckhaltend
 * wirken, sondern unfertig.
 */
export default function Unverwechselbare() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [laeuft, setLaeuft] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const absenden = async (e: FormEvent) => {
    e.preventDefault();
    setFehler(null);

    const sauber = name.trim();
    if (sauber.length < 2) {
      setFehler('Da fehlt noch dein Name.');
      return;
    }
    if (!email.includes('@') || email.trim().length < 5) {
      setFehler('Da fehlt noch eine vollstaendige E-Mail-Adresse.');
      return;
    }

    setLaeuft(true);
    const teile = sauber.split(/\s+/);
    const vorname = teile[0];
    const nachname = teile.slice(1).join(' ') || '.';

    try {
      const { error } = await supabase.from('beta_waitlist').insert([
        {
          first_name: vorname,
          last_name: nachname,
          email: email.trim().toLowerCase(),
          company: null,
          reason: 'Die Unverwechselbaren — Eintragung ueber /unverwechselbare',
          status: 'pending',
          notified: false,
        },
      ]);

      if (error) {
        if (error.code === '23505') {
          setFertig(true);
          return;
        }
        throw error;
      }
      setFertig(true);
    } catch {
      setFehler('Das hat gerade nicht geklappt. Versuch es bitte noch einmal.');
    } finally {
      setLaeuft(false);
    }
  };

  return (
    <main className="min-h-screen bg-pearl-white text-midnight-blue">
      <SEO
        title="Die Unverwechselbaren"
        description="Ein Ort für Menschen, die sich nicht vergleichbar machen lassen wollen. Einmal im Monat, und was daraus wird, machen wir gemeinsam. Trag dich ein, dann erfährst du als Erste davon."
        path="/unverwechselbare"
      />
      {/* Rueckweg. Die Seite hatte zuerst keinen, und wer sie direkt aufrief,
          sass in einer Sackgasse: kein Menue, kein Weg zur Startseite. */}
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <a
          href="/"
          className="font-montserrat text-sm font-semibold tracking-wide text-midnight-blue/70 transition-colors hover:text-luxury-gold"
        >
          ← Claudia Conen
        </a>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Wort */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div>
              <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-luxury-gold">
                Erstes Treffen am 12. November
              </p>
              <h1 className="mt-4 font-montserrat text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Die Unverwechselbaren
              </h1>
              <div className="mt-6 h-0.5 w-16 bg-luxury-gold" aria-hidden="true" />
            </div>

            <p className="font-inter text-2xl leading-snug sm:text-3xl">
              Ein Ort für Menschen, die sich nicht vergleichbar machen lassen wollen.
            </p>

            <p className="max-w-xl font-inter text-lg leading-relaxed text-midnight-blue/70">
              Das, was du mitnimmst, steht in keinem Programmheft. Es steht in den Gesprächen,
              die du führst. Wir treffen uns einmal im Monat, und was daraus wird, machen wir
              gemeinsam.
            </p>

            {fertig ? (
              <div className="max-w-xl border-l-4 border-luxury-gold bg-warm px-6 py-7">
                <p className="font-montserrat text-lg font-semibold">Du stehst auf der Liste.</p>
                <p className="mt-2 font-inter text-midnight-blue/70">
                  Die Einladung zum 12. November kommt per E-Mail. Bis dahin passiert nichts weiter.
                </p>
              </div>
            ) : (
              <form onSubmit={absenden} className="flex max-w-xl flex-col gap-3" noValidate>
                <label
                  htmlFor="cc-name"
                  className="font-montserrat text-xs font-semibold uppercase tracking-[0.15em] text-midnight-blue/60"
                >
                  Trag dich ein, dann bekommst du die Einladung
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="cc-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
                    autoComplete="name"
                    className="w-full rounded-sm border border-midnight-blue/20 bg-white px-4 py-3.5 font-inter text-base outline-none transition focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/25 sm:w-2/5"
                  />
                  <input
                    id="cc-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@adresse.de"
                    autoComplete="email"
                    className="w-full rounded-sm border border-midnight-blue/20 bg-white px-4 py-3.5 font-inter text-base outline-none transition focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/25"
                  />
                </div>

                <button
                  type="submit"
                  disabled={laeuft}
                  className="self-start rounded-sm bg-midnight-blue px-8 py-3.5 font-montserrat text-base font-semibold text-pearl-white transition-colors hover:bg-luxury-gold hover:text-midnight-blue disabled:opacity-60"
                >
                  {laeuft ? 'Einen Moment…' : 'Einladung bekommen'}
                </button>

                {fehler && (
                  <p
                    role="alert"
                    className="border-l-4 border-luxury-gold bg-warm px-4 py-3 font-inter text-sm"
                  >
                    {fehler}
                  </p>
                )}
              </form>
            )}

            <p className="font-inter text-xl italic text-midnight-blue/60">
              Alles kann, nichts muss.
            </p>
          </div>

          {/* Bild */}
          <div className="order-1 lg:order-2">
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                className="absolute -bottom-4 -right-4 hidden h-full w-full border border-luxury-gold/40 lg:block"
                aria-hidden="true"
              />
              <img
                src="/claudiaconen.webp"
                width={853}
                height={1280}
                alt="Claudia Conen"
                loading="eager"
                className="relative w-full object-cover shadow-xl"
              />
              <figcaption className="relative mt-5 font-inter text-sm text-midnight-blue/60">
                Claudia Conen lädt ein. Kein Programm, keine Bühne, ein Kreis.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </main>
  );
}
