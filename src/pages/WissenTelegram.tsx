import SubpageTemplate from '../components/SubpageTemplate';

export default function WissenTelegram() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Telegram & Audioimpulse
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Tägliche Inspiration direkt auf Ihr Handy! In unserem Telegram-Kanal teile ich regelmäßig
          Audioimpulse, praktische Tipps und motivierende Gedanken rund um Stimme, Wirkung und Erfolg.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie erwartet
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Tägliche Audioimpulse:</strong> 2-5 Minuten Inspiration für Ihren Tag</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Praktische Übungen:</strong> Stimmtraining und Performance-Tipps</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Behind the Scenes:</strong> Einblicke in meine Arbeit</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Exklusive Angebote:</strong> Erste Info zu neuen Programmen</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-midnight-blue font-bold text-lg text-center">
          Kostenlos und jederzeit kündbar – holen Sie sich tägliche Inspiration!
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/am-telefon.webp"
      bildAlt="Claudia Conen mit dem Telefon in der Hand"
      bildQuer
      title="Telegram & Audioimpulse"
      subtitle="Wissen to go"
      introText="Tägliche Audio-Inspiration direkt auf Ihr Handy. Praktische Tipps und Motivation für Ihren Erfolg."
      bodyContent={bodyContent}
      ctaText="Jetzt Telegram-Kanal beitreten!"
      topic="Telegram & Audioimpulse"
    />
  );
}
