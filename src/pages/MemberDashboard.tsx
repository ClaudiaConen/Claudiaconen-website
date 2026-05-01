import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  Flame,
  Trophy,
  BookOpen,
  MessageSquare,
  Video,
  Award,
  Calendar,
  Target,
  Zap,
  ChevronRight,
  Bell,
  Lock,
} from 'lucide-react';

interface ModuleProgress {
  module_id: string;
  module_title: string;
  completion_percentage: number;
  lessons_completed: number;
  total_lessons: number;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: string;
  created_at: string;
}

interface UpcomingSession {
  id: string;
  title: string;
  session_date: string;
  duration_minutes: number;
}

export default function MemberDashboard() {
  const { student } = useStudentAuth();
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (student) {
      loadDashboardData();
    }
  }, [student]);

  const loadDashboardData = async () => {
    try {
      const [progressData, announcementsData, sessionsData, achievementsData] = await Promise.all([
        supabase
          .from('member_student_module_progress')
          .select(`
            module_id,
            completion_percentage,
            lessons_completed,
            total_lessons,
            member_course_modules (
              title
            )
          `)
          .eq('student_id', student?.id)
          .order('updated_at', { ascending: false })
          .limit(3),

        supabase
          .from('member_announcements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3),

        supabase
          .from('member_live_sessions')
          .select('*')
          .gte('session_date', new Date().toISOString())
          .order('session_date', { ascending: true })
          .limit(3),

        supabase
          .from('member_student_achievements')
          .select(`
            unlocked_at,
            member_achievements (
              title,
              icon_emoji,
              xp_reward
            )
          `)
          .eq('student_id', student?.id)
          .order('unlocked_at', { ascending: false })
          .limit(3),
      ]);

      if (progressData.data) {
        const formatted = progressData.data.map((p: any) => ({
          module_id: p.module_id,
          module_title: p.member_course_modules?.title || 'Unbekanntes Modul',
          completion_percentage: p.completion_percentage,
          lessons_completed: p.lessons_completed,
          total_lessons: p.total_lessons,
        }));
        setModuleProgress(formatted);
      }

      if (announcementsData.data) {
        setAnnouncements(announcementsData.data);
      }

      if (sessionsData.data) {
        setUpcomingSessions(sessionsData.data);
      }

      if (achievementsData.data) {
        setAchievements(achievementsData.data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelProgress = () => {
    if (!student) return 0;
    const xpForCurrentLevel = (student.level - 1) * 1000;
    const xpForNextLevel = student.level * 1000;
    const xpInCurrentLevel = student.totalXp - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Guten Morgen';
    if (hour < 18) return 'Guten Tag';
    return 'Guten Abend';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      {!student ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-blue-200">
            <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Bitte melde dich an
            </h3>
            <p className="text-slate-600 mb-6">
              Um auf dein Dashboard zuzugreifen, musst du dich mit deinem Student-Account anmelden.
            </p>
            <Link
              to="/member/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Zum Member-Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {getGreeting()}, {student.firstName}!
          </h1>
          <p className="text-slate-600">
            Bereit für deinen nächsten Lernschritt?
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{student.currentStreak}</span>
            </div>
            <h3 className="font-semibold mb-1">Tage Streak</h3>
            <p className="text-white/80 text-sm">Längster: {student.longestStreak} Tage</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{student.level}</span>
            </div>
            <h3 className="font-semibold mb-2">Level</h3>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${getLevelProgress()}%` }}
              />
            </div>
            <p className="text-white/80 text-xs mt-2">{student.totalXp} XP gesamt</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">{achievements.length}</span>
            </div>
            <h3 className="font-semibold mb-1">Achievements</h3>
            <p className="text-white/80 text-sm">Freigeschalten</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold">
                {moduleProgress.reduce((sum, m) => sum + m.lessons_completed, 0)}
              </span>
            </div>
            <h3 className="font-semibold mb-1">Lektionen</h3>
            <p className="text-white/80 text-sm">Abgeschlossen</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Deine Kurse</h2>
              <Link
                to="/member/courses"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 text-sm"
              >
                <span>Alle ansehen</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-100 rounded-xl h-24" />
                ))}
              </div>
            ) : moduleProgress.length > 0 ? (
              <div className="space-y-4">
                {moduleProgress.map((module) => (
                  <div
                    key={module.module_id}
                    className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                        {module.module_title}
                      </h3>
                      <span className="text-sm font-medium text-blue-600">
                        {Math.round(module.completion_percentage)}%
                      </span>
                    </div>
                    <div className="bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${module.completion_percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {module.lessons_completed} von {module.total_lessons} Lektionen abgeschlossen
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Noch keine Kurse gestartet</p>
                <Link
                  to="/member/courses"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  <span>Kurse entdecken</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900">Ankündigungen</h2>
              </div>

              {announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold text-slate-900 mb-1">{announcement.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{announcement.content}</p>
                      <span className="text-xs text-slate-400 mt-1 block">
                        {new Date(announcement.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">
                  Keine neuen Ankündigungen
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-slate-900">Live Sessions</h2>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{session.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Video className="w-4 h-4" />
                        <span>
                          {new Date(session.session_date).toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}{' '}
                          um{' '}
                          {new Date(session.session_date).toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">
                  Keine anstehenden Sessions
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/member/courses"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group"
          >
            <div className="bg-blue-100 rounded-full p-4 w-fit mb-4 group-hover:scale-110 transition">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Kurse</h3>
            <p className="text-slate-600 text-sm mb-4">
              Alle Kurse und Module im Überblick
            </p>
            <div className="flex items-center text-blue-600 font-medium">
              <span>Jetzt lernen</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/member/forum"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group"
          >
            <div className="bg-purple-100 rounded-full p-4 w-fit mb-4 group-hover:scale-110 transition">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Forum</h3>
            <p className="text-slate-600 text-sm mb-4">
              Diskutiere mit anderen Teilnehmern
            </p>
            <div className="flex items-center text-purple-600 font-medium">
              <span>Zum Forum</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/member/achievements"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group"
          >
            <div className="bg-amber-100 rounded-full p-4 w-fit mb-4 group-hover:scale-110 transition">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Achievements</h3>
            <p className="text-slate-600 text-sm mb-4">
              Deine Fortschritte und Erfolge
            </p>
            <div className="flex items-center text-amber-600 font-medium">
              <span>Ansehen</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            to="/member/buchprojekt"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase tracking-wider">
              Premiere
            </div>
            <div className="bg-pink-100 rounded-full p-4 w-fit mb-4 group-hover:scale-110 transition">
              <BookOpen className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Mein Buchprojekt</h3>
            <p className="text-slate-600 text-sm mb-4">
              Status meiner Hauptbuch-Anmeldung
            </p>
            <div className="flex items-center text-pink-600 font-medium">
              <span>Anzeigen</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </div>
      )}
    </div>
  );
}
