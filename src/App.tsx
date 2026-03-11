import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BetaBanner from './components/BetaBanner';
import Home from './pages/Home';
import Newsletter from './pages/Newsletter';
import RednerAusbildungen from './pages/RednerAusbildungen';

import UnternehmenKeynotes from './pages/UnternehmenKeynotes';
import UnternehmenLeadership from './pages/UnternehmenLeadership';

import SpeakerSocial from './pages/SpeakerSocial';
import SpeakerTraining from './pages/SpeakerTraining';

import Mentoring from './pages/Mentoring';
import Events from './pages/Events';
import GabiLindemann from './pages/GabiLindemann';

import AusbildungBeruf from './pages/AusbildungBeruf';
import AusbildungZertifizierung from './pages/AusbildungZertifizierung';

import StimmeKeynote from './pages/StimmeKeynote';
import StimmeHochzeit from './pages/StimmeHochzeit';
import StimmeTrauer from './pages/StimmeTrauer';
import StimmeVoiceover from './pages/StimmeVoiceover';

import Wissensbibliothek from './pages/Wissensbibliothek';
import ChecklistBestaetigung from './pages/ChecklistBestaetigung';
import LinkedInFreebie from './pages/LinkedInFreebie';
import LinkedInFreebieConfirmed from './pages/LinkedInFreebieConfirmed';

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

