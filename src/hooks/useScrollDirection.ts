import { useEffect, useState } from 'react'

export type ScrollDirection = 'up' | 'down' | null

/**
 * Tracks window scroll direction for smart sticky headers.
 * Hides only after a meaningful scroll down; shows on any scroll up.
 */
export function useScrollDirection(downThreshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = Math.max(0, window.scrollY)
      setScrolled(y > 12)

      const delta = y - lastY

      if (y <= 0) {
        setDirection('up')
        lastY = 0
        return
      }

      // Any upward movement reveals the bar immediately.
      if (delta < 0) {
        setDirection('up')
        lastY = y
        return
      }

      // Ignore tiny downward jitter from trackpads.
      if (delta >= downThreshold) {
        setDirection('down')
        lastY = y
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [downThreshold])

  return { direction, scrolled }
}
