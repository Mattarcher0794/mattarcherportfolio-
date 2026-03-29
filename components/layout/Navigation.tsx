'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuVariants = {
    closed: { opacity: 0, y: -8 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled
          ? 'color-mix(in srgb, var(--color-bg) 95%, transparent)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Monogram */}
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
          aria-label="Matt Archer — home"
        >
          MA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--color-text-secondary)')
              }
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/matt-archer-cv.pdf"
            download="Matt-Archer-CV.pdf"
            className="text-sm font-medium px-4 py-2 rounded border transition-colors duration-200"
            style={{
              color: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = 'var(--color-accent)'
              el.style.color = 'var(--color-bg)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.backgroundColor = 'transparent'
              el.style.color = 'var(--color-accent)'
            }}
          >
            Download CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px transition-transform duration-200"
            style={{
              backgroundColor: 'var(--color-text-primary)',
              transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-opacity duration-200"
            style={{
              backgroundColor: 'var(--color-text-primary)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-transform duration-200"
            style={{
              backgroundColor: 'var(--color-text-primary)',
              transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={prefersReducedMotion ? false : menuVariants.closed}
            animate={menuVariants.open}
            exit={prefersReducedMotion ? undefined : menuVariants.closed}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium py-2"
                style={{ color: 'var(--color-text-primary)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/matt-archer-cv.pdf"
              download="Matt-Archer-CV.pdf"
              className="text-sm font-medium px-4 py-3 rounded border text-center mt-2"
              style={{
                color: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              }}
              onClick={() => setMenuOpen(false)}
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
