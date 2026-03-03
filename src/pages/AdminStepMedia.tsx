import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Trash2, Upload, Loader2 } from 'lucide-react';
import AdminNavigation from '../components/AdminNavigation';
import SEO from '../components/SEO';
import { checkAdminAuth } from '../lib/adminAuth';
import { supabase } from '../lib/supabase';
import { validateVideoUrl } from '../lib/videoUtils';

interface StepMedia {
  id?: string;
  step_number: number;
  title: string;
  media_type: 'audio' | 'video' | null;
  media_url: string;
  platform: 'youtube' | 'vimeo' | null;
}

const STEP_TITLES = [
  { number: 1, title: 'KI', subtitle: 'Die dich beschleunigt' },
  { number: 2, title: 'BOTSCHAFT', subtitle: 'Die Vertrauen schafft' },
  { number: 3, title: 'KLARHEIT', subtitle: 'Wofür du stehst' },
  { number: 4, title: 'STORY', subtitle: 'Die Emotionen weckt' },
  { number: 5, title: 'PRÄSENZ', subtitle: 'Die wirkt, bevor du sprichst' },
  { number: 6, title: 'STIMME', subtitle: 'Die unaufhaltbar ist' },
  { number: 7, title: 'WIRKUNG', subtitle: 'Die bleibt' },
];

