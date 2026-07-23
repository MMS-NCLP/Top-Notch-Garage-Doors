// ── Portfolio Architecture (Master Blueprint) ──
// Structured around: service type + corridor location + system type + failure mode

export type ServiceType = 'repairs' | 'installations' | 'spring-work' | 'opener-work' | 'panel-work' | 'emergency' | 'screen-doors' | 'commercial';
export type CorridorPosition = 'west' | 'central' | 'east-central' | 'east';
export type AnchorCity = 'Statesville' | 'Greensboro' | 'Burlington' | 'Durham';
export type ImageTag = 'before' | 'after' | 'detail' | 'process' | 'verification';

export interface PortfolioImage {
  src: string;
  alt: string;
  tag: ImageTag;
}

export interface PortfolioProject {
  id: string;
  title: string;
  serviceType: ServiceType;
  systemType: string;
  failureMode: string;
  materials: string;
  corridorPosition: CorridorPosition;
  anchorCity: AnchorCity;
  secondaryCity?: string;
  location: string;
  caption: string;
  problem: string;
  solution: string;
  outcome: string;
  images: PortfolioImage[];
  featured?: boolean;
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  'repairs': 'Repairs',
  'installations': 'Installations',
  'spring-work': 'Spring Work',
  'opener-work': 'Opener Work',
  'panel-work': 'Panel Work',
  'emergency': 'Emergency Work',
  'screen-doors': 'Screen Doors',
  'commercial': 'Commercial',
};

export const serviceTypeFilters = [
  { id: 'all' as const, label: 'All Projects' },
  ...Object.entries(SERVICE_TYPE_LABELS).map(([id, label]) => ({ id, label })),
];

export const anchorCityFilters: { id: string; label: string; position: CorridorPosition }[] = [
  { id: 'all', label: 'All Areas', position: 'west' },
  { id: 'Statesville', label: 'Statesville', position: 'west' },
  { id: 'Greensboro', label: 'Greensboro', position: 'central' },
  { id: 'Burlington', label: 'Burlington', position: 'east-central' },
  { id: 'Durham', label: 'Durham', position: 'east' },
];

// ── Helper: get projects by filters ──

export function getFilteredProjects(
  serviceType?: string,
  anchorCity?: string,
): PortfolioProject[] {
  let result = projects;
  if (serviceType && serviceType !== 'all') {
    result = result.filter((p) => p.serviceType === serviceType);
  }
  if (anchorCity && anchorCity !== 'all') {
    result = result.filter((p) => p.anchorCity === anchorCity);
  }
  return result;
}

export function getFeaturedByAnchor(): Record<AnchorCity, PortfolioProject | undefined> {
  return {
    Statesville: projects.find((p) => p.anchorCity === 'Statesville' && p.featured),
    Greensboro: projects.find((p) => p.anchorCity === 'Greensboro' && p.featured),
    Burlington: projects.find((p) => p.anchorCity === 'Burlington' && p.featured),
    Durham: projects.find((p) => p.anchorCity === 'Durham' && p.featured),
  };
}

export function getProjectsByService(serviceType: ServiceType, limit?: number): PortfolioProject[] {
  const matches = projects.filter((p) => p.serviceType === serviceType);
  return limit ? matches.slice(0, limit) : matches;
}

export function getProjectsByCity(city: string, limit?: number): PortfolioProject[] {
  const matches = projects.filter(
    (p) => p.anchorCity === city || p.secondaryCity === city || p.location.toLowerCase().includes(city.toLowerCase()),
  );
  return limit ? matches.slice(0, limit) : matches;
}

// ── Projects ──

