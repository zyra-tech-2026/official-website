import { motion, useReducedMotion } from 'framer-motion'

const phases = [
  ['Discover', 'We map your problem, your users, and your constraints before touching a single tool.'],
  ['Design', 'User flows, wireframes, and high-fidelity UI — all validated before development begins.'],
  ['Build', 'Engineering in two-week sprints. Continuous delivery, frequent demos, full transparency.'],
  ['Launch & Grow', 'We handle deployment, monitor performance, and stay on as your post-launch partner.'],
]

const proofAvatars = [
  ['AM', 'bg-[#d8c3ad] text-[#58463a]'],
  ['KO', 'bg-[#cad7d0] text-[#334a3f]'],
  ['TN', 'bg-[#e3b49e] text-[#684135]'],
  ['IA', 'bg-[#b9cddd] text-[#344f61]'],
]

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mx-auto grid max-w-[1240px] gap-16 px-5 pb-24 font-geist sm:px-8 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-[138px] lg:px-5">
      <div className="self-start lg:sticky lg:top-24">
        <p className="mb-8 inline-flex h-[29px] items-center gap-2 rounded-full border border-black/15 bg-white px-3 text-[13px] leading-none text-[#202020] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <span className="size-2 rounded-full bg-[#ec3f83]" aria-hidden="true" />
          Our Process
        </p>

        <h2 className="max-w-[500px] text-[48px] font-semibold leading-[1.06] tracking-[-0.045em] text-black sm:text-[64px]">
          Four phases.
          <br />
          Zero surprises.
        </h2>

        <p className="mt-7 max-w-[390px] text-[17px] leading-[1.75] text-[#77736e]">
          Every engagement runs through the same four-phase cadence — predictable timelines, transparent demos, and a deliverable at every gate.
        </p>

        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1 text-[14px] font-semibold text-[#10a866] transition-colors hover:text-[#087d4b]"
        >
          Start a project <span aria-hidden="true">→</span>
        </a>

        <div className="mt-7 flex flex-wrap items-center gap-4 text-[12px] text-[#77736e]">
          <div className="flex -space-x-2" aria-label="Client team">
            {proofAvatars.map(([initials, color]) => (
              <span
                key={initials}
                className={`grid size-7 place-items-center rounded-full border-2 border-[#f4f1eb] text-[8px] font-semibold ${color}`}
              >
                {initials}
              </span>
            ))}
            <span className="grid size-7 place-items-center rounded-full border-2 border-[#f4f1eb] bg-[#f7e0eb] text-[10px] font-medium text-[#9d3763]">
              12
            </span>
          </div>
          <span className="h-px w-3 bg-[#aaa69f]" aria-hidden="true" />
          <span>4.9/5 across 12+ launched products</span>
        </div>
      </div>

      <div className="relative">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-10 left-[29px] top-10 w-px origin-top border-l border-dashed border-[#aaa69f] sm:left-[39px]"
          initial={shouldReduceMotion ? false : { scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 2.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {phases.map(([title, body], index) => (
          <motion.article
            key={title}
            className="group relative z-10 grid min-h-[160px] grid-cols-[60px_1fr] gap-6 sm:min-h-[184px] sm:grid-cols-[80px_1fr] sm:gap-8 last:min-h-0"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 48, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4, margin: '0px 0px -8% 0px' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: shouldReduceMotion ? 0 : 0.2 + index * 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              className="grid size-[60px] place-items-center rounded-full border border-[#d8d5cf] bg-white text-[20px] font-medium text-[#aaa59d] shadow-[0_5px_18px_rgba(17,17,15,0.04)] sm:size-20 sm:text-[23px]"
              initial={shouldReduceMotion ? false : { scale: 0.68, rotate: -12 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                delay: shouldReduceMotion ? 0 : 0.24 + index * 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            <div className="pt-2 sm:pt-4">
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-black sm:text-[23px]">{title}</h3>
              <p className="mt-3 max-w-[455px] text-[14px] leading-[1.7] text-[#77736e] sm:text-[15px]">{body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
