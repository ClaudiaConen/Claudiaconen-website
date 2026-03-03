import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { checkAdminAuth } from '../lib/adminAuth';
import AdminNavigation from '../components/AdminNavigation';
import { Search, Trash2, Eye, Target, Share2, FileText, ChevronUp } from 'lucide-react';

interface SavedPlan {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  plan_name: string | null;
  user_name: string | null;
  business_type: string;
  main_goal: string;
  platforms: string[];
  content_posts: any[];
  total_posts: number;
}

export default function AdminContentPlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadPlans();
  }, []);

  const checkAuth = () => {
    const isAdmin = checkAdminAuth();
    if (!isAdmin) {
      navigate('/admin/login');
    }
  };

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_content_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlans(data || []);
    } catch (err) {
      console.error('Fehler beim Laden der Pläne:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Möchtest du diesen Plan wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('saved_content_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;
      setPlans(plans.filter(p => p.id !== planId));
      alert('Plan erfolgreich gelöscht');
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
      alert('Fehler beim Löschen des Plans');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredPlans = plans.filter(plan => {
    const searchLower = searchTerm.toLowerCase();
    return (
      plan.user_name?.toLowerCase().includes(searchLower) ||
      plan.business_type.toLowerCase().includes(searchLower) ||
      plan.main_goal.toLowerCase().includes(searchLower) ||
      plan.platforms.some(p => p.toLowerCase().includes(searchLower))
    );
  });

  const toggleExpanded = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />
        <div className="lg:pl-72 pt-16">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-16 h-16 border-4 border-[#e8b84a] border-t-transparent rounded-full"></div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1a2744]">Gespeicherte Contentpläne</h1>
              <p className="text-slate-600 mt-2">Verwaltung aller Benutzer-Contentpläne</p>
            </div>
            <div className="bg-[#e8b84a] text-white px-6 py-3 rounded-lg font-bold text-xl">
              {plans.length} Pläne
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Suche nach Name, Branche, Ziel oder Plattform..."
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-[#e8b84a] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {filteredPlans.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600">
              {searchTerm ? 'Keine Pläne gefunden' : 'Noch keine Pläne vorhanden'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:border-[#e8b84a] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1a2744]">
                          {plan.user_name ? `${plan.user_name}s Plan` : 'Contentplan'}
                        </h3>
                        <span className="text-sm text-slate-500">
                          {formatDate(plan.created_at)}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium">{plan.business_type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExpanded(plan.id)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all duration-300 flex items-center gap-2"
                      >
                        {expandedPlan === plan.id ? (
                          <>
                            <ChevronUp size={18} />
                            Weniger
                          </>
                        ) : (
                          <>
                            <Eye size={18} />
                            Details
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                      >
                        <Trash2 size={18} />
                        Löschen
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Target className="w-5 h-5 text-[#e8b84a]" />
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Ziel</p>
                        <p className="text-sm">{plan.main_goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Share2 className="w-5 h-5 text-[#e8b84a]" />
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Plattformen</p>
                        <p className="text-sm">{plan.platforms.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <FileText className="w-5 h-5 text-[#e8b84a]" />
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Posts</p>
                        <p className="text-sm font-bold">{plan.total_posts}</p>
                      </div>
                    </div>
                  </div>

                  {expandedPlan === plan.id && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h4 className="text-lg font-bold text-[#1a2744] mb-4">Content Posts</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {plan.content_posts.map((post: any, index: number) => (
                          <div
                            key={index}
                            className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-semibold text-[#1a2744]">{post.title}</h5>
                              <span className="text-sm text-slate-500">{post.month}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{post.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs px-2 py-1 bg-white border border-slate-300 rounded">
                                {post.contentType}
                              </span>
                              <span className="text-xs px-2 py-1 bg-white border border-slate-300 rounded">
                                {post.channel}
                              </span>
                              <span className="text-xs px-2 py-1 bg-[#e8b84a]/20 text-[#d4a840] border border-[#e8b84a] rounded">
                                {post.priority}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
