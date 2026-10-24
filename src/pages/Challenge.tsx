import { useEffect, useRef, useState } from 'react';
import LogoBand from '../components/LogoBand';
import SocialProof from '../components/SocialProof';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import Stimmwelle from '../components/Stimmwelle';
import ChallengeAnmeldung from '../components/ChallengeAnmeldung';
import FotoReihen from '../components/FotoReihen';

/**
 * Die Challenge-Seite - EINE Seite aus zwei (Claudia, 22.09.2026 11:00 UTC: "jetzt hast du von beiden
 * Seiten das Beste bekommen ... mach aus beiden Seiten jetzt das ... das Buch natuerlich mit drin lassen").
 * Vorgaenger: die Flyer-Seite /unverwechselbar-du (Nacht 22.09., aus dem Event-Flyer "UNVERWECHSELBAR DU")
 * und die kurze /challenge (Vormittag 22.09.). /unverwechselbar-du leitet per 301 hierher.
 *
 * Reihenfolge (Stand 22.09.2026 13:30 UTC): Kopf (kurz) -> Punkte hell -> Anmeldung -> Sieben Schritte (oeffnen je an
 * ihrem Tag, Finale volle Breite) -> So laeuft es ab (acht Schritte) -> Wegweiser -> Hand aufs Herz -> KI und du ->
 * Werkzeugkasten (Klapp-Kacheln) + Workbook -> Zwei Wege -> Fuer wen (hell) -> Warum ich -> Schluss -> Netzwerk (letzter).
 * Aeltere Notiz: Kopf mit Foto-Reihen -> Sieben Schritte -> So laeuft es + die sieben Tage (oeffnen erst an
 * ihrem Tag) + Anmeldung -> Hand aufs Herz (zehn Saetze) -> KI und du -> Selbst-Check -> Werkzeugkasten +
 * Workbook -> Geschenk, Rederaum, Online-Buehne -> Fuer wen -> Warum ich -> Netzwerk Mittelstand -> Schluss.
 *
 * Regeln, die hier gelten: kein Preis, den Claudia nicht genannt hat; keine Hirnforschungs-Zahlen; ihre
 * Geschichte nie direkt vor einem Angebot; "Rederaum" ist ihr Wort fuer das Kaffee-Gespraech 1:1 (Kalender
 * /buchen/erstgespraech); Gabi nur beim Netzwerk-Block; kein Weg in die WhatsApp-Gruppe ohne Eintrag.
 */

const PFAD = '/challenge';


/** Zehn Saetze zum Ankreuzen - Claudias Wunsch vom 22.09.2026, 10:50 UTC: statt der ChatGPT-Liste vom Flyer
 *  Fragen zur Kommunikation im KI-Zeitalter (Pausen, Selbstsicherheit, Perfektion), "wie ein Rhetorik-Profi
 *  sie stellen wuerde". Eigene Formulierungen, keine Zitate. Die letzten zwei sind die persoenlichen. */







const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
/** Ruhige Champagner-Flaeche statt kraeftigem Gold fuer grosse Bloecke (Farben der neuen Seiten, Claudia 15.10.2026). */
const FLAECHE = 'bg-white border border-[#C9A961]/60';
/** Plakette wie in der Wochen-Grafik: nur an Tag 2 und 6 (Claudia, 22.10.2026 05:45 UTC: "dass die Leute nicht denken,
 *  sie bekommen jeden Tag ein Feedback"). */
