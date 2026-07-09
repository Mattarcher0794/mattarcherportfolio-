import { Fragment } from 'react'

const brands = [
  'LLOYDS BANKING GROUP',
  'WAGAMAMA',
  'HCA HEALTHCARE',
  'BRITISH AIRWAYS',
  'SUBWAY',
  'AND DIGITAL',
]

function Track() {
  return (
    <span>
      {brands.map((brand) => (
        <Fragment key={brand}>
          {brand} <span className="sep">/</span>{' '}
        </Fragment>
      ))}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Track />
        <Track />
      </div>
    </div>
  )
}
