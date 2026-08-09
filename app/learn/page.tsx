import Link from 'next/link';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import DoorAnatomy from '@/components/DoorAnatomy';
import SpringCalculator from '@/components/SpringCalculator';
import NoiseDiagnostic from '@/components/NoiseDiagnostic';
import MaintenanceChecklist from '@/components/MaintenanceChecklist';
import HighLiftReference from '@/components/HighLiftReference';
import VideoLibrary from '@/components/VideoLibrary';
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
} from 'lucide-react';

export const metadata = genMeta({
  title: 'Technical Resource Center — Interactive Tools, Diagrams & Expert Guides',
  description:
    'Professional-grade garage door reference tools: interactive anatomy diagram, DASMA spring calculator, noise diagnostic wizard, 21-point maintenance checklist, high-lift conversion guide, and curated video library. Built by TNGD technicians for industry pros and informed homeowners.',
  path: '/learn',
  keywords: [
    'garage door spring calculator',
    'garage door anatomy diagram',
    'torsion spring IPPT calculator',
    'garage door noise diagnosis',
    'garage door maintenance checklist',
    'high lift conversion guide',
    'garage door technical reference',
    'DASMA spring formula',
    'garage door parts diagram',
    'garage door troubleshooting',
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
      {/* Hero with background image */}
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
              Interactive tools, DASMA-standard calculators, and technical references built by
              working technicians. Whether you&apos;re a seasoned installer, an apprentice, or
              a homeowner who wants to understand what&apos;s behind the wall — this is your resource.
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

      {/* Section quick-nav — color-coded */}
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

      {/* ═══ DOOR ANATOMY — Blue accent ═══ */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-brand-blue via-brand-blue/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DoorAnatomy />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ SPRING CALCULATOR — Red accent, springs background ═══ */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
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
          <SpringCalculator />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ NOISE DIAGNOSTIC — Amber accent ═══ */}
      <section className="py-16 sm:py-20 relative bg-gradient-to-br from-amber-50/30 to-transparent">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NoiseDiagnostic />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ MAINTENANCE CHECKLIST — Green accent, track background ═══ */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
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
          <MaintenanceChecklist />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ HIGH-LIFT REFERENCE — Purple accent ═══ */}
      <section className="py-16 sm:py-20 relative bg-gradient-to-br from-violet-50/30 to-transparent">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-violet-500 via-violet-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HighLiftReference />
        </div>
      </section>

      <div className="divider-gleam" />

      {/* ═══ VIDEO LIBRARY — Red accent, opener background ═══ */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
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
          <VideoLibrary />
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
        </div>
      </section>

      <div className="divider-gleam" />

      {/* Why We Educate — with image accent */}
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

      <div className="divider-gleam" />

      {/* Blog link */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-xl text-brand-blue uppercase mb-3">
            Want to Browse Everything?
          </h2>
          <p className="text-foreground/50 text-sm mb-5">
            Our full blog has every article in chronological order.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider text-brand-blue hover:text-brand-red transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            View All Articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
