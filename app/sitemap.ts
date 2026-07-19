import type { MetadataRoute } from 'next';

const BASE_URL = 'https://topnotchgaragedoors.com';

const cities = ['whitsett', 'burlington', 'greensboro', 'gibsonville', 'mcleansville', 'elon'];

const blogSlugs = [
  'garage-door-springs-replacement-guide',
  'garage-door-insulation-guide',
  'smart-garage-door-openers-2026',
  'emergency-garage-door-repair-what-to-do',
  'garage-door-maintenance-seasonal-checklist',
  'best-garage-door-styles-for-north-carolina-homes',
  'garage-door-opener-troubleshooting-guide',
  'diy-garage-door-maintenance-tips',
  'garage-door-safety-features-every-homeowner-needs',
  'pressure-washing-guide-when-why-how',
  'garage-screen-doors-complete-buyers-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}`, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/services/repair`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/services/installation`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/services/openers`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/services/pressure-washing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/garage-screens`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/brands`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/design-tool`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/coupons`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/promotions`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/reviews`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/warranty`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/resources`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/partnership`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE_URL}/accessibility`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/service-areas/${city}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...blogPages];
}
