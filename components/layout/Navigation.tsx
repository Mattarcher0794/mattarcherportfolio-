'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-row">
        <Link href="#top" className="mark" aria-label="Matt Archer — top">
          <span className="blob">
            <span>MA</span>
          </span>
          <span className="name">Matt Archer</span>
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href="/matt-archer-cv.pdf" download="Matt-Archer-CV.pdf" className="cv">
            Download CV ↓
          </a>
        </div>
      </div>
    </nav>
  )
}
