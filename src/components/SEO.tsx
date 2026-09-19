import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  path?: string;
  noindex?: boolean;
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
    readingTime?: number;
  };
}

const DEFAULT_KEYWORDS = [
  'Claudia Conen',
  'Voice-to-Brain',
  'Wirkung',
  'Kommunikation',
  'Mentoring',
  'Akademie',
  'Coaching',
  'Stimme',
  'Führung',
  'Performance',
  'Köln',
  'Witten',
  'NRW'
];

export default function SEO({
  title,
  description,
  keywords = [],
  ogImage = 'https://claudiaconen.com/og-image.jpg',
  ogType = 'website',
  path,
  noindex = false,
  article
}: SEOProps) {
  const location = useLocation();
  const initialTimestamp = useRef(new Date().toISOString());

  const fullTitle = useMemo(
    () => `${title} | Claudia Conen Expert Platform`,
    [title]
  );

  const canonicalUrl = useMemo(
    () => path
      ? `https://claudiaconen.com${path}`
      : `https://claudiaconen.com${location.pathname}`,
    [path, location.pathname]
  );

  const keywordsString = useMemo(
    () => keywords.join(','),
    [keywords.length, keywords[0]]
  );

  const allKeywords = useMemo(
    () => [...new Set([...keywords, ...DEFAULT_KEYWORDS])],
    [keywordsString]
  );

  const allKeywordsString = useMemo(
    () => allKeywords.join(', '),
    [keywordsString]
  );

  const articleTagsString = useMemo(
    () => article?.tags?.join(', ') || '',
    [article?.tags?.length, article?.tags?.[0]]
  );

  const structuredData = useMemo(() => {
    if (article) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage,
        datePublished: article.publishedTime || initialTimestamp.current,
        dateModified: article.publishedTime || initialTimestamp.current,
        author: {
          '@type': 'Person',
          name: article.author || 'Claudia Conen',
          url: 'https://claudiaconen.com/ueber-mich',
          jobTitle: 'Speaker, Coach & Mentor',
          description: 'Die Umsatzstimme - 37 Jahre Expertise in emotionaler Wirkungskraft'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Claudia Conen - Die Umsatzstimme',
          logo: {
            '@type': 'ImageObject',
            url: 'https://claudiaconen.com/og-image.jpg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        keywords: articleTagsString || allKeywordsString,
        articleSection: 'Wissensbibliothek',
        timeRequired: article.readingTime ? `PT${article.readingTime}M` : undefined,
        inLanguage: 'de-DE',
        about: {
          '@type': 'Thing',
          name: 'Kommunikation & Wirkung'
        }
      };
    } else {
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Claudia Conen - Die Umsatzstimme',
        image: 'https://claudiaconen.com/og-image.jpg',
        '@id': 'https://claudiaconen.com/',
        url: 'https://claudiaconen.com/',
        telephone: '+49-160-99142208',
        email: 'info@claudiaconen-akademie.de',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Beisenweg 20',
          addressLocality: 'Witten',
          postalCode: '58452',
          addressCountry: 'DE'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.4439,
          longitude: 7.3365
        },
        areaServed: ['Köln', 'Witten', 'Nordrhein-Westfalen', 'Deutschland', 'DACH'],
        priceRange: '€€€',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        },
        description: 'Claudia Conen - Die Umsatzstimme. Expertin für emotionale Wirkungskraft, Voice-to-Brain Methode, Coaching, Mentoring und Speaker-Ausbildung in Köln.',
        sameAs: [
          'https://www.linkedin.com/in/claudia-conen-die-stimme/',
          'https://www.instagram.com/claudia_conen_umsatzstimme/',
          'https://www.provenexpert.com/de-de/conen/'
        ],
        founder: {
          '@type': 'Person',
          name: 'Claudia Conen',
          jobTitle: 'Speaker, Coach & Mentor',
          description: 'Die Umsatzstimme - 37 Jahre Expertise in Persönlichkeitsentwicklung und Storytelling'
        }
      };
    }
  }, [title, description, ogImage, canonicalUrl, allKeywordsString, article?.publishedTime, article?.author, articleTagsString, article?.readingTime]);

  useEffect(() => {
    document.title = fullTitle;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: allKeywordsString },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Claudia Conen Expert Platform' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'author', content: 'Claudia Conen' },
      { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let element = document.querySelector(`meta[${attr}="${value}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value!);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, allKeywordsString, title, articleTagsString, article?.publishedTime, article?.author, article?.readingTime, noindex]);

  // Beim Vorrendern laeuft kein useEffect. Damit Titel, Beschreibung und
  // kanonische Adresse auch dort ankommen, werden sie zusaetzlich als
  // inertes JSON-Paket ausgegeben. Das Bauskript scripts/vorrendern.tsx
  // macht daraus echte Kopfzeilen und entfernt das Paket wieder.
  return (
    <script
      type="application/json"
      data-cc-seo=""
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          title: fullTitle,
          description,
          canonicalUrl,
          ogImage,
          noindex: Boolean(noindex),
        }),
      }}
    />
  );
}
