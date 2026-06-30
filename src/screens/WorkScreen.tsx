import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Footer } from '../components/Home/Footer'
import { Header } from '../components/Home/Header'
import { projects } from '../data/projects'
import { useScrollDepth } from '../hooks/useScrollDepth'

export default function WorkScreen() {
  const shouldReduceMotion = useReducedMotion()
  const projectIndexRef = useRef<HTMLElement>(null)
  useScrollDepth()

  const scrollProjectIndex = (direction: -1 | 1) => {
    projectIndexRef.current?.scrollBy({
      left: direction * 260,
      behavior: 'smooth',
    })
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] font-geist text-[#11110f]">
      <Header />

      <section className="px-5 pb-20 pt-16 text-center sm:px-8 lg:pb-24 lg:pt-24">
        <motion.div
          className="mx-auto max-w-[760px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex h-[29px] items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 font-geist-mono text-[10px] uppercase tracking-[0.06em] text-[#77736e]">
            <span className="size-1.5 rounded-full bg-[#8648dc]" aria-hidden="true" />
            Selected Work
          </p>
          <h1 className="mt-7 text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[68px]">
            Real products.
            <br />
            Measured outcomes.
          </h1>
          <p className="mx-auto mt-6 max-w-[610px] text-[15px] leading-[1.7] text-[#77736e]">
            Every project here is a real engagement — real constraints, real decisions, real results. We share this work to show the standard we hold ourselves to on every build.
          </p>
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-black/10 bg-white px-5 py-3 text-[12px] text-[#77736e] shadow-[0_8px_24px_rgba(17,17,15,0.05)]">
            <span>
              <strong className="mr-2 font-semibold text-black">{projects.length}</strong>
              {projects.length === 1 ? 'case study' : 'case studies'}
            </span>
            <span className="text-black/25" aria-hidden="true">·</span>
            <span>
              <strong className="mr-2 font-semibold text-black">4</strong>
              industries
            </span>
            <span className="text-black/25" aria-hidden="true">·</span>
            <span className="font-caveat text-[17px] leading-none text-[#4f4b46]">selected public work</span>
          </div>
        </motion.div>
      </section>

      <div className="sticky top-[76px] z-40 border-y border-[#e5e1db] bg-[#faf9f6]/95 backdrop-blur-md sm:top-[100px]">
        <div className="mx-auto grid max-w-[1200px] gap-3 px-5 py-4 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center sm:gap-7 sm:px-8 sm:py-5">
          <span className="font-geist-mono text-[9px] uppercase tracking-[0.1em] text-[#9a958e]">
            Index&nbsp;&nbsp;·&nbsp;&nbsp;{String(projects.length).padStart(2, '0')} {projects.length === 1 ? 'project' : 'projects'}
          </span>
          <span className="hidden h-8 w-px bg-black/10 sm:block" aria-hidden="true" />

          <div className="flex min-w-0 items-center gap-2">
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => scrollProjectIndex(-1)}
                className="grid size-8 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[13px] text-black transition hover:border-black hover:bg-black hover:text-white"
                aria-label="Previous projects"
              >
                ←
              </button>
            )}

            <nav
              ref={projectIndexRef}
              className="flex min-w-0 flex-1 snap-x snap-mandatory flex-nowrap items-center gap-3 overflow-x-auto scroll-smooth text-[12px] text-[#77736e] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Project index"
            >
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`#${project.id}`}
                  className="group inline-flex shrink-0 snap-start items-center gap-1.5 rounded-full border border-transparent bg-white/70 px-4 py-2 transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-black hover:bg-black hover:text-white"
                >
                  <span className="font-geist-mono text-[9px] text-[#aaa59e] transition group-hover:text-white/55">
                    {project.index}
                  </span>
                  {project.name}
                </a>
              ))}
            </nav>

            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => scrollProjectIndex(1)}
                className="grid size-8 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-[13px] text-black transition hover:border-black hover:bg-black hover:text-white"
                aria-label="Next projects"
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-24">
        {projects.map((project) => (
          <motion.article
            key={project.id}
            id={project.id}
            className="scroll-mt-[160px]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -10% 0px' }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.62,
              delay: shouldReduceMotion ? 0 : 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 mt-3">
                <span className="rounded-full px-3 py-1.5 font-geist-mono text-[9px]" style={{ color: project.accent, backgroundColor: `${project.accent}14` }}>
                  {project.index} / {project.name}
                </span>
                <span className="rounded-full border border-black/10 px-3 py-1.5 font-geist-mono text-[9px] text-[#77736e]">
                  Product · Design · Build
                </span>
              </div>
              <span className="font-geist-mono text-[9px] uppercase tracking-[0.08em] text-[#9a958e]">
                {project.client} · {project.year}
              </span>
            </div>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
              >
                Visit live site ↗
              </a>
            )}

            <div className="mt-7 grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <h2 className="max-w-[650px] text-[38px] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[52px]">
                {project.title}
              </h2>
              <div className="space-y-5 text-[14px] leading-[1.7] text-[#77736e]">
                <p>{project.summary}</p>
                <p>{project.detail}</p>
              </div>
            </div>

            <motion.div
              className="group mt-10 h-[360px] overflow-hidden rounded-[24px] p-4 sm:h-[540px] sm:p-8"
              style={{ backgroundColor: project.surface }}
              whileHover={shouldReduceMotion ? undefined : { scale: 0.995 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between pb-4 font-geist-mono text-[9px] uppercase tracking-[0.08em] text-[#77736e]">
                <span>Customer · Banking · App</span>
                <span>Case 01 / Mobile</span>
              </div>
              <div className="h-[calc(100%-34px)]">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${project.name}`}
                    className="flex h-full items-center justify-center overflow-hidden rounded-[18px] bg-white/55 p-4 shadow-[0_22px_70px_rgba(56,91,135,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.01] sm:p-7"
                  >
                    <img
                      src={project.previewImage}
                      alt={`${project.name} project preview`}
                      className="max-h-full max-w-full rounded-[14px] object-contain"
                      style={{ objectPosition: project.previewPosition }}
                    />
                  </a>
                ) : (
                  <div className="flex h-full items-center justify-center overflow-hidden rounded-[18px] bg-white/55 p-4 shadow-[0_22px_70px_rgba(56,91,135,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.01] sm:p-7">
                    <img
                      src={project.previewImage}
                      alt={`${project.name} project preview`}
                      className="max-h-full max-w-full rounded-[14px] object-contain"
                      style={{ objectPosition: project.previewPosition }}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 border-b border-[#e5e1db] pb-10 sm:grid-cols-4">
              {project.metrics.map(([value, label]) => (
                <div key={label} className="border-[#e5e1db] px-4 py-5 first:pl-0 sm:border-r sm:last:border-r-0">
                  <strong className="block text-[30px] font-semibold tracking-[-0.04em]" style={{ color: project.accent }}>
                    {value}
                  </strong>
                  <span className="mt-2 block text-[10px] text-[#8c8881]">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-2 font-geist-mono text-[9px] uppercase tracking-[0.1em] text-[#9a958e]">Services</span>
              {project.services.map((service) => (
                <span key={service} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] text-[#77736e]">
                  {service}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </section>

      <section className="border-t border-[#e5e1db] px-5 py-24 text-center sm:px-8 lg:py-32">
        <p className="font-geist-mono text-[9px] uppercase tracking-[0.1em] text-[#9a958e]">Case studies</p>
        <h2 className="mt-5 text-[34px] font-semibold tracking-[-0.035em] sm:text-[42px]">Want the full case studies?</h2>
        <p className="mx-auto mt-3 max-w-[530px] text-[13px] leading-[1.7] text-[#77736e]">
          Full case studies — including challenge detail, design decisions, and technical architecture — are available on request.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/contact" className="rounded-full bg-black px-6 py-3 text-[13px] font-medium text-white transition hover:bg-orange hover:text-black">
            Request case studies ↗
          </a>
          <a href="mailto:hello@zyra.tech" className="rounded-full border border-black/10 bg-white px-6 py-3 text-[13px] font-medium">
            Hello@zyra.tech
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
