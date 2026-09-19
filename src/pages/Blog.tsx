import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Lightbulb } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function Blog() {
  const blogPosts = [
    {
      id: 'mensch-ki',
      title: 'Mensch & KI',
      description: 'Perfektion ist klickbar – Persönlichkeit bleibt. Warum Einzigartigkeit im Zeitalter der künstlichen Intelligenz dein größter Wettbewerbsvorteil ist.',
      icon: Sparkles,
      image: 'https://images.pexels.com/photos/6476776/pexels-photo-6476776.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/blog-ki',
      gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
      topics: [
        'Neurowissenschaft trifft KI',
        'Vertrauen im digitalen Zeitalter',
        'Die 7 As der modernen Vermarktung',
        'Authentizität als Wettbewerbsvorteil'
      ]
    },
    {
      id: 'wirkung',
      title: 'Wirkung & Persönlichkeit',
      description: 'Artikel über authentische Präsenz, Persönlichkeitsentwicklung und die Kunst, mit Ihrer Einzigartigkeit zu überzeugen.',
      icon: Lightbulb,
      image: 'https://images.pexels.com/photos/8761542/pexels-photo-8761542.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/blog-wirkung',
      gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
      topics: [
        'Authentische Präsenz',
        'Die Macht der Verletzlichkeit',
        'Charisma entwickeln',
        'Stimmige Persönlichkeit'
      ]
    },
    {
      id: 'neuro',
      title: 'Neurowissenschaft & Verkauf',
      description: 'Wissenschaftlich fundierte Erkenntnisse über Kaufentscheidungen und ethisches Verkaufen.',
      icon: Brain,
      image: 'https://images.pexels.com/photos/17483868/pexels-photo-17483868.jpeg?auto=compress&cs=tinysrgb&w=800',
      path: '/blog-neuro',
      gradient: 'from-[#B8860B] via-[#DAA520] to-[#F4D03F]',
      topics: [
        'Das emotionale Gehirn',
        'Spiegelneuronen im Verkauf',
        'Die Stimme und das limbische System',
        'Neuromarketing-Strategien'
      ]
    }
  ];

  return (
    <>
      <SEO
        title="Blog"
        description="Entdecken Sie inspirierende Artikel über KI, Persönlichkeitsentwicklung, Neurowissenschaft und die Kunst der wirkungsvollen Kommunikation."
      />
      <div className="min-h-screen bg-gradient-to-b from-pearl-white to-white">
        <Navigation />

        <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-montserrat font-bold text-5xl md:text-6xl lg:text-7xl text-midnight-blue mb-6">
                Blog & <span className="bg-gradient-to-r from-[#DAA520] to-[#F4D03F] bg-clip-text text-transparent">Aktuelles</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Inspirierende Artikel, praktische Tipps und wissenschaftliche Erkenntnisse für Ihre persönliche und berufliche Entwicklung
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const Icon = post.icon;
                return (
                  <Link
                    key={post.id}
                    to={post.path}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-luxury-gold/30"
                  >
                    <div className={`h-2 bg-gradient-to-r ${post.gradient}`} />

                    <div className="p-8">
                      {post.image ? (
                        <div className="mb-6 rounded-2xl overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${post.gradient} mb-6`}>
                          <Icon size={32} className="text-white" />
                        </div>
                      )}

                      <h3 className="font-montserrat font-bold text-2xl text-midnight-blue mb-4 group-hover:text-bright-gold transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {post.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {post.topics.map((topic, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-bright-gold text-lg mt-1">•</span>
                            <span className="text-gray-700 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-bright-gold font-semibold group-hover:gap-4 transition-all">
                        <span>Zum Blog</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-20 bg-gradient-to-br from-midnight-blue to-royal-navy rounded-3xl p-12 text-center">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-pearl-white mb-6">
                Bleiben Sie auf dem Laufenden
              </h2>
              <p className="text-pearl-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Abonnieren Sie den Newsletter und erhalten Sie regelmäßig neue Artikel, Insights und exklusive Inhalte direkt in Ihr Postfach.
              </p>
              <Link
                to="/newsletter"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Newsletter abonnieren
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
