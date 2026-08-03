import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { KNOWLEDGE_TOPICS } from '@/lib/knowledge-hub';
import { articles } from '@/lib/blog-content';
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
  GraduationCap,
  Lightbulb,
} from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Door Knowledge Hub — Guides, Safety & Expert Resources',
  description:
    'Your complete garage door education center. In-depth guides on springs, openers, maintenance, safety, buying decisions, screen doors, and pressure washing from Piedmont Triad experts.',
  path: '/learn',
  keywords: [
    'garage door guide',
    'garage door spring guide',
    'garage door opener guide',
    'garage door maintenance checklist',
    'garage door safety',
    'garage door buying guide NC',
  ],
});

const ICON_MAP: Record<string, React.ReactNode> = {
  settings: <Settings className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  'alert-triangle': <AlertTriangle className="w-6 h-6" />,
  'book-open': <BookMarked className="w-6 h-6" />,
  'panel-top': <PanelTop className="w-6 h-6" />,
  droplets: <Droplets className="w-6 h-6" />,
};

export default function LearnPage() {
  const totalArticles = Object.keys(articles).length;

  return (
    <>
      {/* Hero */}
      <section className="py-20 sm:py-28 surface-matte relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.03] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
              <GraduationCap className="w-4 h-4" />
              Homeowner Knowledge Center
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-blue uppercase mb-5 leading-tight">
              Learn Before You <span className="text-brand-red">Decide</span>
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              We believe informed homeowners make better decisions — and get better results.
              Explore our in-depth guides organized by topic, written by the technicians who
              do this work every day across the Piedmont Triad.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/40">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {totalArticles} in-depth articles
              </span>
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                {KNOWLEDGE_TOPICS.length} topic guides
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Written by working technicians
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Topic Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-3">
              Explore by <span className="text-brand-red">Topic</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Each topic page organizes our best articles, FAQs, quick facts, and related
              portfolio work into one place. Start with what matters to you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {KNOWLEDGE_TOPICS.map((topic) => {
              const articleCount = topic.articleSlugs.filter(
                (s) => articles[s],
              ).length;

              return (
                <Link
                  key={topic.slug}
                  href={`/learn/${topic.slug}`}
                  className="group surface-elevated border border-brand-silver/20 rounded-xl p-7 hover:shadow-lg hover:border-brand-blue/20 transition-all gleam"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-${topic.color}/10 flex items-center justify-center text-${topic.color} group-hover:bg-brand-blue group-hover:text-white transition-colors`}
                    >
                      {ICON_MAP[topic.icon] ?? (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-display text-lg text-brand-blue uppercase mb-2 group-hover:text-brand-red transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-foreground/50 leading-relaxed mb-4 line-clamp-3">
                    {topic.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-foreground/30">
                    <span>{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>{topic.faqs.length} FAQs</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>{topic.quickFacts.length} quick facts</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Why We Educate */}
      <section className="py-16 bg-brand-blue/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">
            Why We Publish This
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-3">
            Most garage door companies want you to call first and ask questions later.
            We think that&apos;s backwards. When you understand what&apos;s happening with your
            door — the mechanics, the warning signs, the options — you make decisions
            you feel good about. No pressure, no surprises.
          </p>
          <p className="text-foreground/60 leading-relaxed mb-8">
            Every guide on this site is written by technicians who work on garage doors
            every day in Burlington, Greensboro, High Point, and across the Piedmont Triad.
            Not marketing copy. Not AI filler. Real expertise from real experience.
          </p>
          <CTAButton text="Schedule a Free Estimate" variant="primary" />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Latest Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-xl text-brand-blue uppercase mb-3">
            Want to Browse Everything?
          </h2>
          <p className="text-foreground/50 text-sm mb-5">
            Our full blog has every article in chronological order.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-brand-blue hover:text-brand-red transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            View All Articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
