---
title: "Matt Archer Portfolio — Product Requirements (Bold Merge)"
status: living
created: 2026-07-09
updated: 2026-07-16
---

# PRD: Matt Archer Portfolio

## 0. Document Purpose

This PRD defines the product requirements for **mattarcher.me**, the personal
portfolio site of Matt Archer, Principal Product Manager. It reflects the
**"Bold Merge" (Direction 03B)** design direction adopted July 2026, which
supersedes the earlier dark-theme concept.

**Authority note.** `CLAUDE.md` is the authoritative *design & build* spec
(palette, typography, component rules, geo pattern). This PRD owns *product*
decisions — audience, goals, scope, success. Where the two touch design, defer
to CLAUDE.md. The homepage is already built and shipped on the Bold Merge design;
this document also records remaining scope so downstream planning (UX,
architecture, epics/stories) has a single product reference.

**Stack (for context; build details in CLAUDE.md):** Next.js 16 (App Router),
TypeScript, Tailwind v4 (CSS-first, no config file), Keystatic (git-backed CMS,
content in `content/*.json`), Framer Motion plus a lightweight vanilla scroll /
IntersectionObserver enhancement layer, deployed on Vercel. Live at
**mattarcher.me**. As of July 2026 the homepage is fully built and shipped,
including the scroll-scrub motion language and the monochrome SVG brand wall.

---

## 1. Vision

A portfolio that reads as though it were made by a person with exceptional taste
— not an AI template — and converts the right visitor into a conversation. It
positions Matt as a Principal PM who ships high-impact products at scale across
B2C and B2B, now building with AI, and who is relocating to Sydney (Sept 2026)
while remaining open to senior roles and consulting in both the UK and Australia.

The site leads with **proof** (measured outcomes at Lloyds, Wagamama, HCA) and a
distinctive warm, editorial aesthetic, so that a hiring manager or founder skims
it in 30 seconds and comes away with: *this person is credible, current, and
worth talking to.*

**The overriding constraint:** the site must not look AI-generated. Generic
layouts, overused fonts, and cookie-cutter components are failure states.

---

## 2. Target User

Three primary audiences, in priority order:

1. **AU hiring leaders & founders** (Sydney/NSW) — the relocation market. Hiring
   Principal/Head-of-Product roles, or founders needing senior product help.
2. **UK hiring leaders & founders** — near-term roles and consulting while still
   London-based.
3. **Consulting / fractional leads** (both markets) — evaluating Matt for
   engagement rather than employment.

Secondary: recruiters and Matt's professional network (referrers).

**Privacy-critical boundary:** Matt's current employer must **not** see
AU-relocation-targeted messaging. This shapes the geo-targeting requirement (§4)
and is a hard constraint, not a nicety.

### 2.1 Jobs To Be Done

- **When** I'm sourcing a senior product leader, **I want to** quickly judge
  credibility and fit from real outcomes, **so I can** decide whether to reach out.
- **When** I land on the site, **I want to** understand who Matt is and what he's
  shipped without digging, **so I can** form a fast, confident impression.
- **When** I'm interested, **I want** a frictionless way to contact him or grab
  his CV, **so I can** act immediately.
- **(Matt)** **When** my role, metrics, or target market change, **I want to**
  update copy in one place, **so I can** keep the site current without a rebuild.

### 2.2 Non-Users (v1)

- General public / press (no thought-leadership surface in v1).
- Recruiters seeking junior/mid PMs (positioning is deliberately Principal-level).

### 2.3 Key User Journeys

**UJ-1 — Priya, VP Product at a Sydney scale-up (AU-targeted).**
Priya opens the site from a referral. Geo detection serves the AU variant: the
hero tag reads "Open to new roles · Oct 2026", the role line shows "Sydney, NSW".
Animated stats (£5.8M at Lloyds, 1M signups at Wagamama, +30% at HCA) land
immediately. She scans the three case cards, notes the Lloyds GenAI lending work,
scrolls the timeline, and hits the contact panel: "Let's talk Sydney." She emails
Matt directly. **Lands on:** a warm outbound email ahead of relocation.

