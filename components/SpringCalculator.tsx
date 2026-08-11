'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Calculator, Search, ArrowRightLeft, Ruler, AlertTriangle, CheckCircle, ChevronDown, Scale } from 'lucide-react';
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
  type SpringMatch,
} from '@/lib/spring-calculator';

type CalcTab = 'calculator' | 'weight-lookup' | 'conversion' | 'wire-finder' | 'cable-length';

const TAB_CONFIG: { id: CalcTab; label: string; shortLabel: string; icon: typeof Calculator; color: string }[] = [
  { id: 'calculator', label: 'Spring Calculator', shortLabel: 'Calculator', icon: Calculator, color: '#002868' },
  { id: 'weight-lookup', label: 'Find by Door Weight', shortLabel: 'By Weight', icon: Search, color: '#bf0a30' },
  { id: 'conversion', label: '2↔1 Conversion', shortLabel: '2↔1', icon: ArrowRightLeft, color: '#d97706' },
  { id: 'wire-finder', label: 'Wire Size Finder', shortLabel: 'Wire Size', icon: Ruler, color: '#059669' },
  { id: 'cable-length', label: 'Cable Length', shortLabel: 'Cable', icon: Ruler, color: '#7c3aed' },
];

const SIMPLIFIED_WIRE_SIZES = [0.1920, 0.2070, 0.2187, 0.2253, 0.2343, 0.2437, 0.2500, 0.2625, 0.2730, 0.2812, 0.2950, 0.3065, 0.3125, 0.3310, 0.3437, 0.3625, 0.3750];

const SIMPLIFIED_IDS = [
  { value: 1.75, label: '1 3/4″ (1.75)' },
  { value: 2.0, label: '2″ (2.00)' },
  { value: 2.1875, label: '2 3/16″ (2.1875)' },
  { value: 2.25, label: '2 1/4″ (2.25)' },
  { value: 2.625, label: '2 5/8″ (2.625)' },
  { value: 3.75, label: '3 3/4″ (3.75)' },
];

function SelectField({ label, value, onChange, children, helpText }: {
  label: string; value: string; onChange: (v: string) => void; children: React.ReactNode; helpText?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold appearance-none pr-8 backdrop-blur-sm [&>option]:bg-gray-900 [&>option]:text-white">
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
      <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input type="number" value={value || ''} onChange={e => onChange(parseFloat(e.target.value) || 0)}
          min={min} max={max} step={step || 0.01}
          className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold backdrop-blur-sm" />
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
    <div className={`flex items-center justify-between py-1.5 px-3 rounded ${highlight ? 'bg-brand-gold/10' : ''} ${warn ? 'bg-red-900/20' : ''}`}>
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-sm font-mono font-medium ${warn ? 'text-red-400' : highlight ? 'text-brand-gold' : 'text-white'}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}{unit ? ` ${unit}` : ''}
      </span>
    </div>
  );
}

function GaugeRing({ value, max, label, sublabel, color, unit }: {
  value: number; max: number; label: string; sublabel?: string; color: string; unit?: string;
}) {
  const pct = Math.min(value / max, 1);
  const circumference = 2 * Math.PI * 38;
  const dashLen = pct * circumference * 0.75;

  return (
    <div className="text-center">
      <svg viewBox="0 0 100 80" className="w-full max-w-[130px] mx-auto">
        <path d="M 12 65 A 38 38 0 1 1 88 65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" strokeLinecap="round" />
        <path d="M 12 65 A 38 38 0 1 1 88 65" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${dashLen} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }} />
        <text x="50" y="50" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui">
          {typeof value === 'number' && value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toFixed(1)}{unit || ''}
        </text>
        <text x="50" y="64" textAnchor="middle" fill={color} fontSize="8" fontFamily="system-ui" fontWeight="600">{label}</text>
        {sublabel && (
          <text x="50" y="74" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="system-ui">{sublabel}</text>
        )}
      </svg>
    </div>
  );
}

const WEIGHT_OPTIONS = [
  { value: 0, label: 'Select weight...' },
  { value: 80, label: '80 lbs' }, { value: 100, label: '100 lbs' }, { value: 120, label: '120 lbs' },
  { value: 140, label: '140 lbs' }, { value: 150, label: '150 lbs' }, { value: 160, label: '160 lbs' },
  { value: 175, label: '175 lbs' }, { value: 200, label: '200 lbs' }, { value: 225, label: '225 lbs' },
  { value: 250, label: '250 lbs' }, { value: 275, label: '275 lbs' }, { value: 300, label: '300 lbs' },
  { value: 350, label: '350 lbs' }, { value: 400, label: '400 lbs' },
];

