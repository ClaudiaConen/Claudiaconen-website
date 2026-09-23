import SubpageTemplate from '../components/SubpageTemplate';

export default function StimmeTrauer() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Trauerreden
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          In Momenten des Abschieds die richtigen Worte zu finden, ist eine große Herausforderung.
          Mit Empathie, Würde und der richtigen Balance zwischen Trauer und Erinnerung helfe ich
          Ihnen, Ihrem geliebten Menschen einen würdevollen Abschied zu bereiten.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was ich anbiete
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Individuelle Trauerreden:</strong> Würdevolle Worte für den letzten Abschied</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Angehörigen-Coaching:</strong> Unterstützung beim eigenen Reden</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Einfühlsame Vorbereitung:</strong> Gespräche über den Verstorbenen und seine Geschichte</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Worte können Trost spenden und Erinnerungen bewahren. Mit Würde und Empathie."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/veranda.webp"
      bildAlt="Claudia Conen am Tisch auf einer ruhigen Veranda"
      bildQuer
      kanonischPfad="/trauerrede"
      seoTitle="Trauerrede halten lassen | Claudia Conen"
      title="Trauerreden"
      subtitle="Die Stimme für Ihre Botschaft"
      introText="Würdevolle Worte für den Abschied. Individuelle Trauerreden mit Empathie und Würde."
      bodyContent={bodyContent}
      ctaText="Kontaktieren Sie mich für ein sensibles Gespräch"
      topic="Trauerreden"
    />
  );
}
