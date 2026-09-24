import {
  BookOpen, Bot, Brain, Calendar, ChevronsRight, Compass, Ear, Edit3, Eye, Flag, Gift, Globe, GraduationCap, Handshake, Heart, Mail, MessageSquare, Mic, Monitor, Newspaper, Pause, Send, Share2, Shield, Sparkles, Star, Sun, Target, Users, Wrench
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
   *  bildMotiv beschreibt, welches Foto dorthin gehoert; bild ist die Datei
   *  (public/menue/, 464x208, aus ihren vorhandenen Fotos geschnitten mit
   *  scratchpad/menuebilder.py). Claudia am 23.09.2026: "im Menue oben kommt
   *  rechts immer ein Bild ... da muessten die Bilder noch eingefuegt werden,
   *  weil ihr Mensch fehlt." */
  hinweis?: {
    marke: string;
    titel: string;
    text: string;
    knopf: string;
    href: string;
    bildMotiv: string;
    /** Datei in public/menue/ ohne Endung. Fehlt sie, bleibt der beschriebene Platzhalter. */
    bild?: string;
    bildAlt?: string;
  };
}

export interface MegaMenuItem {
  label: string;
  id: string;
  /** 3-D-Geschenk vor dem Wort; pulsiert beim Laden viermal (Claudia, 24.09.2026). */
  geschenk?: boolean;
  /** Goldener Punkt: es laeuft gerade etwas. Von Hand setzen und wieder entfernen. */
  punkt?: boolean;
  categories: SidebarCategory[];
}

/**
 * DIE GLIEDERUNG FOLGT DEM, WAS DIE SEITEN UEBER SICH SELBST SAGEN.
 *
 * Claudia am 20.09.2026: "die Sortierung ist nicht richtig. Da steht so
 * unter Unternehmen auf einmal Keynote Speaker, das passt nicht."
 *
 * Sie hatte recht, und der Grund war strukturell. Fast jede Seite
 * traegt ganz oben eine Zeile, die ihre Zielgruppe nennt:
 *   "Fuer Unternehmen"              -> unternehmen-*
 *   "Fuer Speaker & Selbststaendige" -> speaker-*
 *   "Die Stimme fuer Ihre Botschaft" -> stimme-*
 *   "Mentoring & Coaching"           -> mentoring-*
 * Das ist die Gliederung, die die Seite selbst behauptet. Stand eine
 * Seite im Menue woanders, klickte jemand auf "Keynotes" und landete
 * auf einer Seite, die "Fuer Speaker & Selbststaendige" ueber sich
 * schreibt. Genau das hat Claudia gesehen: /stimme-keynote stand unter
 * "Keynotes" UND unter "Rednerin buchen".
 *
 * Die Bereichs-Kennungen heissen deshalb wie die Selbstbezeichnungen.
 * scratchpad/menue_stimmig.py vergleicht beides und meldet jede
 * Abweichung - nach jeder Menueaenderung laufen lassen.
 *
 * KEIN ZIEL STEHT ZWEIMAL. Eine Ausnahme sind die Uebersichtszeilen
 * unten im Feld ("Alle vier im Vergleich"), die bewusst auf dieselbe
 * Seite fuehren wie eine Kachel - das ist ein Weg, keine Dublette.
 */
