import SubpageTemplate from '../components/SubpageTemplate';

export default function UnternehmenEvents() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Interne Events & Moderation
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Ihre internen Veranstaltungen verdienen mehr als nur Routine. Als erfahrene Moderatorin
          und Speakerin bringe ich Schwung, Struktur und Emotionen in Ihre Firmenevents,
          Jahrestagungen, Teambuilding-Events oder Produktlaunches. Mit meiner Stimme führe ich
          souverän durch Ihr Programm und sorge dafür, dass Ihre Botschaften ankommen und Ihre
          Teilnehmer begeistert sind.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Meine Event-Services
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Professionelle Moderation:</strong> Ich führe souverän durch Ihr Event-Programm</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Kick-off & Impulse:</strong> Motivierende Eröffnungen, die Energie freisetzen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Podiumsdiskussionen:</strong> Lebendige Gespräche, die ins Herz treffen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Firewalk-Begleitung:</strong> Emotionale Höhepunkte für unvergessliche Erlebnisse</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Interaktive Workshops:</strong> Einbindung der Teilnehmer auf höchstem Niveau</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Warum ich die richtige Wahl bin
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Stimmgewalt</h4>
            <p className="text-gray-600 text-sm">
              Meine Stimme trägt – auch bei großen Veranstaltungen ohne Technik
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">✨</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Flexibilität</h4>
            <p className="text-gray-600 text-sm">
              Ich reagiere spontan und souverän auf unerwartete Situationen
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">💫</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Empathie</h4>
            <p className="text-gray-600 text-sm">
              Ich spüre die Stimmung im Raum und hole alle mit
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <h3 className="text-xl font-bold text-midnight-blue mb-4">
          Referenzen
        </h3>
        <p className="text-gray-700 italic">
          "Claudia hat unsere Jahrestagung zu einem unvergesslichen Erlebnis gemacht. Ihre
          Moderation war professionell, emotional und mitreißend. Die Teilnehmer waren begeistert!"
        </p>
        <p className="text-right text-bright-gold font-bold mt-2">- Firmenname, Branche</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Interne Events & Moderation"
      subtitle="Für Unternehmen"
      introText="Machen Sie Ihre Firmenveranstaltung zu einem emotionalen Highlight. Mit professioneller Moderation und mitreißender Energie sorge ich dafür, dass Ihr Event in Erinnerung bleibt."
      bodyContent={bodyContent}
      ctaText="Lassen Sie uns Ihr nächstes Event unvergesslich machen!"
      topic="Interne Events & Moderation"
    />
  );
}
