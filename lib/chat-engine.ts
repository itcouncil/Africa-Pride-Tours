import { readCmsState } from "@/lib/admin-store";
import { pages, services, testimonials, whatsappNumber } from "@/lib/content";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAnswer = {
  answer: string;
  confidence: number;
  sources: string[];
  intent: "booking" | "support" | "knowledge" | "handoff";
  suggestedQuestions: string[];
  whatsappUrl: string;
};

type KnowledgeDoc = {
  id: string;
  title: string;
  body: string;
  source: string;
  tags: string[];
};

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "do",
  "does",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "we",
  "what",
  "when",
  "where",
  "with",
  "you",
  "your"
]);

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 2 && !stopWords.has(item));
}

function includesAny(input: string, terms: string[]) {
  const normalized = input.toLowerCase();
  return terms.some((term) => normalized.includes(term));
}

function scoreDoc(queryTokens: string[], doc: KnowledgeDoc) {
  const haystack = `${doc.title} ${doc.body} ${doc.tags.join(" ")}`.toLowerCase();
  const title = doc.title.toLowerCase();

  return queryTokens.reduce((score, token) => {
    if (title.includes(token)) return score + 5;
    if (doc.tags.some((tag) => tag.toLowerCase().includes(token))) return score + 4;
    if (haystack.includes(token)) return score + 2;
    return score;
  }, 0);
}

async function buildKnowledgeBase(): Promise<KnowledgeDoc[]> {
  const cms = await readCmsState();
  const docs: KnowledgeDoc[] = [];

  for (const page of pages) {
    docs.push({
      id: `page-${page.slug}`,
      title: page.title,
      source: `/${page.slug}`,
      tags: [page.navLabel, page.slug, ...page.highlights],
      body: [
        page.description,
        page.narrative,
        ...page.experiences.map((experience) => `${experience.title}: ${experience.copy}`),
        ...page.itinerary.map((item) => `${item.title}: ${item.copy}`)
      ].join(" ")
    });
  }

  for (const service of services) {
    docs.push({
      id: `service-${service.title}`,
      title: service.title,
      source: service.href,
      tags: [service.title, "service", "travel"],
      body: service.copy
    });
  }

  for (const offer of cms.offers.filter((item) => item.status !== "Draft")) {
    docs.push({
      id: `offer-${offer.id}`,
      title: offer.title,
      source: "Events & Offers",
      tags: [offer.category, offer.status, "offer", "event", "deal"],
      body: `${offer.summary} ${offer.price} Available from ${offer.date}.`
    });
  }

  for (const item of (cms.knowledgeBase || []).filter((entry) => entry.status === "Active")) {
    docs.push({
      id: item.id,
      title: item.question,
      source: "Knowledge Base",
      tags: item.tags,
      body: item.answer
    });
  }

  for (const testimonial of testimonials) {
    docs.push({
      id: `review-${testimonial.name}`,
      title: `Guest review from ${testimonial.name}`,
      source: "Testimonials",
      tags: ["review", "trust", testimonial.role],
      body: testimonial.quote
    });
  }

  docs.push(
    {
      id: "policy-response",
      title: "Response time and booking support",
      source: "Operations Policy",
      tags: ["response", "support", "whatsapp", "urgent"],
      body: "Pride of Africa Journeys prioritizes fast WhatsApp response, practical planning support, and real-time coordination for transfers, safaris, groups, and corporate travel."
    },
    {
      id: "policy-location",
      title: "Business location and service area",
      source: "Business Profile",
      tags: ["nairobi", "kenya", "location", "east africa"],
      body: "The business is based in Nairobi, Kenya and serves international tourists, diaspora travelers, corporate travelers, honeymooners, adventure seekers, local tourists, students, and groups."
    }
  );

  return docs;
}

function detectIntent(question: string): ChatAnswer["intent"] {
  if (includesAny(question, ["book", "booking", "reserve", "quote", "price", "cost", "availability", "available", "pay", "payment"])) {
    return "booking";
  }

  if (includesAny(question, ["problem", "late", "cancel", "refund", "change", "support", "urgent", "flight delayed"])) {
    return "support";
  }

  return "knowledge";
}

