export type ComponentSystem = 'door' | 'torsion' | 'extension' | 'track' | 'opener';
export type UrgencyLevel = 'danger' | 'wear' | 'serviceable';
export type DiagramView = 'torsion' | 'extension' | 'opener';

export interface DoorComponent {
  id: string;
  name: string;
  partNumber: string;
  system: ComponentSystem;
  urgency: UrgencyLevel;
  description: string;
  friendlyTip?: string;
  views: DiagramView[];
}

// --- DOOR HARDWARE (shared across all views) ---
const DOOR_HARDWARE: DoorComponent[] = [
  {
    id: 'panel-section',
    name: 'Door Panel (Section)',
    partNumber: 'TNGD-PNL-1001',
    system: 'door',
    urgency: 'wear',
    description: 'Individual horizontal panel that makes up the door face. Residential doors typically have 4–5 sections. Steel, wood, or composite construction with optional insulation (R-0 to R-18).',
    friendlyTip: 'Your door is made of stacked panels — like building blocks. If one gets dented, you can often replace just that one panel instead of the whole door!',
    views: ['torsion', 'extension', 'opener'],
  },
  {
    id: 'hinge-1',
    name: 'Hinge #1 (Bottom)',
    partNumber: 'TNGD-HNG-1002A',
    system: 'door',
    urgency: 'wear',
    description: 'Bottom hinge connecting the lowest two panels. Flat plate without a roller stem. Takes the heaviest load as it is closest to the bottom bracket and lift cable attachment.',
    friendlyTip: 'The bottom hinge works the hardest — it helps the heaviest part of your door bend around the track curve.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'hinge-2',
    name: 'Hinge #2 (Middle)',
    partNumber: 'TNGD-HNG-1002B',
    system: 'door',
    urgency: 'wear',
    description: 'Middle hinges with roller stems that hold the rollers in position. Located at the panel joints in the center of the door. End hinges (#2) include the roller stem offset.',
    friendlyTip: 'Middle hinges have a little arm that holds the roller wheel — they are the "arms and legs" that help your door ride the track.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'hinge-3',
    name: 'Hinge #3 (Top)',
    partNumber: 'TNGD-HNG-1002C',
    system: 'door',
    urgency: 'wear',
    description: 'Top hinge connecting the top two panels. The roller stem on end hinges #3 has a greater offset (distance from door face to roller center) to maintain proper track spacing as the door curves through the radius.',
    friendlyTip: 'Top hinges have a longer "arm" for the roller — this extra reach helps the top of your door make a smooth turn into the ceiling track.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'roller',
    name: 'Roller',
    partNumber: 'TNGD-RLR-1003',
    system: 'door',
    urgency: 'wear',
    description: 'Wheels mounted on stems that ride inside the track. Steel (loud, 5–7 year life), nylon (quiet, 10–12 year life), or sealed bearing (longest life). Standard residential diameter is 2".',
    friendlyTip: 'Rollers are like tiny wheels that guide your door up and down. Nylon ones are much quieter than metal — like sneakers vs. hard-sole shoes!',
    views: ['torsion', 'extension'],
  },
  {
    id: 'bottom-seal',
    name: 'Bottom Trim (Weather Seal)',
    partNumber: 'TNGD-WS-1004',
    system: 'door',
    urgency: 'serviceable',
    description: 'Flexible rubber or vinyl seal attached to the bottom panel edge via retainer channel. T-style or bulb-style profiles. Blocks water, debris, pests, and drafts.',
    friendlyTip: 'This rubber strip at the bottom keeps rain, bugs, and cold air out. If you see daylight under your closed door, it\'s time for a new one!',
    views: ['torsion', 'extension'],
  },
  {
    id: 'strut',
    name: 'Reinforcement Strut',
    partNumber: 'TNGD-STR-1007',
    system: 'door',
    urgency: 'wear',
    description: 'Horizontal steel channel bolted across the back of a panel to prevent bowing. Required on 16\'+ doors and opener-equipped doors. Top strut carries the opener bracket.',
    friendlyTip: 'Struts are steel bars bolted across the back of your door panels — they keep wide doors from bending like a banana.',
    views: ['torsion', 'extension', 'opener'],
  },
  {
    id: 'bottom-bracket',
    name: 'Bottom Bracket',
    partNumber: 'TNGD-BRK-1008',
    system: 'door',
    urgency: 'danger',
    description: 'Heavy-gauge steel bracket at the bottom corner where the lift cable attaches. Under extreme tension when closed. Tamper-resistant — never loosen without proper tools and training.',
    friendlyTip: '⚠️ NEVER touch this bracket! It holds the cable under extreme pressure. Always call a professional.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'top-bracket',
    name: 'Top Bracket (Top Fixture)',
    partNumber: 'TNGD-BRK-1009',
    system: 'door',
    urgency: 'wear',
    description: 'Bracket at the top corner holding the top roller. Provides the pivot point where the door transitions from vertical to horizontal track travel.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'glass-section',
    name: 'Glass Panel / Window Insert',
    partNumber: 'TNGD-GLS-1010',
    system: 'door',
    urgency: 'serviceable',
    description: 'Tempered or acrylic window insert set into a panel frame. Available in clear, frosted, tinted, and decorative patterns. Adds natural light and curb appeal.',
    friendlyTip: 'Windows make your garage brighter and your home look great from the street. They are easy to swap out if one cracks.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'slide-lock',
    name: 'Slide Lock (Manual Lock Bar)',
    partNumber: 'TNGD-LCK-1011',
    system: 'door',
    urgency: 'serviceable',
    description: 'Manual locking mechanism on the inside of the door. A handle turns to slide steel bars into slots in the vertical track, preventing the door from being opened. Must be disengaged before operating with an opener.',
    friendlyTip: 'This is the manual lock on the inside of your door. IMPORTANT: Always unlock it before using your opener — running the opener with the lock engaged can damage your door or opener!',
    views: ['torsion', 'extension'],
  },

  // --- TRACK SYSTEM ---
  {
    id: 'vertical-track',
    name: 'Vertical Track',
    partNumber: 'TNGD-TRK-2001',
    system: 'track',
    urgency: 'wear',
    description: 'Steel channel mounted to the door jamb on each side. Guides rollers vertically from floor to header height. Must be plumb and properly spaced.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'horizontal-track',
    name: 'Horizontal Track',
    partNumber: 'TNGD-TRK-2002',
    system: 'track',
    urgency: 'wear',
    description: 'Steel channel extending from the radius section back into the garage, parallel to the ceiling. Supports door weight when open. Must be level or with a slight rise toward the rear.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'radius-track',
    name: 'Curved Track (Radius)',
    partNumber: 'TNGD-TRK-2003',
    system: 'track',
    urgency: 'wear',
    description: 'The curved section connecting vertical and horizontal tracks. Standard residential radius is 12" or 15". Determines headroom required above the opening.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'flag-bracket',
    name: 'Flag Bracket',
    partNumber: 'TNGD-BRK-2004',
    system: 'track',
    urgency: 'wear',
    description: 'L-shaped bracket connecting vertical to horizontal track at the curve point and anchoring both to wall/header framing. Named for its flag-like shape.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'jamb-bracket',
    name: 'Jamb Bracket',
    partNumber: 'TNGD-BRK-2005',
    system: 'track',
    urgency: 'wear',
    description: 'Mounting bracket securing the vertical track to the door jamb framing. Multiple brackets per side, lag-bolted into solid wood. Carries the lateral load of the door against the track.',
    views: ['torsion', 'extension'],
  },
  {
    id: 'rear-hang',
    name: 'Rear Track Hanger (Angle)',
    partNumber: 'TNGD-HNG-2006',
    system: 'track',
    urgency: 'wear',
    description: 'Angle iron or perforated steel straps suspending the horizontal track from ceiling joists. Adjustable to set track height and level. Spaced every 3–4 feet.',
    views: ['torsion', 'extension'],
  },
];

