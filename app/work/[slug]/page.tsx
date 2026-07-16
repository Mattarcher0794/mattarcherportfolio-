import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Interactions from '@/components/ui/Interactions'
import {
  getCaseStudies,
  getCaseStudyDetail,
  getCaseStudySlugs,
  SECTION_KEYS,
  SECTION_LABELS,
} from '@/lib/caseStudies'
import { getCvHref } from '@/lib/siteData'
import { renderBody } from '@/lib/richText'
import { brandLogos, brandSlug } from '@/lib/brandLogos'

// Only the authored case studies exist as routes; anything else 404s.
export const dynamicParams = false

/** The company name without its "· sub-line" suffix, e.g. "Wagamama". */
function companyName(company: string): string {
  return company.split('·')[0].trim()
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyDetail(slug)
  if (!cs) return {}
  const name = companyName(cs.company)
  const title = `${name} · Case study — Matt Archer`
  const url = `https://mattarcher.me/work/${slug}`
  return {
    title,
    description: cs.description,
    alternates: { canonical: url },
    openGraph: { title, description: cs.description, url, type: 'article' },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [cs, all, cvHref] = await Promise.all([
    getCaseStudyDetail(slug),
    getCaseStudies(),
    getCvHref(),
  ])
  if (!cs) notFound()

  // Prev/next wrap around the order-sorted list (Lloyds → HCA → Wagamama → …).
  const idx = all.findIndex((c) => c.slug === slug)
  const prev = idx >= 0 ? all[(idx - 1 + all.length) % all.length] : null
  const next = idx >= 0 ? all[(idx + 1) % all.length] : null

  const name = companyName(cs.company)
  const logoSlug = brandSlug(name)
  const logoMark = brandLogos[logoSlug]
  const navWork = all.map((c) => ({ slug: c.slug, company: c.company }))

  return (
    <>
      <Navigation cvHref={cvHref} caseStudies={navWork} />
      <main className="cs" id="top">
        <header className="cs-hero">
          <div className="wrap">
            <div className="section-num">
              <span className="sn-num">№{cs.index}</span> {name}
              {cs.period ? <span className="sn-sub">· {cs.period}</span> : null}
            </div>
            {logoMark ? (
              <span
                className="cs-logo"
                data-brand={logoSlug}
                role="img"
                aria-label={name}
                dangerouslySetInnerHTML={{ __html: logoMark }}
              />
            ) : null}
            <h1 className="cs-title">
              {cs.titleLead} <em>{cs.titleEm}</em>
            </h1>
            <div className="tags">
              {cs.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="cs-metrics-wrap" aria-label="Outcome at a glance">
          <div className="wrap">
            <div
              className={`cs-metrics${cs.panelVariant !== 'ink' ? ` ${cs.panelVariant}` : ''}`}
            >
              <div className="label">{cs.panelLabel}</div>
              <div className="dominant">
                {cs.dominant}
                <em>{cs.dominantEm}</em>
              </div>
              <div className="dominant-cap">{cs.dominantCaption}</div>
              <div className="secondary">
                {cs.secondary.map((s) => (
                  <div key={s.label}>
                    <div className="v">{s.value}</div>
                    <div className="l">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {SECTION_KEYS.map((key, i) => {
          const section = cs.sections[key]
          const body = renderBody(section.body)
          if (!body && section.images.length === 0) return null
          // 3+ images become a full-bleed, art-directed showcase band; one or
          // two sit inline beside the prose.
          const showcase = section.images.length >= 3
          return (
            <section className="section cs-section" key={key} aria-label={SECTION_LABELS[key]}>
              <div className="wrap">
                <div className="section-num">
                  <span className="sn-num">{String(i + 1).padStart(2, '0')}</span>{' '}
                  {SECTION_LABELS[key]}
                </div>
                {body ? <div className="cs-body">{body}</div> : null}
                {!showcase && section.images.length > 0 ? (
                  <div className="cs-shots" data-count={section.images.length}>
                    {section.images.map((im) => (
                      <figure className="cs-shot" key={im.src}>
                        <div className="cs-shot-frame">
                          <Image
                            src={im.src}
                            alt={im.alt}
                            fill
                            sizes="(max-width: 720px) 60vw, 220px"
                            className="cs-shot-img"
                          />
                        </div>
                        {im.caption ? <figcaption>{im.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
              {showcase ? (
                <div className="cs-showcase">
                  <div className="cs-showcase-track">
                    {section.images.map((im, idx) => (
                      <figure
                        className={`cs-shot${idx === 0 ? ' anchor' : ''}`}
                        key={im.src}
                      >
                        <div className="cs-shot-frame">
                          <Image
                            src={im.src}
                            alt={im.alt}
                            fill
                            sizes="(max-width: 980px) 60vw, 240px"
                            className="cs-shot-img"
                          />
                        </div>
                        {im.caption ? <figcaption>{im.caption}</figcaption> : null}
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          )
        })}

        <section className="section cs-foot">
          <div className="wrap">
            <div className="cs-cta">
              <p className="cs-cta-line">
                Want the detail behind the headline? <em>The CV has the rest.</em>
              </p>
              <a href={cvHref} download="Matt-Archer-CV.pdf" className="cs-cv">
                Download CV <span className="arr">↓</span>
              </a>
            </div>

            <nav className="cs-nav" aria-label="More case studies">
              {prev ? (
                <Link href={`/work/${prev.slug}`} className="cs-nav-card prev">
                  <span className="cs-nav-dir">← Previous</span>
                  <span className="cs-nav-co">{companyName(prev.company)}</span>
                  <span className="cs-nav-ttl">
                    {prev.titleLead} {prev.titleEm}
                  </span>
                </Link>
              ) : null}
              {next ? (
                <Link href={`/work/${next.slug}`} className="cs-nav-card next">
                  <span className="cs-nav-dir">Next →</span>
                  <span className="cs-nav-co">{companyName(next.company)}</span>
                  <span className="cs-nav-ttl">
                    {next.titleLead} {next.titleEm}
                  </span>
                </Link>
              ) : null}
            </nav>

            <Link href="/#work" className="cs-back">
              ← Back to all work
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Interactions />
    </>
  )
}
