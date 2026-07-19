import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { Wrench, Home, Zap, Droplets, PanelTop, BookOpen, AlertTriangle } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Door Services — Troubleshooting, Repair & Installation',
  description: 'Complete garage door services: troubleshooting, emergency repair, installation, openers, pressure washing, and screen doors in Whitsett, NC & surrounding areas.',
  path: '/services',
});

const educationItems = [
  { q: 'How do I know if my spring is broken?', a: 'Look for a visible gap in the coil above your door. The door will feel extremely heavy and may not open at all.' },
  { q: 'Is it safe to open my garage door manually?', a: 'Only if the springs are intact. Pull the red emergency release handle, then lift gently. If the door is too heavy, stop — a spring is likely broken.' },
  { q: 'Why does my door reverse before hitting the floor?', a: 'The close-force or travel limit on your opener needs adjustment. Temperature changes can cause this issue seasonally.' },
  { q: 'How often should I maintain my garage door?', a: 'Twice per year: lubricate moving parts, test balance, inspect cables, and tighten hardware.' },
];

const services = [
  { title: 'Garage Door Repair', description: 'Springs, cables, panels, rollers, tracks — diagnosed and fixed. Same-day emergency service available.', href: '/services/repair', icon: <Wrench className="w-6 h-6" /> },
  { title: 'Garage Door Installation', description: 'New construction or replacement. Premium doors from top manufacturers, professionally installed.', href: '/services/installation', icon: <Home className="w-6 h-6" /> },
  { title: 'Garage Door Openers', description: 'Belt-drive, chain-drive, wall-mount. Smart-home ready openers from LiftMaster, Chamberlain, and more.', href: '/services/openers', icon: <Zap className="w-6 h-6" /> },
  { title: 'Pressure Washing', description: 'Driveways, sidewalks, siding, decks — professional-grade cleaning that restores surfaces to like-new.', href: '/services/pressure-washing', icon: <Droplets className="w-6 h-6" /> },
  { title: 'Garage Screen Doors', description: 'Enjoy fresh air without the bugs. Retractable and fixed screen solutions for any garage opening.', href: '/garage-screens', icon: <PanelTop className="w-6 h-6" /> },
];

export default function ServicesPage() {
  return (
    <>
      {/* EDUCATION FIRST */}
      <section className="py-20 surface-matte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-3">
              <BookOpen className="w-4 h-4" /> Know Before You Call
            </span>
            <h1 className="font-display text-4xl text-brand-blue uppercase mb-3">Our Services</h1>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Understanding what&apos;s wrong helps us fix it faster. Here are the most common questions homeowners have before scheduling service.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto mb-12">
            {educationItems.map((item) => (
              <div key={item.q} className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam">
                <h3 className="font-display text-base text-brand-blue mb-1">{item.q}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* EMERGENCY HIGHLIGHT */}
      <section className="py-12 bg-brand-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-brand-red" />
            <span className="font-display text-sm uppercase tracking-wider text-brand-red">Emergency?</span>
          </div>
          <p className="text-foreground/70 mb-4">
            Door stuck? Spring snapped? Opener dead? We offer same-day emergency service across the Triad.
          </p>
          <CTAButton text="Call for Same-Day Repair" variant="primary" />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ALL SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase text-center mb-10">All Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group surface-elevated border border-brand-silver/20 rounded-lg p-8 hover:shadow-lg hover:border-brand-blue/20 transition-all gleam"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-display text-xl text-brand-blue mb-3 group-hover:text-brand-red transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Ready to Get Started?</h2>
        <CTAButton text="Book Your Service" variant="primary" />
      </section>
    </>
  );
}
