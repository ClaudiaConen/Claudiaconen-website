import { Link } from 'react-router-dom';
import Seitenuebersicht from './Seitenuebersicht';
import { Mail, Linkedin, Phone, Calendar, Instagram, ArrowUp } from 'lucide-react';

/**
 * Fusszeile aller Seiten - neu gesetzt am 22.09.2026 (Claudia, 15:17 UTC: "kannst du das auch schoener machen").
 *
 * Was rausging und warum: die Google-Maps-Karte (lud auf jeder Seite Google nach, ohne Einwilligung; die
 * Adresse steht als Text und im Impressum), die doppelte Kontaktzeile oben, der grosse "Nach oben"-Knopf,
 * der alte Text "37 Jahre Expertise in Persoenlichkeitsentwicklung ... Voice-to-Brain(TM)" (widerspricht der
 * freigegebenen Positionierung vom 21.09.2026) und Anker-Verweise (#methode, #social-proof), die nur auf der
 * Startseite funktionierten.
 *
 * Texte: Rollenzeile und Claim Wort fuer Wort aus POSITIONIERUNG_und_starke_Texte.md - der Claim steht nie
 * allein, immer bei Name und Beruf. Gold als Schrift nur auf Dunkelblau (#EBD197), Verlauf fuer den Knopf.
 * Verweise: nur Seiten, die es gibt (Routen in App.tsx geprueft am 22.09.2026). Die zwei bolt.host-Adressen
 * sind ihre laufenden Angebote - nicht anfassen. Alle externen Adressen am 22.09.2026 mit 200 geprueft.
 */
/* Der Goldverlauf wurde nur noch vom Erstgespraech-Knopf gebraucht; der traegt seit dem
   23.09.2026 den Markenknopf .cc-knopf. Konstante entfernt, damit niemand eine zweite
   Knopfbauart daraus baut. */

