'use client'

import { useEffect } from 'react'

/**
 * Progressive-enhancement layer for the Bold Merge design.
 * Mirrors the original mockup's vanilla script: scroll-reveal, a
 * cursor-following blob, hero blob parallax, and animated stat counters.
 *
 * Everything degrades gracefully — with JS disabled, all content is fully
 * visible (reveal classes are added here, not in the server markup), and
 * `prefers-reduced-motion` disables the cursor, parallax and count-up.
 */
export default function Interactions() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const cleanups: Array<() => void> = []

    // ── Scroll reveal ──────────────────────────────────────────────────────
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.section, .case, .tl-row, .logo-cell')
    )

    if (prefersReduced) {
      revealTargets.forEach((el) => el.classList.add('reveal', 'in'))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { rootMargin: '-8% 0px -8% 0px' }
      )
      revealTargets.forEach((el) => {
        el.classList.add('reveal')
        io.observe(el)
      })
      cleanups.push(() => io.disconnect())
    }

    // ── Cursor-following blob + hero parallax (pointer devices only) ────────
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (!prefersReduced && finePointer) {
      const cur = document.getElementById('cursor-blob')
      let tx = 0
      let ty = 0
      let cx = 0
      let cy = 0
      let raf = 0

      const onMove = (e: MouseEvent) => {
        tx = e.clientX
        ty = e.clientY
      }
      const tick = () => {
        cx += (tx - cx) * 0.18
        cy += (ty - cy) * 0.18
        if (cur) {
          cur.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
        }
        raf = requestAnimationFrame(tick)
      }
      window.addEventListener('mousemove', onMove)
      raf = requestAnimationFrame(tick)
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(raf)
      })

      const hoverTargets = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a, .btn, .skill-row span, .logo-cell, .case'
        )
      )
      const enter = () => {
        if (!cur) return
        cur.style.width = '30px'
        cur.style.height = '30px'
        cur.style.opacity = '0.45'
      }
      const leave = () => {
        if (!cur) return
        cur.style.width = '12px'
        cur.style.height = '12px'
        cur.style.opacity = '0.7'
      }
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
      cleanups.push(() =>
        hoverTargets.forEach((el) => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      )

      // Hero blob parallax
      const hero = document.querySelector<HTMLElement>('.hero')
      const hblobs = Array.from(document.querySelectorAll<HTMLElement>('.hblob'))
      if (hero && hblobs.length) {
        const onHeroMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          hblobs.forEach((b, i) => {
            const depth = (i + 1) * 10
            b.style.transform = `translate(${nx * depth}px, ${ny * depth}px)`
          })
        }
        const onHeroLeave = () => {
          hblobs.forEach((b) => {
            b.style.transform = 'translate(0, 0)'
          })
        }
        hero.addEventListener('mousemove', onHeroMove)
        hero.addEventListener('mouseleave', onHeroLeave)
        cleanups.push(() => {
          hero.removeEventListener('mousemove', onHeroMove)
          hero.removeEventListener('mouseleave', onHeroLeave)
        })
      }
    }

    // ── Marquee: JS auto-scroll + drag-to-scratch ─────────────────────────
    // Takes over from the CSS keyframe (via .is-interactive) so the ticker can
    // be dragged. Auto-scrolls left; faster on mobile. touch-action:pan-y (CSS)
    // keeps vertical page scrolling intact while horizontal drags scrub.
    const marquee = document.querySelector<HTMLElement>('.marquee')
    const mqTrack = marquee?.querySelector<HTMLElement>('.marquee-track')
    if (marquee && mqTrack) {
      marquee.classList.add('is-interactive')
      // px/sec, CMS-controlled via data-speed on .marquee (falls back to 60)
      const speed = parseFloat(marquee.dataset.speed || '') || 60

      // Seamless loop distance = where the 2nd (duplicate) track copy starts.
      // offsetLeft is unaffected by transform, so it stays accurate.
      const loopLen = () => (mqTrack.children[1] as HTMLElement)?.offsetLeft || mqTrack.offsetWidth
      let half = loopLen() || 1
      let offset = 0
      let dragging = false
      let startX = 0
      let startOffset = 0
      let last = performance.now()
      let raf = 0

      const wrap = () => {
        if (half <= 0) return
        while (offset <= -half) offset += half
        while (offset > 0) offset -= half
      }
      const apply = () => {
        mqTrack.style.transform = `translateX(${offset}px)`
      }
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05)
        last = now
        if (!dragging && !prefersReduced) offset -= speed * dt
        wrap()
        apply()
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)

      const onDown = (e: PointerEvent) => {
        dragging = true
        startX = e.clientX
        startOffset = offset
        marquee.classList.add('is-dragging')
      }
      const onMoveP = (e: PointerEvent) => {
        if (!dragging) return
        offset = startOffset + (e.clientX - startX)
        wrap()
        apply()
      }
      const onUp = () => {
        if (!dragging) return
        dragging = false
        last = performance.now() // avoid a jump from the paused interval
        marquee.classList.remove('is-dragging')
      }
      const recalc = () => {
        half = loopLen() || 1
      }

      marquee.addEventListener('pointerdown', onDown)
      marquee.addEventListener('pointermove', onMoveP)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
      window.addEventListener('resize', recalc)
      document.fonts?.ready.then(recalc).catch(() => {})

      cleanups.push(() => {
        cancelAnimationFrame(raf)
        marquee.removeEventListener('pointerdown', onDown)
        marquee.removeEventListener('pointermove', onMoveP)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        window.removeEventListener('resize', recalc)
        marquee.classList.remove('is-interactive', 'is-dragging')
      })
    }

    // ── Animated stat counters ─────────────────────────────────────────────
    const stats = Array.from(document.querySelectorAll<HTMLElement>('.stat-num'))
    const timers: number[] = []

    stats.forEach((el) => {
      const target = parseFloat(el.dataset.target || '0')
      const prefix = el.dataset.prefix || ''
      const suffix = el.dataset.suffix || ''
      const decimals = target % 1 !== 0 ? 1 : 0

      if (prefersReduced) {
        el.textContent = prefix + target + suffix
        return
      }

      // Reset to zero on hydration so the count-up starts from 0 (SSR renders
      // the final value, so no-JS users still see the real number).
      el.textContent = prefix + (0).toFixed(decimals) + suffix

      const dur = 1300
      let start: number | null = null
      const step = (ts: number) => {
        if (start === null) start = ts
        const p = Math.min((ts - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      const t = window.setTimeout(() => requestAnimationFrame(step), 500)
      timers.push(t)
    })
    cleanups.push(() => timers.forEach((t) => clearTimeout(t)))

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return <div className="cursor-follow" id="cursor-blob" aria-hidden="true" />
}
