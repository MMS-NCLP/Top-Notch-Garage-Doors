import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import ReviewCarousel from '@/components/ReviewCarousel';
import { generateMetadata as genMeta } from '@/lib/seo';
import { SERVICE_AREAS } from '@/lib/service-areas';
import { Shield, Clock, MapPin, Award, Users, Wrench, Star } from 'lucide-react';

function FacebookIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function InstagramIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function LinkedinIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}

export const metadata = genMeta({
  title: 'About Us — Top-Notch Garage Doors',
  description: 'Locally owned garage door company serving the Piedmont Triad from Statesville to Mebane, NC. Certified, insured, and trusted by your neighbors.',
  path: '/about',
});

const VALUES = [
  { icon: <Shield className="w-6 h-6" />, title: 'Certified & Insured', desc: 'Fully licensed, bonded, and insured for your protection. We carry liability and workers\' comp on every job.' },
  { icon: <Clock className="w-6 h-6" />, title: 'Same-Day Service', desc: 'Broken spring at 7am? We can be there by noon. Emergency repairs are our specialty — not an afterthought.' },
  { icon: <MapPin className="w-6 h-6" />, title: 'Locally Owned', desc: 'Based in Burlington, NC. We live in the communities we serve — from Statesville to Mebane and everywhere between.' },
  { icon: <Award className="w-6 h-6" />, title: 'Factory Authorized', desc: 'Certified dealer and installer for Clopay, LiftMaster, Chamberlain, Amarr, and other top brands.' },
  { icon: <Users className="w-6 h-6" />, title: 'Trusted by Neighbors', desc: 'Five-star reviews from real homeowners across the Piedmont Triad. Our reputation is built one door at a time.' },
  { icon: <Wrench className="w-6 h-6" />, title: 'No Service Call Fee', desc: 'We don\'t charge just to show up. You pay for the work, not the visit. Fair pricing, always.' },
];

