import SubpageTemplate from '../components/SubpageTemplate';

export default function UnternehmenLeadership() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Leadership & Kommunikation, die überzeugt
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Führungskräfte sind die Stimme Ihres Unternehmens. Ihre Kommunikation prägt Kultur,
          motiviert Teams und beeinflusst Ergebnisse. Ich unterstütze Sie dabei, Ihre
          Führungspersönlichkeit zu stärken und durch authentische, wirkungsvolle Kommunikation
          zu inspirieren.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Schwerpunkte
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Authentische Führung:</strong> Mit Ihrer echten Persönlichkeit überzeugen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Kommunikationsstrategien:</strong> Klar, präzise und empathisch kommunizieren</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmige Präsenz:</strong> Ihre Stimme als Führungsinstrument einsetzen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Emotionale Intelligenz:</strong> Teams durch Empathie und Klarheit bewegen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Konfliktmanagement:</strong> Schwierige Gespräche souverän meistern</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Für wen ist das geeignet?
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          Dieses Training richtet sich an Geschäftsführer, Führungskräfte, Team-Leiter und alle,
          die ihre Kommunikation und Führungskompetenz auf das nächste Level heben möchten.
        </p>
        <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
          <p className="text-gray-700 italic">
            "Die Art, wie Sie kommunizieren, entscheidet darüber, ob Menschen Ihnen folgen –
            oder nur zuhören. Ich zeige Ihnen, wie Sie beides verbinden."
          </p>
          <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
        </div>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Leadership & Kommunikation"
      subtitle="Für Unternehmen"
      introText="Führen Sie mit Stimme, Präsenz und Authentizität. Entwickeln Sie eine Kommunikation, die Menschen bewegt und Ergebnisse schafft."
      bodyContent={bodyContent}
      ctaText="Bereit, Ihre Führungskommunikation zu transformieren?"
      topic="Leadership & Kommunikation"
    />
  );
}
