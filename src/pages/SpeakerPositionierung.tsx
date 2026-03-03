import SubpageTemplate from '../components/SubpageTemplate';

export default function SpeakerPositionierung() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Positionierung – Werde unverwechselbar
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          In einer Welt voller Speaker und Selbstständiger entscheidet Ihre Positionierung darüber,
          ob Sie als austauschbar wahrgenommen werden – oder als die einzig richtige Wahl. Ich
          helfe Ihnen, Ihre einzigartige Stimme zu finden, Ihre Markenbotschaft zu schärfen und
          sich klar und kraftvoll zu positionieren.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was wir gemeinsam erarbeiten
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Ihre Unique Voice:</strong> Was macht Sie unverwechselbar?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Klare Zielgruppe:</strong> Wen wollen Sie wirklich erreichen?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Ihre Kernbotschaft:</strong> Wofür stehen Sie und Ihre Marke?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Sichtbarkeit:</strong> Wie werden Sie als Experte wahrgenommen?</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Authentizität:</strong> Bleiben Sie sich treu und magnetisch</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Der Weg zur starken Positionierung
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">1. Selbstreflexion</h4>
            <p className="text-gray-600">
              Wer bin ich wirklich? Was treibt mich an? Welche Werte leben ich?
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">2. Marktanalyse</h4>
            <p className="text-gray-600">
              Wo ist Ihr weißer Raum? Was macht Sie anders als andere?
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">3. Botschaftsentwicklung</h4>
            <p className="text-gray-600">
              Kristallisieren Sie Ihre Kernbotschaft auf den Punkt
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">4. Sichtbarkeitsstrategie</h4>
            <p className="text-gray-600">
              Bringen Sie Ihre Positionierung konsistent nach außen
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Ihre Positionierung ist kein Marketing-Gag. Sie ist das Fundament Ihres Erfolgs."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Positionierung"
      subtitle="Für Speaker & Selbstständige"
      introText="Finden Sie Ihre einzigartige Stimme und werden Sie unverwechselbar in Ihrem Markt. Eine klare Positionierung ist der Schlüssel zu Sichtbarkeit und Erfolg."
      bodyContent={bodyContent}
      ctaText="Bereit, Ihre Positionierung zu schärfen?"
      topic="Positionierung für Speaker"
    />
  );
}
