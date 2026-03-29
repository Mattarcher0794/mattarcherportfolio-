# Product Requirements Document
## Matt Archer — Principal PM Portfolio Website
**Version:** 3.0  
**Status:** Approved — Ready for Build  
**Author:** Matt Archer  
**Last Updated:** March 2026  

---

## 1. Executive Summary

A personal portfolio website for Matt Archer, Principal Product Manager at AND Digital. The site functions as a career asset, personal brand platform, and lead generation tool — targeting the Sydney, Australia tech market ahead of relocation in September 2026, while supporting UK-based consulting and agency opportunities in the interim.

The portfolio must function as a product in its own right: fast, intentional, outcome-driven, and built to convert browsers into conversations. It is not a CV on a webpage. It is a demonstration of product thinking — including how Matt thinks about and works with AI.

**Domain:** mattarcher.me (confirm availability at namecheap.com — fallbacks: mattarcher.io, mattarcherpm.com)  
**Target launch:** May 2026  
**Contact email:** archermatthew35@gmail.com  

---

## 2. Problem Statement

Senior PMs in a competitive market — particularly as an international candidate entering the Sydney market — cannot rely on a CV alone to build credibility, generate inbound interest, or demonstrate strategic thinking before they are in the room.

**Specific constraints:**
- Relocating to Sydney in September 2026 — Sydney market typically requires candidates on the ground, so the portfolio must build warm pipeline before arrival
- Current employer must not be aware of relocation plans — requires geo-targeted content (UK visitors see UK version by default)
- No existing portfolio — being built from scratch
- The AI chatbot ambition (v2 roadmap) requires tech stack decisions now that don't create rebuild debt later

**The opportunity:**  
Matt has exceptional, metrics-backed case studies that most PM portfolios cannot match — a loyalty app with 81k signups in week one, a healthcare platform that went from 3.2 to 100% 5-star reviews on launch, and a mobile commerce transformation driving 30% conversion uplift across 1,800 stores. The portfolio's job is to surface these outcomes clearly in the case studies, and to tell the story of the person behind them in the hero and about sections.

---

## 3. Goals & Success Metrics

### Primary Goals
1. Generate recruiter and hiring manager conversations ahead of Sydney arrival (September 2026)
2. Establish Matt as a credible, senior PM voice in the Sydney market before landing
3. Support active consulting and agency conversations in the UK in parallel
4. Protect current employment — employer must see UK-facing default version

### Success Metrics

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Unique portfolio visits | 500+ | First 3 months live |
| CV downloads | 50+ | First 3 months live |
| LinkedIn visits from portfolio | 100+ | First 3 months live |
| Recruiter conversations initiated | 10+ | Before September arrival |
| Average time on site | >2 minutes | Ongoing |
| Bounce rate | <50% | Ongoing |
| Mobile Lighthouse score | 90+ | Launch |
| Page load speed | <2s on 4G | Launch |

### Out of Scope for v1
- AI chatbot (v2)
- Blog / thought leadership (v2)
- CMS integration (v2)
- Analytics beyond Vercel built-in (v2)
- Testimonials section (v1.5 — pending content availability)

---

## 4. Target Users

### Persona 1: The Sydney Recruiter
- Works at a tech-focused recruitment agency in Sydney (SustainRecruit, Talent International, Robert Walters AU)
- Receives the portfolio link via LinkedIn outreach or referral
- Has 60–90 seconds to decide if Matt is worth a call
- Needs: Instant clarity on seniority, industry depth, and measurable impact
- Key question: "Is this person serious about relocating, and are they senior enough for the roles I'm filling?"

### Persona 2: The Sydney Hiring Manager
- VP of Product or Head of Product at a scale-up or established tech company in Sydney
- Portfolio shared by recruiter or discovered via LinkedIn
- Wants strategic thinking, not just delivery credentials
- Needs: Evidence of product leadership, business impact, team leadership, AI fluency
- Key question: "Has this person solved problems like mine before?"

### Persona 3: The UK Consulting Lead
- AND Digital-style agency or scale-up seeking senior fractional/consulting PM
- Finds portfolio via LinkedIn or personal referral
- Needs: Breadth of industry experience, track record with recognised brands, ability to lead teams
- Key question: "Can this person walk in and lead a cross-functional team from day one?"

