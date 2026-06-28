import { motion, useReducedMotion } from 'framer-motion'

const services = [
  ['Product Strategy', 'Roadmaps, positioning, and launch plans shaped around the market.'],
  ['UI/UX Design', 'Interfaces that are clean, accessible, and tuned for real workflows.'],
  ['Web Development', 'Fast, modern web experiences built with the right stack for your goals.'],
  ['Mobile Development', 'Native-feeling products designed for everyday use.'],
  ['Branding & Identity', 'Visual systems that make your product easier to remember.'],
  ['Deployment & DevOps', 'Release pipelines, analytics, and hosting foundations.'],
]

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 pb-24 font-geist sm:px-8 lg:px-5">
      <div className="mb-14 grid gap-8 lg:grid-cols-[600px_minmax(0,1fr)] lg:gap-[67px]">
        <div>
          <p className="mb-[28px] inline-flex h-[29px] items-center gap-2 rounded-full border border-black/15 bg-white px-3 font-geist text-[13px] font-normal leading-none text-[#202020] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <span className="size-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
            <span>Services</span>
            <span className="h-3.5 w-px bg-black/80" aria-hidden="true" />
          </p>
          <h2 className="max-w-[610px] text-[38px] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[48px] lg:text-[54px]">
            Everything your product
            <br className="hidden lg:block" /> needs — under one roof.
          </h2>
        </div>
        <p className="max-w-[570px] text-[16px] leading-[1.6] text-muted lg:pt-[60px] lg:text-[18px]">
          Six disciplines, one team. We don’t hand off between specialists — we build with them, in the same room, on the same Slack.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([title, body], index) => (
          <motion.article
            key={title}
            className="group rounded-[8px] bg-white p-6 shadow-[0_18px_45px_rgba(17,17,15,0.04)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 52, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -8,
                    scale: 1.01,
                    boxShadow: '0 24px 60px rgba(17, 17, 15, 0.1)',
                    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                  }
            }
            viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1,
              delay: shouldReduceMotion ? 0 : index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className={`mb-8 grid h-8 w-8 place-items-center rounded-[7px] bg-cream text-xs font-semibold text-orange ${
                shouldReduceMotion
                  ? ''
                  : 'transition-[transform,background-color,color] duration-300 ease-out group-hover:scale-110 group-hover:bg-orange group-hover:text-white'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-3 text-xs leading-6 text-muted">{body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
