/**
 * Garage Door Torsion Spring Calculator — DASMA-Standard Engine
 *
 * Industry-standard formulas for torsion spring sizing, validated against:
 *   - garagedoorspringcalculator.com (field reference)
 *   - diygaragedoorparts.com (conversion reference)
 *   - servicespring.com (measurement reference)
 *   - DASMA Technical Data Sheet 161
 *
 * Core IPPT Formula:
 *   IPPT = (d⁴ × G) / (10.18 × D × Nₐ)
 *
 * Where:
 *   d    = wire diameter (inches)
 *   G    = modulus of rigidity (11,500,000 psi for oil-tempered wire per ASTM A229)
 *   D    = mean coil diameter = ID + d (inside diameter + wire size)
 *   Nₐ   = number of active coils (total coils minus dead coils)
 *   10.18 = geometric constant (≈ 32/π = 10.186)
 *
 * Torque Requirement:
 *   T = (W × r) / n
 *
 * Where:
 *   W = door weight (lbs)
 *   r = cable drum radius (inches)
 *   n = number of springs
 *
 * Turns Required:
 *   turns = T / IPPT + preload
 *
 * Wahl Correction Factor (wire curvature stress):
 *   K = ((4c − 1) / (4c − 4)) + (0.615 / c)
 *   where c = D/d (spring index)
 *
 * Stored Energy:
 *   U = 0.5 × IPPT × turns²  (inch-pounds)
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const G_OIL_TEMPERED = 11_500_000;

// ---------------------------------------------------------------------------
// Lift Types
// ---------------------------------------------------------------------------

export type LiftType = 'standard' | 'high-lift' | 'vertical' | 'low-headroom';

export const LIFT_TYPES: Record<LiftType, { label: string; description: string }> = {
  standard: {
    label: 'Standard Lift',
    description: 'Door follows standard track radius into horizontal tracks parallel to ceiling. Most common residential setup.',
  },
  'high-lift': {
    label: 'High Lift',
    description: 'Vertical track extends above the opening before transitioning to horizontal. Used when ceiling is higher than the door opening.',
  },
  vertical: {
    label: 'Vertical Lift',
    description: 'Door travels straight up with no horizontal track. Common on commercial doors and docks.',
  },
  'low-headroom': {
    label: 'Low Headroom',
    description: 'Uses rear-mount torsion or quick-turn brackets for spaces with minimal headroom above the opening.',
  },
};

// ---------------------------------------------------------------------------
// Cable Drum Models
// ---------------------------------------------------------------------------

export const DRUM_RADII = {
  'standard-400': { radius: 2.0, label: 'Standard 400 (4″ drum)', liftTypes: ['standard', 'low-headroom'] as LiftType[] },
  'high-lift-400': { radius: 2.0, label: 'High-Lift 400 (4″ drum)', liftTypes: ['high-lift'] as LiftType[] },
  'high-lift-525': { radius: 2.625, label: 'High-Lift 525 (5.25″ drum)', liftTypes: ['high-lift'] as LiftType[] },
  'high-lift-575': { radius: 2.875, label: 'High-Lift 575 (5.75″ drum)', liftTypes: ['high-lift'] as LiftType[] },
  'high-lift-600': { radius: 3.0, label: 'High-Lift 600 (6″ drum)', liftTypes: ['high-lift'] as LiftType[] },
  'high-lift-800': { radius: 4.0, label: 'High-Lift 800 (8″ drum)', liftTypes: ['high-lift'] as LiftType[] },
  'vertical-lift': { radius: 2.0, label: 'Vertical Lift (4″ drum)', liftTypes: ['vertical'] as LiftType[] },
  'd-400': { radius: 2.0, label: 'D-400 Duplex (4″ drum)', liftTypes: ['standard'] as LiftType[] },
} as const;

export type DrumType = keyof typeof DRUM_RADII;

export function getDrumsForLiftType(liftType: LiftType): DrumType[] {
  return (Object.entries(DRUM_RADII) as [DrumType, typeof DRUM_RADII[DrumType]][])
    .filter(([, config]) => config.liftTypes.includes(liftType))
    .map(([key]) => key);
}

// ---------------------------------------------------------------------------
// Wire Sizes (industry standard range, inches)
// ---------------------------------------------------------------------------

export const WIRE_SIZES = [
  0.1480, 0.1563, 0.1620, 0.1770, 0.1875, 0.1920, 0.2070, 0.2187, 0.2253,
  0.2343, 0.2437, 0.2500, 0.2625, 0.2730, 0.2812, 0.2950, 0.3065, 0.3125,
  0.3310, 0.3437, 0.3625, 0.3750, 0.3938, 0.4062, 0.4305, 0.4375, 0.4615,
  0.4687, 0.5000, 0.5312, 0.5625, 0.5938, 0.6250,
];

// Inside Diameters (inches)
export const INSIDE_DIAMETERS = [1.75, 1.8125, 2.0, 2.1875, 2.25, 2.625, 3.375, 3.75, 4.0, 4.5, 5.25, 5.75, 6.0];

// ---------------------------------------------------------------------------
// Wire Gauge Chart (Service Spring measurement reference)
// ---------------------------------------------------------------------------

export const WIRE_GAUGE_CHART: { gauge: number | string; diameter: number; label: string; fractional?: string }[] = [
  { gauge: 9, diameter: 0.1480, label: '9 ga — 0.148″' },
  { gauge: '5/32″', diameter: 0.1563, label: '5/32″ — 0.1563″', fractional: '5/32' },
  { gauge: 8, diameter: 0.1620, label: '8 ga — 0.162″' },
  { gauge: 7, diameter: 0.1770, label: '7 ga — 0.177″' },
  { gauge: '3/16″', diameter: 0.1875, label: '3/16″ — 0.1875″', fractional: '3/16' },
  { gauge: 6, diameter: 0.1920, label: '6 ga — 0.192″' },
  { gauge: 5, diameter: 0.2070, label: '5 ga — 0.207″' },
  { gauge: '7/32″', diameter: 0.2187, label: '7/32″ — 0.2187″', fractional: '7/32' },
  { gauge: 4, diameter: 0.2253, label: '4 ga — 0.2253″' },
  { gauge: '15/64″', diameter: 0.2343, label: '15/64″ — 0.2343″', fractional: '15/64' },
  { gauge: 3, diameter: 0.2437, label: '3 ga — 0.2437″' },
  { gauge: '1/4″', diameter: 0.2500, label: '1/4″ — 0.250″', fractional: '1/4' },
  { gauge: 2, diameter: 0.2625, label: '2 ga — 0.2625″' },
  { gauge: 1.5, diameter: 0.2730, label: '1.5 ga — 0.273″' },
  { gauge: '9/32″', diameter: 0.2812, label: '9/32″ — 0.2812″', fractional: '9/32' },
  { gauge: 0.5, diameter: 0.2950, label: '0.5 ga — 0.295″' },
  { gauge: 0, diameter: 0.3065, label: '0 ga — 0.3065″' },
  { gauge: '5/16″', diameter: 0.3125, label: '5/16″ — 0.3125″', fractional: '5/16' },
  { gauge: -1, diameter: 0.3310, label: '−1 ga — 0.331″' },
  { gauge: '11/32″', diameter: 0.3437, label: '11/32″ — 0.3437″', fractional: '11/32' },
  { gauge: -2, diameter: 0.3625, label: '−2 ga — 0.3625″' },
  { gauge: '3/8″', diameter: 0.3750, label: '3/8″ — 0.375″', fractional: '3/8' },
  { gauge: -3, diameter: 0.3938, label: '−3 ga — 0.3938″' },
  { gauge: '13/32″', diameter: 0.4062, label: '13/32″ — 0.4062″', fractional: '13/32' },
  { gauge: -4, diameter: 0.4305, label: '−4 ga — 0.4305″' },
  { gauge: '7/16″', diameter: 0.4375, label: '7/16″ — 0.4375″', fractional: '7/16' },
  { gauge: -5, diameter: 0.4615, label: '−5 ga — 0.4615″' },
  { gauge: '15/32″', diameter: 0.4687, label: '15/32″ — 0.4687″', fractional: '15/32' },
  { gauge: -6, diameter: 0.5000, label: '1/2″ — 0.500″', fractional: '1/2' },
  { gauge: '17/32″', diameter: 0.5312, label: '17/32″ — 0.5312″', fractional: '17/32' },
  { gauge: '9/16″', diameter: 0.5625, label: '9/16″ — 0.5625″', fractional: '9/16' },
  { gauge: '19/32″', diameter: 0.5938, label: '19/32″ — 0.5938″', fractional: '19/32' },
  { gauge: '5/8″', diameter: 0.6250, label: '5/8″ — 0.625″', fractional: '5/8' },
];

// ---------------------------------------------------------------------------
// Wire Measurement Lookup (Service Spring 10/20-coil method)
// ---------------------------------------------------------------------------

export function lookupWireFromMeasurement(
  measuredLength: number,
  coilsCounted: 10 | 20,
): { exactDiameter: number; closestWire: typeof WIRE_GAUGE_CHART[number]; nextSmaller: typeof WIRE_GAUGE_CHART[number] | null; nextLarger: typeof WIRE_GAUGE_CHART[number] | null } {
  const exactDiameter = measuredLength / coilsCounted;
  let closestIdx = 0;
  let closestDiff = Infinity;

  for (let i = 0; i < WIRE_GAUGE_CHART.length; i++) {
    const diff = Math.abs(WIRE_GAUGE_CHART[i].diameter - exactDiameter);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIdx = i;
    }
  }

  return {
    exactDiameter,
    closestWire: WIRE_GAUGE_CHART[closestIdx],
    nextSmaller: closestIdx > 0 ? WIRE_GAUGE_CHART[closestIdx - 1] : null,
    nextLarger: closestIdx < WIRE_GAUGE_CHART.length - 1 ? WIRE_GAUGE_CHART[closestIdx + 1] : null,
  };
}

// ---------------------------------------------------------------------------
// Extension Spring Color Codes (weight rating per spring pair)
// ---------------------------------------------------------------------------

export const EXTENSION_SPRING_COLORS: { color: string; hex: string; weightRange: string; poundsPerSide: string }[] = [
  { color: 'Tan', hex: '#D2B48C', weightRange: '60–80 lbs', poundsPerSide: '30–40 lbs' },
  { color: 'White', hex: '#FFFFFF', weightRange: '80–100 lbs', poundsPerSide: '40–50 lbs' },
  { color: 'Green', hex: '#228B22', weightRange: '100–120 lbs', poundsPerSide: '50–60 lbs' },
  { color: 'Yellow', hex: '#FFD700', weightRange: '120–140 lbs', poundsPerSide: '60–70 lbs' },
  { color: 'Blue', hex: '#0000FF', weightRange: '140–160 lbs', poundsPerSide: '70–80 lbs' },
  { color: 'Red', hex: '#FF0000', weightRange: '160–180 lbs', poundsPerSide: '80–90 lbs' },
  { color: 'Brown', hex: '#8B4513', weightRange: '180–200 lbs', poundsPerSide: '90–100 lbs' },
  { color: 'Orange', hex: '#FF8C00', weightRange: '200–220 lbs', poundsPerSide: '100–110 lbs' },
  { color: 'Gold', hex: '#DAA520', weightRange: '220–240 lbs', poundsPerSide: '110–120 lbs' },
  { color: 'Light Blue', hex: '#ADD8E6', weightRange: '240–260 lbs', poundsPerSide: '120–130 lbs' },
];

// ---------------------------------------------------------------------------
// Standard Door Weights
// ---------------------------------------------------------------------------

export const STANDARD_DOORS: { label: string; width: number; height: number; weightRange: [number, number] }[] = [
  { label: '8×7 Single (Non-Insulated)', width: 8, height: 7, weightRange: [75, 100] },
  { label: '8×7 Single (Insulated)', width: 8, height: 7, weightRange: [90, 120] },
  { label: '9×7 Single (Non-Insulated)', width: 9, height: 7, weightRange: [85, 110] },
  { label: '9×7 Single (Insulated)', width: 9, height: 7, weightRange: [100, 135] },
  { label: '10×7 Single (Non-Insulated)', width: 10, height: 7, weightRange: [95, 125] },
  { label: '10×7 Single (Insulated)', width: 10, height: 7, weightRange: [115, 150] },
  { label: '16×7 Double (Non-Insulated)', width: 16, height: 7, weightRange: [130, 165] },
  { label: '16×7 Double (Insulated)', width: 16, height: 7, weightRange: [155, 200] },
  { label: '16×8 Double (Non-Insulated)', width: 16, height: 8, weightRange: [145, 185] },
  { label: '16×8 Double (Insulated)', width: 16, height: 8, weightRange: [175, 225] },
  { label: '18×7 (Non-Insulated)', width: 18, height: 7, weightRange: [150, 190] },
  { label: '18×7 (Insulated)', width: 18, height: 7, weightRange: [175, 230] },
  { label: '18×8 (Non-Insulated)', width: 18, height: 8, weightRange: [170, 215] },
  { label: '18×8 (Insulated)', width: 18, height: 8, weightRange: [200, 260] },
];

// ---------------------------------------------------------------------------
// Wind Direction
// ---------------------------------------------------------------------------

export type WindDirection = 'left' | 'right';

export const WIND_DIRECTION_INFO = {
  left: { label: 'Left-Hand Wound', coneColor: 'Red', description: 'Red winding cone — spring is on the LEFT side of center when viewed from inside the garage.' },
  right: { label: 'Right-Hand Wound', coneColor: 'Black', description: 'Black winding cone — spring is on the RIGHT side of center when viewed from inside the garage.' },
};

// ---------------------------------------------------------------------------
// Cycle Life Targets
// ---------------------------------------------------------------------------

export type CycleTarget = 10000 | 15000 | 20000 | 25000 | 50000 | 100000;

export const CYCLE_TARGETS: { value: CycleTarget; label: string; description: string }[] = [
  { value: 10000, label: '10,000 cycles', description: 'Standard — approximately 7 years at 4 cycles/day' },
  { value: 15000, label: '15,000 cycles', description: 'Extended — approximately 10 years' },
  { value: 20000, label: '20,000 cycles', description: 'Premium — approximately 14 years' },
  { value: 25000, label: '25,000 cycles', description: 'High-Cycle — approximately 17 years' },
  { value: 50000, label: '50,000 cycles', description: 'Commercial-Grade — approximately 34 years' },
  { value: 100000, label: '100,000 cycles', description: 'Max-Cycle — virtually lifetime for residential use' },
];

// ---------------------------------------------------------------------------
// Calculator Input/Output Types
// ---------------------------------------------------------------------------

export interface SpringCalcInput {
  wireDiameter: number;
  insideDiameter: number;
  springLength: number;
  doorWeight: number;
  doorHeight: number;
  drumType: DrumType;
  numberOfSprings: 1 | 2;
  liftType: LiftType;
  windDirection?: WindDirection;
}

export interface SpringCalcResult {
  meanDiameter: number;
  springIndex: number;
  totalCoils: number;
  activeCoils: number;
  ippt: number;

  torqueRequired: number;
  turnsRequired: number;
  preloadTurns: number;
  totalTurns: number;
  maxSafeTurns: number;
  drumTurns: number;

  torsionalStress: number;
  correctedStress: number;
  wahlFactor: number;
  stressIndex: number;
  ultimateTensileStrength: number;

  estimatedCycles: number;
  cycleLifeCategory: 'below-standard' | 'standard' | 'extended' | 'high-cycle' | 'max-cycle';
  yearsAtFourCyclesPerDay: number;

  storedEnergy: number;
  cableLength: number;
  windDirection: WindDirection;

  isValid: boolean;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// Core Calculation
// ---------------------------------------------------------------------------

export function calculateSpring(input: SpringCalcInput): SpringCalcResult {
  const { wireDiameter: d, insideDiameter: ID, springLength: L, doorWeight: W,
    doorHeight: H, drumType, numberOfSprings: n, liftType } = input;

  const warnings: string[] = [];

  const D = ID + d;
  const springIndex = D / d;

  if (springIndex < 4) warnings.push('Spring index below 4 — very high stress, difficult to manufacture.');
  if (springIndex > 14) warnings.push('Spring index exceeds 14 — spring may buckle or be unstable.');

  const totalCoils = L / d;
  const activeCoils = totalCoils - 1;

  if (activeCoils < 3) warnings.push('Fewer than 3 active coils — spring may not function reliably.');

  // IPPT = (d⁴ × G) / (10.18 × D × Nₐ)
  const ippt = (Math.pow(d, 4) * G_OIL_TEMPERED) / (10.18 * D * activeCoils);

  const drumRadius = DRUM_RADII[drumType].radius;

  // Torque per spring: T = (W × r) / n
  const torquePerSpring = (W * drumRadius) / n;

  // Drum turns = cable travel / circumference
  let cableTravel = H * 12;
  if (liftType === 'high-lift') {
    cableTravel = H * 12;
  } else if (liftType === 'vertical') {
    cableTravel = H * 12;
  }
  const drumTurns = cableTravel / (2 * Math.PI * drumRadius);

  const preloadTurns = 1.0;
  const turnsFromTorque = torquePerSpring / ippt;
  const turnsRequired = turnsFromTorque + preloadTurns;
  const totalTurns = turnsRequired;

  // Max safe turns: ~75% of total coils for standard wire
  const maxSafeTurns = totalCoils * 0.75;

  if (totalTurns > maxSafeTurns) {
    warnings.push(`Required turns (${totalTurns.toFixed(1)}) exceed safe maximum (${maxSafeTurns.toFixed(1)}). Spring may be undersized.`);
  }

  // Bending stress in torsion spring wire: σ = 32M / (πd³) = 10.18 × M / d³
  const operatingTorque = ippt * totalTurns;
  const torsionalStress = (operatingTorque * 10.18) / Math.pow(d, 3);

  // Wahl correction factor
  const c = springIndex;
  const wahlFactor = ((4 * c - 1) / (4 * c - 4)) + (0.615 / c);
  const correctedStress = torsionalStress * wahlFactor;

  // UTS for oil-tempered wire (ASTM A229 empirical): UTS ≈ 190,000 / d^0.155
  const uts = 190000 / Math.pow(d, 0.155);
  const stressRatio = correctedStress / uts;
  const stressIndex = stressRatio * 100;

  let estimatedCycles: number;
  let cycleLifeCategory: SpringCalcResult['cycleLifeCategory'];

  if (stressIndex > 70) {
    estimatedCycles = 3000;
    cycleLifeCategory = 'below-standard';
    warnings.push('Extremely high stress — spring life likely below 5,000 cycles.');
  } else if (stressIndex > 60) {
    estimatedCycles = 8000;
    cycleLifeCategory = 'standard';
    warnings.push('High stress ratio — spring life may be below 10,000 cycles.');
  } else if (stressIndex > 52) {
    estimatedCycles = 10000;
    cycleLifeCategory = 'standard';
  } else if (stressIndex > 45) {
    estimatedCycles = 20000;
    cycleLifeCategory = 'extended';
  } else if (stressIndex > 38) {
    estimatedCycles = 50000;
    cycleLifeCategory = 'high-cycle';
  } else {
    estimatedCycles = 100000;
    cycleLifeCategory = 'max-cycle';
  }

  const cyclesPerYear = 4 * 365;
  const yearsAtFourCyclesPerDay = estimatedCycles / cyclesPerYear;

  // Stored energy: U = 0.5 × IPPT × turns²
  const storedEnergy = 0.5 * ippt * Math.pow(totalTurns, 2);

  // Cable length
  const cableLength = calculateCableLength(H, drumType, liftType);

  // Wind direction
  const windDirection = input.windDirection || 'left';

  const isValid = d > 0 && ID > 0 && L > 0 && W > 0 && H > 0 && activeCoils >= 3 && ippt > 0;

  return {
    meanDiameter: D,
    springIndex,
    totalCoils,
    activeCoils,
    ippt,
    torqueRequired: torquePerSpring,
    turnsRequired,
    preloadTurns,
    totalTurns,
    maxSafeTurns,
    drumTurns,
    torsionalStress,
    correctedStress,
    wahlFactor,
    stressIndex,
    ultimateTensileStrength: uts,
    estimatedCycles,
    cycleLifeCategory,
    yearsAtFourCyclesPerDay,
    storedEnergy,
    cableLength,
    windDirection,
    isValid,
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Cable Length Calculator
// ---------------------------------------------------------------------------

export function calculateCableLength(
  doorHeightFt: number,
  drumType: DrumType,
  liftType: LiftType,
  springSystem: 'torsion' | 'extension' = 'torsion',
): number {
  const doorHeightIn = doorHeightFt * 12;

  if (springSystem === 'extension') {
    // Extension spring cables run through pulleys — typically 12 to 13.5 feet
    // Rule of thumb: door height × 1.5 + 24″ for pulley routing
    return Math.ceil(doorHeightIn * 1.5 + 24);
  }

  // Torsion spring cable: door height + 18″ for drum wrap and bottom bracket attachment
  // Industry standard for 4″ drums with standard lift:
  //   7' door = 102″, 8' door = 114″
  let cableLength = doorHeightIn + 18;

  if (liftType === 'high-lift') {
    // High-lift adds extra vertical travel before the horizontal transition
    // Additional cable proportional to the extra lift height
    const drumRadius = DRUM_RADII[drumType].radius;
    const standardDrumRadius = 2.0;
    const extraWrap = (drumRadius - standardDrumRadius) * 2 * Math.PI;
    cableLength += Math.ceil(extraWrap + 12);
  } else if (liftType === 'vertical') {
    cableLength += 24;
  }

  return Math.ceil(cableLength);
}

// ---------------------------------------------------------------------------
// Reverse Calculator: Find Spring from Door Weight
// ---------------------------------------------------------------------------

export interface SpringMatch {
  wireDiameter: number;
  wireLabel: string;
  insideDiameter: number;
  springLength: number;
  ippt: number;
  totalTurns: number;
  stressIndex: number;
  estimatedCycles: number;
  cycleCategory: string;
}

export function findSpringsForDoor(
  doorWeight: number,
  doorHeight: number,
  numberOfSprings: 1 | 2,
  drumType: DrumType = 'standard-400',
  targetCycles?: CycleTarget,
): SpringMatch[] {
  const drumRadius = DRUM_RADII[drumType].radius;
  const torquePerSpring = (doorWeight * drumRadius) / numberOfSprings;
  const cableTravel = doorHeight * 12;
  const drumTurns = cableTravel / (2 * Math.PI * drumRadius);
  const preload = 1.0;

  const matches: SpringMatch[] = [];

  for (const d of WIRE_SIZES) {
    for (const ID of INSIDE_DIAMETERS) {
      const D = ID + d;
      const springIndex = D / d;
      if (springIndex < 4 || springIndex > 14) continue;

      // Target spring length: 18″ to 36″ (common residential)
      for (const L of [18, 20, 22, 24, 26, 28, 30, 32, 34, 36]) {
        const totalCoils = L / d;
        const activeCoils = totalCoils - 1;
        if (activeCoils < 3) continue;

        const ippt = (Math.pow(d, 4) * G_OIL_TEMPERED) / (10.18 * D * activeCoils);
        const turnsFromTorque = torquePerSpring / ippt;
        const totalTurns = turnsFromTorque + preload;
        const maxSafe = totalCoils * 0.75;

        if (totalTurns > maxSafe || totalTurns < 3) continue;

        const operatingTorque = ippt * totalTurns;
        const torsionalStress = (operatingTorque * 10.18) / Math.pow(d, 3);
        const c = springIndex;
        const wahl = ((4 * c - 1) / (4 * c - 4)) + (0.615 / c);
        const corrected = torsionalStress * wahl;
        const uts = 190000 / Math.pow(d, 0.155);
        const stressIdx = (corrected / uts) * 100;

        let cycles: number;
        let category: string;
        if (stressIdx > 70) continue;
        else if (stressIdx > 60) { cycles = 8000; category = 'Standard'; }
        else if (stressIdx > 52) { cycles = 10000; category = 'Standard'; }
        else if (stressIdx > 45) { cycles = 20000; category = 'Extended'; }
        else if (stressIdx > 38) { cycles = 50000; category = 'High-Cycle'; }
        else { cycles = 100000; category = 'Max-Cycle'; }

        if (targetCycles && cycles < targetCycles) continue;

        const gaugeEntry = WIRE_GAUGE_CHART.find(g => Math.abs(g.diameter - d) < 0.001);
        matches.push({
          wireDiameter: d,
          wireLabel: gaugeEntry?.label || `${d.toFixed(4)}″`,
          insideDiameter: ID,
          springLength: L,
          ippt,
          totalTurns,
          stressIndex: stressIdx,
          estimatedCycles: cycles,
          cycleCategory: category,
        });
      }
    }
  }

  matches.sort((a, b) => a.stressIndex - b.stressIndex);
  return matches.slice(0, 50);
}
