import { config, collection, singleton, fields } from '@keystatic/core'

/**
 * Keystatic content model for the Matt Archer portfolio.
 *
 * Storage is `local` for now (edits write files under `content/` on disk and,
 * on the deployed admin, must be switched to `github`). Content is read at
 * BUILD time via `@keystatic/core/reader` — see `lib/reader.ts` — so the site
 * stays fully static.
 *
 * Geo logic (AU vs DEFAULT, fail-safe to UK) lives in code, NOT here. This model
 * only *stores* the two copy sets as explicit field groups so nothing can leak.
 */

const secondaryStat = fields.object(
  {
    value: fields.text({ label: 'Value', description: 'e.g. ~80, +58%, №1' }),
    label: fields.text({ label: 'Label' }),
  },
  { label: 'Secondary stat' }
)

// A single image embedded in a case-study narrative section. `src` is a plain
// path under /public (e.g. /images/work/wagamama-home.png) so it renders
// directly and stays predictable to author by hand; can be upgraded to a
// drag-drop `fields.image` upload later without changing the read layer.
const caseImage = fields.object(
  {
    src: fields.text({
      label: 'Image path',
      description: 'Path under /public, e.g. /images/work/wagamama-home.png',
    }),
    alt: fields.text({ label: 'Alt text', description: 'Describe the screen for accessibility' }),
    caption: fields.text({ label: 'Caption (optional)' }),
  },
  { label: 'Image' }
)

// One narrative section of a case-study detail page. Rendered first-person,
// through renderBody (blank line = new paragraph, **bold** / *italic* inline).
// Images are optional, so a prose-only case study (Lloyds) simply leaves them
// empty and the same template carries it.
const caseSection = (label: string) =>
  fields.object(
    {
      body: fields.text({
        label: 'Narrative',
        description:
          'First person, Matt’s voice. Leave a blank line between paragraphs. **bold** and *italic* are supported. No em dashes.',
        multiline: true,
      }),
      images: fields.array(caseImage, {
        label: 'Images (optional)',
        itemLabel: (p) => p.fields.alt.value || p.fields.src.value || 'image',
      }),
    },
    { label }
  )

const footItem = fields.object(
  {
    k: fields.text({ label: 'Key', description: 'e.g. Email, Based in' }),
    v: fields.text({ label: 'Value' }),
    href: fields.text({ label: 'Link (optional)', description: 'e.g. mailto:…' }),
  },
  { label: 'Footer item' }
)

const copyVariant = (label: string) =>
  fields.object(
    {
      heroTag: fields.text({
        label: 'Availability marker',
        description:
          'The hero availability line (shown after the "Available" label + live dot). Keep the DEFAULT/UK variant free of relocation detail.',
      }),
      heroLocation: fields.text({ label: 'Hero location' }),
      contactHeadlineLead: fields.text({ label: 'Contact headline (lead)' }),
      contactHeadlineEm: fields.text({ label: 'Contact headline (accent)' }),
      contactSub: fields.text({ label: 'Contact subline', multiline: true }),
      metaDescription: fields.text({ label: 'Meta description', multiline: true }),
      contactFoot: fields.array(footItem, {
        label: 'Contact footer',
        itemLabel: (p) => p.fields.k.value,
      }),
    },
    { label }
  )

// Storage: `local` in dev (edits write files on disk, no auth) and Keystatic
// `cloud` in production (the deployed admin authenticates via Keystatic Cloud
// and commits to the repo). Gated on NODE_ENV — which Next inlines into the
// client bundle — so the browser admin and the server agree on the mode. Cloud
// mode needs no build-time secrets, so deploys build cleanly.
const storage =
  process.env.NODE_ENV === 'development'
    ? ({ kind: 'local' } as const)
    : ({ kind: 'cloud' } as const)

