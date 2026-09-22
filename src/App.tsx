import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./pages/Home'));
const ClaudiaAIBeta = lazy(() => import('./pages/ClaudiaAIBeta'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const Unverwechselbare = lazy(() => import('./pages/Unverwechselbare'));
const Hoeren = lazy(() => import('./pages/Hoeren'));
const Trauerrednerin = lazy(() => import('./pages/Trauerrednerin'));
const Hochzeitsrednerin = lazy(() => import('./pages/Hochzeitsrednerin'));
const FreieRednerin = lazy(() => import('./pages/FreieRednerin'));
const FreieRednerAusbildung = lazy(() => import('./pages/FreieRednerAusbildung'));
const TrauerrednerAusbildung = lazy(() => import('./pages/TrauerrednerAusbildung'));
const HochzeitsrednerAusbildung = lazy(() => import('./pages/HochzeitsrednerAusbildung'));
const SpeakerAusbildung = lazy(() => import('./pages/SpeakerAusbildung'));
const ElevatorPitchKurs = lazy(() => import('./pages/ElevatorPitchKurs'));
const StorytellingKurs = lazy(() => import('./pages/StorytellingKurs'));
const ArtikelKeynotePreis = lazy(() => import('./pages/ArtikelKeynotePreis'));
const ArtikelSpeakerFinden = lazy(() => import('./pages/ArtikelSpeakerFinden'));
const ArtikelStimmeTrainieren = lazy(() => import('./pages/ArtikelStimmeTrainieren'));
const ArtikelLampenfieber = lazy(() => import('./pages/ArtikelLampenfieber'));
const ArtikelCharisma = lazy(() => import('./pages/ArtikelCharisma'));
const ArtikelThemaFinden = lazy(() => import('./pages/ArtikelThemaFinden'));
const ArtikelSprechpausen = lazy(() => import('./pages/ArtikelSprechpausen'));
const ArtikelTrauerredeSchreiben = lazy(() => import('./pages/ArtikelTrauerredeSchreiben'));
const ArtikelSpeakerWerden = lazy(() => import('./pages/ArtikelSpeakerWerden'));
const ArtikelFreieTrauung = lazy(() => import('./pages/ArtikelFreieTrauung'));
const ArtikelElevatorPitch = lazy(() => import('./pages/ArtikelElevatorPitch'));
const ArtikelStorytelling = lazy(() => import('./pages/ArtikelStorytelling'));
const ArtikelTiefereStimme = lazy(() => import('./pages/ArtikelTiefereStimme'));
const ArtikelGuteRede = lazy(() => import('./pages/ArtikelGuteRede'));
const ArtikelVierOhren = lazy(() => import('./pages/ArtikelVierOhren'));
const ArtikelKeynoteAufbauen = lazy(() => import('./pages/ArtikelKeynoteAufbauen'));
const MarkeUndPositionierung = lazy(() => import('./pages/MarkeUndPositionierung'));
const KeynoteUndBuehnenperformance = lazy(() => import('./pages/KeynoteUndBuehnenperformance'));
const EinsZuEinsMentoring = lazy(() => import('./pages/EinsZuEinsMentoring'));
const RednerAusbildungen = lazy(() => import('./pages/RednerAusbildungen'));
const WissenToGo = lazy(() => import('./pages/WissenToGo'));
const SocialMediaWirkung = lazy(() => import('./pages/SocialMediaWirkung'));
const ImmerDaWoDuBist = lazy(() => import('./pages/ImmerDaWoDuBist'));

const UnternehmenKeynotes = lazy(() => import('./pages/UnternehmenKeynotes'));
const UnternehmenLeadership = lazy(() => import('./pages/UnternehmenLeadership'));
const UnternehmenSelling = lazy(() => import('./pages/UnternehmenSelling'));
const UnternehmenEvents = lazy(() => import('./pages/UnternehmenEvents'));

const SpeakerPositionierung = lazy(() => import('./pages/SpeakerPositionierung'));
const SpeakerStorytelling = lazy(() => import('./pages/SpeakerStorytelling'));
const SpeakerBuehne = lazy(() => import('./pages/SpeakerBuehne'));
const SpeakerSocial = lazy(() => import('./pages/SpeakerSocial'));
const SpeakerTraining = lazy(() => import('./pages/SpeakerTraining'));

const MentoringTransformation = lazy(() => import('./pages/MentoringTransformation'));
const MentoringGold = lazy(() => import('./pages/MentoringGold'));
const MentoringOnline = lazy(() => import('./pages/MentoringOnline'));

const AusbildungBeruf = lazy(() => import('./pages/AusbildungBeruf'));
const AusbildungZertifizierung = lazy(() => import('./pages/AusbildungZertifizierung'));

const StimmeKeynote = lazy(() => import('./pages/StimmeKeynote'));
const StimmeHochzeit = lazy(() => import('./pages/StimmeHochzeit'));
const StimmeTrauer = lazy(() => import('./pages/StimmeTrauer'));
const StimmeVoiceover = lazy(() => import('./pages/StimmeVoiceover'));
const UnverwechselbarDu = lazy(() => import('./pages/UnverwechselbarDu'));
const Challenge = lazy(() => import('./pages/Challenge'));

const Wissensbibliothek = lazy(() => import('./pages/Wissensbibliothek'));
const Experten = lazy(() => import('./pages/Experten'));
const ChecklistBestaetigung = lazy(() => import('./pages/ChecklistBestaetigung'));
const LinkedInFreebie = lazy(() => import('./pages/LinkedInFreebie'));
const LinkedInFreebieConfirmed = lazy(() => import('./pages/LinkedInFreebieConfirmed'));
const WissenCommunity = lazy(() => import('./pages/WissenCommunity'));
const WissenWebinare = lazy(() => import('./pages/WissenWebinare'));
const WissenTelegram = lazy(() => import('./pages/WissenTelegram'));
const WissenWhatsapp = lazy(() => import('./pages/WissenWhatsapp'));

const AdventLanding = lazy(() => import('./pages/AdventLanding'));
const AdventCalendar = lazy(() => import('./pages/AdventCalendar'));
const AdventDoor = lazy(() => import('./pages/AdventDoor'));

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminPasswordResetRequest = lazy(() => import('./pages/AdminPasswordResetRequest'));
const AdminPasswordReset = lazy(() => import('./pages/AdminPasswordReset'));
const AdminUserManagement = lazy(() => import('./pages/AdminUserManagement'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminAdventDashboard = lazy(() => import('./pages/AdminAdventDashboard'));
const AdminAdventDoorEdit = lazy(() => import('./pages/AdminAdventDoorEdit'));
const AdminStepMedia = lazy(() => import('./pages/AdminStepMedia'));
const AdminTestimonials = lazy(() => import('./pages/AdminTestimonials'));
const AdminContentUploads = lazy(() => import('./pages/AdminContentUploads'));
const AdminContentPlans = lazy(() => import('./pages/AdminContentPlans'));
import ProtectedRoute from './components/ProtectedRoute';

const BookingCalendar = lazy(() => import('./pages/BookingCalendar'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const AdminBookingDashboard = lazy(() => import('./pages/AdminBookingDashboard'));
const AdminBookingTypes = lazy(() => import('./pages/AdminBookingTypes'));
const AdminAvailability = lazy(() => import('./pages/AdminAvailability'));
const AdminKIManagerBookings = lazy(() => import('./pages/AdminKIManagerBookings'));

const Events = lazy(() => import('./pages/Events'));
const SpanienRetreat = lazy(() => import('./pages/SpanienRetreat'));
const SpanienBookingDanke = lazy(() => import('./pages/SpanienBookingDanke'));
const KIWorkshopUnverwechselbar = lazy(() => import('./pages/KIWorkshopUnverwechselbar'));
const KIWorkshopUnverwechselbarDanke = lazy(() => import('./pages/KIWorkshopUnverwechselbarDanke'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogKI = lazy(() => import('./pages/BlogKI'));
const BlogWirkung = lazy(() => import('./pages/BlogWirkung'));
const BlogNeuro = lazy(() => import('./pages/BlogNeuro'));
const UeberMich = lazy(() => import('./pages/UeberMich'));
const Impressum = lazy(() => import('./pages/Impressum'));
const Datenschutz = lazy(() => import('./pages/Datenschutz'));
const AGB = lazy(() => import('./pages/AGB'));
const VonSchattenZuLicht = lazy(() => import('./pages/VonSchattenZuLicht'));
const Buchprojekt = lazy(() => import('./pages/Buchprojekt'));
const AdminBuchprojektDashboard = lazy(() => import('./pages/AdminBuchprojektDashboard'));
const WorkbookGenerator = lazy(() => import('./pages/WorkbookGenerator'));
const QuizGenerator = lazy(() => import('./pages/QuizGenerator'));
const WirkungskraftQuiz = lazy(() => import('./pages/WirkungskraftQuiz'));
const KarussellGenerator = lazy(() => import('./pages/KarussellGenerator'));
const Generatoren = lazy(() => import('./pages/Generatoren'));
const Abkuerzung1zu1 = lazy(() => import('./pages/Abkuerzung1zu1'));
const KIManagerAusbildung = lazy(() => import('./pages/KIManagerAusbildung'));
const KIWebseiteErlebnis = lazy(() => import('./pages/KIWebseiteErlebnis'));
const KIEinsteigerCoaching = lazy(() => import('./pages/KIEinsteigerCoaching'));
const KI1zu1 = lazy(() => import('./pages/KI1zu1'));
const PremiumAngebote = lazy(() => import('./pages/PremiumAngebote'));
const JahresContentplan = lazy(() => import('./pages/JahresContentplan'));
const MeinePlaene = lazy(() => import('./pages/MeinePlaene'));

import { StudentAuthProvider } from './contexts/StudentAuthContext';
const MemberLogin = lazy(() => import('./pages/MemberLogin'));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard'));
const MemberBuchprojekt = lazy(() => import('./pages/MemberBuchprojekt'));
const MemberCourseSelection = lazy(() => import('./pages/MemberCourseSelection'));
const MemberCourses = lazy(() => import('./pages/MemberCourses'));
const MemberLesson = lazy(() => import('./pages/MemberLesson'));
const MemberQuiz = lazy(() => import('./pages/MemberQuiz'));
const MemberQuizResult = lazy(() => import('./pages/MemberQuizResult'));
const MemberFlashcards = lazy(() => import('./pages/MemberFlashcards'));
const MemberFlashcardTrainer = lazy(() => import('./pages/MemberFlashcardTrainer'));
const MemberProfile = lazy(() => import('./pages/MemberProfile'));
const MemberAchievements = lazy(() => import('./pages/MemberAchievements'));
const MemberForum = lazy(() => import('./pages/MemberForum'));
const MemberSessions = lazy(() => import('./pages/MemberSessions'));
import MemberProtectedRoute from './components/MemberProtectedRoute';
const AdminMemberCoursesList = lazy(() => import('./pages/AdminMemberCoursesList'));
const AdminCourseWelcome = lazy(() => import('./pages/AdminCourseWelcome'));
const AdminMemberCourses = lazy(() => import('./pages/AdminMemberCourses'));
const AdminModuleEdit = lazy(() => import('./pages/AdminModuleEdit'));
const AdminLessonEdit = lazy(() => import('./pages/AdminLessonEdit'));
const AdminQuizEdit = lazy(() => import('./pages/AdminQuizEdit'));
const AdminFlashcardEdit = lazy(() => import('./pages/AdminFlashcardEdit'));
const AdminMemberStudents = lazy(() => import('./pages/AdminMemberStudents'));
const AdminWelcomeContent = lazy(() => import('./pages/AdminWelcomeContent'));
const AdminRecommendations = lazy(() => import('./pages/AdminRecommendations'));
const AdminEvents = lazy(() => import('./pages/AdminEvents'));
const AdminMentoring = lazy(() => import('./pages/AdminMentoring'));
const AdminSiteContent = lazy(() => import('./pages/AdminSiteContent'));
const MemberCertificate = lazy(() => import('./pages/MemberCertificate'));
const AdminModuleBonusEdit = lazy(() => import('./pages/AdminModuleBonusEdit'));
const AdminQuizList = lazy(() => import('./pages/AdminQuizList'));
const AdminFlashcardList = lazy(() => import('./pages/AdminFlashcardList'));
const AdminTakeawayList = lazy(() => import('./pages/AdminTakeawayList'));
const AdminTakeawayEdit = lazy(() => import('./pages/AdminTakeawayEdit'));
const AdminMiniTaskList = lazy(() => import('./pages/AdminMiniTaskList'));
const AdminMiniTaskEdit = lazy(() => import('./pages/AdminMiniTaskEdit'));
const AdminGapTextList = lazy(() => import('./pages/AdminGapTextList'));
const AdminGapTextEdit = lazy(() => import('./pages/AdminGapTextEdit'));
const NotFound = lazy(() => import('./pages/NotFound'));
import CustomCursor from './components/CustomCursor';
// Umbauhinweis seit 22.09.2026 nicht mehr eingeblendet (Komponente bleibt fuer den naechsten grossen Umbau).
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <StudentAuthProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-busy="true" />}>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/claudia-ai" element={<ClaudiaAIBeta />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/unverwechselbare" element={<Unverwechselbare />} />
        <Route path="/hoeren" element={<Hoeren />} />
        <Route path="/trauerrede" element={<Trauerrednerin />} />
        <Route path="/freie-trauung" element={<Hochzeitsrednerin />} />
        <Route path="/freie-rednerin" element={<FreieRednerin />} />
        <Route path="/freie-redner-ausbildung" element={<FreieRednerAusbildung />} />
        <Route path="/trauerredner-ausbildung" element={<TrauerrednerAusbildung />} />
        <Route path="/hochzeitsredner-ausbildung" element={<HochzeitsrednerAusbildung />} />
        <Route path="/speaker-ausbildung" element={<SpeakerAusbildung />} />
        <Route path="/elevator-pitch-kurs" element={<ElevatorPitchKurs />} />
        <Route path="/storytelling-kurs" element={<StorytellingKurs />} />
        <Route path="/wissen/was-kostet-ein-keynote-speaker" element={<ArtikelKeynotePreis />} />
        <Route path="/wissen/keynote-speaker-finden" element={<ArtikelSpeakerFinden />} />
        <Route path="/wissen/stimme-trainieren" element={<ArtikelStimmeTrainieren />} />
        <Route path="/wissen/lampenfieber" element={<ArtikelLampenfieber />} />
        <Route path="/wissen/charisma-lernen" element={<ArtikelCharisma />} />
        <Route path="/wissen/thema-finden-speaker" element={<ArtikelThemaFinden />} />
        <Route path="/wissen/sprechpausen" element={<ArtikelSprechpausen />} />
        <Route path="/wissen/trauerrede-schreiben" element={<ArtikelTrauerredeSchreiben />} />
        <Route path="/wissen/keynote-speaker-werden" element={<ArtikelSpeakerWerden />} />
        <Route path="/wissen/freie-trauung-ablauf" element={<ArtikelFreieTrauung />} />
        <Route path="/wissen/elevator-pitch" element={<ArtikelElevatorPitch />} />
        <Route path="/wissen/storytelling" element={<ArtikelStorytelling />} />
        <Route path="/wissen/tiefere-stimme" element={<ArtikelTiefereStimme />} />
        <Route path="/wissen/gute-rede-halten" element={<ArtikelGuteRede />} />
        <Route path="/wissen/vier-ohren-modell" element={<ArtikelVierOhren />} />
        <Route path="/wissen/keynote-aufbauen" element={<ArtikelKeynoteAufbauen />} />
        <Route path="/marke-und-positionierung" element={<MarkeUndPositionierung />} />
        <Route path="/keynote-und-buehnenperformance" element={<KeynoteUndBuehnenperformance />} />
        <Route path="/1-zu-1-mentoring" element={<EinsZuEinsMentoring />} />
        <Route path="/redner-ausbildungen" element={<RednerAusbildungen />} />
        <Route path="/wissen-to-go" element={<WissenToGo />} />
        <Route path="/social-media-wirkung" element={<SocialMediaWirkung />} />
        <Route path="/immer-da-wo-du-bist" element={<ImmerDaWoDuBist />} />

        <Route path="/unternehmen-keynotes" element={<UnternehmenKeynotes />} />
        <Route path="/unternehmen-leadership" element={<UnternehmenLeadership />} />
        <Route path="/unternehmen-selling" element={<UnternehmenSelling />} />
        <Route path="/unternehmen-events" element={<UnternehmenEvents />} />

        <Route path="/speaker-positionierung" element={<SpeakerPositionierung />} />
        <Route path="/speaker-storytelling" element={<SpeakerStorytelling />} />
        <Route path="/speaker-buehne" element={<SpeakerBuehne />} />
        <Route path="/speaker-social" element={<SpeakerSocial />} />
        <Route path="/speaker-training" element={<SpeakerTraining />} />

        <Route path="/mentoring-transformation" element={<MentoringTransformation />} />
        <Route path="/mentoring-gold" element={<MentoringGold />} />
        <Route path="/mentoring-online" element={<MentoringOnline />} />

        <Route path="/ausbildung-beruf" element={<AusbildungBeruf />} />
        <Route path="/ausbildung-zertifizierung" element={<AusbildungZertifizierung />} />
        <Route path="/ki-manager-ausbildung" element={<KIManagerAusbildung />} />
        <Route path="/ki-webseite-erlebnis" element={<KIWebseiteErlebnis />} />
        <Route path="/ki-einsteiger-coaching" element={<KIEinsteigerCoaching />} />
        <Route path="/ki-1zu1" element={<KI1zu1 />} />
        <Route path="/premiumangebote" element={<PremiumAngebote />} />

        <Route path="/stimme-keynote" element={<StimmeKeynote />} />
        <Route path="/stimme-hochzeit" element={<StimmeHochzeit />} />
        <Route path="/stimme-trauer" element={<StimmeTrauer />} />
        <Route path="/stimme-voiceover" element={<StimmeVoiceover />} />
        <Route path="/unverwechselbar-du" element={<UnverwechselbarDu />} />
        <Route path="/challenge" element={<Challenge />} />

        <Route path="/wissensbibliothek" element={<Wissensbibliothek />} />
        <Route path="/wissensmagazin" element={<Wissensbibliothek />} />
        <Route path="/experten" element={<Experten />} />
        <Route path="/checklist-bestaetigung" element={<ChecklistBestaetigung />} />
        <Route path="/linkedin-freebie" element={<LinkedInFreebie />} />
        <Route path="/linkedin-freebie-confirmed" element={<LinkedInFreebieConfirmed />} />
        <Route path="/wissen-community" element={<WissenCommunity />} />
        <Route path="/wissen-webinare" element={<WissenWebinare />} />
        <Route path="/wissen-telegram" element={<WissenTelegram />} />
        <Route path="/wissen-whatsapp" element={<WissenWhatsapp />} />

        <Route path="/adventskalender" element={<AdventLanding />} />
        <Route path="/adventskalender/kalender" element={<AdventCalendar />} />
        <Route path="/adventskalender/tuerchen/:doorNumber" element={<AdventDoor />} />
        <Route path="/1zu1-abkuerzung-dezember" element={<Abkuerzung1zu1 />} />

        <Route path="/member/login" element={<MemberLogin />} />
        <Route path="/member/dashboard" element={<MemberProtectedRoute><MemberDashboard /></MemberProtectedRoute>} />
        <Route path="/member/courses" element={<MemberProtectedRoute><MemberCourseSelection /></MemberProtectedRoute>} />
        <Route path="/member/courses/:courseId" element={<MemberProtectedRoute><MemberCourses /></MemberProtectedRoute>} />
        <Route path="/member/lesson/:lessonId" element={<MemberProtectedRoute><MemberLesson /></MemberProtectedRoute>} />
        <Route path="/member/quiz/:quizId" element={<MemberProtectedRoute><MemberQuiz /></MemberProtectedRoute>} />
        <Route path="/member/quiz/:quizId/result/:attemptId" element={<MemberProtectedRoute><MemberQuizResult /></MemberProtectedRoute>} />
        <Route path="/member/flashcards" element={<MemberProtectedRoute><MemberFlashcards /></MemberProtectedRoute>} />
        <Route path="/member/flashcards/:deckId" element={<MemberProtectedRoute><MemberFlashcardTrainer /></MemberProtectedRoute>} />
        <Route path="/member/certificate" element={<MemberProtectedRoute><MemberCertificate /></MemberProtectedRoute>} />
        <Route path="/member/profile" element={<MemberProtectedRoute><MemberProfile /></MemberProtectedRoute>} />
        <Route path="/member/achievements" element={<MemberProtectedRoute><MemberAchievements /></MemberProtectedRoute>} />
        <Route path="/member/forum" element={<MemberProtectedRoute><MemberForum /></MemberProtectedRoute>} />
        <Route path="/member/buchprojekt" element={<MemberProtectedRoute><MemberBuchprojekt /></MemberProtectedRoute>} />
        <Route path="/member/sessions" element={<MemberProtectedRoute><MemberSessions /></MemberProtectedRoute>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/passwort-vergessen" element={<AdminPasswordResetRequest />} />
        <Route path="/admin/passwort-zuruecksetzen" element={<AdminPasswordReset />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/benutzer" element={<ProtectedRoute><AdminUserManagement /></ProtectedRoute>} />
        <Route path="/admin/adventskalender" element={<ProtectedRoute><AdminAdventDashboard /></ProtectedRoute>} />
        <Route path="/admin/adventskalender/bearbeiten/:doorNumber" element={<ProtectedRoute><AdminAdventDoorEdit /></ProtectedRoute>} />
        <Route path="/admin/schritte-media" element={<ProtectedRoute><AdminStepMedia /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />

        <Route path="/termin-buchen" element={<BookingCalendar />} />
        <Route path="/buchen/:typeSlug" element={<BookingPage />} />
        <Route path="/admin/buchungen" element={<ProtectedRoute><AdminBookingDashboard /></ProtectedRoute>} />
        <Route path="/admin/termintypen" element={<ProtectedRoute><AdminBookingTypes /></ProtectedRoute>} />
        <Route path="/admin/verfuegbarkeit" element={<ProtectedRoute><AdminAvailability /></ProtectedRoute>} />
        <Route path="/admin/ki-manager-anmeldungen" element={<ProtectedRoute><AdminKIManagerBookings /></ProtectedRoute>} />
        <Route path="/admin/buchprojekt" element={<ProtectedRoute><AdminBuchprojektDashboard /></ProtectedRoute>} />
        <Route path="/admin/content-uploads" element={<ProtectedRoute><AdminContentUploads /></ProtectedRoute>} />
        <Route path="/admin/content-plaene" element={<ProtectedRoute><AdminContentPlans /></ProtectedRoute>} />
        <Route path="/admin/member-studenten" element={<ProtectedRoute><AdminMemberStudents /></ProtectedRoute>} />
        <Route path="/admin/member-courses-list" element={<ProtectedRoute><AdminMemberCoursesList /></ProtectedRoute>} />
        <Route path="/admin/member-courses/:courseId/welcome" element={<ProtectedRoute><AdminCourseWelcome /></ProtectedRoute>} />
        <Route path="/admin/member-courses/:courseId/modules" element={<ProtectedRoute><AdminMemberCourses /></ProtectedRoute>} />
        <Route path="/admin/member-kurse" element={<ProtectedRoute><AdminMemberCourses /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/modul/:moduleId" element={<ProtectedRoute><AdminModuleEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/modul/:moduleId/bonus" element={<ProtectedRoute><AdminModuleBonusEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/modul/:moduleId/lektion/:lessonId" element={<ProtectedRoute><AdminLessonEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/quiz/:quizId" element={<ProtectedRoute><AdminQuizEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/flashcards/:deckId" element={<ProtectedRoute><AdminFlashcardEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/takeaway/:takeawayId" element={<ProtectedRoute><AdminTakeawayEdit /></ProtectedRoute>} />
        <Route path="/admin/member-kurse/miniaufgabe/:taskId" element={<ProtectedRoute><AdminMiniTaskEdit /></ProtectedRoute>} />
        <Route path="/admin/member-quizze" element={<ProtectedRoute><AdminQuizList /></ProtectedRoute>} />
        <Route path="/admin/member-flashcards" element={<ProtectedRoute><AdminFlashcardList /></ProtectedRoute>} />
        <Route path="/admin/member-takeaways" element={<ProtectedRoute><AdminTakeawayList /></ProtectedRoute>} />
        <Route path="/admin/member-miniaufgaben" element={<ProtectedRoute><AdminMiniTaskList /></ProtectedRoute>} />
        <Route path="/admin/member-lückentexte" element={<ProtectedRoute><AdminGapTextList /></ProtectedRoute>} />
        <Route path="/admin/member-lückentexte/neu" element={<ProtectedRoute><AdminGapTextEdit /></ProtectedRoute>} />
        <Route path="/admin/member-lückentexte/bearbeiten/:lessonId" element={<ProtectedRoute><AdminGapTextEdit /></ProtectedRoute>} />
        <Route path="/admin/willkommen" element={<ProtectedRoute><AdminWelcomeContent /></ProtectedRoute>} />
        <Route path="/admin/empfehlungen" element={<ProtectedRoute><AdminRecommendations /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
        <Route path="/admin/mentoring" element={<ProtectedRoute><AdminMentoring /></ProtectedRoute>} />
        <Route path="/admin/seiteninhalte" element={<ProtectedRoute><AdminSiteContent /></ProtectedRoute>} />

        <Route path="/events" element={<Events />} />
        <Route path="/spanien-ki-workshop" element={<SpanienRetreat />} />
        <Route path="/spanien-ki-workshop/danke" element={<SpanienBookingDanke />} />
        <Route path="/ki-workshop-unverwechselbar" element={<KIWorkshopUnverwechselbar />} />
        <Route path="/ki-workshop-unverwechselbar/danke" element={<KIWorkshopUnverwechselbarDanke />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-ki" element={<BlogKI />} />
        <Route path="/blog-wirkung" element={<BlogWirkung />} />
        <Route path="/blog-neuro" element={<BlogNeuro />} />

        <Route path="/ueber-mich" element={<UeberMich />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="/von-schatten-zu-licht" element={<VonSchattenZuLicht />} />
        <Route path="/buchprojekt" element={<Buchprojekt />} />

        <Route path="/generatoren" element={<Generatoren />} />
        <Route path="/workbook-generator" element={<WorkbookGenerator />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/wirkungskraft-quiz" element={<WirkungskraftQuiz />} />
        <Route path="/karussell-generator" element={<KarussellGenerator />} />
        <Route path="/jahres-contentplan" element={<JahresContentplan />} />
        <Route path="/meine-plaene" element={<MeinePlaene />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
    </StudentAuthProvider>
  );
}

export default App;