// --- TORSION SPRING SYSTEM ---
const TORSION_COMPONENTS: DoorComponent[] = [
  {
    id: 'torsion-spring',
    name: 'Torsion Spring',
    partNumber: 'TNGD-SPR-4001',
    system: 'torsion',
    urgency: 'danger',
    description: 'Heavy-gauge oil-tempered steel coil mounted on the torsion shaft above the door. Stores energy by twisting (torque). Counterbalances the full door weight. Rated by cycle life: standard (10,000), high-cycle (25,000–50,000+). Under extreme tension — professional replacement only.',
    friendlyTip: '⚠️ This coil above your door holds enough force to seriously hurt someone. If it breaks, call a pro — never try to fix it yourself.',
    views: ['torsion'],
  },
  {
    id: 'torsion-shaft',
    name: 'Torsion Shaft (Tube)',
    partNumber: 'TNGD-SPR-4002',
    system: 'torsion',
    urgency: 'wear',
    description: 'Solid steel shaft (1" diameter) running horizontally above the door opening. Spring(s), cable drums, and bearing plates mount on this shaft. When springs unwind, the shaft rotates the cable drums to lift the door.',
    views: ['torsion'],
  },
  {
    id: 'winding-cone',
    name: 'Winding Cone',
    partNumber: 'TNGD-SPR-4003',
    system: 'torsion',
    urgency: 'danger',
    description: 'Red-painted cone at the outer end of the torsion spring with holes for winding bars. Used to wind (tension) or unwind the spring. The most dangerous component during service.',
    views: ['torsion'],
  },
  {
    id: 'stationary-cone',
    name: 'Stationary Cone',
    partNumber: 'TNGD-SPR-4004',
    system: 'torsion',
    urgency: 'danger',
    description: 'Fixed cone at the inner end of each spring, bolted to the center bearing plate. Does not rotate — anchors the spring while the winding cone applies tension.',
    views: ['torsion'],
  },
  {
    id: 'cable-drum',
    name: 'Cable Drum',
    partNumber: 'TNGD-SPR-4005',
    system: 'torsion',
    urgency: 'danger',
    description: 'Grooved spool at each end of the torsion shaft where lift cable winds. Standard residential 4" diameter (2" radius). High-lift drums are larger for additional travel.',
    views: ['torsion'],
  },
  {
    id: 'lift-cable',
    name: 'Lift Cable',
    partNumber: 'TNGD-SPR-4006',
    system: 'torsion',
    urgency: 'danger',
    description: 'Aircraft-grade galvanized steel cable (1/8" or 3/32") running from the bottom bracket up to the cable drum. Transfers the spring\'s lifting force to the door. A snapped cable drops the door immediately.',
    friendlyTip: '⚠️ If you see frayed wires on these cables, stop using the door and call us. A snapped cable means the door drops like a rock.',
    views: ['torsion'],
  },
  {
    id: 'center-bearing',
    name: 'Center Bearing Plate',
    partNumber: 'TNGD-SPR-4007',
    system: 'torsion',
    urgency: 'wear',
    description: 'Steel plate mounted to header wall at center of torsion shaft. Contains a bearing for shaft rotation. Also anchors the stationary cones.',
    views: ['torsion'],
  },
  {
    id: 'end-bearing',
    name: 'End Bearing Plate',
    partNumber: 'TNGD-SPR-4008',
    system: 'torsion',
    urgency: 'wear',
    description: 'Steel plate at each end of the header wall with a bearing supporting the outer torsion shaft. Cable drums sit just inside these plates.',
    views: ['torsion'],
  },
];

