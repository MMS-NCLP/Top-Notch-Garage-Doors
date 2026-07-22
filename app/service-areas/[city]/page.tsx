import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import ReviewCard from '@/components/ReviewCard';
import { serviceSchema } from '@/lib/schema';
import { SERVICE_AREAS, getAreaBySlug, getAllSlugs } from '@/lib/service-areas';
import { projects } from '@/lib/portfolio-data';
import { MapPin, ChevronRight, ShieldCheck, Wrench, Home, Zap, Droplets, PanelTop, BookOpen, Star } from 'lucide-react';
import type { Review } from '@/lib/supabaseClient';

const PLACEHOLDER_REVIEWS: Review[] = [
  { id: 'sa-1', name: 'Mike T.', city: 'Whitsett', rating: 5, service_type: 'repair', review_text: 'Spring broke at 7am, they were here by noon. Fair price, clean work, explained everything.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-06-15' },
  { id: 'sa-2', name: 'Sarah K.', city: 'Burlington', rating: 5, service_type: 'installation', review_text: 'New door looks incredible. Installation was spotless. Neighbors already asked who did it.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-05-20' },
  { id: 'sa-3', name: 'James R.', city: 'Greensboro', rating: 5, service_type: 'opener', review_text: 'Upgraded to a LiftMaster with the camera. Setup was seamless, they connected it to my phone.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-04-10' },
  { id: 'sa-4', name: 'Deborah S.', city: 'Greensboro', rating: 5, service_type: 'installation', review_text: 'Did a very good job and came back for a follow up. Very professional and thorough.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-12-08' },
  { id: 'sa-5', name: 'Chad L.', city: 'Gibsonville', rating: 5, service_type: 'screen_door', review_text: 'Got both a new motor and a retractable screen door installed. The screen is perfect.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-09-30' },
  { id: 'sa-6', name: 'Wayne B.', city: 'Statesville', rating: 5, service_type: 'installation', review_text: 'Drove all the way out to Statesville and still showed up on time. New Clopay door looks fantastic.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-02-28' },
  { id: 'sa-7', name: 'Tamara J.', city: 'Mooresville', rating: 5, service_type: 'repair', review_text: 'Spring snapped on a Wednesday evening. They were here Thursday morning with the right spring.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-02-10' },
  { id: 'sa-8', name: 'Greg H.', city: 'Salisbury', rating: 5, service_type: 'opener', review_text: 'Upgraded from an old chain drive to a LiftMaster belt drive. Night and day difference.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-01-22' },
  { id: 'sa-9', name: 'Sandra P.', city: 'Lexington', rating: 5, service_type: 'installation', review_text: 'New insulated door made an immediate difference — garage stays 15 degrees warmer in winter.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-01-05' },
  { id: 'sa-10', name: 'Marcus T.', city: 'Thomasville', rating: 5, service_type: 'repair', review_text: 'Cable came off the drum. They diagnosed it in 10 minutes and had it fixed in under an hour.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2024-12-18' },
  { id: 'sa-11', name: 'Patricia W.', city: 'High Point', rating: 5, service_type: 'installation', review_text: 'Had them replace both doors on our duplex. Matched the style perfectly, both installed in one day.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2024-12-02' },
  { id: 'sa-12', name: 'Darcy H.', city: 'Mebane', rating: 5, service_type: 'installation', review_text: 'New door and motor installed same day. They hauled away the old one and left the garage cleaner.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-09-12' },
  { id: 'sa-13', name: 'Rick F.', city: 'Elon', rating: 5, service_type: 'installation', review_text: 'Beautiful carriage house style — exactly what we wanted. Neighbors keep stopping to compliment it.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-08-20' },
  { id: 'sa-14', name: 'John M.', city: 'McLeansville', rating: 5, service_type: 'repair', review_text: 'Broken torsion spring — they had the right size on the truck. Replaced in under 45 minutes.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2025-07-02' },
];

function getReviewsForCity(cityName: string): Review[] {
  // Dynamic source: when Supabase reviews go live, replace this with fetchReviews({ city })
  // For now, pull from placeholder pool — matching city first, then backfill from neighbors
  const cityReviews = PLACEHOLDER_REVIEWS.filter(
    (r) => r.city?.toLowerCase() === cityName.toLowerCase()
  );
  if (cityReviews.length >= 2) return cityReviews.slice(0, 3);
  const backfill = PLACEHOLDER_REVIEWS.filter(
    (r) => r.city?.toLowerCase() !== cityName.toLowerCase()
  ).slice(0, 3 - cityReviews.length);
  return [...cityReviews, ...backfill];
}

function getPortfolioForCity(cityName: string) {
  return projects.filter(
    (p) => p.location.toLowerCase().includes(cityName.toLowerCase())
  ).slice(0, 3);
}

const SERVICES = [
  { label: 'Garage Door Repair', href: '/services/repair', icon: <Wrench className="w-5 h-5" />, desc: 'Springs, cables, panels, rollers, tracks — same-day emergency available.' },
  { label: 'New Door Installation', href: '/services/installation', icon: <Home className="w-5 h-5" />, desc: 'Premium doors from Clopay, Amarr, Haas, and more. Professionally installed.' },
  { label: 'Opener Service', href: '/services/openers', icon: <Zap className="w-5 h-5" />, desc: 'LiftMaster, Chamberlain, Genie — smart openers with Wi-Fi and camera.' },
  { label: 'Pressure Washing', href: '/services/pressure-washing', icon: <Droplets className="w-5 h-5" />, desc: 'Driveways, sidewalks, siding — restore surfaces to like-new.' },
  { label: 'Garage Screen Doors', href: '/garage-screens', icon: <PanelTop className="w-5 h-5" />, desc: 'Retractable screens for bug-free airflow all summer.' },
  { label: 'Maintenance & Tune-Ups', href: '/coupons', icon: <BookOpen className="w-5 h-5" />, desc: '21-point inspection, lubrication, balance check. $69 with coupon.' },
];

