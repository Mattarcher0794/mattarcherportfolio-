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

    // ── Freeze motion during pinch-zoom ────────────────────────────────────
    // Continuous animation while the visual viewport is being scaled is what
    // makes mobile pinch-zoom judder. When zoomed in (scale > 1) we add
    // `is-zooming` to <html>, which pauses CSS animations and halts the JS
    // marquee loop. Zoom stays fully available — we just stop animating during
    // it. (We can't disable zoom on iOS Safari anyway; it ignores user-scalable.)
    const vv = window.visualViewport
    const onZoom = () => {
      document.documentElement.classList.toggle('is-zooming', !!vv && vv.scale > 1.01)
    }
    if (vv) {
      vv.addEventListener('resize', onZoom)
      onZoom()
      cleanups.push(() => vv.removeEventListener('resize', onZoom))
    }

    // ── Scroll reveal ──────────────────────────────────────────────────────
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>('.section, .tl-row, .logo-cell')
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

    // ── Selected Work: "deal and settle" entrance ─────────────────────────
    // Cards start as a fanned deck (collapsed, tilted, off-screen) and deal out
    // into the readable list when the section scrolls in. No JS / reduced motion
    // leaves them in their natural, fully-visible positions.
    const workSection = document.querySelector<HTMLElement>('#work')
    if (!prefersReduced && workSection) {
      const cards = Array.from(workSection.querySelectorAll<HTMLElement>('.case'))
      if (cards.length) {
        const narrow = window.matchMedia('(max-width: 720px)').matches
        const peek = narrow ? 10 : 16
        const rotStep = narrow ? 2 : 4
        const scaleStep = narrow ? 0.03 : 0.05
        const baseTop = cards[0].offsetTop

        cards.forEach((c, i) => {
          const collapseY = baseTop + i * peek - c.offsetTop
          const rot = i === 0 ? 0 : i % 2 === 1 ? rotStep : -rotStep
          c.style.setProperty('--deal-y', `${collapseY}px`)
          c.style.setProperty('--deal-rot', `${rot}deg`)
          c.style.setProperty('--deal-scale', `${(1 - i * scaleStep).toFixed(3)}`)
          c.style.setProperty('--deal-op', `${(1 - i * 0.16).toFixed(3)}`)
          c.style.setProperty('--deal-i', `${i}`)
          c.style.zIndex = `${cards.length - i}`
        })

        // Collapse into the deck now. On a normal load the section is below the
        // fold, so this is invisible; suppress the transition so only the deal
        // (not the collapse) ever animates.
        cards.forEach((c) => {
          c.style.transition = 'none'
          c.classList.add('deck')
        })
        void workSection.offsetHeight // reflow to lock the deck in instantly
        cards.forEach((c) => {
          c.style.transition = ''
        })

        const clearCard = (c: HTMLElement) => {
          c.classList.remove('deck', 'dealt')
          c.style.zIndex = ''
          ;['--deal-y', '--deal-rot', '--deal-scale', '--deal-op', '--deal-i'].forEach(
            (p) => c.style.removeProperty(p)
          )
        }

        // Deal when the section rises into the lower part of the viewport. A
        // scroll listener (not IntersectionObserver) so the initial synchronous
        // check also covers the case where the section is already on screen at
        // load (e.g. a restored scroll position). Fires once, then strips the
        // deck/deal classes so the hover lift resumes.
        let hasDealt = false
        const deal = () => {
          if (hasDealt) return
          hasDealt = true
          // Let the deck sit in view for a beat so it reads as a deck, then deal.
          window.setTimeout(() => {
            cards.forEach((c) => c.classList.add('dealt'))
            window.setTimeout(
              () => cards.forEach(clearCard),
              720 + (cards.length - 1) * 110 + 250
            )
          }, 500)
        }
        // Key the trigger on the deck itself (the first card), not the section
        // top. The section opens with a kicker, heading and intro, so the deck
        // sits well below the section top; triggering on the section would deal
        // the cards while they are still off-screen.
        const onDealScroll = () => {
          if (hasDealt) return
          if (cards[0].getBoundingClientRect().top < window.innerHeight * 0.75) {
            deal()
          }
        }
        window.addEventListener('scroll', onDealScroll, { passive: true })
        window.addEventListener('resize', onDealScroll)
        onDealScroll()
        cleanups.push(() => {
          window.removeEventListener('scroll', onDealScroll)
          window.removeEventListener('resize', onDealScroll)
        })
      }
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

      // Hero blob parallax (pointer) + drift (scroll). Pointer writes --px/--py,
      // scroll writes --sx/--sy; the .hblob transform composes both in CSS.
      const hero = document.querySelector<HTMLElement>('.hero')
      const hblobs = Array.from(document.querySelectorAll<HTMLElement>('.hblob'))
      if (hero && hblobs.length) {
        const onHeroMove = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect()
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          hblobs.forEach((b, i) => {
            const depth = (i + 1) * 10
            b.style.setProperty('--px', `${nx * depth}px`)
            b.style.setProperty('--py', `${ny * depth}px`)
          })
        }
        const onHeroLeave = () => {
          hblobs.forEach((b) => {
            b.style.setProperty('--px', '0px')
            b.style.setProperty('--py', '0px')
          })
        }
        hero.addEventListener('mousemove', onHeroMove)
        hero.addEventListener('mouseleave', onHeroLeave)

        // Scroll drift: as the hero scrolls away, blobs ease up-and-out and fade,
        // giving the page weight. The quietest of the three effects — the
        // headline itself never moves.
        let heroTicking = false
        const updateHeroDrift = () => {
          heroTicking = false
          const p = Math.max(
            0,
            Math.min(1, -hero.getBoundingClientRect().top / (hero.offsetHeight || 1))
          )
          hblobs.forEach((b, i) => {
            b.style.setProperty('--sy', `${-(p * (46 + i * 16))}px`)
            b.style.setProperty('--sx', `${p * (20 + i * 12)}px`)
            b.style.opacity = (1 - p * 0.5).toFixed(3)
          })
        }
        const onHeroDriftScroll = () => {
          if (!heroTicking) {
            heroTicking = true
            requestAnimationFrame(updateHeroDrift)
          }
        }
        window.addEventListener('scroll', onHeroDriftScroll, { passive: true })
        window.addEventListener('resize', onHeroDriftScroll)
        updateHeroDrift()

        cleanups.push(() => {
          hero.removeEventListener('mousemove', onHeroMove)
          hero.removeEventListener('mouseleave', onHeroLeave)
          window.removeEventListener('scroll', onHeroDriftScroll)
          window.removeEventListener('resize', onHeroDriftScroll)
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
        // Hold still (no transform writes) while the user is pinch-zoomed;
        // keep `last` current so there's no jump on resume.
        if (document.documentElement.classList.contains('is-zooming')) {
          last = now
          raf = requestAnimationFrame(frame)
          return
        }
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

    // ── Timeline line-draw (scroll-scrub) ──────────────────────────────────
    // The moss spine fills as the timeline travels through the viewport, and
    // each row's node ignites as the fill edge passes its centre. Without this
    // (no JS or reduced motion) the CSS default is a fully-drawn line with every
    // node lit, so the section is always complete and correct.
    const tl = document.querySelector<HTMLElement>('.tl')
    if (tl) {
      const tlRows = Array.from(tl.querySelectorAll<HTMLElement>('.tl-row'))
      if (prefersReduced) {
        tl.style.setProperty('--tl-progress', '1')
        tlRows.forEach((r) => r.classList.add('lit'))
      } else {
        tl.classList.add('is-scrubbing')
        let tlTicking = false
        const updateTl = () => {
          tlTicking = false
          const rect = tl.getBoundingClientRect()
          const vh = window.innerHeight
          // progress 0 when the top reaches 78% down the viewport; 1 when the
          // bottom reaches 45% up — so the last node fires while still on screen.
          const startTop = vh * 0.78
          const endBottom = vh * 0.45
          const total = rect.height + startTop - endBottom
          const p = Math.max(0, Math.min(1, (startTop - rect.top) / total))
          tl.style.setProperty('--tl-progress', p.toFixed(4))
          const edge = p * rect.height
          tlRows.forEach((r) => {
            const centre = r.offsetTop + r.offsetHeight / 2
            r.classList.toggle('lit', edge >= centre)
          })
        }
        const onTlScroll = () => {
          if (!tlTicking) {
            tlTicking = true
            requestAnimationFrame(updateTl)
          }
        }
        window.addEventListener('scroll', onTlScroll, { passive: true })
        window.addEventListener('resize', onTlScroll)
        updateTl()
        cleanups.push(() => {
          window.removeEventListener('scroll', onTlScroll)
          window.removeEventListener('resize', onTlScroll)
        })
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return <div className="cursor-follow" id="cursor-blob" aria-hidden="true" />
}
