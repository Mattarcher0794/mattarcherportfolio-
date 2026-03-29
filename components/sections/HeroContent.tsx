'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

interface HeroContentProps {
  positioningLine: string
}

export default function HeroContent({ positioningLine }: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  }

  const transition = { duration: 0.6, ease: 'easeOut' as const }

  return (
    <div className="flex flex-col items-start max-w-3xl">
      {/* Positioning line */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ ...transition, delay: 0.1 }}
        className="text-sm font-medium tracking-widest uppercase mb-6"
        style={{ color: 'var(--color-accent)' }}
      >
        {positioningLine}
      </motion.p>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ ...transition, delay: 0.2 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight mb-8"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Matt
        <br />
        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
          Archer
        </span>
      </motion.h1>

      {/* Intro */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ ...transition, delay: 0.3 }}
        className="text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Principal Product Manager at AND Digital. I lead product and design teams
        building consumer, health, and enterprise products — and I use AI-assisted
        development as a core part of how I work.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ ...transition, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="#work"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide rounded transition-colors duration-200"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-bg)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '0.85'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.opacity = '1'
          }}
        >
          View my work
        </Link>
        <a
          href="/matt-archer-cv.pdf"
          download="Matt-Archer-CV.pdf"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wide rounded border transition-colors duration-200"
          style={{
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--color-text-secondary)'
            el.style.color = 'var(--color-text-primary)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--color-border)'
          }}
        >
          Download CV
        </a>
      </motion.div>
    </div>
  )
}