function CalculatorTab() {
  const [wireSize, setWireSize] = useState(0.2253);
  const [insideDiameter, setInsideDiameter] = useState(2.0);
  const [coilLength, setCoilLength] = useState(24);
  const [doorHeight, setDoorHeight] = useState(7);
  const [numSprings, setNumSprings] = useState<1 | 2>(2);
  const [drumType, setDrumType] = useState<DrumType>('standard-400');
  const [windDir, setWindDir] = useState<WindDirection>('left');
  const [targetWeight, setTargetWeight] = useState(0);

  const wireIdx = WIRE_SIZES.findIndex(w => Math.abs(w - wireSize) < 0.0005);
  const idIdx = INSIDE_DIAMETERS.indexOf(insideDiameter) >= 0
    ? INSIDE_DIAMETERS.indexOf(insideDiameter)
    : INSIDE_DIAMETERS.findIndex(id => Math.abs(id - insideDiameter) < 0.001);

  const result = useMemo(() => {
    if (wireIdx < 0 || idIdx < 0 || !coilLength || !doorHeight) return null;
    return calculateSpring({
      wireDiameter: WIRE_SIZES[wireIdx],
      insideDiameter: INSIDE_DIAMETERS[idIdx >= 0 ? idIdx : 2],
      springLength: coilLength,
      doorWeight: 150,
      doorHeight,
      drumType,
      numberOfSprings: numSprings,
      liftType: 'standard',
      windDirection: windDir,
    });
  }, [wireIdx, idIdx, coilLength, doorHeight, drumType, numSprings, windDir]);

  const balancedWeight = useMemo(() => {
    if (!result) return null;
    const drumRadius = DRUM_RADII[drumType].radius;
    const drumTurns = (doorHeight * 12) / (2 * Math.PI * drumRadius);
    return (result.ippt * numSprings * drumTurns) / drumRadius;
  }, [result, drumType, doorHeight, numSprings]);

  const suggestedPair = useMemo(() => {
    if (!targetWeight || !doorHeight) return null;
    const matches = findSpringsForDoor(targetWeight, doorHeight, numSprings, drumType, 10000);
    return matches.length > 0 ? matches[0] : null;
  }, [targetWeight, doorHeight, numSprings, drumType]);

  const wireLabel = WIRE_GAUGE_CHART.find(g => Math.abs(g.diameter - wireSize) < 0.001);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input side */}
      <div className="space-y-5">
        <h4 className="text-xs font-display text-brand-gold uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-8 h-px bg-brand-gold/40" />Spring Parameters
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Spring ID (Inside Diameter)" value={insideDiameter.toString()} onChange={v => setInsideDiameter(parseFloat(v))}>
            {SIMPLIFIED_IDS.map(id => <option key={id.value} value={id.value}>{id.label}</option>)}
          </SelectField>
          <SelectField label="Wire Size" value={wireSize.toString()} onChange={v => setWireSize(parseFloat(v))}>
            {SIMPLIFIED_WIRE_SIZES.map(ws => {
              const g = WIRE_GAUGE_CHART.find(gc => Math.abs(gc.diameter - ws) < 0.001);
              return <option key={ws} value={ws}>{g ? `${ws.toFixed(3)}″ (${g.gauge} ga)` : `${ws.toFixed(4)}″`}</option>;
            })}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Coil Length" value={coilLength} onChange={setCoilLength} min={6} max={60} step={0.5} unit="in" helpText="Measure coil body only — exclude cones" />
          <SelectField label="Drum Type" value={drumType} onChange={v => setDrumType(v as DrumType)}>
            {Object.entries(DRUM_RADII).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </SelectField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Spring Count" value={numSprings.toString()} onChange={v => setNumSprings(parseInt(v) as 1 | 2)}>
            <option value="1">1 Spring (Single)</option>
            <option value="2">2 Springs (Pair)</option>
          </SelectField>
          <NumberField label="Door Height" value={doorHeight} onChange={setDoorHeight} min={6} max={20} step={0.5} unit="ft" />
        </div>

        <SelectField label="Wind Direction" value={windDir} onChange={v => setWindDir(v as WindDirection)}
          helpText={WIND_DIRECTION_INFO[windDir].coneColor + ' cone'}>
          <option value="left">Left-Hand Wound</option>
          <option value="right">Right-Hand Wound</option>
        </SelectField>

        <div className="border-t border-white/10 pt-5 mt-2">
          <h4 className="text-xs font-display text-brand-gold uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-brand-gold/40" />Reverse Engineer
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <SelectField label="Door Weight" value={targetWeight.toString()} onChange={v => setTargetWeight(parseInt(v))}>
              {WEIGHT_OPTIONS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </SelectField>
            <SelectField label="Spring Count" value={numSprings.toString()} onChange={v => setNumSprings(parseInt(v) as 1 | 2)}>
              <option value="2">2 Springs (Pair)</option>
              <option value="1">1 Spring (Single)</option>
            </SelectField>
          </div>
          {suggestedPair && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-green-500/30 bg-green-900/15 p-4"
            >
              <p className="text-[10px] font-display text-green-400 uppercase tracking-[0.2em] mb-2">Suggested Pair Configuration</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Wire Size</span>
                  <span className="text-white font-mono">{suggestedPair.wireLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Inside Diameter</span>
                  <span className="text-white font-mono">{suggestedPair.insideDiameter}″</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Coil Length</span>
                  <span className="text-white font-mono">{suggestedPair.springLength}″</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">IPPT</span>
                  <span className="text-brand-gold font-mono font-medium">{suggestedPair.ippt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Cycles</span>
                  <span className="text-white font-mono">{suggestedPair.estimatedCycles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stress</span>
                  <span className={`font-mono ${suggestedPair.stressIndex > 55 ? 'text-red-400' : suggestedPair.stressIndex > 45 ? 'text-amber-400' : 'text-green-400'}`}>
                    {suggestedPair.stressIndex.toFixed(0)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setWireSize(WIRE_SIZES.find(w => Math.abs(w - suggestedPair.wireDiameter) < 0.001) || suggestedPair.wireDiameter);
                  setInsideDiameter(suggestedPair.insideDiameter);
                  setCoilLength(suggestedPair.springLength);
                }}
                className="mt-3 w-full text-xs font-display uppercase tracking-wider text-green-400 border border-green-500/30 rounded-lg py-2 hover:bg-green-900/20 transition-colors"
              >
                Load into Calculator ↑
              </button>
            </motion.div>
          )}
        </div>

        <details className="text-xs text-gray-400 border border-white/10 rounded-lg p-2">
          <summary className="cursor-pointer font-medium text-gray-300">Door Weight Reference</summary>
          <div className="mt-2 space-y-0.5 max-h-36 overflow-y-auto">
            {STANDARD_DOORS.map((d, i) => (
              <div key={i} className="flex justify-between py-0.5 hover:bg-white/5 px-1 rounded cursor-pointer"
                onClick={() => setDoorHeight(d.height)}>
                <span className="text-gray-300">{d.label}</span>
                <span className="text-gray-500">{d.weightRange[0]}–{d.weightRange[1]} lbs</span>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* Results side */}
      <div className="space-y-5">
        {/* Balanced Weight hero card */}
        {balancedWeight && result && result.isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/15 to-transparent p-5"
          >
            <Scale className="absolute top-3 right-3 w-8 h-8 text-brand-gold/20" />
            <p className="text-xs font-display text-brand-gold uppercase tracking-[0.2em] mb-1">Suggested Balanced Weight</p>
            <p className="text-4xl font-mono font-bold text-white">{Math.round(balancedWeight)} <span className="text-lg text-gray-400">lbs</span></p>
            <p className="text-xs text-gray-400 mt-1">
              {wireLabel?.label || `${wireSize}″`} wire × {insideDiameter}″ ID × {coilLength}″ coil × {numSprings} spring{numSprings > 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Gauges */}
        {result && result.isValid && (
          <div className="grid grid-cols-3 gap-3">
            <GaugeRing value={result.ippt} max={40} label="IPPT" sublabel="in-lbs/turn" color="#ffbd59" />
            <GaugeRing
              value={result.stressIndex}
              max={80}
              label="STRESS"
              sublabel="Wahl-corrected"
              color={result.stressIndex > 60 ? '#C41E24' : result.stressIndex > 45 ? '#d97706' : '#059669'}
              unit="%"
            />
            <GaugeRing value={result.estimatedCycles} max={100000} label="CYCLES" sublabel={`~${result.yearsAtFourCyclesPerDay.toFixed(0)} yrs`} color="#059669" />
          </div>
        )}

        {/* Detail rows */}
        {result && result.isValid && (
          <div className="border border-white/10 rounded-lg divide-y divide-white/5 text-sm">
            <div className="px-3 py-2 bg-white/5 rounded-t-lg">
              <p className="text-[10px] font-display text-gray-400 uppercase tracking-wider">Spring Properties</p>
            </div>
            <div className="p-1 space-y-0.5">
              <ResultRow label="IPPT (Inch-Pounds Per Turn)" value={result.ippt} highlight />
              <ResultRow label="Mean Coil Diameter" value={`${result.meanDiameter.toFixed(3)}″`} />
              <ResultRow label="Spring Index (D/d)" value={result.springIndex.toFixed(1)} />
              <ResultRow label="Active Coils (Nₐ)" value={result.activeCoils.toFixed(1)} />
            </div>
            <div className="px-3 py-2 bg-white/5">
              <p className="text-[10px] font-display text-gray-400 uppercase tracking-wider">Application</p>
            </div>
            <div className="p-1 space-y-0.5">
              <ResultRow label="Turns Required" value={result.turnsRequired.toFixed(1)} highlight />
              <ResultRow label="Total Turns (+ preload)" value={result.totalTurns.toFixed(1)} highlight />
              <ResultRow label="Max Safe Turns" value={result.maxSafeTurns.toFixed(1)} warn={result.totalTurns > result.maxSafeTurns} />
              <ResultRow label="Drum Turns" value={result.drumTurns.toFixed(1)} />
              <ResultRow label="Cable Length" value={`${result.cableLength}″`} />
            </div>
            <div className="px-3 py-2 bg-white/5">
              <p className="text-[10px] font-display text-gray-400 uppercase tracking-wider">Stress & Life</p>
            </div>
            <div className="p-1 space-y-0.5">
              <ResultRow label="Corrected Stress" value={`${result.correctedStress.toFixed(0)} psi`} />
              <ResultRow label="Stress Index" value={`${result.stressIndex.toFixed(1)}%`} warn={result.stressIndex > 60} />
              <ResultRow label="Estimated Cycles" value={result.estimatedCycles.toLocaleString()} highlight />
              <ResultRow label="Years (@ 4/day)" value={`~${result.yearsAtFourCyclesPerDay.toFixed(1)} yrs`} />
              <ResultRow label="Stored Energy" value={`${result.storedEnergy.toFixed(0)} in-lbs`} />
            </div>
          </div>
        )}

        {result && result.warnings.length > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-400 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Warnings</p>
            {result.warnings.map((w, i) => <p key={i} className="text-xs text-red-300">{w}</p>)}
          </div>
        )}

        {!result && (
          <div className="flex items-center justify-center h-48 text-gray-500">
            <p className="text-sm">Enter spring parameters to see results</p>
          </div>
        )}
      </div>
    </div>
  );
}

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
              <tr className="bg-white/5 text-left">
                <th className="px-2 py-2 font-medium text-gray-400">Wire Size</th>
                <th className="px-2 py-2 font-medium text-gray-400">ID</th>
                <th className="px-2 py-2 font-medium text-gray-400">Length</th>
                <th className="px-2 py-2 font-medium text-gray-400">IPPT</th>
                <th className="px-2 py-2 font-medium text-gray-400">Turns</th>
                <th className="px-2 py-2 font-medium text-gray-400">Stress</th>
                <th className="px-2 py-2 font-medium text-gray-400">Cycles</th>
                <th className="px-2 py-2 font-medium text-gray-400">Rating</th>
              </tr>
            </thead>
            <tbody>
              {matches.slice(0, 25).map((m, i) => (
                <tr key={i} className={`border-b border-white/5 ${i < 3 ? 'bg-green-900/10' : ''}`}>
                  <td className="px-2 py-1.5 font-mono text-white">{m.wireLabel}</td>
                  <td className="px-2 py-1.5 text-gray-300">{m.insideDiameter}″</td>
                  <td className="px-2 py-1.5 text-gray-300">{m.springLength}″</td>
                  <td className="px-2 py-1.5 font-mono font-medium text-brand-gold">{m.ippt.toFixed(2)}</td>
                  <td className="px-2 py-1.5 text-gray-300">{m.totalTurns.toFixed(1)}</td>
                  <td className="px-2 py-1.5">
                    <span className={`px-1 py-0.5 rounded text-[10px] font-medium ${
                      m.stressIndex > 55 ? 'bg-red-900/30 text-red-400' : m.stressIndex > 45 ? 'bg-amber-900/30 text-amber-400' : 'bg-green-900/30 text-green-400'
                    }`}>{m.stressIndex.toFixed(0)}%</span>
                  </td>
                  <td className="px-2 py-1.5 text-gray-300">{m.estimatedCycles.toLocaleString()}</td>
                  <td className="px-2 py-1.5 text-gray-500">{m.cycleCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-500 mt-2 text-right">Top {Math.min(matches.length, 25)} of {matches.length} matches</p>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-sm">No matching springs found. Try adjusting parameters.</p>
        </div>
      )}
    </div>
  );
}

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
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === '2to1' ? 'bg-brand-red text-white' : 'bg-white/10 text-gray-400'}`}>
          2 Springs → 1 Spring
        </button>
        <button onClick={() => setMode('1to2')}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === '1to2' ? 'bg-brand-blue text-white' : 'bg-white/10 text-gray-400'}`}>
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
            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
              <p className="text-xs text-gray-500">Source IPPT ({mode === '2to1' ? 'per spring' : 'single'})</p>
              <p className="text-xl font-mono font-bold text-white">{result.srcIppt.toFixed(2)}</p>
            </div>
            <div className="bg-brand-gold/10 rounded-lg p-3 text-center border border-brand-gold/30">
              <p className="text-xs text-brand-gold">Target IPPT ({mode === '2to1' ? 'single' : 'per spring'})</p>
              <p className="text-xl font-mono font-bold text-brand-gold">{result.targetIppt.toFixed(2)}</p>
            </div>
          </div>

          {result.matches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5 text-left">
                    <th className="px-2 py-2 font-medium text-gray-400">Wire</th>
                    <th className="px-2 py-2 font-medium text-gray-400">ID</th>
                    <th className="px-2 py-2 font-medium text-gray-400">Length</th>
                    <th className="px-2 py-2 font-medium text-gray-400">IPPT</th>
                    <th className="px-2 py-2 font-medium text-gray-400">Match</th>
                  </tr>
                </thead>
                <tbody>
                  {result.matches.map((m, i) => (
                    <tr key={i} className={`border-b border-white/5 ${i === 0 ? 'bg-green-900/10' : ''}`}>
                      <td className="px-2 py-1.5 font-mono text-white">{m.wireLabel}</td>
                      <td className="px-2 py-1.5 text-gray-300">{m.id}″</td>
                      <td className="px-2 py-1.5 text-gray-300">{m.length}″</td>
                      <td className="px-2 py-1.5 font-mono font-medium text-brand-gold">{m.ippt.toFixed(2)}</td>
                      <td className="px-2 py-1.5">
                        <span className={`px-1 py-0.5 rounded text-[10px] font-medium ${
                          m.diff < 1 ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'
                        }`}>{m.diff < 1 ? 'Exact' : `${m.diff.toFixed(1)}% off`}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500 text-sm">No close matches within 5% tolerance.</p>
          )}
        </>
      )}
    </div>
  );
}

