import type { Metadata } from 'next';

const SITE_URL = 'https://www.trytopnotchdoors.com';
const SITE_NAME = 'Top-Notch Garage Doors';
const DEFAULT_DESCRIPTION = 'Expert garage door troubleshooting, repair, and installation serving the Piedmont Triad from Statesville to Durham, NC. Same-day emergency service, authorized Clopay & LiftMaster dealer.';

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
    'garage door repair Piedmont Triad NC',
    'garage door installation Burlington NC',
    'garage door repair Greensboro NC',
    'garage door service Whitsett NC',
    'garage door repair High Point NC',
    'garage door Statesville to Durham',
    'same-day garage door repair NC',
    'broken garage door spring repair',
    'garage door opener installation NC',
    'authorized Clopay dealer NC',
    'LiftMaster certified installer',
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
