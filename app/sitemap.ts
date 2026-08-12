import type { MetadataRoute } from 'next';
import { articles } from '@/lib/blog-content';
import { KNOWLEDGE_TOPICS } from '@/lib/knowledge-hub';

const BASE_URL = 'https://www.trytopnotchdoors.com';

const cities = ['statesville', 'mooresville', 'salisbury', 'lexington', 'thomasville', 'high-point', 'greensboro', 'mcleansville', 'gibsonville', 'whitsett', 'burlington', 'elon', 'mebane', 'durham'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, changeFrequency: 'weekly', priority: 1.0, lastModified: '2026-08-12' },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-07-24' },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.9, lastModified: '2026-08-12' },
    { url: `${BASE_URL}/services/repair`, changeFrequency: 'monthly', priority: 0.9, lastModified: '2026-06-01' },
    { url: `${BASE_URL}/services/installation`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-07-24' },
    { url: `${BASE_URL}/services/openers`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-06-01' },
    { url: `${BASE_URL}/garage-screens`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-06-01' },
    { url: `${BASE_URL}/brands`, changeFrequency: 'monthly', priority: 0.7, lastModified: '2026-06-01' },
    { url: `${BASE_URL}/design-tool`, changeFrequency: 'monthly', priority: 0.6, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/coupons`, changeFrequency: 'weekly', priority: 0.7, lastModified: '2026-08-12' },
    { url: `${BASE_URL}/portfolio`, changeFrequency: 'weekly', priority: 0.8, lastModified: '2026-07-24' },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8, lastModified: '2026-08-12' },
    { url: `${BASE_URL}/reviews`, changeFrequency: 'weekly', priority: 0.8, lastModified: '2026-08-12' },
    { url: `${BASE_URL}/service-areas`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-07-24' },
    { url: `${BASE_URL}/warranty`, changeFrequency: 'monthly', priority: 0.6, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/resources`, changeFrequency: 'monthly', priority: 0.7, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/partnership`, changeFrequency: 'monthly', priority: 0.6, lastModified: '2026-07-24' },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/accessibility`, changeFrequency: 'yearly', priority: 0.3, lastModified: '2026-05-01' },
    { url: `${BASE_URL}/book`, changeFrequency: 'monthly', priority: 0.8, lastModified: '2026-06-01' },
  ];

  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/service-areas/${city}`,
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: '2026-07-24',
  }));

  const HIDDEN_BLOG_SLUGS = ['pressure-washing-guide-when-why-how'];
  const blogPages: MetadataRoute.Sitemap = Object.entries(articles)
    .filter(([slug]) => !HIDDEN_BLOG_SLUGS.includes(slug))
    .map(([slug, article]) => ({
      url: `${BASE_URL}/blog/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: article.publishedAt,
    }));

  const learnPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/learn`, changeFrequency: 'weekly', priority: 0.9, lastModified: '2026-08-12' },
    ...KNOWLEDGE_TOPICS
      .filter((topic) => topic.slug !== 'pressure-washing')
      .map((topic) => ({
        url: `${BASE_URL}/learn/${topic.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        lastModified: '2026-07-24',
      })),
  ];

  return [...staticPages, ...cityPages, ...blogPages, ...learnPages];
}
