'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Square,
  AlertTriangle,
  Calendar,
  ChevronRight,
  RotateCcw,
  Printer,
  Shield,
  Phone,
  Eye,
  Wrench,
  Droplets,
  Gauge,
  Ruler,
} from 'lucide-react';
import Link from 'next/link';

interface ChecklistItem {
  id: number;
  category: string;
  task: string;
  detail: string;
  frequency: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  diy: boolean;
}

const CHECKLIST: ChecklistItem[] = [
  { id: 1, category: 'Visual Inspection', task: 'Inspect springs for gaps or stretched coils', detail: 'Look for daylight between coils (torsion) or elongation (extension). Gaps indicate fatigue and impending failure.', frequency: 'monthly', diy: false },
  { id: 2, category: 'Visual Inspection', task: 'Check cables for fraying or wear', detail: 'Run a cloth along each cable — if it snags, fibers are broken. A frayed cable can snap without warning.', frequency: 'monthly', diy: false },
  { id: 3, category: 'Visual Inspection', task: 'Examine rollers for cracks or flat spots', detail: 'Spin each roller by hand. Nylon rollers crack; steel rollers develop flat spots. Either causes noise and track damage.', frequency: 'quarterly', diy: true },
  { id: 4, category: 'Visual Inspection', task: 'Inspect hinges for wear and elongation', detail: 'Check hinge holes — if the roller stem hole has worn oval, the hinge needs replacement. Look for cracks at the bend.', frequency: 'biannual', diy: true },
  { id: 5, category: 'Visual Inspection', task: 'Check weatherseals (bottom, sides, top)', detail: 'Look for cracks, gaps, and sections that no longer make contact. Replace if daylight is visible when the door is closed.', frequency: 'biannual', diy: true },
  { id: 6, category: 'Hardware & Fasteners', task: 'Tighten all hinge bolts', detail: 'Use a socket wrench to snug (not overtighten) every hinge bolt on the door interior. Vibration loosens them over time.', frequency: 'biannual', diy: true },
  { id: 7, category: 'Hardware & Fasteners', task: 'Tighten track mounting hardware', detail: 'Check all lag bolts securing vertical tracks, flag brackets, header brackets, and rear hangers. These carry significant load.', frequency: 'annual', diy: false },
  { id: 8, category: 'Hardware & Fasteners', task: 'Inspect and tighten opener mounting', detail: 'Check motor unit mounting bolts, rail connections, and header bracket. Opener vibration loosens hardware over time.', frequency: 'annual', diy: true },
  { id: 9, category: 'Hardware & Fasteners', task: 'Check bottom bracket cable attachment', detail: 'Visually inspect only — do NOT touch or adjust. Bottom brackets are under extreme spring tension.', frequency: 'quarterly', diy: false },
  { id: 10, category: 'Lubrication', task: 'Lubricate hinge pins with white lithium grease', detail: 'Apply grease at each hinge pivot point where the pin passes through the hinge plate.', frequency: 'biannual', diy: true },
  { id: 11, category: 'Lubrication', task: 'Lubricate roller stems and bearings', detail: 'Apply grease to the roller stem where it enters the hinge. For sealed bearings, apply at the seal edges.', frequency: 'biannual', diy: true },
  { id: 12, category: 'Lubrication', task: 'Lubricate torsion spring coils', detail: 'Spray the full length of each torsion spring with white lithium grease. This prevents corrosion and reduces stress noise.', frequency: 'biannual', diy: true },
  { id: 13, category: 'Lubrication', task: 'Lubricate bearing plates (center and end)', detail: 'Apply grease to both center and end bearing plates where the torsion shaft passes through.', frequency: 'annual', diy: true },
  { id: 14, category: 'Lubrication', task: 'Apply silicone spray to weatherseals', detail: 'Silicone spray keeps rubber and vinyl seals flexible and prevents them from sticking to the floor or frame in cold weather.', frequency: 'biannual', diy: true },
  { id: 15, category: 'Balance & Operation', task: 'Test door balance (manual lift test)', detail: 'Disconnect the opener (pull emergency release). Lift the door halfway — it should hold position within 12 inches. Drifting means the springs are out of balance.', frequency: 'quarterly', diy: true },
  { id: 16, category: 'Balance & Operation', task: 'Test auto-reverse (force test)', detail: 'Place a 2×4 flat on the floor under the door. Close the door — it should reverse upon contacting the board. If it does not, the force settings need adjustment.', frequency: 'monthly', diy: true },
  { id: 17, category: 'Balance & Operation', task: 'Test photo-eye sensors', detail: 'Close the door, then break the beam with your foot. The door should reverse immediately. Clean sensor lenses with a soft cloth.', frequency: 'monthly', diy: true },
  { id: 18, category: 'Balance & Operation', task: 'Test emergency release handle', detail: 'Pull the red handle straight down with the door CLOSED. The door should disconnect from the opener and be manually operable.', frequency: 'quarterly', diy: true },
  { id: 19, category: 'Track & Alignment', task: 'Check vertical tracks for plumb', detail: 'Use a level to verify vertical tracks are plumb. Even 1/4" of misalignment causes binding and premature roller wear.', frequency: 'annual', diy: false },
  { id: 20, category: 'Track & Alignment', task: 'Inspect horizontal tracks for level', detail: 'Horizontal tracks should be level or have a slight rise toward the rear (1/4" per foot). A sag causes the door to drift open.', frequency: 'annual', diy: false },
  { id: 21, category: 'Track & Alignment', task: 'Clean tracks (remove debris)', detail: 'Wipe inside of tracks with a damp cloth. Remove dirt, spider webs, and small debris. Do NOT lubricate the track surface — rollers need friction to ride properly.', frequency: 'quarterly', diy: true },
];

