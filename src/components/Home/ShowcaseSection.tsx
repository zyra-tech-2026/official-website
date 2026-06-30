import { projects } from '../../data/projects'

export function ShowcaseSection() {
  return (
    <section id="works" className="mx-auto max-w-[1240px] px-5 pb-24 font-geist sm:px-8 lg:px-5">
      <div className="grid min-h-[330px] items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-24">
        <div>
          <p className="mb-7 inline-flex h-[29px] items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 font-geist-mono text-[10px] uppercase tracking-[0.06em] text-[#77736e]">
            <span className="size-1.5 rounded-full bg-[#8648dc]" aria-hidden="true" />
            Selected Work
          </p>
          <h2 className="max-w-[650px] text-[42px] font-semibold leading-[1.08] tracking-[-0.045em] text-black sm:text-[56px]">
            Products we've built.
            <br />
            Results that speak.
          </h2>
        </div>

        <a
          href="/work"
          className="group inline-flex min-h-[48px] w-fit items-center justify-center rounded-full border border-black/10 px-6 text-[14px] font-medium text-black transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white"
        >
          View all work
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>

      <div className="space-y-16">
        {projects.slice(0, 3).map((project) => (
          <article key={project.id}>
            <div className="mb-5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
                  >
                    Live ↗
                  </a>
                )}
              </div>
              <p className="mt-2 max-w-lg text-xs leading-6 text-muted">{project.title}</p>
            </div>
            <div className="h-[330px] overflow-hidden rounded-[18px] bg-white/50 p-4 shadow-[0_18px_60px_rgba(17,17,15,0.06)] sm:h-[520px] sm:p-7">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${project.name}`}
                  className="flex h-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f6f4ef] transition duration-700 hover:scale-[1.01]"
                >
                  <img
                    src={project.previewImage}
                    alt={`${project.name} project preview`}
                    className="max-h-full max-w-full rounded-[12px] object-contain"
                    style={{ objectPosition: project.previewPosition }}
                  />
                </a>
              ) : (
                <div className="flex h-full items-center justify-center overflow-hidden rounded-[14px] bg-[#f6f4ef]">
                  <img
                    src={project.previewImage}
                    alt={`${project.name} project preview`}
                    className="max-h-full max-w-full rounded-[12px] object-contain"
                    style={{ objectPosition: project.previewPosition }}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
