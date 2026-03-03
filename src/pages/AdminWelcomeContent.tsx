import { useEffect, useState } from 'react';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import { Save, Loader2, Plus, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WelcomeContent {
  id: string;
  welcome_title: string;
  welcome_message: string | null;
  video_url: string | null;
  video_platform: string;
  is_active: boolean;
}

interface GuideCard {
  id?: string;
  welcome_id?: string;
  icon: string;
  title: string;
  description: string;
  link_url: string;
  order_index: number;
}

const iconOptions = [
  'BookOpen',
  'Video',
  'Brain',
  'Users',
  'Star',
  'Award',
  'Target',
  'Lightbulb',
  'Heart',
  'Zap',
];

export default function AdminWelcomeContent() {
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent | null>(null);
  const [guideCards, setGuideCards] = useState<GuideCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadWelcomeContent();
  }, []);

  const loadWelcomeContent = async () => {
    try {
      const adminToken = getToken();

      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log('Fetching welcome content from:', `${supabaseUrl}/functions/v1/get-welcome-content`);
      console.log('Using admin token:', adminToken ? 'Token exists' : 'No token');

      const response = await fetch(`${supabaseUrl}/functions/v1/get-welcome-content`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
          'Apikey': supabaseKey,
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Error response text:', responseText);
        let errorMessage = 'Fehler beim Laden';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const responseText = await response.text();
      console.log('Success response text:', responseText);
      const data = JSON.parse(responseText);

      setWelcomeContent(data.welcomeContent);
      setGuideCards(data.guideCards || []);
    } catch (error: any) {
      console.error('Error loading welcome content:', error);
      alert(`Fehler beim Laden des Willkommensbereichs: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!welcomeContent) return;

    setIsSaving(true);
    try {
      const adminToken = getToken();

      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log('Sending update request:', {
        welcomeContent,
        guideCards,
      });

      const response = await fetch(`${supabaseUrl}/functions/v1/update-welcome-content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
          'Apikey': supabaseKey,
        },
        body: JSON.stringify({
          welcomeContent,
          guideCards,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Error response text:', responseText);
        let errorMessage = 'Fehler beim Speichern';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Save result:', result);

      alert('Willkommensbereich erfolgreich gespeichert');
      loadWelcomeContent();
    } catch (error: any) {
      console.error('Error saving welcome content:', error);
      alert(`Fehler beim Speichern: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const addGuideCard = () => {
    setGuideCards([
      ...guideCards,
      {
        icon: 'BookOpen',
        title: '',
        description: '',
        link_url: '',
        order_index: guideCards.length,
      },
    ]);
  };

  const removeGuideCard = (index: number) => {
    setGuideCards(guideCards.filter((_, i) => i !== index));
  };

  const updateGuideCard = (index: number, field: string, value: string) => {
    const updated = [...guideCards];
    updated[index] = { ...updated[index], [field]: value };
    setGuideCards(updated);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        </div>
      </div>
    );
  }

  if (!welcomeContent) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/admin/member-kurse"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Kursübersicht</span>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommensbereich</h1>
            <p className="text-gray-600">
              Gestalte die Startseite für deine Kursteilnehmer
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Speichern...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Speichern</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Grundinformationen</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel
              </label>
              <input
                type="text"
                value={welcomeContent.welcome_title}
                onChange={(e) =>
                  setWelcomeContent({ ...welcomeContent, welcome_title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. Willkommen in der KI-Manager Ausbildung"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Willkommensnachricht
              </label>
              <textarea
                value={welcomeContent.welcome_message || ''}
                onChange={(e) =>
                  setWelcomeContent({
                    ...welcomeContent,
                    welcome_message: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Schreibe eine persönliche Begrüßung..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video-Plattform
              </label>
              <select
                value={welcomeContent.video_platform}
                onChange={(e) =>
                  setWelcomeContent({
                    ...welcomeContent,
                    video_platform: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
                <option value="self-hosted">Selbst gehostet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video-URL
              </label>
              <input
                type="url"
                value={welcomeContent.video_url || ''}
                onChange={(e) =>
                  setWelcomeContent({
                    ...welcomeContent,
                    video_url: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {welcomeContent.video_platform === 'youtube' &&
                  'YouTube-URL oder Video-ID eingeben'}
                {welcomeContent.video_platform === 'vimeo' &&
                  'Vimeo-URL oder Video-ID eingeben'}
                {welcomeContent.video_platform === 'self-hosted' &&
                  'Direkte Video-URL eingeben'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Wegweiser-Karten</h2>
            <button
              onClick={addGuideCard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Karte hinzufügen</span>
            </button>
          </div>

          {guideCards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Wegweiser vorhanden</p>
          ) : (
            <div className="space-y-4">
              {guideCards.map((card, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Karte {index + 1}</h3>
                    <button
                      onClick={() => removeGuideCard(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <select
                        value={card.icon}
                        onChange={(e) => updateGuideCard(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titel
                      </label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateGuideCard(index, 'title', e.target.value)}
                        placeholder="z.B. Module & Lektionen"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beschreibung
                      </label>
                      <textarea
                        value={card.description}
                        onChange={(e) =>
                          updateGuideCard(index, 'description', e.target.value)
                        }
                        rows={2}
                        placeholder="Kurze Beschreibung..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link-URL
                      </label>
                      <input
                        type="text"
                        value={card.link_url}
                        onChange={(e) => updateGuideCard(index, 'link_url', e.target.value)}
                        placeholder="/member/courses"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
