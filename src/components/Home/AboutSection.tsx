import aboutPhoto from '../../assets/png/about-photo.jpg'
import gear from '../../assets/png/gear.png'

const avatars = [12, 32, 11, 33, 15]
const avatarUrl = (id: number) => `https://i.pravatar.cc/80?img=${id}`
const headingAvatar =
  'https://res.cloudinary.com/da1bee2hs/image/upload/v1792360505/refuge/avatars/user_6ad385ba441a6a0a26d79220.jpg'

export function AboutSection() {
  return (
    <section className="flex min-h-screen items-center bg-white px-5 py-20 text-ink lg:h-svh lg:min-h-0 lg:py-8">
      <div className="mx-auto w-full max-w-[1240px]">
        <p className="flex items-center justify-center gap-4 text-base sm:text-xl">
          <span
            className="size-2.5 rounded-full bg-orange"
            aria-hidden="true"
          />
          About Us
        </p>
        <h2 className="mx-auto mt-7 max-w-[1000px] text-center text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
          <span className="text-about-muted">We Drive</span> innovation{' '}
          <span className="inline-flex size-[0.85em] items-end justify-center overflow-hidden rounded-full bg-about-avatar align-[-0.05em]">
            <img
              src={headingAvatar}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>{' '}
          <span className="text-about-muted">and</span>
          <br className="hidden sm:block" /> delivers{' '}
          <span className="inline-flex size-[0.85em] items-end justify-center overflow-hidden rounded-full bg-about-avatar align-[-0.05em]">
            <img
              src={headingAvatar}
              alt=""
              className="h-full w-full object-contain"
            />
          </span>{' '}
          <span className="text-about-muted">exceptional</span> results.
        </h2>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-[clamp(20px,5vh,48px)] lg:grid-cols-3">
          <article className="relative flex min-h-[350px] flex-col justify-between overflow-hidden rounded-3xl p-4 text-white lg:min-h-[min(368px,42vh)]">
            <img
              src={aboutPhoto}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="relative flex items-start justify-between gap-3 pt-4">
              <p className="text-xl">Products shipped</p>
              <span className="grid size-11 place-items-center rounded-xl bg-white">
                <img src={gear} alt="" className="size-5 object-contain" />
              </span>
            </div>
            <div className="relative rounded-xl bg-white p-4 text-ink">
              <p className="text-5xl tracking-[-0.05em]">20+</p>
              <p className="mt-6 text-sm leading-relaxed text-about-copy">
                Launches delivered across 5 countries.
              </p>
            </div>
          </article>

          <article className="flex min-h-[350px] flex-col justify-between rounded-3xl bg-about-card p-8 lg:min-h-[min(368px,42vh)]">
            <div>
              <p className="text-sm text-about-copy">
               Services
              </p>
              <p className="mt-6 text-5xl tracking-[-0.05em]">100%</p>
            </div>
            <div className="mt-10">
              <div className="flex pl-3" aria-hidden="true">
                {avatars.map((id) => (
                  <img
                    key={id}
                    src={avatarUrl(id)}
                    alt=""
                    className="-ml-3 size-[50px] rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-about-copy">
                Product Strategy, UI/UX Design, Web Development, Mobile Development, Branding & Identity, and Deployment & DevOps.
              </p>
            </div>
          </article>

          <div className="grid min-h-[350px] grid-rows-[2fr_1fr] gap-3 md:col-span-2 lg:col-span-1 lg:min-h-[min(368px,42vh)]">
            <article className="flex flex-col justify-between rounded-3xl bg-orange p-8 text-white">
              <div>
                <p className="text-sm">Delivery Scope</p>
                <p className="mt-6 text-5xl tracking-[-0.05em]">5</p>
              </div>
              <p className="mt-8 max-w-[310px] text-sm leading-relaxed">
               Countries where ZYRA has delivered product launches.
              </p>
            </article>
            <article className="flex items-center justify-between rounded-3xl bg-about-dark px-6 py-5 text-white">
              <p className="text-sm">Years of experience</p>
              <p className="text-5xl tracking-[-0.05em]">10+</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
