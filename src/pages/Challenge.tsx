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
import { Ban, Smile, Clock, EyeOff, Database, Bot } from 'lucide-react';

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
  { frage: 'Entscheiden Zuhörer, ob sie dir zuhören, bevor du deinen ersten Satz beendet hast?', ja: true, antwort: 'Ja. Die Stimme wirkt, bevor der Inhalt ankommt – deshalb beginnt die Challenge mit deiner Stimme.' },
  { frage: 'Klingt eine Stimme tiefer, wenn man sie nach unten drückt?', ja: false, antwort: 'Nein. Tiefer wird sie durch Ruhe und Atmung. Drücken macht sie eng und angestrengt.' },
  { frage: 'Ist eine Pause im Satz ein Zeichen von Unsicherheit?', ja: false, antwort: 'Nein. Die Pause ist der Moment, in dem der andere versteht. Profis machen mehr Pausen, nicht weniger.' },
  { frage: 'Bleibt eine perfekt vorgetragene Rede besser im Kopf als eine mit einem Versprecher?', ja: false, antwort: 'Nein. Perfektion ist klickbar. Ein Mensch, der echt ist, bleibt – der Versprecher, über den du lachst, macht dich glaubwürdiger.' },
  { frage: 'Merken sich Menschen Zahlen besser als Geschichten?', ja: false, antwort: 'Nein. Geschichten bleiben, Daten nicht. Ein Moment, eine Person, ein Satz, der fiel.' },
  { frage: 'Reicht es, eine Rede gut zu schreiben, damit sie gut wirkt?', ja: false, antwort: 'Nein. Wirkung entsteht beim Sprechen: Stimme, Haltung, Blick. Deshalb nimmst du dich in der Challenge auf – Text allein reicht nicht.' },
  { frage: 'Kann man Wirkung trainieren?', ja: true, antwort: 'Ja. Wirkung ist kein Zufall. Sie ist trainierbar, sichtbar, entscheidbar – in sieben Tagen fängst du an.' },
];
/** Die 7 A's vom Flyer (nach Karsten Brocke) - Claudias ausdrueckliche Ansage vom 22.09.2026, 11:27 UTC. */
const SIEBEN_A = ['A-bsolut', 'A-ngenehm', 'A-nders', 'A-ls', 'A-lle', 'A-nderen', 'A-uffallen'];

/** Wie auf dem Flyer: Piktogramm, Titel, eine Zeile (Claudia, 22.09.2026 11:24 UTC: "nicht diese runden
 *  Bubble-Dinger ... eher so wie auf dem Flyer, auch mit den Icons"). */
const KI_GRUENDE: { titel: string; text: string; Icon: typeof Ban }[] = [
  { titel: 'Keine Bewertung.', text: 'Der Avatar urteilt nicht. Nie.', Icon: Ban },
  { titel: 'Keine Peinlichkeit.', text: 'Du kannst „dumme Fragen" stellen – ohne Scham.', Icon: Smile },
  { titel: 'Immer verfügbar.', text: '24/7 erreichbar. Kein Termin nötig.', Icon: Clock },
  { titel: 'Keine Körpersprache. Keine Unsicherheit.', text: 'Kein Flackern der Augen, keine nervöse Haltung.', Icon: EyeOff },
  { titel: 'Datenspeicher statt Emotionen.', text: 'Der Avatar vergisst nicht. Und er verzeiht sofort.', Icon: Database },
  { titel: 'Keine Geschichte. Kein Ego.', text: 'Kein Gepäck. Kein Stolz, keine Verletzlichkeit – nur Funktion.', Icon: Bot },
];


/** Vorteile des Menschen in der Kommunikation - die ersten zwei nach Claudias Diktat (22.09.2026, 10:52 UTC:
 *  "wir spueren die Emotionen eines Menschen, bevor wir die Worte verstehen", "Redepausen geben Platz fuer
 *  Verstaendnis und Wirkung"), der Rest in derselben Tonlage. Keine Hirnforschungs-Behauptungen. */
const MENSCH_KANN = [
  'Wir spüren, was ein Mensch fühlt – bevor wir seine Worte verstehen.',
  'Redepausen geben Platz. Für Verständnis und für Wirkung.',
  'Eine Stimme, die meint, was sie sagt, hört man. Wissen klingt anders als Überzeugung.',
  'Ein Blick, der den anderen meint. Wer angesehen wird, fühlt sich gemeint – und bleibt.',
];




