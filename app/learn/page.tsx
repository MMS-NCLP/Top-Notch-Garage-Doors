import Link from 'next/link';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import DoorAnatomy from '@/components/DoorAnatomy';
import SpringCalculator from '@/components/SpringCalculator';
import NoiseDiagnostic from '@/components/NoiseDiagnostic';
import MaintenanceChecklist from '@/components/MaintenanceChecklist';
import HighLiftReference from '@/components/HighLiftReference';
import VideoLibrary from '@/components/VideoLibrary';
import FlipCard from '@/components/FlipCard';
import { generateMetadata as genMeta } from '@/lib/seo';
import { KNOWLEDGE_TOPICS } from '@/lib/knowledge-hub';
import { articles } from '@/lib/blog-content';
import {
  BookOpen,
  Settings,
  Zap,
  Shield,
  AlertTriangle,
  BookMarked,
  PanelTop,
  ChevronRight,
  Wrench,
  Calculator,
  Volume2,
  CheckSquare,
  ArrowUpRight,
  Play,
  GraduationCap,
  Cog,
  Gauge,
  Star,
} from 'lucide-react';

export const metadata = genMeta({
  title: 'Technical Resource Center — Interactive Garage Door Diagrams, DASMA Spring Calculator & Expert Guides',
  description:
    'Professional-grade garage door technical reference: interactive anatomy diagrams for torsion, extension, and opener systems. DASMA spring calculator with IPPT, cycle life, wire sizing, and conversion tools. 21-point maintenance checklist, noise diagnostic wizard, high-lift conversion guide, and curated video library. Built by certified TNGD technicians for industry professionals and informed homeowners across the Piedmont Triad.',
  path: '/learn',
  keywords: [
    'garage door spring calculator',
    'garage door anatomy diagram',
    'torsion spring IPPT calculator',
    'DASMA spring formula',
    'garage door parts diagram torsion extension opener',
    'garage door noise diagnosis',
    'garage door maintenance checklist',
    'high lift conversion guide',
    'garage door technical reference',
    'garage door spring conversion chart',
    'garage door wire size chart',
    'garage door cable length calculator',
    'garage door troubleshooting guide',
    'torsion spring cycle life calculator',
    'extension spring color code chart',
    'garage door counterbalance system',
    'winding cone safety',
    'UL 325 garage door safety',
    'garage door spring replacement guide NC',
    'piedmont triad garage door service',
  ],
});

const ICON_MAP: Record<string, React.ReactNode> = {
  settings: <Settings className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  'alert-triangle': <AlertTriangle className="w-6 h-6" />,
  'book-open': <BookMarked className="w-6 h-6" />,
  'panel-top': <PanelTop className="w-6 h-6" />,
};

const SECTION_NAV = [
  { id: 'door-anatomy', label: 'Door Anatomy', icon: Wrench, color: '#002868' },
  { id: 'spring-calculator', label: 'Spring Calculator', icon: Calculator, color: '#bf0a30' },
  { id: 'noise-diagnostic', label: 'Noise Diagnostic', icon: Volume2, color: '#d97706' },
  { id: 'maintenance-checklist', label: 'Maintenance', icon: CheckSquare, color: '#059669' },
  { id: 'high-lift-reference', label: 'High-Lift', icon: ArrowUpRight, color: '#7c3aed' },
  { id: 'video-library', label: 'Video Library', icon: Play, color: '#dc2626' },
];

