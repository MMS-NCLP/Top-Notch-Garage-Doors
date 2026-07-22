export interface PortfolioImage {
  src: string;
  alt: string;
  label?: 'Before' | 'After' | 'Detail';
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'installation' | 'repair' | 'opener' | 'spring' | 'screen' | 'construction' | 'door-style' | 'emergency';
  location: string;
  problem: string;
  solution: string;
  outcome: string;
  images: PortfolioImage[];
  featured?: boolean;
}

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'installation', label: 'Door Installations' },
  { id: 'door-style', label: 'Door Styles' },
  { id: 'repair', label: 'Repairs' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'opener', label: 'Opener Service' },
  { id: 'spring', label: 'Spring Repair' },
  { id: 'screen', label: 'Screen Doors' },
  { id: 'construction', label: 'New Construction' },
] as const;

export const projects: PortfolioProject[] = [

  // ── CONSTRUCTION ──

  {
    id: 'day-ave-construction',
    title: 'Day Ave — New Construction Duplex Door & Opener',
    category: 'construction',
    location: 'Burlington, NC',
    problem: 'New-build duplex on Day Ave needed matching black garage doors and opener systems on both units. Builder required coordination with framing, electrical, and smart access.',
    solution: 'Installed black raised-panel doors with transom windows on both units (#834 and #836). Full opener systems with LiftMaster video keypad for smart entry. Coordinated with builder on specs.',
    outcome: 'Both units completed same day with matching black doors, smart openers, and video keypad access. TNGD truck on-site — builder stayed on schedule for occupancy.',
    featured: true,
    images: [
      { src: '/images/portfolio/construction/day-ave-black-door-completed-exterior-burlington-nc.jpg', alt: 'Completed black garage door with transom windows on Day Ave new construction in Burlington NC', label: 'After' },
      { src: '/images/portfolio/installations/new-construction-door-install-nc-progress.jpg', alt: 'Open garage bay before door installation at Day Ave new construction in Burlington NC', label: 'Before' },
      { src: '/images/portfolio/construction/day-ave-empty-garage-bay-before-burlington-nc.jpg', alt: 'Empty garage bay interior before door install at Day Ave Burlington NC', label: 'Before' },
      { src: '/images/portfolio/construction/day-ave-new-construction-interior-nc.jpg', alt: 'Interior view of new door installed with workbench at Day Ave Burlington NC', label: 'Detail' },
      { src: '/images/portfolio/construction/day-ave-opener-motor-install-burlington-nc.jpg', alt: 'Garage door opener and motor installation in progress at Day Ave Burlington NC', label: 'Detail' },
      { src: '/images/portfolio/construction/day-ave-liftmaster-video-keypad-burlington-nc.jpg', alt: 'LiftMaster video keypad installed on exterior at Day Ave Burlington NC', label: 'Detail' },
      { src: '/images/portfolio/construction/day-ave-duplex-completed-tngd-truck-burlington-nc.jpg', alt: 'Both Day Ave duplex units with completed black doors and TNGD truck at dusk in Burlington NC', label: 'After' },
    ],
  },

  // ── INSTALLATIONS ──

  {
    id: 'thomasville-door-motor',
    title: 'Blue-Gray to Black — Door & Motor Complete Package',
    category: 'installation',
    location: 'Thomasville, NC',
    problem: 'Two-bay brick home had worn, faded blue-gray doors that looked dated. Old opener was noisy and unreliable. Full system upgrade needed — doors, color, and motor.',
    solution: 'Replaced both bays with new black raised-panel doors with transom windows. Installed new belt-drive opener with smartphone control. Custom color matched to homeowner\'s vision.',
    outcome: 'Dramatic color transformation with modern smart opener. The new black doors with windows modernize the home while the quiet belt-drive opener adds daily convenience.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/brick-house-old-blue-gray-door-before-nc.jpg', alt: 'Old blue-gray garage door before replacement on brick home in Thomasville NC', label: 'Before' },
      { src: '/images/portfolio/before-after/brick-house-blue-gray-door-before-wide-nc.jpg', alt: 'Wide view of dated blue-gray garage doors on two-bay brick home in Thomasville NC', label: 'Before' },
      { src: '/images/portfolio/before-after/brick-house-two-bay-tngd-truck-during-nc.jpg', alt: 'TNGD truck on-site during two-bay door replacement in Thomasville NC', label: 'Detail' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-mid-install-nc.jpg', alt: 'New black garage door mid-installation on brick home in Thomasville NC', label: 'Detail' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-after-nc.jpg', alt: 'New black garage door with windows replacing old blue-gray door in Thomasville NC', label: 'After' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-completed-nc.jpg', alt: 'New white garage door with windows installed in Thomasville NC', label: 'After' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-tngd-truck-nc.jpg', alt: 'TNGD same-day service truck during door and opener installation in Thomasville NC', label: 'Detail' },
      { src: '/images/portfolio/door-styles/black-garage-doors-red-brick-nc.jpg', alt: 'Two black raised-panel garage doors on red brick home with gravel driveway in Thomasville NC', label: 'After' },
    ],
  },
  {
    id: 'marie-new-door',
    title: 'Residential Door & Opener — Burlington',
    category: 'installation',
    location: 'Burlington, NC',
    problem: 'Homeowner needed a clean, reliable double-car garage door replacement with a new opener system.',
    solution: 'Installed a new white raised-panel steel door with new torsion spring system and opener. Clean interior finish with proper weatherstripping.',
    outcome: 'Brand-new door operating smoothly with updated spring system and modern opener. Clean, professional finish inside and out.',
    images: [
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-exterior.jpg', alt: 'New white garage door installed on residential home in Burlington NC', label: 'After' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-interior.jpg', alt: 'Interior view of new garage door installation showing spring system in Burlington NC', label: 'Detail' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-open.jpg', alt: 'New garage door in open position showing opener in Burlington NC', label: 'Detail' },
      { src: '/images/portfolio/openers/garage-door-opener-burlington-nc.jpg', alt: 'New garage door opener installed at Burlington NC residence', label: 'Detail' },
    ],
  },
  {
    id: 'culdesac-full-replacement',
    title: 'Complete Door Replacement — Cul-de-Sac Home',
    category: 'installation',
    location: 'Greensboro, NC',
    problem: 'Aging two-car garage door on a cul-de-sac home — panels faded, weathered, and curb appeal was dragging down the street.',
    solution: 'Full tear-out and replacement with new white short-panel steel door. Updated torsion springs and weatherstripping.',
    outcome: 'Night-and-day transformation. The new door modernized the entire front elevation. TNGD truck on-site, completed same day.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/culdesac-old-door-before-replacement-nc.jpg', alt: 'Old weathered garage door before replacement on cul-de-sac home in Greensboro NC', label: 'Before' },
      { src: '/images/portfolio/before-after/culdesac-new-door-after-tngd-truck-nc.jpg', alt: 'New white garage door installed with TNGD truck in driveway in Greensboro NC', label: 'After' },
      { src: '/images/portfolio/before-after/culdesac-new-door-after-interior-nc.jpg', alt: 'Interior view of new garage door installation in Greensboro NC', label: 'Detail' },
      { src: '/images/portfolio/before-after/culdesac-new-door-installed-interior-nc.jpg', alt: 'New door interior finish with spring system in Greensboro NC', label: 'Detail' },
    ],
  },
  {
    id: 'lin-door-motor',
    title: 'Door & Motor Package — Brick Front Home',
    category: 'installation',
    location: 'McLeansville, NC',
    problem: 'Older home with worn door panels and an unreliable opener needed a full system upgrade.',
    solution: 'New raised-panel steel door and modern belt-drive opener. Updated weatherstripping and bottom seal.',
    outcome: 'Quiet belt-drive operation with smartphone control. Clean exterior finish complements the brick facade.',
    images: [
      { src: '/images/portfolio/before-after/door-installation-guilford-county-after-exterior.jpg', alt: 'New garage door installed on brick home in McLeansville NC', label: 'After' },
      { src: '/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg', alt: 'Interior view of new door installation in McLeansville NC', label: 'Detail' },
      { src: '/images/portfolio/openers/opener-motor-guilford-county-1.jpg', alt: 'New opener motor installed at brick front home in Guilford County NC', label: 'Detail' },
    ],
  },

  // ── SCREEN DOORS ── (Corrected: Kernersville and High Point are screen jobs)

  {
    id: 'kernersville-screen-jackshaft',
    title: 'Screen Door + LiftMaster 98022 Jackshaft',
    category: 'screen',
    location: 'Kernersville, NC',
    problem: 'Upscale home with carriage-style doors needed a retractable screen system with a wall-mount opener to preserve overhead clearance for storage.',
    solution: 'Installed retractable screen door system with LiftMaster 98022 jackshaft wall-mount opener. The jackshaft frees up all ceiling space while the screen provides bug-free ventilation.',
    outcome: 'Premium screen door with space-saving jackshaft opener — the best of both worlds. Indoor and outdoor living connected seamlessly.',
    featured: true,
    images: [
      { src: '/images/portfolio/door-styles/carriage-house-door-decorative-hardware-nc.jpg', alt: 'Carriage house door with screen door combo at upscale home in Kernersville NC', label: 'After' },
      { src: '/images/portfolio/door-styles/carriage-house-door-exterior-combo-job-nc.jpg', alt: 'Screen door and carriage door combo exterior view in Kernersville NC', label: 'Detail' },
      { src: '/images/portfolio/openers/liftmaster-jackshaft-opener-detail-nc.jpg', alt: 'LiftMaster 98022 jackshaft wall-mount opener installed in Kernersville NC', label: 'Detail' },
    ],
  },
  {
    id: 'high-point-screen-opener',
    title: 'Screen Door & Chamberlain Opener — Full Install',
    category: 'screen',
    location: 'High Point, NC',
    problem: 'Homeowner with a workshop garage wanted bug-free ventilation without giving up the ability to open the bay fully. Old chain-drive opener was noisy.',
    solution: 'Custom-fit retractable screen door system with 3-panel black mesh and white aluminum frame. Replaced old opener with new Chamberlain Smart ceiling-mount on same visit.',
    outcome: 'Workshop transformed — full airflow without insects. Screen retracts completely. Quiet Chamberlain opener with myQ app control installed on same visit.',
    featured: true,
    images: [
      { src: '/images/portfolio/screens/green-house-old-door-before-screen-nc.jpg', alt: 'Garage before screen door installation showing old panel in High Point NC', label: 'Before' },
      { src: '/images/portfolio/screens/green-house-exterior-before-screen-nc.jpg', alt: 'Exterior view of green house garage before screen installation in High Point NC', label: 'Before' },
      { src: '/images/portfolio/screens/tngd-tech-screen-panel-assembly-nc.jpg', alt: 'TNGD technician assembling screen door panel in garage in High Point NC', label: 'Detail' },
      { src: '/images/portfolio/screens/screen-door-frame-assembly-tngd-truck-nc.jpg', alt: 'Screen door frame assembly with TNGD truck in High Point NC', label: 'Detail' },
      { src: '/images/portfolio/screens/screen-door-install-progress-man-cave-nc.jpg', alt: 'Screen door installation in progress at man cave garage in High Point NC', label: 'Detail' },
      { src: '/images/portfolio/screens/garage-screen-door-green-house-nc.jpg', alt: 'Completed retractable garage screen door on green house in High Point NC', label: 'After' },
      { src: '/images/portfolio/openers/chamberlain-opener-closeup-product-nc.jpg', alt: 'Chamberlain Smart opener close-up installed during screen door visit in High Point NC', label: 'Detail' },
      { src: '/images/portfolio/openers/chamberlain-ceiling-mount-opener-install-nc.jpg', alt: 'Chamberlain ceiling-mount opener installed in High Point NC garage', label: 'Detail' },
    ],
  },
  {
    id: 'screen-door-install',
    title: 'Garage Screen Door Installation',
    category: 'screen',
    location: 'Elon, NC',
    problem: 'Homeowner wanted to use their garage as a bug-free outdoor living space during warm months.',
    solution: 'Installed retractable mesh garage screen system that rolls up when not in use and provides full airflow with insect protection.',
    outcome: 'Garage transforms into a screened patio space. Easy operation — screen rolls up completely when driving in or out.',
    images: [
      { src: '/images/portfolio/screens/garage-screen-door-nc-1.jpg', alt: 'Garage screen door installed in Elon NC', label: 'After' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-1.jpg', alt: 'Retractable mesh garage screen in Elon NC', label: 'Detail' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-2.jpg', alt: 'Mesh screening detail on garage door in Elon NC', label: 'Detail' },
      { src: '/images/portfolio/screens/garage-screen-door-nc-2.jpg', alt: 'Completed screen door installation side angle in Elon NC', label: 'Detail' },
    ],
  },
  {
    id: 'screen-door-brick-flag',
    title: 'Premium Screen Door — Brick Home',
    category: 'screen',
    location: 'Advance, NC',
    problem: 'Brick home with American flag wanted a clean, professional screen solution for their two-car garage.',
    solution: 'Installed full-width retractable mesh screen system with dark frame that disappears against the garage opening.',
    outcome: 'Clean, premium look that complements the brick facade. Screen provides full ventilation while keeping bugs out.',
    images: [
      { src: '/images/portfolio/screens/screen-door-brick-american-flag-hero-nc.jpg', alt: 'Premium garage screen door on brick home with American flag in Advance NC', label: 'After' },
      { src: '/images/portfolio/screens/screen-door-interior-view-completed-nc.jpg', alt: 'Interior view of retractable garage screen door in Advance NC', label: 'Detail' },
      { src: '/images/portfolio/screens/retractable-screen-door-completed-beige-house-nc.jpg', alt: 'Completed retractable screen door installation in Advance NC', label: 'Detail' },
    ],
  },

  // ── OPENERS ──

  {
    id: 'massey-door-opener',
    title: 'Door & Opener Full Service',
    category: 'opener',
    location: 'Greensboro, NC',
    problem: 'Brick-front home with an aging door system — worn rollers, outdated opener, and misaligned tracks causing noisy operation.',
    solution: 'Replaced rollers, realigned tracks, and installed a new opener motor. Full system tune-up and lubrication.',
    outcome: 'Quiet, smooth operation restored. New opener with modern safety features and smartphone compatibility.',
    featured: true,
    images: [
      { src: '/images/portfolio/before-after/door-opener-service-greensboro-before.jpg', alt: 'Garage door with worn rollers before service in Greensboro NC', label: 'Before' },
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-before.jpg', alt: 'Old opener system before replacement in Greensboro NC', label: 'Before' },
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-after.jpg', alt: 'New garage door opener installed in Greensboro NC', label: 'After' },
      { src: '/images/portfolio/before-after/old-roller-replacement-nc-before.jpg', alt: 'Old worn garage door roller before replacement', label: 'Detail' },
    ],
  },

  // ── DOOR STYLES ──

  {
    id: 'carriage-dusk-brick',
    title: 'Carriage House at Dusk — Colonial Grid',
    category: 'door-style',
    location: 'Clemmons, NC',
    problem: 'Traditional brick home needed a door that complemented its colonial architecture and looked striking day or night.',
    solution: 'Installed cream carriage house door with colonial grid windows and decorative strap hardware. The warm interior lighting creates a golden glow at dusk.',
    outcome: 'Stunning golden-hour curb appeal that photographs beautifully. Neighbors asked for the same door.',
    featured: true,
    images: [
      { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc.jpg', alt: 'Cream carriage house garage door at dusk with warm interior lighting in Clemmons NC', label: 'After' },
      { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc-2.jpg', alt: 'Carriage house door golden hour second angle in Clemmons NC', label: 'Detail' },
    ],
  },
  {
    id: 'walnut-modern-farmhouse',
    title: 'Dark Walnut Woodgrain — Modern Farmhouse',
    category: 'door-style',
    location: 'Mooresville, NC',
    problem: 'Modern farmhouse new build with board-and-batten siding needed a door that matched the warm, contemporary design language.',
    solution: 'Installed dark walnut woodgrain raised-panel door. The rich brown tone pairs perfectly with the white board-and-batten and brick knee walls.',
    outcome: 'First wood-look door in the portfolio — shows TNGD\'s range beyond standard white. Builder requested the same spec for future homes.',
    images: [
      { src: '/images/portfolio/door-styles/walnut-woodgrain-garage-door-modern-farmhouse-nc.jpg', alt: 'Dark walnut woodgrain garage door on modern farmhouse with board-and-batten siding in Mooresville NC', label: 'After' },
    ],
  },

  // ── REPAIR / EMERGENCY ──

  {
    id: 'single-door-replacement',
    title: 'Single-Car Door Replacement',
    category: 'repair',
    location: 'Piedmont Triad, NC',
    problem: 'Aging single-car garage door was worn, weathered, and dragging down curb appeal.',
    solution: 'Full door replacement with new raised-panel door. Updated tracks, rollers, and weatherstripping.',
    outcome: 'Clean, modern single-car door that operates smoothly and seals properly against the elements. Complete before/after transformation.',
    images: [
      { src: '/images/portfolio/before-after/single-door-replacement-nc-before.jpg', alt: 'Old single-car garage door before replacement in Piedmont Triad NC', label: 'Before' },
      { src: '/images/portfolio/before-after/single-door-replacement-nc-after.jpg', alt: 'New single-car garage door after replacement in Piedmont Triad NC', label: 'After' },
    ],
  },
  {
    id: 'alex-crashed-door',
    title: 'Emergency Crashed Door Rescue',
    category: 'emergency',
    location: 'Whitsett, NC',
    problem: 'Vehicle impact severely damaged the garage door — panels crushed, door inoperable, and security compromised. Interior showed buckled panels bent at mid-height.',
    solution: 'Emergency same-day response. Removed damaged door, installed new door and opener system. Complete track and hardware replacement.',
    outcome: 'Home secured same day. New door and opener fully operational within hours of the emergency call.',
    featured: true,
    images: [
      { src: '/images/hero/emergency-crashed-garage-door-nc.jpg', alt: 'Crashed garage door after vehicle impact in Whitsett NC', label: 'Before' },
      { src: '/images/portfolio/emergency/emergency-crashed-door-interior-before-nc.jpg', alt: 'Buckled garage door interior view showing mid-height damage in Whitsett NC', label: 'Before' },
    ],
  },

  // ── NEW GROUPS (from audit corrections) ──

  {
    id: 'alamance-county-crashed-door',
    title: 'Emergency Crashed Door — Alamance County',
    category: 'emergency',
    location: 'Alamance County, NC',
    problem: 'Vehicle impact crashed through the garage door on a tan-sided home, leaving it mangled and inoperable. Security and weather protection compromised.',
    solution: 'Emergency same-day response. Removed destroyed door, installed new raised-panel door with full hardware and opener. Interior finished to match existing trim.',
    outcome: 'Home secured same day with a brand-new door. Interior completed with clean finish — popcorn ceiling neighborhood looks better than before the crash.',
    images: [
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-1.jpg', alt: 'Crashed garage door on tan-sided home in Alamance County NC', label: 'Before' },
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-2.jpg', alt: 'Interior view of crashed garage door damage in Alamance County NC', label: 'Before' },
      { src: '/images/portfolio/installations/mona-completed-door-install-interior-nc.jpg', alt: 'Completed door installation interior view in Alamance County NC', label: 'After' },
    ],
  },
  {
    id: 'dented-door-repair',
    title: 'Dented Panel Door — Emergency Repair',
    category: 'repair',
    location: 'Piedmont Triad, NC',
    problem: 'Garage door suffered impact damage — dented and bent panels compromising both appearance and operation.',
    solution: 'Assessed damage and replaced affected panels. Full track alignment and balance check performed.',
    outcome: 'Door restored to smooth operation with clean panel finish. No full replacement needed — targeted repair saved the homeowner significant cost.',
    images: [
      { src: '/images/portfolio/before-after/dented-garage-door-before-replacement-nc.jpg', alt: 'Dented garage door panel before repair in Piedmont Triad NC', label: 'Before' },
    ],
  },
  {
    id: 'detached-garage-replacement',
    title: 'Detached Garage Door Replacement',
    category: 'installation',
    location: 'Piedmont Triad, NC',
    problem: 'Detached garage had an old, weathered door with peeling paint and failing hardware. Door was difficult to operate and provided poor security.',
    solution: 'Full tear-out and replacement with new white raised-panel door with transom windows. New tracks, springs, and weatherstripping installed.',
    outcome: 'Night-and-day transformation. New door with windows brings light into the garage and dramatically improves curb appeal of the detached structure.',
    images: [
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-before.jpg', alt: 'Old weathered door on detached garage before replacement in Piedmont Triad NC', label: 'Before' },
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-after.jpg', alt: 'New white raised-panel door with windows on detached garage in Piedmont Triad NC', label: 'After' },
    ],
  },

  // ── SPRINGS ── (Statesville corrected — removed wrong pairing)

  {
    id: 'spring-repair',
    title: 'Extension Spring Replacement',
    category: 'spring',
    location: 'Mooresville, NC',
    problem: 'Extension spring failure left the garage door stuck and unable to open. Homeowner heard a loud bang and found the door wouldn\'t budge.',
    solution: 'Replaced failed extension springs with new high-cycle torsion spring system — a safer, more durable upgrade over the original extension setup.',
    outcome: 'Door balanced and operational. Upgraded to torsion springs for longer lifespan and smoother operation.',
    images: [
      { src: '/images/portfolio/springs/extension-spring-repair-nc-before.jpg', alt: 'Broken extension spring on garage door before repair in Mooresville NC', label: 'Before' },
      { src: '/images/portfolio/springs/torsion-spring-repair-nc-after.jpg', alt: 'New torsion spring installed on garage door in Mooresville NC', label: 'After' },
    ],
  },
  {
    id: 'broken-torsion-spring',
    title: 'Torsion Spring Failure — Same-Day Fix',
    category: 'spring',
    location: 'Greensboro, NC',
    problem: 'Torsion spring snapped during normal operation. Door dropped and wouldn\'t open, trapping the vehicle inside.',
    solution: 'Same-day emergency response. Replaced broken torsion spring with properly rated replacement. Full balance test and safety check.',
    outcome: 'Door back in service within hours. New spring rated for 15,000+ cycles.',
    images: [
      { src: '/images/portfolio/springs/broken-torsion-spring-piedmont-triad.jpg', alt: 'Broken torsion spring on garage door in Greensboro NC', label: 'Before' },
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-1.jpg', alt: 'New torsion spring installed after emergency repair in Greensboro NC', label: 'After' },
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-2.jpg', alt: 'Completed spring replacement with balanced door in Greensboro NC', label: 'Detail' },
    ],
  },
  {
    id: 'spring-repair-field',
    title: 'Torsion Spring Repair — Field Service',
    category: 'spring',
    location: 'Piedmont Triad, NC',
    problem: 'Torsion spring failed during normal operation, leaving the door stuck. TNGD dispatched for field repair.',
    solution: 'On-site spring replacement with properly rated torsion springs. Full balance test and safety inspection.',
    outcome: 'Door balanced and operational within the hour. Spring rated for 20,000+ cycles.',
    images: [
      { src: '/images/portfolio/springs/spring-repair-tngd-truck-nc.jpg', alt: 'Torsion spring repair in progress with TNGD service truck in Piedmont Triad NC', label: 'Detail' },
      { src: '/images/portfolio/springs/broken-spring-replacement-nc.jpg', alt: 'Spring replacement hardware detail in Piedmont Triad NC', label: 'Detail' },
    ],
  },
];
