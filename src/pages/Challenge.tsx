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
import { Ban, Smile, Zap, Clock, MessageSquareOff, EyeOff, Heart, Database, SlidersHorizontal, Bot } from 'lucide-react';

/**
 * Die Challenge-Seite - EINE Seite aus zwei (Claudia, 22.09.2026 11:00 UTC: "jetzt hast du von beiden
 * Seiten das Beste bekommen ... mach aus beiden Seiten jetzt das ... das Buch natuerlich mit drin lassen").
 * Vorgaenger: die Flyer-Seite /unverwechselbar-du (Nacht 22.09., aus dem Event-Flyer "UNVERWECHSELBAR DU")
 * und die kurze /challenge (Vormittag 22.09.). /unverwechselbar-du leitet per 301 hierher.
 *
 * Reihenfolge: Kopf mit Foto-Reihen -> Sieben Schritte -> So laeuft es + die sieben Tage (oeffnen erst an
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
  { titel: 'Sofortige Reaktion.', text: 'Der Avatar antwortet schnell, ohne zu zögern.', Icon: Zap },
  { titel: 'Immer verfügbar.', text: '24/7 erreichbar. Kein Termin nötig.', Icon: Clock },
  { titel: 'Kein Smalltalk. Kein Drama.', text: 'Der Avatar bleibt bei der Sache.', Icon: MessageSquareOff },
  { titel: 'Keine Körpersprache. Keine Unsicherheit.', text: 'Kein Flackern der Augen, keine nervöse Haltung.', Icon: EyeOff },
  { titel: 'Optimierte Freundlichkeit.', text: 'Avatare sind höflich, geduldig, nie genervt.', Icon: Heart },
  { titel: 'Datenspeicher statt Emotionen.', text: 'Der Avatar vergisst nicht. Und er verzeiht sofort.', Icon: Database },
  { titel: 'Individuelle Anpassung.', text: 'Er klingt so, wie du es möchtest: ruhig, motivierend, sachlich, warm.', Icon: SlidersHorizontal },
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
  'Ein Detail, das nur du kennst: ein Ort, ein Name, ein Satz, der fiel. Geschichten bleiben, Daten nicht.',
  'Unperfekt, aber echt. Ein Versprecher, über den du lachst, macht dich glaubwürdiger als jede glatte Antwort.',
];

const FRAGEN: { frage: string; text: string }[] = [
  { frage: 'Kennst du deine Berufung?', text: 'Und kannst du daraus echte Storys formen, die im Gedächtnis bleiben?' },
  { frage: 'Weißt du, wie das Gehirn Entscheidungen trifft?', text: 'Und wie du dich dort verankern kannst?' },
  { frage: 'Kannst du blitzschnell Emotionen wecken?', text: 'Und deine Botschaft fühlbar machen?' },
  { frage: 'Nutzt du deine Stimme bewusst?', text: 'Als eins der stärksten Marketinginstrumente, die Vertrauen schaffen und unaufhaltbar sind.' },
  { frage: 'Strahlst du Sicherheit aus?', text: 'So, dass andere sofort spüren: Bei dir bin ich richtig.' },
  { frage: 'Baust du Verbindung auf?', text: 'Von Mensch zu Mensch, statt nur Argument zu Argument.' },
  { frage: 'Bleibst du im Kopf deiner Zuhörer?', text: 'Weil du ihr Herz erreichst?' },
];

const SCHRITTE: { titel: string; text: string }[] = [
  { titel: 'Das Gehirn verstehen', text: 'Blitzschnell. Emotionen. Verstand. Wie Menschen entscheiden, bevor sie es merken – und was das für jeden deiner Sätze heißt.' },
  { titel: 'KI & Mensch – das Zusammenspiel', text: 'Perfektion klickt. Persönlichkeit bleibt. Was du der Technik gibst – und was du niemals abgibst.' },
  { titel: 'Essenz und Wirkung', text: 'Unverwechselbarkeit beginnt im Inneren. Was dich ausmacht, in einen Satz gebracht.' },
  { titel: 'Dein Kunde denkt in Bildern', text: 'Geschichten bleiben. Daten nicht. Wie du aus deiner Erfahrung Bilder machst, die man weitererzählt.' },
  { titel: 'Unaufhaltbar', text: 'Einzigartig. Unüberhörbar. Deine Stimme. Deine Wirkung. Das Zusammenspiel von Worten, Stimme und Haltung.' },
  { titel: 'Wirkung ist kein Zufall', text: 'Sie ist trainierbar. Sichtbar. Entscheidbar. Echt, unverwechselbar – nicht perfekt.' },
  { titel: 'Dein Kopf. Ihr Gefühl.', text: 'Du bekommst wertvolle Audio-Impulse, Anleitungen und Feedback – der Schritt, in dem alles zusammenkommt.' },
];


const GOLD = 'bg-[linear-gradient(135deg,#C9A961,#F7E7CE_48%,#D4AF37)]';
const KACHEL = 'rounded-[10px] border border-[#D4AF37]/55 transition-[border-color,box-shadow] duration-200 hover:border-[#EBD197] hover:shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)]';
const DUNKEL = { background: 'linear-gradient(180deg, #0A1628 0%, #0F1F3A 55%, #0A1628 100%)' };
/** Claudias Idee vom 22.09.2026, 02:13 UTC: vom Event per QR in eine Video-Challenge - sieben Tage,
 *  sieben Schritte, 60 Sekunden am Tag. Kanal: ihre WhatsApp-Gruppe "Video-Challenge" (Einladungslink
 *  von ihr am 22.09.2026, 02:20 UTC). Aendert sie den Link, hier tauschen. */
/** Workbook "Entdecke deine Stimmwirkung" (Brainself-Buchauszug), korrigierte Fassung vom 22.09.2026
 *  (Aufgabe 18: keine Millisekunden-Zahl, kein "Opfer", 37 Jahre, Nachtblau). Blaettern: WorkbookBlaettern.tsx. */
const WORKBOOK_PDF = '/unverwechselbar/workbook-entdecke-deine-stimmwirkung.pdf';


/** Fuenf kleine Kacheln wie im Kopf der Startseite, mit den 3-D-Icons (Claudia, 22.09.2026 11:27 UTC:
 *  "kleinere Felder ... so wie auf der Hauptseite oben die fuenf Kacheln, auch mit diesen 3-D-Icons"). */
