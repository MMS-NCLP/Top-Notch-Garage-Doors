/**
 * Garage Door Torsion Spring Calculator
 *
 * Uses industry-standard DASMA formulas for torsion spring sizing.
 * Reference: Door & Access Systems Manufacturers Association (DASMA)
 *
 * Core formula:
 *   IPPT = (d⁴ × G) / (10.18 × D × Nₐ)
 *
 * Where:
 *   d  = wire diameter (inches)
 *   G  = modulus of rigidity (11,500,000 psi for oil-tempered spring wire per ASTM A229)
 *   D  = mean coil diameter = ID + d (inside diameter + wire size)
 *   Nₐ = number of active coils (total coils minus dead coils, typically total - 1)
 *   10.18 = geometric constant (32/π)
 *
 * Torque requirement:
 *   T = (W × r) / n
 *
 * Where:
 *   W = door weight (lbs)
 *   r = cable drum radius (inches) — standard residential = 2.0"
 *   n = number of springs (1 or 2)
 *
 * Turns:
 *   turns = T / IPPT + preload (typically 1.0 turn)
 */

// Modulus of rigidity for oil-tempered spring wire (ASTM A229), psi
const G_OIL_TEMPERED = 11_500_000;

// Standard cable drum radii by type (inches)
export const DRUM_RADII = {
  'standard': { radius: 2.0, label: 'Standard Residential (4" drum)' },
  'high-lift-400': { radius: 2.0, label: 'High-Lift 400 Series (4" drum)' },
  'high-lift-525': { radius: 2.625, label: 'High-Lift 525 Series (5.25" drum)' },
  'high-lift-600': { radius: 3.0, label: 'High-Lift 600 Series (6" drum)' },
  'vertical-lift': { radius: 2.0, label: 'Vertical Lift (4" drum)' },
} as const;

export type DrumType = keyof typeof DRUM_RADII;

// Common wire sizes available in the industry (inches)
export const WIRE_SIZES = [
  0.1620, 0.1770, 0.1875, 0.1920, 0.2070, 0.2187, 0.2253,
  0.2343, 0.2437, 0.2500, 0.2625, 0.2730, 0.2812, 0.2950,
  0.3065, 0.3125, 0.3310, 0.3437, 0.3625, 0.3750, 0.3938,
  0.4062, 0.4305, 0.4375, 0.4615, 0.4687, 0.5000, 0.5312,
  0.5625, 0.5938,
];

// Common inside diameters (inches)
export const INSIDE_DIAMETERS = [1.75, 2.0, 2.625, 3.375, 3.75, 4.5, 5.75, 6.0];

// Standard door sizes with approximate weights (lbs)
export const STANDARD_DOORS: { label: string; width: number; height: number; weightRange: [number, number] }[] = [
  { label: '8×7 Single (Non-Insulated)', width: 8, height: 7, weightRange: [75, 100] },
  { label: '8×7 Single (Insulated)', width: 8, height: 7, weightRange: [90, 120] },
  { label: '9×7 Single (Non-Insulated)', width: 9, height: 7, weightRange: [85, 110] },
  { label: '9×7 Single (Insulated)', width: 9, height: 7, weightRange: [100, 135] },
  { label: '16×7 Double (Non-Insulated)', width: 16, height: 7, weightRange: [130, 165] },
  { label: '16×7 Double (Insulated)', width: 16, height: 7, weightRange: [155, 200] },
  { label: '16×8 Double (Non-Insulated)', width: 16, height: 8, weightRange: [145, 185] },
  { label: '16×8 Double (Insulated)', width: 16, height: 8, weightRange: [175, 225] },
  { label: '18×7 (Non-Insulated)', width: 18, height: 7, weightRange: [150, 190] },
  { label: '18×7 (Insulated)', width: 18, height: 7, weightRange: [175, 230] },
  { label: '18×8 (Non-Insulated)', width: 18, height: 8, weightRange: [170, 215] },
  { label: '18×8 (Insulated)', width: 18, height: 8, weightRange: [200, 260] },
];

export interface SpringCalcInput {
  wireDiameter: number;   // inches
  insideDiameter: number; // inches
  springLength: number;   // inches (coil length, not including cones)
  doorWeight: number;     // lbs
  doorHeight: number;     // feet
  drumType: DrumType;
  numberOfSprings: 1 | 2;
}

