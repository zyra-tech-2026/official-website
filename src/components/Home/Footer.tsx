import heroLogo from '../../assets/png/hero-logo.png'
import { NewsletterForm } from '../NewsletterForm'

const columns: {
  heading: string
  items: {
    label: string
    href?: string
    muted?: boolean
    external?: boolean
    badge?: string
  }[]
}[] = [
  {
    heading: 'Company',
    items: [
      { label: 'Works', href: '/#works' },
      { label: 'Services', href: '/#services' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Products',
    items: [
      { label: 'Aisle', badge: 'Coming soon' },
      { label: 'Refuge', href: 'https://refuge.zyra.tech/', external: true },
    ],
  },
  {
    heading: 'Contact',
    items: [
      { label: 'Book a call', href: '/contact' },
      { label: 'Hello@zyra.tech', href: 'mailto:hello@zyra.tech' },
      { label: 'X · @zyracore', href: 'https://x.com/zyracore', external: true },
      { label: 'Lagos, Nigeria', muted: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-white px-3 pb-3 lg:px-5 lg:pb-5">
      <div className="rounded-[22px] bg-about-dark px-6 py-12 text-white sm:px-12 lg:rounded-[32px] lg:px-16 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <a
              href="/#top"
              aria-label="Zyra home"
              className="relative block h-8 w-[120px] overflow-hidden"
            >
              <img
                src={heroLogo}
                alt=""
                className="absolute -top-[27px] -left-6 w-[168px] max-w-none"
              />
            </a>
            <p className="mt-6 max-w-[540px] text-sm leading-relaxed text-[#F8F5F0] ">
              Seamlessly adjust to evolving demands and expand your capabilities
              with our adaptable platform, crafted to fuel your enterprise’s
              success.
            </p>
            <p className="mt-9 text-sm text-white/90">
              Get our build notes: one email a month, with nothing you’d skip.
            </p>
            <div className="mt-4 max-w-[432px]">
              <NewsletterForm dark />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-16">
            {columns.map(({ heading, items }) => (
              <div key={heading}>
                <h2 className="text-sm text-white/50">{heading}</h2>
                <ul className="mt-5 space-y-4 text-base">
                  {items.map(({ label, href, muted, external, badge }) => (
                    <li key={label} className={muted ? 'text-white/50' : ''}>
                      {href ? (
                        <a
                          className="transition-colors hover:text-orange"
                          href={href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {label}
                        </a>
                      ) : badge ? (
                        <span
                          aria-disabled="true"
                          className="flex cursor-not-allowed items-center gap-2 text-white/50"
                        >
                          {label}
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
                            {badge}
                          </span>
                        </span>
                      ) : (
                        <span>{label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ZYRA CORE LTD. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-white" href="/privacy-policy">
              Privacy policy
            </a>
            <a className="hover:text-white" href="/terms-and-conditions">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
