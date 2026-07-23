import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import PortfolioPreview from '@/components/PortfolioPreview';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema } from '@/lib/schema';
import { getProjectsByService } from '@/lib/portfolio-data';
import { BookOpen, Wifi, Battery, Volume2, Smartphone, AlertTriangle } from 'lucide-react';

const openerProjects = getProjectsByService('opener-work', 3);

export const metadata = genMeta({
  title: 'Garage Door Openers — Smart Openers, Repair & Installation',
  description: 'Garage door opener not responding? Learn troubleshooting steps, smart opener features, and when to repair vs. replace. LiftMaster, Chamberlain, Genie in Whitsett, NC.',
  path: '/services/openers',
});

const troubleshooting = [
  { symptom: 'Opener clicks but door doesn\'t move', cause: 'Stripped gear, broken spring, or disconnected trolley.' },
  { symptom: 'Opener light blinks but won\'t operate', cause: 'Safety sensor misalignment or obstruction. Check for LED codes on the motor unit.' },
  { symptom: 'Door opens but won\'t close', cause: 'Sensor beam blocked, sun interference, or close-force too low.' },
  { symptom: 'Remote works intermittently', cause: 'Low battery, antenna issue, or radio interference from nearby electronics.' },
];

export default function OpenersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Garage Door Opener Installation & Repair',
            description: 'Professional garage door opener services in Whitsett, NC and surrounding areas.',
            url: 'https://www.trytopnotchdoors.com/services/openers',
          })),
        }}
      />

      {/* HERO BANNER */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="/images/portfolio/openers/liftmaster-opener-install-nc.jpg"
          alt="LiftMaster garage door opener installation in NC"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-2">
              <BookOpen className="w-4 h-4" /> Opener Guide
            </span>
            <h1 className="font-hero text-3xl sm:text-4xl text-white tracking-wider">GARAGE DOOR OPENERS</h1>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Your opener is the brain of the system — controlling access, safety, and convenience. Understanding how it works helps you troubleshoot issues and choose the right upgrade when it&apos;s time.
          </p>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Troubleshooting Your Opener</h2>
          <div className="space-y-3 mb-12">
            {troubleshooting.map((t) => (
              <div key={t.symptom} className="surface-elevated border border-brand-silver/20 rounded-lg p-4 gleam">
                <p className="font-medium text-sm text-foreground/80">{t.symptom}</p>
                <p className="text-xs text-foreground/50 mt-1">{t.cause}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* EMERGENCY */}
      <section className="py-12 bg-brand-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-6 h-6 text-brand-red mx-auto mb-2" />
          <p className="font-display text-sm uppercase text-brand-red mb-2">Opener completely dead?</p>
          <p className="text-sm text-foreground/60 mb-4">We diagnose and repair or replace same-day. Motor, gear, logic board, and sensor issues — all covered.</p>
          <CTAButton text="Book Opener Repair" variant="primary" />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* PRODUCT SHOWCASE */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Smart Opener Features</h2>
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {[
              { icon: <Smartphone className="w-5 h-5" />, title: 'Smartphone Control', desc: 'Open, close, and monitor your door from anywhere. Get alerts when it moves.' },
              { icon: <Wifi className="w-5 h-5" />, title: 'Built-in Wi-Fi & Camera', desc: 'Live video feed, motion recording, LED lighting. No monthly subscription.' },
              { icon: <Battery className="w-5 h-5" />, title: 'Battery Backup', desc: '20+ cycles during power outages. Never get locked out when the power goes down.' },
              { icon: <Volume2 className="w-5 h-5" />, title: 'Ultra-Quiet Belt Drive', desc: 'DC motors with soft start/stop. Ideal for rooms above or beside the garage.' },
            ].map((item) => (
              <div key={item.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-brand-blue mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">Brands We Install</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {['LiftMaster', 'Chamberlain', 'Genie', 'Linear', 'Marantec'].map((brand) => (
              <span key={brand} className="px-4 py-2 surface-elevated border border-brand-silver/20 rounded-full text-sm font-medium text-brand-blue gleam">
                {brand}
              </span>
            ))}
          </div>

          {/* Durham Knowledge Block */}
          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-lg p-6 mb-12">
            <h3 className="font-display text-lg text-brand-blue mb-2">Durham Smart Opener Behavior</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Smart openers in Durham often experience sensor drift due to humidity changes in the Triangle. This causes intermittent failure and false obstruction alerts — symptoms homeowners frequently mistake for a broken opener. Proper calibration of the safety sensors and opener load settings prevents these issues and extends the life of the system.
            </p>
          </div>

          <div className="text-center">
            <CTAButton text="Book Opener Service" variant="primary" />
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      <PortfolioPreview
        projects={openerProjects}
        heading="Recent Opener Work"
        subheading="Smart opener installs, repairs, and upgrades across the corridor."
      />
    </>
  );
}
