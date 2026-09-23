import SubpageTemplate from '../components/SubpageTemplate';

export default function StimmeHochzeit() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
          Vom Ohr ins Herz
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Es gibt Momente im Leben, die nach besonderen Worten verlangen. Momente, die berühren, bewegen
          und für immer in Erinnerung bleiben. Als freie Rednerin bin ich die Stimme für Ihre wichtigsten
          Botschaften – bei Hochzeiten, Trauerfeiern und besonderen Events.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-6 sm:p-8 rounded-2xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-midnight-blue mb-4">
          Unvergessliche Momente gestalten
        </h3>
        <ul className="space-y-3 text-gray-700 text-base sm:text-lg">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Hochzeiten:</strong> Freie Trauungen und Zeremonien, die von Herzen kommen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Trauerfeiern:</strong> Würdevolle Abschiedsworte, die trösten und ehren</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Events:</strong> Professionelle Moderation für Ihre besonderen Anlässe</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Persönliches Coaching:</strong> Unterstützung beim Schreiben und Halten eigener Reden</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-base sm:text-lg md:text-xl">
          "Die richtigen Worte zur richtigen Zeit – das macht Momente zu Erinnerungen, die für immer bleiben."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/love.webp"
      bildAlt="Claudia Conen im Freien vor dem Schriftzug LOVE"
      bildQuer
      kanonischPfad="/freie-trauung"
      seoTitle="Hochzeitsrede und freie Trauung | Claudia Conen"
      title="VOM OHR INS HERZ"
      subtitle="Für unvergessliche Momente und Botschaften"
      introText="Freie Rednerin • Hochzeiten • Trauerfeiern • Events – Worte, die berühren und bleiben."
      bodyContent={bodyContent}
      ctaText="Lassen Sie uns über Ihren besonderen Moment sprechen!"
      topic="Freie Rednerin"
    />
  );
}
