import { headers } from 'next/headers'
import { getContent } from '@/lib/content'
import HeroContent from './HeroContent'
import ScrollIndicator from './ScrollIndicator'

export default async function Hero() {
  const headersList = await headers()
  const country = headersList.get('x-user-country')
  const siteContent = getContent(country)

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16"
      aria-label="Introduction"
    >
      {/* Subtle grid/texture background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-accent-subtle) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <HeroContent positioningLine={siteContent.heroPositioningLine} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  )
}
