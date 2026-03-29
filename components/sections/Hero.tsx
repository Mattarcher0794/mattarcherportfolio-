import { headers } from 'next/headers'
import { getContent } from '@/lib/content'
import HeroClient from './HeroClient'

export default async function Hero() {
  const headersList = await headers()
  const country = headersList.get('x-user-country')
  const siteContent = getContent(country)

  return <HeroClient positioningLine={siteContent.heroPositioningLine} />
}
