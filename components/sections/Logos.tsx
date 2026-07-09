const logos = [
  'Lloyds Banking Group',
  'wagamama',
  'HCA',
  'SUBWAY',
  'British Airways',
  'AND.',
]

export default function Logos() {
  return (
    <section className="section" id="brands" aria-label="Brands">
      <div className="wrap">
        <div className="section-num">[ 05 ] Brands I&apos;ve worked with</div>
        <h2 className="logos-h">
          Good <em>company.</em>
        </h2>
        <div className="logo-grid">
          {logos.map((logo, i) => (
            <div className="logo-cell" key={logo}>
              <span className="index">{String(i + 1).padStart(2, '0')}</span>
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
