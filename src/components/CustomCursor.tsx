import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor || !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const moveCursorTo = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      cursor.style.opacity = '1'
    }

    const setCursorTargetState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null
      const isInteractive = Boolean(
        element?.closest('a, button, [role="button"], input, textarea, select, summary, iframe'),
      )

      cursor.classList.toggle('is-interactive', isInteractive)
    }

    const moveCursor = (event: MouseEvent) => {
      moveCursorTo(event.clientX, event.clientY)
      setCursorTargetState(event.target)
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
      cursor.classList.add('is-interactive')
    }

    const hideCursor = () => {
      cursor.style.opacity = '0'
      cursor.classList.remove('is-interactive')
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('message', moveCursorFromFrame)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('message', moveCursorFromFrame)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}
