export type GeoVariant = 'AU' | 'DEFAULT'

export interface FootItem {
  k: string
  v: string
  href?: string
}

export interface SiteContent {
  /** Hero pill above the name */
  heroTag: string
  /** Location suffix on the hero role line (privacy-sensitive) */
  heroLocation: string
  /** Contact headline — split so the emphasised word can be styled */
  contactHeadlineLead: string
  contactHeadlineEm: string
  contactSub: string
  /** Four-up footer block inside the contact panel */
  contactFoot: [FootItem, FootItem, FootItem, FootItem]
  metaDescription: string
}

const EMAIL = 'archermatthew35@gmail.com'

export const content: Record<GeoVariant, SiteContent> = {
  AU: {
    heroTag: 'Open to new roles · Oct 2026',
    heroLocation: 'Sydney, NSW',
    contactHeadlineLead: "Let's talk",
    contactHeadlineEm: 'Sydney.',
    contactSub:
      "I'm relocating to Sydney in September 2026 and talking to teams now about what's next. If you're building something worth working on, I'd love to hear about it.",
    contactFoot: [
      { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
      { k: 'Based in', v: 'London, UK' },
      { k: 'Moving to', v: "Sydney · Sept '26" },
      { k: 'Reply within', v: '48 hours' },
    ],
    metaDescription:
      'Principal Product Manager relocating to Sydney, September 2026. Led product at Lloyds Banking Group, Wagamama and HCA Healthcare. Open to conversations now.',
  },
  DEFAULT: {
    heroTag: 'Available for select work · 2026',
    heroLocation: 'London, UK',
    contactHeadlineLead: "Let's work",
    contactHeadlineEm: 'together.',
    contactSub:
      "Whether you're looking for a senior PM or a consulting partner, I'd love to hear what you're building.",
    contactFoot: [
      { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
      { k: 'Based in', v: 'London, UK' },
      { k: 'Availability', v: 'Select work · 2026' },
      { k: 'Reply within', v: '48 hours' },
    ],
    metaDescription:
      'Principal Product Manager with 9+ years across B2C and B2B at scale. Led product at Lloyds Banking Group, Wagamama and HCA Healthcare. Based in London.',
  },
}

export function getContent(country: string | null | undefined): SiteContent {
  if (country === 'AU') return content.AU
  return content.DEFAULT
}
