import SubpageTemplate from '../components/SubpageTemplate';

export default function MentoringGold() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Gold-Training (90 min Fokus)
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Manchmal braucht es keinen Marathon, sondern einen Sprint. Das Gold-Training ist Ihre
          90-minütige Power-Session, in der wir uns auf EINE konkrete Herausforderung fokussieren
          und gemeinsam eine Lösung erarbeiten. Intensiv, zielgerichtet und sofort umsetzbar.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Perfekt für diese Themen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Positionierungs-Analyse:</strong> Schärfen Sie Ihre Markenbotschaft</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Elevator Pitch Perfektionierung:</strong> In 30 Sekunden überzeugen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Keynote-Feedback:</strong> Optimieren Sie Ihren Vortrag</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmtraining:</strong> Lösen Sie konkrete Stimmprobleme</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Sales-Gespräche:</strong> Vorbereitung auf wichtige Verkaufssituationen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Strategie-Session:</strong> Klären Sie den nächsten Schritt in Ihrem Business</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          So läuft das Gold-Training ab
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-bright-gold rounded-full flex items-center justify-center text-midnight-blue font-bold">
                1
              </div>
              <h4 className="font-bold text-lg text-midnight-blue">Vorgespräch (15 min)</h4>
            </div>
            <p className="text-gray-600 ml-13">
              Wir klären vorab, woran Sie arbeiten möchten und was Ihr gewünschtes Ergebnis ist.
            </p>
          </div>

          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-bright-gold rounded-full flex items-center justify-center text-midnight-blue font-bold">
                2
              </div>
              <h4 className="font-bold text-lg text-midnight-blue">Intensiv-Session (90 min)</h4>
            </div>
            <p className="text-gray-600 ml-13">
              Wir arbeiten konzentriert an Ihrer Herausforderung und erarbeiten konkrete Lösungen.
            </p>
          </div>

          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-bright-gold rounded-full flex items-center justify-center text-midnight-blue font-bold">
                3
              </div>
              <h4 className="font-bold text-lg text-midnight-blue">Nachbereitung (inkl.)</h4>
            </div>
            <p className="text-gray-600 ml-13">
              Sie erhalten eine Zusammenfassung und einen Aktionsplan für die Umsetzung.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Warum 90 Minuten Gold wert sind
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Schnell</h4>
            <p className="text-gray-600 text-sm">
              Sofortige Klarheit und Lösungen ohne monatelange Programme
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Fokussiert</h4>
            <p className="text-gray-600 text-sm">
              100% Konzentration auf Ihre spezifische Herausforderung
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl text-center">
            <div className="text-4xl mb-3">💎</div>
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Wertvoll</h4>
            <p className="text-gray-600 text-sm">
              Praktische Lösungen, die Sie sofort umsetzen können
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-midnight-blue to-royal-navy text-pearl-white rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">
          Investition
        </h3>
        <p className="text-pearl-white/90 mb-4">
          Das Gold-Training ist Ihre schnelle und effektive Möglichkeit, an konkreten
          Herausforderungen zu arbeiten und sofort Ergebnisse zu sehen.
        </p>
        <p className="text-bright-gold font-bold text-lg">
          Verfügbare Termine besprechen wir gerne im persönlichen Gespräch.
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      title="Gold-Training (90 min Fokus)"
      subtitle="Mentoring & Coaching"
      introText="90 Minuten geballte Expertise für Ihre konkrete Herausforderung. Intensiv, fokussiert, sofort umsetzbar."
      bodyContent={bodyContent}
      ctaText="Bereit für Ihre Power-Session?"
      topic="Gold-Training 90 Minuten"
      seoTitle="Gold-Training 90 Min Business Coaching Köln | Elevator Pitch & Positionierung | Claudia Conen"
      seoDescription="90 Minuten fokussiertes Business Coaching in Köln für sofortige Ergebnisse. Perfektioniere deinen Elevator Pitch, schärfe deine Positionierung oder optimiere deine Keynote mit Claudia Conen. Jetzt Power-Session buchen!"
      keywords={['Business Coaching Köln', 'Gold-Training', '90 Minuten Coaching', 'Elevator Pitch', 'Positionierung', 'Claudia Conen', 'Mentoring', 'Strategie Session', 'Einzelcoaching', 'Power Session']}
    />
  );
}
