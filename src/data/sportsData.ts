export interface ProductItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  availableSizes: string[];
  customizationAvailable: string[];
  image: string;
  highlight: string;
  recommendedFor: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'custom-footballs',
    name: 'Custom Footballs',
    category: 'Bespoke Production',
    tagline: 'Your design, club emblem, and customized color schemes',
    description: 'Developed to your brand or club visual identity. Request bespoke panel layouts, custom Pantone color matching, sponsor placement, and custom packaging.',
    availableSizes: ['Size 1 (Mini / Skill)', 'Size 3 (Junior)', 'Size 4 (Youth)', 'Size 5 (Standard)'],
    customizationAvailable: [
      'Custom Club & Brand Logos',
      'Pantone Color Matching',
      'Unique Panel Artwork & Graphics',
      'Customized Carton & Individual Packaging'
    ],
    image: '/src/assets/images/custom_football_1791086172397.jpg',
    highlight: '100% Bespoke Branding',
    recommendedFor: 'Sports brands, professional clubs, custom gear distributors, corporate sponsors'
  },
  {
    id: 'match-footballs',
    name: 'Match Footballs',
    category: 'Competition',
    tagline: 'Engineered for competitive fixtures and official league play',
    description: 'Designed for match conditions with aerodynamic panel balance, controlled touch, and consistent ball flight. Available with your tournament or league branding.',
    availableSizes: ['Size 5 (Official Standard)'],
    customizationAvailable: [
      'Custom Match Graphics & Panels',
      'Tournament & League Emblems',
      'Custom Colorway Combinations',
      'Matte or Textured Surface Finish'
    ],
    image: '/src/assets/images/match_football_1791086140094.jpg',
    highlight: 'Competition Grade',
    recommendedFor: 'League matches, competitive tournaments, senior club fixtures'
  },
  {
    id: 'training-footballs',
    name: 'Training Footballs',
    category: 'Training & Practice',
    tagline: 'Durable construction for repetitive drills and daily club sessions',
    description: 'Built to withstand intensive daily practice sessions on natural grass and artificial turf, offering high abrasion resistance and shape retention.',
    availableSizes: ['Size 3 (Junior)', 'Size 4 (Youth)', 'Size 5 (Senior)'],
    customizationAvailable: [
      'Club Crest & Team Color Combinations',
      'Squad Numbering & Training Category Prints',
      'High-Visibility Contrast Graphics',
      'Bulk Team Supply Bundles'
    ],
    image: '/src/assets/images/training_football_1791086156017.jpg',
    highlight: 'High Durability',
    recommendedFor: 'Soccer academies, school sports programs, club training regimes'
  },
  {
    id: 'promotional-footballs',
    name: 'Promotional Footballs',
    category: 'Events & Corporate',
    tagline: 'Ideal for marketing campaigns, brand activations, and fan merchandise',
    description: 'Cost-effective bulk balls tailored for corporate sponsors, brand activations, fan merchandise, and community sporting outreach.',
    availableSizes: ['Size 1 (Mini / Souvenir)', 'Size 2', 'Size 5 (Standard)'],
    customizationAvailable: [
      'Full-Surface Sponsor & Corporate Logos',
      'Promotional Event Themes & Slogans',
      'Custom Polybag Packaging & Barcoding',
      'Volume-Optimized Wholesale Production'
    ],
    image: '/src/assets/images/hero_football_1791086118631.jpg',
    highlight: 'Volume Optimized',
    recommendedFor: 'Corporate sponsors, marketing agencies, fan shops, event giveaways'
  },
  {
    id: 'club-academy-footballs',
    name: 'Club & Academy Footballs',
    category: 'Youth & Academies',
    tagline: 'Standardized equipment packs for progressive age development',
    description: 'Equip an entire youth development setup or multi-team soccer academy with matched balls across junior, youth, and senior age brackets.',
    availableSizes: ['Size 3 (Ages 6-9)', 'Size 4 (Ages 9-12)', 'Size 5 (Ages 12+)'],
    customizationAvailable: [
      'Academy Crest & Branch Identification',
      'Age-Bracket Color Coding',
      'Bulk Academy Gear Packages',
      'Coach Inventory Tagging Options'
    ],
    image: '/src/assets/images/football_details_1791086186139.jpg',
    highlight: 'Full Age Progression',
    recommendedFor: 'Youth academies, football camps, school sports departments'
  }
];

