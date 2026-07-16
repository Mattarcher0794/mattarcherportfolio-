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

## BMAD Agent Names (renamed — ALWAYS use these)

The BMAD agents in this project were renamed to an "Avengers" roster (overrides in
`_bmad/custom/config.toml`). This machine has Python 3.9 and no `uv`, so BMAD's
resolver scripts can't run and the override won't resolve automatically — sessions
fall back to the default persona names in the skill files. **Ignore those defaults.
Whenever a BMAD agent is activated, referenced, or listed, present it under its
Avengers name below — never Mary/John/Winston/Sally/Amelia/Paige.**

| Skill | Use this name | Default (do NOT use) | Role |
|-------|---------------|----------------------|------|
| `bmad-agent-analyst` | **Black Widow** | ~~Mary~~ | Analyst |
| `bmad-agent-pm` | **Tony Stark** | ~~John~~ | Product Manager |
| `bmad-agent-architect` | **Bruce Banner** | ~~Winston~~ | Architect |
| `bmad-agent-ux-designer` | **Thor** | ~~Sally~~ | UX Designer |
| `bmad-agent-dev` | **JARVIS** | ~~Amelia~~ | Developer |
| `bmad-agent-tech-writer` | **Spiderman** | ~~Paige~~ | Tech Writer |

"talk to Tony Stark" = the PM, "talk to Bruce Banner" = the architect, etc.

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
Three families, all loaded via `next/font/google` in `app/layout.tsx`. Never use system fonts or generic fallbacks as primary fonts.

| Role | Font | CSS var |
|------|------|---------|
| Display / headlines / stats | Bricolage Grotesque (800) | `--display` |
| Body / labels / metadata / nav | Hanken Grotesk (400–700) | `--sans` |
| Editorial accents + section kickers (italic) | Instrument Serif | `--serif` |

**Metadata style (the "hybrid" label system).** There is no monospace font and no tracked-out uppercase labels. That combination read as AI-generated, so it was retired. Instead:
- **Section kickers** (`.section-num`) are Instrument Serif editorial: a terracotta serif number followed by an italic label, e.g. "02 Selected work". Markup is `<span className="sn-num">` plus the label text plus an optional muted `<span className="sn-sub">`.
- **Dense metadata** (case meta, tags, stat labels, timeline dates, skill headings, contact keys) is Hanken Grotesk, sentence case, with zero letter-spacing.
- The hero name (`.hero-name`) is the one deliberate exception that keeps `text-transform: uppercase`.

### Spacing
Base unit is 4px. Use Tailwind's spacing scale throughout. No arbitrary pixel values unless absolutely necessary and commented.

