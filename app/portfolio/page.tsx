import { Metadata } from 'next';
import PortfolioGallery from '@/components/PortfolioGallery';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'Local Inspirations — Portfolio',
  description: 'Real garage door installations, repairs, and upgrades across the Piedmont Triad. Before & after photos from Statesville to Durham, NC. See the Top-Notch difference.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
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
