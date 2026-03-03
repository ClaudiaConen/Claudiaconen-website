import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';
import {
  Home,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Sparkles,
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
}

interface WelcomeContent {
  id: string;
  title: string;
  description: string;
  video_url: string | null;
  video_platform: string | null;
  order_index: number;
}

interface WelcomeCard {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  link_url: string | null;
  link_text: string | null;
  order_index: number;
}

const iconOptions = [
  'BookOpen', 'Target', 'Award', 'Users', 'Sparkles', 'Zap',
  'TrendingUp', 'Heart', 'Star', 'Lightbulb', 'Rocket', 'Trophy',
  'CheckCircle', 'Play', 'Video', 'MessageSquare', 'Calendar'
];

export default function AdminCourseWelcome() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent[]>([]);
  const [welcomeCards, setWelcomeCards] = useState<WelcomeCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<WelcomeContent | null>(null);
  const [editingCard, setEditingCard] = useState<WelcomeCard | null>(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const [contentForm, setContentForm] = useState({
    title: '',
    description: '',
    video_url: '',
    video_platform: 'vimeo',
    order_index: 1,
  });

  const [cardForm, setCardForm] = useState({
    title: '',
    description: '',
    icon_name: 'Sparkles',
    link_url: '',
    link_text: '',
    order_index: 1,
  });

  useEffect(() => {
    if (courseId) {
      loadData();
    }
  }, [courseId]);

  const loadData = async () => {
    try {
      const [courseResult, contentResult, cardsResult] = await Promise.all([
        supabase.from('member_courses').select('id, title').eq('id', courseId!).single(),
        supabase.from('member_course_welcome_content').select('*').eq('course_id', courseId!).order('order_index'),
        supabase.from('member_course_welcome_cards').select('*').eq('course_id', courseId!).order('order_index')
      ]);

      if (courseResult.data) setCourse(courseResult.data);
      if (contentResult.data) setWelcomeContent(contentResult.data);
      if (cardsResult.data) setWelcomeCards(cardsResult.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contentData = {
        title: contentForm.title,
        description: contentForm.description,
        video_url: contentForm.video_url || null,
        video_platform: contentForm.video_url ? contentForm.video_platform : null,
        order_index: contentForm.order_index,
      };

      if (editingContent) {
        const { error } = await supabase
          .from('member_course_welcome_content')
          .update({
            ...contentData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingContent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('member_course_welcome_content')
          .insert([{
            course_id: courseId,
            ...contentData
          }]);

        if (error) throw error;
      }

      setShowContentModal(false);
      setEditingContent(null);
      resetContentForm();
      loadData();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cardData = {
        ...cardForm,
        link_url: cardForm.link_url || null,
        link_text: cardForm.link_text || null,
      };

      if (editingCard) {
        const { error } = await supabase
          .from('member_course_welcome_cards')
          .update({
            ...cardData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCard.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('member_course_welcome_cards')
          .insert([{
            course_id: courseId,
            ...cardData
          }]);

        if (error) throw error;
      }

      setShowCardModal(false);
      setEditingCard(null);
      resetCardForm();
      loadData();
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm('Möchtest du diesen Inhalt wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('member_course_welcome_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Fehler beim Löschen');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Möchtest du diese Karte wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('member_course_welcome_cards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadData();
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Fehler beim Löschen');
    }
  };

  const handleEditContent = (content: WelcomeContent) => {
    setEditingContent(content);
    setContentForm({
      title: content.title,
      description: content.description,
      video_url: content.video_url || '',
      video_platform: content.video_platform || 'vimeo',
      order_index: content.order_index,
    });
    setShowContentModal(true);
  };

  const handleEditCard = (card: WelcomeCard) => {
    setEditingCard(card);
    setCardForm({
      title: card.title,
      description: card.description,
      icon_name: card.icon_name,
      link_url: card.link_url || '',
      link_text: card.link_text || '',
      order_index: card.order_index,
    });
    setShowCardModal(true);
  };

  const resetContentForm = () => {
    setContentForm({
      title: '',
      description: '',
      video_url: '',
      video_platform: 'vimeo',
      order_index: welcomeContent.length + 1,
    });
  };

  const resetCardForm = () => {
    setCardForm({
      title: '',
      description: '',
      icon_name: 'Sparkles',
      link_url: '',
      link_text: '',
      order_index: welcomeCards.length + 1,
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Willkommensbereich</h1>
            <p className="text-gray-600">{course?.title}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Willkommenstext</h2>
            <button
              onClick={() => {
                setEditingContent(null);
                resetContentForm();
                setShowContentModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Neuer Text
            </button>
          </div>

          {welcomeContent.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch kein Willkommenstext vorhanden</p>
          ) : (
            <div className="space-y-4">
              {welcomeContent.map((content) => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">{content.title}</h3>
                      {content.video_url && (
                        <div className="mb-2">
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Video: {content.video_platform}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">{content.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEditContent(content)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteContent(content.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Willkommens-Karten</h2>
            <button
              onClick={() => {
                setEditingCard(null);
                resetCardForm();
                setShowCardModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Neue Karte
            </button>
          </div>

          {welcomeCards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Karten vorhanden</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {welcomeCards.map((card) => (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4 relative group">
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditCard(card)}
                      className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded shadow-lg transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1.5 bg-white text-red-600 hover:bg-red-50 rounded shadow-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="mb-3 flex justify-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-xs">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingContent ? 'Text bearbeiten' : 'Neuer Willkommenstext'}
              </h2>
              <button
                onClick={() => {
                  setShowContentModal(false);
                  setEditingContent(null);
                  resetContentForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContent} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung *
                </label>
                <textarea
                  value={contentForm.description}
                  onChange={(e) => setContentForm({ ...contentForm, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Video (optional)</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video-Plattform
                    </label>
                    <select
                      value={contentForm.video_platform}
                      onChange={(e) => setContentForm({ ...contentForm, video_platform: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="vimeo">Vimeo</option>
                      <option value="youtube">YouTube</option>
                      <option value="self-hosted">Selbst gehostet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      value={contentForm.video_url}
                      onChange={(e) => setContentForm({ ...contentForm, video_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {contentForm.video_url && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <strong>Tipp:</strong> Für Vimeo und YouTube wird das Video automatisch eingebettet.
                      Bei selbst gehosteten Videos sollte die URL direkt zur Videodatei führen.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reihenfolge *
                </label>
                <input
                  type="number"
                  value={contentForm.order_index}
                  onChange={(e) => setContentForm({ ...contentForm, order_index: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowContentModal(false);
                    setEditingContent(null);
                    resetContentForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCard ? 'Karte bearbeiten' : 'Neue Willkommens-Karte'}
              </h2>
              <button
                onClick={() => {
                  setShowCardModal(false);
                  setEditingCard(null);
                  resetCardForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  value={cardForm.title}
                  onChange={(e) => setCardForm({ ...cardForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beschreibung *
                </label>
                <textarea
                  value={cardForm.description}
                  onChange={(e) => setCardForm({ ...cardForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon *
                </label>
                <select
                  value={cardForm.icon_name}
                  onChange={(e) => setCardForm({ ...cardForm, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link URL (optional)
                  </label>
                  <input
                    type="url"
                    value={cardForm.link_url}
                    onChange={(e) => setCardForm({ ...cardForm, link_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Text (optional)
                  </label>
                  <input
                    type="text"
                    value={cardForm.link_text}
                    onChange={(e) => setCardForm({ ...cardForm, link_text: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mehr erfahren"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reihenfolge *
                </label>
                <input
                  type="number"
                  value={cardForm.order_index}
                  onChange={(e) => setCardForm({ ...cardForm, order_index: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowCardModal(false);
                    setEditingCard(null);
                    resetCardForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
