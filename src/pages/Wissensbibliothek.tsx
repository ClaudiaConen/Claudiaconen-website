import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Brain, CheckCircle, XCircle, Calendar, Clock, Tag, Target, FileText, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ChecklistDownloadModal from '../components/ChecklistDownloadModal';
import RelatedArticles from '../components/RelatedArticles';
import { supabase } from '../lib/supabase';
import { articleMatchesSearch } from '../lib/searchSynonyms';

interface Article {
  id: string;
  letter: string;
  slug: string;
  title: string;
  description: string;
  reading_time: number;
  story: string;
  content: ContentSection[];
  scientific_source?: string;
  scientific_content?: string;
  practical_steps: PracticalStep[];
  common_mistakes: CommonMistake[];
  self_test?: SelfTest;
  call_to_action?: CallToAction;
  related_articles: string[];
  tags: string[];
  image_url: string;
  published_at: string;
  author: string;
  checklist?: string[];
  category?: string;
}

interface ContentSection {
  heading: string;
  paragraphs: string[];
}

interface PracticalStep {
  step: number;
  title: string;
  description: string;
}

interface CommonMistake {
  mistake: string;
  why: string;
}

interface SelfTest {
  title: string;
  questions: string[];
  evaluation: {
    high: string;
    medium: string;
    low: string;
  };
  download_link?: string;
}

interface CallToAction {
  title: string;
  description: string;
  links: {
    text: string;
    href: string;
  }[];
}

const MAIN_CATEGORIES = [
  { name: 'Alle Themen', icon: '🎯', tags: [] },
  { name: 'Stimme & Rhetorik', icon: '🎤', tags: ['Stimme', 'Rhetorik', 'Sprechen', 'Sprache', 'Atmung', 'Voice'] },
  { name: 'Storytelling', icon: '📖', tags: ['Storytelling', 'Geschichten', 'Erzählen', 'Markenstory', 'Verkaufs-Story'] },
  { name: 'Präsentation & Bühne', icon: '🎭', tags: ['Präsentation', 'Bühne', 'Bühnenpräsenz', 'Auftritt', 'Performance', 'Vortrag'] },
  { name: 'Leadership & Business', icon: '💼', tags: ['Leadership', 'Führung', 'Business', 'Karriere', 'Mitarbeiter', 'Change'] },
  { name: 'Personal Branding', icon: '⭐', tags: ['Personal Branding', 'Personal Brand', 'Positionierung', 'Marke', 'Sichtbarkeit', 'Branding'] },
  { name: 'Social Media & Marketing', icon: '📱', tags: ['Social Media', 'Marketing', 'Instagram', 'LinkedIn', 'Kommunikation'] },
  { name: 'Speaker Business', icon: '🎙️', tags: ['Speaker', 'Keynote', 'Redner', 'Speaker werden', 'Speaker-Business', 'Keynote-Speaker'] },
  { name: 'KI & Technologie', icon: '🤖', tags: ['KI', 'Künstliche Intelligenz', 'AI-Tools', 'Tools', 'Technologie', 'KI-Ethik'] },
  { name: 'Emotionale Intelligenz', icon: '❤️', tags: ['Emotion', 'Emotionen', 'Empathie', 'Gefühle', 'Psychologie'] },
  { name: 'Körpersprache', icon: '👋', tags: ['Körpersprache', 'Gestik', 'Gesten', 'Nonverbal', 'Nonverbale Kommunikation'] },
  { name: 'Neurowissenschaft', icon: '🧠', tags: ['Neurowissenschaft', 'Gehirn', 'Neuroplastizität', 'Amygdala', 'Spiegelneuronen'] }
];

