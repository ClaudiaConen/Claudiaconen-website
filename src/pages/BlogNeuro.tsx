import SubpageTemplate from '../components/SubpageTemplate';

export default function BlogNeuro() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Neurowissenschaft & Verkauf
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Verstehen Sie, was in den Köpfen Ihrer Kunden vorgeht! In diesem Blog-Bereich teile ich
          was in Gesprächen tatsächlich passiert, bevor jemand sich entscheidet
          und wie Sie dieses Wissen für ethisches und effektives Verkaufen nutzen können.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Spannende Themen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Das emotionale Gehirn:</strong> Warum Emotionen Kaufentscheidungen steuern</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Spiegelneuronen im Verkauf:</strong> Wie Empathie verkauft</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Stimme und das limbische System:</strong> Warum Tonfall wichtiger ist als Worte</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Neuromarketing-Strategien:</strong> Ethisch und wirkungsvoll verkaufen</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Wer versteht, wie Menschen denken und fühlen, kann auf Augenhöhe verkaufen – ohne Manipulation."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Neurowissenschaft & Verkauf"
      subtitle="Blog & Aktuelles"
      introText="Wie Menschen zu einer Entscheidung kommen — und wie man verkauft, ohne jemanden zu überreden."
      bodyContent={bodyContent}
      ctaText="Interessiert an mehr Insights?"
      topic="Neurowissenschaft & Verkauf Blog"
    />
  );
}