export const QUANTITY_TIERS = [
  {
    id: 'sample',
    title: 'Sample Order',
    range: '1 - 10 Balls',
    desc: 'Evaluate product design, custom printing accuracy, and ball feel before committing to bulk volume.',
    badge: 'Prototyping',
    popular: false
  },
  {
    id: 'small-bulk',
    title: 'Small Bulk',
    range: '25 - 100 Balls',
    desc: 'Ideal for local academies, club seasons, boutique sporting events, or pilot merchandise runs.',
    badge: 'Club Starter',
    popular: false
  },
  {
    id: 'wholesale',
    title: 'Wholesale Tier',
    range: '100 - 500 Balls',
    desc: 'Cost-effective tier for regional sports retailers, corporate campaigns, and league sponsors.',
    badge: 'Most Inquired',
    popular: true
  },
  {
    id: 'large-volume',
    title: 'Large Volume',
    range: '500+ Balls',
    desc: 'Optimized freight and bulk pricing for international sports distributors, wholesalers, and national promotions.',
    badge: 'Container / Air Freight',
    popular: false
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose Your Product',
    desc: 'Select from match balls, training balls, promotional balls, or custom academy tiers based on your market requirements.',
    detail: 'Sizes 1, 3, 4, or 5 available across all models.'
  },
  {
    step: '02',
    title: 'Share Your Design & Requirements',
    desc: 'Provide your logo, club artwork, Pantone colors, target quantities, and destination port/country.',
    detail: 'We review your vector files, mockups, or reference photos.'
  },
  {
    step: '03',
    title: 'Confirm Specifications / Sample',
    desc: 'Receive digital mockups, detailed spec sheets, and arrange pre-production samples for physical evaluation.',
    detail: 'Finalize panel layout, surface texture, and packaging.'
  },
  {
    step: '04',
    title: 'Place Your Bulk Order',
    desc: 'Confirm your production batch with milestone tracking and door-to-door or port-to-port export logistics.',
    detail: 'Direct export support from Sialkot to global destinations.'
  }
];

export const WHY_POWERX_POINTS = [
  {
    id: 'sialkot-hub',
    title: 'Sialkot Sports Industry Location',
    desc: 'Headquartered in Sialkot, Pakistan—the globally recognized epicenter of football manufacturing and craftsmanship responsible for supplying international tournaments for generations.',
    icon: 'MapPin'
  },
  {
    id: 'custom-options',
    title: 'Custom Product Options',
    desc: 'We provide extensive flexibility on custom color schemes, logo applications, panel artwork, size specifications, and personalized brand packaging.',
    icon: 'Palette'
  },
  {
    id: 'bulk-focus',
    title: 'Bulk Order Focus',
    desc: 'Our export operations are tailored specifically for commercial quantities, from boutique club batches to multi-hundred and thousand unit wholesale shipments.',
    icon: 'PackageCheck'
  },
  {
    id: 'international-support',
    title: 'International Buyer Support',
    desc: 'Experienced in handling inquiries and documentation for buyers across the UAE, Saudi Arabia, Europe, UK, and other worldwide destinations.',
    icon: 'Globe2'
  },
  {
    id: 'direct-whatsapp',
    title: 'Direct WhatsApp Communication',
    desc: 'No bureaucracy or slow ticket queues. Speak directly with our export coordinators via WhatsApp for swift updates, mockups, and transparent quotations.',
    icon: 'MessageCircle'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g-1',
    category: 'products',
    title: 'PowerX Competition Match Ball',
    subtitle: 'Dynamic Red & Black Geometric Panels',
    image: '/src/assets/images/hero_football_1791086118631.jpg'
  },
  {
    id: 'g-2',
    category: 'custom',
    title: 'Bespoke Dual-Ball Design Concept',
    subtitle: 'Client Custom Colorway & Logo Space',
    image: '/src/assets/images/custom_football_1791086172397.jpg'
  },
  {
    id: 'g-3',
    category: 'details',
    title: 'Surface Micro-Texture & Seam Precision',
    subtitle: 'High-Grip Polyurethane Composite',
    image: '/src/assets/images/football_details_1791086186139.jpg'
  },
  {
    id: 'g-4',
    category: 'products',
    title: 'Tournament Pro Match Spec',
    subtitle: 'Reflective Studio Exhibition',
    image: '/src/assets/images/match_football_1791086140094.jpg'
  },
  {
    id: 'g-5',
    category: 'sports',
    title: 'High-Abrasion Club Training Ball',
    subtitle: 'Night Stadium & Turf Resilience',
    image: '/src/assets/images/training_football_1791086156017.jpg'
  },
  {
    id: 'g-6',
    category: 'packaging',
    title: 'Export Packaging & Custom Tagging',
    subtitle: 'Polybagged with Barcode & Carton Protection',
    image: '/src/assets/images/hero_football_1791086118631.jpg'
  }
];

export const EXPORT_DESTINATIONS = [
  { name: 'United Arab Emirates', region: 'Middle East', cities: 'Dubai, Abu Dhabi, Sharjah' },
  { name: 'Saudi Arabia', region: 'Middle East', cities: 'Riyadh, Jeddah, Dammam' },
  { name: 'United Kingdom', region: 'Europe', cities: 'London, Manchester, Birmingham' },
  { name: 'Germany', region: 'Europe', cities: 'Frankfurt, Munich, Hamburg' },
  { name: 'Spain & Italy', region: 'Europe', cities: 'Barcelona, Madrid, Milan' },
  { name: 'Global Markets', region: 'Worldwide', cities: 'North America, Africa, Asia-Pacific' }
];

export const TRUST_STATS = [
  { label: 'Origin City', value: 'Sialkot, PK', note: 'World Sports Capital' },
  { label: 'Focus', value: 'Footballs & Custom', note: 'Bulk B2B Supply' },
  { label: 'Inquiry Channels', value: 'Direct WhatsApp', note: 'Rapid 1-on-1 response' },
  { label: 'Markets Served', value: 'Global Export', note: 'UAE, KSA, EU & worldwide' }
];
