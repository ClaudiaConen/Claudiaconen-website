import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  title: string;
  slug: string;
  /** Der Anreisser, der auf der Kachel steht. Macht neugierig. */
  description: string;
  /** Die wirkliche Antwort, zwei bis drei Saetze, fuer sich allein
   *  verstaendlich. Sie steht nicht auf der Kachel, sondern in den
   *  strukturierten Daten - fuer Suchmaschinen und KI. Ein Anreisser
   *  als acceptedAnswer waere irrefuehrend und gilt als Missbrauch. */
  antwort: string;
  readingTime: number;
  tags: string[];
}

const frequentQuestions: Question[] = [
  {
    title: "Warum ist meine Stimme so wichtig?",
    slug: "stimme-wichtigkeit",
    description: "Du sagst die richtigen Worte. Aber niemand hört zu. Warum? Deine Stimme. Sie trägt nicht. Sie überzeugt nicht.",
    antwort: "Die Stimme trägt mit, wie jemand zu dem steht, was er sagt: Tempo, Pausen, der Moment, in dem sie fest wird oder nachgibt. Deshalb entscheidet sie mit darüber, ob ein Satz ankommt — unabhängig davon, wie gut er formuliert ist. Trainieren lässt sie sich wie jedes Handwerk: über Atmung, Tempo und den bewussten Umgang mit Pausen.",
    readingTime: 10,
    tags: ["Stimme", "Wirkung", "Kommunikation"]
  },
  {
    title: "Warum bleibt eine Geschichte besser hängen als eine Aufzählung?",
    slug: "warum-funktioniert-storytelling-neurobiologisch",
    description: "Zahlen. Fakten. Statistiken. Dein Gehirn gähnt. Dann kommt eine Geschichte. Plötzlich bist du hellwach.",
    antwort: "Eine Aufzählung muss man behalten, eine Geschichte erlebt man mit. Sie erzeugt Bilder und gibt einen Grund weiterzuhören, weil man wissen will, wie es ausgeht. Zahlen sind deshalb nicht wertlos — sie brauchen nur eine Szene, in der sie vorkommen.",
    readingTime: 9,
    tags: ["Storytelling", "Wirkung", "Rede"]
  },
  {
    title: "Wie baue ich Bühnenpräsenz auf, die bleibt?",
    slug: "wie-baue-ich-buehnenpraesenz-auf",
    description: "Bühnenpräsenz ist kein Geschenk. Keine angeborene Gabe. Kein Talent. Bühnenpräsenz ist trainierbar.",
    antwort: "Bühnenpräsenz ist kein Talent, sondern das Ergebnis von drei Dingen: einem festen Stand, dem Blick ins Publikum statt auf die Folien, und der Bereitschaft, eine Pause auszuhalten. Alle drei lassen sich üben. Wer sie beherrscht, wirkt ruhig, auch wenn er es innerlich nicht ist.",
    readingTime: 10,
    tags: ["Bühnenpräsenz", "Training", "Performance"]
  },
  {
    title: "Was macht einen starken Auftritt aus?",
    slug: "was-macht-einen-starken-auftritt-aus",
    description: "Du betrittst die Bühne. Noch kein Wort gesagt. Aber alle wissen: Das wird gut. Oder: Das wird zäh.",
    antwort: "Ein starker Auftritt beginnt, bevor das erste Wort fällt — mit der Art, wie jemand den Raum betritt und stehen bleibt, statt sofort loszureden. Danach entscheidet vor allem, ob die erste Minute eine Behauptung aufstellt, die das Publikum angeht. Technik und Folien sind zweitrangig.",
    readingTime: 9,
    tags: ["Auftritt", "Präsenz", "Bühne"]
  },
  {
    title: "Warum sind Pausen mächtiger als Worte?",
    slug: "warum-sind-pausen-maechtiger-als-worte",
    description: "Du redest. Füllst jeden Moment. Keine Stille. Keine Pause. Falsch. Pausen sind dein mächtigstes Werkzeug.",
    antwort: "Eine Pause gibt dem Zuhörer Zeit, das Gesagte einzuordnen — ohne sie läuft alles ineinander. Sie zeigt außerdem Sicherheit: Wer eine Stille aushält, wirkt, als habe er die Kontrolle über den Raum. Die schwierigste Pause ist die direkt nach dem wichtigsten Satz, und genau die wirkt am stärksten.",
    readingTime: 8,
    tags: ["Pausen", "Rhetorik", "Wirkung"]
  },
  {
    title: "Wie schreibe ich eine emotionale Hochzeitsrede?",
    slug: "wie-schreibe-ich-eine-emotionale-hochzeitsrede",
    description: "Du sollst eine Hochzeitsrede halten. Du willst sie berühren. Zum Lachen bringen. Aber nicht kitschig sein.",
    antwort: "Eine Hochzeitsrede berührt, wenn sie eine konkrete Szene erzählt statt Eigenschaften aufzuzählen — nicht die Aufzaehlung ihrer Eigenschaften, sondern der eine Abend, an dem sie es war. Drei Minuten reichen. Was nicht hineingehört: Insider, die nur die halbe Hochzeitsgesellschaft versteht.",
    readingTime: 9,
    tags: ["Hochzeitsrede", "Emotion", "Rede"]
  }
];

export default function FrequentQuestions() {
  // Die strukturierten Daten. Jedes Frage-Antwort-Paar ist fuer eine KI
  // ein eigener Kandidat, um zitiert zu werden - vorausgesetzt, die
  // Antwort steht wirklich da und ist fuer sich verstaendlich.
  const fragenDaten = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: frequentQuestions.map((q) => ({
      '@type': 'Question',
      name: q.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.antwort,
      },
    })),
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fragenDaten) }}
    />
    <section className="py-20 bg-gradient-to-b from-white to-pearl-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-blue mb-4">
            <span className="text-dark-gold">
              Häufige Fragen
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
            Die wichtigsten Antworten aus unserer Wissensbibliothek
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {frequentQuestions.map((question, index) => (
            <motion.div
              key={question.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/wissensbibliothek#${question.slug}`}
                className="block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-luxury-gold/30 group"
              >
                <div className="p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{question.readingTime} Min.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      <span>Artikel</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-midnight-blue line-clamp-2 group-hover:text-bright-gold transition-colors">
                    {question.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-3 leading-relaxed flex-grow">
                    {question.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {question.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gradient-to-r from-bright-gold/10 to-luxury-gold/5 border border-luxury-gold/30 rounded-full text-xs text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-bright-gold font-semibold group-hover:gap-3 transition-all">
                    <span>Jetzt lesen</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/wissensbibliothek"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#F4D03F] text-midnight-blue font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            <BookOpen size={20} />
            Zur kompletten Wissensbibliothek
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  );
}
