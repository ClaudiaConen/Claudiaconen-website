import SubpageTemplate from '../components/SubpageTemplate';

export default function SpeakerBuehne() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Bühnenwirkung & Auftritt
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Die Bühne ist Ihr Wirkungsraum. Hier entscheiden Sekunden über Erfolg oder Misserfolg.
          Ihre Präsenz, Ihre Stimme, Ihre Körpersprache – alles muss perfekt zusammenspielen.
          Ich zeige Ihnen, wie Sie Ihre Bühnenwirkung maximieren und jeden Auftritt zu einem
          unvergesslichen Erlebnis machen.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie in diesem Training entwickeln
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Bühnenpräsenz:</strong> Füllen Sie den Raum mit Ihrer Ausstrahlung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmgewalt:</strong> Nutzen Sie Ihre Stimme als kraftvolles Instrument</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Körpersprache:</strong> Authentisch, souverän und überzeugend wirken</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Nervosität meistern:</strong> Lampenfieber in positive Energie umwandeln</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Publikumsinteraktion:</strong> Verbindung aufbauen und halten</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Performance-Techniken:</strong> Tempo, Pausen, Dramatik perfekt dosieren</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Die 3 Säulen der Bühnenwirkung
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="text-5xl mb-4 text-center">🎤</div>
            <h4 className="font-bold text-xl text-midnight-blue mb-2 text-center">Stimme</h4>
            <p className="text-gray-600 text-center">
              Ihre Stimme trägt Emotionen, Botschaften und Energie. Sie ist Ihr wichtigstes Werkzeug.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="text-5xl mb-4 text-center">💪</div>
            <h4 className="font-bold text-xl text-midnight-blue mb-2 text-center">Körper</h4>
            <p className="text-gray-600 text-center">
              Ihre Körpersprache spricht lauter als Worte. Setzen Sie sie gezielt ein.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="text-5xl mb-4 text-center">✨</div>
            <h4 className="font-bold text-xl text-midnight-blue mb-2 text-center">Präsenz</h4>
            <p className="text-gray-600 text-center">
              Ihre Ausstrahlung entscheidet, ob Menschen Ihnen folgen oder nur zuhören.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Praktisches Training
        </h3>
        <p className="text-gray-700 mb-4">
          Dieses Training ist keine Theorie-Veranstaltung. Wir arbeiten praxisnah:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-pearl-white rounded-lg">
            <span className="text-bright-gold font-bold">→</span>
            <span className="text-gray-700">Live-Auftritte vor der Kamera mit detailliertem Feedback</span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-pearl-white rounded-lg">
            <span className="text-bright-gold font-bold">→</span>
            <span className="text-gray-700">Stimmtraining und Atemtechniken für mehr Kraft</span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-pearl-white rounded-lg">
            <span className="text-bright-gold font-bold">→</span>
            <span className="text-gray-700">Körperarbeit für authentische Präsenz</span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-pearl-white rounded-lg">
            <span className="text-bright-gold font-bold">→</span>
            <span className="text-gray-700">Mentale Techniken gegen Lampenfieber</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Auf der Bühne zählt nicht, was Sie sagen wollen – sondern was ankommt."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Bühnenwirkung & Auftritt"
      subtitle="Für Speaker & Selbstständige"
      introText="Entwickeln Sie eine magnetische Bühnenpräsenz und begeistern Sie Ihr Publikum. Lernen Sie, wie Sie mit Stimme, Körpersprache und Ausstrahlung überzeugen."
      bodyContent={bodyContent}
      ctaText="Bereit für Ihren kraftvollen Bühnenauftritt?"
      topic="Bühnenwirkung & Auftritt"
    />
  );
}