export default function Wissensbibliothek() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle Themen');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const [currentChecklist, setCurrentChecklist] = useState<{
    title: string;
    slug: string;
    items: string[];
  } | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };


  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || articleMatchesSearch(article, searchTerm);

    const selectedCategoryData = MAIN_CATEGORIES.find(cat => cat.name === selectedCategory);
    const categoryTags = selectedCategoryData?.tags || [];

    const matchesCategory = selectedCategory === 'Alle Themen' ||
      categoryTags.length === 0 ||
      article.tags.some(tag => categoryTags.includes(tag));

    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'Alle Themen') return articles.length;
    const category = MAIN_CATEGORIES.find(cat => cat.name === categoryName);
    if (!category || category.tags.length === 0) return 0;
    return articles.filter(article =>
      article.tags.some(tag => category.tags.includes(tag))
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
      <SEO
        title="Wissensbibliothek | Themen zu Kommunikation & Wirkung"
        description="Die komplette Wissensbibliothek zu Kommunikation & Wirkung. Fundiertes Wissen basierend auf 37 Jahren Erfahrung und über 2.100 Kunden."
        path="/wissensbibliothek"
      />
      <Navigation />

      <main className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="max-w-5xl mx-auto mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Sparkles className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    Diese Wissensbibliothek wurde mit KI-Unterstützung erstellt
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Sie basiert auf <strong>37 Jahren Expertise</strong> und dem Wissen folgender Experten, von denen ich lernen durfte:{' '}
                    <a href="/experten" className="text-blue-700 font-semibold hover:underline">
                      Zur Expertenliste
                    </a>
                    . Alle genannten Experten und deren Beiträge sind gekennzeichnet.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-midnight-blue mb-4 sm:mb-6 px-2">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Wissensbibliothek
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold mb-3 sm:mb-4 px-2">
                Die Umsatzstimme - Fundiertes Wissen zu Kommunikation & Wirkung
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed px-2">
                Wissen, das wirkt. Geschichten, die bleiben. Praxis, die funktioniert.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 px-2">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <BookOpen size={14} className="text-bright-gold flex-shrink-0" />
                  <span className="whitespace-nowrap">37 Jahre Erfahrung</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle size={14} className="text-bright-gold flex-shrink-0" />
                  <span className="whitespace-nowrap">Über 2.100 Kunden</span>
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Brain size={14} className="text-bright-gold flex-shrink-0" />
                  <span className="whitespace-nowrap">Wissenschaftlich fundiert</span>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Z.B. Redeangst, Nervosität, Lampenfieber..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-midnight-blue placeholder-gray-400 focus:outline-none focus:border-bright-gold transition-colors shadow-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Die intelligente Suche versteht Synonyme: "Redeangst" findet auch "Lampenfieber", "Nervosität" und "Präsentationsangst"
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="text-bright-gold" size={24} />
                <h3 className="text-xl font-bold text-midnight-blue">
                  Nach Themengebiet filtern
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {MAIN_CATEGORIES.map(category => {
                  const count = getCategoryCount(category.name);
                  const isSelected = selectedCategory === category.name;

                  return (
                    <motion.button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl font-semibold transition-all text-left ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue shadow-lg'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-2xl flex-shrink-0">{category.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm truncate">{category.name}</div>
                            <div className={`text-xs ${isSelected ? 'text-midnight-blue/70' : 'text-gray-500'}`}>
                              {count} {count === 1 ? 'Artikel' : 'Artikel'}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle size={20} className="text-midnight-blue flex-shrink-0" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-bright-gold border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Lade Wissensbibliothek...</p>
            </div>
          ) : (
            <>
              {filteredArticles.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-2xl font-bold text-midnight-blue">
                      {selectedCategory === 'Alle Themen' ? 'Alle Artikel' : selectedCategory}
                    </h2>
                    <span className="text-gray-600 font-semibold">
                      {filteredArticles.length} {filteredArticles.length === 1 ? 'Artikel' : 'Artikel'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredArticles.map((article) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-luxury-gold/30 cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                          />
                          {article.category && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue px-3 py-1 rounded-full text-xs font-bold">
                              {article.category}
                            </div>
                          )}
                        </div>
                        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="flex-shrink-0" />
                              <span className="whitespace-nowrap">{article.reading_time} Min.</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={12} className="flex-shrink-0" />
                              <span className="whitespace-nowrap">{new Date(article.published_at).toLocaleDateString('de-DE')}</span>
                            </div>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-midnight-blue line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
                            {article.description}
                          </p>
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {article.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border border-luxury-gold/30 rounded-full text-xs text-gray-700"
                                >
                                  <Tag size={10} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <button className="w-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform">
                            Artikel lesen
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-xl text-gray-500">Keine Artikel gefunden.</p>
                  <p className="text-gray-400 mt-2">Versuche es mit einem anderen Suchbegriff oder Themengebiet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <div className="min-h-screen px-2 sm:px-4 py-8 sm:py-20">
              <motion.article
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-48 sm:h-72 md:h-96 overflow-hidden">
                  <img
                    src={selectedArticle.image_url}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm text-midnight-blue w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-lg sm:text-xl"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-2 sm:gap-3 text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 flex-wrap">
                      {selectedArticle.category && (
                        <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold text-xs sm:text-sm">
                          {selectedArticle.category}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="flex-shrink-0" />
                        <span className="whitespace-nowrap">Lesezeit: {selectedArticle.reading_time} Min.</span>
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {selectedArticle.title}
                    </h2>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg">
                    <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <BookOpen className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-blue-900 text-base sm:text-lg mb-2">Geschichte aus der Praxis</h3>
                        <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {selectedArticle.story}
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedArticle.content && selectedArticle.content.length > 0 && (
                    <div className="space-y-6">
                      {selectedArticle.content.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="text-xl sm:text-2xl font-bold text-midnight-blue mb-3 sm:mb-4">
                            {section.heading}
                          </h3>
                          {section.paragraphs.map((para, pIdx) => (
                            <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                              {para}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedArticle.scientific_content && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-4 sm:p-6 rounded-r-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Brain className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-purple-900 text-base sm:text-lg mb-2">Wissenschaftlicher Hintergrund</h3>
                          {selectedArticle.scientific_source && (
                            <p className="text-xs sm:text-sm text-purple-700 mb-3">
                              <strong>Quelle:</strong> {selectedArticle.scientific_source}
                            </p>
                          )}
                          <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                            {selectedArticle.scientific_content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArticle.practical_steps && selectedArticle.practical_steps.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 sm:p-6 rounded-r-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-green-900 text-base sm:text-lg mb-3 sm:mb-4">Sofort umsetzbar</h3>
                          <div className="space-y-4">
                            {selectedArticle.practical_steps.map((step) => (
                              <div key={step.step}>
                                <p className="text-sm sm:text-base font-semibold text-green-800 mb-1">
                                  Schritt {step.step}: {step.title}
                                </p>
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArticle.common_mistakes && selectedArticle.common_mistakes.length > 0 && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <XCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-red-900 text-base sm:text-lg mb-3 sm:mb-4">Die häufigsten Fehler</h3>
                          <div className="space-y-3">
                            {selectedArticle.common_mistakes.map((mistake, idx) => (
                              <div key={idx} className="flex gap-2 sm:gap-3">
                                <span className="font-bold text-red-600 flex-shrink-0 text-sm sm:text-base">{idx + 1}.</span>
                                <div>
                                  <p className="text-sm sm:text-base font-semibold text-red-800">{mistake.mistake}</p>
                                  <p className="text-xs sm:text-sm text-gray-700">{mistake.why}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArticle.self_test && (
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-4 sm:p-6 rounded-r-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <FileText className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-cyan-900 text-base sm:text-lg mb-3 sm:mb-4">
                            📊 Selbsttest: {selectedArticle.self_test.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-medium">Beantworte ehrlich (Ja/Nein):</p>
                          <div className="space-y-2 mb-6">
                            {selectedArticle.self_test.questions.map((question, idx) => (
                              <div key={idx} className="flex items-start gap-2 sm:gap-3">
                                <span className="text-cyan-600 flex-shrink-0 text-sm sm:text-base">□</span>
                                <span className="text-sm sm:text-base text-gray-700">{question}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t-2 border-cyan-200 pt-3 sm:pt-4">
                            <p className="font-bold text-cyan-900 mb-2 sm:mb-3 text-sm sm:text-base">Auswertung:</p>
                            <div className="space-y-2 text-xs sm:text-sm">
                              <p className="break-words"><strong className="text-green-700">4-5x Ja:</strong> <span className="text-gray-700">{selectedArticle.self_test.evaluation.high}</span></p>
                              <p className="break-words"><strong className="text-yellow-700">2-3x Ja:</strong> <span className="text-gray-700">{selectedArticle.self_test.evaluation.medium}</span></p>
                              <p className="break-words"><strong className="text-orange-700">0-1x Ja:</strong> <span className="text-gray-700">{selectedArticle.self_test.evaluation.low}</span></p>
                            </div>
                            {selectedArticle.checklist && selectedArticle.checklist.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentChecklist({
                                    title: selectedArticle.title,
                                    slug: selectedArticle.slug,
                                    items: selectedArticle.checklist || []
                                  });
                                  setChecklistModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-2 text-sm sm:text-base bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                              >
                                <ExternalLink size={16} />
                                Erweiterte Checkliste herunterladen
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArticle.call_to_action && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-4 sm:p-6 rounded-r-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Target className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1">
                          <h3 className="font-bold text-amber-900 text-base sm:text-lg mb-2 sm:mb-3">
                            🎯 {selectedArticle.call_to_action.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                            {selectedArticle.call_to_action.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {selectedArticle.call_to_action.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.href}
                                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform shadow-md"
                              >
                                {link.text}
                                <ArrowRight size={16} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <RelatedArticles
                    currentArticle={selectedArticle}
                    allArticles={articles}
                    maxArticles={3}
                    onArticleClick={(article) => setSelectedArticle(article as Article)}
                  />

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-gray-100">
                    <div className="text-xs sm:text-sm text-gray-500">
                      Von {selectedArticle.author}
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedArticle.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border border-luxury-gold/30 rounded-full text-[10px] sm:text-xs text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-gray-200 bg-gray-50 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 px-4 sm:px-6 md:px-8 lg:px-12 py-4 rounded-b-3xl">
                    <div className="flex items-start gap-2 text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                      <Sparkles size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">Inhalte:</span> KI-unterstützt
                        {selectedArticle.scientific_source && (
                          <>
                            {' '}<span className="font-semibold">| Expertenwissen:</span> {selectedArticle.scientific_source}
                          </>
                        )}
                        {' '}<span className="font-semibold">| Eigene Expertise:</span> Claudia Die Umsatzstimme
                        {' '}<span className="text-gray-500">|</span>{' '}
                        <a href="/experten" className="text-blue-600 hover:underline font-medium">
                          Alle Experten ansehen
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentChecklist && (
        <ChecklistDownloadModal
          isOpen={checklistModalOpen}
          onClose={() => {
            setChecklistModalOpen(false);
            setCurrentChecklist(null);
          }}
          articleTitle={currentChecklist.title}
          articleSlug={currentChecklist.slug}
          checklistContent={currentChecklist.items}
        />
      )}

      <Footer />
    </div>
  );
}
