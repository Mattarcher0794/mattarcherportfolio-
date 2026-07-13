import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import SelectedWork from '@/components/sections/SelectedWork'
import Skills from '@/components/sections/Skills'
import Timeline from '@/components/sections/Timeline'
import Logos from '@/components/sections/Logos'
import Contact from '@/components/sections/Contact'
import Interactions from '@/components/ui/Interactions'
import { getCvHref } from '@/lib/siteData'

export default async function Home() {
  const cvHref = await getCvHref()

  return (
    <>
      <Navigation cvHref={cvHref} />
      <main>
        <Hero cvHref={cvHref} />
        <Marquee />
        <About />
        <SelectedWork />
        <Skills />
        <Timeline />
        <Logos />
        <Contact />
      </main>
      <Footer />
      <Interactions />
    </>
  )
}
