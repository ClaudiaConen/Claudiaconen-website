import {
  Star, Users, Heart, Calendar, Target, Edit3, Flag, Share2, Mic,
  Globe, RefreshCw, Compass, GraduationCap, Award, MessageSquare,
  BookOpen, Wrench, Gift, Monitor, Send, Brain,
  ChevronsRight, User, Eye, Sun, TrendingUp, Shield, Newspaper,
  Mail, Video, Activity, Building2, Bot, Sparkles
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
        panelSubtitle: 'Wirkungsvolle Impulse für Ihr Team & Ihre Führungskräfte',
        tiles: [
          { name: 'Keynotes & Firmenvorträge', desc: 'Inspirierende Bühnenauftritte', href: '/unternehmen-keynotes', icon: Star },
          { name: 'Leadership & Kommunikation', desc: 'Führungspersönlichkeit stärken', href: '/unternehmen-leadership', icon: Users },
          { name: 'Emotional Selling & Performance', desc: 'Verkaufen mit Herz & Verstand', href: '/unternehmen-selling', icon: Heart },
          { name: 'Interne Events & Moderation', desc: 'Professionelle Eventbegleitung', href: '/unternehmen-events', icon: Calendar },
        ],
      },
      {
        id: 'speaker',
        label: 'Für Speaker & Selbständige',
        icon: Mic,
        panelTitle: 'Für Speaker & Selbständige',
        panelSubtitle: 'Deine unverwechselbare Stimme — dein stärkstes Werkzeug',
        tiles: [
          { name: 'Positionierung', desc: 'Klar erkennbar & unverwechselbar', href: '/speaker-positionierung', icon: Target },
          { name: 'Storytelling & Elevator Pitch', desc: 'Geschichten die berühren', href: '/speaker-storytelling', icon: Edit3 },
          { name: 'Bühnenwirkung & Auftritt', desc: 'Präsenz die man spürt', href: '/speaker-buehne', icon: Flag },
          { name: 'Reden auf Social Media', desc: 'Digital sichtbar & wirkungsvoll', href: '/speaker-social', icon: Share2 },
          { name: 'Voice-to-Impact® Intensivtraining', desc: 'Das Flagship-Programm für maximale Stimm- & Persönlichkeitswirkung', href: '/speaker-training', icon: Mic, fullWidth: true },
        ],
      },
      {
        id: 'mentoring',
        label: 'Mentoring & Coaching',
        icon: Compass,
        panelTitle: 'Mentoring & Coaching',
        panelSubtitle: 'Persönliche Begleitung auf deinem Weg',
        tiles: [
          { name: 'Transformation & Markenbrand', desc: 'Deine Marke, deine Wahrheit', href: '/mentoring-transformation', icon: RefreshCw },
          { name: 'Gold-Training (90 min Fokus)', desc: 'Intensive Einzelsession mit sofortigem Ergebnis', href: '/mentoring-gold', icon: Star },
          { name: 'Wo immer du bist', desc: 'Online-Coaching — weltweit, flexibel, wirkungsvoll', href: '/mentoring-online', icon: Globe, fullWidth: true },
        ],
      },
      {
        id: 'ausbildung',
        label: 'Redner-Ausbildungen',
        icon: GraduationCap,
        panelTitle: 'Redner-Ausbildungen',
        panelSubtitle: 'Der professionelle Weg auf die Bühne',
        tiles: [
          { name: 'Redner als Beruf', desc: 'Dein Einstieg in die Rednerkarriere', href: '/ausbildung-beruf', icon: GraduationCap },
          { name: 'Zertifizierung & Lizenzprogramm', desc: 'Anerkannte Qualifikation', href: '/ausbildung-zertifizierung', icon: Award },
          { name: 'KI-Manager Ausbildung', desc: 'Mensch & KI — die Zukunft der Kommunikation aktiv gestalten', href: '/ki-manager-ausbildung', icon: Monitor, fullWidth: true },
        ],
      },
      {
        id: 'stimme',
        label: 'Die Stimme für Ihre Botschaft',
        icon: MessageSquare,
        panelTitle: 'Die Stimme für Ihre Botschaft',
        panelSubtitle: 'Sprache, die bewegt — Momente, die bleiben',
        tiles: [
          { name: 'Keynote & Eventmoderation', desc: 'Professionelle Bühnenbegleitung', href: '/stimme-keynote', icon: Flag },
          { name: 'Hochzeitsreden', desc: 'Unvergessliche Worte für den schönsten Tag', href: '/stimme-hochzeit', icon: Heart },
          { name: 'Trauerreden', desc: 'Mit Würde Abschied nehmen', href: '/stimme-trauer', icon: Shield },
          { name: 'Ausbildung zum Freien Redner', desc: 'Zertifiziertes Programm', href: '/ausbildung-beruf', icon: GraduationCap },
          { name: 'Voice Over & Podcast', desc: 'Deine Stimme als professionelles Marketinginstrument', href: '/stimme-voiceover', icon: Mic, fullWidth: true },
        ],
      },
      {
        id: 'wissen',
        label: 'Wissen to Go',
        icon: BookOpen,
        panelTitle: 'Wissen to Go',
        panelSubtitle: 'Impulse, die du sofort nutzen kannst',
        columns: 3,
        tiles: [
          { name: 'Geschenke Adventskalender', href: '/adventskalender', icon: Gift },
          { name: 'Wirkungskraft Werkzeuge', href: '/generatoren', icon: Wrench },
          { name: 'Wissensbibliothek A–Z', href: '/wissensbibliothek', icon: BookOpen },
          { name: 'Community', href: '/wissen-community', icon: Users },
          { name: 'Gratis-Webinar', href: '/wissen-webinare', icon: Monitor },
          { name: 'Telegramm Audioimpulse', href: '/wissen-telegram', icon: Send },
        ],
      },
      {
        id: 'referenzen',
        label: 'Referenzen & Stimmen',
        icon: Heart,
        panelTitle: 'Referenzen & Stimmen',
        panelSubtitle: 'Was Menschen über die Arbeit mit Claudia sagen',
        tiles: [
          { name: 'Unternehmen', desc: 'Stimmen aus Firmen & Organisationen', href: '/ueber-mich', icon: Building2 },
          { name: 'Speaker & Coaches', desc: 'Kollegen & Branchenkenner berichten', href: '/ueber-mich', icon: Mic },
          { name: 'Video Testimonials', desc: 'Authentische Erfahrungsberichte', href: '/ueber-mich', icon: Video },
          { name: 'Erfolgsgeschichten', desc: 'Messbare Ergebnisse & Transformationen', href: '/ueber-mich', icon: Activity },
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
        panelSubtitle: 'Dein Vorsprung im KI-Zeitalter — mit dem Faktor Mensch',
        columns: 3,
        tiles: [
          { name: 'KI Manager Ausbildung', desc: 'Zertifiziert & zukunftssicher', href: '/ki-manager-ausbildung', icon: Monitor },
          { name: 'HeyGen Kurs', desc: 'KI-Avatar & Video-Produktion', href: '/ki-heygen-kurs', icon: Video },
          { name: 'KI Abkürzungen', desc: 'Schneller ans Ziel mit KI-Tools', href: '/1zu1-abkuerzung-dezember', icon: ChevronsRight },
          { name: 'KI Webseite als Emotionales Erlebnis', desc: 'Technik trifft Menschlichkeit', href: '/ki-webseite-erlebnis', icon: Globe },
          { name: 'KI Einsteiger Coaching', desc: 'Dein sanfter Einstieg in die KI-Welt', href: '/ki-einsteiger-coaching', icon: Compass },
          { name: 'KI 1:1', desc: 'Persönliche KI-Begleitung für dich', href: '/ki-1zu1', icon: Users },
          { name: 'ChatGPTs deine Abkürzung', desc: 'Dein persönlicher KI-Assistent', href: 'https://claudia-conen-gpt-sa-m812.bolt.host/', icon: Bot, external: true },
        ],
      },
      {
        id: 'ki-philosophie',
        label: 'Mensch vs. KI',
        icon: Brain,
        panelTitle: 'Mensch vs. KI',
        panelSubtitle: 'Warum du unersetzlich bist — heute mehr denn je',
        tiles: [
          { name: 'Was KI nicht kann', desc: 'Unverwechselbarkeit als Wettbewerbsvorteil', href: '/blog-ki', icon: Brain },
          { name: 'Neurowissenschaft & KI', desc: 'Was kein Algorithmus ersetzt', href: '/blog-neuro', icon: Activity },
          { name: 'Deine Stimme vs. KI-Stimme', desc: 'Das wertvollste Marketinginstrument', href: '/blog-wirkung', icon: Mic },
          { name: 'Blog: Mensch & KI', desc: 'Aktuelle Artikel & Impulse', href: '/blog-ki', icon: Edit3 },
        ],
      },
    ],
  },
  {
    label: 'Über Claudia',
    id: 'ueber-claudia',
    categories: [
      {
        id: 'meinestory',
        label: 'Meine Story',
        icon: TrendingUp,
        panelTitle: 'Meine Story',
        panelSubtitle: 'Von Schatten zu Licht — ein Weg der Transformation',
        tiles: [
          { name: 'Schatten zu Licht', desc: 'Die persönliche Geschichte hinter der Methode', href: '/von-schatten-zu-licht', icon: Sun },
          { name: 'Mein Weg zur Stimmexpertin', desc: 'Wie alles begann & warum Stimme Gold wert ist', href: '/ueber-mich', icon: TrendingUp },
          { name: 'Vision & Mission', desc: 'Wofür ich täglich aufstehe', href: '/ueber-mich', icon: Eye },
          { name: 'Meine Werte', desc: 'Authentizität, Mut & Menschlichkeit', href: '/ueber-mich', icon: Heart },
        ],
      },
      {
        id: 'expertise',
        label: 'Expertise & Methode',
        icon: Target,
        panelTitle: 'Expertise & Methode',
        panelSubtitle: 'Wissenschaftlich fundiert — menschlich erlebbar',
        tiles: [
          { name: 'Voice-to-Brain Methode', desc: 'Die einzigartige Claudia-Conen-Methode', href: '/ueber-mich', icon: Brain },
          { name: 'Neurowissenschaft & Stimme', desc: 'Was die Forschung über Stimme sagt', href: '/blog-neuro', icon: Activity },
          { name: 'Ausbildung & Qualifikationen', desc: 'Zertifizierte Kompetenzen & Abschlüsse', href: '/ueber-mich', icon: GraduationCap },
          { name: 'Meine Arbeitsweise', desc: 'Wie ich arbeite — und was dich erwartet', href: '/ueber-mich', icon: Compass },
        ],
      },
      {
        id: 'persoenlich',
        label: 'Persönlich',
        icon: User,
        panelTitle: 'Persönlich',
        panelSubtitle: 'Claudia Conen — der Mensch hinter der Stimme',
        tiles: [
          { name: 'Mein Podcast', desc: 'Wöchentliche Impulse für Stimme & Wirkung', href: '/wissen-telegram', icon: Mic },
          { name: 'Buch & Publikationen', desc: 'Gesammeltes Wissen in Buchform', href: '/wissensbibliothek', icon: BookOpen },
          { name: 'Presse & Interviews', desc: 'Claudia in Medien & Fachmagazinen', href: '/blog', icon: Edit3 },
          { name: 'Kontakt & Social Media', desc: 'Lass uns in Verbindung treten', href: '/#contact', icon: MessageSquare },
        ],
      },
    ],
  },
  {
    label: 'Aktuelles',
    id: 'aktuelles',
    categories: [
      {
        id: 'blog',
        label: 'Blog & Artikel',
        icon: Edit3,
        panelTitle: 'Blog & Artikel',
        panelSubtitle: 'Wissen, das dich weiterbringt — frisch & praxisnah',
        tiles: [
          { name: 'Mensch & KI', desc: 'Unverwechselbarkeit im KI-Zeitalter', href: '/blog-ki', icon: Monitor },
          { name: 'Wirkung & Persönlichkeit', desc: 'Deine Ausstrahlung entwickeln', href: '/blog-wirkung', icon: Star },
          { name: 'Neurowissenschaft & Verkauf', desc: 'Wie das Gehirn Entscheidungen trifft', href: '/blog-neuro', icon: Brain },
          { name: 'Stimme & Wirkung', desc: 'Praxistipps für mehr Stimmkraft', href: '/blog', icon: Mic },
        ],
      },
      {
        id: 'events',
        label: 'Events & Termine',
        icon: Calendar,
        panelTitle: 'Events & Termine',
        panelSubtitle: 'Erlebe Claudia Conen live',
        tiles: [
          { name: 'KI-Workshop "Die Unverwechselbaren"', desc: '2 Tage live · 3 Coaches · Sichtbar werden im KI-Zeitalter', href: '/ki-workshop-unverwechselbar', icon: Sparkles, fullWidth: true },
          { name: 'Kommende Events', desc: 'Alle Termine auf einen Blick', href: '/events', icon: Calendar },
          { name: 'Online-Webinare', desc: 'Live & kostenlos dabei sein', href: '/wissen-webinare', icon: Monitor },
          { name: 'Claudia als Rednerin buchen', desc: 'Keynote-Anfragen für deine Veranstaltung', href: '/#contact', icon: Star, fullWidth: true },
        ],
      },
      {
        id: 'medien',
        label: 'Medien & Presse',
        icon: Video,
        panelTitle: 'Medien & Presse',
        panelSubtitle: 'Claudia Conen in der Öffentlichkeit',
        tiles: [
          { name: 'Presseberichte', desc: 'Artikel & Medienberichte', href: '/blog', icon: Newspaper },
          { name: 'Podcast-Auftritte', desc: 'Claudia als Gast in anderen Podcasts', href: '/wissen-telegram', icon: Mic },
          { name: 'Auszeichnungen', desc: 'Zertifikate & Anerkennungen', href: '/ueber-mich', icon: Award },
          { name: 'Newsletter', desc: 'Impulse direkt in dein Postfach', href: '/newsletter', icon: Mail },
        ],
      },
    ],
  },
];
