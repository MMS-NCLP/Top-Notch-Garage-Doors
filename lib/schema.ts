export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://topnotchgaragedoors.com',
  name: 'Top-Notch Garage Doors',
  description: 'Professional garage door repair, installation, and maintenance serving Whitsett, NC & surrounding areas.',
  url: 'https://topnotchgaragedoors.com',
  telephone: '+1-336-000-0000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '705 NC Hwy 61',
    addressLocality: 'Whitsett',
    addressRegion: 'NC',
    postalCode: '27377',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Whitsett' },
    { '@type': 'City', name: 'Burlington' },
    { '@type': 'City', name: 'Greensboro' },
    { '@type': 'City', name: 'Gibsonville' },
    { '@type': 'City', name: 'McLeansville' },
    { '@type': 'City', name: 'Elon' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:00',
  },
  priceRange: '$$',
};

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Top-Notch Garage Doors',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Whitsett, NC & Surrounding Areas',
    },
  };
}

export function articleSchema({
  title,
  description,
  url,
  publishedAt,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Top-Notch Garage Doors',
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