const FREQUENCY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  monthly: { label: 'Monthly', color: '#059669', bg: '#059669' },
  quarterly: { label: 'Quarterly', color: '#2563eb', bg: '#2563eb' },
  biannual: { label: 'Every 6 Months', color: '#d97706', bg: '#d97706' },
  annual: { label: 'Annually', color: '#7c3aed', bg: '#7c3aed' },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Visual Inspection': <Eye className="w-5 h-5" />,
  'Hardware & Fasteners': <Wrench className="w-5 h-5" />,
  'Lubrication': <Droplets className="w-5 h-5" />,
  'Balance & Operation': <Gauge className="w-5 h-5" />,
  'Track & Alignment': <Ruler className="w-5 h-5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Visual Inspection': '#002868',
  'Hardware & Fasteners': '#bf0a30',
  'Lubrication': '#d97706',
  'Balance & Operation': '#059669',
  'Track & Alignment': '#7c3aed',
};

function ProgressRing({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const progressColor = progress === 100 ? '#059669' : progress > 50 ? '#002868' : '#d97706';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-display" style={{ color: progressColor }}>
          {Math.round(progress)}%
        </span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Complete</span>
      </div>
    </div>
  );
}

export default function MaintenanceChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string>('all');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggle = useCallback((id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const resetAll = () => setChecked(new Set());

  const categories = [...new Set(CHECKLIST.map(c => c.category))];
  const filtered = filter === 'all' ? CHECKLIST : CHECKLIST.filter(c => c.frequency === filter);
  const progress = CHECKLIST.length > 0 ? (checked.size / CHECKLIST.length) * 100 : 0;

  const categoryProgress = useMemo(() => {
    const result: Record<string, { total: number; done: number }> = {};
    for (const item of CHECKLIST) {
      if (!result[item.category]) result[item.category] = { total: 0, done: 0 };
      result[item.category].total++;
      if (checked.has(item.id)) result[item.category].done++;
    }
    return result;
  }, [checked]);

  const diyCount = CHECKLIST.filter(c => c.diy).length;
  const proCount = CHECKLIST.filter(c => !c.diy).length;

  return (
    <section id="maintenance-checklist" className="scroll-mt-24">
      {/* Premium header with impact callout */}
      <div className="relative mb-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-display uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            Your First Line of Defense
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
            21-Point Maintenance <span className="text-brand-red">Protocol</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The same inspection protocol our technicians follow on every maintenance visit.
            Track your progress and know exactly when each task is due.
          </p>
        </div>

        {/* Impact callout — the "noise prevention" banner */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-brand-blue to-blue-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-7 h-7 text-brand-gold" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-3xl md:text-4xl font-display text-brand-gold mb-1">90%</p>
              <p className="text-sm md:text-base text-white/90 font-medium leading-snug">
                of emergency garage door calls we receive could have been prevented with this checklist.
              </p>
              <p className="text-xs text-white/50 mt-2">
                Based on TNGD service data — spring failures, cable breaks, and sensor issues caught early save hundreds in emergency repairs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress + Stats dashboard */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Progress ring */}
            <ProgressRing progress={progress} />

            {/* Stats grid */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <span className="text-2xl font-display text-brand-blue">{checked.size}</span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Done</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-display text-gray-300">{CHECKLIST.length - checked.size}</span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Remaining</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-display text-brand-red">{proCount}</span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Pro Only</p>
                </div>
              </div>

              {/* Category mini-progress bars */}
              <div className="space-y-1.5">
                {categories.map(cat => {
                  const cp = categoryProgress[cat];
                  const pct = cp ? (cp.done / cp.total) * 100 : 0;
                  const color = CATEGORY_COLORS[cat] || '#6b7280';
                  return (
                    <div key={cat} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-28 truncate">{cat}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono w-8 text-right">
                        {cp?.done || 0}/{cp?.total || 0}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {diyCount} DIY-safe · {proCount} require a technician
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={resetAll} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                onClick={() => window.print()}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3 h-3" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Frequency filter */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 ${
              filter === 'all'
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({CHECKLIST.length})
          </button>
          {Object.entries(FREQUENCY_LABELS).map(([key, val]) => {
            const count = CHECKLIST.filter(c => c.frequency === key).length;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-display uppercase tracking-wider transition-all duration-200 ${
                  filter === key ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={filter === key ? { backgroundColor: val.color } : undefined}
              >
                {val.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Checklist by category */}
      <div className="max-w-3xl mx-auto space-y-4">
        {categories.map(cat => {
          const items = filtered.filter(c => c.category === cat);
          if (items.length === 0) return null;
          const cp = categoryProgress[cat];
          const pct = cp ? (cp.done / cp.total) * 100 : 0;
          const catColor = CATEGORY_COLORS[cat] || '#6b7280';
          const icon = CATEGORY_ICONS[cat];
          const isComplete = cp && cp.done === cp.total;

          return (
            <div
              key={cat}
              className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                isComplete
                  ? 'border-green-200 bg-green-50/30'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Category header — clickable on mobile for collapse */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                className="w-full text-left px-5 py-4 flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: `${catColor}12`,
                    color: catColor,
                  }}
                >
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base text-gray-900 flex items-center gap-2">
                    {cat}
                    {isComplete && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                        Complete
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: isComplete ? '#059669' : catColor }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{cp?.done || 0}/{cp?.total || 0}</span>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-gray-300 transition-transform duration-200 lg:hidden ${
                    expandedCategory === cat ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Items */}
              <div className="px-3 pb-3 space-y-1">
                <AnimatePresence>
                  {items.map(item => {
                    const isChecked = checked.has(item.id);
                    const freq = FREQUENCY_LABELS[item.frequency];
                    return (
                      <motion.button
                        key={item.id}
                        layout
                        onClick={() => toggle(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 group ${
                          isChecked
                            ? 'bg-green-50/60 border-green-200/60'
                            : 'bg-white border-gray-100 hover:border-brand-blue/30 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-300 group-hover:text-brand-blue flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                {item.task}
                              </span>
                              <span
                                className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                                style={{ backgroundColor: `${freq.color}15`, color: freq.color }}
                              >
                                {freq.label}
                              </span>
                              {!item.diy && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600">
                                  Pro Only
                                </span>
                              )}
                            </div>
                            <p className={`text-xs mt-1 leading-relaxed ${isChecked ? 'text-gray-300' : 'text-gray-500'}`}>
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety warning */}
      <div className="max-w-3xl mx-auto mt-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">Items marked &quot;Pro Only&quot; require a trained technician.</p>
            <p className="text-xs text-amber-700">
              Springs, cables, and bottom brackets are under extreme tension. Visual inspection is safe;
              adjustment or repair should only be performed by licensed, insured professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto mt-8 relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-brand-gold/10 rounded-full blur-[80px]" />
        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.25em] text-brand-gold mb-1">
                <Wrench className="w-3 h-3" />
                Professional Service
              </div>
              <p className="font-display text-xl text-white uppercase">Prefer to Leave It to the Pros?</p>
              <p className="text-sm text-emerald-200/70 mt-1">
                Our technicians complete this entire 21-point protocol during every tune-up — plus the items you can&apos;t safely do yourself.
              </p>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-xl hover:bg-red-700 transition-all whitespace-nowrap shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              Book a Tune-Up
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
