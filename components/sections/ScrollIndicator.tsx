'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Scroll
      </span>
      <div
        className="w-px h-12 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-border)' }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{
            height: '40%',
            backgroundColor: 'var(--color-accent)',
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: ['0%', '150%'],
                }
          }
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.4,
          }}
        />
      </div>
    </motion.div>
  )
}
