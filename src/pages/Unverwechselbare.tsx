import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Eintragungsseite "Die Unverwechselbaren".
 *
 * Text Wort fuer Wort aus dem Umsetzungsplan vom 12.09.2026: eine Ueberschrift,
 * ein Versprechen, der Termin, ein Feld. Kein Preis, kein Funktionsumfang,
 * keine Plattformbeschreibung — in dieser Phase ist alles davon verfrueht.
 *
 * Eine bewusste Abweichung: Neben der E-Mail steht ein Namensfeld. Die Tabelle
 * beta_waitlist verlangt first_name und last_name (NOT NULL), und die Nachfass-
 * nachricht nach dem Event soll persoenlich sein. Eine Liste ohne Namen zwingt
 * zu dreissig Mal "Hallo".
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
    // Die Tabelle trennt Vor- und Nachname. Wer nur einen Namen eintraegt,
    // soll nicht scheitern: der Rest wandert in last_name, sonst ein Punkt.
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
        // 23505 = unique violation: die Adresse steht schon auf der Liste.
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
      <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-20 sm:py-28">
        <header>
          <h1 className="font-montserrat text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Die Unverwechselbaren
          </h1>
          <div className="mt-6 h-0.5 w-16 bg-luxury-gold" aria-hidden="true" />
        </header>

        <p className="font-inter text-2xl leading-snug sm:text-3xl">
          Ein Ort für Menschen, die sich nicht vergleichbar machen lassen wollen.
        </p>

        <p className="font-inter text-lg text-midnight-blue/70">
          Wir treffen uns einmal im Monat. Erstes Treffen:{' '}
          <span className="font-semibold text-midnight-blue">12. November</span>
        </p>

        {fertig ? (
          <div className="border-l-4 border-luxury-gold bg-warm px-5 py-6">
            <p className="font-montserrat text-lg font-semibold">Du stehst auf der Liste.</p>
            <p className="mt-2 font-inter text-midnight-blue/70">
              Die Einladung zum 12. November kommt per E-Mail. Bis dahin passiert nichts weiter.
            </p>
          </div>
        ) : (
          <form onSubmit={absenden} className="flex flex-col gap-3" noValidate>
            <label
              htmlFor="cc-name"
              className="font-montserrat text-xs font-semibold uppercase tracking-widest text-midnight-blue/60"
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
                className="w-full rounded-sm border border-midnight-blue/20 bg-white px-4 py-3.5 font-inter text-base outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/25 sm:w-2/5"
              />
              <input
                id="cc-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@adresse.de"
                autoComplete="email"
                className="w-full rounded-sm border border-midnight-blue/20 bg-white px-4 py-3.5 font-inter text-base outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/25"
              />
            </div>

            <button
              type="submit"
              disabled={laeuft}
              className="self-start rounded-sm bg-midnight-blue px-7 py-3.5 font-montserrat text-base font-semibold text-pearl-white transition-colors hover:bg-luxury-gold hover:text-midnight-blue disabled:opacity-60"
            >
              {laeuft ? 'Einen Moment…' : 'Einladung bekommen'}
            </button>

            {fehler && (
              <p role="alert" className="border-l-4 border-luxury-gold bg-warm px-4 py-3 font-inter text-sm">
                {fehler}
              </p>
            )}
          </form>
        )}

        <p className="font-inter text-lg italic text-midnight-blue/60">Alles kann, nichts muss.</p>
      </div>
    </main>
  );
}
