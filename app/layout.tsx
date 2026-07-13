import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import { headers } from 'next/headers'
import { getContent } from '@/lib/content'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const country = headersList.get('x-user-country')
  const site = await getContent(country)

  const title = 'Matt Archer · Principal Product Manager'

  return {
    title,
    description: site.metaDescription,
    openGraph: {
      title,
      description: site.metaDescription,
      url: 'https://mattarcher.me',
      siteName: 'Matt Archer',
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: site.metaDescription,
    },
    metadataBase: new URL('https://mattarcher.me'),
    alternates: { canonical: 'https://mattarcher.me' },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${bricolage.variable} ${hanken.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
