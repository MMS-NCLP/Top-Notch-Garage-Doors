// ── Portfolio Architecture (Master Blueprint) ──
// Structured around: service type + corridor location + system type + failure mode

export type ServiceType = 'repairs' | 'installations' | 'spring-work' | 'opener-work' | 'panel-work' | 'emergency' | 'screen-doors' | 'commercial';
export type CorridorPosition = 'west' | 'central' | 'east-central' | 'east';
export type AnchorCity = 'Statesville' | 'Greensboro' | 'Burlington' | 'Durham';
export type ImageTag = 'before' | 'after' | 'progress';

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
  pendingVideo?: { drive: string; sizeMB: number; note: string }[];
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
    id: 'new-construction-raised-panel-windows-trim',
    title: 'White Raised-Panel Door & Opener — New Construction with Premium Trim',
    serviceType: 'installations',
    systemType: 'Full Door + Opener + Custom Trim',
    failureMode: 'New Build — No Existing System',
    materials: 'White Raised-Panel Steel with Transom Windows + Weatherseal Trim',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'New construction homes across two properties — a two-car with gooseneck lanterns and gray beam accent, and a single-car with matching windows. Both got premium raised-panel doors with precision trim, weatherseal detailing, and clean opener systems. The kind of new-build work where every seam and seal matters.',
    problem: 'New construction homes needed garage door installations coordinated with the builder — matching the architectural style, ensuring proper weatherseal, and fitting premium opener systems before occupancy.',
    solution: 'Installed white raised-panel steel doors with transom windows on both properties. Custom trim work at every door-to-frame junction, precision weatherseal application, and opener systems with proper rail alignment. Every detail dialed in for move-in day.',
    outcome: 'Two new construction properties with premium door installations — the gooseneck lantern home has a showcase two-car bay, and the single-car got the same attention to trim and weatherseal detail. Opener systems aligned and tested before occupancy.',
    images: [
      { src: '/images/portfolio/construction/new-construction-raised-panel-gooseneck-lanterns-nc.jpg', alt: 'New construction two-car raised-panel door with gooseneck lanterns and gray beam accent', tag: 'after' },
      { src: '/images/portfolio/construction/new-construction-single-car-door-windows-nc.jpg', alt: 'New construction single-car raised-panel door with windows installed exterior view', tag: 'after' },
      { src: '/images/portfolio/construction/new-construction-interior-opener-rail-tngd-truck-nc.jpg', alt: 'Interior view of new door with opener rail and TNGD truck visible at construction site', tag: 'after' },
      { src: '/images/portfolio/construction/new-construction-weatherseal-trim-detail-nc.jpg', alt: 'Precision weatherseal and trim detail at door-to-frame junction on new construction', tag: 'after' },
      { src: '/images/portfolio/construction/new-construction-window-panel-detail-nc.jpg', alt: 'Window panel and woodgrain texture detail on new construction door', tag: 'after' },
    ],
  },
  {
    id: 'raised-panel-sunburst-opener-off-track-replacement',
    title: 'Raised-Panel Door with Sunburst Windows & Chamberlain myQ — Off-Track Emergency Replacement',
    serviceType: 'installations',
    systemType: 'Full Door + Belt-Drive Smart Opener',
    failureMode: 'Door Off Track — Jammed at Angle',
    materials: 'White Raised-Panel Steel with Sunburst Windows + Chamberlain myQ Belt-Drive',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'This two-car door came off the tracks and jammed at a severe angle — the homeowner couldn\'t close or open it. Old LiftMaster 1/3HP chain drive was worn out too. We replaced the entire system: new raised-panel door with sunburst windows and a Chamberlain myQ belt-drive opener. From emergency call to curb appeal upgrade.',
    problem: 'Garage door completely off track, jammed at a steep angle and inoperable. The old LiftMaster Professional 1/3HP chain-drive opener was worn and noisy. Homeowner needed both the door and opener replaced.',
    solution: 'Removed the damaged off-track door and aging chain-drive opener. Installed a new white raised-panel steel door with sunburst decorative windows and a Chamberlain myQ WiFi-enabled belt-drive opener for quiet, smart operation.',
    outcome: 'Complete transformation from an emergency eyesore to a clean, modern curb appeal upgrade. New sunburst windows add architectural character, and the Chamberlain myQ gives smartphone control and quiet belt-drive operation. TNGD truck on-site, job done right.',
    images: [
      { src: '/images/portfolio/installations/raised-panel-sunburst-windows-completed-exterior-nc.jpg', alt: 'New white raised-panel garage door with sunburst windows completed exterior view', tag: 'after' },
      { src: '/images/portfolio/before-after/off-track-garage-door-exterior-before-nc.jpg', alt: 'Garage door severely off track and jammed at steep angle before replacement', tag: 'before' },
      { src: '/images/portfolio/openers/old-liftmaster-chain-drive-before-nc.jpg', alt: 'Old LiftMaster Professional 1/3HP chain-drive opener before replacement', tag: 'before' },
      { src: '/images/portfolio/installations/mona-completed-door-install-interior-nc.jpg', alt: 'New door interior view during installation showing tracks and torsion spring', tag: 'progress' },
      { src: '/images/portfolio/installations/raised-panel-sunburst-windows-closeup-nc.jpg', alt: 'Close-up of new raised-panel door with sunburst decorative windows exterior', tag: 'after' },
      { src: '/images/portfolio/openers/chamberlain-myq-belt-drive-new-install-nc.jpg', alt: 'New Chamberlain myQ belt-drive opener installed on ceiling', tag: 'after' },
      { src: '/images/portfolio/installations/raised-panel-door-tngd-truck-driveway-nc.jpg', alt: 'Completed raised-panel door with TNGD truck in driveway showing full house exterior', tag: 'after' },
      { src: '/images/portfolio/before-after/off-track-door-interior-before-nc.jpg', alt: 'Interior view of off-track door jammed at angle with car visible outside', tag: 'before' },
    ],
  },
  {
    id: 'raised-panel-door-opener-crashed-door-replacement',
    title: 'Raised-Panel Door & LiftMaster myQ Opener — Crashed Door Full Replacement',
    serviceType: 'installations',
    systemType: 'Full Door + Belt-Drive Smart Opener',
    failureMode: 'Door Crashed Off Track — Panels Buckled',
    materials: 'White Raised-Panel Steel + LiftMaster myQ Belt-Drive Opener',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'This door didn\'t just come off track — it crashed. Panels buckled, struts bent, the whole system jammed mid-travel with the old 3/4HP opener still trying to push it. We tore it all out, installed a new raised-panel door with proper struts and torsion spring, and put a LiftMaster myQ belt-drive on the ceiling. Tech action shots show the build from bracket to button.',
    problem: 'Garage door crashed off its tracks with buckled panels and bent struts. The old 3/4HP chain-drive opener was damaged in the crash. Door was completely inoperable and a security hazard.',
    solution: 'Removed the crashed door and damaged opener system. Installed a new white raised-panel steel door with reinforced struts and properly tensioned torsion spring. Mounted a LiftMaster myQ WiFi belt-drive opener for quiet, smart operation.',
    outcome: 'Clean new raised-panel door with reinforced construction — properly struted, spring-tensioned, and connected to a modern LiftMaster myQ opener. Gray siding home looks sharp with the new white door. From crashed hazard to curb appeal in one service call.',
    images: [
      { src: '/images/portfolio/installations/raised-panel-door-completed-exterior-gray-siding-nc.jpg', alt: 'New white raised-panel garage door completed on gray siding home exterior', tag: 'after' },
      { src: '/images/portfolio/before-after/crashed-garage-door-interior-buckled-before-nc.jpg', alt: 'Crashed garage door with buckled panels and old opener visible from interior', tag: 'before' },
      { src: '/images/portfolio/installations/tngd-tech-door-bracket-install-progress-nc.jpg', alt: 'TNGD technician adjusting bottom bracket during new door installation', tag: 'progress' },
      { src: '/images/portfolio/installations/tngd-tech-door-panel-install-progress-nc.jpg', alt: 'TNGD technician working on panel alignment during door installation', tag: 'progress' },
      { src: '/images/portfolio/openers/liftmaster-myq-opener-ceiling-new-install-nc.jpg', alt: 'New LiftMaster myQ belt-drive opener installed on ceiling with door up', tag: 'after' },
      { src: '/images/portfolio/installations/new-door-interior-struts-torsion-spring-nc.jpg', alt: 'New door interior view showing reinforced struts and torsion spring system', tag: 'after' },
      { src: '/images/portfolio/before-after/crashed-door-buckled-panels-angle2-before-nc.jpg', alt: 'Crashed door buckled panels from alternate interior angle before replacement', tag: 'before' },
    ],
  },
  {
    id: 'insulated-door-screen-jackshaft-triple-upgrade',
    title: 'Insulated Door, Retractable Screen & LiftMaster Jackshaft — Premium Three-System Upgrade',
    serviceType: 'installations',
    systemType: 'Insulated Door + Screen Door + Jackshaft Opener',
    failureMode: 'Aging Ceiling-Mount Opener + No Screen System',
    materials: 'Insulated Raised-Panel Steel + Retractable Screen Door + LiftMaster 98022 Jackshaft',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'This upscale brick home got the full treatment — new insulated door, two-bay retractable screen system, and a LiftMaster 98022 jackshaft to replace the old ceiling-mount Chamberlain 1/2HP. The jackshaft mounts on the wall beside the torsion spring, freeing up ceiling space and delivering whisper-quiet operation. Screen doors add ventilation and bug protection without sacrificing curb appeal.',
    problem: 'Aging Chamberlain 1/2HP ceiling-mount opener was noisy and taking up valuable overhead space. Homeowner wanted a premium upgrade with insulated door, retractable screens for ventilation, and a wall-mounted jackshaft opener.',
    solution: 'Replaced the old ceiling-mount system with a LiftMaster 98022 jackshaft wall-mount opener with myQ smart connectivity. Installed a new insulated raised-panel door and two-bay retractable screen door system for the brick-front home.',
    outcome: 'Three-system premium upgrade complete — insulated door for energy efficiency, retractable screens for ventilation on the brick-front two-bay, and a LiftMaster jackshaft that\'s whisper-quiet with zero ceiling footprint. Smart home ready with myQ.',
    images: [
      { src: '/images/portfolio/screens/retractable-screen-two-bay-brick-home-exterior-nc.jpg', alt: 'Two-bay retractable screen door system on upscale brick home exterior', tag: 'after' },
      { src: '/images/portfolio/openers/old-ceiling-mount-opener-closeup-before-nc.jpg', alt: 'Old ceiling-mount garage door opener close-up from below before replacement', tag: 'before' },
      { src: '/images/portfolio/openers/old-chamberlain-half-hp-ceiling-interior-before-nc.jpg', alt: 'Interior view of old Chamberlain 1/2HP ceiling-mount opener with raised-panel door', tag: 'before' },
      { src: '/images/portfolio/screens/tngd-tech-screen-door-track-install-progress-nc.jpg', alt: 'TNGD technician adjusting retractable screen door track at garage opening', tag: 'progress' },
      { src: '/images/portfolio/openers/liftmaster-jackshaft-98022-wall-mount-detail-nc.jpg', alt: 'LiftMaster 98022 jackshaft wall-mount opener with myQ detail view', tag: 'after' },
    ],
  },
  {
    id: 'raised-panel-spring-opener-complete-overhaul',
    title: 'Raised-Panel Door, Torsion Spring & Chamberlain myQ — Broken Spring Complete Overhaul',
    serviceType: 'installations',
    systemType: 'Full Door + Torsion Spring + Belt-Drive Opener',
    failureMode: 'Broken Spring + Damaged Door + Failing Opener',
    materials: 'White Raised-Panel Insulated Steel + Torsion Spring + Chamberlain myQ Belt-Drive',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Everything was failing at once — broken torsion spring, stained and non-insulated door leaking daylight through the panels, and an old Genie IntelliCode opener on its last legs. We replaced the entire system: new insulated raised-panel door with proper struts, fresh torsion spring, and a Chamberlain myQ belt-drive opener. The grease drip stains on the old door told the story — years of deferred maintenance caught up all at once.',
    problem: 'Torsion spring snapped, leaving the door inoperable. The old non-insulated door was stained with grease drips, had daylight leaking through panel gaps, and the Genie IntelliCode opener was worn out. Complete system failure requiring full replacement.',
    solution: 'Replaced the entire garage door system — new insulated raised-panel steel door with reinforced struts, new properly sized torsion spring, and a Chamberlain myQ WiFi belt-drive opener. Brick accent home got a clean white door that matches the siding.',
    outcome: 'Complete transformation — from a stained, non-insulated door with broken spring and failing opener to a clean insulated system with modern smart opener. No more daylight leaks, no more grease drips, and the Chamberlain myQ delivers quiet belt-drive operation with smartphone control.',
    images: [
      { src: '/images/portfolio/installations/new-raised-panel-door-exterior-brick-accent-nc.jpg', alt: 'New white raised-panel door exterior with brick accent on home', tag: 'after' },
      { src: '/images/portfolio/before-after/old-stained-raised-panel-door-exterior-before-nc.jpg', alt: 'Old stained and worn raised-panel garage door exterior before replacement', tag: 'before' },
      { src: '/images/portfolio/springs/broken-torsion-spring-separated-header-before-nc.jpg', alt: 'Broken torsion spring separated at center above garage door header', tag: 'before' },
      { src: '/images/portfolio/openers/old-genie-intellicode-opener-ceiling-before-nc.jpg', alt: 'Old Genie IntelliCode opener mounted on ceiling before replacement', tag: 'before' },
      { src: '/images/portfolio/before-after/old-door-daylight-leak-insulation-failure-before-nc.jpg', alt: 'Old non-insulated door interior showing daylight leaking through panel gaps', tag: 'before' },
      { src: '/images/portfolio/installations/new-door-interior-struts-spring-installed-nc.jpg', alt: 'New insulated door interior with reinforced struts and new torsion spring', tag: 'after' },
      { src: '/images/portfolio/openers/chamberlain-myq-belt-drive-stairway-garage-nc.jpg', alt: 'New Chamberlain myQ belt-drive opener installed in garage with stairway', tag: 'after' },
      { src: '/images/portfolio/before-after/old-door-grease-drip-stain-panels-before-nc.jpg', alt: 'Close-up of grease and rust drip stain on old door panels before replacement', tag: 'before' },
    ],
  },
  {
    id: 'new-construction-duplex-door-opener',
    title: 'Black Raised-Panel Door & LiftMaster Smart Opener — New Construction Duplex',
    serviceType: 'installations',
    systemType: 'Full Door + Smart Opener',
    failureMode: 'New Build — No Existing System',
    materials: 'Black Raised-Panel Steel with Transom Windows',
    corridorPosition: 'east-central',
    anchorCity: 'Greensboro',
    secondaryCity: 'Burlington',
    location: 'Burlington, NC',
    caption: 'This Burlington new-build duplex needed matching black doors and smart opener systems for both units. We coordinated with the builder on specs, installed LiftMaster video keypads, and had both bays operational same day — on schedule for occupancy.',
    problem: 'New-build duplex needed matching black garage doors and opener systems on both units. Builder required coordination with framing, electrical, and smart access.',
    solution: 'Installed black raised-panel doors with transom windows on both units (#834 and #836). Full opener systems with LiftMaster video keypad for smart entry. Coordinated with builder on specs.',
    outcome: 'Both units completed same day with matching black doors, smart openers, and video keypad access. TNGD truck on-site — builder stayed on schedule for occupancy.',
    featured: true,
    images: [
      { src: '/images/portfolio/construction/day-ave-black-door-completed-exterior-burlington-nc.jpg', alt: 'Completed black raised-panel garage door with transom windows on new construction duplex in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-construction-door-install-nc-progress.jpg', alt: 'Open garage bay before door installation at new construction duplex in Burlington NC', tag: 'before' },
      { src: '/images/portfolio/construction/day-ave-empty-garage-bay-before-burlington-nc.jpg', alt: 'Empty garage bay interior with construction materials before door install in Burlington NC', tag: 'before' },
      { src: '/images/portfolio/construction/day-ave-opener-motor-install-burlington-nc.jpg', alt: 'LiftMaster garage door opener and motor installation in progress at new-build duplex in Burlington NC', tag: 'progress' },
      { src: '/images/portfolio/construction/duplex-new-construction-interior-second-bay-install-burlington-nc.jpg', alt: 'Second bay interior with new door just installed and mounting hardware on floor at Burlington NC duplex', tag: 'progress' },
      { src: '/images/portfolio/construction/day-ave-flush-panel-black-accent-interior-nc.jpg', alt: 'Interior view of newly installed raised-panel door with transom windows before opener wiring in Burlington NC', tag: 'progress' },
      { src: '/images/portfolio/construction/day-ave-new-construction-interior-nc.jpg', alt: 'Interior view of completed door installation with workbench setup at Burlington NC duplex', tag: 'after' },
      { src: '/images/portfolio/construction/duplex-new-construction-interior-opener-track-burlington-nc.jpg', alt: 'Interior view of completed door with LiftMaster opener and galvanized track system at Burlington NC duplex', tag: 'after' },
      { src: '/images/portfolio/construction/day-ave-liftmaster-video-keypad-burlington-nc.jpg', alt: 'LiftMaster video keypad installed on exterior door frame at Burlington NC new construction', tag: 'after' },
      { src: '/images/portfolio/construction/duplex-new-construction-both-bays-open-before-burlington-nc.jpg', alt: 'Wide view of new construction duplex with both garage bays open before door installation in Burlington NC', tag: 'before' },
      { src: '/images/portfolio/construction/day-ave-duplex-completed-tngd-truck-burlington-nc.jpg', alt: 'Both duplex units with completed black doors and TNGD truck on-site at dusk in Burlington NC', tag: 'after' },
    ],
  },
  {
    id: 'thomasville-door-motor',
    title: 'Clopay Black Raised-Panel Door & Belt-Drive Opener — Two-Bay Color Transformation',
    serviceType: 'installations',
    systemType: 'Full Door + Belt-Drive Opener',
    failureMode: 'Worn Doors + Noisy Opener',
    materials: 'Clopay Black Raised-Panel Steel with Transom Windows',
    corridorPosition: 'west',
    anchorCity: 'Statesville',
    secondaryCity: 'Thomasville',
    location: 'Thomasville, NC',
    caption: 'Our Thomasville neighbor called because every morning the chain-drive opener woke the whole house and the faded blue-gray doors made the brick facade look tired. We swapped both bays for Clopay black raised-panel steel doors with transom windows and installed a whisper-quiet belt-drive opener — the kind of transformation that has the neighbors slowing down to take a second look.',
    problem: 'This two-bay brick home in Thomasville had worn, faded blue-gray doors that dragged down the curb appeal of an otherwise beautiful property. The old chain-drive opener rattled loud enough to hear from the kitchen, and the homeowner was ready for a fresh start on both the look and the sound.',
    solution: 'We replaced both bays with brand-new Clopay black raised-panel steel doors with transom windows — a bold color change that pairs beautifully with the red brick. Each door was fitted with new torsion springs, galvanized steel tracks, and insulated backing for year-round efficiency. A new belt-drive opener with smartphone control replaced the noisy chain unit, giving the homeowner push-button convenience from anywhere.',
    outcome: 'A dramatic curb-appeal transformation — the sleek black Clopay doors with transom windows turned this Thomasville brick home into a neighborhood standout. The belt-drive opener runs so quietly you barely know it\'s working, and the insulated panels keep the garage comfortable through Carolina summers.',
    featured: true,
    pendingVideo: [
      { drive: 'G:/My Drive/Brick and Black door/IMG_6347.mp4', sizeMB: 4.3, note: 'Interior install footage — needs QC scrub' },
      { drive: 'G:/My Drive/Brick and Black door/IMG_6348.mp4', sizeMB: 3.8, note: 'Interior install footage — needs QC scrub' },
      { drive: 'G:/My Drive/Brick and Black door/IMG_6351.mp4', sizeMB: 4.3, note: 'Interior install footage — needs QC scrub' },
      { drive: 'G:/My Drive/Brick and Black door/IMG_6355.mp4', sizeMB: 3.8, note: 'Interior install footage — needs QC scrub' },
      { drive: 'G:/My Drive/Brick and Black door/video.mp4', sizeMB: 4.2, note: 'General job footage — needs QC scrub' },
    ],
    images: [
      { src: '/images/portfolio/door-styles/black-garage-doors-red-brick-nc.jpg', alt: 'Two completed Clopay black raised-panel doors with transom windows on red brick home in Thomasville NC', tag: 'after' },
      { src: '/images/portfolio/before-after/brick-house-old-blue-gray-door-before-nc.jpg', alt: 'Faded blue-gray garage door on right bay of brick home before Clopay replacement in Thomasville NC', tag: 'before' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-after-nc.jpg', alt: 'Worn blue-gray garage door on left bay of brick home before replacement in Thomasville NC', tag: 'before' },
      { src: '/images/portfolio/before-after/brick-house-two-bay-tngd-truck-during-nc.jpg', alt: 'Top-Notch Garage Doors truck arrives at two-bay brick home for Clopay door replacement in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/before-after/brick-house-interior-old-door-removal-thomasville-nc.jpg', alt: 'Interior view during old door removal with TNGD truck outside brick home in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/before-after/brick-house-interior-blue-film-torsion-spring-thomasville-nc.jpg', alt: 'New Clopay door with blue protective film and torsion spring hardware installed in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/before-after/brick-house-interior-second-bay-install-thomasville-nc.jpg', alt: 'Second bay interior during Clopay door installation with TNGD truck visible in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/before-after/brick-house-interior-insulated-back-track-thomasville-nc.jpg', alt: 'Interior view of new Clopay door insulated backing and galvanized track hardware in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-tngd-truck-nc.jpg', alt: 'Interior view during belt-drive opener install with TNGD Same Day Service truck outside in Thomasville NC', tag: 'progress' },
      { src: '/images/portfolio/installations/cinderblock-house-new-door-completed-nc.jpg', alt: 'Completed Clopay door interior view with track hardware and torsion spring system in Thomasville NC', tag: 'after' },
      { src: '/images/portfolio/before-after/brick-house-new-black-door-mid-install-nc.jpg', alt: 'New Clopay black raised-panel door with protective packaging on red brick home in Thomasville NC', tag: 'after' },
      { src: '/images/portfolio/before-after/brick-house-blue-gray-door-before-wide-nc.jpg', alt: 'Wide view of original blue-gray door with landscaping on brick home before upgrade in Thomasville NC', tag: 'before' },
    ],
  },
  {
    id: 'raised-panel-door-screen-combo-high-point',
    title: 'Raised-Panel Door Replacement & Retractable Screen Door — Full Combo Upgrade',
    serviceType: 'installations',
    systemType: 'Full Door Replacement + Retractable Screen',
    failureMode: 'Damaged Panels + No Ventilation',
    materials: 'Almond Raised-Panel Steel Door + 3-Panel Retractable Mesh Screen',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    secondaryCity: 'High Point',
    location: 'High Point, NC',
    caption: 'This High Point homeowner had a yellowed, dented two-car door that was dragging down the whole house. We replaced it with a fresh almond raised-panel steel door and added a 3-panel retractable screen — turning a tired garage into a ventilated workshop space that looks brand new from the curb.',
    problem: 'Aging two-car garage door with yellowed, dented panels and no ventilation option. Homeowner wanted a fresh look and the ability to use the garage as a workshop with bug-free airflow.',
    solution: 'Complete door replacement with new almond raised-panel steel door, new tracks, springs, and hardware. Added a custom-fit 3-panel retractable mesh screen with white aluminum frame for full ventilation when the main door is up.',
    outcome: 'Dramatic curb-appeal upgrade — the crisp new raised-panel door replaced decades of yellowed panels, and the retractable screen transforms the garage into a bug-free workshop. Two services in one visit.',
    images: [
      { src: '/images/portfolio/screens/retractable-screen-door-3panel-completed-high-point-nc.jpg', alt: 'Completed 3-panel retractable screen door on garage in High Point NC', tag: 'after' },
      { src: '/images/portfolio/installations/old-yellowed-raised-panel-door-before-high-point-nc.jpg', alt: 'Old yellowed and dented raised-panel garage door before replacement in High Point NC', tag: 'before' },
      { src: '/images/portfolio/installations/tngd-tech-unboxing-new-panels-blue-film-high-point-nc.jpg', alt: 'TNGD technician unboxing new door panels with blue protective film in High Point NC', tag: 'progress' },
      { src: '/images/portfolio/screens/screen-mesh-panel-assembly-sawhorses-high-point-nc.jpg', alt: 'Retractable screen mesh panel on sawhorses during assembly at High Point NC home', tag: 'progress' },
      { src: '/images/portfolio/screens/screen-door-frame-assembly-driveway-high-point-nc.jpg', alt: 'White aluminum screen door frame assembled on sawhorses in driveway in High Point NC', tag: 'progress' },
      { src: '/images/portfolio/installations/new-raised-panel-door-completed-exterior-high-point-nc.jpg', alt: 'New almond raised-panel garage door completed exterior view in High Point NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-raised-panel-door-partially-open-high-point-nc.jpg', alt: 'New raised-panel door partially open showing clean panels and new hardware in High Point NC', tag: 'after' },
      { src: '/images/portfolio/installations/old-dented-raised-panel-door-before-angle2-high-point-nc.jpg', alt: 'Second angle of old yellowed dented garage door before replacement in High Point NC', tag: 'before' },
    ],
  },
  {
    id: 'walnut-woodgrain-door-oxford-new-construction',
    title: 'Walnut Woodgrain Door & Chamberlain Opener — New Construction Farmhouse',
    serviceType: 'installations',
    systemType: 'Full Door + Chamberlain myQ Opener',
    failureMode: 'New Build — No Existing System',
    materials: 'Walnut Woodgrain Raised-Panel Steel with Transom Windows',
    corridorPosition: 'east',
    anchorCity: 'Durham',
    secondaryCity: 'Oxford',
    location: 'Oxford, NC',
    caption: 'Custom new-construction farmhouse on a wooded lot in Oxford needed a door that matched the board-and-batten siding and brick accents. We installed a walnut woodgrain raised-panel steel door with transom windows and a Chamberlain Powered by myQ opener — coordinating with the builder from open-bay stage through final walkthrough.',
    problem: 'New-build farmhouse on a wooded Oxford lot needed a garage door installation coordinated with the general contractor. The board-and-batten exterior with brick foundation demanded a door that complemented the warm, rustic-modern aesthetic.',
    solution: 'Installed a walnut woodgrain raised-panel steel door with transom windows that pair perfectly with the warm-toned siding. Full system including galvanized tracks, torsion spring, and Chamberlain Powered by myQ smart opener. Coordinated with builder for electrical and framing specs.',
    outcome: 'Dramatic transformation — from open construction bay with Lowe\'s housewrap to a finished farmhouse with a premium walnut woodgrain door that looks like it was designed with the home. Chamberlain smart opener provides app control from day one.',
    featured: true,
    images: [
      { src: '/images/portfolio/construction/walnut-woodgrain-door-farmhouse-completed-oxford-nc.jpg', alt: 'Completed walnut woodgrain raised-panel door with transom windows on new construction farmhouse in Oxford NC', tag: 'after' },
      { src: '/images/portfolio/construction/new-construction-garage-door-oxford-nc-1.jpg', alt: 'Interior of new construction garage bay before door installation with TNGD truck on wooded lot in Oxford NC', tag: 'before' },
      { src: '/images/portfolio/construction/new-construction-garage-door-oxford-nc-2.jpg', alt: 'New construction farmhouse exterior with open garage bay and Lowe\'s housewrap before door install in Oxford NC', tag: 'before' },
      { src: '/images/portfolio/construction/tngd-tech-door-install-farmhouse-oxford-nc.jpg', alt: 'TNGD technician installing garage door at base of farmhouse in Oxford NC', tag: 'progress' },
      { src: '/images/portfolio/construction/walnut-woodgrain-door-partially-open-oxford-nc.jpg', alt: 'Walnut woodgrain door partially open showing panel detail on farmhouse in Oxford NC', tag: 'after' },
      { src: '/images/portfolio/construction/new-door-interior-tracks-torsion-spring-oxford-nc.jpg', alt: 'Interior view of new door with galvanized tracks torsion spring and transom windows in Oxford NC', tag: 'after' },
      { src: '/images/portfolio/openers/chamberlain-opener-ceiling-mount-oxford-nc.jpg', alt: 'Chamberlain Powered by myQ opener ceiling mount installed in new construction garage in Oxford NC', tag: 'after' },
      { src: '/images/portfolio/construction/new-door-interior-opener-wide-view-oxford-nc.jpg', alt: 'Wide interior view of completed door and Chamberlain opener system in Oxford NC farmhouse garage', tag: 'after' },
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
    anchorCity: 'Greensboro',
    secondaryCity: 'Burlington',
    location: 'Burlington, NC',
    caption: 'A straightforward Burlington door replacement — new white raised-panel steel with updated torsion springs and a modern opener. Clean finish inside and out, operating smoothly from day one.',
    problem: 'Homeowner needed a clean, reliable double-car garage door replacement with a new opener system.',
    solution: 'Installed a new white raised-panel steel door with new torsion spring system and opener. Clean interior finish with proper weatherstripping.',
    outcome: 'Brand-new door operating smoothly with updated spring system and modern opener. Clean, professional finish inside and out.',
    images: [
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-exterior.jpg', alt: 'New white garage door installed on residential home in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-interior.jpg', alt: 'Interior view of new garage door installation showing spring system in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/installations/new-garage-door-burlington-nc-open.jpg', alt: 'New garage door in open position showing opener in Burlington NC', tag: 'after' },
      { src: '/images/portfolio/openers/garage-door-opener-burlington-nc.jpg', alt: 'New garage door opener installed at Burlington NC residence', tag: 'after' },
    ],
  },
  {
    id: 'clopay-two-bay-detached-garage-overhaul',
    title: 'Clopay White Raised-Panel Doors & Smart Opener — Two-Bay Detached Garage Overhaul',
    serviceType: 'installations',
    systemType: 'Dual Door Replacement + Smart Opener',
    failureMode: 'Worn Doors + Outdated Genie Opener + Failing Springs',
    materials: 'Clopay White Raised-Panel Steel with Windows + LED Smart Opener',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Two-bay detached cinder block garage needed everything — doors, opener, springs, hardware. The old green Genie opener was barely functional and the worn torsion springs were a safety concern. Over three visits we replaced both doors with new Clopay raised-panel steel with windows, installed a new smart opener with integrated LED lighting, and brought the entire system up to modern safety standards.',
    problem: 'Two-bay detached garage with aging doors, a failing green Genie opener, and worn torsion springs. The old system was noisy, unreliable, and a safety concern with corroded hardware throughout.',
    solution: 'Complete system overhaul across three visits: removed old doors and Genie opener, installed two new Clopay white raised-panel steel doors with windows, new torsion springs on both bays, and a modern smart opener with integrated LED ceiling light.',
    outcome: 'Total transformation — two matching Clopay doors with windows brighten the detached garage inside and out. The new smart opener with LED light replaced the old Genie, and fresh torsion springs ensure safe, balanced operation on both bays.',
    images: [
      { src: '/images/portfolio/installations/clopay-two-bay-detached-garage-completed-nc.jpg', alt: 'Two completed Clopay white raised-panel doors on detached cinder block garage in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/openers/old-genie-opener-before-replacement-nc.jpg', alt: 'Old green Genie garage door opener on ceiling before replacement in Piedmont Triad NC', tag: 'before' },
      { src: '/images/portfolio/before-after/old-torsion-spring-worn-hardware-before-nc.jpg', alt: 'Worn torsion spring and corroded hardware on old door header before replacement', tag: 'before' },
      { src: '/images/portfolio/installations/clopay-raised-panel-door-windows-exterior-nc.jpg', alt: 'New Clopay raised-panel door with windows installed on first bay exterior view', tag: 'after' },
      { src: '/images/portfolio/installations/clopay-door-interior-windows-tracks-nc.jpg', alt: 'Interior view of new Clopay door with windows and galvanized track system', tag: 'after' },
      { src: '/images/portfolio/openers/new-smart-opener-led-light-ceiling-nc.jpg', alt: 'New smart garage door opener with integrated LED ceiling light installed', tag: 'after' },
      { src: '/images/portfolio/before-after/old-dirty-door-interior-springs-before-nc.jpg', alt: 'Interior of old dirty door with worn springs and tracks before full replacement', tag: 'before' },
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
      { src: '/images/portfolio/before-after/culdesac-new-door-after-tngd-truck-nc.jpg', alt: 'New white garage door installed with TNGD truck in driveway in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/before-after/culdesac-old-door-before-replacement-nc.jpg', alt: 'Old weathered garage door before replacement on cul-de-sac home in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/before-after/culdesac-new-door-after-interior-nc.jpg', alt: 'Interior view of new garage door installation in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/before-after/culdesac-new-door-installed-interior-nc.jpg', alt: 'New door interior finish with spring system in Greensboro NC', tag: 'after' },
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
      { src: '/images/portfolio/before-after/door-installation-guilford-county-after-interior.jpg', alt: 'Interior view of new door installation in McLeansville NC', tag: 'after' },
      { src: '/images/portfolio/openers/opener-motor-guilford-county-1.jpg', alt: 'New opener motor installed at brick front home in Guilford County NC', tag: 'after' },
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
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-after.jpg', alt: 'New white raised-panel door with windows on detached garage in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/before-after/door-replacement-piedmont-triad-before.jpg', alt: 'Old weathered door on detached garage before replacement in Piedmont Triad NC', tag: 'before' },
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
      { src: '/images/portfolio/door-styles/carriage-house-door-dusk-lighting-nc-2.jpg', alt: 'Carriage house door golden hour second angle in Clemmons NC', tag: 'after' },
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
      { src: '/images/portfolio/door-styles/carriage-house-door-exterior-combo-job-nc.jpg', alt: 'Screen door and carriage door combo exterior view in Kernersville NC', tag: 'after' },
      { src: '/images/portfolio/openers/liftmaster-jackshaft-opener-detail-nc.jpg', alt: 'LiftMaster 98022 jackshaft wall-mount opener installed in Kernersville NC', tag: 'after' },
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
      { src: '/images/portfolio/screens/garage-screen-door-green-house-nc.jpg', alt: 'Completed retractable garage screen door on green house in High Point NC', tag: 'after' },
      { src: '/images/portfolio/screens/green-house-old-door-before-screen-nc.jpg', alt: 'Garage before screen door installation showing old panel in High Point NC', tag: 'before' },
      { src: '/images/portfolio/screens/green-house-exterior-before-screen-nc.jpg', alt: 'Exterior view of green house garage before screen installation in High Point NC', tag: 'before' },
      { src: '/images/portfolio/screens/tngd-tech-screen-panel-assembly-nc.jpg', alt: 'TNGD technician assembling screen door panel in garage in High Point NC', tag: 'progress' },
      { src: '/images/portfolio/screens/screen-door-frame-assembly-tngd-truck-nc.jpg', alt: 'Screen door frame assembly with TNGD truck in High Point NC', tag: 'progress' },
      { src: '/images/portfolio/screens/screen-door-install-progress-man-cave-nc.jpg', alt: 'Screen door installation in progress at man cave garage in High Point NC', tag: 'progress' },
      { src: '/images/portfolio/openers/chamberlain-opener-closeup-product-nc.jpg', alt: 'Chamberlain Smart opener close-up installed during screen door visit in High Point NC', tag: 'after' },
      { src: '/images/portfolio/openers/chamberlain-ceiling-mount-opener-install-nc.jpg', alt: 'Chamberlain ceiling-mount opener installed in High Point NC garage', tag: 'after' },
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
    anchorCity: 'Greensboro',
    secondaryCity: 'Elon',
    location: 'Elon, NC',
    caption: 'Elon homeowner wanted bug-free outdoor living space from their garage. Retractable mesh screen system that rolls up completely when driving in or out — garage transforms into a screened patio during warm months.',
    problem: 'Homeowner wanted to use their garage as a bug-free outdoor living space during warm months.',
    solution: 'Installed retractable mesh garage screen system that rolls up when not in use and provides full airflow with insect protection.',
    outcome: 'Garage transforms into a screened patio space. Easy operation — screen rolls up completely when driving in or out.',
    images: [
      { src: '/images/portfolio/screens/garage-screen-door-nc-1.jpg', alt: 'Garage screen door installed in Elon NC', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-1.jpg', alt: 'Retractable mesh garage screen in Elon NC', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-piedmont-triad-2.jpg', alt: 'Mesh screening detail on garage door in Elon NC', tag: 'after' },
      { src: '/images/portfolio/screens/garage-screen-door-nc-2.jpg', alt: 'Completed screen door installation side angle in Elon NC', tag: 'after' },
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
      { src: '/images/portfolio/screens/screen-door-interior-view-completed-nc.jpg', alt: 'Interior view of retractable garage screen door in Advance NC', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-door-completed-beige-house-nc.jpg', alt: 'Completed retractable screen door installation in Advance NC', tag: 'after' },
    ],
  },
  {
    id: 'retractable-screen-upscale-two-car',
    title: 'Retractable Screen Door — Upscale Two-Car Garage Install',
    serviceType: 'screen-doors',
    systemType: '3-Panel Retractable Screen',
    failureMode: 'No Ventilation',
    materials: '3-Panel Dark Mesh Retractable Screen + Bronze Aluminum Frame',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Upscale home with coach lanterns, brick accents, and an epoxy-coated garage floor wanted bug-free ventilation without compromising the premium curb appeal. A custom-fit 3-panel retractable screen with bronze aluminum frame blends seamlessly with the home\'s warm-toned exterior.',
    problem: 'Premium two-car garage with epoxy floor and paver driveway had no ventilation option. Homeowner wanted to use the garage as an outdoor living extension without insects.',
    solution: 'Custom-fit 3-panel retractable screen door with dark mesh and bronze-toned aluminum frame. Screen panels assembled off-site for precision, then hung and aligned on-site for a seamless fit.',
    outcome: 'The screen door complements the upscale home perfectly — coach lanterns, brick accents, and epoxy floor all visible through the clean mesh. Full ventilation with zero compromise on curb appeal.',
    images: [
      { src: '/images/portfolio/screens/retractable-screen-upscale-home-exterior-install-nc.jpg', alt: 'TNGD technician finishing 3-panel retractable screen install on upscale home with coach lanterns', tag: 'after' },
      { src: '/images/portfolio/screens/screen-panel-sawhorses-shop-prep-nc.jpg', alt: 'Screen door panel on sawhorses during shop preparation before installation', tag: 'progress' },
      { src: '/images/portfolio/screens/screen-door-pre-hang-interior-tngd-truck-nc.jpg', alt: 'Screen panel being hung from interior view with TNGD truck visible outside', tag: 'progress' },
      { src: '/images/portfolio/screens/retractable-screen-interior-neighborhood-view-nc.jpg', alt: 'Interior view through completed retractable screen showing neighborhood and TNGD truck', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-single-panel-closeup-nc.jpg', alt: 'Close-up of single retractable screen panel showing mesh quality and frame detail', tag: 'after' },
    ],
  },
  {
    id: 'retractable-screen-chamberlain-myq-combo',
    title: 'Retractable Screen Door & Chamberlain myQ Opener — Single-Bay Combo Upgrade',
    serviceType: 'screen-doors',
    systemType: 'Retractable Screen + Chamberlain myQ Opener',
    failureMode: 'No Ventilation + Outdated Opener',
    materials: '3-Panel Retractable Mesh Screen + Chamberlain myQ Smart Opener',
    corridorPosition: 'central',
    anchorCity: 'Greensboro',
    location: 'Piedmont Triad, NC',
    caption: 'Single-bay garage on a green-sided home needed bug-free ventilation for a workshop space and a modern opener to replace the aging unit. We installed a 3-panel retractable screen with white aluminum frame and swapped the old motor for a Chamberlain myQ smart opener — all in a single visit.',
    problem: 'Workshop garage with an aging opener and no ventilation solution. Homeowner wanted bug-free airflow without sacrificing the ability to close up completely, plus a modern smart opener to replace the noisy old unit.',
    solution: 'Installed a custom-fit 3-panel retractable mesh screen door with white aluminum frame. Replaced the old ceiling-mount opener with a new Chamberlain Powered by myQ smart opener with app control. Full system — screen, opener, track, and wiring — completed same visit.',
    outcome: 'Workshop garage transformed — full ventilation with insect protection, whisper-quiet Chamberlain myQ opener with smartphone control, and a clean professional look from the curb. Screen retracts completely for full bay access.',
    images: [
      { src: '/images/portfolio/screens/retractable-screen-door-3panel-completed-exterior-nc.jpg', alt: 'Completed 3-panel retractable screen door on green-sided home in the Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/screens/old-opener-motor-before-screen-door-upgrade-nc.jpg', alt: 'Old garage door opener motor on ceiling before replacement in Piedmont Triad NC', tag: 'before' },
      { src: '/images/portfolio/screens/screen-panel-assembly-sawhorses-garage-interior-nc.jpg', alt: 'Screen door panels assembled on sawhorses inside garage during installation in Piedmont Triad NC', tag: 'progress' },
      { src: '/images/portfolio/screens/tngd-tech-screen-frame-assembly-driveway-nc.jpg', alt: 'TNGD technician assembling retractable screen frame on sawhorses in driveway with truck on-site', tag: 'progress' },
      { src: '/images/portfolio/screens/chamberlain-myq-opener-screen-door-interior-completed-nc.jpg', alt: 'Interior view of completed retractable screen door with new Chamberlain myQ opener installed in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/screens/chamberlain-opener-ceiling-mount-new-install-nc.jpg', alt: 'New Chamberlain Powered by myQ opener ceiling mount installation completed in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/screens/retractable-screen-track-mesh-detail-nc.jpg', alt: 'Retractable screen door track and mesh detail showing professional installation in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/screens/garage-interior-old-opener-tngd-truck-outside-nc.jpg', alt: 'Garage interior with old opener system and TNGD truck visible outside before upgrade in Piedmont Triad NC', tag: 'before' },
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
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-after.jpg', alt: 'New garage door opener installed in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/before-after/door-opener-service-greensboro-before.jpg', alt: 'Garage door with worn rollers before service in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/openers/opener-replacement-greensboro-nc-before.jpg', alt: 'Old opener system before replacement in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/before-after/old-roller-replacement-nc-before.jpg', alt: 'Old worn garage door roller before replacement', tag: 'before' },
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
      { src: '/images/portfolio/before-after/single-door-replacement-nc-after.jpg', alt: 'New single-car garage door after replacement in Piedmont Triad NC', tag: 'after' },
      { src: '/images/portfolio/before-after/single-door-replacement-nc-before.jpg', alt: 'Old single-car garage door before replacement in Piedmont Triad NC', tag: 'before' },
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
    anchorCity: 'Greensboro',
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
    anchorCity: 'Greensboro',
    secondaryCity: 'Alamance County',
    location: 'Alamance County, NC',
    caption: 'Vehicle impact crashed through the garage door on a tan-sided Alamance County home. Emergency same-day response — removed destroyed door, installed new raised-panel door with full hardware. Home secured and looking better than before the crash.',
    problem: 'Vehicle impact crashed through the garage door on a tan-sided home, leaving it mangled and inoperable. Security and weather protection compromised.',
    solution: 'Emergency same-day response. Removed destroyed door, installed new raised-panel door with full hardware and opener. Interior finished to match existing trim.',
    outcome: 'Home secured same day with a brand-new door. Interior completed with clean finish — popcorn ceiling neighborhood looks better than before the crash.',
    images: [
      { src: '/images/portfolio/installations/mona-completed-door-install-interior-nc.jpg', alt: 'Completed door installation interior view in Alamance County NC', tag: 'after' },
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-1.jpg', alt: 'Crashed garage door on tan-sided home in Alamance County NC', tag: 'before' },
      { src: '/images/portfolio/installations/garage-door-install-alamance-county-2.jpg', alt: 'Interior view of crashed garage door damage in Alamance County NC', tag: 'before' },
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
      { src: '/images/portfolio/springs/torsion-spring-repair-nc-after.jpg', alt: 'New torsion spring installed on garage door in Mooresville NC', tag: 'after' },
      { src: '/images/portfolio/springs/extension-spring-repair-nc-before.jpg', alt: 'Broken extension spring on garage door before repair in Mooresville NC', tag: 'before' },
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
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-1.jpg', alt: 'New torsion spring installed after emergency repair in Greensboro NC', tag: 'after' },
      { src: '/images/portfolio/springs/broken-torsion-spring-piedmont-triad.jpg', alt: 'Broken torsion spring on garage door in Greensboro NC', tag: 'before' },
      { src: '/images/portfolio/springs/spring-failure-repair-greensboro-2.jpg', alt: 'Completed spring replacement with balanced door in Greensboro NC', tag: 'after' },
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
    anchorCity: 'Greensboro',
    secondaryCity: 'Burlington',
    location: 'Piedmont Triad, NC',
    caption: 'Torsion spring failed during normal operation. TNGD dispatched for field repair — on-site spring replacement with full balance test and safety inspection. Door balanced and operational within the hour.',
    problem: 'Torsion spring failed during normal operation, leaving the door stuck. TNGD dispatched for field repair.',
    solution: 'On-site spring replacement with properly rated torsion springs. Full balance test and safety inspection.',
    outcome: 'Door balanced and operational within the hour. Spring rated for 20,000+ cycles.',
    images: [
      { src: '/images/portfolio/springs/spring-repair-tngd-truck-nc.jpg', alt: 'Torsion spring repair in progress with TNGD service truck in Piedmont Triad NC', tag: 'progress' },
      { src: '/images/portfolio/springs/broken-spring-replacement-nc.jpg', alt: 'Spring replacement hardware in progress in Piedmont Triad NC', tag: 'progress' },
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
      { src: '/images/portfolio/commercial/virtual-tee-systems-old-door-removed-tngd-truck-charlotte-nc.jpg', alt: 'Old door removed with TNGD service truck on-site at Virtual Tee Systems Charlotte NC', tag: 'progress' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-panels-prep-charlotte-nc.jpg', alt: 'New commercial door panels being prepped for installation Charlotte NC', tag: 'progress' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-technician-installation-charlotte-nc.jpg', alt: 'TNGD technician installing new commercial door sections at Virtual Tee Systems Charlotte NC', tag: 'progress' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-track-installation-charlotte-nc.jpg', alt: 'Track and bracket installation for new commercial door system Charlotte NC', tag: 'progress' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-tech-completed-interior-charlotte-nc.jpg', alt: 'TNGD technician with completed new commercial door interior view Charlotte NC', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-door-interior-charlotte-nc.jpg', alt: 'New commercial door interior view showing proper installation and hardware Charlotte NC', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-new-door-exterior-charlotte-nc.jpg', alt: 'New commercial door exterior view at Virtual Tee Systems Charlotte NC — clean professional finish', tag: 'after' },
      { src: '/images/portfolio/commercial/virtual-tee-systems-rusted-bracket-detail-charlotte-nc.jpg', alt: 'Rusted and corroded door bracket showing hardware failure at Virtual Tee Systems Charlotte NC', tag: 'before' },
    ],
  },
  {
    id: 'raised-panel-door-damaged-wooden-replacement',
    title: 'Raised-Panel Door Replacement — Buckled Wooden Door to Insulated Upgrade',
    slug: 'raised-panel-door-damaged-wooden-replacement',
    serviceType: 'installations',
    anchorCity: 'Greensboro',
    secondaryCity: 'Greensboro',
    location: 'Greensboro, NC',
    featured: false,
    caption: 'An aging wooden garage door with decorative windows had seen better days — bottom panels were buckled and splitting, paint was peeling, and the old ceiling-mount opener was on its last legs. TNGD replaced the entire system with a new almond raised-panel insulated door and modern opener, transforming the curb appeal and functionality in a single visit.',
    problem: 'The original wooden garage door had severely buckled bottom panels that no longer sealed properly, allowing daylight and weather intrusion. The aging ceiling-mount opener struggled to lift the warped door reliably.',
    solution: 'Full tear-out of the old wooden door and hardware. New almond raised-panel insulated steel door installed with fresh tracks, torsion spring, struts, and all new hardware. Old opener replaced with a modern unit.',
    outcome: 'A clean, insulated almond raised-panel door that seals tight, operates smoothly, and dramatically improves the home\'s curb appeal — the kind of transformation neighbors notice.',
    images: [
      { src: '/images/portfolio/installations/raised-panel-door-almond-completed-exterior-nc.jpg', alt: 'New almond raised-panel garage door completed exterior view NC', tag: 'after' },
      { src: '/images/portfolio/before-after/old-wooden-door-buckled-panels-exterior-before-nc.jpg', alt: 'Old wooden garage door with buckled bottom panels and peeling paint before replacement NC', tag: 'before' },
      { src: '/images/portfolio/before-after/old-door-buckled-panel-daylight-interior-before-nc.jpg', alt: 'Interior view of old door with buckled bottom panel letting daylight through NC', tag: 'before' },
      { src: '/images/portfolio/installations/old-opener-new-panels-staged-floor-progress-nc.jpg', alt: 'Old ceiling opener visible with new door panels staged on floor ready for install NC', tag: 'progress' },
      { src: '/images/portfolio/installations/new-door-panels-assembly-interior-progress-nc.jpg', alt: 'New raised-panel door sections being assembled from interior during installation NC', tag: 'progress' },
      { src: '/images/portfolio/installations/new-raised-panel-door-interior-completed-nc.jpg', alt: 'Completed new raised-panel door interior with struts and torsion spring installed NC', tag: 'after' },
      { src: '/images/portfolio/before-after/old-wooden-door-windows-wide-driveway-before-nc.jpg', alt: 'Wide driveway view of old wooden garage door with windows and buckled panels before replacement NC', tag: 'before' },
    ],
  },
];
