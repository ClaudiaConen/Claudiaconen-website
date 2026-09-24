import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mic, BookOpen, Sparkles, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SEO from '../components/SEO';
import Buecher from '../components/Buecher';
import Werte from '../components/Werte';


/**
 * Sechs Video-Plätze (Wunsch Claudia, Discord 24.09.2026 10:25 UTC).
 * Je Video: vimeo = die Zahl aus der Vimeo-Adresse, titel und text von Claudia.
 * Ein Platz ohne vimeo erscheint NUR in der Vorschau als Platzhalter und ist live
 * unsichtbar – so kann die Seite nie mit leeren Kästen online gehen.
 */
const VORSCHAU = true; // vor dem Push auf false setzen

type Video = { vimeo?: string; titel: string; text: string };
const videos: Video[] = [
  { titel: '[Titel Video 1]', text: '[Dein Text zu Video 1]' },
  { titel: '[Titel Video 2]', text: '[Dein Text zu Video 2]' },
  { titel: '[Titel Video 3]', text: '[Dein Text zu Video 3]' },
  { titel: '[Titel Video 4]', text: '[Dein Text zu Video 4]' },
  { titel: '[Titel Video 5]', text: '[Dein Text zu Video 5]' },
  { titel: '[Titel Video 6]', text: '[Dein Text zu Video 6]' },
];
const VIDEO_UEBERSCHRIFT = '[Überschrift für die Videos]';

