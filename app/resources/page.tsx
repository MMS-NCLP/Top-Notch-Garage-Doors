import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { faqSchema } from '@/lib/schema';
import Link from 'next/link';
import { BookOpen, Wrench, AlertTriangle, CheckCircle, Play } from 'lucide-react';

export const metadata = genMeta({
  title: 'Resources — Garage Door Care, Troubleshooting & Maintenance Guides',
  description: 'Free garage door maintenance guides, troubleshooting tips, and video resources. Learn to identify problems early and keep your door running smoothly.',
  path: '/resources',
});

const troubleshooting = [
  { question: 'My garage door won\'t open or close', answer: 'Check that the opener is plugged in and the circuit breaker hasn\'t tripped. Verify the safety sensors aren\'t blocked or misaligned (check for blinking LED). If the door is heavy or makes grinding sounds, a spring may be broken — do not attempt manual operation.' },
  { question: 'The door reverses immediately after touching the floor', answer: 'The close-force or travel limit on your opener likely needs adjustment. This is a common issue after temperature changes cause the door to expand. Adjustment should be done by a professional to maintain safety compliance.' },
  { question: 'The remote works but the wall button doesn\'t (or vice versa)', answer: 'If the remote works but wall button doesn\'t, the wall button or its wiring may be faulty. If the wall button works but remote doesn\'t, try replacing the remote battery first, then reprogram the remote to the opener.' },
  { question: 'The door makes loud grinding or squealing noises', answer: 'Lubricate all moving parts: hinges, rollers, springs, and bearing plates. Use a garage door-specific lubricant (not WD-40). If noise persists, worn rollers or dry bearings may need replacement.' },
];

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(troubleshooting)) }}
      />

      {/* EDUCATION HUB */}
      <section className="py-20 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BookOpen className="w-4 h-4" /> Homeowner Resource Center
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-4">Resources &amp; Guides</h1>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            The best way to avoid expensive emergency repairs is regular knowledge and maintenance. These guides help you understand your garage door system, spot problems early, and know when professional help is needed.
          </p>
        </div>
      </section>

      {/* TROUBLESHOOTING */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-brand-red" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">Troubleshooting Guide</h2>
          </div>
          <div className="space-y-4 mb-12">
            {troubleshooting.map((item) => (
              <div key={item.question} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <h3 className="font-display text-base text-brand-blue mb-2">{item.question}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* MAINTENANCE CHECKLIST */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">6-Month Maintenance Checklist</h2>
          </div>
          <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
            <p className="text-sm text-foreground/60 mb-4">Perform these tasks every 6 months to extend the life of your garage door system:</p>
            <ul className="space-y-3">
              {[
                'Lubricate springs, hinges, rollers, and bearing plates with silicone spray',
                'Inspect cables for fraying, kinks, or wear',
                'Test door balance (disconnect opener, lift halfway — door should stay)',
                'Check weather seals for cracks, gaps, or peeling',
                'Clean tracks with a damp cloth (never lubricate tracks)',
                'Test auto-reverse by placing a 2x4 under the closing door',
                'Inspect rollers for chips, cracks, or flat spots',
                'Tighten all visible hardware, brackets, and hinges',
                'Check opener battery backup (if equipped)',
                'Verify safety sensor alignment (LED indicators solid)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/70">
                  <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* VIDEO RESOURCES */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Play className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">Video Resources</h2>
          </div>
          <p className="text-sm text-foreground/60 mb-6">Coming soon — video guides for common maintenance tasks and troubleshooting steps.</p>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Related Articles</h2>
          <ul className="space-y-2 mb-12">
            <li><Link href="/blog/garage-door-springs-replacement-guide" className="text-brand-blue hover:text-brand-red transition-colors text-sm">When to Replace Your Garage Door Springs</Link></li>
            <li><Link href="/blog/garage-door-insulation-guide" className="text-brand-blue hover:text-brand-red transition-colors text-sm">Complete Guide to Garage Door Insulation</Link></li>
            <li><Link href="/blog/smart-garage-door-openers-2026" className="text-brand-blue hover:text-brand-red transition-colors text-sm">Smart Openers: What to Know in 2026</Link></li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <p className="text-foreground/60 mb-4">Can&apos;t fix it yourself? We&apos;re here to help.</p>
        <CTAButton text="Schedule Repair" variant="primary" />
      </section>
    </>
  );
}
