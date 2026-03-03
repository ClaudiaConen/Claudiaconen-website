import React, { useState } from 'react';
import { X, Upload, File, Image, Video, FileText, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentPlanId: string;
  userEmail: string;
  contentTitle: string;
  onUploadSuccess: () => void;
}

interface UploadedFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  uploaded_at: string;
}

export default function ContentUploadModal({
  isOpen,
  onClose,
  contentPlanId,
  userEmail,
  contentTitle,
  onUploadSuccess,
}: ContentUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  React.useEffect(() => {
    if (isOpen) {
      loadUploadedFiles();
    }
  }, [isOpen, contentPlanId]);

  const loadUploadedFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const { data, error } = await supabase
        .from('content_uploads')
        .select('*')
        .eq('content_plan_id', contentPlanId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setUploadedFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(`Die Datei ist zu gross (${formatFileSize(file.size)}). Maximale Groesse: 50 MB.`);
      return;
    }
    setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5 text-[#B8860B]" />;
    if (fileType.startsWith('video/')) return <Video className="w-5 h-5 text-[#B8860B]" />;
    if (fileType.includes('pdf')) return <FileText className="w-5 h-5 text-[#1a2a4a]" />;
    return <File className="w-5 h-5 text-slate-600" />;
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userEmail}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-uploads')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('content-uploads')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('content_uploads').insert({
        content_plan_id: contentPlanId,
        user_email: userEmail,
        file_url: urlData.publicUrl,
        file_name: selectedFile.name,
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        notes: notes || null,
      });

      if (dbError) throw dbError;

      setSelectedFile(null);
      setNotes('');
      await loadUploadedFiles();
      onUploadSuccess();
      alert('Datei erfolgreich hochgeladen!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Hochladen der Datei.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (fileId: string, fileUrl: string) => {
    if (!confirm('Möchtest du diese Datei wirklich löschen?')) return;

    try {
      const filePath = fileUrl.split('/content-uploads/')[1];

      await supabase.storage.from('content-uploads').remove([filePath]);

      const { error } = await supabase
        .from('content_uploads')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      await loadUploadedFiles();
      onUploadSuccess();
      alert('Datei erfolgreich gelöscht!');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Fehler beim Löschen der Datei.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1a2a4a]/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-slate-400/20">
        <div className="sticky top-0 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-100 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-light text-slate-800">Content <span className="font-normal text-[#B8860B]">hochladen</span></h2>
            <p className="text-sm font-light text-slate-600 mt-1">{contentTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8 bg-gradient-to-b from-white to-slate-50/30">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group hover:shadow-lg hover:shadow-amber-100/50 ${
              isDragging ? 'border-[#B8860B] bg-[#B8860B]/5 shadow-lg shadow-amber-100/50' : 'border-slate-200 hover:border-[#B8860B]/40'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center relative z-10"
            >
              <Upload className="w-14 h-14 text-slate-300 mb-4 group-hover:text-[#B8860B] transition-colors duration-300" />
              <p className="text-slate-700 font-light text-lg mb-2">
                Datei <span className="font-normal">auswählen</span> oder hierher ziehen
              </p>
              <p className="text-sm text-slate-400">
                Bilder, Videos, PDFs, Dokumente (max. 50MB)
              </p>
            </label>
          </div>

          {selectedFile && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-lg shadow-amber-100/30 hover:shadow-xl hover:shadow-amber-100/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                {getFileIcon(selectedFile.type)}
                <div className="flex-1">
                  <p className="font-normal text-slate-800 text-lg">{selectedFile.name}</p>
                  <p className="text-sm font-light text-slate-600">{formatFileSize(selectedFile.size)}</p>
                </div>
                <Check className="w-6 h-6 text-[#B8860B]" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-normal text-slate-700 mb-3">
                  Notizen <span className="font-light text-slate-500">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="z.B. Finale Version, benötigt noch Überarbeitung..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300 placeholder:text-slate-300 font-light"
                  rows={2}
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="relative overflow-hidden w-full bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white font-light py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="relative z-10">Wird hochgeladen...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Hochladen</span>
                  </>
                )}
              </button>
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-light text-slate-700">
                Hochgeladene <span className="font-normal text-slate-800">Dateien</span>
              </h3>
              <span className="px-3 py-1 bg-[#B8860B]/10 text-[#B8860B] rounded-full text-sm font-normal">
                {uploadedFiles.length}
              </span>
            </div>
            {isLoadingFiles ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#B8860B] mx-auto"></div>
              </div>
            ) : uploadedFiles.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-light">
                Noch keine Dateien hochgeladen
              </div>
            ) : (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#B8860B]/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {getFileIcon(file.file_type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-normal text-slate-800 truncate">{file.file_name}</p>
                      <p className="text-xs font-light text-slate-500">
                        {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B8860B] hover:text-[#B8860B]/80 text-sm font-normal transition-all duration-200"
                      >
                        Öffnen
                      </a>
                      <button
                        onClick={() => handleDelete(file.id, file.file_url)}
                        className="text-slate-400 hover:text-red-600 text-sm font-normal transition-all duration-200"
                      >
                        Löschen
                      </button>
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
