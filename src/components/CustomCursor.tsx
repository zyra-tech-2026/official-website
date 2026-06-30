import { useEffect, useRef } from 'react'

const interactiveSelector = 'a, button, [role="button"], input, textarea, select, summary'

function findSurfaceElement(x: number, y: number) {
  return document
    .elementsFromPoint(x, y)
    .find((element) => !element.classList.contains('custom-cursor') && !element.classList.contains('custom-cursor-dot'))
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current

    if (!ring || !dot || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let raf = 0

    const setSurfaceState = (x: number, y: number) => {
      const surface = findSurfaceElement(x, y)
      const target = surface instanceof Element ? surface : null
      const interactive = target?.closest(interactiveSelector) as HTMLElement | null
      const isIframe = target?.tagName === 'IFRAME'
      const cursorMode = interactive?.dataset.cursorMode

      ring.classList.toggle('is-interactive', Boolean(interactive || isIframe))
      ring.classList.toggle('is-solid', cursorMode === 'solid')

      if (targetRef.current && targetRef.current !== interactive) {
        targetRef.current.style.transform = ''
      }

      targetRef.current = interactive

      if (!interactive) {
        return
      }

      const bounds = interactive.getBoundingClientRect()
      const offsetX = ((x - bounds.left) / bounds.width - 0.5) * 10
      const offsetY = ((y - bounds.top) / bounds.height - 0.5) * 10

      interactive.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
    }

    const render = () => {
      // Ring springs toward the dot position with a lag — creates the "chasing" effect
      ringX += (pointerX - ringX) * 0.13
      ringY += (pointerY - ringY) * 0.13

      // Dot is exactly at the pointer — this is the true cursor
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
      // Ring lags behind, appearing to chase the dot
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      raf = window.requestAnimationFrame(render)
    }

    const moveCursorTo = (x: number, y: number) => {
      pointerX = x
      pointerY = y
      ring.style.opacity = '1'
      dot.style.opacity = '1'
      setSurfaceState(x, y)
    }

    const moveCursor = (event: MouseEvent) => {
      moveCursorTo(event.clientX, event.clientY)
    }

    const moveCursorFromFrame = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'custom-cursor-move') {
        return
      }

      const frame = Array.from(document.querySelectorAll('iframe')).find((iframe) => iframe.contentWindow === event.source)
      const x = Number(event.data.x)
      const y = Number(event.data.y)

      if (!frame || Number.isNaN(x) || Number.isNaN(y)) {
        return
      }

      const bounds = frame.getBoundingClientRect()
      moveCursorTo(bounds.left + x, bounds.top + y)
      ring.classList.add('is-interactive')
    }

    const hideCursor = () => {
      ring.style.opacity = '0'
      dot.style.opacity = '0'
      ring.classList.remove('is-interactive')
      ring.classList.remove('is-solid')

      if (targetRef.current) {
        targetRef.current.style.transform = ''
        targetRef.current = null
      }
    }

    raf = window.requestAnimationFrame(render)
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('message', moveCursorFromFrame)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('message', moveCursorFromFrame)
      window.removeEventListener('mouseleave', hideCursor)

      if (targetRef.current) {
        targetRef.current.style.transform = ''
      }
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  )
}
