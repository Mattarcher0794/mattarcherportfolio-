import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '600'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Matt Archer — Principal Product Manager',
  description:
    'Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London.',
  openGraph: {
    title: 'Matt Archer — Principal Product Manager',
    description:
      'Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London.',
    url: 'https://mattarcher.me',
    siteName: 'Matt Archer',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matt Archer — Principal Product Manager',
    description:
      'Principal PM with 8+ years building consumer products. Led Wagamama Soul Club, HCA Healthcare, Subway. Based in London.',
  },
  metadataBase: new URL('https://mattarcher.me'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
