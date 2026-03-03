import SubpageTemplate from '../components/SubpageTemplate';

export default function UnternehmenSelling() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Emotional Selling & Performance
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Verkaufen ist keine Technik – es ist eine emotionale Verbindung. Ihre Stimme, Ihre
          Ausstrahlung und Ihre Authentizität entscheiden darüber, ob aus Interessenten Kunden werden.
          Ich zeige Ihnen und Ihrem Vertriebsteam, wie Sie durch emotionale Intelligenz und
          wirkungsvolle Kommunikation Ihre Sales-Performance signifikant steigern.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie in diesem Training lernen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Emotionale Kaufentscheidungen:</strong> Die Psychologie hinter dem Verkauf verstehen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Umsatzstimme:</strong> Mit Ihrer Stimme Vertrauen aufbauen und überzeugen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Storytelling im Verkauf:</strong> Geschichten, die verkaufen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Einwandbehandlung:</strong> Souverän und empathisch reagieren</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Präsenz im Verkaufsgespräch:</strong> Körpersprache und Stimme synchronisieren</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Der Unterschied
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
            <h4 className="font-bold text-xl text-red-900 mb-2">Traditionelles Verkaufen</h4>
            <ul className="space-y-2 text-red-800">
              <li>• Fokus auf Produktmerkmale</li>
              <li>• Druck und Überredung</li>
              <li>• Einbahnstraßen-Kommunikation</li>
              <li>• Kurzfristige Abschlüsse</li>
            </ul>
          </div>
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <h4 className="font-bold text-xl text-green-900 mb-2">Emotional Selling</h4>
            <ul className="space-y-2 text-green-800">
              <li>• Fokus auf Kundenbedürfnisse</li>
              <li>• Vertrauen und Beziehung</li>
              <li>• Dialog auf Augenhöhe</li>
              <li>• Langfristige Partnerschaften</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Menschen kaufen nicht, was Sie tun – sie kaufen, warum Sie es tun. Und sie spüren es
          in Ihrer Stimme."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Emotional Selling & Performance"
      subtitle="Für Unternehmen"
      introText="Steigern Sie Ihre Verkaufserfolge durch emotionale Intelligenz und authentische Kommunikation. Verkaufen Sie nicht nur Produkte – schaffen Sie Beziehungen."
      bodyContent={bodyContent}
      ctaText="Bereit, Ihre Sales-Performance zu revolutionieren?"
      topic="Emotional Selling & Performance"
    />
  );
}
