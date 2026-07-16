import { reader } from './reader'

export interface SecondaryStat {
  value: string
  label: string
}

export type PanelVariant = 'ink' | 'moss' | 'peach'

export interface CaseImage {
  src: string
  alt: string
  caption: string | null
}

export interface CaseSection {
  body: string
  images: CaseImage[]
}

/** The five fixed narrative sections, in display order. */
export const SECTION_KEYS = [
  'challenge',
  'approach',
  'whatWeBuilt',
  'outcomes',
  'learnings',
] as const
export type SectionKey = (typeof SECTION_KEYS)[number]

export const SECTION_LABELS: Record<SectionKey, string> = {
  challenge: 'The Challenge',
  approach: 'Approach',
  whatWeBuilt: 'What We Built',
  outcomes: 'Outcomes',
  learnings: 'Learnings',
}

export interface CaseStudy {
  slug: string
  index: string
  company: string
  period: string
  titleLead: string
  titleEm: string
  description: string
  tags: string[]
  panelVariant: PanelVariant
  panelLabel: string
  dominant: string
  dominantEm: string
  dominantCaption: string
  secondary: SecondaryStat[]
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await reader.collections.work.all()
  return entries
    .map(({ slug, entry }) => ({
      slug,
      order: entry.order,
      index: entry.index,
      company: entry.company,
      period: entry.period,
      titleLead: entry.titleLead,
      titleEm: entry.titleEm,
      description: entry.description,
      tags: [...entry.tags],
      panelVariant: entry.panelVariant as PanelVariant,
      panelLabel: entry.panelLabel,
      dominant: entry.dominant,
      dominantEm: entry.dominantEm,
      dominantCaption: entry.dominantCaption,
      secondary: entry.secondary.map((s) => ({ value: s.value, label: s.label })),
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ order: _order, ...cs }) => cs)
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudies()
  return all.find((cs) => cs.slug === slug) ?? null
}

/** The full detail entry: card data plus the five narrative sections. */
export interface CaseStudyDetail extends CaseStudy {
  sections: Record<SectionKey, CaseSection>
}

interface RawSection {
  body: string
  images: readonly { src: string; alt: string; caption: string }[]
}

function mapSection(raw: RawSection | undefined): CaseSection {
  return {
    body: raw?.body ?? '',
    images: (raw?.images ?? []).map((im) => ({
      src: im.src,
      alt: im.alt,
      caption: im.caption?.trim() ? im.caption : null,
    })),
  }
}

/** All case-study slugs, for generateStaticParams. */
export async function getCaseStudySlugs(): Promise<string[]> {
  const entries = await reader.collections.work.all()
  return entries.map(({ slug }) => slug)
}

/** Full detail entry for one slug, or null if the slug is unknown. */
export async function getCaseStudyDetail(slug: string): Promise<CaseStudyDetail | null> {
  const entry = await reader.collections.work.read(slug)
  if (!entry) return null
  return {
    slug,
    index: entry.index,
    company: entry.company,
    period: entry.period,
    titleLead: entry.titleLead,
    titleEm: entry.titleEm,
    description: entry.description,
    tags: [...entry.tags],
    panelVariant: entry.panelVariant as PanelVariant,
    panelLabel: entry.panelLabel,
    dominant: entry.dominant,
    dominantEm: entry.dominantEm,
    dominantCaption: entry.dominantCaption,
    secondary: entry.secondary.map((s) => ({ value: s.value, label: s.label })),
    sections: {
      challenge: mapSection(entry.challenge),
      approach: mapSection(entry.approach),
      whatWeBuilt: mapSection(entry.whatWeBuilt),
      outcomes: mapSection(entry.outcomes),
      learnings: mapSection(entry.learnings),
    },
  }
}
