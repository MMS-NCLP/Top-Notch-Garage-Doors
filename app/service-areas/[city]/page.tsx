import { notFound } from 'next/navigation';
import CTAButton from '@/components/CTAButton';
import Link from 'next/link';
import { serviceSchema } from '@/lib/schema';

const cities: Record<string, { name: string; description: string; keywords: string[] }> = {
  whitsett: {
    name: 'Whitsett',
    description: 'As our home base, Whitsett residents get priority scheduling and the fastest response times. We know these neighborhoods inside and out.',
    keywords: ['garage door repair Whitsett NC', 'garage door installation Whitsett', 'garage door service near me'],
  },
  burlington: {
    name: 'Burlington',
    description: 'Serving Burlington and the surrounding Alamance County area with full garage door services. From downtown Burlington to the Elon University corridor, we have you covered.',
    keywords: ['garage door repair Burlington NC', 'garage door installation Burlington', 'overhead door Burlington NC'],
  },
  greensboro: {
    name: 'Greensboro',
    description: 'The largest city in our service area. We provide full garage door services throughout Greensboro, from Friendly Avenue to Battleground to the Westover Terrace neighborhoods.',
    keywords: ['garage door repair Greensboro NC', 'garage door company Greensboro', 'overhead door Greensboro'],
  },
  gibsonville: {
    name: 'Gibsonville',
    description: 'Just minutes from our shop, Gibsonville homeowners enjoy quick service calls and same-day availability for most repairs.',
    keywords: ['garage door repair Gibsonville NC', 'garage door service Gibsonville'],
  },
  mcleansville: {
    name: 'McLeansville',
    description: 'We serve the McLeansville community with the same professional, neighbor-first approach we bring to every job.',
    keywords: ['garage door repair McLeansville NC', 'garage door installation McLeansville'],
  },
  elon: {
    name: 'Elon',
    description: 'Elon homeowners and property managers trust Top-Notch for reliable garage door service. Student housing, family homes, and new construction.',
    keywords: ['garage door repair Elon NC', 'garage door service Elon'],
  },
};

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = cities[city];
  if (!data) return {};
  return {
    title: `Garage Door Services in ${data.name}, NC | Top-Notch Garage Doors`,
    description: `Professional garage door repair, installation, and maintenance in ${data.name}, NC. Serving ${data.name} and surrounding areas with quality craftsmanship.`,
    alternates: { canonical: `https://topnotchgaragedoors.com/service-areas/${city}` },
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = cities[city];
  if (!data) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: `Garage Door Services in ${data.name}, NC`,
            description: `Professional garage door services in ${data.name}, NC and surrounding areas.`,
            url: `https://topnotchgaragedoors.com/service-areas/${city}`,
          })),
        }}
      />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">
            Garage Door Services in {data.name}, NC
          </h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">{data.description}</p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Services Available in {data.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {[
              { label: 'Garage Door Repair', href: '/services/repair' },
              { label: 'New Installation', href: '/services/installation' },
              { label: 'Opener Service', href: '/services/openers' },
              { label: 'Pressure Washing', href: '/services/pressure-washing' },
              { label: 'Garage Screen Doors', href: '/garage-screens' },
              { label: 'Maintenance & Tune-Ups', href: '/resources' },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-3 bg-brand-blue/5 rounded-lg px-4 py-3 hover:bg-brand-blue/10 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-blue shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm font-medium">{s.label}</span>
              </Link>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Other Areas We Serve</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {Object.entries(cities)
              .filter(([key]) => key !== city)
              .map(([key, val]) => (
                <Link
                  key={key}
                  href={`/service-areas/${key}`}
                  className="px-4 py-2 bg-white border border-brand-silver/30 rounded-full text-sm text-brand-blue hover:border-brand-blue transition-colors"
                >
                  {val.name}
                </Link>
              ))}
          </div>

          <div className="text-center">
            <CTAButton text={`Book Service in ${data.name}`} variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
