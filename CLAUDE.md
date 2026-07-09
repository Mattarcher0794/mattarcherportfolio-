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

> **Adopted direction: "Bold Merge" (Direction 03B).** As of July 2026 the site
> uses a warm, light editorial palette — not the earlier dark theme. The full,
> class-based design system lives in `app/globals.css`; components emit those
> semantic class names (`.hero`, `.case`, `.tl-row`, etc.) rather than
> re-deriving styles. Always use CSS custom properties for colour — never
> hardcode hex values in components.

### Colours

```css
--bg: #F7EDE4;          /* warm ivory page background */
--surface: #FFFCF9;     /* cards / raised surfaces */
--ink: #241D2E;         /* primary text + dark panels */
--ink-2: #3C3248;
--ink-dim: #544869;
--ink-mute: #9C7E62;
--rule: rgba(60,50,72,0.14);
--rule-2: rgba(60,50,72,0.22);
--peach: #DDA688;       /* soft accent / blobs */
--sand: #E8C9AE;        /* hover fill */
--moss: #6B7A4F;        /* primary action accent */
--moss-deep: #566740;
--terracotta: #B5654A;  /* editorial serif accent */
--terracotta-soft: rgba(181,101,74,0.1);
```

These are defined in `app/globals.css` (`:root`), with a subset exposed to
Tailwind via `@theme inline`. There is no `tailwind.config.ts` — this project
uses Tailwind v4's CSS-first config.

### Typography
All fonts loaded via `next/font/google` in `app/layout.tsx`. Never use system fonts or generic fallbacks as primary fonts.

| Role | Font | CSS var |
|------|------|---------|
| Display / headlines / stats | Bricolage Grotesque (800) | `--display` |
| Body / labels / nav | Hanken Grotesk (400–700) | `--sans` |
| Editorial accents (italic) | Instrument Serif | `--serif` |
| Mono / tags / metadata | JetBrains Mono | `--mono` |

### Spacing
Base unit is 4px. Use Tailwind's spacing scale throughout. No arbitrary pixel values unless absolutely necessary and commented.

