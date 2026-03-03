import Navigation from '../components/Navigation';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

export default function Impressum() {
  return (
    <>
      <Navigation />
      <SEO
        title="Impressum - Claudia Conen"
        description="Impressum und rechtliche Informationen von Claudia Conen - Die Umsatzstimme"
      />
      <div className="min-h-screen bg-gradient-to-b from-midnight-blue via-royal-navy to-midnight-blue pt-44 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-luxury-gold/20 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-8">
              Impressum
            </h1>

            <div className="space-y-8 text-gray-900">
              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Angaben gemäß § 5 TMG:
                </h2>
                <p className="leading-relaxed">
                  Claudia Conen<br />
                  Beisenweg 20<br />
                  58452 Witten
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Kontakt:
                </h2>
                <p className="leading-relaxed">
                  E-Mail: <a href="mailto:info@claudiaconen-akademie.de" className="text-bright-gold hover:underline">info@claudiaconen-akademie.de</a><br />
                  Internet: <a href="https://claudiaconen-akademie.de" className="text-bright-gold hover:underline" target="_blank" rel="noopener noreferrer">https://claudiaconen-akademie.de</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Steuer:
                </h2>
                <p className="leading-relaxed">
                  Steuer-Identifikationsnummer: 219/5807/3468
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                </h2>
                <p className="leading-relaxed">
                  Claudia Conen<br />
                  Nibelungenweg 58<br />
                  50996 Köln
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Geltungsraum der Versicherung:
                </h2>
                <p className="leading-relaxed">
                  Deutschland, Österreich, Schweiz
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Haftung für Inhalte
                </h2>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Haftung für Links
                </h2>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen. Für Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Urheberrecht
                </h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung oder Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der Zustimmung des jeweiligen Autors.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-montserrat font-semibold text-bright-gold mb-3">
                  Hosting & technische Umsetzung:
                </h2>
                <p className="leading-relaxed">
                  Diese Website wird über <strong>Cloudflare</strong> gehostet. Technische Umsetzung: <strong>Bolt.new</strong>
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-luxury-gold/30">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-luxury-gold hover:text-bright-gold transition-colors font-semibold"
              >
                ← Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