const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'cc-glanz-kachel rounded-[10px] border border-[#13233F]/[0.13] transition-[border-color,box-shadow] duration-200 hover:border-[#C9A961] hover:shadow-[0_18px_40px_-20px_rgba(19,35,63,0.35)]';
/** Ruhige Champagner-Flaeche statt kraeftigem Gold fuer grosse Bloecke (Farben der neuen Seiten, Claudia 15.10.2026). */
const FLAECHE = 'bg-[linear-gradient(135deg,#FCF6EC,#F7E7CE)] border border-[#C9A961]/60';
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
const ENTDECKE = ['Deine Wirkung', 'Deine Keynote-Möglichkeiten', 'Warum Menschen dir zuhören', 'Was wirklich zählt', 'Tipps, wie KI deine echte Kommunikation unterstützt', 'Das Workbook „Entdecke deine Stimmwirkung" – zum Blättern und Mitnehmen'];


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
  /** Icon in public/icons/ */
  icon: string;
};

/** Der Uebungssatz - an allen sieben Tagen wortgleich (Claudias Briefing, 22.09.2026 12:54 UTC). */
const UEBUNGSSATZ = 'Wo ich spreche, ist meine Bühne – mit Persönlichkeit, Achtsamkeit und Leichtigkeit berühre ich Menschen.';

/** Die sieben Tage - Wortlaut aus Claudias Briefing "Sieben Schritte zu deinem selbstbewussteren Business-Auftritt"
 *  (Discord, 22.09.2026 12:54 UTC), nur in Du-Ansprache geglaettet. Keine Zahlen, keine Versprechen dazu. */
