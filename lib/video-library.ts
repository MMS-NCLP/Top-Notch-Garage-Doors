export type VideoCategory =
  | 'door-selection'
  | 'programming'
  | 'maintenance'
  | 'spring-safety'
  | 'troubleshooting';

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  category: VideoCategory;
  brand: string;
  duration: string;
  description: string;
  tngdNote: string;
  tags: string[];
  difficulty: 'homeowner' | 'intermediate' | 'professional';
}

export const VIDEO_CATEGORIES: Record<VideoCategory, { label: string; description: string; color: string }> = {
  'door-selection': {
    label: 'Door Selection & Styles',
    description: 'Choosing the right garage door — materials, insulation, and curb appeal.',
    color: '#002868',
  },
  'programming': {
    label: 'Programming & Setup',
    description: 'Remote programming, keypad setup, myQ configuration, and travel limits.',
    color: '#059669',
  },
  'maintenance': {
    label: 'Maintenance & Tips',
    description: 'Lubrication, noise fixes, and seasonal upkeep to extend your door\'s life.',
    color: '#d97706',
  },
  'spring-safety': {
    label: 'Spring Safety',
    description: 'Why springs are dangerous and when to call a professional.',
    color: '#C41E24',
  },
  'troubleshooting': {
    label: 'Troubleshooting',
    description: 'Diagnosing common issues: won\'t close, sensor problems, force settings.',
    color: '#7c3aed',
  },
};