### Animation Rules
- Scroll-triggered reveals: `opacity 0→1` + `translateY 20px→0`, `700ms`, `cubic-bezier(.2,.7,.2,1)` (the `.reveal` / `.reveal.in` classes in `globals.css`)
- Hover transitions: `200ms ease`
- Organic "blob" shapes animate via the `blobPulse` keyframe
- **Timeline line-draw (scroll-scrub):** a moss spine fills as the timeline scrolls through the viewport and each row node ignites as the fill edge passes it. Driven by `--tl-progress` on `.tl` (set by a scroll handler in `Interactions.tsx`); the `.tl.is-scrubbing` class hands fill height and lit state over to scroll. The current role (top) ignites first, and the completed spine is the payoff.
- **Hero drift (scroll-scrub):** the hero blobs drift up and out and fade as you scroll out of the hero. Pointer parallax writes `--px`/`--py` and the scroll drift writes `--sx`/`--sy`, composed in the `.hblob` transform so the two never clobber each other. Fine-pointer plus motion only.
- **Selected Work deal-in (scroll-scrub):** each `.case` card deals itself into place (rise, alternating tilt, scale and fade, ease-out) as it scrolls into view. Scroll-scrubbed and latched per card, keyed on each card's *natural* document top (captured before transforming it, to avoid a read-your-own-transform feedback loop). `.case` is excluded from the generic `.reveal` targets so the deal owns those cards. Gentler tilt and rise on mobile.
- **Always** respect `prefers-reduced-motion`. When set, reveals resolve instantly; the cursor blob, hero parallax, hero drift, Selected Work deal-in and stat count-up are disabled; the timeline renders as a fully drawn line with every node lit; and the case cards render in their natural, fully-visible positions.
- Client-side behaviour (scroll-reveal, cursor-follow blob, hero parallax, hero drift, timeline line-draw, Selected Work deal-in, animated stat counters) is centralised in `components/ui/Interactions.tsx`, a single progressive-enhancement layer. Section components stay server-rendered and fully visible without JS. Framer Motion remains available but the Bold Merge interactions are lightweight vanilla + IntersectionObserver / scroll handlers.

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
│       └── Interactions.tsx # Client PE layer (reveal, cursor, parallax, counters, scroll-scrubs)
├── lib/
│   ├── content.ts          # ALL geo-targeted copy lives here
│   ├── caseStudies.ts      # Homepage case-study card data
│   ├── experience.ts       # Timeline / experience entries
│   └── brandLogos.tsx      # Inline monochrome SVG brand logos (currentColor) + brandSlug()
├── app/
│   ├── globals.css         # Design tokens + full class-based design system
│   └── page.tsx            # Homepage (long scroll)
├── public/
│   └── matt-archer-cv.pdf  # CV — direct download
├── proxy.ts                 # Geo-targeting (Next 16 proxy; forwards x-user-country)
└── PRD.md                  # Product-decision reference
```

> Note: case-study detail pages are **built** at `app/work/[slug]/page.tsx` (a
> single statically-generated dynamic route serving all three studies).
> `SelectedWork` and the nav Work dropdown link to `/work/<slug>`. Brand logos
> render as inline monochrome SVGs (`lib/brandLogos.tsx`), with a styled-text
> fallback for any brand without a mapped SVG.

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
| Home body copy (hero intro + 2 About paras) | `content/home-copy.json` | `lib/siteData.ts` → `getHomeCopy()` |

Rules that still hold:
- **Home body copy is CMS-editable, formatting included.** The three home
  paragraphs live in `content/home-copy.json` (Keystatic → **Home Copy**) and are
  rendered through `renderInline` (`lib/richText.tsx`): `**bold**` → `<strong>`,
  `*italic*` → `<em>`. No raw HTML is interpreted. Each field falls back to
  `DEFAULT_HOME_COPY` in `siteData.ts` if left blank, so a paragraph is never
  empty. `page.tsx` fetches it once and passes it to `Hero`/`About` as props.
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
- Data lives in `lib/caseStudies.ts`: three cards, **Lloyds Banking Group**, **Wagamama**, **HCA Healthcare** (Subway now lives in the timeline, not a headline card)
- Card must communicate the outcome without the user clicking
- **Per-card "deal-in" motion:** each card deals itself into place (rise, alternating tilt, scale and fade, ease-out) as it scrolls into view, scroll-scrubbed and latched per card (see Animation Rules). A stacked "deck of 3" was tried and rejected: at viewport-card scale the anchor card never moves and the dealing happens below the fold, so it reads as no motion. Per-card is the fit.

### Experience Timeline
- A **design moment**: three-column rows (date / role+company / projects) with a moss spine that draws down on scroll and ignites each node (see Animation Rules). Hover applies a subtle background tint, no layout shift (an earlier row-slide caused a jump and was removed).
- Current role flagged with a `· Now` marker and tinted row
- Muted / less-prominent projects use `--ink-dim` (cool ink), not `--ink-mute` (warm tan), so the column reads as one consistent hierarchy
- Data lives in `lib/experience.ts`; projects render in the Instrument Serif italic

### Brand Logos ("Good company")
- Bordered grid of cells; each cell hover-fills moss.
- **Inline monochrome SVG logos.** `lib/brandLogos.tsx` maps a brand slug (`brandSlug(name)`) to a cleaned inline SVG whose fills are flattened to `currentColor`, so each mark inherits the cell ink colour and flips to the surface colour on the moss hover. `Logos.tsx` renders the SVG via `dangerouslySetInnerHTML`; any brand without a mapped SVG falls back to its styled-text name (so the grid always renders cleanly).
- Per-brand optical sizing lives in `globals.css` via `.logo-mark[data-brand="<slug>"] svg` (wide wordmarks shorter, compact or badge marks taller) so the wall reads at even visual weight.
- Current set and order (Keystatic-editable in `content/brands.json`): AND Digital, Lloyds Banking Group (with the horse), wagamama, Subway, Edenred, HCA (HCA Healthcare UK), British Airways, McDonald's. All eight render as SVG.
- Sourcing rules: use real **vector** SVGs (Wikimedia Commons or the brand's own site), never raster PNGs, then flatten to `currentColor`. Three traps to watch: white-letters-in-a-box logos (drop the box so the letters stand alone, as with AND Digital), filled-badge logos (they become a heavier solid ink mark, as with Edenred), and Inkscape exports that draw via `<use xlink:href>` (keep the `xmlns:xlink` declaration or the logo breaks, as with HCA). EPS and .ai (which is PDF) cannot be converted in this environment; get a real SVG.

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
- Vercel Analytics is the only permitted analytics — the `<Analytics />` component from `@vercel/analytics/next` mounts once in `app/layout.tsx`. No other third-party analytics scripts.
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
- **Do not** use em dashes (`—`) or double hyphens (`--`) in user-facing copy — they read as AI-generated. Rewrite with a comma, a full stop, or a rephrase. Applies to all visible site copy: hero, about, case studies, content JSON, etc. (En dashes `–` in date ranges like `2023–present` are fine; this rule is about prose, not code comments.)
- **Do not** hardcode geo-targeted copy in components — always use `content.ts`
- **Do not** use `<img>` tags
- **Do not** introduce new dependencies without a clear reason
- **Do not** re-introduce a dark theme or a light/dark toggle — the warm Bold Merge palette is the only mode
- **Do not** add Calendly — it is not required at any version

---

## CV File

The Download CV link resolves via `getCvHref()` in `lib/siteData.ts`. It prefers a
CV uploaded through Keystatic (the **CV / Downloads** singleton → `content/downloads.json`,
files stored in `public/cv/`) and falls back to the built-in `/public/matt-archer-cv.pdf`
when none is uploaded, so the button always works. The path is fetched once in
`app/page.tsx` and passed as `cvHref` to both `Hero` and `Navigation`.

The download must always trigger a direct download via the `download` attribute, which
forces the saved filename regardless of the stored path:

```html
<a href={cvHref} download="Matt-Archer-CV.pdf">Download CV</a>
```

**Two ways to update the CV, both no-code:**
1. Upload a new PDF at `/keystatic` → **CV / Downloads** (recommended, self-service).
2. Replace `/public/matt-archer-cv.pdf` directly and commit.

---

## v2 Awareness

The following features are on the roadmap but **not in scope for v1**. Do not build them, but do not make architectural decisions that would prevent them:

- **AI Chatbot:** Will be a Claude API call via a Next.js API route (`/api/chat`). The App Router structure already supports this. No scaffolding needed now.
- **Blog / Thought leadership:** Will be MDX files or a lightweight CMS. Keep the routing structure clean.

*(Vercel Analytics has since been added — `<Analytics />` in `app/layout.tsx`. See Performance Rules.)*

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
theme, Bricolage/Instrument Serif/Hanken, hero stats, Lloyds as the
headline case study). The homepage is fully built. `PRD.md` has been refreshed
(July 2026) to match this direction; treat this CLAUDE.md as authoritative for
design/build decisions, and `PRD.md` as the product-context reference.*

*July 2026 (later session): HCA case study re-anchored on the booking transformation
(+41% online bookings, £6M+ screening revenue); home body copy (hero intro + both
About paragraphs) is now CMS-editable via the Keystatic **Home Copy** singleton with
`**bold**`/`*italic*` support (`lib/richText.tsx`); the CV is swappable via the
Keystatic **CV / Downloads** upload with a fallback; Vercel Analytics added
(`<Analytics />` in `app/layout.tsx`); em dashes banned in user-facing copy. Hero stat
counters use a fixed grid + `tabular-nums` so they no longer jitter while counting.*

*July 2026 (motion + type session): retired JetBrains Mono, so the font system is now
three families (Bricolage, Hanken, Instrument Serif). The tracked uppercase mono
microlabels were replaced by a hybrid editorial label system (Instrument Serif section
kickers plus sentence-case Hanken metadata) to remove an AI-generated tell; only the
hero name stays uppercase. Added two scroll-scrub interactions in `Interactions.tsx`: a
timeline line-draw (moss spine fills and nodes ignite on scroll) and a hero blob drift
(blobs drift out and fade as the hero leaves). Both are reduced-motion-safe and fully
static without JS.*

*July 2026 (motion + brand-logo session): shipped the Selected Work per-card
"deal-in" (each case card rises, tilts and settles as it scrolls in; scroll-
scrubbed, latched per card; a stacked deck was rejected because at card scale the
dealing happens off-screen). Timeline polish: removed the hover row-jump (now a
subtle background tint) and recoloured muted projects to `--ink-dim`. The "Good
company" wall now renders eight inline monochrome SVG logos (`lib/brandLogos.tsx`,
`currentColor`, per-brand optical sizing, styled-text fallback); Edenred replaced
Thomas Cook (order: Subway, Edenred, HCA).*

*July 2026 (case-study pages session): built the case-study detail pages at
`app/work/[slug]/page.tsx` — one statically-generated dynamic route (`dynamicParams
= false`) serving all three studies. The `work` Keystatic collection gained five
fixed narrative sections (`challenge`, `approach`, `whatWeBuilt`, `outcomes`,
`learnings`), each an object with a `body` (multiline, rendered via new
`renderBody` in `richText.tsx` — blank line = new paragraph) plus an optional
`images` array (`{ src, alt, caption }`, `src` is a plain `/public` path, not a
`fields.image`, so it is predictable to author and upgradeable later). Page anatomy:
hero (logo via `brandLogos`/`brandSlug` off the company name) → full-width metrics
panel (the card's `.case-right` promoted, two-column on desktop) → the five sections
→ Download CV + wrap-around prev/next. Sections with 3+ images render a full-bleed
art-directed "showcase band" (`.cs-showcase`: warm sand wash, first image a larger
anchor, others staggered, snap-filmstrip on mobile); 1–2 images render inline.
Wagamama + HCA are image-rich (screens in `public/images/work/`), Lloyds is
prose-only. The nav gained a pure-CSS Work dropdown (hover/`focus-within`) listing
all three studies; `Navigation` now takes a `caseStudies` prop and uses
`usePathname` so section anchors resolve to `/#work` off-homepage. Content is
first-person, no agency voice, no em dashes; drafts kept in
`docs/case-study-drafts.md`.*

*Follow-ups: mobile nav has no menu (links hidden below 720px, CV button only) so
the Work dropdown is desktop-only — a mobile menu would make case studies reachable
on mobile nav; move Keystatic image fields from path-based to `fields.image` and
switch the deployed `/keystatic` admin to GitHub storage for drag-drop CMS uploads;
experience-timeline additions from the latest CV (Edenred, McDonald's HQ). Pending
owner action: enable Web
Analytics in the Vercel dashboard for data to appear.*
