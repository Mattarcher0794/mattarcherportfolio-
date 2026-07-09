import { reader } from './reader'

export interface ExperienceEntry {
  date: string
  role: string
  company: string
  projects: string[]
  projectsMuted?: boolean
  current?: boolean
}

export async function getExperience(): Promise<ExperienceEntry[]> {
  const entries = await reader.collections.experience.all()
  return entries
    .map(({ slug, entry }) => ({
      slug,
      order: entry.order,
      date: entry.date,
      role: entry.role,
      company: entry.company,
      projects: [...entry.projects],
      projectsMuted: entry.projectsMuted,
      current: entry.current,
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ order: _order, slug: _slug, ...e }) => e)
}