function FeedbackPlakette() {
  return <span className={`flex-none rounded-md px-2.5 py-1.5 font-montserrat text-[10px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Wirkungscheck</span>;
}
/** Claudias Idee vom 22.09.2026, 02:13 UTC: vom Event per QR in eine Video-Challenge - sieben Tage,
 *  sieben Schritte, 60 Sekunden am Tag. Kanal: ihre WhatsApp-Gruppe "Video-Challenge" (Einladungslink
 *  von ihr am 22.09.2026, 02:20 UTC). Aendert sie den Link, hier tauschen. */
/** Workbook "Entdecke deine Stimmwirkung" (Brainself-Buchauszug), korrigierte Fassung vom 22.09.2026
 *  (Aufgabe 18: keine Millisekunden-Zahl, kein "Opfer", 37 Jahre, Nachtblau). Blaettern: WorkbookBlaettern.tsx. */






/** Der Durchgang: Montag, 26.10.2026 bis Montag, 02.11.2026 (Claudia, 22.09.2026 11:02 UTC). Vorher ist nur
 *  Tag 1 offen - als Vorbereitung (Aufwachuebung + Satz); Tag n oeffnet am n-ten Tag des Durchgangs. Nach dem
 *  Ende bleiben alle Tage lesbar, die Zeile im Kopf sagt, dass der Durchgang vorbei ist (Datum nie ohne Ablauf).
 *  Naechster Durchgang: START und ENDE hier aendern - sonst nichts. */
const START = new Date(2026, 9, 26); // Montag, 26.10.2026, lokale Zeit
const ENDE = new Date(2026, 10, 2); // Montag, 02.11.2026 (letzter Tag)
const VORBEREITUNG_TAG1 = false; // Streifen bleiben vor dem Start zu - die Aufwachuebung steht als 'Tipp am Morgen' davor (22.09.2026 11:24 UTC)

/** Freischaltdatum je Tag (0-basiert). */
function freischaltung(heute: Date, tag: number): Date {
  const start = new Date(heute); start.setHours(0, 0, 0, 0);
  const d = new Date(START); d.setDate(d.getDate() + tag);
  if (start < START && tag === 0 && VORBEREITUNG_TAG1) return new Date(0);
  return d;
}

/** Die Zeile im Kopf - je nachdem, ob der Durchgang bevorsteht, laeuft oder vorbei ist. Live-Termine
 *  (Claudia, 22.09.2026 11:16 UTC): Start-Zoom Mo 26.10. 19:00 Uhr, Abschlusstreffen Mo 02.11. 19:00 Uhr. */
function standZeile(heute: Date): string {
  const h = new Date(heute); h.setHours(0, 0, 0, 0);
  if (h < START) return 'Start: Montag, 26. Oktober 2026 · 19 Uhr · live im Zoom';
  if (h <= ENDE) {
    const tag = Math.min(7, Math.floor((h.getTime() - START.getTime()) / 86400000) + 1);
    return `Die Challenge läuft – heute ist Tag ${tag} von 7`;
  }
  return 'Der Durchgang vom 26. Oktober ist beendet – trag dich ein, du erfährst als Erste, wann es wieder losgeht';
}
const KURZ = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });

type Tag = {
  titel: string;
  /** Schwerpunkt - steht auf der Programm-Kachel unter der Ueberschrift. */
  schwerpunkt: string;
  /** Der Gedanke zum Einstieg, in dem man sich wiedererkennt. */
  einstieg: string;
  /** Worum es geht - ein, zwei Saetze. */
  inhalt: string;
  aufgabe: string;
  /** Freiwilliger Zusatz zur Aufgabe (z. B. Aufnahme). */
  zusatz?: string;
  reflexion: string;
  /** Tag mit persoenlichem Feedback von Claudia (Tag 2 und 6 - Claudia, 21.10.2026 10:12 UTC). */
  feedback?: boolean;
  /** Icon in public/icons/ */
  icon: string;
};

/** Der Uebungssatz - an allen sieben Tagen wortgleich (Claudias Briefing, 22.09.2026 12:54 UTC). */
const UEBUNGSSATZ = 'Wo ich spreche, ist meine Bühne – mit Persönlichkeit, Achtsamkeit und Leichtigkeit berühre ich Menschen.';

/** Die sieben Tage - Claudias Aufbau vom 21.10.2026 (Vinci-App + Discord, 10:42-11:34 UTC): Tag 1 und 2 in ihren
 *  Worten (Diktat in projects/claudiaconen/challenge/diktat_tage_2026-10-21.md), Tag 3 Redeangst, Tag 6 Kaufentscheidung
 *  + Call to Action, Tag 7 Generalprobe vor dem Pitch im Abschluss-Zoom. Tag 3-7 inhaltlich aus dem App-Plan von 09:49 UTC,
 *  bis Claudia sie diktiert. Keine Hirnforschungs-Behauptungen ohne Quelle (siehe Kopfkommentar). */
const TAGE: Tag[] = [
  {
    // Tag 1 in Claudias Worten (Vinci-App, 21.10.2026 10:42-10:45 UTC), nur geordnet und geglaettet.
    titel: 'Deine Kernbotschaft', schwerpunkt: 'Positionierung in einem Satz · dein Vorher-Video', icon: 'schritt-1',
    einstieg: 'Die beste Positionierung bringt nichts, wenn niemand davon weiß.',
    inhalt: 'Klarheit im Kopf bringt Klarheit in deine Worte – und in deine Selbstsicherheit. Verkauf keine Erklärung, sondern ein Ergebnis: das, was du für deinen Kunden kreierst. Von der Selbsterkenntnis zum selbstsicheren Auftritt – wo auch immer du den Mund aufmachst.',
    aufgabe: 'Fixiere deine Kernbotschaft. Wer bist du? Für wen hast du eine Lösung? Welches Problem löst du – ohne Fachbegriffe, so dass es jeder versteht? Frag dich: Welches Bild, welches Gefühl kannst du dabei in anderen Menschen schnell wecken? Am ersten Tag darfst du es auch einfach erzählen. Nimm es als Video auf. Hau raus.',
    zusatz: 'Bonus: Sag, warum du das überhaupt tust – und wie lange schon. Speicher dein Video: Es ist dein Vorher-Video. Daran entdeckst du selbst, wie du dich entwickelst.',
    reflexion: 'Würde ein Fremder nach deinem Video wissen, ob er dich braucht?',
  },
  {
    // Tag 2 in Claudias Worten (Vinci-App, 21.10.2026 10:46 UTC), nur geglaettet.
    titel: 'Die Zielgruppenbrille', schwerpunkt: 'Dein Video mit Kundenaugen', icon: 'schritt-3', feedback: true,
    einstieg: 'Würdest du bei dir kaufen?',
    inhalt: 'Setz die Brille deiner Zielgruppe auf. Stell dir vor, du bist dein Kunde: Du hast einen Schmerz, ein Problem, einen Wunsch – und du willst, dass er erfüllt wird.',
    aufgabe: 'Schau dir ganz objektiv dein Video von Tag 1 an. Frag dich: Ist sofort klar, welches Problem du löst? Hörst du heraus, dass du als Kunde hier gut bedient wirst? Wenn nicht, schauen wir genauer hin – dann brauchst du ein Story-Gerüst. Nimm dein Video neu auf, mit dem, was du entdeckt hast.',
    reflexion: 'Was hat dein Kunde in deinem ersten Video vermisst?',
  },
  {
    titel: 'Raus aus der Redeangst – auch vor der Kamera', schwerpunkt: 'Körper vor Kopf · Stand, Atem, Hände', icon: 'schritt-8',
    einstieg: 'Festgehaltene Hände halten die Stimme fest. Wer oben atmet, klingt dünn und wird schnell.',
    inhalt: 'Redeangst beginnt im Körper – und dort lässt sie sich auch lösen. Stand, Atem und Hände gehören zusammen.',
    aufgabe: 'Stell dich hin. Atme viermal langsam aus, länger aus als ein. Dann sprich deine Kernbotschaft mit freien Händen. Das ist dein erstes Video im Stehen.',
    zusatz: 'Eine Hauptübung reicht: das Ausatmen. Stand und Hände folgen meist von allein.',
    reflexion: 'Was hat sich verändert, als du nach dem Ausatmen gesprochen hast?',
  },
  {
    titel: 'Deine Stimme', schwerpunkt: 'Betonung und Pause', icon: 'schritt-9',
    einstieg: 'Der Tag, an dem du dich zum ersten Mal wirklich hörst.',
    inhalt: 'Derselbe Satz klingt unsicher oder überzeugt – je nachdem, wie du ihn meinst. Dann die drei Wörter, die Gewicht bekommen, und die Pause danach. Die besten Redner reden nicht mehr als andere, sie schweigen mehr.',
    aufgabe: 'Sprich deine Kernbotschaft zweimal: einmal unsicher, einmal überzeugt. Dann markiere die drei Wörter, die Gewicht bekommen, und setz nach dem wichtigsten eine Pause. Poste die überzeugte Fassung.',
    reflexion: 'Wo hast du die Pause gesetzt – und was macht sie mit deinem Satz?',
  },
  {
    titel: 'Storytelling', schwerpunkt: 'Der Kunde ist der Held', icon: 'schritt-4',
    einstieg: 'Wer sich selbst zum Helden macht, erzählt einen Lebenslauf.',
    inhalt: 'Ab hier wird aus dem Video eine Geschichte. Wer den Kunden zum Helden macht, erzählt etwas, das weitererzählt wird.',
    aufgabe: 'Erzähl eine Geschichte in fünf Stationen: ein Kunde, ein Moment, ein Satz, den er gesagt hat, was sich verändert hat, was er heute sagt. Eine Minute, nicht länger.',
    reflexion: 'Wer ist in deiner Geschichte der Held – du oder dein Kunde?',
  },
  {
    titel: 'Wie Kunden entscheiden', schwerpunkt: 'Zuhören und Call to Action', icon: 'schritt-5', feedback: true,
    einstieg: 'Menschen kaufen das Gefühl, verstanden zu sein.',
    inhalt: 'Menschen entscheiden, bevor sie verstehen. Wer zuhört, merkt, wann der andere innerlich Ja sagt. Und dann braucht er einen klaren nächsten Schritt: Menschen müssen wissen, wo es langgeht.',
    aufgabe: 'Lass heute einen echten Menschen zwei Minuten erzählen – Kollegin, Partner oder Kunde – und merk dir einen Satz von ihm. Dann erzähl deine Geschichte von Tag 5 noch einmal: mit der Pause nach dem Satz deines Kunden und einer klaren Handlungsaufforderung am Ende.',
    zusatz: 'Zuhören übt man nicht allein vor der Kamera. Ein echtes Gespräch zählt mehr als ein perfektes Video.',
    reflexion: 'Weiß dein Zuhörer am Ende genau, was er jetzt tun soll?',
  },
  {
    titel: 'Dein Elevator Pitch', schwerpunkt: 'In 30–60 Sekunden · live im Zoom-Call', icon: 'schritt-7',
    einstieg: 'Sein Problem. Dein Beweis. Warum du.',
    inhalt: 'Alles in drei Sätzen, zu einem Menschen gesprochen, nicht in eine Linse. Das ist deine Generalprobe für die Bühne beim Abschluss.',
    aufgabe: 'Sprich deinen Pitch in drei Sätzen – sein Problem, dein Beweis, warum du – mit deinem Call to Action am Ende. Leg danach dein Vorher-Video von Tag 1 daneben und poste beide zusammen, mit #unverwechselbar.',
    zusatz: 'Schau dir beide Videos an. Das ist Selbstsicherheit: das Ergebnis von sieben Videos. Am Montag beim Abschluss kannst du ihn live vor der Gruppe halten, 30–60 Sekunden, freiwillig – vielleicht sitzt dort schon dein nächster Kunde.',
    reflexion: 'Was hörst und siehst du heute, das an Tag 1 noch nicht da war?',
  },
];


/** Die Programm-Kacheln sind die sieben Tage (Claudias Briefing) - eine Liste, ein Inhalt. */



/** Nach Claudias Diktat vom 24.10.2026 09:32 UTC. */
const FUER = [
  'dein Wissen präsentieren willst',
  'dich von der Masse abheben möchtest – mit Persönlichkeit, die Vertrauen schafft',
  'bereit bist, sieben Tage lang 30 Minuten am Tag in deine Weiterentwicklung zu investieren',
  'bereit bist, jeden Tag ein Video von mindestens einer Minute aufzunehmen, um dich bestens vorzustellen und Vertrauen aufzubauen',
  'aktives Feedback möchtest statt Applaus',
  'bereit bist, jeden Tag einen kleinen Schritt zu gehen – für mehr Vertrauen bei Interessenten und Kunden',
  'respektvoll und achtsam kommunizierst und die Regeln achtest: kein ungebetenes Feedback, Werbung nur beim Abschluss im Zoom-Call am 2. November und an Tag 8 nach Aufforderung in der Gruppe',
];
const NICHT_FUER = [
  'eine perfekte Aufnahme willst statt einer echten',
  'Tipps sammeln, aber nichts ausprobieren möchtest',
  'erst eine Bühne brauchst, bevor du übst',
  'erwartest, dass die KI das Sprechen für dich übernimmt',
];


/** Goldene Linie links neben den sieben Tagen; der Pfeil wandert beim Scrollen mit (setzt --p). */
function Schiene() {
  return (
    <div className="cc-schiene" aria-hidden="true">
      <span className="cc-schiene-wort">Sieben Tage – sieben Schritte</span>
      <span className="cc-schiene-linie"><span className="cc-schiene-pfeil" data-pfeil>➜</span></span>
    </div>
  );
}

/** Unter den Tagen: kein direkter Weg in die Gruppe, nur zurueck zum Eintragen (Claudia, 22.09.2026). */
/** Mobile Leiste "Kostenfrei dabei sein": erscheint nach dem Kopf, verschwindet, sobald das Formular im Bild ist.
 *  Der Weg zur Anmeldung ist so auf dem Handy nie weiter als ein Daumen entfernt. */
function MobilLeiste() {
  const [zeigen, setZeigen] = useState(false);
  useEffect(() => {
    const pruefen = () => {
      const form = document.getElementById('anmeldung');
      const formSichtbar = form ? form.getBoundingClientRect().top < window.innerHeight : false;
      setZeigen(window.scrollY > 650 && !formSichtbar);
    };
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    window.addEventListener('resize', pruefen);
    return () => { window.removeEventListener('scroll', pruefen); window.removeEventListener('resize', pruefen); };
  }, []);
  return (
    <div aria-hidden={!zeigen} className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#C9A961]/50 bg-[#13233F] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${zeigen ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}>
      <a href="#anmelden" tabIndex={zeigen ? 0 : -1} className={`flex items-center justify-center rounded-full px-6 py-3.5 font-montserrat text-sm font-extrabold text-midnight-blue ${GOLD}`}>
        Kostenfrei dabei sein – Start 26. Okt. →
      </a>
    </div>
  );
}

function EintragBlock() {
  return (
    <div className={`mt-3 grid items-center gap-5 rounded-[10px] px-5 py-5 text-midnight-blue sm:grid-cols-[minmax(0,1fr)_auto] sm:px-7 ${FLAECHE}`}>
      <div className="min-w-0">
        <p className="font-montserrat text-lg font-extrabold leading-tight sm:text-xl">Noch nicht eingetragen?</p>
        <p className="mt-1 font-inter text-[15px] leading-relaxed">Erst eintragen, dann in die Gruppe – so weiß ich, wer dabei ist. Kostenfrei.</p>
      </div>
      <a href="#anmelden" className="inline-flex items-center rounded-full bg-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
        Ich bin dabei – eintragen
      </a>
    </div>
  );
}

/** Goldener Schluessel auf den Tages-Streifen (Claudia: "immer einen goldenen Schluessel mit drauf ... so Geheimnis"). */
function Schluessel() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" className="cc-puls flex-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
      <defs>
        <linearGradient id="cc-schluessel-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C9A961" /><stop offset=".48" stopColor="#F7E7CE" /><stop offset="1" stopColor="#C9A961" />
        </linearGradient>
      </defs>
      <path fill="url(#cc-schluessel-gold)" d="M14.5 2a7.5 7.5 0 0 0-7.2 9.6L2 16.9V22h5.1v-2.6h2.6v-2.6h2.6l1.3-1.3A7.5 7.5 0 1 0 14.5 2Zm2 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    </svg>
  );
}

/** Der Inhalt eines Tages - in der Programm-Kachel (nach dem Eintrag) und im Tages-Streifen (an seinem Tag). */
function TagInhalt({ t }: { t: Tag }) {
  return (
    <div className="font-inter text-[15px] leading-relaxed text-midnight-blue">
      <p className="font-cormorant text-xl italic leading-snug sm:text-2xl">„{t.einstieg}"</p>
      <p className="mt-3">{t.inhalt}</p>
      <p className="mt-3"><b className="font-montserrat font-extrabold">Deine Aufgabe: </b>{t.aufgabe}</p>
      {t.zusatz && <p className="mt-2 text-midnight-blue/85">{t.zusatz}</p>}
      <p className="mt-3 border-l-4 border-[#C9A961] bg-pearl-white px-4 py-2 font-montserrat text-sm font-bold">Zum Warmwerden: „{UEBUNGSSATZ}"</p>
      <p className="mt-3"><b className="font-montserrat font-extrabold">Reflexion: </b>{t.reflexion}</p>
      <p className="mt-3 text-[14px] text-midnight-blue/85">Wenn du magst, teile deinen Versuch in der Gruppe. {t.feedback ? 'Heute bekommst du deinen persönlichen Wirkungscheck von mir' : 'Deinen persönlichen Wirkungscheck von mir gibt es an Tag 2 und Tag 6'} – und wir können miteinander und aneinander wachsen. Wer still mitübt, gehört genauso dazu.</p>
    </div>
  );
}

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#C9A961]'}`}>
      <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
      {text}
    </p>
  );
}

