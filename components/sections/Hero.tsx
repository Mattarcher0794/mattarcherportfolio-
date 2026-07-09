import { headers } from 'next/headers'
import Link from 'next/link'
import { getContent } from '@/lib/content'
import { getHeroStats, type HeroStat } from '@/lib/siteData'

function formatStat({ target, prefix, suffix }: HeroStat): string {
  const decimals = target % 1 !== 0 ? 1 : 0
  return `${prefix}${target.toFixed(decimals)}${suffix}`
}

export default async function Hero() {
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
          <span className="tag">{site.heroTag}</span>
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
          <p className="hero-body">
            Shipping high-impact digital products across financial services, retail,
            healthtech and the public sector — from zero-to-one consumer apps to enterprise
            AI automation. Currently leading a strategic platform outcome at Lloyds Banking
            Group, with COO-level visibility.
          </p>
          <div className="cta-row">
            <Link href="#work" className="btn primary">
              View my work <span className="arr">↓</span>
            </Link>
            <a href="/matt-archer-cv.pdf" download="Matt-Archer-CV.pdf" className="btn">
              Download CV <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
