import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import MemberWelcomeSection from '../components/MemberWelcomeSection';
import CourseWelcomeSection from '../components/CourseWelcomeSection';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Award,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Home,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  is_published: boolean;
  lessons: Lesson[];
  progress?: {
    completion_percentage: number;
    lessons_completed: number;
    total_lessons: number;
  };
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order_index: number;
  video_url: string | null;
  video_duration_seconds: number | null;
  xp_reward: number;
  is_completed?: boolean;
  completion_percentage?: number;
}

export default function MemberCourses() {
  const { courseId } = useParams<{ courseId: string }>();
  const { student } = useStudentAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, [student, courseId]);

  const loadCourses = async () => {
    try {
      if (!student || !courseId) {
        setIsLoading(false);
        return;
      }

      const { data: courseData, error: courseError } = await supabase
        .from('member_courses')
        .select('id, title, description')
        .eq('id', courseId)
        .eq('is_published', true)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      const { data: modulesData, error: modulesError } = await supabase
        .from('member_course_modules')
        .select(`
          *,
          member_course_lessons (
            id,
            title,
            description,
            order_index,
            video_url,
            video_duration_seconds,
            xp_reward,
            is_published
          )
        `)
        .eq('course_id', courseId)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (modulesError) throw modulesError;

      const { data: progressData } = await supabase
        .from('member_student_module_progress')
        .select('*')
        .eq('student_id', student?.id);

      const { data: lessonProgressData } = await supabase
        .from('member_student_lesson_progress')
        .select('*')
        .eq('student_id', student?.id);

      const lessonProgressMap = new Map(
        lessonProgressData?.map((p) => [p.lesson_id, p]) || []
      );

      const progressMap = new Map(progressData?.map((p) => [p.module_id, p]) || []);

      const formattedModules: Module[] = modulesData.map((module: any) => {
        const lessons = (module.member_course_lessons || [])
          .filter((lesson: any) => lesson.is_published === true)
          .map((lesson: any) => {
            const progress = lessonProgressMap.get(lesson.id);
            return {
              ...lesson,
              is_completed: progress?.is_completed || false,
              completion_percentage: progress?.completion_percentage || 0,
            };
          })
          .sort((a: Lesson, b: Lesson) => a.order_index - b.order_index);

        const progress = progressMap.get(module.id);

        return {
          id: module.id,
          title: module.title,
          description: module.description,
          order_index: module.order_index,
          is_published: module.is_published,
          lessons,
          progress: progress
            ? {
                completion_percentage: progress.completion_percentage,
                lessons_completed: progress.lessons_completed,
                total_lessons: progress.total_lessons,
              }
            : {
                completion_percentage: 0,
                lessons_completed: 0,
                total_lessons: lessons.length,
              },
        };
      });

      setModules(formattedModules);

      if (formattedModules.length > 0) {
        setExpandedModules(new Set([formattedModules[0].id]));
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link to="/member/dashboard" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/member/courses" className="hover:text-blue-600 transition-colors">
              Kurse
            </Link>
            {course && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">{course.title}</span>
              </>
            )}
          </nav>

          <Link
            to="/member/courses"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Kursauswahl
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {course?.title || 'Deine Kurse'}
          </h1>
          <p className="text-slate-600">
            {course?.description || 'Lerne in deinem eigenen Tempo und sammle XP für jeden Abschluss'}
          </p>
        </div>

        {courseId === undefined && <MemberWelcomeSection />}
        {courseId && student && <CourseWelcomeSection courseId={courseId} section="intro" />}

        {!student ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-blue-200">
            <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Bitte melde dich an
            </h3>
            <p className="text-slate-600 mb-6">
              Um auf die Kursinhalte zuzugreifen, musst du dich mit deinem Student-Account anmelden.
            </p>
            <Link
              to="/member/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Zum Member-Login
            </Link>
          </div>
        ) : isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : modules.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Noch keine Kurse verfügbar
            </h3>
            <p className="text-slate-600">
              Die Kursinhalte werden in Kürze freigeschaltet.
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-2">
            {modules.map((module) => {
              const isExpanded = expandedModules.has(module.id);
              const progress = module.progress || {
                completion_percentage: 0,
                lessons_completed: 0,
                total_lessons: module.lessons.length,
              };

              return (
                <div
                  key={module.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div
                    onClick={() => toggleModule(module.id)}
                    className="p-6 cursor-pointer hover:bg-slate-50 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                          {module.title}
                        </h2>
                        <p className="text-slate-600">{module.description}</p>
                      </div>
                      <button className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition">
                        <ChevronDown
                          className={`w-6 h-6 text-slate-600 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {progress.lessons_completed} / {progress.total_lessons} Lektionen
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-600 text-xs">Fortschritt</span>
                          <span className="text-blue-600 font-medium text-xs">
                            {Math.round(progress.completion_percentage)}%
                          </span>
                        </div>
                        <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progress.completion_percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50">
                      <div className="p-6 space-y-3">
                        {module.lessons.map((lesson, index) => {
                          const isLocked = index > 0 && !module.lessons[index - 1].is_completed;

                          return (
                            <Link
                              key={lesson.id}
                              to={isLocked ? '#' : `/member/lesson/${lesson.id}`}
                              className={`block bg-white rounded-xl p-4 border-2 transition ${
                                isLocked
                                  ? 'border-slate-200 opacity-50 cursor-not-allowed'
                                  : lesson.is_completed
                                  ? 'border-green-200 hover:border-green-300 hover:shadow-md'
                                  : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                              }`}
                              onClick={(e) => isLocked && e.preventDefault()}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1">
                                  <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                      lesson.is_completed
                                        ? 'bg-green-100'
                                        : isLocked
                                        ? 'bg-slate-100'
                                        : 'bg-blue-100'
                                    }`}
                                  >
                                    {lesson.is_completed ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    ) : isLocked ? (
                                      <Lock className="w-5 h-5 text-slate-400" />
                                    ) : (
                                      <Play className="w-5 h-5 text-blue-600" />
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 mb-1">
                                      {lesson.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 line-clamp-1">
                                      {lesson.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-slate-600">
                                  {lesson.video_duration_seconds && (
                                    <div className="flex items-center space-x-1">
                                      <Clock className="w-4 h-4" />
                                      <span>{formatDuration(lesson.video_duration_seconds)}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center space-x-1 text-amber-600">
                                    <Award className="w-4 h-4" />
                                    <span>{lesson.xp_reward} XP</span>
                                  </div>
                                  {!isLocked && <ChevronRight className="w-5 h-5 text-slate-400" />}
                                </div>
                              </div>

                              {!lesson.is_completed && (lesson.completion_percentage ?? 0) > 0 && (
                                <div className="mt-3">
                                  <div className="bg-slate-100 rounded-full h-1 overflow-hidden">
                                    <div
                                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                      style={{ width: `${lesson.completion_percentage}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {courseId && student && <CourseWelcomeSection courseId={courseId} section="cards" />}
      </div>
    </div>
  );
}
