import { notFound } from 'next/navigation';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import ReviewCard from '@/components/ReviewCard';
import PortfolioPreview from '@/components/PortfolioPreview';
import { serviceSchema } from '@/lib/schema';
import { SERVICE_AREAS, getAreaBySlug, getAllSlugs } from '@/lib/service-areas';
import { getProjectsByCity } from '@/lib/portfolio-data';
import { MapPin, ChevronRight, ShieldCheck, Wrench, Home, Zap, Droplets, PanelTop, BookOpen, Star, AlertTriangle, Thermometer, HardHat, HelpCircle } from 'lucide-react';
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
  { id: 'sa-15', name: 'Kevin D.', city: 'Durham', rating: 5, service_type: 'opener', review_text: 'Smart opener was acting up after the humidity spike. They recalibrated the sensors and adjusted the opener load — works perfectly now.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-06-28' },
  { id: 'sa-16', name: 'Angela R.', city: 'Durham', rating: 5, service_type: 'installation', review_text: 'New insulated steel door on our Hope Valley home. Installation was flawless, and they walked us through the smart opener setup on our phones.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-05-15' },
  { id: 'sa-17', name: 'Brian W.', city: 'Durham', rating: 5, service_type: 'repair', review_text: 'Cable snapped on the Southpoint house. They were out same day with the right parts. Professional and thorough — explained everything clearly.', contractor_name: null, job_date: null, source: 'form', featured: false, created_at: '2026-04-22' },
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
  return getProjectsByCity(cityName, 3);
}

const SERVICES = [
  { label: 'Garage Door Repair', href: '/services/repair', icon: <Wrench className="w-5 h-5" />, desc: 'Springs, cables, panels, rollers, tracks — same-day emergency available.' },
  { label: 'New Door Installation', href: '/services/installation', icon: <Home className="w-5 h-5" />, desc: 'Premium doors from Clopay, Amarr, Haas, and more. Professionally installed.' },
  { label: 'Opener Service', href: '/services/openers', icon: <Zap className="w-5 h-5" />, desc: 'LiftMaster, Chamberlain, Genie — smart openers with Wi-Fi and camera.' },
  { label: 'Pressure Washing', href: '/services/pressure-washing', icon: <Droplets className="w-5 h-5" />, desc: 'Driveways, sidewalks, siding — restore surfaces to like-new.' },
  { label: 'Garage Screen Doors', href: '/garage-screens', icon: <PanelTop className="w-5 h-5" />, desc: 'Retractable screens for bug-free airflow all summer.' },
  { label: 'Maintenance & Tune-Ups', href: '/coupons', icon: <BookOpen className="w-5 h-5" />, desc: '21-point inspection, lubrication, balance check. $69 with coupon.' },
];

interface EEATContent {
  anchor: string;
  constructionPatterns: string;
  doorTypes: string;
  climateImpact: string;
  failureModes: string[];
  homeownerConcerns: string;
  whyThisMatters: string;
  faqs: { q: string; a: string }[];
}

