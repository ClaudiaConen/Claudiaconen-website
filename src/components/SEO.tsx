import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  path?: string;
  /** Zeigt auf die massgebliche Seite, wenn zwei Adressen denselben
   *  Inhalt haben. Ohne Angabe ist die Seite selbst massgeblich. */
  kanonischPfad?: string;
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
  kanonischPfad,
  noindex = false,
  article
}: SEOProps) {
  const location = useLocation();
  const initialTimestamp = useRef(new Date().toISOString());

  // Der Name gehoert genau einmal in den Titel. Frueher hing hier
  // "| Claudia Conen Expert Platform" an - der Projektname des Baukastens,
  // der in 78 von 78 Titeln stand und in 50 den Namen verdoppelte.
  const fullTitle = useMemo(
    () => (title.includes('Claudia Conen') ? title : `${title} | Claudia Conen`),
    [title]
  );

  const canonicalUrl = useMemo(
    () => {
      // kanonischPfad schlaegt alles: Er zeigt auf die massgebliche
      // Seite, wenn diese hier nur eine zweite Adresse desselben
      // Inhalts ist.
      const ziel = kanonischPfad ?? path ?? location.pathname;
      return `https://claudiaconen.com${ziel}`;
    },
    [kanonischPfad, path, location.pathname]
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
          jobTitle: 'Keynote-Speakerin und Mentorin für persönliche Wirkung',
          description: 'Claudia Conen arbeitet seit 37 Jahren mit Stimme, Bühne und Menschen. Sie hält Keynotes für Unternehmen, bildet Rednerinnen und Redner aus und spricht bei Trauerfeiern und freien Trauungen.'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Claudia Conen',
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
        name: 'Claudia Conen',
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
        description: 'Claudia Conen arbeitet seit 37 Jahren mit Stimme, Bühne und Menschen. Sie hält Keynotes für Unternehmen, bildet Rednerinnen und Redner aus und spricht bei Trauerfeiern und freien Trauungen.',
        sameAs: [
          'https://www.linkedin.com/in/claudia-conen-die-stimme/',
          'https://www.instagram.com/claudia_conen_umsatzstimme/'
        ],
        founder: {
          '@type': 'Person',
          name: 'Claudia Conen',
          jobTitle: 'Keynote-Speakerin und Mentorin für persönliche Wirkung',
          description: 'Claudia Conen arbeitet seit 37 Jahren mit Stimme, Bühne und Menschen. Sie hält Keynotes für Unternehmen, bildet Rednerinnen und Redner aus und spricht bei Trauerfeiern und freien Trauungen.'
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
      { property: 'og:site_name', content: 'Claudia Conen' },
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
