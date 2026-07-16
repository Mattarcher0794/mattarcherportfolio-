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
import { getCvHref, getHomeCopy } from '@/lib/siteData'
import { getCaseStudies } from '@/lib/caseStudies'

export default async function Home() {
  const [cvHref, homeCopy, caseStudies] = await Promise.all([
    getCvHref(),
    getHomeCopy(),
    getCaseStudies(),
  ])
  const navWork = caseStudies.map((c) => ({ slug: c.slug, company: c.company }))

  return (
    <>
      <Navigation cvHref={cvHref} caseStudies={navWork} />
      <main>
        <Hero cvHref={cvHref} heroBody={homeCopy.heroBody} />
        <Marquee />
        <About para1={homeCopy.aboutPara1} para2={homeCopy.aboutPara2} />
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
