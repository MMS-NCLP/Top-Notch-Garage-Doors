const BUSINESS_ID = 'https://topnotchgaragedoors.com';

export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Top-Notch Garage Doors',
  description: 'Professional garage door repair, installation, and maintenance serving the Piedmont Triad corridor from Statesville to Mebane, NC. Authorized Clopay, LiftMaster, and Amarr dealer with factory-trained technicians.',
  url: BUSINESS_ID,
  telephone: '+1-336-604-6494',
  faxNumber: '+1-336-604-0809',
  image: `${BUSINESS_ID}/images/logos/tngd-logo-small-1.png`,
  logo: `${BUSINESS_ID}/images/logos/tngd-logo-small-1.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1183 University Drive Ste 105, #2115',
    addressLocality: 'Burlington',
    addressRegion: 'NC',
    postalCode: '27215',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.0726,
    longitude: -79.4378,
  },
  hasMap: 'https://maps.google.com/?q=1183+University+Drive+Ste+105+Burlington+NC+27215',
  sameAs: [
    'https://www.facebook.com/topnotchdoorsnc',
    'https://www.instagram.com/topnotchdoorsnc',
    'https://www.linkedin.com/company/topnotchdoorsnc',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Statesville', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Mooresville', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Salisbury', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Lexington', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Thomasville', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'High Point', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Greensboro', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Burlington', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Whitsett', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Gibsonville', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'McLeansville', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Elon', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
    { '@type': 'City', name: 'Mebane', containedInPlace: { '@type': 'State', name: 'North Carolina' } },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$',
  knowsAbout: [
    'garage door repair',
    'garage door installation',
    'garage door opener installation',
    'garage door spring replacement',
    'garage door maintenance',
    'pressure washing',
    'garage screen doors',
  ],
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
      '@id': BUSINESS_ID,
      name: 'Top-Notch Garage Doors',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Piedmont Triad, NC — Statesville to Mebane',
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
      '@id': BUSINESS_ID,
      name: 'Top-Notch Garage Doors',
    },
    publisher: {
      '@type': 'Organization',
      '@id': BUSINESS_ID,
      name: 'Top-Notch Garage Doors',
      logo: {
        '@type': 'ImageObject',
        url: `${BUSINESS_ID}/images/logos/tngd-logo-small-1.png`,
      },
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
