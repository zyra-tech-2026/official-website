import { useEffect, useRef, useState } from 'react'

const logos = ['Infinion Technologies', 'Zenith Bank', 'ElderOps', 'MELLOW', 'COMTROVA', 'Wema Bank', 'CRDB Tanzania', 'Lisaprop', 'Zest']

type CountUpProps = {
  end: number
  suffix?: string
  shouldStart: boolean
}

function CountUp({ end, suffix = '', shouldStart }: CountUpProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!shouldStart) {
      return
    }

    let frame = 0
    const duration = 2100
    const startedAt = performance.now()

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setValue(Math.round(end * eased))

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [end, shouldStart])

  return (
    <>
      {value}
      {suffix}
    </>
  )
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const [shouldCount, setShouldCount] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldCount(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-line bg-[#f6f4ee]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 lg:px-0">
        <p className="text-center font-geist-mono text-[12px] uppercase tracking-[0.08em] text-[#77736e]">
          Trusted by founders shipping in 5 countries
        </p>

        <div className="mt-9 overflow-hidden text-[#c3beb7]">
          <div className="logo-carousel-track flex w-max items-center">
            {[...logos, ...logos].map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                className="min-w-[180px] px-8 text-center text-[18px] font-semibold leading-none tracking-[-0.02em] sm:min-w-[210px] sm:text-[20px]"
                aria-hidden={index >= logos.length}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-11">
          <div className="grid gap-10 text-center sm:grid-cols-3 sm:gap-0">
            <div className="sm:border-r sm:border-line">
              <strong className="block text-[52px] font-semibold leading-none tracking-[-0.04em] text-black sm:text-[60px]">
                <CountUp end={15} suffix="+" shouldStart={shouldCount} />
              </strong>
              <p className="mt-6 text-[14px] text-[#77736e]">Products launched</p>
            </div>

            <div className="sm:border-r sm:border-line">
              <strong className="block text-[52px] font-semibold leading-none tracking-[-0.04em] text-black sm:text-[60px]">
                <CountUp end={5} shouldStart={shouldCount} />
              </strong>
              <p className="mt-6 text-[14px] text-[#77736e]">Countries served</p>
            </div>

            <div>
              <strong className="block text-[44px] font-semibold leading-none tracking-[-0.05em] text-black sm:text-[54px] lg:text-[60px]">
                Idea{' '}
                <svg
                  aria-hidden="true"
                  className="inline-block size-[0.72em] align-[-0.04em] text-[#bdb8b1]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>{' '}
                Live
              </strong>
              <p className="mt-6 text-[14px] text-[#77736e]">End-to-end engagements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