export default function AdminStepMedia() {
  const navigate = useNavigate();
  const [stepMedia, setStepMedia] = useState<Record<number, StepMedia>>({});
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [mediaType, setMediaType] = useState<'audio' | 'video' | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [audioError, setAudioError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }

    loadStepMedia();
  }, [navigate]);

  const loadStepMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('step_media')
        .select('*')
        .order('step_number', { ascending: true });

      if (error) throw error;

      if (data) {
        const mediaMap: Record<number, StepMedia> = {};
        data.forEach((item) => {
          mediaMap[item.step_number] = item;
        });
        setStepMedia(mediaMap);
      }
    } catch (error) {
      console.error('Error loading step media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stepNumber: number) => {
    const existing = stepMedia[stepNumber];
    setEditingStep(stepNumber);
    setMediaType(existing?.media_type || null);
    setVideoUrl(existing?.media_url || '');
    setSelectedAudioFile(null);
    setUrlError('');
    setAudioError('');
  };

  const handleAudioFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAudioError('');

    if (!file.type.startsWith('audio/')) {
      setAudioError('Bitte nur Audio-Dateien hochladen.');
      setSelectedAudioFile(null);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setAudioError('Die Datei ist zu groß. Maximale Größe: 50MB');
      setSelectedAudioFile(null);
      return;
    }

    setSelectedAudioFile(file);
  };

  const handleAudioSave = async (stepNumber: number) => {
    if (!selectedAudioFile) {
      setAudioError('Bitte wählen Sie zuerst eine Audio-Datei aus.');
      return;
    }

    setUploadingAudio(true);
    setAudioError('');

    try {
      const existing = stepMedia[stepNumber];
      if (existing?.media_type === 'audio' && existing.media_url) {
        const oldPath = existing.media_url.split('/').pop();
        if (oldPath) {
          const { error: deleteError } = await supabase.storage
            .from('step-audio-files')
            .remove([oldPath]);

          if (deleteError) {
            console.error('Error deleting old audio file:', deleteError);
          }
        }
      }

      const fileName = `step-${stepNumber}-${Date.now()}.${selectedAudioFile.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from('step-audio-files')
        .upload(fileName, selectedAudioFile);

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('step-audio-files')
        .getPublicUrl(fileName);

      await saveStepMedia(stepNumber, 'audio', publicUrl, null);

      setEditingStep(null);
      setSelectedAudioFile(null);
      await loadStepMedia();
    } catch (error: any) {
      console.error('Error uploading audio:', error);
      setAudioError(error?.message || 'Fehler beim Hochladen der Audio-Datei. Bitte versuchen Sie es erneut.');
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleVideoSave = async (stepNumber: number) => {
    if (!videoUrl.trim()) {
      setUrlError('Bitte eine URL eingeben.');
      return;
    }

    const validation = validateVideoUrl(videoUrl);
    if (!validation.valid || !validation.platform) {
      setUrlError('Ungültige Video-URL. Bitte YouTube oder Vimeo URL eingeben.');
      return;
    }

    setSaving(true);
    try {
      await saveStepMedia(stepNumber, 'video', videoUrl, validation.platform);
      setEditingStep(null);
      setVideoUrl('');
      setUrlError('');
      await loadStepMedia();
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Fehler beim Speichern des Videos.');
    } finally {
      setSaving(false);
    }
  };

  const saveStepMedia = async (
    stepNumber: number,
    type: 'audio' | 'video',
    url: string,
    platform: 'youtube' | 'vimeo' | null
  ) => {
    const stepTitle = STEP_TITLES.find(s => s.number === stepNumber)?.title || `Schritt ${stepNumber}`;
    const existing = stepMedia[stepNumber];

    if (existing) {
      const { error } = await supabase
        .from('step_media')
        .update({
          media_type: type,
          media_url: url,
          platform,
          updated_at: new Date().toISOString(),
        })
        .eq('step_number', stepNumber);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('step_media')
        .insert({
          step_number: stepNumber,
          title: stepTitle,
          media_type: type,
          media_url: url,
          platform,
        });

      if (error) throw error;
    }
  };

  const handleDelete = async (stepNumber: number) => {
    if (!confirm('Medium wirklich löschen?')) return;

    try {
      const existing = stepMedia[stepNumber];

      if (existing?.media_type === 'audio' && existing.media_url) {
        const fileName = existing.media_url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('step-audio-files').remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('step_media')
        .delete()
        .eq('step_number', stepNumber);

      if (error) throw error;

      await loadStepMedia();
      setEditingStep(null);
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Fehler beim Löschen.');
    }
  };

  const handleCancel = () => {
    setEditingStep(null);
    setMediaType(null);
    setVideoUrl('');
    setSelectedAudioFile(null);
    setUrlError('');
    setAudioError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <Loader2 className="text-luxury-gold animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SEO
        title="Admin: Schritte Media Verwaltung"
        description="Verwalte Audio und Video für die 7 Schritte"
      />
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pearl-white">Schritte Media Verwaltung</h1>
        </div>

        <div className="grid gap-6">
          {STEP_TITLES.map((step) => {
            const media = stepMedia[step.number];
            const isEditing = editingStep === step.number;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-royal-navy/30 backdrop-blur-sm rounded-xl border border-luxury-gold/20 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-pearl-white">
                      Schritt {step.number}: {step.title}
                    </h2>
                    <p className="text-pearl-white/70 text-sm">{step.subtitle}</p>
                    {media && (
                      <p className="text-luxury-gold text-sm mt-2">
                        Aktuell: {media.media_type === 'audio' ? 'Audio' : `Video (${media.platform})`}
                      </p>
                    )}
                  </div>
                  {!isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(step.number)}
                        className="px-4 py-2 bg-luxury-gold text-midnight-blue rounded-lg hover:bg-luxury-gold/80 transition-colors"
                      >
                        {media ? 'Bearbeiten' : 'Hinzufügen'}
                      </button>
                      {media && (
                        <button
                          onClick={() => handleDelete(step.number)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="space-y-4 border-t border-luxury-gold/20 pt-4">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`media-type-${step.number}`}
                          value="audio"
                          checked={mediaType === 'audio'}
                          onChange={() => setMediaType('audio')}
                          className="w-4 h-4"
                        />
                        <span className="text-pearl-white">Audio</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`media-type-${step.number}`}
                          value="video"
                          checked={mediaType === 'video'}
                          onChange={() => setMediaType('video')}
                          className="w-4 h-4"
                        />
                        <span className="text-pearl-white">Video</span>
                      </label>
                    </div>

                    {mediaType === 'audio' && (
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 px-4 py-3 bg-luxury-gold/10 border-2 border-luxury-gold/30 rounded-lg cursor-pointer hover:bg-luxury-gold/20 transition-colors">
                          <Upload size={20} className="text-luxury-gold" />
                          <span className="text-pearl-white">
                            {selectedAudioFile ? selectedAudioFile.name : 'Audio-Datei auswählen'}
                          </span>
                          <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioFileSelect}
                            disabled={uploadingAudio}
                            className="hidden"
                          />
                        </label>
                        {selectedAudioFile && (
                          <div className="text-pearl-white/70 text-sm">
                            <p>Datei: {selectedAudioFile.name}</p>
                            <p>Größe: {(selectedAudioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        )}
                        {audioError && (
                          <p className="text-red-400 text-sm">{audioError}</p>
                        )}
                        <p className="text-pearl-white/60 text-sm">
                          Max. 50MB, Formate: MP3, WAV, OGG, M4A
                        </p>
                        <button
                          onClick={() => handleAudioSave(step.number)}
                          disabled={!selectedAudioFile || uploadingAudio}
                          className="w-full px-6 py-3 bg-luxury-gold text-midnight-blue rounded-lg hover:bg-luxury-gold/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploadingAudio ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />
                              Wird hochgeladen...
                            </>
                          ) : (
                            <>
                              <Save size={20} />
                              Speichern
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {mediaType === 'video' && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={videoUrl}
                                onChange={(e) => {
                                  setVideoUrl(e.target.value);
                                  setUrlError('');
                                }}
                                placeholder="YouTube oder Vimeo URL eingeben"
                                className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/30 rounded-lg text-pearl-white placeholder-pearl-white/40 focus:outline-none focus:border-luxury-gold"
                              />
                              {urlError && (
                                <p className="text-red-400 text-sm mt-1">{urlError}</p>
                              )}
                            </div>
                            <button
                              onClick={() => handleVideoSave(step.number)}
                              disabled={saving}
                              className="px-6 py-3 bg-luxury-gold text-midnight-blue rounded-lg hover:bg-luxury-gold/80 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                              Speichern
                            </button>
                          </div>
                          <p className="text-pearl-white/60 text-sm mt-2">
                            Unterstützt: YouTube und Vimeo URLs
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-pearl-white/10 text-pearl-white rounded-lg hover:bg-pearl-white/20 transition-colors"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                )}

                {!isEditing && media && media.media_type === 'audio' && (
                  <div className="mt-4">
                    <p className="text-pearl-white/70 text-sm mb-2">Vorschau:</p>
                    <audio
                      controls
                      src={media.media_url}
                      className="w-full"
                      style={{
                        filter: 'invert(0.85) sepia(1) saturate(5) hue-rotate(10deg)',
                      }}
                    >
                      Ihr Browser unterstützt das Audio-Element nicht.
                    </audio>
                  </div>
                )}

                {!isEditing && media && media.media_type === 'video' && (
                  <div className="mt-4">
                    <p className="text-pearl-white/70 text-sm mb-2">Vorschau:</p>
                    <div className="aspect-video rounded-lg overflow-hidden border border-luxury-gold/30">
                      <iframe
                        src={media.platform === 'youtube'
                          ? `https://www.youtube.com/embed/${media.media_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]}`
                          : `https://player.vimeo.com/video/${media.media_url.match(/vimeo\.com\/(\d+)/)?.[1]}`
                        }
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`${step.title} Video Preview`}
                      ></iframe>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
      </div>
    </div>
  );
}