// --- EXTENSION SPRING SYSTEM ---
const EXTENSION_COMPONENTS: DoorComponent[] = [
  {
    id: 'extension-spring',
    name: 'Extension Spring',
    partNumber: 'TNGD-SPR-5001',
    system: 'extension',
    urgency: 'danger',
    description: 'Open-coil spring mounted parallel to horizontal track on each side. Stretches when the door closes, storing energy. Color-coded by weight rating. Less balanced lift than torsion, shorter lifespan.',
    friendlyTip: '⚠️ These long springs along your ceiling stretch like a rubber band. If one breaks without a safety cable, it becomes a flying projectile. Always ensure safety cables are installed.',
    views: ['extension'],
  },
  {
    id: 'safety-cable',
    name: 'Safety Cable',
    partNumber: 'TNGD-SPR-5002',
    system: 'extension',
    urgency: 'danger',
    description: 'Steel cable threaded through the center of each extension spring. If the spring breaks, this cable contains the pieces. Required by code on all extension spring installations.',
    friendlyTip: 'This cable runs through the middle of the spring — it\'s a seatbelt for the spring. If yours is missing, call us immediately.',
    views: ['extension'],
  },
  {
    id: 'ext-pulley',
    name: 'Pulley (Sheave)',
    partNumber: 'TNGD-SPR-5003',
    system: 'extension',
    urgency: 'wear',
    description: 'Pulley wheels at the top of vertical track and at the rear of the extension spring. Redirects lift cable from vertical to horizontal and creates mechanical advantage.',
    views: ['extension'],
  },
  {
    id: 'ext-lift-cable',
    name: 'Lift Cable (Extension)',
    partNumber: 'TNGD-SPR-5005',
    system: 'extension',
    urgency: 'danger',
    description: 'Cable routing from bottom bracket, up over the top pulley, back along horizontal track through the spring sheave, and anchoring to the track hardware.',
    views: ['extension'],
  },
  {
    id: 's-hook',
    name: 'S-Hook / Clip End',
    partNumber: 'TNGD-SPR-5006',
    system: 'extension',
    urgency: 'danger',
    description: 'S-shaped hook or clip attaching each end of the extension spring to track hardware. Must be fully closed — open S-hooks are a failure point.',
    views: ['extension'],
  },
  {
    id: 'ext-rear-bracket',
    name: 'Rear Track Bracket',
    partNumber: 'TNGD-SPR-5007',
    system: 'extension',
    urgency: 'wear',
    description: 'Steel bracket at the rear of horizontal track where the extension spring attaches. Takes full spring tension load — must be bolted to solid framing.',
    views: ['extension'],
  },
];

