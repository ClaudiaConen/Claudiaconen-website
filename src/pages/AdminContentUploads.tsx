import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import { Upload, Download, Trash2, Search, File, Image, Video, FileText, Calendar, User, Tag } from 'lucide-react';

interface ContentUpload {
  id: string;
  content_plan_id: string;
  user_email: string;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  notes: string | null;
  uploaded_at: string;
  content_plan?: {
    title: string;
    status: string;
    actual_status: string;
    scheduled_date: string;
  };
}

export default function AdminContentUploads() {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<ContentUpload[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<ContentUpload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterFileType, setFilterFileType] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'email' | 'size'>('date');

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
      return;
    }

    loadUploads();
  }, [navigate]);

  useEffect(() => {
    filterAndSortUploads();
  }, [uploads, searchTerm, filterEmail, filterFileType, sortBy]);

  const loadUploads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('content_uploads')
        .select(`
          *,
          content_plan:content_plans(
            title,
            status,
            actual_status,
            scheduled_date
          )
        `)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setUploads(data || []);
    } catch (error) {
      console.error('Error loading uploads:', error);
      alert('Fehler beim Laden der Uploads.');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortUploads = () => {
    let filtered = [...uploads];

    if (searchTerm) {
      filtered = filtered.filter(
        (upload) =>
          upload.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          upload.content_plan?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          upload.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterEmail) {
      filtered = filtered.filter((upload) =>
        upload.user_email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }

    if (filterFileType) {
      filtered = filtered.filter((upload) =>
        upload.file_type.toLowerCase().includes(filterFileType.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime();
        case 'email':
          return a.user_email.localeCompare(b.user_email);
        case 'size':
          return b.file_size - a.file_size;
        default:
          return 0;
      }
    });

    setFilteredUploads(filtered);
  };

  const handleDelete = async (uploadId: string, fileUrl: string) => {
    if (!confirm('Möchtest du diese Datei wirklich löschen?')) return;

    try {
      const filePath = fileUrl.split('/content-uploads/')[1];
      await supabase.storage.from('content-uploads').remove([filePath]);

      const { error } = await supabase
        .from('content_uploads')
        .delete()
        .eq('id', uploadId);

      if (error) throw error;

      await loadUploads();
      alert('Datei erfolgreich gelöscht!');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Fehler beim Löschen der Datei.');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea':
        return 'bg-slate-50 text-slate-700';
      case 'in_progress':
        return 'bg-[#B8860B]/10 text-[#B8860B]';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700';
      case 'published':
        return 'bg-[#1a2a4a]/10 text-[#1a2a4a]';
      default:
        return 'bg-slate-50 text-slate-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'idea':
        return 'Idee';
      case 'in_progress':
        return 'In Arbeit';
      case 'completed':
        return 'Fertig';
      case 'published':
        return 'Veröffentlicht';
      default:
        return 'Unbekannt';
    }
  };

  const uniqueEmails = Array.from(new Set(uploads.map((u) => u.user_email)));
  const uniqueFileTypes = Array.from(
    new Set(uploads.map((u) => u.file_type.split('/')[0]))
  );

  return (
    <>
      <SEO
        title="Content Uploads Verwaltung - Admin"
        description="Verwalte alle hochgeladenen Content-Dateien"
      />
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="relative min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-12 px-4 overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-300/20 p-10 border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-light text-slate-800 mb-2">
                  Content <span className="font-normal text-[#B8860B]">Uploads</span>
                </h1>
                <p className="font-light text-slate-600">
                  <span className="font-normal">{filteredUploads.length}</span> von {uploads.length} Uploads
                </p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/50">
                <Upload className="w-10 h-10 text-[#B8860B]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Suche nach Dateiname, Titel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300 font-light placeholder:text-slate-300"
                />
              </div>

              <select
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300 font-light text-slate-700"
              >
                <option value="">Alle Kunden</option>
                {uniqueEmails.map((email) => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>

              <select
                value={filterFileType}
                onChange={(e) => setFilterFileType(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300 font-light text-slate-700"
              >
                <option value="">Alle Dateitypen</option>
                {uniqueFileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#B8860B] focus:shadow-lg focus:shadow-amber-100/30 transition-all duration-300 font-light text-slate-700"
              >
                <option value="date">Sortieren: Datum</option>
                <option value="email">Sortieren: Kunde</option>
                <option value="size">Sortieren: Größe</option>
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#B8860B] mx-auto"></div>
                <p className="mt-6 font-light text-slate-600">Lade Uploads...</p>
              </div>
            ) : filteredUploads.length === 0 ? (
              <div className="text-center py-16">
                <Upload className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                <p className="font-light text-slate-600 text-lg">Keine Uploads gefunden</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUploads.map((upload) => (
                  <div
                    key={upload.id}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 hover:border-[#B8860B]/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        {getFileIcon(upload.file_type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-normal text-slate-800 truncate">
                              {upload.file_name}
                            </h3>
                            {upload.content_plan && (
                              <p className="text-sm font-light text-slate-600 mt-1">
                                Content: <span className="font-normal">{upload.content_plan.title}</span>
                              </p>
                            )}
                          </div>
                          {upload.content_plan?.actual_status && (
                            <span
                              className={`px-3 py-1.5 rounded-full text-xs font-normal ${getStatusColor(
                                upload.content_plan.actual_status
                              )}`}
                            >
                              {getStatusLabel(upload.content_plan.actual_status)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm font-light text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {upload.user_email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(upload.uploaded_at).toLocaleDateString('de-DE')}
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            {formatFileSize(upload.file_size)}
                          </div>
                          {upload.content_plan?.scheduled_date && (
                            <div className="text-xs font-light text-slate-500">
                              Geplant: {upload.content_plan.scheduled_date}
                            </div>
                          )}
                        </div>

                        {upload.notes && (
                          <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                            <p className="text-sm font-light text-slate-700">{upload.notes}</p>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <a
                            href={upload.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a2a4a] hover:bg-[#1a2a4a]/90 text-white rounded-xl transition-all duration-300 text-sm font-light shadow-lg shadow-slate-300/30 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-0.5 group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B8860B]/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                            <Download className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Download</span>
                          </a>
                          <button
                            onClick={() => handleDelete(upload.id, upload.file_url)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600 rounded-xl transition-all duration-300 text-sm font-light hover:shadow-lg hover:shadow-red-100/50 hover:-translate-y-0.5"
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
        </div>
      </div>
      </div>
    </>
  );
}
