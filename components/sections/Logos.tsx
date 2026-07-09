import { getBrands } from '@/lib/siteData'

// Widest column count in the responsive grid. Padding the grid up to a multiple
// of this keeps every row complete at all breakpoints (6 is divisible by the
// 3-col and 2-col layouts too), so an odd brand count never leaves an orphaned,
// corner-clipped cell.
const COLS = 6

export default async function Logos() {
  const brands = await getBrands()
  const fillerCount = (COLS - (brands.length % COLS)) % COLS

  return (
    <section className="section" id="brands" aria-label="Brands">
      <div className="wrap">
        <div className="section-num">[ 05 ] Brands I&apos;ve worked with</div>
        <h2 className="logos-h">
          Good <em>company.</em>
        </h2>
        <div className="logo-grid">
          {brands.map((brand, i) => (
            <div className="logo-cell" key={brand.logo}>
              <span className="index">{String(i + 1).padStart(2, '0')}</span>
              {brand.logo}
            </div>
          ))}
          {Array.from({ length: fillerCount }).map((_, i) => (
            <div className="logo-cell is-filler" key={`filler-${i}`} aria-hidden="true" />
          ))}
        </div>
      </div>
    </section>
  )
}
