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
      heroTag: fields.text({ label: 'Hero tag' }),
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

export default config({
  storage: { kind: 'local' },
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
    brands: singleton({
      label: 'Brands',
      path: 'content/brands',
      format: { data: 'json' },
      schema: {
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
