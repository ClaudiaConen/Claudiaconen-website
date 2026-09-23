import SubpageTemplate from '../components/SubpageTemplate';

export default function MentoringOnline() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Wo immer du bist
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Dein Erfolg wartet nicht darauf, dass du an einem bestimmten Ort bist. Mit meinem
          flexiblen Online-Mentoring begleite ich dich überall – ob du im Homeoffice, auf Reisen
          oder zwischen Terminen bist. Intensive Betreuung und persönliche Entwicklung ohne
          geografische Grenzen.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Vorteile des Online-Mentorings
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Flexibilität:</strong> Termine, die sich deinem Leben anpassen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Keine Reisezeit:</strong> Mehr Zeit für das Wesentliche</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Aufzeichnungen:</strong> Sessions können aufgezeichnet und nachgeschaut werden</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Zwischen-Support:</strong> Voxer-Sprachnachrichten für schnelle Fragen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Weltweite Verfügbarkeit:</strong> Egal wo du bist, ich bin für dich da</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Mentoring-Formate
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xl text-midnight-blue">Single Session</h4>
              <span className="px-4 py-1 bg-bright-gold/20 text-midnight-blue rounded-full text-sm font-bold">
                Einmalig
              </span>
            </div>
            <p className="text-gray-600 mb-3">
              Eine 60-90 minütige Session für ein spezifisches Thema oder eine akute Herausforderung.
            </p>
            <p className="text-midnight-blue font-semibold">
              Ideal für: Schnelle Klarheit, Feedback, Impulse
            </p>
          </div>

          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xl text-midnight-blue">3-Monats-Paket</h4>
              <span className="px-4 py-1 bg-bright-gold/20 text-midnight-blue rounded-full text-sm font-bold">
                Beliebt
              </span>
            </div>
            <p className="text-gray-600 mb-3">
              6 Sessions à 90 Minuten + Voxer-Support zwischen den Sessions.
            </p>
            <p className="text-midnight-blue font-semibold">
              Ideal für: Positionierung, Markenbrand, Stimmtraining, Business-Strategie
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-bright-gold/20 to-luxury-gold/30 border-2 border-bright-gold rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xl text-midnight-blue">6-12 Monats-Programm</h4>
              <span className="px-4 py-1 bg-midnight-blue text-pearl-white rounded-full text-sm font-bold">
                Premium
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              Intensive Zusammenarbeit mit regelmäßigen Sessions, Voxer-Support, Workbooks und
              Zugang zu exklusiven Trainings.
            </p>
            <p className="text-midnight-blue font-semibold">
              Ideal für: Komplette Transformation, Business-Aufbau, Langfristige Entwicklung
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Technologie & Tools
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Video-Calls</h4>
            <p className="text-gray-600 text-sm">
              Zoom, Google Meet oder deine bevorzugte Plattform
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Voxer</h4>
            <p className="text-gray-600 text-sm">
              Asynchrone Sprachnachrichten für Support zwischen Sessions
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Workbooks</h4>
            <p className="text-gray-600 text-sm">
              Digitale Materialien und Übungen für deine Entwicklung
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Aufzeichnungen</h4>
            <p className="text-gray-600 text-sm">
              Zugriff auf alle Session-Aufzeichnungen für später
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <h3 className="text-xl font-bold text-midnight-blue mb-4">
          Was Klienten sagen
        </h3>
        <p className="text-gray-700 italic mb-3">
          "Das Online-Mentoring mit Claudia hat mein Business komplett transformiert – und das
          alles von meinem Homeoffice aus. Die Flexibilität war perfekt für meinen vollen Terminkalender."
        </p>
        <p className="text-bright-gold font-bold">- Online-Unternehmerin</p>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Dein Erfolg ist nicht ortsgebunden. Wo immer du bist – ich bin für dich da."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/bildschirm.webp"
      bildAlt="Claudia Conen in einer Online-Übertragung"
      title="Wo immer du bist"
      subtitle="Mentoring & Coaching"
      introText="Flexibles Online-Mentoring für deine persönliche und berufliche Entwicklung. Intensive Betreuung ohne geografische Grenzen."
      bodyContent={bodyContent}
      ctaText="Bereit für dein Online-Mentoring?"
      topic="Online-Mentoring"
    />
  );
}
