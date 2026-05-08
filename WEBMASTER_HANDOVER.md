# Webmaster-Übergabe — claudiaconen.com

> **Zweck:** Vollständige Übergabe der bestehenden Webseite an einen zweiten Webmaster, der diese als Grundlage für ein Redesign (Farben, Struktur, Layout) verwenden wird.
>
> **Stand:** Mai 2026
> **Repo:** https://github.com/ClaudiaConen/Claudiaconen-website
> **Live:** https://claudiaconen.com
> **Hosting:** Netlify (Auto-Deploy bei Push auf `main`)

---

## Inhaltsverzeichnis

1. [Was ist die Seite?](#1-was-ist-die-seite)
2. [Tech-Stack & Versionen](#2-tech-stack--versionen)
3. [Lokale Entwicklung einrichten](#3-lokale-entwicklung-einrichten)
4. [Information-Architektur — Seiten-Inventar](#4-information-architektur--seiten-inventar)
5. [Mega-Menu-Struktur](#5-mega-menu-struktur)
6. [Komponenten-Inventar](#6-komponenten-inventar)
7. [Aktuelles Design-System](#7-aktuelles-design-system)
8. [Datenbank-Schema (Supabase)](#8-datenbank-schema-supabase)
9. [Authentifizierungs-Flows](#9-authentifizierungs-flows)
10. [Edge Functions](#10-edge-functions)
11. [Externe Services](#11-externe-services)
12. [Build & Deploy](#12-build--deploy)
13. [Member-System (LMS) im Detail](#13-member-system-lms-im-detail)
14. [SEO & Performance](#14-seo--performance)
15. [Was beim Redesign UNBEDINGT erhalten bleiben muss](#15-was-beim-redesign-unbedingt-erhalten-bleiben-muss)
16. [Was beim Redesign offen veränderbar ist](#16-was-beim-redesign-offen-veränderbar-ist)
17. [Codebase-Eigenheiten & Stolpersteine](#17-codebase-eigenheiten--stolpersteine)
18. [Empfohlener Migrations-/Redesign-Pfad](#18-empfohlener-migrations-redesign-pfad)
19. [Bestehende Dokumentation](#19-bestehende-dokumentation)
20. [Quick Reference](#20-quick-reference)

---

## 1. Was ist die Seite?

**Personenmarke Claudia Conen** — eine Premium-Plattform für **Voice-to-Brain®-Coaching, Speaker-Ausbildung und KI-Themen** mit Sitz in Köln.

Die Webseite kombiniert vier Funktionen:

| Funktion | Beispielseiten |
|---|---|
| **Marketing-Hub** für Dienstleistungen | Mentoring, Speaker-Trainings, Stimm-Coachings, Keynotes für Unternehmen |
| **KI-Angebote** | KI-Manager-Ausbildung, HeyGen-Kurs, KI-Webseite-Erlebnis, AI-Abkürzungen |
| **Closed-Loop-LMS** für zahlende Mitglieder | Kurse, Quizze, Flashcards, Forum, Achievements, Live-Sessions |
| **Kampagnen-Plattform** | Adventskalender, Buchprojekt „Power of AI", Webinar-Anmeldungen |

**Zielgruppen:**
- Unternehmen mit Bedarf an Keynotes/Leadership-Ausbildung
- Selbstständige & Coaches, die als Speaker sichtbar werden wollen
- Mittelständler, die KI-Kompetenz aufbauen wollen
- Bestehende Member im LMS-Bereich

**Tonalität:** Premium-Coaching-Sprache, viel „Wirkung", „Sichtbarkeit", „Persönlichkeit"; Du-Form; emotional + autoritätsstiftend.

---

## 2. Tech-Stack & Versionen

| Tech | Version | Rolle |
|---|---|---|
| **React** | 18.3.1 | UI-Framework |
| **Vite** | 5.4.2 | Build-Tool + Dev-Server |
| **TypeScript** | 5.5.3 | Typsicherheit |
| **React Router** | 7.9.4 | SPA-Routing für 122+ Seiten |
| **Tailwind CSS** | 3.4.1 | Styling-System (custom theme) |
| **Framer Motion** | 12.23.24 | Scroll-/Hover-Animationen |
| **@supabase/supabase-js** | 2.57.4 | Backend-Client (zwei Projekte!) |
| **Lucide-React** | 0.344.0 | Icon-System |
| **jsPDF** | 4.0.0 | PDF-Generator (Zertifikate, Workbooks) |
| **qrcode.react** | 4.2.0 | QR-Code-Generierung |
| **dotenv / tsx** | 17.2.3 / 4.7.0 | Build-Scripts |

**Build-Befehle:**
```bash
npm install              # Dependencies (327 Pakete, ~250 MB)
npm run dev              # Dev-Server, http://localhost:5173
npm run build            # Production-Build → dist/
npm run generate-sitemap # Sitemap.xml aus Routes + Blog-Articles
npm run lint             # ESLint
npm run typecheck        # TypeScript-Check (tsc --noEmit)
```

**Build-Output:** ca. 3 MB JS-Bundle (single-bundle, kein Code-Splitting). Cover-Bild 160 KB nach Optimierung.

---

## 3. Lokale Entwicklung einrichten

```bash
# 1. Repo klonen
git clone https://github.com/ClaudiaConen/Claudiaconen-website
cd Claudiaconen-website

# 2. Node 20+ installiert haben

# 3. Dependencies
npm install

# 4. .env anlegen (siehe Quick Reference §20)
echo 'VITE_SUPABASE_URL=https://szilqjmcqdydwwtitxyb.supabase.co' > .env
echo 'VITE_SUPABASE_ANON_KEY=<aus_Netlify_oder_Supabase>' >> .env

# 5. Starten
npm run dev
```

**Wichtig:**
- Die `.env`-Werte zeigen auf das **Production-Supabase-Projekt** — **niemals dort schreibend testen!** RLS-Policies schützen, aber besser ist trotzdem ein lesender Fokus.
- Für Buchprojekt-Tests existiert ein **separates Supabase-Projekt** (Werte in `src/lib/supabaseBuchprojekt.ts` hardcoded).

---

## 4. Information-Architektur — Seiten-Inventar

**Total: ~122 Seiten** in `src/pages/`. Alle Routen werden in `src/App.tsx` registriert (~280 Zeilen, einer pro Route).

### 4.1 Marketing-Hauptseiten (39)

| Pfad | Datei | Zweck |
|---|---|---|
| `/` | `Home.tsx` | Startseite mit Service-Cards + Hero |
| `/ueber-mich` | `UeberMich.tsx` | Personenseite Claudia |
| `/marke-und-positionierung` | `MarkeUndPositionierung.tsx` | Markenarbeit |
| `/keynote-und-buehnenperformance` | `KeynoteUndBuehnenperformance.tsx` | Keynote-Service |
| `/eins-zu-eins-mentoring` | `EinsZuEinsMentoring.tsx` | 1:1-Programm |
| `/redner-ausbildungen` | `RednerAusbildungen.tsx` | Redner-Programme |
| `/wissen-to-go` | `WissenToGo.tsx` | Wissen-Hub |
| `/social-media-wirkung` | `SocialMediaWirkung.tsx` | Social-Coaching |
| `/immer-da-wo-du-bist` | `ImmerDaWoDuBist.tsx` | Verfügbarkeit |
| **Service-Familie „Unternehmen"** (4) | `Unternehmen{Keynotes,Leadership,Selling,Events}.tsx` | B2B-Services |
| **Service-Familie „Speaker"** (5) | `Speaker{Positionierung,Storytelling,Buehne,Social,Training}.tsx` | Speaker-Trainings |
| **Mentoring** (3) | `Mentoring{Transformation,Gold,Online}.tsx` | Mentoring-Tiers |
| **Stimm-Service** (4) | `Stimme{Keynote,Hochzeit,Trauer,Voiceover}.tsx` | Voice-Specials |
| **Ausbildung** (2) | `Ausbildung{Beruf,Zertifizierung}.tsx` | Ausbildungswege |
| **KI-Angebote** (5) | `KIManagerAusbildung.tsx`, `KIHeyGenKurs.tsx`, `KIWebseiteErlebnis.tsx`, `KIEinsteigerCoaching.tsx`, `KI1zu1.tsx`, `Abkuerzung1zu1.tsx` | KI-Coachings |
| **Premium-Pakete** | `PremiumAngebote.tsx`, `MeinePlaene.tsx`, `Experten.tsx` | Premium-Hubs |

### 4.2 Wissens-/Content-Hubs (8)
| Pfad | Datei |
|---|---|
| `/wissensbibliothek` | `Wissensbibliothek.tsx` |
| `/wissen-community`, `/wissen-webinare`, `/wissen-telegram`, `/wissen-whatsapp` | `Wissen{Community,Webinare,Telegram,Whatsapp}.tsx` |
| `/linkedin-freebie` | `LinkedInFreebie.tsx` (mit Bestätigungs-Token-Flow) |
| `/checklist-bestaetigung` | `ChecklistBestaetigung.tsx` |

### 4.3 Blog (4)
| Pfad | Datei |
|---|---|
| `/blog` | `Blog.tsx` (Index, sortiert nach Kategorie) |
| `/blog/ki` | `BlogKI.tsx` |
| `/blog/wirkung` | `BlogWirkung.tsx` |
| `/blog/neuro` | `BlogNeuro.tsx` |

> Blog-Artikel kommen aus Tabelle `knowledge_articles` und werden in der Sitemap automatisch ergänzt.

### 4.4 Kampagnen (6)
| Pfad | Datei | Zweck |
|---|---|---|
| `/advent-landing` | `AdventLanding.tsx` | Adventskalender Anmeldung |
| `/advent-kalender` | `AdventCalendar.tsx` | 24-Türchen-Übersicht |
| `/advent-tuer/:nr` | `AdventDoor.tsx` | Einzelnes Türchen |
| `/buchprojekt` | `Buchprojekt.tsx` | „Power of AI"-Buch (eigene Apple-Liquid-Glass-Optik!) |
| `/von-schatten-zu-licht` | `VonSchattenZuLicht.tsx` | Workshop-Anmeldung |
| `/newsletter` | `Newsletter.tsx` | Newsletter-Anmeldung |

### 4.5 Tools/Generatoren (8)
| Pfad | Datei |
|---|---|
| `/generatoren` | `Generatoren.tsx` (Hub) |
| `/workbook-generator` | `WorkbookGenerator.tsx` |
| `/quiz-generator` | `QuizGenerator.tsx` |
| `/wirkungskraft-quiz` | `WirkungskraftQuiz.tsx` |
| `/karussell-generator` | `KarussellGenerator.tsx` |
| `/jahres-content-plan` | `JahresContentplan.tsx` |
| `/claudia-ai` | `ClaudiaAIBeta.tsx` |

### 4.6 Member-Bereich (15)
**Alle Routen unter `/member/...`**, geschützt durch `MemberProtectedRoute.tsx` + `StudentAuthContext`.

| Pfad | Datei |
|---|---|
| `/member/login` | `MemberLogin.tsx` |
| `/member/dashboard` | `MemberDashboard.tsx` |
| `/member/courses` | `MemberCourses.tsx` |
| `/member/course/:id` | `MemberCourseSelection.tsx` |
| `/member/lesson/:id` | `MemberLessonView.tsx` |
| `/member/quiz/:id` | `MemberQuizTrainer.tsx` |
| `/member/flashcards/:deckId` | `MemberFlashcardTrainer.tsx` |
| `/member/forum`, `/member/forum/:thread` | `MemberForum.tsx`, `MemberForumThread.tsx` |
| `/member/achievements` | `MemberAchievements.tsx` |
| `/member/certificate/:id` | `MemberCertificate.tsx` |
| `/member/buchprojekt` | `MemberBuchprojekt.tsx` |

### 4.7 Admin-Bereich (38)
**Alle Routen unter `/admin/...`**, geschützt durch `ProtectedRoute.tsx` + `lib/adminAuth.ts`.

Wichtigste:
| Pfad | Datei | Zweck |
|---|---|---|
| `/admin/login`, `/admin/passwort-vergessen` | `AdminLogin.tsx`, `AdminPasswordReset*.tsx` | Auth |
| `/admin` | `AdminDashboard.tsx` | Übersicht mit Tile-Grid |
| `/admin/buchprojekt` | `AdminBuchprojektDashboard.tsx` | Buchprojekt-Anmeldungen |
| `/admin/buchungen`, `/admin/termintypen`, `/admin/verfuegbarkeit` | `AdminBooking{Dashboard,Types}.tsx`, `AdminAvailability.tsx` | Booking-System |
| `/admin/ki-manager-anmeldungen` | `AdminKIManagerBookings.tsx` | KI-Manager-Leads |
| `/admin/adventskalender` | `AdminAdventDashboard.tsx`, `AdminAdventDoorEdit.tsx` | Adventskalender pflegen |
| `/admin/member-*` | 15+ Admin-Pages für Kurse, Module, Lektionen, Quizze, Flashcards, Mini-Tasks | LMS-CMS |
| `/admin/testimonials`, `/admin/schritte-media`, `/admin/content-uploads`, `/admin/content-plaene` | `Admin{Testimonials,StepMedia,ContentUploads,ContentPlans}.tsx` | Content-CMS |
| `/admin/benutzer` | `AdminUserManagement.tsx` | Admin-User pflegen |

### 4.8 Legal & Special (4)
| Pfad | Datei |
|---|---|
| `/impressum` | `Impressum.tsx` |
| `/datenschutz` | `Datenschutz.tsx` |
| `/agb` | `AGB.tsx` |
| `/termin-buchen`, `/buchen/:typeSlug` | `BookingCalendar.tsx`, `BookingPage.tsx` |

---

## 5. Mega-Menu-Struktur

Definiert in `src/lib/megaMenuData.ts` (~200 Zeilen). Sicht: `src/components/Navigation.tsx` (Desktop) und `src/components/mega-menu/MobileMegaMenu.tsx` (Mobile).

**9 Top-Level-Kategorien**, jede mit Sub-Kategorien à 3–6 Tiles:

1. **Dienstleistungen** — Unternehmen, Speaker, Mentoring, Redner, Stimme, Wissen, Referenzen
2. **KI & Mensch** — KI-Angebote, Buchprojekt
3. **Über Claudia** — Person, Vita, Werte
4. **Aktuelles** — Blog, Events, Webinare
5. **Wissen & Tools** — Wissensbibliothek, Generatoren, FAQ
6. **Booking** — Termin-Typen
7. **Login** — Member, Admin

Top-rechts gibt's **zwei CTAs in der Nav-Bar**:
- **Buchprojekt-Banner** (klickbares Bild, verlinkt zu `the-power-of-ai.team`)
- **„Jetzt anfragen"** (Gold-Solid-Button, scrollt zu Kontakt-Sektion)

**Hinweis für Redesign:** Die Mega-Menu-Tiles haben einen sehr spezifischen Look (Gold-Outline, Cream-Background, Border-Hover-Animation). Die CSS dafür liegt in `src/index.css:732–1168` (~430 Zeilen). Bei einem Redesign muss diese Sektion komplett überdacht werden.

---

## 6. Komponenten-Inventar

**Total: ca. 60 Top-Level-Komponenten** in `src/components/`, plus Sub-Ordner für `mega-menu/` und Admin-Spezifika.

### 6.1 Navigation & Layout (6)
- `Navigation.tsx` — Desktop-Header mit Mega-Menu
- `mega-menu/MobileMegaMenu.tsx` — Mobile-Burger-Variante
- `mega-menu/MegaMenuPanel.tsx` — Dropdown-Panel
- `MemberNavigation.tsx` — Sidebar für Member-Bereich
- `AdminNavigation.tsx` — Sidebar mit Kategorien für Admin
- `Footer.tsx` — 4-Spalten + CTA-Bar

### 6.2 Hero & Marketing-Bausteine (8)
- `Hero.tsx`, `HeroBrainSection.tsx` — Startseite-Hero mit orbitaler Hirn-Animation
- `Offers.tsx`, `ServiceCards.tsx` — Service-Tile-Grids
- `MissionSection.tsx`, `About.tsx`
- `FinalCTA.tsx`, `ContactSection.tsx`

### 6.3 Modals & Forms (11)
- `ContactFormModal.tsx`
- `BuchprojektFormModal.tsx` — komplexes Formular mit Foto/QR-Upload, Tier-Selector, Add-Ons
- `CoachingInquiryForm.tsx`
- `KIManagerBookingModal.tsx`
- `AbkuerzungBookingModal.tsx`
- `AdventRegistrationModal.tsx`
- `BetaWaitlistModal.tsx`
- `ContentUploadModal.tsx`
- `ChecklistDownloadModal.tsx`
- `MediaUploader.tsx`
- `GapTextEditor.tsx`

### 6.4 Generatoren & PDF (4)
- `CertificateGenerator.tsx` — generiert Member-Zertifikate via jsPDF
- `QuizGenerator.tsx`
- `KarussellGenerator.tsx`
- `WorkbookGenerator.tsx`

### 6.5 Member-spezifisch (5)
- `EnhancedVideoPlayer.tsx` — Vimeo + YouTube + lokale Files mit Custom-Controls + Resume-Position
- `MemberWelcomeSection.tsx`, `CourseWelcomeSection.tsx`
- `GapTextExercise.tsx` — Lückentext-Übung
- `AudioButton.tsx`, `AchievementBadge.tsx`

### 6.6 Marketing-Bausteine (8)
- `Timeline.tsx` — animierte vertikale Timeline
- `SocialProof.tsx`, `TestimonialsSection.tsx`
- `ImageSlider.tsx`, `ThemenCarousel.tsx`
- `RelatedArticles.tsx`
- `FrequentQuestions.tsx`

### 6.7 UI-Utilities (8)
- `SubpageTemplate.tsx` — **wichtig:** wird in vielen Service-Detailseiten verwendet, sorgt für einheitliches Layout
- `SEO.tsx` — react-helmet-async-Wrapper für Meta-Tags
- `BetaBanner.tsx` — laufender gelber Banner oben
- `CookieBanner.tsx`, `WhatsAppButton.tsx`, `Snowfall.tsx` (Adventszeit)
- `CustomCursor.tsx` — Gold-Cursor mit Pulse-Ring (Desktop only)
- `CountdownTimer.tsx`

### 6.8 ClaudiaAI-Bereich (Beta-Feature)
- `ClaudiaAI.tsx` — Chat-Interface

---

## 7. Aktuelles Design-System

> **Wichtig fürs Redesign:** Die Site hat aktuell **zwei parallele Design-Sprachen**:
> - **Hauptseite:** Premium-Coaching, Gold + Navy + Cream, „Luxury-Glasmorphismus"
> - **Buchprojekt** (`/buchprojekt`): Apple Liquid Glass mit Magenta + Türkis + lila Akzent — komplett anders, bewusst
>
> Beim Redesign sollte entschieden werden, ob die zwei Welten unterschiedlich bleiben oder vereinheitlicht werden.

### 7.1 Tailwind Custom Theme (`tailwind.config.js`)

**Hauptseiten-Palette:**
| Token | Hex | Verwendung |
|---|---|---|
| `luxury-gold` | `#DAA520` | Primärakzent, CTAs, Highlights |
| `bright-gold` | `#F4D03F` | Hellere Gold-Variante |
| `midnight-blue` | `#0A1628` | Body-Text auf weißem BG, dunkle Sections |
| `royal-navy` | `#1A2B4C` | Sekundär-Dunkel |
| `pearl-white` | `#FDFBF7` | Body-Hintergrund (warmes Weiß) |
| `cream` | `#FFFEF9` | Card-Hintergrund |
| `warm` | `#F7F3EB` | Subtile Beige-Section |

**POAI-Palette (Buchprojekt — eigenständig):**
| Token | Hex | Verwendung |
|---|---|---|
| `poai-bg` / `poai-bg-2` | `#FBF9F4` / `#FFFFFF` | Off-White / pure Card |
| `poai-magenta` / `-2` / `-soft` | `#D6388F` / `#A02478` / `#FDE8F2` | Primärakzent |
| `poai-turquoise` / `-2` / `-soft` | `#0FB5A6` / `#0E8C80` / `#E6F8F5` | Sekundärakzent |
| `poai-gold` / `-soft` | `#B98E1F` / `#FBF1D8` | Tertiärakzent |
| `poai-violet` / `-soft` / `-glow` | `#8B5CF6` / `#C4B5FD` / `#A78BFA` | Glas-Rand-Akzent |
| `poai-text` / `-dim` / `-mute` | `#0F0A2A` / `#3F3A5F` / `#6E6A86` | 3-stufige Texthierarchie |
| `poai-line` | `#E8E4F0` | Borders |

**Custom Animations (`tailwind.config.js`):**
- `pulse-slow` — 3s
- `bounce-slow` — 3s
- `shimmer` — 2.4s translateX (Loading + Highlight)

**Fonts (Google Fonts via @import in `src/index.css:1`):**
- **Montserrat** (400/500/600/700/800/900) — Headlines
- **Inter** (300/400/500/600/700) — Body

### 7.2 Wichtige CSS-Klassen (`src/index.css`, ~1.350 Zeilen)

> **Hinweis:** Diese Klassen sind die „Magie" der Site. Beim Redesign müssen Entscheidungen pro Klasse getroffen werden: erhalten, anpassen oder ersetzen.

| Klasse | Zeilen | Zweck |
|---|---|---|
| `.glass-card` | 88–94 | Basis-Glasmorphismus (rgba-bg + blur + border) |
| `.gold-button` | 96–108 | Gold-Gradient-CTA mit Glow |
| `.text-glow` | 110–113 | Goldener Text-Schatten für Hervorhebung |
| `.gradient-bg` | 115–118 | Radial-Gradient für Sektion-BGs |
| `.animated-border` | 120–145 | Rotierender Halo-Border (3s-Loop) |
| `.number-badge` | 147–159 | Gold-Nummer-Badge (Schritt-Anzeigen) |
| `.icon-circle` | 161–177 | Hover-skalierender Icon-Kreis |
| `.fade-in` | 179–193 | Standard-Fade-In bei Page-Enter |
| `.pulse-animation` | 195–209 | Atmender CTA-Effekt |
| `.hero-glass-card` | 211–287 | Premium-Hero-Card mit Top-Bar + Glow + Tilt |
| `.poai-glass` | 291–366 | **Buchprojekt:** Apple Liquid Glass mit lila Rand |
| `.events-card` | 369–439 | Dark-Gradient-Card mit Top-Stripe |
| `.cc-cursor-dot` / `.cc-cursor-pulse` | 445–507 | Custom Gold-Cursor mit Pulse |
| `orbital-*` (ring-1 bis -4, core, node) | 510–560 | Orbital-Hirn-Animation Hero |
| `.premium-glass-card` | 580–680 | Light-Glasmorphismus + Shimmer-Sweep |
| `.cc-glow-word` | 745–760 | Goldener Shimmer-Text |
| `.cc-particle` | 765–785 | Aufsteigende Partikel im Hero |
| `.cc-cta-hero-brain` | 787–815 | Hero-CTA mit Hover-Wave |
| `.mega-nav-*` | 832–905 | Navigation-Element-Stile |
| `.mega-menu-*` | 907–1168 | Mega-Menu-Layout, Tiles, Animationen |
| `.headline-line1` / `.headline-line2` | 1185–1235 | Metallic-Gradient-Headlines mit shimmer |
| `.subline` | 1240–1265 | Subheadline-Stil mit Slide-In |
| `.accent-line` | 1267–1283 | Goldener Strich unter Headlines |
| `.video-nebel::after` | 1285–1305 | Pulsing-Halo um Video-Player |
| `.keyword-highlight` | 1307–1352 | Atmender Keyword-Text mit Glow |

### 7.3 Animationen & Effekte — Charakter der Seite

Folgende Effekte prägen den **Premium-Coaching-Look**:

1. **Orbital-Hirn** auf Startseite (4 rotierende Ringe + atmender Core)
2. **Glasmorphismus auf Cards** (3 Varianten: light, hero-glass, premium-glass)
3. **Goldener Custom-Cursor** mit Pulse-Ring (Desktop nur)
4. **Animierte Border** auf Highlight-Elementen
5. **Headlines mit Gold-Shimmer** (kontinuierlicher Background-Position-Shift)
6. **Particle-Stream** im Hero (aufsteigende kleine Lichter)
7. **Hover-Lift** auf jeder Card (translateY -8 bis -12px)
8. **Top-Stripe-Reveal** beim Card-Hover
9. **Smooth-Scroll** + Fade-In bei Section-Wechsel

> **Performance-Hinweis:** Die Site ist auf Desktop sehr animationen-lastig. Auf Mobile sind viele via `@media (prefers-reduced-motion: reduce)` und `(max-width: 768px)` zurückgenommen. Beim Redesign kann das vereinfacht werden (besser für CWV-Score).

---

## 8. Datenbank-Schema (Supabase)

> ⚠️ **Wichtigster Punkt: ZWEI Supabase-Projekte parallel!**

| Projekt | Project-Ref | Owner | Inhalt |
|---|---|---|---|
| **Production** | `szilqjmcqdydwwtitxyb` | Bolt-managed (kein Dashboard-Zugriff!) | Member-System, Booking, Adventskalender, Blog, Leads, KI-Manager-Anmeldungen |
| **Buchprojekt** | `eammlfkjtbqcubxpfxes` | claudiaconen@umsatzstimme.de | NUR `buchprojekt_anmeldungen` + Storage + Mail-Trigger |

**Frontend-Clients:**
- `src/lib/supabase.ts` — Standard, via `import.meta.env.VITE_SUPABASE_*`
- `src/lib/supabaseBuchprojekt.ts` — separater Client für Buchprojekt (URL/Key hardcoded)

### 8.1 Tabellen-Übersicht (~54 Stück)

#### Member-System (Auth + Profile)
- `member_students` — Studenten-Profile (Email + Access-Code-Auth, kein Passwort!)
- `admin_users` — Admin-Accounts (Email + Passwort-Hash)
- `admin_password_resets` — Passwort-Reset-Token

#### Kurse & Content
- `member_courses` — Top-Level-Kurse
- `member_course_modules` — Module innerhalb eines Kurses
- `member_course_lessons` — Lektionen mit Video + Content
- `member_course_welcome_content`, `member_course_welcome_cards`, `member_welcome_content` — Welcome-Bereiche
- `module_bonus_content` — Bonus-Material pro Modul

#### Learning-Aktivitäten
- `member_quizzes`, `member_quiz_questions`, `member_quiz_answers` — Quiz-System
- `member_flashcard_decks`, `member_flashcards` — Karteikarten (Spaced Repetition)
- `member_takeaway_items` — Lektions-Takeaways
- `member_mini_tasks`, `member_mini_task_steps` — Mehrstufige Aufgaben
- `member_lesson_gap_texts` — Lückentext-Übungen
- `member_lesson_downloads` — PDF-Downloads pro Lektion

#### Progress / Gamification
- `member_student_module_progress`, `member_student_lesson_progress` — Fortschritt
- `member_student_quiz_attempts` — Quiz-Versuche
- `member_student_flashcard_progress` — Karteikarten-Fortschritt
- `member_student_mini_task_submissions` — Aufgaben-Abgaben
- `member_student_takeaway_completions` — abgeschlossene Takeaways
- `member_student_achievements`, `member_achievements`, `user_achievements`, `user_points` — Badges + XP

#### Community
- `member_forum_categories`, `member_forum_threads`, `member_forum_posts`, `member_forum_reactions` — Forum
- `member_live_sessions` — Live-Termine
- `member_student_session_registrations` — Anmeldungen
- `member_announcements`, `member_student_announcement_reads` — Ankündigungen

#### Booking-System
- `appointment_types` — Termin-Typen (Coaching, Beratung, etc.)
- `availability_slots`, `availability_exceptions` — Verfügbarkeit
- `bookings` — eigentliche Buchungen
- `booking_email_logs` — Mail-Versand-Tracking
- `ki_manager_bookings`, `abkuerzung_bookings` — Spezial-Anmeldungen

#### Kampagnen & Leads
- `advent_registrations`, `advent_doors`, `advent_downloads`, `advent_progress` — Adventskalender
- `buchprojekt_anmeldungen` — **(im 2. Projekt)** Buchprojekt-Bewerbungen
- `coaching_inquiries`, `contact_inquiries` — Kontaktanfragen
- `beta_waitlist` — Beta-Tester-Liste
- `linkedin_freebie_leads` — LinkedIn-Lead-Magnet
- `schatten_zu_licht_registrations` — Workshop-Anmeldungen

#### Content & CMS
- `knowledge_articles` — Blog-Artikel (mit Kategorien `ki`, `wirkung`, `neuro`)
- `content_uploads` — File-Uploads
- `step_media` — Timeline-Schritt-Medien
- `testimonials` — Kundenstimmen
- `content_plans`, `saved_content_plans`, `content_plan_stats` — Content-Planer
- `course_recommendations`, `lesson_recommendations` — Empfehlungen

#### Storage Buckets
- `course_media` — Kurs-Videos/-Audio
- `event_images` — Event-Bilder
- `buchprojekt-files` — **(im 2. Projekt)** Foto + QR-Code
- Diverse weitere für Admin-Uploads

### 8.2 Row Level Security (RLS)

**Alle Tabellen haben RLS aktiv.** Häufiges Muster:
- `INSERT` — offen für anon (z. B. Lead-Formulare)
- `SELECT` — eingeschränkt auf eigenen Datensatz oder Admin
- `UPDATE/DELETE` — nur Admin (via SECURITY DEFINER-Funktionen)

> **Hinweis fürs Redesign:** RLS ist die Sicherheitsschicht. Beim Anlegen neuer Tabellen IMMER Policies setzen, sonst: Daten leak.

---

## 9. Authentifizierungs-Flows

### 9.1 Admin-Auth (`src/lib/adminAuth.ts`)

**Login-Flow:**
1. User gibt Email + Passwort ein
2. Edge Function `admin-login` prüft bcrypt-Hash
3. Bei Erfolg: JWT-Token generiert + in `localStorage` (`admin_token`, `admin_user`)
4. Token-Lifetime: 24h
5. Bei jedem Admin-Request: `verify-admin-token` prüft Gültigkeit

**Passwort-Reset-Flow:**
- Edge Function `request-password-reset` erzeugt Token, speichert in `admin_password_resets`, schickt Mail via Resend
- User klickt Link → `/admin/passwort-zuruecksetzen?token=...`
- Edge Function `reset-admin-password-temp` validiert Token + setzt neues Passwort

**Schutz:** `src/components/ProtectedRoute.tsx` — wrappt alle `/admin/*`-Routen

### 9.2 Member-Auth (`src/contexts/StudentAuthContext.tsx`)

**Andere Logik als Admin:**
- **Kein Passwort**, sondern **Access-Code** (alphanumerisch, z. B. `TEST2026`)
- Edge Function `student-login` prüft Email + Code gegen `member_students`
- Bei Erfolg: Student-Objekt in localStorage (`student`)
- Schutz: `MemberProtectedRoute.tsx`

**Auto-Sync-Trick:**
Wenn ein Admin sich einloggt, wird automatisch versucht, mit derselben Email auch als Student einzuloggen (`attemptStudentAutoLogin`). So kann Claudia parallel Admin- und Member-Bereich nutzen.

### 9.3 Edge-Function-Verifizierung
- Funktionen, die sensible Daten lesen, rufen `verify-admin-token` auf
- Verifizierung läuft komplett serverseitig (JWT-Signatur prüfen)

---

## 10. Edge Functions

**Total: ~31 Edge Functions** in `supabase/functions/` (jede ein Ordner mit `index.ts`).

### 10.1 Auth & User-Management (8)
- `admin-login`, `verify-admin-token`, `manage-admin-users`
- `request-password-reset`, `reset-password`, `reset-admin-password-temp`
- `student-login`, `update-student-profile`

### 10.2 Mail-Versand (Resend) (5)
- `send-booking-confirmation` — bei neuer Buchung
- `send-booking-reminders` — Cron, schickt Reminders
- `send-checklist-confirmation`, `send-freebie-confirmation` — Lead-Magnete
- `send-daily-advent-notification` — Cron, täglich Adventskalender-Türchen-Mail
- `send-buchprojekt-notification` — **OBSOLET!** (durch DB-Trigger ersetzt)

### 10.3 Content-Operations (7)
- `admin-module-operations` — Module CRUD
- `admin-upload-file` — File-Upload zu Storage
- `submit-quiz-attempt`, `update-flashcard-progress`
- `track-lesson-progress`, `check-achievements`, `update-streak`
- `mark-announcement-read`

### 10.4 Forum (1)
- `forum-operations` — Threads/Posts CRUD

### 10.5 Misc (10)
- `add-advent-contact-to-resend`, `migrate-advent-contacts-to-resend` — Resend-Audience-Sync
- `session-registration` — Live-Session-Anmeldung
- `generate-content-plan` — KI-Content-Planung
- `update-welcome-content`, `get-welcome-content`
- `verify-freebie-token` — Lead-Magnet-Verifizierung
- `test-bcrypt` — Debug-Tool

> **Build-Pfad:** Edge Functions werden separat in Supabase deployed (NICHT via Netlify), entweder per CLI oder Dashboard.

---

## 11. Externe Services

| Service | Zweck | Setup-Doku |
|---|---|---|
| **Netlify** | Hosting + Auto-Deploy | — |
| **Supabase** ×2 | Backend (DB + Auth + Storage + Edge Functions) | — |
| **Resend** ×2 Accounts | Transactional Mail | `RESEND_SETUP.md`, `CLOUDFLARE_RESEND_SETUP.md` |
| **Cloudflare** | DNS für claudiaconen.com (SPF/DKIM/DMARC für Resend) | `CLOUDFLARE_RESEND_SETUP.md` |
| **Tentary** | Externer Shop / Booking-Frontend (Link aus Mega-Menu) | — |
| **Vimeo + YouTube** | Video-Hosting für Kurse | — |
| **Google Fonts** | Montserrat + Inter | `@import` in `src/index.css:1` |

**Resend-Spezifika:**
- Free-Plan = 1 Domain pro Account → **deshalb 2 Accounts:**
  - **Account A** (`claudiaconen@umsatzstimme.de`): Domain `claudiaconen.com`
  - **Account B** (`info@claudiaconen-akademie.de`): Domain `the-power-of-ai.team`
- API-Keys teils in Edge Function Secrets, teils im SQL-Trigger hardcoded (Buchprojekt)

---

## 12. Build & Deploy

### 12.1 Hosting: Netlify
- Repo: GitHub `ClaudiaConen/Claudiaconen-website`
- **Branch `main`** = Production (claudiaconen.com)
- **Feature-Branches** = automatische Deploy-Previews
- Build-Command: `npm run build`
- Publish-Dir: `dist/`

### 12.2 Build-Pipeline
```
git push origin main
  ↓
Netlify Build:
  npm install → npm run build → npm run generate-sitemap
  ↓
Deploy zu CDN
  ↓
~2 Min später live auf claudiaconen.com
```

### 12.3 Sitemap-Generation
- `scripts/generate-sitemap.ts` läuft als Build-Step
- Statische Routen aus Liste + dynamische Blog-Artikel aus `knowledge_articles`
- **Hinweis:** Sitemap referenziert noch `claudia-conen-expert-platform.bolt.host` als Fallback-URL (sollte beim Redesign geprüft werden)

### 12.4 Env-Variablen (Netlify)

**Erforderlich:**
- `VITE_SUPABASE_URL` — Production-Projekt
- `VITE_SUPABASE_ANON_KEY` — Public Anon-Key

**Optional (je nach Feature):**
- Resend-API-Keys (in Edge Function Secrets, NICHT in Vite-Build)

---

## 13. Member-System (LMS) im Detail

Das Member-System ist eines der **funktionsreichsten und komplexesten Teile** der Codebase. ~38 Admin-Pages + 15 Member-Pages drehen sich darum.

### 13.1 Lerninhalte-Hierarchie
```
member_courses
  └─ member_course_modules
       ├─ member_course_lessons (Video + HTML-Content)
       ├─ member_quizzes (mit member_quiz_questions/answers)
       ├─ member_flashcard_decks (mit member_flashcards)
       ├─ member_mini_tasks (mehrstufige Aufgaben)
       ├─ member_takeaway_items
       └─ member_lesson_gap_texts (Lückentexte)
```

### 13.2 Lerner-Verhalten (Tracking)
- **Lektion-Fortschritt** (% gesehen / als-erledigt-markiert)
- **Modul-Fortschritt** (Aggregat über Lektionen)
- **Quiz-Versuche** (Score, Bestanden/Nicht-Bestanden)
- **Flashcard-Versuche** (Spaced Repetition)
- **Mini-Task-Submissions** (mit Admin-Feedback)
- **Takeaway-Completions**
- **Streaks** (tägliche Aktivität)
- **XP + Level**

### 13.3 Gamification
- **Achievements** mit XP-Rewards
- **Badges** (Bronze/Silber/Gold pro Modul-Abschluss)
- **Streak-Tracker** in Profile
- **Level-System** (alle 1000 XP = ein Level)
- **Zertifikat-Generator** (`CertificateGenerator.tsx` via jsPDF)

### 13.4 Community
- **Forum** mit Kategorien, Threads, Posts, Reactions
- **Live-Sessions** mit Anmeldung
- **Announcements** vom Admin

> **Fürs Redesign:** Das Member-System ist sehr funktional, aber das UI-Layer könnte modernisiert werden. Backend (DB + Edge Functions) sollte stabil bleiben.

---

## 14. SEO & Performance

### 14.1 SEO
- `src/components/SEO.tsx` — react-helmet-async Wrapper für Meta-Tags + OG + Twitter Cards
- `index.html` mit JSON-LD Structured Data (siehe `<head>`)
- Sitemap autogeneriert (siehe §12.3)
- robots.txt: nicht explizit im Repo, Netlify-Default

### 14.2 Performance — aktuelle Werte
| Metrik | Stand Mai 2026 |
|---|---|
| HTML | ~3 KB |
| **Main JS-Bundle** | **~3 MB** ⚠️ (kein Code-Splitting!) |
| Cover-Bild Buchprojekt | 160 KB (nach Optimierung) |
| Hero-Bilder Hauptseite | nicht final optimiert |

**Performance-Probleme bekannt:**
- Single-Bundle 3 MB → langsamer First Load auf Mobile
- Animationen-lastige Hauptseite → CPU-intensive auf älteren Geräten
- Keine Code-Splitting für Admin-Routes (Admin-Pages werden auch im public Bundle ausgeliefert)

> **Redesign-Empfehlung:** Code-Splitting per Route mit `React.lazy()` würde das Initial-Bundle drastisch reduzieren.

---

## 15. Was beim Redesign UNBEDINGT erhalten bleiben muss

### 15.1 Backend-Logik (NICHT anfassen)
- Datenbank-Schema (Supabase Production)
- Edge Functions (Auth + Mail + CRUD)
- RLS-Policies
- Buchprojekt-Trigger (DB → Resend)

### 15.2 Auth-Flows
- Admin-Login (Email + Passwort)
- Member-Login (Email + Access-Code)
- Auto-Sync zwischen Admin & Member

### 15.3 Externe URLs/Routen
Diese Routen sind **außerhalb** verlinkt und dürfen nicht entfernt werden:
- `/buchprojekt` — Banner im Hauptmenü, in externer Mail
- `/ki-manager-ausbildung` — Service-Card auf Home, Mega-Menu
- `/advent-kalender`, `/advent-tuer/:nr` — externe Mail-Kampagnen
- `/admin/*` — interner Zugang
- `/member/*` — Mitglieder-Zugang
- Legal: `/impressum`, `/datenschutz`, `/agb`

### 15.4 SEO-relevante Pfade
Falls eine Seite umbenannt wird → **301-Redirect** in `public/_redirects` (Netlify-Format) anlegen.

### 15.5 Funktional kritisch
- Booking-System (Tentary-Integration, Reminder-Mails)
- Member-LMS (Kurse, Quizze, Achievements)
- Buchprojekt-Form (mit Mail-Versand via DB-Trigger)
- Adventskalender (Cron-basierte Tages-Mails)

---

## 16. Was beim Redesign offen veränderbar ist

### 16.1 Visuelles Design (komplett neu möglich)
- **Farbpalette** (luxury-gold, midnight-blue, cream → andere Farben)
- **Typografie** (Montserrat/Inter → andere Fonts)
- **Layout & Komposition** (Hero-Struktur, Service-Cards, Footer)
- **Animationen & Effekte** (Glasmorphismus, Custom-Cursor, Orbital-Hirn)
- **Component-Stil** (Card-Look, Button-Stil, Form-Inputs)
- **Mobile-Layout** (komplette Re-Komposition möglich)

### 16.2 Content-Architektur
- **Reihenfolge der Sektionen** auf Service-Seiten
- **Mega-Menu-Struktur** kann neu gegliedert werden
- **Footer-Layout** (4-spaltig → andere Grid)
- **Sektionsweise Konsolidierung** (z. B. ähnliche Mentoring-Seiten zusammenführen)

### 16.3 Bestehende UI-Components
Die meisten `components/`-Dateien können **strukturell ersetzt** werden, solange ihre **API (props)** mit dem Backend-Pfad kompatibel bleibt.

---

## 17. Codebase-Eigenheiten & Stolpersteine

### 17.1 Hardcoded inline styles
- Viele Pages mischen Tailwind + inline `style={{...}}` für Gradienten und Schatten — bei einer Theme-Migration alle Stellen abklappern
- Beispiel: `src/components/ServiceCards.tsx` Zeile 64 hat inline `borderTopColor: '#DAA520'`

### 17.2 Zwei Design-Sprachen koexistent
- Hauptseite verwendet luxury-Tokens
- Buchprojekt verwendet POAI-Tokens (Apple Liquid Glass)
- Ein Redesign muss entscheiden: vereinheitlichen oder Multi-Brand-Strategie?

### 17.3 Two-Supabase-Project-Trick
- Buchprojekt hat eigenen Supabase-Client (`lib/supabaseBuchprojekt.ts`)
- Wenn das Redesign Buchprojekt verschiebt (z. B. zu the-power-of-ai.team), muss dieser Pfad migriert werden
- Details siehe `BUCHPROJEKT_NOTES.md`

### 17.4 Riesige Admin-Pages
- `AdminLessonEdit.tsx` ~32 KB
- `AdminMemberCoursesList.tsx` ~24 KB
- Refactoring nach Komponenten-Pattern empfohlen

### 17.5 Keine Test-Coverage
- Kein Vitest/Jest/Cypress eingerichtet
- Bei Redesign: Test-Suite einführen wäre sinnvoll

### 17.6 Mega-Menu-CSS-Komplexität
- ~430 Zeilen CSS allein für Mega-Menu (~40 % von index.css)
- Bei Redesign sollte komplett neu gedacht werden — z. B. mit modernem Headless-UI-Ansatz

### 17.7 Custom-Cursor
- `body.cc-custom-cursor` aktiviert goldenen Punkt-Cursor
- Funktioniert nur auf Desktop, ist abschaltbar via `prefers-reduced-motion`
- Brand-Element — wenn das verschwindet, verändert sich der Charakter merklich

---

## 18. Empfohlener Migrations-/Redesign-Pfad

### Phase 1 — Setup & Verständnis (1–2 Tage)
- [ ] Repo klonen, lokal lauffähig machen
- [ ] Diese Doku komplett lesen
- [ ] Live-Site ausgiebig durchklicken (alle Mega-Menu-Items, alle Service-Seiten)
- [ ] Member-Bereich mit Test-Account begehen (siehe `LOGIN_CREDENTIALS.md`)
- [ ] Admin-Bereich begehen
- [ ] Buchprojekt-Form testen

### Phase 2 — Design-Sprint vor Code (3–5 Tage)
- [ ] Brand-Workshop mit Claudia: Farben, Tonalität, Stilrichtung, Look-Refs
- [ ] Wireframes für Schlüssel-Pages (Home, Service-Detail, Member-Dashboard)
- [ ] Component-Library-Konzept (Cards, Buttons, Forms, Navigation)
- [ ] Animations-Strategie (Premium beibehalten? Vereinfachen?)
- [ ] Typografie-Auswahl (Fonts, Größen-Skala)
- [ ] Mobile-First-Konzept

### Phase 3 — Inkrementelle Umsetzung (2–4 Wochen)
- [ ] Neue Tailwind-Theme-Config in Feature-Branch
- [ ] Alte Klassen in `src/index.css` schrittweise ersetzen oder entfernen
- [ ] Component-für-Component umbauen, IMMER mit Vorher-Nachher-Test in Netlify-Preview
- [ ] Service-Pages eine nach der anderen
- [ ] Member-LMS zuletzt (komplexeste Bereich)

### Phase 4 — Performance & QA (3–5 Tage)
- [ ] Code-Splitting per Route einführen
- [ ] Bilder optimieren (alle in `public/`)
- [ ] Lighthouse-Audit (CWV-Score)
- [ ] Mobile-Tests
- [ ] Cross-Browser-Tests (Safari/Firefox/Chrome)

### Phase 5 — Live-Schalten
- [ ] Alle Routen auf Netlify-Preview verifizieren
- [ ] DNS bleibt unverändert (Domain zeigt bereits auf Netlify)
- [ ] Merge auf `main` → automatischer Deploy
- [ ] Monitoring: Resend-Mail-Logs, Supabase-Errors

---

## 19. Bestehende Dokumentation

| Datei | Inhalt |
|---|---|
| `BUCHPROJEKT_NOTES.md` | **Wichtig:** Architektur des Buchprojekts (2 Supabase-Projekte, Mail-Trigger via pg_net, Resend-Konten, Datums-Konstanten, Workflow-Konventionen) |
| `ADMIN_PASSWORD_RESET_SETUP.md` | Resend-Setup für Admin-Passwort-Reset, Domain-Verifizierung, Test-Modus, Debugging |
| `RESEND_SETUP.md` | API-Key-Konfiguration, Test-Modus-Limits, Domain-Verifizierung, Troubleshooting |
| `CLOUDFLARE_RESEND_SETUP.md` | SPF/DKIM/DMARC-Records, Cloudflare-DNS-Integration, Proxy-Status (grauer Cloud!) |
| `IMAGE_INSTRUCTIONS.md` | Erforderliche Portrait-Bilder für Home/ClaudiaAI |
| `LOGIN_CREDENTIALS.md` | Admin- und Test-Member-Zugangsdaten + RLS-Info |
| `README.md` | Aktuell minimal (1 Zeile) |

> **Tipp:** Diese Dateien zuerst lesen, bevor an Backend angefasst wird.

---

## 20. Quick Reference

### Wichtige Pfade
- **Repo:** https://github.com/ClaudiaConen/Claudiaconen-website
- **Netlify Site:** Site-ID `96c2c663-47d9-4b6a-817d-f985594484e6` (laut deploy.sh)
- **Live:** https://claudiaconen.com
- **Production-Supabase:** https://supabase.com/dashboard/project/szilqjmcqdydwwtitxyb (KEIN OWNER-ZUGRIFF!)
- **Buchprojekt-Supabase:** https://supabase.com/dashboard/project/eammlfkjtbqcubxpfxes (Owner: claudiaconen@umsatzstimme.de)
- **Resend Account A:** https://resend.com (Login: claudiaconen@umsatzstimme.de — Domain claudiaconen.com)
- **Resend Account B:** https://resend.com (Login: info@claudiaconen-akademie.de — Domain the-power-of-ai.team)

### Wichtige Dateien
| Datei | Zweck |
|---|---|
| `src/App.tsx` | Alle Routen, ~280 Zeilen |
| `src/lib/megaMenuData.ts` | Mega-Menu-Struktur |
| `src/lib/supabase.ts` | Production-Supabase-Client |
| `src/lib/supabaseBuchprojekt.ts` | Buchprojekt-Supabase-Client (separat!) |
| `src/lib/adminAuth.ts` | Admin-Auth-Logik |
| `src/contexts/StudentAuthContext.tsx` | Member-Auth-Context |
| `tailwind.config.js` | Design-Tokens |
| `src/index.css` | ~1.350 Zeilen Custom-CSS (Glasmorphismus, Animationen) |
| `scripts/generate-sitemap.ts` | Sitemap-Build-Step |
| `scripts/deploy.sh` | Deploy-Sicherheits-Skript |
| `supabase/migrations/` | DB-Migrationen (~95 Files) |
| `supabase/functions/` | Edge Functions (~31 Folder) |

### Wichtige Befehle
```bash
# Lokales Setup
npm install && npm run dev

# Build & deploy
git push origin main  # Netlify deployt automatisch in 2 Min

# Type-Check
npm run typecheck

# Sitemap-Refresh
npm run generate-sitemap
```

### Wichtige Ansprechpartner / Accounts
- **Admin-Login:** `info@claudiaconen-akademie.de` (Passwort siehe `LOGIN_CREDENTIALS.md`)
- **Test-Member:** `test@claudiaconen-akademie.de` mit Code `TEST2026`
- **Hauptsteuerung Resend:** `claudiaconen@umsatzstimme.de` (Account A)
- **Domain claudiaconen.com:** Cloudflare-DNS

---

**Übergabe-Status: Mai 2026 — vollständig.** Bei Fragen zur Architektur: BUCHPROJEKT_NOTES.md zuerst, dann diese Datei, dann Code direkt.
