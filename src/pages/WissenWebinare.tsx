import SubpageTemplate from '../components/SubpageTemplate';

export default function WissenWebinare() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Gratis-Webinare
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Lernen Sie die Grundlagen von Stimme, Wirkung und Präsenz in unseren kostenlosen Webinaren.
          Praktische Tipps und Techniken, die Sie sofort umsetzen können.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Aktuelle Webinar-Themen
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Umsatzstimme:</strong> Wie Ihre Stimme mehr Umsatz generiert</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Elevator Pitch Masterclass:</strong> In 30 Sekunden überzeugen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Bühnenpräsenz:</strong> Füllen Sie jeden Raum mit Ihrer Ausstrahlung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Social Media Storytelling:</strong> Videos, die viral gehen</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-midnight-blue font-bold text-lg">
          Melden Sie sich für die nächsten Webinare an und erhalten Sie wertvolle Impulse – komplett kostenfrei!
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/am-laptop.webp"
      bildAlt="Claudia Conen am Fenster mit Laptop"
      bildQuer
      title="Gratis-Webinare"
      subtitle="Wissen to go"
      introText="Kostenlose Webinare zu Stimme, Wirkung und Performance. Praktisches Wissen für Ihren Erfolg."
      bodyContent={bodyContent}
      ctaText="Für Webinare anmelden!"
      topic="Gratis-Webinare"
    />
  );
}
