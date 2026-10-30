import Markdown from 'react-markdown'
import { Fragment, useEffect, useState } from 'react'
import { Header } from '../components/Home/Header'
import { Footer } from '../components/Home/Footer'
import { CallToAction } from '../components/Home/CallToAction'
import {
  formatPostDate,
  getCategories,
  getPost,
  getPosts,
  postCategory,
  postReadTime,
  type BlogPost,
} from '../lib/blog'
import fallbackCover from '../assets/png/hero-background.jpg'

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Something went wrong. Please try again.'

const postHref = (post: BlogPost) => `/blog/${encodeURIComponent(post.slug)}`

function Meta({
  post,
  ordinal = false,
  showReadTime = true,
}: {
  post: BlogPost
  ordinal?: boolean
  showReadTime?: boolean
}) {
  const category = postCategory(post)
  const minutes = showReadTime ? postReadTime(post) : undefined
  const parts = [
    formatPostDate(post.publishedAt || post.createdAt, ordinal),
    category && <span className="text-orange">{category}</span>,
    minutes && `${minutes} min read`,
  ].filter(Boolean)
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm text-about-copy">
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span aria-hidden="true" className="text-[10px] opacity-60">
              •
            </span>
          )}
          {part}
        </Fragment>
      ))}
    </p>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <a href={postHref(post)} className="block">
        <div className="aspect-[1.42] overflow-hidden rounded-[20px] bg-about-card">
          <img
            src={post.coverImageUrl || fallbackCover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
        <div className="mt-4">
          <Meta post={post} showReadTime={false} />
        </div>
        <h3 className="mt-2 text-xl leading-snug tracking-[-0.03em] transition-colors group-hover:text-orange sm:text-2xl">
          {post.title}
        </h3>
      </a>
    </article>
  )
}

function Status({
  loading,
  error,
  onRetry,
}: {
  loading: boolean
  error: string
  onRetry: () => void
}) {
  if (loading)
    return (
      <p role="status" className="py-20 text-about-copy">
        Loading articles…
      </p>
    )
  return (
    <div className="py-20">
      <p role="alert" className="text-about-copy">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-full bg-about-dark px-5 py-3 text-sm text-white"
      >
        Try again
      </button>
    </div>
  )
}

