import { SectionLabel } from './SectionLabel'

const services = [
  ['Product Strategy', 'Roadmaps, positioning, and launch plans shaped around the market.'],
  ['UI/UX Design', 'Interfaces that are clean, accessible, and tuned for real workflows.'],
  ['Web Development', 'Fast, modern web experiences built with the right stack for your goals.'],
  ['Mobile Development', 'Native-feeling products designed for everyday use.'],
  ['Branding & Identity', 'Visual systems that make your product easier to remember.'],
  ['Deployment & DevOps', 'Release pipelines, analytics, and hosting foundations.'],
]

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="mb-10 grid gap-6 sm:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel tone="blue">Services</SectionLabel>
          <h2 className="max-w-lg text-3xl font-semibold leading-tight sm:text-5xl">
            Everything your product needs under one roof
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted">
          We define the product, design the flow, build the interface, and launch the system with enough structure for the next stage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(([title, body], index) => (
          <article key={title} className="rounded-[8px] bg-white p-6 shadow-[0_18px_45px_rgba(17,17,15,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(17,17,15,0.08)]">
            <span className="mb-8 grid h-8 w-8 place-items-center rounded-[7px] bg-cream text-xs font-semibold text-orange">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="mt-3 text-xs leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
