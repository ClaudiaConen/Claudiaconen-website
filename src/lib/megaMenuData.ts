import {
  Star, Users, Heart, Calendar, Target, Edit3, Flag, Share2, Mic,
  Globe, Compass, GraduationCap, MessageSquare,
  BookOpen, Wrench, Gift, Monitor, Send, Brain,
  ChevronsRight, Eye, Sun, Shield, Newspaper,
  Mail, Video, Activity, Building2, Bot, Sparkles, Pause, Ear
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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
  /** Die Zeile unten im Feld: "Alles dazu auf einer Seite". Claudia am
   *  19.09.2026: das Menue soll uebersichtlich bleiben, Einzelheiten
   *  gehoeren auf die Unterseite und nicht ins aufklappende Feld. */
  uebersicht?: { name: string; href: string };
}

export interface MegaMenuItem {
  label: string;
  id: string;
  categories: SidebarCategory[];
}

export const megaMenuItems: MegaMenuItem[] = [
  {
    label: 'Dienstleistungen',
    id: 'dienstleistungen',
    categories: [
      {
        id: 'unternehmen',
        label: 'Für Unternehmen',
        icon: Building2,
        panelTitle: 'Für Unternehmen',
        panelSubtitle: 'Vorträge und Trainings für Teams und Führungskräfte',
        tiles: [
          { name: 'Keynotes & Firmenvorträge', desc: 'Auch zum Thema Mensch und KI', href: '/unternehmen-keynotes', icon: Star },
          { name: 'Führung & Kommunikation', desc: 'Wie Führungskräfte gehört werden', href: '/unternehmen-leadership', icon: Users },
          { name: 'Verkauf & Auftreten', desc: 'Emotional Selling im Vertrieb', href: '/unternehmen-selling', icon: Heart },
          { name: 'Interne Events & Moderation', desc: 'Durch den Tag führen', href: '/unternehmen-events', icon: Calendar },
        ],
        uebersicht: { name: 'Alles für Unternehmen und Teams', href: '/unternehmen-keynotes' },
      },
      {
        id: 'rednerin',
        label: 'Claudia als Rednerin buchen',
        icon: MessageSquare,
        panelTitle: 'Claudia als Rednerin buchen',
        panelSubtitle: 'Wenn jemand sprechen soll, der die Menschen vorher kennenlernt',
        tiles: [
          { name: 'Trauerrede', desc: 'Ein Leben in Worten, nicht eine Vorlage', href: '/trauerrede', icon: Shield },
          { name: 'Freie Trauung', desc: 'Die Zeremonie gehört dem Paar', href: '/freie-trauung', icon: Heart },
          { name: 'Keynote & Eventmoderation', desc: 'Bühne und Ablauf in einer Hand', href: '/stimme-keynote', icon: Flag },
          { name: 'Sprecherin für Voice Over & Podcast', desc: 'Stimme für Aufnahmen', href: '/stimme-voiceover', icon: Mic },
        ],
        uebersicht: { name: 'Freie Rednerin — alle Anlässe auf einer Seite', href: '/freie-rednerin' },
      },
      {
        id: 'ausbildung',
        label: 'Redner-Ausbildungen',
        icon: GraduationCap,
        panelTitle: 'Redner-Ausbildungen',
        panelSubtitle: 'Vier Wege. Sie sprechen ab dem ersten Tag selbst.',
        tiles: [
          { name: 'Speaker werden', desc: 'Thema, Vortrag, Honorar', href: '/speaker-ausbildung', icon: Star },
          { name: 'Freier Redner werden', desc: 'Der Beruf mit allen Anlässen', href: '/freie-redner-ausbildung', icon: MessageSquare },
          { name: 'Hochzeitsredner werden', desc: 'Paargespräch, Zeremonie, Tag', href: '/hochzeitsredner-ausbildung', icon: Heart },
          { name: 'Trauerredner werden', desc: 'Auch der Umgang mit dem, was bleibt', href: '/trauerredner-ausbildung', icon: Shield },
        ],
        uebersicht: { name: 'Alle vier Ausbildungen im Vergleich', href: '/redner-ausbildungen' },
      },
      {
        id: 'speaker',
        label: 'Für Speaker & Selbständige',
        icon: Mic,
        panelTitle: 'Für Speaker & Selbständige',
        panelSubtitle: 'Einzelne Bausteine, wenn keine ganze Ausbildung nötig ist',
        tiles: [
          { name: 'Storytelling-Kurs', desc: 'Aus Erlebtem wird eine Geschichte', href: '/storytelling-kurs', icon: Edit3 },
          { name: 'Elevator-Pitch-Kurs', desc: 'Ein Satz, der bei Ihnen bleibt', href: '/elevator-pitch-kurs', icon: ChevronsRight },
          { name: 'Positionierung', desc: 'Wofür stehen Sie, in einem Satz', href: '/speaker-positionierung', icon: Target },
          { name: 'Bühnenwirkung & Auftritt', desc: 'Stand, Blick, Pausen', href: '/speaker-buehne', icon: Flag },
          { name: 'Reden auf Social Media', desc: 'Vor der Kamera sprechen', href: '/speaker-social', icon: Share2 },
        ],
        uebersicht: { name: 'Speaker & freie Redner — Übersicht', href: '/redner-ausbildungen' },
      },
      {
        id: 'mentoring',
        label: 'Mentoring & Einzelarbeit',
        icon: Compass,
        panelTitle: 'Mentoring & Einzelarbeit',
        panelSubtitle: 'Zu zweit, wenn es um Ihre eigene Sache geht',
        tiles: [
          { name: 'Marke & eigene Sprache', desc: 'Was Sie sagen, wenn niemand vorgibt wie', href: '/mentoring-transformation', icon: Sun },
          { name: 'Gold-Training (90 Minuten)', desc: 'Eine Sitzung, ein Anliegen', href: '/mentoring-gold', icon: Star },
          { name: 'Online, wo immer Sie sind', desc: 'Dieselbe Arbeit über Bildschirm', href: '/mentoring-online', icon: Globe },
        ],
      },
      {
        id: 'wissen',
        label: 'Wissen to Go',
        icon: BookOpen,
        panelTitle: 'Wissen to Go',
        panelSubtitle: 'Kostenlos, ohne Anmeldung, sofort lesbar',
        columns: 3,
        tiles: [
          { name: 'Wissensbibliothek A–Z', href: '/wissensbibliothek', icon: BookOpen },
          { name: 'Wirkungskraft-Werkzeuge', href: '/generatoren', icon: Wrench },
          { name: 'Gratis-Webinar', href: '/wissen-webinare', icon: Monitor },
          { name: 'Community', href: '/wissen-community', icon: Users },
          { name: 'Telegram-Audioimpulse', href: '/wissen-telegram', icon: Send },
          { name: 'Adventskalender', href: '/adventskalender', icon: Gift },
        ],
        uebersicht: { name: 'Alles im Überblick', href: '/wissen-to-go' },
      },
    ],
  },
  {
    label: 'Antworten',
    id: 'antworten',
    categories: [
      {
        id: 'fragen-reden',
        label: 'Fragen zum Reden',
        icon: Mic,
        panelTitle: 'Fragen zum Reden',
        panelSubtitle: 'Ausführlich beantwortet — kostenlos und ohne Anmeldung',
        columns: 3,
        tiles: [
          { name: 'Wie baue ich eine Keynote auf?', href: '/wissen/keynote-aufbauen', icon: Flag },
          { name: 'Wie finde ich mein Thema?', href: '/wissen/thema-finden-speaker', icon: Target },
          { name: 'Was hilft gegen Lampenfieber?', href: '/wissen/lampenfieber', icon: Activity },
          { name: 'Wie mache ich richtig Pausen?', href: '/wissen/sprechpausen', icon: Pause },
          { name: 'Wie trainiere ich meine Stimme?', href: '/wissen/stimme-trainieren', icon: Mic },
          { name: 'Kann man Charisma lernen?', href: '/wissen/charisma-lernen', icon: Sparkles },
        ],
        uebersicht: { name: 'Alle Artikel in der Wissensbibliothek', href: '/wissensbibliothek' },
      },
      {
        id: 'fragen-buchen',
        label: 'Fragen zum Buchen',
        icon: Star,
        panelTitle: 'Fragen zum Buchen',
        panelSubtitle: 'Was Veranstalter und Unternehmen vorher wissen wollen',
        tiles: [
          { name: 'Was kostet ein Keynote Speaker?', desc: 'Preisspannen im deutschen Markt', href: '/wissen/was-kostet-ein-keynote-speaker', icon: Star },
          { name: 'Wie finde ich den passenden Speaker?', desc: 'Woran man vorher erkennt, ob es passt', href: '/wissen/keynote-speaker-finden', icon: Compass },
          { name: 'Das Vier-Ohren-Modell', desc: 'Warum dasselbe anders ankommt', href: '/wissen/vier-ohren-modell', icon: Ear },
        ],
      },
    ],
  },
  {
    label: 'KI & Mensch',
    id: 'ki-mensch',
    categories: [
      {
        id: 'ki-angebote',
        label: 'KI-Angebote',
        icon: Monitor,
        panelTitle: 'KI-Angebote',
        panelSubtitle: 'Die Technik bedienen, ohne die eigene Sprache zu verlieren',
        columns: 3,
        tiles: [
          { name: 'KI-Manager Ausbildung', href: '/ki-manager-ausbildung', icon: Monitor },
          { name: 'KI-Einsteiger-Coaching', href: '/ki-einsteiger-coaching', icon: Compass },
          { name: 'KI 1:1', href: '/ki-1zu1', icon: Users },
          { name: 'HeyGen Kurs', href: '/ki-heygen-kurs', icon: Video },
          { name: 'KI-Abkürzungen', href: '/1zu1-abkuerzung-dezember', icon: ChevronsRight },
          { name: 'Webseite als Erlebnis', href: '/ki-webseite-erlebnis', icon: Globe },
        ],
      },
      {
        id: 'ki-philosophie',
        label: 'Mensch und KI',
        icon: Brain,
        panelTitle: 'Mensch und KI',
        panelSubtitle: 'Was die Maschine übernimmt — und was sie nicht kann',
        tiles: [
          { name: 'Was KI nicht kann', desc: 'Und warum das Ihr Vorteil ist', href: '/blog-ki', icon: Brain },
          { name: 'Ihre Stimme und die KI-Stimme', desc: 'Der hörbare Unterschied', href: '/blog-wirkung', icon: Mic },
          { name: 'ChatGPT-Assistent', desc: 'Mein Assistent zum Ausprobieren', href: 'https://claudia-conen-gpt-sa-m812.bolt.host/', icon: Bot, external: true },
        ],
      },
    ],
  },
  {
    label: 'Über Claudia',
    id: 'ueber-claudia',
    categories: [
      {
        id: 'person',
        label: 'Die Person',
        icon: Eye,
        panelTitle: 'Claudia Conen',
        panelSubtitle: 'Wer hier spricht und warum',
        tiles: [
          { name: 'Über mich', desc: 'Weg, Arbeitsweise, Haltung', href: '/ueber-mich', icon: Eye },
          { name: 'Von Schatten zu Licht', desc: 'Das Buchprojekt', href: '/von-schatten-zu-licht', icon: Sun },
          { name: 'Presse & Interviews', desc: 'Claudia in Medien', href: '/blog', icon: Newspaper },
          { name: 'Kontakt', desc: 'Direkt schreiben', href: '/#contact', icon: MessageSquare },
        ],
      },
    ],
  },
  {
    label: 'Aktuelles',
    id: 'aktuelles',
    categories: [
      {
        id: 'events',
        label: 'Events & Termine',
        icon: Calendar,
        panelTitle: 'Events & Termine',
        panelSubtitle: 'Wo Claudia als Nächstes zu erleben ist',
        tiles: [
          { name: 'KI-Workshop „Die Unverwechselbaren"', desc: '2 Tage live · 3 Coaches', href: '/ki-workshop-unverwechselbar', icon: Sparkles, fullWidth: true },
          { name: 'Kommende Events', desc: 'Alle Termine auf einen Blick', href: '/events', icon: Calendar },
          { name: 'Online-Webinare', desc: 'Live dabei sein, kostenlos', href: '/wissen-webinare', icon: Monitor },
        ],
      },
      {
        id: 'blog',
        label: 'Blog & Artikel',
        icon: Edit3,
        panelTitle: 'Blog & Artikel',
        panelSubtitle: 'Neues zuerst hier',
        tiles: [
          { name: 'Mensch & KI', href: '/blog-ki', icon: Monitor },
          { name: 'Wirkung & Persönlichkeit', href: '/blog-wirkung', icon: Star },
          { name: 'Stimme & Wirkung', href: '/blog', icon: Mic },
          { name: 'Newsletter', desc: 'Impulse ins Postfach', href: '/newsletter', icon: Mail },
        ],
      },
    ],
  },
];
