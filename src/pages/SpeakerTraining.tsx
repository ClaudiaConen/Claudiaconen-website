import SubpageTemplate from '../components/SubpageTemplate';

export default function SpeakerTraining() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-midnight-blue mb-4">
          Voice-to-Impact® Intensivtraining
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Das Voice-to-Impact® Intensivtraining ist mein Flaggschiff-Programm für Speaker und
          Selbstständige, die ihre Stimme, ihre Präsenz und ihre Wirkung auf ein neues Level
          heben wollen. In diesem exklusiven Training arbeiten wir intensiv an allen Facetten
          Ihrer Performance – von der Stimme über die Körpersprache bis zur emotionalen Intelligenz.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Sie im Intensivtraining erwartet
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmtraining:</strong> Entwickeln Sie Ihre volle Stimmkraft und Ausdrucksstärke</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Präsenzarbeit:</strong> Füllen Sie jeden Raum mit Ihrer Ausstrahlung</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Storytelling-Mastery:</strong> Erzählen Sie Geschichten, die verkaufen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Emotional Selling:</strong> Verkaufen Sie über die emotionale Ebene</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Bühnentechniken:</strong> Performen Sie wie ein Profi</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Mindset-Arbeit:</strong> Überwinden Sie Blockaden und entfalten Sie Ihr volles Potenzial</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Das Trainings-Format
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Dauer</h4>
            <p className="text-gray-600">
              2-3 Tage Intensiv-Training mit maximal 12 Teilnehmern für individuelles Coaching
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Methodik</h4>
            <p className="text-gray-600">
              Praxisorientiert mit Video-Feedback, Live-Übungen und individuellen Coaching-Sessions
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Location</h4>
            <p className="text-gray-600">
              Exklusive Seminar-Hotels mit professioneller Bühne und Technik
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-xl text-midnight-blue mb-3">Follow-Up</h4>
            <p className="text-gray-600">
              4 Wochen Online-Support und eine individuelle Follow-Up-Session
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Was Teilnehmer sagen
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <p className="text-gray-700 italic mb-3">
              "Dieses Training hat mein Speaker-Business komplett transformiert. Meine Buchungen
              haben sich verdreifacht und ich trete mit einer völlig neuen Selbstsicherheit auf."
            </p>
            <p className="text-bright-gold font-bold">- Speaker & Trainer</p>
          </div>
          <div className="p-6 bg-pearl-white border-l-4 border-bright-gold rounded-r-xl">
            <p className="text-gray-700 italic mb-3">
              "Claudias Voice-to-Impact® Training war ein Game-Changer. Ich habe nicht nur meine
              Stimme gefunden, sondern auch meine Marke und meine Botschaft geschärft."
            </p>
            <p className="text-bright-gold font-bold">- Unternehmerin & Coach</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-midnight-blue to-royal-navy text-pearl-white rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">
          Investition in Ihren Erfolg
        </h3>
        <p className="text-pearl-white/90 mb-4">
          Das Voice-to-Impact® Intensivtraining ist eine exklusive Investition in Ihre
          professionelle Zukunft. Die nächsten Termine und Investitionshöhe besprechen wir
          gerne in einem persönlichen Gespräch.
        </p>
        <p className="text-bright-gold font-bold">
          Limitierte Plätze – frühzeitige Anmeldung empfohlen!
        </p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/grosse-buehne.webp"
      bildAlt="Claudia Conen auf einer großen Bühne"
      title="Voice-to-Impact® Intensivtraining"
      subtitle="Für Speaker & Selbstständige"
      introText="Das ultimative Training für Speaker, die ihre Stimme, Präsenz und Wirkung maximieren wollen. Entwickeln Sie in 2-3 intensiven Tagen Ihre volle Performance-Power."
      bodyContent={bodyContent}
      ctaText="Bereit für Ihre Transformation?"
      topic="Voice-to-Impact® Intensivtraining"
      seoTitle="Voice-to-Impact® Intensivtraining Köln | 2-3 Tage Speaker Training | Claudia Conen"
      seoDescription="Zwei bis drei Tage Intensivtraining in Köln: Stimme, Präsenz und Storytelling an Ihrem eigenen Vortrag. Sie sprechen ab dem ersten Tag selbst."
      keywords={['Speaker Training', 'Voice-to-Impact', 'Intensivtraining', 'Köln', 'Stimmtraining', 'Bühnenpräsenz', 'Storytelling', 'Claudia Conen', 'Präsentationstraining', 'Performance Coaching']}
    />
  );
}
