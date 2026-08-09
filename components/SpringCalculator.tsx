'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  ChevronRight,
  ArrowLeftRight,
  Weight,
  Zap,
  Activity,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import {
  calculateSpring,
  WIRE_SIZES,
  INSIDE_DIAMETERS,
  STANDARD_DOORS,
  DRUM_RADII,
  WIRE_GAUGE_CHART,
  type SpringCalcInput,
  type DrumType,
} from '@/lib/spring-calculator';

/* ─────────── Shared Form Components ─────────── */

function SelectField({
  label, value, onChange, options, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function NumberField({
  label, value, onChange, min, max, step, unit, hint,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; unit?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-display uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value || ''}
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          min={min} max={max} step={step}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-colors pr-12"
        />
        {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>}
      </div>
      {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function ResultRow({ label, value, unit, highlight }: { label: string; value: string | number; unit?: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 px-3 rounded ${highlight ? 'bg-brand-blue/5' : ''}`}>
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`text-sm font-mono ${highlight ? 'text-brand-blue font-bold' : 'text-gray-900'}`}>
        {value}{unit && <span className="text-gray-400 ml-1">{unit}</span>}
      </span>
    </div>
  );
}

/* ─────────── Spring SVG Infographic ─────────── */

function SpringInfographic({
  wireDiameter,
  insideDiameter,
  totalTurns,
  stressIndex,
  estimatedCycles,
  cycleLifeCategory,
  ippt,
}: {
  wireDiameter: number;
  insideDiameter: number;
  totalTurns: number;
  stressIndex: number;
  estimatedCycles: number;
  cycleLifeCategory: string;
  ippt: number;
}) {
  const stressColor = stressIndex > 60 ? '#C41E24' : stressIndex > 45 ? '#d97706' : '#059669';
  const stressLabel = stressIndex > 60 ? 'High Stress' : stressIndex > 45 ? 'Moderate' : 'Optimal';
  const stressAngle = Math.min(stressIndex / 80 * 180, 180);

  const coilCount = Math.min(Math.max(Math.round(totalTurns * 1.5), 8), 20);
  const coilPath = generateCoilPath(coilCount);

  const cycleColor = {
    'standard': '#C41E24',
    'extended': '#d97706',
    'high-cycle': '#059669',
    'max-cycle': '#002868',
  }[cycleLifeCategory] || '#6b7280';

  const arcAngle = Math.min(estimatedCycles / 100000 * 270, 270);
  const arcStartAngle = 135;
  const arcEndAngle = arcStartAngle + arcAngle;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-brand-blue/[0.04] rounded-2xl border border-gray-200 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />

      <h4 className="font-display text-sm uppercase tracking-wider text-brand-blue mb-5 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Spring Analysis Visual
      </h4>

      <div className="grid grid-cols-2 gap-6">
        {/* Spring illustration */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 160 200" className="w-full max-w-[140px]" aria-label="Torsion spring illustration">
            {/* Torsion tube */}
            <rect x="72" y="10" width="16" height="180" rx="2" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />

            {/* Spring coils */}
            <motion.path
              d={coilPath}
              fill="none"
              stroke={stressColor}
              strokeWidth={Math.max(2, wireDiameter * 12)}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Winding cone left */}
            <rect x="40" y="18" width="32" height="14" rx="3" fill="#374151" />
            <rect x="40" y="168" width="32" height="14" rx="3" fill="#374151" />

            {/* Winding cone right */}
            <rect x="88" y="18" width="32" height="14" rx="3" fill="#374151" />
            <rect x="88" y="168" width="32" height="14" rx="3" fill="#374151" />

            {/* Dimension annotations */}
            <line x1="20" y1="32" x2="20" y2="168" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="3,2" />
            <line x1="16" y1="32" x2="24" y2="32" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="16" y1="168" x2="24" y2="168" stroke="#9ca3af" strokeWidth="0.5" />
            <text x="20" y="104" textAnchor="middle" fontSize="7" fill="#9ca3af" fontFamily="monospace" transform="rotate(-90 20 104)">
              LENGTH
            </text>

            <line x1="40" y1="195" x2="120" y2="195" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="3,2" />
            <line x1="40" y1="191" x2="40" y2="199" stroke="#9ca3af" strokeWidth="0.5" />
            <line x1="120" y1="191" x2="120" y2="199" stroke="#9ca3af" strokeWidth="0.5" />
            <text x="80" y="193" textAnchor="middle" fontSize="7" fill="#9ca3af" fontFamily="monospace">
              {insideDiameter}&quot; ID
            </text>
          </svg>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-400 font-mono">Wire: {wireDiameter.toFixed(4)}&quot;</span>
          </div>
        </div>

        {/* Stress gauge */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 160 100" className="w-full max-w-[140px]">
            {/* Gauge background arc */}
            <path
              d={describeArc(80, 80, 55, 180, 360)}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Green zone */}
            <path
              d={describeArc(80, 80, 55, 180, 247)}
              fill="none"
              stroke="#059669"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Yellow zone */}
            <path
              d={describeArc(80, 80, 55, 247, 315)}
              fill="none"
              stroke="#d97706"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* Red zone */}
            <path
              d={describeArc(80, 80, 55, 315, 360)}
              fill="none"
              stroke="#C41E24"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.3"
            />

            {/* Needle */}
            <motion.line
              x1="80"
              y1="80"
              x2="80"
              y2="30"
              stroke={stressColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ rotate: -90 }}
              animate={{ rotate: stressAngle - 90 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ transformOrigin: '80px 80px' }}
            />
            <circle cx="80" cy="80" r="5" fill={stressColor} />

            <text x="80" y="72" textAnchor="middle" fontSize="9" fontWeight="600" fill={stressColor}>
              {stressIndex.toFixed(0)}%
            </text>
          </svg>
          <div className="text-center -mt-1">
            <span className="text-xs font-display uppercase tracking-wider" style={{ color: stressColor }}>
              {stressLabel}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Stress Index</p>
          </div>
        </div>
      </div>

      {/* Cycle life arc */}
      <div className="mt-5 flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100">
        <svg viewBox="0 0 80 50" className="w-16 flex-shrink-0">
          <path
            d={describeArc(40, 40, 30, 135, 405)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <motion.path
            d={describeArc(40, 40, 30, arcStartAngle, arcEndAngle)}
            fill="none"
            stroke={cycleColor}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div>
          <p className="text-xl font-display" style={{ color: cycleColor }}>
            ~{estimatedCycles.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-400">estimated cycles</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm font-display text-brand-blue">{ippt.toFixed(3)}</p>
          <p className="text-[10px] text-gray-400">IPPT</p>
        </div>
      </div>
    </div>
  );
}

function generateCoilPath(coils: number): string {
  const startY = 35;
  const endY = 165;
  const coilHeight = (endY - startY) / coils;
  const leftX = 42;
  const rightX = 118;
  const centerX = 80;

  let path = `M ${leftX} ${startY}`;
  for (let i = 0; i < coils; i++) {
    const y1 = startY + i * coilHeight;
    const y2 = y1 + coilHeight * 0.5;
    const y3 = y1 + coilHeight;
    path += ` C ${leftX - 10} ${y2}, ${rightX + 10} ${y2}, ${rightX} ${y3}`;
    if (i < coils - 1) {
      const y4 = y3 + coilHeight * 0.5;
      const y5 = y3 + coilHeight;
      path += ` C ${rightX + 10} ${y4}, ${leftX - 10} ${y4}, ${leftX} ${y5}`;
      i++;
    }
  }
  return path;
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

/* ─────────── 2-Spring ↔ 1-Spring Conversion ─────────── */

function SpringConversion() {
  const [mode, setMode] = useState<'2to1' | '1to2'>('2to1');
  const [sourceIppt, setSourceIppt] = useState(2.5);

  const resultIppt = mode === '2to1' ? sourceIppt * 2 : sourceIppt / 2;

  const findClosestWire = (targetIppt: number, id: number): { wire: number; ippt: number; label: string } | null => {
    let best: { wire: number; ippt: number; label: string } | null = null;
    let bestDiff = Infinity;

    for (const w of WIRE_SIZES) {
      const D = id + w;
      const totalCoils = 24 / w;
      const Na = totalCoils - 1;
      if (Na < 3) continue;
      const ippt = (Math.pow(w, 4) * 11500000) / (10.18 * D * Na);
      const diff = Math.abs(ippt - targetIppt);
      if (diff < bestDiff) {
        bestDiff = diff;
        const gauge = WIRE_GAUGE_CHART.find(g => g.diameter === w);
        best = { wire: w, ippt, label: gauge?.label || `${w.toFixed(4)}"` };
      }
    }
    return best;
  };

  const suggestion2 = findClosestWire(resultIppt, 2.0);
  const suggestion375 = findClosestWire(resultIppt, 3.375);

  return (
    <div className="bg-white border-2 border-brand-gold/30 rounded-2xl p-6">
      <h4 className="font-display text-base text-brand-blue mb-4 flex items-center gap-2">
        <ArrowLeftRight className="w-5 h-5 text-brand-gold" />
        Spring Conversion Tool
      </h4>
      <p className="text-xs text-gray-500 mb-4">
        Converting between single and dual spring setups? Enter the IPPT of your source spring(s) to find the equivalent.
      </p>

      {/* Mode toggle */}
      <div className="flex rounded-lg bg-gray-100 p-0.5 mb-4">
        <button
          onClick={() => setMode('2to1')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider transition-all ${
            mode === '2to1' ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          2 Springs → 1 Spring
        </button>
        <button
          onClick={() => setMode('1to2')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-display uppercase tracking-wider transition-all ${
            mode === '1to2' ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          1 Spring → 2 Springs
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-gray-500 mb-1.5">
            {mode === '2to1' ? 'Each Spring IPPT' : 'Single Spring IPPT'}
          </label>
          <input
            type="number"
            value={sourceIppt || ''}
            onChange={e => setSourceIppt(parseFloat(e.target.value) || 0)}
            step={0.1}
            min={0.1}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
          />
        </div>
        <div>
          <label className="block text-xs font-display uppercase tracking-wider text-gray-500 mb-1.5">
            {mode === '2to1' ? 'Required Single IPPT' : 'Required Each IPPT'}
          </label>
          <div className="px-3 py-2.5 border border-brand-blue/20 rounded-lg text-sm bg-brand-blue/5 font-mono text-brand-blue font-bold">
            {resultIppt.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Closest match suggestions */}
      {sourceIppt > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-[10px] font-display uppercase tracking-wider text-gray-400 mb-2">Closest Wire Match (24&quot; spring)</p>
          <div className="space-y-1.5">
            {suggestion2 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">2&quot; ID → {suggestion2.label}</span>
                <span className="font-mono text-gray-900">{suggestion2.ippt.toFixed(3)} IPPT</span>
              </div>
            )}
            {suggestion375 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">3.375&quot; ID → {suggestion375.label}</span>
                <span className="font-mono text-gray-900">{suggestion375.ippt.toFixed(3)} IPPT</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── Weight → Spring ID Lookup ─────────── */

function WeightToSpringLookup() {
  const [doorWeight, setDoorWeight] = useState(155);
  const [doorHeight, setDoorHeight] = useState(7);
  const [numSprings, setNumSprings] = useState<1 | 2>(2);

  const suggestions = useMemo(() => {
    const drumRadius = 2.0;
    const torquePerSpring = (doorWeight * drumRadius) / numSprings;
    const cableTravel = doorHeight * 12;
    const drumTurns = cableTravel / (2 * Math.PI * drumRadius);
    const preload = 1.0;
    const totalTurns = drumTurns + preload;

    const results: { wire: number; id: number; ippt: number; turns: number; stress: number; label: string; lifeCategory: string }[] = [];

    for (const w of WIRE_SIZES) {
      for (const id of [2.0, 2.625, 3.375]) {
        const D = id + w;
        const Na = (24 / w) - 1;
        if (Na < 3) continue;
        const ippt = (Math.pow(w, 4) * 11500000) / (10.18 * D * Na);
        const turnsFromTorque = torquePerSpring / ippt + preload;

        const maxTurns = (24 / w) * 0.75;
        if (turnsFromTorque > maxTurns) continue;

        const operatingTorque = ippt * turnsFromTorque;
        const torsionalStress = (operatingTorque * 10.18) / (Math.pow(w, 3) * Na);
        const c = D / w;
        const wahlFactor = ((4 * c - 1) / (4 * c - 4)) + (0.615 / c);
        const correctedStress = torsionalStress * wahlFactor;
        const uts = 190000 / Math.pow(w, 0.155);
        const stressRatio = (correctedStress / uts) * 100;

        let lifeCategory = 'standard';
        if (stressRatio <= 35) lifeCategory = 'max-cycle';
        else if (stressRatio <= 45) lifeCategory = 'high-cycle';
        else if (stressRatio <= 55) lifeCategory = 'extended';

        if (stressRatio < 65) {
          const gauge = WIRE_GAUGE_CHART.find(g => g.diameter === w);
          results.push({
            wire: w,
            id,
            ippt,
            turns: turnsFromTorque,
            stress: stressRatio,
            label: gauge?.label || `${w.toFixed(4)}"`,
            lifeCategory,
          });
        }
      }
    }

    results.sort((a, b) => a.stress - b.stress);
    return results.slice(0, 8);
  }, [doorWeight, doorHeight, numSprings]);

  const lifeCategoryColors: Record<string, string> = {
    'standard': '#C41E24',
    'extended': '#d97706',
    'high-cycle': '#059669',
    'max-cycle': '#002868',
  };

  return (
    <div className="bg-white border-2 border-brand-blue/20 rounded-2xl p-6">
      <h4 className="font-display text-base text-brand-blue mb-4 flex items-center gap-2">
        <Weight className="w-5 h-5 text-brand-red" />
        Weight → Spring Finder
      </h4>
      <p className="text-xs text-gray-500 mb-4">
        Enter your door weight and height to find compatible spring sizes. Results sorted by lowest stress (longest life).
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <NumberField label="Door Weight" value={doorWeight} onChange={setDoorWeight} min={50} max={500} step={5} unit="lbs" />
        <NumberField label="Height" value={doorHeight} onChange={v => setDoorHeight(v)} min={6} max={18} step={0.5} unit="ft" />
        <SelectField
          label="Springs"
          value={String(numSprings)}
          onChange={v => setNumSprings(parseInt(v) as 1 | 2)}
          options={[{ value: '1', label: 'Single' }, { value: '2', label: 'Duplex' }]}
        />
      </div>

      {suggestions.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-3 py-2 text-left font-display uppercase tracking-wider text-gray-500">Wire</th>
                <th className="px-3 py-2 text-left font-display uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-3 py-2 text-right font-display uppercase tracking-wider text-gray-500">IPPT</th>
                <th className="px-3 py-2 text-right font-display uppercase tracking-wider text-gray-500">Turns</th>
                <th className="px-3 py-2 text-right font-display uppercase tracking-wider text-gray-500">Life</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-brand-blue/[0.02]">
                  <td className="px-3 py-2 font-mono">{s.label.split('—')[0].trim()}</td>
                  <td className="px-3 py-2 font-mono">{s.id}&quot;</td>
                  <td className="px-3 py-2 text-right font-mono">{s.ippt.toFixed(3)}</td>
                  <td className="px-3 py-2 text-right font-mono">{s.turns.toFixed(1)}</td>
                  <td className="px-3 py-2 text-right">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: `${lifeCategoryColors[s.lifeCategory]}15`,
                        color: lifeCategoryColors[s.lifeCategory],
                      }}
                    >
                      {s.lifeCategory.replace('-', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400 text-xs">
          No compatible springs found at 24&quot; length for this configuration. Try adjusting weight or height.
        </div>
      )}
    </div>
  );
}

/* ─────────── Main Calculator Component ─────────── */

type CalcTab = 'calculator' | 'weight-lookup' | 'conversion';

export default function SpringCalculator() {
  const [activeTab, setActiveTab] = useState<CalcTab>('calculator');
  const [input, setInput] = useState<SpringCalcInput>({
    wireDiameter: 0.2500,
    insideDiameter: 2.0,
    springLength: 24,
    doorWeight: 155,
    doorHeight: 7,
    drumType: 'standard',
    numberOfSprings: 2,
  });

  const [showGaugeChart, setShowGaugeChart] = useState(false);

  const update = <K extends keyof SpringCalcInput>(key: K, value: SpringCalcInput[K]) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const result = useMemo(() => {
    if (input.wireDiameter <= 0 || input.insideDiameter <= 0 || input.springLength <= 0 || input.doorWeight <= 0 || input.doorHeight <= 0) {
      return null;
    }
    return calculateSpring(input);
  }, [input]);

  const cycleLifeColor = result ? {
    standard: '#C41E24',
    extended: '#d97706',
    'high-cycle': '#059669',
    'max-cycle': '#002868',
  }[result.cycleLifeCategory] : '#6b7280';

  const TABS: { id: CalcTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'calculator', label: 'DASMA Calculator', icon: <Calculator className="w-4 h-4" />, color: '#002868' },
    { id: 'weight-lookup', label: 'Weight → Spring', icon: <Weight className="w-4 h-4" />, color: '#bf0a30' },
    { id: 'conversion', label: '2↔1 Conversion', icon: <ArrowLeftRight className="w-4 h-4" />, color: '#d97706' },
  ];

  return (
    <section id="spring-calculator" className="scroll-mt-24">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-display uppercase tracking-widest mb-4">
          <Zap className="w-3.5 h-3.5" />
          Professional Tool
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
          Torsion Spring <span className="text-brand-red">Calculator</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          DASMA-standard calculations for torsion spring sizing, cycle life estimation, and stress analysis.
          Three tools in one: calculate from specs, find springs by door weight, or convert between setups.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3 max-w-4xl mx-auto">
        <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>Professional Use Only.</strong> Torsion springs store lethal amounts of energy.
          This calculator is a reference tool for trained technicians.
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display uppercase tracking-wider transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm'
            }`}
            style={activeTab === tab.id ? { backgroundColor: tab.color } : undefined}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-display text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-blue" />
                    Spring Specifications
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <SelectField
                      label="Wire Diameter"
                      value={String(input.wireDiameter)}
                      onChange={v => update('wireDiameter', parseFloat(v))}
                      options={WIRE_SIZES.map(w => {
                        const gauge = WIRE_GAUGE_CHART.find(g => g.diameter === w);
                        return { value: String(w), label: gauge ? gauge.label : `${w.toFixed(4)}"` };
                      })}
                      hint="Measure with calipers or match gauge chart"
                    />
                    <SelectField
                      label="Inside Diameter"
                      value={String(input.insideDiameter)}
                      onChange={v => update('insideDiameter', parseFloat(v))}
                      options={INSIDE_DIAMETERS.map(id => ({
                        value: String(id),
                        label: `${id}" ID`,
                      }))}
                      hint="Measure the inner opening of the coil"
                    />
                    <NumberField
                      label="Spring Length"
                      value={input.springLength}
                      onChange={v => update('springLength', v)}
                      min={6} max={60} step={0.5} unit="inches"
                      hint="Relaxed coil length, excluding cones"
                    />
                    <SelectField
                      label="Number of Springs"
                      value={String(input.numberOfSprings)}
                      onChange={v => update('numberOfSprings', parseInt(v) as 1 | 2)}
                      options={[
                        { value: '1', label: '1 Spring (Single)' },
                        { value: '2', label: '2 Springs (Duplex)' },
                      ]}
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-display text-lg text-gray-900 mb-4">Door Specifications</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <NumberField
                      label="Door Weight" value={input.doorWeight}
                      onChange={v => update('doorWeight', v)}
                      min={50} max={500} step={5} unit="lbs"
                      hint="Weigh with bathroom scale + 2×4"
                    />
                    <NumberField
                      label="Door Height" value={input.doorHeight}
                      onChange={v => update('doorHeight', v)}
                      min={6} max={18} step={0.5} unit="feet"
                    />
                    <SelectField
                      label="Cable Drum"
                      value={input.drumType}
                      onChange={v => update('drumType', v as DrumType)}
                      options={Object.entries(DRUM_RADII).map(([key, val]) => ({
                        value: key,
                        label: val.label,
                      }))}
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-display uppercase tracking-wider text-gray-400 mb-2">Quick Fill — Standard Doors</p>
                    <div className="flex flex-wrap gap-2">
                      {STANDARD_DOORS.slice(0, 6).map(door => (
                        <button
                          key={door.label}
                          onClick={() => {
                            update('doorWeight', Math.round((door.weightRange[0] + door.weightRange[1]) / 2));
                            update('doorHeight', door.height);
                          }}
                          className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-brand-blue/10 text-gray-600 hover:text-brand-blue rounded-md transition-colors font-mono"
                        >
                          {door.width}×{door.height}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Wire Gauge Reference */}
                <button
                  onClick={() => setShowGaugeChart(!showGaugeChart)}
                  className="text-sm text-brand-blue hover:underline flex items-center gap-1"
                >
                  <Info className="w-4 h-4" />
                  {showGaugeChart ? 'Hide' : 'Show'} Wire Gauge Reference
                </button>

                <AnimatePresence>
                  {showGaugeChart && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div className="p-3 bg-gray-50 border-b">
                        <p className="text-xs font-display uppercase tracking-wider text-gray-500">
                          Wire Gauge → Diameter Reference
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Measure by counting 10 coils and dividing by 10</p>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-100">
                          {WIRE_GAUGE_CHART.map(g => (
                            <div
                              key={g.gauge}
                              className={`flex justify-between items-center px-3 py-1.5 text-xs bg-white ${
                                g.diameter === input.wireDiameter ? 'bg-brand-blue/5 font-bold' : ''
                              }`}
                            >
                              <span className="text-gray-600">{g.gauge >= 0 ? `${g.gauge} ga` : `${g.gauge} ga`}</span>
                              <span className="font-mono text-gray-900">{g.diameter.toFixed(4)}&quot;</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Results + Infographic */}
              <div className="space-y-6">
                {result ? (
                  <>
                    {/* Infographic */}
                    <SpringInfographic
                      wireDiameter={input.wireDiameter}
                      insideDiameter={input.insideDiameter}
                      totalTurns={result.totalTurns}
                      stressIndex={result.stressIndex}
                      estimatedCycles={result.estimatedCycles}
                      cycleLifeCategory={result.cycleLifeCategory}
                      ippt={result.ippt}
                    />

                    {/* Warnings */}
                    {result.warnings.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                        {result.warnings.map((w, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {w}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Numerical results */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <h3 className="font-display text-base text-gray-900 mb-3">Spring Properties</h3>
                      <div className="divide-y divide-gray-100">
                        <ResultRow label="Mean Diameter (D)" value={result.meanDiameter.toFixed(4)} unit="in" />
                        <ResultRow label="Active Coils (Nₐ)" value={result.activeCoils.toFixed(1)} />
                        <ResultRow label="IPPT" value={result.ippt.toFixed(3)} unit="in·lb/turn" highlight />
                        <ResultRow label="Spring Index (D/d)" value={(result.meanDiameter / input.wireDiameter).toFixed(1)} />
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <h3 className="font-display text-base text-gray-900 mb-3">Application</h3>
                      <div className="divide-y divide-gray-100">
                        <ResultRow label="Torque / Spring" value={result.torqueRequired.toFixed(2)} unit="in·lb" highlight />
                        <ResultRow label="Turns Required" value={result.turnsRequired.toFixed(2)} />
                        <ResultRow label="Preload" value={result.preloadTurns.toFixed(1)} unit="turns" />
                        <ResultRow label="Total Turns" value={result.totalTurns.toFixed(2)} />
                        <ResultRow label="Safe Max" value={result.maxTurns.toFixed(1)} unit="turns" />
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                      <h3 className="font-display text-base text-gray-900 mb-3">Stress & Cycle Life</h3>
                      <div className="divide-y divide-gray-100">
                        <ResultRow label="Torsional Stress" value={result.torsionalStress.toFixed(0)} unit="psi" />
                        <ResultRow label="Wahl-Corrected" value={result.correctedStress.toFixed(0)} unit="psi" />
                        <ResultRow label="Stress Index" value={result.stressIndex.toFixed(1)} unit="%" />
                      </div>

                      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${cycleLifeColor}08`, borderLeft: `3px solid ${cycleLifeColor}` }}>
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4" style={{ color: cycleLifeColor }} />
                          <span className="text-sm font-medium" style={{ color: cycleLifeColor }}>
                            {result.cycleLifeCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Life
                          </span>
                        </div>
                        <p className="text-2xl font-display" style={{ color: cycleLifeColor }}>
                          ~{result.estimatedCycles.toLocaleString()} cycles
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ≈ {result.yearsAtFourCyclesPerDay.toFixed(1)} years at 4 cycles/day
                        </p>
                      </div>
                    </div>

                    <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl px-5 py-4">
                      <p className="text-xs text-brand-blue">
                        <strong>Formula:</strong> IPPT = (d⁴ × G) / (10.18 × D × Nₐ) · G = 11,500,000 psi (ASTM A229) ·
                        Wahl: K = ((4c−1)/(4c−4)) + (0.615/c)
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-500">Enter specifications to see results</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'weight-lookup' && (
          <motion.div
            key="weight-lookup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <WeightToSpringLookup />
          </motion.div>
        )}

        {activeTab === 'conversion' && (
          <motion.div
            key="conversion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <SpringConversion />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Need a professional spring assessment? Our DASMA-trained technicians calculate every replacement to exact specifications.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-display uppercase tracking-wider rounded-xl hover:bg-red-700 transition-colors shadow-md"
        >
          <Calendar className="w-4 h-4" />
          Schedule Free Estimate
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}
