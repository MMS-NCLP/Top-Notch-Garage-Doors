import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { generateMetadata as genMeta } from '@/lib/seo';
import { serviceSchema, faqSchema } from '@/lib/schema';
import { BookOpen, Wind, Bug, Sun, Eye, Home, Thermometer, CheckCircle, ExternalLink, Shield, Ruler, Smartphone, Zap, Lock, PawPrint, Download, FileText } from 'lucide-react';

export const metadata = genMeta({
  title: 'Garage Screen Doors — Lifestyle Screens, Motorized & Retractable Installation',
  description: 'Lifestyle Screens dealer in Whitsett, NC. Motorized retractable screens, manual spring-loaded systems, and screen enclosures. Lifetime warranty. Free quotes.',
  path: '/garage-screens',
});

const faqs = [
  { question: 'What types of garage screens do you offer?', answer: 'Retractable motorized screens, manual roll-up screens, and fixed panel systems. All custom-measured to your garage opening.' },
  { question: 'Can I still use my garage door with a screen installed?', answer: 'Absolutely. Retractable screens roll up completely out of the way when not in use, so your garage door operates normally. You typically lose no more than 1.75 inches of clearance.' },
  { question: 'How long does installation take?', answer: 'Single-car: 2–3 hours. Double-car: 3–4 hours. Same-day installation available for most configurations.' },
  { question: 'Are garage screens durable?', answer: 'Yes. Commercial-grade mesh resists tears, UV damage, and pet claws. Powder-coated aluminum frames for long-term durability.' },
  { question: 'What sizes are available?', answer: 'Lifestyle Screens come in widths from 6 to 18 feet and heights from 7 to 10 feet. Heights of 9–10 feet are available up to 16 feet wide. Custom sizes can be built from existing kits.' },
  { question: 'What screen mesh options are available?', answer: 'Two primary options: standard fiberglass in an 18x14 weave (58% airflow, best for ventilation) and PVC-coated polyester in a 17x20 weave (48% airflow, maximum durability and pet resistance). Both available in charcoal; PVC also available in white.' },
  { question: 'Does Lifestyle Screens offer a warranty?', answer: 'Yes. Lifestyle Screens includes a Limited Lifetime Warranty covering defects in material and workmanship for the life of original ownership. Coverage is limited to parts — installer workmanship is covered separately under our TNGD labor warranty.' },
];

const useCases = [
  { icon: <Home className="w-5 h-5" />, title: 'Home Gym', desc: 'Work out with fresh air flow without bugs or debris entering your space.' },
  { icon: <Wind className="w-5 h-5" />, title: 'Workshop & Hobby Space', desc: 'Ventilation for woodworking, painting, or automotive projects while keeping the garage accessible.' },
  { icon: <Sun className="w-5 h-5" />, title: 'Entertaining & Gatherings', desc: 'Open-air hangout space for game days, cookouts, and neighborhood socials.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Pet-Safe Outdoor Access', desc: 'Let pets enjoy the outdoors while keeping them contained and protected from passing traffic.' },
];

const lifestyleSizes = [
  { width: "6'", heights: "7', 8'" },
  { width: "8'", heights: "7', 8', 9'" },
  { width: "9'", heights: "7', 8', 9'" },
  { width: "10'", heights: "7', 8', 9'" },
  { width: "12'", heights: "7', 8', 9', 10'" },
  { width: "14'", heights: "7', 8', 9', 10'" },
  { width: "16'", heights: "7', 8', 9', 10'" },
  { width: "18'", heights: "7', 8'" },
];

const brochures = [
  { title: 'Lifestyle Screens Consumer Brochure', desc: 'Complete product overview with sizes, colors, mesh options, and features.', file: '/documents/brochures/lifestyle-screens-consumer-brochure.pdf' },
  { title: 'Lifestyle Screens HOA Presentation', desc: 'Designed for homeowners in HOA communities — appearance, compliance, and privacy features.', file: '/documents/brochures/lifestyle-screens-hoa-presentation.pdf' },
  { title: 'Mystic Classic Brochure', desc: 'Classic motorized screen door system overview and installation details.', file: '/documents/brochures/motorized-screen-door-flyer.pdf' },
];