export default function LearnPage() {
  const totalArticles = Object.keys(articles).length;
  const visibleTopics = KNOWLEDGE_TOPICS.filter(t => t.slug !== 'pressure-washing');

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-gold mb-4">
              <GraduationCap className="w-4 h-4" />
              Technical Resource Center
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-blue uppercase mb-5 leading-tight">
              Professional-Grade <span className="text-brand-red">Knowledge</span>
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              A residential garage door is a precisely engineered counterbalance system — the heaviest
              moving object in most American homes, cycling thousands of times per year under forces
              that can exceed 400 pounds of stored energy. Understanding that system is the difference
              between confident decisions and costly mistakes. These tools, diagrams, and references
              are built by working TNGD technicians using the same DASMA formulas and ASTM wire
              specifications we rely on in the field every day.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/40">
              <span className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                6 interactive tools
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {totalArticles} in-depth articles
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Written by working technicians
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY NAV ═══ */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {SECTION_NAV.map(s => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider text-gray-500 hover:text-white transition-colors whitespace-nowrap group"
                  style={{ ['--nav-color' as string]: s.color }}
                >
                  <span className="group-hover:bg-[var(--nav-color)] group-hover:text-white flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                  </span>
                </a>
              );
            })}
            <a
              href="#topic-guides"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider text-gray-500 hover:text-brand-blue hover:bg-brand-blue/5 transition-colors whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Topic Guides
            </a>
          </nav>
        </div>
      </div>

      {/* ═══ UNDERSTANDING YOUR GARAGE DOOR — Educational Intro ═══ */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-50/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-4">
                  Understanding Your <span className="text-brand-red">Garage Door System</span>
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-4">
                  Every sectional garage door operates on the same fundamental principle: <strong>counterbalance</strong>.
                  The springs — whether torsion-mounted above the opening or extension-mounted along the horizontal tracks —
                  store exactly enough energy to offset the weight of the door. When properly balanced, a 200-pound door
                  should feel like it weighs less than 10 pounds to lift by hand. That engineering precision is what makes
                  the system both elegant and potentially dangerous.
                </p>
                <p className="text-foreground/60 leading-relaxed mb-4">
                  The counterbalance system does not push or pull the door — it neutralizes gravity. The springs wind
                  (torsion) or stretch (extension) as the door closes, absorbing energy. When the door opens, that stored
                  energy releases, doing the heavy lifting through cable drums, lift cables, and pulleys. The opener motor,
                  despite what most homeowners assume, contributes less than 10% of the actual lifting force. Its primary
                  job is automation and safety — the springs do the real work.
                </p>
                <p className="text-foreground/60 leading-relaxed">
                  This is why a broken spring means a door that will not open, even though the opener motor still runs.
                  The motor simply cannot overcome 150–250 pounds of unbalanced door weight. Understanding this relationship
                  is the foundation of every diagnostic, repair, and installation decision your technician makes.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-white border border-brand-blue/10 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Cog className="w-5 h-5 text-brand-blue" />
                    <h3 className="font-display text-sm text-brand-blue uppercase tracking-wider">Torsion vs. Extension</h3>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    Torsion springs mount on a shaft above the door and store energy by <em>twisting</em> — they produce
                    torque. Extension springs mount along the horizontal tracks and store energy by <em>stretching</em> —
                    they produce linear force redirected through pulleys. Torsion systems provide smoother, more balanced
                    lift and last significantly longer (10,000–100,000+ cycles vs. 5,000–15,000 for extension). Most modern
                    residential installations use torsion springs; extension systems are found on older doors and
                    budget installations.
                  </p>
                </div>
                <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-brand-red" />
                    <h3 className="font-display text-sm text-brand-red uppercase tracking-wider">Why Springs Fail</h3>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    Every spring has a finite cycle life determined by the stress ratio between its operating load and
                    the wire&apos;s ultimate tensile strength. Oil-tempered steel wire (ASTM A229) fatigues predictably — a
                    standard 10,000-cycle spring operating at a 55% stress index will last approximately 7 years at 4
                    cycles per day (the national average). Higher stress means fewer cycles. Temperature swings, corrosion,
                    and improper installation accelerate failure. When a spring breaks, it releases its stored energy
                    instantaneously — which is why replacement is strictly a professional operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ DOOR ANATOMY — Blue accent ═══ */}
      <section id="door-anatomy" className="py-16 sm:py-20 relative scroll-mt-24">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-brand-blue via-brand-blue/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-foreground/60 leading-relaxed">
              A standard residential garage door contains 25–40 individual components working in concert. The door
              itself is built from horizontal sections (panels) connected by numbered hinges — #1 at the bottom, #2 in
              the middle, #3 at the top — each with progressively greater roller stem offset to accommodate the track
              radius. Rollers ride inside vertical tracks bolted to the door jambs, curve through a 12″ or 15″ radius
              section, and continue along horizontal tracks suspended from the ceiling by angle-iron hangers. Every
              bracket, hinge, and roller has a specific job, and understanding what each part does helps you
              communicate clearly with your technician and recognize when something needs attention before it becomes
              an emergency.
            </p>
          </div>
          <DoorAnatomy />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ SPRING CALCULATOR — Red accent ═══ */}
      <section id="spring-calculator" className="py-16 sm:py-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/springs/broken-torsion-spring-piedmont-triad.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-brand-red via-brand-red/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-8">
            <h3 className="font-display text-xl text-brand-blue uppercase mb-3">The Science Behind Spring Selection</h3>
            <p className="text-foreground/60 leading-relaxed mb-4">
              Selecting the correct torsion spring is an engineering problem, not a guessing game. The industry-standard
              metric is <strong>IPPT (Inch-Pounds Per Turn)</strong> — the amount of torque a spring produces for each
              full rotation of the torsion shaft. The DASMA formula calculates this from four variables: wire diameter
              (d), modulus of rigidity (G = 11,500,000 psi for ASTM A229 oil-tempered wire), mean coil diameter (D),
              and the number of active coils (Nₐ). The relationship is IPPT = (d⁴ × G) / (10.18 × D × Nₐ), where
              10.18 is the geometric constant 32/π.
            </p>
            <p className="text-foreground/60 leading-relaxed mb-4">
              Wire diameter has an outsized effect because it is raised to the fourth power — increasing wire size by
              just one gauge step can change the IPPT by 20–40%. The spring index (D/d ratio) should fall between 5
              and 12 for reliable manufacturing and performance. Below 5, the wire is too thick relative to the coil
              diameter, creating extreme stress concentrations. Above 12, the spring becomes mechanically unstable.
            </p>
            <p className="text-foreground/60 leading-relaxed">
              The <strong>Wahl correction factor</strong> accounts for the stress concentration on the inner surface
              of each coil where the wire curves most tightly. Without this correction, calculated stress understates
              the actual peak stress by 10–25%, leading to premature failure. Every result in our calculator includes
              the Wahl-corrected stress, the stress index (ratio of corrected stress to ultimate tensile strength), and
              a cycle life estimate based on empirical fatigue data for oil-tempered wire.
            </p>
          </div>
          <SpringCalculator />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ NOISE DIAGNOSTIC — Amber accent ═══ */}
      <section id="noise-diagnostic" className="py-16 sm:py-20 relative bg-gradient-to-br from-amber-50/30 to-transparent scroll-mt-24">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-foreground/60 leading-relaxed">
              Garage door noise is diagnostic information, not just an annoyance. A grinding sound during travel usually
              indicates dry or worn rollers — nylon rollers operate at roughly 60% lower decibel levels than steel and
              last twice as long. A rhythmic popping or banging at the bottom of travel often points to a cable jumping
              off the drum groove or a hinge binding at the track radius. High-pitched squealing typically means
              metal-on-metal contact at the hinges or bearing plates. Our noise diagnostic wizard walks you through
              identifying the type, location, and timing of the sound to narrow the likely cause before you call
              for service.
            </p>
          </div>
          <NoiseDiagnostic />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ MAINTENANCE CHECKLIST — Green accent ═══ */}
      <section id="maintenance-checklist" className="py-16 sm:py-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/installations/track-installation-greensboro-nc.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-8">
            <p className="text-foreground/60 leading-relaxed">
              Preventive maintenance is the single most cost-effective investment in your garage door system. A $100
              annual tune-up typically prevents $500–$1,200 in emergency repairs. The protocol below covers the five
              critical maintenance categories: visual inspection, hardware tightening, lubrication, balance testing,
              and track alignment. Items marked &quot;Pro Only&quot; involve components under tension — torsion springs, cables,
              and bottom brackets — that require professional tools and training to service safely. Everything else
              is within reach of a careful homeowner with a stepladder, a socket set, and silicone-based garage door
              lubricant (never WD-40, which strips existing lubrication and attracts dust).
            </p>
          </div>
          <MaintenanceChecklist />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ HIGH-LIFT REFERENCE — Purple accent ═══ */}
      <section id="high-lift-reference" className="py-16 sm:py-20 relative bg-gradient-to-br from-violet-50/30 to-transparent scroll-mt-24">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-violet-500 via-violet-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-foreground/60 leading-relaxed">
              High-lift conversion extends the vertical track above the door opening before transitioning to horizontal,
              reclaiming ceiling space for storage, car lifts, or overhead HVAC equipment. The conversion requires
              larger cable drums (525, 575, or 600 series depending on additional travel), recalculated spring sizing
              for the increased cable wrap, extended vertical track sections, and modified track geometry. It is a
              precision retrofit that changes the mechanical relationship between the spring, drum, and cable — not
              simply a matter of adding more track. Every high-lift job requires a site survey to verify structural
              support, headroom clearance, and spring compatibility.
            </p>
          </div>
          <HighLiftReference />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ VIDEO LIBRARY — Red accent ═══ */}
      <section id="video-library" className="py-16 sm:py-20 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/openers/liftmaster-opener-install-nc.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.03]"
          />
        </div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-8">
            <p className="text-foreground/60 leading-relaxed">
              Every video in this library is hand-picked by TNGD technicians from manufacturer channels (Clopay,
              LiftMaster, Chamberlain, Amarr) and verified industry educators. Each includes editorial notes explaining
              how the content applies to your specific system and what to watch for. We have removed all DIY
              installation content — door and motor installation requires professional training, proper tools, and
              liability coverage. The videos below focus on what homeowners <em>can</em> safely learn and do:
              programming, maintenance, troubleshooting, and informed purchasing decisions.
            </p>
          </div>
          <VideoLibrary />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ SAFETY & STANDARDS — Educational Section ═══ */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-red-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-3">
                Safety Standards & <span className="text-brand-red">Industry Compliance</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-lg text-brand-blue mb-3">UL 325: The Federal Safety Standard</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                  Since January 1, 1993, every residential garage door opener sold in the United States must comply
                  with UL 325, which mandates an entrapment protection device — either photo-eye sensors or a
                  monitored edge sensor. The photo-eye system projects an invisible infrared beam across the door
                  opening no higher than 6 inches from the floor. If anything breaks that beam while the door is
                  closing, the door immediately reverses direction.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Additionally, the opener must include an auto-reverse mechanism: if the closing door contacts a
                  solid object, it must reverse within 2 seconds. These dual-redundant systems have prevented
                  thousands of injuries since their mandate. If your opener predates 1993 or is missing its
                  photo-eye sensors, it does not meet current federal safety requirements.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-lg text-brand-blue mb-3">DASMA & ASTM: Engineering Standards</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                  The Door & Access Systems Manufacturers Association (DASMA) sets the engineering standards for
                  garage door and spring design in North America. Their Technical Data Sheets define the formulas,
                  material specifications, and testing protocols that every reputable manufacturer follows.
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Spring wire is manufactured to ASTM A229 (oil-tempered carbon steel) or ASTM A401 (chrome-silicon
                  alloy for high-cycle applications). The modulus of rigidity (G) — 11,500,000 psi for A229 wire —
                  is not an approximation; it is a material property measured through standardized ASTM testing.
                  When we say our calculators use &quot;DASMA formulas,&quot; we mean the exact mathematical relationships
                  specified in these standards, with the correct material constants and geometric coefficients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ FLIP CARDS — Reviews with Educational Fronts ═══ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-3">
              Real Results, <span className="text-brand-red">Real Reviews</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Every service backed by the same technical expertise you see on this page.
              Tap any card to see what our customers say.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FlipCard
              icon={<Gauge className="w-5 h-5" />}
              title="Spring Replacement"
              description="Torsion spring failures are the #1 emergency call. Proper spring selection — matching the IPPT to your door weight, height, and drum size — determines whether the replacement lasts 7 years or 20+. We stock common sizes on-truck for same-day repair."
              backImage="/images/portfolio/springs/spring-failure-repair-greensboro-1.jpg"
              backImageAlt="Torsion spring replacement"
              backInsight="&quot;Spring broke at 7am, they were here by noon. Fair price, clean work, explained everything. Exactly what you want from a local company.&quot; — Mike T., Whitsett"
              overlay="red"
            />
            <FlipCard
              icon={<Settings className="w-5 h-5" />}
              title="Door Installation"
              description="A new door installation involves 30+ components: panels, tracks, hardware, springs, and often an opener. Proper assembly and counterbalance setup require precision measurement, correct spring sizing, and track alignment to manufacturer specifications."
              backImage="/images/portfolio/installations/carriage-house-door-nc-1.jpg"
              backImageAlt="Carriage house door installation"
              backInsight="&quot;New door looks incredible. They helped us pick the right style for our house and the installation was spotless. Neighbors have already asked who did it.&quot; — Sarah K., Burlington"
            />
            <FlipCard
              icon={<Zap className="w-5 h-5" />}
              title="Smart Opener Upgrades"
              description="Modern openers deliver smartphone control, built-in cameras, battery backup, and UL 325-compliant safety systems. Belt-drive units operate at 50-60 dB — quieter than a normal conversation. Programming, Wi-Fi setup, and myQ integration are included with every install."
              backImage="/images/portfolio/openers/liftmaster-opener-install-nc.jpg"
              backImageAlt="LiftMaster smart opener installation"
              backInsight="&quot;Upgraded to a LiftMaster with the camera. Setup was seamless, they connected it to my phone, showed me everything. Now I can see my garage from work.&quot; — James R., Greensboro"
            />
            <FlipCard
              icon={<Wrench className="w-5 h-5" />}
              title="Annual Maintenance"
              description="Our 21-point maintenance protocol covers lubrication, hardware inspection, balance testing, safety sensor alignment, and weatherseal assessment. A $100 tune-up prevents $500+ emergency calls — and extends the life of your springs by 20-30%."
              backImage="/images/portfolio/installations/track-installation-greensboro-nc.jpg"
              backImageAlt="Track and hardware maintenance"
              backInsight="&quot;Had them replace both doors on our duplex rental property. Matched the style perfectly, both doors installed in one day. Great communication and fair pricing.&quot; — Patricia W., High Point"
            />
            <FlipCard
              icon={<Shield className="w-5 h-5" />}
              title="Emergency Response"
              description="A door off-track, a snapped cable, or a broken bottom bracket creates an immediate safety hazard. Our emergency response team carries replacement springs, cables, rollers, and brackets on every truck for single-trip resolution across the Piedmont Triad."
              backImage="/images/portfolio/emergency/emergency-crashed-door-interior-before-nc.jpg"
              backImageAlt="Emergency garage door repair"
              backInsight="&quot;Drove all the way out to Statesville and still showed up on time. New Clopay door looks fantastic on our ranch. Professional crew, clean job site.&quot; — Wayne B., Statesville"
              overlay="red"
            />
            <FlipCard
              icon={<Star className="w-5 h-5" />}
              title="Screen Door Living"
              description="Retractable garage screen doors transform your garage into a ventilated living space — a gym, workshop, or entertainment area — while keeping insects and debris out. The screen retracts fully into a ceiling-mounted housing when not in use."
              backImage="/images/portfolio/screens/garage-screen-door-nc-1.jpg"
              backImageAlt="Retractable garage screen door"
              backInsight="&quot;The retractable screen turned our garage into a second living room. Kids play there all summer now without the bugs. Best home improvement we've done.&quot; — Linda P., Gibsonville"
            />
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ TOPIC GUIDES ═══ */}
      <section id="topic-guides" className="py-16 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-2xl sm:text-3xl text-brand-blue uppercase mb-3">
              In-Depth Topic <span className="text-brand-red">Guides</span>
            </h2>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Each topic page organizes our best articles, FAQs, quick facts, and related
              portfolio work into one deep-dive resource.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleTopics.map((topic) => {
              const articleCount = topic.articleSlugs.filter(
                (s) => articles[s],
              ).length;

              return (
                <Link
                  key={topic.slug}
                  href={`/learn/${topic.slug}`}
                  className="group surface-elevated border border-brand-silver/20 rounded-xl p-7 hover:shadow-lg hover:border-brand-blue/20 transition-all gleam"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-${topic.color}/10 flex items-center justify-center text-${topic.color} group-hover:bg-brand-blue group-hover:text-white transition-colors`}
                    >
                      {ICON_MAP[topic.icon] ?? (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-display text-lg text-brand-blue uppercase mb-2 group-hover:text-brand-red transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-foreground/50 leading-relaxed mb-4 line-clamp-3">
                    {topic.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-foreground/30">
                    <span>{articleCount} article{articleCount !== 1 ? 's' : ''}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>{topic.faqs.length} FAQs</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>{topic.quickFacts.length} quick facts</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Browse Everything CTA */}
          <div className="mt-10 text-center">
            <p className="text-foreground/40 text-sm mb-3">Want to browse everything?</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-display uppercase tracking-wider text-brand-blue border-2 border-brand-blue/20 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
            >
              <BookOpen className="w-4 h-4" />
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ WHY WE BUILD THIS ═══ */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc.jpg"
            alt=""
            fill
            className="object-cover opacity-[0.04]"
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-4">
            Why We Build This
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-3">
            Most garage door companies want you to call first and ask questions later.
            We think that&apos;s backwards. When you understand the mechanics — the spring physics,
            the track geometry, the electrical systems — you make decisions with confidence,
            not under pressure.
          </p>
          <p className="text-foreground/60 leading-relaxed mb-3">
            For industry professionals: these tools use the same DASMA formulas, ASTM wire
            specifications, and manufacturer data our own technicians reference daily. We built them
            because the garage door trade deserves better resources than what exists online.
          </p>
          <p className="text-foreground/60 leading-relaxed mb-8">
            Every tool, calculator, and guide on this site is written by technicians who work on
            garage doors every day in Burlington, Greensboro, High Point, and across the Piedmont Triad.
          </p>
          <CTAButton text="Schedule a Free Estimate" variant="primary" />
        </div>
      </section>

    </>
  );
}