const WERKZEUG: { titel: string; text: string; icon: string }[] = [
  { titel: 'Stimme', text: 'Sprich zum letzten Stuhl im Raum – auch wenn nur das Handy vor dir steht. Ein Satz, eine Pause, der nächste Satz.', icon: 'stimme' },
  { titel: 'Innere Haltung', text: 'Bevor du auf Aufnahme drückst: Wem erzählst du das? Ein Mensch, nicht ein Publikum.', icon: 'praesenz' },
  { titel: 'Aufwärmen', text: 'Zwei Minuten: summen, Lippen flattern, drei Sätze überdeutlich. Danach klingt alles wacher.', icon: 'wirkung' },
  { titel: 'Storytelling', text: 'Fang mit dem Moment an, nicht mit der Vorgeschichte. Das ist eine Geschichte – alles andere ein Bericht.', icon: 'story' },
  { titel: 'Das Mikrofon', text: 'Das Handy nimmt den Raum auf. Ein Ansteckmikrofon holt deine Stimme nach vorn. Gut, nicht perfekt – perfekt ist der Avatar.', icon: 'botschaft' },
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
  if (h < START) return 'Start: Montag, 26. Oktober 2026, 19:00 Uhr – live im Zoom-Call · Abschluss: Montag, 2. November, 19:00 Uhr';
  if (h <= ENDE) {
    const tag = Math.min(7, Math.floor((h.getTime() - START.getTime()) / 86400000) + 1);
    return `Die Challenge läuft – heute ist Tag ${tag} · Abschluss: Montag, 2. November, 19:00 Uhr`;
  }
  return 'Der Durchgang vom 26. Oktober ist beendet – trag dich ein, du erfährst als Erste, wann es wieder losgeht';
}
const KURZ = new Intl.DateTimeFormat('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });

type Tag = {
  titel: string;
  /** Eine Zeile, die auf der zugeklappten Kachel steht. */
  vorschau: string;
  /** Die Aufgabe des Tages - steht oben in der aufgeklappten Kachel. */
  aufgabe: string;
  /** Der Satz, der eingesprochen wird (Tag 1 - Claudias Wortlaut). */
  satz?: string;
  /** Ueberschrift ueber den Schritten, z. B. "Dann weck deine Stimme auf - fuenf Minuten:". */
  schrittTitel: string;
  schritte: string[];
  /** Der Abschluss, nach den Schritten. */
  danach?: string;
};

/** Tag 1 ist Claudias Wortlaut (Discord, 22.09.2026, 09:19 UTC), nur geglaettet: ihr Satz, ihre Bilder
 *  (Eisschollen, Raubkatze, Glas Wasser), ihre Reihenfolge. Tage 2 bis 7 sind meine Entwuerfe, bis
 *  ihre Fassungen kommen - dann hier ersetzen. */
const TAGE: Tag[] = [
  {
    titel: 'Lerne deine Stimmwirkung kennen',
    vorschau: 'Der Satz am Morgen – und fünf Minuten, die deine Stimme aufwecken.',
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
  },
  {
    titel: 'Die Pause gehört dem Zuhörer',
    vorschau: 'Atmen, Tempo, Stille – die drei Dinge, die Profis anders machen.',
    aufgabe: 'Nach den fünf Minuten von Tag 1: Sag deinen Satz noch einmal – und mach nach jedem Komma eine Pause, in der du still bis zwei zählst. Dann drei Sätze über deinen gestrigen Tag, genauso.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Atme vor dem ersten Wort aus, nicht ein. Wer mit vollen Lungen startet, presst. Wer ruhig einatmet, klingt ruhig.',
      'Die Pause fühlt sich für dich lang an – für den Zuhörer ist sie genau richtig. Dort versteht er dich. Dort nickt er.',
      'Tiefer wird die Stimme nicht durch Drücken, sondern durch Ruhe. Ein Satz, eine Pause, der nächste Satz. Eile hört man.',
    ],
  },
  {
    titel: 'Sag, was du tust',
    vorschau: 'Eine Minute ohne Fachwort – so, dass deine Nachbarin es versteht.',
    aufgabe: 'Eine Minute: Was tust du – ohne ein einziges Fachwort. So, dass deine Nachbarin es versteht.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Ein Gedanke pro Satz. Wo ein „und" steht, versteckt sich meist ein zweiter Satz. Punkt setzen, atmen, weiter.',
      'Fang beim Menschen an, nicht bei dir: „Wenn jemand …, dann …" – so hört jeder sofort, ob es ihn betrifft.',
      'Sag es einmal so, wie du es am Telefon einer Freundin sagen würdest. Genau diese Fassung nimmst du auf – nicht die offizielle.',
    ],
  },
  {
    titel: 'Dieselben Worte, drei Wirkungen',
    vorschau: 'Beruhigend, weckend, überzeugend – mit demselben Satz.',
    aufgabe: 'Ein Satz, drei Absichten: einmal beruhigend, einmal weckend, einmal überzeugend. Dieselben Worte.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Entscheide vor dem Sprechen, was der Zuhörer danach tun soll. Die Absicht färbt die Stimme – ohne dass du an ihr herumbastelst.',
      'Beruhigen: Tempo runter, Stimme am Satzende nach unten. Wecken: kürzere Sätze, direkter Blick. Überzeugen: eine Pause vor dem wichtigsten Wort.',
      'Respekt ist hörbar. Wer den Zuhörer verstehen statt überreden will, klingt anders – das ist die überzeugende Fassung.',
    ],
  },
  {
    titel: 'Ein Moment statt Lebenslauf',
    vorschau: 'Der Moment, in dem du wusstest: Das ist mein Beruf.',
    aufgabe: 'Erzähl den Moment, in dem du wusstest: Das ist mein Beruf. Eine Person, ein Ort, ein Satz, der fiel.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Beginn mittendrin: „Dienstag, acht Uhr, der Kunde sagt …" – keine Vorgeschichte, keine Einleitung.',
      'Zeig, was zu sehen war, statt zu sagen, was zu fühlen ist. „Sie legte den Stift weg" wirkt stärker als „Sie war beeindruckt".',
      'Ende mit dem, was sich seitdem geändert hat – ein Satz. Er ist der Grund, warum du die Geschichte erzählst.',
    ],
  },
  {
    titel: 'Deine Stimme gegen die Maschine',
    vorschau: 'Ein Satz von der KI, ein Satz von dir – und der Unterschied, den man hört.',
    aufgabe: 'Lass dir von einer KI einen Satz über dich schreiben und sag ihn. Dann sag es so, wie du es wirklich sagen würdest. Nimm beides auf.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Streich jedes Wort, das du im Gespräch nie benutzt. „Innovativ", „ganzheitlich", „Lösungen" – das sagt die Maschine, nicht du.',
      'Persönlich wird ein Satz durch ein Detail, das nur du kennst: ein Ort, ein Name, eine Zahl aus deinem Alltag.',
      'Hör beide Aufnahmen mit geschlossenen Augen. Welchem Menschen würdest du glauben? Das ist deine Richtung.',
    ],
  },
  {
    titel: 'Dein Satz zum Mitnehmen',
    vorschau: 'Tag 1 neben Tag 7 hören – und der eine Satz, den du überall sagen kannst.',
    aufgabe: 'Nach den fünf Minuten: Sag deinen Satz von Tag 1 und hör ihn neben der Aufnahme vom ersten Morgen. Dann der eine Satz, den du überall sagen kannst. Den schickst du mir – und bekommst eine Antwort von mir, keine Vorlage.',
    schrittTitel: 'Drei Tipps:',
    schritte: [
      'Kurz genug, dass ihn jemand weitererzählen kann, ohne nachzulesen. Test: Sag ihn einer Person und bitte sie, ihn morgen zu wiederholen.',
      'Kein Superlativ. „Die Beste", „einzigartig", „führend" – das behauptet jeder. Ein konkretes Versprechen behauptet keiner.',
      'Er muss nach dir klingen, nicht nach einem Slogan. Wenn du dich beim Sagen räusperst, ist es noch nicht deiner.',
    ],
  },
];

