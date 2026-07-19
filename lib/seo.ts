import type { Metadata } from 'next';

const SITE_URL = 'https://topnotchgaragedoors.com';
const SITE_NAME = 'Top-Notch Garage Doors';
const DEFAULT_DESCRIPTION = 'Expert garage door troubleshooting, repair, and installation in Whitsett, NC. Learn why your door won\'t open, find emergency same-day service, and explore premium installation options.';

export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/brand/og-default.jpg',
  keywords = [] as string[],
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const defaultKeywords = [
    'garage door troubleshooting',
    'garage door repair Whitsett NC',
    'garage door won\'t open',
    'broken garage door spring',
    'same-day garage door repair',
    'garage door installation',
    'garage door maintenance',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export { SITE_URL, SITE_NAME };
