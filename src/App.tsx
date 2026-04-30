import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BetaBanner from './components/BetaBanner';
import Home from './pages/Home';
import ClaudiaAIBeta from './pages/ClaudiaAIBeta';
import Newsletter from './pages/Newsletter';
import MarkeUndPositionierung from './pages/MarkeUndPositionierung';
import KeynoteUndBuehnenperformance from './pages/KeynoteUndBuehnenperformance';
import EinsZuEinsMentoring from './pages/EinsZuEinsMentoring';
import RednerAusbildungen from './pages/RednerAusbildungen';
import WissenToGo from './pages/WissenToGo';
import SocialMediaWirkung from './pages/SocialMediaWirkung';
import ImmerDaWoDuBist from './pages/ImmerDaWoDuBist';

import UnternehmenKeynotes from './pages/UnternehmenKeynotes';
import UnternehmenLeadership from './pages/UnternehmenLeadership';
import UnternehmenSelling from './pages/UnternehmenSelling';
import UnternehmenEvents from './pages/UnternehmenEvents';

import SpeakerPositionierung from './pages/SpeakerPositionierung';
import SpeakerStorytelling from './pages/SpeakerStorytelling';
import SpeakerBuehne from './pages/SpeakerBuehne';
import SpeakerSocial from './pages/SpeakerSocial';
import SpeakerTraining from './pages/SpeakerTraining';

import MentoringTransformation from './pages/MentoringTransformation';
import MentoringGold from './pages/MentoringGold';
import MentoringOnline from './pages/MentoringOnline';

import AusbildungBeruf from './pages/AusbildungBeruf';
import AusbildungZertifizierung from './pages/AusbildungZertifizierung';

import StimmeKeynote from './pages/StimmeKeynote';
import StimmeHochzeit from './pages/StimmeHochzeit';
import StimmeTrauer from './pages/StimmeTrauer';
import StimmeVoiceover from './pages/StimmeVoiceover';

import Wissensbibliothek from './pages/Wissensbibliothek';
import Experten from './pages/Experten';
import ChecklistBestaetigung from './pages/ChecklistBestaetigung';
import LinkedInFreebie from './pages/LinkedInFreebie';
import LinkedInFreebieConfirmed from './pages/LinkedInFreebieConfirmed';
import WissenCommunity from './pages/WissenCommunity';
import WissenWebinare from './pages/WissenWebinare';
import WissenTelegram from './pages/WissenTelegram';
import WissenWhatsapp from './pages/WissenWhatsapp';

import AdventLanding from './pages/AdventLanding';
import AdventCalendar from './pages/AdventCalendar';
import AdventDoor from './pages/AdventDoor';

import AdminLogin from './pages/AdminLogin';
import AdminPasswordResetRequest from './pages/AdminPasswordResetRequest';
import AdminPasswordReset from './pages/AdminPasswordReset';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminDashboard from './pages/AdminDashboard';
import AdminAdventDashboard from './pages/AdminAdventDashboard';
import AdminAdventDoorEdit from './pages/AdminAdventDoorEdit';
import AdminStepMedia from './pages/AdminStepMedia';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminContentUploads from './pages/AdminContentUploads';
import AdminContentPlans from './pages/AdminContentPlans';
import ProtectedRoute from './components/ProtectedRoute';

import BookingCalendar from './pages/BookingCalendar';
import BookingPage from './pages/BookingPage';
import AdminBookingDashboard from './pages/AdminBookingDashboard';
import AdminBookingTypes from './pages/AdminBookingTypes';
import AdminAvailability from './pages/AdminAvailability';
import AdminKIManagerBookings from './pages/AdminKIManagerBookings';

