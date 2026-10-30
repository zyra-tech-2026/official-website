import { useEffect, useState, type FormEvent } from 'react'
import Markdown from 'react-markdown'
import {
  api,
  sessionKey,
  type Session,
  type Post,
  type Subscriber,
  type Pagination,
} from './api'

const field =
  'w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-orange focus:ring-2 focus:ring-orange/15'
const button =
  'inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-orange disabled:opacity-50'
const secondary =
  'inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm transition hover:border-ink disabled:opacity-40'
const empty = {
  title: '',
  content: '',
  authorName: '',
  excerpt: '',
  tags: '',
  slug: '',
  metaTitle: '',
  metaDescription: '',
  status: 'draft',
}
type Editor = typeof empty
function fmt(value?: string) {
  return value && !Number.isNaN(Date.parse(value))
    ? new Date(value).toLocaleDateString('en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—'
}
function Logo() {
  return (
    <a href="/" className="text-2xl font-bold tracking-[0.15em]">
      ZYR<span className="text-orange">A</span>
      <span className="ml-3 text-xs font-normal tracking-normal text-muted">
        / Admin
      </span>
    </a>
  )
}
function savedSession(): Session | null {
  try {
    return JSON.parse(sessionStorage.getItem(sessionKey) || 'null')
  } catch {
    return null
  }
}

export default function App() {
  const [session, setSession] = useState<Session | null>(savedSession)
  const [section, setSection] = useState<'posts' | 'subscribers'>('posts')
  const [editing, setEditing] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const expire = () => {
      setSession(null)
      setNotice('Your session has expired. Please sign in again.')
    }
    window.addEventListener('session-expired', expire)
    return () => window.removeEventListener('session-expired', expire)
  }, [])
  if (!session)
    return (
      <Login
        onLogin={(s) => {
          sessionStorage.setItem(sessionKey, JSON.stringify(s))
          setSession(s)
          setNotice('')
        }}
        notice={notice}
      />
    )
  return (
    <div className="min-h-screen bg-surface lg:flex">
      <aside className="border-b border-line bg-white px-5 py-5 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0 lg:p-8">
        <Logo />
        <nav
          aria-label="Admin navigation"
          className="mt-6 flex gap-2 lg:mt-14 lg:flex-col"
        >
          {(['posts', 'subscribers'] as const).map((item) => (
            <button
              key={item}
              onClick={() => {
                setEditing(null)
                setSection(item)
              }}
              className={`rounded-xl px-4 py-3 text-left text-sm ${section === item ? 'bg-ink text-white' : 'text-muted hover:bg-surface'}`}
            >
              {item === 'posts' ? 'Blog posts' : 'Newsletter'}
            </button>
          ))}
        </nav>
        <div className="mt-6 flex items-center justify-between gap-3 lg:mt-auto lg:block">
          <div>
            <p className="text-sm font-medium">{session.admin.fullName}</p>
            <p className="mt-1 text-xs text-muted">{session.admin.email}</p>
          </div>
          <button
            className="text-sm text-muted hover:text-orange lg:mt-5"
            onClick={() => {
              sessionStorage.removeItem(sessionKey)
              setSession(null)
            }}
          >
            Sign out ↗
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-[1200px]">
          {section === 'posts' ? (
            editing !== null ? (
              <PostEditor
                token={session.token}
                id={editing}
                author={session.admin.fullName}
                onBack={() => setEditing(null)}
              />
            ) : (
              <Posts token={session.token} onEdit={setEditing} />
            )
          ) : (
            <Subscribers token={session.token} />
          )}
        </div>
      </main>
    </div>
  )
}

