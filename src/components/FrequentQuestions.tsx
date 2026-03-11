import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBorder from './AnimatedBorder';

interface Question {
  title: string;
  slug: string;
  description: string;
  readingTime: number;
  tags: string[];
}

const frequentQuestions: Question[] = [
  {
    title: "Warum ist meine Stimme so wichtig?",
    slug: "stimme-wichtigkeit",
    description: "Du sagst die richtigen Worte. Aber niemand hört zu. Warum? Deine Stimme. Sie trägt nicht. Sie überzeugt nicht.",
    readingTime: 10,
    tags: ["Stimme", "Wirkung", "Kommunikation"]
  },
  {
    title: "Warum funktioniert Storytelling neurobiologisch?",
    slug: "warum-funktioniert-storytelling-neurobiologisch",
    description: "Zahlen. Fakten. Statistiken. Dein Gehirn gähnt. Dann kommt eine Geschichte. Plötzlich bist du hellwach.",
    readingTime: 9,
    tags: ["Storytelling", "Neurowissenschaft", "Gehirn"]
  },
  {
    title: "Wie baue ich Bühnenpräsenz auf, die bleibt?",
    slug: "wie-baue-ich-buehnenpraesenz-auf",
    description: "Bühnenpräsenz ist kein Geschenk. Keine angeborene Gabe. Kein Talent. Bühnenpräsenz ist trainierbar.",
    readingTime: 10,
    tags: ["Bühnenpräsenz", "Training", "Performance"]
  },
  {
    title: "Was macht einen starken Auftritt aus?",
    slug: "was-macht-einen-starken-auftritt-aus",
    description: "Du betrittst die Bühne. Noch kein Wort gesagt. Aber alle wissen: Das wird gut. Oder: Das wird zäh.",
    readingTime: 9,
    tags: ["Auftritt", "Präsenz", "Bühne"]
  },
  {
    title: "Warum sind Pausen mächtiger als Worte?",
    slug: "warum-sind-pausen-maechtiger-als-worte",
    description: "Du redest. Füllst jeden Moment. Keine Stille. Keine Pause. Falsch. Pausen sind dein mächtigstes Werkzeug.",
    readingTime: 8,
    tags: ["Pausen", "Rhetorik", "Wirkung"]
  },
  {
    title: "Wie schreibe ich eine emotionale Hochzeitsrede?",
    slug: "wie-schreibe-ich-eine-emotionale-hochzeitsrede",
    description: "Du sollst eine Hochzeitsrede halten. Du willst sie berühren. Zum Lachen bringen. Aber nicht kitschig sein.",
    readingTime: 9,
    tags: ["Hochzeitsrede", "Emotion", "Rede"]
  }
];

export default function FrequentQuestions() {
  return (
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
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
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
                className="kriss-card kriss-shine block h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-visible border-2 border-transparent hover:border-luxury-gold/30 group relative"
              >
                <AnimatedBorder borderRadius={16} />
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

                  <div className="flex items-center gap-2 text-bright-gold font-semibold transition-all">
                    <span className="kriss-hover-title">Jetzt lesen</span>
                    <span className="kriss-cta-arrow">
                      <ArrowRight size={16} />
                    </span>
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
            className="kriss-cta inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-midnight-blue font-bold rounded-full shadow-xl"
          >
            <BookOpen size={20} />
            Zur kompletten Wissensbibliothek
            <span className="kriss-cta-arrow">
              <ArrowRight size={20} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