### Animation Rules
- Scroll-triggered reveals: `opacity 0→1` + `translateY 20px→0`, `700ms`, `cubic-bezier(.2,.7,.2,1)` (the `.reveal` / `.reveal.in` classes in `globals.css`)
- Hover transitions: `200ms ease`
- Organic "blob" shapes animate via the `blobPulse` keyframe
- **Always** respect `prefers-reduced-motion` — when set, reveals resolve instantly and the cursor blob, hero parallax and stat count-up are disabled
- Client-side behaviour (scroll-reveal, cursor-follow blob, hero parallax, animated stat counters) is centralised in `components/ui/Interactions.tsx`, a single progressive-enhancement layer. Section components stay server-rendered and fully visible without JS. Framer Motion remains available but the Bold Merge interactions are lightweight vanilla + IntersectionObserver.

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
│   │   ├── Navigation.tsx   # Fixed nav with scroll-border state
│   │   └── Footer.tsx
│   ├── sections/           # Homepage sections (server components)
│   │   ├── Hero.tsx         # Reads geo; hero stats + blobs
│   │   ├── Marquee.tsx      # Scrolling brand ticker
│   │   ├── About.tsx
│   │   ├── SelectedWork.tsx # Maps lib/caseStudies.ts
│   │   ├── Skills.tsx
│   │   ├── Timeline.tsx     # Maps lib/experience.ts
│   │   ├── Logos.tsx
│   │   └── Contact.tsx      # Reads geo
│   └── ui/
│       └── Interactions.tsx # Client PE layer (reveal, cursor, parallax, counters)
├── lib/
│   ├── content.ts          # ALL geo-targeted copy lives here
│   ├── caseStudies.ts      # Homepage case-study card data
│   └── experience.ts       # Timeline / experience entries
├── app/
│   ├── globals.css         # Design tokens + full class-based design system
│   └── page.tsx            # Homepage (long scroll)
├── public/
│   └── matt-archer-cv.pdf  # CV — direct download
├── proxy.ts                 # Geo-targeting (Next 16 proxy; forwards x-user-country)
└── PRD.md                  # Product-decision reference
```

> Note: case-study detail pages (`app/work/<slug>/page.tsx`) and their
> components are **not yet built** — `SelectedWork` links to `/work/<slug>`.
> Brand logos are currently rendered as styled text (no SVG assets yet).

---

## Geo-Targeting

This is a **privacy-critical feature**. Matt's current employer must not see AU-targeted content.

### How it works
`proxy.ts` (Next.js 16 renamed middleware → proxy) reads Vercel's
`x-vercel-ip-country` request header and forwards it as `x-user-country` **on the
request headers** (via `NextResponse.next({ request: { headers } })`) so server
components can read it through `headers()`. Setting it only on the response is
invisible server-side — a subtle bug to avoid.

### Content
**All geo-targeted copy lives in `/lib/content.ts` only.** Never hardcode geo-specific strings in components. Always import from `content.ts`.

```typescript
// proxy.ts — pattern to follow
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') ?? 'DEFAULT'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-country', country)
  return NextResponse.next({ request: { headers: requestHeaders } })
}
```

### Fallback rule
If geo detection fails or country is unknown → always serve the DEFAULT (UK) version. Never serve the AU version by accident.

---

## Content Architecture

**Content is managed via Keystatic** (git-backed, `keystatic.config.ts`) — see
`docs/architecture.md` for the rationale. Content lives as JSON in `content/`
(edited through the `/keystatic` admin UI, committed to the repo) and is read at
**build time** via `@keystatic/core/reader` (`lib/reader.ts`). The `lib/*.ts`
files are now the **typed read layer**, not the data itself.

| Content | File(s) | Read via |
|---------|---------|----------|
| Geo copy (AU/DEFAULT) | `content/site-copy.json` | `lib/content.ts` → `getContent(country)` |
| Case studies | `content/work/*.json` | `lib/caseStudies.ts` → `getCaseStudies()` |
| Experience | `content/experience/*.json` | `lib/experience.ts` → `getExperience()` |
| Hero stats, Skills, Brands | `content/{hero-stats,skills,brands}.json` | `lib/siteData.ts` |

Rules that still hold:
- **Data-only Keystatic entries are single `.json` files** (`content/work/wagamama.json`),
  not `<slug>/index.json` directories.
- **Reader functions are async** — the section components that consume them are
  async server components. Never fetch content on the client.
- **Geo logic stays in code.** `getContent` picks AU vs DEFAULT and enforces the
  fail-safe-to-UK rule; the CMS only stores the two copy sets as `default` + `au`
  field groups. The privacy guarantee never lives in the CMS.
- Updating copy/metrics: edit in `/keystatic` (or the JSON directly) → commit →
  redeploy. No component edits.

> **Deploy note:** the admin runs in Keystatic `local` mode (edits files on disk).
> For the *deployed* admin at `mattarcher.me/keystatic`, switch `storage` to
> `github` in `keystatic.config.ts` and connect the GitHub app — a follow-up that
> needs the owner's GitHub authorisation.

---

## Component Rules

1. **TypeScript always.** Every component has explicit prop types. No `any`.

2. **Custom-first.** Build components from scratch using the `globals.css` design-system classes + CSS variables (Tailwind utilities are fine for one-off layout). Do not reach for a UI library to solve a visual problem.

3. **shadcn/ui is permitted** for headless behaviour primitives (buttons, dialogs, etc.) — but restyle them completely to match the design system. Never use shadcn defaults.

4. **21st.dev components are permitted** — evaluate each for aesthetic fit with this design system before using.

5. **No inline styles.** Use Tailwind classes or CSS custom properties only.

6. **No raw `<img>` tags.** Always `next/image`.

7. **No raw `<a>` tags for internal links.** Always Next.js `<Link>`.

8. **One component per file.** Keep components focused and single-purpose.

9. **Co-locate component logic.** Hooks and helpers used only by one component live in the same file or a sibling file.

10. **One mode only — the warm light "Bold Merge" theme.** No light/dark toggle, no `dark:` variants. The site is always the ivory palette above. (This supersedes the project's original dark-only direction.)

---

## Section-by-Section Build Rules

### Hero
- Big uppercase name in Bricolage, "Archer." accented in terracotta
- Geo-targeted pill (`heroTag`) + role line with geo-targeted location (`heroLocation`)
- **Four animated stat counters** are part of the hero (Lloyds £5.8M, Wagamama 1M+, HCA 30%, 9+ yrs). Counters animate on load, respect reduced motion, and render their final value server-side for no-JS. *(This reverses the original "no stats in hero" rule — Bold Merge leads with proof.)*
- Positioning line + supporting paragraph in the two-column `hero-bottom`
- Two CTAs: "View my work" (scroll to #work) and "Download CV" (direct PDF)
- Organic peach/terracotta blobs with pointer parallax

### Case Study Cards
- Two-panel card: left = index, company, headline (serif accent on the emphasised clause), description, tags, "Read case study"; right = a bold metrics panel (`dominant` figure + caption + two secondary stats)
- Panel colour rotates per card via `panelVariant`: `ink` / `moss` / `peach`
- Data lives in `lib/caseStudies.ts` — three cards: **Lloyds Banking Group**, **Wagamama**, **HCA Healthcare** (Subway now lives in the timeline, not a headline card)
- Card must communicate the outcome without the user clicking

### Experience Timeline
- A **design moment** — three-column rows (date / role+company / projects), hover slides the row and grows a moss node
- Current role flagged with a `· NOW` marker and tinted row
- Data lives in `lib/experience.ts`; projects render in the Instrument Serif italic

### Brand Logos
- Bordered grid of cells; brand name styled in Bricolage, hover fills moss
- Currently rendered as **styled text** (SVG assets are a follow-up)
- Logos: Lloyds Banking Group, Wagamama, HCA, Subway, British Airways, AND Digital

### Skills Section
- AI-assisted product development must be explicitly listed — the `GenAI product development` pill gets the serif-italic `.ai` accent treatment
- Three columns: Product craft / AI & methods / Industry
- No percentage bars, no star ratings — clean tag/pill components only

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
- **Do not** write case study content in third person or agency voice
- **Do not** use the word "passionate" anywhere on the site
- **Do not** hardcode geo-targeted copy in components — always use `content.ts`
- **Do not** use `<img>` tags
- **Do not** introduce new dependencies without a clear reason
- **Do not** re-introduce a dark theme or a light/dark toggle — the warm Bold Merge palette is the only mode
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

*Last updated: July 2026 — adopted the "Bold Merge" design direction (warm light
theme, Bricolage/Instrument Serif/Hanken/JetBrains Mono, hero stats, Lloyds as the
headline case study). The homepage is fully built. `PRD.md` predates this pivot and
still describes the earlier dark direction — treat this CLAUDE.md as authoritative
for design/build decisions until the PRD is refreshed. Follow-ups: case-study detail
pages, SVG brand logos, PRD refresh.*