export default function UeberMich() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    '/claudia11.jpg',
    '/claudia12.jpg',
    '/claudia13.jpg',
    '/claudia14.jpg',
    '/claudia15.jpg',
    '/claudia16.jpg',
    '/claudia17.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const highlights = [
    {
      icon: Mic,
      title: 'Die Umsatzstimme',
      description: 'Expertin für emotionale Wirkungskraft',
    },
    {
      icon: Heart,
      title: 'Meine Leidenschaft',
      description: 'Die Kunst und Macht der Stimme vermitteln',
    },
    {
      icon: BookOpen,
      title: 'Meine Mission',
      description: 'Menschen mit meiner Stimme berühren',
    },
  ];

  return (
    <>
      <SEO
        title="Über mich | Claudia Conen"
        description="Claudia Conen ist Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung. Woher das kommt und was daraus wurde."
        path="/ueber-mich"
      />

      {/* ProfilePage (22.09.2026): Google empfiehlt es fuer "Ueber mich"-Seiten, damit die Person eindeutig
          zugeordnet wird. mainEntity zeigt auf die Person aus index.html. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            dateModified: '2026-09-22',
            mainEntity: {
              '@type': 'Person',
              '@id': 'https://claudiaconen.com/#claudia-conen',
              name: 'Claudia Conen',
              description: 'Keynote-Speakerin, Trainerin, Coach und Autorin für unverwechselbare persönliche Wirkung – seit 37 Jahren.',
              image: 'https://claudiaconen.com/Claudia14.png',
              sameAs: [
                'https://www.linkedin.com/in/claudia-conen-die-stimme/',
                'https://www.instagram.com/claudia_conen_umsatzstimme/',
                'https://www.youtube.com/channel/UCjJSrS_4lJ8pSdGtNZarKFQ',
                'https://open.spotify.com/show/1roEST6nZsiRbMfkmpIciC',
              ],
            },
          }),
        }}
      />
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/photo_2025-09-25%2023.28.37%20(2).jpeg)',
            zIndex: 0
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-pearl-white via-pearl-white/95 to-pearl-white"
          style={{ opacity: 0.95, zIndex: 1 }}
        />

        <div className="relative" style={{ zIndex: 10 }}>
          <Navigation />
          <WhatsAppButton />

          <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full border border-luxury-gold/30">
                <span className="text-bright-gold font-semibold">Meine Geschichte</span>
              </div>
              <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-midnight-blue">
                Entdecke, ob du Vertrauen zu mir{' '}
                <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  aufbauen kannst
                </span>
              </h1>
              <p className="text-xl text-midnight-blue/80 max-w-3xl mx-auto">
                Erfahre mehr über mich, weil ich dich zu deinem Ziel begleiten werde
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16 relative"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:flex flex-col gap-12 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`left-${i}`}
                    className="relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 1, 1.3, 1],
                      opacity: [0, 1, 1, 1, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeOut"
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] shadow-2xl" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#FFD700]"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{
                        scale: [1, 2.5, 2.5],
                        opacity: [0.8, 0, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:flex flex-col gap-12 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`right-${i}`}
                    className="relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5, 1, 1.3, 1],
                      opacity: [0, 1, 1, 1, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.2 + 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeOut"
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FFD700] to-[#D4AF37] shadow-2xl" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#FFD700]"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{
                        scale: [1, 2.5, 2.5],
                        opacity: [0.8, 0, 0]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.2 + 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={currentSlide}
                        src={sliderImages[currentSlide]}
                        alt="Claudia Conen"
                        className="w-full h-full object-cover absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="relative group"
                    aria-label={`Gehe zu Bild ${index + 1}`}
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? 'bg-luxury-gold scale-110'
                          : 'bg-luxury-gold/30 hover:bg-luxury-gold/50'
                      }`}
                      animate={currentSlide === index ? {
                        scale: [1, 1.3, 1],
                      } : {}}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                    {currentSlide === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-luxury-gold"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{
                          scale: 2,
                          opacity: 0
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-luxury-gold/30 text-center shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-midnight-blue" />
                    </div>
                    <h3 className="font-montserrat font-bold text-xl mb-2 text-midnight-blue">{highlight.title}</h3>
                    <p className="text-midnight-blue/70">{highlight.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-luxury-gold/30 mb-12 shadow-xl"
            >
              <div className="prose max-w-none">
                <h2 className="font-montserrat font-bold text-3xl mb-6 text-midnight-blue">
                  Claudia Conen - Die Umsatzstimme
                </h2>
                <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                  Claudia Conen ist bekannt als "Die Umsatzstimme", Expertin für emotionale Wirkungskraft,
                  Speaker, Freie Rednerin, Coach, Trainerin und Autorin.
                </p>
                <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                  Claudia lehrt die Kunst eines der wertvollsten Marketinginstrumente der heutigen Zeit:
                  Die menschliche Stimme, die unaufhaltsam Emotionen weckt. Sie regt an, dass der Mensch
                  die Künstliche Intelligenz unbedingt nutzen sollte, um im Business überleben zu können.
                </p>

                <div className="bg-luxury-gold/10 p-6 rounded-xl mb-8 border-l-4 border-luxury-gold">
                  <Quote className="text-luxury-gold mb-3" size={32} />
                  <p className="text-midnight-blue/90 italic text-lg mb-4">
                    Hast du dich schon einmal gefragt, warum manche Leute im Business so erfolgreich mit ihrer
                    Stimme sind? Und warum wir manchen Sprechern gebannt lauschen, während andere uns eher abstoßen?
                    Die Antwort liegt in der Kraft der einzigartigen, hörbaren Persönlichkeit, einem der mächtigsten
                    Marketinginstrumente unserer Zeit: der menschlichen Stimme.
                  </p>
                </div>

                <h3 className="font-montserrat font-bold text-2xl mb-4 text-midnight-blue">
                  Was du bei mir erfährst:
                </h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Wie verblüffend schnell die Stimme vom Ohr ins Herz geht</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Warum deine Stimme so viel mit deiner Glaubwürdigkeit zu tun hat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Wie du lernen kannst, deine eigene Stimme zu lieben, damit dir Menschen gerne zuhören</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Wieso die einzigartige Stimme eines Menschen auch der Verräter des Menschen ist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Wie du deine Stimme als Gewinnbringer, statt als Gewinnkiller einsetzt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="text-luxury-gold flex-shrink-0 mt-1" size={20} />
                    <span className="text-midnight-blue/80">Wieso Worte wie Medizin wirken, aber auch brutal verletzen können</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 p-8 rounded-2xl mb-8 border border-luxury-gold/30">
                  <h3 className="font-montserrat font-bold text-2xl mb-4 text-midnight-blue">
                    Mein tiefstes Anliegen
                  </h3>
                  <p className="text-midnight-blue/90 text-lg leading-relaxed">
                    Mein tiefstes Anliegen ist es, die Kunst und die Macht der Stimme zu vermitteln und die Menschen
                    mit meiner Stimme zu berühren. In unterschiedlichsten Unternehmen vermittle ich die verblüffende
                    Macht der Stimme und die Erkenntnisse, dass Worte magisch wie ein Magnet sein können und so
                    gefährlich wie ein Messer in der Brust.
                  </p>
                </div>

                <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                  Heute liebe ich es, mit Speakern und freien Rednern zu arbeiten, die eine wertvolle Botschaft in
                  die Herzen der Menschen tragen.
                </p>

                <div className="bg-luxury-gold/10 p-6 rounded-xl mb-8 border-l-4 border-luxury-gold">
                  <h4 className="font-montserrat font-bold text-xl mb-3 text-midnight-blue">
                    Meine Botschaft für dich:
                  </h4>
                  <p className="text-midnight-blue/90 text-lg leading-relaxed">
                    Finde deine Berufung! Nimm dir die Zeit, damit du weißt, warum du tust, was du tust.
                    Entdecke deine Berufung und mach dir ein glückliches Leben! Und bitte achte auf deine Worte,
                    damit du dich positiv bei anderen Menschen im Gehirn speicherst.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-white via-white to-[#FFD700]/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-luxury-gold/30 mb-12 shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img
                  src="/Claudia18.jpeg"
                  alt="Claudia Conen"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 via-midnight-blue/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                  <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
                    Meine Geschichte
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700]" />
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="prose max-w-none mb-10">
                  <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                    Stell dir vor, wie fantastisch es wäre, wenn du wüsstest, wie du dich in Sekundenschnelle
                    im Gedächtnis deiner Zuhörer verankern kannst.
                  </p>
                  <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                    Kennst du Worte, die dich dein Leben lang gelenkt haben, als wärest du eine Marionette?
                    Wenn ja, dann weißt du, wovon ich rede. Diese Geschichte kann ein Türöffner für dich sein.
                  </p>
                  <p className="text-midnight-blue/80 text-lg leading-relaxed mb-6">
                    Meine seltsamen Erfahrungen wollen dir nahebringen, dass es egal ist, was dir im Leben
                    passiert ist - du kannst es sowieso nicht mehr ändern. Du besitzt die Macht, das Beste
                    aus dem Schlimmsten zu machen. Eventuell bist du schon dabei und weißt es gar nicht.
                  </p>
                  <p className="text-midnight-blue/80 text-lg leading-relaxed mb-8">
                    Alles, was wir erleben, formt uns. Mich hat es ganze 39 Jahre gekostet, um zu erkennen,
                    warum ich diesen Job mache und warum ich so gut darin bin.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
                  <div className="space-y-6">
                    <h3 className="font-montserrat font-bold text-2xl mb-6 text-midnight-blue">
                      Die Entführung, die meine Berufung prägte
                    </h3>
                    <p className="text-midnight-blue/80 text-lg leading-relaxed">
                      Da steht ein kleines 11-jähriges Mädchen in heller Jeans und Kuschelpullover, lächelnd
                      am Eingang der Dorfkirmes und spielt fröhlich mit ihrer Zuckerwatte. Sie bewundert ihre
                      coole Freundin Michaela, die fröhlich und winkend hoch oben im Kinder-Karussell sitzt.
                      Sie sind zusammen dorthin geschlichen.
                    </p>
                    <p className="text-midnight-blue/80 text-lg leading-relaxed">
                      Plötzlich der absolute Albtraum: Ein alter brauner Kartoffelsack wird dem kleinen Mädchen
                      über den Kopf gestülpt. Die klebrige Zuckerwatte klebt an ihrem ganzen Gesicht. Grobe Hände
                      packen sie und schleppen sie weg. Der Schock lässt sie sofort erstarren. Sie kann keinen
                      Ton von sich geben. Das Geräusch der Auto-Schiebetür, die abrupt zuknallt, und die fremden
                      lauten Stimmen dringen in ihr Gehirn ein.
                    </p>
                    <p className="text-midnight-blue/80 text-lg leading-relaxed">
                      72 Stunden kann sie nichts sehen, nur diese Stimmen hören. Die verräterischen Stimmen der
                      5 brutalen Angreifer. Nach der Befreiung schweigt das Mädchen unter Schock 6 Monate lang.
                      Die Stimmen der längst entkommenen Verbrecher hören bis heute nicht auf, in ihr zu klingen.
                      Wie besessen hört sie hin, wenn Menschen miteinander reden. Mit dem heimlichen Motiv, die
                      Täter zu entlarven und hinter Gitter zu bringen.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-2xl overflow-hidden border-2 border-luxury-gold/30 shadow-xl bg-white">
                      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                        <iframe
                          src="https://player.vimeo.com/video/1140873666?badge=0&autopause=0&player_id=0&app_id=58479"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                          title="Claudia Conen - Meine Geschichte"
                        />
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border-2 border-luxury-gold/30 shadow-xl">
                      <img
                        src="/claudia20.jpeg"
                        alt="Claudia Conen"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-midnight-blue/80 text-lg leading-relaxed">
                    Die Polizei-Psychologin sagt ihr, sie solle alles aufschreiben. Dann würde der Schmerz aus
                    ihr herauskommen. Ihre Stimme würde dann zurückkommen. Sie schenkt der Kleinen ein leeres
                    rotes Buch mit vielen weißen Blättern. Pedantisch beschreibt das Mädchen die schauderhaften
                    unterschiedlichen Männerstimmen in diesem Buch.
                  </p>
                  <p className="text-midnight-blue/80 text-lg leading-relaxed">
                    Ein damals sinnloses kindlich-geschriebenes Stimmanalyse-Buch. Sie fokussiert sich darauf,
                    den Menschen präzise zu lauschen, um die nie gefassten Täter zu entdecken und zu identifizieren.
                  </p>
                  <p className="text-midnight-blue/80 text-lg leading-relaxed">
                    Das Mädchen von damals, mit dem großen Drang nach Freiheit, ist ihr Leben lang beruflich
                    selbstständig. Unbewusst ist sie fokussiert auf die Wahrnehmung der hörbaren Emotionen.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 p-8 rounded-2xl border-l-4 border-luxury-gold">
                  <p className="text-midnight-blue text-xl sm:text-2xl font-semibold leading-relaxed italic text-center">
                    Dieses kleine Mädchen steckt heute noch in mir.
                  </p>
                </div>
              </div>
            </motion.div>


            {(VORSCHAU || videos.some((v) => v.vimeo)) && (
              <section aria-labelledby="videos" className="mb-12">
                <h2 id="videos" className="font-montserrat font-bold text-3xl sm:text-4xl text-midnight-blue text-center mb-10">
                  {VIDEO_UEBERSCHRIFT}
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {videos
                    .filter((v) => VORSCHAU || v.vimeo)
                    .map((v, i) => (
                      <article key={i} className="bg-white rounded-2xl border border-luxury-gold/30 shadow-lg overflow-hidden">
                        <div className="relative aspect-video bg-[#13233F]">
                          {v.vimeo ? (
                            <iframe
                              src={`https://player.vimeo.com/video/${v.vimeo}?badge=0&autopause=0&dnt=1`}
                              title={v.titel}
                              loading="lazy"
                              allow="autoplay; fullscreen; picture-in-picture"
                              className="absolute inset-0 h-full w-full"
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-luxury-gold/60 m-3 rounded-xl text-center">
                              <span className="font-montserrat text-5xl font-bold text-luxury-gold">{i + 1}</span>
                              <span className="font-montserrat text-sm uppercase tracking-[0.2em] text-pearl-white/80">Platz für Video {i + 1}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="font-montserrat font-bold text-xl text-midnight-blue mb-2">{v.titel}</h3>
                          <p className="text-midnight-blue/80 leading-relaxed">{v.text}</p>
                        </div>
                      </article>
                    ))}
                </div>
              </section>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center bg-gradient-to-r from-[#D4AF37]/10 to-[#FFD700]/10 p-8 rounded-2xl border border-luxury-gold/30 shadow-lg"
            >
              <Heart className="text-luxury-gold mx-auto mb-4" size={48} />
              <p className="text-midnight-blue/90 text-xl leading-relaxed mb-4">
                Das größte Geschenk auf Erden ist Zeit und Aufmerksamkeit.
              </p>
              <p className="text-midnight-blue/90 text-xl leading-relaxed">
                Ich freue mich darüber, dass du bis zur letzten Zeile gelesen hast.
              </p>
              <p className="text-luxury-gold text-2xl font-montserrat font-semibold mt-6">
                Mit lieben Gedanken, Claudia
              </p>
            </motion.div>
          </div>
        </div>
        </div>
      </div>

      <Werte />
      <Buecher />
      <Footer />
    </>
  );
}
