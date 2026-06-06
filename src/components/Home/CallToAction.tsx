export function CallToAction() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="rounded-[10px] bg-ink px-6 py-16 text-center text-cream sm:px-10 sm:py-24">
        <p className="mb-4 text-[11px] text-cream/55">Ready to build</p>
        <h2 className="mx-auto max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">
          Ready to build something that matters?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-cream/60">
          Meet founders who want a team that turns good ideas into working products.
        </p>
        <a
          href="mailto:hello@joelstudios.com"
          className="mt-8 inline-flex rounded-full bg-cream px-6 py-3 text-xs font-semibold text-ink transition hover:bg-orange"
        >
          Book a free discovery call
        </a>
        <p className="mt-6 text-xs text-cream/45">or hello@joelstudios.com</p>
      </div>
    </section>
  )
}
