import { useEffect, useState } from 'react'

/**
 * True while the hero element intersects the viewport (with a small top buffer).
 * Used so the navbar only shows over the hero, not after scrolling past it.
 */
export function useHeroInView(selector: string | null, enabled = true) {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    if (!enabled || !selector) {
      setInView(true)
      return
    }

    const el = document.querySelector(selector)
    if (!el) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting))
      },
      {
        // Hide once most of the hero has left the top of the viewport
        root: null,
        rootMargin: '-8% 0px 0px 0px',
        threshold: 0,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [selector, enabled])

  return inView
}
