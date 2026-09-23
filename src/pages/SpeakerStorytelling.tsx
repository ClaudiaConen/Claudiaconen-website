import SubpageTemplate from '../components/SubpageTemplate';

export default function SpeakerStorytelling() {
  const bodyContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
          Geschichten schaffen Gänsehaut
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Zahlen überzeugen im Moment. Geschichten bleiben danach. Was Menschen vor sich sehen,
          können sie weitererzählen – eine Aufzählung nicht. Sie schaffen Gänsehaut, öffnen Herzen und
          bewegen Menschen zum Handeln. Ob beim Storytelling, Emotional Selling oder im perfekten
          Elevator Pitch – ich zeige dir, wie du mit der Kraft von Geschichten wirklich überzeugst.
        </p>
      </div>

      <div className="bg-gradient-to-br from-bright-gold/10 to-luxury-gold/20 p-6 sm:p-8 rounded-2xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-midnight-blue mb-4">
          Was du lernst
        </h3>
        <ul className="space-y-3 text-gray-700 text-base sm:text-lg">
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Storytelling:</strong> Geschichten aufbauen, die Bilder im Kopf erzeugen und Gänsehaut machen</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Emotional Selling:</strong> Mit Emotionen verkaufen, ohne aufdringlich zu sein</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Elevator Pitch:</strong> In 30 Sekunden überzeugen und im Gedächtnis bleiben</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Die Macht der Bilder:</strong> Warum das Gehirn in Bildern denkt und wie du das nutzt</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-bright-gold text-2xl">•</span>
            <span><strong>Stimmwirkung:</strong> Die richtige Betonung, die deine Geschichte zum Leben erweckt</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-midnight-blue mb-4">
          Die Wissenschaft hinter Geschichten
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg sm:text-xl text-midnight-blue mb-3">Fakten werden vergessen</h4>
            <p className="text-gray-600 text-base sm:text-lg">
              Zahlen und Daten verschwinden aus dem Gedächtnis. Eine Geschichte bleibt — weil man sie miterlebt hat.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-bright-gold/20 to-luxury-gold/30 border-2 border-bright-gold rounded-xl">
            <h4 className="font-bold text-lg sm:text-xl text-midnight-blue mb-3">Bilder bleiben, Aufzählungen nicht</h4>
            <p className="text-gray-700 text-base sm:text-lg">
              Geschichten erzeugen Bilder. Bilder bleiben. Und was jemand vor sich sieht, erzählt er weiter.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-midnight-blue mb-4">
          Der perfekte Elevator Pitch
        </h3>
        <div className="space-y-4">
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Problem</h4>
            <p className="text-gray-600">
              Beginnen Sie mit dem Schmerz oder der Herausforderung Ihrer Zielgruppe
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Lösung</h4>
            <p className="text-gray-600">
              Zeigen Sie, wie Sie dieses Problem auf einzigartige Weise lösen
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Beweis</h4>
            <p className="text-gray-600">
              Liefern Sie einen schnellen Erfolgsnachweis oder eine inspirierende Vision
            </p>
          </div>
          <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
            <h4 className="font-bold text-lg text-midnight-blue mb-2">Call-to-Action</h4>
            <p className="text-gray-600">
              Schließen Sie mit einer klaren Handlungsaufforderung
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-pearl-white border-2 border-bright-gold/30 rounded-xl">
        <p className="text-gray-700 italic text-base sm:text-lg md:text-xl">
          "Facts tell, stories sell. Eine Geschichte, die Gänsehaut macht, ist unbezahlbar."
        </p>
        <p className="text-right text-bright-gold font-bold mt-3">- Claudia Conen</p>
      </div>
    </div>
  );

  return (
    <SubpageTemplate
      bild="/seiten/mikrofon.webp"
      bildAlt="Claudia Conen spricht ins Mikrofon"
      kanonischPfad="/storytelling-kurs"
      seoTitle="Storytelling lernen für Speaker | Claudia Conen"
      title="GESCHICHTEN SCHAFFEN GÄNSEHAUT"
      subtitle="Was Menschen vor sich sehen, erzählen sie weiter"
      introText="Storytelling • Emotional Selling • Elevator Pitch – Lerne, wie du mit Geschichten überzeugst und im Gedächtnis bleibst."
      bodyContent={bodyContent}
      ctaText="Bereit für Geschichten, die wirken?"
      topic="Storytelling & Emotional Selling"
    />
  );
}
