import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Car,
  Compass,
  Hotel,
  Mountain,
  Palmtree,
  Plane,
  Quote,
  UsersRound
} from "lucide-react";

export type PageContent = {
  slug: string;
  navLabel: string;
  seoTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { value: string; label: string }[];
  narrative: string;
  highlights: string[];
  experiences: { title: string; copy: string; meta: string }[];
  itinerary: { day: string; title: string; copy: string }[];
};

export const whatsappNumber = "254700000000";

export const navItems = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/safaris", label: "Safaris" },
  { href: "/airport-transfers", label: "Transfers" },
  { href: "/beach-holidays", label: "Beach" },
  { href: "/hiking-adventures", label: "Hiking" },
  { href: "/corporate-travel", label: "Corporate" },
  { href: "/group-tours", label: "Groups" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Stories" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" }
];

export const services = [
  { title: "Airport Transfers", icon: Plane, href: "/airport-transfers", copy: "VIP meet-and-greet, reliable drivers, flight tracking, and polished arrivals." },
  { title: "Safari Packages", icon: Compass, href: "/safaris", copy: "Masai Mara, Amboseli, Samburu, Tsavo, and custom East African circuits." },
  { title: "Hotel Booking", icon: Hotel, href: "/contact", copy: "Boutique camps, coastal villas, city hotels, and luxury lodge reservations." },
  { title: "Car Hire", icon: Car, href: "/contact", copy: "Self-drive, chauffeur-driven SUVs, executive sedans, and group vans." },
  { title: "Corporate Travel", icon: BriefcaseBusiness, href: "/corporate-travel", copy: "Executive movements, retreats, incentives, and conference travel desks." },
  { title: "Group Tours", icon: UsersRound, href: "/group-tours", copy: "Schools, churches, diaspora groups, families, and private celebrations." },
  { title: "Hiking Adventures", icon: Mountain, href: "/hiking-adventures", copy: "Mount Kenya, Aberdares, Ngong Hills, Hell's Gate, and guided nature trails." },
  { title: "Beach Holidays", icon: Palmtree, href: "/beach-holidays", copy: "Diani, Watamu, Lamu, Malindi, Zanzibar, and romantic coastal escapes." },
  { title: "Tour Guiding", icon: Camera, href: "/contact", copy: "Private guides for Nairobi, culture, wildlife, food, history, and photography." }
];

