import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import productStrategy from '../../assets/png/product-strategy.png'
import uiUx from '../../assets/png/ui-ux.png'
import webDev from '../../assets/png/web-dev.png'
import mobileDev from '../../assets/png/mobile-dev.png'
import branding from '../../assets/png/brand-and-ide.png'
import devops from '../../assets/png/devops.png'
import plusIcon from '../../assets/svg/plus.svg'

const services = [
  { title: 'Product Strategy', image: productStrategy, about: "Most products fail before a line of code is written, because the wrong thing gets built. We start by understanding your business, your users and your market, then help you decide what to build first, what to leave out and how you’ll know it’s working. You leave with a clear plan your team can act on, whether you build with us or not.",options: ["Product discovery and user research", "Feature prioritisation and roadmap", "MVP scoping and launch planning", "Success metrics you can track", ] },
  { title: 'UI/UX Design', image: uiUx,about: "Good design isn’t decoration. It’s the difference between a product people figure out and one they abandon. We design interfaces that are clear on first use and consistent as you grow, working alongside our engineers so every screen we hand over is one we know can be built.",options: ["User flows and wireframes", "High-fidelity UI design", "Interactive prototypes for testing", "Design systems that scale with you", ] },
  { title: 'Web Development', image: webDev, about: "We build fast, reliable web products, from marketing sites to complex platforms, using modern technologies. The code is clean, documented and structured so your team, or your next hire, can pick it up without starting over. We build for the traffic you’re expecting, not just the demo.",options: ["Web apps and SaaS platforms", "Marketing sites and landing pages", "Dashboards and admin tools", "APIs and third-party integrations", ] },
  { title: 'Mobile Development', image: mobileDev, about: "Your users are on their phones, often on patchy networks and older devices. We build iOS and Android apps that stay fast and usable in those real conditions, with offline support where it matters. One codebase where it makes sense, native where it counts.",options: ["iOS and Android apps", "Cross-platform builds", "Offline-first and low-bandwidth support", "App Store and Play Store launch", ] },
  { title: 'Branding & Identity', image: branding, about: "People judge your product before they use it. We create identities that make you look credible from day one: a name, a look and a voice that hold together across your website, your app and your pitch deck. It’s built to be used, with a clear guide your team can follow without us.",options: ["Brand strategy and positioning", "Logo and visual identity", "Brand voice and messaging", "Brand guidelines and asset kits", ] },
  { title: 'Deployment & DevOps', image: devops, about: "Launch should be the calm part. We set up infrastructure, automated deployments and monitoring so your product ships reliably and you know about problems before your users do. As usage grows, your setup grows with it, without surprise downtime or surprise bills.",options: ["Cloud setup on AWS, Vercel and more", "CI/CD pipelines and automated testing", "Monitoring, alerts and uptime", "Scaling and cost optimisation", ] },
]

// const placeholder =
//   'Their automation strategy completely reshaped how we work. It’s efficient, intelligent, and seamless.'

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  return (
    <section
      id="services"
      className="bg-white px-5 pt-16 pb-24 text-ink sm:px-8 lg:px-5 lg:pt-24 lg:pb-32"
    >
      <div className="mx-auto max-w-[1240px]">
        <p className="flex items-center justify-center gap-4 text-base sm:text-xl">
          <span
            className="size-2.5 rounded-full bg-orange"
            aria-hidden="true"
          />
          Our Services
        </p>
        <h2 className="mx-auto mt-7 max-w-[900px] text-center text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
          Comprehensive consulting and
          <br className="hidden sm:block" /> intelligent innovation
        </h2>
        <div className="mt-16 lg:mt-36">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="border-t border-line"
              onMouseEnter={() => {
                if (
                  window.matchMedia('(hover: hover) and (pointer: fine)')
                    .matches
                )
                  setOpenIndex(index)
              }}
              onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement))
                  setOpenIndex((current) =>
                    current === index ? null : current,
                  )
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setOpenIndex((current) =>
                    current === index ? null : current,
                  )
              }}
            >
              <h3>
                <button
                  type="button"
                  id={`service-trigger-${index}`}
                  aria-expanded={openIndex === index}
                  aria-controls={`service-panel-${index}`}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  className="flex min-h-[100px] w-full cursor-pointer text-left focus-visible:outline-orange list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden sm:min-h-[130px] sm:gap-16"
                >
                  <span className="w-10 shrink-0 text-2xl tracking-[-0.04em] sm:w-14 sm:text-[40px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-[clamp(22px,3vw,40px)] leading-tight tracking-[-0.04em]">
                    {service.title}
                  </span>
                  <span
                    className="relative size-8 shrink-0 text-orange sm:size-9"
                    aria-hidden="true"
                  >
                    <img
                      src={plusIcon}
                      alt=""
                      className={openIndex === index ? 'hidden' : ''}
                    />
                    <span
                      className={
                        openIndex === index
                          ? 'absolute top-1/2 left-0 h-[4.5px] w-[33px] -translate-y-1/2 bg-current'
                          : 'hidden'
                      }
                    />
                  </span>
                </button>
              </h3>
              <motion.div
                id={`service-panel-${index}`}
                role="region"
                aria-labelledby={`service-trigger-${index}`}
                aria-hidden={openIndex !== index}
                inert={openIndex !== index}
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: openIndex === index ? 1 : 0,
                    y: openIndex === index || reduceMotion ? 0 : 28,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 2.8,
                    delay: reduceMotion || openIndex !== index ? 0 : 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid items-stretch gap-6 pb-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-8"
                >
                  <div className="flex w-full items-center justify-center rounded-2xl bg-about-card p-5 sm:p-7">
                    <img
                      src={service.image}
                      alt=""
                      className="h-[260px] w-full rounded-xl object-contain sm:h-[320px] lg:h-[360px]"
                    />
                  </div>
                  <div className="flex flex-col items-start text-base leading-relaxed text-about-copy md:justify-between">
                    <p>{Array(2).fill(service.about).join(' ')}</p>
                    <ul className="mt-6 list-disc space-y-2 pl-5">
                      {Array.from({ length: 4 }, (_, i) => (
                        <li key={i}>{service.options[i]}</li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className="mt-6 inline-flex min-h-[46px] items-center gap-3 rounded-full bg-orange py-[3px] pr-1 pl-[17px] text-sm text-white hover:bg-orange/90"
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
                </motion.div>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
