import { renderInline } from '@/lib/richText'

export default function About({ para1, para2 }: { para1: string; para2: string }) {
  return (
    <section className="section" id="about" aria-label="About">
      <div className="wrap">
        <div className="section-num">
          <span className="sn-num">01</span> About
        </div>
        <h2 className="about-h">
          A product leader who&apos;s now <em>building with AI.</em>
        </h2>
        <div className="about-grid">
          <p>{renderInline(para1)}</p>
          <p>{renderInline(para2)}</p>
        </div>
        <div className="about-edu">
          BSc (Hons) Business Information Technology, First Class, Bournemouth University
        </div>
      </div>
    </section>
  )
}
