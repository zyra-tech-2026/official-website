export function PartnerBanner() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="grid gap-10 rounded-[10px] bg-ink p-8 text-cream sm:grid-cols-[0.9fr_1.1fr] sm:p-12">
        <div>
          <span className="mb-28 inline-flex rounded-full bg-cream/10 px-2 py-1 text-[10px] text-cream/80">Studio</span>
          <h2 className="max-w-md text-4xl font-semibold leading-[1.02] sm:text-5xl">
            Not an agency.
            <br />
            A product partner.
          </h2>
        </div>
        <div className="self-center text-sm leading-7 text-cream/65">
          <p>
            We sit at the intersection of strategy, design, and engineering. Every engagement begins with understanding your users and ends with a product built to last.
          </p>
          <p className="mt-6 text-cream">- The JSEL team</p>
        </div>
      </div>
    </section>
  )
}
