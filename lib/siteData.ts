import { reader } from './reader'

export interface HeroStat {
  target: number
  prefix: string
  suffix: string
  label: string
}

export interface SkillColumn {
  heading: string
  skills: Array<{ label: string; ai: boolean }>
}

export interface Brand {
  logo: string
  marquee: string
}

export async function getHeroStats(): Promise<HeroStat[]> {
  const data = await reader.singletons.heroStats.read()
  if (!data) return []
  return data.stats.map((s) => ({
    target: parseFloat(s.target) || 0,
    prefix: s.prefix,
    suffix: s.suffix,
    label: s.label,
  }))
}

export async function getSkills(): Promise<SkillColumn[]> {
  const data = await reader.singletons.skills.read()
  if (!data) return []
  return data.columns.map((c) => ({
    heading: c.heading,
    skills: c.skills.map((s) => ({ label: s.label, ai: s.ai })),
  }))
}

export async function getMarqueeSpeed(): Promise<number> {
  const data = await reader.singletons.brands.read()
  return data?.marqueeSpeed || 60
}

/** Built-in CV, used whenever no CV has been uploaded via Keystatic. */
const DEFAULT_CV_HREF = '/matt-archer-cv.pdf'

/**
 * The Download CV link target. Prefers a CV uploaded through Keystatic
 * (`content/downloads`), and falls back to the built-in PDF so the button
 * always works. The `download` attribute on the anchor still forces the saved
 * filename, so the stored filename here is irrelevant.
 */
export async function getCvHref(): Promise<string> {
  const data = await reader.singletons.downloads.read()
  const cv = data?.cv
  if (!cv) return DEFAULT_CV_HREF
  if (cv.startsWith('/') || cv.startsWith('http')) return cv
  return `/cv/${cv}`
}

export async function getBrands(): Promise<Brand[]> {
  const data = await reader.singletons.brands.read()
  if (!data) return []
  return data.items
    .filter((b) => b.logo.trim() !== '')
    .map((b) => ({
      logo: b.logo,
      // Fall back to the uppercased brand name when the marquee field is left
      // blank (common when adding a brand quickly in the CMS).
      marquee: b.marquee?.trim() ? b.marquee : b.logo.toUpperCase(),
    }))
}
