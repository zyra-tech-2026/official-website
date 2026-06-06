import { SectionLabel } from './SectionLabel'

const items = [
  ['Senior-only talent', 'Every project is led by people who can shape product decisions, not just screens.'],
  ['Embedded, not outsourced', 'We work close to founders and teams, with shared rhythm and clear ownership.'],
  ['Delivery in sprints', 'You see useful work early, then we keep tightening until launch.'],
  ['Transparent pricing', 'Fixed scopes, simple terms, and no mystery line items.'],
]

export function Differentiators() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="mb-10 grid gap-6 sm:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel>Why us</SectionLabel>
          <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
            What actually makes us different.
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-7 text-muted">
          We work like a product unit, not a production line: tight teams, fast feedback loops, and calm delivery.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-[10px] bg-white shadow-[0_18px_45px_rgba(17,17,15,0.04)] sm:grid-cols-2">
        {items.map(([title, body], index) => (
          <article key={title} className="border-line p-7 even:border-l sm:[&:nth-child(n+3)]:border-t">
            <span className="mb-5 grid h-8 w-8 place-items-center rounded-[7px] bg-cream text-xs font-semibold text-orange">
              {index + 1}
            </span>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-3 text-xs leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
