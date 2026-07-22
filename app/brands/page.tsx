import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ShieldCheck, Award, Star, Wrench, Users, BadgeCheck, Truck, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = genMeta({
  title: 'Authorized Brands & Partnerships — Manufacturer Guide',
  description: 'Top-Notch Garage Doors is an authorized dealer and installer for Clopay, LiftMaster, Amarr, and more. Factory-trained technicians, premium parts, and unbeatable warranty coverage across the Piedmont Triad.',
  path: '/brands',
  keywords: ['authorized Clopay dealer NC', 'LiftMaster certified installer', 'Amarr garage doors Burlington NC', 'garage door brands Piedmont Triad'],
});

const DOOR_BRANDS = [
  {
    name: 'Clopay',
    tagline: 'America\'s Favorite Garage Door',
    logo: '/images/logos/brand-clopay.png',
    authority: 'Authorized Dealer & Installer',
    description: 'As an authorized Clopay dealer, we carry the full lineup of residential and commercial garage doors — steel, wood composite, aluminum, and the premium Canyon Ridge Collection. Every Clopay door comes with a lifetime limited warranty and is backed by our factory-trained installation team.',
    products: ['Canyon Ridge Collection', 'Coachman Series', 'Modern Steel', 'Classic Steel', 'Avante Full-View'],
    highlights: ['Lifetime limited warranty', 'R-18+ insulation options', 'Door Imagination System visualizer', 'Wind-load rated models available'],
    link: '/design-tool',
  },
  {
    name: 'Amarr',
    tagline: 'Quality Built to Last',
    logo: '/images/logos/brand-amarr.png',
    authority: 'Certified Dealer',
    description: 'Amarr delivers quality steel and wood garage doors with SafeGuard pinch-resistant panels standard on every model. We carry their full residential line including the designer Oak Summit and Hillcrest collections, with extensive color and window options to match any home style.',
    products: ['Oak Summit Collection', 'Hillcrest Series', 'Stratford', 'Lincoln', 'Heritage'],
    highlights: ['SafeGuard pinch-resistant panels', 'Extensive color & window options', 'Wind-load rated models', 'Strong warranty program'],
    link: '/services/installation',
  },
  {
    name: 'Haas Door',
    tagline: 'American Craftsmanship Since 1954',
    logo: '/images/logos/brand-haas.png',
    authority: 'Authorized Dealer',
    description: 'Haas Door brings seven decades of American manufacturing to every garage door they build. Known for their steel and aluminum models with exceptional insulation values and custom sizing capabilities that handle non-standard openings other brands can\'t.',
    products: ['American Tradition Series', 'Aluminum Full-View', 'Commercial Sectional', 'Custom-Sized Doors'],
    highlights: ['Made in USA since 1954', 'Custom sizing available', 'Superior insulation values', 'Commercial & residential'],
    link: '/services/installation',
  },
  {
    name: 'Garaga',
    tagline: 'Innovation Meets Insulation',
    logo: '/images/logos/brand-garaga.png',
    authority: 'Authorized Dealer',
    description: 'Garaga specializes in high-performance insulated garage doors engineered for energy efficiency and durability. Their proprietary weather-tight seal system and polyurethane insulation deliver some of the highest R-values in the industry.',
    products: ['Standard+ Series', 'North Hatley', 'Cambridge', 'Acadia', 'California'],
    highlights: ['Industry-leading R-values', 'Proprietary weather seal system', 'Polyurethane insulation', 'Extensive design studio'],
    link: '/services/installation',
  },
  {
    name: 'Overhead Door',
    tagline: 'The Original. Since 1921.',
    logo: '/images/logos/brand-overhead-door.png',
    authority: 'Authorized Dealer',
    description: 'The company that invented the upward-acting garage door over a century ago. Overhead Door\'s Thermacore line delivers exceptional insulation with steel-polyurethane-steel construction, and their Courtyard Collection offers premium carriage house aesthetics.',
    products: ['Thermacore Collection', 'Courtyard Series', 'Traditional Steel', 'Aluminum Full-View'],
    highlights: ['Invented the garage door in 1921', 'Thermacore insulated line', 'Premium Courtyard designs', 'Commercial & residential'],
    link: '/services/installation',
  },
];

