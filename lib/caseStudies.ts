import { reader } from './reader'

export interface SecondaryStat {
  value: string
  label: string
}

export type PanelVariant = 'ink' | 'moss' | 'peach'

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
