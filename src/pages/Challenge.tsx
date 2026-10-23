import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Brotkrumen from '../components/Brotkrumen';
import WorkbookBlaettern from '../components/WorkbookBlaettern';
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
/** Lernbox - Claudia, 22.09.2026 11:27 UTC: "so ein kleiner Test ... Feld zum Aufklappen, Lernbox, Ja- und
 *  Nein-Fragen mit einer Antwort, alle zu Wirkung, Stimme, Performance - sieben Fragen". Ohne Hirnforschungszahlen. */
const LERNBOX: { frage: string; ja: boolean; antwort: string }[] = [
  { frage: 'Entscheiden Zuhörer, ob sie dir zuhören, bevor du deinen ersten Satz beendet hast?', ja: true, antwort: 'Ja. Die Stimme wirkt, bevor der Inhalt ankommt – deshalb arbeitest du ab Tag 1 an dem einen Satz, der sofort ankommt.' },
  { frage: 'Klingt eine Stimme tiefer, wenn man sie nach unten drückt?', ja: false, antwort: 'Nein. Tiefer wird sie durch Ruhe und Atmung. Drücken macht sie eng und angestrengt.' },
  { frage: 'Ist eine Pause im Satz ein Zeichen von Unsicherheit?', ja: false, antwort: 'Nein. Die Pause ist der Moment, in dem der andere versteht. Profis machen mehr Pausen, nicht weniger.' },
  { frage: 'Bleibt eine perfekt vorgetragene Rede besser im Kopf als eine mit einem Versprecher?', ja: false, antwort: 'Nein. Perfektion ist klickbar. Ein Mensch, der echt ist, bleibt – der Versprecher, über den du lachst, macht dich glaubwürdiger.' },
  { frage: 'Merken sich Menschen Zahlen besser als Geschichten?', ja: false, antwort: 'Nein. Geschichten bleiben, Daten nicht. Ein Moment, eine Person, ein Satz, der fiel.' },
  { frage: 'Reicht es, eine Rede gut zu schreiben, damit sie gut wirkt?', ja: false, antwort: 'Nein. Wirkung entsteht beim Sprechen: Stimme, Haltung, Blick. Deshalb nimmst du dich in der Challenge auf – Text allein reicht nicht.' },
  { frage: 'Kann man Wirkung trainieren?', ja: true, antwort: 'Ja. Wirkung ist kein Zufall. Sie ist trainierbar, sichtbar, entscheidbar – in sieben Tagen fängst du an.' },
];
/** Die 7 A's vom Flyer (nach Karsten Brocke) - Claudias ausdrueckliche Ansage vom 22.09.2026, 11:27 UTC. */
const SIEBEN_A = ['A-bsolut', 'A-ngenehm', 'A-nders', 'A-ls', 'A-lle', 'A-nderen', 'A-uffallen'];







const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
/** Der Schritt danach (Claudia, 23.10.2026 17:07: "entweder die 1 Stunde oder das Mentoring-Programm").
 *  Einzeltermin = Tentary "1:1 Training 90 min" (180 EUR Net), Mentoring = Tentary p/b95rPm (1.990 EUR Net, Fruehbucher bis 2.11.). Start verlegt auf Mo 16.11.2026 (Claudia, 23.10.2026 17:30). */
const EINZEL_NETTO = 180;
const EINZEL_LINK = 'https://umsatzstimme-claudiaconen.mytentary.com/p/zJYlWu/checkout';
const MENTORING_NETTO = 1990;
const MENTORING_LINK = 'https://umsatzstimme-claudiaconen.mytentary.com/p/b95rPm/checkout';
const brutto = (netto: number) => (netto * 1.19).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
/** Ruhige Champagner-Flaeche statt kraeftigem Gold fuer grosse Bloecke (Farben der neuen Seiten, Claudia 15.10.2026). */
const FLAECHE = 'bg-[linear-gradient(135deg,#FCF6EC,#F7E7CE)] border border-[#C9A961]/60';
/** Plakette wie in der Wochen-Grafik: nur an Tag 2 und 6 (Claudia, 22.10.2026 05:45 UTC: "dass die Leute nicht denken,
 *  sie bekommen jeden Tag ein Feedback"). */
