import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import { Upload, Trash2, Save, Plus, GripVertical, Eye, EyeOff } from 'lucide-react';
import AdminNavigation from '../components/AdminNavigation';
import VideoModal from '../components/VideoModal';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  vimeo_url: string;
  thumbnail_path: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    vimeo_url: ''
  });

  useEffect(() => {
    checkAuth();
    loadTestimonials();
  }, []);

  const checkAuth = async () => {
    const isAdmin = await checkAdminAuth();
    if (!isAdmin) {
      navigate('/admin/login');
    }
  };

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailUpload = async (testimonialId: string, file: File) => {
    setUploadingId(testimonialId);
    try {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Datei ist zu groß (max. 10MB)');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Bitte nur Bilddateien hochladen');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${testimonialId}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('testimonial-thumbnails')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
      }

      const { error: updateError } = await supabase
        .from('testimonials')
        .update({
          thumbnail_path: filePath,
          updated_at: new Date().toISOString()
        })
        .eq('id', testimonialId);

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Datenbankaktualisierung fehlgeschlagen: ${updateError.message}`);
      }

      await loadTestimonials();
      alert('Thumbnail erfolgreich hochgeladen!');
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      alert(`Fehler beim Hochladen: ${errorMessage}`);
    } finally {
      setUploadingId(null);
    }
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.vimeo_url) {
      alert('Bitte alle Felder ausfüllen');
      return;
    }

    setSaving(true);
    try {
      const maxOrder = Math.max(...testimonials.map(t => t.display_order), -1);

      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: newTestimonial.name,
          role: newTestimonial.role,
          vimeo_url: newTestimonial.vimeo_url,
          display_order: maxOrder + 1,
          is_active: true
        });

      if (error) throw error;

      setNewTestimonial({ name: '', role: '', vimeo_url: '' });
      loadTestimonials();
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('Fehler beim Hinzufügen');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      loadTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Fehler beim Aktualisieren');
    }
  };

  const handleDeleteTestimonial = async (id: string, thumbnailPath: string | null) => {
    if (!confirm('Testimonial wirklich löschen?')) return;

    try {
      if (thumbnailPath) {
        await supabase.storage
          .from('testimonial-thumbnails')
          .remove([thumbnailPath]);
      }

      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Fehler beim Löschen');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = testimonials.findIndex(t => t.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;

    const newTestimonials = [...testimonials];
    [newTestimonials[currentIndex], newTestimonials[newIndex]] =
    [newTestimonials[newIndex], newTestimonials[currentIndex]];

    try {
      await Promise.all(
        newTestimonials.map((t, index) =>
          supabase
            .from('testimonials')
            .update({ display_order: index })
            .eq('id', t.id)
        )
      );
      loadTestimonials();
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const getThumbnailUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage
      .from('testimonial-thumbnails')
      .getPublicUrl(path);
    return data.publicUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-600">Laden...</div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2">Testimonials Verwaltung</h1>
            <p className="text-gray-600 mb-6">
              Verwalte Kundenstimmen mit Reel-Format Videos (9:16)
            </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h2 className="font-semibold text-blue-900 mb-4">Neues Testimonial hinzufügen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
              />
              <input
                type="text"
                placeholder="Position/Firma"
                value={newTestimonial.role}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
              />
              <input
                type="text"
                placeholder="Vimeo URL"
                value={newTestimonial.vimeo_url}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, vimeo_url: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={handleAddTestimonial}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              {saving ? 'Wird hinzugefügt...' : 'Testimonial hinzufügen'}
            </button>
          </div>

          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-56 bg-gray-100 rounded-lg overflow-hidden relative group">
                      {uploadingId === testimonial.id ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-blue-600">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
                          <span className="text-xs">Lädt hoch...</span>
                        </div>
                      ) : testimonial.thumbnail_path ? (
                        <img
                          src={getThumbnailUrl(testimonial.thumbnail_path) || ''}
                          alt={testimonial.name}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => setPreviewUrl(testimonial.vimeo_url)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm text-center px-2">
                          Kein Thumbnail
                        </div>
                      )}
                      {uploadingId !== testimonial.id && (
                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                          <Upload className="w-8 h-8 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleThumbnailUpload(testimonial.id, file);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow">
                    {editingId === testimonial.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => {
                            const updated = testimonials.map(t =>
                              t.id === testimonial.id ? { ...t, name: e.target.value } : t
                            );
                            setTestimonials(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder:text-gray-500"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={testimonial.role}
                          onChange={(e) => {
                            const updated = testimonials.map(t =>
                              t.id === testimonial.id ? { ...t, role: e.target.value } : t
                            );
                            setTestimonials(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder:text-gray-500"
                          placeholder="Position/Firma"
                        />
                        <input
                          type="text"
                          value={testimonial.vimeo_url}
                          onChange={(e) => {
                            const updated = testimonials.map(t =>
                              t.id === testimonial.id ? { ...t, vimeo_url: e.target.value } : t
                            );
                            setTestimonials(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white placeholder:text-gray-500"
                          placeholder="Vimeo URL"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              handleUpdateTestimonial(testimonial.id, {
                                name: testimonial.name,
                                role: testimonial.role,
                                vimeo_url: testimonial.vimeo_url
                              });
                              setEditingId(null);
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Speichern
                          </button>
                          <button
                            onClick={() => {
                              loadTestimonials();
                              setEditingId(null);
                            }}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                          >
                            Abbrechen
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                            <p className="text-gray-600">{testimonial.role}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateTestimonial(testimonial.id, { is_active: !testimonial.is_active })}
                              className={`p-2 rounded-lg transition-colors ${
                                testimonial.is_active
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                              }`}
                              title={testimonial.is_active ? 'Aktiv' : 'Inaktiv'}
                            >
                              {testimonial.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mb-3 break-all">
                          {testimonial.vimeo_url}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingId(testimonial.id)}
                            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            Bearbeiten
                          </button>
                          <button
                            onClick={() => setPreviewUrl(testimonial.vimeo_url)}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                          >
                            Video ansehen
                          </button>
                          <button
                            onClick={() => handleReorder(testimonial.id, 'up')}
                            disabled={index === 0}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Nach oben"
                          >
                            <GripVertical className="w-5 h-5 rotate-180" />
                          </button>
                          <button
                            onClick={() => handleReorder(testimonial.id, 'down')}
                            disabled={index === testimonials.length - 1}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Nach unten"
                          >
                            <GripVertical className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id, testimonial.thumbnail_path)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Löschen"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {testimonials.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Noch keine Testimonials vorhanden. Füge dein erstes hinzu!
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      {previewUrl && (
        <VideoModal
          vimeoUrl={previewUrl}
          onClose={() => setPreviewUrl(null)}
        />
      )}
      </div>
    </div>
  );
}
