export interface Neighborhood {
  name: string;
  slug: string;
  description: string;
}

export interface ServiceArea {
  name: string;
  slug: string;
  county: string;
  tagline: string;
  description: string;
  neighborhoods: Neighborhood[];
  keywords: string[];
  corridorPosition: 'west' | 'central' | 'east';
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: 'Statesville',
    slug: 'statesville',
    county: 'Iredell County',
    tagline: 'Extended Western Coverage',
    description: 'Statesville sits at the far western reach of our service corridor. While our core dispatch runs Burlington to Greensboro, we extend coverage into Iredell County because homeowners here deserve the same factory-trained quality — and we make the drive.',
    corridorPosition: 'west',
    neighborhoods: [
      { name: 'Downtown Statesville', slug: 'downtown-statesville', description: 'Historic homes and commercial properties near the Broad Street corridor.' },
      { name: 'Signal Hill', slug: 'signal-hill', description: 'Established residential community off Signal Hill Drive with mature landscaping.' },
      { name: 'Northview Harbour', slug: 'northview-harbour', description: 'Lakeside community near Lake Norman with premium homes.' },
      { name: 'West Statesville', slug: 'west-statesville', description: 'Growing residential area along US-70 with new construction.' },
    ],
    keywords: ['garage door repair Statesville NC', 'garage door installation Statesville', 'garage door service Iredell County', 'Statesville garage door company'],
  },
  {
    name: 'Mooresville',
    slug: 'mooresville',
    county: 'Iredell County',
    tagline: 'Race City USA',
    description: 'Known as Race City USA, Mooresville combines lakefront luxury with growing suburban communities. Part of our extended western coverage — we make the drive from our Burlington-Greensboro core to serve Lake Norman and I-77 corridor homeowners.',
    corridorPosition: 'west',
    neighborhoods: [
      { name: 'Lake Norman', slug: 'lake-norman', description: 'Waterfront properties and luxury estates along the lakeshore.' },
      { name: 'Downtown Mooresville', slug: 'downtown-mooresville', description: 'Historic Main Street area with charming storefronts and older homes.' },
      { name: 'Langtree', slug: 'langtree', description: 'Mixed-use development area with residential and commercial properties.' },
      { name: 'Morrison Plantation', slug: 'morrison-plantation', description: 'Master-planned community with golf course and upscale homes.' },
    ],
    keywords: ['garage door repair Mooresville NC', 'garage door installation Mooresville', 'Lake Norman garage door service', 'Mooresville garage door company'],
  },
  {
    name: 'Salisbury',
    slug: 'salisbury',
    county: 'Rowan County',
    tagline: 'Rowan County Seat',
    description: 'Salisbury anchors the southwestern reach of our coverage area with a rich mix of Victorian-era homes and modern communities. From the historic West Square district to growing neighborhoods along Jake Alexander Boulevard, we serve Rowan County with pride.',
    corridorPosition: 'west',
    neighborhoods: [
      { name: 'West Square', slug: 'west-square', description: 'Historic district with Victorian and antebellum homes.' },
      { name: 'Fulton Heights', slug: 'fulton-heights', description: 'Walkable neighborhood near downtown with early 20th century bungalows.' },
      { name: 'Country Club', slug: 'country-club', description: 'Established neighborhood surrounding the Salisbury Country Club.' },
      { name: 'North Salisbury', slug: 'north-salisbury', description: 'Commercial and residential area along Jake Alexander Boulevard.' },
    ],
    keywords: ['garage door repair Salisbury NC', 'garage door installation Salisbury', 'garage door service Rowan County', 'Salisbury garage door company'],
  },
  {
    name: 'Lexington',
    slug: 'lexington',
    county: 'Davidson County',
    tagline: 'Barbecue Capital',
    description: 'Lexington brings small-town charm with its famous barbecue heritage and tight-knit neighborhoods. We serve homeowners across Davidson County from established communities near Uptown to newer developments along Highway 8.',
    corridorPosition: 'west',
    neighborhoods: [
      { name: 'Uptown Lexington', slug: 'uptown-lexington', description: 'Downtown core with historic homes and local businesses.' },
      { name: 'Welcome', slug: 'welcome', description: 'Unincorporated community east of Lexington along Old US-52.' },
      { name: 'Cotton Grove', slug: 'cotton-grove', description: 'Rural residential area south of Lexington.' },
      { name: 'Erlanger', slug: 'erlanger', description: 'Residential neighborhood west of downtown near the hospital.' },
    ],
    keywords: ['garage door repair Lexington NC', 'garage door installation Lexington', 'garage door service Davidson County', 'Lexington NC garage door'],
  },
  {
    name: 'Thomasville',
    slug: 'thomasville',
    county: 'Davidson County',
    tagline: 'Chair City',
    description: 'Thomasville bridges the gap between our western and central corridor. Known for its furniture heritage and friendly neighborhoods, we provide the same white-glove service here that homeowners expect across the entire Piedmont Triad.',
    corridorPosition: 'west',
    neighborhoods: [
      { name: 'Downtown Thomasville', slug: 'downtown-thomasville', description: 'Historic center anchored by the Big Chair landmark.' },
      { name: 'Hasty', slug: 'hasty', description: 'Residential community on the eastern edge of Thomasville.' },
      { name: 'Denton Road', slug: 'denton-road', description: 'Developing residential corridor south of downtown.' },
      { name: 'National Highway', slug: 'national-highway', description: 'Commercial and residential area along US-29/70.' },
    ],
    keywords: ['garage door repair Thomasville NC', 'garage door installation Thomasville', 'garage door service Thomasville NC', 'Thomasville garage door company'],
  },
  {
    name: 'High Point',
    slug: 'high-point',
    county: 'Guilford County',
    tagline: 'Furniture Capital of the World',
    description: 'High Point is the gateway to our central corridor — home to the world-famous Furniture Market and a diverse mix of neighborhoods. We serve everything from Emerywood estates to new developments near Palladium, with factory-trained technicians who know the area.',
    corridorPosition: 'central',
    neighborhoods: [
      { name: 'Emerywood', slug: 'emerywood', description: 'Upscale historic neighborhood with large lots and mature trees.' },
      { name: 'Westchester', slug: 'westchester', description: 'Established suburban community with family-friendly streets.' },
      { name: 'Deep River', slug: 'deep-river', description: 'Growing area south of High Point along Deep River.' },
      { name: 'Palladium', slug: 'palladium', description: 'Newer mixed-use development with modern homes.' },
      { name: 'Oak Hollow', slug: 'oak-hollow', description: 'Lakeside community near Oak Hollow Lake and golf course.' },
    ],
    keywords: ['garage door repair High Point NC', 'garage door installation High Point', 'garage door service Guilford County', 'High Point garage door company'],
  },
  {
    name: 'Greensboro',
    slug: 'greensboro',
    county: 'Guilford County',
    tagline: 'Gate City',
    description: 'As the largest city in our corridor, Greensboro represents the heart of our central service area. From the historic Fisher Park bungalows to booming development in East Greensboro, our factory-trained technicians cover every neighborhood with the same attention to detail.',
    corridorPosition: 'central',
    neighborhoods: [
      { name: 'Fisher Park', slug: 'fisher-park', description: 'Historic district with craftsman bungalows and tree-lined streets.' },
      { name: 'Irving Park', slug: 'irving-park', description: 'Premier residential neighborhood with stately homes and golf course.' },
      { name: 'Lindley Park', slug: 'lindley-park', description: 'Walkable neighborhood near UNCG with character homes.' },
      { name: 'Starmount', slug: 'starmount', description: 'Established neighborhood near Starmount Forest Country Club.' },
      { name: 'Lake Jeanette', slug: 'lake-jeanette', description: 'Upscale community in northwest Greensboro near the lake.' },
      { name: 'Friendly Acres', slug: 'friendly-acres', description: 'Family neighborhood along Friendly Avenue corridor.' },
    ],
    keywords: ['garage door repair Greensboro NC', 'garage door installation Greensboro', 'garage door service Greensboro', 'Greensboro garage door company', 'garage door opener Greensboro NC'],
  },
  {
    name: 'McLeansville',
    slug: 'mcleansville',
    county: 'Guilford County',
    tagline: 'Eastern Guilford',
    description: 'McLeansville sits at the crossroads between Greensboro and Burlington — a growing community where rural charm meets suburban convenience. We know these roads well and serve McLeansville homeowners with the speed and quality they deserve.',
    corridorPosition: 'central',
    neighborhoods: [
      { name: 'McLeansville Proper', slug: 'mcleansville-proper', description: 'Central community area along NC-61 corridor.' },
      { name: 'Brightwood', slug: 'brightwood', description: 'Residential area near the Guilford-Alamance county line.' },
      { name: 'Sedalia', slug: 'sedalia', description: 'Historic community south of McLeansville along Burlington Road.' },
    ],
    keywords: ['garage door repair McLeansville NC', 'garage door service Eastern Guilford', 'McLeansville garage door company'],
  },
  {
    name: 'Gibsonville',
    slug: 'gibsonville',
    county: 'Guilford County',
    tagline: 'Where Guilford Meets Alamance',
    description: 'Gibsonville straddles the Guilford-Alamance county line and represents the transition into our eastern corridor. A growing town with new subdivisions and established neighborhoods, Gibsonville homeowners trust us for reliable, local service.',
    corridorPosition: 'east',
    neighborhoods: [
      { name: 'Downtown Gibsonville', slug: 'downtown-gibsonville', description: 'Historic center with railroad heritage and small-town charm.' },
      { name: 'South Gibsonville', slug: 'south-gibsonville', description: 'Residential area expanding toward Elon and Burlington.' },
      { name: 'Ossipee', slug: 'ossipee', description: 'Community along the Guilford-Alamance border.' },
    ],
    keywords: ['garage door repair Gibsonville NC', 'garage door service Gibsonville', 'Gibsonville garage door company'],
  },
  {
    name: 'Whitsett',
    slug: 'whitsett',
    county: 'Guilford County',
    tagline: 'Our Home Base',
    description: 'Whitsett is where Top-Notch Garage Doors was built — our home base and the community that gave us our start. We know every street, every neighborhood, and every homeowner who trusts us with their garage door. This is where our reputation began.',
    corridorPosition: 'east',
    neighborhoods: [
      { name: 'Whitsett Proper', slug: 'whitsett-proper', description: 'Core residential area surrounding NC-61 and Whitsett community.' },
      { name: 'Brookwood', slug: 'brookwood', description: 'Established neighborhood east of the NC-61 corridor.' },
      { name: 'Rock Creek', slug: 'rock-creek', description: 'Growing community along Rock Creek Dairy Road.' },
    ],
    keywords: ['garage door repair Whitsett NC', 'garage door service Whitsett', 'Whitsett garage door company', 'Top-Notch Garage Doors Whitsett'],
  },
  {
    name: 'Burlington',
    slug: 'burlington',
    county: 'Alamance County',
    tagline: 'Alamance County Seat',
    description: 'Burlington is our headquarters city and the hub of our eastern corridor. From the historic Glencoe Mill village to new developments near Tanger Outlets, we serve Burlington homeowners with the pride and reliability of a company that calls this city home.',
    corridorPosition: 'east',
    neighborhoods: [
      { name: 'West Burlington', slug: 'west-burlington', description: 'Residential and commercial area along Huffman Mill Road.' },
      { name: 'Lakeside', slug: 'lakeside', description: 'Community near Lake Mackintosh with newer developments.' },
      { name: 'Glen Raven', slug: 'glen-raven', description: 'Mill village community with historic character homes.' },
      { name: 'Alamance', slug: 'alamance', description: 'Small community south of Burlington near the Haw River.' },
      { name: 'Glencoe', slug: 'glencoe', description: 'Historic mill village along the Haw River.' },
    ],
    keywords: ['garage door repair Burlington NC', 'garage door installation Burlington', 'garage door service Alamance County', 'Burlington NC garage door company'],
  },
  {
    name: 'Elon',
    slug: 'elon',
    county: 'Alamance County',
    tagline: 'University Town',
    description: 'Home to Elon University, this town blends college-town energy with established residential neighborhoods. We serve homeowners and rental property owners alike — from faculty homes near campus to family neighborhoods throughout the community.',
    corridorPosition: 'east',
    neighborhoods: [
      { name: 'University District', slug: 'university-district', description: 'Neighborhoods surrounding Elon University campus.' },
      { name: 'West Elon', slug: 'west-elon', description: 'Residential area between Elon and Burlington.' },
      { name: 'Elon College', slug: 'elon-college', description: 'Historic community core near the original campus.' },
    ],
    keywords: ['garage door repair Elon NC', 'garage door service Elon', 'Elon NC garage door company'],
  },
  {
    name: 'Mebane',
    slug: 'mebane',
    county: 'Alamance County',
    tagline: 'Eastern Gateway',
    description: 'Mebane marks the eastern edge of our corridor — a fast-growing town where I-40 meets I-85. With new subdivisions going up every season, we serve both long-time residents and newcomers with the same factory-trained quality that defines Top-Notch.',
    corridorPosition: 'east',
    neighborhoods: [
      { name: 'Downtown Mebane', slug: 'downtown-mebane', description: 'Historic center along Clay Street with local shops and restaurants.' },
      { name: 'Hawfields', slug: 'hawfields', description: 'Community east of Mebane along NC-119.' },
      { name: 'Stagecoach', slug: 'stagecoach', description: 'Growing residential area near the Tanger Outlets.' },
      { name: 'Mill Creek', slug: 'mill-creek', description: 'Newer residential development south of I-40.' },
    ],
    keywords: ['garage door repair Mebane NC', 'garage door installation Mebane', 'garage door service Mebane NC', 'Mebane garage door company'],
  },
];

export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

export function getAreasByPosition(position: 'west' | 'central' | 'east'): ServiceArea[] {
  return SERVICE_AREAS.filter((a) => a.corridorPosition === position);
}

export function getAllSlugs(): string[] {
  return SERVICE_AREAS.map((a) => a.slug);
}

export function getNeighborhoodCount(): number {
  return SERVICE_AREAS.reduce((sum, area) => sum + area.neighborhoods.length, 0);
}

export function getSchemaAreaServed() {
  return SERVICE_AREAS.map((area) => ({
    '@type': 'City' as const,
    name: area.name,
    containedInPlace: { '@type': 'State' as const, name: 'North Carolina' },
  }));
}
