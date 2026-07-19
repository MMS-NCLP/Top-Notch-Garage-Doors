import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema, faqSchema } from '@/lib/schema';
import { AlertTriangle, CheckCircle, BookOpen, Phone } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Door Repair — Troubleshooting & Same-Day Service',
  description: 'Garage door stuck, won\'t open, or making noise? Expert troubleshooting and same-day repair in Whitsett, NC. Springs, cables, panels, openers. Fair pricing, no surprises.',
  path: '/services/repair',
});

const faqs = [
  { question: 'How quickly can you repair my garage door?', answer: 'We offer same-day service for most repairs. Call us in the morning, and we can typically be there by afternoon.' },
  { question: 'How much does a garage door spring replacement cost?', answer: 'Spring replacements typically range from $150–$350 depending on the type (torsion vs. extension) and door size. We provide upfront pricing before any work begins.' },
  { question: 'Is it safe to use my garage door with a broken spring?', answer: 'No. A broken spring makes the door extremely heavy and unpredictable. Do not attempt to open or close it manually. Call us for immediate service.' },
  { question: 'Do you repair all brands of garage doors?', answer: 'Yes. We service Clopay, Amarr, CHI, Wayne Dalton, and all other major manufacturers.' },
];

const symptoms = [
  { symptom: 'Door won\'t open at all', cause: 'Broken torsion spring, disconnected cable, or opener motor failure', urgency: 'high' },
  { symptom: 'Door opens partway and stops', cause: 'Broken extension spring, obstruction in tracks, or travel limit misadjustment', urgency: 'high' },
  { symptom: 'Loud bang from garage', cause: 'Spring broke under tension — do NOT operate the door', urgency: 'high' },
  { symptom: 'Grinding or scraping noise', cause: 'Worn rollers, dry hinges, or bent track section', urgency: 'medium' },
  { symptom: 'Door reverses before closing', cause: 'Safety sensor misalignment or close-force adjustment needed', urgency: 'low' },
  { symptom: 'Remote works but wall button doesn\'t', cause: 'Faulty wall button or wiring issue', urgency: 'low' },
];

export default function RepairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Garage Door Repair',
            description: 'Expert garage door repair services including emergency same-day service in Whitsett, NC and surrounding areas.',
            url: 'https://topnotchgaragedoors.com/services/repair',
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
            <BookOpen className="w-4 h-4" /> Diagnostic Guide
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Garage Door Repair</h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Before you call, understanding what&apos;s happening with your door helps us arrive prepared with the right parts. Here&apos;s what different symptoms typically mean — and whether it&apos;s safe to wait or you need immediate service.
          </p>
        </div>
      </section>

      {/* SYMPTOMS TABLE */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Symptom Checker</h2>
          <div className="space-y-3 mb-12">
            {symptoms.map((s) => (
              <div key={s.symptom} className="surface-elevated border border-brand-silver/20 rounded-lg p-4 flex items-start gap-4 gleam">
                <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${s.urgency === 'high' ? 'bg-brand-red' : s.urgency === 'medium' ? 'bg-brand-gold' : 'bg-green-500'}`} />
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground/80">{s.symptom}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">{s.cause}</p>
                </div>
                <span className={`text-xs font-display uppercase px-2 py-0.5 rounded ${s.urgency === 'high' ? 'bg-brand-red/10 text-brand-red' : s.urgency === 'medium' ? 'bg-brand-gold/20 text-brand-blue' : 'bg-green-50 text-green-700'}`}>
                  {s.urgency === 'high' ? 'Call Now' : s.urgency === 'medium' ? 'Schedule Soon' : 'Can Wait'}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-foreground/40 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-red inline-block" /> = Emergency
            <span className="w-2 h-2 rounded-full bg-brand-gold inline-block ml-3" /> = Schedule within days
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block ml-3" /> = Non-urgent
          </p>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* EMERGENCY CTA */}
      <section className="py-12 bg-brand-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-8 h-8 text-brand-red mx-auto mb-3" />
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Same-Day Emergency Repair</h2>
          <p className="text-foreground/60 text-sm mb-4">
            Broken spring? Door off track? Don&apos;t wait — we carry common parts on every truck for single-visit fixes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton text="Book Emergency Repair" variant="primary" />
            <a href="tel:+13360000000" className="inline-flex items-center gap-2 text-brand-blue font-display text-sm uppercase">
              <Phone className="w-4 h-4" /> (336) 000-0000
            </a>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* WHAT WE REPAIR */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">What We Repair</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {['Broken Torsion Springs', 'Extension Springs', 'Snapped Cables', 'Bent Tracks', 'Damaged Panels', 'Worn Rollers', 'Opener Motors & Gears', 'Safety Sensor Alignment', 'Weather Seals', 'Lock & Handle Hardware'].map((item) => (
              <div key={item} className="flex items-center gap-3 surface-elevated border border-brand-silver/20 rounded-lg px-4 py-3">
                <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Pricing</h2>
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-6 mb-12 gleam">
            <p className="text-foreground/70 text-sm">
              Service calls start at $75. Most repairs range from $150–$500 depending on parts and complexity. We always provide a written estimate before starting work — no surprises.
            </p>
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-display text-lg text-brand-blue mb-1">{faq.question}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton text="Schedule Repair" variant="primary" />
          </div>
        </div>
      </section>
    </>
  );
}
