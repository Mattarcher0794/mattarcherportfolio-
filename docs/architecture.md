# Architecture — Matt Archer Portfolio

Status: proposed · 2026-07-09 · Author: "Bruce Banner" (BMAD Architect)
Companion to `PRD.md` (product) and `CLAUDE.md` (design/build spec).

This is a lean spine: the invariants everything else is built from. It answers two
questions the owner raised — **"let me manage content myself"** and **"deploy it on
mattarcher.me"** — and nothing it doesn't need to.

---

## 1. Decision: content management

**Chosen: [Keystatic](https://keystatic.com) in git-backed mode.**

Content moves out of `lib/*.ts` (typed code — fragile to edit) into repo-stored
content files edited through Keystatic's admin UI at `/keystatic`. Saves commit to
GitHub; Vercel redeploys automatically.

**Why (trade-off, honestly):**
- Owner edits *infrequently* → a form UI beats remembering file/TS syntax.
- Content stays **in the repo** (JSON/MDX), read at **build time** → site stays
  static, fast (Lighthouse ≥ 90 intact), no external service, DB, or bill.
- Fits CLAUDE.md's "lightweight CMS / MDX" v2 note; keeps the blog door open.
- Rejected **Sanity/hosted CMS**: a runtime external dependency + auth for a
  3-case-study site — over-powered, and adds the exact "unnecessary dependency"
  CLAUDE.md warns against. Rejected **raw MDX-in-GitHub**: simplest, but no UI —
  worse for an infrequent, non-daily editor.

### Invariant: geo logic never moves into the CMS
The AU/DEFAULT split and the **fail-safe-to-UK** rule stay in code (`proxy.ts`,
`lib/content.ts` `getContent`). Keystatic only *stores* the two copy sets as
explicit fields. Rationale: the privacy guarantee (NFR-1) must be enforced by code
under test, not by how someone fills a form.

---

## 2. Content model

| Type | Keystatic shape | Stored as | Replaces |
|------|-----------------|-----------|----------|
| Case studies | `collection` | `content/work/<slug>.* ` (JSON + MDX body for future detail pages) | `lib/caseStudies.ts` |
| Experience/timeline | `collection` | `content/experience/<id>.json` | `lib/experience.ts` |
| Site copy (geo) | `singleton` with **`default` + `au` field groups** | `content/site-copy.json` | `lib/content.ts` |
| Skills | `singleton` | `content/skills.json` | `Skills.tsx` inline data |
| Hero stats | `singleton` | `content/hero.json` | `Hero.tsx` inline data |
| Brands | `singleton`/`collection` | `content/brands.json` | `Logos.tsx` / `Marquee.tsx` |

The typed interfaces in `lib/*.ts` become the **read layer**: thin functions using
`@keystatic/core/reader` that fetch content at build and return the same types the
components already consume. Components don't change shape — only their data source.

## 3. Data flow

```
Keystatic UI (/keystatic)  ──commit──▶  GitHub repo (content/*.json|mdx)
                                              │
                                     Vercel build (SSG/ISR)
                                              │
                          reader API ──▶ lib/*.ts (typed) ──▶ components
                                              │
                              proxy.ts sets x-user-country (request)
                                              │
                          getContent() picks AU | DEFAULT (fail-safe UK)
```

Everything renders at build/request time; no client-side CMS fetch. Local mode edits
files directly on disk; deployed mode commits via a GitHub connection.

---

## 4. Deployment & domain

1. **Host:** Vercel (already the target; Next 16 native). Import the GitHub repo;
   `proxy.ts` runs at the edge; pushes to `main` deploy to production.
2. **Domain:** `mattarcher.me` — verified **available** (whois: not found). Simplest
   path is registering it **through Vercel Domains** so DNS/SSL auto-configure.
   Alternatively register at any registrar and add A/CNAME per Vercel's instructions.
3. **Env:** Keystatic git mode needs a GitHub connection (app/token) for the
   deployed admin; local mode needs nothing. Keys live in Vercel env vars, never in
   the repo.
4. **Launch hygiene (prereqs, cheap):** wire `next-sitemap` to build, add
   `app/not-found.tsx`, add an Open Graph share image. `metadataBase` already points
   at `https://mattarcher.me`.

## 5. Sequenced plan

1. **Deploy the current site first** (get it live on Vercel + `mattarcher.me`) — no
   reason to gate a working homepage behind the CMS refactor.
2. Verify the AU vs DEFAULT geo behaviour on a Vercel preview (PRD OQ-2).
3. Add launch hygiene (sitemap, 404, OG image).
4. Integrate Keystatic + migrate content collection-by-collection behind the
   existing `lib/*.ts` types (no visual change; pure source swap).
5. Then build case-study detail pages (PRD FR-16–21) as MDX bodies in the `work`
   collection. SVG brand logos last.

## 6. What needs the owner's hands (can't be automated)

- Vercel account + import repo (login/payment).
- Register `mattarcher.me` (payment) — via Vercel recommended.
- Authorise the GitHub connection for Keystatic's deployed admin.

Everything else — Keystatic wiring, content migration, sitemap/404/OG, detail
pages — is implementable in-repo without owner credentials.
