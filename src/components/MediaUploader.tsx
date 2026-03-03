import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { getToken } from '../lib/adminAuth';
import { Upload, X, Loader2, File, Image as ImageIcon, Music, FileText } from 'lucide-react';

interface MediaUploaderProps {
  bucket?: string;
  folder?: string;
  accept?: string;
  maxSizeMB?: number;
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
  label?: string;
  fileType?: 'image' | 'audio' | 'pdf' | 'any';
}

export default function MediaUploader({
  bucket = 'course-media',
  folder = '',
  accept,
  maxSizeMB = 10,
  onUploadComplete,
  currentUrl,
  label = 'Datei hochladen',
  fileType = 'any',
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    if (accept) return accept;
    switch (fileType) {
      case 'image':
        return 'image/*';
      case 'audio':
        return 'audio/*';
      case 'pdf':
        return 'application/pdf';
      default:
        return '*/*';
    }
  };

  const getFileIcon = () => {
    switch (fileType) {
      case 'image':
        return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'audio':
        return <Music className="w-8 h-8 text-purple-500" />;
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleFile = async (file: File) => {
    if (!file) return;

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`Datei ist zu groß. Maximal ${maxSizeMB}MB erlaubt.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const adminToken = getToken();

      if (adminToken) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', bucket);
        formData.append('path', filePath);

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-upload-file`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const { publicUrl } = await response.json();
        setUploadProgress(100);
        onUploadComplete(publicUrl);
      } else {
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        setUploadProgress(100);
        onUploadComplete(publicUrlData.publicUrl);
      }

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error?.message || 'Unbekannter Fehler';
      alert(`Fehler beim Hochladen der Datei: ${errorMessage}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {currentUrl && !isUploading ? (
        <div className="mb-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon()}
              <div>
                <p className="text-sm font-medium text-green-900">Datei hochgeladen</p>
                <p className="text-xs text-green-700 break-all">{currentUrl}</p>
              </div>
            </div>
            <button
              onClick={handleClearFile}
              className="text-red-600 hover:text-red-700"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {fileType === 'image' && (
            <img
              src={currentUrl}
              alt="Preview"
              className="mt-3 max-h-48 rounded-lg object-cover"
            />
          )}
          {fileType === 'audio' && (
            <audio controls className="mt-3 w-full">
              <source src={currentUrl} />
            </audio>
          )}
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={getAcceptString()}
            onChange={handleChange}
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-600">Wird hochgeladen...</p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Ziehe eine Datei hierher oder
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
              >
                Datei auswählen
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Maximal {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
