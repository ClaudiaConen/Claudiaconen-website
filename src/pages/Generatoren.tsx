import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

interface Tool {
  icon: string;
  title: string;
  description: string;
  path?: string;
  available: boolean;
}

interface Category {
  emoji: string;
  title: string;
  subtitle: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    emoji: '📚',
    title: 'Für Lerninhalte',
    subtitle: 'Erstelle Bildungsinhalte, die begeistern',
    tools: [
      {
        icon: '❓',
        title: 'Quiz-Generator',
        description: 'Erstelle interaktive Quiz-Formate, die deine Expertise zeigen und Neugier wecken.',
        path: '/quiz-generator',
        available: true
      },
      {
        icon: '📖',
        title: 'Workbook-Generator',
        description: 'Baue Workbooks, die deine Kunden durch Transformationen führen.',
        path: '/workbook-generator',
        available: true
      },
      {
        icon: '🃏',
        title: 'Quiz und Lernkarten',
        description: 'Teste dein Wissen mit 27 Fragen und 25 interaktiven Lernkarten.',
        path: '/wirkungskraft-quiz',
        available: true
      },
      {
        icon: '✅',
        title: 'Checklisten-Generator',
        description: 'Erstelle professionelle Checklisten für jeden Anlass.',
        available: false
      }
    ]
  },
  {
    emoji: '📱',
    title: 'Für Social Media',
    subtitle: 'Tools für maximale Reichweite',
    tools: [
      {
        icon: '🎠',
        title: 'Karussell-Generator',
        description: 'Gestalte Social-Media-Karussells, die Aufmerksamkeit fesseln.',
        path: '/karussell-generator',
        available: true
      },
      {
        icon: '📅',
        title: 'Content-Plan-Generator',
        description: 'Erstelle deinen strategischen Jahres-Contentplan mit KI-Unterstützung.',
        path: '/jahres-contentplan',
        available: true
      },
      {
        icon: '🎬',
        title: 'Reels-Skript-Generator',
        description: 'Schreibe packende Skripte für virale Reels.',
        available: false
      },
      {
        icon: '📸',
        title: 'Story-Vorlagen',
        description: 'Fertige Story-Templates für Instagram & Co.',
        available: false
      },
      {
        icon: '✍️',
        title: 'Caption-Generator',
        description: 'Formuliere Captions, die berühren und konvertieren.',
        available: false
      }
    ]
  },
  {
    emoji: '🎤',
    title: 'Für Präsentationen',
    subtitle: 'Überzeuge auf der Bühne',
    tools: [
      {
        icon: '📊',
        title: 'Pitch-Deck-Builder',
        description: 'Baue Pitch-Decks, die Investoren überzeugen.',
        available: false
      },
      {
        icon: '🎯',
        title: 'Keynote-Struktur',
        description: 'Strukturiere deine Keynote wie ein Profi.',
        available: false
      },
      {
        icon: '📖',
        title: 'Storytelling-Helfer',
        description: 'Finde die perfekte Story für deine Botschaft.',
        available: false
      },
      {
        icon: '🎭',
        title: 'Intro-Generator',
        description: 'Kreiere unwiderstehliche Intros für deine Talks.',
        available: false
      }
    ]
  }
];

export default function Generatoren() {
  return (
    <>
      <SEO
        title="Wirkungskraft-Werkzeuge | Deine Content-Generatoren"
        description="Nutze diese Tools, um deine Einzigartigkeit sichtbar zu machen. Workbook, Karussell und Quiz Generator - ohne Technik-Stress, mit deinem Branding."
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FBF8F3] to-white">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#C9A227]/10 text-[#C9A227] px-6 py-2 rounded-full font-semibold mb-6">
              <Sparkles className="w-5 h-5" />
              <span>Kostenlose Tools für deinen Erfolg</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1A2E] mb-6 leading-tight">
              Deine <span className="text-[#C9A227]">Wirkungskraft</span>-Werkzeuge
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Nutze diese Tools, um deine Einzigartigkeit sichtbar zu machen.
            </p>

            <p className="text-lg text-gray-500 font-medium">
              Ohne Technik-Stress. Mit deinem Branding.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto space-y-16">
            {categories.map((category, catIndex) => (
              <div key={catIndex}>
                {/* Category Header */}
                <div className="text-center mb-10">
                  <div className="text-5xl mb-4">{category.emoji}</div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A2E] mb-2">
                    {category.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {category.subtitle}
                  </p>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={toolIndex}
                      className={`bg-white rounded-2xl shadow-lg border p-6 transition-all duration-300 ${
                        tool.available
                          ? 'border-gray-100 hover:shadow-2xl hover:border-[#C9A227]/30 group cursor-pointer'
                          : 'border-gray-100 opacity-60'
                      }`}
                    >
                      {/* Icon */}
                      <div className="text-5xl mb-4">
                        {tool.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                        {tool.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {tool.description}
                      </p>

                      {/* CTA / Status */}
                      {tool.available && tool.path ? (
                        <Link
                          to={tool.path}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold px-4 py-2.5 rounded-full hover:shadow-lg transition-all text-sm group mt-auto"
                        >
                          <span>Jetzt erstellen</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ) : (
                        <div className="flex items-center justify-center gap-2 bg-gray-100 text-gray-500 font-semibold px-4 py-2.5 rounded-full text-sm">
                          <Sparkles className="w-4 h-4" />
                          <span>Bald verfügbar</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-[#1A1A2E]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Warum diese Tools?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              In einer Welt voller KI-generierter Perfektion ist es deine <span className="text-[#C9A227] font-semibold">menschliche Einzigartigkeit</span>, die wirklich verbindet. Diese Tools helfen dir, deine Persönlichkeit zu zeigen – ohne dass du Technik-Profi sein musst.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Schnell</h3>
                <p className="text-gray-300">
                  In Minuten erstellt, nicht in Stunden. Konzentriere dich auf deine Inhalte, nicht auf die Technik.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Dein Stil</h3>
                <p className="text-gray-300">
                  Anpassbar an deine Marke und dein Corporate Design. Deine Farben, deine Botschaft.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <p className="text-gray-300">
                  Professionelle Ergebnisse, die beeindrucken und deine Expertise unterstreichen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A2E] mb-6">
              Perfektion klickt. Persönlichkeit bleibt.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Starte jetzt und mache deine Wirkungskraft sichtbar.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/workbook-generator"
                className="bg-gradient-to-r from-[#C9A227] to-[#DAA520] text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all"
              >
                Workbook erstellen
              </Link>
              <Link
                to="/quiz-generator"
                className="bg-white text-[#1A1A2E] border-2 border-[#1A1A2E] font-semibold px-8 py-4 rounded-full hover:bg-[#1A1A2E] hover:text-white transition-all"
              >
                Quiz bauen
              </Link>
            </div>

            {/* Coming Soon Notice */}
            <div className="mt-12 p-6 bg-[#FBF8F3] rounded-2xl border border-[#C9A227]/20">
              <p className="text-sm text-gray-600">
                <Sparkles className="w-4 h-4 inline mr-2 text-[#C9A227]" />
                <strong className="text-[#C9A227]">Mehr Tools kommen bald!</strong> Wir arbeiten an weiteren Generatoren für Social Media und Präsentationen. Bleib gespannt!
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
