import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { supabase } from '../lib/supabase';
import MemberNavigation from '../components/MemberNavigation';
import { MessageSquare, Users, MessageCircle, ChevronRight, TrendingUp } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  thread_count: number;
  post_count: number;
}

export default function MemberForum() {
  useStudentAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('member_forum_categories')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Community Forum</h1>
          <p className="text-slate-600">
            Tausche dich mit anderen KI-Manager Teilnehmern aus
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Willkommen im Forum!</h2>
              <p className="text-white/80">
                Stelle Fragen, teile Erfahrungen und lerne von der Community
              </p>
            </div>
            <Users className="w-16 h-16 text-white/20" />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/member/forum/${category.id}`}
                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-purple-100 rounded-lg p-3">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-slate-600 mb-4">{category.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-slate-500">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{category.thread_count || 0} Threads</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{category.post_count || 0} Beiträge</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && categories.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Noch keine Kategorien
            </h3>
            <p className="text-slate-600">
              Das Forum wird in Kürze freigeschaltet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