/** Der Tipp am Morgen ist Tag 1 in Claudias Wortlaut - steht vorweg, damit die Streifen Geheimnis bleiben. */
const MORGEN = TAGE[0];

/** Tipp 1, vor Tag 1 - Claudias Diktat vom 22.09.2026, 11:17 UTC ("Der Tipp soll Gold leuchten", aufklappbar,
 *  "das kannst du auch jetzt schon tun"). Anleitung fuer WhatsApp in vier Schritten; ihre Nummer aus dem Flyer. */
const WEGWEISER = {
  titel: 'Erstelle dir eine eigene WhatsApp-Gruppe – nur für dich',
  vorschau: 'Meine Empfehlung bis zum Start: ein Raum, in dem du übst, ohne dass dich jemand stört. Das kannst du jetzt schon tun.',
  text: 'In dieser Gruppe bist nur du. Dort übst du, hörst deine Steigerung – und sammelst vielleicht sogar Videomaterial für Social Media. Nach sieben Tagen entdeckst du deine eigenen Erfolge, Aufnahme für Aufnahme.',
  schritte: [
    'WhatsApp öffnen → „Neue Gruppe" (Android: die drei Punkte oben rechts · iPhone: „Neuer Chat" und dann „Neue Gruppe").',
    'Niemanden auswählen und einfach weiter – WhatsApp erlaubt eine Gruppe nur mit dir. Besteht deine Version auf einer zweiten Person: Lade mich ein (+49 160 99142208) und wirf mich danach wieder raus. Ich nehme es nicht persönlich.',
    'Namen vergeben – zum Beispiel „Meine Stimme". Fertig.',
    'Ab jetzt: jede Aufnahme dort hineinsprechen. Nach sieben Tagen hörst du den Unterschied.',
  ],
};

const ABLAUF = [
  'Du trägst dich unten ein und gehst in die WhatsApp-Gruppe – dort läuft die Challenge, mit Tipps, Austausch und einem Miteinander.',
  'Wir starten gemeinsam: live im Zoom-Call, Montag, 26. Oktober, 19:00 Uhr. Danach jeden Tag ein neuer Schlüssel – als Audio von mir, mit Hinweisen.',
  'Du nimmst dein Video auf – eine Minute, 24 Stunden Zeit – und bekommst mein Feedback. Abschlusstreffen live im Zoom: Montag, 2. November, 19:00 Uhr.',
];

const FUER = [
  'gehört werden willst – im Meeting, am Telefon, vor Kunden, auf der Bühne',
  'täglich fünf Minuten und ein Handy hast',
  'dich selbst hören willst, auch wenn es am Anfang unangenehm ist',
  'Feedback willst statt Applaus',
  'eine Woche durchhältst – sieben Aufnahmen, keine mehr',
];
const NICHT_FUER = [
  'eine perfekte Aufnahme willst statt einer echten',
  'Tipps sammeln, aber nichts aufnehmen möchtest',
  'erst eine Bühne brauchst, bevor du übst',
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
    <div className={`mt-3 grid items-center gap-5 rounded-[10px] px-5 py-5 text-midnight-blue sm:grid-cols-[minmax(0,1fr)_auto] sm:px-7 ${GOLD}`}>
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
          <stop offset="0" stopColor="#C9A961" /><stop offset=".48" stopColor="#F7E7CE" /><stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <path fill="url(#cc-schluessel-gold)" d="M14.5 2a7.5 7.5 0 0 0-7.2 9.6L2 16.9V22h5.1v-2.6h2.6v-2.6h2.6l1.3-1.3A7.5 7.5 0 1 0 14.5 2Zm2 4.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    </svg>
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
    <figure className={`m-0 overflow-hidden bg-[#13233F] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.6)] sm:justify-self-end ${KACHEL} ${quer ? 'aspect-[3/2] w-[clamp(220px,36vw,380px)]' : 'aspect-[9/16] w-[clamp(150px,22vw,210px)]'}`}>
      <img src={`/unverwechselbar/${datei}.webp`} alt={alt} width={quer ? 900 : 360} height={quer ? 600 : 640} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" />
    </figure>
  );
}
const KOPF = 'grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10';

