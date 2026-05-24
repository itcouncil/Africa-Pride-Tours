import { pages, services } from "@/lib/content";

export type OfferPost = {
  id: string;
  title: string;
  status: "Draft" | "Published" | "Scheduled";
  category: string;
  date: string;
  price: string;
  summary: string;
};

export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
};

export type AdminCmsState = {
  updatedAt: string;
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  pages: Array<{
    slug: string;
    title: string;
    description: string;
    status: "Live" | "Draft";
  }>;
  offers: OfferPost[];
  media: MediaAsset[];
  operations: Array<{
    id: string;
    guest: string;
    journey: string;
    stage: string;
    owner: string;
    priority: "High" | "Medium" | "Low";
    value: string;
  }>;
  knowledgeBase: Array<{
    id: string;
    question: string;
    answer: string;
    tags: string[];
    status: "Active" | "Draft";
  }>;
};

export type InquiryRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  journey: string;
  date?: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Confirmed";
};

export function defaultCmsState(): AdminCmsState {
  return {
    updatedAt: new Date().toISOString(),
    hero: {
      headline: "Where Africa Becomes an Experience",
      subheadline: "Luxury-inspired African journeys crafted with authenticity, adventure, and unforgettable memories.",
      primaryCta: "Explore Journeys",
      secondaryCta: "Book via WhatsApp"
    },
    pages: pages.map((page) => ({
      slug: page.slug,
      title: page.title,
      description: page.description,
      status: "Live"
    })),
    offers: [
      {
        id: "mara-gold-season",
        title: "Masai Mara Golden Season Escape",
        status: "Published",
        category: "Safari Offer",
        date: "2026-07-01",
        price: "From $1,240 pp",
        summary: "A refined 4-day Mara safari with private transfers, game drives, and handpicked lodge options."
      },
      {
        id: "diani-honeymoon",
        title: "Diani Honeymoon Coast Extension",
        status: "Draft",
        category: "Beach Holiday",
        date: "2026-08-15",
        price: "From $680 pp",
        summary: "Three nights of oceanfront calm after safari, built for couples who want elegance without friction."
      }
    ],
    media: [],
    operations: [
      {
        id: "POA-1042",
        guest: "Diaspora family group",
        journey: "Safari + Diani",
        stage: "Supplier confirmation",
        owner: "Travel Desk",
        priority: "High",
        value: "$8,900"
      },
      {
        id: "POA-1043",
        guest: "Corporate retreat team",
        journey: "Nairobi + Naivasha",
        stage: "Proposal sent",
        owner: "Operations",
        priority: "Medium",
        value: "$12,400"
      },
      {
        id: "POA-1044",
        guest: "Honeymoon couple",
        journey: "Mara + Zanzibar",
        stage: "New inquiry",
        owner: "Concierge",
        priority: "High",
        value: "$5,600"
      }
    ],
    knowledgeBase: [
      {
        id: "kb-safari-cost",
        question: "How much does a Kenya safari cost?",
        answer:
          "Safari pricing depends on season, park, lodge level, transport style, and group size. Pride of Africa Journeys positions around affordable luxury, so we can shape budget-aware lodge safaris, premium private safaris, honeymoon safaris, and group safari packages. The fastest way to quote accurately is to share dates, number of guests, preferred parks, and comfort level.",
        tags: ["safari", "price", "cost", "budget", "quote"],
        status: "Active"
      },
      {
        id: "kb-airport-transfer",
        question: "Do you provide Nairobi airport transfers?",
        answer:
          "Yes. We provide JKIA and Wilson Airport transfers with flight tracking, meet-and-greet coordination, hotel drop-offs, executive cars, group vans, safari connections, and WhatsApp support.",
        tags: ["airport", "transfer", "jkia", "wilson", "nairobi"],
        status: "Active"
      },
      {
        id: "kb-payment-booking",
        question: "How do I book a trip?",
        answer:
          "Start by sending your travel dates, destinations, group size, budget range, and must-have experiences. We clarify the route, prepare a proposal, confirm suppliers, then guide you through payment and guest support setup.",
        tags: ["book", "booking", "payment", "confirm", "quote"],
        status: "Active"
      },
      {
        id: "kb-services",
        question: "What services does Pride of Africa Journeys offer?",
        answer:
          "We offer safari packages, airport transfers, hotel booking, car hire, corporate travel, group tours, hiking adventures, beach holidays, and private tour guiding across Kenya and East Africa.",
        tags: ["services", "safari", "hotel", "car hire", "corporate", "groups", "beach", "hiking"],
        status: "Active"
      }
    ]
  };
}

export function serviceOptions() {
  return services.map((service) => service.title);
}
