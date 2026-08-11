'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, ArrowUpRight, Calendar, ChevronRight, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ConversionType {
  id: string;
  name: string;
  description: string;
  trackConfig: string;
  bestFor: string;
  headroomRequired: string;
  drumSize: string;
  springAdjustment: string;
  proDifficulty: 'experienced' | 'advanced' | 'expert';
}

const CONVERSION_TYPES: ConversionType[] = [
  {
    id: 'standard-to-highlift',
    name: 'Standard to High-Lift',
    description: 'Extends the vertical track upward before the radius turn and horizontal run. The door travels higher along the wall before going horizontal, freeing ceiling space in front of the door.',
    trackConfig: 'Extended vertical sections + raised horizontal track. The radius section moves up, and longer vertical track sections are installed between the existing vertical and the new radius height.',
    bestFor: 'Garages with tall ceilings (10–14\') where you want to recover ceiling space for car lifts, storage systems, or overhead hoists. Most common conversion we perform.',
    headroomRequired: 'Minimum ceiling height = door height + high-lift rise + 18" clearance. Example: 7\' door + 3\' high-lift = 10\' minimum ceiling.',
    drumSize: 'High-lift 400 series (standard 4" drums) for rises up to ~42". High-lift 525 series (5.25" drums) for rises of 42–60". High-lift 600 series (6" drums) for rises above 60".',
    springAdjustment: 'Springs must be completely recalculated. Cable travel increases, requiring different IPPT and turn counts. Double-spring (duplex) setups are standard on high-lift conversions.',
    proDifficulty: 'advanced',
  },
  {
    id: 'standard-to-vertical',
    name: 'Standard to Vertical Lift',
    description: 'Eliminates the horizontal track entirely. The door travels straight up along the wall and stops in a vertical position above the opening. Maximum ceiling clearance — the door never goes horizontal.',
    trackConfig: 'Vertical track only — no horizontal run, no radius section. Track extends straight up from the floor to full door height above the opening. Requires counter-balance system modifications.',
    bestFor: 'Commercial applications, warehouses, fire stations, or residential garages with very tall ceilings (14\'+) where full ceiling access is needed. Also used where the ceiling is obstructed (pipes, HVAC, beams).',
    headroomRequired: 'Minimum ceiling height = 2× door height + 18". Example: 7\' door requires 14\'6" minimum ceiling. This is the most space-demanding configuration.',
    drumSize: 'Standard 4" drums with modified cable wrap. Vertical lift uses the same drum diameter but different cable routing — the cable wraps in a single layer since travel distance equals door height exactly.',
    springAdjustment: 'Complete spring system redesign. Torque requirements change significantly because the weight distribution curve is different — a vertical-lift door maintains constant cable tension throughout travel.',
    proDifficulty: 'expert',
  },
  {
    id: 'standard-to-follow-roof',
    name: 'High-Lift with Roof Pitch',
    description: 'The horizontal track follows the pitch of the roof instead of running level. Used when the garage ceiling follows the roof slope and there is no flat ceiling to run horizontal track along.',
    trackConfig: 'Angled horizontal track that matches the roof pitch. The radius section transitions from vertical to the angled run. Track hangers are progressively shorter as the track climbs toward the peak.',
    bestFor: 'Garages with vaulted or cathedral ceilings where the ceiling follows the roofline. Common in newer construction and converted barns.',
    headroomRequired: 'Varies with roof pitch. Generally needs less total height than high-lift because the track follows the existing slope. Minimum 12" between the lowest point of the horizontal run and the door opening.',
    drumSize: 'Standard 4" drums in most cases. The cable travel is slightly longer due to the angled run, but the difference is usually within standard drum capacity.',
    springAdjustment: 'Springs need recalculation for the modified cable geometry. The angled track changes the effective weight the spring sees throughout the travel arc.',
    proDifficulty: 'advanced',
  },
  {
    id: 'low-headroom',
    name: 'Low-Headroom Conversion',
    description: 'For garages with minimal clearance above the door opening. The standard approach uses quick-turn brackets that replace the radius section, allowing the door to transition from vertical to horizontal in as little as 4.5" of headroom. Rear-mount torsion spring setups exist but are rare and reserved for specific situations where quick-turn brackets alone cannot solve the clearance problem.',
    trackConfig: 'Quick-turn brackets are the primary solution — they replace the standard radius section and allow the door to make an abrupt transition from vertical to horizontal track. Some systems use a double-track where the top section rides on a separate track. Rear torsion mount (spring behind horizontal track) is a specialized option used only when front-mount clearance is impossible.',
    bestFor: 'Existing garages with less than 12" of headroom above the door. Common in older homes, finished garages, and garages with low ceilings where a standard installation won\'t fit.',
    headroomRequired: 'As little as 4.5" with quick-turn brackets (vs. standard 12–15"). Rear-mount spring systems, when necessary, need 6–8" but are rarely required.',
    drumSize: 'Standard 4" drums. Low-headroom conversions don\'t change the cable travel distance — they change where the spring and track fit in the available space.',
    springAdjustment: 'Standard spring sizing calculations apply. Quick-turn brackets don\'t affect spring specs — only the track geometry changes. In the rare case of a rear-mount setup, the spring is repositioned behind the horizontal track, changing hardware layout but not spring sizing.',
    proDifficulty: 'experienced',
  },
];

