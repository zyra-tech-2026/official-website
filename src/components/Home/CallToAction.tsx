import flowerBackground from '../../assets/png/flower-bg.png'

export function CallToAction() {
  return (
    <section className="bg-white px-3 pb-3 lg:px-5 lg:pb-5">
      <div className="relative isolate overflow-hidden rounded-[22px] bg-hero-sky px-6 py-14 text-white sm:px-12 sm:py-16 lg:min-h-[470px] lg:px-[72px]">
        <img
          src={flowerBackground}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="max-w-[720px]">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-sm">Trusted by 500+ Enterprise Users</p>
            <div className="flex pl-3" aria-hidden="true">
              {[12, 32, 11, 33, 15].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/80?img=${id}`}
                  alt=""
                  className="-ml-3 size-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          </div>
          <h2 className="mt-12 text-[clamp(32px,3vw,40px)] leading-[1.2] tracking-[-0.04em]">
           Got an idea, or a build that's stuck?
          </h2>
          <p className="mt-6 max-w-[450px] text-base leading-relaxed text-white/80">
          Tell us where you are. We'll be honest about what it takes to get it live.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex min-h-[46px] items-center gap-3 rounded-full bg-orange py-1 pr-1 pl-4 text-sm text-white hover:bg-orange/90"
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
      </div>
    </section>
  )
}
