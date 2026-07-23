import { Metadata } from 'next';
import PortfolioGallery from '@/components/PortfolioGallery';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { projects } from '@/lib/portfolio-data';

export const metadata: Metadata = genMeta({
  title: 'Local Inspirations — Portfolio',
  description: 'Real garage door installations, repairs, and upgrades across the Piedmont Triad. Before & after photos from Statesville to Durham, NC. See the Top-Notch difference.',
  path: '/portfolio',
});

function portfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top-Notch Garage Doors — Project Portfolio',
    description: 'Garage door installations, repairs, spring work, opener service, and emergency work across the Piedmont Triad corridor from Statesville to Durham, NC.',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: project.title,
        description: project.caption,
        areaServed: {
          '@type': 'City',
          name: project.location,
        },
        provider: {
          '@type': 'LocalBusiness',
          '@id': 'https://www.trytopnotchdoors.com/#business',
          name: 'Top-Notch Garage Doors',
        },
        image: project.images.map((img) => ({
          '@type': 'ImageObject',
          url: `https://www.trytopnotchdoors.com${img.src}`,
          name: img.alt,
          description: img.alt,
        })),
      },
    })),
  };
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema()) }}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-hero text-4xl sm:text-5xl text-brand-blue tracking-wider mb-4">
              LOCAL INSPIRATIONS
            </h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Every project tells a story. From emergency rescues to full installations,
              here&apos;s what quality craftsmanship looks like — across the Piedmont Triad.
            </p>
          </div>

          <PortfolioGallery />

          <div className="text-center mt-16">
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
              Ready for Your Transformation?
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto mb-6 text-sm">
              Whether it&apos;s a repair, replacement, or new installation — we bring the same
              care and precision to every job.
            </p>
            <CTAButton text="Schedule Your Service" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
