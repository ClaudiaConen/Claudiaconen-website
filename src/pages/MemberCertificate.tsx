import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import CertificateGenerator from '../components/CertificateGenerator';
import {
  Award,
  CheckCircle2,
  Loader2,
  Trophy,
  Star,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';

interface CourseProgress {
  total_modules: number;
  completed_modules: number;
  total_lessons: number;
  completed_lessons: number;
  completion_percentage: number;
}

export default function MemberCertificate() {
  const { student } = useStudentAuth();
  const [courseProgress, setCourseProgress] = useState<CourseProgress>({
    total_modules: 0,
    completed_modules: 0,
    total_lessons: 0,
    completed_lessons: 0,
    completion_percentage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { count: totalModules } = await supabase
        .from('member_course_modules')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

      const { count: totalLessons } = await supabase
        .from('member_course_lessons')
        .select('*', { count: 'exact', head: true })
        .eq('is_published', true);

      const { data: completedLessons } = await supabase
        .from('member_student_lesson_progress')
        .select('lesson_id')
        .eq('student_id', student?.id)
        .eq('is_completed', true);

      const completedLessonIds = completedLessons?.map((l) => l.lesson_id) || [];

      const { data: modules } = await supabase
        .from('member_course_modules')
        .select('id')
        .eq('is_published', true);

      let completedModulesCount = 0;

      for (const module of modules || []) {
        const { data: moduleLessons } = await supabase
          .from('member_course_lessons')
          .select('id')
          .eq('module_id', module.id)
          .eq('is_published', true);

        const allLessonsCompleted = moduleLessons?.every((lesson) =>
          completedLessonIds.includes(lesson.id)
        );

        if (allLessonsCompleted && moduleLessons && moduleLessons.length > 0) {
          completedModulesCount++;
        }
      }

      const completionPercentage =
        totalLessons && totalLessons > 0
          ? Math.round((completedLessons?.length || 0 / totalLessons) * 100)
          : 0;

      setCourseProgress({
        total_modules: totalModules || 0,
        completed_modules: completedModulesCount,
        total_lessons: totalLessons || 0,
        completed_lessons: completedLessons?.length || 0,
        completion_percentage: completionPercentage,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isCourseCompleted =
    courseProgress.total_lessons > 0 &&
    courseProgress.completed_lessons >= courseProgress.total_lessons;

  const certificateNumber = student?.id
    ? `KIM-${new Date().getFullYear()}-${student.id.substring(0, 8).toUpperCase()}`
    : '';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <MemberNavigation />
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/member/dashboard"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zum Dashboard</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Dein Zertifikat</h1>
            <p className="text-slate-600">
              Dein Nachweis für die erfolgreiche Teilnahme an der KI-Manager Ausbildung
            </p>
          </div>

          {!isCourseCompleted ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 rounded-lg p-3">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900 mb-2">
                    Noch nicht abgeschlossen
                  </h3>
                  <p className="text-amber-800 mb-4">
                    Um dein Zertifikat zu erhalten, musst du alle Lektionen erfolgreich
                    abschließen.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm text-amber-900 mb-1">
                        <span>Fortschritt</span>
                        <span>{courseProgress.completion_percentage}%</span>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-3">
                        <div
                          className="bg-amber-600 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${courseProgress.completion_percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-2xl font-bold text-amber-600">
                          {courseProgress.completed_lessons}/{courseProgress.total_lessons}
                        </p>
                        <p className="text-xs text-amber-800">Lektionen</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-2xl font-bold text-amber-600">
                          {courseProgress.completed_modules}/{courseProgress.total_modules}
                        </p>
                        <p className="text-xs text-amber-800">Module</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-green-900 mb-2">
                    Glückwunsch! Kurs abgeschlossen!
                  </h3>
                  <p className="text-green-800 mb-4">
                    Du hast alle {courseProgress.total_lessons} Lektionen erfolgreich
                    abgeschlossen und kannst nun dein Zertifikat herunterladen.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-green-800">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{courseProgress.total_modules} Module</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{courseProgress.total_lessons} Lektionen</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5" />
                      <span>Level {student?.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isCourseCompleted && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Zertifikat für
                </h3>
                <p className="text-xl text-slate-700 mb-4">
                  {student ? `${student.firstName} ${student.lastName}` : ''}
                </p>
                <p className="text-slate-600 mb-1">KI-Manager Ausbildung</p>
                <p className="text-sm text-slate-500">
                  Zertifikatsnummer: {certificateNumber}
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <CertificateGenerator
                  studentName={student ? `${student.firstName} ${student.lastName}` : 'Teilnehmer'}
                  courseName="KI-Manager Ausbildung"
                  completionDate={new Date().toISOString()}
                  certificateNumber={certificateNumber}
                  onGenerate={() => setCertificateGenerated(true)}
                />

                {certificateGenerated && (
                  <p className="text-sm text-green-600 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Zertifikat wurde heruntergeladen!</span>
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
                <p>
                  <strong>Hinweis:</strong> Dein Zertifikat bestätigt die erfolgreiche
                  Teilnahme an der KI-Manager Ausbildung bei Claudia Conen. Das Zertifikat
                  kann für berufliche Weiterbildung und Karriereentwicklung verwendet werden.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Deine Erfolge</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-3">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">{student?.totalXp}</p>
              <p className="text-sm text-blue-900">Gesamt XP</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-200 rounded-full mb-3">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">{student?.level}</p>
              <p className="text-sm text-purple-900">Level</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-200 rounded-full mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-1">
                {courseProgress.completed_lessons}
              </p>
              <p className="text-sm text-green-900">Lektionen abgeschlossen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
