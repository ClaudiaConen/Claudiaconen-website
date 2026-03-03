import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getToken } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import MediaUploader from '../components/MediaUploader';
import { Save, ArrowLeft, Loader2, Trash2, Plus, Edit, QrCode, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface BonusContent {
  id: string;
  title: string;
  content_type: 'video' | 'quiz' | 'pdf' | 'link' | 'text';
  content_url: string | null;
  content_text: string | null;
  description: string | null;
  order_index: number;
  is_published: boolean;
}

interface Module {
  id: string;
  module_number: number;
  title: string;
  qr_code_data: string | null;
}

export default function AdminModuleBonusEdit() {
  const { moduleId } = useParams();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const [module, setModule] = useState<Module | null>(null);
  const [bonusContents, setBonusContents] = useState<BonusContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [editingContent, setEditingContent] = useState<BonusContent | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content_type: 'video' as 'video' | 'quiz' | 'pdf' | 'link' | 'text',
    content_url: '',
    content_text: '',
    description: '',
    order_index: 0,
    is_published: true,
  });

  useEffect(() => {
    loadModuleData();
    loadBonusContents();
  }, [moduleId]);

  const loadModuleData = async () => {
    try {
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=get-module&id=${moduleId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Laden der Modul-Daten');
      }

      const data = await response.json();
      setModule(data.module);
      setQrCodeData(data.module.qr_code_data || '');
    } catch (err) {
      console.error('Error loading module:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    }
  };

  const loadBonusContents = async () => {
    try {
      setIsLoading(true);
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=get-bonus-content&moduleId=${moduleId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Laden der Bonus-Inhalte');
      }

      const data = await response.json();
      setBonusContents(data.bonusContents || []);
    } catch (err) {
      console.error('Error loading bonus contents:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBonusContent = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const action = editingContent ? 'update-bonus-content' : 'create-bonus-content';
      const payload = editingContent
        ? { ...formData, id: editingContent.id, moduleId }
        : { ...formData, moduleId };

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=${action}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Speichern des Bonus-Inhalts');
      }

      setSuccessMessage('Bonus-Inhalt erfolgreich gespeichert');
      setShowAddForm(false);
      setEditingContent(null);
      resetForm();
      await loadBonusContents();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving bonus content:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBonusContent = async (id: string) => {
    if (!confirm('Möchten Sie diesen Bonus-Inhalt wirklich löschen?')) {
      return;
    }

    try {
      setError(null);
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=delete-bonus-content`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Bonus-Inhalts');
      }

      setSuccessMessage('Bonus-Inhalt erfolgreich gelöscht');
      await loadBonusContents();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error deleting bonus content:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    }
  };

  const handleSaveQRCode = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const adminToken = getToken();
      if (!adminToken) {
        throw new Error('Keine Authentifizierung gefunden');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=update-qr-code-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            moduleId,
            qrCodeData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Speichern der QR-Code-Daten');
      }

      setSuccessMessage('QR-Code-Daten erfolgreich gespeichert');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error saving QR code data:', err);
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBonusContent = (content: BonusContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      content_type: content.content_type,
      content_url: content.content_url || '',
      content_text: content.content_text || '',
      description: content.description || '',
      order_index: content.order_index,
      is_published: content.is_published,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content_type: 'video',
      content_url: '',
      content_text: '',
      description: '',
      order_index: bonusContents.length,
      is_published: true,
    });
  };

  const handleAddNew = () => {
    setEditingContent(null);
    resetForm();
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingContent(null);
    resetForm();
  };

  const handleDownloadQRCode = () => {
    if (!qrCodeRef.current) return;

    const canvas = qrCodeRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-code-modul-${module?.module_number || 'unknown'}.png`;
    link.href = url;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={`/admin/member-kurse/modul/${moduleId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Modul
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            QR-Code & Bonus-Inhalte
          </h1>
          {module && (
            <p className="text-gray-600 mt-2">
              Modul {module.module_number}: {module.title}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Bonus-Inhalte</h2>
                {!showAddForm && (
                  <button
                    onClick={handleAddNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Neuer Inhalt</span>
                  </button>
                )}
              </div>

              {showAddForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingContent ? 'Bonus-Inhalt bearbeiten' : 'Neuer Bonus-Inhalt'}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titel *
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
                        Inhaltstyp *
                      </label>
                      <select
                        value={formData.content_type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            content_type: e.target.value as 'video' | 'quiz' | 'pdf' | 'link' | 'text',
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="video">Video</option>
                        <option value="pdf">PDF</option>
                        <option value="link">Link</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>

                    {(formData.content_type === 'video' ||
                      formData.content_type === 'pdf' ||
                      formData.content_type === 'link') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL
                        </label>
                        <input
                          type="url"
                          value={formData.content_url}
                          onChange={(e) =>
                            setFormData({ ...formData, content_url: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://..."
                        />

                        {formData.content_type === 'pdf' && (
                          <div className="mt-3">
                            <MediaUploader
                              bucket="course-media"
                              folder="bonus-content"
                              onUploadComplete={(url) =>
                                setFormData({ ...formData, content_url: url })
                              }
                              maxSizeMB={50}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {formData.content_type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Textinhalt
                        </label>
                        <textarea
                          value={formData.content_text}
                          onChange={(e) =>
                            setFormData({ ...formData, content_text: e.target.value })
                          }
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beschreibung
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sortierung
                        </label>
                        <input
                          type="number"
                          value={formData.order_index}
                          onChange={(e) =>
                            setFormData({ ...formData, order_index: parseInt(e.target.value) })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Veröffentlicht
                        </label>
                        <label className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            checked={formData.is_published}
                            onChange={(e) =>
                              setFormData({ ...formData, is_published: e.target.checked })
                            }
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Sichtbar für Teilnehmer</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 pt-4">
                      <button
                        onClick={handleSaveBonusContent}
                        disabled={isSaving || !formData.title}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        <span>{editingContent ? 'Aktualisieren' : 'Erstellen'}</span>
                      </button>

                      <button
                        onClick={handleCancel}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {bonusContents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Noch keine Bonus-Inhalte vorhanden
                </div>
              ) : (
                <div className="space-y-3">
                  {bonusContents
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium text-gray-900">{content.title}</h3>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {content.content_type}
                            </span>
                            {!content.is_published && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                Entwurf
                              </span>
                            )}
                          </div>
                          {content.description && (
                            <p className="text-sm text-gray-500 mt-1">{content.description}</p>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditBonusContent(content)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBonusContent(content.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">QR-Code</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    QR-Code Ziel-URL oder Text
                  </label>
                  <textarea
                    value={qrCodeData}
                    onChange={(e) => setQrCodeData(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://... oder Text"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Geben Sie eine URL oder einen Text ein, der im QR-Code enthalten sein soll.
                  </p>
                </div>

                <button
                  onClick={handleSaveQRCode}
                  disabled={isSaving || !qrCodeData}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>QR-Code-Daten speichern</span>
                </button>

                {qrCodeData && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-700">QR-Code Vorschau</p>
                      <button
                        onClick={handleDownloadQRCode}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        title="QR-Code herunterladen"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                    <div ref={qrCodeRef} className="bg-white p-4 rounded border border-gray-200 flex justify-center">
                      <QRCodeCanvas
                        value={qrCodeData}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Klicken Sie auf das Download-Symbol, um den QR-Code als PNG herunterzuladen
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