### Persona 4: The LinkedIn Networker
- Anyone clicking Matt's portfolio link from his LinkedIn profile
- Broad intent — could be any of the above, or a peer/contact
- Needs: Fast-loading, credible site with a clear next action
- Key question: "Is this worth my time?"

---

## 5. User Journey

### Primary: Recruiter to Conversation
```
LinkedIn profile or outreach message
        ↓
Portfolio homepage — hero (<10 seconds to hook)
        ↓
Reads: name, positioning line, about intro
        ↓
Scans: case study cards (logo + outcome stats visible without clicking)
        ↓
Clicks: one case study deep dive
        ↓
CTA: Download CV or connect on LinkedIn
        ↓
Recruiter initiates conversation
```

### Secondary: Hiring Manager Due Diligence
```
Recruiter shares portfolio link
        ↓
Homepage → reads About section
        ↓
Reviews all 3 case studies in depth
        ↓
Checks LinkedIn for social proof
        ↓
Reaches out to Matt directly
```

---

## 6. Site Structure

### Single long-scroll homepage with deep-linked case study pages

```
/ (homepage — long scroll)
  ├── Navigation (sticky)
  ├── Hero (geo-targeted)
  ├── About
  ├── Selected Work (3 case study cards)
  ├── Skills & Industry Expertise
  ├── Experience Timeline
  ├── Brand Logos (clients worked with)
  └── Contact / CTA (geo-targeted)

/work/wagamama-soul-club
/work/hca-healthcare
/work/subway

/404
```

---

## 7. Feature Requirements

### 7.1 Navigation
- Sticky top bar throughout scroll
- Left: "Matt Archer" (links to top of page)
- Right: Work · About · Contact · [Download CV button]
- Download CV button is visually distinct — accent colour, not a plain link
- Mobile: hamburger → full screen overlay menu
- Active section highlighting on scroll

---

### 7.2 Hero Section

The most critical 10 seconds on the site. Must communicate: who Matt is, what kind of PM he is, and what to do next. **No vanity stats in the hero** — outcomes live in the case studies where they have context. The hero is about the person.

**Required elements:**
- Full name: Matt Archer
- Title: Principal Product Manager
- Positioning line (geo-targeted — see 7.10)
- A single, human, confident intro sentence that weaves in AI fluency naturally (see copy direction below)
- Primary CTA: "View my work" (scrolls to case studies)
- Secondary CTA: "Download CV"
- Subtle animated scroll indicator

**Hero copy direction:**

The positioning line should feel like a handshake, not a billboard. One sentence that captures who Matt is and how he thinks. It must feel earned, not claimed.

Draft (for iteration):
> "I build products at the intersection of insight, data, and human behaviour — leading teams from discovery to launch across consumer, health, and enterprise."

The AI thread should be woven into this sentence or the one that follows — not as a badge, but as part of how Matt describes his approach. For example:
> "I'm increasingly building with AI — using it to accelerate discovery, sharpen decisions, and think about what's possible next."

This should feel like a natural part of the intro, not a separate section.

**What to avoid:**
- Listing achievements in the hero (no "1M signups" etc. — these belong in case studies)
- Generic PM phrases: "passionate about", "customer-centric", "stakeholder alignment"
- Anything that reads like a LinkedIn summary

---

### 7.3 About Section

Two to three focused paragraphs. A positioning statement, not a biography. Written in first person, warm but direct.

**Must cover:**
- What kind of PM Matt is — the approach, not the job title
- Industry breadth (consumer mobile, healthtech, QSR, travel, loyalty, B2B)
- The AND Digital context — leading the product function for a London business unit
- AI fluency woven in naturally — how data and AI-adjacent thinking shapes the way Matt works
- Geo-targeted closing line (see 7.10)

**AI copy direction for About:**
Don't create a separate "AI skills" paragraph. Instead, weave it into how Matt describes his decision-making and discovery approach. Example thread:
> "I use data and increasingly AI tooling to pressure-test assumptions early, move faster in discovery, and help teams make better decisions with less noise."

---

### 7.4 Case Study Cards (Homepage)

