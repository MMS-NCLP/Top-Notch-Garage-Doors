import Link from 'next/link';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { SERVICE_AREAS, getAreasByPosition, getNeighborhoodCount } from '@/lib/service-areas';
import { MapPin, ShieldCheck, Truck, Clock, ChevronRight, Users, Star } from 'lucide-react';

export const metadata = genMeta({
  title: 'Service Areas — Statesville to Mebane, NC',
  description: 'Top-Notch Garage Doors covers 5 counties and 50+ neighborhoods across the Piedmont Triad corridor from Statesville to Mebane, NC. Factory-trained technicians, same-day emergency service, and authorized dealer coverage throughout the region.',
  path: '/service-areas',
  keywords: [
    'garage door service Piedmont Triad',
    'garage door repair near me NC',
    'Statesville to Mebane garage door',
    ...SERVICE_AREAS.flatMap((a) => a.keywords.slice(0, 1)),
  ],
});

const CORRIDOR_SECTIONS = [
  { position: 'west' as const, label: 'Extended Western Coverage', description: 'Thomasville, Lexington, Salisbury, Mooresville, and Statesville — we cast our net wide into Iredell, Rowan, and Davidson counties so homeowners at the far edge of the Triad get the same quality.' },
  { position: 'central' as const, label: 'Core Service Area', description: 'High Point, Greensboro, and McLeansville form the heart of our dispatch zone. Our busiest service area — factory-trained technicians who know every neighborhood.' },
  { position: 'east' as const, label: 'Home Base & Eastern Corridor', description: 'Burlington, Whitsett, Gibsonville, Elon, and Mebane. This is where Top-Notch was built — our dispatch center, our strongest relationships, and the communities that gave us our start.' },
];

export default function ServiceAreasPage() {
  const totalNeighborhoods = getNeighborhoodCount();

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
            <MapPin className="w-4 h-4" /> Piedmont Triad Coverage
          </span>
          <h1 className="font-hero text-4xl sm:text-5xl lg:text-6xl tracking-wider mb-4">
            STATESVILLE TO MEBANE
          </h1>
          <p className="font-display text-lg sm:text-xl uppercase tracking-wide text-white/80 mb-3">
            We Built Our Reputation One Town at a Time
          </p>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            The Piedmont Triad corridor is the operational backbone of Top-Notch Garage Doors. 5 counties, {totalNeighborhoods}+ neighborhoods, and the same factory-trained service at every stop.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/50 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-brand-gold" /> Same-Day Emergency Service</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Factory-Trained Technicians</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-gold" /> No Service Call Fee</span>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* STATS */}
      <section className="py-12 surface-matte">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
              <p className="font-display text-3xl text-brand-blue">5</p>
              <p className="text-xs text-foreground/40 mt-1">Counties Covered</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
              <p className="font-display text-3xl text-brand-blue">{totalNeighborhoods}+</p>
              <p className="text-xs text-foreground/40 mt-1">Neighborhoods</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
              <p className="font-display text-3xl text-brand-blue">{SERVICE_AREAS.length}+</p>
              <p className="text-xs text-foreground/40 mt-1">Communities</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
              <p className="font-display text-3xl text-brand-blue">100+</p>
              <p className="text-xs text-foreground/40 mt-1">5-Star Reviews</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* CORRIDOR SECTIONS */}
      {CORRIDOR_SECTIONS.map((section) => {
        const areas = getAreasByPosition(section.position);
        return (
          <section key={section.position} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">{section.label}</h2>
                <p className="text-foreground/60 max-w-3xl">{section.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/service-areas/${area.slug}`}
                    className="group surface-elevated border border-brand-silver/20 rounded-xl p-6 hover:shadow-lg hover:border-brand-blue/20 transition-all gleam"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-xl text-brand-blue group-hover:text-brand-red transition-colors">
                          {area.name}
                        </h3>
                        <p className="text-xs text-foreground/40 font-display uppercase tracking-wider">
                          {area.county}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-brand-silver group-hover:text-brand-red transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                      {area.description.slice(0, 140)}...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-foreground/40">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      <span>{area.neighborhoods.length} neighborhoods</span>
                      <span className="text-brand-silver">•</span>
                      <span className="italic">{area.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider-gleam mt-16" />
          </section>
        );
      })}

      {/* CORRIDOR NARRATIVE */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-10 h-10 text-brand-gold mx-auto mb-4" />
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">
            Big Enough to Cover the Corridor.<br />Local Enough to Know Your Neighborhood.
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-4">
            We didn&apos;t grow by cutting corners — we grew by earning trust one job at a time, one town at a time. From our home base in Whitsett to the western edge of Statesville, every homeowner in this corridor gets the same factory-trained technicians, genuine OEM parts, and 2-year unbeatable parts warranty.
          </p>
          <p className="text-foreground/60 leading-relaxed mb-8">
            When you see our truck in your neighborhood, you&apos;re seeing a company that&apos;s been trusted by your neighbors for years. That&apos;s not marketing — that&apos;s a reputation we built one door at a time.
          </p>
          <Star className="w-6 h-6 text-brand-gold mx-auto mb-3" />
          <p className="font-accent text-lg text-brand-gold italic">
            &ldquo;Trusted by homeowners across the Piedmont corridor.&rdquo;
          </p>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-hero text-3xl tracking-wider mb-4">
            YOUR TOWN. YOUR NEIGHBORS. YOUR GARAGE DOOR TEAM.
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Whether you&apos;re in Statesville or Mebane, we bring the same care and quality to every job. No service call fee, same-day emergency available.
          </p>
          <CTAButton text="Book Service in Your Area" variant="secondary" />
        </div>
      </section>
    </>
  );
}
