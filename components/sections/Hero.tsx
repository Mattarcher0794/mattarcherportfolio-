import { headers } from 'next/headers'
import Link from 'next/link'
import { getContent } from '@/lib/content'
import { getHeroStats, type HeroStat } from '@/lib/siteData'
import { renderInline } from '@/lib/richText'

function formatStat({ target, prefix, suffix }: HeroStat): string {
  const decimals = target % 1 !== 0 ? 1 : 0
  return `${prefix}${target.toFixed(decimals)}${suffix}`
}

export default async function Hero({
  cvHref,
  heroBody,
}: {
  cvHref: string
  heroBody: string
}) {
  const headersList = await headers()
  const country = headersList.get('x-user-country')
  const [site, heroStats] = await Promise.all([getContent(country), getHeroStats()])

  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-intro">
        <span className="hblob hblob-1" aria-hidden="true">
          <span className="hblob-inner" />
        </span>
        <span className="hblob hblob-2" aria-hidden="true">
          <span className="hblob-inner" />
        </span>

        <div className="hero-top">
          <p className="avail">
            <span className="avail-dot" aria-hidden="true" />
            <span className="avail-label">Available</span>
            <span className="avail-sep" aria-hidden="true">·</span>
            <span className="avail-value">{site.heroTag}</span>
          </p>
        </div>

        <h1 className="hero-name">
          Matt <span className="archer">Archer.</span>
        </h1>
        <div className="hero-role">
          Principal Product Manager <span>· {site.heroLocation}</span>
        </div>

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span
                className="stat-num"
                data-target={stat.target}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
              >
                {formatStat(stat)}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-bottom">
        <div>
          <p className="hero-positioning">
            Product leadership across B2C and B2B, <em>at scale.</em>
          </p>
        </div>
        <div>
          <p className="hero-body">{renderInline(heroBody)}</p>
          <div className="cta-row">
            <Link href="#work" className="btn primary">
              View my work <span className="arr">↓</span>
            </Link>
            <a href={cvHref} download="Matt-Archer-CV.pdf" className="btn">
              Download CV <span className="arr">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
