export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl border-t border-line px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Design. Build. Scale.</h2>
          <nav className="mt-8 flex gap-7 text-xs text-muted">
            <a href="#top" className="hover:text-ink">Home</a>
            <a href="#works" className="hover:text-ink">Work</a>
            <a href="#contact" className="hover:text-ink">Contact</a>
          </nav>
        </div>
        <p className="max-w-xs text-xs leading-6 text-muted sm:text-right">
          We build things that ship. You bring the product, we bring the system.
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-3 text-[11px] text-muted sm:flex-row sm:justify-between">
        <p>c 2026 JSEL Studios. All rights reserved.</p>
        <p>No cold pitch, just useful products.</p>
      </div>
    </footer>
  )
}
