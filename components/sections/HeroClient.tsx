'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

interface HeroClientProps {
  positioningLine: string
}

// Noise SVG as a data URI — tiled grain texture
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E"

const MATT_LETTERS = ['M', 'A', 'T', 'T']
const ARCHER_LETTERS = ['A', 'R', 'C', 'H', 'E', 'R']

// Total letters before ARCHER starts, plus a small gap between words
const NAME_START_DELAY = 0.15
const LETTER_STAGGER = 0.03
const WORD_GAP = 0.04

const archerStartDelay =
  NAME_START_DELAY + MATT_LETTERS.length * LETTER_STAGGER + WORD_GAP

interface LetterProps {
  char: string
  delay: number
  colorClass: string
  reduced: boolean
}

function AnimatedLetter({ char, delay, colorClass, reduced }: LetterProps) {
  return (
    <motion.span
      initial={reduced ? false : { opacity: 0, y: -16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={`inline-block ${colorClass}`}
    >
      {char}
    </motion.span>
  )
}

export default function HeroClient({ positioningLine }: HeroClientProps) {
  const prefersReducedMotion = useReducedMotion() ?? false

  // All letters finish by: archerStartDelay + (ARCHER_LETTERS.length - 1) * LETTER_STAGGER + 0.3
  // ≈ 0.15 + 0.12 + 0.04 + 0.15 + 0.3 ≈ 0.76s — well under 0.8s total
  const lastLetterEnd =
    archerStartDelay + (ARCHER_LETTERS.length - 1) * LETTER_STAGGER + 0.3

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  }
  const fadeTransition = { duration: 0.5, ease: 'easeOut' as const }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          opacity: 0.035,
          mixBlendMode: 'screen',
        }}
      />

      {/* Geometric arc — barely visible depth element */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.045]"
      >
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[min(90vw,800px)] h-[min(90vw,800px)]"
        >
          <circle
            cx="400"
            cy="400"
            r="360"
            stroke="var(--color-accent)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="400"
            cy="400"
            r="300"
            stroke="var(--color-accent)"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 md:pt-24 pb-28">

        {/* Name treatment */}
        <h1
          aria-label="Matt Archer"
          className="select-none mb-0 font-display font-bold text-[clamp(2.975rem,10.2vw,5.95rem)] uppercase tracking-[-0.02em] leading-[0.82]"
        >
          <div className="block" style={{ marginBottom: '-0.05em' }}>
            {MATT_LETTERS.map((char, i) => (
              <AnimatedLetter
                key={`matt-${i}`}
                char={char}
                delay={prefersReducedMotion ? 0 : NAME_START_DELAY + i * LETTER_STAGGER}
                colorClass="text-[var(--color-text-primary)]"
                reduced={prefersReducedMotion}
              />
            ))}
          </div>
          <div className="block">
            {ARCHER_LETTERS.map((char, i) => (
              <AnimatedLetter
                key={`archer-${i}`}
                char={char}
                delay={prefersReducedMotion ? 0 : archerStartDelay + i * LETTER_STAGGER}
                colorClass="text-[var(--color-accent)]"
                reduced={prefersReducedMotion}
              />
            ))}
          </div>
        </h1>

        {/* Positioning line — below name, above body */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...fadeTransition, delay: prefersReducedMotion ? 0 : lastLetterEnd + 0.05 }}
          className="mt-4 mb-8 font-medium uppercase tracking-[0.2em] text-[13px] text-[var(--color-text-secondary)]"
        >
          {positioningLine}
        </motion.p>

        {/* Body copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...fadeTransition, delay: prefersReducedMotion ? 0 : lastLetterEnd + 0.18 }}
          className="text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl text-[var(--color-text-secondary)]"
        >
          Nine years building products that customers love — leading teams through discovery,
          experimentation, and launch across some of the UK&apos;s most recognised brands,
          with data and AI shaping every decision along the way.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...fadeTransition, delay: prefersReducedMotion ? 0 : lastLetterEnd + 0.32 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="#work"
            className="
              inline-flex items-center justify-center
              px-7 py-3 md:py-4 rounded
              text-sm font-medium tracking-wide
              border border-[var(--color-accent)]
              text-[var(--color-accent)]
              bg-transparent
              transition-colors duration-200
              hover:bg-[var(--color-accent-subtle)]
            "
          >
            View my work
          </Link>
          <a
            href="/matt-archer-cv.pdf"
            download="Matt-Archer-CV.pdf"
            className="
              inline-flex items-center justify-center
              px-7 py-3 md:py-4 rounded
              text-sm font-medium tracking-wide
              border border-[var(--color-accent)]
              text-[var(--color-accent)]
              bg-transparent
              transition-colors duration-200
              hover:bg-[var(--color-accent-subtle)]
            "
          >
            Download CV
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
