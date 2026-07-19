import BlogCard from '@/components/BlogCard';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { BookOpen } from 'lucide-react';
import { articles } from '@/lib/blog-content';

export const metadata = genMeta({
  title: 'Blog — Garage Door Guides, Tips & Industry Knowledge',
  description: 'Expert garage door guides: troubleshooting stuck doors, spring replacement signs, insulation R-values, smart opener features. Education-first content from Whitsett, NC pros.',
  path: '/blog',
  keywords: ['garage door stuck', 'garage door makes noise', 'garage door safety', 'broken spring symptoms', 'opener not responding'],
});

const posts = Object.entries(articles)
  .map(([slug, article]) => ({
    title: article.title,
    slug,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    category: article.category,
  }))
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

export default function BlogPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <BookOpen className="w-4 h-4" /> Knowledge Base
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Blog</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            In-depth guides, troubleshooting resources, and industry insights to help you make informed decisions about your garage door.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-foreground/60 text-sm mb-4">Have a question we haven&apos;t covered?</p>
          <CTAButton text="Contact Us" variant="outline" showIcon={false} />
        </div>
      </div>
    </section>
  );
}
