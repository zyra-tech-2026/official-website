import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import zyraText from '../../assets/png/ZYRA.png'
import { trackEvent } from '../../lib/analytics'

const navItems = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const menuOpenRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()
  const currentPath = window.location.pathname

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
      if (window.innerWidth >= 768) {
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
      <div className="h-[72px] md:h-[84px]" aria-hidden="true" />
      <header
        className={`fixed inset-x-0 top-0 z-[100] w-full bg-white/95 backdrop-blur transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isVisible || isMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
        }`}
        onFocusCapture={() => setIsVisible(true)}
      >
        <div className="relative px-5 md:px-10 lg:px-12">
          <div className="relative flex h-[72px] w-full items-center justify-between gap-4 md:h-[84px]">
            <a
              href="/#top"
              aria-label="Zyra home"
              className="flex items-center"
              onClick={() => setMobileMenu(false)}
            >
              <img
                src={zyraText}
                alt=""
                className="w-[110px] object-contain md:w-[120px]"
                aria-hidden="true"
              />
            </a>

            <nav
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-sm md:flex"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const active = item.href !== '/#top' && item.href !== '/#works' && currentPath.startsWith(item.href)
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`transition-colors hover:text-orange focus-visible:text-orange focus-visible:outline-none ${active ? 'text-orange' : 'text-ink'}`}
                    onClick={() =>
                      trackEvent({
                        name: 'nav_link_click',
                        params: { label: item.label, destination: item.href },
                      })
                    }
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <a
              href="/contact"
              className="hidden min-h-[46px] items-center gap-3 rounded-full bg-about-dark py-1 pr-1 pl-4 text-sm whitespace-nowrap text-white focus-visible:outline-none md:inline-flex"
              onClick={() =>
                trackEvent({
                  name: 'cta_click',
                  params: {
                    cta_name: 'header_book_a_call',
                    destination: '/contact',
                  },
                })
              }
            >
              Book a call
              <span
                className="grid size-[38px] place-items-center rounded-full bg-orange"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-[#111111] text-white md:hidden"
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
                className="absolute inset-x-3 top-[calc(100%+4px)] overflow-hidden rounded-[26px] border border-black/10 bg-white p-3 shadow-[0_24px_65px_rgba(14,13,12,0.18)] md:hidden"
                aria-label="Mobile navigation"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: -12, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 0, y: -8, scale: 0.98 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
                      trackEvent({
                        name: 'nav_link_click',
                        params: { label: item.label, destination: item.href },
                      })
                    }}
                  >
                    {item.label}
                    <span className="text-black/35" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}

                <a
                  href="/contact"
                  data-cursor-mode="solid"
                  className="mt-2 flex min-h-12 items-center justify-center rounded-[16px] bg-[#111111] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#FF7B00] hover:text-white focus-visible:bg-[#FF7B00] focus-visible:text-white focus-visible:outline-none active:text-white visited:text-white"
                  onClick={() => {
                    setMobileMenu(false)
                    trackEvent({
                      name: 'cta_click',
                      params: {
                        cta_name: 'mobile_book_a_call',
                        destination: '/contact',
                      },
                    })
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
