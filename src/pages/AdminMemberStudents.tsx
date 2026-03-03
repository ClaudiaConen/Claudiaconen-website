import { useState, useEffect } from 'react';
import { GraduationCap, UserPlus, Mail, Key, RefreshCw, Trash2, Eye, EyeOff, Copy, CheckCircle } from 'lucide-react';
import AdminNavigation from '../components/AdminNavigation';
import { supabase } from '../lib/supabase';

interface MemberStudent {
  id: string;
  email: string;
  access_code: string;
  first_name: string;
  last_name: string;
  level: number;
  total_xp: number;
  current_streak: number;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export default function AdminMemberStudents() {
  const [students, setStudents] = useState<MemberStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAccessCode, setShowAccessCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({
    email: '',
    first_name: '',
    last_name: '',
    access_code: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('member_students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Studenten');
    } finally {
      setIsLoading(false);
    }
  };

  const generateAccessCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setIsCreating(true);

    try {
      const accessCode = newStudent.access_code || generateAccessCode();

      const { error } = await supabase
        .from('member_students')
        .insert([{
          email: newStudent.email,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          access_code: accessCode,
          level: 1,
          total_xp: 0,
          current_streak: 0,
          is_active: true
        }]);

      if (error) throw error;

      setSuccessMessage('Student erfolgreich erstellt');
      setShowCreateModal(false);
      setNewStudent({ email: '', first_name: '', last_name: '', access_code: '' });
      await fetchStudents();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Fehler beim Erstellen des Studenten');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Möchtest du diesen Studenten wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('member_students')
        .delete()
        .eq('id', studentId);

      if (error) throw error;

      setSuccessMessage('Student erfolgreich gelöscht');
      await fetchStudents();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen');
    }
  };

  const toggleStudentStatus = async (studentId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('member_students')
        .update({ is_active: !currentStatus })
        .eq('id', studentId);

      if (error) throw error;

      await fetchStudents();
      setSuccessMessage('Status erfolgreich aktualisiert');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Aktualisieren');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCap className="text-blue-600" size={36} />
                Member-Studenten
              </h1>
              <p className="text-gray-600 mt-2">
                Verwalte die Teilnehmer der KI-Manager Ausbildung
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <UserPlus size={20} />
              Neuer Student
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="animate-spin mx-auto text-blue-600" size={48} />
            <p className="text-gray-600 mt-4">Lade Studenten...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <GraduationCap className="mx-auto text-gray-400" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mt-4">
              Noch keine Studenten
            </h3>
            <p className="text-gray-600 mt-2">
              Erstelle den ersten Studenten für die KI-Manager Ausbildung
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ersten Studenten erstellen
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">E-Mail</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Access Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Level / XP</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Streak</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {student.first_name} {student.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Erstellt: {new Date(student.created_at).toLocaleDateString('de-DE')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Mail size={16} className="text-gray-400" />
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg font-mono text-sm">
                            <Key size={16} className="text-gray-500" />
                            <span className={showAccessCode === student.id ? '' : 'blur-sm select-none'}>
                              {student.access_code}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAccessCode(showAccessCode === student.id ? null : student.id)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title={showAccessCode === student.id ? 'Verbergen' : 'Anzeigen'}
                        >
                          {showAccessCode === student.id ? (
                            <EyeOff size={18} className="text-gray-600" />
                          ) : (
                            <Eye size={18} className="text-gray-600" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(student.access_code, student.id)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Kopieren"
                        >
                          {copiedCode === student.id ? (
                            <CheckCircle size={18} className="text-green-600" />
                          ) : (
                            <Copy size={18} className="text-gray-600" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-blue-600">Level {student.level}</div>
                        <div className="text-gray-500">{student.total_xp} XP</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm font-medium text-orange-600">
                        🔥 {student.current_streak} Tage
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStudentStatus(student.id, student.is_active)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          student.is_active
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {student.is_active ? 'Aktiv' : 'Inaktiv'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Löschen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <UserPlus className="text-blue-600" size={28} />
              Neuer Student
            </h2>

            {createError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Vorname
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.first_name}
                  onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Max"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nachname
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.last_name}
                  onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mustermann"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  required
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="max@beispiel.de"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Access Code (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStudent.access_code}
                    onChange={(e) => setNewStudent({ ...newStudent, access_code: e.target.value.toUpperCase() })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="Auto-generiert"
                  />
                  <button
                    type="button"
                    onClick={() => setNewStudent({ ...newStudent, access_code: generateAccessCode() })}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Code generieren"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leer lassen für automatische Generierung
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setCreateError('');
                    setNewStudent({ email: '', first_name: '', last_name: '', access_code: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Erstelle...' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
