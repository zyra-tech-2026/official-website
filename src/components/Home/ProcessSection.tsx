import { SectionLabel } from './SectionLabel'

const phases = [
  ['Discover', 'We map user ambition, core value, and launch constraints before touching pixels.'],
  ['Design', 'Flows, visual systems, and key screens come together in a tight loop.'],
  ['Build', 'Engineering turns the approved product direction into a working release.'],
  ['Launch & Grow', 'We monitor behavior, polish the experience, and ship the next useful version.'],
]

export function ProcessSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-14 sm:grid-cols-[0.9fr_1.1fr] sm:px-8">
      <div>
        <SectionLabel tone="pink">Process</SectionLabel>
        <h2 className="max-w-md text-4xl font-semibold leading-[1.02] sm:text-5xl">
          Four phases.
          <br />
          Zero surprises.
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
          Every engagement runs through the same calm rhythm: clarify, design, build, and improve.
        </p>
        <div className="mt-8 flex -space-x-2">
          {['bg-blue-500', 'bg-orange', 'bg-emerald-500', 'bg-violet-500'].map((color) => (
            <span key={color} className={`h-8 w-8 rounded-full border-2 border-cream ${color}`} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {phases.map(([title, body], index) => (
          <div key={title} className="grid grid-cols-[54px_1fr] gap-5">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-sm font-semibold text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="border-b border-line pb-6">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 max-w-md text-xs leading-6 text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
