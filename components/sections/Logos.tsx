import { getBrands } from '@/lib/siteData'

export default async function Logos() {
  const brands = await getBrands()

  return (
    <section className="section" id="brands" aria-label="Brands">
      <div className="wrap">
        <div className="section-num">
          <span className="sn-num">05</span> Brands I&apos;ve worked with
        </div>
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
        </div>
      </div>
    </section>
  )
}
