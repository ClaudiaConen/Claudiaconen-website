import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
}

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  maxArticles?: number;
  onArticleClick: (article: Article) => void;
}

export default function RelatedArticles({
  currentArticle,
  allArticles,
  maxArticles = 3,
  onArticleClick
}: RelatedArticlesProps) {
  const findRelatedArticles = (): Article[] => {
    const scoredArticles = allArticles
      .filter(article => article.id !== currentArticle.id)
      .map(article => {
        let score = 0;

        if (article.category === currentArticle.category) {
          score += 3;
        }

        const currentTags = new Set(currentArticle.tags.map(t => t.toLowerCase()));
        const articleTags = article.tags.map(t => t.toLowerCase());

        articleTags.forEach(tag => {
          if (currentTags.has(tag)) {
            score += 2;
          }
        });

        const currentWords = new Set(
          currentArticle.title.toLowerCase()
            .split(' ')
            .filter(w => w.length > 3)
        );

        const articleWords = article.title.toLowerCase().split(' ');
        articleWords.forEach(word => {
          if (word.length > 3 && currentWords.has(word)) {
            score += 1;
          }
        });

        return { article, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxArticles);

    return scoredArticles.map(item => item.article);
  };

  const relatedArticles = findRelatedArticles();

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="border-t-2 border-gray-200 pt-6">
      <h3 className="font-bold text-midnight-blue text-lg mb-4 flex items-center gap-2">
        <span>📚</span>
        <span>Verwandte Artikel</span>
      </h3>
      <div className="grid gap-4">
        {relatedArticles.map((article) => (
          <motion.button
            key={article.id}
            onClick={() => onArticleClick(article)}
            whileHover={{ x: 4 }}
            className="text-left p-4 border-2 border-gray-100 rounded-xl hover:border-bright-gold/50 hover:bg-gradient-to-r hover:from-bright-gold/5 hover:to-transparent transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-midnight-blue mb-1 group-hover:text-bright-gold transition-colors line-clamp-1">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.description}
                </p>
                {article.category && (
                  <span className="inline-block mt-2 text-xs text-bright-gold font-medium">
                    {article.category}
                  </span>
                )}
              </div>
              <ArrowRight
                size={20}
                className="flex-shrink-0 text-bright-gold group-hover:translate-x-1 transition-transform mt-1"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