Three cards. Outcomes must be visible without clicking. Each card must feel premium — not a generic portfolio grid tile.

**Each card must show:**
- Company logo (Wagamama, HCA Healthcare, Subway)
- Project name
- One-line description of what it was (not what Matt did)
- 2–3 key outcome stats (the most impressive metrics, concisely presented)
- Industry / skill tags (2–3 max)
- "Read case study →" link

**Card order:** Wagamama → HCA Healthcare → Subway

**Stats on cards (per project):**

*Wagamama Soul Club:*
- 81k signups — week one
- #1 iOS App, Food & Drink
- £9M additional revenue projected, year 1

*HCA Healthcare:*
- 3.2 → 5★ app rating on launch
- On time. On budget.
- £4–7M direct revenue unlocked

*Subway:*
- 30% conversion uplift
- 1,800 stores
- 20+ person digital function built from scratch

---

### 7.5 Skills & Industry Expertise Section

Not a list of tools. A demonstration of breadth, depth, and how Matt thinks. Organised into two groups: skills and industries.

**Skills to surface:**
- Product discovery & strategy
- 0→1 product development
- Consumer mobile (iOS + Android)
- Loyalty & CRM
- Experimentation & CRO
- Cross-functional team leadership (30+ people)
- Dual-track agile delivery
- Data & product analytics
- GTM strategy
- **AI-assisted product development** — explicitly called out as a skill, not buried

**AI skill note:**
This should be one of the more prominent skills. Copy direction:
> "Using AI tools to accelerate discovery, generate and pressure-test hypotheses, and inform roadmap decisions. Building towards AI-powered product experiences (see v2 roadmap)."

**Industry tags:**
Retail · Loyalty · Healthtech · Travel · eCommerce & QSR · B2B · Public Sector · Mobile

---

### 7.6 Experience Timeline

A visual, scannable timeline. **This must look beautiful** — it is often the most-read section after the hero. Not a copy-paste of the CV. Each entry should feel like a deliberate design moment, not a list.

**Design direction:**
- Vertical timeline with year markers
- Each role has: company, title, date range, and 1–2 line description of the context (not bullet points)
- Key projects nested under roles where relevant (Wagamama, HCA under Principal PM; Subway under PM)
- Subtle use of accent colour on the timeline line or node markers
- Animated on scroll — entries reveal as user scrolls down

**Entries:**

**Principal Product Manager — AND Digital**
Sept 2023 – Present
Leading the product function for AND Digital's London business unit. Responsible for high-performing product and design teams across a range of industries and brands.
→ Wagamama Soul Club (2024)
→ HCA Healthcare Primary Care (2024–2025)

**Product Manager — AND Digital**
June 2018 – August 2023
Five years building consumer-facing products across loyalty, QSR, travel, and healthcare. Discovery through to delivery.
→ Subway Mobile App & EMEA Digital Transformation
→ British Airways Web Selling Flow
→ Thomas Cook Search

**Product Owner — Meganexus**
July 2017 – June 2018
Agile product development in the public sector. Building and launching a rehabilitation platform for the Ministry of Justice.

**Agile Business Analyst — Sopra Steria**
August 2016 – July 2017
Starting out in the government sector. Business process re-engineering and product development.

---

### 7.7 Brand Logo Section

A clean, horizontal display of logos from brands Matt has worked with. Signals immediate credibility — no one needs to read anything, they just recognise the names.

**Logos to include:**
- Wagamama
- HCA Healthcare
- Subway
- British Airways
- Thomas Cook
- AND Digital (as the agency context)

**Design direction:**
- Monochrome / low-opacity treatment so logos don't clash with the dark theme
- Subtle scroll or fade-in on load
- No labels needed — logos only
- Mobile: wraps into 2 rows

---

### 7.8 Contact / CTA Section

Simple. No form in v1. Just a clear human moment at the end of the page.

**Elements:**
- Geo-targeted headline (see 7.10)
- Geo-targeted subline
- Email link: archermatthew35@gmail.com
- LinkedIn button: linkedin.com/in/mattarcher1

---

### 7.9 Case Study Pages

Each of the three case study pages follows this consistent IA. Content is written from Matt's personal perspective — not an agency case study.

**Page structure:**