const DIFFICULTY_CONFIG = {
  experienced: { label: 'Experienced', color: '#d97706' },
  advanced: { label: 'Advanced', color: '#dc2626' },
  expert: { label: 'Expert', color: '#991b1b' },
};

interface MeasurementItem {
  label: string;
  how: string;
  why: string;
}

const MEASUREMENTS: MeasurementItem[] = [
  {
    label: 'Door Width',
    how: 'Measure the inside of the opening at the widest point, jamb to jamb.',
    why: 'Determines track and spring hardware sizing.',
  },
  {
    label: 'Door Height',
    how: 'Measure from the floor to the top of the door opening (bottom of the header).',
    why: 'Determines cable travel, spring turns, and track length.',
  },
  {
    label: 'Headroom',
    how: 'Measure from the top of the door opening straight up to the nearest ceiling obstruction (joist, beam, duct).',
    why: 'Determines whether standard, low-headroom, or high-lift hardware is needed.',
  },
  {
    label: 'Ceiling Height',
    how: 'Measure from the floor to the ceiling at the door opening and at the deepest point of the garage.',
    why: 'Determines maximum high-lift rise and whether vertical lift is feasible.',
  },
  {
    label: 'Backroom (Depth)',
    how: 'Measure from the inside face of the header straight back into the garage to the nearest wall or obstruction.',
    why: 'Must be at least equal to the door height for horizontal track, or twice the door height for vertical lift.',
  },
  {
    label: 'Sideroom',
    how: 'Measure from the edge of the door opening to the nearest wall or obstruction on each side.',
    why: 'Standard torsion systems need 3.75" minimum each side. Extension springs need 10" each side.',
  },
];

