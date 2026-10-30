export type Admin = { id: string; fullName: string; email: string }
export type Session = { token: string; admin: Admin }
export type Post = {
  postId: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImageUrl?: string
  tags: string[]
  status: 'draft' | 'published'
  authorName: string
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  publishedAt?: string
}
export type Subscriber = {
  subscriberId: string
  email: string
  status: 'subscribed' | 'unsubscribed'
  subscribedAt: string
  unsubscribedAt?: string
}
export type Pagination = {
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPosts?: number
  totalSubscribers?: number
}
const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')
export const sessionKey = 'zyra-admin-session'
export async function api<T>(
  path: string,
  token?: string,
  options: RequestInit = {},
  raw = false,
): Promise<T> {
  if (!base) throw new Error('API base URL is not configured.')
  const headers = new Headers(options.headers)
  headers.set('ngrok-skip-browser-warning', 'true')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const response = await fetch(`${base}/api${path}`, { ...options, headers })
  if (response.status === 401 && token) {
    sessionStorage.removeItem(sessionKey)
    window.dispatchEvent(new Event('session-expired'))
    throw new Error('Your session has expired. Please sign in again.')
  }
  if (raw && response.ok) return (await response.blob()) as T
  const body = await response.json().catch(() => null)
  if (!response.ok || !body?.success)
    throw new Error(body?.message || 'Something went wrong. Please try again.')
  return body.data as T
}
