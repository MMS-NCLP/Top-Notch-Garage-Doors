import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { BookOpen, Handshake, Building2, HardHat, CheckCircle, ClipboardCheck } from 'lucide-react';

export const metadata = genMeta({
  title: 'Partnership Program — Contractors, Builders & HOA Compliance',
  description: 'Partner with Top-Notch Garage Doors. HOA-compliant installations, builder packages, contractor pricing, and property management programs in the Piedmont Triad.',
  path: '/partnership',
});

export default function PartnershipPage() {
  return (
    <>
      {/* EDUCATION */}
      <section className="py-20 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
            <BookOpen className="w-4 h-4" /> Industry Knowledge
          </span>
          <h1 className="font-display text-4xl text-brand-blue uppercase mb-2">Partnership Program</h1>
          <p className="font-accent text-2xl text-brand-gold mb-6">Let&apos;s build together</p>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Garage door installations in residential and commercial projects require coordination between multiple trades. Understanding specifications, HOA requirements, and project timelines is critical for on-time, on-budget delivery.
          </p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Why It Matters</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-12">
            {[
              { title: 'Code Compliance', desc: 'NC building codes require specific wind-load ratings, fire-separation specs, and safety features. We ensure every installation meets local requirements.' },
              { title: 'HOA Specifications', desc: 'Many communities mandate specific styles, colors, and materials. We maintain spec libraries for major Triad HOAs and can source compliant options quickly.' },
              { title: 'Timeline Coordination', desc: 'Garage doors are one of the last trades in new construction. We coordinate with your schedule to avoid delays in final inspection and closing.' },
              { title: 'Warranty Documentation', desc: 'We provide complete warranty transfer documentation for builder-to-homeowner transitions, simplifying your closeout process.' },
            ].map((item) => (
              <div key={item.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <h3 className="font-display text-base text-brand-blue mb-1">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* HOA COMPLIANCE */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">HOA Compliance</h2>
          </div>
          <p className="text-foreground/70 mb-6">
            We work with property managers and HOA boards to ensure garage door replacements meet community standards. Our process:
          </p>
          <ol className="space-y-3 mb-12">
            {[
              'Review HOA architectural guidelines and approved product lists',
              'Provide homeowner with compliant options within their budget',
              'Submit architectural review application on homeowner\'s behalf (when requested)',
              'Install approved product to manufacturer specifications',
              'Provide completion documentation for HOA records',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-display text-xs">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* BUILDER PROGRAM */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">Builder Program</h2>
          </div>
          <p className="text-foreground/70 mb-6">
            For custom home builders and developers who need consistent, high-quality installations across multiple projects.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {[
              'Dedicated project coordinator',
              'Spec sheet libraries for design teams',
              'Model home installations at preferred pricing',
              'Homeowner warranty transfer documentation',
              'Volume pricing across projects',
              'Flexible scheduling for punch-list items',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 surface-elevated border border-brand-silver/20 rounded-lg px-4 py-3 gleam">
                <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRACTOR PROGRAM */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <HardHat className="w-5 h-5 text-brand-blue" />
            <h2 className="font-display text-2xl text-brand-blue uppercase">Contractor Program</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { title: 'General Contractors', desc: 'Reliable subcontractor for residential and commercial projects. On-time, clean worksite, professional communication.' },
              { title: 'Remodeling Companies', desc: 'Garage conversions, home additions, and full exterior renovations. We coordinate with your timeline.' },
              { title: 'Property Managers', desc: 'Volume pricing, priority scheduling, and centralized billing for multi-unit properties.' },
            ].map((item) => (
              <div key={item.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <h3 className="font-display text-lg text-brand-blue mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Partner Benefits</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {[
              'Priority scheduling on all jobs',
              'Volume pricing and bulk discounts',
              'Dedicated account manager',
              'Net-30 invoicing available',
              'Co-branded marketing materials',
              'Referral commission program',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 surface-elevated border border-brand-silver/20 rounded-lg px-4 py-3 gleam">
                <Handshake className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CANVA EMBED */}
      <section className="py-12 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg border border-brand-silver/20 gleam">
            <iframe
              src="https://www.canva.com/design/DAGf4-BznsU/Gromg_1UED7dEdn-BcWrvA/view?embed"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              title="Partnership Program Overview"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <p className="text-foreground/60 mb-4">Ready to partner? Let&apos;s talk.</p>
        <CTAButton text="Start a Conversation" variant="primary" />
      </section>
    </>
  );
}