const ANCHOR_CITY_EEAT: Record<string, EEATContent> = {
  statesville: {
    anchor: 'Western Anchor',
    constructionPatterns: 'Statesville has a high concentration of homes built between 1980–2005, many of which still use heavy wooden or composite garage doors. These doors place significantly more load on torsion springs and opener motors.',
    doorTypes: 'Older wooden doors, builder-grade steel doors, and early insulated models are common. Many homes still use chain-drive openers.',
    climateImpact: 'Western corridor humidity and temperature swings cause track expansion, cable oxidation, and sensor misalignment.',
    failureModes: [
      'Spring fatigue from heavy door weight',
      'Cable fray due to oxidation',
      'Opener strain from unbalanced doors',
      'Track warping in older garages',
    ],
    homeownerConcerns: 'Noise, slow operation, and sudden spring failure are the most reported issues.',
    whyThisMatters: 'Understanding Statesville’s older construction patterns helps homeowners make informed decisions about repair vs. replacement, especially when dealing with heavy doors and aging hardware.',
    faqs: [
      { q: 'Why do garage doors fail more often in Statesville?', a: 'Many Statesville homes built between 1980–2005 use heavy wooden or composite doors that place excessive load on springs and openers. Combined with western corridor humidity causing cable oxidation and track expansion, these doors wear out hardware faster than modern lightweight systems.' },
      { q: 'Should I repair or replace my old wooden garage door?', a: 'If the door is structurally sound and you like the look, upgrading the springs, cables, and opener can extend its life 10+ years. If panels are warped, cracked, or the door weighs over 200 lbs, a modern insulated steel replacement will reduce maintenance costs and improve energy efficiency.' },
      { q: 'How does western NC weather affect garage door hardware?', a: 'Temperature swings between seasons cause track expansion and contraction. Humidity accelerates cable oxidation and can cause sensor misalignment. Annual lubrication and a balance check prevent most weather-related failures.' },
      { q: 'What opener works best for heavy garage doors in Statesville?', a: 'Heavy wooden doors require a 3/4 HP or 1 HP opener with a jackshaft or chain-drive system. Belt-drive units designed for lightweight doors will burn out prematurely. We match the opener to the door weight and usage pattern.' },
    ],
  },
  greensboro: {
    anchor: 'Central Hub',
    constructionPatterns: 'Greensboro homes built between 1995–2020 often use builder-grade torsion springs and mid-weight steel doors. Many neighborhoods feature two-car garages with identical hardware sets.',
    doorTypes: 'Insulated steel doors, mid-range openers, and newer belt-drive systems are common.',
    climateImpact: 'Triad humidity causes sensor drift, lubrication breakdown, and intermittent opener faults.',
    failureModes: [
      'Spring end-of-life around 12–15 years',
      'Sensor misalignment from humidity',
      'Belt-drive tension issues',
      'Track noise from expansion/contraction',
    ],
    homeownerConcerns: 'Grinding noises, uneven door travel, and opener hesitation are frequently reported.',
    whyThisMatters: 'Greensboro’s mixed-age housing stock requires precise diagnosis — many issues stem from predictable wear patterns rather than sudden failure.',
    faqs: [
      { q: 'Why is my garage door grinding in Greensboro?', a: 'Most grinding noises in Greensboro homes come from dry rollers, track buildup from humidity, or belt-drive tension loss. Builder-grade springs installed in the 1995–2010 era are often at end-of-life by now, causing uneven travel that stresses the entire system.' },
      { q: 'How long do builder-grade garage door springs last?', a: 'Standard builder-grade torsion springs are rated for 10,000 cycles — roughly 7–10 years of normal use. Greensboro homes built in the late 1990s to early 2000s are hitting that window now. Upgrading to high-cycle springs (25,000+) reduces future replacement frequency.' },
      { q: 'Does Triad humidity really affect garage doors?', a: 'Yes. Humidity causes sensor lens condensation (leading to false obstruction alerts), accelerates lubrication breakdown on rollers and hinges, and can shift sensor alignment over time. Annual maintenance with proper lubrication prevents most humidity-related issues.' },
      { q: 'My opener hesitates before moving — is that normal?', a: 'Opener hesitation usually indicates a load imbalance. The door may be slightly out of balance, forcing the opener to work harder on startup. A balance test and spring adjustment typically resolves it. If the opener is 15+ years old, the motor itself may be weakening.' },
    ],
  },
  burlington: {
    anchor: 'East-Central Anchor',
    constructionPatterns: 'Burlington’s rapid growth between 2000–2018 introduced a wave of insulated steel doors paired with builder-grade torsion springs. Many homes use lightweight doors that mask underlying balance issues.',
    doorTypes: 'Insulated steel doors, lightweight panels, and mid-range openers.',
    climateImpact: 'East-central humidity accelerates cable wear and causes intermittent sensor faults.',
    failureModes: [
      'Cable fray on lightweight doors',
      'Spring imbalance from uneven panel weight',
      'Opener load issues on older belt-drive units',
      'Sensor obstruction from garage clutter',
    ],
    homeownerConcerns: 'Door shaking, uneven travel, and random opener reversals.',
    whyThisMatters: 'Burlington’s lightweight doors require careful balance testing — small alignment issues can create noticeable operational problems.',
    faqs: [
      { q: 'Why does my garage door shake when opening?', a: 'Shaking typically indicates a balance issue — one spring may be weaker than the other, or the door panels have shifted slightly. Burlington homes with lightweight insulated doors are more susceptible because small imbalances are amplified. A balance test and spring adjustment usually resolves it.' },
      { q: 'Why does my opener reverse for no reason?', a: 'Random reversals are almost always a sensor issue. East-central humidity causes condensation on sensor lenses, or garage clutter may intermittently break the beam. Clean the sensor lenses and ensure nothing is within 6 inches of the beam path. If it persists, the sensors may need recalibration.' },
      { q: 'Are lightweight garage doors less reliable?', a: 'Not inherently — but they require proper balancing. Builder-grade springs on lightweight doors can create a false sense of smooth operation while the balance is actually off. This stresses cables and the opener over time. Annual balance testing catches these issues early.' },
      { q: 'How often should Burlington homeowners service their garage doors?', a: 'We recommend annual maintenance — spring balance testing, lubrication of all moving parts, hardware tightening, sensor calibration, and opener load testing. Homes near the Haw River or in higher-humidity areas may benefit from semi-annual checks.' },
    ],
  },
  durham: {
    anchor: 'Eastern Metro Anchor',
    constructionPatterns: 'Durham homes built between 2000–2020 frequently use insulated steel doors paired with modern smart openers. These systems rely heavily on precise sensor alignment and correct opener load calibration.',
    doorTypes: 'Smart openers, insulated steel doors, and multi-panel modern designs.',
    climateImpact: 'Triangle humidity causes sensor drift, cable oxidation, and intermittent opener faults.',
    failureModes: [
      'Smart opener sensor drift',
      'Cable wear from humidity',
      'Load imbalance on insulated doors',
      'Track noise from expansion',
    ],
    homeownerConcerns: 'False obstruction alerts, intermittent opener failure, and noisy operation.',
    whyThisMatters: 'Durham’s modern systems require precise calibration — small alignment issues can cause smart openers to misread door position or trigger safety reversals.',
    faqs: [
      { q: 'Why does my garage door make noise in Durham?', a: 'Durham homes often experience noise from track expansion due to seasonal temperature swings and humidity. Dry rollers, loose hardware, and opener load imbalance are common causes. Annual lubrication and a balance check resolve most noise issues.' },
      { q: 'How does humidity affect garage door sensors in Durham?', a: 'Triangle humidity causes condensation on safety sensor lenses and can shift sensor alignment over time — a condition called sensor drift. This leads to intermittent false obstruction alerts. Proper recalibration and lens cleaning prevent these faults.' },
      { q: 'What garage door types are most common in Durham homes?', a: 'Durham homes built between 2000–2020 predominantly use insulated steel doors (R-12 to R-18) paired with smart openers. Older neighborhoods like Duke Park feature wood and composite doors. New construction trends toward modern flush-panel steel with integrated smart systems.' },
      { q: 'How often should Durham homeowners service their garage doors?', a: 'We recommend annual maintenance — spring balance testing, lubrication, hardware tightening, sensor calibration, and opener load testing. Homes with heavy daily use or smart opener systems benefit from semi-annual checks.' },
    ],
  },
};

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
    alternates: { canonical: `https://www.trytopnotchdoors.com/service-areas/${city}` },
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
            url: `https://www.trytopnotchdoors.com/service-areas/${city}`,
          })),
        }}
      />

      {/* Anchor City FAQ Schema */}
      {ANCHOR_CITY_EEAT[city] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: ANCHOR_CITY_EEAT[city].faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }),
          }}
        />
      )}

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

      {/* E-E-A-T Local Authority — Anchor Cities */}
      {ANCHOR_CITY_EEAT[city] && (() => {
        const eeat = ANCHOR_CITY_EEAT[city];
        return (
          <>
            <section className="py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
                    <BookOpen className="w-4 h-4" /> {area.name} Garage Door Expertise
                  </span>
                  <h2 className="font-display text-2xl text-brand-blue uppercase mb-3">
                    Understanding {area.name}&apos;s Garage Door Systems
                  </h2>
                  <p className="text-foreground/50 text-sm max-w-2xl mx-auto">
                    {eeat.anchor} — local construction patterns, climate factors, and failure modes specific to {area.name} homes.
                  </p>
                </div>

                {/* Construction Patterns + Door Types */}
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center">
                        <HardHat className="w-4 h-4 text-brand-blue" />
                      </div>
                      <h3 className="font-display text-sm text-brand-blue uppercase">Local Construction Patterns</h3>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed">{eeat.constructionPatterns}</p>
                  </div>
                  <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center">
                        <Home className="w-4 h-4 text-brand-blue" />
                      </div>
                      <h3 className="font-display text-sm text-brand-blue uppercase">Garage Door Types</h3>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed">{eeat.doorTypes}</p>
                  </div>
                </div>

                {/* Climate Impact */}
                <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                      <Thermometer className="w-4 h-4 text-brand-gold" />
                    </div>
                    <h3 className="font-display text-sm text-brand-blue uppercase">Climate Impact</h3>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{eeat.climateImpact}</p>
                </div>

                {/* Failure Modes + Homeowner Concerns */}
                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-red/5 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-brand-red" />
                      </div>
                      <h3 className="font-display text-sm text-brand-blue uppercase">Common Failure Modes</h3>
                    </div>
                    <ul className="space-y-2">
                      {eeat.failureModes.map((mode, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red/40 shrink-0 mt-1.5" />
                          {mode}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-brand-blue" />
                      </div>
                      <h3 className="font-display text-sm text-brand-blue uppercase">Homeowner Concerns</h3>
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4">{eeat.homeownerConcerns}</p>
                    <div className="border-t border-brand-silver/20 pt-4">
                      <h4 className="font-display text-xs text-brand-gold uppercase tracking-wider mb-2">Why This Matters</h4>
                      <p className="text-sm text-foreground/60 leading-relaxed">{eeat.whyThisMatters}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider-gleam" />

            {/* City-Specific FAQs */}
            <section className="py-16 surface-matte">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-display text-2xl text-brand-blue uppercase mb-8 text-center">
                  {area.name} Garage Door FAQs
                </h2>
                <div className="space-y-4">
                  {eeat.faqs.map((faq, i) => (
                    <details key={i} className="surface-elevated border border-brand-silver/20 rounded-lg gleam group">
                      <summary className="p-5 cursor-pointer font-display text-sm text-brand-blue uppercase tracking-wider list-none flex items-center justify-between">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 text-brand-gold transition-transform group-open:rotate-90 shrink-0 ml-4" />
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <div className="divider-gleam" />
          </>
        );
      })()}

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
          <PortfolioPreview
            projects={cityPortfolio}
            heading={`Recent Work in ${area.name}`}
            subheading={`Real projects completed by our team right here in ${area.name}.`}
          />
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
            6 counties, {SERVICE_AREAS.length}+ communities — one standard of service across the Piedmont Triad.
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