function FeedbackPlakette() {
  return <span className={`flex-none rounded-md px-2.5 py-1.5 font-montserrat text-[10px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Feedback</span>;
}
/** Claudias Idee vom 22.09.2026, 02:13 UTC: vom Event per QR in eine Video-Challenge - sieben Tage,
 *  sieben Schritte, 60 Sekunden am Tag. Kanal: ihre WhatsApp-Gruppe "Video-Challenge" (Einladungslink
 *  von ihr am 22.09.2026, 02:20 UTC). Aendert sie den Link, hier tauschen. */
/** Workbook "Entdecke deine Stimmwirkung" (Brainself-Buchauszug), korrigierte Fassung vom 22.09.2026
 *  (Aufgabe 18: keine Millisekunden-Zahl, kein "Opfer", 37 Jahre, Nachtblau). Blaettern: WorkbookBlaettern.tsx. */
const WORKBOOK_PDF = '/unverwechselbar/workbook-entdecke-deine-stimmwirkung.pdf';


/** Fuenf Klapp-Kacheln (Claudia, 22.09.2026 13:13 UTC: "sieht sehr gequetscht aus ... als Klappkachel, das Icon neben
 *  der Schrift ... so dass die KI es lesen kann") - ihre Texte, nur geglaettet. Vorschau sichtbar, Rest im <details>. */
const WERKZEUG: { titel: string; vorschau: string; text: string; icon: string }[] = [
  { titel: 'Stimme', vorschau: 'Niemand klingt wie du, wenn du ins Handy sprichst.', text: 'Stell dir vor, du sprichst zu einem Menschen – und sprichst den Letzten in der Reihe an. So überträgt sich deine Energie durch den ganzen Raum.', icon: 'stimme' },
  { titel: 'Innere Haltung', vorschau: 'Bevor du auf Aufnahme drückst: Wen willst du erreichen?', text: 'Frag dich: Was willst du in diesem Menschen erreichen? Welches Gefühl willst du auslösen? Was soll ihn bewegen? Es ist ein Mensch, nicht ein Publikum. Es ist immer ein Mensch.', icon: 'praesenz' },
  { titel: 'Der Blick', vorschau: 'Schau in die Linse deines Handys – nicht dich selbst an.', text: 'Der Zuhörer sitzt genau in dieser Linse. Sonst hat er deinen Blickkontakt nicht. Das merkt er – und die Verbindung stellt sich nicht her.', icon: 'wirkung' },
  { titel: 'Storytelling', vorschau: 'Jeder Mensch ist ein Unikat. Entdecke deine Geschichten.', text: 'Die Geschichten, die mit deinem Business in Einklang stehen. Echte Geschichten, Wahres aus dem Leben – dann hört man dir gerne zu.', icon: 'story' },
  { titel: 'Das Mikrofon', vorschau: 'Das Handy nimmt den Raum auf. Ein Ansteckmikrofon holt deine Stimme nach vorn.', text: 'Es gibt sie günstig – und deine Stimme kommt damit ganz anders zur Wirkung. Natürlich kannst du auch ohne dabei sein. Ich empfehle dir, eins zu bestellen – auch für danach.', icon: 'botschaft' },
];

/** Die Punkte aus dem Kopf, jetzt hell darunter (Claudia, 22.09.2026 13:01/13:05 UTC: "damit das oben nicht so voll
 *  gepackt ist ... unter den Slider kommt dann hell und da werden die Punkte aufgelistet"). */
/** Ergebnis, Leistungen und Ablauf auf einen Blick (Claudia, 21.10.2026 10:48-10:53 UTC). */
/** Ablauf auf einen Blick als Listen (Claudia, 23.10.2026 17:38: "alles untereinander gelistet ... in der Mitte der
 *  Mehrwert der Woche"). Die Mitte ist hervorgehoben. */
const AUF_EINEN_BLICK: { wann: string; was: string; punkte: string[] }[] = [
  { wann: 'Montag, 26. Oktober · 19 Uhr', was: 'Auftakt live im Zoom', punkte: ['Erstes Kennenlernen', 'Deinen Übungsplan für die Woche festlegen', 'Dein Vorher-Video aufnehmen'] },
  { wann: '26. Oktober bis 2. November', was: 'Deine sieben Tage', punkte: ['7 Audio-Impulse von mir – jeden Tag einer', '7 Workbooks – jeden Tag eins', 'Jeden Tag dein 1-Minuten-Video – 24 Stunden Zeit', '2 persönliche Feedbacks von mir – an Tag 2 und Tag 6', '2 Live-Termine im Zoom – Auftakt und Abschluss'] },
  { wann: 'Montag, 2. November · 19 Uhr', was: 'Abschluss live im Zoom', punkte: ['Deine Chance, vor allen Teilnehmern zu pitchen – freiwillig', 'Netzwerken untereinander – vielleicht sitzt dort dein bester Kunde', 'Dein Zertifikat'] },
];



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
    titel: 'Dein Elevator Pitch: die Generalprobe', schwerpunkt: 'Alles in drei Sätzen · dein Nachher-Video', icon: 'schritt-7',
    einstieg: 'Sein Problem. Dein Beweis. Warum du.',
    inhalt: 'Alles in drei Sätzen, zu einem Menschen gesprochen, nicht in eine Linse. Das ist deine Generalprobe für die Bühne beim Abschluss.',
    aufgabe: 'Sprich deinen Pitch in drei Sätzen – sein Problem, dein Beweis, warum du – mit deinem Call to Action am Ende. Leg danach dein Vorher-Video von Tag 1 daneben und poste beide zusammen, mit #unverwechselbar.',
    zusatz: 'Schau dir beide Videos an. Das ist Selbstsicherheit: das Ergebnis von sieben Videos. Am Montag beim Abschluss kannst du ihn live vor der Gruppe halten, 60 Sekunden, freiwillig – vielleicht sitzt dort schon dein nächster Kunde.',
    reflexion: 'Was hörst und siehst du heute, das an Tag 1 noch nicht da war?',
  },
];

/** Tipp 2 "am Morgen" - Claudias Aufwachuebung in ihrem Wortlaut (Discord, 22.09.2026, 09:19 UTC), nur geglaettet. */
const MORGEN = {
  aufgabe: 'Morgens, bevor du irgendetwas anderes tust: Handy in die Hand, Aufnahme an – und sprich diesen Satz ein.',
  satz: 'Meine Stimme ist unaufhaltbar. Überall auf der Welt kann ich blitzschnell Menschen erreichen – sobald ich den Hörer in die Hand nehme, in ein Video spreche, auf einer Bühne stehe oder ins Radio rede. Deshalb lerne ich meine Stimme kennen.',
  schrittTitel: 'Dann weck deine Stimme auf – fünf Minuten:',
  schritte: [
    'Stell dir vor: Du wirst wach, und deine Stimmlippen sind über Nacht eingefroren – wie Eisschollen auf dem Wasser. Sobald du dich streckst und die Lippen leckst, knackt das Eis. Es beginnt zu tauen.',
    'Gib deinem Rachen, deinem Mund, deinem ganzen Sprechapparat Platz. Spiel mit der Zunge: Drück sie oben an den Gaumen – und sag dir dabei „Guten Morgen".',
    'Streck die Zunge weit heraus, ganz weit – und zähl dabei bis zehn.',
    'Kreise mit der Zunge jeden einzelnen Zahn ab – außen, hinter der Lippe.',
    'Summ. Ungefähr eine Minute. Und beweg dich dabei in deinem Bett wie eine Raubkatze.',
    'Trink ein Glas Wasser. Über Nacht verlierst du viel davon – und deine Stimmlippen sind fein und zart.',
    'Bei jeder Bewegung: Die Eisschollen draußen auf dem Meer tauen, und das Meer beginnt, Wellen zu schlagen. Genau so schwingen deine Stimmlippen – zart, weich, in Wellen. Je freier sie schwingen, desto besser klingen sie.',
  ],
  danach: 'Jetzt noch einmal den Satz. Fühl hinein: Klingt deine Stimme ein bisschen anders?',
};

/** Die Programm-Kacheln sind die sieben Tage (Claudias Briefing) - eine Liste, ein Inhalt. */
const SCHRITTE = TAGE;

/** Tipp 1, vor Tag 1 - Claudias Diktat vom 22.09.2026, 11:17 UTC ("Der Tipp soll Gold leuchten", aufklappbar,
 *  "das kannst du auch jetzt schon tun"). Anleitung fuer WhatsApp in vier Schritten; ihre Nummer aus dem Flyer. */
const WEGWEISER = {
  titel: 'Erstelle dir eine eigene WhatsApp-Gruppe – nur für dich',
  vorschau: 'Meine Empfehlung bis zum Start: ein Raum, in dem du übst, ohne dass dich jemand stört. Das kannst du jetzt schon tun.',
  text: 'In dieser Gruppe bist nur du. Dort übst du, hörst deine Steigerung – und sammelst vielleicht sogar Videomaterial für Social Media. Nach sieben Tagen entdeckst du deine eigenen Erfolge, Aufnahme für Aufnahme.',
  schritte: [
    'WhatsApp öffnen → „Neue Gruppe" (Android: die drei Punkte oben rechts · iPhone: „Neuer Chat" und dann „Neue Gruppe").',
    'Niemanden auswählen und einfach weiter – WhatsApp erlaubt eine Gruppe nur mit dir. Besteht deine Version auf einer zweiten Person: Lade mich ein (+49 160 93102073) und wirf mich danach wieder raus. Ich nehme es nicht persönlich.',
    'Namen vergeben – zum Beispiel „Meine Stimme". Fertig.',
    'Ab jetzt: jede Aufnahme dort hineinsprechen. Nach sieben Tagen hörst du den Unterschied.',
  ],
};

/** So laeuft es ab - Claudias Diktate vom 22.09.2026, 13:07 und 13:10 UTC ("Wie kann ich das ein bisschen sortieren",
 *  "schreib das kuerzer"), in ihrer Reihenfolge, ein Gedanke je Satz. Termine aus START/ENDE. */
const ABLAUF: { titel: string; text: string }[] = [
  // Gekuerzt am 23.10.2026 (Claudia: "nicht so viele Sachen doppelt"): Auftakt, Jeden Tag ein Impuls und Abschluss
  // stehen schon in "Dein Ablauf auf einen Blick", das Workbook als Kachel beim Programm.
  { titel: 'Eintragen', text: 'Du trägst dich hier ein. Danach kommst du in deine Gruppe, bei WhatsApp oder Telegram.' },
  { titel: 'Die Gruppe', text: 'Austausch untereinander ist gern gesehen. Werbung nicht – dafür gibt es am letzten Tag Werbezeit, für jeden. Danach darfst du dein Business in der Community-Gruppe vorstellen.' },
  { titel: 'Dein Feedback', text: 'An Tag 2 und Tag 6 bekommst du persönliches Feedback von mir, wenn du dein Video innerhalb der 24 Stunden postest. Danach darfst du dein Video verbessern – für dich, um daran zu wachsen.' },
  { titel: 'Zwischendurch', text: 'Impulse zu Storytelling und Prompts für die KI, die du direkt nutzen kannst – um deine Positionierung zu schärfen und deine innere Haltung nach außen zu tragen.' },
];
const ABLAUF_HINWEIS = 'Mein Tipp: Nimm dir täglich 30 Minuten Zeit – wann auch immer. Alles läuft in der Gruppe bei WhatsApp oder Telegram, bis unsere Plattform fertig ist. Dann lade ich euch alle dazu ein.';

const FUER = [
  'gehört werden willst – im Meeting, am Telefon, vor Kunden, auf der Bühne',
  'täglich 30 Minuten und ein Handy hast',
  'dich selbst hören willst, auch wenn es am Anfang unangenehm ist',
  'Feedback willst statt Applaus',
  'eine Woche lang jeden Tag einen kleinen Schritt gehst',
];
const NICHT_FUER = [
  'eine perfekte Aufnahme willst statt einer echten',
  'Tipps sammeln, aber nichts ausprobieren möchtest',
  'erst eine Bühne brauchst, bevor du übst',
  'erwartest, dass die KI das Sprechen für dich übernimmt',
];


/** Unter den Tagen: kein direkter Weg in die Gruppe, nur zurueck zum Eintragen (Claudia, 22.09.2026). */
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
      <p className="mt-3 text-[14px] text-midnight-blue/85">Wenn du magst, teile deinen Versuch in der Gruppe. {t.feedback ? 'Heute bekommst du persönliches Feedback von mir' : 'Persönliches Feedback von mir gibt es an Tag 2 und Tag 6'} – und wir können miteinander und aneinander wachsen. Wer still mitübt, gehört genauso dazu.</p>
    </div>
  );
}

function Kicker({ text, hell }: { text: string; hell?: boolean }) {
  return (
    <p className={`flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] ${hell ? 'text-midnight-blue' : 'text-[#EBD197]'}`}>
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

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#C9A961]" />;
}

export default function Challenge() {
  const [antworten, setAntworten] = useState<(boolean | null)[]>(() => LERNBOX.map(() => null));
  const [buchOffen, setBuchOffen] = useState(false);
  const nBeantwortet = antworten.filter((a) => a !== null).length;
  const nRichtig = antworten.filter((a, i) => a === LERNBOX[i].ja).length;
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

  const strukturierteDaten = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '7 Tage für deine Wirkungskraft – die Video-Challenge',
    description: 'Sieben Tage, jeden Tag ein Audio-Impuls und eine Minute Video mit dem Handy – persönliches Feedback von Claudia Conen an Tag 2 und Tag 6. Kostenfrei, in einer WhatsApp-Gruppe.',
    totalTime: 'P7D',
    step: TAGE.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Tag ${i + 1}: ${t.titel} (${t.schwerpunkt})`, text: t.aufgabe })),
    url: `https://claudiaconen.com${PFAD}`,
  };

  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO
        title="7 Tage für deine Wirkungskraft – die Video-Challenge"
        description="Sieben Tage, jeden Tag ein Audio-Impuls, eine Minute Video mit dem Handy, persönliches Feedback von Claudia Conen an Tag 2 und Tag 6. Kostenfrei, in einer WhatsApp-Gruppe – mit den sieben Schritten, dem Workbook und dem Weg danach."
        path={PFAD}
        ogImage="https://claudiaconen.com/a27/og/og-challenge.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation hell />

      {/* Kopf: Foto-Reihen laufen hinter dem Text (Claudia, 22.09.2026 10:38 UTC: "dass diese Kacheln
          von der Webinar-Seite im Hintergrund hier auch laufen"), davor eine deckende Text-Kachel. */}
      <header className="relative overflow-hidden bg-[#0A1628] pt-28 pb-14 sm:pt-36 sm:pb-20">
        <FotoReihen />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-6 text-pearl-white/75">
            <Brotkrumen krumen={[{ name: '7 Tage für deine Wirkungskraft' }]} />
          </div>
          <div className="max-w-3xl rounded-[12px] border border-[#C9A961]/45 bg-[rgba(19,35,63,0.86)] px-6 py-8 text-pearl-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-10 sm:py-11" style={{ borderTopColor: '#F7E7CE' }}>
            {/* Claudia, 22.09.2026 11:16 UTC: Kicker groesser; "Sieben Tage" in derselben Schrift wie "fuer deine
                Wirkung" (eine Zeile Gold-Schimmer, nicht zwei Schriften); weniger weisser Text; Punkte, was die
                Challenge bringt; das Datum "damit es direkt auffaellt". */}
            <p className="flex items-center gap-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.22em] text-[#EBD197] sm:text-base">
              <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
              Video-Challenge
            </p>
            {/* Claudia, 22.09.2026 15:37/15:42 UTC - Wortlaut wie auf dem Vorschaubild: "die 7 groesser und heller",
                "7 Tage fuer deine Wirkungskraft - weil Perfektion klickbar ist und Persoenlichkeit Vertrauen weckt",
                Knopf "Nutze die Video-Challenge". Die 7 ist hell (kein Schimmer), der Rest traegt den Gold-Schimmer. */}
            <h1 className="mt-5 flex items-center gap-4 font-montserrat font-black uppercase tracking-tight sm:gap-6">
              <span className="text-[5.6rem] leading-[0.85] text-[#FFF6DC] drop-shadow-[0_0_28px_rgba(247,231,206,0.55)] sm:text-[10rem]">7</span>
              <span className="gold-text-animated text-[1.45rem] leading-[1.04] sm:text-5xl">Tage für deine<br />Wirkungskraft</span>
            </h1>
            <p className="mt-5 font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">– weil Perfektion klickbar ist<br className="hidden sm:block" /> und Persönlichkeit Vertrauen weckt.</p>
            {/* Suchwoerter (Claudia 21.10.2026 11:53 UTC "ja"): selbstbewusst auftreten, vor der Kamera. */}
            <p className="mt-3 font-montserrat text-lg font-extrabold leading-snug text-[#EBD197] sm:text-xl">Selbstbewusst auftreten – vor Kunden und vor der Kamera.</p>
            {/* Claudia, 22.09.2026 13:01 UTC: "auf dem Banner ist mir zu viel Text" - ein Satz zur Dauer, der Fingerabdruck-
                Satz, "mehr nicht". Die Punkte stehen hell unter dem Kopf, der WhatsApp-Hinweis steht im Formular. */}
            <p className="mt-4 max-w-xl font-montserrat text-base font-extrabold leading-snug text-white sm:text-lg">
              7 Tage. 30 Minuten am Tag. Und deine Wirkung wächst – hörbar, sichtbar, spürbar.
            </p>
            <p className="mt-4 max-w-xl font-inter text-lg leading-relaxed text-white">
              Nutze eine der wertvollsten Marketing-Möglichkeiten der Welt: deinen akustischen Fingerabdruck. Weil du ein Unikat bist.
            </p>
            <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue sm:text-base ${GOLD}`}>
              {stand}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#anmelden" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                Nutze die Video-Challenge →
              </a>
              <a href="#tage" className="font-montserrat text-sm font-semibold text-[#EBD197] underline decoration-[#C9A961]/50 underline-offset-4 hover:decoration-[#F7E7CE]">
                Die 7 Tage ansehen ↓
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sieben Schritte - direkt unter dem Kopf (Claudia, 23.10.2026: "bring die 3-D-Icons weiter nach oben"). Claudia, 22.09.2026 10:55 UTC: "dieser grau-braune Ton hinter dem Programm ... in Weiss
          austauschen" und "viel weiter nach oben, damit die direkt wissen, warum sie dabei sein sollen". */}
      <Abschnitt id="programm" className="bg-white py-16 text-midnight-blue sm:py-24" label="programm-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Das Programm" hell />
              <h2 id="programm-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
                Sieben Schritte. Ein Ergebnis:
                <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Du bleibst im Kopf.</span>
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-lg text-midnight-blue">
                Jeden Tag ein Audio-Impuls von mir mit einem Gedanken, in dem du dich wiedererkennst, und einer konkreten Aufgabe. Die Inhalte öffnen sich in der Challenge-Woche, jeden Tag einer.
              </p>
            </div>
            <Kopfbild datei="programm" alt="Claudia Conen im hellblauen Blazer, Porträt" />
          </div>
          {/* Die finale Kachel geht ueber die volle Breite (Claudia, 22.09.2026 13:05 UTC: "so breit wie drei ... von ganz
              links bis ganz rechts, das ist ja der finale"); die Inhalte oeffnen sich je an ihrem Tag der Challenge-Woche. */}
          <ol className="mt-9 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {SCHRITTE.map((s, i) => {
              const letzter = i === SCHRITTE.length - 1;
              return (
                <li
                  key={s.titel}
                  style={{ ['--i' as string]: i }}
                  className={`cc-stufe p-6 hover:-translate-y-0.5 ${KACHEL} ${letzter ? `${FLAECHE} text-midnight-blue sm:col-span-2 lg:flex lg:items-start lg:gap-8` : 'bg-pearl-white text-midnight-blue'}`}
                >
                  {/* 3-D-Icons nach den Flyer-Piktogrammen (Claudias Impuls 22.09.2026 11:48 UTC), erzeugt mit
                      skripte/schritt_icons.py ueber ihren Gemini-Schluessel. */}
                  <div className="flex flex-none items-center gap-4">
                    <img src={`/icons/${s.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className={`flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)] ${letzter ? 'h-16 w-16 lg:h-24 lg:w-24' : 'h-16 w-16'}`} />
                    <span aria-hidden="true" className={`font-montserrat text-3xl font-black ${letzter ? 'text-midnight-blue/40' : 'text-[#C9A961]'}`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {letzter && <p className="mt-3 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue/80 lg:mt-0">Das Finale · Vorher und Nachher</p>}
                    <h3 className={`font-montserrat font-extrabold uppercase tracking-wide ${letzter ? 'mt-1 text-lg sm:text-xl' : 'mt-3 text-base'}`}>{s.titel}</h3>
                    <p className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">{s.schwerpunkt}</p>
                    {s.feedback && <p className="mt-2"><FeedbackPlakette /></p>}
                    {frei[i] ? (
                      <details className="group mt-2">
                        <summary className="cursor-pointer list-none font-montserrat text-sm font-bold underline decoration-[#C9A961] underline-offset-4 [&::-webkit-details-marker]:hidden">
                          <span className="group-open:hidden">Aufklappen ▾</span><span className="hidden group-open:inline">Zuklappen ▴</span>
                        </summary>
                        <div className="mt-2.5"><TagInhalt t={s} /></div>
                      </details>
                    ) : (
                      <p className={`mt-2.5 flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.12em] ${letzter ? 'text-midnight-blue/80' : 'text-midnight-blue/70'}`}>
                        <Schluessel /> Entdecke den Inhalt in der Challenge-Woche · Tag {i + 1} · {KURZ.format(freischaltung(heute, i))}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
            {/* Workbook-Kachel neben dem Finale - ersetzt die Zeile aus "Entdecke in der Challenge" (Claudia, 23.10.2026). */}
            {/* Die sieben Tages-Workbooks aufgefaechert (Deckblaetter aus challenge/workbooks/Tag1-7.pdf, Claudia 23.10.2026). */}
            <li className={`cc-stufe flex flex-col bg-pearl-white p-6 text-midnight-blue hover:-translate-y-0.5 ${KACHEL}`}>
              <img src="/challenge/sieben-workbooks.webp" alt="Die sieben Challenge-Workbooks, Tag 1 bis Tag 7" width={1000} height={472} loading="lazy" decoding="async" className="w-full" />
              <h3 className="mt-3 font-montserrat text-base font-extrabold uppercase tracking-wide">7 Workbooks</h3>
              <p className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">Jeden Tag eins · in deiner Gruppe</p>
            </li>
          </ol>
        </div>
      </Abschnitt>

      {/* Ergebnis + Zertifikat + Ablauf (Claudia, 21.10.2026; umgebaut 23.10.2026: "Nach sieben Tagen hast du sieht
          voll langweilig aus", Ablauf "mit Laufline wie unten bei den Tagen, von links nach rechts, nicht so langweilig").
          Die Leistungsliste ist raus - jeder Punkt steht schon im Programm, im Ablauf oder als Workbook-Kachel. */}
      <Abschnitt id="ergebnis" className="bg-pearl-white pt-12 sm:pt-16" label="ergebnis-titel">
        <div className="mx-auto max-w-6xl px-6">
          {/* "Nach sieben Tagen hast du" und "Das bekommst du dazu" raus (Claudia, 23.10.2026 16:05: "das alles raus").
              Es bleiben Zertifikat und Ablauf. */}
          <div className={`grid items-center gap-4 rounded-[10px] px-5 py-5 text-midnight-blue sm:grid-cols-[auto_minmax(0,1fr)] sm:px-7 ${GOLD}`}>
              <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#13233F] font-montserrat text-2xl font-black text-[#C9A961]">✓</span>
              <div className="min-w-0">
                <p className="font-montserrat text-lg font-extrabold uppercase tracking-wide sm:text-xl">Dein Zertifikat – deine persönliche Teilnahmebestätigung</p>
                <p className="mt-1 font-inter text-[15px] font-semibold leading-relaxed">Für alle, die sieben Tage dabeibleiben und ihre sieben Videos posten. Für deine persönliche Wirkungskraft – und das Vertrauen, das du damit gewinnst.</p>
              </div>
          </div>

          <h3 id="ergebnis-titel" className="mt-14 font-montserrat text-2xl font-extrabold text-midnight-blue sm:text-3xl">Dein Ablauf auf einen Blick</h3>
          {/* Laufline von links nach rechts wie die Schiene bei den Tagen; auf dem Handy senkrecht links. */}
          <ol className="relative mt-8 grid list-none gap-8 p-0 pl-12 md:grid-cols-3 md:gap-8 md:pl-0 md:pt-14">
            <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-[2px] rounded bg-[linear-gradient(180deg,rgba(212,175,55,.8),rgba(212,175,55,.15))] md:bottom-auto md:left-[16%] md:right-[16%] md:top-[19px] md:h-[2px] md:w-auto md:bg-[linear-gradient(90deg,rgba(212,175,55,.8),rgba(212,175,55,.8))]" />
            {AUF_EINEN_BLICK.map((a, i) => (
              <li key={a.wann} style={{ ['--i' as string]: i }} className="cc-stufe relative">
                <span aria-hidden="true" className={`absolute -left-12 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#F7E7CE] font-montserrat text-base font-black text-midnight-blue shadow-[0_0_0_6px_rgba(212,175,55,0.16),0_8px_20px_-6px_rgba(184,134,11,0.7)] md:left-1/2 md:-top-14 md:-translate-x-1/2 ${GOLD}`}>{i + 1}</span>
                <div className={`h-full px-6 py-6 ${i === 1 ? 'border-2 border-[#C9A961] bg-white text-midnight-blue shadow-[0_24px_50px_-24px_rgba(19,35,63,0.45)] md:-mt-3 md:pb-9' : 'bg-[#13233F] text-pearl-white'} ${KACHEL}`}>
                  <p className={`inline-block rounded-md px-3 py-1.5 font-montserrat text-[12px] font-black uppercase tracking-[0.14em] text-midnight-blue ${GOLD}`}>{a.wann}</p>
                  <p className="mt-3 font-montserrat text-xl font-extrabold leading-tight">{a.was}</p>
                  <ul className="mt-3 grid list-none gap-2 p-0">
                    {a.punkte.map((pk) => (
                      <li key={pk} className="flex items-start gap-2.5 font-inter text-[15px] font-semibold leading-snug">
                        <span aria-hidden="true" className={`mt-[3px] flex h-4 w-4 flex-none items-center justify-center rounded-full text-[10px] font-black text-midnight-blue ${GOLD}`}>✓</span>
                        <span>{pk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Abschnitt>

      {/* "Entdecke in der Challenge" entfernt (Claudia, 23.10.2026): wiederholte die sieben Tage mit Icons weiter unten.
          Das Workbook steht jetzt als eigene Kachel bei den Tagen. */}

      {/* Anmeldung direkt unter dem Kopf (Kritiker-Durchgang 22.09.2026, Claudias Ja 12:22 UTC: "mach das alles so"). */}
      <section id="anmeldung" className="bg-pearl-white pt-6 pb-4 sm:pt-8" aria-label="Anmeldung zur Challenge">
        <div className="mx-auto max-w-6xl px-6">
          <ChallengeAnmeldung start={startKurz} />
        </div>
      </section>


      {/* So laeuft es ab - Claudias Diktate 13:07 + 13:10 UTC, sortiert (ABLAUF). */}
      <Abschnitt id="ablauf" className="bg-pearl-white py-12 sm:py-16" label="ablauf-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="So läuft es ab" hell />
          <h2 id="ablauf-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Gut zu wissen, bevor es losgeht.
          </h2>
          <ol className="mt-7 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {ABLAUF.map((a, i) => (
              <li key={a.titel} style={{ ['--i' as string]: i }} className={`cc-stufe bg-white px-5 py-5 text-midnight-blue ${KACHEL}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-md font-montserrat text-sm font-black text-midnight-blue ${GOLD}`}>{i + 1}</span>
                  <h3 className="font-montserrat text-sm font-extrabold uppercase tracking-wide">{a.titel}</h3>
                </div>
                <p className="mt-3 font-inter text-[15px] leading-relaxed">{a.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl border-l-4 border-[#C9A961] bg-white px-5 py-3 font-inter text-[15px] leading-relaxed text-midnight-blue">{ABLAUF_HINWEIS}</p>
        </div>
      </Abschnitt>

      {/* Die sieben Tage als Klapp-Kacheln (Claudia, 09:19 UTC: "damit die ganze Anleitung nicht die
          Seite ueberflutet"), dazwischen der WhatsApp-Einstieg mit QR-Code. Vorschau bleibt sichtbar
          (Designliste: nie alles hinter einem Klick). Tag 1 ist aufgeklappt. */}
      <Abschnitt id="tage" className="bg-pearl-white pb-16 sm:pb-24" label="tage-titel">
        <div className="mx-auto max-w-6xl px-6">
          {/* Claudia, 22.09.2026 11:21 UTC: "Dein Wegweiser: sieben Tage, jeden Tag eine Anleitung zum Aufklappen,
              jeden Tag 5 Minuten fuer deine Wirkung", Themen als Vorgeschmack, dann "ganz schlanke Banner in Gold"
              mit Datum und Uhrzeit des Gruppentreffens, darunter sieben duenne Streifen: nur Zahl, Datum, Schluessel. */}
          <Kicker text="Vorab" hell />
          <h2 id="tage-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Zwei Tipps, die du schon heute nutzen kannst.
          </h2>
          <p className="mt-5 max-w-3xl border-l-4 border-[#C9A961] bg-white px-5 py-4 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
            „{UEBUNGSSATZ}"
            <span className="mt-1 block font-montserrat text-[11px] font-extrabold not-italic uppercase tracking-[0.16em] text-midnight-blue/70">Zum Warmwerden – an allen sieben Tagen. Dazu kommt ab Tag 1 dein eigener Satz.</span>
          </p>
          <details className={`group mt-8 text-midnight-blue ${FLAECHE} ${KACHEL} shadow-[0_18px_40px_-24px_rgba(19,35,63,0.35)]`}>
            <summary className="grid cursor-pointer list-none gap-x-6 gap-y-2 px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <span className="self-start rounded-md bg-midnight-blue px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-[#EBD197]">Tipp 1 · jetzt schon</span>
              <span className="min-w-0">
                <span className="block font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{WEGWEISER.titel}</span>
                <span className="mt-1 block font-inter text-[15px] leading-relaxed">{WEGWEISER.vorschau}</span>
              </span>
              <span className="flex items-center gap-2 font-montserrat text-sm font-bold underline decoration-midnight-blue/40 underline-offset-4">
                <span className="group-open:hidden">Anleitung lesen</span>
                <span className="hidden group-open:inline">Zuklappen</span>
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
              </span>
            </summary>
            <div className="border-t border-midnight-blue/20 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
              <p className="font-inter text-[15px] leading-relaxed">{WEGWEISER.text}</p>
              <p className="mt-3 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em]">So legst du die Gruppe an:</p>
              <ol className="mt-1.5 grid list-none gap-1.5 p-0">
                {WEGWEISER.schritte.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-normal">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-midnight-blue font-montserrat text-[11px] font-black text-[#EBD197]">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </details>

          {/* Kleiner Tipp am Morgen - Claudias Aufwachuebung (ihr Wortlaut vom 22.09.2026 09:19 UTC), vor den sieben
              Tagen zum Aufklappen; die Tage selbst bleiben Geheimnis (11:24 UTC). */}
          <details className={`group mt-3 text-midnight-blue ${FLAECHE} ${KACHEL} shadow-[0_18px_40px_-24px_rgba(19,35,63,0.35)]`}>
            <summary className="grid cursor-pointer list-none gap-x-6 gap-y-2 px-5 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
              <span className="self-start rounded-md bg-midnight-blue px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-[#EBD197]">Tipp 2 · am Morgen</span>
              <span className="min-w-0">
                <span className="block font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">Lerne deine Stimmwirkung kennen</span>
                <span className="mt-1 block font-inter text-[15px] leading-relaxed">Ein kleiner Tipp am Morgen, vorweg: ein Satz, fünf Minuten – und du hörst, was sich verändert.</span>
              </span>
              <span className="flex items-center gap-2 font-montserrat text-sm font-bold underline decoration-midnight-blue/40 underline-offset-4">
                <span className="group-open:hidden">Aufklappen</span>
                <span className="hidden group-open:inline">Zuklappen</span>
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
              </span>
            </summary>
            <div className="border-t border-midnight-blue/20 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
              <p className="font-inter text-[15px] leading-relaxed">{MORGEN.aufgabe}</p>
              <blockquote className="mt-3 border-l-4 border-midnight-blue bg-white/60 px-5 py-3 font-cormorant text-xl italic leading-snug sm:text-2xl">„{MORGEN.satz}"</blockquote>
              <p className="mt-3 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em]">{MORGEN.schrittTitel}</p>
              <ul className="mt-1.5 grid list-none gap-1.5 p-0">
                {MORGEN.schritte.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-normal"><Haken />{s}</li>
                ))}
              </ul>
              <p className="mt-3 font-montserrat text-base font-bold">{MORGEN.danach}</p>
            </div>
          </details>

          {/* Die Tagesstreifen sind raus (Claudia, 23.10.2026: "zu viele Wiederholungen"): Die sieben Tage stehen oben bei
              den 3-D-Icons und oeffnen sich dort an ihrem Tag. */}
          <EintragBlock />
        </div>
      </Abschnitt>

      {/* Hand aufs Herz - Lernbox (Claudia, 22.09.2026 11:27 UTC): sieben Ja/Nein-Fragen zum Aufklappen, jede mit
          Antwort; darunter die 7 A's vom Flyer: "es ist alles schon in dir". */}
      <Abschnitt className="bg-pearl-white py-16 sm:py-24" label="hand-aufs-herz">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Hand aufs Herz" hell />
          <h2 id="hand-aufs-herz" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Was denkst du – was ist richtig?
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-lg text-midnight-blue">Sieben Fragen zu Wirkung, Stimme und Performance. Ja oder Nein – und dann die Antwort.</p>
          <details className={`group mt-7 bg-white text-midnight-blue ${KACHEL}`}>
            {/* Auf dem Handy umbrechend statt gequetscht (Handy-Durchsicht 22.09.2026 22:05 UTC). */}
            <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-5 sm:flex-nowrap sm:px-7 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-3 sm:gap-4">
                <span className={`rounded-md px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Lernbox</span>
                <span className="font-montserrat text-lg font-extrabold leading-tight sm:text-2xl">Sieben Fragen. Sieben Antworten.</span>
              </span>
              <span className="flex items-center gap-2 font-montserrat text-sm font-bold underline decoration-[#C9A961] underline-offset-4">
                <span className="group-open:hidden">Aufklappen</span>
                <span className="hidden group-open:inline">Zuklappen</span>
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
              </span>
            </summary>
            <ol className="grid list-none gap-2.5 border-t border-[#C9A961]/40 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
              {LERNBOX.map((f, i) => {
                const a = antworten[i];
                const richtig = a !== null && a === f.ja;
                return (
                  <li key={f.frage} className="rounded-[10px] border border-[#C9A961]/35 bg-pearl-white px-4 py-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-montserrat text-[15px] font-bold leading-snug">{i + 1}. {f.frage}</p>
                      <span className="flex gap-2">
                        {[true, false].map((wert) => (
                          <button key={String(wert)} type="button" onClick={() => setAntworten((alle) => alle.map((v, j) => (j === i ? wert : v)))} className={`rounded-full border px-4 py-1.5 font-montserrat text-sm font-bold transition-colors ${a === wert ? 'border-midnight-blue bg-midnight-blue text-pearl-white' : 'border-midnight-blue/30 bg-white text-midnight-blue hover:border-midnight-blue'}`}>
                            {wert ? 'Ja' : 'Nein'}
                          </button>
                        ))}
                      </span>
                    </div>
                    {a !== null && (
                      <p className="mt-2.5 flex items-start gap-3 font-inter text-[15px] leading-relaxed" aria-live="polite">
                        <span aria-hidden="true" className={`mt-0.5 font-montserrat font-black ${richtig ? 'text-[#B8860B]' : 'text-midnight-blue/60'}`}>{richtig ? '✓' : '✕'}</span>
                        <span>{f.antwort}</span>
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="border-t border-[#C9A961]/40 px-5 py-4 font-montserrat text-base font-bold sm:px-7" aria-live="polite">
              {nBeantwortet === 0 ? 'Fang einfach an – es gibt kein Falsch, nur ein Vorher und ein Nachher.' : `${nRichtig} von ${nBeantwortet} richtig.${nBeantwortet === LERNBOX.length ? ' Und alles, was du dafür brauchst, ist schon in dir.' : ''}`}
            </p>
          </details>
          <div className={`mt-4 rounded-[10px] px-5 py-5 text-midnight-blue sm:px-7 ${FLAECHE}`}>
            <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em]">Warum deine Einzigartigkeit Gold wert ist</p>
            <p className="mt-2 font-inter text-[15px] leading-relaxed">Stell dir vor: „Alle sind gleich perfekt." – und da bist DU. Der Neurowissenschaftler Karsten Brocke bringt es auf sieben Merkworte – die 7 A's der modernen Vermarktung: <b>absolut angenehm anders als alle anderen auffallen.</b> Nicht lauter, nicht perfekter – erkennbar du.</p>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-montserrat text-xl font-black uppercase leading-tight sm:text-2xl">
              {SIEBEN_A.map((a) => (<span key={a}>{a}</span>))}
            </p>
            <p className="mt-3 font-cormorant text-2xl italic leading-snug sm:text-3xl">Es ist alles schon in dir.</p>
          </div>
        </div>
      </Abschnitt>

      {/* Abschnitt "Dein KI-Agent ist effizient. Und du?" entfernt (Claudia, 23.10.2026: lenkt ab, doppelt). Text in der Git-Historie (f94af50). */}

      {/* Werkzeugkasten + Workbook */}
      <Abschnitt className="bg-white py-16 text-midnight-blue sm:py-24" label="werkzeug-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Dein Werkzeugkasten für die Challenge" hell />
              <h2 id="werkzeug-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Fünf Dinge, die du vor der ersten Aufnahme wissen solltest.
              </h2>
            </div>
            <Kopfbild datei="tonstudio" alt="Claudia Conen am Mikrofon im Tonstudio" />
          </div>
          <div className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {WERKZEUG.map((w, i) => (
              <details key={w.titel} style={{ ['--i' as string]: i }} className={`cc-stufe group bg-white p-5 text-midnight-blue ${KACHEL}`}>
                <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                  <img src={`/icons/${w.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="h-16 w-16 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-montserrat text-base font-extrabold uppercase tracking-wide">{w.titel}</span>
                    <span className="mt-1 block font-inter text-[15px] leading-relaxed">{w.vorschau}</span>
                    <span className="mt-2 inline-block font-montserrat text-xs font-bold underline decoration-[#C9A961] underline-offset-4"><span className="group-open:hidden">Mehr lesen ▾</span><span className="hidden group-open:inline">Zuklappen ▴</span></span>
                  </span>
                </summary>
                <p className="mt-3 border-t border-[#C9A961]/40 pt-3 font-inter text-[15px] leading-relaxed">{w.text}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-14">
            {/* 3-D-Buch (Claudia, 22.09.2026 16:13 UTC: "3D Book Mockup Animation ... dreht oder aufklappt"): reines
                CSS (.cc-buch* in index.css). Schwenkt langsam im Raum; beim Darueberfahren klappt der Deckel auf und
                zeigt die erste Innenseite. Antippen oeffnet wie bisher das Blaetter-Fenster. Ohne Bewegung bei
                prefers-reduced-motion. Kein Skript, keine Bibliothek, keine Ladezeit. */}
            <button
              type="button"
              onClick={() => setBuchOffen(true)}
              aria-label="Workbook öffnen und blättern"
              className="cc-buch-buehne m-0 block w-full max-w-[420px] justify-self-center bg-transparent p-0 text-left"
            >
              <span className="cc-buch">
                <span className="cc-buch-rueckseite" aria-hidden="true" />
                <span className="cc-buch-ruecken" aria-hidden="true"><span>Entdecke deine Stimmwirkung · Claudia Conen</span></span>
                <span className="cc-buch-kante" aria-hidden="true" />
                <span className="cc-buch-block" aria-hidden="true">
                  <img src="/unverwechselbar/workbook/seite-02.webp" alt="" width={900} height={1274} loading="lazy" decoding="async" />
                </span>
                <span className="cc-buch-deckel">
                  <img src="/unverwechselbar/workbook/seite-01.webp" alt="Deckblatt des Workbooks Entdecke deine Stimmwirkung – Brainself, Buchauszug von Claudia Conen" width={900} height={1273} loading="lazy" decoding="async" />
                  <span className="cc-buch-innen" aria-hidden="true" />
                </span>
              </span>
              <span className="mt-6 block text-center font-montserrat text-xs font-extrabold uppercase tracking-[0.16em] text-midnight-blue">
                Antippen und blättern →
              </span>
            </button>
            <div>
              <Kicker text="Zum Mitnehmen" hell />
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase text-midnight-blue sm:text-3xl">Workbook „Entdecke deine Stimmwirkung"</h3>
              <p className="mt-3 font-montserrat text-base font-bold text-midnight-blue">
                Mein Buchauszug aus dem <em>Brainself</em>-Buch, das ich gemeinsam mit dem Neurowissenschaftler Karsten Brocke und weiteren Experten veröffentlicht habe. Das Kapitel „Entdecke deine Stimmwirkung" stammt von mir.
              </p>
              <p className="mt-3 font-inter leading-relaxed text-midnight-blue">
                Ein Workbook zur Selbsterkenntnis – für deine akustische Visitenkarte und eine wertschätzende, achtsame Kommunikation im Business. Zum Ausfüllen, mit Platz für deine eigenen Sätze. 41 Seiten zum Blättern – oder als PDF.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={() => setBuchOffen(true)} className={`inline-flex items-center rounded-full px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
                  Im Workbook blättern
                </button>
                <a href={WORKBOOK_PDF} download className="inline-flex items-center rounded-full border-2 border-midnight-blue px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue transition-colors hover:bg-midnight-blue hover:text-pearl-white">
                  Als PDF speichern
                </a>
              </div>
              <WorkbookBlaettern offen={buchOffen} schliessen={() => setBuchOffen(false)} />
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Wirkungs-Check und Kaffee/Rederaum entfernt auf Claudias Anweisung (22.10.2026, 11:25 UTC). Frueher: Geschenk, Rederaum, Online-Buehne - Claudia, 22.09.2026 10:59-11:00 UTC: "Mein Geschenk fuer deine
          Wirkung und der Schritt danach: 1:1-Gespraech bei einem Kaffee ... Rederaum, das heisst bei mir immer
          Rederaum"; "Willst du sofort eine Online-Buehne nutzen ... dann folge dem Link". */}
      <Abschnitt id="geschenk" className="bg-pearl-white py-16 sm:py-24" label="angebot-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Der Schritt danach" hell />
              <h2 id="angebot-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Du suchst die Abkürzung?
                <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Oder willst du es dauerhaft verinnerlichen?</span>
              </h2>
            </div>
            {/* Claudias Foto vom 22.09.2026 16:16 UTC (rote Mappe), Original in projects/claudiaconen/ablage/claudia-rote-mappe-2026-09-22.jpg */}
            <Kopfbild datei="geschenk" alt="Claudia Conen mit einer aufgeschlagenen roten Mappe, lächelnd" />
          </div>
          {/* 1:1-Intensiv-Training – Sonderpreis für Challenge-Teilnehmende (Claudia, 17.10.2026):
              90 Min, 180 € netto, Buchung auf Anfrage per E-Mail. Bild liegt in public/challenge/. */}
          {/* Zwei Wege nach der Challenge (Claudia, 23.10.2026 17:09: "Abkuerzung 1 Stunde und dauerhaft verinnerlichen
              beim Mentoring ... wie ein Vollprofi"). Aufbau je Karte: Bild, Etikett, Titel, ein Satz, drei Haken, Preis,
              ein Knopf. Das Mentoring ist als "Empfohlen" hervorgehoben (Ankerangebot); nur belegte Fakten (Tentary/Produktbild). */}
          {/* Claudias Zitat als Bruecke zu den Angeboten (ihr Wortlaut, geglaettet, Fassung A, Ja 23.10.2026 17:22). */}
          <figure className="mx-auto mt-10 max-w-3xl border-l-4 border-[#C9A961] bg-white px-6 py-5 sm:px-8">
            <blockquote className="font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
              „Niemand klingt wie du. Nutze deine Einzigartigkeit – sie ist das Gold von morgen. Denn wer Vertrauen weckt, gewinnt.“
            </blockquote>
            <figcaption className="mt-2 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.16em] text-midnight-blue/70">Claudia Conen</figcaption>
          </figure>
          <div className="mt-10 grid items-center gap-6 md:grid-cols-2">
            {[
              { etikett: 'Die Abkürzung', titel: '1:1-Intensiv-Training · 90 Minuten', leitsatz: '', fuerWen: 'Für dich, wenn du an einer Stelle hängst und schnell weiterwillst.', satz: 'Du willst einen der sieben Schritte vertiefen? Nur du und ich, online und live.', proWoche: '', haken: ['Deine Kernbotschaft, dein Pitch oder dein Auftritt vor der Kamera', 'Wir arbeiten Schritt für Schritt an deinem Thema', 'Termin nach der Buchung selbst im Kalender wählen'], bild: '1zu1-einzeltermin', netto: EINZEL_NETTO, link: EINZEL_LINK, knopf: 'Einzeltermin buchen', hinweis: 'Sonderpreis für Challenge-Teilnehmende', empfohlen: false },
              { etikett: 'Dauerhaft verinnerlichen', titel: 'Unverwechselbar. Das 12-Wochen-Mentoring', leitsatz: 'Von der Selbsterkenntnis zum Selbstvertrauen – zum selbstbewussten Auftreten.', fuerWen: 'Für dich, wenn du es nicht nur verstehen, sondern leben willst.', satz: 'Du willst alles rund um die sieben Schritte vertiefen und dauerhaft verinnerlichen?', proWoche: `das sind rund ${Math.round(MENTORING_NETTO / 12)} € pro Woche`, haken: ['Start Montag, 16. November · 12 Live-Trainings online', 'Alle sieben Schritte der Challenge – vertieft: Kernbotschaft, Zielgruppenbrille, raus aus der Redeangst, Stimme, Storytelling, wie Kunden entscheiden, Elevator Pitch', 'Deine Positionierung schärfen', 'Storytelling, das Kino im Kopf erzeugt', 'Speaker-Tipps aus der Keynote-Praxis', 'Inklusive Speaker-Workbook', 'KI als Unterstützung in allen Bereichen – mit deiner eigenen Tone of Voice', 'Üben, wiederholen, verankern – bis es in deinem Unterbewusstsein sitzt und selbstbewusstes Auftreten zu deiner Gewohnheit werden kann'], bild: 'mentoring-12-wochen', netto: MENTORING_NETTO, link: MENTORING_LINK, knopf: 'Platz im Mentoring sichern', hinweis: 'Frühbucherpreis endet am 2. November, am Abend unseres Finales · höchstens 6 Plätze', empfohlen: true },
            ].map((a) => (
              <div key={a.bild} className={`relative flex flex-col overflow-hidden bg-white ${KACHEL} ${a.empfohlen ? 'border-2 border-[#C9A961] shadow-[0_30px_60px_-24px_rgba(19,35,63,0.5)] md:scale-[1.03]' : ''}`}>
                {a.empfohlen && <span className={`absolute right-4 top-4 z-10 rounded-full px-4 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue shadow-md ${GOLD}`}>Meine Empfehlung</span>}
                <img src={`/challenge/${a.bild}.jpg`} alt={`${a.titel} mit Claudia Conen`} width={900} height={900} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                <div className="flex flex-1 flex-col p-6 text-midnight-blue sm:p-8">
                  <p className="font-montserrat text-[12px] font-black uppercase tracking-[0.18em] text-[#9A7B2F]">{a.etikett}</p>
                  <h3 className="mt-2 font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{a.titel}</h3>
                  {/* Leitsatz Mentoring: Claudias Wortlaut (23.10.2026 17:44). */}
                  {a.leitsatz && <p className="mt-2 font-cormorant text-xl italic leading-snug text-midnight-blue sm:text-2xl">{a.leitsatz}</p>}
                  <p className="mt-2 font-montserrat text-[15px] font-bold leading-snug text-[#9A7B2F]">{a.fuerWen}</p>
                  <p className="mt-3 font-inter text-[17px] leading-relaxed">{a.satz}</p>
                  {/* Mentoring-Liste in bewegtem Glas (Claudia, 23.10.2026: "ausfuehrlicher ... Glas-Effekt, dass es sich ein
                      bisschen mehr bewegt"). Ohne Bewegung bei prefers-reduced-motion. */}
                  <div className={a.empfohlen ? 'cc-glas-bewegt mt-4 rounded-[12px] p-[1px]' : 'mt-4'}>
                    <ul className={`grid list-none gap-2.5 ${a.empfohlen ? 'cc-glas-hell rounded-[11px] p-4 sm:p-5' : 'p-0'}`}>
                      {a.haken.map((h) => (
                        <li key={h} className="flex items-start gap-3 font-inter text-[15px] font-semibold leading-snug"><Haken />{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-midnight-blue/10 pt-5">
                    <p className="font-montserrat text-3xl font-black">{a.netto.toLocaleString('de-DE')} € <span className="text-base font-bold text-midnight-blue/60">zzgl. MwSt.</span></p>
                    <p className="font-inter text-sm text-midnight-blue/70">{brutto(a.netto)} € inkl. 19 % MwSt.{a.proWoche && <> · {a.proWoche} (netto)</>}</p>
                    <p className="mt-1 font-montserrat text-sm font-extrabold text-[#9A7B2F]">{a.hinweis}</p>
                  </div>
                  <div className="mt-auto pt-6">
                    <a href={a.link} target="_blank" rel="noopener" className={`flex w-full items-center justify-center rounded-full px-6 py-4 font-montserrat text-sm font-bold transition-transform hover:-translate-y-px ${a.empfohlen ? `text-midnight-blue ${GOLD}` : 'bg-midnight-blue text-white'}`}>
                      {a.knopf} →
                    </a>
                    <p className="mt-2.5 text-center font-inter text-xs text-midnight-blue/60">Sichere Zahlung über Tentary{a.empfohlen ? ' · Start am 16. November' : ' · Termin danach selbst im Kalender wählen'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dritter Weg fuer Unentschlossene: kostenloses Erstgespraech (derselbe Link wie im Fuss). */}
          <p className="mt-8 text-center font-inter text-[15px] text-midnight-blue">
            Unsicher, was zu dir passt?{' '}
            <a href="https://meet.brevo.com/claudia-conen" target="_blank" rel="noopener noreferrer" className="font-montserrat font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4">Kostenloses Erstgespräch vereinbaren →</a>
          </p>
        </div>
      </Abschnitt>

      {/* Fuer wen - hell mit 3-D-Icons (Claudia, 22.09.2026 13:15/13:17 UTC: "doofer Satz", "sieht sehr haesslich aus",
          "so schoene Icons ... bring da noch welche ein"). Ueberschrift und "30 Minuten am Tag" in ihrem Wortlaut. */}
      <Abschnitt id="fuer-wen" className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="fuer-wen-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Für wen das ist" hell />
          <h2 id="fuer-wen-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Sieben Tage zur Selbsterkenntnis. Ein Anfang.
            <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Eine unsichtbare Brücke in die Zuhörer hinein.</span>
          </h2>
          <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue ${GOLD}`}>
            30 Minuten am Tag – für dich, deine Wirkung.
          </p>
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
            <Kicker text="Warum ich" hell />
            <h2 id="warum" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Menschen prägen Menschen.</h2>
            <p className="mt-7 border-l-4 border-[#C9A961] pl-5 font-cormorant text-3xl italic leading-snug sm:text-4xl">
              Ich höre, was andere überhören. Und mache daraus deine Wirkung.
            </p>
          </div>
          <div>
            <ul className="grid list-none gap-3 p-0 font-inter text-midnight-blue">
              {[
                'Claudia Conen ist Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung.',
                'Sie trainiert Rhetorik, Storytelling, Präsentation und den Auftritt vor der Kamera – seit 37 Jahren.',
                'Ihr Schwerpunkt ist die hörbare Persönlichkeit: das Zusammenspiel von Worten, Stimme und Haltung.',
                'Bekannt als „Die Umsatzstimme" – zu hören unter anderem bei Sat.1 und RTL, gefragt auf Bühnen und in Unternehmen.',
              ].map((z) => (
                <li key={z} className="flex gap-3"><Haken />{z}</li>
              ))}
            </ul>
            <p className="mt-5 font-inter text-[15px] text-midnight-blue">
              Warum ich weiß, dass Menschen sich für immer im Gehirn verankern können, erzähle ich auf{' '}
              <Link to="/ueber-mich" className="underline decoration-[#C9A961] decoration-2 underline-offset-4 hover:text-royal-navy">„Über mich"</Link>.
            </p>
          </div>
        </div>
      </Abschnitt>

      {/* Netzwerk Mittelstand - deine Community, letzter Abschnitt (Claudia, 22.09.2026 13:19 UTC: "das soll unten als
          Letztes sein"). Machart ihrer Community-Startseite (Foto 13:17 UTC): grosse Ueberschrift, das Wort blass mit
          goldener Kontur, Schreibschrift, Satz in einer weissen Pille. Seit 14:51-15:01 UTC OHNE Liste, OHNE runde Bilder,
          OHNE Video ("alles zu unruhig", "nur das von Gabi und mir"), und der fruehere dunkle Schluss-Satz steht jetzt
          hier als Einstieg ("viel zu dunkel"). Gabi steht NUR hier. */}
      <Abschnitt id="community" className="bg-pearl-white py-16 sm:py-24" label="community-titel">
        <div className="mx-auto max-w-6xl px-6">
          <p className="flex items-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-midnight-blue">
            <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
            Willst du dich speichern?
          </p>
          <p className="mt-5 max-w-4xl font-montserrat text-2xl font-extrabold leading-tight text-midnight-blue sm:text-3xl">
            Willst du im KI-Zeitalter mit deiner Persönlichkeit punkten – statt vergleichbar über den Preis Kunden zu gewinnen?
            <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Dann schließ dich unserem Netzwerk an: die Unverwechselbaren, die Community für den Mittelstand.</span>
          </p>
          <div className={`mt-8 bg-white px-6 py-10 text-center text-midnight-blue sm:px-10 sm:py-14 ${KACHEL} border-[#C9A961] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.5)]`}>
            {/* Schriftgroesse waechst mit der Bildschirmbreite: "Unverwechselbaren." ist ein einziges Wort und lief auf dem
                Handy 43 px ueber den rechten Rand - dadurch wurde die ganze Seite breiter und das Menue abgeschnitten
                (Claudia, 22.09.2026 21:59 UTC). */}
            <h2 id="community-titel" className="font-montserrat text-[clamp(1.45rem,6.8vw,2.25rem)] font-black leading-[1.05] tracking-tight sm:text-6xl">
              Willkommen bei den
              <span className="block text-[#F1E2B3]" style={{ WebkitTextStroke: '1.5px #C9A961' }}>Unverwechselbaren.</span>
              <span className="mt-2 block font-cormorant text-4xl font-semibold italic tracking-normal text-[#C9A961] sm:text-6xl">Netzwerk Mittelstand</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-pearl-white px-6 py-4 font-inter text-lg leading-relaxed">
              Menschen, die sich zusammentun und ein wachsendes Netzwerk bilden – weil sie wissen: Gemeinsam sind wir stärker. Hier zählt Empfehlung mehr als Werbung.
            </p>
            <p className="mt-8 font-montserrat text-base font-extrabold sm:text-lg">Trag dich ein zum ersten Termin – sei einer von 27 Umsetzern.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href="https://community.claudiaconen.com/netzwerkwebinar/" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                Zum ersten Termin eintragen →
              </a>
              <a href="https://community.claudiaconen.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border-2 border-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-colors hover:bg-midnight-blue hover:text-pearl-white">
                Entdecken
              </a>
            </div>
            <figure className={`relative mx-auto mt-10 aspect-[3/2] w-full max-w-[520px] overflow-hidden ${KACHEL}`}>
              <img src="/unverwechselbar/gabi-und-claudia.webp" alt="Claudia Conen und Gabi Lindemann lachen zusammen" width={900} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-midnight-blue/75 px-3 py-2 font-montserrat text-[11px] font-bold text-[#EBD197]">
                Gabi Lindemann und Claudia Conen – zusammen zuständig für die Community
              </figcaption>
            </figure>
          </div>
          <p className="mt-6 text-center font-inter text-[15px] text-midnight-blue">
            Noch nicht in der Challenge?{' '}
            <a href="#anmelden" className="font-montserrat font-bold underline decoration-[#C9A961] decoration-2 underline-offset-4">Hier eintragen ↑</a>
          </p>
        </div>
      </Abschnitt>

      <Footer />
    </div>
  );
}