const TAGE: Tag[] = [
  {
    titel: 'Was möchtest du wirklich sagen?', schwerpunkt: 'Innere Klarheit', icon: 'schritt-1',
    einstieg: 'Kennst du das? Das Gespräch ist vorbei. Erst danach fällt dir ein, was du eigentlich sagen wolltest.',
    inhalt: 'Den eigenen Beitrag ernst nehmen. Klären, was beim Gegenüber ankommen soll.',
    aufgabe: 'Denk an eine berufliche Situation, in der du dich deutlicher ausdrücken möchtest. Ergänze: „Mir ist wichtig, dass mein Gegenüber versteht …"',
    zusatz: 'Wenn du möchtest, nimm den Übungssatz und anschließend deine Aussage in höchstens 30 Sekunden auf. Bewahre diese erste Aufnahme für dich auf.',
    reflexion: 'Hast du ausgesprochen, was dir wichtig ist?',
  },
  {
    titel: 'Gib dir einen sicheren Stand', schwerpunkt: 'Haltung', icon: 'schritt-3',
    einstieg: 'Wie viel Kraft kostet es dich, gleichzeitig zu sprechen und darüber nachzudenken, wie du wirkst?',
    inhalt: 'Eine angenehme Haltung finden, in der du dich auf deine Aussage konzentrieren kannst.',
    aufgabe: 'Spür den Boden unter deinen Füßen oder die Sitzfläche unter dir. Richte dich bequem auf und lass die Schultern locker. Sprich den Übungssatz und deine Aussage von Tag 1 erneut.',
    reflexion: 'In welcher Haltung fällt dir das Sprechen leichter?',
  },
  {
    titel: 'Du darfst sichtbar sein', schwerpunkt: 'Gestik und Ausdruck', icon: 'schritt-8',
    einstieg: 'Wohin mit den Händen? Sobald die Kamera läuft, werden sie plötzlich zur Hauptsache.',
    inhalt: 'Den Händen erlauben, einen Gedanken zu begleiten. Gestik darf natürlich entstehen.',
    aufgabe: 'Sprich den Übungssatz. Erkläre anschließend deine berufliche Aussage und lass eine Geste entstehen, die dazu passt: etwas zeigen, einen Unterschied verdeutlichen oder einen Gedanken öffnen.',
    zusatz: 'Probier es spielerisch aus. Du musst keine bestimmte Bewegung nachmachen.',
    reflexion: 'Welche Geste unterstützt dich, ohne sich gespielt anzufühlen?',
  },
  {
    titel: 'Du darfst dir Zeit nehmen', schwerpunkt: 'Atmung und Ruhe', icon: 'schritt-6',
    einstieg: 'Das Telefon klingelt. Du gehst ran – und bist gedanklich noch bei der Aufgabe davor.',
    inhalt: 'Vor dem ersten Satz ankommen. Atempausen zulassen.',
    aufgabe: 'Stell dir vor, du beginnst ein wichtiges Telefonat. Lass vorher einige ruhige, ungezwungene Atemzüge zu. Sprich deinen Übungssatz und anschließend die ersten zwei Sätze des Gesprächs.',
    zusatz: 'Du brauchst nicht alles auf einen Atemzug zu sagen.',
    reflexion: 'Wie klingt dein Einstieg, wenn du dir einen Moment Zeit gibst?',
  },
  {
    titel: 'Hörst du dich selbst darin?', schwerpunkt: 'Stimme und Persönlichkeit', icon: 'schritt-5',
    einstieg: 'Mit vertrauten Menschen sprichst du lebendig. Was passiert mit dieser Stimme, wenn es beruflich wichtig wird?',
    inhalt: 'Einen angenehmen Klang erkunden und die eigene Beteiligung am Thema hörbar machen.',
    aufgabe: 'Summ kurz und sanft „Mhm" in einer angenehmen Tonhöhe. Sprich den Übungssatz. Erzähl anschließend einer vorgestellten, interessierten Person in zwei oder drei Sätzen, warum dir deine Arbeit wichtig ist.',
    zusatz: 'Keine tiefere Stimme erzwingen.',
    reflexion: 'An welcher Stelle klingst du für dich besonders natürlich?',
  },
  {
    titel: 'Gib deinen Worten Gewicht', schwerpunkt: 'Betonung, Klarheit und Pausen', icon: 'schritt-9',
    einstieg: 'Du hast etwas Wichtiges gesagt. Hast du deinem Gegenüber auch Zeit gelassen, es aufzunehmen?',
    inhalt: 'Wichtige Gedanken hervorheben und verständlich gliedern.',
    aufgabe: 'Sprich den Übungssatz und betone zuerst „Persönlichkeit", dann „Achtsamkeit", dann „Leichtigkeit". Hör, wie sich die Bedeutung verändert. Übertrag das auf deine berufliche Aussage: Wähle ein Schlüsselwort und setze nach dem wichtigsten Gedanken eine Pause.',
    reflexion: 'Was soll dein Gegenüber mitnehmen – und hört man das?',
  },
  {
    titel: 'Jetzt geht es um dein Gegenüber', schwerpunkt: 'Verbindung und Zuhören', icon: 'schritt-7',
    einstieg: 'Wie verändert sich ein Gespräch, wenn du deine Aufmerksamkeit dem anderen schenkst?',
    inhalt: 'Die bisherigen Übungen verbinden und wahrnehmen, was tatsächlich ankommt.',
    aufgabe: 'Sprich den Übungssatz und deine berufliche Aussage zu einer vertrauten Person oder in die Kamera. Nutze, was dir diese Woche geholfen hat. Wenn jemand zuhört, frag anschließend: „Was ist bei dir angekommen?" Lass die Antwort stehen und hör zu.',
    zusatz: 'Wenn du Aufnahmen gemacht hast, vergleiche den Übungssatz von Tag 1 und Tag 7.',
    reflexion: 'Was gelingt dir bewusster – und was möchtest du weiter üben?',
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
const ROT = 'whitespace-nowrap font-extrabold text-[#C62828]';
const ABLAUF: { titel: string; text: React.ReactNode }[] = [
  // Neu nach Claudias Diktat, Discord 17.10.2026 09:15 UTC: nirgends taegliches Video-Feedback; Werbung erst an Tag 8.
  { titel: 'Eintragen', text: 'Du trägst dich hier ein und kommst in die WhatsApp-Gruppe. Nach dem Start geht es los.' },
  { titel: 'Die Gruppe', text: <>Austausch untereinander ist gern gesehen. <span className="font-bold underline decoration-2 underline-offset-2">Keine Werbung</span> – an Tag 8 ist Werbung für alle freigegeben.</> },
  { titel: 'Der Auftakt', text: 'Montag, 26. Oktober, 19 Uhr, 60 Minuten im Zoom: kennenlernen, miteinander lachen, den Wegweiser in die Hand bekommen. Dann geht es los.' },
  { titel: 'Jeden Tag ein Impuls', text: <>Ein Audio von mir und dein Workbook, damit du täglich am Ball bleibst. Für deine <strong className={ROT}>1-Minuten-Aufnahme</strong> hast du 24 Stunden Zeit.</> },
  { titel: 'Dein Feedback', text: <>Zu deinem <strong className="font-bold">ersten und deinem letzten Video</strong> bekommst du ein ganz persönliches Feedback mit Verbesserungsvorschlägen – wenn du sie innerhalb von 24 Stunden postest.</> },
  { titel: 'Zwischendurch', text: <>Impulse zu:<ul className="mt-2 grid list-none gap-1.5 p-0">{['Positionierung', 'Storytelling', 'Elevator Pitch', 'Keynote präsentieren', 'Stimmwirkung', 'Neueste Wissenschaft des Zuhörens', 'Rhetorik-Tipps'].map((z) => (<li key={z} className="flex items-center gap-2.5"><span aria-hidden="true" className="h-2.5 w-2.5 flex-none rounded-full bg-[#C62828]" />{z}</li>))}</ul></> },
  { titel: 'Das Workbook', text: 'Schnapp dir das Workbook für einen ersten Einblick. Dazu PDFs – und am Ende dein Zertifikat.' },
  { titel: 'Tag 8 · Der Ausklang', text: 'Montag, 2. November, 19 Uhr im Zoom: Erfahrungen austauschen, Menschen kennenlernen. Dein Werbetag: Zeig, was du anbietest, und genieß die neuen Kontakte.' },
];
// Tipp 1 + 2 am 17.10.2026 auf Claudias Wunsch von der Seite genommen (zu kompliziert); Texte bleiben fuer spaeter.
void MORGEN; void WEGWEISER; void ENTDECKE; // ENTDECKE-Punkte am 17.10.2026 raus (doppelt zum Ablauf)

const ABLAUF_HINWEIS = 'Mein Tipp: Nimm dir täglich 30 Minuten Zeit – und lass dich überraschen, was wir danach für dich haben. Du darfst Werbung machen, und das sogar kostenfrei.';

const FUER = [
  // Claudia, Discord 17.10.2026 09:31 UTC
  'deine Wirkung zielstrebig verbessern und Kunden gewinnen willst',
  'einverstanden bist, dass auch andere Menschen dich sehen',
  'bereit bist, täglich bis zu 30 Minuten dafür zu investieren',
  'dich selbst hören willst, auch wenn es am Anfang unangenehm ist',
];
const NICHT_FUER = [
  'lieber an anderen herumnörgelst, als dich selbst zu verbessern oder andere zu motivieren',
  'eine perfekte Aufnahme willst statt einer echten',
  'erwartest, dass die KI das Sprechen für dich übernimmt',
];

/** Goldene Linie links neben den sieben Tagen; der Pfeil wandert beim Scrollen mit (setzt --p). */
function Schiene() {
  return (
    <div className="cc-schiene" aria-hidden="true">
      <span className="cc-schiene-wort">Deine sieben Tage</span>
      <span className="cc-schiene-linie"><span className="cc-schiene-pfeil" data-pfeil>➜</span></span>
    </div>
  );
}

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
      <p className="mt-3 border-l-4 border-[#C9A961] bg-pearl-white px-4 py-2 font-montserrat text-sm font-bold">Übungssatz: „{UEBUNGSSATZ}"</p>
      <p className="mt-3"><b className="font-montserrat font-extrabold">Reflexion: </b>{t.reflexion}</p>
      <p className="mt-3 text-[14px] text-midnight-blue/85">Wenn du magst, teile deinen Versuch in der Gruppe – wir können miteinander und aneinander wachsen. Wer alle sieben Tage durchzieht, bekommt am Ende mein persönliches Feedback als Audio. Wer still mitübt, gehört genauso dazu.</p>
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
    description: 'Sieben Tage, jeden Tag eine Aufgabe und eine Minute Video mit dem Handy – mit persönlichem Audio-Feedback von Claudia Conen für alle, die durchziehen. Kostenfrei, in einer WhatsApp-Gruppe.',
    totalTime: 'P7D',
    step: TAGE.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Tag ${i + 1}: ${t.titel} (${t.schwerpunkt})`, text: t.aufgabe })),
    url: `https://claudiaconen.com${PFAD}`,
  };

  return (
    <div className="cc-2027 min-h-screen bg-pearl-white">
      <SEO
        title="7 Tage für deine Wirkungskraft – die Video-Challenge"
        description="Sieben Tage, jeden Tag eine Anleitung, eine Minute Video mit dem Handy, persönliches Audio-Feedback von Claudia Conen für alle, die durchziehen. Kostenfrei, in einer WhatsApp-Gruppe – mit den sieben Schritten, dem Workbook und dem Weg danach."
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

      {/* Sieben Schritte - Claudia, 22.09.2026 10:55 UTC: "dieser grau-braune Ton hinter dem Programm ... in Weiss
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
                Jeden Tag ein Audio-Impuls von mir mit einem Gedanken, in dem du dich wiedererkennst, und einer konkreten Aufgabe – 30 Minuten am Tag, einschließlich Übung, Aufnahme und Reflexion. Wer alle sieben Tage durchzieht, bekommt von mir ein persönliches Feedback als Audio zu seinem ersten und letzten Video – und in der Gruppe lernen alle mit. Die Inhalte öffnen sich in der Challenge-Woche, jeden Tag einer.
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
                  className={`cc-stufe p-6 hover:-translate-y-0.5 ${KACHEL} ${letzter ? `${FLAECHE} text-midnight-blue sm:col-span-2 lg:col-span-3 lg:flex lg:items-start lg:gap-8` : 'bg-pearl-white text-midnight-blue'}`}
                >
                  {/* 3-D-Icons nach den Flyer-Piktogrammen (Claudias Impuls 22.09.2026 11:48 UTC), erzeugt mit
                      skripte/schritt_icons.py ueber ihren Gemini-Schluessel. */}
                  <div className="flex flex-none items-center gap-4">
                    <img src={`/icons/${s.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className={`flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)] ${letzter ? 'h-16 w-16 lg:h-24 lg:w-24' : 'h-16 w-16'}`} />
                    <span aria-hidden="true" className={`font-montserrat text-3xl font-black ${letzter ? 'text-midnight-blue/40' : 'text-[#C9A961]'}`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    {letzter && <p className="mt-3 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue/80 lg:mt-0">Das Finale · Dein Kopf. Ihr Gefühl.</p>}
                    <h3 className={`font-montserrat font-extrabold uppercase tracking-wide ${letzter ? 'mt-1 text-lg sm:text-xl' : 'mt-3 text-base'}`}>{s.titel}</h3>
                    <p className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">{s.schwerpunkt}</p>
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
          </ol>
        </div>
      </Abschnitt>

      {/* Anmeldung direkt unter dem Kopf (Kritiker-Durchgang 22.09.2026, Claudias Ja 12:22 UTC: "mach das alles so"). */}
      <section id="anmeldung" className="bg-pearl-white pt-6 pb-4 sm:pt-8" aria-label="Anmeldung zur Challenge">
        <div className="mx-auto max-w-6xl px-6">
          <ChallengeAnmeldung start={startKurz} />
          {/* Fuer alle, die nicht an der Challenge teilnehmen wollen (Claudia, Discord 17.10.2026 09:24 UTC). Leise, nur ein Satz. */}
          <p className="mt-6 text-center font-montserrat text-lg font-extrabold leading-snug text-midnight-blue sm:text-2xl">
            Keine sieben Tage, sondern lieber gleich persönlich?
            <a href="/1zu1-training" className="mt-1 block text-[#13233F] underline decoration-[#C9A961] decoration-[3px] underline-offset-[6px] hover:decoration-[#D4AF37]">Nutze die Abkürzung: 1:1-Intensiv-Training →</a>
          </p>
        </div>
      </section>

      {/* So laeuft es ab - Claudias Diktate 13:07 + 13:10 UTC, sortiert (ABLAUF). */}
      <Abschnitt id="ablauf" className="bg-pearl-white py-12 sm:py-16" label="ablauf-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="So läuft es ab" hell />
          <h2 id="ablauf-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            7 Tage für deine Wirkungskraft – Schritt für Schritt.
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
          <div className="mt-8 text-center text-midnight-blue">
            <p className="font-montserrat text-[13px] font-extrabold uppercase tracking-[0.14em] sm:text-sm">Aus der Selbsterkenntnis <span className="text-[#C62828]">→</span> zur Selbstwirksamkeit <span className="text-[#C62828]">→</span> zum Selbstbewusstsein <span className="text-[#C62828]">→</span> zur Kundengewinnung</p>
            <p className="mt-3 font-cormorant text-3xl font-semibold italic leading-tight sm:text-4xl">Wer sich selbst vertraut, gewinnt.</p>
          </div>
          <p className="mt-5 max-w-3xl border-l-4 border-[#C9A961] bg-white px-5 py-3 font-inter text-[15px] leading-relaxed text-midnight-blue">{ABLAUF_HINWEIS}</p>
        </div>
      </Abschnitt>

      {/* Worum es geht / Das bekommst du / Dein Weg - Claudia, Discord 17.10.2026 08:07-08:26 UTC: „Die Challenge muss
          klarer sein“, „1 Minute Video bitte in rot“, „wie so ne Treppe“, „stell dir vor du waerst Apple“. Ein Gedanke je Block. */}
      <Abschnitt id="worum" className="bg-white py-16 text-midnight-blue sm:py-24" label="worum-titel">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="flex justify-center"><Kicker text="Worum es geht" hell /></div>
          <h2 id="worum-titel" className="mt-5 font-montserrat text-4xl font-extrabold leading-[1.08] sm:text-6xl">Entdecke deine<br />Wirkungskraft.</h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-relaxed sm:text-xl">
            In dieser Challenge geht es um dich: deine Identität, deine Unverwechselbarkeit. Was zieht Kunden zu dir? Was bietest du? Wo ist dein Expertenstatus?
            {' '}Welche Story kannst du erzählen? Und wann vertrauen Menschen dir überhaupt?
          </p>
          <h3 className="mt-14 font-montserrat text-2xl font-extrabold sm:text-3xl">Die Challenge ist deine Bühne.</h3>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-lg leading-relaxed sm:text-xl">
            Die anderen sehen deine Videos, und du siehst ihre. Alle wissen mehr als einer. <strong className="font-bold">Vielleicht ist in der Challenge sogar dein bester zukünftiger Kunde.</strong>
            {' '}Wir brauchen viele Kontaktpunkte, um Vertrauen aufzubauen. Hier sehen wir miteinander, wie wir wachsen, wofür wir stehen und wofür wir brennen.
            {' '}So hebst du dich aus der Masse der Angebote heraus und definierst dich nicht nur über den Preis.
          </p>
          <p className="mx-auto mt-12 max-w-3xl text-center font-inter text-lg leading-relaxed sm:text-xl">
            Echt, authentisch, mit Leichtigkeit: So gestaltest du künftig deine eigene Werbung.
            <strong className="mt-3 block font-montserrat text-xl font-extrabold sm:text-2xl">Gerade im Zeitalter der künstlichen Intelligenz sind Klarheit und Vertrauen wichtiger denn je.</strong>
          </p>
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
          <Kicker text="Dein Wegweiser" hell />
          <h2 id="tage-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Sieben Tage. Jeden Tag eine Anleitung zum Aufklappen –
            <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">jeden Tag 30 Minuten für deine Wirkung.</span>
          </h2>
          <p className="mt-4 max-w-3xl font-inter text-lg leading-relaxed text-midnight-blue">
            Warum hören Menschen dir gerne zu? „Ich mag meine Stimme nicht." Story, Elevator Pitch, Keynote, Miteinander, jeden Tag telefonieren, Kaltakquise, Kundengewinnung – all das und noch viel mehr gehört dazu.
          </p>
          <p className="mt-5 max-w-3xl border-l-4 border-[#C9A961] bg-white px-5 py-4 font-cormorant text-2xl italic leading-snug text-midnight-blue sm:text-3xl">
            „{UEBUNGSSATZ}"
            <span className="mt-1 block font-montserrat text-[11px] font-extrabold not-italic uppercase tracking-[0.16em] text-midnight-blue/70">Unser Satz – an allen sieben Tagen</span>
          </p>
          <div className={`mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-md px-5 py-2.5 font-montserrat text-[13px] font-extrabold uppercase tracking-[0.12em] text-midnight-blue ${FLAECHE}`}>
            <span>Auftakt live im Zoom · Montag, 26. Oktober 2026 · 19:00 Uhr</span>
            <span>Abschluss · Montag, 2. November 2026 · 19:00–20:00 Uhr · Zoom freiwillig</span>
          </div>


          <p className="mt-6 font-montserrat text-[12px] font-bold uppercase tracking-[0.16em] text-midnight-blue/60">Der Inhalt wird täglich freigegeben</p>
          <div className="mt-2 grid gap-5 md:grid-cols-[34px_minmax(0,1fr)]">
          <Schiene />
          <ol ref={listeRef} className="grid list-none gap-3 p-0">
            {TAGE.map((t, i) => {
              const letzter = i === TAGE.length - 1;
              return (
                <li key={t.titel} style={{ ['--i' as string]: i }} className="cc-stufe">
                  {!frei[i] ? (
                    <div className={`flex items-center gap-4 bg-white/70 px-4 py-3 text-midnight-blue sm:px-6 ${KACHEL} border-[#C9A961]/35`}>
                      <span className="cc-puls rounded-md bg-midnight-blue/70 px-2.5 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-pearl-white">Tag {i + 1}</span>
                      <span className="min-w-0 flex-1 font-montserrat text-sm font-bold text-midnight-blue/80">{KURZ.format(freischaltung(heute, i))}</span>
                      <Schluessel />
                    </div>
                  ) : (
                  <details className={`group bg-white text-midnight-blue ${KACHEL}`}>
                    <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-3 sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span className={`cc-puls rounded-md px-2.5 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] ${letzter ? `${GOLD} text-midnight-blue` : 'bg-midnight-blue text-pearl-white'}`}>Tag {i + 1}</span>
                      <span className="min-w-0 flex-1 font-montserrat text-sm font-bold text-midnight-blue/80">
                        {KURZ.format(freischaltung(heute, i))}
                      </span>
                      <span className="hidden font-montserrat text-xs font-bold text-midnight-blue/70 sm:inline"><span className="group-open:hidden">Aufklappen</span><span className="hidden group-open:inline">Zuklappen</span></span>
                      <Schluessel />
                    </summary>
                    <div className="border-t border-[#C9A961]/40 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
                      <h3 className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{t.titel}</h3>
                      <p className="mt-1 font-montserrat text-[11px] font-bold uppercase tracking-[0.14em] text-midnight-blue/70">{t.schwerpunkt}</p>
                      <div className="mt-3"><TagInhalt t={t} /></div>
                    </div>
                  </details>
                  )}
                </li>
              );
            })}
            {/* Tag 8 - Claudia, Discord 17.10.2026 09:15 UTC: „in blau mit goldener Schrift: dein Werbetag in unserer Challenge-Gruppe“. */}
            <li className="cc-stufe">
              <div className={`cc-werbetag flex flex-wrap items-center gap-x-4 gap-y-1 bg-midnight-blue px-4 py-4 sm:px-6 ${KACHEL} border-[#C9A961]`}>
                <span className={`rounded-md px-2.5 py-1.5 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Tag 8</span>
                <span className="gold-text-animated min-w-0 flex-1 font-montserrat text-lg font-extrabold">Dein persönlicher Werbetag in unserer Challenge-Gruppe</span>
                <span className="font-montserrat text-sm font-bold text-pearl-white/80">Mo., 2. Nov.</span>
              </div>
            </li>
          </ol>
          </div>
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

      {/* KI und du - Claudia, 22.09.2026 10:51-10:52 UTC: weniger Text ("die Leute lesen nicht mehr so viel"),
          Text soll "mitlaufen wie beim Schreiben" (cc-schreib: Zeilen wischen beim Scrollen nacheinander auf),
          rechts die Ueberschrift "Der Mensch ist das Unikat ..." und darunter die Vorteile des Menschen. */}
      <Abschnitt className="bg-pearl-white py-16 text-midnight-blue sm:py-24" label="ki-und-du">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Dein KI-Agent ist effizient. Und du?" hell />
          <h2 id="ki-und-du" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
            Warum Menschen so gern mit der KI reden. Der Mensch ist das Unikat, die KI der Beschleuniger – wir nutzen beides.
            <span className="mt-1 block underline decoration-[#C9A961] decoration-[4px] underline-offset-[6px]">Lass dich überraschen.</span>
          </h2>
          {/* Zwei gleich breite, weisse Karten (Claudias Foto 22.09.2026 12:22 UTC: "unterschiedlich breit ... so schwarz ...
              Schrift schlecht lesbar"); die KI-Gruende auf sechs gekuerzt (Kritiker-Durchgang). */}
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            <div className={`bg-white p-6 text-midnight-blue sm:p-8 ${KACHEL} border-[#C9A961]`}>
              <h3 className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-midnight-blue/80">Warum die KI so bequem ist</h3>
              <ul className="mt-5 grid list-none gap-3.5 p-0">
                {KI_GRUENDE.map((g, i) => (
                  <li key={g.titel} style={{ ['--i' as string]: i }} className="cc-stufe flex items-start gap-3">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-md bg-midnight-blue text-[#EBD197]"><g.Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
                    <span className="min-w-0">
                      <b className="block font-montserrat text-[14px] font-extrabold leading-tight">{g.titel}</b>
                      <span className="font-inter text-[14px] leading-snug">{g.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-inter text-[15px] leading-relaxed">
                Und trotzdem: Keine Geschichte, kein Ego, keine Verletzlichkeit – genau deshalb erinnert sich niemand an einen Avatar.
              </p>
            </div>
            <div className={`bg-white p-6 text-midnight-blue sm:p-8 ${KACHEL} border-[#C9A961]`}>
              <h3 className="font-montserrat text-xl font-black leading-tight sm:text-2xl">
                Der Mensch ist das Unikat. Die KI der Beschleuniger – <span className="underline decoration-[#C9A961] decoration-[3px] underline-offset-4">wenn wir Menschlichkeit zeigen.</span>
              </h3>
              <p className="mt-4 font-inter text-[15px] leading-relaxed">
                Wir Menschen haben keine Reset-Taste. Was wir sagen, bleibt beim anderen. Und solange wir mit uns selbst beschäftigt sind, reden wir nicht mit ihm – sondern nur vor ihm.
              </p>
              <p className="mt-5 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-midnight-blue/80">Was der Mensch kann</p>
              <ul className="mt-2 grid list-none gap-2.5 p-0">
                {MENSCH_KANN.map((s, i) => (
                  <li key={s} style={{ ['--i' as string]: i }} className="cc-schreib flex gap-3 font-inter text-[15px] leading-relaxed">
                    <Haken />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Abschnitt>

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


      {/* Dein Weg: die Treppe quer, jede Stufe hoeher (lg: items-end + wachsende Hoehe). Gold nur als Flaeche/Linie. */}
      <Abschnitt id="weg" className="bg-white py-16 text-midnight-blue sm:py-24" label="weg-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <div className="flex justify-center"><Kicker text="Dein Weg" hell /></div>
            <h2 id="weg-titel" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl">Drei Stufen. Du bestimmst das Tempo.</h2>
          </div>
          <ol className="mt-16 grid list-none gap-4 p-0 lg:grid-cols-3 lg:items-start">
            <li className={`flex flex-col p-5 sm:p-6 ${FLAECHE} rounded-[10px]`}>
              <img src="/challenge/produkte/challenge.webp" alt="Produktbild 7-Tage-Video-Challenge" width={800} height={800} loading="lazy" decoding="async" className="mb-5 w-full rounded-[8px] border border-[#13233F]/10" />
              <span className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-midnight-blue/80">Stufe 1 · Die Methode</span>
              <h3 className="mt-3 font-montserrat text-2xl font-extrabold">Die 7-Tage-Challenge</h3>
              <p className="mt-3 font-inter text-[16px] leading-relaxed">Dein Gratis-Programm für mehr Wirkungskraft.</p>
              <a href="#anmelden" className="mt-auto inline-flex self-start pt-6 font-montserrat text-sm font-bold text-midnight-blue underline decoration-[#C9A961] decoration-2 underline-offset-4">Jetzt eintragen ↑</a>
            </li>
            <li className={`flex flex-col bg-midnight-blue p-5 text-pearl-white sm:p-6 lg:-translate-y-6 ${KACHEL} border-[#C9A961]`}>
              <img src="/challenge/produkte/1zu1.webp" alt="Produktbild 1:1-Intensiv-Training" width={800} height={800} loading="lazy" decoding="async" className="mb-5 w-full rounded-[8px]" />
              <span className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F7E7CE]">Stufe 2 · Die Abkürzung</span>
              <h3 className="mt-3 font-montserrat text-2xl font-extrabold text-white">1:1-Intensiv-Training</h3>
              <p className="mt-3 font-inter text-[16px] leading-relaxed text-pearl-white/90">Nur du und Claudia. Von der Selbsterkenntnis zum Selbstbewusstsein zur Kundengewinnung.</p>
              <p className="mt-2 font-inter text-sm text-pearl-white/85">Sonderpreis zur Challenge: 173 € zzgl. MwSt. (205,87 € inkl. MwSt.)</p>
              <a href="/1zu1-training" className={`mt-auto inline-flex self-start rounded-full px-6 py-3 font-montserrat text-sm font-bold text-midnight-blue no-underline transition-transform hover:-translate-y-px ${GOLD}`}>Mehr erfahren →</a>
            </li>
            <li className={`flex flex-col bg-white p-5 sm:p-6 lg:-translate-y-12 ${KACHEL}`}>
              <img src="/challenge/produkte/mentoring.webp?v=2" alt="Produktbild Unverwechselbar. Das 12-Wochen-Mentoring" width={800} height={800} loading="lazy" decoding="async" className="mb-5 w-full rounded-[8px] border border-[#13233F]/10" />
              <span className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-midnight-blue/75">Stufe 3 · Dauerhaft verinnerlichen</span>
              <h3 className="mt-3 font-montserrat text-2xl font-extrabold">Das 12-Wochen-Mentoring · live online</h3>
              <p className="mt-3 font-inter text-[16px] leading-relaxed">Weil deine Bühne überall ist, wo du den Mund aufmachst. Zwölf Wochen, dabei begleite ich dich.</p>
              <a href="/mentoring-programm" className="mt-auto inline-flex self-start rounded-full border border-midnight-blue/25 px-6 py-3 font-montserrat text-sm font-bold text-midnight-blue no-underline transition-colors hover:border-[#D4AF37]">Zum Mentoring →</a>
            </li>
          </ol>
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
