import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import CTAButton from '@/components/CTAButton';
import BlogCard from '@/components/BlogCard';
import { KNOWLEDGE_TOPICS, getTopicBySlug, getRelatedTopics } from '@/lib/knowledge-hub';
import { articles } from '@/lib/blog-content';
import { getProjectsByService } from '@/lib/portfolio-data';
import { breadcrumbSchema } from '@/lib/schema';
import {
  BookOpen,
  Settings,
  Zap,
  Shield,
  AlertTriangle,
  BookMarked,
  PanelTop,
  Droplets,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Image as ImageIcon,
  GraduationCap,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  settings: <Settings className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  'alert-triangle': <AlertTriangle className="w-6 h-6" />,
  'book-open': <BookMarked className="w-6 h-6" />,
  'panel-top': <PanelTop className="w-6 h-6" />,
  droplets: <Droplets className="w-6 h-6" />,
};

const ICON_MAP_SM: Record<string, React.ReactNode> = {
  settings: <Settings className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
  'alert-triangle': <AlertTriangle className="w-4 h-4" />,
  'book-open': <BookMarked className="w-4 h-4" />,
  'panel-top': <PanelTop className="w-4 h-4" />,
  droplets: <Droplets className="w-4 h-4" />,
};

export function generateStaticParams() {
  return KNOWLEDGE_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: 'Not Found' };

  const url = `https://www.trytopnotchdoors.com/learn/${slug}`;
  const fullTitle = `${topic.title} — Knowledge Hub | Top-Notch Garage Doors`;

  return {
    title: fullTitle,
    description: topic.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: topic.metaDescription,
      url,
      siteName: 'Top-Notch Garage Doors',
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: topic.metaDescription,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const topicArticles = topic.articleSlugs
    .map((s) => {
      const article = articles[s];
      if (!article) return null;
      return { slug: s, ...article };
    })
    .filter(Boolean) as (typeof articles[string] & { slug: string })[];

  const relatedTopics = getRelatedTopics(topic);

  const portfolioProjects = topic.portfolioServiceType
    ? getProjectsByService(topic.portfolioServiceType, 4)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-24 surface-matte relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.03] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-foreground/40 mb-6">
            <Link href="/learn" className="hover:text-brand-blue transition-colors">
              Knowledge Hub
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-blue font-medium">{topic.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="hidden sm:flex w-16 h-16 rounded-xl bg-brand-blue/10 items-center justify-center text-brand-blue shrink-0">
              {ICON_MAP[topic.icon] ?? <BookOpen className="w-6 h-6" />}
            </div>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-brand-blue uppercase mb-4 leading-tight">
                {topic.headline}
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed max-w-2xl">
                {topic.description}
              </p>
            </div>
          </div>

          {/* Jump links */}
          <div className="mt-8 flex flex-wrap gap-2">
            <a href="#articles" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/5 text-xs font-display uppercase tracking-wider text-brand-blue hover:bg-brand-blue/10 transition-colors">
              <BookOpen className="w-3 h-3" /> Articles
            </a>
            <a href="#quick-facts" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/5 text-xs font-display uppercase tracking-wider text-brand-blue hover:bg-brand-blue/10 transition-colors">
              <Lightbulb className="w-3 h-3" /> Quick Facts
            </a>
            <a href="#faqs" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/5 text-xs font-display uppercase tracking-wider text-brand-blue hover:bg-brand-blue/10 transition-colors">
              <HelpCircle className="w-3 h-3" /> FAQs
            </a>
            {portfolioProjects.length > 0 && (
              <a href="#real-work" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-blue/5 text-xs font-display uppercase tracking-wider text-brand-blue hover:bg-brand-blue/10 transition-colors">
                <ImageIcon className="w-3 h-3" /> Real Work
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Quick Facts */}
      <section id="quick-facts" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-brand-gold" />
            <h2 className="font-display text-xl text-brand-blue uppercase">
              Quick Facts
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {topic.quickFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg bg-brand-blue/[0.02] border border-brand-blue/10"
              >
                <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Articles */}
      <section id="articles" className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-xl text-brand-blue uppercase">
              In-Depth Articles
            </h2>
          </div>
          <p className="text-sm text-foreground/40 mb-8">
            Deep-dive guides written by our technicians — 1,500–2,500 words each, no filler.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {topicArticles.map((article) => (
              <BlogCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                publishedAt={article.publishedAt}
                category={article.category}
                image={article.image}
                imageAlt={article.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* FAQs */}
      <section id="faqs" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-xl text-brand-blue uppercase">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-sm text-foreground/40 mb-8">
            The questions our customers ask most — answered honestly.
          </p>

          <div className="space-y-4">
            {topic.faqs.map((faq, i) => (
              <div
                key={i}
                className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam"
              >
                <h3 className="font-display text-base text-brand-blue mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: topic.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema([
                { name: 'Home', href: '/' },
                { name: 'Knowledge Hub', href: '/learn' },
                { name: topic.title, href: `/learn/${topic.slug}` },
              ])),
            }}
          />
        </div>
      </section>

      {/* Portfolio Work */}
      {portfolioProjects.length > 0 && (
        <>
          <div className="divider-gleam" />
          <section id="real-work" className="py-16 surface-matte">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-5 h-5 text-brand-blue" />
                <h2 className="font-display text-xl text-brand-blue uppercase">
                  Real Work — Our Portfolio
                </h2>
              </div>
              <p className="text-sm text-foreground/40 mb-8">
                Recent {topic.title.toLowerCase()} projects from across the Piedmont Triad.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {portfolioProjects.map((project) => {
                  const cover = project.images[0];
                  return (
                    <Link
                      key={project.id}
                      href={`/portfolio?project=${project.id}`}
                      className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-silver/20"
                    >
                      <img
                        src={cover.src}
                        alt={cover.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="font-display text-xs text-white uppercase tracking-wider line-clamp-2">
                          {project.title}
                        </p>
                        <p className="text-[10px] text-white/60 mt-0.5">
                          {project.location}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-brand-blue hover:text-brand-red transition-colors"
                >
                  View Full Portfolio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="divider-gleam" />

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-xl text-brand-blue uppercase mb-6 text-center">
              Related Topics
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {relatedTopics.map((related) => (
                <Link
                  key={related.slug}
                  href={`/learn/${related.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-lg border border-brand-silver/20 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {ICON_MAP_SM[related.icon] ?? (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <span className="font-display text-sm text-brand-blue uppercase group-hover:text-brand-red transition-colors">
                      {related.title}
                    </span>
                    <p className="text-xs text-foreground/40 mt-0.5">
                      {related.faqs.length} FAQs &middot;{' '}
                      {related.articleSlugs.length} articles
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 surface-matte text-center">
        <div className="max-w-xl mx-auto px-4">
          <GraduationCap className="w-8 h-8 text-brand-blue mx-auto mb-3" />
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
            Still Have Questions?
          </h2>
          <p className="text-foreground/50 mb-6 text-sm">
            Our team is happy to walk you through anything you&apos;ve read here. Free
            estimates, honest answers, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <CTAButton text="Schedule Free Estimate" variant="primary" />
            {topic.servicePageHref && (
              <Link
                href={topic.servicePageHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-brand-blue text-brand-blue font-display text-sm uppercase tracking-wider font-semibold hover:bg-brand-blue hover:text-white transition-colors"
              >
                View {topic.title} Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
