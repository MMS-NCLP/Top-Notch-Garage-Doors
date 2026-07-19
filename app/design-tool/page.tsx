import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata = genMeta({
  title: 'Design Your Door',
  description: 'Use the Clopay Door Imagination System to visualize your new garage door. Upload a photo of your home and try different styles.',
  path: '/design-tool',
});

export default function DesignToolPage() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Design Your Door</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Upload a photo of your home and visualize how different garage door styles will look. Powered by Clopay&apos;s Door Imagination System.
          </p>
        </div>

        <div className="relative w-full aspect-[16/10] max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg border border-brand-silver/30 mb-10">
          <iframe
            src="https://www.clopaydoor.com/ezdoor"
            title="Clopay Door Design Tool"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="text-center">
          <p className="text-foreground/60 mb-4">Found a style you love? Let us bring it to life.</p>
          <CTAButton text="Schedule Consultation" variant="primary" />
        </div>
      </div>
    </section>
  );
}
