import { motion, useReducedMotion } from 'framer-motion'
import gearIcon from '../../assets/png/gear.png'

const services = [
  {
    title: 'Product Strategy',
    body: 'Roadmaps, prioritization, and go-to-market planning grounded in real user research.',
    mark: 'St',
    color: '#2563eb',
    bg: '#e9efff',
  },
  {
    title: 'UI/UX Design',
    body: 'Interfaces that are beautiful, accessible, and built around real user journeys.',
    mark: 'Ux',
    color: '#e83e86',
    bg: '#ffe8f2',
  },
  {
    title: 'Web Development',
    body: "Fast, modern web applications built with the right stack for your product's scale.",
    mark: '</>',
    color: '#16a866',
    bg: '#e5faee',
  },
  {
    title: 'Mobile Development',
    body: 'Native and cross-platform mobile apps designed for real-world performance.',
    mark: '◇',
    color: '#8b5cf6',
    bg: '#f0e7ff',
  },
  {
    title: 'Branding & Identity',
    body: 'Visual systems that express your values and make your product instantly recognizable.',
    mark: 'Br',
    color: '#ff7b00',
    bg: '#fff0e5',
  },
  {
    title: 'Deployment & DevOps',
    body: 'Reliable infrastructure, CI/CD pipelines, and monitoring so your product stays live.',
    icon: gearIcon,
    color: '#ffffff',
    bg: '#11110f',
  },
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            className="group min-h-[216px] rounded-[22px] bg-white p-8 shadow-[0_18px_45px_rgba(17,17,15,0.04)]"
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
              duration: shouldReduceMotion ? 0 : 0.7,
              delay: shouldReduceMotion ? 0 : index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-5 flex items-start justify-between">
              <span
                className={`grid size-11 place-items-center rounded-[12px] text-[16px] font-semibold ${
                  shouldReduceMotion ? '' : 'transition-transform duration-300 ease-out group-hover:scale-110'
                }`}
                style={{ backgroundColor: service.bg, color: service.color }}
              >
                {'icon' in service ? (
                  <img src={service.icon} alt="" className="size-5 brightness-0 invert" aria-hidden="true" />
                ) : (
                  service.mark
                )}
              </span>
              <span className="font-geist-mono text-[11px] text-[#aaa59e]">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-black">{service.title}</h3>
            <p className="mt-5 text-[15px] leading-[1.6] text-[#77736e]">{service.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
