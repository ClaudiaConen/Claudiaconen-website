import {
  BookOpen, Bot, Brain, Calendar, ChevronsRight, Compass, Ear, Edit3, Eye, Flag, Gift, Globe, GraduationCap, Handshake, Heart, Mail, MessageSquare, Mic, Monitor, Newspaper, Pause, Send, Share2, Shield, Sparkles, Star, Sun, Target, Users, Video, Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Die Menuestruktur.
 *
 * Stand 20.09.2026, nach Claudias Ansage: "lege das Menü oben neu an,
 * denke auch an die verschiedenen Zielkunden, quasi die Produkte - so
 * wie wir es auf der Startseite haben. Recherchiere, wie die Titel sein
 * sollen, dass sie am meisten ranken und gefunden werden."
 *
 * ZWEI REGELN, nach denen die obersten sechs Woerter gewaehlt sind:
 *
 * 1. Jedes ist ein Wort, nach dem Menschen SUCHEN. Recherchiert am
 *    20.09.2026 an den Seitentiteln, die den Markt besetzen:
 *    "Keynote Speaker buchen" ist die haeufigste Form auf der
 *    Firmenseite; bei den Ausbildungen heisst es durchgehend
 *    "Trauerredner Ausbildung", "Trauredner werden",
 *    "Ausbildung freier Redner". Deshalb "Keynotes", "Ausbildungen",
 *    "Rednerin buchen" - und nicht "Dienstleistungen", "Antworten",
 *    "Aktuelles", nach denen niemand sucht.
 *
 * 2. Die Gliederung folgt den ZIELGRUPPEN, wie die vier Tueren auf der
 *    Startseite: Unternehmen, Redner in spe, Anlaesse, Einzelarbeit.
 *    Wer sich dort wiedererkannt hat, findet im Menue dasselbe Wort.
 *
 * Sechs oberste Punkte. Die Faustregel aus der Navigationsliteratur ist
 * fuenf bis neun; Greator hat fuenf. Sechs lassen jede Zielgruppe ein
 * eigenes Wort haben, ohne dass man suchen muss.
 *
 * MERKE: "Trauredner" und "Hochzeitsredner" werden BEIDE gesucht,
 * "Trauredner" sogar oefter. Deshalb steht beides im Kacheltext.
 */

export interface TileItem {
  name: string;
  desc?: string;
  href: string;
  icon: LucideIcon;
  fullWidth?: boolean;
  external?: boolean;
}

export interface SidebarCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  panelTitle: string;
  panelSubtitle: string;
  columns?: 3;
  tiles: TileItem[];
  /** Die Zeile unten im Feld: "Alles dazu auf einer Seite". */
  uebersicht?: { name: string; href: string };
  /** Die hervorgehobene Kachel rechts im Feld - eine je Bereich.
   *  Zwei Empfehlungen nebeneinander sind keine Empfehlung.
   *  bildMotiv beschreibt, was fuer ein Foto dorthin gehoert,
   *  solange keines da ist. */
  hinweis?: {
    marke: string;
    titel: string;
    text: string;
    knopf: string;
    href: string;
    bildMotiv: string;
  };
}

export interface MegaMenuItem {
  label: string;
  id: string;
  categories: SidebarCategory[];
}

