'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-[var(--color-text-secondary)]"
      >
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="23"
            rx="7.5"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <motion.rect
            x="6.5"
            y="4"
            width="3"
            height="5"
            rx="1.5"
            fill="currentColor"
            animate={
              prefersReducedMotion ? undefined : { y: [0, 8, 0], opacity: [1, 0.2, 1] }
            }
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
