import {
  Star, Users, Heart, Calendar, Target, Edit3, Flag, Share2, Mic,
  Globe, Compass, GraduationCap, Award, MessageSquare,
  BookOpen, Wrench, Gift, Monitor,
  User, Brain,
  Video, Building2, Palette
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
  href?: string;
  categories: SidebarCategory[];
}

export const megaMenuItems: MegaMenuItem[] = [
  {
    label: 'Angebote',
    id: 'angebote',
    categories: [
      {
        id: 'fuer-dich',
        label: 'Für dich (1:1)',
        icon: User,
        panelTitle: 'Für dich (1:1)',
        panelSubtitle: 'Persönliche Begleitung für deinen Durchbruch',
        tiles: [
          { name: 'Mentoring (3 Pakete)', desc: 'Power-Session, VIP Day oder Signature', href: '/mentoring', icon: Compass },
          { name: 'Speaker-Training', desc: 'Voice-to-Impact® Intensivprogramm', href: '/speaker-training', icon: Mic },
          { name: 'KI-Manager Ausbildung', desc: 'Zertifiziert & zukunftssicher', href: '/ki-manager-ausbildung', icon: Monitor },
        ],
      },
      {
        id: 'unternehmen',
        label: 'Für Unternehmen',
        icon: Building2,
        panelTitle: 'Für Unternehmen',
        panelSubtitle: 'Wirkungsvolle Impulse für Ihr Team & Ihre Führungskräfte',
        tiles: [
          { name: 'Keynotes & Vorträge', desc: 'Inspirierende Bühnenauftritte', href: '/unternehmen-keynotes', icon: Star },
          { name: 'Leadership & Kommunikation', desc: 'Führungspersönlichkeit stärken', href: '/unternehmen-leadership', icon: Users },
        ],
      },
      {
        id: 'stimme',
        label: 'Stimme & Rede',
        icon: MessageSquare,
        panelTitle: 'Stimme & Rede',
        panelSubtitle: 'Sprache, die bewegt — Momente, die bleiben',
        tiles: [
          { name: 'Hochzeitsreden', desc: 'Unvergessliche Worte für den schönsten Tag', href: '/stimme-hochzeit', icon: Heart },
          { name: 'Trauerreden', desc: 'Mit Würde Abschied nehmen', href: '/stimme-trauer', icon: Heart },
          { name: 'Voice-Over', desc: 'Professionelle Sprachaufnahmen', href: '/stimme-voiceover', icon: Mic },
          { name: 'Keynote-Moderation', desc: 'Professionelle Bühnenbegleitung', href: '/stimme-keynote', icon: Flag },
        ],
      },
      {
        id: 'ausbildungen',
        label: 'Ausbildungen',
        icon: GraduationCap,
        panelTitle: 'Ausbildungen',
        panelSubtitle: 'Der professionelle Weg auf die Bühne',
        tiles: [
          { name: 'Redner-Ausbildung', desc: 'Dein Einstieg in die Rednerkarriere', href: '/redner-ausbildungen', icon: GraduationCap },
          { name: 'Zertifizierung', desc: 'Anerkannte Qualifikation', href: '/ausbildung-zertifizierung', icon: Award },
        ],
      },
      {
        id: 'kooperationen',
        label: 'Kooperationen',
        icon: Palette,
        panelTitle: 'Kooperationen',
        panelSubtitle: 'Gemeinsam stärker',
        tiles: [
          { name: 'Gabi Lindemann: Webdesign', desc: 'Emotionales Verkaufen im Webdesign', href: '/kooperationen/gabi-lindemann', icon: Globe },
        ],
      },
    ],
  },
  {
    label: 'Kurse',
    id: 'kurse',
    categories: [
      {
        id: 'kurse-uebersicht',
        label: 'Kursangebot',
        icon: BookOpen,
        panelTitle: 'Kurse & Werkzeuge',
        panelSubtitle: 'Wissen, das du sofort anwenden kannst',
        columns: 3,
        tiles: [
          { name: 'Wissensbibliothek A–Z', desc: 'Nachschlagewerk', href: '/wissensbibliothek', icon: BookOpen },
          { name: 'Wirkungskraft Werkzeuge', desc: 'Generatoren & Tools', href: '/generatoren', icon: Wrench },
          { name: 'Adventskalender', desc: 'Geschenke & Impulse', href: '/adventskalender', icon: Gift },
        ],
      },
    ],
  },
  {
    label: 'Community',
    id: 'community',
    categories: [
      {
        id: 'community-links',
        label: 'Community',
        icon: Users,
        panelTitle: 'Community',
        panelSubtitle: 'Gemeinsam wachsen — Netzwerk & Events',
        tiles: [
          { name: 'Events & Termine', desc: 'Workshops, Webinare & Live-Events', href: '/events', icon: Calendar },
          { name: 'Speaker Social', desc: 'Digital sichtbar & wirkungsvoll', href: '/speaker-social', icon: Share2 },
          { name: 'Newsletter', desc: 'Impulse direkt in dein Postfach', href: '/newsletter', icon: Edit3 },
        ],
      },
    ],
  },
  {
    label: 'Über Claudia',
    id: 'ueber-claudia',
    href: '/ueber-mich',
    categories: [
      {
        id: 'meinestory',
        label: 'Meine Story',
        icon: User,
        panelTitle: 'Über Claudia',
        panelSubtitle: 'Von Schatten zu Licht — ein Weg der Transformation',
        tiles: [
          { name: 'Über mich', desc: 'Wer ist Claudia Conen?', href: '/ueber-mich', icon: User },
          { name: 'Von Schatten zu Licht', desc: 'Die persönliche Geschichte', href: '/von-schatten-zu-licht', icon: Heart },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    id: 'blog',
    href: '/blog',
    categories: [
      {
        id: 'blog-kategorien',
        label: 'Blog-Kategorien',
        icon: Edit3,
        panelTitle: 'Blog & Artikel',
        panelSubtitle: 'Wissen, das dich weiterbringt',
        tiles: [
          { name: 'Alle Artikel', desc: 'Blog-Übersicht mit Filtern', href: '/blog', icon: Edit3 },
          { name: 'Mensch & KI', desc: 'Unverwechselbarkeit im KI-Zeitalter', href: '/blog?filter=ki', icon: Brain },
          { name: 'Wirkung & Persönlichkeit', desc: 'Deine Ausstrahlung entwickeln', href: '/blog?filter=wirkung', icon: Star },
          { name: 'Neurowissenschaft', desc: 'Wie das Gehirn entscheidet', href: '/blog?filter=neuro', icon: Video },
        ],
      },
    ],
  },
];