export const pages: PageContent[] = [
  {
    slug: "home",
    navLabel: "Home",
    seoTitle: "Luxury African Tours, Safaris and Travel from Nairobi",
    eyebrow: "Nairobi born. Africa bound.",
    title: "Where Africa Becomes an Experience",
    description: "Luxury-inspired African journeys crafted with authenticity, adventure, and unforgettable memories.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/60 to-[#c6922f]/40",
    primaryCta: "Explore Journeys",
    secondaryCta: "Book via WhatsApp",
    stats: [
      { value: "24/7", label: "fast response travel desk" },
      { value: "9", label: "premium travel services" },
      { value: "4.9", label: "guest satisfaction ambition" }
    ],
    narrative: "Pride of Africa Journeys creates affordable luxury travel across Kenya and East Africa with the care of a concierge, the rhythm of local expertise, and the cinematic wonder travelers remember for life.",
    highlights: ["Private safari design", "Luxury transfers", "Handpicked stays", "Human-first service"],
    experiences: [
      { title: "Signature Safari Design", copy: "Wildlife moments paced around light, comfort, and story instead of rushed checklist tourism.", meta: "Masai Mara, Amboseli, Samburu" },
      { title: "Arrival to Adventure", copy: "Airport pickup, hotel, car, guide, and itinerary coordinated into one frictionless guest journey.", meta: "Nairobi, JKIA, Wilson" },
      { title: "Coast and Mountain Balance", copy: "Pair highland hikes, savannah drama, and warm Indian Ocean days into one seamless escape.", meta: "Diani, Watamu, Mount Kenya" }
    ],
    itinerary: [
      { day: "01", title: "Listen", copy: "We learn your travel style, budget, pace, purpose, and non-negotiables." },
      { day: "02", title: "Craft", copy: "We design a route with stays, transfers, experiences, and timing that feels personal." },
      { day: "03", title: "Host", copy: "We coordinate the journey in real time so guests feel cared for from arrival to farewell." }
    ]
  },
  {
    slug: "about",
    navLabel: "About",
    seoTitle: "About Pride of Africa Journeys",
    eyebrow: "The brand behind the journey",
    title: "African hospitality, refined for the modern traveler",
    description: "A Nairobi-based travel company built for travelers who want beauty, reliability, warmth, and a deeply personal connection to Africa.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#1b1b1b] via-[#6b4a2e]/60 to-[#c96a3d]/40",
    primaryCta: "Meet the Experience",
    secondaryCta: "Plan With Us",
    stats: [
      { value: "KE", label: "rooted in Nairobi" },
      { value: "360", label: "journey support model" },
      { value: "1:1", label: "personalized planning" }
    ],
    narrative: "We believe African travel should feel emotionally rich and operationally calm. Our role is to remove friction, curate meaning, and host every guest with grace.",
    highlights: ["Local expertise", "Transparent planning", "Premium service", "Flexible budgets"],
    experiences: [
      { title: "Affordable Luxury", copy: "Elegant experiences designed around value, comfort, and memorable detail.", meta: "Premium without pretense" },
      { title: "Human Response", copy: "Fast WhatsApp support and practical guidance before, during, and after the trip.", meta: "Built for trust" },
      { title: "Authentic Africa", copy: "Journeys shaped by real places, real hosts, and respectful cultural connection.", meta: "Never generic" }
    ],
    itinerary: [
      { day: "Value", title: "What we protect", copy: "Guest safety, punctuality, fair pricing, clear communication, and memorable storytelling." },
      { day: "Style", title: "How we design", copy: "Cinematic routes, warm hospitality, unhurried pacing, and strong supplier relationships." },
      { day: "Promise", title: "What you feel", copy: "Awe, trust, freedom, comfort, and the sense that every detail has been considered." }
    ]
  },
  {
    slug: "safaris",
    navLabel: "Safaris",
    seoTitle: "Premium Kenya Safari Packages",
    eyebrow: "Wildlife with wonder",
    title: "Safaris that move like cinema and feel deeply personal",
    description: "Custom Kenya and East Africa safari packages for couples, families, groups, diaspora travelers, and first-time visitors.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#6b4a2e]/70 to-[#c6922f]/50",
    primaryCta: "Design My Safari",
    secondaryCta: "WhatsApp Safari Desk",
    stats: [
      { value: "Mara", label: "great migration routes" },
      { value: "Big 5", label: "wildlife focus" },
      { value: "Lodge", label: "camp and lodge curation" }
    ],
    narrative: "From dawn game drives to lantern-lit lodge dinners, each safari is designed around timing, terrain, comfort, and the emotional arc of discovery.",
    highlights: ["Masai Mara", "Amboseli views", "Samburu culture", "Tsavo wilderness"],
    experiences: [
      { title: "Classic Big Five Safari", copy: "An elegant first safari with strong wildlife density, warm lodges, and smooth road or air transfers.", meta: "4-7 days" },
      { title: "Honeymoon Safari", copy: "Private pacing, romantic sundowners, elevated camps, and optional beach extension.", meta: "Luxury couples" },
      { title: "Family Safari", copy: "Kid-aware routing, comfortable vehicles, shorter drive days, and guides who can hold attention.", meta: "All ages" }
    ],
    itinerary: [
      { day: "Day 1", title: "Nairobi arrival", copy: "Meet your host, settle in, and prepare for the first wild horizon." },
      { day: "Day 2", title: "Into the reserve", copy: "Travel to the chosen park with scenic stops and an afternoon game drive." },
      { day: "Day 3", title: "Golden-hour wildlife", copy: "Dawn and dusk drives shaped around animal movement and beautiful light." }
    ]
  },
  {
    slug: "airport-transfers",
    navLabel: "Transfers",
    seoTitle: "Nairobi Airport Transfers and VIP Travel",
    eyebrow: "The arrival sets the tone",
    title: "Calm, polished airport transfers for every kind of traveler",
    description: "Reliable JKIA and Wilson Airport transfers with flight tracking, meet-and-greet service, executive vehicles, and WhatsApp coordination.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/60 to-[#c6922f]/30",
    primaryCta: "Book a Transfer",
    secondaryCta: "Send Flight Details",
    stats: [
      { value: "JKIA", label: "airport coverage" },
      { value: "24h", label: "arrival support" },
      { value: "VIP", label: "meet and assist" }
    ],
    narrative: "No confusion at arrivals. No negotiation at the curb. Just a warm welcome, a clean vehicle, and a confident transfer into Nairobi or onward travel.",
    highlights: ["Flight tracking", "Executive cars", "Group vans", "Hotel drop-offs"],
    experiences: [
      { title: "International Arrivals", copy: "Driver coordination, guest name signage, luggage help, and direct hotel movement.", meta: "JKIA" },
      { title: "Safari Connections", copy: "Smooth transfers between JKIA, Wilson Airport, hotels, and safari departure points.", meta: "Wilson links" },
      { title: "Corporate Protocol", copy: "Discreet executive movement for teams, VIPs, speakers, and visiting partners.", meta: "Business travel" }
    ],
    itinerary: [
      { day: "01", title: "Share details", copy: "Send flight number, arrival time, guest count, luggage, and destination." },
      { day: "02", title: "We track", copy: "Your driver follows flight changes and waits at the right time." },
      { day: "03", title: "Arrive easy", copy: "Meet, load, depart, and receive local tips on the way." }
    ]
  },
  {
    slug: "beach-holidays",
    navLabel: "Beach",
    seoTitle: "Kenya Coast and Zanzibar Beach Holidays",
    eyebrow: "Where the journey exhales",
    title: "Indian Ocean escapes with soft luxury and sunlit rhythm",
    description: "Diani, Watamu, Lamu, Malindi, and Zanzibar beach holidays designed for romance, families, wellness, and post-safari rest.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/60 to-[#c96a3d]/30",
    primaryCta: "Find My Beach",
    secondaryCta: "Plan Coast Escape",
    stats: [
      { value: "Diani", label: "white sand favorite" },
      { value: "Lamu", label: "culture and calm" },
      { value: "Zanzibar", label: "island extension" }
    ],
    narrative: "Beach holidays are crafted as a feeling: slow mornings, blue water, fresh seafood, thoughtful rooms, and the right distance from everything.",
    highlights: ["Honeymoon stays", "Family resorts", "Snorkeling", "Island culture"],
    experiences: [
      { title: "Safari and Sea", copy: "End a wildlife itinerary with three to five days of coastal restoration.", meta: "Best pairing" },
      { title: "Romantic Coast", copy: "Private dinners, ocean-view rooms, spa moments, and light-touch adventure.", meta: "Couples" },
      { title: "Family Beach Week", copy: "Kid-friendly resorts, short transfers, safe activities, and relaxed planning.", meta: "Families" }
    ],
    itinerary: [
      { day: "Day 1", title: "Coastal arrival", copy: "Transfer to your chosen stay and settle into ocean pace." },
      { day: "Day 2", title: "Water and wonder", copy: "Snorkel, sail, visit a marine park, or do absolutely nothing beautifully." },
      { day: "Day 3", title: "Local texture", copy: "Explore old towns, food, culture, and sunset views with a private guide." }
    ]
  },
  {
    slug: "hiking-adventures",
    navLabel: "Hiking",
    seoTitle: "Guided Hiking Adventures in Kenya",
    eyebrow: "Altitude, air, and achievement",
    title: "Guided hikes for travelers who want Africa on foot",
    description: "Curated hiking adventures across Mount Kenya, Aberdares, Ngong Hills, Hell's Gate, Longonot, and scenic nature trails.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/70 to-[#6b4a2e]/50",
    primaryCta: "Choose a Trail",
    secondaryCta: "Ask a Hiking Guide",
    stats: [
      { value: "Easy", label: "to summit-ready routes" },
      { value: "Guide", label: "local trail leadership" },
      { value: "Gear", label: "planning support" }
    ],
    narrative: "From gentle day trails to ambitious mountain routes, every hike balances safety, scenery, pace, and the quiet joy of earning the view.",
    highlights: ["Mount Kenya", "Aberdares", "Hell's Gate", "Ngong Hills"],
    experiences: [
      { title: "Day Hikes", copy: "Accessible, scenic routes close to Nairobi for local tourists, students, and visiting teams.", meta: "1 day" },
      { title: "Summit Prep", copy: "Progressive routes, packing support, and guide-led pacing for more demanding climbs.", meta: "Multi-day" },
      { title: "Photo Trails", copy: "Golden-hour walks and viewpoints for creators, couples, and slow adventure seekers.", meta: "Visual" }
    ],
    itinerary: [
      { day: "Prep", title: "Route fit", copy: "We match difficulty, timing, transport, guide ratio, and equipment needs." },
      { day: "Trail", title: "Guided movement", copy: "Your guide manages pace, safety, breaks, and scenic moments." },
      { day: "Return", title: "Easy close", copy: "Transfers, meals, and optional city or lodge extension complete the day." }
    ]
  },
  {
    slug: "corporate-travel",
    navLabel: "Corporate",
    seoTitle: "Corporate Travel, Retreats and Executive Transport Kenya",
    eyebrow: "Business travel with composure",
    title: "Executive travel systems for teams, retreats, and visiting leaders",
    description: "Corporate travel support for airport transfers, hotels, conferences, incentives, group movement, executive cars, and retreats.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1b1b1b]/80 to-[#c6922f]/30",
    primaryCta: "Build a Travel Desk",
    secondaryCta: "Request Corporate Quote",
    stats: [
      { value: "MICE", label: "meetings and incentives" },
      { value: "Fleet", label: "vehicle coordination" },
      { value: "Desk", label: "single-point support" }
    ],
    narrative: "Corporate journeys need elegance and control. We coordinate the practical details so teams can focus on meetings, reward, strategy, and connection.",
    highlights: ["Executive transport", "Retreat planning", "Hotel blocks", "Conference logistics"],
    experiences: [
      { title: "Executive Arrivals", copy: "Protocol-aware pickups, reliable vehicles, and quiet transfer experiences.", meta: "VIPs" },
      { title: "Team Retreats", copy: "Venue sourcing, group movement, activities, meals, and itinerary design.", meta: "Teams" },
      { title: "Incentive Travel", copy: "Reward experiences blending safari, coast, culture, and elevated service.", meta: "MICE" }
    ],
    itinerary: [
      { day: "Scope", title: "Travel architecture", copy: "Guest profiles, dates, vehicle needs, hotels, and movement complexity." },
      { day: "Control", title: "Live coordination", copy: "One support channel handles arrivals, schedule changes, and supplier updates." },
      { day: "Report", title: "Closeout", copy: "Clear follow-up, reconciliation support, and learning for repeat travel." }
    ]
  },
  {
    slug: "group-tours",
    navLabel: "Groups",
    seoTitle: "Group Tours for Schools, Families, Churches and Diaspora Travelers",
    eyebrow: "Shared journeys, beautifully held",
    title: "Group travel that feels organized, generous, and alive",
    description: "Custom group tours for students, churches, families, diaspora travelers, clubs, friends, and organizations.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#6b4a2e]/60 to-[#1f4d3a]/50",
    primaryCta: "Plan a Group Tour",
    secondaryCta: "Send Group Size",
    stats: [
      { value: "10+", label: "group-friendly design" },
      { value: "Coach", label: "transport options" },
      { value: "Guide", label: "hosted experience" }
    ],
    narrative: "The best group tours feel smooth without becoming stiff. We design timing, transport, meals, stops, and moments of discovery around real people moving together.",
    highlights: ["Student tours", "Diaspora returns", "Family reunions", "Faith groups"],
    experiences: [
      { title: "Student Discovery", copy: "Educational, safe, budget-aware itineraries with clear supervision support.", meta: "Schools" },
      { title: "Diaspora Homecoming", copy: "Culture, family, history, wildlife, and coast woven into a meaningful return.", meta: "Diaspora" },
      { title: "Celebration Travel", copy: "Birthdays, reunions, weddings, and private groups with thoughtful hosting.", meta: "Private groups" }
    ],
    itinerary: [
      { day: "Group", title: "Understand the people", copy: "Age range, mobility, budget, purpose, dates, and preferred pace." },
      { day: "Route", title: "Design the flow", copy: "Build a realistic itinerary with strong stops and comfortable logistics." },
      { day: "Host", title: "Move together", copy: "Guide, driver, and support channel keep the group aligned and relaxed." }
    ]
  },
  {
    slug: "gallery",
    navLabel: "Gallery",
    seoTitle: "African Travel Gallery",
    eyebrow: "A visual field note",
    title: "Moments that make travelers pause, breathe, and remember",
    description: "A curated gallery of safari light, mountain air, coastal calm, city arrivals, and guest-centered African travel.",
    image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/40 to-[#c6922f]/40",
    primaryCta: "View Journeys",
    secondaryCta: "Create My Moment",
    stats: [
      { value: "Wild", label: "safari scenes" },
      { value: "Blue", label: "coastal stories" },
      { value: "Human", label: "guest moments" }
    ],
    narrative: "The gallery is organized like memory: not only places, but texture, emotion, movement, and the little details that turn travel into a story.",
    highlights: ["Wildlife", "Landscape", "People", "Luxury stays"],
    experiences: [
      { title: "Safari Light", copy: "Golden-hour frames across savannahs, lodges, and quiet wildlife encounters.", meta: "Wildlife" },
      { title: "Coastal Ease", copy: "Ocean color, old towns, sailboats, and the restorative side of the journey.", meta: "Beach" },
      { title: "Human Warmth", copy: "Guides, drivers, hosts, and travelers sharing moments worth keeping.", meta: "People" }
    ],
    itinerary: [
      { day: "Frame", title: "Visual promise", copy: "Every journey should have moments that feel worthy of remembering." },
      { day: "Guide", title: "Best timing", copy: "We design around light, traffic, weather, wildlife movement, and comfort." },
      { day: "Keep", title: "Story after travel", copy: "Guests leave with memories that still feel vivid long after returning home." }
    ]
  },
  {
    slug: "testimonials",
    navLabel: "Stories",
    seoTitle: "Guest Testimonials and Travel Stories",
    eyebrow: "Trust, in the guests' words",
    title: "The strongest proof is how people feel after the journey",
    description: "Guest stories and trust indicators from safaris, transfers, group trips, hiking adventures, and coastal escapes.",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#6b4a2e]/50 to-[#c6922f]/40",
    primaryCta: "Read Guest Stories",
    secondaryCta: "Start Your Story",
    stats: [
      { value: "Care", label: "mentioned most" },
      { value: "Trust", label: "built through detail" },
      { value: "Awe", label: "the lasting feeling" }
    ],
    narrative: "Great service is remembered through small moments: the driver who waited calmly, the guide who knew the light, the planner who answered quickly.",
    highlights: ["Fast replies", "Warm guides", "Smooth logistics", "Beautiful memories"],
    experiences: [
      { title: "Google Reviews Ready", copy: "A dedicated review section is structured for live Google review embedding when the profile is connected.", meta: "Social proof" },
      { title: "Guest Confidence", copy: "Testimonials are placed near booking prompts to reduce hesitation and increase inquiry quality.", meta: "CRO" },
      { title: "Story-Led Proof", copy: "Reviews focus on feeling, service, safety, and outcome rather than generic praise.", meta: "Brand trust" }
    ],
    itinerary: [
      { day: "Before", title: "Clarity", copy: "Guests know what is included, what to expect, and how to reach support." },
      { day: "During", title: "Care", copy: "Guides and drivers create calm confidence through each movement." },
      { day: "After", title: "Memory", copy: "The trip lives on as a story guests want to share." }
    ]
  },
  {
    slug: "blog",
    navLabel: "Journal",
    seoTitle: "African Travel Journal and Safari Planning Guides",
    eyebrow: "Field notes for better travel",
    title: "Practical, beautiful travel intelligence for Africa-bound guests",
    description: "Safari planning, Nairobi arrival tips, beach pairings, hiking guides, corporate travel advice, and seasonal inspiration.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/50 to-[#6b4a2e]/50",
    primaryCta: "Explore Guides",
    secondaryCta: "Ask a Planner",
    stats: [
      { value: "SEO", label: "travel guide architecture" },
      { value: "Tips", label: "arrival and packing" },
      { value: "Season", label: "when to go" }
    ],
    narrative: "The journal is built to earn search traffic and help guests make confident decisions before they inquire.",
    highlights: ["Safari seasons", "Packing guides", "Nairobi tips", "Route ideas"],
    experiences: [
      { title: "Best Time for Masai Mara", copy: "Migration season, shoulder months, crowd strategy, and budget timing.", meta: "Safari guide" },
      { title: "JKIA Arrival Checklist", copy: "Visas, SIM cards, currency, transfers, safety, and first-night hotel advice.", meta: "Arrival guide" },
      { title: "Safari Plus Beach", copy: "How to pair wildlife drama with Diani, Watamu, Lamu, or Zanzibar.", meta: "Route guide" }
    ],
    itinerary: [
      { day: "Learn", title: "Useful answers", copy: "Articles target real traveler questions with clear, locally grounded advice." },
      { day: "Trust", title: "Visible expertise", copy: "Guides show care, experience, and planning intelligence before a sales call." },
      { day: "Convert", title: "Helpful CTA", copy: "Each article can route readers to the right service inquiry." }
    ]
  },
  {
    slug: "contact",
    navLabel: "Contact",
    seoTitle: "Contact Pride of Africa Journeys",
    eyebrow: "Begin with a message",
    title: "Tell us the Africa you want to feel",
    description: "Share your dates, travel style, group size, budget, and dream moments. Pride of Africa Journeys will shape the next step.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=82",
    gradient: "from-[#10100f] via-[#1f4d3a]/55 to-[#c6922f]/35",
    primaryCta: "Send Inquiry",
    secondaryCta: "WhatsApp Now",
    stats: [
      { value: "Fast", label: "response priority" },
      { value: "NBO", label: "Nairobi based" },
      { value: "Custom", label: "journeys built around you" }
    ],
    narrative: "The easiest way to start is simple: send a short brief. We will help clarify the route, estimate the budget, and turn your idea into a travel plan.",
    highlights: ["WhatsApp booking", "Inquiry form", "Custom quotes", "Travel planning"],
    experiences: [
      { title: "Quick WhatsApp", copy: "Best for transfers, urgent travel, and guests who already know the basics.", meta: "Fastest" },
      { title: "Custom Inquiry", copy: "Best for safari, beach, corporate, group, and multi-day journey design.", meta: "Detailed" },
      { title: "Planning Call", copy: "Best when the trip has multiple people, destinations, or moving parts.", meta: "High touch" }
    ],
    itinerary: [
      { day: "Share", title: "Your brief", copy: "Dates, destinations, group size, budget range, and trip style." },
      { day: "Shape", title: "Our proposal", copy: "Route, stays, transport, inclusions, and recommended improvements." },
      { day: "Secure", title: "Confirmation", copy: "Once aligned, we confirm suppliers and prepare your guest support channel." }
    ]
  }
];

export const testimonials = [
  {
    name: "Amina R.",
    role: "Diaspora family traveler",
    quote: "The whole trip felt personal. Airport pickup, Mara lodge, Diani extension, every handoff was calm and beautifully handled."
  },
  {
    name: "David M.",
    role: "Corporate retreat lead",
    quote: "Our executive team moved through Nairobi and Naivasha without stress. The coordination was polished and responsive."
  },
  {
    name: "Lena K.",
    role: "Honeymoon traveler",
    quote: "They understood the feeling we wanted, not just the itinerary. The safari and coast combination was unforgettable."
  }
];

export const logoConcepts = [
  { name: "Luxury PAJ Monogram", desc: "A compact mark for premium stationery, social icons, vehicle decals, and app-like UI moments." },
  { name: "Acacia Horizon Emblem", desc: "A heritage emblem referencing distance, shade, and African landscape without slipping into cliché." },
  { name: "Safari Sun Pathway Symbol", desc: "A journey mark built from sun, route, and horizon geometry for campaign use." },
  { name: "Elegant Wordmark System", desc: "A refined wordmark lockup for the website header, proposals, and formal brand touchpoints." }
];

export const trustPoints = [
  { icon: BadgeCheck, title: "Verified planning flow", copy: "Every quote clarifies route, inclusions, transfer timing, and support expectations." },
  { icon: Quote, title: "Review-ready proof", copy: "The experience architecture is built for Google reviews, referrals, and repeat guests." },
  { icon: Compass, title: "Local intelligence", copy: "Nairobi-based planning with real knowledge of seasons, roads, parks, hotels, and guest needs." }
];
