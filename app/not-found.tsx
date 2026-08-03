import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { Home, Search, Wrench, MapPin, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-display text-7xl text-brand-blue/20 mb-4">404</p>
        <h1 className="font-display text-3xl text-brand-blue uppercase mb-4">
          Page Not Found
        </h1>
        <p className="text-foreground/50 mb-10 leading-relaxed">
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on track.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 text-left mb-10">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-lg border border-brand-silver/20 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all group"
          >
            <Home className="w-5 h-5 text-brand-blue shrink-0" />
            <div>
              <span className="font-display text-sm text-brand-blue uppercase group-hover:text-brand-red transition-colors">
                Home
              </span>
              <p className="text-xs text-foreground/40">Back to the main page</p>
            </div>
          </Link>
          <Link
            href="/services/repair"
            className="flex items-center gap-3 p-4 rounded-lg border border-brand-silver/20 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all group"
          >
            <Wrench className="w-5 h-5 text-brand-blue shrink-0" />
            <div>
              <span className="font-display text-sm text-brand-blue uppercase group-hover:text-brand-red transition-colors">
                Repair Services
              </span>
              <p className="text-xs text-foreground/40">Emergency & same-day repair</p>
            </div>
          </Link>
          <Link
            href="/service-areas"
            className="flex items-center gap-3 p-4 rounded-lg border border-brand-silver/20 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all group"
          >
            <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
            <div>
              <span className="font-display text-sm text-brand-blue uppercase group-hover:text-brand-red transition-colors">
                Service Areas
              </span>
              <p className="text-xs text-foreground/40">Statesville to Durham</p>
            </div>
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-3 p-4 rounded-lg border border-brand-silver/20 hover:border-brand-blue/30 hover:bg-brand-blue/[0.02] transition-all group"
          >
            <BookOpen className="w-5 h-5 text-brand-blue shrink-0" />
            <div>
              <span className="font-display text-sm text-brand-blue uppercase group-hover:text-brand-red transition-colors">
                Knowledge Hub
              </span>
              <p className="text-xs text-foreground/40">Guides, FAQs & resources</p>
            </div>
          </Link>
        </div>

        <CTAButton text="Schedule Free Estimate" variant="primary" />
      </div>
    </section>
  );
}
