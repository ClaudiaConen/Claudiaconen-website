import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import {
  Save,
  ArrowLeft,
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Deck {
  id: string;
  lesson_id: string | null;
  title: string;
  description: string;
  xp_reward: number;
}

interface Flashcard {
  id?: string;
  front_text: string;
  back_text: string;
  order_index: number;
}

export default function AdminFlashcardEdit() {
  const { deckId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = deckId === 'new';
  const lessonIdFromParam = searchParams.get('lessonId');

  const [deck, setDeck] = useState<Deck>({
    id: '',
    lesson_id: lessonIdFromParam !== 'new' ? lessonIdFromParam : null,
    title: '',
    description: '',
    xp_reward: 100,
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  const apiCall = async (action: string, method: string = 'GET', body?: any) => {
    const adminToken = getToken();
    if (!adminToken) {
      throw new Error('Keine Authentifizierung gefunden. Bitte erneut einloggen.');
    }

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=${action}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.details || 'Ein Fehler ist aufgetreten');
    }

    return result;
  };

  useEffect(() => {
    if (!isNew && deckId) {
      loadDeck();
    }
  }, [deckId]);

  const loadDeck = async () => {
    try {
      const result = await apiCall(`get-flashcard-deck&id=${deckId}`, 'GET');
      const { deck: deckData, cards: cardsData } = result.data;

      setDeck(deckData);
      setFlashcards(cardsData || []);
      setExpandedCards((cardsData || []).map((_: any, i: number) => i));
    } catch (error: any) {
      console.error('Error loading deck:', error);
      alert(`Fehler beim Laden des Decks: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!deck.title) {
      alert('Bitte fülle alle Pflichtfelder aus');
      return;
    }

    if (flashcards.length === 0) {
      alert('Bitte füge mindestens eine Flashcard hinzu');
      return;
    }

    for (let i = 0; i < flashcards.length; i++) {
      const card = flashcards[i];
      if (!card.front_text.trim() || !card.back_text.trim()) {
        alert(`Flashcard ${i + 1}: Vorder- und Rückseite müssen ausgefüllt sein`);
        return;
      }
    }

    setIsSaving(true);
    try {
      let savedDeckId = deckId;

      const deckPayload = {
        lesson_id: deck.lesson_id,
        title: deck.title,
        description: deck.description,
        xp_reward: deck.xp_reward,
      };

      if (isNew) {
        const result = await apiCall('create-flashcard-deck', 'POST', deckPayload);
        savedDeckId = result.data.id;
      } else {
        await apiCall('update-flashcard-deck', 'POST', { id: deckId, ...deckPayload });
      }

      await apiCall('save-flashcards', 'POST', {
        deckId: savedDeckId,
        cards: flashcards,
      });

      if (isNew) {
        navigate(`/admin/member-kurse/flashcards/${savedDeckId}`);
      } else {
        alert('Flashcard Deck erfolgreich gespeichert');
        loadDeck();
      }
    } catch (error: any) {
      console.error('Error saving deck:', error);
      const errorMessage = error?.message || 'Unbekannter Fehler beim Speichern';
      alert(`Fehler beim Speichern: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Möchtest du dieses Flashcard Deck wirklich löschen?')) return;

    try {
      await apiCall('delete-flashcard-deck', 'POST', { id: deckId });
      navigate('/admin/member-flashcards');
    } catch (error: any) {
      console.error('Error deleting deck:', error);
      alert(`Fehler beim Löschen: ${error.message}`);
    }
  };

  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      {
        front_text: '',
        back_text: '',
        order_index: flashcards.length,
      },
    ]);
    setExpandedCards([...expandedCards, flashcards.length]);
  };

  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
    setExpandedCards(expandedCards.filter((i) => i !== index));
  };

  const updateFlashcard = (index: number, field: string, value: string) => {
    const updated = [...flashcards];
    updated[index] = { ...updated[index], [field]: value };
    setFlashcards(updated);
  };

  const toggleCard = (index: number) => {
    if (expandedCards.includes(index)) {
      setExpandedCards(expandedCards.filter((i) => i !== index));
    } else {
      setExpandedCards([...expandedCards, index]);
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/admin/member-flashcards"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Flashcard-Übersicht</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {isNew ? 'Neues Flashcard Deck erstellen' : 'Flashcard Deck bearbeiten'}
            </h1>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50"
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

              {!isNew && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Löschen</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titel *
              </label>
              <input
                type="text"
                value={deck.title}
                onChange={(e) => setDeck({ ...deck, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="z.B. ChatGPT Grundlagen Flashcards"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beschreibung
              </label>
              <textarea
                value={deck.description}
                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optionale Beschreibung..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                XP Belohnung (für alle Karten gemeistert)
              </label>
              <input
                type="number"
                value={deck.xp_reward}
                onChange={(e) => setDeck({ ...deck, xp_reward: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
            <button
              onClick={addFlashcard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Flashcard hinzufügen</span>
            </button>
          </div>

          {flashcards.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Flashcards vorhanden</p>
          ) : (
            <div className="space-y-4">
              {flashcards.map((card, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleCard(index)}
                  >
                    <h3 className="font-medium text-gray-900">
                      Karte {index + 1}
                      {card.front_text && `: ${card.front_text.substring(0, 50)}...`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFlashcard(index);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      {expandedCards.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>

                  {expandedCards.includes(index) && (
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vorderseite (Frage) *
                        </label>
                        <textarea
                          value={card.front_text}
                          onChange={(e) =>
                            updateFlashcard(index, 'front_text', e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Was erscheint auf der Vorderseite?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rückseite (Antwort) *
                        </label>
                        <textarea
                          value={card.back_text}
                          onChange={(e) =>
                            updateFlashcard(index, 'back_text', e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Was erscheint auf der Rückseite?"
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-900">
                          <strong>Tipp:</strong> Halte die Karten kurz und prägnant. Eine gute
                          Flashcard testet nur ein einzelnes Konzept.
                        </p>
                      </div>
                    </div>
                  )}
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
