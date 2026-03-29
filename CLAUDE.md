# CLAUDE.md — Matt Archer Portfolio
# Project intelligence for Claude Code. Read this before writing a single line of code.

---

## Who This Is For

This is the personal portfolio website of **Matt Archer**, Principal Product Manager at AND Digital, London. The site is being built to support a career move to Sydney, Australia (arriving September 2026) and to generate consulting and senior PM opportunities in both the UK and Australian markets.

The full product spec lives in `PRD.md` at the root of this repo. Read it. Every decision in this CLAUDE.md flows from that document.

---

## The One Rule That Overrides Everything

**This site must not look AI-generated.**

Every component, every layout decision, every typographic choice must feel like it was made by a person with exceptional taste. Generic aesthetics — predictable layouts, overused fonts, purple gradients, cookie-cutter card components — are a failure state. When in doubt, make a bolder, more considered choice.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript — always, no exceptions |
| Styling | Tailwind CSS v3 + CSS custom properties for design tokens |
| Animation | Framer Motion |
| Fonts | next/font/google only — never load fonts via a `<link>` tag |
| Images | next/image only — never a raw `<img>` tag |
| Deployment | Vercel |
| Geo-targeting | Vercel Edge Middleware (`request.geo.country`) |

**Never introduce a dependency without a clear reason.** If you're reaching for a library, ask: can this be done with Tailwind + Framer Motion + a clean component? Usually yes.

---

## Design System

### Colours
Always use CSS custom properties. Never hardcode hex values in components.

```css
--color-bg: #0F0F0E;
--color-surface: #1A1A18;
--color-border: #2A2A28;
--color-text-primary: #F2EFE8;
--color-text-secondary: #A09D96;
--color-accent: #C9A96E;
--color-accent-subtle: rgba(201, 169, 110, 0.1);
```

These must be defined in `globals.css` and extended in `tailwind.config.ts`.

### Typography
All fonts loaded via `next/font/google`. Never use system fonts or generic fallbacks as primary fonts.

| Role | Font | Weights |
|------|------|---------|
| Display / hero headlines | Cormorant Garamond | 300, 600 |
| Section headings | Cormorant Garamond | 600 |
| Body | DM Sans | 300, 400 |
| Labels / tags / nav | DM Sans | 500 |
| Stats / metrics | DM Mono | 400 |

### Spacing
Base unit is 4px. Use Tailwind's spacing scale throughout. No arbitrary pixel values unless absolutely necessary and commented.

### Animation Rules
- All scroll-triggered reveals: `opacity 0→1` + `translateY 20px→0`, duration `600ms`, easing `ease-out`
- Stagger sibling elements: `100ms` delay between each
- Hover transitions: `200ms ease`
- Page transitions: `300ms fade`
- **Always** check `prefers-reduced-motion` — if set, disable all animations
- Use Framer Motion's `useReducedMotion()` hook

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage (long scroll)
│   ├── work/
│   │   ├── wagamama-soul-club/page.tsx
│   │   ├── hca-healthcare/page.tsx
│   │   └── subway/page.tsx
│   └── not-found.tsx       # 404 page
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/           # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SelectedWork.tsx
│   │   ├── Skills.tsx
│   │   ├── Timeline.tsx
│   │   ├── Logos.tsx
│   │   └── Contact.tsx
│   ├── work/               # Case study page components
│   │   ├── CaseStudyHero.tsx
│   │   ├── CaseStudyMetrics.tsx
│   │   └── CaseStudyNav.tsx
│   └── ui/                 # Primitives (buttons, tags, etc.)
│       ├── Button.tsx
│       └── Tag.tsx
├── lib/
│   ├── content.ts          # ALL geo-targeted copy lives here
│   └── caseStudies.ts      # All case study data lives here
├── public/
│   ├── matt-archer-cv.pdf  # CV — direct download
│   └── logos/              # Brand logo SVGs (monochrome)
├── middleware.ts            # Geo-targeting logic
├── globals.css             # CSS custom properties + base styles
├── tailwind.config.ts      # Design tokens extended into Tailwind
└── PRD.md                  # Source of truth for all product decisions
```

---

## Geo-Targeting

This is a **privacy-critical feature**. Matt's current employer must not see AU-targeted content.

### How it works
`middleware.ts` reads `request.geo.country` (Vercel built-in). It sets a cookie or header that the page reads server-side to determine which content variant to serve.

### Content
**All geo-targeted copy lives in `/lib/content.ts` only.** Never hardcode geo-specific strings in components. Always import from `content.ts`.

```typescript
// middleware.ts — pattern to follow
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'DEFAULT'
  const response = NextResponse.next()
  response.headers.set('x-user-country', country)
  return response
}
```

### Fallback rule
If geo detection fails or country is unknown → always serve the DEFAULT (UK) version. Never serve the AU version by accident.

---

## Content Architecture

### `/lib/content.ts`
Single source of truth for geo-targeted copy. When copy needs updating, **only this file changes** — no component edits required.

```typescript
export type GeoVariant = 'AU' | 'DEFAULT'