function WireFinderTab() {
  const [coilCount, setCoilCount] = useState<10 | 20>(10);
  const [measurement, setMeasurement] = useState(2.625);

  const result = useMemo(() => {
    if (!measurement) return null;
    return lookupWireFromMeasurement(measurement, coilCount);
  }, [measurement, coilCount]);

  return (
    <div>
      <div className="bg-brand-blue/20 border border-brand-blue/30 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">How to Measure Wire Size</h4>
        <ol className="text-xs text-blue-200 space-y-1 list-decimal list-inside">
          <li>Place a ruler across the tightly wound coils of the spring body</li>
          <li>Count exactly 10 or 20 consecutive coils</li>
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
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <div className="bg-white/5 px-4 py-3">
            <p className="text-xs text-gray-400">Calculated diameter: <span className="font-mono font-bold text-white">{result.exactDiameter.toFixed(4)}″</span></p>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-300">Closest: {result.closestWire.label}</p>
                <p className="text-xs text-green-400">Difference: {Math.abs(result.closestWire.diameter - result.exactDiameter).toFixed(4)}″</p>
              </div>
            </div>
            {result.nextSmaller && (
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                <span className="text-xs text-gray-500">Next smaller:</span>
                <span className="text-sm font-mono text-gray-300">{result.nextSmaller.label}</span>
              </div>
            )}
            {result.nextLarger && (
              <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
                <span className="text-xs text-gray-500">Next larger:</span>
                <span className="text-sm font-mono text-gray-300">{result.nextLarger.label}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <details className="mt-6 text-xs border border-white/10 rounded-lg">
        <summary className="cursor-pointer font-medium text-gray-400 px-3 py-2 bg-white/5 rounded-t-lg">Full Wire Gauge Chart</summary>
        <div className="max-h-60 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-white/5 sticky top-0">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium text-gray-400">Gauge</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-400">Diameter</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-400">10-Coil</th>
                <th className="px-2 py-1.5 text-left font-medium text-gray-400">20-Coil</th>
              </tr>
            </thead>
            <tbody>
              {WIRE_GAUGE_CHART.map((wg, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-2 py-1 text-gray-300">{wg.gauge}</td>
                  <td className="px-2 py-1 font-mono text-white">{wg.diameter.toFixed(4)}″</td>
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
          <label className="block text-xs font-semibold text-gray-200 mb-1.5 uppercase tracking-wider">Spring System</label>
          <div className="flex gap-2">
            {(['torsion', 'extension'] as const).map(sys => (
              <button key={sys} onClick={() => setSpringSystem(sys)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-display uppercase tracking-wider transition-colors ${
                  springSystem === sys
                    ? 'bg-brand-blue text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
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

      <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-6 text-center">
        <p className="text-xs text-brand-gold uppercase tracking-wider mb-1">Recommended Cable Length</p>
        <p className="text-4xl font-mono font-bold text-white">{cableLength}″</p>
        <p className="text-lg text-gray-400 font-mono">{(cableLength / 12).toFixed(1)} ft</p>
        <p className="text-xs text-gray-500 mt-2">Per side — order 2 cables total</p>
      </div>

      <div className="mt-4 bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="text-xs font-display text-gray-400 uppercase tracking-wider mb-2">
          Quick Reference — {springSystem === 'torsion' ? 'Standard Lift (4″ Drum)' : 'Extension Spring'}
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {quickRef.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1 rounded bg-white/5 text-xs">
              <span className="text-gray-400 font-medium">{r.height}</span>
              <span className="text-brand-gold font-mono">{r.length}</span>
            </div>
          ))}
        </div>
        {springSystem === 'torsion' && (
          <p className="text-xs text-gray-500 mt-2">Rule of thumb: door height + 18″</p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-display text-gray-400 uppercase tracking-wider mb-2">Extension Spring Color Codes</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {EXTENSION_SPRING_COLORS.map((sc, i) => (
            <div key={i} className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 text-xs border border-white/5">
              <span className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: sc.hex }} />
              <span className="text-gray-300 font-medium">{sc.color}</span>
              <span className="text-gray-500 ml-auto">{sc.weightRange}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SpringCalculator() {
  const [activeTab, setActiveTab] = useState<CalcTab>('calculator');

  return (
    <section id="spring-calculator" className="scroll-mt-24">
      {/* Dark container for visual pop */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-[#0a1628] to-gray-900 border border-white/10 shadow-2xl">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-red/8 rounded-full blur-[100px]" />

        <div className="relative z-10 px-6 md:px-10 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Image src="/images/logos/tngd-logo-small-1.png" alt="Top-Notch Garage Doors" width={48} height={48} className="rounded-lg" />
              <div className="text-left">
                <div className="inline-flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.25em] text-brand-red">
                  <Calculator className="w-3.5 h-3.5" />
                  Professional Tool
                </div>
                <h2 className="font-display text-2xl md:text-3xl text-white leading-tight">
                  TNGD Spring <span className="text-brand-gold">Calculator</span>
                </h2>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              Industry-standard torsion spring sizing: IPPT = (d⁴ × G) / (10.18 × D × Nₐ).
              Five integrated tools for complete spring system analysis.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-8">
            {TAB_CONFIG.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                    isActive
                      ? 'text-white shadow-lg border-white/20'
                      : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-gray-200'
                  }`}
                  style={isActive ? { backgroundColor: tab.color, boxShadow: `0 4px 20px ${tab.color}40` } : undefined}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
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
      </div>

      {/* Safety warning (outside dark container) */}
      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-red-700 leading-relaxed">
          <strong>Professional Use Advisory:</strong> Torsion springs store lethal amounts of energy. These calculations are reference tools
          for qualified technicians. Never attempt spring replacement without proper winding bars, safety equipment, and professional training.
        </p>
      </div>
    </section>
  );
}