export interface SpringCalcResult {
  // Spring properties
  meanDiameter: number;       // inches
  activeCoils: number;
  ippt: number;               // inch-pounds per turn

  // Application
  torqueRequired: number;     // inch-pounds per spring
  turnsRequired: number;      // including preload
  preloadTurns: number;
  totalTurns: number;
  maxTurns: number;           // safe maximum before yield

  // Cycle life estimate
  stressIndex: number;
  estimatedCycles: number;
  cycleLifeCategory: 'standard' | 'extended' | 'high-cycle' | 'max-cycle';
  yearsAtFourCyclesPerDay: number;

  // Wire stress
  torsionalStress: number;    // psi
  correctedStress: number;    // Wahl-corrected stress, psi

  // Validation
  isValid: boolean;
  warnings: string[];
}

export function calculateSpring(input: SpringCalcInput): SpringCalcResult {
  const { wireDiameter: d, insideDiameter: ID, springLength: L, doorWeight: W, doorHeight: H, drumType, numberOfSprings: n } = input;

  const warnings: string[] = [];

  // Mean coil diameter
  const D = ID + d;

  // Spring index (D/d ratio) — industry standard is 5-12
  const springIndex = D / d;
  if (springIndex < 4) warnings.push('Spring index (D/d) is below 4 — high stress, difficult to manufacture.');
  if (springIndex > 14) warnings.push('Spring index (D/d) exceeds 14 — spring may be unstable.');

  // Number of active coils (total coils minus ~1 dead coil for cone seats)
  const totalCoils = L / d;
  const activeCoils = totalCoils - 1;

  if (activeCoils < 3) warnings.push('Fewer than 3 active coils — spring may not function reliably.');

  // IPPT — Inch Pounds Per Turn (the spring rate in torsion)
  // Formula: IPPT = (d⁴ × G) / (10.18 × D × Nₐ)
  const ippt = (Math.pow(d, 4) * G_OIL_TEMPERED) / (10.18 * D * activeCoils);

  // Cable drum radius
  const drumRadius = DRUM_RADII[drumType].radius;

  // Torque required per spring
  // T = (W × r) / n
  const torquePerSpring = (W * drumRadius) / n;

  // Turns to lift the door (based on cable travel)
  // Cable travel = door height in inches
  // Turns on drum = cable travel / (2π × drum radius)
  const cableTravel = H * 12; // door height in inches
  const drumTurns = cableTravel / (2 * Math.PI * drumRadius);

  // Preload: typically 1.0 turns for standard, adjustable
  const preloadTurns = 1.0;

  // Total turns = drum turns + preload
  const totalTurns = drumTurns + preloadTurns;

  // Verify: torque check (IPPT × turns should approximately equal torque needed)
  const turnsFromTorque = torquePerSpring / ippt;
  const turnsRequired = turnsFromTorque + preloadTurns;

  // Max safe turns (before yield) — industry rule of thumb:
  // Max deflection angle = (π × L_free × allowable_stress) / (G × d)
  // Simplified: safe max is approximately totalCoils × 0.75 for standard wire
  const maxTurns = totalCoils * 0.75;

  if (totalTurns > maxTurns) {
    warnings.push(`Required turns (${totalTurns.toFixed(1)}) exceed safe maximum (${maxTurns.toFixed(1)}). Spring may be undersized.`);
  }

  // Torsional stress calculation
  // τ = (32 × T) / (π × d³)  where T = IPPT × turns per coil
  // Per-coil torque = IPPT (since IPPT is the rate per full turn distributed across all coils)
  const operatingTorque = ippt * totalTurns;
  const torsionalStress = (operatingTorque * 10.18) / (Math.pow(d, 3) * activeCoils);

  // Wahl correction factor for curvature
  const c = springIndex;
  const wahlFactor = ((4 * c - 1) / (4 * c - 4)) + (0.615 / c);
  const correctedStress = torsionalStress * wahlFactor;

  // Cycle life estimation
  // Based on corrected stress vs. wire ultimate tensile strength
  // UTS approximation for oil-tempered wire (ASTM A229):
  // UTS ≈ 190,000 / d^0.155 (empirical, psi, for d in inches)
  const uts = 190000 / Math.pow(d, 0.155);
  const stressRatio = correctedStress / uts;

  // Stress index used by industry: lower = longer life
  const stressIndex = stressRatio * 100;

  let estimatedCycles: number;
  let cycleLifeCategory: SpringCalcResult['cycleLifeCategory'];

  if (stressIndex > 65) {
    estimatedCycles = 5000;
    cycleLifeCategory = 'standard';
    warnings.push('High stress ratio — spring life may be below 10,000 cycles.');
  } else if (stressIndex > 55) {
    estimatedCycles = 10000;
    cycleLifeCategory = 'standard';
  } else if (stressIndex > 45) {
    estimatedCycles = 25000;
    cycleLifeCategory = 'extended';
  } else if (stressIndex > 35) {
    estimatedCycles = 50000;
    cycleLifeCategory = 'high-cycle';
  } else {
    estimatedCycles = 100000;
    cycleLifeCategory = 'max-cycle';
  }

  // Years estimate at 4 cycles/day (national average)
  const cyclesPerYear = 4 * 365;
  const yearsAtFourCyclesPerDay = estimatedCycles / cyclesPerYear;

  // Validation
  const isValid = d > 0 && ID > 0 && L > 0 && W > 0 && H > 0 && activeCoils >= 3 && ippt > 0;

  return {
    meanDiameter: D,
    activeCoils,
    ippt,
    torqueRequired: torquePerSpring,
    turnsRequired,
    preloadTurns,
    totalTurns,
    maxTurns,
    stressIndex,
    estimatedCycles,
    cycleLifeCategory,
    yearsAtFourCyclesPerDay,
    torsionalStress,
    correctedStress,
    isValid,
    warnings,
  };
}

