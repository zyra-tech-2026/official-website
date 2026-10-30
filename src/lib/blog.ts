const baseUrl = 'https://website-backend-fj3x.onrender.com'

export interface BlogPost {
  postId: string
  title: string
  slug: string
  excerpt?: string
  content?: string // detail endpoint only; list items omit it
  coverImageUrl?: string
  tags: string[]
  category?: string
  readTimeMinutes?: number
  authorName: string
  authorRole?: string
  authorAvatarUrl?: string
  featured?: boolean
  publishedAt?: string
  createdAt: string
  metaTitle?: string
  metaDescription?: string
}

export interface BlogList {
  posts: BlogPost[]
  pagination: {
    page: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

async function request<T>(
  path: string,
  init?: RequestInit,
  notFoundMessage = 'Article not found.',
): Promise<{ data: T; message: string }> {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api${path}`, {
    ...init,
    headers: { 'ngrok-skip-browser-warning': 'true', ...init?.headers },
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success)
    throw new Error(
      response.status === 429
        ? 'Too many requests. Please try again later.'
        : response.status === 404
          ? notFoundMessage
          : 'Something went wrong. Please try again.',
    )
  return result as { data: T; message: string }
}

export const getPosts = ({
  page = 1,
  limit = 9,
  category,
  excludeSlug,
}: {
  page?: number
  limit?: number
  category?: string
  excludeSlug?: string
} = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })
  if (category) params.set('category', category)
  if (excludeSlug) params.set('excludeSlug', excludeSlug)
  return request<BlogList>(`/blog?${params}`).then((result) => result.data)
}

export const getCategories = () =>
  request<{ categories: string[] }>('/blog/categories').then(
    (result) => result.data.categories,
  )

// Older posts may lack the new fields until an admin edits them. List items have
// no `content`, so read time is simply hidden there when missing.
export const postCategory = (post: BlogPost) => post.category ?? post.tags?.[0]

export function postReadTime(post: BlogPost) {
  if (post.readTimeMinutes) return post.readTimeMinutes
  const words = post.content?.trim().split(/\s+/).filter(Boolean).length ?? 0
  return words ? Math.max(1, Math.round(words / 220)) : undefined
}

export function formatPostDate(value?: string, ordinal = false) {
  if (!value || Number.isNaN(Date.parse(value))) return ''
  const date = new Date(value)
  if (!ordinal)
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  const day = date.getDate()
  const suffix =
    day % 100 >= 11 && day % 100 <= 13
      ? 'th'
      : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ??
        'th'
  const rest = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)
  return `${day}${suffix}, ${rest}`
}
export const getPost = (slug: string) =>
  request<BlogPost>(`/blog/${encodeURIComponent(slug)}`).then(
    (result) => result.data,
  )
export const subscribe = (email: string) =>
  request<void>('/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim() }),
  })

export const unsubscribe = (token: string) =>
  request<void>(
    `/newsletter/unsubscribe/${encodeURIComponent(token)}`,
    undefined,
    'This unsubscribe link is invalid or has already been used.',
  )
