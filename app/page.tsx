import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import BrandGrid from '@/components/BrandGrid';
import CTAButton from '@/components/CTAButton';
import ReviewCarousel from '@/components/ReviewCarousel';
import LocalTownsGrid from '@/components/LocalTownsGrid';
import FeaturedPortfolio from '@/components/FeaturedPortfolio';
import { generateMetadata as genMeta } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Home, Zap, AlertTriangle, BookOpen, Handshake, Shield, Star } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Door Troubleshooting, Repair & Installation',
  description: 'Expert garage door troubleshooting and repair serving the Piedmont Triad from Statesville to Mebane, NC. Same-day emergency service. Certified & insured — no service call fee.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero
        title="TOP-NOTCH GARAGE DOORS"
        subtitle="Quality You Can Trust"
        showPhone
        showLocation
        slideshow
      />

      {/* 1. EDUCATION FIRST */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <BookOpen className="w-4 h-4" /> Homeowner Knowledge Center
            </span>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              Understanding Your Garage Door
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Your garage door is the largest moving part of your home. Here&apos;s what every homeowner should know.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Door Won\'t Open or Close?', desc: 'Check your safety sensors for obstructions, verify the opener is powered, and look for blinking LED codes. A stuck door often means a broken spring — do not attempt to force it.', icon: <AlertTriangle className="w-5 h-5" /> },
              { title: 'Loud Grinding or Squealing?', desc: 'Metal-on-metal noise usually means dry rollers or hinges. Annual lubrication extends the life of your system by years. Never use WD-40 — use silicone or lithium-based garage door lubricant.', icon: <Wrench className="w-5 h-5" /> },
              { title: 'How Long Do Springs Last?', desc: 'Standard torsion springs are rated for ~10,000 cycles (about 7 years). If your door feels heavy or you hear a loud bang from the garage, your spring has likely failed.', icon: <Shield className="w-5 h-5" /> },
              { title: 'Smart Opener Benefits', desc: 'Modern openers offer smartphone control, camera feeds, activity alerts, and automatic closing. Most premium models include battery backup for power outages.', icon: <Zap className="w-5 h-5" /> },
              { title: 'When to Replace vs. Repair', desc: 'Doors older than 15–20 years, those with multiple panel damage, or doors with R-0 insulation are candidates for replacement. Single-component repairs are usually the smarter investment.', icon: <Home className="w-5 h-5" /> },
              { title: 'Maintenance Saves Money', desc: 'A $100 annual tune-up prevents $500+ emergency repairs. Lubrication, balance testing, and hardware tightening keep your system running smoothly for years.', icon: <Handshake className="w-5 h-5" /> },
            ].map((item, i) => (
              <div key={i} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
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

      {/* 2. EMERGENCY / HIGH-INTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-red mb-3">
              <AlertTriangle className="w-4 h-4" /> Emergency Service
            </span>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              Need Immediate Help?
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Broken spring? Door off track? Opener not responding? We offer same-day emergency repair across the Piedmont Triad.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              title="Emergency Repair"
              description="Same-day response for broken springs, snapped cables, doors off-track, and opener failures."
              href="/services/repair"
              icon={<Wrench className="w-6 h-6" />}
            />
            <ServiceCard
              title="Spring Replacement"
              description="Torsion and extension spring replacement. We stock common sizes for single-visit repairs."
              href="/services/repair"
              icon={<AlertTriangle className="w-6 h-6" />}
            />
            <ServiceCard
              title="Opener Repair"
              description="Diagnosis and repair for all major opener brands. Motor, gear, logic board, and sensor issues."
              href="/services/openers"
              icon={<Zap className="w-6 h-6" />}
            />
            <ServiceCard
              title="Door Installation"
              description="New residential and commercial garage door installation. Custom sizes, styles, and insulation options."
              href="/services/installation"
              icon={<Home className="w-6 h-6" />}
            />
          </div>
          <div className="text-center mt-10">
            <p className="text-foreground/60 text-sm mb-4">If your door is stuck or making unusual sounds, don&apos;t wait — call now.</p>
            <CTAButton text="Call for Emergency Service" variant="primary" />
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* REVIEWS — Social Proof */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <Star className="w-4 h-4" /> Verified Reviews
            </span>
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">
              What Your Neighbors Say
            </h2>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* FEATURED PORTFOLIO */}
      <FeaturedPortfolio />

      <div className="divider-gleam" />

      {/* 3. INSTALLATIONS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">
              New Installations
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Premium garage doors from top manufacturers, professionally installed. Steel, wood, composite, and insulated options.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Steel Doors', desc: 'Durable, low-maintenance panels in raised, flush, and carriage house designs. R-values up to R-18.', href: '/services/installation' },
              { title: 'Garage Screen Doors', desc: 'Retractable and fixed screens that transform your garage into a bug-free living space.', href: '/garage-screens' },
              { title: 'Smart Openers', desc: 'Wi-Fi enabled openers with smartphone control, camera integration, and battery backup.', href: '/services/openers' },
            ].map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.desc}
                href={item.href}
                icon={<Home className="w-6 h-6" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARTNERSHIPS */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <Handshake className="w-4 h-4" /> Professional Partnerships
          </span>
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
            Contractors, Builders &amp; Property Managers
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-6">
            Priority scheduling, volume pricing, and dedicated account management for trade professionals.
          </p>
          <CTAButton text="Learn About Partnerships" variant="outline" showIcon={false} />
        </div>
      </section>

      {/* 5. LOCAL TOWNS */}
      <LocalTownsGrid />

      {/* 6. BRANDS */}
      <BrandGrid />

      {/* 7. PROMOTIONS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="surface-elevated border border-brand-gold/30 rounded-lg p-8 gleam">
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Lube &amp; Tune Special</h2>
            <p className="font-accent text-xl text-brand-gold mb-3">Garage Door Tune-Up — $79 <span className="text-foreground/40 text-base line-through">$129</span></p>
            <p className="text-sm text-foreground/60 mb-6">
              Complete 21-point inspection, lubrication, balance check, and hardware tightening.
              Use code <span className="font-mono font-bold text-brand-blue">TNGD-TUNE79</span> at booking. Expires July 22, 2027.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton text="Book Tune-Up" variant="secondary" />
              <Link href="/coupons" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                View All Coupons
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-hero text-3xl tracking-wider mb-4">
            TRUSTED ACROSS THE PIEDMONT TRIAD
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Your neighbors across the Piedmont Triad trust us with their homes. We bring the same care and quality to every job, big or small.
          </p>
          <CTAButton text="Schedule Your Service" variant="secondary" />
        </div>
      </section>
    </>
  );
}