function Login({
  onLogin,
  notice,
}: {
  onLogin: (s: Session) => void
  notice: string
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(notice)
  const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      onLogin(
        await api<Session>('/admin/auth/login', undefined, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password }),
        }),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <main className="min-h-screen bg-white p-3 sm:p-5">
      <div className="grid min-h-[calc(100svh-40px)] overflow-hidden rounded-[24px] bg-surface lg:grid-cols-2">
        <div className="flex flex-col justify-between bg-[#075095] p-8 text-white sm:p-12">
          <div className="text-3xl font-bold tracking-[0.15em]">
            ZYR<span className="text-orange">A</span>
          </div>
          <div className="py-16">
            <p className="flex items-center gap-3 text-sm">
              <span className="size-2 rounded-full bg-orange" /> ZYRA CORE
            </p>
            <h1 className="mt-6 max-w-lg text-5xl leading-[1.05] tracking-[-0.05em] sm:text-6xl">
              Your stories, all in one place.
            </h1>
            <p className="mt-6 text-white/75">
              Manage your blog and stay connected with your readers.
            </p>
          </div>
          <p className="text-sm text-white/60">ZYRA CORE · Admin</p>
        </div>
        <div className="flex items-center justify-center p-8 sm:p-12">
          <form onSubmit={submit} className="w-full max-w-sm">
            <p className="flex items-center gap-3 text-sm text-muted">
              <span className="size-2 rounded-full bg-orange" /> Welcome back
            </p>
            <h2 className="mt-5 text-4xl tracking-[-0.04em]">Sign in</h2>
            <p className="mt-3 text-sm text-muted">
              Enter your account details to continue.
            </p>
            <label className="mt-9 block text-sm">
              Email
              <input
                className={`${field} mt-2`}
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="mt-5 block text-sm">
              Password
              <input
                className={`${field} mt-2`}
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && (
              <p role="alert" className="mt-4 text-sm text-red-700">
                {error}
              </p>
            )}
            <button disabled={busy} className={`${button} mt-7 w-full`}>
              {busy ? 'Signing in…' : 'Sign in ↗'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

function Heading({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 sm:flex-row sm:items-end">
      <div>
        <p className="flex items-center gap-3 text-sm text-muted">
          <span className="size-2 rounded-full bg-orange" /> {label}
        </p>
        <h1 className="mt-4 text-4xl tracking-[-0.04em] sm:text-5xl">
          {title}
        </h1>
      </div>
      {children}
    </div>
  )
}
function Pages({
  pagination,
  onPage,
}: {
  pagination: Pagination
  onPage: (n: number) => void
}) {
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      <button
        className={secondary}
        disabled={!pagination.hasPrevPage}
        onClick={() => onPage(pagination.page - 1)}
      >
        ← Previous
      </button>
      <span className="text-muted">
        Page {pagination.page} of {Math.max(1, pagination.totalPages)}
      </span>
      <button
        className={secondary}
        disabled={!pagination.hasNextPage}
        onClick={() => onPage(pagination.page + 1)}
      >
        Next →
      </button>
    </div>
  )
}
function ErrorText({ text }: { text: string }) {
  return text ? (
    <p
      role="alert"
      className="my-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
    >
      {text}
    </p>
  ) : null
}
function Posts({
  token,
  onEdit,
}: {
  token: string
  onEdit: (id: string) => void
}) {
  const [data, setData] = useState<{
    posts: Post[]
    pagination: Pagination
  } | null>(null)
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(true)
  const [refresh, setRefresh] = useState(0)
  const [deleting, setDeleting] = useState<Post | null>(null)
  const [working, setWorking] = useState(false)
  useEffect(() => {
    let live = true
    setBusy(true)
    setError('')
    api<{ posts: Post[]; pagination: Pagination }>(
      `/admin/blog?page=${page}&limit=20${status ? `&status=${status}` : ''}`,
      token,
    )
      .then((x) => {
        if (live) setData(x)
      })
      .catch((e) => {
        if (live) setError(e.message)
      })
      .finally(() => {
        if (live) setBusy(false)
      })
    return () => {
      live = false
    }
  }, [token, page, status, refresh])
  async function remove() {
    if (!deleting) return
    setWorking(true)
    try {
      await api(`/admin/blog/${encodeURIComponent(deleting.postId)}`, token, {
        method: 'DELETE',
      })
      setDeleting(null)
      setRefresh((n) => n + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.')
    } finally {
      setWorking(false)
    }
  }
  return (
    <>
      <Heading label="Content" title="Blog posts">
        <button onClick={() => onEdit('new')} className={button}>
          Create post <span className="ml-4">↗</span>
        </button>
      </Heading>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {data?.pagination.totalPosts ?? 0} posts
        </p>
        <label className="text-sm text-muted">
          Status{' '}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="ml-2 rounded-full border border-line bg-white px-4 py-2 text-ink"
          >
            <option value="">All posts</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>
      <ErrorText text={error} />
      {busy ? (
        <p className="py-12 text-muted">Loading posts…</p>
      ) : !data?.posts.length ? (
        <p className="py-16 text-muted">No posts found.</p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th className="p-5 font-normal">Post</th>
                <th className="p-5 font-normal">Status</th>
                <th className="p-5 font-normal">Created</th>
                <th className="p-5 font-normal">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((p) => (
                <tr
                  key={p.postId}
                  className="border-b border-line last:border-0"
                >
                  <td className="p-5">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {p.authorName} · /{p.slug}
                    </p>
                  </td>
                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${p.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-surface text-muted'}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-5 text-muted">{fmt(p.createdAt)}</td>
                  <td className="p-5 text-right">
                    <button
                      className="mr-4 hover:text-orange"
                      onClick={() => onEdit(p.postId)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-700"
                      onClick={() => setDeleting(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && <Pages pagination={data.pagination} onPage={setPage} />}{' '}
      {deleting && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-5"
          role="presentation"
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-[24px] bg-white p-8"
          >
            <h2 id="delete-title" className="text-2xl">
              Delete this post?
            </h2>
            <p className="mt-4 text-muted">
              “{deleting.title}” and its cover image will be permanently
              deleted.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                className={secondary}
                onClick={() => setDeleting(null)}
                disabled={working}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-red-700 px-5 py-3 text-sm text-white disabled:opacity-50"
                onClick={remove}
                disabled={working}
              >
                {working ? 'Deleting…' : 'Delete post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PostEditor({
  token,
  id,
  author,
  onBack,
}: {
  token: string
  id: string
  author: string
  onBack: () => void
}) {
  const draftKey = `zyra-editor-${id}`
  const [form, setForm] = useState<Editor>(() => {
    try {
      return (
        JSON.parse(sessionStorage.getItem(draftKey) || 'null') || {
          ...empty,
          authorName: author,
        }
      )
    } catch {
      return { ...empty, authorName: author }
    }
  })
  const [loaded, setLoaded] = useState(id === 'new')
  const [cover, setCover] = useState<File | null>(null)
  const [existingCover, setExistingCover] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(false)
  useEffect(() => {
    if (id === 'new') return
    let live = true
    api<Post>(`/admin/blog/${encodeURIComponent(id)}`, token)
      .then((p) => {
        if (!live) return
        setExistingCover(p.coverImageUrl || '')
        if (!sessionStorage.getItem(draftKey))
          setForm({
            title: p.title,
            content: p.content,
            authorName: p.authorName,
            excerpt: p.excerpt || '',
            tags: p.tags.join(', '),
            slug: p.slug,
            metaTitle: p.metaTitle || '',
            metaDescription: p.metaDescription || '',
            status: p.status,
          })
        setLoaded(true)
      })
      .catch((e) => {
        if (live) setError(e.message)
      })
    return () => {
      live = false
    }
  }, [id, token, draftKey])
  function change(key: keyof Editor, value: string) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      sessionStorage.setItem(draftKey, JSON.stringify(next))
      return next
    })
  }
  async function submit(e: FormEvent) {
    e.preventDefault()
    if (
      cover &&
      (!['image/jpeg', 'image/png', 'image/webp'].includes(cover.type) ||
        cover.size > 5 * 1024 * 1024)
    ) {
      setError('Choose a JPEG, PNG or WebP image under 5 MB.')
      return
    }
    setBusy(true)
    setError('')
    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'slug' || id !== 'new') payload.append(key, value)
    })
    if (cover) payload.append('coverImage', cover)
    try {
      await api(
        `/admin/blog${id === 'new' ? '' : `/${encodeURIComponent(id)}`}`,
        token,
        { method: id === 'new' ? 'POST' : 'PATCH', body: payload },
      )
      sessionStorage.removeItem(draftKey)
      onBack()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save post.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <button
        onClick={onBack}
        className="mb-7 text-sm text-muted hover:text-orange"
      >
        ← Back to posts
      </button>
      <Heading
        label="Blog"
        title={id === 'new' ? 'Create a post' : 'Edit post'}
      />
      <ErrorText text={error} />
      {loaded && (
        <form
          onSubmit={submit}
          className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]"
        >
          <div className="space-y-6 rounded-2xl bg-white p-6 sm:p-8">
            <label className="block text-sm">
              Title
              <input
                required
                className={`${field} mt-2`}
                value={form.title}
                onChange={(e) => change('title', e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Excerpt{' '}
              <span className="text-muted">(optional, 300 characters)</span>
              <textarea
                className={`${field} mt-2`}
                rows={3}
                maxLength={300}
                value={form.excerpt}
                onChange={(e) => change('excerpt', e.target.value)}
              />
            </label>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="text-sm">
                  Content <span className="text-muted">· Markdown</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-orange"
                  onClick={() => setPreview((p) => !p)}
                >
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
              <textarea
                id="content"
                required
                className={`${field} mt-2 min-h-[360px] font-mono text-sm ${preview ? 'hidden' : ''}`}
                value={form.content}
                onChange={(e) => change('content', e.target.value)}
              />
              {preview && (
                <div className="mt-2 min-h-[360px] rounded-xl border border-line p-5 leading-relaxed [&_h1]:text-3xl [&_h2]:mt-6 [&_h2]:text-2xl [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-orange">
                  <Markdown>{form.content}</Markdown>
                </div>
              )}
            </div>
            <label className="block text-sm">
              Author
              <input
                required
                className={`${field} mt-2`}
                value={form.authorName}
                onChange={(e) => change('authorName', e.target.value)}
              />
            </label>
          </div>
          <div className="space-y-6">
            <div className="space-y-5 rounded-2xl bg-white p-6">
              <h2 className="text-lg font-medium">Publishing</h2>
              <label className="block text-sm">
                Status
                <select
                  value={form.status}
                  onChange={(e) => change('status', e.target.value)}
                  className={`${field} mt-2`}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
              <label className="block text-sm">
                Tags <span className="text-muted">(comma separated)</span>
                <input
                  className={`${field} mt-2`}
                  value={form.tags}
                  onChange={(e) => change('tags', e.target.value)}
                />
              </label>
              {id !== 'new' && (
                <label className="block text-sm">
                  Slug{' '}
                  <span className="text-muted">
                    (changing it breaks existing links)
                  </span>
                  <input
                    className={`${field} mt-2`}
                    value={form.slug}
                    onChange={(e) => change('slug', e.target.value)}
                  />
                </label>
              )}
              <label className="block text-sm">
                Cover image{' '}
                <span className="text-muted">
                  (JPEG, PNG or WebP; max 5 MB)
                </span>
                {existingCover && (
                  <img
                    src={existingCover}
                    alt="Current cover"
                    className="mt-3 aspect-video w-full rounded-xl object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-3 block w-full text-sm"
                  onChange={(e) => setCover(e.target.files?.[0] || null)}
                />
              </label>
            </div>
            <div className="space-y-5 rounded-2xl bg-white p-6">
              <h2 className="text-lg font-medium">Search details</h2>
              <label className="block text-sm">
                Meta title
                <input
                  className={`${field} mt-2`}
                  value={form.metaTitle}
                  onChange={(e) => change('metaTitle', e.target.value)}
                />
              </label>
              <label className="block text-sm">
                Meta description
                <textarea
                  className={`${field} mt-2`}
                  rows={3}
                  maxLength={300}
                  value={form.metaDescription}
                  onChange={(e) => change('metaDescription', e.target.value)}
                />
              </label>
            </div>
            <button disabled={busy} className={`${button} w-full`}>
              {busy ? 'Saving…' : 'Save post ↗'}
            </button>
          </div>
        </form>
      )}
    </>
  )
}

function Subscribers({ token }: { token: string }) {
  const [data, setData] = useState<{
    subscribers: Subscriber[]
    pagination: Pagination
  } | null>(null)
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [busy, setBusy] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    let live = true
    setBusy(true)
    setError('')
    api<{ subscribers: Subscriber[]; pagination: Pagination }>(
      `/admin/newsletter?page=${page}&limit=20${status ? `&status=${status}` : ''}`,
      token,
    )
      .then((d) => {
        if (live) setData(d)
      })
      .catch((e) => {
        if (live) setError(e.message)
      })
      .finally(() => {
        if (live) setBusy(false)
      })
    return () => {
      live = false
    }
  }, [token, page, status])
  async function exportCsv() {
    setExporting(true)
    setError('')
    try {
      const blob = await api<Blob>(
        `/admin/newsletter/export${status === 'subscribed' ? '' : '?status=all'}`,
        token,
        {},
        true,
      )
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'newsletter-subscribers.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Export failed.')
    } finally {
      setExporting(false)
    }
  }
  return (
    <>
      <Heading label="Audience" title="Newsletter">
        <button className={button} disabled={exporting} onClick={exportCsv}>
          {exporting ? 'Exporting…' : 'Export CSV ↓'}
        </button>
      </Heading>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl">Subscribers</h2>
          <p className="mt-1 text-sm text-muted">
            {data?.pagination.totalSubscribers ?? 0} contacts
          </p>
        </div>
        <label className="text-sm text-muted">
          Status{' '}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="ml-2 rounded-full border border-line bg-white px-4 py-2 text-ink"
          >
            <option value="">All contacts</option>
            <option value="subscribed">Subscribed</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </label>
      </div>
      <ErrorText text={error} />
      {busy ? (
        <p className="py-12 text-muted">Loading subscribers…</p>
      ) : !data?.subscribers.length ? (
        <p className="py-16 text-muted">No subscribers found.</p>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-2xl bg-white">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th className="p-5 font-normal">Email</th>
                <th className="p-5 font-normal">Status</th>
                <th className="p-5 font-normal">Subscribed</th>
                <th className="p-5 font-normal">Unsubscribed</th>
              </tr>
            </thead>
            <tbody>
              {data.subscribers.map((s) => (
                <tr
                  key={s.subscriberId}
                  className="border-b border-line last:border-0"
                >
                  <td className="p-5">{s.email}</td>
                  <td className="p-5">
                    <span className="rounded-full bg-surface px-3 py-1 text-xs">
                      {s.status}
                    </span>
                  </td>
                  <td className="p-5 text-muted">{fmt(s.subscribedAt)}</td>
                  <td className="p-5 text-muted">{fmt(s.unsubscribedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data && <Pages pagination={data.pagination} onPage={setPage} />}
    </>
  )
}
