import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/png/zyra-logo.png'
import { trackEvent } from '../../lib/analytics'

const navItems = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const menuOpenRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  const setMobileMenu = (isOpen: boolean) => {
    menuOpenRef.current = isOpen
    setIsMenuOpen(isOpen)

    if (isOpen) {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    lastScrollY.current = window.scrollY
    let animationFrame = 0

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0)
      const scrollDelta = currentScrollY - lastScrollY.current

      if (menuOpenRef.current || currentScrollY < 80 || scrollDelta < -6) {
        setIsVisible(true)
      } else if (scrollDelta > 6) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
      animationFrame = 0
    }

    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateHeader)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenu(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMobileMenu(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="h-[76px] sm:h-[84px]" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex w-full justify-center px-4 py-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform sm:py-5 ${
          isVisible || isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
        }`}
        onFocusCapture={() => setIsVisible(true)}
      >
        <div className="relative w-full max-w-[420px] sm:w-auto sm:max-w-none">
          <div className="flex w-full items-center justify-between gap-4 rounded-full border border-black/10 bg-white py-2 pl-4 pr-2 shadow-[0_18px_45px_rgba(14,13,12,0.14)] sm:w-auto sm:gap-7 sm:px-5">
            <a
              href="/#top"
              className="flex items-center gap-2 whitespace-nowrap text-[15px] font-bold tracking-[-0.03em] text-black"
              onClick={() => setMobileMenu(false)}
            >
              <img src={logo} alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
              ZYRA
            </a>

            <span className="hidden h-7 w-px bg-black/10 sm:block" aria-hidden="true" />

            <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#1d1d1d] sm:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-orange"
                  onClick={() => trackEvent({ name: 'nav_link_click', params: { label: item.label, destination: item.href } })}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="/contact"
              className="hidden whitespace-nowrap rounded-full bg-[#111111] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-orange hover:text-black sm:inline-flex"
              onClick={() => trackEvent({ name: 'cta_click', params: { cta_name: 'header_book_a_call', destination: '/contact' } })}
            >
              Book a Call ↗
            </a>

            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-[#111111] text-white sm:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileMenu(!isMenuOpen)}
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform duration-300 ${
                    isMenuOpen ? 'translate-y-[3px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                    isMenuOpen ? '-translate-y-[3px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id="mobile-navigation"
                className="absolute inset-x-0 top-[calc(100%+10px)] overflow-hidden rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_24px_65px_rgba(14,13,12,0.18)] sm:hidden"
                aria-label="Mobile navigation"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between rounded-[16px] px-4 py-3.5 text-[16px] font-medium text-black transition hover:bg-[#f4f1eb] ${
                      index > 0 ? 'border-t border-black/5' : ''
                    }`}
                    onClick={() => {
                      setMobileMenu(false)
                      trackEvent({ name: 'nav_link_click', params: { label: item.label, destination: item.href } })
                    }}
                  >
                    {item.label}
                    <span className="text-black/35" aria-hidden="true">↗</span>
                  </a>
                ))}

                <a
                  href="/contact"
                  className="mt-2 flex min-h-12 items-center justify-center rounded-[16px] bg-[#111111] px-5 text-[15px] font-medium text-white"
                  onClick={() => {
                    setMobileMenu(false)
                    trackEvent({ name: 'cta_click', params: { cta_name: 'mobile_book_a_call', destination: '/contact' } })
                  }}
                >
                  Book a Call ↗
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