const OPENER_BRANDS = [
  {
    name: 'LiftMaster',
    tagline: 'The #1 Professionally Installed Brand',
    logo: '/images/logos/brand-liftmaster.png',
    authority: 'Factory-Trained & Certified Installer',
    description: 'As a factory-trained LiftMaster installer, our technicians are certified on every product line — from the premium 87504 wall-mount to the value-driven 84501. Every installation includes full myQ smart platform setup, app configuration, and connectivity testing.',
    products: ['87504 Elite Wall-Mount', '84602 Belt Drive', '8500W Jackshaft', '84501 Belt Drive', 'myQ Smart Platform'],
    highlights: ['Built-in camera models', 'Battery backup on premium units', 'myQ smartphone control', 'Secure View camera integration'],
    image: '/images/products/liftmaster-81600-belt-drive.png',
    link: '/services/openers',
  },
  {
    name: 'Chamberlain',
    tagline: 'Smart Access for Every Home',
    logo: '/images/logos/brand-chamberlain.png',
    authority: 'Authorized Dealer',
    description: 'Chamberlain brings myQ smart garage control to every price point. From smartphone monitoring and timer-to-close features to guest access and Amazon Key compatibility, Chamberlain makes smart garage access accessible to every homeowner.',
    products: ['B6753T Smartphone-Controlled', 'B4643T Belt Drive', 'myQ Smart Hub', 'Wireless Keypads & Remotes'],
    highlights: ['myQ compatible ecosystem', 'Amazon Key integration', 'Budget-friendly smart openers', 'Timer-to-close feature'],
    link: '/services/openers',
  },
  {
    name: 'Genie',
    tagline: 'Reliable Innovation Since 1954',
    logo: '/images/logos/brand-genie.png',
    authority: 'Authorized Service Provider',
    description: 'Genie offers reliable, innovative openers with the Aladdin Connect smart platform. Known for quiet belt-drive operation, integrated LED lighting, and their exclusive Safe-T-Beam sensor system for enhanced safety.',
    products: ['StealthDrive Connect', 'ChainMax 1200', 'SilentMax Connect', 'Aladdin Connect Smart Platform'],
    highlights: ['Aladdin Connect smart platform', 'Integrated LED lighting', 'Safe-T-Beam sensors', 'Quiet belt-drive models'],
    link: '/services/openers',
  },
];

const TRUST_PILLARS = [
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Premium Parts',
    subtitle: 'Factory-Grade Components',
    description: 'We exclusively use premium parts manufactured by industry-leading brands. Each component — from torsion springs and safety rollers to end-bearing plates — is designed for durability and performance, not cut-rate substitution.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Trusted Service',
    subtitle: 'Where Reliability Meets Quality',
    description: 'Every job begins with a thorough 25-point door diagnostic. Our fully stocked service vehicles carry the parts to complete most repairs in a single visit — no return trips, no surprise charges, no shortcuts.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Trusted Professionals',
    subtitle: 'Factory-Trained & Insured',
    description: 'Our technicians are factory-trained by the brands we carry, fully insured, and background-checked. They don\'t just install — they educate you on your system and stand behind every job with our unbeatable warranty.',
  },
];

