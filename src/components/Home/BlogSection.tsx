import { useEffect, useState } from 'react'
import { getPosts, type BlogPost } from '../../lib/blog'
import fallbackCover from '../../assets/png/hero-background.jpg'

function formatDate(value?: string) {
  if (!value || Number.isNaN(Date.parse(value))) return ''
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    let active = true
    getPosts({ limit: 2 })
      .then((list) => {
        if (active) setPosts(list.posts)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  if (!posts.length) return null

  return (
    <section className="bg-white px-5 py-20 text-ink sm:px-8 lg:px-5 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <p className="flex items-center gap-4 text-base sm:text-xl">
            <span
              className="size-2.5 rounded-full bg-orange"
              aria-hidden="true"
            />
            Blog and Articles
          </p>
          <h2 className="mt-7 max-w-[420px] text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
            Latest insights and trends
          </h2>
          <a
            href="/blog"
            className="mt-8 inline-flex min-h-[46px] items-center gap-3 rounded-full bg-about-dark py-1 pr-1 pl-4 text-sm text-white"
          >
            View more{' '}
            <span
              className="grid size-[38px] place-items-center rounded-full bg-orange"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.postId}
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="group relative isolate block aspect-[4/5] overflow-hidden rounded-[28px] bg-about-dark text-white"
            >
              <img
                src={post.coverImageUrl || fallbackCover}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
                <p className="text-sm text-white/80">
                  {formatDate(post.publishedAt || post.createdAt)}
                </p>
                <h3 className="mt-2 max-w-[320px] text-xl leading-tight tracking-[-0.03em] sm:text-2xl">
                  {post.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
