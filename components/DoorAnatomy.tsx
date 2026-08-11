'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Wrench, CheckCircle, Calendar, ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getComponentsForView,
  URGENCY_LABELS,
  VIEW_LABELS,
  type DoorComponent,
  type UrgencyLevel,
  type DiagramView,
} from '@/lib/door-components';

const URGENCY_ICONS = {
  danger: AlertTriangle,
  wear: Wrench,
  serviceable: CheckCircle,
};

interface HotspotDot {
  id: string;
  x: number;
  y: number;
}

const TORSION_HOTSPOTS: HotspotDot[] = [
  // Spring system — shaft at ~y:10-12, spring coil centered on shaft
  { id: 'cable-drum', x: 7, y: 11 },
  { id: 'torsion-shaft', x: 50, y: 10 },
  { id: 'torsion-spring', x: 42, y: 12 },
  { id: 'winding-cone', x: 52, y: 12 },
  { id: 'stationary-cone', x: 35, y: 13 },
  { id: 'center-bearing', x: 50, y: 14 },
  { id: 'end-bearing', x: 90, y: 10 },

  // Door body — 5 panel sections, windows on top section
  { id: 'strut', x: 50, y: 21 },
  { id: 'top-bracket', x: 8, y: 22 },
  { id: 'glass-section', x: 50, y: 30 },
  { id: 'panel-section', x: 50, y: 55 },
  { id: 'slide-lock', x: 55, y: 60 },
  { id: 'bottom-seal', x: 50, y: 96 },
  { id: 'bottom-bracket', x: 6, y: 92 },
  { id: 'lift-cable', x: 5, y: 32 },

  // Hinges — diamond shapes between panel sections
  { id: 'hinge-3', x: 50, y: 38 },
  { id: 'hinge-2', x: 50, y: 53 },
  { id: 'hinge-1', x: 50, y: 76 },

  // Roller — in the vertical track on left side
  { id: 'roller', x: 4, y: 45 },

  // Track system — left side vertical, curves to horizontal at ceiling
  { id: 'vertical-track', x: 3, y: 62 },
  { id: 'horizontal-track', x: 30, y: 6 },
  { id: 'radius-track', x: 5, y: 16 },
  { id: 'flag-bracket', x: 4, y: 19 },
  { id: 'jamb-bracket', x: 3, y: 50 },

  // Support hardware — upper area bracket structure
  { id: 'back-hang', x: 75, y: 6 },
  { id: 'rear-hang', x: 85, y: 5 },
];

const EXTENSION_HOTSPOTS: HotspotDot[] = [
  // Extension spring system (right half of comparison diagram)
  { id: 'extension-spring', x: 70, y: 24 },
  { id: 'safety-cable', x: 78, y: 20 },
  { id: 'ext-pulley', x: 45, y: 34 },
  { id: 's-hook', x: 56, y: 22 },
  { id: 'ext-rear-bracket', x: 88, y: 18 },
  { id: 'ext-lift-cable', x: 14, y: 48 },

  // Torsion spring for comparison (left half)
  { id: 'torsion-spring', x: 20, y: 28 },

  // Shared door hardware — essential context only
  { id: 'panel-section', x: 30, y: 72 },
  { id: 'roller', x: 12, y: 60 },
  { id: 'bottom-bracket', x: 14, y: 86 },
  { id: 'vertical-track', x: 10, y: 68 },
  { id: 'horizontal-track', x: 50, y: 14 },
];

const DIAGRAM_IMAGES: Record<DiagramView, { src: string; alt: string; width: number; height: number }> = {
  torsion: {
    src: '/images/diagrams/torsion-spring-system-diagram.jpg',
    alt: 'Residential garage door torsion spring system — double-wide raised panel interior view showing springs, shaft, drums, hinges, tracks, and hardware',
    width: 1000,
    height: 1000,
  },
  extension: {
    src: '/images/diagrams/extension-spring-diagram.png',
    alt: 'Garage door extension spring system — comparison diagram showing spring placement along horizontal track with pulleys and safety cables',
    width: 1024,
    height: 605,
  },
};

