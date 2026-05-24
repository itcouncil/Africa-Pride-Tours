# Pride of Africa Journeys

Premium multipage African tours and travel platform for a Nairobi-based travel brand.

## Included

- Next.js app router with TypeScript
- Tailwind CSS design system
- Framer Motion page and reveal animation
- GSAP-ready dependency set
- Lenis smooth scrolling
- Cinematic responsive page system for all requested routes
- Luxury logo suite in `public/brand/logo-suite.svg`
- SEO metadata, Open Graph card, robots, and sitemap
- WhatsApp integration and inquiry API
- Intelligent travel chatbot with knowledge-base retrieval and optional OpenAI Responses API reasoning
- Local image fallbacks plus optimized remote travel imagery

## Routes

`/home`, `/about`, `/safaris`, `/airport-transfers`, `/beach-holidays`, `/hiking-adventures`, `/corporate-travel`, `/group-tours`, `/gallery`, `/testimonials`, `/blog`, `/contact`

## Run Locally

```powershell
.\start.ps1
```

Then open:

```text
http://127.0.0.1:3000/home
```

## Build

```powershell
npm run build
```

The build script uses Next.js webpack mode because the local Windows runtime blocks Turbopack worker spawning in this environment.

## Chatbot Intelligence

The chatbot works out of the box with the local Pride of Africa knowledge base. For model-powered reasoning in production, set:

```text
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-5-mini
```

Without `OPENAI_API_KEY`, the assistant still answers from the website pages, services, offers, testimonials, operations policy, and admin-managed chatbot knowledge base.
