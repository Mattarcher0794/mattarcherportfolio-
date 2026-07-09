import Link from 'next/link'
import { getCaseStudies } from '@/lib/caseStudies'

export default async function SelectedWork() {
  const caseStudies = await getCaseStudies()
  return (
    <section className="section" id="work" aria-label="Selected work">
      <div className="wrap">
        <div className="section-num">[ 02 ] Selected Work · 03 case studies</div>
        <h2 className="work-head">
          Three things <em>I&apos;m proud of.</em>
        </h2>
        <p className="work-sub">
          Each shipped, each measured, each different in scale — from an 80-person banking
          platform to a million-user consumer app.
        </p>

        {caseStudies.map((cs) => (
          <article className="case" key={cs.slug}>
            <div className="case-left">
              <div className="case-meta">
                <span className="index">
                  №<em>{cs.index}</em>
                </span>
                <span>
                  {cs.company}
                  {cs.period ? ` · ${cs.period}` : ''}
                </span>
              </div>
              <h3>
                {cs.titleLead} <em>{cs.titleEm}</em>
              </h3>
              <p className="desc">{cs.description}</p>
              <div className="tags">
                {cs.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/work/${cs.slug}`} className="read">
                Read case study →
              </Link>
            </div>
            <div
              className={`case-right${cs.panelVariant !== 'ink' ? ` ${cs.panelVariant}` : ''}`}
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
          </article>
        ))}
      </div>
    </section>
  )
}
