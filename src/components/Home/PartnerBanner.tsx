export function PartnerBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24 lg:px-5">
      <div className="grid min-h-[570px] overflow-hidden rounded-[30px] bg-[#0d0d0c] px-7 py-8 text-[#f4f1eb] sm:px-12 sm:py-12 lg:grid-cols-[1.42fr_1fr] lg:px-24 lg:py-24">
        <div className="flex min-w-0 flex-col">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-geist text-[13px] leading-none text-white/70">
            <span className="size-2 rounded-full bg-[#f2762e]" aria-hidden="true" />
            About
          </span>

          <h2 className="mt-20 max-w-[620px] font-geist text-[47px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[64px] lg:mt-auto lg:text-[70px]">
            Not an agency.
            <br />
            A product partner.
          </h2>
        </div>

        <div className="mt-16 flex flex-col justify-center font-geist text-[17px] leading-[1.65] text-white/55 lg:mt-0 lg:pl-3">
          <div className="max-w-[390px]">
            <p>
              We sit at the intersection of strategy, design, and engineering. Every engagement begins with understanding your problem — and ends with a product built to last.
            </p>
            <p className="mt-6">
              We work with founders, startups, and growing organizations who want to build something worth using.
            </p>
          </div>

          <div className="mt-10 lg:mt-11">
            <p className="font-caveat text-[29px] leading-none text-[#f4f1eb]">— The ZYRA team</p>
            <p className="mt-4 font-geist-mono text-[10px] uppercase tracking-[0.08em] text-white/35">
              Lagos&nbsp;&nbsp;·&nbsp;&nbsp;Globally&nbsp;&nbsp;·&nbsp;&nbsp;Since 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
