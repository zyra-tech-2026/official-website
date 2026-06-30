import { trackEvent } from '../../lib/analytics'

const footerLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1180px] px-5 pb-12 pt-16 font-geist sm:px-8 lg:px-0">
      <div className="border-y border-line py-16 sm:py-20">
        <h2 className="text-[44px] font-semibold leading-none tracking-[-0.06em] text-black sm:text-[56px] lg:text-[64px]">
          Design. Build. Scale.
        </h2>

        <div className="mt-20 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <nav className="flex gap-10 text-[15px] text-[#77736e]">
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition hover:text-black"
                onClick={() =>
                  trackEvent({
                    name: 'nav_link_click',
                    params: { label: `footer_${label.toLowerCase()}`, destination: href },
                  })
                }
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            {/* <a
              href="/#top"
              aria-label="ZYRA home"
              className="inline-flex w-fit items-center transition hover:-translate-y-0.5"
              onClick={() =>
                trackEvent({
                  name: 'nav_link_click',
                  params: { label: 'footer_logo', destination: '/#top' },
                })
              }
            >
              <img
                src={zyraFullLogo}
                alt="ZYRA - Software that empowers"
                className="w-[108px] object-contain sm:w-[124px]"
              />
            </a> */}
            <p className="font-geist-mono text-[13px] tracking-[0.08em] text-[#77736e]">
              We build things that ship.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-6 text-[13px] text-[#77736e] sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 ZYRA. All rights reserved.</p>
        <p className="font-caveat text-[20px] text-[#77736e]">The next great product is yours.</p>
      </div>
    </footer>
  )
}
