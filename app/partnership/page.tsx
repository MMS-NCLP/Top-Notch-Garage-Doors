import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import {
  Handshake, Building2, HardHat, ClipboardCheck, CheckCircle,
  Shield, Clock, DollarSign, Phone, Users, FileText, Wrench,
  Star,
} from 'lucide-react';

export const metadata = genMeta({
  title: 'Partnership Program — Contractors, Builders & HOA Compliance',
  description: 'Partner with Top-Notch Garage Doors. HOA-compliant installations, builder packages, contractor pricing, and property management programs in the Piedmont Triad.',
  path: '/partnership',
});

const PARTNER_TYPES = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Builders & Developers',
    desc: 'Consistent, high-quality installations across multi-lot projects. Spec sheet libraries, model home pricing, and warranty transfer documentation for clean closings.',
    benefits: ['Dedicated project coordinator', 'Volume pricing across lots', 'Warranty transfer docs', 'Flexible punch-list scheduling'],
  },
  {
    icon: <HardHat className="w-6 h-6" />,
    title: 'General Contractors',
    desc: 'Reliable subcontractor for residential and commercial projects. On-time, clean worksite, professional communication with your project manager.',
    benefits: ['Priority scheduling', 'Clean worksite guarantee', 'Direct PM communication', 'Co-branded proposals'],
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Property Managers',
    desc: 'Volume pricing, priority scheduling, and centralized billing for multi-unit properties. One point of contact for your entire portfolio.',
    benefits: ['Net-30 invoicing', 'Bulk discount tiers', 'Single account manager', 'Emergency priority response'],
  },
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: 'HOA Boards & Managers',
    desc: 'We maintain spec libraries for major Triad HOAs and handle architectural review submittals. Compliant installations, every time.',
    benefits: ['HOA spec compliance', 'ARC application support', 'Completion documentation', 'Homeowner coordination'],
  },
];

const STATS = [
  { value: '100+', label: 'Partner Projects Completed' },
  { value: '24hr', label: 'Partner Priority Response' },
  { value: '5.0', label: 'Average Partner Rating', icon: <Star className="w-4 h-4 text-brand-gold fill-brand-gold" /> },
  { value: 'Net-30', label: 'Invoicing Available' },
];

const PROCESS_STEPS = [
  { step: 1, title: 'Initial Consultation', desc: 'We learn your project scope, timeline, and requirements. Same-day response for partner inquiries.' },
  { step: 2, title: 'Spec & Compliance Review', desc: 'We pull HOA guidelines, verify code requirements, and source compliant products within budget.' },
  { step: 3, title: 'Coordinated Installation', desc: 'We work around your schedule. Clean worksite, professional crew, zero delays to your timeline.' },
  { step: 4, title: 'Documentation & Closeout', desc: 'Complete warranty transfer, inspection-ready documentation, and HOA completion records.' },
];

export default function PartnershipPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-brand-blue via-brand-blue to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-gold blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
                <Handshake className="w-4 h-4" /> Trade Professional Program
              </span>
              <h1 className="font-display text-4xl sm:text-5xl uppercase mb-4 leading-tight">
                Your Garage Door <span className="text-brand-gold">Partner</span> in the Triad
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                Priority scheduling, volume pricing, and a dedicated account manager — built for contractors, builders, and property managers who need a reliable garage door subcontractor.
              </p>
              <div className="flex flex-wrap gap-3">
                <CTAButton text="Start a Partnership" variant="secondary" />
                <a href="tel:+13366046494" className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/30 text-white hover:bg-white/10 transition-colors font-display text-sm uppercase tracking-wider">
                  <Phone className="w-4 h-4" /> (336) 604-6494
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="font-display text-2xl sm:text-3xl text-brand-gold">{stat.value}</span>
                    {stat.icon}
                  </div>
                  <span className="text-xs text-white/60 uppercase tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PARTNER TYPES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">Who We <span className="text-brand-red">Partner</span> With</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Tailored programs for every trade professional. One conversation to get started.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {PARTNER_TYPES.map((type) => (
              <div key={type.title} className="group surface-elevated border border-brand-silver/20 rounded-xl p-6 hover:border-brand-blue/30 transition-colors gleam">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-brand-blue uppercase">{type.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{type.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {type.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-foreground/70">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* WHY PARTNERS CHOOSE US */}
      <section className="py-16 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-brand-blue uppercase text-center mb-12">Why Partners <span className="text-brand-red">Choose</span> Us</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Clock className="w-6 h-6" />, title: 'Priority Scheduling', desc: 'Partners jump the queue. Same-day or next-day response on all service requests.' },
              { icon: <DollarSign className="w-6 h-6" />, title: 'Volume Pricing', desc: 'Tiered discounts based on annual volume. The more you build, the more you save.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Code Compliance', desc: 'NC building codes, wind-load ratings, fire-separation specs — we handle it all.' },
              { icon: <FileText className="w-6 h-6" />, title: 'Clean Documentation', desc: 'Warranty transfers, inspection docs, and HOA completion records delivered at closeout.' },
              { icon: <Wrench className="w-6 h-6" />, title: 'Certified Installers', desc: 'Factory-trained on Clopay, LiftMaster, and major brands. No callbacks, no rework.' },
              { icon: <Handshake className="w-6 h-6" />, title: 'Referral Commissions', desc: 'Earn on every qualified referral. We track, you get paid. Simple.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-sm text-brand-blue uppercase mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PROCESS */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-brand-blue uppercase text-center mb-12">How It <span className="text-brand-red">Works</span></h2>
          <div className="space-y-0">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.step} className="relative flex gap-6 pb-10 last:pb-0">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-brand-silver/30" />
                )}
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-display text-sm font-bold shrink-0 z-10">
                  {s.step}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg text-brand-blue uppercase mb-1">{s.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* CANVA EMBED */}
      <section className="py-12 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase text-center mb-6">Partnership Overview</h2>
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
      <section className="py-16 bg-gradient-to-br from-brand-blue to-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Image src="/images/logos/tngd-logo-small-2.png" alt="" width={56} height={56} className="w-14 h-14 object-contain mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-3xl uppercase mb-3">Ready to <span className="text-brand-gold">Partner</span>?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            One conversation is all it takes. Tell us about your projects and we&apos;ll build a program that fits.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CTAButton text="Start a Partnership" variant="secondary" />
            <a href="tel:+13366046494" className="inline-flex items-center gap-2 px-5 py-3 rounded border border-white/30 text-white hover:bg-white/10 transition-colors font-display text-sm uppercase tracking-wider">
              <Phone className="w-4 h-4" /> Call Direct
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