export default function BrandsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-6 right-6 opacity-15 hidden lg:block">
          <Image src="/images/logos/tngd-logo-small-1.png" alt="" width={100} height={100} className="object-contain" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BadgeCheck className="w-4 h-4" /> Authorized Dealer & Certified Installer
          </span>
          <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl tracking-wider mb-4">
            BRANDS & PARTNERSHIPS
          </h1>
          <p className="font-display text-lg sm:text-xl uppercase tracking-wide text-white/80 mb-3">
            Factory-Authorized. Factory-Trained. Factory-Backed.
          </p>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Top-Notch Garage Doors is an authorized dealer and certified installer for the industry&apos;s leading manufacturers. Our technicians are factory-trained on every product line we carry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/50 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Authorized Dealers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Factory-Trained Techs</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> 2-Year Parts Warranty</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" /> Genuine OEM Parts</span>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* TRUST PILLARS */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {TRUST_PILLARS.map((pillar) => (
              <div key={pillar.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-8 text-center gleam">
                <div className="w-16 h-16 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue mx-auto mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl text-brand-blue uppercase mb-1">{pillar.title}</h3>
                <p className="text-xs font-display uppercase tracking-wider text-brand-gold mb-3">{pillar.subtitle}</p>
                <p className="text-sm text-foreground/60 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* DOOR BRANDS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <Star className="w-4 h-4" /> Garage Door Manufacturers
            </span>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              The Doors We Install
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We carry and install garage doors from the industry&apos;s most trusted manufacturers. Every door is backed by the manufacturer&apos;s warranty plus our own 2-year parts guarantee.
            </p>
          </div>

          <div className="space-y-8">
            {DOOR_BRANDS.map((brand, i) => (
              <div key={brand.name} className={`surface-elevated border border-brand-silver/20 rounded-xl overflow-hidden gleam ${i % 2 === 0 ? '' : ''}`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Logo + Authority */}
                  <div className="lg:w-72 shrink-0 bg-gradient-to-b from-brand-blue/[0.03] to-transparent p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-silver/20">
                    <div className="w-32 h-20 relative mb-4">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full">
                      <BadgeCheck className="w-3 h-3" /> {brand.authority}
                    </span>
                    <p className="text-xs text-foreground/40 mt-2 italic text-center">{brand.tagline}</p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <h3 className="font-display text-2xl text-brand-blue mb-3">{brand.name}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-5">{brand.description}</p>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-wider text-brand-blue mb-2">Product Lines</h4>
                        <ul className="space-y-1">
                          {brand.products.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm text-foreground/60">
                              <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-wider text-brand-blue mb-2">Why We Recommend</h4>
                        <ul className="space-y-1">
                          {brand.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-sm text-foreground/60">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Link href={brand.link} className="text-sm font-display uppercase tracking-wider text-brand-red hover:text-red-700 transition-colors">
                        Explore {brand.name} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* OPENER BRANDS */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <Wrench className="w-4 h-4" /> Opener & Smart Access Brands
            </span>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              The Technology We Trust
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We install and service openers from the industry&apos;s top smart access brands. Every installation includes full smart platform setup, app configuration, and hands-on training.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {OPENER_BRANDS.map((brand) => (
              <div key={brand.name} className="surface-elevated border border-brand-silver/20 rounded-xl overflow-hidden gleam flex flex-col">
                {/* Logo header */}
                <div className="bg-gradient-to-b from-brand-blue/[0.03] to-transparent p-6 border-b border-brand-silver/20 text-center">
                  <div className="w-28 h-16 relative mx-auto mb-3">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                      sizes="112px"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full">
                    <BadgeCheck className="w-3 h-3" /> {brand.authority}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl text-brand-blue mb-1">{brand.name}</h3>
                  <p className="text-xs text-foreground/40 italic mb-3">{brand.tagline}</p>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-4">{brand.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-display uppercase tracking-wider text-brand-blue mb-2">Key Models</h4>
                    <ul className="space-y-1">
                      {brand.products.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm text-foreground/60">
                          <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link href={brand.link} className="text-sm font-display uppercase tracking-wider text-brand-red hover:text-red-700 transition-colors">
                      View Opener Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product showcase */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/images/products/liftmaster-81600-belt-drive.png"
                  alt="LiftMaster 81600 belt drive opener"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p className="font-display text-sm text-brand-blue">Belt Drive Opener</p>
              <p className="text-xs text-foreground/40">Ultra-quiet operation</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/images/products/liftmaster-jackshaft-98022.png"
                  alt="LiftMaster 8500W wall-mount jackshaft opener"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p className="font-display text-sm text-brand-blue">Wall-Mount Jackshaft</p>
              <p className="text-xs text-foreground/40">Frees ceiling space</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 text-center gleam">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src="/images/products/liftmaster-secure-view-camera.png"
                  alt="LiftMaster Secure View camera-integrated opener"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p className="font-display text-sm text-brand-blue">Secure View Camera</p>
              <p className="text-xs text-foreground/40">Built-in HD monitoring</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PREMIUM PARTS & INSULATION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              Premium Parts. No Exceptions.
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We never substitute with off-brand or cut-rate components. Every spring, roller, cable, and bearing plate we install is sourced directly from the manufacturer or from certified OEM suppliers.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="surface-elevated border border-brand-silver/20 rounded-xl overflow-hidden gleam">
              <div className="relative h-56 bg-gradient-to-b from-brand-blue/[0.03] to-transparent">
                <Image
                  src="/images/products/insulation-cutaway-premium-3layer.jpg"
                  alt="Premium 3-layer insulated garage door cutaway showing steel-polyurethane-steel construction"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-brand-blue mb-2">Premium 3-Layer Insulation</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Steel–polyurethane–steel sandwich construction delivers R-values up to R-18.4. This premium insulation reduces energy costs, dampens street noise, and protects against extreme temperatures — critical for attached garages in North Carolina&apos;s climate.
                </p>
              </div>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-xl overflow-hidden gleam">
              <div className="relative h-56 bg-gradient-to-b from-brand-blue/[0.03] to-transparent">
                <Image
                  src="/images/products/insulation-cutaway-value-1layer.jpg"
                  alt="Value 1-layer garage door cutaway showing single steel panel construction"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-brand-blue mb-2">Standard Steel Construction</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Single-layer steel panels offer durability and value for detached garages and utility spaces. Available in a wide range of styles and colors, with upgrade paths to insulated models when your needs change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* WARRANTY */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-elevated border border-brand-gold/30 rounded-xl p-8 lg:p-12 text-center gleam">
            <ShieldCheck className="w-12 h-12 text-brand-gold mx-auto mb-4" />
            <h2 className="font-hero text-2xl sm:text-3xl text-brand-blue tracking-wider mb-2">
              TNGD 2-YEAR UNBEATABLE PARTS WARRANTY
            </h2>
            <p className="text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
              Our Default Coverage — Included on Every Job
            </p>
            <p className="text-foreground/60 max-w-2xl mx-auto mb-6 leading-relaxed">
              Every part we install is backed by our 2-year parts warranty — on top of whatever manufacturer warranty applies. If a component we installed fails within two years, we replace it at no charge. That&apos;s our promise, and it applies across every brand we carry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-foreground/50 uppercase tracking-wider mb-8">
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-brand-gold" /> Parts & Labor Covered</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-gold" /> 2 Full Years</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> No Fine Print</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton text="Book Service" variant="secondary" />
              <Link href="/warranty" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                Warranty Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-hero text-3xl tracking-wider mb-4">
            NOT SURE WHICH BRAND IS RIGHT?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-4">
            We&apos;ll assess your needs — budget, style, insulation requirements, and HOA restrictions — and recommend the best fit from our authorized product lines.
          </p>
          <p className="text-white/50 text-sm mb-8">
            Free on-site consultations available across the Piedmont Triad.
          </p>
          <CTAButton text="Get a Free Recommendation" variant="secondary" />
        </div>
      </section>
    </>
  );
}