export const megaMenuItems: MegaMenuItem[] = [
  // ============================================ 1. Fuer Unternehmen
  // Ausschliesslich Seiten, die "Fuer Unternehmen" ueber sich schreiben.
  {
    label: 'Für Unternehmen',
    id: 'unternehmen',
    categories: [
      {
        id: 'keynotes',
        label: 'Keynotes & Vorträge',
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
          bild: 'keynote',
          bildAlt: 'Claudia Conen auf einer großen Bühne, hinter ihr die Leinwand',
        },
        tiles: [
          { name: 'Keynote für Ihr Unternehmen', desc: 'Auch zum Thema Mensch und KI', href: '/unternehmen-keynotes', icon: Star },
          { name: 'Führung & Kommunikation', desc: 'Wie Führungskräfte gehört werden', href: '/unternehmen-leadership', icon: Users },
          { name: 'Verkauf & Auftreten', desc: 'Emotional Selling im Vertrieb', href: '/unternehmen-selling', icon: Handshake },
          { name: 'Interne Events & Moderation', desc: 'Jahresauftakt, Kickoff, Jubiläum', href: '/unternehmen-events', icon: Calendar },
        ],
      },
    ],
  },

  // ============================================ 2. Redner werden
  // Ausschliesslich Seiten fuer Speaker und Selbststaendige.
  {
    label: 'Redner werden',
    id: 'redner-werden',
    categories: [
      {
        id: 'ausbildungen',
        label: 'Die vier Ausbildungen',
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
          bild: 'ausbildung',
          bildAlt: 'Claudia Conen im Workshop an der Moderationswand',
        },
        tiles: [
          { name: 'Speaker werden', desc: 'Thema finden, Vortrag bauen, Honorar verlangen', href: '/speaker-ausbildung', icon: Star },
          { name: 'Freier Redner werden', desc: 'Der Beruf mit allen Anlässen', href: '/freie-redner-ausbildung', icon: MessageSquare },
          { name: 'Trauredner werden', desc: 'Hochzeitsredner für die freie Trauung', href: '/hochzeitsredner-ausbildung', icon: Heart },
          { name: 'Trauerredner werden', desc: 'Auch der Umgang mit dem, was bleibt', href: '/trauerredner-ausbildung', icon: Shield },
        ],
        uebersicht: { name: 'Alle vier im Vergleich', href: '/redner-ausbildungen' },
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
          { name: 'Keynote & Bühnenperformance', desc: 'Das Gesamtpaket aus Coaching und Workshops', href: '/keynote-und-buehnenperformance', icon: Sparkles },
        ],
      },
    ],
  },

  // ============================================ 3. Rednerin buchen
  // Ausschliesslich Seiten, die "Die Stimme fuer Ihre Botschaft"
  // ueber sich schreiben - also Claudia selbst am Mikrofon.
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
          bild: 'rednerin',
          bildAlt: 'Claudia Conen im Gespräch am Telefon, warmes Licht',
        },
        tiles: [
          { name: 'Trauerrede', desc: 'Ein Leben in Worten, keine Vorlage', href: '/trauerrede', icon: Shield },
          { name: 'Freie Trauung', desc: 'Die Zeremonie gehört dem Paar', href: '/freie-trauung', icon: Heart },
          { name: 'Keynote & Eventmoderation', desc: 'Bühne und Ablauf in einer Hand', href: '/stimme-keynote', icon: Flag },
          { name: 'Voice-Over & Podcast', desc: 'Stimme für Aufnahmen', href: '/stimme-voiceover', icon: Mic },
        ],
        uebersicht: { name: 'Freie Rednerin — alle Anlässe', href: '/freie-rednerin' },
      },
    ],
  },

  // ============================================ 4. Mentoring
  // Ausschliesslich Seiten, die "Mentoring & Coaching" ueber sich
  // schreiben, plus das 1:1-Mentoring.
  {
    label: 'Mentoring',
    id: 'mentoring',
    categories: [
      {
        id: 'einzelarbeit',
        label: 'Zu zweit',
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
          bild: 'mentoring',
          bildAlt: 'Claudia Conen mit Laptop in einer Lounge',
        },
        tiles: [
          { name: '1:1 Mentoring', desc: 'Über mehrere Monate begleitet', href: '/1-zu-1-mentoring', icon: Compass },
          { name: 'Gold-Training (90 Minuten)', desc: 'Eine Sitzung, ein Anliegen', href: '/mentoring-gold', icon: Star },
          { name: 'Marke & eigene Sprache', desc: 'Was Sie sagen, wenn niemand vorgibt wie', href: '/mentoring-transformation', icon: Sun },
          { name: 'Wo immer Sie sind', desc: 'Dieselbe Arbeit über Bildschirm', href: '/mentoring-online', icon: Globe },
        ],
      },
    ],
  },

  // ============================================ 5. KI & Mensch
  {
    label: 'KI & Mensch',
    id: 'ki',
    categories: [
      {
        id: 'ki-angebote',
        label: 'Lernen & Begleitung',
        icon: Monitor,
        panelTitle: 'KI & Mensch',
        panelSubtitle: 'Die Technik bedienen, ohne die eigene Sprache zu verlieren',
        columns: 3,
        tiles: [
          { name: 'KI-Einsteiger-Coaching', href: '/ki-einsteiger-coaching', icon: Compass },
          { name: 'KI-Manager Ausbildung', href: '/ki-manager-ausbildung', icon: Monitor },
          { name: 'KI 1:1 für Einsteiger', href: '/ki-1zu1', icon: Users },
          { name: 'Marke im KI-Zeitalter', href: '/marke-und-positionierung', icon: Target },
        ],
      },
      {
        id: 'ki-lesen',
        label: 'Zum Lesen & Ausprobieren',
        icon: Brain,
        panelTitle: 'Zum Lesen und Ausprobieren',
        panelSubtitle: 'Was die Maschine übernimmt — und was sie nicht kann',
        tiles: [
          { name: 'Was KI nicht kann', desc: 'Und warum das Ihr Vorteil ist', href: '/blog-ki', icon: Brain },
          { name: 'Webseite als Erlebnis', desc: 'Technik trifft Menschlichkeit', href: '/ki-webseite-erlebnis', icon: Globe },
          { name: 'ClaudiaAI', desc: 'Story-Coach, in Vorbereitung', href: '/claudia-ai', icon: Bot },
          { name: 'ChatGPT-Assistent', desc: 'Zum Ausprobieren', href: 'https://claudia-conen-gpt-sa-m812.bolt.host/', icon: Bot, external: true },
        ],
      },
    ],
  },

  // ============================================ 6. Wissen
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
        columns: 3,
        hinweis: {
          marke: 'Kostenlos',
          titel: 'Neun Fragen, ausführlich beantwortet',
          text: 'Keine Anmeldung, kein Newsletter. Lesen, mitnehmen, ausprobieren.',
          knopf: 'Zur Wissensbibliothek',
          href: '/wissensbibliothek',
          bildMotiv: 'Schreibtisch mit Notizen, Detailaufnahme',
          bild: 'wissen',
          bildAlt: 'Claudia Conen am Fenster mit Laptop und aufgeschlagener Mappe',
        },
        tiles: [
          { name: 'Wie wird man Keynote Speaker?', href: '/wissen/keynote-speaker-werden', icon: Flag },
          { name: 'Wie baue ich eine Keynote auf?', href: '/wissen/keynote-aufbauen', icon: Flag },
          { name: 'Wie finde ich mein Thema?', href: '/wissen/thema-finden-speaker', icon: Target },
          { name: 'Was hilft gegen Lampenfieber?', href: '/wissen/lampenfieber', icon: Sparkles },
          { name: 'Wie mache ich richtig Pausen?', href: '/wissen/sprechpausen', icon: Pause },
          { name: 'Wie trainiere ich meine Stimme?', href: '/wissen/stimme-trainieren', icon: Mic },
          { name: 'Wie bekomme ich eine tiefere Stimme?', href: '/wissen/tiefere-stimme', icon: Mic },
          { name: 'Wie halte ich eine gute Rede?', href: '/wissen/gute-rede-halten', icon: Flag },
          { name: 'Kann man Charisma lernen?', href: '/wissen/charisma-lernen', icon: Star },
        ],
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
          { name: 'Wie schreibe ich eine Trauerrede?', desc: 'Aufbau, Anfang, Länge – und was nicht hinein muss', href: '/wissen/trauerrede-schreiben', icon: Ear },
          { name: 'Wie läuft eine freie Trauung ab?', desc: 'Ablauf, Dauer und die Sache mit dem Standesamt', href: '/wissen/freie-trauung-ablauf', icon: Heart },
          { name: 'Was ist ein Elevator Pitch?', desc: 'Aufbau, Länge und Beispiele im Vorher-Nachher', href: '/wissen/elevator-pitch', icon: ChevronsRight },
          { name: 'Was ist Storytelling?', desc: 'Warum eine Szene bleibt und eine Aufzählung nicht', href: '/wissen/storytelling', icon: BookOpen },
        ],
      },
    ],
  },

  // ============================================ 7. Nimm mit (24.09.2026)
  {
    label: 'Nimm mit',
    id: 'nimm-mit',
    geschenk: true,
    punkt: true,
    categories: [
      {
        id: 'mitmachen',
        label: 'Challenge & Adventskalender',
        icon: Gift,
        panelTitle: 'Zum Mitmachen',
        panelSubtitle: 'Kostenlos, mit festem Start',
        tiles: [
          { name: '7 Tage für deine Wirkungskraft', desc: 'Die Video-Challenge', href: '/challenge', icon: Sparkles, fullWidth: true },
          { name: 'Adventskalender 2026', desc: '24 Türchen, ab 1. Dezember', href: '/adventskalender', icon: Gift },
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

  // ============================================ 8. Ueber Claudia
  {
    label: 'Über Claudia',
    id: 'ueber',
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
          bild: 'ueber',
          bildAlt: 'Porträt von Claudia Conen, direkter Blick',
        },
        tiles: [
          { name: 'Über mich', desc: 'Weg, Arbeitsweise, Haltung', href: '/ueber-mich', icon: Eye },
          { name: 'Von Schatten zu Licht', desc: 'Das Buchprojekt', href: '/von-schatten-zu-licht', icon: Sun },
          { name: 'Presse & Interviews', desc: 'Claudia in Medien', href: '/buchprojekt', icon: Newspaper },
          { name: 'Kontakt', desc: 'Direkt schreiben', href: '/#contact', icon: MessageSquare },
        ],
      },
    ],
  },
];