export const content: Record<GeoVariant, SiteContent> = {
  AU: {
    heroPositioningLine: "Principal PM based in London. Relocating to Sydney, September 2026 — open to conversations now.",
    aboutCTA: "I'm relocating to Sydney in September 2026 and actively talking to teams about what's next. If you're building something worth working on, I'd love to hear about it.",
    contactHeadline: "Let's talk Sydney.",
    contactSubline: "I'm relocating to Sydney in September 2026. Happy to connect now ahead of arrival.",
    metaDescription: "Principal PM relocating to Sydney, September 2026. Led Wagamama Soul Club, HCA Healthcare, Subway. Open to conversations now.",
  },
  DEFAULT: {
    heroPositioningLine: "Principal PM leading product and design teams across consumer, health, and enterprise.",
    aboutCTA: "Based in London. Open to senior PM roles and consulting engagements.",
    contactHeadline: "Let's work together.",
    contactSubline: "Whether you're looking for a senior PM or a consulting partner, I'd love to hear what you're building.",
    metaDescription: "Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London.",
  }
}
```

### `/lib/caseStudies.ts`
All case study data as typed TypeScript objects. Case study pages import from here — no hardcoded content in page components.

---

## Component Rules

1. **TypeScript always.** Every component has explicit prop types. No `any`.

2. **Custom-first.** Build components from scratch using Tailwind + CSS variables. Do not reach for a UI library to solve a visual problem.

3. **shadcn/ui is permitted** for headless behaviour primitives (buttons, dialogs, etc.) — but restyle them completely to match the design system. Never use shadcn defaults.

4. **21st.dev components are permitted** — evaluate each for aesthetic fit with this design system before using.

5. **No inline styles.** Use Tailwind classes or CSS custom properties only.

6. **No raw `<img>` tags.** Always `next/image`.

7. **No raw `<a>` tags for internal links.** Always Next.js `<Link>`.

8. **One component per file.** Keep components focused and single-purpose.

9. **Co-locate component logic.** Hooks and helpers used only by one component live in the same file or a sibling file.

10. **Dark mode is the only mode.** No light/dark toggle. No `dark:` Tailwind variants needed — the site is always dark.

---

## Section-by-Section Build Rules

### Hero
- No vanity stats or metric callouts in the hero
- The hero communicates who Matt is, not what he's achieved — outcomes live in the case study cards
- One clear positioning line (geo-targeted), one intro sentence weaving in AI fluency naturally
- Two CTAs: "View my work" (smooth scroll to #work) and "Download CV" (direct PDF download)
- Subtle animated scroll indicator at bottom

### Case Study Cards
- Always show: company logo, project name, one-line description, outcome stats (3 max), industry tags
- Logo treatment: full colour logo on dark surface, clean and simple
- Stats must be immediately readable — use DM Mono, accent colour for numbers
- Card must communicate the outcome without the user clicking

### Experience Timeline
- This is a **design moment** — it must be beautiful, not just functional
- Vertical layout, year markers, animated on scroll
- Each entry: company, title, date range, 1–2 sentence context (no bullet points)
- Key projects nested under roles (Wagamama, HCA under Principal PM)
- Accent colour used on timeline nodes or line — deliberate, not decorative

### Brand Logos
- Monochrome / reduced opacity treatment on dark background
- SVG format only (no rasterised PNGs)
- Logos: Wagamama, HCA Healthcare, Subway, British Airways, Thomas Cook, AND Digital
- Mobile: wraps to 2 rows naturally

### Skills Section
- AI-assisted product development must be explicitly listed — not buried
- Organised into two groups: Skills and Industries
- No percentage bars, no star ratings — these are patronising and inaccurate
- Use clean tag/pill components

### Contact Section
- Simple. No form in v1.
- Email as a clickable `mailto:` link
- LinkedIn as a button
- Geo-targeted headline and subline (from content.ts)

---

## Case Study Page Rules

- Written from Matt's **personal perspective** — not an agency case study
- First person throughout: "When I joined this project...", "I decided...", "We launched..."
- No AND Digital marketing language
- Section labels exactly as specified:
  - "The Challenge" ✓
  - "Approach" ✓ (not "My Approach")
  - "What We Built" ✓
  - "Outcomes" ✓
  - "Learnings" ✓ (not "What I Learned")
- Metrics displayed beautifully — consider a dedicated metrics block component (DM Mono, large, accent-coloured numbers)
- Company logo visible in the case study hero
- Persistent Download CV CTA at bottom of every case study page
- Previous / Next case study navigation at the bottom

---

## Performance Rules

- Every image must use `next/image` with explicit `width` and `height` or `fill` + a sized container
- Fonts loaded once in `app/layout.tsx` via `next/font/google` — never loaded again in child components
- No third-party analytics scripts in v1
- Target Lighthouse score: 90+ across all four categories
- Target load time: <2 seconds on simulated 4G mobile

---

## SEO Rules

- `app/layout.tsx` sets base metadata
- Each page overrides with its own `generateMetadata()` function
- Open Graph tags on every page
- Geo-targeted meta descriptions served server-side (not client-side)
- `next-sitemap` generates sitemap automatically on build
- Canonical URL: `https://mattarcher.me`