export const megaMenuItems: MegaMenuItem[] = [
  // ------------------------------------------------ 1. Unternehmen
  {
    label: 'Keynotes',
    id: 'keynotes',
    categories: [
      {
        id: 'keynote-buchen',
        label: 'Keynote Speaker buchen',
        icon: Star,
        panelTitle: 'Keynote Speaker buchen',
        panelSubtitle: 'Ein Vortrag, der nach dem Applaus noch etwas verändert',
        hinweis: {
          marke: 'Am häufigsten gefragt',
          titel: 'Sie haben KI eingeführt. Warum benutzt sie kaum jemand?',
          text: 'Ein Vortrag über das, worüber im Unternehmen niemand spricht — und was es kostet.',
          knopf: 'Zur Keynote',
          href: '/unternehmen-keynotes',
          bildMotiv: 'Claudia auf der Bühne, Publikum im Bild',
        },
        tiles: [
          { name: 'Keynote für Ihr Unternehmen', desc: 'Auch zum Thema Mensch und KI', href: '/unternehmen-keynotes', icon: Star },
          { name: 'Keynote & Bühnenperformance', desc: 'Positionierung, Präsenz, Stimmwirkung', href: '/keynote-und-buehnenperformance', icon: Flag },
          { name: 'Eventmoderation', desc: 'Durch den Tag führen, nicht nur ansagen', href: '/stimme-keynote', icon: Mic },
          { name: 'Interne Events', desc: 'Jahresauftakt, Kickoff, Jubiläum', href: '/unternehmen-events', icon: Calendar },
        ],
        uebersicht: { name: 'Alles für Unternehmen und Teams', href: '/unternehmen-keynotes' },
      },
      {
        id: 'teams',
        label: 'Für Teams & Führung',
        icon: Users,
        panelTitle: 'Für Teams & Führungskräfte',
        panelSubtitle: 'Wenn eingeführt wurde, was keiner benutzt — und keiner es sagt',
        tiles: [
          { name: 'Führung & Kommunikation', desc: 'Wie Führungskräfte gehört werden', href: '/unternehmen-leadership', icon: Users },
          { name: 'Verkauf & Auftreten', desc: 'Emotional Selling im Vertrieb', href: '/unternehmen-selling', icon: Handshake },
          { name: 'Marke & Positionierung', desc: 'Erkennbar bleiben im KI-Zeitalter', href: '/marke-und-positionierung', icon: Target },
        ],
      },
    ],
  },

  // ------------------------------------------------ 2. Redner werden
  {
    label: 'Ausbildungen',
    id: 'ausbildungen',
    categories: [
      {
        id: 'redner-werden',
        label: 'Redner werden',
        icon: GraduationCap,
        panelTitle: 'Redner werden — vier Wege',
        panelSubtitle: 'Sie sprechen ab dem ersten Tag selbst. Nicht zuhören, sprechen.',
        hinweis: {
          marke: 'Wenn Sie unsicher sind',
          titel: 'Welche der vier passt zu Ihnen?',
          text: 'Die Übersicht stellt sie nebeneinander — mit dem, was jede verlangt, und für wen sie nicht ist.',
          knopf: 'Alle vier vergleichen',
          href: '/redner-ausbildungen',
          bildMotiv: 'Teilnehmerin spricht vor kleiner Gruppe',
        },
        tiles: [
          { name: 'Speaker werden', desc: 'Thema finden, Vortrag bauen, Honorar verlangen', href: '/speaker-ausbildung', icon: Star },
          { name: 'Freier Redner werden', desc: 'Der Beruf mit allen Anlässen', href: '/freie-redner-ausbildung', icon: MessageSquare },
          { name: 'Trauredner werden', desc: 'Hochzeitsredner für die freie Trauung', href: '/hochzeitsredner-ausbildung', icon: Heart },
          { name: 'Trauerredner werden', desc: 'Auch der Umgang mit dem, was bleibt', href: '/trauerredner-ausbildung', icon: Shield },
        ],
        uebersicht: { name: 'Alle vier Ausbildungen im Vergleich', href: '/redner-ausbildungen' },
      },
      {
        id: 'kurse',
        label: 'Einzelne Kurse',
        icon: ChevronsRight,
        panelTitle: 'Einzelne Kurse',
        panelSubtitle: 'Wenn keine ganze Ausbildung nötig ist, sondern ein Baustein',
        tiles: [
          { name: 'Storytelling-Kurs', desc: 'Aus Erlebtem wird eine Geschichte', href: '/storytelling-kurs', icon: Edit3 },
          { name: 'Elevator-Pitch-Kurs', desc: 'Ein Satz, der bei Ihnen bleibt', href: '/elevator-pitch-kurs', icon: ChevronsRight },
          { name: 'Bühnenwirkung & Auftritt', desc: 'Stand, Blick, Pausen', href: '/speaker-buehne', icon: Flag },
          { name: 'Positionierung', desc: 'Wofür Sie stehen, in einem Satz', href: '/speaker-positionierung', icon: Target },
          { name: 'Reden auf Social Media', desc: 'Vor der Kamera sprechen', href: '/speaker-social', icon: Share2 },
        ],
        uebersicht: { name: 'Speaker & freie Redner — Übersicht', href: '/redner-ausbildungen' },
      },
    ],
  },

  // ------------------------------------------------ 3. Anlaesse
  {
    label: 'Rednerin buchen',
    id: 'rednerin',
    categories: [
      {
        id: 'anlaesse',
        label: 'Für Ihren Anlass',
        icon: MessageSquare,
        panelTitle: 'Claudia Conen als Rednerin',
        panelSubtitle: 'Sie lernt die Menschen kennen, bevor sie über sie spricht',
        hinweis: {
          marke: 'Vorher wissen',
          titel: 'Was eine gute Rede von einer Vorlage unterscheidet',
          text: 'Claudia lernt die Menschen kennen, bevor sie über sie spricht. Das ist der ganze Unterschied.',
          knopf: 'Freie Rednerin',
          href: '/freie-rednerin',
          bildMotiv: 'Claudia im Gespräch, nah, warmes Licht',
        },
        tiles: [
          { name: 'Trauerrede', desc: 'Ein Leben in Worten, keine Vorlage', href: '/trauerrede', icon: Shield },
          { name: 'Freie Trauung', desc: 'Die Zeremonie gehört dem Paar', href: '/freie-trauung', icon: Heart },
          { name: 'Moderation', desc: 'Bühne und Ablauf in einer Hand', href: '/stimme-keynote', icon: Flag },
          { name: 'Sprecherin für Voice Over', desc: 'Stimme für Aufnahmen und Podcast', href: '/stimme-voiceover', icon: Mic },
        ],
        uebersicht: { name: 'Freie Rednerin — alle Anlässe', href: '/freie-rednerin' },
      },
    ],
  },

  // ------------------------------------------------ 4. Einzelarbeit
  {
    label: 'Mentoring & KI',
    id: 'mentoring',
    categories: [
      {
        id: 'einzeln',
        label: 'Einzelarbeit',
        icon: Compass,
        panelTitle: 'Zu zweit an Ihrer Sache',
        panelSubtitle: 'Wenn es nicht um ein Format geht, sondern um Sie',
        hinweis: {
          marke: 'Zu zweit',
          titel: 'Neunzig Minuten, ein Anliegen',
          text: 'Wenn es nicht um ein Format geht, sondern um den einen Auftritt, der ansteht.',
          knopf: 'Gold-Training',
          href: '/mentoring-gold',
          bildMotiv: 'Zwei Personen im Gespräch, Seitenlicht',
        },
        tiles: [
          { name: '1:1 Mentoring', desc: 'Über mehrere Monate begleitet', href: '/1-zu-1-mentoring', icon: Compass },
          { name: 'Gold-Training (90 Minuten)', desc: 'Eine Sitzung, ein Anliegen', href: '/mentoring-gold', icon: Star },
          { name: 'Marke & eigene Sprache', desc: 'Was Sie sagen, wenn niemand vorgibt wie', href: '/mentoring-transformation', icon: Sun },
          { name: 'Online, wo immer Sie sind', desc: 'Dieselbe Arbeit über Bildschirm', href: '/mentoring-online', icon: Globe },
        ],
      },
      {
        id: 'ki',
        label: 'KI & Mensch',
        icon: Brain,
        panelTitle: 'KI & Mensch',
        panelSubtitle: 'Die Technik bedienen, ohne die eigene Sprache zu verlieren',
        columns: 3,
        tiles: [
          { name: 'KI-Einsteiger-Coaching', href: '/ki-einsteiger-coaching', icon: Compass },
          { name: 'KI-Manager Ausbildung', href: '/ki-manager-ausbildung', icon: Monitor },
          { name: 'KI 1:1', href: '/ki-1zu1', icon: Users },
          { name: 'HeyGen Kurs', href: '/ki-heygen-kurs', icon: Video },
          { name: 'KI-Abkürzungen', href: '/1zu1-abkuerzung-dezember', icon: ChevronsRight },
          { name: 'Was KI nicht kann', href: '/blog-ki', icon: Brain },
        ],
      },
    ],
  },

  // ------------------------------------------------ 5. Wissen
  {
    label: 'Wissen',
    id: 'wissen',
    categories: [
      {
        id: 'fragen-reden',
        label: 'Fragen zum Reden',
        icon: Mic,
        panelTitle: 'Fragen zum Reden',
        panelSubtitle: 'Ausführlich beantwortet — kostenlos, ohne Anmeldung',
        hinweis: {
          marke: 'Kostenlos',
          titel: 'Neun Fragen, ausführlich beantwortet',
          text: 'Keine Anmeldung, kein Newsletter. Lesen, mitnehmen, ausprobieren.',
          knopf: 'Zur Wissensbibliothek',
          href: '/wissensbibliothek',
          bildMotiv: 'Schreibtisch mit Notizen, Detailaufnahme',
        },
        columns: 3,
        tiles: [
          { name: 'Wie baue ich eine Keynote auf?', href: '/wissen/keynote-aufbauen', icon: Flag },
          { name: 'Wie finde ich mein Thema?', href: '/wissen/thema-finden-speaker', icon: Target },
          { name: 'Was hilft gegen Lampenfieber?', href: '/wissen/lampenfieber', icon: Sparkles },
          { name: 'Wie mache ich richtig Pausen?', href: '/wissen/sprechpausen', icon: Pause },
          { name: 'Wie trainiere ich meine Stimme?', href: '/wissen/stimme-trainieren', icon: Mic },
          { name: 'Kann man Charisma lernen?', href: '/wissen/charisma-lernen', icon: Star },
        ],
        uebersicht: { name: 'Alle Artikel in der Wissensbibliothek', href: '/wissensbibliothek' },
      },
      {
        id: 'fragen-buchen',
        label: 'Fragen zum Buchen',
        icon: Star,
        panelTitle: 'Fragen zum Buchen',
        panelSubtitle: 'Was Veranstalter vorher wissen wollen',
        tiles: [
          { name: 'Was kostet ein Keynote Speaker?', desc: 'Preisspannen im deutschen Markt', href: '/wissen/was-kostet-ein-keynote-speaker', icon: Star },
          { name: 'Wie finde ich den passenden Speaker?', desc: 'Woran man vorher erkennt, ob es passt', href: '/wissen/keynote-speaker-finden', icon: Compass },
          { name: 'Das Vier-Ohren-Modell', desc: 'Warum dasselbe anders ankommt', href: '/wissen/vier-ohren-modell', icon: Ear },
        ],
      },
      {
        id: 'kostenlos',
        label: 'Kostenlos mitnehmen',
        icon: Gift,
        panelTitle: 'Kostenlos mitnehmen',
        panelSubtitle: 'Ohne Anmeldung, sofort nutzbar',
        columns: 3,
        tiles: [
          { name: 'Wissensbibliothek A–Z', href: '/wissensbibliothek', icon: BookOpen },
          { name: 'Wirkungskraft-Werkzeuge', href: '/generatoren', icon: Wrench },
          { name: 'Gratis-Webinar', href: '/wissen-webinare', icon: Monitor },
          { name: 'Community', href: '/wissen-community', icon: Users },
          { name: 'Telegram-Audioimpulse', href: '/wissen-telegram', icon: Send },
          { name: 'Adventskalender', href: '/adventskalender', icon: Gift },
        ],
        uebersicht: { name: 'Wissen to go — alles im Überblick', href: '/wissen-to-go' },
      },
      {
        id: 'termine',
        label: 'Termine & Blog',
        icon: Calendar,
        panelTitle: 'Termine & Blog',
        panelSubtitle: 'Wo Claudia als Nächstes zu erleben ist',
        tiles: [
          { name: 'KI-Workshop „Die Unverwechselbaren"', desc: '2 Tage live · 3 Coaches', href: '/ki-workshop-unverwechselbar', icon: Sparkles, fullWidth: true },
          { name: 'Kommende Events', desc: 'Alle Termine auf einen Blick', href: '/events', icon: Calendar },
          { name: 'Blog', desc: 'Neues zuerst hier', href: '/blog', icon: Edit3 },
          { name: 'Newsletter', desc: 'Impulse ins Postfach', href: '/newsletter', icon: Mail },
        ],
      },
    ],
  },

  // ------------------------------------------------ 6. Die Person
  {
    label: 'Über Claudia',
    id: 'ueber-claudia',
    categories: [
      {
        id: 'person',
        label: 'Die Person',
        icon: Eye,
        panelTitle: 'Claudia Conen',
        panelSubtitle: 'Wer hier spricht — und warum',
        hinweis: {
          marke: 'Seit 37 Jahren',
          titel: 'Wer hier spricht',
          text: 'Der Weg, die Arbeitsweise, die Haltung — und was sie nicht verspricht.',
          knopf: 'Über Claudia',
          href: '/ueber-mich',
          bildMotiv: 'Porträt, ruhig, direkter Blick',
        },
        tiles: [
          { name: 'Über mich', desc: 'Weg, Arbeitsweise, Haltung', href: '/ueber-mich', icon: Eye },
          { name: 'Von Schatten zu Licht', desc: 'Das Buchprojekt', href: '/von-schatten-zu-licht', icon: Sun },
          { name: 'Presse & Interviews', desc: 'Claudia in Medien', href: '/blog', icon: Newspaper },
          { name: 'Kontakt', desc: 'Direkt schreiben', href: '/#contact', icon: MessageSquare },
        ],
      },
      {
        id: 'werkzeuge',
        label: 'Zum Ausprobieren',
        icon: Bot,
        panelTitle: 'Zum Ausprobieren',
        panelSubtitle: 'Was Claudia mit KI gebaut hat',
        tiles: [
          { name: 'ClaudiaAI', desc: 'Story-Coach, in Vorbereitung', href: '/claudia-ai', icon: Bot },
          { name: 'ChatGPT-Assistent', desc: 'Zum Ausprobieren', href: 'https://claudia-conen-gpt-sa-m812.bolt.host/', icon: Bot, external: true },
          { name: 'Webseite als Erlebnis', desc: 'Technik trifft Menschlichkeit', href: '/ki-webseite-erlebnis', icon: Globe },
        ],
      },
    ],
  },
];