import Blog from './pages/Blog';
import BlogKI from './pages/BlogKI';
import BlogWirkung from './pages/BlogWirkung';
import BlogNeuro from './pages/BlogNeuro';
import UeberMich from './pages/UeberMich';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import VonSchattenZuLicht from './pages/VonSchattenZuLicht';
import WorkbookGenerator from './pages/WorkbookGenerator';
import QuizGenerator from './pages/QuizGenerator';
import WirkungskraftQuiz from './pages/WirkungskraftQuiz';
import KarussellGenerator from './pages/KarussellGenerator';
import Generatoren from './pages/Generatoren';
import KIManagerAusbildung from './pages/KIManagerAusbildung';
import KIHeyGenKurs from './pages/KIHeyGenKurs';
import KIWebseiteErlebnis from './pages/KIWebseiteErlebnis';
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
import MemberCertificate from './pages/MemberCertificate';
import AdminModuleBonusEdit from './pages/AdminModuleBonusEdit';
import AdminQuizList from './pages/AdminQuizList';
import AdminFlashcardList from './pages/AdminFlashcardList';
import AdminTakeawayList from './pages/AdminTakeawayList';
import AdminTakeawayEdit from './pages/AdminTakeawayEdit';
import AdminMiniTaskList from './pages/AdminMiniTaskList';
import AdminMiniTaskEdit from './pages/AdminMiniTaskEdit';
import AdminEvents from './pages/AdminEvents';
import AdminMentoring from './pages/AdminMentoring';
import AdminSiteContent from './pages/AdminSiteContent';
import KiTrifftHerz from './pages/KiTrifftHerz';
import ZuDrittGewinnErzeugen from './pages/ZuDrittGewinnErzeugen';
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
          {/* === Hauptseiten === */}
          <Route path="/" element={<Home />} />
          <Route path="/mentoring" element={<Mentoring />} />
          <Route path="/events" element={<Events />} />
          <Route path="/kooperationen/gabi-lindemann" element={<GabiLindemann />} />
          <Route path="/newsletter" element={<Newsletter />} />

          {/* === Angebote (aktive Seiten) === */}
          <Route path="/unternehmen-keynotes" element={<UnternehmenKeynotes />} />
          <Route path="/unternehmen-leadership" element={<UnternehmenLeadership />} />
          <Route path="/speaker-social" element={<SpeakerSocial />} />
          <Route path="/speaker-training" element={<SpeakerTraining />} />
          <Route path="/ki-manager-ausbildung" element={<KIManagerAusbildung />} />
          <Route path="/ki-heygen-kurs" element={<KIHeyGenKurs />} />
          <Route path="/ki-webseite-erlebnis" element={<KIWebseiteErlebnis />} />
          <Route path="/redner-ausbildungen" element={<RednerAusbildungen />} />
          <Route path="/ausbildung-beruf" element={<AusbildungBeruf />} />
          <Route path="/ausbildung-zertifizierung" element={<AusbildungZertifizierung />} />

          {/* === Stimme === */}
          <Route path="/stimme-keynote" element={<StimmeKeynote />} />
          <Route path="/stimme-hochzeit" element={<StimmeHochzeit />} />
          <Route path="/stimme-trauer" element={<StimmeTrauer />} />
          <Route path="/stimme-voiceover" element={<StimmeVoiceover />} />

          {/* === Wissen & Blog === */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-ki" element={<BlogKI />} />
          <Route path="/blog-wirkung" element={<BlogWirkung />} />
          <Route path="/blog-neuro" element={<BlogNeuro />} />
          <Route path="/wissensbibliothek" element={<Wissensbibliothek />} />

          {/* === Über Claudia === */}
          <Route path="/ueber-mich" element={<UeberMich />} />
          <Route path="/von-schatten-zu-licht" element={<VonSchattenZuLicht />} />

          {/* === Tools & Generatoren === */}
          <Route path="/generatoren" element={<Generatoren />} />
          <Route path="/workbook-generator" element={<WorkbookGenerator />} />
          <Route path="/quiz-generator" element={<QuizGenerator />} />
          <Route path="/wirkungskraft-quiz" element={<WirkungskraftQuiz />} />
          <Route path="/karussell-generator" element={<KarussellGenerator />} />
          <Route path="/jahres-contentplan" element={<JahresContentplan />} />
          <Route path="/meine-plaene" element={<MeinePlaene />} />

          {/* === Sonstiges === */}
          <Route path="/checklist-bestaetigung" element={<ChecklistBestaetigung />} />
          <Route path="/linkedin-freebie" element={<LinkedInFreebie />} />
          <Route path="/linkedin-freebie-confirmed" element={<LinkedInFreebieConfirmed />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/ki-trifft-herz" element={<KiTrifftHerz />} />
          <Route path="/zu-dritt-gewinn-erzeugen" element={<ZuDrittGewinnErzeugen />} />

          {/* === Adventskalender === */}
          <Route path="/adventskalender" element={<AdventLanding />} />
          <Route path="/adventskalender/kalender" element={<AdventCalendar />} />
          <Route path="/adventskalender/tuerchen/:doorNumber" element={<AdventDoor />} />

          {/* === Booking === */}
          <Route path="/termin-buchen" element={<BookingCalendar />} />
          <Route path="/buchen/:typeSlug" element={<BookingPage />} />

          {/* === Member-Bereich === */}
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

          {/* === Admin === */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/passwort-vergessen" element={<AdminPasswordResetRequest />} />
          <Route path="/admin/passwort-zuruecksetzen" element={<AdminPasswordReset />} />
          {/* Dashboard – immer sichtbar fuer eingeloggte Admins */}
          <Route path="/admin" element={<ProtectedRoute requiredSection="dashboard"><AdminDashboard /></ProtectedRoute>} />

          {/* Kursverwaltung */}
          <Route path="/admin/member-studenten" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMemberStudents /></ProtectedRoute>} />
          <Route path="/admin/member-courses-list" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMemberCoursesList /></ProtectedRoute>} />
          <Route path="/admin/member-courses/:courseId/welcome" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminCourseWelcome /></ProtectedRoute>} />
          <Route path="/admin/member-courses/:courseId/modules" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMemberCourses /></ProtectedRoute>} />
          <Route path="/admin/member-kurse" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMemberCourses /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/modul/:moduleId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminModuleEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/modul/:moduleId/bonus" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminModuleBonusEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/modul/:moduleId/lektion/:lessonId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminLessonEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/quiz/:quizId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminQuizEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/flashcards/:deckId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminFlashcardEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/takeaway/:takeawayId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminTakeawayEdit /></ProtectedRoute>} />
          <Route path="/admin/member-kurse/miniaufgabe/:taskId" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMiniTaskEdit /></ProtectedRoute>} />
          <Route path="/admin/member-quizze" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminQuizList /></ProtectedRoute>} />
          <Route path="/admin/member-flashcards" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminFlashcardList /></ProtectedRoute>} />
          <Route path="/admin/member-takeaways" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminTakeawayList /></ProtectedRoute>} />
          <Route path="/admin/member-miniaufgaben" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminMiniTaskList /></ProtectedRoute>} />
          <Route path="/admin/willkommen" element={<ProtectedRoute requiredSection="kursverwaltung"><AdminWelcomeContent /></ProtectedRoute>} />

          {/* Terminverwaltung */}
          <Route path="/admin/buchungen" element={<ProtectedRoute requiredSection="terminverwaltung"><AdminBookingDashboard /></ProtectedRoute>} />
          <Route path="/admin/termintypen" element={<ProtectedRoute requiredSection="terminverwaltung"><AdminBookingTypes /></ProtectedRoute>} />
          <Route path="/admin/verfuegbarkeit" element={<ProtectedRoute requiredSection="terminverwaltung"><AdminAvailability /></ProtectedRoute>} />
          <Route path="/admin/ki-manager-anmeldungen" element={<ProtectedRoute requiredSection="terminverwaltung"><AdminKIManagerBookings /></ProtectedRoute>} />

          {/* Inhalte */}
          <Route path="/admin/seiteninhalte" element={<ProtectedRoute requiredSection="inhalte"><AdminSiteContent /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute requiredSection="inhalte"><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/mentoring" element={<ProtectedRoute requiredSection="inhalte"><AdminMentoring /></ProtectedRoute>} />
          <Route path="/admin/adventskalender" element={<ProtectedRoute requiredSection="inhalte"><AdminAdventDashboard /></ProtectedRoute>} />
          <Route path="/admin/adventskalender/bearbeiten/:doorNumber" element={<ProtectedRoute requiredSection="inhalte"><AdminAdventDoorEdit /></ProtectedRoute>} />
          <Route path="/admin/schritte-media" element={<ProtectedRoute requiredSection="inhalte"><AdminStepMedia /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute requiredSection="inhalte"><AdminTestimonials /></ProtectedRoute>} />

          {/* Verwaltung */}
          <Route path="/admin/benutzer" element={<ProtectedRoute requiredSection="verwaltung"><AdminUserManagement /></ProtectedRoute>} />
          <Route path="/admin/content-uploads" element={<ProtectedRoute requiredSection="verwaltung"><AdminContentUploads /></ProtectedRoute>} />
          <Route path="/admin/content-plaene" element={<ProtectedRoute requiredSection="verwaltung"><AdminContentPlans /></ProtectedRoute>} />
          <Route path="/admin/empfehlungen" element={<ProtectedRoute requiredSection="verwaltung"><AdminRecommendations /></ProtectedRoute>} />

          {/* === Redirects: Alte Mentoring-URLs → /mentoring === */}
          <Route path="/1-zu-1-mentoring" element={<Navigate to="/mentoring" replace />} />
          <Route path="/mentoring-transformation" element={<Navigate to="/mentoring" replace />} />
          <Route path="/mentoring-gold" element={<Navigate to="/mentoring" replace />} />
          <Route path="/mentoring-online" element={<Navigate to="/mentoring" replace />} />
          <Route path="/ki-einsteiger-coaching" element={<Navigate to="/mentoring" replace />} />
          <Route path="/ki-1zu1" element={<Navigate to="/mentoring" replace />} />
          <Route path="/marke-und-positionierung" element={<Navigate to="/mentoring" replace />} />
          <Route path="/immer-da-wo-du-bist" element={<Navigate to="/mentoring" replace />} />
          <Route path="/1zu1-abkuerzung-dezember" element={<Navigate to="/mentoring" replace />} />
          <Route path="/premiumangebote" element={<Navigate to="/mentoring" replace />} />

          {/* === Redirects: Alte Speaker-URLs → /speaker-training === */}
          <Route path="/speaker-positionierung" element={<Navigate to="/speaker-training" replace />} />
          <Route path="/speaker-storytelling" element={<Navigate to="/speaker-training" replace />} />
          <Route path="/speaker-buehne" element={<Navigate to="/speaker-training" replace />} />
          <Route path="/keynote-und-buehnenperformance" element={<Navigate to="/speaker-training" replace />} />

          {/* === Redirects: Alte Unternehmen-URLs === */}
          <Route path="/unternehmen-selling" element={<Navigate to="/unternehmen-keynotes" replace />} />
          <Route path="/unternehmen-events" element={<Navigate to="/events" replace />} />

          {/* === Redirects: Alte Wissen/Blog-URLs === */}
          <Route path="/wissen-to-go" element={<Navigate to="/blog" replace />} />
          <Route path="/wissen-community" element={<Navigate to="/blog" replace />} />
          <Route path="/wissen-webinare" element={<Navigate to="/events" replace />} />
          <Route path="/wissen-telegram" element={<Navigate to="/blog" replace />} />
          <Route path="/wissen-whatsapp" element={<Navigate to="/blog" replace />} />
          <Route path="/social-media-wirkung" element={<Navigate to="/blog" replace />} />
          <Route path="/wissensmagazin" element={<Navigate to="/wissensbibliothek" replace />} />
          <Route path="/experten" element={<Navigate to="/blog" replace />} />
          <Route path="/claudia-ai" element={<Navigate to="/blog" replace />} />

          {/* === 404 === */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </StudentAuthProvider>
  );
}

export default App;
