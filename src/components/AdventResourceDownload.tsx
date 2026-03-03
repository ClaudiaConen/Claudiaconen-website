import { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, CheckSquare, BookOpen, FileCheck, Layout, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Resource {
  type: 'checklist' | 'worksheet' | 'training' | 'guide' | 'template';
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  icon?: string;
}

interface AdventResourceDownloadProps {
  resources: Resource[];
  doorNumber: number;
  userEmail: string;
}

const resourceIcons: Record<Resource['type'], any> = {
  checklist: CheckSquare,
  worksheet: FileText,
  training: BookOpen,
  guide: FileCheck,
  template: Layout,
};

const resourceLabels: Record<Resource['type'], string> = {
  checklist: 'Checkliste',
  worksheet: 'Worksheet',
  training: 'Training',
  guide: 'Leitfaden',
  template: 'Vorlage',
};

export default function AdventResourceDownload({ resources, doorNumber, userEmail }: AdventResourceDownloadProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const trackDownload = async (resource: Resource) => {
    try {
      await supabase.from('advent_downloads').insert({
        user_email: userEmail,
        door_number: doorNumber,
        resource_type: resource.type,
        resource_title: resource.title,
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  const handleDownloadClick = (resource: Resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  const handleConfirmDownload = async () => {
    if (!selectedResource) return;

    setDownloading(selectedResource.file_name);

    try {
      await trackDownload(selectedResource);

      let filePath = '';

      if (selectedResource.file_url.includes('/storage/v1/object/public/resources/')) {
        filePath = selectedResource.file_url.split('/storage/v1/object/public/resources/')[1];
      } else if (selectedResource.file_url.includes('/object/public/resources/')) {
        filePath = selectedResource.file_url.split('/object/public/resources/')[1];
      } else {
        const parts = selectedResource.file_url.split('/');
        const resourcesIndex = parts.findIndex(p => p === 'resources');
        if (resourcesIndex !== -1 && resourcesIndex < parts.length - 1) {
          filePath = parts.slice(resourcesIndex + 1).join('/');
        }
      }

      console.log('Full URL:', selectedResource.file_url);
      console.log('Extracted file path:', filePath);

      if (!filePath) {
        console.error('Could not extract file path, trying direct link download');
        const link = document.createElement('a');
        link.href = selectedResource.file_url;
        link.download = selectedResource.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloaded(prev => new Set(prev).add(selectedResource.file_name));
        setDownloading(null);
        setShowModal(false);
        setSelectedResource(null);
        return;
      }

      const { data, error } = await supabase.storage
        .from('resources')
        .download(filePath);

      if (error) {
        console.error('Supabase download error:', error);
        console.log('Error details:', JSON.stringify(error));
        console.log('Trying direct link download as fallback');

        const link = document.createElement('a');
        link.href = selectedResource.file_url;
        link.download = selectedResource.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloaded(prev => new Set(prev).add(selectedResource.file_name));
        setDownloading(null);
        setShowModal(false);
        setSelectedResource(null);
        return;
      }

      if (!data) {
        throw new Error('No data received');
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedResource.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloaded(prev => new Set(prev).add(selectedResource.file_name));
      setDownloading(null);
      setShowModal(false);
      setSelectedResource(null);
    } catch (error) {
      console.error('Download error:', error);
      alert('Fehler beim Herunterladen der Datei. Bitte versuche es erneut.');
      setDownloading(null);
    }
  };

  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/10 border-2 border-bright-gold/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Download className="text-bright-gold" size={28} />
          <h3 className="text-2xl font-bold text-midnight-blue">
            Deine Geschenke zum Download
          </h3>
        </div>

        <p className="text-gray-600 mb-6">
          Hier findest du wertvolle Ressourcen, die dir helfen, das Gelernte direkt umzusetzen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resourceIcons[resource.type];
            const isDownloaded = downloaded.has(resource.file_name);
            const isDownloading = downloading === resource.file_name;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-bright-gold transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-bright-gold/10 flex items-center justify-center">
                    <Icon className="text-bright-gold" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-bright-gold uppercase tracking-wide">
                        {resourceLabels[resource.type]}
                      </span>
                      {isDownloaded && (
                        <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          <Check size={12} />
                          <span>Heruntergeladen</span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-midnight-blue text-base mb-1 leading-tight">
                      {resource.icon} {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-snug">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadClick(resource)}
                  disabled={isDownloading}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-semibold rounded-lg hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-midnight-blue"></div>
                      <span>Wird vorbereitet...</span>
                    </>
                  ) : (
                    <>
                      <Download size={18} />
                      <span>Jetzt herunterladen</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tipp:</strong> Speichere diese Ressourcen und nutze sie regelmäßig für deine persönliche und berufliche Entwicklung.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-bright-gold/10 flex items-center justify-center">
                    {createElement(resourceIcons[selectedResource.type], {
                      className: "text-bright-gold",
                      size: 24
                    })}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-bright-gold uppercase tracking-wide">
                      {resourceLabels[selectedResource.type]}
                    </p>
                    <h3 className="text-xl font-bold text-midnight-blue">
                      {selectedResource.icon} {selectedResource.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                {selectedResource.description}
              </p>

              <div className="bg-bright-gold/10 border border-bright-gold/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-midnight-blue">
                  <strong>Dateiname:</strong> {selectedResource.file_name}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleConfirmDownload}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-bright-gold to-luxury-gold text-midnight-blue font-bold rounded-lg hover:scale-105 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download starten
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
