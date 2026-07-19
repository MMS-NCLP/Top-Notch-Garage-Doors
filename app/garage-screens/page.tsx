import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema, faqSchema } from '@/lib/schema';
import { BookOpen, Wind, Bug, Sun, Eye, Home, Thermometer, CheckCircle } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Screen Doors — Benefits, Use Cases & Installation',
  description: 'Learn how garage screen doors transform your space. Benefits, use cases, retractable vs fixed options, and professional installation in Whitsett, NC.',
  path: '/garage-screens',
});

const faqs = [
  { question: 'What types of garage screens do you offer?', answer: 'Retractable motorized screens, manual roll-up screens, and fixed panel systems. All custom-measured to your garage opening.' },
  { question: 'Can I still use my garage door with a screen installed?', answer: 'Absolutely. Retractable screens roll up completely out of the way when not in use, so your garage door operates normally.' },
  { question: 'How long does installation take?', answer: 'Single-car: 2–3 hours. Double-car: 3–4 hours. Same-day installation available for most configurations.' },
  { question: 'Are garage screens durable?', answer: 'Yes. Commercial-grade mesh resists tears, UV damage, and pet claws. Powder-coated aluminum frames for long-term durability.' },
];

const useCases = [
  { icon: <Home className="w-5 h-5" />, title: 'Home Gym', desc: 'Work out with fresh air flow without bugs or debris entering your space.' },
  { icon: <Wind className="w-5 h-5" />, title: 'Workshop & Hobby Space', desc: 'Ventilation for woodworking, painting, or automotive projects while keeping the garage accessible.' },
  { icon: <Sun className="w-5 h-5" />, title: 'Entertaining & Gatherings', desc: 'Open-air hangout space for game days, cookouts, and neighborhood socials.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Pet-Safe Outdoor Access', desc: 'Let pets enjoy the outdoors while keeping them contained and protected from passing traffic.' },
];

export default function GarageScreensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Garage Screen Door Installation',
            description: 'Professional garage screen door installation in Whitsett, NC.',
            url: 'https://topnotchgaragedoors.com/garage-screens',
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
            <BookOpen className="w-4 h-4" /> Product Guide
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-2">Garage Screen Doors</h1>
          <p className="font-accent text-2xl text-brand-gold mb-6">Fresh air without the bugs</p>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            A garage screen door transforms underused space into a versatile extension of your home. Whether you want a bug-free workshop, an open-air gym, or a shaded place to relax on warm evenings — screens make it possible without sacrificing your garage door functionality.
          </p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Key Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {[
              { icon: <Bug className="w-5 h-5" />, text: 'Keeps insects and pests out' },
              { icon: <Wind className="w-5 h-5" />, text: 'Allows natural cross-ventilation' },
              { icon: <Sun className="w-5 h-5" />, text: 'Provides UV protection' },
              { icon: <Thermometer className="w-5 h-5" />, text: 'Reduces cooling costs' },
              { icon: <Eye className="w-5 h-5" />, text: 'Increases privacy from street' },
              { icon: <Home className="w-5 h-5" />, text: 'Creates usable living space' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 surface-elevated border border-brand-silver/20 rounded-lg px-4 py-3 gleam">
                <div className="text-brand-blue">{item.icon}</div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* USE CASES */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Popular Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {useCases.map((uc) => (
              <div key={uc.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                  {uc.icon}
                </div>
                <h3 className="font-display text-lg text-brand-blue mb-2">{uc.title}</h3>
                <p className="text-sm text-foreground/60">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PRODUCT OPTIONS */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Screen Options</h2>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { title: 'Manual Roll-Up', price: 'From $800', desc: 'Simple, durable spring-assisted screens. Pull down to use, roll up to store.' },
              { title: 'Motorized Retractable', price: 'From $1,500', desc: 'One-touch operation with remote control. Disappears completely when not in use.' },
              { title: 'Fixed Panel', price: 'From $600', desc: 'Permanent screen panels with walk-through zippered entry. Most affordable option.' },
            ].map((opt) => (
              <div key={opt.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam text-center">
                <h3 className="font-display text-lg text-brand-blue mb-2">{opt.title}</h3>
                <p className="text-sm text-foreground/60 mb-3">{opt.desc}</p>
                <span className="font-display text-brand-red">{opt.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATION PROCESS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Installation Process</h2>
          <ol className="space-y-4 mb-12">
            {[
              'Free on-site measurement and consultation',
              'Screen type, mesh, and color selection',
              'Custom fabrication (7–10 business days)',
              'Professional installation with mounting hardware',
              'Full operation demonstration and care instructions',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-display text-sm gloss-button">
                  {i + 1}
                </span>
                <span className="text-foreground/70 pt-1">{step}</span>
              </li>
            ))}
          </ol>

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
            <CTAButton text="Get Screen Quote" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
