import { notFound } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import { articleSchema } from '@/lib/schema';
import Link from 'next/link';
import { articles } from '@/lib/blog-content';

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};
  return {
    title: `${article.title} | Top-Notch Garage Doors`,
    description: article.excerpt,
    alternates: { canonical: `https://www.trytopnotchdoors.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema({
            title: article.title,
            description: article.excerpt,
            url: `https://www.trytopnotchdoors.com/blog/${slug}`,
            publishedAt: article.publishedAt,
          })),
        }}
      />

      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm text-foreground/40 uppercase tracking-wider">
              {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-medium">
              {article.category}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-brand-blue uppercase mt-2 mb-8">
            {article.title}
          </h1>
          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed space-y-4">
            {article.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} className="font-display text-2xl text-brand-blue uppercase mt-10 mb-4">{para.replace('## ', '')}</h2>;
              }
              if (para.startsWith('### ')) {
                return <h3 key={i} className="font-display text-xl text-brand-blue mt-8 mb-3">{para.replace('### ', '')}</h3>;
              }
              if (para.startsWith('- ') || para.startsWith('1. ')) {
                const items = para.split('\n');
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-foreground/70">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^[-\d.]\s*/, '')}</li>
                    ))}
                  </ul>
                );
              }
              if (para.startsWith('**')) {
                const text = para.replace(/\*\*(.*?)\*\*/g, '$1');
                return <p key={i} className="font-semibold text-foreground/80">{text}</p>;
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          <div className="mt-16 pt-8 border-t border-brand-silver/30 text-center">
            <p className="text-foreground/60 mb-4">Need help with your garage door?</p>
            <CTAButton text="Book Service" variant="primary" />
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-brand-blue hover:text-brand-red transition-colors">
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
