'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Search, ArrowRightLeft, Ruler, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';
import {
  calculateSpring,
  findSpringsForDoor,
  lookupWireFromMeasurement,
  calculateCableLength,
  WIRE_GAUGE_CHART,
  WIRE_SIZES,
  INSIDE_DIAMETERS,
  DRUM_RADII,
  LIFT_TYPES,
  STANDARD_DOORS,
  CYCLE_TARGETS,
  WIND_DIRECTION_INFO,
  EXTENSION_SPRING_COLORS,
  getDrumsForLiftType,
  type DrumType,
  type LiftType,
  type WindDirection,
  type CycleTarget,
  type SpringCalcResult,
} from '@/lib/spring-calculator';

type CalcTab = 'calculator' | 'weight-lookup' | 'conversion' | 'wire-finder' | 'cable-length';

const TAB_CONFIG: { id: CalcTab; label: string; icon: typeof Calculator; color: string }[] = [
  { id: 'calculator', label: 'Spring Calculator', icon: Calculator, color: '#002868' },
  { id: 'weight-lookup', label: 'Find by Door Weight', icon: Search, color: '#bf0a30' },
  { id: 'conversion', label: '2↔1 Conversion', icon: ArrowRightLeft, color: '#d97706' },
  { id: 'wire-finder', label: 'Wire Size Finder', icon: Ruler, color: '#059669' },
  { id: 'cable-length', label: 'Cable Length', icon: Ruler, color: '#7c3aed' },
];

function SelectField({ label, value, onChange, children, helpText }: {
  label: string; value: string; onChange: (v: string) => void; children: React.ReactNode; helpText?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue appearance-none pr-8">
          {children}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {helpText && <p className="text-[10px] text-gray-400 mt-0.5">{helpText}</p>}
    </div>
  );
}

function NumberField({ label, value, onChange, min, max, step, unit, helpText }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; unit?: string; helpText?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input type="number" value={value || ''} onChange={e => onChange(parseFloat(e.target.value) || 0)}
          min={min} max={max} step={step || 0.01}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue" />
        {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>}
      </div>
      {helpText && <p className="text-[10px] text-gray-400 mt-0.5">{helpText}</p>}
    </div>
  );
}

function ResultRow({ label, value, unit, highlight, warn }: {
  label: string; value: string | number; unit?: string; highlight?: boolean; warn?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-1.5 px-2 rounded ${highlight ? 'bg-brand-blue/5' : ''} ${warn ? 'bg-red-50' : ''}`}>
      <span className="text-xs text-gray-600">{label}</span>
      <span className={`text-sm font-mono font-medium ${warn ? 'text-red-600' : highlight ? 'text-brand-blue' : 'text-gray-900'}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}{unit ? ` ${unit}` : ''}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SPRING INFOGRAPHIC
// ═══════════════════════════════════════════════════════════════════════════

function SpringInfographic({ result }: { result: SpringCalcResult | null }) {
  if (!result || !result.isValid) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-300">
        <p className="text-sm">Enter spring parameters to see visualization</p>
      </div>
    );
  }

  const stressPercent = Math.min(result.stressIndex, 80);
  const stressColor = stressPercent > 60 ? '#C41E24' : stressPercent > 45 ? '#d97706' : '#059669';
  const cycleArc = Math.min(result.estimatedCycles / 100000, 1) * 240;

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* IPPT gauge */}
      <div className="text-center">
        <svg viewBox="0 0 100 70" className="w-full max-w-[120px] mx-auto">
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke="#002868" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(result.ippt / 40) * 110} 200`} />
          <text x="50" y="52" textAnchor="middle" fill="#002868" fontSize="14" fontWeight="700" fontFamily="system-ui">
            {result.ippt.toFixed(1)}
          </text>
          <text x="50" y="64" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="system-ui">IPPT</text>
        </svg>
        <p className="text-[10px] text-gray-500 mt-1">Inch-Pounds/Turn</p>
      </div>

      {/* Stress gauge */}
      <div className="text-center">
        <svg viewBox="0 0 100 70" className="w-full max-w-[120px] mx-auto">
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke={stressColor} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(stressPercent / 80) * 110} 200`} />
          <text x="50" y="52" textAnchor="middle" fill={stressColor} fontSize="14" fontWeight="700" fontFamily="system-ui">
            {result.stressIndex.toFixed(0)}%
          </text>
          <text x="50" y="64" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="system-ui">STRESS</text>
        </svg>
        <p className="text-[10px] text-gray-500 mt-1">Wahl-Corrected</p>
      </div>

      {/* Cycle life */}
      <div className="text-center">
        <svg viewBox="0 0 100 70" className="w-full max-w-[120px] mx-auto">
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
          <path d="M 15 60 A 35 35 0 0 1 85 60" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={`${(cycleArc / 240) * 110} 200`} />
          <text x="50" y="48" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="700" fontFamily="system-ui">
            {result.estimatedCycles >= 1000 ? `${(result.estimatedCycles / 1000).toFixed(0)}K` : result.estimatedCycles}
          </text>
          <text x="50" y="58" textAnchor="middle" fill="#6b7280" fontSize="6.5" fontFamily="system-ui">
            ~{result.yearsAtFourCyclesPerDay.toFixed(0)} yrs
          </text>
          <text x="50" y="66" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="system-ui">CYCLES</text>
        </svg>
        <p className="text-[10px] text-gray-500 mt-1">@ 4 cycles/day</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 1: SPRING CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════