export default function GarageScreensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema({
            name: 'Garage Screen Door Installation',
            description: 'Professional garage screen door installation in Whitsett, NC. Authorized Lifestyle Screens dealer offering motorized, retractable, and manual screen systems.',
            url: 'https://www.trytopnotchdoors.com/garage-screens',
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

          {/* Hero gallery */}
          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/portfolio/screens/screen-door-brick-american-flag-hero-nc.jpg"
                alt="Premium garage screen door on brick home with American flag in Piedmont Triad NC"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/portfolio/screens/garage-screen-door-green-house-nc.jpg"
                alt="Retractable garage screen door installed on green house in High Point NC"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Promo Video */}
          <div className="relative rounded-lg overflow-hidden shadow-lg mb-12">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-auto rounded-lg"
              poster="/images/portfolio/screens/screen-door-brick-american-flag-hero-nc.jpg"
            >
              <source src="/videos/tngd-screen-door-promo.mp4" type="video/mp4" />
            </video>
          </div>

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

      {/* LIFESTYLE SCREENS PRODUCT DEEP-DIVE */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand Header with Logo */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <Image
                src="/images/logos/partners/lifestyle-screens-green-logo.png"
                alt="Lifestyle Screens — The Most Versatile Garage Screen on the Planet"
                width={280}
                height={80}
                className="mx-auto"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-display uppercase tracking-widest text-brand-gold">Authorized Dealer</span>
            </div>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              The most versatile garage screen on the planet. A patented, fully spring-loaded garage door screen that works with your existing garage door — no electric motor required.
            </p>
          </div>

          {/* How It Works — with demo image */}
          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-8">
                <h3 className="font-display text-xl text-brand-blue uppercase mb-4">How It Works</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  The Lifestyle Screen system runs on maintenance-free tracks similar to your garage door system. A spring-loaded counter-balance mechanism makes the screen effortless to raise and lower — no electric opener needed. Simply pull the screen down to use, push up to store.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  The frame is built from 2&quot; x 2&quot; architectural-grade aluminum with a wet-painted shell finish for lasting durability. Unlike hook-and-loop or Velcro-mounted alternatives, this is a permanent, professional system that operates smoothly season after season.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  An optional door-within-a-door design lets you walk in and out without raising the entire screen — convenient for quick trips to the mailbox or letting the dog out.
                </p>
              </div>
              <div className="md:col-span-2 relative min-h-[280px]">
                <Image
                  src="/images/logos/partners/lifestyle-screens-demo.jpg"
                  alt="Lifestyle Screen demonstration — easy raise and lower operation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 p-6 pt-0 md:pt-6 border-t border-brand-blue/10 md:border-t-0">
              {[
                { icon: <Zap className="w-4 h-4" />, label: 'Spring-loaded counter-balance', detail: 'No motor, no electricity, no maintenance' },
                { icon: <Ruler className="w-4 h-4" />, label: 'Minimal clearance loss', detail: 'Typically 1.75" or less from your existing opening' },
                { icon: <Shield className="w-4 h-4" />, label: 'Lifetime limited warranty', detail: 'Parts and materials covered for original owner' },
                { icon: <Lock className="w-4 h-4" />, label: 'Optional locking mechanisms', detail: 'Retractable locks and frame locks available' },
              ].map((feat) => (
                <div key={feat.label} className="flex items-start gap-3 surface-elevated border border-brand-silver/20 rounded-lg p-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/80">{feat.label}</p>
                    <p className="text-xs text-foreground/50">{feat.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interior View Gallery */}
          <h3 className="font-display text-xl text-brand-blue uppercase mb-2">View From Inside</h3>
          <p className="text-sm text-foreground/60 mb-6">See the clarity and visibility of the black charcoal screen mesh from inside the garage.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 mb-12">
            {[
              { src: '/images/portfolio/screens/lifestyle-screen-interior-view-neighborhood-nc.jpg', alt: 'Lifestyle Screen interior view looking out at neighborhood in NC' },
              { src: '/images/portfolio/screens/lifestyle-screen-interior-driveway-view-nc.jpg', alt: 'Interior view through Lifestyle Screen mesh at driveway' },
              { src: '/images/portfolio/screens/lifestyle-screen-interior-yard-view-nc.jpg', alt: 'Lifestyle Screen interior perspective showing yard visibility' },
              { src: '/images/portfolio/screens/lifestyle-screen-interior-open-garage-nc.jpg', alt: 'Open garage with Lifestyle Screen showing clear outdoor view' },
              { src: '/images/portfolio/screens/lifestyle-screen-interior-clearance-detail-nc.jpg', alt: 'Lifestyle Screen clearance detail from interior angle' },
              { src: '/images/portfolio/screens/screen-door-interior-view-completed-nc.jpg', alt: 'Completed screen door interior view Piedmont Triad NC' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 33vw" />
              </div>
            ))}
          </div>

          {/* White Privacy Screen Comparison */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/logos/partners/lifestyle-white-superscreen.jpg"
                alt="Looking through white privacy superscreen mesh — HOA-compliant appearance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-3 left-3">
                <span className="bg-white/90 text-brand-blue text-xs font-display uppercase px-3 py-1 rounded-full">White Privacy Mesh</span>
              </div>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam overflow-x-auto">
              <h4 className="font-display text-sm text-brand-blue uppercase tracking-wider mb-4">Feature Comparison</h4>
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left font-display text-foreground/70 pb-3 pr-3"></th>
                    <th className="text-center font-display text-brand-blue pb-3 px-2 whitespace-nowrap">Lifestyle<br/>Screens</th>
                    <th className="text-center font-display text-foreground/50 pb-3 px-2 whitespace-nowrap">Electronic<br/>Retractables</th>
                    <th className="text-center font-display text-foreground/50 pb-3 px-2 whitespace-nowrap">Aluminum<br/>Sliders</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/60">
                  {[
                    ['Same visit install', true, false, false],
                    ['100% usage of garage door opening', true, false, true],
                    ['Affordable for every budget', true, false, true],
                    ['Passage without opening entire screen', true, false, false],
                    ['No wiring or remotes to hassle with', true, false, true],
                    ['Hidden from view when not in use', true, true, false],
                    ['Easy screen repair', true, false, false],
                    ['No track to fill with debris', true, true, false],
                    ['Does not affect garage opening height', true, true, false],
                    ['No HOA approval typically required', true, false, false],
                  ].map(([feature, ls, er, al], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-brand-blue/[0.03]' : ''}>
                      <td className="py-2 pr-3 text-foreground/70">{feature as string}</td>
                      <td className="py-2 px-2 text-center">{ls ? <CheckCircle className="w-4 h-4 text-brand-blue mx-auto" /> : <span className="text-foreground/20">—</span>}</td>
                      <td className="py-2 px-2 text-center">{er ? <CheckCircle className="w-4 h-4 text-foreground/30 mx-auto" /> : <span className="text-foreground/20">—</span>}</td>
                      <td className="py-2 px-2 text-center">{al ? <CheckCircle className="w-4 h-4 text-foreground/30 mx-auto" /> : <span className="text-foreground/20">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Screen Mesh Options */}
          <h3 className="font-display text-xl text-brand-blue uppercase mb-6">Screen Mesh Options</h3>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="font-display text-base text-brand-blue mb-1">Standard Fiberglass</h4>
              <p className="text-xs font-display text-foreground/40 uppercase tracking-wider mb-3">18 x 14 Weave — Charcoal</p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                The same proven mesh used in residential window screens. Optimized for maximum airflow at 58% open area. Ideal for ventilation-focused applications like workshops and home gyms.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-display rounded">Best Airflow</span>
              </div>
            </div>

            <div className="surface-elevated border border-brand-blue/20 rounded-lg p-6 gleam ring-1 ring-brand-blue/10">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <PawPrint className="w-5 h-5" />
              </div>
              <h4 className="font-display text-base text-brand-blue mb-1">PVC-Coated Polyester</h4>
              <p className="text-xs font-display text-foreground/40 uppercase tracking-wider mb-3">17 x 20 Weave — Charcoal</p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                Maximum durability and pet resistance. The tighter 17x20 weave provides 48% airflow while standing up to claws, paws, and daily wear. The most popular upgrade for homes with pets.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-xs font-display rounded">Most Popular</span>
                <span className="px-2 py-0.5 bg-brand-gold/20 text-brand-blue text-xs font-display rounded">Pet Resistant</span>
              </div>
            </div>

            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="font-display text-base text-brand-blue mb-1">PVC-Coated Polyester</h4>
              <p className="text-xs font-display text-foreground/40 uppercase tracking-wider mb-3">17 x 20 Weave — White</p>
              <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                Same durability and pet resistance as the charcoal version, with added privacy. The white mesh creates a closed, uniform appearance from the street — ideal for HOA communities that require a neat garage facade.
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-xs font-display rounded">Privacy</span>
                <span className="px-2 py-0.5 bg-brand-gold/20 text-brand-blue text-xs font-display rounded">HOA Friendly</span>
              </div>
            </div>
          </div>

          {/* Frame Colors & Sizes */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <div>
              <h3 className="font-display text-xl text-brand-blue uppercase mb-4">Frame Colors</h3>
              <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <p className="text-sm text-foreground/60 mb-4">
                  All frames are 2&quot; x 2&quot; architectural-grade aluminum with a wet-painted shell finish. Choose the color that best matches your garage door frame and trim.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'White', swatch: 'bg-white border border-gray-200' },
                    { name: 'Sandstone', swatch: 'bg-[#c2b280]' },
                    { name: 'Brown', swatch: 'bg-[#5c4033]' },
                    { name: 'Black', swatch: 'bg-black' },
                  ].map((color) => (
                    <div key={color.name} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded ${color.swatch}`} />
                      <span className="text-sm font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-foreground/40 mt-3">* Black frames available only with 17x20 PVC-Coated Polyester screen</p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl text-brand-blue uppercase mb-4">Available Sizes</h3>
              <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <p className="text-sm text-foreground/60 mb-4">
                  Standard sizes cover most residential garage openings. Custom sizes available from existing kits.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-silver/20">
                        <th className="text-left font-display text-xs text-brand-blue uppercase py-2 pr-4">Width</th>
                        <th className="text-left font-display text-xs text-brand-blue uppercase py-2">Available Heights</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lifestyleSizes.map((row) => (
                        <tr key={row.width} className="border-b border-brand-silver/10 last:border-0">
                          <td className="py-2 pr-4 font-medium text-foreground/70">{row.width}</td>
                          <td className="py-2 text-foreground/60">{row.heights}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <h3 className="font-display text-xl text-brand-blue uppercase mb-4">Accessories</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-12">
            {[
              { name: 'Pet Keeper', desc: 'Reinforced bottom panel to prevent pets from pushing through the screen mesh.' },
              { name: 'Lift Assist Pole', desc: 'Extendable pole for easy screen raising without bending — ideal for taller installations.' },
              { name: 'Retractable Locks', desc: 'Built-in locking mechanism for added security when the screen is in the down position.' },
              { name: 'Frame Locks', desc: 'Secure the screen frame to the garage opening for wind resistance and theft deterrence.' },
            ].map((acc) => (
              <div key={acc.name} className="surface-elevated border border-brand-silver/20 rounded-lg p-4 gleam">
                <h4 className="font-display text-sm text-brand-blue mb-1">{acc.name}</h4>
                <p className="text-xs text-foreground/50 leading-relaxed">{acc.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-y border-brand-silver/20 mb-12">
            <Image src="/images/logos/partners/made-in-usa-badge.jpg" alt="Made in the USA" width={60} height={60} className="opacity-80 hover:opacity-100 transition-opacity" />
            <Image src="/images/logos/partners/ida-logo.png" alt="International Door Association member" width={100} height={50} className="opacity-80 hover:opacity-100 transition-opacity" />
            <Image src="/images/logos/partners/lifestyle-screens-green-logo.png" alt="Lifestyle Screens authorized dealer" width={140} height={40} className="opacity-80 hover:opacity-100 transition-opacity" />
            <Image src="/images/logos/partners/mystic-motorized-logo.png" alt="Mystic Motorized Screens" width={120} height={40} className="opacity-80 hover:opacity-100 transition-opacity" />
          </div>

          {/* Warranty + Registration CTA */}
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-brand-blue" />
                <h3 className="font-display text-lg text-brand-blue">Lifetime Limited Warranty</h3>
              </div>
              <p className="text-sm text-foreground/60">
                All Lifestyle Screen products are backed by a Limited Lifetime Warranty covering defects in material and workmanship for the life of original ownership.
              </p>
            </div>
            <a
              href="https://www.lifestylescreens.com/warranty-registration.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-display text-sm uppercase tracking-wider rounded-lg hover:bg-brand-blue/90 transition-colors shrink-0 gloss-button"
            >
              Register Warranty <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* MOTORIZED SCREENS */}
      <section className="py-20 surface-matte">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Image
              src="/images/logos/partners/mystic-motorized-logo.png"
              alt="Mystic Motorized Screens"
              width={200}
              height={60}
              className="shrink-0"
            />
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-brand-gold mb-1">
                <Smartphone className="w-4 h-4" /> Premium Upgrade
              </span>
              <h2 className="font-display text-3xl text-brand-blue uppercase">Motorized Retractable Screens</h2>
            </div>
          </div>

          <p className="text-foreground/60 max-w-2xl mx-auto text-center mb-10">
            One-touch operation for the ultimate convenience. Motorized screens disappear completely into a compact housing when not in use — perfect for homeowners who want effortless control.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <h3 className="font-display text-lg text-brand-blue mb-3">Key Features</h3>
              <div className="space-y-3">
                {[
                  'Remote control and wall-switch operation',
                  'Quiet, smooth motor with soft start/stop',
                  'Auto-retract wind sensor available',
                  'Compact headbox housing — flush mount or surface mount',
                  'Side-track zipper guide for wind resistance',
                  'Integrates with smart home systems',
                ].map((feat) => (
                  <div key={feat} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/70">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
              <h3 className="font-display text-lg text-brand-blue mb-3">Best For</h3>
              <div className="space-y-4">
                {[
                  { title: 'Large openings', desc: 'Motorized systems handle wider spans more easily than manual spring-loaded options.' },
                  { title: 'Frequent use', desc: 'If you raise and lower your screen multiple times a day, motorized saves effort and extends screen life.' },
                  { title: 'Accessibility', desc: 'No bending or reaching required — ideal for homeowners with mobility considerations.' },
                  { title: 'Smart home integration', desc: 'Program schedules, connect to voice assistants, or trigger based on weather sensors.' },
                ].map((item) => (
                  <div key={item.title}>
                    <h4 className="text-sm font-medium text-foreground/80">{item.title}</h4>
                    <p className="text-xs text-foreground/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* SCREEN ENCLOSURES */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-brand-blue uppercase mb-3">Screen Enclosures</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Go beyond the garage opening. Custom aluminum screen enclosures extend your screened-in living space to patios, porches, carports, and breezeways — built with the same commercial-grade materials.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              {
                title: 'Patio Enclosures',
                desc: 'Convert open patios into bug-free outdoor living rooms. Aluminum frame with screen panels customized to your exact dimensions.',
                features: ['Custom sizing', 'Multiple mesh options', 'Door included'],
              },
              {
                title: 'Porch Screens',
                desc: 'Screen in your front or back porch without blocking the view. Enjoy morning coffee or evening gatherings without insect interference.',
                features: ['Full visibility', 'Natural airflow', 'Powder-coated frames'],
              },
              {
                title: 'Carport & Breezeway',
                desc: 'Protect vehicles and storage areas from debris while maintaining ventilation. Commercial-grade construction rated for seasonal weather.',
                features: ['Large span capability', 'Wind-rated panels', 'Drive-through options'],
              },
            ].map((enc) => (
              <div key={enc.title} className="surface-elevated border border-brand-silver/20 rounded-lg p-6 gleam">
                <h3 className="font-display text-lg text-brand-blue mb-2">{enc.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{enc.desc}</p>
                <div className="space-y-2">
                  {enc.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-blue" />
                      <span className="text-xs text-foreground/60">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-lg p-6">
            <h3 className="font-display text-lg text-brand-blue mb-2">Enclosure Materials</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Screen enclosure components are built from aluminum extrusions available in white, brown, and sandstone finishes. Screen material is available in rolls or by linear foot, giving us the flexibility to build to any custom dimension. All enclosures are designed and assembled on-site for a precise fit.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* USE CASES */}
      <section className="py-20 surface-matte">
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

      {/* REAL INSTALLATIONS GALLERY */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-6">Real Installations</h2>
          <p className="text-foreground/60 mb-6">From frame assembly to finished product — see our screen door installations across the Piedmont Triad.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 mb-12">
            {[
              { src: '/images/portfolio/screens/tngd-tech-screen-panel-assembly-nc.jpg', alt: 'TNGD technician assembling garage screen panel' },
              { src: '/images/portfolio/screens/screen-door-frame-assembly-tngd-truck-nc.jpg', alt: 'Screen door frame assembly with TNGD truck' },
              { src: '/images/portfolio/screens/screen-door-install-progress-man-cave-nc.jpg', alt: 'Screen door installation in progress' },
              { src: '/images/portfolio/screens/retractable-screen-door-completed-beige-house-nc.jpg', alt: 'Completed retractable screen on beige house' },
              { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-1.jpg', alt: 'Retractable mesh garage screen door' },
              { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-2.jpg', alt: 'Retractable screen installation Piedmont Triad NC' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* DOWNLOADABLE BROCHURES */}
      <section className="py-16 surface-matte">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-brand-blue uppercase mb-2">Product Brochures &amp; Catalogs</h2>
          <p className="text-sm text-foreground/60 mb-8">Download detailed product information, specification sheets, and catalogs. All documents are in PDF format.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brochures.map((doc) => (
              <a
                key={doc.file}
                href={doc.file}
                download
                className="surface-elevated border border-brand-silver/20 rounded-lg p-5 gleam hover:border-brand-blue/30 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue/10 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm text-brand-blue mb-1">{doc.title}</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed mb-2">{doc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-red group-hover:text-red-700 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* COMPATIBILITY NOTE */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-6 gleam">
            <h3 className="font-display text-lg text-brand-blue mb-2">Compatibility Note</h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-3">
              Lifestyle Screens work with most standard, high-lift, and wind-loaded garage door configurations. They are <strong className="text-foreground/80">not compatible</strong> with low-headroom / double-horizontal-track systems.
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Not sure about your setup? We provide a free on-site measurement and compatibility check before recommending any product.
            </p>
          </div>
        </div>
      </section>

      <div className="divider-gleam" />

      {/* INSTALLATION PROCESS + FAQ */}
      <section className="py-16 surface-matte">
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

          <div className="text-center space-y-3">
            <CTAButton text="Get Screen Quote" variant="primary" />
            <p className="text-xs text-foreground/40">
              See also: <Link href="/warranty" className="text-brand-blue hover:text-brand-red transition-colors underline">Warranty Information</Link> — includes Lifestyle Screens warranty documents and registration.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