const SPALTEN: { titel: string; links: { label: string; href: string; extern?: boolean }[] }[] = [
  {
    titel: 'Über',
    links: [
      { label: 'Über mich', href: '/ueber-mich' },
      { label: 'Hören', href: '/hoeren' },
      { label: 'Wissensbibliothek', href: '/wissensbibliothek' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    titel: 'Angebote',
    links: [
      { label: 'Speaker-Ausbildung', href: '/speaker-ausbildung' },
      { label: '1:1-Mentoring', href: '/1-zu-1-mentoring' },
      { label: 'Premium-Workshop', href: '/premiumangebote' },
      { label: 'Voice to Impact', href: 'https://voice-to-impact-conv-h10m.bolt.host', extern: true },
      { label: 'Voice-to-Brain Mentoring', href: 'https://claudia-conen-voice-ui2e.bolt.host', extern: true },
    ],
  },
  {
    titel: 'Mitmachen',
    links: [
      { label: '7 Tage für deine Wirkungskraft', href: '/challenge' },
      { label: 'Die Unverwechselbaren · Community', href: 'https://community.claudiaconen.com/', extern: true },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'ClaudiaAI Beta', href: '/claudia-ai' },
      { label: 'Shop', href: 'https://umsatzstimme-claudiaconen.tentary.com/', extern: true },
    ],
  },
];

const RUND = 'flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 text-[#EBD197] transition-colors hover:border-[#F7E7CE] hover:bg-white/5';

export default function Footer() {
  const nachOben = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Seitenuebersicht />
      <footer className="bg-midnight-blue text-pearl-white" style={{ borderTop: '3px solid transparent', borderImage: 'linear-gradient(90deg,#C9A961,#F7E7CE,#D4AF37) 1' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Oben: wer sie ist - und wie man sie erreicht */}
          <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-14">
            <div>
              <div className="flex items-center gap-4">
                <picture>
                  <source srcSet="/logo-192.webp" type="image/webp" />
                  <img src="/logo-192.jpg" alt="Claudia Conen" width={56} height={56} loading="lazy" decoding="async" className="h-14 w-14 flex-none rounded-full object-cover ring-2 ring-[#D4AF37]/60" />
                </picture>
                <div>
                  <p className="font-montserrat text-2xl font-extrabold text-[#EBD197]">Claudia Conen</p>
                  <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-pearl-white/80">Keynote-Speakerin | Trainerin | Coach | Autorin</p>
                </div>
              </div>
              <p className="mt-6 max-w-lg font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">
                Perfektion ist klickbar. Persönlichkeit weckt Vertrauen. Und bleibt.
              </p>
              <p className="mt-4 max-w-lg font-inter text-[15px] leading-relaxed text-pearl-white/85">
                Rhetorik, Storytelling, Präsentation und der Auftritt vor der Kamera – seit 37 Jahren. Bekannt als „Die Umsatzstimme".
              </p>
            </div>

            <div className="md:justify-self-end">
              <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-pearl-white/70">Kontakt</p>
              <ul className="mt-4 grid list-none gap-3 p-0 font-inter text-[15px]">
                <li>
                  <a href="mailto:claudiaconen@umsatzstimme.de" className="inline-flex items-center gap-3 text-pearl-white/90 transition-colors hover:text-[#F7E7CE]">
                    <Mail size={18} className="text-[#EBD197]" /> claudiaconen@umsatzstimme.de
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/4916093102073" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-pearl-white/90 transition-colors hover:text-[#F7E7CE]">
                    <Phone size={18} className="text-[#EBD197]" /> +49 160 93102073 · WhatsApp
                  </a>
                </li>
              </ul>
              {/* Derselbe Knopf wie ueberall (.cc-knopf) - er steht auf jeder Seite und war
                  vorher die haeufigste Abweichung vom Markenknopf (48 statt 52 px, keine Versalien). */}
              <Link to="/termin-buchen" className="cc-knopf mt-6">
                <Calendar size={18} /> Kostenloses Erstgespräch
              </Link>
              <div className="mt-6 flex gap-3">
                <a href="https://www.linkedin.com/in/claudia-conen-die-stimme/" target="_blank" rel="noopener noreferrer" aria-label="Claudia Conen auf LinkedIn" className={RUND}><Linkedin size={18} /></a>
                <a href="https://www.instagram.com/claudia_conen_umsatzstimme/" target="_blank" rel="noopener noreferrer" aria-label="Claudia Conen auf Instagram" className={RUND}><Instagram size={18} /></a>
                <a href="mailto:claudiaconen@umsatzstimme.de" aria-label="E-Mail an Claudia Conen" className={RUND}><Mail size={18} /></a>
              </div>
            </div>
          </div>

          {/* Mitte: drei kurze Spalten */}
          <div className="grid gap-8 border-t border-[#D4AF37]/25 py-10 sm:grid-cols-3">
            {SPALTEN.map((sp) => (
              <div key={sp.titel}>
                <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-[#EBD197]">{sp.titel}</p>
                <ul className="mt-4 grid list-none gap-2.5 p-0 font-inter text-[15px]">
                  {sp.links.map((l) => (
                    <li key={l.label}>
                      {l.extern ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-pearl-white/85 transition-colors hover:text-[#F7E7CE]">{l.label}</a>
                      ) : (
                        <Link to={l.href} className="text-pearl-white/85 transition-colors hover:text-[#F7E7CE]">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Unten: Rechtliches, Anschrift, nach oben */}
          <div className="flex flex-col gap-4 border-t border-[#D4AF37]/25 py-7 font-inter text-sm text-pearl-white/70 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Claudia Conen · Beisenweg 20, 58452 Witten</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/impressum" className="font-semibold transition-colors hover:text-[#F7E7CE]">Impressum</Link>
              <Link to="/datenschutz" className="font-semibold transition-colors hover:text-[#F7E7CE]">Datenschutz</Link>
              <Link to="/agb" className="font-semibold transition-colors hover:text-[#F7E7CE]">AGB</Link>
              <button type="button" onClick={nachOben} aria-label="Nach oben" className="inline-flex items-center gap-1.5 font-semibold text-[#EBD197] transition-colors hover:text-[#F7E7CE]">
                <ArrowUp size={16} /> Nach oben
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