// --- OPENER SYSTEM ---
const OPENER_COMPONENTS: DoorComponent[] = [
  {
    id: 'opener-motor',
    name: 'Opener Motor Unit',
    partNumber: 'TNGD-OPN-3001',
    system: 'opener',
    urgency: 'wear',
    description: 'Power unit mounted to the ceiling. Contains motor, drive mechanism (belt, chain, or screw), logic board, and light sockets. Residential units: ½ HP or ¾ HP. Controlled by wall button, remote, or myQ app.',
    friendlyTip: 'This is the "brain" of your garage door — it\'s the box hanging from your ceiling with the lights on it.',
    views: ['opener'],
  },
  {
    id: 'opener-rail',
    name: 'Opener Rail (T-Rail)',
    partNumber: 'TNGD-OPN-3002',
    system: 'opener',
    urgency: 'wear',
    description: 'Track extending from motor unit to header bracket. Houses the belt or chain drive. The trolley rides along this rail.',
    friendlyTip: 'The rail is the long bar connecting the motor to the wall above your door. A belt or chain runs inside it.',
    views: ['opener'],
  },
  {
    id: 'trolley',
    name: 'Trolley (Carriage)',
    partNumber: 'TNGD-OPN-3003',
    system: 'opener',
    urgency: 'wear',
    description: 'Sliding mechanism on the opener rail connecting to the door arm. Driven by belt or chain. Contains the emergency release mechanism.',
    views: ['opener'],
  },
  {
    id: 'door-arm',
    name: 'Door Arm (J-Arm)',
    partNumber: 'TNGD-OPN-3004',
    system: 'opener',
    urgency: 'wear',
    description: 'Curved steel arm connecting trolley to the door\'s top bracket. J-shape follows the door\'s arc from vertical to horizontal travel.',
    views: ['opener'],
  },
  {
    id: 'emergency-release',
    name: 'Emergency Release (Red Handle)',
    partNumber: 'TNGD-OPN-3005',
    system: 'opener',
    urgency: 'serviceable',
    description: 'Red handle with cord hanging from trolley. Pulling it disconnects the trolley from the drive for manual operation during power outages. Always disengage with door CLOSED.',
    friendlyTip: 'This is your "emergency cord." Pull it straight down to manually open/close your door during a power outage. Always do this with the door CLOSED first!',
    views: ['opener'],
  },
  {
    id: 'photo-eye',
    name: 'Photo-Eye Safety Sensors',
    partNumber: 'TNGD-OPN-3006',
    system: 'opener',
    urgency: 'serviceable',
    description: 'Infrared beam sensors mounted on both sides of the opening, no higher than 6" from floor. If beam is broken while closing, door reverses immediately. Required by federal law since 1993 (UL 325).',
    friendlyTip: 'These little sensors at the bottom of your door opening stop the door if something is in the way — like a pet, a kid, or your car bumper. Keep them clean and aligned!',
    views: ['opener'],
  },
  {
    id: 'wall-control',
    name: 'Wall Control Panel',
    partNumber: 'TNGD-OPN-3007',
    system: 'opener',
    urgency: 'serviceable',
    description: 'Hardwired button panel inside the garage. Provides open/close/stop, light switch, and on smart units: lock mode, timer-to-close, Wi-Fi status. Must be 5\'+ from floor.',
    friendlyTip: 'The button on your wall near the door to the house. On newer openers, it has extra features like a lock button and timer.',
    views: ['opener'],
  },
  {
    id: 'opener-bracket',
    name: 'Header Bracket (Opener)',
    partNumber: 'TNGD-OPN-3008',
    system: 'opener',
    urgency: 'wear',
    description: 'Steel bracket mounted to header wall above door opening. Anchors the front end of the opener rail. Must be lag-bolted into solid framing.',
    views: ['opener'],
  },
  {
    id: 'orb',
    name: 'Operator Reinforcement Bracket (ORB)',
    partNumber: 'TNGD-OPN-3009',
    system: 'opener',
    urgency: 'wear',
    description: 'Heavy-gauge steel bracket bolted to the top section of the door where the J-arm connects. Distributes the opener\'s push/pull force across the panel to prevent bending or cracking. Required on insulated and wide doors.',
    friendlyTip: 'This strong metal plate on the back of your top panel spreads the force from the opener so it doesn\'t dent or crack the door.',
    views: ['opener'],
  },
];

