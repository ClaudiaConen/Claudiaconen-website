import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Users, BookOpen, Mic } from 'lucide-react';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ImageSlider from '../components/ImageSlider';
import { supabase } from '../lib/supabase';

export default function VonSchattenZuLicht() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('schatten_zu_licht_registrations')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SEO
        title="Von Schatten zu Licht - Workshop & Buchprojekt | Claudia Conen"
        description="Verwandle deine Geschichte in eine kraftvolle Botschaft. Workshop für unverwechselbare Wirkung mit Claudia Conen - Die Umsatzstimme mit Herz."
      />
      <div className="min-h-screen bg-gradient-to-b from-[#0A1628] via-[#0F1F3A] to-[#0A1628]">
        <Navigation />

        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#DAA520]/20 to-[#F4D03F]/20 rounded-full border border-luxury-gold/30 mb-6">
                <span className="text-luxury-gold font-semibold text-lg">Von Schatten zu Licht</span>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
                UNVERWECHSELBARE WIRKUNG.<br />
                NICHT PERFEKT. ECHT. <span className="text-luxury-gold">Du.</span>
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-royal-navy via-midnight-blue to-royal-navy">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#1a1a2e]/80 to-[#0f0f1e]/80 backdrop-blur-sm rounded-3xl border border-luxury-gold/20 shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-[400px_1fr] gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-center items-center p-8"
                >
                  <div className="relative w-full max-w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/claudiaconen3_(1).webp"
                      width={1366}
                      height={768}
                      alt="Von Schatten zu Licht - Workshop und Buchprojekt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="p-8 sm:p-12 space-y-6"
                >
                  <div className="space-y-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="font-montserrat font-bold text-2xl sm:text-3xl text-white"
                    >
                      Dein Workshop & Buchprojekt
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-lg sm:text-xl text-pearl-white/90 italic"
                    >
                      "Nutze die unsichtbare Brücke ins Herz - entdecke wie du dich im Kopf deiner Zuhörer verankerst"
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-pearl-white/80"
                    >
                      Ich begleite dich, damit deine Geschichte Teil von etwas Größerem wird.
                    </motion.p>
                  </div>

                  <motion.a
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    href="https://claudiaconen-akademie.de/von-schatten-ins-licht"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    Zur Workshop-Anmeldung
                    <ArrowRight size={20} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e]/60 to-[#0f0f1e]/60">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                In diesem intensiven Workshop gehen wir gemeinsam den Weg
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { from: 'vom Erlebten', to: 'zur Erkenntnis' },
                { from: 'vom Überleben', to: 'zur Botschaft' },
                { from: 'von der Wunde', to: 'zur Wirkung' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-8 rounded-2xl border border-luxury-gold/20"
                >
                  <p className="text-xl text-pearl-white/70 mb-2">{item.from}</p>
                  <ArrowRight className="text-luxury-gold mx-auto my-4" size={32} />
                  <p className="text-2xl font-bold text-luxury-gold">{item.to}</p>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6 text-center max-w-3xl mx-auto">
              {[
                'Du erkennst, was dich – trotz allem oder gerade deswegen – einzigartig macht.',
                'Du wirst nicht Opfer bleiben, sondern Botschafter:in deiner Wahrheit sein.',
                'Du wirst Menschen nicht für Mitleid, sondern für Klarheit berühren.',
                'Dein Erlebtes wird gehört, gefühlt und gewandelt.'
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg text-pearl-white/90"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-2xl italic text-luxury-gold">
                "Es ist nicht das, was dir passiert ist.<br />
                Es ist, was du daraus machst – und wie du es weitergibst."
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
            >
              Warum dieser Workshop wirkt
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'Selbsterkenntnis erzeugt Wirkungskraft',
                  text: 'wenn du weißt, wie du wirkst, entsteht ein Schwungrad, das deine Botschaft klar, stark und glaubwürdig macht.'
                },
                {
                  icon: Heart,
                  title: 'Warum Geschichten bleiben',
                  text: 'Menschen erinnern sich an Szenen, nicht an Aufzählungen. Was jemand vor sich sieht, kann er weitererzählen.'
                },
                {
                  icon: Users,
                  title: 'Vertrauen durch Echtheit',
                  text: 'im Zeitalter der Perfektion auf Mausklick berührt nur das, was spürbar echt ist und im Einklang mit dir steht.'
                },
                {
                  icon: Mic,
                  title: 'Deine akustische Visitenkarte',
                  text: 'deine Stimme ist dein unverwechselbarer Fingerabdruck, der Vertrauen weckt und Nähe schafft.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 p-8 rounded-2xl border border-luxury-gold/20"
                >
                  <item.icon className="text-luxury-gold mb-4" size={40} />
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-pearl-white/80">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e]/60 to-[#0f0f1e]/60">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
            >
              Was dich erwartet
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Selbsterkenntnis & Storytelling – deine Geschichte klar, mutig und ohne unnötiges Drama erzählen.',
                'Stimmwirkungskraft & Präsenz – deine Worte so einsetzen, dass sie ins Herz treffen und im Kopf bleiben.',
                'Bühnen- & Business-Performance – deine Botschaft professionell in Vorträgen, Videos oder Kundengesprächen präsentieren.',
                'Achtsamkeit & Verantwortung – berühren, ohne zu verletzen, und dabei authentisch bleiben.',
                'Die Macht der Worte – und wie du sie mit Würde und Klarheit einsetzt.'
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-6 rounded-xl border border-luxury-gold/20"
                >
                  <p className="text-pearl-white/90">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
                Dieser Workshop ist für dich, wenn...
              </h2>
              <div className="space-y-4">
                {[
                  'du Klarheit in deiner Kommunikation suchst – im Leben oder im Business.',
                  'du deine Erlebnisse in eine wertvolle Botschaft verwandeln möchtest.',
                  'du als Unternehmer:in, Speaker oder Coach mit Echtheit Kunden gewinnen willst.',
                  'du als freie:r Redner:in oder in anderen Bereichen mit deiner Geschichte Wirkung erzielen möchtest.',
                  'dir wichtig ist, verantwortungsvoll mit deiner Geschichte umzugehen – und dabei andere zu stärken, statt zu verletzen.'
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                    <p className="text-pearl-white/90">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a2e]/60 to-[#0f0f1e]/60 p-8 rounded-2xl border border-red-500/30"
            >
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-center mb-6 text-red-400">
                Dieser Workshop ist (noch) nicht für dich, wenn...
              </h2>
              <div className="space-y-4">
                {[
                  'wenn du medizinische oder therapeutische Unterstützung suchst – dieser Workshop ersetzt keine Therapie.',
                  'wenn du deine Geschichte ausschließlich nutzen möchtest, um Mitleid zu erzeugen.',
                  'wenn du nicht bereit bist, offen und konstruktiv an deiner Wirkung zu arbeiten.',
                  'wenn dir die Achtsamkeit im Umgang mit Worten und Menschen nicht wichtig ist.'
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <p className="text-pearl-white/80">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-4 text-white">
                Rommerskirchen, August 2025
              </h2>
              <p className="text-xl text-pearl-white/90 italic">
                Ein Moment des Muts. Ein Raum voller Herzen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-lg text-pearl-white/80 text-center max-w-3xl mx-auto mb-12">
                Als Claudia ihre Geschichte live auf der Bühne teilte, entstand etwas Besonderes – eine Atmosphäre von Vertrauen, Respekt und tiefer Verbundenheit. Dieser Workshop ist mehr als Methodik. Er ist eine Begegnung mit dir selbst.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
                'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
                '/schattenzulicht.webp'
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <img
                    src={image}
                    alt={`Von Schatten zu Licht Event Rommerskirchen August 2025 - Bild ${index + 1}`}
                    className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg text-pearl-white/70 italic max-w-2xl mx-auto">
                Fotos: Sabine Neumann
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e]/60 to-[#0f0f1e]/60">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-8 rounded-2xl border border-luxury-gold/20"
              >
                <Users className="text-luxury-gold mb-4" size={48} />
                <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                  Workshop: Von Schatten zu Licht - in der Gruppe
                </h3>
                <p className="text-pearl-white/90 mb-6">
                  Manche Wege geht man gemeinsam. In einer kleinen, geschützten Gruppe ab 3 Personen erarbeiten wir deine Botschaft Schritt für Schritt. Du erhältst persönliches Feedback, Impulse zur Stimmwirkung und Strategien, wie du Menschen berührst – im Leben, im Business oder auf der Bühne.
                </p>
                <a
                  href="https://claudiaconen-akademie.de/von-schatten-ins-licht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Zur Workshop-Anmeldung
                  <ArrowRight size={20} />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-8 rounded-2xl border border-luxury-gold/20"
              >
                <Heart className="text-luxury-gold mb-4" size={48} />
                <h3 className="font-playfair text-2xl font-bold mb-4 text-white">
                  Premium 1:1 Intensivcoaching
                </h3>
                <p className="text-pearl-white/90 mb-6">
                  Manche Wege verdienen volle Aufmerksamkeit. Im geschützten, vertrauten Raum betrachten wir gemeinsam: Wo willst du hin? Was möchtest du aus deiner Geschichte machen? Welche Wirkung soll sie entfalten?
                </p>
                <p className="text-pearl-white/80 mb-6 text-sm">
                  Es gibt Menschen, mit denen gehe ich diesen Weg online. Es gibt Menschen, mit denen arbeite ich in ihren eigenen Wohlfühlräumen. Und es gibt Menschen, die kommen zu mir nach Köln an den Rhein.
                </p>
                <a
                  href="/1zu1-mentoring"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Mehr erfahren
                  <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <BookOpen className="text-luxury-gold mx-auto mb-6" size={64} />
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                Von Schatten zu Licht - Das Buchprojekt
              </h2>
              <p className="text-xl text-pearl-white/90 mb-4">
                Wunden heilen. Narben bleiben.
              </p>
              <p className="text-lg text-pearl-white/80 mb-8">
                Und manchmal werden Narben zu Botschaften, die anderen den Weg zeigen.
              </p>
              <p className="text-pearl-white/90 mb-4">
                Dieses Buch erzählt von Menschen, die Schmerz in Stärke verwandelt haben.
              </p>
              <p className="text-pearl-white/90 mb-8">
                Ihre Geschichten geben Mut. Orientierung. Hoffnung.
              </p>
              <p className="text-lg text-luxury-gold italic mb-8">
                Alles entsteht gerade. Hab Geduld.
              </p>
              <p className="text-pearl-white/90">
                Willst du deine Geschichte teilen? Trag dich unverbindlich ein – und sei unter den Ersten, die Teil dieses Buches werden oder es später kaufen können.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-8 sm:p-12 rounded-2xl border border-luxury-gold/20"
            >
              <h3 className="font-playfair text-2xl font-bold text-center mb-8 text-white">
                Willst du dabei sein? Dann trage dich hier ein.
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-pearl-white/90 mb-2">
                      Dein Vorname
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-pearl-white/90 mb-2">
                      Dein Nachname
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-pearl-white/90 mb-2">
                    E-Mail Adresse
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-pearl-white/90 mb-2">
                    Deine Telefonnummer für Rückfragen
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-midnight-blue/50 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Hier vormerken'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center">Vielen Dank für deine Anmeldung!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">Es gab einen Fehler. Bitte versuche es erneut.</p>
                )}

                <p className="text-xs text-pearl-white/60 text-center">
                  Wir vermeiden Spam und verwenden E-Mail Adressen ausschließlich in Verbindung mit diesem Projekt und für weiterführende Kampagnen der Claudia Conen Akademie. 🔒
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1e]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                Wer ich bin
              </h2>
              <p className="text-2xl text-luxury-gold mb-4">
                Claudia Conen – bekannt als "Die Umsatzstimme mit Herz"
              </p>
              <p className="text-xl text-white mb-8">
                Expertin für unverwechselbare Wirkung – mit Herz
              </p>
              <p className="text-white/95 mb-4">
                Keynote-Speakerin • Vortragsrednerin • Coach • Voice-Over
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg !text-white">
                Worte sind Türöffner – direkt vom Ohr ins Herz. Meine Berufung habe ich zu meiner Leidenschaft gemacht:
              </p>
              <p className="text-xl font-semibold text-center !text-luxury-gold">
                Die Unverwechselbarkeit eines Menschen zur hörbaren Marke zu formen – das ist meine Stärke.
              </p>
              <p className="!text-white">
                Mit Stimme, Storytelling und authentischer Performance unterstütze ich Menschen, die mit Achtsamkeit berühren wollen – um im Kopf zu bleiben.
              </p>
              <p className="!text-white">
                Wer sich im Zuhörer verankern will, braucht Klarheit, Haltung und Wirkung. Im digitalen Zeitalter mehr denn je.
              </p>
              <p className="text-center italic !text-luxury-gold">
                Nicht Perfektion zählt – sondern Einzigartigkeit und Authentizität.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1e]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] p-8 sm:p-12 rounded-2xl border border-luxury-gold/30"
            >
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                Warum ich: "Das macht den Unterschied"
              </h3>
              <div className="space-y-4">
                <p className="!text-white">Am helllichten Tag, 15 Uhr, Kirmesplatz.</p>
                <p className="!text-white">Ich war elf. Zuckerwatte in der Hand, Kinderlachen, Musik.</p>
                <p className="!text-white">Dann: ein Kartoffelsack über meinem Kopf, fremde Hände, ein Auto, Stille. 72 Stunden, sagte später die Polizei.</p>
                <p className="!text-white">Die Täter habe ich nie gesehen – aber ihre Stimmen haben sich eingebrannt. Wie ein Virus auf einer Computerfestplatte.</p>
                <p className="!text-white">Sie verrieten Aggression, Persönlichkeit – mehr als Worte je könnten.</p>
                <p className="!text-white">39 Jahre lang lenkte mich diese Erfahrung, bis ich meine Berufung zu meiner Leidenschaft machte.</p>
                <p className="!text-white">Ich suchte nach Antworten in Sprechwirkungsforschung, Neurowissenschaften und der Wirkungskraft von Stimme und Worten.</p>
                <p className="!text-luxury-gold font-semibold pt-4">
                  Heute nutze ich genau dieses Wissen, um Menschen zu stärken – mit Kommunikation, die in Sekunden berührt, und mit der Klarheit, die eigene Einzigartigkeit und Unverwechselbarkeit sichtbar zu machen – achtsam, verantwortungsvoll und mit Wirkung.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0f0f1e] to-[#1a1a2e]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                Impressionen
              </h2>
              <p className="text-pearl-white/90">
                Einblicke in meine Arbeit als Speakerin und Coach
              </p>
            </motion.div>
            <ImageSlider />
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e]/60 to-[#0f0f1e]/60">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                Dein Geschenk von mir - schon heute
              </h2>
              <p className="text-pearl-white/90 mb-4">
                Du kannst dabei sein – ob du buchst oder nicht.
              </p>
              <p className="text-lg text-pearl-white/90 mb-8">
                Ich lade dich jetzt schon ein in meine kostenfreie Community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                'wertvolle Impulse zu Klarheit, Stimme und Präsenz',
                'Gedanken und Perspektiven, die dich weiterbringen',
                'persönliche Einblicke & Impressionen aus meinem Alltag als Coach und Speakerin',
                'Tipps, kleine Wegbegleiter und manchmal genau den einen Satz, der dich heute weiterbringt'
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-6 rounded-xl border border-luxury-gold/20 flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-luxury-gold mt-2 flex-shrink-0" />
                  <p className="text-pearl-white/90">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <a
                href="https://t.me/+tQBwOmBOhM01YmEy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-semibold rounded-full hover:scale-105 transition-transform duration-300 text-lg"
              >
                Community-Einladung jetzt, nicht erst später
                <ArrowRight size={24} />
              </a>
              <p className="text-xl italic text-luxury-gold mt-8">
                "Deine Einzigartigkeit ist die Veränderung, die andere inspiriert."
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-8 text-white">
                Ein Blick. Ein Klick<br />
                Alles, was ich dir bieten kann
              </h2>
              <p className="text-xl text-pearl-white/90 mb-4">
                und wie du davon profitierst
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { text: 'Direkter Zugang zur Workshop', link: 'https://claudiaconen-akademie.de/von-schatten-ins-licht' },
                { text: 'Mein Terminkalender für ein persönliches Gespräch', link: 'https://claudiaconen.de/kontakt' },
                { text: 'Zugang zu meiner kostenfreien Community bei Telegram', link: 'https://t.me/+tQBwOmBOhM01YmEy' },
                { text: 'Überblick über meine weiteren Angebote-Claudia Conen Akademie', link: '/' },
                { text: 'Kleine kostbare Geschenke', link: '/wissen/to-go' }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-6 rounded-xl border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300 hover:scale-105 flex items-center justify-between gap-4"
                >
                  <p className="text-pearl-white/90">{item.text}</p>
                  <ArrowRight className="text-luxury-gold flex-shrink-0" size={24} />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-2xl text-luxury-gold italic mb-4">
                "Entdecke alles für deine Wirkungskraft – für Herz, Kopf und Erfolg."
              </p>
              <p className="text-xl text-pearl-white/90">
                "Nimm alles mit, was dich weiterbringt – aber wähle zuerst den Schritt, der dein Leben am schnellsten verändert."
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a1a2e]/60 to-[#0f0f1e]/60">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold mb-6 text-white">
                Hier beginnt dein Vorsprung
              </h2>
              <p className="text-xl text-pearl-white/90">
                Entdecke, wie wir deine Unverwechselbarkeit, deine Marke und deine Botschaft so stärken, dass du Herzen berührst – und im Kopf bleibst.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                'Vorträge, die bewegen – Keynotes & Impulsreden zu Storytelling, emotionalem Verkauf und Markenbotschaften, die Herz und Kopf erreichen.',
                'Bühne & Live-Events – Moderationen, Reden für besondere Anlässe, Auftritts- und Performance-Coaching für maximale Präsenz.',
                'Marke hörbar machen – Voice-Over, Telefon- & Videotraining, Social-Media-Content mit Stimmwirkung und klarer Botschaft.',
                'Transformation & Selbstwirksamkeit – 1:1-Coachings für Selbsterkenntnis, souveränes Auftreten und unverwechselbare Wirkungskraft.',
                'Ausbildung & Zertifizierung – Freie-Redner-Ausbildung, Rhetorik-Trainings und praxisnahe Kommunikationstrainings – online & live.'
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f0f1e]/80 p-6 rounded-xl border border-luxury-gold/20 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-luxury-gold font-bold">{index + 1}</span>
                  </div>
                  <p className="text-pearl-white/90">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <p className="text-3xl italic text-luxury-gold">
                "Worte sind Brücken – und du entscheidest, wohin sie führen."
              </p>
              <p className="text-2xl text-pearl-white/90">
                "Du musst diesen Weg nicht allein gehen – aber er wird nur dir gehören."
              </p>

              <div className="pt-8">
                <a
                  href="https://claudiaconen-akademie.de/von-schatten-ins-licht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform duration-300 text-xl shadow-2xl"
                >
                  Jetzt starten
                  <ArrowRight size={28} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
