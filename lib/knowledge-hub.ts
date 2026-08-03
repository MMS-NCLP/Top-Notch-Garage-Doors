import type { ServiceType } from './portfolio-data';

export interface KnowledgeTopic {
  slug: string;
  title: string;
  headline: string;
  description: string;
  metaDescription: string;
  icon: string;
  color: string;
  articleSlugs: string[];
  servicePageHref: string | null;
  portfolioServiceType: ServiceType | null;
  faqs: { q: string; a: string }[];
  quickFacts: string[];
  crossLinks: string[];
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    slug: 'springs',
    title: 'Garage Door Springs',
    headline: 'Everything You Need to Know About Garage Door Springs',
    description: 'Your springs counterbalance hundreds of pounds of door weight every single day. Understanding how they work, when they fail, and what replacement involves puts you in control — not in the dark.',
    metaDescription: 'Complete guide to garage door springs: torsion vs extension, warning signs, cycle life, safety, replacement, and what to expect. Expert resource from Top-Notch Garage Doors.',
    icon: 'settings',
    color: 'brand-red',
    articleSlugs: [
      'garage-door-springs-replacement-guide',
      'emergency-garage-door-repair-what-to-do',
      'garage-door-safety-features-every-homeowner-needs',
      'garage-door-maintenance-seasonal-checklist',
    ],
    servicePageHref: '/services/repair',
    portfolioServiceType: 'spring-work',
    faqs: [
      { q: 'How long do garage door springs last?', a: 'Standard torsion springs are rated for ~10,000 cycles. At 4 cycles per day, that\'s about 7 years. High-cycle springs (25,000–50,000 cycles) last 15–30+ years.' },
      { q: 'Can I replace a garage door spring myself?', a: 'We strongly advise against it. Torsion springs are under extreme tension — a misstep can cause serious injury. This is one of the few garage door jobs that should always be left to a professional.' },
      { q: 'Why did both springs break at the same time?', a: 'They usually don\'t. But if one broke months ago and you didn\'t notice (the opener compensated), the remaining spring was carrying double the load and failed shortly after.' },
      { q: 'Should I replace both springs if only one broke?', a: 'Yes. Springs installed at the same time have the same cycle count. If one failed, the other is close behind. Replacing both avoids a second service call and keeps the door balanced.' },
    ],
    quickFacts: [
      'A standard 16×7 door weighs 155–185 lbs — the springs lift nearly all of it',
      'Torsion springs mount above the door on a shaft; extension springs run along the tracks',
      'Temperature drops increase spring breakage — NC winters are peak failure season',
      'A broken spring sounds like a gunshot or car backfire from inside the garage',
      'BOGO half-off on pairs — ask about our spring replacement special',
    ],
    crossLinks: ['openers', 'safety', 'maintenance'],
  },
  {
    slug: 'openers',
    title: 'Garage Door Openers',
    headline: 'Smart Openers, Belt Drives & Troubleshooting',
    description: 'The opener is the brain of your garage door system. From classic chain-drives to Wi-Fi-connected smart units, choosing the right opener — and knowing when yours needs attention — saves money and headaches.',
    metaDescription: 'Garage door opener guide: belt vs chain vs wall-mount, smart features, troubleshooting, and when to upgrade. Expert resource from Top-Notch Garage Doors in the Piedmont Triad.',
    icon: 'zap',
    color: 'brand-blue',
    articleSlugs: [
      'smart-garage-door-openers-2026',
      'garage-door-opener-troubleshooting-guide',
      'garage-door-safety-features-every-homeowner-needs',
      'diy-garage-door-maintenance-tips',
    ],
    servicePageHref: '/services/openers',
    portfolioServiceType: 'opener-work',
    faqs: [
      { q: 'Belt drive or chain drive — which is better?', a: 'Belt drives are quieter and require less maintenance. Chain drives cost less upfront and handle heavier doors. For attached garages (bedroom above), belt drive is worth the upgrade.' },
      { q: 'Do I need a smart garage door opener?', a: 'If you\'ve ever wondered "did I close the garage?" — yes. Smart openers let you monitor and control your door from anywhere. They also enable guest access, delivery alerts, and auto-close timers.' },
      { q: 'Why does my opener light blink but the door won\'t move?', a: 'Blinking lights usually indicate a safety sensor issue. Check that both sensors at the bottom of the tracks are aligned and clean. A steady glow on both sensors means they\'re aligned.' },
      { q: 'How long does an opener last?', a: 'Quality openers (LiftMaster, Chamberlain) last 12–15 years with proper maintenance. If yours is 10+ years old and acting up, replacement is usually more cost-effective than repair.' },
    ],
    quickFacts: [
      'The opener motor generates only ~10 lbs of force — springs do the heavy lifting',
      'Wall-mount (jackshaft) openers free up ceiling space and run quieter than overhead units',
      'myQ smart technology lets you monitor and control your door from your phone',
      'Battery backup openers keep working during power outages — critical during NC storms',
      'Modern openers include rolling-code security that changes with every use',
    ],
    crossLinks: ['springs', 'safety', 'buying-guides'],
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & DIY Care',
    headline: 'Keep Your Garage Door Running for Decades',
    description: 'Most emergency repairs we see could have been prevented with basic maintenance. A 30-minute seasonal check catches problems when they\'re small — before they become expensive and inconvenient.',
    metaDescription: 'Garage door maintenance guide: seasonal checklists, DIY lubrication, balance testing, safety checks, and when to call a pro. Expert resource from Top-Notch Garage Doors.',
    icon: 'shield',
    color: 'green-600',
    articleSlugs: [
      'garage-door-maintenance-seasonal-checklist',
      'diy-garage-door-maintenance-tips',
      'garage-door-springs-replacement-guide',
      'garage-door-opener-troubleshooting-guide',
    ],
    servicePageHref: '/services/repair',
    portfolioServiceType: null,
    faqs: [
      { q: 'How often should I maintain my garage door?', a: 'Twice per year — spring and fall. NC temperature swings between seasons are when most failures occur. A quick lubrication and balance check takes 20 minutes.' },
      { q: 'What lubricant should I use?', a: 'White lithium grease or silicone-based spray on hinges, rollers, and springs. Never use WD-40 as a lubricant — it\'s a solvent that actually strips existing lubrication.' },
      { q: 'How do I test my door\'s balance?', a: 'Disconnect the opener (pull the red handle). Lift the door halfway and let go. It should stay in place. If it drops or rises, the springs need adjustment — call a professional.' },
      { q: 'What\'s included in a professional tune-up?', a: 'Our 21-point inspection covers spring tension, cable condition, roller wear, track alignment, weatherseal integrity, safety sensor calibration, opener force settings, and hardware tightening.' },
    ],
    quickFacts: [
      'A tune-up catches problems that cost 10x more to fix as emergency repairs',
      'Rollers should be replaced every 5–7 years (nylon) or 10–12 years (steel)',
      'Weatherseal replacement takes 15 minutes and prevents water, pests, and energy loss',
      'Listen for grinding, scraping, or popping — new sounds mean something changed',
      'Tighten the bolts on your brackets and hinges twice a year — vibration loosens them',
    ],
    crossLinks: ['springs', 'openers', 'safety'],
  },
  {
    slug: 'safety',
    title: 'Garage Door Safety',
    headline: 'Safety Features, Risks & What Every Homeowner Should Know',
    description: 'A garage door is the largest moving object in your home and one of the heaviest. Understanding the safety systems built into modern doors — and testing them regularly — protects your family.',
    metaDescription: 'Garage door safety guide: auto-reverse testing, sensor alignment, spring dangers, child safety, and emergency procedures. Expert resource from Top-Notch Garage Doors.',
    icon: 'alert-triangle',
    color: 'amber-600',
    articleSlugs: [
      'garage-door-safety-features-every-homeowner-needs',
      'emergency-garage-door-repair-what-to-do',
      'garage-door-springs-replacement-guide',
      'garage-door-maintenance-seasonal-checklist',
    ],
    servicePageHref: '/services/repair',
    portfolioServiceType: null,
    faqs: [
      { q: 'How do I test the auto-reverse feature?', a: 'Place a 2×4 flat on the ground under the door. Close the door — it should reverse immediately upon contact. If it doesn\'t, adjust the force settings or call for service.' },
      { q: 'Are garage door springs dangerous?', a: 'Yes. A torsion spring under full tension stores enough energy to cause severe injury. Never attempt to adjust, remove, or replace springs yourself. This is a professional-only job.' },
      { q: 'What should I do if my door falls suddenly?', a: 'Stay clear. A falling door means cable failure or both springs broke simultaneously. Do not attempt to lift or operate it. Call for emergency service and keep children and pets away.' },
      { q: 'How do I use the emergency release safely?', a: 'Pull the red handle straight down while the door is closed. This disconnects the opener so you can lift manually. Never pull it while the door is open — it could slam down under its own weight.' },
    ],
    quickFacts: [
      'Federal law requires auto-reverse on all openers manufactured after 1993',
      'Photo-eye sensors must be no higher than 6 inches from the floor',
      'Test your auto-reverse monthly — it takes 10 seconds',
      'Pinch-resistant panels prevent finger injuries at panel joints',
      'Tamper-resistant brackets at the bottom of the door should never be loosened',
    ],
    crossLinks: ['springs', 'openers', 'maintenance'],
  },
  {
    slug: 'buying-guides',
    title: 'Buying Guides & Products',
    headline: 'How to Choose the Right Garage Door, Opener & Hardware',
    description: 'Buying a garage door is a 15–25 year decision. These guides help you compare materials, insulation values, styles, and features so you invest in the right door — not just the cheapest one.',
    metaDescription: 'Garage door buying guides: door styles, insulation R-values, opener comparisons, screen doors, and what to consider before buying. Expert resource from Top-Notch Garage Doors.',
    icon: 'book-open',
    color: 'brand-gold',
    articleSlugs: [
      'best-garage-door-styles-for-north-carolina-homes',
      'garage-door-insulation-guide',
      'smart-garage-door-openers-2026',
      'garage-screen-doors-complete-buyers-guide',
    ],
    servicePageHref: '/services/installation',
    portfolioServiceType: 'installations',
    faqs: [
      { q: 'What\'s the best material for a garage door in NC?', a: 'Insulated steel is the best all-around choice — durable, low-maintenance, energy-efficient, and available in every style. Wood is beautiful but demands annual maintenance in NC humidity.' },
      { q: 'What R-value do I need?', a: 'R-8 minimum for attached garages. R-12 to R-16 if you use your garage as a workshop or have living space above. Uninsulated doors (R-0) waste energy and amplify street noise.' },
      { q: 'How much does a new garage door increase home value?', a: 'Remodeling Magazine consistently ranks garage door replacement as the #1 ROI home improvement — typically returning 90–100%+ of cost at resale.' },
      { q: 'Single-layer, double-layer, or triple-layer?', a: 'Single = no insulation. Double = steel + insulation. Triple = steel + insulation + steel (strongest, quietest, best insulation). For NC homes, double-layer minimum; triple for premium builds.' },
    ],
    quickFacts: [
      'A 16×7 garage door is the most common residential size in North Carolina',
      'Garage doors account for up to 30% of a home\'s front facade — curb appeal matters',
      'Wind-rated doors are required in coastal NC and recommended across the Piedmont',
      'Most new garage doors come with a lifetime warranty on sections',
      'We carry Clopay, Amarr, CHI, and Wayne Dalton — all major styles and price points',
    ],
    crossLinks: ['openers', 'maintenance', 'screens'],
  },
  {
    slug: 'screens',
    title: 'Garage Screen Doors',
    headline: 'Transform Your Garage into Usable Living Space',
    description: 'A garage screen door turns dead square footage into a bug-free workshop, gym, playroom, or hangout space. Motorized retractable screens disappear when you don\'t need them.',
    metaDescription: 'Garage screen door guide: retractable vs fixed, motorized options, sizing, installation, and real use cases in the Piedmont Triad. Expert resource from Top-Notch Garage Doors.',
    icon: 'panel-top',
    color: 'teal-600',
    articleSlugs: [
      'garage-screen-doors-complete-buyers-guide',
      'pressure-washing-guide-when-why-how',
    ],
    servicePageHref: '/garage-screens',
    portfolioServiceType: 'screen-doors',
    faqs: [
      { q: 'Can a screen door work with my existing garage door?', a: 'Yes. Retractable screens mount on the inside of the opening and operate independently of your garage door. When retracted, they\'re invisible.' },
      { q: 'Are motorized screens worth the upgrade?', a: 'If you\'ll use the screen frequently (which most people do once they have one), motorized is 100% worth it. One button press — no bending, no zippers, no hassle.' },
      { q: 'Will a screen door keep out all bugs?', a: 'Quality screens with properly sealed tracks block mosquitoes, flies, wasps, and gnats. The mesh is fine enough for even small insects while still allowing full airflow.' },
      { q: 'How do screen doors handle NC wind?', a: 'Track-guided retractable screens handle moderate wind well. For exposed locations, wind-rated models with weighted bottom bars stay in place through typical Piedmont gusts.' },
    ],
    quickFacts: [
      'Retractable screens tuck into a housing when not in use — no visual clutter',
      'Average ROI on a garage screen is high — you\'re adding usable square footage',
      'Screens reduce cooling costs by shading the opening while allowing airflow',
      'Most installations complete in 2–4 hours with no structural modifications',
      'Motorized screens integrate with smart home systems and wall switches',
    ],
    crossLinks: ['buying-guides', 'maintenance'],
  },
  {
    slug: 'pressure-washing',
    title: 'Pressure Washing',
    headline: 'Professional Pressure Washing for NC Homes',
    description: 'North Carolina humidity breeds mold, mildew, and algae faster than most homeowners realize. Professional pressure washing restores surfaces and prevents long-term damage to your property.',
    metaDescription: 'Pressure washing guide for NC homeowners: optimal timing, surface techniques, DIY vs professional, and what to expect. Expert resource from Top-Notch Garage Doors.',
    icon: 'droplets',
    color: 'blue-500',
    articleSlugs: [
      'pressure-washing-guide-when-why-how',
      'diy-garage-door-maintenance-tips',
    ],
    servicePageHref: '/services/pressure-washing',
    portfolioServiceType: null,
    faqs: [
      { q: 'How often should I pressure wash in NC?', a: 'Annually for most surfaces. North-facing surfaces and shaded areas may need attention twice per year due to accelerated mold and algae growth in NC humidity.' },
      { q: 'Can pressure washing damage my surfaces?', a: 'Yes — incorrect pressure or technique can etch concrete, strip paint, and damage wood. Professional equipment and training make the difference between cleaning and destruction.' },
      { q: 'What surfaces can be pressure washed?', a: 'Concrete driveways, sidewalks, patios, brick, vinyl siding, wood decks (soft wash), fences, and gutters. Different surfaces require different pressure levels and techniques.' },
      { q: 'Is soft washing different from pressure washing?', a: 'Soft washing uses low pressure with cleaning solutions — ideal for roofs, painted surfaces, and delicate materials. Pressure washing uses high pressure for hard surfaces like concrete.' },
    ],
    quickFacts: [
      'NC humidity creates ideal conditions for mold and algae — it grows year-round',
      'Pressure washing a driveway typically takes 1–2 hours and transforms curb appeal',
      'Spring (March–May) is the best time to wash — removes winter buildup before summer',
      'Professional pressure washing uses 3,000–4,000 PSI on concrete, 1,500 on siding',
      'Always soft wash a garage door — high pressure damages panels and weatherseals',
    ],
    crossLinks: ['maintenance', 'buying-guides'],
  },
];

export function getTopicBySlug(slug: string): KnowledgeTopic | undefined {
  return KNOWLEDGE_TOPICS.find((t) => t.slug === slug);
}

export function getRelatedTopics(topic: KnowledgeTopic): KnowledgeTopic[] {
  return topic.crossLinks
    .map((slug) => KNOWLEDGE_TOPICS.find((t) => t.slug === slug))
    .filter(Boolean) as KnowledgeTopic[];
}
