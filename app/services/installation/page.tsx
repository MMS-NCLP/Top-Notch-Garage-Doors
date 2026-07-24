import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import PortfolioPreview from '@/components/PortfolioPreview';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import { getProjectsByService } from '@/lib/portfolio-data';
import { BookOpen, Home, Thermometer, Palette, Shield } from 'lucide-react';

const installProjects = getProjectsByService('installations', 3);

export const metadata = genMeta({
  title: 'Garage Door Installation — Modern Doors & Professional Installation',
  description: 'Professional garage door installation in Whitsett, NC. Learn about insulation R-values, door styles, and materials. Premium doors from Clopay, Amarr, CHI. Free quotes.',
  path: '/services/installation',
});

export default function InstallationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Garage Door Installation',
            description: 'Professional garage door installation in Whitsett, NC and surrounding areas.',
            url: 'https://www.trytopnotchdoors.com/services/installation',
          })),
        }}
      />

      {/* HERO BANNER */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="/images/hero/modern-black-garage-door-installation-nc.jpg"
          alt="Professional garage door installation in the Piedmont Triad NC"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-2">
              <BookOpen className="w-4 h-4" /> Buyer&apos;s Guide
            </span>
            <h1 className="font-hero text-3xl sm:text-4xl text-white tracking-wider">GARAGE DOOR INSTALLATION</h1>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            A new garage door is one of the highest-ROI home improvements — returning over 90% of its cost at resale. But with dozens of styles, materials, and insulation levels, choosing the right door matters. Here&apos;s what you need to know.
          </p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">What Every Homeowner Should Know</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {[
              { icon: <Thermometer className="w-5 h-5" />, title: 'Insulation Matters', desc: 'R-value measures thermal resistance. For attached garages in NC, we recommend R-12+ polyurethane. Non-insulated doors can reach 120°F in summer.' },
              { icon: <Palette className="w-5 h-5" />, title: 'Style Sets the Tone', desc: 'Your garage door is 30% of your home\'s front facade. Carriage house, modern flush, and traditional raised-panel styles each create a different impression.' },
              { icon: <Shield className="w-5 h-5" />, title: 'Wind Load Ratings', desc: 'NC building codes may require wind-load reinforcement in certain areas. We ensure your door meets local requirements and HOA specifications.' },
              { icon: <Home className="w-5 h-5" />, title: 'When to Replace', desc: 'Doors older than 15–20 years, those with multiple damaged panels, significant rust, or R-0 insulation are candidates for replacement over repair.' },
            ].map((item) => (
              <div key={item.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-brand-blue mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PRODUCT SHOWCASE */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Door Styles &amp; Materials</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {[
              { title: 'Steel Raised Panel', desc: 'The classic. Durable, low-maintenance, available in dozens of colors. R-values from R-6 to R-18+.' },
              { title: 'Carriage House', desc: 'Swing-out charm with overhead convenience. Steel or composite with decorative hardware.' },
              { title: 'Modern Flush', desc: 'Clean, minimal lines. Full-view glass and aluminum options for contemporary homes.' },
              { title: 'Wood & Composite', desc: 'Natural warmth and character. Cedar, mahogany, or maintenance-free composite options.' },
            ].map((item) => (
              <div key={item.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <h3 className="font-display text-lg text-brand-blue mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Installation Process</h2>
          <ol className="space-y-4 mb-12">
            {[
              'Free consultation and precise measurement',
              'Door selection with style and budget guidance',
              'Professional removal and disposal of existing door',
              'Precision installation with springs, hardware, and weatherproofing',
              'Full system testing, balance calibration, and walkthrough',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-display text-sm gloss-button">
                  {i + 1}
                </span>
                <span className="text-foreground/70 pt-1">{step}</span>
              </li>
            ))}
          </ol>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Recent Installations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {[
              { src: '/images/portfolio/construction/day-ave-duplex-completed-tngd-truck-burlington-nc.jpg', alt: 'Day Ave duplex new construction completed with TNGD truck Burlington NC' },
              { src: '/images/portfolio/installations/craftsman-raised-panel-7-windows-exterior-nc.jpg', alt: 'Craftsman raised-panel garage door installation NC' },
              { src: '/images/portfolio/installations/residential-door-installation-piedmont-after.jpg', alt: 'Residential garage door installation Piedmont Triad' },
              { src: '/images/portfolio/installations/new-garage-door-burlington-nc-exterior.jpg', alt: 'New garage door installation Burlington NC' },
              { src: '/images/portfolio/construction/day-ave-black-door-completed-exterior-burlington-nc.jpg', alt: 'Day Ave new construction black door installation Burlington NC' },
              { src: '/images/portfolio/installations/garage-door-install-alamance-county-1.jpg', alt: 'Garage door installation Alamance County NC' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton text="Get a Free Quote" variant="primary" />
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      <PortfolioPreview
        projects={installProjects}
        heading="Recent Installations"
        subheading="New doors, full system upgrades, and new construction across the corridor."
      />
    </>
  );
}
