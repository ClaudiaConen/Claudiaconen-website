import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Users,
  Clock,
  Home,
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
  created_at: string;
  module_count?: number;
}

export default function AdminMemberCoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    thumbnail_url: '',
    difficulty: 'Einsteiger',
    instructor_name: 'Claudia Conen',
    total_duration_minutes: 0,
    is_published: false,
    order_index: 1,
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('member_courses')
        .select(`
          *,
          member_course_modules (count)
        `)
        .order('order_index', { ascending: true });

      if (error) throw error;

      const formattedCourses = data.map((course: any) => ({
        ...course,
        module_count: course.member_course_modules?.[0]?.count || 0,
      }));

      setCourses(formattedCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCourse) {
        const { error } = await supabase
          .from('member_courses')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingCourse.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('member_courses')
          .insert([formData]);

        if (error) throw error;
      }

      setShowModal(false);
      setEditingCourse(null);
      resetForm();
      loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Fehler beim Speichern des Kurses');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      slug: course.slug,
      description: course.description,
      thumbnail_url: course.thumbnail_url || '',
      difficulty: course.difficulty,
      instructor_name: course.instructor_name,
      total_duration_minutes: course.total_duration_minutes,
      is_published: course.is_published,
      order_index: course.order_index,
    });
    setShowModal(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Möchtest du diesen Kurs wirklich löschen? Alle zugehörigen Module werden ebenfalls gelöscht.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('member_courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Fehler beim Löschen des Kurses');
    }
  };

  const togglePublished = async (courseId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('member_courses')
        .update({ is_published: !currentState })
        .eq('id', courseId);

      if (error) throw error;
      loadCourses();
    } catch (error) {
      console.error('Error toggling published state:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      thumbnail_url: '',
      difficulty: 'Einsteiger',
      instructor_name: 'Claudia Conen',
      total_duration_minutes: 0,
      is_published: false,
      order_index: courses.length + 1,
    });
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kursverwaltung</h1>
              <p className="text-gray-600">Verwalte alle verfügbaren Kurse</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingCourse(null);
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Neuer Kurs
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Noch keine Kurse</h3>
            <p className="text-gray-600 mb-6">Erstelle deinen ersten Kurs</p>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Neuer Kurs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>

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
                          {Math.floor(course.total_duration_minutes / 60)}h {course.total_duration_minutes % 60}min
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => togglePublished(course.id, course.is_published)}
                      className={`ml-4 p-2 rounded-lg transition-colors ${
                        course.is_published
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={course.is_published ? 'Veröffentlicht' : 'Nicht veröffentlicht'}
                    >
                      {course.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Users className="w-4 h-4" />
                    <span>{course.instructor_name}</span>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Bearbeiten
                      </button>
                      <Link
                        to={`/admin/member-courses/${course.id}/welcome`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                      >
                        <Home className="w-4 h-4" />
                        Willkommen
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/member-courses/${course.id}/modules`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                      >
                        <BookOpen className="w-4 h-4" />
                        Module
                      </Link>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Löschen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCourse ? 'Kurs bearbeiten' : 'Neuer Kurs'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kurstitel *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="z.B. ki-manager-ausbildung"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schwierigkeitsgrad *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Einsteiger">Einsteiger</option>
                    <option value="Fortgeschritten">Fortgeschritten</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reihenfolge *
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dozent *
                  </label>
                  <input
                    type="text"
                    value={formData.instructor_name}
                    onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gesamtdauer (Minuten)
                  </label>
                  <input
                    type="number"
                    value={formData.total_duration_minutes}
                    onChange={(e) => setFormData({ ...formData, total_duration_minutes: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                  Kurs veröffentlichen
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCourse(null);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  {editingCourse ? 'Speichern' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