**UJ-2 — Tom, founder in London (UK / default).**
Tom arrives from LinkedIn. He sees the UK-safe default: "Available for select
work · 2026", "London, UK" — no Sydney relocation messaging. Same proof, same
work. He downloads the CV and books nothing (no form in v1) but has Matt's
details. **Lands on:** CV in hand, contact captured.

**UJ-3 — Matt (owner), updating content.**
Matt lands a new metric. He edits `lib/content.ts` / `lib/caseStudies.ts` (or
replaces `public/matt-archer-cv.pdf`) and redeploys. No component changes.
**Lands on:** site current in minutes.

---

## 3. Glossary

- **Bold Merge (Direction 03B)** — the adopted warm, light editorial design
  system (ivory palette, Bricolage Grotesque + Instrument Serif). See CLAUDE.md.
- **Geo variant** — `AU` or `DEFAULT`. Determines geo-targeted copy.
- **DEFAULT variant** — the UK-safe content served when country ≠ AU or unknown.
- **Case card** — a two-panel Selected Work item (narrative left, metrics panel right).
- **Case study detail page** — a per-project long-form page at `/work/<slug>` (planned).

---

## 4. Features

Features grouped by surface. FRs carry globally-unique stable IDs. These describe
*capabilities*; visual/technical implementation lives in CLAUDE.md and the codebase.

### 4.1 Geo-Targeting (privacy-critical)

- **FR-1** The site detects visitor country server-side (Vercel `x-vercel-ip-country`)
  and selects a content variant (`AU` | `DEFAULT`).
- **FR-2** If country is unknown, detection fails, or country ≠ AU → serve `DEFAULT`
  (UK-safe). The AU variant is **never** served by accident.
- **FR-3** All geo-targeted copy lives solely in `lib/content.ts`. No geo strings
  are hardcoded in components.
- **FR-4** Geo-targeted fields cover: hero tag, hero role location, contact
  headline/subline, contact footer block, and meta description.
- **FR-5** AU-specific relocation messaging (Sydney, "moving to Sydney") appears
  **only** in the AU variant.

### 4.2 Hero

- **FR-6** Display Matt's name (Bricolage, "Archer." accented) and role line with
  a geo-targeted location suffix.
- **FR-7** Display a geo-targeted status pill (`heroTag`).
- **FR-8** Present **four outcome stat counters** (Lloyds £5.8M, Wagamama 1M+,
  HCA +30%, 9+ years) that animate on load, respect `prefers-reduced-motion`, and
  render their final value server-side (no-JS safe).
- **FR-9** Provide two CTAs: "View my work" (scroll to Selected Work) and
  "Download CV" (direct PDF download).
- **FR-10** Positioning line + supporting paragraph weave in AI fluency naturally.

### 4.3 Selected Work (case cards)

- **FR-11** Render three case cards from `lib/caseStudies.ts`: **Lloyds Banking
  Group** (flagship), **Wagamama**, **HCA Healthcare**.
- **FR-12** Each card shows: index, company/period, headline (serif accent on the
  emphasised clause), one-paragraph description, industry tags, and a bold metrics
  panel (dominant figure + caption + two secondary stats).
- **FR-13** The metrics panel colour rotates per card (`ink` / `moss` / `peach`).
- **FR-14** Each card links to its case study detail page (`/work/<slug>`).
- **FR-15** A card communicates the outcome without the visitor clicking through.
- **FR-15a** As each card scrolls into view it performs a per-card "deal-in" (rise, alternating tilt, scale, fade, ease-out), scroll-scrubbed and latched per card, reduced-motion-safe. A stacked "deck" was tried and rejected (invisible at card scale). See CLAUDE.md Animation Rules.