/** Blendet einen Abschnitt beim Scrollen ein (Klassen cc-r / da in index.css). Ohne JavaScript
 *  oder mit "Bewegung reduzieren" ist alles sofort sichtbar. Ein Beobachter je Abschnitt, keine Bibliothek. */
function useEinblenden() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('da');
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.add('da');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** welle: eine hauchzarte Stimmwelle im Hintergrund (Claudia, 22.09.2026: "sanfte Schallwellen, die man kaum sieht");
 *  gold: leise wandernde Goldflecken hinter Glas-Kacheln ("mit dem bewegten Gold dahinter"). Beide reines CSS. */
function Abschnitt({ id, className, style, label, welle, gold, children }: { id?: string; className: string; style?: React.CSSProperties; label: string; welle?: boolean; gold?: boolean; children: React.ReactNode }) {
  const ref = useEinblenden();
  return (
    <section ref={ref} id={id} className={`cc-r ${gold ? 'cc-goldnebel' : ''} ${welle ? 'relative overflow-hidden' : ''} ${className}`} style={style} aria-labelledby={label}>
      {welle && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 opacity-[0.16]">
          <Stimmwelle />
        </div>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

/** Kleines Foto rechts neben der Ueberschrift eines Abschnitts - nie Text ueber einem riesigen Bild. */
function Kopfbild({ datei, alt, quer }: { datei: string; alt: string; quer?: boolean }) {
  return (
    <figure className={`m-0 justify-self-center overflow-hidden bg-[#13233F] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:justify-self-end ${KACHEL} ${quer ? 'aspect-[3/2] w-[clamp(220px,36vw,380px)]' : 'aspect-[9/16] w-[clamp(150px,22vw,210px)]'}`}>
      <img src={`/unverwechselbar/${datei}.webp`} alt={alt} width={quer ? 900 : 360} height={quer ? 600 : 640} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
    </figure>
  );
}
const KOPF = 'grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10';

/** Goldener Kreis mit Haken (Angebotskarten, nach Claudias Entwurf 23.10.2026). */
function GoldHaken() {
  return <span aria-hidden="true" className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#C9A961] text-[12px] font-black text-white">✓</span>;
}
function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#C9A961]" />;
}

export default function Challenge() {
  // Sprungmarke aus der Adresse (z. B. /challenge#anmelden vom Laufband der Startseite):
  // ScrollToTop springt bei jedem Seitenwechsel nach oben, deshalb hier nach dem Aufbau zum Ziel.
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => window.clearTimeout(t);
  }, []);
  // Beim Vorrendern steht hier das Bau-Datum; im Browser rechnet React mit dem echten Tag neu.
  const heute = new Date();
  const stand = standZeile(heute);
  const startKurz = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(START);
  // Die Inhalte der sieben Schritte oeffnen sich in der Challenge-Woche, je an ihrem Tag (Claudia, 22.09.2026 13:05 UTC:
  // "nicht 'nach dem Eintragen', sondern 'in der Challenge-Woche' - vorher nicht") - siehe `frei`.
  // Welche Tage sind freigeschaltet? Beim Vorrendern gilt das Bau-Datum, im Browser der echte Tag.
  const frei = TAGE.map((_, i) => heute >= freischaltung(heute, i));
  const listeRef = useRef<HTMLOListElement>(null);
  // Pfeil auf der Schiene folgt dem Scrollen: 0 % am Anfang der Liste, 100 % am Ende.
  useEffect(() => {
    const liste = listeRef.current;
    const pfeil = liste?.parentElement?.querySelector<HTMLElement>('[data-pfeil]');
    if (!liste || !pfeil || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const setzen = () => {
      raf = 0;
      const r = liste.getBoundingClientRect();
      const mitte = window.innerHeight * 0.45;
      const p = Math.min(1, Math.max(0, (mitte - r.top) / Math.max(1, r.height)));
      pfeil.style.setProperty('--p', `${(p * 100).toFixed(1)}%`);
    };
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(setzen); };
    setzen();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) window.cancelAnimationFrame(raf); };
  }, []);

  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '7 Tage für deine Wirkungskraft – die Video-Challenge',
    description: 'Sieben Tage, jeden Tag ein Audio-Impuls und eine Minute Video mit dem Handy – persönlicher Wirkungscheck von Claudia Conen an Tag 2 und Tag 6. Kostenfrei, in einer WhatsApp-Gruppe.',
    totalTime: 'P7D',
    step: TAGE.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Tag ${i + 1}: ${t.titel} (${t.schwerpunkt})`, text: t.aufgabe })),
    url: `https://claudiaconen.com${PFAD}`,
  };

  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO
        title="7 Tage für deine Wirkungskraft – die Video-Challenge"
        description="Sieben Tage, jeden Tag ein Audio-Impuls, eine Minute Video mit dem Handy, persönlicher Wirkungscheck von Claudia Conen an Tag 2 und Tag 6. Kostenfrei, in einer WhatsApp-Gruppe – mit den sieben Schritten, dem Workbook und dem Weg danach."
        path={PFAD}
        ogImage="https://claudiaconen.com/a27/og/og-challenge.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation hell />

      {/* Kopf: Foto-Reihen laufen hinter dem Text (Claudia, 22.09.2026 10:38 UTC: "dass diese Kacheln
          von der Webinar-Seite im Hintergrund hier auch laufen"), davor eine deckende Text-Kachel. */}
      <header className="relative overflow-hidden bg-[#13233F] pt-28 pb-12 sm:pt-32 sm:pb-16">
        <FotoReihen />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-6 text-pearl-white/75">
            <Brotkrumen krumen={[{ name: '7 Tage für deine Wirkungskraft' }]} />
          </div>
          {/* Kopf gekuerzt (Claudia, 24.10.2026 18:51: "der erste Slider eventuell nicht optimal in der Hoehe und
              Beschriftung, das Logo dafuer ist besser"): links Titel, ein Satz, Datum, Knopf; rechts ihr rundes
              Challenge-Logo ohne Rahmen. Der Satz "7 Tage. 30 Minuten..." steht direkt darunter im Block "Die Challenge". */}
          <div className="grid items-center gap-6 rounded-[12px] border border-[#C9A961]/45 bg-[rgba(19,35,63,0.9)] px-6 py-7 text-pearl-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-10 sm:py-9 md:grid-cols-[1fr_auto] md:gap-10" style={{ borderTopColor: '#F7E7CE' }}>
            <div className="min-w-0">
              <p className="flex items-center gap-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.14em] text-[#C9A961] sm:text-base sm:tracking-[0.22em]">
                <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
                Video-Challenge · kostenfrei
              </p>
              {/* Die grosse 7 steckt jetzt im Logo daneben, deshalb hier einzeilig statt doppelt. */}
              <h1 className="mt-5 font-montserrat font-black uppercase leading-[1.05] tracking-tight">
                <span className="gold-text-animated text-[1.9rem] sm:text-5xl">7 Tage für deine<br />Wirkungskraft</span>
              </h1>
              <p className="mt-5 font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">– weil Perfektion klickbar ist<br className="hidden sm:block" /> und Persönlichkeit Vertrauen weckt.</p>
              <p className="mt-4 max-w-xl font-inter text-lg leading-relaxed text-white">
                Selbstbewusst auftreten – vor Kunden und vor der Kamera. Mit deinem akustischen Fingerabdruck. Weil du ein Unikat bist.
              </p>
              <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue sm:text-base ${GOLD}`}>
                {stand}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href="#anmelden" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                  Nutze die Video-Challenge →
                </a>
                <a href="#programm" className="font-montserrat text-sm font-semibold text-[#C9A961] underline decoration-[#C9A961]/50 underline-offset-4 hover:decoration-[#F7E7CE]">
                  Die 7 Tage ansehen ↓
                </a>
              </div>
              {/* Vertrauen dort, wo die Entscheidung faellt: ihre belegten Eckdaten aus "Deine Trainerin". */}
              <p className="mt-6 border-t border-[#C9A961]/30 pt-4 font-inter text-sm text-pearl-white/85">
                Mit Claudia Conen · 37 Jahre Coach und Trainerin · zu hören bei Sat.1 und RTL
              </p>
            </div>
            <img src="/challenge/logo-challenge.webp" alt="Logo: 7 Tage Unverwechselbar – Video-Challenge mit Claudia Conen" width={720} height={720} className="order-first mx-auto w-48 [mask-image:radial-gradient(circle_closest-side,#000_90%,transparent_114%)] sm:w-60 md:order-none md:w-[340px]" />
          </div>
        </div>
      </header>

      {/* Belege direkt unter dem Kopf (Webby-Muster, Recherche 24.10.2026): dasselbe Logo-Band wie auf der Startseite. */}
      <LogoBand />

      {/* Neubau 24.10.2026 (Claudia: "neu anfangen, ganz klar und hoch professionell"): eine Seite, ein Ziel - die Anmeldung.
          Reihenfolge: Kopf -> Kennst du das? -> Loesung -> Sieben Tage -> Das bekommst du -> Fuer wen -> Trainerin -> Fragen -> Anmeldung. */}
      <Abschnitt id="kennst-du-das" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="spiegel-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Kennst du das?" hell />
          <h2 id="spiegel-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Du weißt so viel. Du kannst so viel.</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              { t: 'Und es kommt nicht an.', x: 'Unsicherheit hört man. Dein Gegenüber weiß nicht, woher sie kommt. Er spürt nur: Unsicherheit. Und bucht nicht.' },
              { t: 'Aufnehmen. Löschen. Wieder von vorn.', x: 'Im Kopf war alles klar. Vor der Kamera klingt es fremd. Am Ende postest du nichts.' },
              { t: 'Perfekt kann jetzt jeder. Dank KI.', x: 'Wenn alle gleich klingen, entscheidet der Preis. Es sei denn, man spürt dich: deine Identität und deine Kompetenz.' },
            ].map((k, i) => (
              <div key={k.t} style={{ ['--i' as string]: i }} className={`cc-stufe bg-white p-6 ${KACHEL}`}>
                <h3 className="font-montserrat text-xl font-extrabold leading-tight">{k.t}</h3>
                <p className="mt-3 font-inter text-[16px] leading-relaxed text-midnight-blue/85">{k.x}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl font-montserrat text-2xl font-extrabold leading-snug sm:text-3xl">Das ist kein Talent. Das ist Wirkung. <span className="underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Und Wirkung kann man üben.</span></p>
        </div>
      </Abschnitt>

      <Abschnitt id="loesung" className="bg-[#13233F] py-14 text-pearl-white sm:py-20" label="loesung-titel">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Kicker text="Die Challenge" />
          <h2 id="loesung-titel" className="mx-auto mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">7 Tage. 30 Minuten am Tag. Und deine Wirkung wächst – hörbar, sichtbar, spürbar.</h2>
          <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[['7 Tage', 'jeden Tag ein Schritt, ein Audio-Impuls, ein Video'], ['30 Minuten', 'am Tag, wann es dir passt'], ['Kostenfrei', 'Start und Abschluss live im Zoom']].map(([a, b]) => (
              <div key={a} className={`bg-pearl-white px-5 py-6 text-midnight-blue ${KACHEL}`}>
                <p className="font-montserrat text-3xl font-black">{a}</p>
                <p className="mt-1 font-inter text-[15px] text-midnight-blue/80">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Sieben Schritte - direkt unter dem Kopf (Claudia, 23.10.2026: "bring die 3-D-Icons weiter nach oben"). Claudia, 22.09.2026 10:55 UTC: "dieser grau-braune Ton hinter dem Programm ... in Weiss
          austauschen" und "viel weiter nach oben, damit die direkt wissen, warum sie dabei sein sollen". */}
      <Abschnitt id="programm" className="bg-white py-16 text-midnight-blue sm:py-24" label="programm-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Das Programm" hell />
              <h2 id="programm-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
                {/* Kein Ergebnisversprechen (Claudia, 24.10.2026: "du bleibst im Kopf ... ist zu hoch gegriffen"). */}
                Du wirkst immer. Die Frage ist nur: wie?
                <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Sieben Tage – sieben Schritte.</span>
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-lg text-midnight-blue">
                Jeden Tag ein Audio-Impuls von mir mit einem Gedanken, in dem du dich wiedererkennst, und einer konkreten Aufgabe. Die Inhalte öffnen sich in der Challenge-Woche, jeden Tag einer.
              </p>
            </div>
            <Kopfbild datei="programm" alt="Claudia Conen im hellblauen Blazer, Porträt" />
          </div>
          {/* Die finale Kachel geht ueber die volle Breite (Claudia, 22.09.2026 13:05 UTC: "so breit wie drei ... von ganz
              links bis ganz rechts, das ist ja der finale"); die Inhalte oeffnen sich je an ihrem Tag der Challenge-Woche. */}
          {/* Die sieben Tage untereinander, mit 3-D-Icon, zum Aufklappen; links die goldene Schiene mit Pfeil, der beim
              Scrollen mitwandert (Claudia, 24.10.2026: "Icons untereinander ... aufklappen ... Schritt fuer Schritt nach unten"). */}
          <div className="mt-9 grid gap-5 md:grid-cols-[34px_minmax(0,1fr)]">
            <Schiene />
            <ol ref={listeRef} className="grid list-none gap-3 p-0">
              {TAGE.map((t, i) => {
                const letzter = i === TAGE.length - 1;
                const kopf = (
                  <>
                    <img src={`/icons/${t.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="h-14 w-14 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)] sm:h-16 sm:w-16" />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-md px-2.5 py-1 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] ${letzter ? `${GOLD} text-midnight-blue` : 'bg-midnight-blue text-pearl-white'}`}>Tag {i + 1}</span>
                        <span className="font-montserrat text-xs font-bold text-midnight-blue/70">{letzter ? 'Mo., 2. Nov. · 19 Uhr live im Zoom' : KURZ.format(freischaltung(heute, i))}</span>
                        {t.feedback && <FeedbackPlakette />}
                      </span>
                      <span className="mt-1.5 block font-montserrat text-base font-extrabold uppercase leading-tight tracking-wide sm:text-lg">{t.titel}</span>
                      <span className="mt-0.5 block font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">{t.schwerpunkt}</span>
                    </span>
                  </>
                );
                return (
                  <li key={t.titel} style={{ ['--i' as string]: i }} className="cc-stufe">
                    {/* Jeder Tag laesst sich jederzeit aufklappen: Gedanke und Inhalt sind sichtbar (Claudia, 24.10.2026: "alle
                        Erklaerungen und persoenlichen Worte entfernt"); Aufgabe und Reflexion oeffnen sich erst an ihrem Tag. */}
                    <details className={`group bg-white text-midnight-blue ${KACHEL}`}>
                      <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3.5 sm:px-6 [&::-webkit-details-marker]:hidden">
                        {kopf}
                        <span className="flex flex-none items-center gap-2 font-montserrat text-xs font-bold text-midnight-blue/70"><span className="hidden sm:inline"><span className="group-open:hidden">Aufklappen</span><span className="hidden group-open:inline">Zuklappen</span></span><span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span></span>
                      </summary>
                      <div className="border-t border-[#C9A961]/40 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
                        {frei[i] ? (
                          <TagInhalt t={t} />
                        ) : (
                          <div className="font-inter text-[15px] leading-relaxed text-midnight-blue">
                            <p className="font-cormorant text-xl italic leading-snug sm:text-2xl">„{t.einstieg}"</p>
                            <p className="mt-3">{t.inhalt}</p>
                            <p className="mt-3 flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.12em] text-midnight-blue/70"><Schluessel /> Deine Aufgabe öffnet sich am {KURZ.format(freischaltung(heute, i))}</p>
                          </div>
                        )}
                      </div>
                    </details>
                  </li>
                );
              })}
              {/* Tag 8 (Claudia, 24.10.2026: Werbetag in der Gruppe am Dienstag danach). */}
              <li className="cc-stufe">
                <div className={`flex items-center gap-4 bg-pearl-white px-4 py-3.5 text-midnight-blue sm:px-6 ${KACHEL}`}>
                  <img src="/icons/schritt-2.webp" alt="" width={256} height={256} loading="lazy" decoding="async" className="h-14 w-14 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)] sm:h-16 sm:w-16" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-midnight-blue px-2.5 py-1 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-pearl-white">Zusätzlich · Tag 8</span>
                      <span className="font-montserrat text-xs font-bold text-midnight-blue/70">Di., 3. Nov.</span>
                    </span>
                    <span className="mt-1.5 block font-montserrat text-base font-extrabold uppercase leading-tight tracking-wide sm:text-lg">Netzwerken</span>
                    <span className="mt-0.5 block font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">Dein Werbetag in der Gruppe · stell dein Business vor</span>
                  </span>
                </div>
              </li>
            </ol>
          </div>
          <EintragBlock />
        </div>
      </Abschnitt>

      <Abschnitt id="das-bekommst-du" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="bekommst-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Das bekommst du – kostenfrei" hell />
          <h2 id="bekommst-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Alles, was du für deine sieben Tage brauchst.</h2>
          <ul className="mt-9 grid list-none gap-3 p-0 sm:grid-cols-2">
            {[
              ['Auftakt live im Zoom', 'Montag, 26. Oktober, 19 Uhr: Kennenlernen, Übungsplan, dein Vorher-Video'],
              ['7 Audio-Impulse von mir', 'jeden Tag einer, mit einem Gedanken und einer konkreten Aufgabe'],
              ['7 Workbooks', 'jeden Tag eins, zum Ausfüllen'],
              ['2 persönliche Wirkungschecks', 'an Tag 2 und Tag 6 schaue ich mir dein Video an'],
              ['Abschluss live im Zoom', 'Montag, 2. November, 19 Uhr: dein Pitch in 30–60 Sekunden, freiwillig'],
              ['Deine Auszeichnung fürs Durchziehen', 'für alle, die sieben Tage dabeibleiben und ihre Videos posten'],
              ['Netzwerk-Tag', 'Dienstag, 3. November: stell dein Business in der Gruppe vor'],
              ['Deine Gruppe', 'Austausch bei WhatsApp oder Telegram, ohne Werbung'],
            ].map(([t, x], i) => (
              <li key={t} style={{ ['--i' as string]: i }} className={`cc-stufe flex items-start gap-4 bg-white px-5 py-4 ${KACHEL}`}>
                <GoldHaken />
                <span><b className="block font-montserrat text-base font-extrabold">{t}</b><span className="mt-0.5 block font-inter text-[15px] text-midnight-blue/80">{x}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </Abschnitt>

      <Abschnitt id="fuer-wen" className="bg-white py-16 text-midnight-blue sm:py-24" label="fuer-wen-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Für wen das ist" hell />
          <h2 id="fuer-wen-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Diese Challenge eignet sich für dich, wenn du …
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div style={{ ['--i' as string]: 0 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL}`}>
              <div className="flex items-center gap-4">
                <img src="/icons/wirkung.webp" alt="" width={256} height={256} loading="lazy" decoding="async" className="h-16 w-16 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)]" />
                <h3 className="font-montserrat text-base font-extrabold uppercase tracking-wide">Für dich, wenn du</h3>
              </div>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {FUER.map((z) => (
                  <li key={z} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed"><Haken /><span>{z}</span></li>
                ))}
              </ul>
            </div>
            <div style={{ ['--i' as string]: 1 }} className={`cc-stufe bg-white p-6 sm:p-7 ${KACHEL}`}>
              <div className="flex items-center gap-4">
                <img src="/icons/ki.webp" alt="" width={256} height={256} loading="lazy" decoding="async" className="h-16 w-16 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)]" />
                <h3 className="font-montserrat text-base font-extrabold uppercase tracking-wide">Nicht für dich, wenn du</h3>
              </div>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {NICHT_FUER.map((z) => (
                  <li key={z} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed"><span aria-hidden="true" className="mt-0.5 font-montserrat font-black text-[#C9A961]">✕</span><span>{z}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Warum ich - hell (Claudia, 22.09.2026 15:00 UTC: "der Bereich ist viel zu dunkel", "zu viel und zu dunkel"). */}
      <Abschnitt className="bg-white py-16 text-midnight-blue sm:py-24" label="warum">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-14">
          <div>
            <Kicker text="Deine Trainerin" hell />
            {/* Nur Claudias eigene Worte (Claudia, 24.10.2026: "das Warum ... auf der Über-mich-Seite holen und nicht irgendwas
                schreiben"): Positionierung vom 09.10.2026 + Saetze aus UeberMich.tsx, wortgleich. */}
            <h2 id="warum" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Die Brücke zwischen Mensch und Maschine.</h2>
            <p className="mt-3 font-montserrat text-lg font-bold text-midnight-blue/80">Deine Persönlichkeit schafft Vertrauen. Vertrauen gewinnt Kunden.</p>
            <p className="mt-7 border-l-4 border-[#C9A961] pl-5 font-cormorant text-3xl italic leading-snug sm:text-4xl">
              Alles, was wir erleben, formt uns. Mich hat es ganze 39 Jahre gekostet, um zu erkennen, warum ich diesen Job mache und warum ich so gut darin bin.
            </p>
          </div>
          <div>
            <h3 className="font-montserrat text-base font-extrabold uppercase tracking-wide">Die Entführung, die meine Berufung prägte</h3>
            <div className="mt-3 grid gap-3 font-inter text-[17px] leading-relaxed text-midnight-blue">
              <p>72 Stunden kann sie nichts sehen, nur diese Stimmen hören.</p>
              <p>Wie besessen hört sie hin, wenn Menschen miteinander reden.</p>
              <p>Unbewusst ist sie fokussiert auf die Wahrnehmung der hörbaren Emotionen.</p>
              <p className="font-semibold italic">Dieses kleine Mädchen steckt heute noch in mir.</p>
            </div>
            <p className="mt-6 font-inter text-[15px] text-midnight-blue">
              37 Jahre als Coach und Trainerin. Auf Bühnen, vor Kameras, in Unternehmen. Zu hören unter anderem bei Sat.1 und RTL.
            </p>
            <p className="mt-3 font-inter text-[15px] text-midnight-blue">
              Die ganze Geschichte findest du auf{' '}
              <Link to="/ueber-mich" className="underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">„Über mich"</Link>.
            </p>
          </div>
        </div>
      </Abschnitt>

      {/* Echte Kundenstimmen mit Video, Bauart der Startseite (Claudias Freigabe der Namen 21./22.09.2026). */}
      <SocialProof />

      <Abschnitt id="fragen" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="fragen-titel">
        <div className="mx-auto max-w-3xl px-6">
          <Kicker text="Häufige Fragen" hell />
          <h2 id="fragen-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Gut zu wissen, bevor es losgeht.</h2>
          <div className="mt-8 grid gap-3">
            {[
              ['Was kostet die Challenge?', 'Nichts. Die sieben Tage, die Audio-Impulse, die Workbooks, die beiden Wirkungschecks und die Live-Termine im Zoom sind kostenfrei.'],
              ['Wie viel Zeit brauche ich?', 'Rund 30 Minuten am Tag. Such dir eine feste Zeit – wann auch immer. Für dein Video hast du jeweils 24 Stunden.'],
              ['Muss ich mein Video zeigen?', 'Nein. Wenn du magst, teilst du deinen Versuch in der Gruppe. Wer still mitübt, gehört genauso dazu. Für deinen Wirkungscheck an Tag 2 und Tag 6 postest du dein Video innerhalb von 24 Stunden.'],
              ['Wo läuft die Challenge?', 'In einer Gruppe bei WhatsApp oder Telegram, dazu Auftakt und Abschluss live im Zoom. Den Link bekommst du nach dem Eintragen.'],
              ['Darf ich in der Gruppe Werbung machen?', 'Austausch ist gern gesehen, Werbung nicht. Dafür gibt es den Abschluss im Zoom am 2. November und den Netzwerk-Tag am 3. November.'],
              ['Was passiert nach den sieben Tagen?', 'Du bekommst deine Auszeichnung fürs Durchziehen. Und wenn du weitermachen möchtest, zeige ich dir drei Wege – ohne Druck.'],
            ].map(([f, a]) => (
              <details key={f} className={`group bg-white text-midnight-blue ${KACHEL}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-montserrat text-base font-extrabold [&::-webkit-details-marker]:hidden">{f}<span aria-hidden="true" className="text-[#C9A961] transition-transform group-open:rotate-45">+</span></summary>
                <p className="border-t border-[#C9A961]/40 px-5 pb-5 pt-3 font-inter text-[15px] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Abschnitt>

      {/* Anmeldung direkt unter dem Kopf (Kritiker-Durchgang 22.09.2026, Claudias Ja 12:22 UTC: "mach das alles so"). */}
      <section id="anmeldung" className="bg-pearl-white pt-6 pb-4 sm:pt-8" aria-label="Anmeldung zur Challenge">
        <div className="mx-auto max-w-6xl px-6">
          <ChallengeAnmeldung start={startKurz} />
        </div>
      </section>

      {/* Bewegter Knopf zu den drei Wegen (Claudia, 24.10.2026), fuehrt auf die eigene Angebotsseite. */}
      <section className="bg-pearl-white pb-20 pt-4 sm:pb-24" aria-label="Drei Wege zum Ziel">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue/70">Du willst nicht warten?</p>
          <p className="mx-auto mt-3 max-w-xl font-montserrat text-2xl font-extrabold leading-snug text-midnight-blue sm:text-3xl">Abkürzung und Vertiefung.</p>
          <a href="/3-wege" className={`cc-abk-knopf mt-5 inline-flex items-center gap-3 rounded-full px-9 py-5 font-montserrat text-lg font-extrabold text-midnight-blue sm:text-xl ${GOLD}`}>
            Nutze die Abkürzung – 3 Wege zum Ziel <span aria-hidden="true" className="cc-abk-pfeil">→</span>
          </a>
        </div>
      </section>


      {/* Fuer wen - hell mit 3-D-Icons (Claudia, 22.09.2026 13:15/13:17 UTC: "doofer Satz", "sieht sehr haesslich aus",
          "so schoene Icons ... bring da noch welche ein"). Ueberschrift und "30 Minuten am Tag" in ihrem Wortlaut. */}









      {/* Netzwerk Mittelstand - deine Community, letzter Abschnitt (Claudia, 22.09.2026 13:19 UTC: "das soll unten als
          Letztes sein"). Machart ihrer Community-Startseite (Foto 13:17 UTC): grosse Ueberschrift, das Wort blass mit
          goldener Kontur, Schreibschrift, Satz in einer weissen Pille. Seit 14:51-15:01 UTC OHNE Liste, OHNE runde Bilder,
          OHNE Video ("alles zu unruhig", "nur das von Gabi und mir"), und der fruehere dunkle Schluss-Satz steht jetzt
          hier als Einstieg ("viel zu dunkel"). Gabi steht NUR hier. */}
      {/* Abschnitt „Willkommen bei den Unverwechselbaren“ entfernt (Claudia, 24.10.2026). */}

      <Footer />
      <MobilLeiste />
    </div>
  );
}