function createAnswer(question: string, matches: KnowledgeDoc[], confidence: number, intent: ChatAnswer["intent"]) {
  const primary = matches[0];
  const secondary = matches.slice(1, 3);

  if (!primary || confidence < 12) {
    return [
      "I can help with safaris, airport transfers, beach holidays, hiking, corporate travel, group tours, hotel booking, car hire, and tour guiding.",
      "For the most accurate answer, share your travel dates, number of guests, destination, budget range, and the experience you want. If this is urgent, WhatsApp is the fastest route to the travel desk."
    ].join("\n\n");
  }

  const lead = intent === "booking"
    ? "Yes, I can help you plan or price that."
    : intent === "support"
      ? "I can help route this to the right travel support flow."
      : "Here is the best answer from the Pride of Africa knowledge base.";

  const supporting = secondary.length
    ? `\n\nRelated context: ${secondary.map((doc) => `${doc.title} (${doc.source})`).join("; ")}.`
    : "";

  return `${lead}\n\n${primary.body}${supporting}\n\nTo turn this into a real quote, send dates, guest count, travel style, and budget range.`;
}

async function generateModelAnswer(question: string, history: ChatMessage[], matches: KnowledgeDoc[], intent: ChatAnswer["intent"]) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || !matches.length) {
    return null;
  }

  const context = matches
    .map((doc, index) => `Source ${index + 1}: ${doc.title}\nLocation: ${doc.source}\n${doc.body}`)
    .join("\n\n");
  const recentHistory = history
    .slice(-6)
    .map((message) => `${message.role}: ${message.content}`)
    .join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        instructions:
          "You are Pride AI, the concierge chatbot for Pride of Africa Journeys in Nairobi, Kenya. Answer client travel questions warmly, accurately, and commercially. Use only the supplied knowledge context for company-specific facts. If exact availability, pricing, visas, medical, legal, or safety-critical certainty is needed, say a human travel planner should confirm. Always move booking-ready guests toward WhatsApp with dates, guest count, budget, and destination details.",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Intent: ${intent}\n\nRecent conversation:\n${recentHistory || "None"}\n\nKnowledge context:\n${context}\n\nClient question:\n${question}`
              }
            ]
          }
        ],
        max_output_tokens: 420,
        store: false
      })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const directText = typeof data.output_text === "string" ? data.output_text : "";
    const outputText =
      directText ||
      (data.output || [])
        .flatMap((item: { content?: Array<{ text?: string; type?: string }> }) => item.content || [])
        .map((item: { text?: string }) => item.text || "")
        .join("")
        .trim();

    return outputText || null;
  } catch {
    return null;
  }
}

export async function answerTravelQuestion(question: string, history: ChatMessage[] = []): Promise<ChatAnswer> {
  const query = [question, ...history.slice(-3).map((message) => message.content)].join(" ");
  const tokens = tokenize(query);
  const docs = await buildKnowledgeBase();
  const scored = docs
    .map((doc) => ({ doc, score: scoreDoc(tokens, doc) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const matches = scored.slice(0, 4).map((item) => item.doc);
  const confidence = Math.min(100, scored.slice(0, 4).reduce((sum, item) => sum + item.score, 0) * 4);
  const intent = detectIntent(question);
  const modelAnswer = await generateModelAnswer(question, history, matches, intent);
  const answer = modelAnswer || createAnswer(question, matches, confidence, intent);
  const whatsappText = [
    "Hello Pride of Africa Journeys, I was chatting with the website assistant.",
    `My question: ${question}`,
    "Please help me plan the next step."
  ].join("\n");

  return {
    answer,
    confidence,
    sources: matches.map((doc) => doc.source).filter((source, index, list) => list.indexOf(source) === index),
    intent: confidence < 12 ? "handoff" : intent,
    suggestedQuestions: [
      "How much is a 4-day Masai Mara safari?",
      "Can you pick me from JKIA airport?",
      "What is the best safari and beach combination?",
      "Can you plan a corporate retreat?"
    ],
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`
  };
}
