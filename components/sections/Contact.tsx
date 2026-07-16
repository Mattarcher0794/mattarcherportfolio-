import { headers } from 'next/headers'
import { getContent } from '@/lib/content'

export default async function Contact() {
  const headersList = await headers()
  const country = headersList.get('x-user-country')
  const site = await getContent(country)

  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="wrap">
        <div className="contact-block">
          <div className="section-num">
            <span className="sn-num">06</span> Contact
          </div>
          <h2 className="contact-h">
            {site.contactHeadlineLead} <em>{site.contactHeadlineEm}</em>
          </h2>
          <p className="contact-sub">{site.contactSub}</p>
          <div className="contact-cta">
            <a href="mailto:archermatthew35@gmail.com" className="btn primary">
              Send a message <span className="arr">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/mattarcher1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              LinkedIn <span className="arr">↗</span>
            </a>
            <a href="/matt-archer-cv.pdf" download="Matt-Archer-CV.pdf" className="btn">
              Download CV <span className="arr">↓</span>
            </a>
          </div>
          <div className="contact-foot">
            {site.contactFoot.map((item) => (
              <div key={item.k}>
                <div className="k">{item.k}</div>
                <div className="v">
                  {item.href ? <a href={item.href}>{item.v}</a> : item.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