function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    let active = true
    getCategories()
      .then((list) => {
        if (active) setCategories(list)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  function selectCategory(next: string) {
    if (next === category) return
    setCategory(next)
    setPosts([])
    setHasNext(false)
    setPage(1)
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    getPosts({ page, category })
      .then((list) => {
        if (!active) return
        setPosts((current) => {
          const seen = new Set(current.map((post) => post.postId))
          return [
            ...current,
            ...list.posts.filter((post) => !seen.has(post.postId)),
          ]
        })
        setHasNext(list.pagination.hasNextPage)
      })
      .catch((err) => {
        if (active) setError(errorMessage(err))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [page, category, retry])

  const featured = posts.find((post) => post.featured) ?? posts[0]
  const rest = posts.filter((post) => post !== featured)

  return (
    <section className="mx-auto max-w-[1240px] px-5 pt-16 pb-20 sm:px-8 lg:pt-24 lg:pb-28">
      <p className="flex items-center gap-3 text-sm sm:text-base">
        <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
        Blog and articles
      </p>
      <h1 className="mt-5 text-[clamp(44px,6vw,72px)] leading-[1.05] tracking-[-0.055em]">
        Notes from the build.
      </h1>
      <p className="mt-6 max-w-[520px] text-base leading-relaxed text-about-copy">
        What we’re learning from shipping products, our own and our clients’.
        Practical and specific, written by the people doing the work.
      </p>

      {categories.length > 0 && (
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {['', ...categories].map((name) => (
            <button
              key={name || 'all'}
              type="button"
              aria-pressed={category === name}
              onClick={() => selectCategory(name)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${category === name ? 'border-about-dark bg-about-dark text-white' : 'border-line hover:border-ink'}`}
            >
              {name || 'All'}
            </button>
          ))}
        </div>
      )}

      {!posts.length && (loading || error) ? (
        <Status
          loading={loading}
          error={error}
          onRetry={() => setRetry((value) => value + 1)}
        />
      ) : !featured ? (
        <p className="py-20 text-about-copy">
          {category
            ? `No articles in ${category} yet. Check back soon.`
            : 'No articles have been published yet. Check back soon.'}
        </p>
      ) : (
        <>
          <article className="group mt-14 grid items-center gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            <a
              href={postHref(featured)}
              className="block aspect-[1.38] overflow-hidden rounded-[24px] bg-about-card"
            >
              <img
                src={featured.coverImageUrl || fallbackCover}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
            </a>
            <div>
              <Meta post={featured} />
              <h2 className="mt-5 text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.04em]">
                <a href={postHref(featured)}>{featured.title}</a>
              </h2>
              {featured.excerpt && (
                <p className="mt-5 max-w-[460px] leading-relaxed text-about-copy">
                  {featured.excerpt}
                </p>
              )}
              <a
                href={postHref(featured)}
                className="mt-7 inline-flex min-h-[46px] items-center gap-3 rounded-full bg-about-dark py-1 pr-1 pl-4 text-sm text-white"
              >
                Read article{' '}
                <span
                  className="grid size-[38px] place-items-center rounded-full bg-orange"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </article>

          {rest.length > 0 && (
            <div className="mt-20 lg:mt-28">
              <h2 className="text-[clamp(32px,3.5vw,44px)] leading-[1.1] tracking-[-0.045em]">
                Recently published
              </h2>
              <p className="mt-3 text-sm text-about-copy">
                Product, design and engineering lessons from real launches.
              </p>
              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.postId} post={post} />
                ))}
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-10 text-center text-about-copy">
              {error}
            </p>
          )}
          {hasNext && (
            <div className="mt-14 flex justify-center">
              <button
                disabled={loading}
                onClick={() => {
                  setError('')
                  setPage((value) => value + 1)
                }}
                className="rounded-full border border-line px-6 py-3 text-sm transition-colors hover:border-ink disabled:opacity-50"
              >
                {loading ? 'Loading…' : 'Load more articles'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const pill =
    'rounded-full border border-line px-4 py-2 text-xs transition-colors hover:border-ink'
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
      <p className="text-sm text-about-copy">Share this article</p>
      <div className="flex gap-2">
        <button
          className={pill}
          onClick={() => {
            navigator.clipboard
              ?.writeText(url)
              .then(() => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 2000)
              })
              .catch(() => {})
          }}
        >
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <a
          className={pill}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        >
          LinkedIn
        </a>
        <a
          className={pill}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          href={`https://x.com/intent/tweet?via=zyracore&url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        >
          X
        </a>
      </div>
    </div>
  )
}

function Author({ post }: { post: BlogPost }) {
  if (!post.authorName) return null
  return (
    <div className="mt-8 flex items-center gap-3">
      {post.authorAvatarUrl ? (
        <img
          src={post.authorAvatarUrl}
          alt=""
          className="size-12 rounded-full object-cover"
        />
      ) : (
        <span
          className="grid size-12 place-items-center rounded-full bg-about-card text-lg"
          aria-hidden="true"
        >
          {post.authorName.charAt(0)}
        </span>
      )}
      <div>
        <p className="text-sm">{post.authorName}</p>
        {post.authorRole && (
          <p className="text-xs text-about-copy">{post.authorRole}</p>
        )}
      </div>
    </div>
  )
}

function LatestPosts({ currentSlug }: { currentSlug: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    let active = true
    getPosts({ limit: 3, excludeSlug: currentSlug })
      .then((list) => {
        if (active) setPosts(list.posts)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [currentSlug])
  if (!posts.length) return null
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-20 sm:px-8 lg:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[clamp(32px,3.5vw,44px)] leading-[1.1] tracking-[-0.045em]">
            Latest from the blog
          </h2>
          <p className="mt-3 text-sm text-about-copy">
            More notes on building products people use.
          </p>
        </div>
        <a
          href="/blog"
          className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-ink"
        >
          View all articles
        </a>
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.postId} post={post} />
        ))}
      </div>
    </section>
  )
}

function BlogArticle({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setPost(null)
    getPost(slug)
      .then((value) => {
        if (active) setPost(value)
      })
      .catch((err) => {
        if (active) setError(errorMessage(err))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug, retry])

  useEffect(() => {
    if (!post) return
    const previous = document.title
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const previousDescription = meta?.content
    document.title = post.metaTitle || post.title
    if (meta && (post.metaDescription || post.excerpt))
      meta.content = post.metaDescription || post.excerpt || ''
    return () => {
      document.title = previous
      if (meta && previousDescription !== undefined)
        meta.content = previousDescription
    }
  }, [post])

  return (
    <>
      <section className="mx-auto max-w-[940px] px-5 pt-16 pb-16 sm:px-8 lg:pt-24 lg:pb-20">
        <a
          href="/blog"
          className="text-sm text-about-copy transition-colors hover:text-orange"
        >
          ← All articles
        </a>
        {loading || error || !post ? (
          <Status
            loading={loading}
            error={error}
            onRetry={() => setRetry((value) => value + 1)}
          />
        ) : (
          <article className="mt-8">
            <Meta post={post} ordinal />
            <h1 className="mt-5 text-[clamp(38px,5.5vw,64px)] leading-[1.05] tracking-[-0.05em]">
              {post.title}
            </h1>
            <Author post={post} />
            {post.coverImageUrl && (
              <div className="mt-12 flex justify-center overflow-hidden rounded-[24px] bg-about-card">
                <img
                  src={post.coverImageUrl}
                  alt=""
                  className="max-h-[260px] w-auto max-w-full object-contain sm:max-h-[380px] lg:max-h-[440px]"
                />
              </div>
            )}
            <div className="mt-12 text-base leading-[1.8] text-about-copy sm:text-[17px] [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-ink [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-1.5 [&_a]:text-orange [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-orange [&_blockquote]:pl-5 [&_img]:my-6 [&_img]:rounded-xl">
              <Markdown>{post.content ?? ''}</Markdown>
            </div>
            <ShareButtons title={post.title} />
          </article>
        )}
      </section>
      {post && <LatestPosts currentSlug={post.slug} />}
    </>
  )
}

export default function BlogScreen({ slug }: { slug?: string }) {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      {slug ? <BlogArticle slug={slug} /> : <BlogIndex />}
      <CallToAction />
      <Footer />
    </main>
  )
}
