import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema, faqSchema } from '@/lib/schema';
import { BookOpen, Droplets, CheckCircle, AlertTriangle } from 'lucide-react';

export const metadata = genMeta({
  title: 'Pressure Washing — Professional Exterior Cleaning',
  description: 'Pressure washing vs soft washing: which is right for your surfaces? Professional exterior cleaning in Whitsett, NC. Driveways, sidewalks, siding, decks.',
  path: '/services/pressure-washing',
});

const faqs = [
  { question: 'What\'s the difference between pressure washing and soft washing?', answer: 'Pressure washing uses high-pressure water (2,500–4,000 PSI) for hard surfaces like concrete. Soft washing uses low pressure with biodegradable cleaning solutions for delicate surfaces like vinyl siding, painted wood, and roofing.' },
  { question: 'Will pressure washing damage my surfaces?', answer: 'Not when done correctly. We adjust PSI, nozzle angle, and distance for each surface type. Soft washing is used for any surface that could be damaged by high pressure.' },
  { question: 'How often should I have my driveway cleaned?', answer: 'Annually for most properties. Homes under heavy tree cover or in shaded areas benefit from twice-yearly cleaning to prevent algae and mold growth.' },
  { question: 'Is pressure washing safe for the environment?', answer: 'We use biodegradable, EPA-compliant cleaning solutions. We also follow local regulations regarding water runoff and storm drain protection.' },
];

export default function PressureWashingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Pressure Washing',
            description: 'Professional pressure washing and soft washing services in Whitsett, NC.',
            url: 'https://topnotchgaragedoors.com/services/pressure-washing',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* EDUCATION */}
      <section className="py-20 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BookOpen className="w-4 h-4" /> Surface Care Guide
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Pressure Washing</h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Not all surfaces should be cleaned the same way. Understanding the difference between pressure washing and soft washing protects your property and delivers better results.
          </p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Pressure Washing vs. Soft Washing</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Droplets className="w-6 h-6 text-brand-blue mb-3" />
              <h3 className="font-display text-lg text-brand-blue mb-2">Pressure Washing</h3>
              <p className="text-sm text-foreground/60 mb-3">High-pressure water (2,500–4,000 PSI) blasts away built-up grime on hard surfaces.</p>
              <p className="text-xs text-foreground/40"><strong>Best for:</strong> Concrete, brick, stone, pavers</p>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <Droplets className="w-6 h-6 text-brand-gold mb-3" />
              <h3 className="font-display text-lg text-brand-blue mb-2">Soft Washing</h3>
              <p className="text-sm text-foreground/60 mb-3">Low-pressure application with cleaning agents that kill mold, algae, and bacteria at the root.</p>
              <p className="text-xs text-foreground/40"><strong>Best for:</strong> Vinyl siding, wood, roofing, painted surfaces</p>
            </div>
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Why Clean Your Exterior?</h2>
          <ul className="space-y-3 mb-12 text-foreground/70">
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /> Increases curb appeal and property value</li>
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /> Prevents long-term damage from mold and mildew</li>
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /> Prepares surfaces for painting or staining</li>
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /> Eliminates slip hazards from algae growth</li>
            <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" /> Extends the lifespan of exterior surfaces</li>
          </ul>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* SERVICES */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">What We Clean</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {['Driveways & Sidewalks', 'Patios & Pool Decks', 'House Siding (Soft Wash)', 'Wood & Composite Decks', 'Fences & Retaining Walls', 'Garage Floors', 'Commercial Storefronts', 'Parking Areas'].map((item) => (
              <div key={item} className="flex items-center gap-3 surface-elevated border border-brand-silver/20 rounded-lg px-4 py-3 gleam">
                <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">FAQ</h2>
          <div className="space-y-6 mb-12">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-display text-lg text-brand-blue mb-1">{faq.question}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton text="Book Pressure Washing" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
