import { reader } from './reader'

export type GeoVariant = 'AU' | 'DEFAULT'

export interface FootItem {
  k: string
  v: string
  href?: string
}

export interface SiteContent {
  heroTag: string
  heroLocation: string
  contactHeadlineLead: string
  contactHeadlineEm: string
  contactSub: string
  contactFoot: FootItem[]
  metaDescription: string
}

type RawVariant = NonNullable<
  Awaited<ReturnType<typeof reader.singletons.siteCopy.read>>
>['default']

function normalise(v: RawVariant): SiteContent {
  return {
    heroTag: v.heroTag,
    heroLocation: v.heroLocation,
    contactHeadlineLead: v.contactHeadlineLead,
    contactHeadlineEm: v.contactHeadlineEm,
    contactSub: v.contactSub,
    metaDescription: v.metaDescription,
    contactFoot: v.contactFoot.map((f) => ({
      k: f.k,
      v: f.v,
      href: f.href || undefined,
    })),
  }
}

/**
 * Geo selection. The fail-safe-to-UK guarantee lives HERE, in code under test —
 * never in the CMS. Only `AU` gets the Sydney variant; everything else (unknown,
 * failure, non-AU) gets DEFAULT.
 */
export async function getContent(
  country: string | null | undefined
): Promise<SiteContent> {
  const copy = await reader.singletons.siteCopy.read()
  if (!copy) {
    throw new Error('siteCopy content missing — content/site-copy not found')
  }
  return normalise(country === 'AU' ? copy.au : copy.default)
}