**1. Hero**
- Company logo
- Project name
- Matt's role + year
- One-line context sentence (what was this, in plain English)

**2. The Challenge**
- The business and customer problem
- Why it mattered at that moment
- What made it hard
- Written in first person: "When I joined this project..."

**3. Approach**
*(previously 'My Approach' — now just 'Approach')*
- How Matt structured the discovery
- Key strategic decisions and trade-offs
- How he led the team through ambiguity
- Any AI or data tooling that shaped the approach

**4. What We Built**
- The solution in plain English
- Key capabilities and features
- Any notable technical decisions (from a PM perspective, not an engineer's)

**5. Outcomes**
- All key metrics — presented beautifully, not as a bullet list
- Business impact beyond the numbers
- Any qualitative signal (app store reviews, stakeholder feedback)

**6. Learnings**
*(previously 'What I Learned' — now just 'Learnings')*
- Honest reflections
- What Matt would approach differently
- What he took into the next project

**Navigation:**
- Back to homepage
- Next / previous case study
- Download CV CTA persistent at bottom of page

**Tone across all case studies:**
- First person throughout
- Personal, not corporate
- Outcome-focused but human
- No AND Digital marketing language — this is Matt's story, not the agency's

---

### 7.10 Geo-Targeted Content

**Privacy-critical feature.** Matt's current employer must see the UK default version.

**Implementation:** Next.js middleware using Vercel's built-in geo headers (`request.geo.country`). Server-side — no client-side flash of wrong content.

**AU Version (country === 'AU'):**

Hero positioning line:
> "Principal PM based in London. Relocating to Sydney, September 2026 — open to conversations now."

About closing line:
> "I'm relocating to Sydney in September 2026 and actively talking to teams about what's next. If you're building something worth working on, I'd love to hear about it."

Contact headline:
> "Let's talk Sydney."

Contact subline:
> "I'm relocating to Sydney in September 2026. Happy to connect now ahead of arrival."

Meta description:
> "Principal PM relocating to Sydney, September 2026. Led Wagamama Soul Club, HCA Healthcare, Subway. Open to conversations now."

**UK / Default Version (all other countries):**

Hero positioning line:
> "Principal PM leading product and design teams across consumer, health, and enterprise."

About closing line:
> "Based in London. Open to senior PM roles and consulting engagements."

Contact headline:
> "Let's work together."

Contact subline:
> "Whether you're looking for a senior PM or a consulting partner, I'd love to hear what you're building."

Meta description:
> "Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London."

**Technical requirements:**
- Middleware runs at edge — zero latency
- Graceful fallback: geo detection failure → serve UK/default version
- All geo-targeted copy lives in a single TypeScript file: `/lib/content.ts`
- No cookies, no PII stored, no consent banner required

---

### 7.11 CV Download
- PDF hosted at `/public/matt-archer-cv.pdf`
- Button triggers direct download (not new tab)
- File updated by replacing the PDF — no code changes required
- Tracked via console.log in v1, Vercel Analytics in v2

---

### 7.12 404 Page
- On-brand, dark theme
- Short, human copy — not "404 page not found"
- Clear route back to homepage

---

### 7.13 SEO & Open Graph

| Tag | Value |
|-----|-------|
| Title | Matt Archer — Principal Product Manager |
| Meta description | Geo-targeted (see 7.10) |
| OG image | Static branded image: name, title, 3 case study logos |
| OG title | Matt Archer — Principal Product Manager |
| Canonical | https://mattarcher.me |
| Person schema | Yes |
| Sitemap | Auto-generated via next-sitemap |

---

### 7.14 Performance
- Lighthouse 90+ across Performance, Accessibility, Best Practices, SEO
- All images: `next/image` (WebP, lazy loading)
- Fonts: `next/font/google` (zero layout shift)
- No third-party scripts in v1
- Target: <2s load on 4G mobile

---

### 7.15 Mobile Responsiveness
- Mobile-first design
- Fully functional on iOS Safari 16+
- Navigation collapses to hamburger below 768px
- Case study cards stack vertically on mobile
- Fluid typography (scales with viewport)
- Minimum touch target: 44px

---

## 8. Design System

### 8.1 Aesthetic Direction
**"Refined editorial minimal"** — the visual language of a high-end magazine crossed with a premium product interface. Dark, authoritative, precise. Every element earns its place. The experience timeline, case study stats, and brand logos are design moments — not just information.

### 8.2 Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0F0F0E` | Primary background |
| `--color-surface` | `#1A1A18` | Card / section backgrounds |
| `--color-border` | `#2A2A28` | Borders and dividers |
| `--color-text-primary` | `#F2EFE8` | Headlines and primary text |
| `--color-text-secondary` | `#A09D96` | Secondary text, captions, labels |
| `--color-accent` | `#C9A96E` | Warm amber — CTAs, highlights, hover states |
| `--color-accent-subtle` | `rgba(201,169,110,0.1)` | Hover backgrounds |

### 8.3 Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Display / Hero | Cormorant Garamond | 300, 600 | next/font/google |
| Section headings | Cormorant Garamond | 600 | next/font/google |
| Body text | DM Sans | 300, 400 | next/font/google |
| Labels, tags, nav | DM Sans | 500 | next/font/google |
| Metrics / stats | DM Mono | 400 | next/font/google |

### 8.4 Spacing
Base unit: 4px. All spacing uses multiples of 4. Implemented as Tailwind spacing scale.

### 8.5 Animation
- Scroll-triggered section reveals: fade up + Y translate (20px → 0), 600ms ease-out
- Stagger delay between sibling elements: 100ms
- Hover transitions: 200ms ease
- Page transitions: subtle fade, 300ms
- Library: Framer Motion
- Rule: `prefers-reduced-motion` disables all animations

### 8.6 Component Rules
- Prefer custom components to maintain the design aesthetic — avoid libraries that impose their own visual style (e.g. MUI, Chakra)
- **shadcn/ui is permitted** for headless primitives (buttons, dialogs, etc.) where behaviour is needed without visual lock-in
- **21st.dev components are permitted** — evaluate case by case for aesthetic fit
- No inline styles — CSS variables and Tailwind only
- Dark mode is the only mode (no toggle needed)
- Each component is a single file (styles co-located, no separate CSS files)

---

## 9. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSR for geo-targeting middleware, API routes ready for v2 chatbot |
| Language | TypeScript | Type safety, better Claude Code output quality |
| Styling | Tailwind CSS v3 | Utility-first, clean pairing with Next.js |
| Animation | Framer Motion | Best-in-class React animations |
| Fonts | next/font/google | Zero layout shift, auto self-hosted |
| Images | next/image | Automatic WebP, lazy loading |
| Geo-detection | Vercel Edge Middleware (`request.geo`) | Built-in, zero latency, no external API |
| Content | TypeScript config (`/lib/content.ts`) | Simple, fast, no CMS overhead in v1 |
| Deployment | Vercel | Free tier, preview deployments, edge middleware |
| Version Control | GitHub (`mattarcherportfolio-`) | Already created |
| Domain | mattarcher.me | Register via Namecheap, point DNS to Vercel |
| Analytics | Vercel Analytics (v1.5) | Not in v1 scope |
| AI Chatbot | Claude API via Next.js API route (v2) | Stack is already ready — just add the route |

---

## 10. Case Study Content

### NDA Note
All case study content is written from Matt's personal perspective as Product Lead. AND Digital has already published this work publicly. The portfolio tells the human story behind the outcomes — not an agency case study. No confidential commercial data, internal tooling details, or client-sensitive information is included.

---

### 10.1 Wagamama — Soul Club

**Project name:** Soul Club  
**Matt's role:** Product Lead  
**Company:** Wagamama (via AND Digital)  
**Launch date:** 17th July 2024  

**Key metrics:**
- 65,000 signups in first 5 days
- 81,000 signups in week one — 3× the projection
- 100,000 organic signups in first 14 days
- #1 iOS App Store, Food & Drink at launch
- 1.5M members projected, year 1
- 800,000 extra visits projected, year 1
- £9M additional revenue projected, year 1

**The challenge:**
Wagamama — pioneers in hospitality — had no loyalty scheme while competitors did. Visit frequency was declining. They had the instinct for what loyalty could be, but no clear vision, execution approach, or technical capability to bring it to life.

**Approach:**
- 6-week discovery to define strategic direction — customer research (moderated, unmoderated, 1:1 testing), stakeholder alignment, proposition definition
- Defined the Soul Club mechanic: emotional loyalty, not just transactional rewards
- Defined CRM and data personalisation strategy (Bloomreach integration)
- Mobilised three development teams in parallel using dual-track agile
- Coordinated third-party suppliers, owned component-based design system
- Shaped and executed GTM strategy — on-time, nationwide launch

**What was built:**
Soul Club — a React Native mobile app integrating with Wagamama's tech ecosystem. Loyalty points, personalised rewards, visit nudges, and a consumer experience designed to create emotional connection with the brand, not just free food.

**Learnings:**
*[Matt to add — personal reflections, what he'd approach differently]*

---

### 10.2 HCA Healthcare — Primary Care App & Web

**Project name:** HCA UK Primary Care Digital Experience  
**Matt's role:** Product Lead  
**Company:** HCA Healthcare UK (via AND Digital)  
**Year:** 2024–2025  

**Key metrics:**
- App store rating: 3.2 → 100% 5-star reviews on launch
- Delivered on time and on budget
- £4–7M direct revenue unlocked
- £9–22M additional annual revenue via secondary services
- Two codebases (React Native + React web) in 6 months

**The challenge:**
HCA UK — the UK's largest private healthcare provider, over 1M patient interactions annually — had a booking experience owned by a third-party PMS. It was outdated, unbranded, and outside their control. Before investing in marketing to scale their corporate and self-pay business, they needed to own their digital touchpoints. This was a prerequisite for growth, not a nice-to-have.

**Approach:**
- Discovery in September 2024: mapped patient pain points, validated new concepts through user testing
- Ran dual-track agile — product and design ahead of development throughout
- Implemented shared component framework between React Native and React web — app team led, web team followed using established components
- Maintained transparent stakeholder relationships with HCA's digital, clinical, and marketing teams
- Delivered both platforms within 6 months to a fixed deadline

**What was built:**
A modern native React Native app and React web platform — GP bookings, medical screening, health results, subscription services. Fully branded, owned end-to-end by HCA, future-proofed for expansion.

**Learnings:**
*[Matt to add — working in a regulated healthcare environment, clinical SMEs, what he'd do differently]*

---

### 10.3 Subway — Mobile App & Digital Transformation

**Project name:** Subway Mobile Order (EMEA)  
**Matt's role:** Product Lead & Interim Head of Apps  
**Company:** Subway EMEA (via AND Digital)  
**Year:** *[Matt to confirm exact dates]*

**Key metrics:**
- 30% conversion uplift across 1,800 stores post-launch
- eCommerce conversion +14%
- CRO +12% in first 3 months
- App orders: grew from 3.6% of total at project start
- 20+ person internal digital function built from zero
- Subway EMEA's first-ever native, member-exclusive mobile ordering product

**The challenge:**
Subway's mobile app accounted for just 3.6% of orders. Development was outsourced, creating a disconnect between customer needs and the product. The experience was neither personalised nor intuitive. Subway wanted a new app — but more importantly, they wanted to own their digital future by bringing development in-house and shifting from reactive waterfall to continuous delivery.

**Approach:**
- 4-week discovery: generative customer research, problem prioritisation, opportunity mapping
- Led transition from outsourced offshore dev to an insourced 20+ person digital function
- Led two squads building Subway EMEA's first native mobile order product
- Introduced dual-track agile to a team with no prior experience of it
- Validated every feature with customers before build — without exception
- Owned data strategy and success measures throughout
- Post-launch: continuous experimentation programme driving CRO improvements

**What was built:**
Subway EMEA's first native mobile order product — menu with nutritional transparency, geo-located store finder, pre-order for collection, order status updates, loyalty points, auto-promotions, Apple Pay. Live across 1,800 stores.

**Learnings:**
*[Matt to add — the insourcing challenge, working with a global QSR brand at scale, what surprised him]*

---

## 11. Content Config (Geo-Targeting)

All geo-targeted copy lives in `/lib/content.ts`. Single file to update — no component changes needed.

```typescript
// /lib/content.ts

export const content = {
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

---

## 12. Roadmap

### v1.0 — Launch (Target: May 2026)
- [ ] Project scaffold — Next.js 14, TypeScript, Tailwind, Framer Motion
- [ ] CLAUDE.md written and committed to repo root
- [ ] Design tokens (colours, typography, spacing — CSS variables + Tailwind config)
- [ ] Geo-targeting middleware (`/middleware.ts`)
- [ ] Content config (`/lib/content.ts`)
- [ ] Navigation component (sticky, mobile-responsive)
- [ ] Hero section (geo-targeted, no vanity stats)
- [ ] About section (AI fluency woven in)
- [ ] Case study cards × 3 (logos + stats visible)
- [ ] Skills & expertise section (AI explicitly called out)
- [ ] Experience timeline (beautiful, animated)
- [ ] Brand logo section
- [ ] Contact / CTA section (geo-targeted)
- [ ] CV download (`/public/matt-archer-cv.pdf`)
- [ ] Wagamama Soul Club case study page
- [ ] HCA Healthcare case study page
- [ ] Subway case study page
- [ ] 404 page
- [ ] SEO meta, Open Graph, Person schema
- [ ] Sitemap (next-sitemap)
- [ ] Mobile responsive (iOS Safari tested)
- [ ] Lighthouse audit 90+
- [ ] Vercel deployment + custom domain

### v1.5 — Polish (Target: July 2026)
- [ ] Vercel Analytics enabled
- [ ] Testimonials section (pending content)
- [ ] Dynamic Open Graph image
- [ ] Scroll-progress indicator on case study pages

### v2.0 — AI Layer (Target: Q4 2026, post-arrival)
- [ ] AI chatbot — "Ask me about my experience"
- [ ] Claude API via Next.js API route
- [ ] System prompt: CV + case studies + personal brief
- [ ] Floating widget on homepage
- [ ] Blog / thought leadership section

---

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Current employer sees AU content | Medium | High | IP geo-targeting; UK version is default for all non-AU visitors |
| NDA conflict | Low | High | Content written from personal perspective; AND Digital has published this work publicly |
| Portfolio not live before September | Low | Medium | 6-week build is achievable with Claude Code |
| Geo-detection fails | Low | Low | Fallback to UK/default version |
| mattarcher.me unavailable | Low | Low | Fallbacks: mattarcher.io → mattarcherpm.com |
| Sydney requires boots on ground | High | Medium | Portfolio builds warm pipeline — arrival converts it |
| Headshot quality | Medium | Low | Use best available for v1; professional shoot before September |

---

## 14. Resolved Decisions

All decisions below are closed. Do not reopen without a clear reason and a comment in the PR.

| Decision | Resolution |
|----------|-----------|
| Tech stack | Next.js 14, TypeScript, Tailwind, Framer Motion, Vercel |
| Design aesthetic | Refined editorial minimal — dark, warm amber accent |
| Typography | Cormorant Garamond (display) + DM Sans (body) + DM Mono (stats) |
| Colour palette | `#0F0F0E` bg, `#F2EFE8` text, `#C9A96E` accent |
| Site structure | Long-scroll homepage + 3 case study pages |
| Case studies | Wagamama Soul Club, HCA Healthcare, Subway |
| Case study IA labels | 'Approach' (not 'My Approach'), 'Learnings' (not 'What I Learned') |
| Geo-targeting | Vercel edge middleware, UK/default, AU variant |
| Hero stats | No vanity stats in hero — metrics live in case study cards and pages |
| Case study cards | Company logo + outcome stats visible on card |
| Brand logos section | Yes — homepage, monochrome treatment |
| Component library | Custom-first; shadcn/ui and 21st.dev permitted; no style-imposing libraries |
| Domain | mattarcher.me (confirm availability) |
| Contact | archermatthew35@gmail.com + LinkedIn |
| CV download | PDF in /public, direct download |
| Calendly | Not needed — removed from all roadmap versions |
| AI fluency | Woven into hero copy, about section, and skills — not a separate badge |
| Target market | Sydney scale-ups + consulting — AU primary, UK secondary |
| Relocation | AU visitors see explicit relocation messaging; all others do not |

---

*This is a living document. Version history maintained in GitHub. All changes must include a reason.*
