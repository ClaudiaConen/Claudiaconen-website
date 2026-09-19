import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Download, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

export default function ChecklistBestaetigung() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'expired' | 'error'>('loading');
  const [downloadData, setDownloadData] = useState<{
    articleTitle: string;
    articleSlug: string;
    checklist: string[];
  } | null>(null);

  useEffect(() => {
    if (token) {
      confirmEmail(token);
    } else {
      setStatus('error');
    }
  }, [token]);

  const confirmEmail = async (confirmationToken: string) => {
    try {
      const { data: download, error: fetchError } = await supabase
        .from('checklist_downloads')
        .select('*')
        .eq('confirmation_token', confirmationToken)
        .maybeSingle();

      if (fetchError || !download) {
        setStatus('error');
        return;
      }

      if (download.is_confirmed) {
        const { data: article } = await supabase
          .from('knowledge_articles')
          .select('title, slug, checklist')
          .eq('slug', download.article_slug)
          .single();

        if (article && article.checklist) {
          setDownloadData({
            articleTitle: article.title,
            articleSlug: article.slug,
            checklist: article.checklist,
          });
          setStatus('success');
          return;
        }
      }

      const expiresAt = new Date(download.token_expires_at);
      if (expiresAt < new Date()) {
        setStatus('expired');
        return;
      }

      const { error: updateError } = await supabase
        .from('checklist_downloads')
        .update({
          is_confirmed: true,
          confirmed_at: new Date().toISOString(),
        })
        .eq('confirmation_token', confirmationToken);

      if (updateError) {
        setStatus('error');
        return;
      }

      const { data: article } = await supabase
        .from('knowledge_articles')
        .select('title, slug, checklist')
        .eq('slug', download.article_slug)
        .single();

      if (article && article.checklist) {
        setDownloadData({
          articleTitle: article.title,
          articleSlug: article.slug,
          checklist: article.checklist,
        });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error confirming email:', error);
      setStatus('error');
    }
  };

  const generateAndDownloadChecklist = () => {
    if (!downloadData) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${downloadData.articleTitle} - Checkliste</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #DAA520 0%, #F4D03F 100%);
      padding: 50px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
      animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-10%, -10%); }
    }

    .header h1 {
      color: #1a1a2e;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      position: relative;
      z-index: 1;
    }

    .header .subtitle {
      color: #1a1a2e;
      font-size: 18px;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 50px 40px;
    }

    .title {
      color: #1a1a2e;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 3px solid #DAA520;
    }

    .checklist {
      list-style: none;
      padding: 0;
    }

    .checklist-item {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      margin-bottom: 15px;
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 12px;
      border-left: 4px solid #DAA520;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .checklist-item:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #DAA520;
      border-radius: 6px;
      margin-right: 15px;
      flex-shrink: 0;
      background: white;
      position: relative;
      margin-top: 2px;
    }

    .checkbox::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #DAA520;
      font-size: 16px;
      font-weight: bold;
      opacity: 0.3;
    }

    .item-text {
      flex: 1;
      color: #2c3e50;
      font-size: 16px;
      line-height: 1.6;
    }

    .footer {
      background: #1a1a2e;
      padding: 40px;
      text-align: center;
      color: white;
    }

    .footer-logo {
      font-size: 28px;
      font-weight: bold;
      background: linear-gradient(135deg, #DAA520 0%, #F4D03F 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 15px;
    }

    .footer-text {
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      margin: 10px 0;
    }

    .footer-link {
      color: #F4D03F;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      display: inline-block;
      margin-top: 10px;
    }

    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #DAA520 50%, transparent 100%);
      margin: 30px 0;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .container {
        box-shadow: none;
        border-radius: 0;
      }

      .checklist-item {
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 Erweiterte Checkliste</h1>
      <div class="subtitle">Dein praktischer Leitfaden</div>
    </div>

    <div class="content">
      <h2 class="title">${downloadData.articleTitle}</h2>

      <ul class="checklist">
        ${downloadData.checklist.map(item => `
          <li class="checklist-item">
            <div class="checkbox"></div>
            <div class="item-text">${item.replace(/^□\s*/, '')}</div>
          </li>
        `).join('')}
      </ul>

      <div class="divider"></div>

      <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #fff5e6 0%, #ffe6cc 100%); border-radius: 12px; margin-top: 30px;">
        <p style="color: #1a1a2e; font-size: 18px; font-weight: 600; margin-bottom: 10px;">
          💡 Möchtest du noch tiefer einsteigen?
        </p>
        <p style="color: #666; font-size: 14px;">
          Entdecke meine Workshops, Trainings und persönliches Mentoring
        </p>
      </div>
    </div>

    <div class="footer">
      <div class="footer-logo">Claudia Conen</div>
      <p class="footer-text">Die Stimme für deine Wirkung</p>
      <a href="https://www.claudiaconen.de" class="footer-link">www.claudiaconen.de</a>
      <p class="footer-text" style="margin-top: 20px; font-size: 12px;">
        © ${new Date().getFullYear()} Claudia Conen • Alle Rechte vorbehalten
      </p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadData.articleSlug}-checkliste.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SEO
        title="E-Mail-Bestätigung"
        description="Bestätige deine E-Mail-Adresse für den Checklisten-Download"
        noindex
      />
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#DAA520] border-t-transparent mb-6"></div>
              <h1 className="text-2xl font-bold text-[#1a1a2e] mb-3">
                Bestätigung wird verarbeitet...
              </h1>
              <p className="text-gray-600">
                Bitte warten Sie einen Moment.
              </p>
            </motion.div>
          )}

          {status === 'success' && downloadData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">
                E-Mail erfolgreich bestätigt!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Vielen Dank! Ihre E-Mail-Adresse wurde erfolgreich bestätigt.
              </p>

              <div className="bg-gradient-to-r from-[#fff5e6] to-[#ffe6cc] rounded-xl p-6 mb-8">
                <p className="text-[#1a1a2e] font-semibold mb-2">
                  {downloadData.articleTitle}
                </p>
                <p className="text-sm text-gray-600">
                  Ihre erweiterte Checkliste steht jetzt zum Download bereit.
                </p>
              </div>

              <button
                onClick={generateAndDownloadChecklist}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-[#1a1a2e] font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-lg mb-6"
              >
                <Download size={24} />
                Checkliste jetzt herunterladen
              </button>

              <p className="text-sm text-gray-500 mb-8">
                Die Datei wird als HTML-Dokument heruntergeladen und kann in jedem Browser geöffnet werden.
              </p>

              <button
                onClick={() => navigate('/wissensbibliothek')}
                className="text-[#DAA520] hover:text-[#F4D03F] font-semibold transition-colors"
              >
                Zurück zur Wissensbibliothek
              </button>
            </motion.div>
          )}

          {status === 'expired' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="text-orange-600" size={48} />
              </div>
              <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">
                Link abgelaufen
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Dieser Bestätigungslink ist leider abgelaufen. Bestätigungslinks sind 24 Stunden gültig.
              </p>
              <button
                onClick={() => navigate('/wissensbibliothek')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-[#1a1a2e] font-bold rounded-full hover:scale-105 transition-transform"
              >
                Zur Wissensbibliothek
              </button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <XCircle className="text-red-600" size={48} />
              </div>
              <h1 className="text-3xl font-bold text-[#1a1a2e] mb-4">
                Fehler bei der Bestätigung
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Der Bestätigungslink ist ungültig oder wurde bereits verwendet.
              </p>
              <button
                onClick={() => navigate('/wissensbibliothek')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-[#1a1a2e] font-bold rounded-full hover:scale-105 transition-transform"
              >
                Zur Wissensbibliothek
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
