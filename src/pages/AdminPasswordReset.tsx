import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { resetPassword } from '../lib/adminAuth';

export default function AdminPasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Ungültiger oder fehlender Reset-Token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Das Passwort muss mindestens 8 Zeichen lang sein');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein');
      return;
    }

    if (!token) {
      setError('Ungültiger Reset-Token');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, newPassword);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Zurücksetzen des Passworts');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="text-red-600" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Ungültiger Link
              </h1>
              <p className="text-gray-600 mb-8">
                Der Reset-Link ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen Link an.
              </p>
              <Link
                to="/admin/passwort-vergessen"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                Neuen Link anfordern
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Passwort erfolgreich geändert
              </h1>
              <p className="text-gray-600 mb-2">
                Ihr Passwort wurde erfolgreich zurückgesetzt.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Sie werden in wenigen Sekunden zur Login-Seite weitergeleitet...
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                Jetzt anmelden
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Lock className="text-yellow-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Neues Passwort festlegen
            </h1>
            <p className="text-gray-600">
              Bitte geben Sie Ihr neues Passwort ein.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Neues Passwort
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Mindestens 8 Zeichen"
                required
                disabled={isLoading}
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                Das Passwort muss mindestens 8 Zeichen lang sein
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Passwort bestätigen
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Passwort wiederholen"
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Lock size={20} />
              {isLoading ? 'Wird gespeichert...' : 'Passwort ändern'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
