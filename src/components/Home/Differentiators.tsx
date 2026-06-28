import { motion, useReducedMotion } from 'framer-motion'
import FeatureCard from './FeatureCard'

const principles = [
  {
    number: '01',
    title: 'Product-first thinking.',
    body: "Outcomes, not deliverables. Every decision evaluated against your product goals — not what's technically convenient.",
    badge: 'bg-[#eef1ff] text-[#5975e8]',
  },
  {
    number: '02',
    title: 'Built to scale.',
    body: 'Systems that grow with you — load, maintainability, and longevity, designed in before the first line of code.',
    badge: 'bg-[#e8f8ed] text-[#38a665]',
  },
]

const stats = [
  ['4.9', 'avg rating'],
  ['95%', 'clients return'],
  ['12+', 'shipped'],
]

export function Differentiators() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-24 font-geist sm:px-8 lg:px-5">
      <div className="grid gap-8 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-[110px]">
        <div>
          <p className="mb-6 inline-flex h-[29px] items-center gap-2 rounded-full border border-black/15 bg-white px-3 text-[12px] tracking-[0.05em] text-[#aaa59e] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <span className="size-1.5 rounded-full bg-[#4bb777]" aria-hidden="true" />
            Why JOEL Studios
          </p>
          <h2 className="max-w-[500px] text-[42px] font-semibold leading-[1.04] tracking-[-0.045em] text-black sm:text-[52px]">
            What actually
            <br />
            makes us different.
          </h2>
        </div>

        <p className="max-w-[510px] text-[16px] leading-[1.7] text-[#8b8781] lg:pt-10 lg:text-[17px]">
          Plenty of studios can ship code. We&apos;re optimizing for the part that comes after launch — when the product has to actually work in your market.
        </p>
      </div>

      <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1.7fr_1fr]">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <FeatureCard maxScale={1} />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              className="group flex min-h-[278px] flex-col rounded-[20px] border border-[#e4e1dc] bg-white p-7 sm:p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, x: 36, y: 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -5,
                      boxShadow: '0 22px 55px rgba(17,17,15,0.07)',
                      transition: { duration: 0.3, delay: 0, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.85,
                delay: shouldReduceMotion ? 0 : 0.16 + index * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* <div className="relative h-20 overflow-hidden rounded-[13px] bg-[#f6f6f5]">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  animate={shouldReduceMotion ? undefined : { x: [-120, 440] }}
                  transition={{ duration: 4.8, delay: index * 1.1, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                />
              </div> */}

              <span className={`mt-5 grid size-9 place-items-center rounded-[9px] font-geist-mono text-[11px] ${principle.badge}`}>
                {principle.number}
              </span>
              <h3 className="mt-5 text-[21px] font-semibold tracking-[-0.025em] text-black">{principle.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-[#8b8781]">{principle.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.article
        className="mt-4 grid gap-8 rounded-[20px] border border-[#e4e1dc] bg-white p-7 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className="grid size-9 place-items-center rounded-[9px] bg-[#f1e9ff] font-geist-mono text-[11px] text-[#8c52d9]">
            03
          </span>
          <h3 className="mt-5 text-[23px] font-semibold tracking-[-0.025em] text-black">Long-term partnership mindset.</h3>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.7] text-[#8b8781]">
            We measure success in years, not sprints. Our clients return not because of contracts, but because of outcomes and trust.
          </p>
        </div>

        <div className="grid grid-cols-3 border-t border-[#ece9e4] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {stats.map(([value, label]) => (
            <div key={label} className="min-w-[92px] text-center sm:min-w-[110px]">
              <strong className="block text-[34px] font-semibold leading-none tracking-[-0.04em] text-black sm:text-[38px]">{value}</strong>
              <span className="mt-2 block text-[11px] text-[#8b8781]">{label}</span>
            </div>
          ))}
        </div>
      </motion.article>
    </section>
  )
}