import Events from './pages/Events';
import Blog from './pages/Blog';
import BlogKI from './pages/BlogKI';
import BlogWirkung from './pages/BlogWirkung';
import BlogNeuro from './pages/BlogNeuro';
import UeberMich from './pages/UeberMich';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import VonSchattenZuLicht from './pages/VonSchattenZuLicht';
import Buchprojekt from './pages/Buchprojekt';
import WorkbookGenerator from './pages/WorkbookGenerator';
import QuizGenerator from './pages/QuizGenerator';
import WirkungskraftQuiz from './pages/WirkungskraftQuiz';
import KarussellGenerator from './pages/KarussellGenerator';
import Generatoren from './pages/Generatoren';
import Abkuerzung1zu1 from './pages/Abkuerzung1zu1';
import KIManagerAusbildung from './pages/KIManagerAusbildung';
import KIHeyGenKurs from './pages/KIHeyGenKurs';
import KIWebseiteErlebnis from './pages/KIWebseiteErlebnis';
import KIEinsteigerCoaching from './pages/KIEinsteigerCoaching';
import KI1zu1 from './pages/KI1zu1';
import PremiumAngebote from './pages/PremiumAngebote';
import JahresContentplan from './pages/JahresContentplan';
import MeinePlaene from './pages/MeinePlaene';

import { StudentAuthProvider } from './contexts/StudentAuthContext';
import MemberLogin from './pages/MemberLogin';
import MemberDashboard from './pages/MemberDashboard';
import MemberCourseSelection from './pages/MemberCourseSelection';
import MemberCourses from './pages/MemberCourses';
import MemberLesson from './pages/MemberLesson';
import MemberQuiz from './pages/MemberQuiz';
import MemberQuizResult from './pages/MemberQuizResult';
import MemberFlashcards from './pages/MemberFlashcards';
import MemberFlashcardTrainer from './pages/MemberFlashcardTrainer';
import MemberProfile from './pages/MemberProfile';
import MemberAchievements from './pages/MemberAchievements';
import MemberForum from './pages/MemberForum';
import MemberSessions from './pages/MemberSessions';
import MemberProtectedRoute from './components/MemberProtectedRoute';
import AdminMemberCoursesList from './pages/AdminMemberCoursesList';
import AdminCourseWelcome from './pages/AdminCourseWelcome';
import AdminMemberCourses from './pages/AdminMemberCourses';
import AdminModuleEdit from './pages/AdminModuleEdit';
import AdminLessonEdit from './pages/AdminLessonEdit';
import AdminQuizEdit from './pages/AdminQuizEdit';
import AdminFlashcardEdit from './pages/AdminFlashcardEdit';
import AdminMemberStudents from './pages/AdminMemberStudents';
import AdminWelcomeContent from './pages/AdminWelcomeContent';
import AdminRecommendations from './pages/AdminRecommendations';
import AdminEvents from './pages/AdminEvents';
import AdminMentoring from './pages/AdminMentoring';
import AdminSiteContent from './pages/AdminSiteContent';
import MemberCertificate from './pages/MemberCertificate';
import AdminModuleBonusEdit from './pages/AdminModuleBonusEdit';
import AdminQuizList from './pages/AdminQuizList';
import AdminFlashcardList from './pages/AdminFlashcardList';
import AdminTakeawayList from './pages/AdminTakeawayList';
import AdminTakeawayEdit from './pages/AdminTakeawayEdit';
import AdminMiniTaskList from './pages/AdminMiniTaskList';
import AdminMiniTaskEdit from './pages/AdminMiniTaskEdit';
import AdminGapTextList from './pages/AdminGapTextList';
import AdminGapTextEdit from './pages/AdminGapTextEdit';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <StudentAuthProvider>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <BetaBanner />
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/claudia-ai" element={<ClaudiaAIBeta />} />
        <Route path="/newsletter" element={<Newsletter />} />
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
        <Route path="/ki-heygen-kurs" element={<KIHeyGenKurs />} />
        <Route path="/ki-webseite-erlebnis" element={<KIWebseiteErlebnis />} />
        <Route path="/ki-einsteiger-coaching" element={<KIEinsteigerCoaching />} />
        <Route path="/ki-1zu1" element={<KI1zu1 />} />
        <Route path="/premiumangebote" element={<PremiumAngebote />} />

        <Route path="/stimme-keynote" element={<StimmeKeynote />} />
        <Route path="/stimme-hochzeit" element={<StimmeHochzeit />} />
        <Route path="/stimme-trauer" element={<StimmeTrauer />} />
        <Route path="/stimme-voiceover" element={<StimmeVoiceover />} />

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
    </Router>
    </StudentAuthProvider>
  );
}

export default App;
