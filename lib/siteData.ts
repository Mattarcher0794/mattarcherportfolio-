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

export interface HomeCopy {
  heroBody: string
  aboutPara1: string
  aboutPara2: string
}

/**
 * Fallback home copy, used per-field whenever the Keystatic entry is empty.
 * Keeps the site rendering its intended copy even before anything is authored
 * in the CMS. `**bold**` / `*italic*` are rendered via `renderInline`.
 */
const DEFAULT_HOME_COPY: HomeCopy = {
  heroBody:
    'Shipping high-impact digital products across financial services, retail, healthtech and the public sector, from zero-to-one consumer apps to enterprise AI automation. Currently leading a strategic platform outcome at Lloyds Banking Group, with COO-level visibility.',
  aboutPara1:
    "**9+ years leading cross-functional teams**, owning the full product lifecycle across both consultancy and embedded leadership. I've worked directly with everyone from consumers and patients through to brokers, relationship managers and BDMs.",
  aboutPara2:
    "Most recently I designed and built an internal AI product-development programme, upskilling teams on spec-driven development and putting AI to work in how products get made. It's now being piloted with a client.",
}

/**
 * The three editable home-page body paragraphs (hero intro + two About paras).
 * Falls back to DEFAULT_HOME_COPY field-by-field so a blank CMS field never
 * leaves an empty paragraph on the page.
 */
export async function getHomeCopy(): Promise<HomeCopy> {
  const data = await reader.singletons.homeCopy.read()
  return {
    heroBody: data?.heroBody?.trim() || DEFAULT_HOME_COPY.heroBody,
    aboutPara1: data?.aboutPara1?.trim() || DEFAULT_HOME_COPY.aboutPara1,
    aboutPara2: data?.aboutPara2?.trim() || DEFAULT_HOME_COPY.aboutPara2,
  }
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