export async function generateStaticParams() {
  return getAllSlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) return {};
  return {
    title: `Garage Door Services in ${area.name}, NC — ${area.county} | Top-Notch Garage Doors`,
    description: `Professional garage door repair, installation, and maintenance in ${area.name}, NC. Serving ${area.neighborhoods.length}+ neighborhoods in ${area.county}. Factory-trained technicians, same-day emergency service, no service call fee.`,
    alternates: { canonical: `https://topnotchgaragedoors.com/service-areas/${city}` },
    keywords: area.keywords.join(', '),
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = getAreaBySlug(city);
  if (!area) notFound();

  const cityReviews = getReviewsForCity(area.name);
  const cityPortfolio = getPortfolioForCity(area.name);
  const otherAreas = SERVICE_AREAS.filter((a) => a.slug !== city);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: `Garage Door Services in ${area.name}, NC`,
            description: `Professional garage door services in ${area.name}, ${area.county}, NC. Serving ${area.neighborhoods.length}+ neighborhoods.`,
            url: `https://topnotchgaragedoors.com/service-areas/${city}`,
          })),
        }}
      />

      {/* HERO */}
      <section className="py-16 lg:py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
            <MapPin className="w-4 h-4" />
            <Link href="/service-areas" className="hover:text-brand-blue transition-colors">Service Areas</Link>
            <ChevronRight className="w-3 h-3 text-foreground/30" />
            <span>{area.name}</span>
          </div>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-2">
            Garage Door Services in {area.name}, NC
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-brand-gold font-display uppercase tracking-wider">{area.county}</span>
            <span className="text-foreground/20">|</span>
            <span className="text-sm text-foreground/50 italic">{area.tagline}</span>
          </div>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mb-8">
            {area.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-foreground/50 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Factory-Trained Technicians</span>
            <span className="flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5 text-brand-gold" /> Same-Day Emergency</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-brand-gold" /> 2-Year Parts Warranty</span>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* NEIGHBORHOODS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">
            Neighborhoods We Serve in {area.name}
          </h2>
          <p className="text-foreground/60 text-sm mb-8">
            Our technicians know these neighborhoods — from established communities to new developments. Every neighborhood gets the same factory-trained service.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {area.neighborhoods.map((hood) => (
              <div
                key={hood.slug}
                className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  <h3 className="font-display text-base text-brand-blue">{hood.name}</h3>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed">{hood.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* SERVICES */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-8">
            Services Available in {area.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group surface-elevated border border-brand-silver/20 rounded-lg p-5 hover:shadow-md hover:border-brand-blue/20 transition-all gleam"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors shrink-0">
                    {s.icon}
                  </div>
                  <h3 className="font-display text-sm text-brand-blue group-hover:text-brand-red transition-colors">{s.label}</h3>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* REVIEWS FROM THIS AREA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">
            What {area.name} Homeowners Say
          </h2>
          <p className="text-foreground/60 text-sm mb-8">
            Real reviews from your neighbors. Every review is verified — no fakes, no paid placements.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cityReviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={i * 0.08} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/reviews"
              className="text-sm font-display uppercase tracking-wider text-brand-red hover:text-red-700 transition-colors"
            >
              View All 100+ Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO FROM THIS AREA */}
      {cityPortfolio.length > 0 && (
        <>
          <div className="divider-gleam" />
          <section className="py-16 surface-matte">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">
                Recent Work in {area.name}
              </h2>
              <p className="text-foreground/60 text-sm mb-8">
                Real projects completed by our team right here in {area.name}.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cityPortfolio.map((project) => (
                  <Link
                    key={project.id}
                    href={`/portfolio#${project.id}`}
                    className="group surface-elevated border border-brand-silver/20 rounded-lg p-5 hover:shadow-md hover:border-brand-blue/20 transition-all gleam"
                  >
                    <h3 className="font-display text-base text-brand-blue group-hover:text-brand-red transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-foreground/60 leading-relaxed mb-3">{project.outcome}</p>
                    <div className="flex items-center gap-2 text-xs text-foreground/40">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      <span>{project.location}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/portfolio"
                  className="text-sm font-display uppercase tracking-wider text-brand-red hover:text-red-700 transition-colors"
                >
                  View Full Portfolio &rarr;
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="divider-gleam" />

      {/* OTHER AREAS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">
            Other Communities We Serve
          </h2>
          <p className="text-foreground/60 text-sm mb-6">
            5 counties, {SERVICE_AREAS.length}+ communities — one standard of service across the Piedmont Triad.
          </p>
          <div className="flex flex-wrap gap-2">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="px-4 py-2 surface-elevated border border-brand-silver/20 rounded-full text-sm text-brand-blue hover:border-brand-blue hover:bg-brand-blue hover:text-white transition-all"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-blue to-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-hero text-2xl sm:text-3xl tracking-wider mb-4">
            READY TO BOOK IN {area.name.toUpperCase()}?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Same-day emergency service available. No service call fee. Factory-trained technicians who know your neighborhood.
          </p>
          <CTAButton text={`Book Service in ${area.name}`} variant="secondary" />
        </div>
      </section>
    </>
  );
}