export const ALL_COMPONENTS: DoorComponent[] = [
  ...DOOR_HARDWARE,
  ...TORSION_COMPONENTS,
  ...EXTENSION_COMPONENTS,
  ...OPENER_COMPONENTS,
];

export function getComponentsForView(view: DiagramView): DoorComponent[] {
  return ALL_COMPONENTS.filter((c) => c.views.includes(view));
}

export function getComponentsBySystem(system: ComponentSystem): DoorComponent[] {
  return ALL_COMPONENTS.filter((c) => c.system === system);
}

export function getComponentById(id: string): DoorComponent | undefined {
  return ALL_COMPONENTS.find((c) => c.id === id);
}

export const URGENCY_LABELS: Record<UrgencyLevel, { label: string; color: string; description: string }> = {
  danger: { label: 'High-Tension / Dangerous', color: '#C41E24', description: 'Under extreme tension or stores significant energy. Professional service only — do not attempt to adjust, remove, or service.' },
  wear: { label: 'Wear Item', color: '#D97706', description: 'Subject to regular wear and eventual replacement. Inspect during routine maintenance.' },
  serviceable: { label: 'User-Serviceable', color: '#059669', description: 'Can be inspected, cleaned, or adjusted by a knowledgeable homeowner.' },
};

export const VIEW_LABELS: Record<DiagramView, { label: string; description: string; color: string }> = {
  torsion: { label: 'Torsion Spring System', description: 'Spring, shaft, drums, cables, and bearing plates', color: '#C41E24' },
  extension: { label: 'Extension Spring System', description: 'Springs, pulleys, safety cables, and S-hooks', color: '#D97706' },
  opener: { label: 'Operator System', description: 'Motor, rail, trolley, sensors, and controls', color: '#002868' },
};