function InfoPanel({ component, onClose }: { component: DoorComponent; onClose: () => void }) {
  const urgency = URGENCY_LABELS[component.urgency];
  const Icon = URGENCY_ICONS[component.urgency];
  const imgSrc = component.imageUrl || '/images/logos/tngd-logo-badge.png';

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
      className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-w-md w-full">
      {/* Product Image */}
      <div className="relative h-36 bg-gray-50 flex items-center justify-center border-b border-gray-100">
        <Image
          src={imgSrc}
          alt={component.name}
          width={component.imageUrl ? 200 : 80}
          height={component.imageUrl ? 120 : 80}
          className="object-contain max-h-32"
          style={{ opacity: component.imageUrl ? 1 : 0.3 }}
        />
        {!component.imageUrl && (
          <span className="absolute bottom-2 text-[10px] text-gray-300 font-display uppercase tracking-wider">
            Product image coming soon
          </span>
        )}
      </div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-gray-900 leading-tight">{component.name}</h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${urgency.color}15`, color: urgency.color }}>
              <Icon className="w-3 h-3" />{urgency.label}
            </span>
            <span className="text-xs text-gray-400 font-mono">{component.partNumber}</span>
          </div>
        </div>
        <button onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">{component.description}</p>
        {component.friendlyTip && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
            <p className="text-xs font-semibold text-amber-700 mb-0.5">Homeowner Tip</p>
            <p className="text-sm text-amber-800 leading-relaxed">{component.friendlyTip}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        {component.urgency === 'danger' ? (
          <div className="space-y-3">
            <p className="text-xs text-red-600 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Professional service only — do not attempt adjustment or removal.
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-red-700 transition-colors">
              <Calendar className="w-4 h-4" />Schedule Service<ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <Link href="/book"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white text-sm font-display uppercase tracking-wider rounded-lg hover:bg-blue-900 transition-colors">
            <Calendar className="w-4 h-4" />Get a Free Estimate<ChevronRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function HotspotDotElement({
  dot,
  component,
  isActive,
  onSelect,
}: {
  dot: HotspotDot;
  component: DoorComponent;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const urgColor = URGENCY_LABELS[component.urgency].color;

  return (
    <button
      onClick={() => onSelect(dot.id)}
      className="absolute z-10 group"
      style={{
        left: `${dot.x}%`,
        top: `${dot.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-label={component.name}
    >
      {/* Pulse ring on active */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: urgColor,
            opacity: 0.25,
            width: '28px',
            height: '28px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Outer glow on hover */}
      <span
        className="absolute rounded-full transition-all duration-200 group-hover:scale-150 group-hover:opacity-30"
        style={{
          width: '24px',
          height: '24px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: urgColor,
          opacity: isActive ? 0.3 : 0,
        }}
      />

      {/* Dot */}
      <span
        className="relative block rounded-full border-2 transition-all duration-200 group-hover:scale-125"
        style={{
          width: isActive ? '16px' : '12px',
          height: isActive ? '16px' : '12px',
          backgroundColor: isActive ? urgColor : 'white',
          borderColor: urgColor,
          boxShadow: isActive
            ? `0 0 12px ${urgColor}80, 0 2px 8px rgba(0,0,0,0.3)`
            : '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Tooltip on hover (not active) */}
      {!isActive && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-900 text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          {component.name}
        </span>
      )}
    </button>
  );
}

export default function DoorAnatomy() {
  const [view, setView] = useState<DiagramView>('torsion');
  const [activeId, setActiveId] = useState<string | null>(null);

  const components = getComponentsForView(view);
  const componentMap = new Map(components.map(c => [c.id, c]));
  const selected = activeId ? componentMap.get(activeId) ?? null : null;
  const hotspots = view === 'torsion' ? TORSION_HOTSPOTS : EXTENSION_HOTSPOTS;
  const diagramImage = DIAGRAM_IMAGES[view];

  const handleSelect = useCallback((id: string) => {
    setActiveId(prev => prev === id ? null : id);
  }, []);

  return (
    <section className="scroll-mt-24">
      {/* Section header */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-display uppercase tracking-widest text-brand-blue">Interactive Reference</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
            Garage Door <span className="text-brand-red">Anatomy</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Identify every component of a residential garage door system. Two dedicated diagrams
            isolate the <strong>torsion spring</strong> and <strong>extension spring</strong> systems
            so you can tell our office exactly what you&apos;re looking at — or confirm what needs
            attention before we arrive.
          </p>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[16/10]">
          <Image src="/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg"
            alt="Garage door interior components" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent" />
        </div>
      </div>

      {/* 2-tab system selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {(['torsion', 'extension'] as DiagramView[]).map(v => {
          const vl = VIEW_LABELS[v];
          const isActive = view === v;
          return (
            <button key={v} onClick={() => { setView(v); setActiveId(null); }}
              className={`px-6 py-3 rounded-lg text-sm font-display uppercase tracking-wider transition-all duration-200 border-2 ${
                isActive ? 'text-white shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { backgroundColor: vl.color, borderColor: vl.color } : undefined}
            >
              <span className="block">{vl.label}</span>
              <span className={`block text-[10px] mt-0.5 font-normal normal-case tracking-normal ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                {vl.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {(Object.entries(URGENCY_LABELS) as [UrgencyLevel, typeof URGENCY_LABELS['danger']][]).map(([key, val]) => {
          const Ic = URGENCY_ICONS[key];
          return (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: val.color }} />
              <Ic className="w-3.5 h-3.5" style={{ color: val.color }} />
              <span className="text-gray-600">{val.label}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white" />
          Click any dot for details
        </div>
      </div>

      {/* Diagram + Panel */}
      <div className="relative flex flex-col lg:flex-row gap-6 items-start">
        {/* Image diagram with hotspot dots */}
        <div className="flex-1 min-w-0 relative">
          <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {/* Diagram image */}
            <div className="relative w-full" style={{ aspectRatio: `${diagramImage.width} / ${diagramImage.height}` }}>
              <Image
                src={diagramImage.src}
                alt={diagramImage.alt}
                fill
                className="object-contain"
                style={{ imageRendering: 'auto' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 500px"
                priority
              />

              {/* Hotspot dots overlay */}
              {hotspots.map(dot => {
                const comp = componentMap.get(dot.id);
                if (!comp) return null;
                return (
                  <HotspotDotElement
                    key={dot.id}
                    dot={dot}
                    component={comp}
                    isActive={activeId === dot.id}
                    onSelect={handleSelect}
                  />
                );
              })}
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-2">
            {components.length} interactive components — hover for names, click for details
          </p>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-96 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            {selected ? (
              <InfoPanel key={selected.id} component={selected} onClose={() => setActiveId(null)} />
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="border border-dashed border-gray-300 rounded-xl p-8 text-center"
                style={{ backgroundColor: `${VIEW_LABELS[view].color}08` }}>
                <Wrench className="w-10 h-10 mx-auto mb-3" style={{ color: VIEW_LABELS[view].color, opacity: 0.4 }} />
                <p className="text-sm text-gray-500 font-medium">Click any component dot</p>
                <p className="text-xs text-gray-400 mt-1">{components.length} parts in this view</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
