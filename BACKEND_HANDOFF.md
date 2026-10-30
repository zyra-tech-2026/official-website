# ZYRA CORE Website API — Frontend Handover

Covers the **public website** (blog + newsletter) and the **admin dashboard** (auth, blog management, subscriber management).

- **Interactive docs (Swagger UI):** `{API_BASE_ORIGIN}/api-docs` — good for trying calls, but this document is the source of truth for response shapes (the Swagger blocks don't describe response bodies).
- **Base URL:** `{API_BASE_ORIGIN}/api` — local dev: `http://localhost:5100/api`
- **Health check:** `GET {API_BASE_ORIGIN}/health` → `{ "status": "ok", "timestamp": "..." }` (note: not under `/api`)

---

## 1. Conventions

### Response envelope

Every JSON response has `success` and `message`. Successful responses with a payload add `data`.

```jsonc
// success
{ "success": true, "message": "Blog posts fetched successfully", "data": { ... } }

// error (always this shape)
{ "success": false, "message": "title is required" }
```

Branch on the **HTTP status**, show `message` to the user only where noted. `message` strings are English, human-readable, not stable error codes.

### Status codes you'll see

| Code | Meaning |
|---|---|
| 200 / 201 | Success |
| 400 | Validation failed (missing field, bad email, bad file type/size) |
| 401 | Missing / invalid / expired admin token, or wrong login credentials |
| 403 | Admin account deactivated (login only) |
| 404 | Not found |
| 429 | Rate limited (`Too many requests. Please try again later.`) |
| 500 | Server error. Also returned for a **malformed `postId`** (see §5 gotchas) |

### Formats
- All timestamps are **ISO 8601 UTC strings** (`2026-10-19T09:30:00.000Z`).
- Optional fields are **omitted entirely** when empty (not `null`). Always treat `excerpt`, `coverImageUrl`, `metaTitle`, `metaDescription`, `publishedAt` as possibly `undefined`.

### Pagination

All list endpoints take `?page=` (default 1) and `?limit=` (default 20). Invalid values fall back to defaults silently. Max `limit`: **50** public blog, **100** admin endpoints (larger values are clamped, not rejected).

```jsonc
"pagination": {
  "page": 1,
  "limit": 20,
  "totalPosts": 42,        // "totalSubscribers" on the subscribers list
  "totalPages": 3,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

### CORS
Browser calls only work from origins in the server's `CORS_ALLOWED_ORIGINS` allowlist (if unset, everything is allowed). **Give the backend owner the exact origin of every frontend (website, admin dashboard, local dev ports) so they're added.** Allowed methods: GET, POST, PUT, PATCH, DELETE, OPTIONS.

---

## 2. Data models

### BlogPost (as returned by the API)

```ts
interface BlogPost {
  postId: string;                 // Mongo ObjectId — used in ADMIN routes
  title: string;
  slug: string;                   // lowercase, URL-safe, unique — used in PUBLIC routes
  excerpt?: string;               // max 300 chars
  content: string;                // stored & returned as-is (see §5 on rendering)
  coverImageUrl?: string;         // Cloudinary HTTPS URL, max 1600×900
  tags: string[];                 // [] when none
  status: "draft" | "published";
  authorName: string;
  metaTitle?: string;             // SEO <title> override
  metaDescription?: string;       // SEO meta description, max 300 chars
  publishedAt?: string;           // set the FIRST time it's published; never changes after
  createdAt: string;
  updatedAt: string;
}
```

### Newsletter subscriber (admin list only)

```ts
interface Subscriber {
  subscriberId: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  subscribedAt: string;
  unsubscribedAt?: string;
}
```

---

# PART A — Public website (no auth)

## A1. List published posts

`GET /blog`

| Query | Type | Notes |
|---|---|---|
| `page` | int | default 1 |
| `limit` | int | default 20, max 50 |
| `tag` | string | exact-match filter on one tag |

Sorted by `publishedAt` descending (newest first). Drafts are never returned.

**200**
```json
{
  "success": true,
  "message": "Blog posts fetched successfully",
  "data": {
    "posts": [ { /* BlogPost */ } ],
    "pagination": { "page": 1, "limit": 20, "totalPosts": 1, "totalPages": 1, "hasNextPage": false, "hasPrevPage": false }
  }
}
```

> The list items include the full `content`. For a listing grid, render `title`, `excerpt`, `coverImageUrl`, `tags`, `publishedAt`, `authorName` and link to `/blog/{slug}`.

## A2. Get one published post

`GET /blog/{slug}`

**200** → `data` is a single `BlogPost`.
**404** → `{ "success": false, "message": "Blog post not found" }` — also returned for draft posts and unknown slugs. Show your site's 404 page.

Use `metaTitle ?? title` and `metaDescription ?? excerpt` for page `<head>` tags.

## A3. Subscribe to newsletter

`POST /newsletter/subscribe` — `Content-Type: application/json`

```json
{ "email": "jane@example.com" }
```

| Status | Body `message` | UI handling |
|---|---|---|
| 201 | `Subscribed successfully` | Success state (new subscriber, or a previously-unsubscribed one re-subscribing) |
| 200 | `You're already subscribed` | Also treat as success — don't show an error |
| 400 | `Please provide a valid email address` | Inline field error |
| 429 | `Too many requests...` | Generic "try again later" |

- Email is trimmed and lowercased server-side. Validation is a basic `x@y.z` shape check; do your own friendlier client-side validation first.
- A welcome email is sent **after** the response, asynchronously. Don't promise delivery in the UI beyond "check your inbox".
- Rate limit: **20 requests / hour / IP**.

## A4. Unsubscribe (one-click link)

`GET /newsletter/unsubscribe/{token}`

The token is embedded in a link in every newsletter email. Responses:

| Status | `message` |
|---|---|
| 200 | `You've been unsubscribed` or `You're already unsubscribed` |
| 404 | `Unsubscribe link is invalid or has already been used` |

> ⚠️ **Important:** the link in the email currently points directly at the **API** (`{API_PUBLIC_URL}/api/newsletter/unsubscribe/{token}`), so a user clicking it will see raw JSON in their browser. Options: (a) accept that, or (b) build a frontend page (e.g. `/unsubscribe/:token`) that calls this endpoint and shows a friendly result — which requires the backend owner to change the URL built in `sendWelcomeEmail` in `newsletterController.ts`. Decide with the backend owner.

---

# PART B — Admin dashboard

## B1. Authentication

### Login

`POST /admin/auth/login` — `Content-Type: application/json`

```json
{ "email": "admin@zyra.tech", "password": "••••••••" }
```

**200**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": { "id": "665f...", "fullName": "Jane Admin", "email": "admin@zyra.tech" },
    "token": "eyJhbGciOi..."
  }
}
```

| Status | Meaning |
|---|---|
| 400 | email or password missing |
| 401 | `Invalid credentials` (same message for unknown email and wrong password) |
| 403 | `Admin account is deactivated` |
| 429 | Too many attempts — **10 per 15 min per (IP + email)** |

### Using the token

Send on **every** `/admin/*` request except login:

```
Authorization: Bearer <token>
```

- Token lifetime is **8 hours** (server default, `ADMIN_JWT_EXPIRES_IN`). **There is no refresh endpoint** — when it expires, the user must log in again.
- Any admin endpoint returns **`401 { "message": "Unauthorized" }`** for missing/invalid/expired tokens. Add a global response interceptor: on 401 → clear stored token → redirect to login.
- There is no logout endpoint; logout = discard the token client-side.
- There is no "get current admin" endpoint; persist the `admin` object from the login response if you need the name/email in the UI.
- Admin accounts are created by a server-side seed script — there is no signup/forgot-password flow.

---

## B2. Blog management

### Create a post

`POST /admin/blog` — **`multipart/form-data`** (not JSON — needed for the image)

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | |
| `content` | ✅ | |
| `authorName` | ✅ | |
| `excerpt` | | max 300 chars (over-limit → 500 error; enforce client-side) |
| `tags` | | **one comma-separated string**, e.g. `"design,engineering"` — not an array / repeated field |
| `status` | | `"draft"` or `"published"`. Anything else/omitted → `draft` |
| `metaTitle` | | |
| `metaDescription` | | max 300 chars |
| `coverImage` | | file field named exactly `coverImage`. JPEG / PNG / WebP, **max 5 MB** |

- The **slug is auto-generated from the title** (and made unique). It's returned in the response.
- If `status=published` on create, `publishedAt` is set to now.

```ts
const form = new FormData();
form.append("title", title);
form.append("content", content);
form.append("authorName", authorName);
form.append("tags", tags.join(","));
form.append("status", "draft");
if (file) form.append("coverImage", file);

await fetch(`${API}/admin/blog`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` }, // do NOT set Content-Type; the browser adds the boundary
  body: form,
});
```

**201** → `{ success, message: "Blog post created", data: BlogPost }`
**400** → `title is required` / `content is required` / `authorName is required` / `File is too large. Maximum size is 5MB.` / `Only JPEG, PNG, and WebP images are allowed`

### List all posts (drafts + published)

`GET /admin/blog?page=&limit=&status=`

`status` is `draft` or `published`; omit for all. Sorted by **createdAt descending**. Response shape identical to A1 (`data.posts`, `data.pagination`).

### Get one post

`GET /admin/blog/{postId}` → **200** `data: BlogPost` (includes drafts) · **404** `Blog post not found`

Use this to pre-fill the edit form.

### Edit a post

`PATCH /admin/blog/{postId}` — `multipart/form-data`. **Send only the fields you want to change.**

| Field | Behaviour |
|---|---|
| `title`, `content`, `authorName` | Updated if non-empty. Empty string = ignored (cannot be blanked) |
| `slug` | Updated if non-empty; normalized and de-duplicated server-side. ⚠️ Changing it breaks existing public URLs |
| `excerpt`, `metaTitle`, `metaDescription` | Sending a value updates it; sending **empty string clears it**; omitting leaves it unchanged |
| `tags` | Comma-separated string; **replaces the entire list**. Empty string = clear all tags; omit = unchanged |
| `status` | `draft` / `published`. Other values ignored. `publishedAt` is set only the first time it becomes published; unpublishing and republishing keeps the original date |
| `coverImage` | Sending a file **replaces** the existing one. |

**200** → `{ success, message: "Blog post updated", data: BlogPost }` · **404** if not found · **400** for upload errors.

> There is no way to *remove* a cover image without replacing it, and no separate publish/unpublish endpoint — publishing is `PATCH` with `status=published`.

### Delete a post

`DELETE /admin/blog/{postId}` → **200** `{ success: true, message: "Blog post deleted" }` (no `data`) · **404**.
Permanent; also deletes the Cloudinary image. Put a confirmation dialog in front of it.

---

## B3. Newsletter subscribers

### List

`GET /admin/newsletter?page=&limit=&status=`

`status`: `subscribed` | `unsubscribed` (omit for all). Sorted newest first. Max limit 100.

**200**
```json
{
  "success": true,
  "message": "Newsletter subscribers fetched successfully",
  "data": {
    "subscribers": [
      { "subscriberId": "665f...", "email": "jane@example.com", "status": "subscribed", "subscribedAt": "2026-10-01T10:00:00.000Z" }
    ],
    "pagination": { "page": 1, "limit": 20, "totalSubscribers": 1, "totalPages": 1, "hasNextPage": false, "hasPrevPage": false }
  }
}
```

### Export CSV

`GET /admin/newsletter/export?status=`

- `status=all` → everyone; **anything else or omitted → subscribed only**.
- Response is **`text/csv`** (not JSON), `Content-Disposition: attachment; filename="newsletter-subscribers.csv"`.
- Columns: `email,status,subscribedAt,unsubscribedAt`
- Not paginated — returns the entire list.

Because the endpoint needs the `Authorization` header, a plain `<a href>` **won't work**. Fetch it and trigger the download from a blob:

```ts
const res = await fetch(`${API}/admin/newsletter/export?status=all`, {
  headers: { Authorization: `Bearer ${token}` },
});
if (!res.ok) throw new Error((await res.json()).message);
const url = URL.createObjectURL(await res.blob());
const a = Object.assign(document.createElement("a"), { href: url, download: "newsletter-subscribers.csv" });
a.click();
URL.revokeObjectURL(url);
```

---

## 5. Gotchas & things to decide

1. **`content` format is not enforced by the API** — it's a raw string stored and returned unchanged. Agree internally whether it's Markdown or HTML (rich-text editor). If HTML, **sanitize before rendering** (e.g. DOMPurify) — never inject it raw.
2. **Invalid `postId` returns 500, not 404.** A string that isn't a valid 24-char hex ObjectId makes the server throw a cast error. Only use IDs that came from the API; treat 500 on these routes as "not found / failed".
3. **Public routes use `slug`, admin routes use `postId`.** Don't mix them.
4. **Field-length errors surface as 500** (excerpt / metaDescription > 300 chars) with a Mongoose validation message. Enforce `maxLength=300` in the form.
5. **Use `multipart/form-data` for blog create/edit**, never JSON, and don't set the `Content-Type` header manually.
6. **No refresh token / session extension** — plan for a forced re-login every 8 hours (ideally preserving unsaved editor content in local state).
7. **Rate limits** return 429 with the standard envelope; the response also carries standard `RateLimit-*` headers if you want to show a countdown.
8. **Swagger UI** is public at `/api-docs` — fine for dev, flag to the backend owner if it should be restricted in production.

## 6. Screen → endpoint map

| Screen | Endpoint(s) |
|---|---|
| Public blog index | `GET /blog` (+ `?tag=`) |
| Public blog post | `GET /blog/{slug}` |
| Footer / signup newsletter form | `POST /newsletter/subscribe` |
| Admin login | `POST /admin/auth/login` |
| Admin posts table (filter draft/published) | `GET /admin/blog` |
| Admin new post | `POST /admin/blog` |
| Admin edit post | `GET /admin/blog/{postId}` → `PATCH /admin/blog/{postId}` |
| Publish / unpublish toggle | `PATCH /admin/blog/{postId}` with `status` |
| Delete post | `DELETE /admin/blog/{postId}` |
| Subscribers table | `GET /admin/newsletter` |
| Export subscribers | `GET /admin/newsletter/export` |
