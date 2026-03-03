import SubpageTemplate from '../components/SubpageTemplate';

export default function SpeakerSocial() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Reden auf Social Media
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Social Media ist die neue Bühne. Hier entscheiden Sekunden über Aufmerksamkeit,
          Reichweite und Wirkung. Ich zeige Ihnen, wie Sie mit kurzen, kraftvollen Video-Formaten
          Ihre Botschaft verbreiten, Ihre Persönlichkeit zeigen und eine treue Community aufbauen.
          Ob Instagram Reels, TikTok, LinkedIn oder YouTube Shorts – Ihre Stimme wird gehört.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie lernen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Hook-Strategien:</strong> In 3 Sekunden Aufmerksamkeit gewinnen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Storytelling für Social:</strong> Kurz, prägnant, emotional</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmtraining für Video:</strong> Klar, authentisch, kraftvoll</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Content-Formate:</strong> Von Educational bis Entertainment</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Konsistenz & Strategie:</strong> Langfristig sichtbar bleiben</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Community-Building:</strong> Echte Verbindungen aufbauen</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Die Macht der Social-Media-Rede
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Reichweite</h4>
            <p className="text-gray-600">
              Erreichen Sie tausende Menschen mit einem einzigen Video – organisch und kostenfrei.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Authentizität</h4>
            <p className="text-gray-600">
              Zeigen Sie Ihre Persönlichkeit und bauen Sie Vertrauen auf.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Sichtbarkeit</h4>
            <p className="text-gray-600">
              Werden Sie als Experte wahrgenommen und positionieren Sie sich.
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Leads</h4>
            <p className="text-gray-600">
              Gewinnen Sie qualifizierte Anfragen durch wertvolle Content-Strategien.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Vom Bühnen-Speaker zum Social-Media-Star
        </h3>
        <div className="space-y-4">
          <p className="text-gray-700">
            Die Herausforderung: Was auf der Bühne funktioniert, funktioniert nicht automatisch
            auf Social Media. Die Regeln sind anders:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
              <p className="font-bold text-red-900 mb-1">Bühne</p>
              <p className="text-red-800 text-sm">60 Minuten Zeit, linearer Aufbau</p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
              <p className="font-bold text-green-900 mb-1">Social Media</p>
              <p className="text-green-800 text-sm">30-60 Sekunden, sofortiger Impact</p>
            </div>
          </div>
          <p className="text-gray-700">
            Ich zeige Ihnen, wie Sie Ihre Bühnenerfahrung in Social-Media-Gold verwandeln.
          </p>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Social Media ist keine Option mehr – es ist Ihre digitale Bühne. Nutzen Sie sie."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Reden auf Social Media"
      subtitle="Für Speaker & Selbstständige"
      introText="Erobern Sie die digitale Bühne und werden Sie auf Social Media sichtbar. Lernen Sie, wie Sie mit kraftvollen Video-Botschaften Reichweite und Wirkung erzielen."
      bodyContent={bodyContent}
      ctaText="Bereit, auf Social Media durchzustarten?"
      topic="Reden auf Social Media"
    />
  );
}