export default config({
  storage,
  cloud: { project: 'matt-archer/mattarcherportfolio' },
  ui: {
    brand: { name: 'Matt Archer — Content' },
  },
  collections: {
    work: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'content/work/*',
      format: { data: 'json' },
      columns: ['title', 'order'],
      schema: {
        title: fields.slug({
          name: { label: 'Reference name', description: 'Used for the URL slug' },
        }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        index: fields.text({ label: 'Index badge', description: 'e.g. 01' }),
        company: fields.text({ label: 'Company / meta line' }),
        period: fields.text({ label: 'Period (optional)' }),
        titleLead: fields.text({ label: 'Headline — lead' }),
        titleEm: fields.text({ label: 'Headline — accent (serif)' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (p) => p.value,
        }),
        panelVariant: fields.select({
          label: 'Metrics panel colour',
          options: [
            { label: 'Ink', value: 'ink' },
            { label: 'Moss', value: 'moss' },
            { label: 'Peach', value: 'peach' },
          ],
          defaultValue: 'ink',
        }),
        panelLabel: fields.text({ label: 'Panel label' }),
        dominant: fields.text({ label: 'Dominant figure', description: 'e.g. £5.8' }),
        dominantEm: fields.text({ label: 'Dominant suffix (serif)', description: 'e.g. M' }),
        dominantCaption: fields.text({ label: 'Dominant caption', multiline: true }),
        secondary: fields.array(secondaryStat, {
          label: 'Secondary stats (2)',
          itemLabel: (p) => p.fields.value.value,
        }),
        // ── Detail-page narrative (fixed five sections, exact labels/order) ──
        // Powers /work/<slug>. Each section is optional at the schema level so a
        // partly-authored study still builds; the page skips empty sections.
        challenge: caseSection('The Challenge'),
        approach: caseSection('Approach'),
        whatWeBuilt: caseSection('What We Built'),
        outcomes: caseSection('Outcomes'),
        learnings: caseSection('Learnings'),
      },
    }),
    experience: collection({
      label: 'Experience',
      slugField: 'role',
      path: 'content/experience/*',
      format: { data: 'json' },
      columns: ['role', 'order'],
      schema: {
        role: fields.slug({ name: { label: 'Role title' } }),
        order: fields.integer({ label: 'Order', defaultValue: 1 }),
        date: fields.text({ label: 'Date range', description: 'e.g. Sept 2023 — Present' }),
        company: fields.text({ label: 'Company · location' }),
        projects: fields.array(fields.text({ label: 'Project' }), {
          label: 'Projects',
          itemLabel: (p) => p.value,
        }),
        projectsMuted: fields.checkbox({ label: 'Muted projects treatment' }),
        current: fields.checkbox({ label: 'Current role' }),
      },
    }),
  },
  singletons: {
    siteCopy: singleton({
      label: 'Site Copy (geo)',
      path: 'content/site-copy',
      format: { data: 'json' },
      schema: {
        default: copyVariant('DEFAULT (UK-safe)'),
        au: copyVariant('AU (Sydney)'),
      },
    }),
    heroStats: singleton({
      label: 'Hero Stats',
      path: 'content/hero-stats',
      format: { data: 'json' },
      schema: {
        stats: fields.array(
          fields.object({
            target: fields.text({ label: 'Target number', description: 'e.g. 5.8' }),
            prefix: fields.text({ label: 'Prefix', description: 'e.g. £' }),
            suffix: fields.text({ label: 'Suffix', description: 'e.g. M+' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Stats', itemLabel: (p) => p.fields.label.value }
        ),
      },
    }),
    skills: singleton({
      label: 'Skills',
      path: 'content/skills',
      format: { data: 'json' },
      schema: {
        columns: fields.array(
          fields.object({
            heading: fields.text({ label: 'Column heading' }),
            skills: fields.array(
              fields.object({
                label: fields.text({ label: 'Skill' }),
                ai: fields.checkbox({ label: 'AI accent treatment' }),
              }),
              { label: 'Skills', itemLabel: (p) => p.fields.label.value }
            ),
          }),
          { label: 'Columns', itemLabel: (p) => p.fields.heading.value }
        ),
      },
    }),
    homeCopy: singleton({
      label: 'Home Copy',
      path: 'content/home-copy',
      format: { data: 'json' },
      schema: {
        heroBody: fields.text({
          label: 'Hero — intro paragraph',
          description:
            'The paragraph next to the hero buttons. Wrap a phrase in **double asterisks** for bold, or *single asterisks* for italic.',
          multiline: true,
        }),
        aboutPara1: fields.text({
          label: 'About — paragraph 1 (left)',
          description:
            'Left paragraph in the About section. The opening phrase is wrapped in **double asterisks** so it renders bold; keep that if you want the bold lead-in.',
          multiline: true,
        }),
        aboutPara2: fields.text({
          label: 'About — paragraph 2 (right)',
          description: 'Right paragraph in the About section.',
          multiline: true,
        }),
      },
    }),
    downloads: singleton({
      label: 'CV / Downloads',
      path: 'content/downloads',
      format: { data: 'json' },
      schema: {
        cv: fields.file({
          label: 'CV (PDF)',
          description:
            'Upload the latest CV (PDF). This replaces the Download CV link everywhere on the site. The uploaded filename does not matter; the download is always named Matt-Archer-CV.pdf. Leave empty to fall back to the built-in CV.',
          directory: 'public/cv',
          publicPath: '/cv',
        }),
      },
    }),
    brands: singleton({
      label: 'Brands',
      path: 'content/brands',
      format: { data: 'json' },
      schema: {
        marqueeSpeed: fields.integer({
          label: 'Marquee speed (px/sec)',
          description:
            'How fast the scrolling brand ticker moves. Higher = faster. ~60 is a gentle drift.',
          defaultValue: 60,
        }),
        items: fields.array(
          fields.object({
            logo: fields.text({ label: 'Logo grid name' }),
            marquee: fields.text({ label: 'Marquee name (UPPER)' }),
          }),
          { label: 'Brands', itemLabel: (p) => p.fields.logo.value }
        ),
      },
    }),
  },
})
