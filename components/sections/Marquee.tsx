import { Fragment } from 'react'
import { getBrands, getMarqueeSpeed } from '@/lib/siteData'

function Track({ names }: { names: string[] }) {
  return (
    <span>
      {names.map((name) => (
        <Fragment key={name}>
          {name} <span className="sep">/</span>{' '}
        </Fragment>
      ))}
    </span>
  )
}

export default async function Marquee() {
  const [brands, speed] = await Promise.all([getBrands(), getMarqueeSpeed()])
  const names = brands.map((b) => b.marquee)
  return (
    <div className="marquee" aria-hidden="true" data-speed={speed}>
      <div className="marquee-track">
        <Track names={names} />
        <Track names={names} />
      </div>
    </div>
  )
}
