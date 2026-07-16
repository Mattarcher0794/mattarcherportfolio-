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
  const [menuOpen, setMenuOpen] = useState(false)
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

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // While the mobile menu is open: Escape closes it and the page scroll locks.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const hasWorkMenu = caseStudies.length > 0
  const close = () => setMenuOpen(false)

  return (
    <nav className={`top${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
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
                Work
                <svg
                  className="caret"
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.75 4.5 6 7.75 9.25 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-burger-box" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`nav-mobile${menuOpen ? ' open' : ''}`}>
        <div className="nav-mobile-inner">
          {hasWorkMenu ? (
            <div className="nm-group">
              <span className="nm-label">Work</span>
              {caseStudies.map((c) => {
                const [name, sub] = c.company.split('·').map((s) => s.trim())
                return (
                  <Link key={c.slug} href={`/work/${c.slug}`} className="nm-case" onClick={close}>
                    <span className="nm-name">{name}</span>
                    {sub ? <span className="nm-sub">{sub}</span> : null}
                  </Link>
                )
              })}
              <Link href={`${base}#work`} className="nm-all" onClick={close}>
                All work →
              </Link>
            </div>
          ) : null}
          <Link href={`${base}#about`} className="nm-link" onClick={close}>
            About
          </Link>
          <Link href={`${base}#contact`} className="nm-link" onClick={close}>
            Contact
          </Link>
          <a href={cvHref} download="Matt-Archer-CV.pdf" className="nm-cv" onClick={close}>
            Download CV <span className="arr">↓</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
