export type GeoVariant = 'AU' | 'DEFAULT'

export interface SiteContent {
  heroPositioningLine: string
  aboutCTA: string
  contactHeadline: string
  contactSubline: string
  metaDescription: string
}

export const content: Record<GeoVariant, SiteContent> = {
  AU: {
    heroPositioningLine: 'PRINCIPAL PRODUCT MANAGER. SYDNEY.',
    aboutCTA:
      "I'm relocating to Sydney in September 2026 and actively talking to teams about what's next. If you're building something worth working on, I'd love to hear about it.",
    contactHeadline: "Let's talk Sydney.",
    contactSubline:
      "I'm relocating to Sydney in September 2026. Happy to connect now ahead of arrival.",
    metaDescription:
      'Principal PM relocating to Sydney, September 2026. Led Wagamama Soul Club, HCA Healthcare, Subway. Open to conversations now.',
  },
  DEFAULT: {
    heroPositioningLine: 'PRINCIPAL PRODUCT MANAGER. LONDON.',
    aboutCTA:
      'Based in London. Open to senior PM roles and consulting engagements.',
    contactHeadline: "Let's work together.",
    contactSubline:
      "Whether you're looking for a senior PM or a consulting partner, I'd love to hear what you're building.",
    metaDescription:
      'Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London.',
  },
}

export function getContent(country: string | null | undefined): SiteContent {
  if (country === 'AU') return content.AU
  return content.DEFAULT
}
