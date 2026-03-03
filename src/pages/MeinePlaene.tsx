import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Trash2, Eye, LogOut } from 'lucide-react';

interface SavedPlan {
  id: string;
  created_at: string;
  user_name?: string;
  business_type: string;
  main_goal: string;
  platforms: string[];
  content_posts: any[];
  total_posts: number;
}

export default function MeinePlaene() {
  const [user, setUser] = useState<any>(null);
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      loadPlans();
    } else {
      setLoading(false);
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;
      }

      await checkUser();
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setPlans([]);
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
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
    }
  };

  const handleOpen = (plan: SavedPlan) => {
    localStorage.setItem('loadedPlan', JSON.stringify(plan));
    window.location.href = '/jahres-contentplan?loaded=true';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-16 h-16 border-4 border-[#e8b84a] border-t-transparent rounded-full"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navigation />
        <div className="max-w-md mx-auto py-20 px-4">
          <div className="bg-gradient-to-r from-[#e8b84a] to-[#d4a840] rounded-2xl p-6 mb-6 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-2">
              Anmeldung Memberbereich
            </h2>
            <p className="text-white/90">
              Sichere dir Zugang zu deinen gespeicherten Contentplänen
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl" style={{ padding: '32px', boxShadow: '0 16px 48px rgba(26,39,68,0.15)' }}>
            <h1 className="text-3xl font-bold text-[#1a2744] mb-6 text-center">
              {isLogin ? 'Anmelden' : 'Registrieren'}
            </h1>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  required
                  className="w-full bg-white border-2 border-[#e0e0e0] rounded-lg text-[#1e3a5f] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#e8b84a] transition-all duration-300"
                  style={{ padding: '14px 16px' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e3a5f] mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mindestens 6 Zeichen"
                  required
                  minLength={6}
                  className="w-full bg-white border-2 border-[#e0e0e0] rounded-lg text-[#1e3a5f] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#e8b84a] transition-all duration-300"
                  style={{ padding: '14px 16px' }}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#e8b84a] text-white font-bold rounded-lg hover:bg-[#d4a840] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: '16px' }}
              >
                {authLoading ? 'Lädt...' : (isLogin ? 'Anmelden' : 'Registrieren')}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#1e3a5f] hover:text-[#e8b84a] text-sm font-medium transition-colors"
                >
                  {isLogin ? 'Noch kein Konto? Registrieren' : 'Bereits registriert? Anmelden'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#1a2744]">Meine Contentpläne</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-[#1a2744] text-[#1a2744] font-semibold rounded-md hover:bg-[#1a2744] hover:text-white transition-all duration-300"
          >
            <LogOut size={18} />
            Abmelden
          </button>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <p className="text-xl text-slate-600">
              Du hast noch keine Pläne gespeichert.
            </p>
            <a
              href="/jahres-contentplan"
              className="inline-block mt-6 px-8 py-3 bg-[#e8b84a] text-white font-bold rounded-lg hover:bg-[#d4a840] transition-all duration-300"
            >
              Erstelle deinen ersten Plan
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-6 border border-[#e0e0e0] hover:border-[#e8b84a] transition-all duration-300 shadow-lg"
              >
                <div className="mb-4">
                  <p className="text-sm text-slate-500 mb-2">
                    {formatDate(plan.created_at)}
                  </p>
                  <h3 className="text-xl font-bold text-[#1a2744] mb-1">
                    {plan.user_name ? `${plan.user_name}s Plan` : 'Mein Plan'}
                  </h3>
                  <p className="text-[#1e3a5f]">{plan.business_type}</p>
                </div>

                <div className="mb-4 text-sm text-slate-600">
                  <p className="mb-1">
                    <span className="font-semibold">Ziel:</span> {plan.main_goal}
                  </p>
                  <p className="mb-1">
                    <span className="font-semibold">Plattformen:</span> {plan.platforms.join(', ')}
                  </p>
                  <p>
                    <span className="font-semibold">Posts:</span> {plan.total_posts}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpen(plan)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#e8b84a] text-white font-semibold rounded-lg hover:bg-[#d4a840] transition-all duration-300"
                  >
                    <Eye size={18} />
                    Öffnen
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