export default function HighLiftReference() {
  const [activeType, setActiveType] = useState<string>(CONVERSION_TYPES[0].id);
  const active = CONVERSION_TYPES.find(t => t.id === activeType)!;
  const diff = DIFFICULTY_CONFIG[active.proDifficulty];

  function renderTrackDiagram(configType: string, isActive: boolean) {
    const strokeColor = isActive ? '#002868' : '#9ca3af';
    const fillColor = isActive ? '#002868' : '#d1d5db';
    const doorColor = isActive ? '#bf0a30' : '#b0b5bb';
    const accentColor = isActive ? '#ffbd59' : '#d1d5db';

    const shared = (
      <>
        <line x1="20" y1="120" x2="180" y2="120" stroke={strokeColor} strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2="120" stroke={strokeColor} strokeWidth="2" />
        <rect x="62" y="50" width="8" height="70" fill={doorColor} rx="1" />
      </>
    );

    if (configType === 'standard-to-highlift') {
      return (
        <svg viewBox="0 0 200 140" className="w-full h-20">
          {shared}
          <line x1="72" y1="50" x2="72" y2="28" stroke={accentColor} strokeWidth="2.5" />
          <path d="M 72 28 Q 72 18 82 18" fill="none" stroke={accentColor} strokeWidth="2.5" />
          <line x1="82" y1="18" x2="170" y2="18" stroke={accentColor} strokeWidth="2.5" />
          <path d="M 72 50 Q 72 42 82 42" fill="none" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="82" y1="42" x2="170" y2="42" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          <line x1="50" y1="42" x2="50" y2="18" stroke={fillColor} strokeWidth="1" markerEnd="url(#arrowHL)" />
          <text x="38" y="32" fill={fillColor} fontSize="8" fontFamily="system-ui" textAnchor="middle">Rise</text>
          <defs><marker id="arrowHL" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto"><path d={`M 0 0 L 6 2 L 0 4 Z`} fill={fillColor} /></marker></defs>
          {[100, 130, 160].map(x => <line key={x} x1={x} y1="10" x2={x} y2="18" stroke={accentColor} strokeWidth="1" />)}
        </svg>
      );
    }

    if (configType === 'standard-to-vertical') {
      return (
        <svg viewBox="0 0 200 140" className="w-full h-20">
          {shared}
          <line x1="72" y1="50" x2="72" y2="8" stroke={accentColor} strokeWidth="2.5" />
          <rect x="74" y="8" width="8" height="42" fill={doorColor} rx="1" opacity="0.3" />
          <line x1="50" y1="50" x2="50" y2="8" stroke={fillColor} strokeWidth="1" markerEnd="url(#arrowVL)" />
          <text x="40" y="30" fill={fillColor} fontSize="7" fontFamily="system-ui" textAnchor="middle" transform="rotate(-90 40 30)">Full Height</text>
          <defs><marker id="arrowVL" markerWidth="6" markerHeight="4" refX="3" refY="2" orient="auto"><path d={`M 0 0 L 6 2 L 0 4 Z`} fill={fillColor} /></marker></defs>
        </svg>
      );
    }

    if (configType === 'standard-to-follow-roof') {
      return (
        <svg viewBox="0 0 200 140" className="w-full h-20">
          {shared}
          {/* Roof line — from above door opening, angling up to back of garage */}
          <line x1="60" y1="45" x2="180" y2="12" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Radius curve from vertical to angled track */}
          <path d="M 72 50 Q 72 42 80 40" fill="none" stroke={accentColor} strokeWidth="2.5" />
          {/* Angled track following the roof pitch — parallel to roof line */}
          <line x1="80" y1="40" x2="170" y2="17" stroke={accentColor} strokeWidth="2.5" />
          {/* Pitch angle indicator */}
          <path d="M 90 38 L 108 38" fill="none" stroke={fillColor} strokeWidth="0.8" />
          <path d="M 90 38 L 106 33.5" fill="none" stroke={fillColor} strokeWidth="0.8" />
          <text x="112" y="40" fill={fillColor} fontSize="7" fontFamily="system-ui">pitch</text>
          {/* Hangers from roof to track — decreasing length as track approaches roof */}
          {[100, 130, 160].map((x) => {
            const trackY = 40 - ((x - 80) / (170 - 80)) * 23;
            const roofY = 45 - ((x - 60) / (180 - 60)) * 33;
            return <line key={x} x1={x} y1={roofY + 1} x2={x} y2={trackY} stroke={accentColor} strokeWidth="1" />;
          })}
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 200 140" className="w-full h-20">
        {shared}
        <line x1="20" y1="42" x2="180" y2="42" stroke={strokeColor} strokeWidth="1.5" />
        <text x="170" y="38" fill={strokeColor} fontSize="6" fontFamily="system-ui" textAnchor="end">ceiling</text>
        <path d="M 72 50 L 72 44 L 82 44" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="82" y1="44" x2="170" y2="44" stroke={accentColor} strokeWidth="2.5" />
        <line x1="78" y1="42" x2="78" y2="50" stroke={fillColor} strokeWidth="0.8" />
        <text x="86" y="57" fill={fillColor} fontSize="6" fontFamily="system-ui">4.5″ min</text>
      </svg>
    );
  }

  return (
    <section id="high-lift-reference" className="scroll-mt-24">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
          High-Lift & Track Conversion Reference
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Technical reference for track conversion configurations — what they are, when each applies,
          and the measurements needed for a proper assessment.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          Track conversions modify the spring system, cable routing, and structural mounting.
          Every conversion requires a professional on-site assessment and custom hardware specification.
          These descriptions are educational — not installation guides.
        </div>
      </div>

      {/* Track Configuration Visual */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CONVERSION_TYPES.map(type => {
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`relative rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                isActive ? 'border-brand-blue shadow-lg' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-3 ${isActive ? 'bg-brand-blue/5' : 'bg-white'}`}>
                {renderTrackDiagram(type.id, isActive)}
                <p className={`text-xs font-display mt-2 text-center ${isActive ? 'text-brand-blue' : 'text-gray-600'}`}>
                  {type.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active conversion detail */}
      <motion.div
        key={activeType}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpRight className="w-5 h-5 text-brand-blue" />
              <h3 className="font-display text-xl text-gray-900">{active.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{active.description}</p>
          </div>
          <span
            className="px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
            style={{ backgroundColor: `${diff.color}15`, color: diff.color }}
          >
            {diff.label}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-100">
          <div className="bg-white p-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Track Configuration</h4>
            <p className="text-sm text-gray-600">{active.trackConfig}</p>
          </div>
          <div className="bg-white p-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Best For</h4>
            <p className="text-sm text-gray-600">{active.bestFor}</p>
          </div>
          <div className="bg-white p-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Headroom Required</h4>
            <p className="text-sm text-gray-600">{active.headroomRequired}</p>
          </div>
          <div className="bg-white p-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cable Drum Sizing</h4>
            <p className="text-sm text-gray-600">{active.drumSize}</p>
          </div>
          <div className="bg-white p-5 md:col-span-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Spring System Impact</h4>
            <p className="text-sm text-gray-600">{active.springAdjustment}</p>
          </div>
        </div>
      </motion.div>

      {/* Measurement Guide */}
      <div className="mt-12">
        <h3 className="font-display text-2xl text-brand-blue mb-2 text-center">
          Critical Measurements for Conversion Assessment
        </h3>
        <p className="text-gray-500 text-sm text-center mb-6 max-w-xl mx-auto">
          Have these measurements ready before requesting a high-lift or conversion estimate.
          Accuracy within ¼&quot; matters — these determine which hardware configurations will work.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEASUREMENTS.map((m, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-4 h-4 text-brand-blue" />
                <h4 className="font-display text-sm text-gray-900">{m.label}</h4>
              </div>
              <p className="text-xs text-gray-600 mb-2"><strong className="text-gray-700">How:</strong> {m.how}</p>
              <p className="text-xs text-gray-500"><strong className="text-gray-600">Why:</strong> {m.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 relative overflow-hidden rounded-2xl border-2 border-brand-blue/30 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-[#001a4d] to-brand-blue" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px]" />
        <div className="relative z-10 p-8 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.25em] text-brand-gold mb-3">
            <span className="w-8 h-px bg-brand-gold/50" />
            Free Assessment
            <span className="w-8 h-px bg-brand-gold/50" />
          </div>
          <p className="font-display text-xl md:text-2xl text-white mb-2 uppercase">
            Considering a High-Lift or Track Conversion?
          </p>
          <p className="text-sm text-gray-300 mb-6 max-w-lg mx-auto">
            Our technicians will perform a full on-site measurement, assess structural requirements,
            and provide a detailed specification — all as part of your free estimate.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            Request Conversion Assessment
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