function CalculatorTab() {
  const [wireIdx, setWireIdx] = useState(10);
  const [idIdx, setIdIdx] = useState(2);
  const [springLength, setSpringLength] = useState(24);
  const [doorWeight, setDoorWeight] = useState(150);
  const [doorHeight, setDoorHeight] = useState(7);
  const [numSprings, setNumSprings] = useState<1 | 2>(2);
  const [liftType, setLiftType] = useState<LiftType>('standard');
  const [drumType, setDrumType] = useState<DrumType>('standard-400');
  const [windDir, setWindDir] = useState<WindDirection>('left');

  const availableDrums = getDrumsForLiftType(liftType);

  const result = useMemo(() => {
    if (!WIRE_SIZES[wireIdx] || !INSIDE_DIAMETERS[idIdx] || !springLength || !doorWeight || !doorHeight) return null;
    return calculateSpring({
      wireDiameter: WIRE_SIZES[wireIdx],
      insideDiameter: INSIDE_DIAMETERS[idIdx],
      springLength,
      doorWeight,
      doorHeight,
      drumType: availableDrums.includes(drumType) ? drumType : availableDrums[0],
      numberOfSprings: numSprings,
      liftType,
      windDirection: windDir,
    });
  }, [wireIdx, idIdx, springLength, doorWeight, doorHeight, drumType, numSprings, liftType, windDir, availableDrums]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="text-sm font-display text-gray-900 uppercase tracking-wider">Spring Parameters</h4>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Wire Diameter" value={wireIdx.toString()} onChange={v => setWireIdx(parseInt(v))}>
            {WIRE_SIZES.map((ws, i) => {
              const g = WIRE_GAUGE_CHART.find(gc => Math.abs(gc.diameter - ws) < 0.001);
              return <option key={i} value={i}>{g?.label || `${ws.toFixed(4)}″`}</option>;
            })}
          </SelectField>
          <SelectField label="Inside Diameter (ID)" value={idIdx.toString()} onChange={v => setIdIdx(parseInt(v))}>
            {INSIDE_DIAMETERS.map((id, i) => <option key={i} value={i}>{id}″</option>)}
          </SelectField>
        </div>
        <NumberField label="Spring Length (coil body)" value={springLength} onChange={setSpringLength} min={6} max={60} step={0.5} unit="in" helpText="Measure coil body only — exclude cones" />

        <h4 className="text-sm font-display text-gray-900 uppercase tracking-wider pt-2">Door Parameters</h4>
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Door Weight" value={doorWeight} onChange={setDoorWeight} min={50} max={500} step={1} unit="lbs" />
          <NumberField label="Door Height" value={doorHeight} onChange={setDoorHeight} min={6} max={20} step={0.5} unit="ft" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Number of Springs" value={numSprings.toString()} onChange={v => setNumSprings(parseInt(v) as 1 | 2)}>
            <option value="1">1 Spring (Single)</option>
            <option value="2">2 Springs (Pair)</option>
          </SelectField>
          <SelectField label="Wind Direction" value={windDir} onChange={v => setWindDir(v as WindDirection)}
            helpText={WIND_DIRECTION_INFO[windDir].coneColor + ' cone'}>
            <option value="left">Left-Hand Wound</option>
            <option value="right">Right-Hand Wound</option>
          </SelectField>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Lift Type" value={liftType} onChange={v => { setLiftType(v as LiftType); setDrumType(getDrumsForLiftType(v as LiftType)[0]); }}>
            {Object.entries(LIFT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </SelectField>
          <SelectField label="Cable Drum" value={drumType} onChange={v => setDrumType(v as DrumType)}>
            {availableDrums.map(dt => <option key={dt} value={dt}>{DRUM_RADII[dt].label}</option>)}
          </SelectField>
        </div>

        <details className="text-xs text-gray-500 border border-gray-200 rounded-lg p-2">
          <summary className="cursor-pointer font-medium text-gray-600">Door Weight Reference</summary>
          <div className="mt-2 space-y-0.5 max-h-36 overflow-y-auto">
            {STANDARD_DOORS.map((d, i) => (
              <div key={i} className="flex justify-between py-0.5 hover:bg-gray-50 px-1 rounded cursor-pointer"
                onClick={() => { setDoorWeight(Math.round((d.weightRange[0] + d.weightRange[1]) / 2)); setDoorHeight(d.height); }}>
                <span>{d.label}</span>
                <span className="text-gray-400">{d.weightRange[0]}–{d.weightRange[1]} lbs</span>
              </div>
            ))}
          </div>
        </details>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-display text-gray-900 uppercase tracking-wider">Results</h4>
        <SpringInfographic result={result} />

        {result && result.isValid && (
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            <div className="px-3 py-2 bg-gray-50 rounded-t-lg">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Spring Properties</p>
            </div>
            <div className="p-2 space-y-0.5">
              <ResultRow label="IPPT (Inch-Pounds Per Turn)" value={result.ippt} highlight />
              <ResultRow label="Mean Coil Diameter" value={`${result.meanDiameter.toFixed(3)}″`} />
              <ResultRow label="Spring Index (D/d)" value={result.springIndex.toFixed(1)} />
              <ResultRow label="Total Coils" value={result.totalCoils.toFixed(1)} />
              <ResultRow label="Active Coils (Nₐ)" value={result.activeCoils.toFixed(1)} />
            </div>
            <div className="px-3 py-2 bg-gray-50">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Application</p>
            </div>
            <div className="p-2 space-y-0.5">
              <ResultRow label="Torque Required (per spring)" value={`${result.torqueRequired.toFixed(1)} in-lbs`} />
              <ResultRow label="Turns Required" value={result.turnsRequired.toFixed(1)} highlight />
              <ResultRow label="Preload Turns" value={result.preloadTurns.toFixed(1)} />
              <ResultRow label="Total Turns" value={result.totalTurns.toFixed(1)} highlight />
              <ResultRow label="Max Safe Turns" value={result.maxSafeTurns.toFixed(1)} warn={result.totalTurns > result.maxSafeTurns} />
              <ResultRow label="Drum Turns" value={result.drumTurns.toFixed(1)} />
              <ResultRow label="Wind Direction" value={WIND_DIRECTION_INFO[result.windDirection].label} />
            </div>
            <div className="px-3 py-2 bg-gray-50">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Stress & Life</p>
            </div>
            <div className="p-2 space-y-0.5">
              <ResultRow label="Torsional Stress" value={`${result.torsionalStress.toFixed(0)} psi`} />
              <ResultRow label="Wahl Factor (K)" value={result.wahlFactor.toFixed(3)} />
              <ResultRow label="Corrected Stress" value={`${result.correctedStress.toFixed(0)} psi`} />
              <ResultRow label="UTS (ASTM A229)" value={`${result.ultimateTensileStrength.toFixed(0)} psi`} />
              <ResultRow label="Stress Index" value={`${result.stressIndex.toFixed(1)}%`} warn={result.stressIndex > 60} />
              <ResultRow label="Estimated Cycles" value={`${result.estimatedCycles.toLocaleString()}`} highlight />
              <ResultRow label="Years (@ 4/day)" value={`~${result.yearsAtFourCyclesPerDay.toFixed(1)} yrs`} />
              <ResultRow label="Stored Energy" value={`${result.storedEnergy.toFixed(0)} in-lbs`} />
              <ResultRow label="Cable Length" value={`${result.cableLength}″`} />
            </div>
          </div>
        )}

        {result && result.warnings.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Warnings</p>
            {result.warnings.map((w, i) => <p key={i} className="text-xs text-amber-800">{w}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 2: WEIGHT-TO-SPRING LOOKUP
// ═══════════════════════════════════════════════════════════════════════════

function WeightLookupTab() {
  const [doorWeight, setDoorWeight] = useState(150);
  const [doorHeight, setDoorHeight] = useState(7);
  const [numSprings, setNumSprings] = useState<1 | 2>(2);
  const [targetCycles, setTargetCycles] = useState<CycleTarget>(10000);

  const matches = useMemo(() => {
    if (!doorWeight || !doorHeight) return [];
    return findSpringsForDoor(doorWeight, doorHeight, numSprings, 'standard-400', targetCycles);
  }, [doorWeight, doorHeight, numSprings, targetCycles]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <NumberField label="Door Weight" value={doorWeight} onChange={setDoorWeight} min={50} max={500} unit="lbs" />
        <NumberField label="Door Height" value={doorHeight} onChange={setDoorHeight} min={6} max={20} step={0.5} unit="ft" />
        <SelectField label="Springs" value={numSprings.toString()} onChange={v => setNumSprings(parseInt(v) as 1 | 2)}>
          <option value="2">2 Springs</option>
          <option value="1">1 Spring</option>
        </SelectField>
        <SelectField label="Min. Cycle Target" value={targetCycles.toString()} onChange={v => setTargetCycles(parseInt(v) as CycleTarget)}>
          {CYCLE_TARGETS.map(ct => <option key={ct.value} value={ct.value}>{ct.label}</option>)}
        </SelectField>
      </div>

      {matches.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-2 py-2 font-medium text-gray-600">Wire Size</th>
                <th className="px-2 py-2 font-medium text-gray-600">ID</th>
                <th className="px-2 py-2 font-medium text-gray-600">Length</th>
                <th className="px-2 py-2 font-medium text-gray-600">IPPT</th>
                <th className="px-2 py-2 font-medium text-gray-600">Turns</th>
                <th className="px-2 py-2 font-medium text-gray-600">Stress</th>
                <th className="px-2 py-2 font-medium text-gray-600">Cycles</th>
                <th className="px-2 py-2 font-medium text-gray-600">Rating</th>
              </tr>
            </thead>
            <tbody>
              {matches.slice(0, 25).map((m, i) => (
                <tr key={i} className={`border-b border-gray-100 ${i < 3 ? 'bg-green-50/50' : ''}`}>
                  <td className="px-2 py-1.5 font-mono">{m.wireLabel}</td>
                  <td className="px-2 py-1.5">{m.insideDiameter}″</td>
                  <td className="px-2 py-1.5">{m.springLength}″</td>
                  <td className="px-2 py-1.5 font-mono font-medium">{m.ippt.toFixed(2)}</td>
                  <td className="px-2 py-1.5">{m.totalTurns.toFixed(1)}</td>
                  <td className="px-2 py-1.5">
                    <span className={`px-1 py-0.5 rounded text-[10px] font-medium ${
                      m.stressIndex > 55 ? 'bg-red-100 text-red-700' : m.stressIndex > 45 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>{m.stressIndex.toFixed(0)}%</span>
                  </td>
                  <td className="px-2 py-1.5">{m.estimatedCycles.toLocaleString()}</td>
                  <td className="px-2 py-1.5 text-gray-500">{m.cycleCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2 text-right">Top {Math.min(matches.length, 25)} of {matches.length} matches (lowest stress first)</p>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="text-sm">No matching springs found. Try adjusting parameters.</p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 3: 2↔1 SPRING CONVERSION
// ═══════════════════════════════════════════════════════════════════════════

function ConversionTab() {
  const [mode, setMode] = useState<'2to1' | '1to2'>('2to1');
  const [srcWireIdx, setSrcWireIdx] = useState(10);
  const [srcIdIdx, setSrcIdIdx] = useState(2);
  const [srcLength, setSrcLength] = useState(24);

  const srcWire = WIRE_SIZES[srcWireIdx];
  const srcId = INSIDE_DIAMETERS[srcIdIdx];

  const result = useMemo(() => {
    if (!srcWire || !srcId || !srcLength) return null;
    const D = srcId + srcWire;
    const totalCoils = srcLength / srcWire;
    const activeCoils = totalCoils - 1;
    if (activeCoils < 1) return null;
    const srcIppt = (Math.pow(srcWire, 4) * 11_500_000) / (10.18 * D * activeCoils);
    const targetIppt = mode === '2to1' ? srcIppt * 2 : srcIppt / 2;

    const matches: { wire: number; wireLabel: string; id: number; length: number; ippt: number; diff: number }[] = [];

    for (const w of WIRE_SIZES) {
      for (const id of INSIDE_DIAMETERS) {
        for (const len of [18, 20, 22, 24, 26, 28, 30, 32, 34, 36]) {
          const md = id + w;
          const si = md / w;
          if (si < 4 || si > 14) continue;
          const tc = len / w;
          const ac = tc - 1;
          if (ac < 3) continue;
          const ippt = (Math.pow(w, 4) * 11_500_000) / (10.18 * md * ac);
          const diff = Math.abs(ippt - targetIppt) / targetIppt * 100;
          if (diff < 5) {
            const g = WIRE_GAUGE_CHART.find(gc => Math.abs(gc.diameter - w) < 0.001);
            matches.push({ wire: w, wireLabel: g?.label || `${w.toFixed(4)}″`, id, length: len, ippt, diff });
          }
        }
      }
    }

    matches.sort((a, b) => a.diff - b.diff);
    return { srcIppt, targetIppt, matches: matches.slice(0, 15) };
  }, [srcWire, srcId, srcLength, mode]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setMode('2to1')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === '2to1' ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-600'}`}>
          2 Springs → 1 Spring
        </button>
        <button onClick={() => setMode('1to2')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === '1to2' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
          1 Spring → 2 Springs
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <SelectField label="Source Wire Size" value={srcWireIdx.toString()} onChange={v => setSrcWireIdx(parseInt(v))}>
          {WIRE_SIZES.map((ws, i) => {
            const g = WIRE_GAUGE_CHART.find(gc => Math.abs(gc.diameter - ws) < 0.001);
            return <option key={i} value={i}>{g?.label || `${ws.toFixed(4)}″`}</option>;
          })}
        </SelectField>
        <SelectField label="Source ID" value={srcIdIdx.toString()} onChange={v => setSrcIdIdx(parseInt(v))}>
          {INSIDE_DIAMETERS.map((id, i) => <option key={i} value={i}>{id}″</option>)}
        </SelectField>
        <NumberField label="Source Length" value={srcLength} onChange={setSrcLength} min={6} max={60} step={0.5} unit="in" />
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Source IPPT ({mode === '2to1' ? 'per spring' : 'single'})</p>
              <p className="text-xl font-mono font-bold text-gray-900">{result.srcIppt.toFixed(2)}</p>
            </div>
            <div className="bg-brand-blue/5 rounded-lg p-3 text-center">
              <p className="text-xs text-brand-blue">Target IPPT ({mode === '2to1' ? 'single' : 'per spring'})</p>
              <p className="text-xl font-mono font-bold text-brand-blue">{result.targetIppt.toFixed(2)}</p>
            </div>
          </div>

          {result.matches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-2 py-2 font-medium text-gray-600">Wire</th>
                    <th className="px-2 py-2 font-medium text-gray-600">ID</th>
                    <th className="px-2 py-2 font-medium text-gray-600">Length</th>
                    <th className="px-2 py-2 font-medium text-gray-600">IPPT</th>
                    <th className="px-2 py-2 font-medium text-gray-600">Match</th>
                  </tr>
                </thead>
                <tbody>
                  {result.matches.map((m, i) => (
                    <tr key={i} className={`border-b border-gray-100 ${i === 0 ? 'bg-green-50' : ''}`}>
                      <td className="px-2 py-1.5 font-mono">{m.wireLabel}</td>
                      <td className="px-2 py-1.5">{m.id}″</td>
                      <td className="px-2 py-1.5">{m.length}″</td>
                      <td className="px-2 py-1.5 font-mono font-medium">{m.ippt.toFixed(2)}</td>
                      <td className="px-2 py-1.5">
                        <span className={`px-1 py-0.5 rounded text-[10px] font-medium ${
                          m.diff < 1 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>{m.diff < 1 ? 'Exact' : `${m.diff.toFixed(1)}% off`}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-400 text-sm">No close matches within 5% tolerance.</p>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 4: WIRE SIZE FINDER
// ═══════════════════════════════════════════════════════════════════════════

function WireFinderTab() {
  const [coilCount, setCoilCount] = useState<10 | 20>(10);
  const [measurement, setMeasurement] = useState(2.625);

  const result = useMemo(() => {
    if (!measurement) return null;
    return lookupWireFromMeasurement(measurement, coilCount);
  }, [measurement, coilCount]);

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">How to Measure Wire Size (Service Spring Method)</h4>
        <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
          <li>Place a ruler across the tightly wound coils of the spring body</li>
          <li>Count exactly 10 or 20 consecutive coils (more = more accuracy)</li>
          <li>Measure the total length of those coils in inches</li>
          <li>Enter the measurement below to find the nearest standard wire size</li>
        </ol>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <SelectField label="Coils Counted" value={coilCount.toString()} onChange={v => setCoilCount(parseInt(v) as 10 | 20)}>
          <option value="10">10 Coils</option>
          <option value="20">20 Coils (more accurate)</option>
        </SelectField>
        <NumberField label="Total Measured Length" value={measurement} onChange={setMeasurement} min={0.5} max={15} step={0.001} unit="in" />
      </div>

      {result && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3">
            <p className="text-xs text-gray-500">Calculated diameter: <span className="font-mono font-bold text-gray-900">{result.exactDiameter.toFixed(4)}″</span></p>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Closest: {result.closestWire.label}</p>
                <p className="text-xs text-green-700">Difference: {Math.abs(result.closestWire.diameter - result.exactDiameter).toFixed(4)}″</p>
              </div>
            </div>
            {result.nextSmaller && (
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500">Next smaller:</span>
                <span className="text-sm font-mono text-gray-700">{result.nextSmaller.label}</span>
              </div>
            )}
            {result.nextLarger && (
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500">Next larger:</span>
                <span className="text-sm font-mono text-gray-700">{result.nextLarger.label}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <details className="mt-6 text-xs border border-gray-200 rounded-lg">
        <summary className="cursor-pointer font-medium text-gray-600 px-3 py-2 bg-gray-50 rounded-t-lg">Full Wire Gauge Chart</summary>
        <div className="max-h-60 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium text-gray-600">Gauge</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-600">Diameter</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-600">10-Coil</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-600">20-Coil</th>
              </tr>
            </thead>
            <tbody>
              {WIRE_GAUGE_CHART.map((wg, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="px-2 py-1">{wg.gauge}</td>
                  <td className="px-2 py-1 font-mono">{wg.diameter.toFixed(4)}″</td>
                  <td className="px-2 py-1 font-mono text-gray-500">{(wg.diameter * 10).toFixed(3)}″</td>
                  <td className="px-2 py-1 font-mono text-gray-500">{(wg.diameter * 20).toFixed(3)}″</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 5: CABLE LENGTH CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════

function CableLengthTab() {
  const [doorHeight, setDoorHeight] = useState(7);
  const [springSystem, setSpringSystem] = useState<'torsion' | 'extension'>('torsion');
  const [liftType, setLiftType] = useState<LiftType>('standard');
  const [drumType, setDrumType] = useState<DrumType>('standard-400');

  const availableDrums = getDrumsForLiftType(liftType);
  const activeDrum = availableDrums.includes(drumType) ? drumType : availableDrums[0];
  const cableLength = calculateCableLength(doorHeight, activeDrum, liftType, springSystem);

  const quickRef = springSystem === 'torsion'
    ? [
        { height: '7 ft', length: '102″ (8′ 6″)' },
        { height: '8 ft', length: '114″ (9′ 6″)' },
        { height: '9 ft', length: '126″ (10′ 6″)' },
        { height: '10 ft', length: '138″ (11′ 6″)' },
      ]
    : [
        { height: '7 ft', length: '~150″ (12′ 6″)' },
        { height: '8 ft', length: '~168″ (14′)' },
      ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Spring System</label>
          <div className="flex gap-2">
            {(['torsion', 'extension'] as const).map(sys => (
              <button key={sys} onClick={() => setSpringSystem(sys)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-display uppercase tracking-wider transition-colors ${
                  springSystem === sys
                    ? 'bg-brand-blue text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {sys === 'torsion' ? 'Torsion' : 'Extension'}
              </button>
            ))}
          </div>
        </div>
        <NumberField label="Door Height" value={doorHeight} onChange={setDoorHeight} min={6} max={20} step={0.5} unit="ft" />
        {springSystem === 'torsion' && (
          <>
            <SelectField label="Lift Type" value={liftType} onChange={v => { setLiftType(v as LiftType); setDrumType(getDrumsForLiftType(v as LiftType)[0]); }}>
              {Object.entries(LIFT_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </SelectField>
            <SelectField label="Cable Drum" value={drumType} onChange={v => setDrumType(v as DrumType)}>
              {availableDrums.map(dt => <option key={dt} value={dt}>{DRUM_RADII[dt].label}</option>)}
            </SelectField>
          </>
        )}
      </div>

      <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-6 text-center">
        <p className="text-xs text-brand-blue uppercase tracking-wider mb-1">Recommended Cable Length</p>
        <p className="text-4xl font-mono font-bold text-brand-blue">{cableLength}″</p>
        <p className="text-lg text-gray-600 font-mono">{(cableLength / 12).toFixed(1)} ft</p>
        <p className="text-xs text-gray-400 mt-2">Per side — order 2 cables total</p>
      </div>

      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <h4 className="text-xs font-display text-gray-700 uppercase tracking-wider mb-2">
          Quick Reference — {springSystem === 'torsion' ? 'Standard Lift (4″ Drum)' : 'Extension Spring'}
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {quickRef.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1 rounded bg-white text-xs">
              <span className="text-gray-600 font-medium">{r.height}</span>
              <span className="text-brand-blue font-mono">{r.length}</span>
            </div>
          ))}
        </div>
        {springSystem === 'torsion' && (
          <p className="text-xs text-gray-400 mt-2">Rule of thumb: door height + 18″</p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-display text-gray-700 uppercase tracking-wider mb-2">Extension Spring Color Codes</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {EXTENSION_SPRING_COLORS.map((sc, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1 rounded bg-gray-50 text-xs">
              <span className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" style={{ backgroundColor: sc.hex }} />
              <span className="text-gray-700 font-medium">{sc.color}</span>
              <span className="text-gray-400 ml-auto">{sc.weightRange}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default function SpringCalculator() {
  const [activeTab, setActiveTab] = useState<CalcTab>('calculator');

  return (
    <section id="spring-calculator" className="scroll-mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-brand-red mb-2">
          <Calculator className="w-4 h-4" />
          Professional Tool
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-brand-blue mb-3">
          DASMA Spring <span className="text-brand-red">Calculator</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Industry-standard torsion spring sizing using the DASMA formula: IPPT = (d⁴ × G) / (10.18 × D × Nₐ).
          Five integrated tools for complete spring system analysis.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mb-8">
        {TAB_CONFIG.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { backgroundColor: tab.color } : undefined}>
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {activeTab === 'calculator' && <CalculatorTab />}
            {activeTab === 'weight-lookup' && <WeightLookupTab />}
            {activeTab === 'conversion' && <ConversionTab />}
            {activeTab === 'wire-finder' && <WireFinderTab />}
            {activeTab === 'cable-length' && <CableLengthTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-red-700 leading-relaxed">
          <strong>Professional Use Advisory:</strong> Torsion springs store lethal amounts of energy. These calculations are reference tools
          for qualified technicians. Never attempt spring replacement without proper winding bars, safety equipment, and professional training.
          Always verify against manufacturer specifications.
        </p>
      </div>
    </section>
  );
}
