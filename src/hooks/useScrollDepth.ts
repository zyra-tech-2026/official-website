import { useEffect, useRef } from 'react'
import { trackEvent } from '../lib/analytics'

const THRESHOLDS = [25, 50, 75, 100] as const

/**
 * Fires a scroll_depth event each time the user crosses a 25% milestone.
 * Each threshold fires at most once per page mount.
 * Uses a passive scroll listener so it never blocks rendering.
 */
export function useScrollDepth(): void {
  const reached = useRef(new Set<number>())

  useEffect(() => {
    reached.current.clear()

    const check = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return

      const pct = Math.round((window.scrollY / total) * 100)

      for (const threshold of THRESHOLDS) {
        if (pct >= threshold && !reached.current.has(threshold)) {
          reached.current.add(threshold)
          trackEvent({
            name: 'scroll_depth',
            params: { depth_percentage: threshold, page_path: window.location.pathname },
          })
        }
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])
}