---

## What Not to Do

- **Do not** use `Inter`, `Roboto`, `Arial`, or any system font as a primary typeface
- **Do not** use purple gradients or generic hero backgrounds
- **Do not** use percentage bars or star ratings for skills
- **Do not** put metric callouts in the hero section
- **Do not** write case study content in third person or agency voice
- **Do not** use the word "passionate" anywhere on the site
- **Do not** hardcode geo-targeted copy in components — always use `content.ts`
- **Do not** use `<img>` tags
- **Do not** introduce new dependencies without a clear reason
- **Do not** create a light mode
- **Do not** add Calendly — it is not required at any version

---

## CV File

The CV PDF lives at `/public/matt-archer-cv.pdf`. The download button must trigger a direct download using the `download` attribute on the anchor:

```html
<a href="/matt-archer-cv.pdf" download="Matt-Archer-CV.pdf">Download CV</a>
```

Updating the CV requires only replacing the PDF file — no code changes.

---

## v2 Awareness

The following features are on the roadmap but **not in scope for v1**. Do not build them, but do not make architectural decisions that would prevent them:

- **AI Chatbot:** Will be a Claude API call via a Next.js API route (`/api/chat`). The App Router structure already supports this. No scaffolding needed now.
- **Blog / Thought leadership:** Will be MDX files or a lightweight CMS. Keep the routing structure clean.
- **Vercel Analytics:** Will be added in v1.5. Don't add it now, but don't do anything that blocks it.

---

## Definition of Done (per component)

Before considering any component complete, verify:

- [ ] TypeScript — no `any`, all props typed
- [ ] Renders correctly on mobile (375px) and desktop (1440px)
- [ ] Uses CSS custom properties for all colours
- [ ] Uses `next/font` fonts (not system fonts)
- [ ] Framer Motion animations respect `prefers-reduced-motion`
- [ ] No hardcoded geo-targeted copy — imports from `content.ts`
- [ ] Lighthouse score not degraded (check after major additions)
- [ ] No `<img>` tags — `next/image` only
- [ ] No inline styles

---

## Getting Started (First Session Checklist)

If this is the first Claude Code session on this project, do this in order:

1. Scaffold Next.js 14 with TypeScript and Tailwind: `npx create-next-app@latest . --typescript --tailwind --app --src-dir no`
2. Install Framer Motion: `npm install framer-motion`
3. Install next-sitemap: `npm install next-sitemap`
4. Set up `globals.css` with CSS custom properties (colour tokens above)
5. Update `tailwind.config.ts` to extend theme with design tokens
6. Create `/lib/content.ts` with geo-targeted copy config
7. Create `/lib/caseStudies.ts` with typed case study data
8. Create `middleware.ts` with geo-detection logic
9. Build Navigation component
10. Build Hero section
11. Commit everything to GitHub before moving to the next section

Do not skip steps. Do not build multiple sections in one session without committing.

---

*Last updated: March 2026. Source of truth for all product decisions: `PRD.md`.*
