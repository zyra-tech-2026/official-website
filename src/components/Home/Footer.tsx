import { trackEvent } from '../../lib/analytics'

const footerLinks = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-line px-5 py-12 font-geist sm:px-8">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Design. Build. Scale.</h2>
          <nav className="mt-8 flex gap-7 text-xs text-muted">
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-ink"
                onClick={() => trackEvent({ name: 'nav_link_click', params: { label: `footer_${label.toLowerCase()}`, destination: href } })}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="max-w-xs text-xs leading-6 text-muted sm:text-right">
          We build things that ship. You bring the product, we bring the system.
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-3 text-[11px] text-muted sm:flex-row sm:justify-between">
        <p>&copy; 2026 ZYRA. All rights reserved.</p>
        <p>No cold pitch, just useful products.</p>
      </div>
    </footer>
  )
}
