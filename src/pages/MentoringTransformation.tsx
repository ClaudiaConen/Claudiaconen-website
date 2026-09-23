import SubpageTemplate from '../components/SubpageTemplate';

export default function MentoringTransformation() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Transformation & Markenbrand
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Echte Transformation entsteht nicht über Nacht. Sie braucht Zeit, Raum und die richtige
          Begleitung. In meinem 1:1 Mentoring-Programm arbeiten wir intensiv an Ihrer persönlichen
          und beruflichen Weiterentwicklung. Gemeinsam erschaffen wir Ihre unverwechselbare Marke
          und bringen Ihre volle Kraft zur Entfaltung.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was wir gemeinsam entwickeln
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Persönliche Marke:</strong> Ihre authentische Personal Brand als Fundament</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Positionierung:</strong> Klare Differenzierung im Markt</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmkraft:</strong> Ihre Stimme als Alleinstellungsmerkmal</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Sichtbarkeitsstrategie:</strong> Vom Hidden Champion zum Thought Leader</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Business-Strategie:</strong> Wachstum mit Leichtigkeit</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Mindset-Transformation:</strong> Blockaden lösen, Potenzial entfalten</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Das Mentoring-Programm
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Dauer</h4>
            <p className="text-gray-600">
              6-12 Monate intensive Zusammenarbeit mit wöchentlichen oder bi-weekly Sessions
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Format</h4>
            <p className="text-gray-600">
              1:1 Video-Calls, Voxer-Support zwischen den Sessions, Workbooks & Strategien
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Extras</h4>
            <p className="text-gray-600">
              Zugang zu exklusiven Masterclasses, Community-Events und Live-Trainings
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Für wen?</h4>
            <p className="text-gray-600">
              Für ambitionierte Unternehmer, Speaker und Selbstständige, die bereit sind für den nächsten Schritt
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Mögliche Ergebnisse
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Klarheit</h4>
            <p className="text-gray-600">
              Sie wissen genau, wer Sie sind, wofür Sie stehen und wohin Sie gehen
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Sichtbarkeit</h4>
            <p className="text-gray-600">
              Sie werden als Experte wahrgenommen und ziehen Ihre Wunschkunden an
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Wirkung</h4>
            <p className="text-gray-600">
              Ihre Botschaft kommt an und Sie bewegen Menschen nachhaltig
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-2">Umsatz</h4>
            <p className="text-gray-600">
              Ihr Business wächst organisch durch Ihre authentische Präsenz
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Transformation beginnt in dem Moment, in dem Sie bereit sind, die Person zu werden,
          die Sie sein wollen."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/steinmauer.webp"
      bildAlt="Claudia Conen sitzt an einer alten Natursteinmauer"
      title="Transformation & Markenbrand"
      subtitle="Mentoring & Coaching"
      introText="Intensives 1:1 Mentoring für ambitionierte Unternehmer und Speaker. Entwickeln Sie Ihre authentische Marke und entfalten Sie Ihr volles Potenzial."
      bodyContent={bodyContent}
      ctaText="Bereit für Ihre Transformation?"
      topic="Transformation & Markenbrand Mentoring"
    />
  );
}
