import { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChecklistDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleTitle: string;
  articleSlug: string;
  checklistContent: string[];
}

export default function ChecklistDownloadModal({
  isOpen,
  onClose,
  articleTitle,
  articleSlug,
}: ChecklistDownloadModalProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data: insertData, error: insertError } = await supabase
        .from('checklist_downloads')
        .insert({
          email,
          article_slug: articleSlug,
          article_title: articleTitle,
          consent,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const confirmationToken = insertData.confirmation_token;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/send-checklist-confirmation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            email,
            articleTitle,
            confirmationToken,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('E-Mail konnte nicht versendet werden');
      }

      setIsSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setConsent(false);
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Schließen"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
                E-Mail versendet!
              </h3>
              <p className="text-gray-600 mb-4">
                Bitte überprüfen Sie Ihr E-Mail-Postfach und klicken Sie auf den Bestätigungslink.
              </p>
              <p className="text-sm text-gray-500">
                Der Link ist 24 Stunden gültig. Falls Sie keine E-Mail erhalten, prüfen Sie bitte Ihren Spam-Ordner.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#DAA520] to-[#F4D03F] rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
                  Erweiterte Checkliste
                </h3>
                <p className="text-gray-600 text-sm">
                  {articleTitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all"
                    placeholder="ihre@email.de"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-[#DAA520] border-gray-300 rounded focus:ring-[#DAA520]"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    Ich stimme zu, dass meine E-Mail-Adresse gespeichert wird, um mir die Checkliste
                    zuzusenden und mich über weitere Angebote zu informieren. Die Einwilligung kann
                    jederzeit widerrufen werden.*
                  </label>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Wird versendet...' : 'Bestätigungsmail anfordern'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Sie erhalten eine E-Mail mit einem Bestätigungslink. Nach der Bestätigung können Sie die Checkliste herunterladen.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
