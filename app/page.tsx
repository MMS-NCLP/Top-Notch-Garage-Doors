import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import FlipCard from '@/components/FlipCard';
import BrandGrid from '@/components/BrandGrid';
import CTAButton from '@/components/CTAButton';
import ReviewCarousel from '@/components/ReviewCarousel';
import LocalTownsGrid from '@/components/LocalTownsGrid';
import FeaturedPortfolio from '@/components/FeaturedPortfolio';
import CallbackForm from '@/components/CallbackForm';
import { generateMetadata as genMeta } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Wrench, Home, Zap, AlertTriangle, BookOpen, Shield, Star, Award, CheckCircle, Users, Eye, MessageSquare, Settings, ClipboardCheck } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Door Troubleshooting, Repair & Installation',
  description: 'Expert garage door troubleshooting and repair serving the Piedmont Triad from Statesville to Durham, NC. Same-day emergency service. Certified & insured — no service call fee.',
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

      {/* 1. EDUCATION FIRST — FLIP CARDS */}
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
            <FlipCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Door Won't Open or Close?"
              description="Check your safety sensors for obstructions, verify the opener is powered, and look for blinking LED codes. A stuck door often means a broken spring — do not attempt to force it."
              backImage="/images/blog/garage-door-opener-troubleshooting-guide-nc.jpg"
              backImageAlt="Brick colonial home with dark garage doors"
              backInsight="Most opener failures trace back to three things: misaligned safety sensors, stripped gears, or a dead logic board. Before calling for repair, check your wall button — if it works but the remote doesn't, it's likely a signal issue, not a motor issue."
              blogSlug="garage-door-opener-troubleshooting-guide"
              blogLabel="Troubleshooting Guide"
            />
            <FlipCard
              icon={<Wrench className="w-5 h-5" />}
              title="Loud Grinding or Squealing?"
              description="Metal-on-metal noise usually means dry rollers or hinges. Annual lubrication extends the life of your system by years. Never use WD-40 — use silicone or lithium-based garage door lubricant."
              backImage="/images/blog/diy-garage-door-maintenance-tips-nc.jpg"
              backImageAlt="White carriage house garage door on sunny day"
              backInsight="The #1 mistake homeowners make: using WD-40 on garage door parts. It's a solvent, not a lubricant — it strips existing grease and leaves parts drier than before. Use white lithium grease on hinges and rollers, silicone spray on tracks and springs."
              blogSlug="diy-garage-door-maintenance-tips"
              blogLabel="DIY Maintenance Tips"
            />
            <FlipCard
              icon={<Shield className="w-5 h-5" />}
              title="How Long Do Springs Last?"
              description="Standard torsion springs are rated for ~10,000 cycles (about 7 years). If your door feels heavy or you hear a loud bang from the garage, your spring has likely failed."
              backImage="/images/blog/garage-door-spring-replacement-guide-nc.jpg"
              backImageAlt="Technician lubricating garage door torsion spring"
              backInsight="A torsion spring under tension stores enough energy to cause serious injury. Never attempt to adjust or replace springs yourself. If one spring breaks, we recommend replacing both — the second is on borrowed time and mismatched tension causes premature wear."
              blogSlug="garage-door-springs-replacement-guide"
              blogLabel="Spring Replacement Guide"
            />
            <FlipCard
              icon={<Zap className="w-5 h-5" />}
              title="Smart Opener Benefits"
              description="Modern openers offer smartphone control, camera feeds, activity alerts, and automatic closing. Most premium models include battery backup for power outages."
              backImage="/images/blog/smart-garage-door-openers-guide-nc.jpg"
              backImageAlt="LiftMaster myQ smart garage door opener installed on ceiling rail"
              backInsight="LiftMaster's myQ technology lets you monitor and control your garage from anywhere. Get real-time alerts when the door opens, set schedules for auto-close, and integrate with smart home systems. Battery backup keeps your door working during outages."
              blogSlug="smart-garage-door-openers-2026"
              blogLabel="Smart Openers Guide"
            />
            <FlipCard
              icon={<Home className="w-5 h-5" />}
              title="When to Replace vs. Repair"
              description="Doors older than 15–20 years, those with multiple panel damage, or doors with R-0 insulation are candidates for replacement. Single-component repairs are usually the smarter investment."
              backImage="/images/blog/seasonal-garage-door-maintenance-nc.jpg"
              backImageAlt="Well-maintained white cottage garage with greenery"
              backInsight="Here's the honest rule: if a single repair costs more than 50% of a new door, replacement makes more financial sense. But age alone isn't a reason to replace — a well-maintained 20-year-old door with good springs and panels can outlast a neglected 5-year-old one."
              blogSlug="garage-door-maintenance-seasonal-checklist"
              blogLabel="Seasonal Maintenance Checklist"
            />
            <FlipCard
              icon={<CheckCircle className="w-5 h-5" />}
              title="Maintenance Saves Money"
              description="A $100 annual tune-up prevents $500+ emergency repairs. Lubrication, balance testing, and hardware tightening keep your system running smoothly for years."
              backImage="/images/blog/seasonal-garage-door-maintenance-nc.jpg"
              backImageAlt="Well-maintained garage door with seasonal greenery"
              backInsight="Our 21-point tune-up covers spring tension, cable condition, track alignment, roller wear, weatherseal integrity, safety sensor calibration, and opener force settings. Most emergency calls we get are problems a $79 tune-up would have caught months earlier."
              blogSlug="garage-door-maintenance-seasonal-checklist"
              blogLabel="Year-Round Checklist"
            />
          </div>
        </div>
      </section>

      {/* WHY TOP-NOTCH — REDESIGNED: NARRATIVE + PROOF POINTS */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left — narrative */}
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
                <Award className="w-4 h-4" /> Why Top-Notch
              </span>
              <h2 className="font-display text-3xl text-brand-blue uppercase mb-5 leading-tight">
                We Don&apos;t Just Fix Doors.<br />We Teach You What We See.
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Every technician on our team works on garage doors every day — from older homes with builder-grade hardware to new constructions with modern smart systems. We don&apos;t upsell. We don&apos;t rush. We explain the system clearly, show you what we found, and complete the repair the right way.
              </p>
              <p className="text-foreground/60 leading-relaxed mb-8">
                That&apos;s why homeowners, builders, and property managers across the Piedmont Triad call us back. Not because we&apos;re the cheapest — because they trust the work.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-brand-blue uppercase">Thorough Inspection</h4>
                    <p className="text-xs text-foreground/50 mt-0.5">Springs, cables, tracks, sensors, and opener load — every visit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-brand-blue uppercase">Clear Explanation</h4>
                    <p className="text-xs text-foreground/50 mt-0.5">What we found, why it matters, and your real options.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Settings className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-brand-blue uppercase">Correct Workmanship</h4>
                    <p className="text-xs text-foreground/50 mt-0.5">Disciplined repair — done right, not just done fast.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ClipboardCheck className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm text-brand-blue uppercase">Safety Verified</h4>
                    <p className="text-xs text-foreground/50 mt-0.5">Balance, alignment, and safety systems confirmed before we leave.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right — accent image */}
            <div className="relative rounded-lg overflow-hidden h-[420px] lg:h-[500px]">
              <Image
                src="/images/hero/coachman-carriage-house-door-nc.jpg"
                alt="Coachman carriage house style garage door — professional installation by Top-Notch Garage Doors"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-accent text-2xl text-white/90">Quality You Can Trust</p>
                <p className="text-sm text-white/60 mt-1">Serving the Piedmont Triad since day one.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* EMERGENCY / HIGH-INTENT — ALTERNATE COLOR TREATMENT */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-[#001a45] to-[#3d0a18]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <AlertTriangle className="w-4 h-4" /> Emergency Service
            </span>
            <h2 className="font-display text-3xl text-white uppercase mb-3">
              Need Immediate Help?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Broken spring? Door off track? Opener not responding? We offer same-day emergency repair across the Piedmont Triad.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlipCard
              icon={<Wrench className="w-6 h-6" />}
              title="Emergency Repair"
              description="Same-day response for broken springs, snapped cables, doors off-track, and opener failures."
              backImage="/images/blog/emergency-garage-door-repair-nc.webp"
              backImageAlt="Crashed garage door requiring emergency repair"
              backInsight="A door off its tracks is a safety hazard — don't try to force it back. Disconnect the opener, secure the area, and call us. We stock common springs and cables on our trucks for single-visit emergency repairs."
              blogSlug="emergency-garage-door-repair-what-to-do"
              blogLabel="Emergency Guide"
              overlay="red"
            />
            <FlipCard
              icon={<AlertTriangle className="w-6 h-6" />}
              title="Spring Replacement"
              description="Torsion and extension spring replacement. We stock common sizes for single-visit repairs."
              backImage="/images/blog/garage-door-spring-replacement-guide-nc.jpg"
              backImageAlt="Technician lubricating garage door torsion spring"
              backInsight="Springs are under extreme tension — never attempt DIY replacement. We match spring wire gauge, length, and inside diameter precisely. Mismatched springs cause uneven door travel and accelerate wear on your opener."
              blogSlug="garage-door-springs-replacement-guide"
              blogLabel="Springs Guide"
              overlay="red"
            />
            <FlipCard
              icon={<Zap className="w-6 h-6" />}
              title="Opener Repair"
              description="Diagnosis and repair for all major opener brands. Motor, gear, logic board, and sensor issues."
              backImage="/images/blog/smart-garage-door-openers-guide-nc.jpg"
              backImageAlt="LiftMaster myQ smart garage door opener on ceiling rail"
              backInsight="Before calling: check if the wall button works (rules out remote issues), look for blinking LED codes on the motor unit, and verify the safety sensors have solid green lights. These three checks save time and help us arrive with the right parts."
              blogSlug="garage-door-opener-troubleshooting-guide"
              blogLabel="Troubleshooting Guide"
              overlay="red"
            />
            <FlipCard
              icon={<Home className="w-6 h-6" />}
              title="Door Installation"
              description="New residential and commercial garage door installation. Custom sizes, styles, and insulation options."
              backImage="/images/blog/best-garage-door-styles-north-carolina.jpg"
              backImageAlt="Canyon Ridge stone and wood luxury garage doors"
              backInsight="We're authorized dealers for Clopay, LiftMaster, and Amarr. From steel raised-panel to Canyon Ridge wood-look carriage house doors, we help you choose the right style, insulation R-value, and wind load rating for your NC home."
              blogSlug="best-garage-door-styles-for-north-carolina-homes"
              blogLabel="NC Door Styles Guide"
              overlay="red"
            />
          </div>
          <div className="text-center mt-10">
            <p className="text-white/50 text-sm mb-4">If your door is stuck or making unusual sounds, don&apos;t wait — call now.</p>
            <CTAButton text="Call for Emergency Service" variant="secondary" />
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

      {/* INSTALLATIONS */}
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

      {/* E-E-A-T: OUR COMMITMENT */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <Shield className="w-4 h-4" /> Our Commitment
            </span>
            <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
              Built on Clarity, Safety, and Disciplined Workmanship
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base text-brand-blue uppercase mb-2">Trusted Authority</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                One of the most consistently recommended garage door companies in the Piedmont Triad. Homeowners, builders, and property managers rely on us because we explain the system clearly, communicate respectfully, and complete the work the right way.
              </p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base text-brand-blue uppercase mb-2">Safety &amp; Transparency</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Garage doors are heavy, tension-loaded systems. Every repair includes a safety check, every installation includes a balance test, and every homeowner receives a clear explanation. No hidden fees. No rushed work. No unclear recommendations.
              </p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base text-brand-blue uppercase mb-2">From Our Team</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                We built Top-Notch on a simple principle: homeowners deserve clear answers and professional work. If we recommend something, it&apos;s because it improves safety, reliability, or long-term performance — never because it increases a sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* LOCAL TOWNS */}
      <LocalTownsGrid />

      {/* BRANDS */}
      <BrandGrid />

      {/* PROMOTIONS */}
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

      {/* CALLBACK FORM */}
      <CallbackForm />

      {/* FINAL CTA */}
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
