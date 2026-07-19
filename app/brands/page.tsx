import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { BookOpen, Award } from 'lucide-react';

export const metadata = genMeta({
  title: 'Brands We Carry — Manufacturer Guide',
  description: 'Learn about top garage door manufacturers: Clopay, LiftMaster, Amarr, CHI, Wayne Dalton, Chamberlain. Features, warranties, and best-fit guidance.',
  path: '/brands',
  keywords: ['Clopay garage doors', 'LiftMaster opener', 'Amarr doors', 'CHI garage doors', 'garage door brands'],
});

const brands = [
  { name: 'Clopay', description: 'America\'s favorite garage door brand. Residential and commercial doors in steel, wood, composite, and aluminum. Lifetime limited warranty. Their Door Imagination System lets you visualize doors on your home.', link: '/design-tool', strengths: ['Widest style selection', 'R-18+ insulation options', 'Lifetime warranty'] },
  { name: 'LiftMaster', description: 'The #1 professionally installed opener brand. myQ smart platform with built-in Wi-Fi, camera options, and battery backup. Industry-leading security features.', link: '/services/openers', strengths: ['Built-in camera models', 'Battery backup standard', 'myQ smart platform'] },
  { name: 'Amarr', description: 'Quality steel and wood garage doors with SafeGuard pinch-resistant panels standard. Strong warranty program and extensive customization.', link: '/services/installation', strengths: ['SafeGuard safety panels', 'Extensive color options', 'Wind-load rated models'] },
  { name: 'CHI Overhead Doors', description: 'Craftsmanship meets customization. Known for stamped steel carriage house designs, flush panels, and one of the widest color selections in the industry.', link: '/services/installation', strengths: ['Color matching available', 'Stamped carriage designs', 'Full-view aluminum'] },
  { name: 'Wayne Dalton', description: 'Innovative designs with proprietary TorqueMaster counterbalance system that encloses springs for added safety. Classic to contemporary styles.', link: '/services/installation', strengths: ['TorqueMaster safety system', 'Quiet operation', 'Value pricing'] },
  { name: 'Chamberlain', description: 'Consumer-focused smart garage control with myQ. Affordable smart openers with smartphone monitoring, timer-to-close, and guest access features.', link: '/services/openers', strengths: ['Budget-friendly smart', 'myQ compatible', 'DIY-friendly remotes'] },
];

export default function BrandsPage() {
  return (
    <>
      {/* EDUCATION */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <BookOpen className="w-4 h-4" /> Manufacturer Guide
            </span>
            <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Brands We Carry</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Not all garage door brands are equal. Understanding the differences in warranty coverage, product lines, and specializations helps you make the right investment. Here&apos;s what sets each apart.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <div key={brand.name} className="surface-elevated border border-brand-silver/20 rounded-lg p-8 gleam">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <h2 className="font-display text-xl text-brand-blue">{brand.name}</h2>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{brand.description}</p>
                <ul className="space-y-1.5 mb-4">
                  {brand.strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link href={brand.link} className="text-sm font-medium text-brand-red hover:text-red-700 transition-colors">
                  View Products &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      <section className="py-16 text-center">
        <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Not Sure Which Brand Is Right?</h2>
        <p className="text-foreground/60 max-w-xl mx-auto mb-6 text-sm">
          We&apos;ll assess your needs — budget, style preferences, insulation requirements, and HOA restrictions — and recommend the best fit.
        </p>
        <CTAButton text="Get a Free Recommendation" variant="primary" />
      </section>
    </>
  );
}