export const CURATED_VIDEOS: Video[] = [
  // --- Door Selection & Styles ---
  {
    id: 'vid-clopay-canyon-ridge',
    youtubeId: 'IoPJax7a6kE',
    title: 'Clopay Canyon Ridge — Carriage House & Wood-Look Doors',
    category: 'door-selection',
    brand: 'Clopay',
    duration: '2:30',
    description: 'Product overview of the Canyon Ridge collection — faux wood carriage house doors with the warmth of real wood and none of the maintenance.',
    tngdNote: 'Canyon Ridge is one of our most popular premium door lines. We install and service every model in this collection across the Statesville–Mebane corridor.',
    tags: ['carriage-house', 'wood-look', 'premium', 'clopay'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-clopay-modern-steel',
    youtubeId: 'umXXqs4pN_A',
    title: 'Clopay Modern Steel — Contemporary Garage Doors',
    category: 'door-selection',
    brand: 'Clopay',
    duration: '3:00',
    description: 'Full-view aluminum and glass panels, flush steel designs, and modern aesthetics for contemporary homes.',
    tngdNote: 'Modern Steel doors are increasingly popular in newer NC developments. Glass panel options provide natural light while maintaining insulation values.',
    tags: ['modern', 'contemporary', 'glass-panel', 'clopay'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-clopay-coachman',
    youtubeId: 'KDdjyOHN6oA',
    title: 'Clopay Coachman — Steel Carriage House Doors',
    category: 'door-selection',
    brand: 'Clopay',
    duration: '4:00',
    description: 'The Coachman line — insulated steel with composite overlay for classic carriage house aesthetics at a mid-range price.',
    tngdNote: 'The Coachman series hits the sweet spot between curb appeal and budget. R-value up to 18.4 makes it ideal for NC\'s variable climate.',
    tags: ['carriage-house', 'insulated', 'mid-range', 'clopay'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-amarr-insulation',
    youtubeId: 'UsRaPTFFqHM',
    title: 'Amarr — Understanding R-Value & Insulation',
    category: 'door-selection',
    brand: 'Amarr',
    duration: '3:30',
    description: 'Technical breakdown of R-value ratings, Intellicore insulation, and how insulation affects energy efficiency and noise.',
    tngdNote: 'Insulation isn\'t just about temperature — it dramatically reduces street noise and strengthens the panel. We recommend R-12+ for attached garages in NC.',
    tags: ['insulation', 'r-value', 'energy-efficiency', 'amarr'],
    difficulty: 'intermediate',
  },
  {
    id: 'vid-amarr-choosing',
    youtubeId: 'ujBzTjZCDIU',
    title: 'Amarr — How to Choose the Right Garage Door',
    category: 'door-selection',
    brand: 'Amarr',
    duration: '4:00',
    description: 'Decision framework covering materials (steel, wood, composite, aluminum), insulation levels, windows, and hardware.',
    tngdNote: 'This covers the exact decision tree we walk customers through during a free estimate. Material, insulation, style, and hardware — in that order.',
    tags: ['buying-guide', 'materials', 'windows', 'amarr'],
    difficulty: 'homeowner',
  },

  // --- Programming & Setup ---
  {
    id: 'vid-liftmaster-keypad',
    youtubeId: '_RCLl1aCxF4',
    title: 'How to Program a LiftMaster Garage Door Keypad',
    category: 'programming',
    brand: 'LiftMaster',
    duration: '6:00',
    description: 'Step-by-step walkthrough of programming a LiftMaster wireless keypad including the new myQ Video Keypad. Covers PIN setup and troubleshooting.',
    tngdNote: 'Keypad programming is one of the most common calls we get. This video covers the exact steps — save yourself a service call by following along.',
    tags: ['keypad', 'programming', 'PIN', 'liftmaster'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-myq-app-setup',
    youtubeId: 'NpWS4t_-RWA',
    title: 'myQ Phone App Setup — LiftMaster, Chamberlain & Craftsman',
    category: 'programming',
    brand: 'LiftMaster',
    duration: '5:00',
    description: 'Complete myQ smart garage app setup for LiftMaster, Chamberlain, and Craftsman openers. Wi-Fi connection, guest access, and notifications.',
    tngdNote: 'Every LiftMaster opener we install comes with myQ built in. We configure the app before we leave, but this video is great if you need to reconnect after a router change.',
    tags: ['myq', 'app', 'wifi', 'smart-home'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-liftmaster-reset',
    youtubeId: 'bXS6iHT6TQU',
    title: 'How to Reset LiftMaster — Remote, myQ, Wi-Fi & Learn Button',
    category: 'programming',
    brand: 'LiftMaster',
    duration: '7:00',
    description: 'Complete reset guide for LiftMaster openers — covers remote reprogramming, myQ reconnection, Wi-Fi reset, and learn button procedures.',
    tngdNote: 'Lost your programmed remotes? New battery in the remote? This covers every reset scenario. The learn button location varies by model — check your manual if unsure.',
    tags: ['reset', 'remote', 'learn-button', 'liftmaster'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-travel-limits',
    youtubeId: 'Zh7wAtMhcoE',
    title: 'Setting Travel Limits & Force on LiftMaster 8550/8360',
    category: 'programming',
    brand: 'LiftMaster',
    duration: '8:00',
    description: 'How to program travel limits and open/close force on LiftMaster 8550 belt-drive and 8360 chain-drive openers. Essential after spring replacement.',
    tngdNote: 'After any spring replacement or major repair, travel limits and force settings need recalibration. This is part of our standard post-repair checkout procedure.',
    tags: ['travel-limits', 'force', 'calibration', 'liftmaster'],
    difficulty: 'intermediate',
  },
  {
    id: 'vid-keypad-pin',
    youtubeId: 'wweGbuTnjmo',
    title: 'Program Keypad PIN — Chamberlain, LiftMaster & Craftsman',
    category: 'programming',
    brand: 'Chamberlain',
    duration: '4:00',
    description: 'Universal keypad PIN setup procedure for Chamberlain, LiftMaster, and Craftsman openers. Works with most models from 1993 to present.',
    tngdNote: 'Keypads use the same programming protocol across Chamberlain and LiftMaster. If you\'ve changed your opener, you\'ll need to reprogram the keypad — this video shows how.',
    tags: ['keypad', 'PIN', 'chamberlain', 'craftsman'],
    difficulty: 'homeowner',
  },

  // --- Maintenance & Tips ---
  {
    id: 'vid-heritage-lubrication',
    youtubeId: 'KlZdjT0iFgU',
    title: 'How to Properly Lubricate Your Garage Door',
    category: 'maintenance',
    brand: 'Heritage Door',
    duration: '6:00',
    description: 'Professional technician demonstrates proper lubrication of hinges, rollers, springs, and bearings. Covers what to use and what to avoid.',
    tngdNote: 'Lubrication is the single highest-ROI maintenance task. 5 minutes twice a year extends spring, roller, and hinge life significantly. Never use WD-40 — it\'s a degreaser, not a lubricant.',
    tags: ['lubrication', 'preventive', 'diy-safe'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-lithium-grease',
    youtubeId: 'SKceowAb26w',
    title: 'What to Use & Where to Lubricate Garage Doors',
    category: 'maintenance',
    brand: 'Industry Expert',
    duration: '8:00',
    description: 'Detailed guide on lubrication points — roller stems, hinge pins, spring coils, bearing plates, and locks. Why white lithium grease beats spray lubricants.',
    tngdNote: 'This covers the lubrication portion of our 21-point inspection. White lithium grease on metal-to-metal contacts, silicone spray on weather seals.',
    tags: ['white-lithium', 'grease', 'lubrication-points'],
    difficulty: 'intermediate',
  },
  {
    id: 'vid-noisy-door',
    youtubeId: 'G8oUB0C6At8',
    title: 'Garage Door Getting Louder? Here\'s Why & How to Fix It',
    category: 'maintenance',
    brand: 'Industry Expert',
    duration: '7:00',
    description: 'Top causes of a noisy garage door — worn rollers, dry hinges, loose hardware, spring fatigue. Before and after proper maintenance.',
    tngdNote: 'A noisy door isn\'t just annoying — it\'s a symptom. Grinding = metal rollers need nylon upgrade. Popping = possible spring wear. Both warrant inspection.',
    tags: ['noise', 'diagnosis', 'rollers', 'springs'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-liftmaster-battery',
    youtubeId: 'UGBf8_eDPzA',
    title: 'LiftMaster Battery Backup — Power Outage Tips',
    category: 'maintenance',
    brand: 'LiftMaster',
    duration: '3:00',
    description: 'How the integrated battery backup works — up to 50 cycles during outages. Tips for maintaining battery health and knowing when to replace.',
    tngdNote: 'NC storm season makes battery backup essential. Check the battery status light monthly — a flashing amber means the battery needs replacement.',
    tags: ['battery-backup', 'power-outage', 'tips', 'liftmaster'],
    difficulty: 'homeowner',
  },

  // --- Spring Safety ---
  {
    id: 'vid-spring-danger-1',
    youtubeId: '-7pVmy9fkRc',
    title: 'Why Garage Door Springs Are Extremely Dangerous',
    category: 'spring-safety',
    brand: 'Safety Education',
    duration: '5:00',
    description: 'The physics behind torsion spring failure — stored energy, projectile risk, and why spring replacement is never a DIY job.',
    tngdNote: 'A standard 7-foot residential torsion spring stores enough energy to cause serious injury or death. Licensed, insured professionals only.',
    tags: ['safety', 'torsion', 'danger', 'energy'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-spring-danger-2',
    youtubeId: 'cWsl2DDiHA4',
    title: 'Torsion Spring Replacement — What Can Go Wrong',
    category: 'spring-safety',
    brand: 'Safety Education',
    duration: '8:00',
    description: 'Real-world spring failure examples and improper repairs. Winding bar safety, cone failures, and consequences of incorrect sizing.',
    tngdNote: 'Incorrect spring sizing leads to premature failure, door damage, and hazards. Our technicians calculate every replacement to exact wire gauge and coil count.',
    tags: ['safety', 'replacement', 'winding-bars', 'sizing'],
    difficulty: 'professional',
  },

  // --- Troubleshooting ---
  {
    id: 'vid-liftmaster-wont-close',
    youtubeId: 'K96oQdgiqHA',
    title: 'LiftMaster — Door Won\'t Close, Lights Flashing',
    category: 'troubleshooting',
    brand: 'LiftMaster',
    duration: '4:00',
    description: 'The most common call: door reverses or won\'t close with flashing lights. Photo-eye alignment, obstruction clearing, and limit adjustment.',
    tngdNote: 'Flashing lights + reversal = 90% photo-eye issue. Clean the lenses and check alignment before calling. If it persists, sensors or logic board may need replacement.',
    tags: ['reversal', 'photo-eye', 'sensors', 'flashing-lights', 'liftmaster'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-chamberlain-sensors',
    youtubeId: 'P5jOA8NNky8',
    title: 'Chamberlain — Safety Sensor Alignment Guide',
    category: 'troubleshooting',
    brand: 'Chamberlain',
    duration: '3:00',
    description: 'Step-by-step sensor alignment — LED meanings (green = aligned, amber = sending), adjustment techniques, and wire inspection.',
    tngdNote: 'Misaligned sensors are our #1 service call. This video covers the exact alignment process our techs use. UL 325 has required these since 1993.',
    tags: ['sensors', 'alignment', 'safety', 'UL-325', 'chamberlain'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-chamberlain-troubleshoot',
    youtubeId: 'ipTD_NjXnlU',
    title: 'Chamberlain Opener Troubleshooting — Common Issues',
    category: 'troubleshooting',
    brand: 'Chamberlain',
    duration: '6:00',
    description: 'Comprehensive troubleshooting for Chamberlain openers — covers clicking but not moving, partial travel, remote range issues, and error codes.',
    tngdNote: 'Before calling for service, run through this checklist. Many opener issues are simple fixes — dead remote batteries, tripped GFI outlets, or engaged manual locks.',
    tags: ['troubleshooting', 'error-codes', 'chamberlain'],
    difficulty: 'homeowner',
  },
  {
    id: 'vid-force-adjustment',
    youtubeId: 'ozGACTdfsnY',
    title: 'How to Adjust Travel Limits on LiftMaster Openers',
    category: 'troubleshooting',
    brand: 'LiftMaster',
    duration: '5:00',
    description: 'Adjusting up and down travel limits when the door doesn\'t fully open or close. Covers manual adjustment controls on various LiftMaster models.',
    tngdNote: 'If your door stops short of the floor or reverses before fully closing, travel limits likely need adjustment. This is a safe homeowner adjustment on most models.',
    tags: ['travel-limits', 'adjustment', 'liftmaster'],
    difficulty: 'homeowner',
  },
];

export function getVideosByCategory(category: VideoCategory): Video[] {
  return CURATED_VIDEOS.filter(v => v.category === category);
}

export function getVideosByDifficulty(difficulty: Video['difficulty']): Video[] {
  return CURATED_VIDEOS.filter(v => v.difficulty === difficulty);
}

export function getVideosByBrand(brand: string): Video[] {
  return CURATED_VIDEOS.filter(v => v.brand.toLowerCase().includes(brand.toLowerCase()));
}

export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  return CURATED_VIDEOS.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.description.toLowerCase().includes(q) ||
    v.tags.some(t => t.includes(q)) ||
    v.brand.toLowerCase().includes(q)
  );
}
