import SubpageTemplate from '../components/SubpageTemplate';

export default function WissenWhatsapp() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          WhatsApp Community
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Werden Sie Teil unserer WhatsApp Community und vernetzen Sie sich mit Gleichgesinnten!
          Hier teilen wir Erfolge, stellen Fragen und unterstützen uns gegenseitig auf dem Weg zum Erfolg.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Vorteile der WhatsApp Community
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Direkter Austausch:</strong> Vernetzen Sie sich mit anderen Mitgliedern</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Quick Wins:</strong> Schnelle Tipps und Tricks für sofortige Umsetzung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Motivation:</strong> Tägliche Unterstützung von der Community</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Exklusive Updates:</strong> Als erste über News und Angebote informiert</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-lg">
          "Alleine kommst du schnell voran – gemeinsam kommst du weiter."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/schreibtisch.webp"
      bildAlt="Claudia Conen am Schreibtisch mit roter Mappe"
      bildQuer
      title="WhatsApp Community"
      subtitle="Wissen to go"
      introText="Vernetzen Sie sich mit Gleichgesinnten in unserer WhatsApp Community. Austausch, Motivation und gemeinsames Wachstum."
      bodyContent={bodyContent}
      ctaText="Jetzt der Community beitreten!"
      topic="WhatsApp Community"
    />
  );
}
