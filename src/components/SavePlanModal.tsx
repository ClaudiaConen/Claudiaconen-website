import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SavePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planData: {
    userName?: string;
    businessType: string;
    mainGoal: string;
    platforms: string[];
    contentPosts: any[];
    totalPosts: number;
  };
  onSaveSuccess: () => void;
}

export function SavePlanModal({ isOpen, onClose, planData, onSaveSuccess }: SavePlanModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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

      await savePlan();
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const savePlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Benutzer nicht authentifiziert');
      }

      const { error: insertError } = await supabase
        .from('saved_content_plans')
        .insert({
          user_id: user.id,
          user_name: planData.userName,
          business_type: planData.businessType,
          main_goal: planData.mainGoal,
          platforms: planData.platforms,
          content_posts: planData.contentPosts,
          total_posts: planData.totalPosts,
        });

      if (insertError) throw insertError;

      onSaveSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Fehler beim Speichern des Plans');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative" style={{ padding: '32px', boxShadow: '0 16px 48px rgba(26,39,68,0.15)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#1a2744] mb-6">
          Möchtest du deinen Plan speichern?
        </h2>

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
            disabled={loading}
            className="w-full bg-[#e8b84a] text-white font-bold rounded-lg hover:bg-[#d4a840] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ padding: '16px' }}
          >
            {loading ? 'Lädt...' : '💾 Jetzt speichern'}
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
  );
}
