import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { requestPasswordReset } from '../lib/adminAuth';

export default function AdminPasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Senden der E-Mail');
    } finally {
      setIsLoading(false);
    }
  };

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
                E-Mail versendet
              </h1>
              <p className="text-gray-600 mb-6">
                Falls ein Account mit dieser E-Mail-Adresse existiert, haben wir einen Link zum Zurücksetzen des Passworts versendet.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Bitte überprüfen Sie Ihr E-Mail-Postfach. Der Link ist 24 Stunden gültig.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
              >
                <ArrowLeft size={20} />
                Zurück zum Login
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
              <Mail className="text-yellow-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Passwort vergessen?
            </h1>
            <p className="text-gray-600">
              Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  placeholder="E-Mail-Adresse eingeben"
                  required
                  disabled={isLoading}
                />
              </div>
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
              <Mail size={20} />
              {isLoading ? 'Wird versendet...' : 'Reset-Link senden'}
            </button>

            <div className="text-center">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <ArrowLeft size={16} />
                Zurück zum Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
