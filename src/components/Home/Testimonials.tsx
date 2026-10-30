import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import nickPortrait from '../../assets/png/nick.png'

const quotes = [
  {
    quote:
      'ZYRA took our idea from a loose direction to a launch plan in weeks. The clarity changed our roadmap.',
    name: 'Nick',
    role: 'Founder, ElderOps',
  },
  {
    quote:
      'They understood the user flow faster than anyone we had tried. Our team finally knew what to build next.',
    name: 'Sruthi',
    role: 'COO, Exo-AI',
  },
  {
    quote:
      'Transparent, calm, and genuinely useful. We shipped the first release with a product direction that felt obvious.',
    name: 'Emeka',
    role: 'Founder, NUBA',
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  return (
    <section
      id="testimonials"
      className="bg-white px-5 py-20 text-ink sm:px-8 lg:px-5 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <p className="flex items-center justify-center gap-4 text-base sm:text-xl">
          <span
            className="size-2.5 rounded-full bg-orange"
            aria-hidden="true"
          />
          Testimonials
        </p>
        <h2 className="mx-auto mt-7 max-w-[1000px] text-center text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
          Trusted by brands who aren’t afraid to
          <br className="hidden sm:block" /> stand out.
        </h2>
        <div className="relative mt-12 min-h-[420px] overflow-hidden rounded-[30px] bg-about-dark sm:aspect-[2/1] sm:min-h-[420px] lg:max-h-[600px]">
          <img
            src={nickPortrait}
            alt="Nick"
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          <div className="absolute bottom-5 left-5 max-w-[350px] rounded-2xl bg-white/35 p-5 text-white backdrop-blur-md sm:bottom-[16%] sm:left-[5%] sm:p-8">
            <p className="text-base leading-snug sm:text-xl">
              ““Zyra didn’t just provide a strategy; they transformed how we think and operate strategically.””
            </p>
            <p className="mt-8 text-xs leading-relaxed text-white/90">
           They identified three key issues we missed. Two years later, our revenue hit $52M and we closed Series B funding.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <img
                src={nickPortrait}
                alt=""
                className="size-10 rounded-full object-cover object-[center_25%]"
              />
              <div>
                <p className="text-sm">Nickolas White</p>
                <p className="mt-1 text-xs text-white/80">CEO, Lightspeed</p>
              </div>
            </div>
          </div>
          <div className="absolute right-6 bottom-6 text-right text-white sm:right-[7%] sm:bottom-[15%]">
            <p className="text-6xl leading-none sm:text-8xl">
              4<span className="text-orange">.</span>9
              <span className="text-3xl">/5</span>
            </p>
            <p className="mt-3 text-xs sm:text-sm">
              Based on 300 verified reviews
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          {quotes.map(({ quote, name, role }, index) => (
            <motion.article
              key={name}
              animate={{ flexGrow: index === activeIndex ? 1.8 : 1 }}
              transition={{
                duration: reduceMotion ? 0 : 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => {
                if (
                  window.matchMedia('(hover: hover) and (pointer: fine)')
                    .matches
                )
                  setActiveIndex(index)
              }}
              className={`relative flex min-h-[260px] min-w-0 flex-col rounded-[30px] p-7 md:basis-0 ${index === activeIndex ? 'border border-line bg-white' : 'bg-about-card'}`}
            >
              <button
                type="button"
                aria-label={`Expand testimonial from ${name}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="absolute top-8 right-8 grid size-6 place-items-center rounded-full bg-white text-about-copy focus-visible:outline-2 focus-visible:outline-orange"
              >
                −
              </button>
              <div className="flex gap-3" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className="size-3.5 rounded-full bg-orange"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p
                className={`mt-10 text-lg leading-relaxed sm:text-xl ${index === activeIndex ? 'font-medium text-ink' : 'text-about-copy'}`}
              >
                “{quote}”
              </p>
              <div className="mt-auto flex items-center gap-3 pt-10">
                {/* {index === 0 ? (
                  <img
                    src={nickPortrait}
                    alt=""
                    className="size-12 shrink-0 rounded-full object-cover object-[center_25%]"
                  />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-about-avatar text-sm font-semibold">
                    {name[0]}
                  </span>
                )} */}
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-about-avatar text-sm font-semibold">
                    {name[0]}
                  </span>
                <div>
                  <p className="text-xs">{name}</p>
                  <p className="mt-1 text-xs text-about-copy">{role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
