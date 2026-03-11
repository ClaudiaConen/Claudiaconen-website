import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Tag } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  content: JSX.Element;
}

export default function Wissensmagazin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: '7-a-fragen',
      title: 'Die 7 A-Fragen, die über Ihre Wirkung entscheiden',
      description: 'Entdecken Sie die 7 A-Fragen zur Wirkungskraft: Wie Sie Stimme, Marke und Persönlichkeit in Einklang bringen.',
      date: '2025-01-15',
      tags: ['Wirkungskraft', 'Stimme', 'Persönlichkeit', 'Marke'],
      image: '/photo_2025-11-08 17.45.50 (1).jpeg',
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            In einer Welt, in der Stimme, Persönlichkeit und Marke untrennbar zusammengehören, stellt sich eine zentrale Frage: Was unterscheidet Menschen mit Ausstrahlung von denen, die gehört — aber nicht erinnert werden? Unter Anwendung neurowissenschaftlicher Erkenntnisse entwickelt dieses Modell sieben „A-Fragen", die Ihre Wirkung auf ein neues Niveau heben — weit über Perfektion hinaus, hinein in Unverwechselbarkeit.
          </p>

          <div className="space-y-8 mt-8">
            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">1. „Ankommen?" – Kommen Sie beim Gegenüber an?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Bevor Sie ein Wort sprechen, registriert das Gehirn Ihres Gegenübers bereits Wirkmechanismen. In ca. 180 Millisekunden entscheidet sich: Bin ich bereit zuzuhören oder bereits abgeschaltet? Ihre Präsenz, Klangfarbe, Haltung – all das wirkt. Wenn Sie bewusst „ankommen", öffnet sich der Raum für Wirkung.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">2. „Aufmachen?" – Öffnen Sie Räume oder Mauern?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Wirkung entsteht durch Öffnung – nicht durch Funktionieren. Ihre Stimme soll Türen öffnen, nicht Schleusen dicht machen. Wer Mauern aufbaut, erschwert Nähe. Ihre Aufgabe: Räume schaffen, in denen emotionales Entscheiden entsteht.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">3. „Anders?" – Heben Sie sich ab oder bleiben Sie verborgen?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  In der Masse bleibt man unsichtbar. Ihre Stimme, Ihre Story, Ihre Marke – sie müssen „anders" genug sein, um wahrgenommen zu werden. Unterscheiden heißt nicht laut sein, sondern klar sein.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">4. „Authentisch?" – Sind Sie echt oder nur perfekt?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Perfektion ist austauschbar. Echtsein nicht. Im Zeitalter der KI wird Ihre Authentizität zur Währung. Ihre Stimme, Ihre Geschichte, Ihre Haltung – alles muss echt sein, damit Sie wirken.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">5. „Anspruchsvoll?" – Welcher Maßstab treibt Sie?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Wirkung ist kein Zufall – sie verlangt Bewusstsein und Anspruch. Welche Standards setzen Sie sich? Welche Wirkung ist Ihr Ziel? Nur wer anspruchsvoll mit sich ist, kann Wirkung entfalten.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">6. „Aktiv?" – Handeln Sie oder reagieren Sie nur?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Wirkung entsteht nicht durch Reaktion, sondern durch Aktion. Ihre Stimme, Ihre Marke, Ihre Botschaft – sie müssen vollzogen werden. Wer nur reagiert, bleibt passiv. Wer aktiv ist, wirkt.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">7. „Aufrecht?" – Stehen Sie für etwas oder schweben Sie mit?</span></h2>
              <div className="bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border-l-4 border-bright-gold p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  Eine starke Marke steht für etwas – und lässt sich nicht treiben. Ihre Wirkung ist dann nachhaltig, wenn Sie Haltung zeigen. „Aufrecht" sein heißt: sichtbar, verbindlich, konsequent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4"><span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Ihr Weg zur unverwechselbaren Wirkung</span></h2>
              <p className="text-gray-700 leading-relaxed">
                Diese sieben Fragen sind nicht nur rhetorisch – sie sind handlungsleitend. Jede beantwortete Frage erhöht Ihre Wirkungskraft. Jede ausgelassene Frage schwächt Ihre Präsenz. Nutzen Sie dieses Modell als Kompass: Stimme, Marke, Persönlichkeit. Ihre Wirkung beginnt dort, wo Perfektion endet.
              </p>
            </section>
          </div>
        </div>
      ),
    },
  ];

  const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
      <SEO
        title="Wissensmagazin"
        description="Entdecken Sie fundiertes Wissen über Stimme, Wirkung, Persönlichkeit und Markenführung."
        path="/wissensmagazin"
      />
      <Navigation />

      <main className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl lg:text-7xl text-midnight-blue mb-6 text-center">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Wissensmagazin</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              Fundiertes Wissen über Stimme, Wirkung, Persönlichkeit und Markenführung
            </p>

            <div className="mb-12 space-y-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Artikel durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-midnight-blue placeholder-gray-400 focus:outline-none focus:border-bright-gold transition-colors shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === null
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue shadow-md'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-bright-gold shadow-sm'
                  }`}
                >
                  Alle
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-bright-gold shadow-sm'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-luxury-gold/30 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={16} />
                      <time>{new Date(article.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h2 className="text-xl font-bold text-midnight-blue group-hover:text-bright-gold transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border border-luxury-gold/30 rounded-full text-xs text-gray-700"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`#article-${article.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const articleSection = document.getElementById(`article-${article.id}`);
                        articleSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-block px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform"
                    >
                      Artikel lesen
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">Keine Artikel gefunden.</p>
              </div>
            )}

            <div className="mt-20 space-y-32">
              {filteredArticles.map((article) => (
                <motion.section
                  key={article.id}
                  id={`article-${article.id}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-gray-100"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                        <Calendar size={16} />
                        <time>{new Date(article.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">{article.title}</span>
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {article.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border border-luxury-gold/30 rounded-full text-sm text-gray-700"
                          >
                            <Tag size={14} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-96 rounded-xl overflow-hidden mb-8">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: 'center 30%' }}
                      />
                    </div>
                    {article.content}
                  </div>
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
