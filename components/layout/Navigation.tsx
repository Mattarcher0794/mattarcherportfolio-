'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export interface NavCaseStudy {
  slug: string
  company: string
}

export default function Navigation({
  cvHref,
  caseStudies = [],
}: {
  cvHref: string
  caseStudies?: NavCaseStudy[]
}) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  // Off the homepage, section anchors must jump home first (`/#work`), not to a
  // same-page hash that doesn't exist on a case-study route.
  const onHome = pathname === '/'
  const base = onHome ? '' : '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hasWorkMenu = caseStudies.length > 0

  return (
    <nav className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-row">
        <Link href={onHome ? '#top' : '/'} className="mark" aria-label="Matt Archer, back to top">
          <span className="blob">
            <span>MA</span>
          </span>
          <span className="name">Matt Archer</span>
        </Link>
        <div className="nav-links">
          {hasWorkMenu ? (
            <div className="nav-work">
              <Link href={`${base}#work`} className="nav-work-trigger" aria-haspopup="true">
                Work <span className="caret" aria-hidden="true">▾</span>
              </Link>
              <div className="nav-work-menu" role="menu">
                {caseStudies.map((c) => {
                  const [name, sub] = c.company.split('·').map((s) => s.trim())
                  return (
                    <Link
                      key={c.slug}
                      href={`/work/${c.slug}`}
                      role="menuitem"
                      className="nav-work-item"
                    >
                      <span className="nw-name">{name}</span>
                      {sub ? <span className="nw-sub">{sub}</span> : null}
                    </Link>
                  )
                })}
                <Link href={`${base}#work`} role="menuitem" className="nav-work-all">
                  All work →
                </Link>
              </div>
            </div>
          ) : (
            <Link href={`${base}#work`}>Work</Link>
          )}
          <Link href={`${base}#about`}>About</Link>
          <Link href={`${base}#contact`}>Contact</Link>
          <a href={cvHref} download="Matt-Archer-CV.pdf" className="cv">
            Download CV <span className="arr">↓</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
