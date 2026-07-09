import { Fragment } from 'react'
import { getBrands } from '@/lib/siteData'

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
  const brands = await getBrands()
  const names = brands.map((b) => b.marquee)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Track names={names} />
        <Track names={names} />
      </div>
    </div>
  )
}
