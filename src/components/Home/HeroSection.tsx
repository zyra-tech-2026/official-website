import { useState } from 'react'
import { trackEvent } from '../../lib/analytics'
import heroLogo from '../../assets/png/hero-logo.png'
import heroBackground from '../../assets/png/hero-background.png'

const links = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#works' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
const services = [
  'UI/UX Design',
  'Web Development',
  'Mobile Development',
  'Branding & Identity',
  'Deployment & DevOps',
  'Product Strategy',
]

export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <section
      id="top"
      className="flex flex-col bg-white px-3 py-3 text-white lg:h-svh lg:px-5 lg:py-6"
    >
      <div className="relative isolate flex min-h-[680px] flex-col overflow-hidden rounded-[22px] bg-hero-sky lg:min-h-0 lg:flex-1">
        <img
          src={heroBackground}
          alt=""
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-fill"
        />
        <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-6 lg:px-8">
          <a
            href="/#top"
            className="relative block h-8 w-[120px] shrink-0 overflow-hidden"
            aria-label="Zyra home"
          >
            <img
              src={heroLogo}
              alt=""
              className="absolute -top-[27px] -left-6 w-[168px] max-w-none"
            />
          </a>
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[38px] text-sm md:flex"
            aria-label="Main navigation"
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-opacity hover:opacity-70"
                onClick={() =>
                  trackEvent({
                    name: 'nav_link_click',
                    params: { label, destination: href },
                  })
                }
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="hidden items-center gap-3 rounded-full bg-black px-[19px] py-[13px] text-sm md:inline-flex"
            href="/contact"
          >
            Book a Call <span aria-hidden="true">↗</span>
          </a>
          <button
            className="grid size-11 place-items-center rounded-full bg-black md:hidden"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="hero-mobile-nav"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-1 h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-1 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
          {menuOpen && (
            <nav
              id="hero-mobile-nav"
              className="absolute top-[75px] right-5 left-5 grid rounded-2xl bg-black p-3 md:hidden"
              aria-label="Mobile navigation"
            >
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-lg px-3 py-3 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href="/contact" className="px-3 py-3">
                Book a Call ↗
              </a>
            </nav>
          )}
        </header>
        <div className="flex flex-1 flex-col items-center px-5 pt-16 pb-24 text-center md:pt-20 lg:pt-[clamp(12px,6svh,65px)] lg:pb-4">
          <h1 className="max-w-[1000px] text-[clamp(36px,6vw,56px)] leading-[1.15] font-normal tracking-[-0.055em] lg:text-[clamp(36px,min(4.35vw,6.7svh),68px)]">
            We create innovative digital
            <br className="hidden md:block" /> products that deliver real value.
          </h1>
          <p className="mt-[17px] max-w-[520px] text-base leading-[1.35] tracking-[-0.02em] md:text-xl lg:text-[clamp(16px,2.15svh,20px)]">
           Whether you’re starting from scratch, stuck on a failing build, or unsure what your business needs online, ZYRA gets you to a working product fast.
            {/* <br className="hidden md:block" /> with them, in the */}
          </p>
          <div className="mt-10 flex items-center justify-center gap-2 lg:mt-[clamp(20px,6.1svh,57px)]">
            <a
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-button-secondary px-6 text-sm transition-colors hover:bg-button-secondary/90"
              href="#services"
            >
              Learn more
            </a>
            <a
              className="inline-flex min-h-[46px] items-center gap-3 rounded-full bg-orange py-[3px] pr-1 pl-[17px] text-sm transition-colors hover:bg-orange/90"
              href="/contact"
              onClick={() =>
                trackEvent({
                  name: 'cta_click',
                  params: {
                    cta_name: 'hero_book_a_call',
                    destination: '/contact',
                  },
                })
              }
            >
              Book a Call{' '}
              <span
                className="grid size-[38px] place-items-center rounded-full bg-black"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
          <div className="mt-10 lg:mt-[clamp(20px,4.9svh,46px)]">
            <div className="flex justify-center pl-[18px]" aria-hidden="true">
              {[12, 32, 11, 33, 15].map((id) => (
                <img
                  key={id}
                  src={'https://i.pravatar.cc/80?img=' + id}
                  alt=""
                  width="52"
                  height="52"
                  className="-ml-[18px] size-[52px] rounded-full border-2 border-white bg-slate-300 object-cover lg:size-[clamp(38px,5.6svh,52px)]"
                />
              ))}
            </div>
            <div
              className="mt-[18px] text-base leading-none tracking-[5px] text-rating"
              aria-label="5 out of 5 stars"
            >
              ★★★★★
            </div>
            <p className="mt-1 text-sm">Trusted by 500+ Enterprise Users</p>
          </div>
        </div>
      </div>
      {/* <div
        className="grid shrink-0 grid-cols-2 gap-x-5 gap-y-4 py-5 text-[11px] text-service-text uppercase sm:grid-cols-3 lg:h-[66px] lg:grid-cols-6 lg:items-center lg:gap-4 lg:py-0 lg:text-xs"
        aria-label="Our services"
      >
        {services.map((service) => (
          <span
            key={service}
            className="flex items-center gap-3 lg:justify-around lg:last:after:size-1.5 lg:last:after:shrink-0 lg:last:after:bg-orange lg:last:after:content-['']"
          >
            <span className="size-1.5 shrink-0 bg-orange" aria-hidden="true" />
            <span>{service}</span>
          </span>
        ))}
      </div> */}
    </section>
  )
}
