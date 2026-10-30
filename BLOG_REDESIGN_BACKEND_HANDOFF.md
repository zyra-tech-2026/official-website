# Blog redesign — backend changes needed

Short, self-contained list of API changes the new blog designs need. This is **in addition to** `BACKEND_HANDOFF.md` (existing API); it does not repeat anything from it.

The frontend is already built against these fields and **falls back gracefully when they're missing**, so nothing breaks while you work. Once a field ships, the UI picks it up automatically, with no frontend change.

| Needed by design | Field | Frontend fallback until it ships |
|---|---|---|
| Category label ("Founders", "Engineering"…) | `category` | first item of `tags` |
| "6 min read" | `readTimeMinutes` | computed from `content` word count |
| Author role under the name ("COO, ZYRA") | `authorRole` | hidden |
| Author photo | `authorAvatarUrl` | initial-letter circle |
| Big featured card at the top of `/blog` | `featured` | newest post |

---

## 1. New `BlogPost` fields

Same conventions as the existing API: optional fields are **omitted** when empty (not `null`).

```ts
interface BlogPost {
  // ...existing fields unchanged...
  category?: string;          // NEW. exactly ONE per post. See §2
  readTimeMinutes?: number;   // NEW. integer >= 1, computed server-side. See §3
  authorRole?: string;        // NEW. e.g. "COO, ZYRA". max 80 chars
  authorAvatarUrl?: string;   // NEW. Cloudinary HTTPS URL, square crop
  featured?: boolean;         // NEW. default false. See §5
}
```

## 2. `category`

- **One value per post**, separate from `tags` (tags stay many-per-post and free-form).
- Fixed list, validated server-side. Values seen in the designs: `Founders`, `Engineering`, `Product`, `Design`. Please confirm the full list. Case-sensitive, returned exactly as displayed.
- Add an optional query to the public list: `GET /blog?category=Engineering` (exact match, combinable with `page`/`limit`).
- Nice to have: `GET /blog/categories` → `{ data: { categories: ["Design", "Engineering", ...] } }` so the frontend can render filters without hard-coding.
- Invalid value on create/edit → **400** with a clear message (not 500).

## 3. `readTimeMinutes`

Compute on create/edit from `content`: `Math.max(1, Math.round(wordCount / 220))`. Strip Markdown/HTML syntax before counting. Store it so list responses don't need to recompute.

## 4. Author fields

- `authorRole`: plain text field alongside `authorName`.
- `authorAvatarUrl`: upload like `coverImage`, as multipart field `authorAvatar` (JPEG/PNG/WebP, max 2 MB), cropped square (e.g. 200×200) via Cloudinary.
- If authors are reused across posts, an `Author` collection would be tidier than repeating these on every post, but flat fields on the post are fine for now. Whichever you pick, the **response shape above stays the same**.

## 5. `featured`

- Boolean; the post shown in the large hero card on `/blog`.
- Suggest enforcing **only one featured post at a time** (setting one clears the previous). If you'd rather not add the field, say so and the frontend will keep using "newest published post".

## 6. Admin create/edit (`POST` / `PATCH /admin/blog`)

Still `multipart/form-data`. New fields, same "send only what changes" rules as today:

| Field | Notes |
|---|---|
| `category` | one of the allowed values. Empty string on PATCH clears it |
| `authorRole` | text. Empty string clears it |
| `authorAvatar` | file (see §4) |
| `featured` | `"true"` / `"false"` |

`readTimeMinutes` is **not** sent by the client; it's derived.

## 7. List response size (please fix)

`GET /blog` currently returns the full `content` of every post. The new list page shows only title, excerpt, cover, date, category and read time. **Please omit `content` from list items** (keep it on `GET /blog/{slug}`). The frontend doesn't read `content` from the list once `readTimeMinutes` exists.

## 8. Related posts on the article page

The article page shows "Latest from the blog" (3 cards, excluding the current post). Today the frontend fetches the list and filters client-side, which works. Optional improvement: `GET /blog?limit=3&excludeSlug={slug}`.

## 9. Example response (target)

```json
{
  "postId": "665f...",
  "title": "Before you hire a product team: 5 things to figure out first",
  "slug": "before-you-hire-a-product-team-5-things-to-figure-out-first",
  "excerpt": "You don't need a spec document to start. But five clear answers will save you weeks, money and a lot of back-and-forth.",
  "content": "...",
  "coverImageUrl": "https://res.cloudinary.com/.../cover.jpg",
  "tags": ["hiring", "strategy"],
  "category": "Founders",
  "readTimeMinutes": 6,
  "authorName": "Nobei Joan",
  "authorRole": "COO, ZYRA",
  "authorAvatarUrl": "https://res.cloudinary.com/.../avatar.jpg",
  "featured": true,
  "status": "published",
  "publishedAt": "2026-08-12T09:00:00.000Z",
  "createdAt": "2026-08-10T12:00:00.000Z",
  "updatedAt": "2026-08-12T09:00:00.000Z"
}
```

## 10. Backfill

Existing posts have none of the new fields. It should be updated by the admin so labels don't depend on the `tags[0]` fallback.