### 4.4 Case Study Detail Pages *(planned — not yet built)*

- **FR-16** Each of the three case studies has a detail page at `/work/<slug>`.
- **FR-17** Written in Matt's first-person voice (not agency voice); section
  labels exactly: "The Challenge", "Approach", "What We Built", "Outcomes",
  "Learnings".
- **FR-18** A dedicated metrics block renders outcome numbers prominently.
- **FR-19** Company identity visible in the case-study hero.
- **FR-20** Persistent "Download CV" CTA and Previous/Next case-study navigation.
- **FR-21** Per-page `generateMetadata()` with Open Graph tags.

### 4.5 Skills

- **FR-22** Three columns — Product craft, AI & methods, Industry — as clean pills.
- **FR-23** AI-assisted product development is explicit, not buried; the GenAI pill
  gets the serif-italic accent treatment.
- **FR-24** No percentage bars or star ratings.

### 4.6 Experience Timeline

- **FR-25** Render roles from `lib/experience.ts` as year-marked rows (date /
  role+company / projects), with the current role flagged. A moss spine draws
  down and ignites each node as the timeline scrolls (reduced-motion renders it
  fully drawn); hover applies a subtle background tint, no layout shift.
- **FR-26** Subway, British Airways, Thomas Cook appear here (nested under the PM
  role), not as headline case cards. *(Planned: add Edenred and McDonald's HQ
  from the latest CV.)*

### 4.7 Brand Logos ("Good company")

- **FR-27** Display a grid of brands worked with. Current set and order
  (Keystatic-editable in `content/brands.json`): AND Digital, Lloyds Banking
  Group, wagamama, Subway, Edenred, HCA Healthcare UK, British Airways,
  McDonald's.
- **FR-28** Render each as an inline **monochrome SVG** (`lib/brandLogos.tsx`,
  flattened to `currentColor` so it inherits the cell ink and fills to the
  surface colour on the moss hover), with per-brand optical sizing and a
  styled-text fallback for any brand without a mapped SVG. *(Shipped.)*

### 4.8 Contact

- **FR-29** Geo-targeted headline + subline, a `mailto:` action, a LinkedIn link,
  and a "Download CV" action. No contact form in v1.
- **FR-30** A four-item info footer (email, based-in, availability/relocation,
  reply-within), geo-targeted.

### 4.9 Chrome & CV

- **FR-31** Fixed navigation with a scroll-triggered border state and a persistent
  "Download CV" action; a brand marquee below the hero.
- **FR-32** "Download CV" triggers a direct download of `public/matt-archer-cv.pdf`
  via the `download` attribute. Updating the CV requires only replacing the PDF.

---

## 5. Non-Goals (Explicit)

- **No AI chatbot** in v1 (v2 roadmap — App Router already supports a future
  `/api/chat`).
- **No blog / thought-leadership** surface in v1 (keep routing clean for later MDX).
- **No third-party analytics** beyond Vercel Analytics (now added, `<Analytics />` in `app/layout.tsx`; owner still needs to enable Web Analytics in the Vercel dashboard for data to appear).
- **No contact form, no Calendly**, ever-optional; not in v1.
- **No light/dark toggle** — the warm Bold Merge theme is the only mode.

---

## 6. MVP Scope

### 6.1 In Scope (shipped)

Homepage long-scroll on Bold Merge: Navigation, Hero (geo + stats), Marquee,
About, Selected Work (3 cards, per-card deal-in), Skills, Timeline (line-draw),
monochrome SVG brand logos, Contact, Footer; the scroll-scrub motion language
(timeline line-draw, hero drift, Selected Work deal-in); geo-targeting via
`proxy.ts`; Keystatic CMS for copy/metrics/brands/CV; Vercel Analytics; CV direct
download; base + geo-targeted SEO metadata.

### 6.2 Out of Scope for MVP (remaining)

