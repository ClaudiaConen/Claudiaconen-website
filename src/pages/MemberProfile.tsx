import { useState } from 'react';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import MemberNavigation from '../components/MemberNavigation';
import { Mail, Calendar, Flame, Zap, Save, Loader2 } from 'lucide-react';

export default function MemberProfile() {
  const { student, updateProfile } = useStudentAuth();
  const [firstName, setFirstName] = useState(student?.firstName || '');
  const [lastName, setLastName] = useState(student?.lastName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');

    try {
      await updateProfile({ firstName, lastName });
      setSuccessMessage('Profil erfolgreich aktualisiert!');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      alert(error.message || 'Fehler beim Speichern');
    } finally {
      setIsSaving(false);
    }
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <MemberNavigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Mein Profil</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
            <Zap className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Level</p>
            <p className="text-4xl font-bold">{student.level}</p>
            <p className="text-white/60 text-sm mt-2">{student.totalXp} XP gesamt</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
            <Flame className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Aktueller Streak</p>
            <p className="text-4xl font-bold">{student.currentStreak}</p>
            <p className="text-white/60 text-sm mt-2">Längster: {student.longestStreak} Tage</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
            <Calendar className="w-8 h-8 mb-4" />
            <p className="text-white/80 text-sm mb-1">Mitglied seit</p>
            <p className="text-xl font-bold">
              {new Date(student.createdAt).toLocaleDateString('de-DE', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Persönliche Daten</h2>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {successMessage}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vorname
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nachname
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail</label>
              <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="text-slate-600">{student.email}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Die E-Mail kann nicht geändert werden
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Speichere...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Änderungen speichern</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