function Haken() {
  return <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none rotate-[-45deg] border-b-2 border-r-2 border-[#D4AF37]" />;
}

export default function Challenge() {
  const [antworten, setAntworten] = useState<(boolean | null)[]>(() => LERNBOX.map(() => null));
  const [fragen, setFragen] = useState<boolean[]>(() => FRAGEN.map(() => false));
  const [buchOffen, setBuchOffen] = useState(false);
  const nBeantwortet = antworten.filter((a) => a !== null).length;
  const nRichtig = antworten.filter((a, i) => a === LERNBOX[i].ja).length;
  const nFragen = fragen.filter(Boolean).length;
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
    name: 'Sieben Tage für deine Wirkung – die Video-Challenge',
    description: 'Sieben Tage, jeden Tag eine Aufgabe und eine Minute Video mit dem Handy – mit Feedback von Claudia Conen. Kostenfrei, in einer WhatsApp-Gruppe.',
    totalTime: 'P7D',
    step: TAGE.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, name: `Tag ${i + 1}: ${t.titel}`, text: t.aufgabe })),
    url: `https://claudiaconen.com${PFAD}`,
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      <SEO
        title="Sieben Tage für deine Wirkung – die Video-Challenge"
        description="Sieben Tage, jeden Tag eine Anleitung, eine Minute Video mit dem Handy, Feedback von Claudia Conen. Kostenfrei, in einer WhatsApp-Gruppe – mit den sieben Schritten, dem Workbook und dem Weg danach."
        path={PFAD}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }} />
      <Navigation />

      {/* Kopf: Foto-Reihen laufen hinter dem Text (Claudia, 22.09.2026 10:38 UTC: "dass diese Kacheln
          von der Webinar-Seite im Hintergrund hier auch laufen"), davor eine deckende Text-Kachel. */}
      <header className="relative overflow-hidden bg-[#0A1628] pt-32 pb-16 sm:pt-40 sm:pb-24">
        <FotoReihen />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="mb-6 text-pearl-white/75">
            <Brotkrumen krumen={[{ name: 'Sieben Tage für deine Wirkung' }]} />
          </div>
          <div className="max-w-3xl rounded-[12px] border border-[#D4AF37]/45 bg-[rgba(10,22,40,0.86)] px-6 py-8 text-pearl-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:px-10 sm:py-11" style={{ borderTopColor: '#F7E7CE' }}>
            {/* Claudia, 22.09.2026 11:16 UTC: Kicker groesser; "Sieben Tage" in derselben Schrift wie "fuer deine
                Wirkung" (eine Zeile Gold-Schimmer, nicht zwei Schriften); weniger weisser Text; Punkte, was die
                Challenge bringt; das Datum "damit es direkt auffaellt". */}
            <p className="flex items-center gap-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.22em] text-[#EBD197] sm:text-base">
              <span aria-hidden="true" className={`cc-linie h-[3px] w-7 rounded-full ${GOLD}`} />
              Video-Challenge · kostenfrei
            </p>
            <h1 className="gold-text-animated mt-6 font-montserrat text-4xl font-black uppercase leading-[1.08] tracking-tight sm:text-6xl">
              Sieben Tage für deine Wirkung.
            </h1>
            <p className="mt-5 font-cormorant text-2xl italic leading-snug text-[#F7E7CE] sm:text-3xl">Zeig dich. Sei dabei. Lerne deine Wirkung kennen.</p>
            <p className="mt-5 max-w-xl font-inter text-lg leading-relaxed text-white">
              Nutze eine der wertvollsten Marketing-Möglichkeiten der Welt: deinen akustischen Fingerabdruck. Weil du ein Unikat bist. Entdecke hier in der Challenge:
            </p>
            <ul className="mt-3 grid list-none gap-1.5 p-0 sm:grid-cols-2">
              {['Deine Wirkung', 'Deine Keynote-Möglichkeiten', 'Warum Menschen dir zuhören', 'Was wirklich zählt', 'Tipps, wie KI deine echte Kommunikation unterstützt', 'Das Workbook „Entdecke deine Stimmwirkung" – zum Blättern und Mitnehmen'].map((z) => (
                <li key={z} className="flex items-start gap-3 font-montserrat text-[15px] font-bold text-white"><Haken />{z}</li>
              ))}
            </ul>
            <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue sm:text-base ${GOLD}`}>
              {stand}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href="#anmelden" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                Ich bin dabei – eintragen
              </a>
              <a href="#tage" className="font-montserrat text-sm font-semibold text-[#EBD197] underline decoration-[#D4AF37]/50 underline-offset-4 hover:decoration-[#F7E7CE]">
                Die sieben Tage ansehen ↓
              </a>
            </div>
            <p className="mt-5 max-w-xl font-inter text-sm text-pearl-white/80">
              Die Challenge läuft in einer WhatsApp-Gruppe. Dort sehen die Mitglieder gegenseitig Handynummern und Videos – anders geht es nicht. Wer dabei ist, erklärt sich damit einverstanden.
            </p>
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
                <span className="mt-1 block underline decoration-[#D4AF37] decoration-[4px] underline-offset-[6px]">Du bleibst im Kopf.</span>
              </h2>
              <p className="mt-4 max-w-2xl font-inter text-lg text-midnight-blue">
                Jeden Tag bekommst du einen weiteren Schlüssel – als Türöffner zu deinem Gegenüber. Du erhältst eingesprochene Audios, Hinweise und ein Feedback zu deinem Video. Für jedes Video hast du 24 Stunden Zeit – und es dauert nur eine Minute.
              </p>
            </div>
            <Kopfbild datei="keynote" alt="Claudia Conen auf der Bühne bei einer Keynote" />
          </div>
          <ol className="mt-9 grid list-none gap-3.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {SCHRITTE.map((s, i) => {
              const letzter = i === SCHRITTE.length - 1;
              return (
                <li
                  key={s.titel}
                  style={{ ['--i' as string]: i }}
                  className={`cc-stufe p-6 hover:-translate-y-0.5 ${KACHEL} ${letzter ? `${GOLD} border-transparent text-midnight-blue` : 'min-h-[190px] bg-pearl-white text-midnight-blue'}`}
                >
                  {/* 3-D-Icons nach den Flyer-Piktogrammen (Claudias Impuls 22.09.2026 11:48 UTC), erzeugt mit
                      skripte/schritt_icons.py ueber ihren Gemini-Schluessel. */}
                  <div className="flex items-center gap-4">
                    <img src={`/icons/schritt-${i + 1}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="h-16 w-16 flex-none drop-shadow-[0_8px_12px_rgba(10,22,40,0.25)]" />
                    <span aria-hidden="true" className={`font-montserrat text-3xl font-black ${letzter ? 'text-midnight-blue/40' : 'text-[#D4AF37]'}`}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 font-montserrat text-base font-extrabold uppercase tracking-wide">{s.titel}</h3>
                  <p className="mt-2.5 font-inter text-[15px] leading-relaxed">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Abschnitt>

      {/* So läuft es - drei Zeilen, nicht mehr */}
      <Abschnitt id="ablauf" className="bg-pearl-white py-12 sm:py-16" label="ablauf-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="So läuft es" hell />
          <h2 id="ablauf-titel" className="sr-only">So läuft die Challenge</h2>
          <ol className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-3">
            {ABLAUF.map((s, i) => (
              <li key={s} style={{ ['--i' as string]: i }} className={`cc-stufe flex items-start gap-4 bg-white px-5 py-5 text-midnight-blue ${KACHEL}`}>
                <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-md font-montserrat text-sm font-black text-midnight-blue ${GOLD}`}>{i + 1}</span>
                <span className="font-inter text-[15px] leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
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
            <span className="mt-1 block underline decoration-[#D4AF37] decoration-[4px] underline-offset-[6px]">jeden Tag fünf Minuten für deine Wirkung.</span>
          </h2>
          <p className="mt-4 max-w-3xl font-inter text-lg leading-relaxed text-midnight-blue">
            Warum hören Menschen dir gerne zu? „Ich mag meine Stimme nicht." Story, Elevator Pitch, Keynote, Miteinander, jeden Tag telefonieren, Kaltakquise, Kundengewinnung – all das und noch viel mehr gehört dazu.
          </p>
          <div className={`mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-md px-5 py-2.5 font-montserrat text-[13px] font-extrabold uppercase tracking-[0.12em] text-midnight-blue ${GOLD}`}>
            <span>Gruppentreffen live im Zoom · Montag, 26. Oktober 2026 · 19:00 Uhr</span>
            <span>Abschlusstreffen · Montag, 2. November 2026 · 19:00 Uhr</span>
          </div>

          <details className={`group mt-8 text-midnight-blue ${GOLD} ${KACHEL} border-transparent shadow-[0_18px_40px_-18px_rgba(212,175,55,0.7)]`}>
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
          <details className={`group mt-3 text-midnight-blue ${GOLD} ${KACHEL} border-transparent shadow-[0_18px_40px_-18px_rgba(212,175,55,0.7)]`}>
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

          <div className="mt-3 grid gap-5 md:grid-cols-[34px_minmax(0,1fr)]">
          <Schiene />
          <ol ref={listeRef} className="grid list-none gap-3 p-0">
            {TAGE.map((t, i) => {
              const letzter = i === TAGE.length - 1;
              return (
                <li key={t.titel} style={{ ['--i' as string]: i }} className="cc-stufe">
                  {!frei[i] ? (
                    <div className={`flex items-center gap-4 bg-white/70 px-4 py-3 text-midnight-blue sm:px-6 ${KACHEL} border-[#D4AF37]/35`}>
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
                    <div className="border-t border-[#D4AF37]/40 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
                      <h3 className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">{t.titel}</h3>
                      <p className="mt-2 font-inter text-[15px] leading-relaxed">
                        <b className="font-montserrat font-extrabold">Deine Aufgabe: </b>
                        {t.aufgabe}
                      </p>
                      {t.satz && (
                        <blockquote className="mt-3 border-l-4 border-[#D4AF37] bg-pearl-white px-5 py-3 font-cormorant text-xl italic leading-snug text-midnight-blue sm:text-2xl">
                          „{t.satz}"
                        </blockquote>
                      )}
                      <p className="mt-3 font-montserrat text-[11px] font-extrabold uppercase tracking-[0.14em] text-midnight-blue/80">{t.schrittTitel}</p>
                      <ul className="mt-1.5 grid list-none gap-1.5 p-0">
                        {t.schritte.map((s) => (
                          <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-normal">
                            <Haken />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                      {t.danach && <p className="mt-4 font-montserrat text-base font-bold">{t.danach}</p>}
                    </div>
                  </details>
                  )}
                  {i === 0 && <ChallengeAnmeldung start={startKurz} />}
                </li>
              );
            })}
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
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-7 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-4">
                <span className={`rounded-md px-2.5 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-midnight-blue ${GOLD}`}>Lernbox</span>
                <span className="font-montserrat text-xl font-extrabold leading-tight sm:text-2xl">Sieben Fragen. Sieben Antworten.</span>
              </span>
              <span className="flex items-center gap-2 font-montserrat text-sm font-bold underline decoration-[#D4AF37] underline-offset-4">
                <span className="group-open:hidden">Aufklappen</span>
                <span className="hidden group-open:inline">Zuklappen</span>
                <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">▾</span>
              </span>
            </summary>
            <ol className="grid list-none gap-2.5 border-t border-[#D4AF37]/40 px-5 pb-5 pt-4 sm:px-7 sm:pb-6">
              {LERNBOX.map((f, i) => {
                const a = antworten[i];
                const richtig = a !== null && a === f.ja;
                return (
                  <li key={f.frage} className="rounded-[10px] border border-[#D4AF37]/35 bg-pearl-white px-4 py-3.5">
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
            <p className="border-t border-[#D4AF37]/40 px-5 py-4 font-montserrat text-base font-bold sm:px-7" aria-live="polite">
              {nBeantwortet === 0 ? 'Fang einfach an – es gibt kein Falsch, nur ein Vorher und ein Nachher.' : `${nRichtig} von ${nBeantwortet} richtig.${nBeantwortet === LERNBOX.length ? ' Und alles, was du dafür brauchst, ist schon in dir.' : ''}`}
            </p>
          </details>
          <div className={`mt-4 rounded-[10px] px-5 py-5 text-midnight-blue sm:px-7 ${GOLD}`}>
            <p className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em]">Warum deine Einzigartigkeit Gold wert ist</p>
            <p className="mt-2 font-inter text-[15px] leading-relaxed">Stell dir vor: „Alle sind gleich perfekt." – und da bist DU. Die 7 A's der modernen Vermarktung, nach Karsten Brocke:</p>
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
      <Abschnitt className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="ki-und-du" welle>
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Dein KI-Agent ist effizient. Und du?" />
          <h2 id="ki-und-du" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Warum Menschen so gern mit der KI reden. Der Mensch ist das Unikat, die KI der Beschleuniger – wir nutzen beides.
            <span className="gold-text-animated mt-1 block">Lass dich überraschen.</span>
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className={`bg-[#13233F] p-6 sm:p-8 ${KACHEL}`}>
              <h3 className="font-montserrat text-xs font-extrabold uppercase tracking-[0.2em] text-[#EBD197]">Warum die KI so bequem ist</h3>
              <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
                {KI_GRUENDE.map((g, i) => (
                  <li key={g.titel} style={{ ['--i' as string]: i }} className="cc-stufe flex items-start gap-3">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-md border border-[#D4AF37]/50 bg-[#0A1628] text-[#EBD197]"><g.Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
                    <span className="min-w-0">
                      <b className="block font-montserrat text-[14px] font-extrabold leading-tight text-white">{g.titel}</b>
                      <span className="font-inter text-[13.5px] leading-snug text-pearl-white/80">{g.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-inter text-[15px] leading-relaxed text-pearl-white/85">
                Und trotzdem: Keine Geschichte, kein Ego, keine Verletzlichkeit – genau deshalb erinnert sich niemand an einen Avatar.
              </p>
            </div>
            <div className={`bg-pearl-white p-6 text-midnight-blue sm:p-8 ${KACHEL} border-[#D4AF37]`}>
              <h3 className="font-montserrat text-xl font-black leading-tight sm:text-2xl">
                Der Mensch ist das Unikat. Die KI der Beschleuniger – <span className="underline decoration-[#D4AF37] decoration-[3px] underline-offset-4">wenn wir Menschlichkeit zeigen.</span>
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

      {/* Selbst-Check */}
      <Abschnitt className="bg-white py-16 sm:py-24" label="selbstcheck">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Selbst-Check" hell />
              <h2 id="selbstcheck" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                So bleibst du unverwechselbar – auch im Zeitalter von KI.
              </h2>
              <p className="mt-4 font-inter text-lg text-midnight-blue">Sieben Fragen. Ehrlich beantwortet, sagen sie dir, wo du stehst.</p>
            </div>
            <Kopfbild datei="gehirn" alt="Claudia Conen mit einem Gehirnmodell in der Hand" />
          </div>
          <ul className="mt-7 grid list-none gap-2.5 p-0">
            {FRAGEN.map((f, i) => (
              <li key={f.frage}>
                <label className={`grid cursor-pointer grid-cols-[auto_1fr] items-start gap-4 bg-pearl-white px-4 py-4 text-midnight-blue ${KACHEL}`}>
                  <input type="checkbox" className="mt-0.5 h-5 w-5 accent-[#D4AF37]" checked={fragen[i]} onChange={() => setFragen((a) => a.map((v, j) => (j === i ? !v : v)))} />
                  <span>
                    <b className="block font-montserrat font-bold">{f.frage}</b>
                    <span className="font-inter text-[15px]">{f.text}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-montserrat text-lg font-extrabold text-midnight-blue" aria-live="polite">
            {nFragen === 0 && 'Jeden Tag prasseln Eindrücke auf uns ein wie Regentropfen. Nur wenige bleiben. Die Frage ist: Bist du einer davon?'}
            {nFragen === 7 && 'Sieben von sieben. Dann brauchst du kein Programm – dann brauchst du eine Bühne. Melde dich trotzdem, ich glaube dir erst, wenn ich dich gehört habe.'}
            {nFragen > 0 && nFragen < 7 && `${nFragen} von 7. ${nFragen < 4 ? 'Da ist Luft – und genau dafür sind die sieben Schritte da.' : 'Gute Basis. Die fehlenden Punkte sind die, die den Unterschied machen.'}`}
          </p>
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
          <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {WERKZEUG.map((w, i) => (
              <article key={w.titel} style={{ ['--i' as string]: i }} className="cc-stufe hero-glass-card group relative rounded-xl p-3.5">
                <div className="flex items-start gap-3">
                  <img src={`/icons/${w.icon}.webp`} alt="" width={256} height={256} loading="lazy" decoding="async" className="h-11 w-11 flex-shrink-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[0.8rem] font-semibold leading-snug text-pearl-white">{w.titel}</h3>
                    <p className="mt-0.5 text-[0.7rem] leading-snug text-pearl-white/60">{w.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-14">
            <button
              type="button"
              onClick={() => setBuchOffen(true)}
              aria-label="Workbook öffnen und blättern"
              className={`group relative m-0 block w-full max-w-[520px] -rotate-[1.5deg] overflow-hidden bg-white p-0 text-left shadow-[0_30px_60px_-24px_rgba(10,22,40,0.55)] ${KACHEL}`}
            >
              <img src="/unverwechselbar/workbook/seite-01.webp" alt="Deckblatt des Workbooks Entdecke deine Stimmwirkung – Brainself, Buchauszug von Claudia Conen" width={900} height={1273} loading="lazy" decoding="async" className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]" />
              <span className="absolute inset-x-0 bottom-0 bg-midnight-blue/80 px-4 py-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.16em] text-[#EBD197]">
                Antippen und blättern →
              </span>
            </button>
            <div>
              <Kicker text="Zum Mitnehmen" hell />
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase text-midnight-blue sm:text-3xl">Workbook „Entdecke deine Stimmwirkung"</h3>
              <p className="mt-3 font-montserrat text-base font-bold text-midnight-blue">
                Buchauszug aus dem <em>Brainself</em>-Buch – gemeinsam veröffentlicht mit Karsten Brocke und weiteren Experten.
              </p>
              <p className="mt-3 font-inter leading-relaxed text-midnight-blue">
                Als Workbook zum Ausfüllen: deine akustische Visitenkarte, Übungen für Stimme und Wirkung, Platz für deine eigenen Sätze. 41 Seiten zum Blättern – oder als PDF.
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

      {/* Geschenk, Rederaum, Online-Buehne - Claudia, 22.09.2026 10:59-11:00 UTC: "Mein Geschenk fuer deine
          Wirkung und der Schritt danach: 1:1-Gespraech bei einem Kaffee ... Rederaum, das heisst bei mir immer
          Rederaum"; "Willst du sofort eine Online-Buehne nutzen ... dann folge dem Link". */}
      <Abschnitt id="geschenk" className="bg-pearl-white py-16 sm:py-24" label="angebot-titel">
        <div className="mx-auto max-w-6xl px-6">
          <div className={KOPF}>
            <div>
              <Kicker text="Drei Wege. Ein Anfang." hell />
              <h2 id="angebot-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Mein Geschenk für deine Wirkung – und der Schritt danach.
              </h2>
            </div>
            <Kopfbild datei="am-telefon" alt="Claudia Conen lächelt mit dem Telefon in der Hand" quer />
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <div className={`flex flex-col bg-white p-7 text-midnight-blue ${KACHEL} border-[#D4AF37]`}>
              <span className="self-start rounded-full bg-midnight-blue px-3 py-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#EBD197]">Geschenk · kostenlos</span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase">Der Wirkungs-Check</h3>
              <p className="mt-3 font-montserrat text-4xl font-black">0 €</p>
              <p className="mt-4 font-inter leading-relaxed">
                20 Minuten am Telefon oder per Zoom. Du sprichst eine Minute über dein Thema – so, wie du es im Alltag tust. Dann hörst du von mir drei Dinge:
              </p>
              <ul className="mt-4 grid list-none gap-2.5 p-0 font-inter">
                {['Was von dir hängen bleibt.', 'Was verpufft – und warum.', 'Was du morgen anders machst.'].map((z) => (
                  <li key={z} className="flex gap-3"><Haken />{z}</li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <Link to="/buchen/erstgespraech" className="inline-flex items-center rounded-full bg-midnight-blue px-6 py-3.5 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
                  Termin für den Wirkungs-Check
                </Link>
              </div>
            </div>
            <div className={`flex flex-col bg-midnight-blue p-7 text-pearl-white ${KACHEL} border-[#D4AF37]`}>
              <span className={`self-start rounded-full px-3 py-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-midnight-blue ${GOLD}`}>Der Schritt danach · 1:1</span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase text-white">Ein Kaffee. Ein Rederaum.</h3>
              <p className="mt-4 font-inter leading-relaxed text-pearl-white/90">
                Möchtest du weitergehen – deine Performance, dein Auftreten, deine Selbstsicherheit, dein Elevator-Story-Training, deine Keynote-Performance ausarbeiten? Dann bin ich da für dich.
              </p>
              <p className="mt-3 font-inter leading-relaxed text-pearl-white/90">
                Buch dir in meinem Kalender einen Rederaum: gemütlich, bei einem Kaffee, nur wir zwei. Wir schauen, wo du stehst, was du erreichen willst – und wie wir miteinander arbeiten können.
              </p>
              <div className="mt-auto pt-7">
                <Link to="/buchen/erstgespraech" className={`inline-flex items-center rounded-full px-6 py-3.5 font-montserrat text-sm font-bold text-midnight-blue transition-transform hover:-translate-y-px ${GOLD}`}>
                  Rederaum buchen
                </Link>
              </div>
            </div>
            <div className={`flex flex-col p-7 text-midnight-blue ${GOLD} ${KACHEL} border-transparent`}>
              <span className="self-start rounded-full bg-midnight-blue px-3 py-1.5 font-montserrat text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#EBD197]">Online-Bühne · sofort</span>
              <h3 className="mt-4 font-montserrat text-2xl font-extrabold uppercase">Das Netzwerk der Unverwechselbaren</h3>
              <p className="mt-4 font-inter leading-relaxed">
                Willst du sofort eine Online-Bühne nutzen? Im Netzwerk Mittelstand – deiner Community – stellst du dich, deine Botschaft und deine Termine vor Menschen, die sich gegenseitig empfehlen.
              </p>
              <div className="mt-auto pt-7">
                <a href="#community" className="inline-flex items-center rounded-full bg-midnight-blue px-6 py-3.5 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
                  Zum Netzwerk
                </a>
              </div>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Fuer wen - und fuer wen nicht (Claudia, 22.09.2026: "fuer wen ist das? Und fuer wen ist das nicht?") */}
      <Abschnitt id="fuer-wen" className="bg-[#0A1628] py-14 text-pearl-white sm:py-20" label="fuer-wen-titel">
        <div className="mx-auto max-w-6xl px-6">
          <Kicker text="Für wen das ist" />
          <h2 id="fuer-wen-titel" className="mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">
            Sieben Tage sind kurz. Für die Richtigen reichen sie.
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[12px] border border-[#D4AF37]/40 bg-[#D4AF37]/30 sm:grid-cols-2">
            <div className="bg-[#0F1F3A] p-6 sm:p-7">
              <h3 className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#EBD197]">Für dich, wenn du</h3>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {FUER.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed text-white"><Haken /><span>{s}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0F1F3A] p-6 sm:p-7">
              <h3 className="font-montserrat text-[11px] font-extrabold uppercase tracking-[0.2em] text-pearl-white/70">Nicht für dich, wenn du</h3>
              <ul className="mt-4 grid list-none gap-2.5 p-0">
                {NICHT_FUER.map((s) => (
                  <li key={s} className="flex items-start gap-3 font-inter text-[15px] leading-relaxed text-pearl-white/80"><span aria-hidden="true" className="mt-0.5 font-montserrat font-black text-pearl-white/40">✕</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Abschnitt>


      {/* Warum ich */}
      <Abschnitt className="py-16 text-pearl-white sm:py-24" style={DUNKEL} label="warum" welle>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-14">
          <div>
            <Kicker text="Warum ich" />
            <h2 id="warum" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-4xl">Menschen prägen Menschen.</h2>
            <p className="mt-7 border-l-4 border-[#D4AF37] pl-5 font-cormorant text-3xl italic leading-snug text-[#F7E7CE] sm:text-4xl">
              Ich höre, was andere überhören. Und mache daraus deine Wirkung.
            </p>
          </div>
          <div>
            <ul className="grid list-none gap-3 p-0 font-inter text-pearl-white/90">
              {[
                'Claudia Conen ist Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung.',
                'Sie trainiert Rhetorik, Storytelling, Präsentation und den Auftritt vor der Kamera – seit 37 Jahren.',
                'Ihr Schwerpunkt ist die hörbare Persönlichkeit: das Zusammenspiel von Worten, Stimme und Haltung.',
                'Bekannt als „Die Umsatzstimme" – zu hören unter anderem bei Sat.1 und RTL, gefragt auf Bühnen und in Unternehmen.',
              ].map((z) => (
                <li key={z} className="flex gap-3"><Haken />{z}</li>
              ))}
            </ul>
            <p className="mt-5 font-inter text-[15px] text-pearl-white/90">
              Warum ich weiß, dass Menschen sich für immer im Gehirn verankern können, erzähle ich auf{' '}
              <Link to="/ueber-mich" className="underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:text-[#EBD197]">„Über mich"</Link>.
            </p>
          </div>
        </div>
      </Abschnitt>

      {/* Netzwerk Mittelstand - deine Community. Claudia, 22.09.2026 11:29 UTC: "nicht so yellow gelb beige",
          "gar nicht viel drauf": Mitentdecker unter den ersten 27, Termin des ersten Zoom-Calls (von Gabis Seite
          community.claudiaconen.com/netzwerkwebinar, 22.09.2026: Di 3.11.2026, 18:18 Uhr). Gabi steht NUR hier. */}
      <Abschnitt id="community" className="bg-pearl-white py-16 sm:py-24" label="community-titel">
        <div className="mx-auto max-w-6xl px-6">
          {/* 8-Sekunden-Clip (Veo 3.1 ueber Claudias Google-Schluessel, ihr Ja 22.09.2026 11:40 UTC): Mikrofon,
              goldene Stimmwelle, die Silhouetten zu einem Netzwerk verbindet. Stumm, Schleife, 2,4 MB, Standbild als Poster.
              Original: projects/claudiaconen/video/netzwerk-stimme-veo31-720p.mp4 */}
          <div className={`overflow-hidden bg-[#0A1628] ${KACHEL} border-[#D4AF37] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.5)]`}>
            <video className="block aspect-video h-auto w-full" autoPlay muted loop playsInline preload="metadata" poster="/challenge/netzwerk-poster.webp" aria-label="Eine goldene Stimmwelle geht von einem Mikrofon aus und verbindet Menschen zu einem Netzwerk">
              <source src="/challenge/netzwerk.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={`mt-4 grid items-center gap-8 bg-white p-7 text-midnight-blue sm:p-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] ${KACHEL} border-[#D4AF37] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.5)]`}>
            <div>
              <Kicker text="Die Unverwechselbaren · nach der Challenge" hell />
              <h2 id="community-titel" className="mt-4 font-montserrat text-3xl font-extrabold leading-tight text-midnight-blue sm:text-4xl">
                Netzwerk Mittelstand
                <span className="mt-2 block font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#B8860B]">deine Community</span>
              </h2>
              <p className="mt-5 font-inter text-lg leading-relaxed text-midnight-blue">
                Willst du Mitentdecker sein – einer der ersten 27 – in einem Netzwerk, in dem deine Produkte, deine Persönlichkeit und deine Termine eine Bühne haben? Menschen, die sich gegenseitig empfehlen, statt sich über den Preis zu vergleichen.
              </p>
              <ul className="mt-5 grid list-none gap-2 p-0 font-inter text-[15px] text-midnight-blue sm:grid-cols-2">
                {[
                  'Deine Produkte, Botschaften und Termine einstellen',
                  'Kurse anbieten, Buchprojekt, Adventskalender',
                  'Jeden Monat live im Zoom, einmal im Jahr live vor Ort',
                  'Tipps zu Performance und Wirkung – im Austausch',
                ].map((z) => (
                  <li key={z} className="flex gap-3"><Haken />{z}</li>
                ))}
              </ul>
              <p className={`mt-6 inline-block rounded-md px-4 py-3 font-montserrat text-sm font-extrabold uppercase tracking-[0.06em] text-midnight-blue ${GOLD}`}>
                Erstes Treffen der 27: Dienstag, 3. November 2026, 18:18 Uhr – online. Trag dir den Termin ein.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://community.claudiaconen.com/netzwerkwebinar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-pearl-white transition-colors hover:bg-royal-navy">
                  Einer der ersten 27 werden
                </a>
                <a href="https://community.claudiaconen.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border-2 border-midnight-blue px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue transition-colors hover:bg-midnight-blue hover:text-pearl-white">
                  Zur Community
                </a>
              </div>
            </div>
            <figure className={`relative m-0 aspect-[3/2] w-full max-w-[380px] justify-self-center overflow-hidden ${KACHEL}`}>
              <img src="/unverwechselbar/gabi-und-claudia.webp" alt="Claudia Conen und Gabi Lindemann lachen zusammen" width={900} height={600} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-midnight-blue/75 px-3 py-2 font-montserrat text-[11px] font-bold text-[#EBD197]">
                Gabi Lindemann und Claudia Conen – zusammen zuständig für die Community
              </figcaption>
            </figure>
          </div>
        </div>
      </Abschnitt>

      {/* Schluss - Claudias Satz (22.09.2026, 10:59 UTC), "gestalten" ersetzt: "Gestalten ist ein bloedes Wort". */}
      <Abschnitt className="py-16 text-center text-pearl-white sm:py-24" style={DUNKEL} label="schluss" welle>
        <div className="mx-auto max-w-4xl px-6">
          <p className="flex items-center justify-center gap-3 font-montserrat text-xs font-extrabold uppercase tracking-[0.22em] text-[#EBD197]">
            <span aria-hidden="true" className={`h-[3px] w-7 rounded-full ${GOLD}`} />
            Willst du dich speichern?
          </p>
          <h2 id="schluss" className="mt-5 font-montserrat text-3xl font-extrabold leading-tight sm:text-5xl">
            Willst du im KI-Zeitalter mit deiner Persönlichkeit punkten – statt vergleichbar über den Preis Kunden zu gewinnen? <span className="gold-text-animated">Dann schließ dich unserem Netzwerk an: die Unverwechselbaren, die Community für den Mittelstand.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#anmelden" className={`inline-flex items-center rounded-full px-7 py-4 font-montserrat text-sm font-bold text-midnight-blue ${GOLD}`}>
              Ich bin dabei – eintragen
            </a>
            <a href="https://community.claudiaconen.com/netzwerkwebinar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border-2 border-[#D4AF37] px-7 py-4 font-montserrat text-sm font-bold text-pearl-white hover:text-[#EBD197]">
              Zum Netzwerk der Unverwechselbaren
            </a>
          </div>
        </div>
      </Abschnitt>

      <Footer />
    </div>
  );
}
