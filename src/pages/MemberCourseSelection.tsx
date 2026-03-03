import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string | null;
  difficulty: string;
  instructor_name: string;
  total_duration_minutes: number;
  is_published: boolean;
  order_index: number;
  module_count?: number;
  progress?: {
    completion_percentage: number;
    completed_modules: number;
    total_modules: number;
    started_at: string | null;
  };
}

export default function MemberCourseSelection() {
  const { student } = useStudentAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'not-started'>('all');

  useEffect(() => {
    loadCourses();
  }, [student]);

  const loadCourses = async () => {
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from('member_courses')
        .select(`
          *,
          member_course_modules (count)
        `)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (coursesError) throw coursesError;

      let progressData = null;
      if (student) {
        const { data } = await supabase
          .from('member_student_course_progress')
          .select('*')
          .eq('student_id', student.id);
        progressData = data;
      }

      const progressMap = new Map(
        progressData?.map((p) => [p.course_id, p]) || []
      );

      const formattedCourses: Course[] = coursesData.map((course: any) => {
        const progress = progressMap.get(course.id);
        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          thumbnail_url: course.thumbnail_url,
          difficulty: course.difficulty,
          instructor_name: course.instructor_name,
          total_duration_minutes: course.total_duration_minutes,
          is_published: course.is_published,
          order_index: course.order_index,
          module_count: course.member_course_modules?.[0]?.count || 0,
          progress: progress
            ? {
                completion_percentage: progress.completion_percentage,
                completed_modules: progress.completed_modules,
                total_modules: progress.total_modules,
                started_at: progress.started_at,
              }
            : undefined,
        };
      });

      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einsteiger':
        return 'bg-green-100 text-green-700';
      case 'Fortgeschritten':
        return 'bg-yellow-100 text-yellow-700';
      case 'Expert':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    }
    return `${mins}min`;
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === 'in-progress') {
      return course.progress && course.progress.completion_percentage > 0 && course.progress.completion_percentage < 100;
    }
    if (filter === 'not-started') {
      return !course.progress;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <MemberNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <MemberNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Kursauswahl</h1>
              <p className="text-lg text-gray-600 mt-1">
                Wähle einen Kurs und starte deine Lernreise
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Alle Kurse
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'in-progress'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              In Bearbeitung
            </button>
            <button
              onClick={() => setFilter('not-started')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'not-started'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Noch nicht gestartet
            </button>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Keine Kurse gefunden
            </h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'Derzeit sind keine Kurse verfügbar.'
                : filter === 'in-progress'
                ? 'Du hast noch keine Kurse in Bearbeitung.'
                : 'Alle Kurse wurden bereits gestartet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/member/courses/${course.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 overflow-hidden">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-20 h-20 text-white opacity-50" />
                    </div>
                  )}

                  {course.progress && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-blue-600">
                        {course.progress.completion_percentage}% abgeschlossen
                      </span>
                    </div>
                  )}

                  {!course.progress && (
                    <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-sm font-semibold text-white flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Neu
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.module_count} Module
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(course.total_duration_minutes)}
                    </span>
                  </div>

                  {course.progress ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Fortschritt</span>
                        <span className="font-semibold text-gray-900">
                          {course.progress.completed_modules} / {course.progress.total_modules} Module
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${course.progress.completion_percentage}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                      <Award className="w-5 h-5" />
                      <span>Kurs starten</span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {course.instructor_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{course.instructor_name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