- Case study detail pages `/work/<slug>` (FR-16–21).
- `next-sitemap` generation wired to build; `not-found.tsx` 404 page.
- Open Graph share image asset.
- Experience-timeline additions from the latest CV (Edenred, McDonald's HQ).
- Keystatic GitHub-storage switch for the deployed `/keystatic` admin.

---

## 7. Success Metrics

Primary outcome is **qualified inbound conversations**, not traffic.

- **SM-1** Qualified inbound (email/LinkedIn) referencing the site — target ≥ 1–2
  per month during the relocation window. *(Counter: volume without seniority fit
  is not success — track relevance, not raw count.)*
- **SM-2** CV downloads as an intent signal.
- **SM-3** Engagement depth — reaches Selected Work / scrolls past the hero.
  *(Counter-metric: high bounce at hero = positioning or performance problem.)*
- **SM-4** Zero incidents of AU-targeted content served to a UK/default visitor
  (privacy guardrail — must stay at zero).
- **SM-5** Lighthouse ≥ 90 across all four categories; < 2s load on simulated 4G.

*(Instrumentation for SM-1–3 depends on analytics, deferred to v1.5 — see Open
Questions.)*

---

## 8. Open Questions

- **OQ-1** How is inbound attributed to the site before analytics land (v1.5)?
  Interim: ask in intro calls / UTM on shared links. *(non-blocker)*
- **OQ-2** Does Vercel geo reliably return `AU` for the target audience, and how do
  we test the AU variant pre-launch (header override / preview)? *(blocker for
  trusting FR-1)*
- **OQ-3** Are the case-study detail pages needed before launch, or can the
  homepage ship and cards temporarily deep-link to the relevant section? *(scope)*
- **OQ-4** *Resolved.* Monochrome brand SVGs were sourced from Wikimedia Commons
  and official brand sites, flattened to `currentColor`; owner authorised
  displaying the marks for the "worked with" wall. Thomas Cook was dropped (no
  clean vector) and Edenred added in its place.
- **OQ-5** Confirm all quoted metrics are cleared for public use (esp. Lloyds
  £5.8M / COO-level references). *(blocker — reputational/employer risk)*

---

## 9. Assumptions Index

- **[ASSUMPTION]** Primary conversion goal is inbound conversations, not
  applications through a portal — inferred from "generate consulting and senior PM
  opportunities."
- **[ASSUMPTION]** AU is the higher-priority market given the Sept 2026 relocation;
  UK is near-term. Priority order in §2 reflects this.
- **[ASSUMPTION]** Metrics in `caseStudies.ts` (£5.8M, 1M, +30%, etc.) are
  accurate and cleared for public use — see OQ-5.
- **[ASSUMPTION]** No form in v1 is acceptable because the audience is senior and
  comfortable emailing directly.
- **[ASSUMPTION]** Case study detail pages are desired for launch quality but the
  homepage can ship first.

---

## Cross-Cutting Requirements (NFRs)

- **NFR-1 Privacy.** Geo default is fail-safe to UK; AU messaging is strictly
  variant-gated (ties to FR-1–5, SM-4). Highest-priority non-functional concern.
- **NFR-2 Performance.** Lighthouse ≥ 90; fonts via `next/font` loaded once;
  `next/image` only; < 2s on 4G.
- **NFR-3 Accessibility.** All motion respects `prefers-reduced-motion`; semantic
  landmarks; keyboard-navigable; sufficient contrast on the warm palette.
- **NFR-4 Maintainability.** Content edits confined to `lib/*.ts` and the CV PDF;
  no component edits for routine copy/metric/CV updates.
- **NFR-5 Brand integrity.** Must not read as AI-generated; bespoke, considered
  choices only (enforced via CLAUDE.md rules).
- **NFR-6 SEO.** Per-page metadata + Open Graph; geo-targeted meta description
  served server-side; canonical `https://mattarcher.me`.