export const projects: PortfolioProject[] = [

  // ═══════════════════════════════════════
  // INSTALLATIONS
  // ═══════════════════════════════════════

  {
    id: 'day-ave-construction',
    title: 'Day Ave — New Construction Duplex Door & Opener',
    serviceType: 'installations',
    systemType: 'Full Door + Smart Opener',
    failureMode: 'New Build — No Existing System',
    materials: 'Black Raised-Panel Steel with Transom Windows',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    location: 'Burlington, NC',
    caption: 'This Burlington duplex on Day Ave needed matching black doors and smart opener systems for both units. We coordinated with the builder on specs, installed LiftMaster video keypads, and had both bays operational same day — on schedule for occupancy.',
    problem: 'New-build duplex on Day Ave needed matching black garage doors and opener systems on both units. Builder required coordination with framing, electrical, and smart access.',
    solution: 'Installed black raised-panel doors with transom windows on both units (#834 and #836). Full opener systems with LiftMaster video keypad for smart entry. Coordinated with builder on specs.',
    outcome: 'Both units completed same day with matching black doors, smart openers, and video keypad access. TNGD truck on-site — builder stayed on schedule for occupancy.',
    featured: true,
    images: [
      { src: '/images/portfolio/construction/day-ave-black-door-completed-exterior-burlington-nc.jpg', alt: 'Completed black garage door with transom windows on Day Ave new construction in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-construction-door-install-nc-progress.jpg', alt: 'Open garage bay before door installation at Day Ave new construction in Burlington NC', tag: 'before' },
      { src: '/images/portfolio/construction/day-ave-empty-garage-bay-before-burlington-nc.jpg', alt: 'Empty garage bay interior before door install at Day Ave Burlington NC', tag: 'before' },
      { src: '/images/portfolio/construction/day-ave-new-construction-interior-nc.jpg', alt: 'Interior view of new door installed with workbench at Day Ave Burlington NC', tag: 'detail' },
      { src: '/images/portfolio/construction/day-ave-opener-motor-install-burlington-nc.jpg', alt: 'Garage door opener and motor installation in progress at Day Ave Burlington NC', tag: 'process' },
      { src: '/images/portfolio/construction/day-ave-liftmaster-video-keypad-burlington-nc.jpg', alt: 'LiftMaster video keypad installed on exterior at Day Ave Burlington NC', tag: 'detail' },
      { src: '/images/portfolio/construction/day-ave-duplex-completed-tngd-truck-burlington-nc.jpg', alt: 'Both Day Ave duplex units with completed black doors and TNGD truck at dusk in Burlington NC', tag: 'after' },
    ],
  },
  {
    id: 'thomasville-door-motor',
    title: 'Blue-Gray to Black — Door & Motor Complete Package',
    serviceType: 'installations',
    systemType: 'Full Door + Belt-Drive Opener',
    failureMode: 'Worn Doors + Noisy Opener',
    materials: 'Black Raised-Panel Steel with Transom Windows',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Thomasville',
    location: 'Thomasville, NC',
    caption: 'This Thomasville home had worn blue-gray doors and a noisy chain-drive opener dragging down curb appeal. We replaced both bays with black raised-panel doors and a quiet belt-drive opener — a dramatic color transformation the whole street noticed.',
    problem: 'Two-bay brick home had worn, faded blue-gray doors that looked dated. Old opener was noisy and unreliable. Full system upgrade needed — doors, color, and motor.',
    solution: 'Replaced both bays with new black raised-panel doors with transom windows. Installed new belt-drive opener with smartphone control. Custom color matched to homeowner\'s vision.',
    outcome: 'Dramatic color transformation with modern smart opener. The new black doors with windows modernize the home while the quiet belt-drive opener adds daily convenience.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/brick-house-old-blue-gray-door-before-nc.jpg', alt: 'Old blue-gray garage door before replacement on brick home in Thomasville NC', tag: 'before' },
      { src: '/images/portfolio/before-after/brick-house-blue-gray-door-before-wide-nc.jpg', alt: 'Wide view of dated blue-gray garage doors on two-bay brick home in Thomasville NC', tag: 'before' },
      { src: '/images/portfolio/before-after/brick-house-two-bay-tngd-truck-during-nc.jpg', alt: 'TNGD truck on-site during two-bay door replacement in Thomasville NC', tag: 'process' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-mid-install-nc.jpg', alt: 'New black garage door mid-installation on brick home in Thomasville NC', tag: 'process' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-after-nc.jpg', alt: 'New black garage door with windows replacing old blue-gray door in Thomasville NC', tag: 'after' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-completed-nc.jpg', alt: 'New white garage door with windows installed in Thomasville NC', tag: 'after' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-tngd-truck-nc.jpg', alt: 'TNGD same-day service truck during door and opener installation in Thomasville NC', tag: 'process' },
      { src: '/images/portfolio/door-styles/black-garage-doors-red-brick-nc.jpg', alt: 'Two black raised-panel garage doors on red brick home with gravel driveway in Thomasville NC', tag: 'after' },
    ],
  },
  {
    id: 'marie-new-door',
    title: 'Residential Door & Opener — Burlington',
    serviceType: 'installations',
    systemType: 'Full Door + Torsion Spring + Opener',
    failureMode: 'Aging System — Full Replacement',
    materials: 'White Raised-Panel Steel',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    location: 'Burlington, NC',
    caption: 'A straightforward Burlington door replacement — new white raised-panel steel with updated torsion springs and a modern opener. Clean finish inside and out, operating smoothly from day one.',
    problem: 'Homeowner needed a clean, reliable double-car garage door replacement with a new opener system.',
    solution: 'Installed a new white raised-panel steel door with new torsion spring system and opener. Clean interior finish with proper weatherstripping.',
    outcome: 'Brand-new door operating smoothly with updated spring system and modern opener. Clean, professional finish inside and out.',
    images: [
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-exterior.jpg', alt: 'New white garage door installed on residential home in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-interior.jpg', alt: 'Interior view of new garage door installation showing spring system in Burlington NC', tag: 'detail' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-open.jpg', alt: 'New garage door in open position showing opener in Burlington NC', tag: 'verification' },
      { src: '/images/portfolio/openers/garage-door-opener-burlington-nc.jpg', alt: 'New garage door opener installed at Burlington NC residence', tag: 'detail' },
    ],
  },
  {
    id: 'culdesac-full-replacement',
    title: 'Complete Door Replacement — Cul-de-Sac Home',
    serviceType: 'installations',
    systemType: 'Full Door + Torsion Spring',
    failureMode: 'Faded Panels + Weathered Finish',
    materials: 'White Short-Panel Steel',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Greensboro, NC',
    caption: 'This Greensboro cul-de-sac home had faded, weathered panels dragging down curb appeal. Full tear-out and new white short-panel steel door — night-and-day transformation completed same day.',
    problem: 'Aging two-car garage door on a cul-de-sac home — panels faded, weathered, and curb appeal was dragging down the street.',
    solution: 'Full tear-out and replacement with new white short-panel steel door. Updated torsion springs and weatherstripping.',
    outcome: 'Night-and-day transformation. The new door modernized the entire front elevation. TNGD truck on-site, completed same day.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/culdesac-old-door-before-replacement-nc.jpg', alt: 'Old weathered garage door before replacement on cul-de-sac home in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/before-after/culdesac-new-door-after-tngd-truck-nc.jpg', alt: 'New white garage door installed with TNGD truck in driveway in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/before-after/culdesac-new-door-after-interior-nc.jpg', alt: 'Interior view of new garage door installation in Greensboro NC', tag: 'detail' },
      { src: '/images/portfolio/before-after/culdesac-new-door-installed-interior-nc.jpg', alt: 'New door interior finish with spring system in Greensboro NC', tag: 'verification' },
    ],
  },
  {
    id: 'lin-door-motor',
    title: 'Door & Motor Package — Brick Front Home',
    serviceType: 'installations',
    systemType: 'Full Door + Belt-Drive Opener',
    failureMode: 'Worn Panels + Unreliable Opener',
    materials: 'Raised-Panel Steel',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    secondaryCity: 'McLeansville',
    location: 'McLeansville, NC',
    caption: 'An older McLeansville brick home with worn panels and an unreliable opener. New raised-panel steel door and quiet belt-drive opener with smartphone control — clean exterior that complements the brick facade.',
    problem: 'Older home with worn door panels and an unreliable opener needed a full system upgrade.',
    solution: 'New raised-panel steel door and modern belt-drive opener. Updated weatherstripping and bottom seal.',
    outcome: 'Quiet belt-drive operation with smartphone control. Clean exterior finish complements the brick facade.',
    images: [
      { src: '/images/portfolio/before-after/door-installation-guilford-county-after-exterior.jpg', alt: 'New garage door installed on brick home in McLeansville NC', tag: 'after' },
      { src: '/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg', alt: 'Interior view of new door installation in McLeansville NC', tag: 'detail' },
      { src: '/images/portfolio/openers/opener-motor-guilford-county-1.jpg', alt: 'New opener motor installed at brick front home in Guilford County NC', tag: 'detail' },
    ],
  },
  {
    id: 'detached-garage-replacement',
    title: 'Detached Garage Door Replacement',
    serviceType: 'installations',
    systemType: 'Full Door + Hardware',
    failureMode: 'Weathered Door + Failing Hardware',
    materials: 'White Raised-Panel Steel with Transom Windows',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Old, weathered door on a detached garage with peeling paint and failing hardware. Full tear-out and replacement with white raised-panel steel and transom windows — brought light into the garage and dramatically improved curb appeal.',
    problem: 'Detached garage had an old, weathered door with peeling paint and failing hardware. Door was difficult to operate and provided poor security.',
    solution: 'Full tear-out and replacement with new white raised-panel door with transom windows. New tracks, springs, and weatherstripping installed.',
    outcome: 'Night-and-day transformation. New door with windows brings light into the garage and dramatically improves curb appeal of the detached structure.',
    images: [
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-before.jpg', alt: 'Old weathered door on detached garage before replacement in Piedmont Triad NC', tag: 'before' },
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-after.jpg', alt: 'New white raised-panel door with windows on detached garage in Piedmont Triad NC', tag: 'after' },
    ],
  },
  {
    id: 'carriage-dusk-brick',
    title: 'Carriage House at Dusk — Colonial Grid',
    serviceType: 'installations',
    systemType: 'Carriage House Door',
    failureMode: 'Style Upgrade — No Failure',
    materials: 'Cream Carriage House with Colonial Grid Windows',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Clemmons',
    location: 'Clemmons, NC',
    caption: 'A traditional brick home in Clemmons needed a door that matched its colonial architecture. Cream carriage house door with colonial grid windows and decorative strap hardware — the warm interior lighting creates a golden glow at dusk that neighbors asked about.',
    problem: 'Traditional brick home needed a door that complemented its colonial architecture and looked striking day or night.',
    solution: 'Installed cream carriage house door with colonial grid windows and decorative strap hardware. The warm interior lighting creates a golden glow at dusk.',
    outcome: 'Stunning golden-hour curb appeal that photographs beautifully. Neighbors asked for the same door.',
    featured: false,
    images: [
      { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc.jpg', alt: 'Cream carriage house garage door at dusk with warm interior lighting in Clemmons NC', tag: 'after' },
      { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc-2.jpg', alt: 'Carriage house door golden hour second angle in Clemmons NC', tag: 'detail' },
    ],
  },
  {
    id: 'walnut-modern-farmhouse',
    title: 'Dark Walnut Woodgrain — Modern Farmhouse',
    serviceType: 'installations',
    systemType: 'Woodgrain Steel Door',
    failureMode: 'New Build — Style Selection',
    materials: 'Dark Walnut Woodgrain Raised-Panel Steel',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Mooresville',
    location: 'Mooresville, NC',
    caption: 'Modern farmhouse new build in Mooresville with board-and-batten siding. Dark walnut woodgrain raised-panel door pairs perfectly with the white siding and brick knee walls — builder requested the same spec for future homes.',
    problem: 'Modern farmhouse new build with board-and-batten siding needed a door that matched the warm, contemporary design language.',
    solution: 'Installed dark walnut woodgrain raised-panel door. The rich brown tone pairs perfectly with the white board-and-batten and brick knee walls.',
    outcome: 'First wood-look door in the portfolio — shows TNGD\'s range beyond standard white. Builder requested the same spec for future homes.',
    images: [
      { src: '/images/portfolio/door-styles/walnut-woodgrain-garage-door-modern-farmhouse-nc.jpg', alt: 'Dark walnut woodgrain garage door on modern farmhouse with board-and-batten siding in Mooresville NC', tag: 'after' },
    ],
  },

  // ═══════════════════════════════════════
  // SCREEN DOORS
  // ═══════════════════════════════════════

  {
    id: 'kernersville-screen-jackshaft',
    title: 'Screen Door + LiftMaster 98022 Jackshaft',
    serviceType: 'screen-doors',
    systemType: 'Retractable Screen + Jackshaft Opener',
    failureMode: 'No Ventilation + Ceiling Clearance Issue',
    materials: 'Retractable Mesh Screen + LiftMaster 98022',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    secondaryCity: 'Kernersville',
    location: 'Kernersville, NC',
    caption: 'Upscale Kernersville home with carriage-style doors needed bug-free ventilation without sacrificing ceiling clearance. Retractable screen system with LiftMaster 98022 jackshaft wall-mount opener — the best of both worlds.',
    problem: 'Upscale home with carriage-style doors needed a retractable screen system with a wall-mount opener to preserve overhead clearance for storage.',
    solution: 'Installed retractable screen door system with LiftMaster 98022 jackshaft wall-mount opener. The jackshaft frees up all ceiling space while the screen provides bug-free ventilation.',
    outcome: 'Premium screen door with space-saving jackshaft opener — the best of both worlds. Indoor and outdoor living connected seamlessly.',
    featured: true,
    images: [
      { src: '/images/portfolio/door-styles/carriage-house-door-decorative-hardware-nc.jpg', alt: 'Carriage house door with screen door combo at upscale home in Kernersville NC', tag: 'after' },
      { src: '/images/portfolio/door-styles/carriage-house-door-exterior-combo-job-nc.jpg', alt: 'Screen door and carriage door combo exterior view in Kernersville NC', tag: 'detail' },
      { src: '/images/portfolio/openers/liftmaster-jackshaft-opener-detail-nc.jpg', alt: 'LiftMaster 98022 jackshaft wall-mount opener installed in Kernersville NC', tag: 'detail' },
    ],
  },
  {
    id: 'high-point-screen-opener',
    title: 'Screen Door & Chamberlain Opener — Full Install',
    serviceType: 'screen-doors',
    systemType: 'Retractable Screen + Ceiling-Mount Opener',
    failureMode: 'No Ventilation + Noisy Chain-Drive',
    materials: '3-Panel Black Mesh Screen + Chamberlain Smart Opener',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    secondaryCity: 'High Point',
    location: 'High Point, NC',
    caption: 'High Point workshop garage needed bug-free airflow without losing full bay access. Custom 3-panel retractable screen and quiet Chamberlain Smart opener with myQ app control — workshop transformed on the same visit.',
    problem: 'Homeowner with a workshop garage wanted bug-free ventilation without giving up the ability to open the bay fully. Old chain-drive opener was noisy.',
    solution: 'Custom-fit retractable screen door system with 3-panel black mesh and white aluminum frame. Replaced old opener with new Chamberlain Smart ceiling-mount on same visit.',
    outcome: 'Workshop transformed — full airflow without insects. Screen retracts completely. Quiet Chamberlain opener with myQ app control installed on same visit.',
    featured: true,
    images: [
      { src: '/images/portfolio/screens/green-house-old-door-before-screen-nc.jpg', alt: 'Garage before screen door installation showing old panel in High Point NC', tag: 'before' },
      { src: '/images/portfolio/screens/green-house-exterior-before-screen-nc.jpg', alt: 'Exterior view of green house garage before screen installation in High Point NC', tag: 'before' },
      { src: '/images/portfolio/screens/tngd-tech-screen-panel-assembly-nc.jpg', alt: 'TNGD technician assembling screen door panel in garage in High Point NC', tag: 'process' },
      { src: '/images/portfolio/screens/screen-door-frame-assembly-tngd-truck-nc.jpg', alt: 'Screen door frame assembly with TNGD truck in High Point NC', tag: 'process' },
      { src: '/images/portfolio/screens/screen-door-install-progress-man-cave-nc.jpg', alt: 'Screen door installation in progress at man cave garage in High Point NC', tag: 'process' },
      { src: '/images/portfolio/screens/garage-screen-door-green-house-nc.jpg', alt: 'Completed retractable garage screen door on green house in High Point NC', tag: 'after' },
      { src: '/images/portfolio/openers/chamberlain-opener-closeup-product-nc.jpg', alt: 'Chamberlain Smart opener close-up installed during screen door visit in High Point NC', tag: 'detail' },
      { src: '/images/portfolio/openers/chamberlain-ceiling-mount-opener-install-nc.jpg', alt: 'Chamberlain ceiling-mount opener installed in High Point NC garage', tag: 'detail' },
    ],
  },
  {
    id: 'screen-door-install',
    title: 'Garage Screen Door Installation',
    serviceType: 'screen-doors',
    systemType: 'Retractable Mesh Screen',
    failureMode: 'No Ventilation',
    materials: 'Retractable Mesh Screen System',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    secondaryCity: 'Elon',
    location: 'Elon, NC',
    caption: 'Elon homeowner wanted bug-free outdoor living space from their garage. Retractable mesh screen system that rolls up completely when driving in or out — garage transforms into a screened patio during warm months.',
    problem: 'Homeowner wanted to use their garage as a bug-free outdoor living space during warm months.',
    solution: 'Installed retractable mesh garage screen system that rolls up when not in use and provides full airflow with insect protection.',
    outcome: 'Garage transforms into a screened patio space. Easy operation — screen rolls up completely when driving in or out.',
    images: [
      { src: '/images/portfolio/screens/garage-screen-door-nc-1.jpg', alt: 'Garage screen door installed in Elon NC', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-1.jpg', alt: 'Retractable mesh garage screen in Elon NC', tag: 'detail' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-2.jpg', alt: 'Mesh screening detail on garage door in Elon NC', tag: 'detail' },
      { src: '/images/portfolio/screens/garage-screen-door-nc-2.jpg', alt: 'Completed screen door installation side angle in Elon NC', tag: 'detail' },
    ],
  },
  {
    id: 'screen-door-brick-flag',
    title: 'Premium Screen Door — Brick Home',
    serviceType: 'screen-doors',
    systemType: 'Full-Width Retractable Screen',
    failureMode: 'No Ventilation',
    materials: 'Dark Frame Retractable Mesh Screen',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Advance',
    location: 'Advance, NC',
    caption: 'Brick home in Advance needed a clean, professional screen solution for their two-car garage. Full-width retractable mesh with dark frame that disappears against the opening — premium look that complements the brick facade.',
    problem: 'Brick home with American flag wanted a clean, professional screen solution for their two-car garage.',
    solution: 'Installed full-width retractable mesh screen system with dark frame that disappears against the garage opening.',
    outcome: 'Clean, premium look that complements the brick facade. Screen provides full ventilation while keeping bugs out.',
    images: [
      { src: '/images/portfolio/screens/screen-door-brick-american-flag-hero-nc.jpg', alt: 'Premium garage screen door on brick home with American flag in Advance NC', tag: 'after' },
      { src: '/images/portfolio/screens/screen-door-interior-view-completed-nc.jpg', alt: 'Interior view of retractable garage screen door in Advance NC', tag: 'detail' },
      { src: '/images/portfolio/screens/retractable-screen-door-completed-beige-house-nc.jpg', alt: 'Completed retractable screen door installation in Advance NC', tag: 'detail' },
    ],
  },

  // ═══════════════════════════════════════
  // OPENER WORK
  // ═══════════════════════════════════════

  {
    id: 'massey-door-opener',
    title: 'Door & Opener Full Service',
    serviceType: 'opener-work',
    systemType: 'Opener Motor + Track Alignment',
    failureMode: 'Worn Rollers + Misaligned Tracks + Outdated Opener',
    materials: 'New Opener Motor + Rollers',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Greensboro, NC',
    caption: 'This Greensboro brick-front home had worn rollers, misaligned tracks, and an outdated opener causing noisy operation. Replaced rollers, realigned tracks, and installed a new opener — quiet, smooth operation restored.',
    problem: 'Brick-front home with an aging door system — worn rollers, outdated opener, and misaligned tracks causing noisy operation.',
    solution: 'Replaced rollers, realigned tracks, and installed a new opener motor. Full system tune-up and lubrication.',
    outcome: 'Quiet, smooth operation restored. New opener with modern safety features and smartphone compatibility.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/door-opener-service-greensboro-before.jpg', alt: 'Garage door with worn rollers before service in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-before.jpg', alt: 'Old opener system before replacement in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-after.jpg', alt: 'New garage door opener installed in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/before-after/old-roller-replacement-nc-before.jpg', alt: 'Old worn garage door roller before replacement', tag: 'detail' },
    ],
  },

  // ═══════════════════════════════════════
  // REPAIRS
  // ═══════════════════════════════════════

  {
    id: 'single-door-replacement',
    title: 'Single-Car Door Replacement',
    serviceType: 'repairs',
    systemType: 'Single-Car Door + Hardware',
    failureMode: 'Worn Panels + Weathered Finish',
    materials: 'Raised-Panel Steel',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Aging single-car door was worn, weathered, and dragging down curb appeal. Full replacement with new raised-panel door, updated tracks, rollers, and weatherstripping — complete before/after transformation.',
    problem: 'Aging single-car garage door was worn, weathered, and dragging down curb appeal.',
    solution: 'Full door replacement with new raised-panel door. Updated tracks, rollers, and weatherstripping.',
    outcome: 'Clean, modern single-car door that operates smoothly and seals properly against the elements. Complete before/after transformation.',
    images: [
      { src: '/images/portfolio/before-after/single-door-replacement-nc-before.jpg', alt: 'Old single-car garage door before replacement in Piedmont Triad NC', tag: 'before' },
      { src: '/images/portfolio/before-after/single-door-replacement-nc-after.jpg', alt: 'New single-car garage door after replacement in Piedmont Triad NC', tag: 'after' },
    ],
  },
  {
    id: 'dented-door-repair',
    title: 'Dented Panel Door — Emergency Repair',
    serviceType: 'panel-work',
    systemType: 'Panel Replacement',
    failureMode: 'Impact Damage — Dented Panels',
    materials: 'Replacement Steel Panels',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Impact damage left dented and bent panels compromising appearance and operation. Targeted panel replacement with full track alignment and balance check — saved the homeowner significant cost over a full door replacement.',
    problem: 'Garage door suffered impact damage — dented and bent panels compromising both appearance and operation.',
    solution: 'Assessed damage and replaced affected panels. Full track alignment and balance check performed.',
    outcome: 'Door restored to smooth operation with clean panel finish. No full replacement needed — targeted repair saved the homeowner significant cost.',
    images: [
      { src: '/images/portfolio/before-after/dented-garage-door-before-replacement-nc.jpg', alt: 'Dented garage door panel before repair in Piedmont Triad NC', tag: 'before' },
    ],
  },

  // ═══════════════════════════════════════
  // EMERGENCY WORK
  // ═══════════════════════════════════════

  {
    id: 'alex-crashed-door',
    title: 'Emergency Crashed Door Rescue',
    serviceType: 'emergency',
    systemType: 'Full Door + Opener + Hardware',
    failureMode: 'Vehicle Impact — Total Destruction',
    materials: 'Replacement Door + Opener + Tracks',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    secondaryCity: 'Whitsett',
    location: 'Whitsett, NC',
    caption: 'Vehicle impact in Whitsett severely damaged the door — panels crushed, inoperable, security compromised. Emergency same-day response: removed damaged door, installed new door and opener system. Home secured within hours.',
    problem: 'Vehicle impact severely damaged the garage door — panels crushed, door inoperable, and security compromised. Interior showed buckled panels bent at mid-height.',
    solution: 'Emergency same-day response. Removed damaged door, installed new door and opener system. Complete track and hardware replacement.',
    outcome: 'Home secured same day. New door and opener fully operational within hours of the emergency call.',
    featured: true,
    images: [
      { src: '/images/hero/emergency-crashed-garage-door-nc.jpg', alt: 'Crashed garage door after vehicle impact in Whitsett NC', tag: 'before' },
      { src: '/images/portfolio/emergency/emergency-crashed-door-interior-before-nc.jpg', alt: 'Buckled garage door interior view showing mid-height damage in Whitsett NC', tag: 'before' },
    ],
  },
  {
    id: 'alamance-county-crashed-door',
    title: 'Emergency Crashed Door — Alamance County',
    serviceType: 'emergency',
    systemType: 'Full Door + Opener',
    failureMode: 'Vehicle Impact — Total Destruction',
    materials: 'Raised-Panel Steel + Opener + Hardware',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    location: 'Alamance County, NC',
    caption: 'Vehicle impact crashed through the garage door on a tan-sided Alamance County home. Emergency same-day response — removed destroyed door, installed new raised-panel door with full hardware. Home secured and looking better than before the crash.',
    problem: 'Vehicle impact crashed through the garage door on a tan-sided home, leaving it mangled and inoperable. Security and weather protection compromised.',
    solution: 'Emergency same-day response. Removed destroyed door, installed new raised-panel door with full hardware and opener. Interior finished to match existing trim.',
    outcome: 'Home secured same day with a brand-new door. Interior completed with clean finish — popcorn ceiling neighborhood looks better than before the crash.',
    images: [
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-1.jpg', alt: 'Crashed garage door on tan-sided home in Alamance County NC', tag: 'before' },
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-2.jpg', alt: 'Interior view of crashed garage door damage in Alamance County NC', tag: 'before' },
      { src: '/images/portfolio/installations/mona-completed-door-install-interior-nc.jpg', alt: 'Completed door installation interior view in Alamance County NC', tag: 'after' },
    ],
  },

  // ═══════════════════════════════════════
  // SPRING WORK
  // ═══════════════════════════════════════

  {
    id: 'spring-repair',
    title: 'Extension Spring Replacement',
    serviceType: 'spring-work',
    systemType: 'Extension-to-Torsion Upgrade',
    failureMode: 'Extension Spring Failure',
    materials: 'High-Cycle Torsion Springs',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Mooresville',
    location: 'Mooresville, NC',
    caption: 'Extension spring failure in Mooresville left the door stuck. Upgraded from the original extension setup to a safer high-cycle torsion spring system — longer lifespan and smoother operation than the original design.',
    problem: 'Extension spring failure left the garage door stuck and unable to open. Homeowner heard a loud bang and found the door wouldn\'t budge.',
    solution: 'Replaced failed extension springs with new high-cycle torsion spring system — a safer, more durable upgrade over the original extension setup.',
    outcome: 'Door balanced and operational. Upgraded to torsion springs for longer lifespan and smoother operation.',
    images: [
      { src: '/images/portfolio/springs/extension-spring-repair-nc-before.jpg', alt: 'Broken extension spring on garage door before repair in Mooresville NC', tag: 'before' },
      { src: '/images/portfolio/springs/torsion-spring-repair-nc-after.jpg', alt: 'New torsion spring installed on garage door in Mooresville NC', tag: 'after' },
    ],
  },
  {
    id: 'broken-torsion-spring',
    title: 'Torsion Spring Failure — Same-Day Fix',
    serviceType: 'spring-work',
    systemType: 'Torsion Spring',
    failureMode: 'Torsion Spring Snap',
    materials: 'High-Cycle Torsion Spring (15,000+ cycles)',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Greensboro, NC',
    caption: 'Torsion spring snapped during normal operation in Greensboro, trapping the vehicle inside. Same-day emergency response — replaced with properly rated spring, full balance test, and safety check. Back in service within hours.',
    problem: 'Torsion spring snapped during normal operation. Door dropped and wouldn\'t open, trapping the vehicle inside.',
    solution: 'Same-day emergency response. Replaced broken torsion spring with properly rated replacement. Full balance test and safety check.',
    outcome: 'Door back in service within hours. New spring rated for 15,000+ cycles.',
    featured: true,
    images: [
      { src: '/images/portfolio/springs/broken-torsion-spring-piedmont-triad.jpg', alt: 'Broken torsion spring on garage door in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-1.jpg', alt: 'New torsion spring installed after emergency repair in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-2.jpg', alt: 'Completed spring replacement with balanced door in Greensboro NC', tag: 'verification' },
    ],
  },
  {
    id: 'spring-repair-field',
    title: 'Torsion Spring Repair — Field Service',
    serviceType: 'spring-work',
    systemType: 'Torsion Spring',
    failureMode: 'Torsion Spring Failure',
    materials: 'High-Cycle Torsion Springs (20,000+ cycles)',
    corridorPosition: 'east-central',
    anchorCity: 'Burlington',
    location: 'Piedmont Triad, NC',
    caption: 'Torsion spring failed during normal operation. TNGD dispatched for field repair — on-site spring replacement with full balance test and safety inspection. Door balanced and operational within the hour.',
    problem: 'Torsion spring failed during normal operation, leaving the door stuck. TNGD dispatched for field repair.',
    solution: 'On-site spring replacement with properly rated torsion springs. Full balance test and safety inspection.',
    outcome: 'Door balanced and operational within the hour. Spring rated for 20,000+ cycles.',
    images: [
      { src: '/images/portfolio/springs/spring-repair-tngd-truck-nc.jpg', alt: 'Torsion spring repair in progress with TNGD service truck in Piedmont Triad NC', tag: 'process' },
      { src: '/images/portfolio/springs/broken-spring-replacement-nc.jpg', alt: 'Spring replacement hardware detail in Piedmont Triad NC', tag: 'detail' },
    ],
  },

  // ═══════════════════════════════════════
  // COMMERCIAL
  // ═══════════════════════════════════════

  {
    id: 'virtual-tee-systems-charlotte',
    title: 'Virtual Tee Systems — Commercial Door Replacement',
    serviceType: 'commercial',
    systemType: 'Commercial Sectional Door',
    failureMode: 'Damaged & Dilapidated Door — Safety/Security Hazard',
    materials: 'Insulated Steel Raised-Panel Commercial Door, Heavy-Duty Hardware',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Charlotte',
    location: 'Charlotte, NC',
    featured: true,
    caption: 'Virtual Tee Systems is a referral partner for homeowners looking to reconstruct their garage and door for optimal virtual golf setups. Their own shop door was beaten and dilapidated — a safety and security concern. TNGD replaced it with a new insulated commercial sectional door, restoring full security and a clean, professional storefront.',
    problem: 'The existing commercial door was severely damaged and could not close fully, creating a security vulnerability and unprofessional appearance for a client-facing business.',
    solution: 'Complete tear-out and replacement with a new insulated steel commercial sectional door. New tracks, hardware, springs, and weatherseal installed. All work completed same-day on-site.',
    outcome: 'Fully secured storefront with a clean, professional appearance. Door operates smoothly with proper balance and seal — no more security gaps.',
    images: [
      { src: '/images/portfolio/commercial/virtual-tee-systems-commercial-door-completed-exterior-charlotte-nc.jpg', alt: 'Completed commercial garage door replacement at Virtual Tee Systems Charlotte NC', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-damaged-door-exterior-charlotte-nc.jpg', alt: 'Damaged commercial door that could not close — security hazard at Virtual Tee Systems Charlotte NC', tag: 'before' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-old-door-open-exterior-charlotte-nc.jpg', alt: 'Old dilapidated commercial door partially open showing deterioration Charlotte NC', tag: 'before' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-rusted-bracket-detail-charlotte-nc.jpg', alt: 'Rusted and corroded door bracket showing hardware failure at Virtual Tee Systems Charlotte NC', tag: 'detail' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-old-door-removed-tngd-truck-charlotte-nc.jpg', alt: 'Old door removed with TNGD service truck on-site at Virtual Tee Systems Charlotte NC', tag: 'process' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-panels-prep-charlotte-nc.jpg', alt: 'New commercial door panels being prepped for installation Charlotte NC', tag: 'process' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-technician-installation-charlotte-nc.jpg', alt: 'TNGD technician installing new commercial door sections at Virtual Tee Systems Charlotte NC', tag: 'process' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-track-installation-charlotte-nc.jpg', alt: 'Track and bracket installation for new commercial door system Charlotte NC', tag: 'process' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-tech-completed-interior-charlotte-nc.jpg', alt: 'TNGD technician with completed new commercial door interior view Charlotte NC', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-door-interior-charlotte-nc.jpg', alt: 'New commercial door interior view showing proper installation and hardware Charlotte NC', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-door-exterior-charlotte-nc.jpg', alt: 'New commercial door exterior view at Virtual Tee Systems Charlotte NC — clean professional finish', tag: 'after' },
    ],
  },
];