const JOB_IMAGES = [
  { src: '/images/portfolio/construction/day-ave-black-door-completed-exterior-burlington-nc.jpg', alt: 'Black garage door on new construction in Burlington NC', location: 'Burlington' },
  { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc.jpg', alt: 'Carriage house door at dusk in Clemmons NC', location: 'Clemmons' },
  { src: '/images/portfolio/screens/garage-screen-door-green-house-nc.jpg', alt: 'Retractable garage screen door in High Point NC', location: 'High Point' },
  { src: '/images/portfolio/before-after/culdesac-new-door-after-tngd-truck-nc.jpg', alt: 'New garage door with TNGD truck in Greensboro NC', location: 'Greensboro' },
  { src: '/images/portfolio/door-styles/walnut-woodgrain-garage-door-modern-farmhouse-nc.jpg', alt: 'Dark walnut woodgrain door on modern farmhouse in Mooresville NC', location: 'Mooresville' },
  { src: '/images/portfolio/screens/screen-door-brick-american-flag-hero-nc.jpg', alt: 'Screen door on brick home with American flag in Advance NC', location: 'Advance' },
  { src: '/images/portfolio/before-after/brick-house-new-black-door-after-nc.jpg', alt: 'New black door on brick home in Thomasville NC', location: 'Thomasville' },
  { src: '/images/portfolio/construction/day-ave-duplex-completed-tngd-truck-burlington-nc.jpg', alt: 'Completed duplex doors with TNGD truck at dusk in Burlington NC', location: 'Burlington' },
];

const corridorGroups = [
  { label: 'Western Corridor', position: 'west' as const, color: 'text-brand-gold' },
  { label: 'Central Corridor', position: 'central' as const, color: 'text-brand-blue' },
  { label: 'Eastern Corridor', position: 'east' as const, color: 'text-brand-red' },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO — clean, no logos */}
      <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl tracking-wider mb-4">ABOUT US</h1>
          <p className="font-display text-lg sm:text-xl uppercase tracking-wide text-white/80 mb-3">
            Quality You Can Trust — Since Day One
          </p>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Top-Notch Garage Doors is a locally owned and operated garage door company serving the Piedmont Triad corridor. We handle everything from emergency spring repairs to full new-construction installations.
          </p>
          <div className="flex items-center justify-center gap-5">
            <a href="https://www.facebook.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* STORY + LOGO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
                <MapPin className="w-4 h-4" /> Burlington, NC
              </span>
              <h2 className="font-display text-3xl text-brand-blue uppercase mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Top-Notch Garage Doors was founded with one goal: provide honest, high-quality garage door service to homeowners across the Piedmont Triad — the kind of service you&apos;d recommend to your own family.
                </p>
                <p>
                  We&apos;re not a franchise. We&apos;re not a call center. When you call Top-Notch, you get a real person who lives in your community. Our technicians are factory-trained, our trucks are fully stocked, and we show up when we say we will.
                </p>
                <p>
                  From Statesville to Mebane, we&apos;ve built our reputation one door at a time — through fast response times, fair pricing, and work we stand behind. Whether it&apos;s a broken spring at 7am or a full new-construction install, we treat every job like it&apos;s our own home.
                </p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg"
                poster="/images/logos/tngd-logo-small-1.png"
              >
                <source src="/videos/tngd-logo-animation.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* VALUES */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">Why Top-Notch</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We compete on quality and integrity, not gimmicks. Here&apos;s what sets us apart.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg text-brand-blue mb-2">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* REVIEWS */}
      <section className="py-20">
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
          <div className="text-center mt-8">
            <Link href="/reviews" className="text-sm text-brand-blue font-display uppercase tracking-wider hover:underline">
              Read All Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* RECENT JOBS GALLERY */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">Our Work Across the Triad</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Every door tells a story. Here are a few of the jobs we&apos;re most proud of.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {JOB_IMAGES.map((img) => (
              <Link key={img.src} href="/portfolio" className="group relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-3 text-white text-xs font-display uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.location}, NC
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* COVERAGE AREA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Image src="/images/logos/tngd-logo-small-1.png" alt="Top-Notch Garage Doors badge" width={80} height={80} className="w-20 h-20 object-contain mx-auto mb-4" />
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <MapPin className="w-4 h-4" /> Statesville to Mebane
            </span>
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">Our Coverage Area</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We serve {SERVICE_AREAS.length} towns and cities across the Piedmont Triad corridor — from the Lake Norman area to the eastern Alamance border.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {corridorGroups.map((group) => {
              const areas = SERVICE_AREAS.filter((a) => a.corridorPosition === group.position);
              return (
                <div key={group.label} className="surface-elevated border border-brand-silver/20 rounded-lg p-6">
                  <h3 className={`font-display text-sm uppercase tracking-wider mb-4 ${group.color}`}>
                    {group.label}
                  </h3>
                  <ul className="space-y-2">
                    {areas.map((area) => (
                      <li key={area.slug}>
                        <Link href={`/service-areas/${area.slug}`} className="flex items-center gap-2 text-sm text-foreground/70 hover:text-brand-blue transition-colors group">
                          <MapPin className="w-3 h-3 shrink-0 text-brand-silver group-hover:text-brand-blue transition-colors" />
                          <span>{area.name}</span>
                          <span className="text-[10px] text-foreground/30">{area.county}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-display text-sm uppercase tracking-wider font-semibold transition-all duration-200 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              Explore All Service Areas
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* TRUCK + TEAM */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/about/tngd-branded-truck-nc.jpg" alt="Top-Notch Garage Doors service truck" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/about/tngd-service-truck-jobsite.jpg" alt="TNGD truck on jobsite" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden col-span-2">
                <Image src="/images/about/tngd-truck-driveway-opener-overhead-nc.jpg" alt="TNGD truck in driveway during opener installation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl text-brand-blue uppercase mb-6">On the Road, Every Day</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Our fully branded trucks are stocked with the parts and tools to handle most repairs in a single visit. When you see the Top-Notch truck pull up, you know the job is getting done right.
                </p>
                <p>
                  We serve homeowners, builders, property managers, and commercial clients across Guilford, Alamance, Rockingham, Caswell, Randolph, and surrounding counties.
                </p>
                <p>
                  From routine tune-ups to full door and opener replacements, every technician is factory-trained and background-checked. We treat your home with the same care we&apos;d treat our own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT + CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-blue to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image src="/images/logos/tngd-logo-small-2.png" alt="" width={64} height={64} className="w-16 h-16 object-contain mx-auto mb-4 opacity-80" />
          <h2 className="font-hero text-3xl tracking-wider mb-4">READY TO GET STARTED?</h2>
          <p className="text-white/70 mb-6">
            Whether you need an emergency repair or want to upgrade your curb appeal, we&apos;re here to help.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <a href="https://www.facebook.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/topnotchdoorsnc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
          <CTAButton text="Schedule Your Service" variant="secondary" />
        </div>
      </section>
    </>
  );
}
