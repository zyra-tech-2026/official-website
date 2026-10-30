import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import discoverImage from '../../assets/png/card-1.png'
import designImage from '../../assets/png/card-2.png'
import buildImage from '../../assets/png/card-3.png'
import growImage from '../../assets/png/card-4.png'

const phases = [
  { title: 'Discover', image: discoverImage },
  { title: 'Design', image: designImage },
  { title: 'Build', image: buildImage },
  { title: 'Launch & Grow', image: growImage },
]

const placeholder =
  'Establish clear objectives and key results (OKRs) based on the insights gained during the discovery phase. Align stakeholders on the vision and set measurable targets.'

const AUTOPLAY_MS = 5000

function ProcessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const goTo = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  // Re-runs on every index change, so a manual tap restarts the timer.
  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setTimeout(() => {
      setDirection(1)
      setActiveIndex((current) => (current + 1) % phases.length)
    }, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [activeIndex, paused, reduceMotion])

  const phase = phases[activeIndex]
  const offset = reduceMotion ? 0 : 80

  return (
    <div
      className="relative mt-12 h-[420px] overflow-hidden rounded-[30px] bg-process-active text-white lg:hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="Our process phases"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.article
          key={phase.title}
          custom={direction}
          variants={{
            enter: (dir: number) => ({ x: dir * offset, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir * -offset, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${phases.length}: ${phase.title}`}
          className="absolute inset-0"
        >
          <img
            src={phase.image}
            alt=""
            className="pointer-events-none absolute right-0 bottom-0 w-full max-w-[420px] object-contain opacity-20"
          />
          <div className="relative flex h-full flex-col justify-end px-6 pt-24 pb-8">
            <span className="absolute top-7 left-6 text-sm text-white/80">
              Phase {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <h3 className="flex items-center gap-3 text-2xl">
              <span
                className="size-9 shrink-0 rounded-full bg-orange"
                aria-hidden="true"
              />
              {phase.title}
            </h3>
            <p className="mt-5 max-w-[450px] text-sm leading-relaxed text-white/85">
              {placeholder}
            </p>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="absolute top-6 right-6 z-10 flex">
        {phases.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to phase ${index + 1}: ${item.title}`}
            aria-current={index === activeIndex}
            className="grid size-6 place-items-center focus-visible:outline-2 focus-visible:outline-orange"
          >
            <span
              className={`size-2.5 rounded-full transition-colors ${index === activeIndex ? 'bg-orange' : 'bg-white/80'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProcessAccordion() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="mt-12 hidden gap-2 lg:flex lg:h-[440px]"
      aria-label="Our process phases"
    >
      {phases.map((phase, index) => {
        const active = index === activeIndex
        return (
          <motion.article
            key={phase.title}
            animate={{
              flexGrow: active ? 2.7 : 1,
              backgroundColor: active
                ? 'var(--color-process-active)'
                : 'var(--color-about-card)',
            }}
            transition={{
              duration: reduceMotion ? 0 : 3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseEnter={() => {
              if (
                window.matchMedia('(hover: hover) and (pointer: fine)').matches
              )
                setActiveIndex(index)
            }}
            className="relative min-w-0 basis-0 overflow-hidden rounded-[30px]"
          >
            <button
              type="button"
              aria-label={`Phase ${index + 1}: ${phase.title}`}
              aria-expanded={active}
              aria-controls={`process-panel-${index}`}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className="relative z-10 flex h-full min-h-[90px] w-full items-start justify-between px-8 pt-11 text-left focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-orange"
            >
              <span
                className={
                  active ? 'text-sm text-white/80' : 'mx-auto text-2xl text-ink'
                }
              >
                {active
                  ? `Phase ${String(index + 1).padStart(2, '0')}`
                  : String(index + 1).padStart(2, '0')}
              </span>
              {active && (
                <span className="flex gap-0.5" aria-hidden="true">
                  {phases.map((item, dotIndex) => (
                    <span
                      key={item.title}
                      className={`size-2.5 rounded-full ${dotIndex === index ? 'bg-orange' : 'bg-white/80'}`}
                    />
                  ))}
                </span>
              )}
            </button>
            <img
              src={phase.image}
              alt=""
              className={`pointer-events-none absolute right-0 bottom-0 w-full max-w-[300px] object-contain transition-opacity duration-[2800ms] motion-reduce:transition-none ${active ? 'opacity-15' : 'opacity-100'}`}
            />
            <motion.div
              id={`process-panel-${index}`}
              aria-hidden={!active}
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                x: active || reduceMotion ? 0 : 40,
              }}
              transition={{
                duration: reduceMotion ? 0 : 2.8,
                delay: active && !reduceMotion ? 0.2 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute right-8 bottom-10 left-8 z-10 text-white"
            >
              <h3 className="flex items-center gap-3 text-2xl">
                <span
                  className="size-9 shrink-0 rounded-full bg-orange"
                  aria-hidden="true"
                />
                {phase.title}
              </h3>
              <p className="mt-5 max-w-[450px] text-sm leading-relaxed text-white/85">
                {placeholder}
              </p>
            </motion.div>
          </motion.article>
        )
      })}
    </div>
  )
}

export function ProcessSection() {
  return (
    <section className="bg-white px-5 py-20 text-ink sm:px-8 lg:px-5 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <p className="flex items-center justify-center gap-4 text-base sm:text-xl">
          <span
            className="size-2.5 rounded-full bg-orange"
            aria-hidden="true"
          />
          Our Process
        </p>
        <h2 className="mx-auto mt-7 max-w-[1000px] text-center text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
          Most consultancies slow you down
          <br className="hidden sm:block" /> with process and overhead.
        </h2>
        <ProcessCarousel />
        <ProcessAccordion />
      </div>
    </section>
  )
}