// Wire gauge reference chart — maps gauge to diameter
export const WIRE_GAUGE_CHART: { gauge: number; diameter: number; label: string }[] = [
  { gauge: 8, diameter: 0.1620, label: '8 ga — 0.162"' },
  { gauge: 7, diameter: 0.1770, label: '7 ga — 0.177"' },
  { gauge: 6.5, diameter: 0.1875, label: '3/16" — 0.1875"' },
  { gauge: 6, diameter: 0.1920, label: '6 ga — 0.192"' },
  { gauge: 5, diameter: 0.2070, label: '5 ga — 0.207"' },
  { gauge: 4.5, diameter: 0.2187, label: '7/32" — 0.2187"' },
  { gauge: 4, diameter: 0.2253, label: '4 ga — 0.2253"' },
  { gauge: 3.5, diameter: 0.2343, label: '15/64" — 0.2343"' },
  { gauge: 3, diameter: 0.2437, label: '3 ga — 0.2437"' },
  { gauge: 2.5, diameter: 0.2500, label: '1/4" — 0.250"' },
  { gauge: 2, diameter: 0.2625, label: '2 ga — 0.2625"' },
  { gauge: 1.5, diameter: 0.2730, label: '1.5 ga — 0.273"' },
  { gauge: 1, diameter: 0.2812, label: '9/32" — 0.2812"' },
  { gauge: 0.5, diameter: 0.2950, label: '0.5 ga — 0.295"' },
  { gauge: 0, diameter: 0.3065, label: '0 ga — 0.3065"' },
  { gauge: -0.5, diameter: 0.3125, label: '5/16" — 0.3125"' },
  { gauge: -1, diameter: 0.3310, label: '-1 ga — 0.331"' },
  { gauge: -1.5, diameter: 0.3437, label: '11/32" — 0.3437"' },
  { gauge: -2, diameter: 0.3625, label: '-2 ga — 0.3625"' },
  { gauge: -2.5, diameter: 0.3750, label: '3/8" — 0.375"' },
  { gauge: -3, diameter: 0.3938, label: '-3 ga — 0.3938"' },
  { gauge: -3.5, diameter: 0.4062, label: '13/32" — 0.4062"' },
  { gauge: -4, diameter: 0.4305, label: '-4 ga — 0.4305"' },
  { gauge: -4.5, diameter: 0.4375, label: '7/16" — 0.4375"' },
  { gauge: -5, diameter: 0.4615, label: '-5 ga — 0.4615"' },
  { gauge: -5.5, diameter: 0.4687, label: '15/32" — 0.4687"' },
  { gauge: -6, diameter: 0.5000, label: '1/2" — 0.500"' },
];
