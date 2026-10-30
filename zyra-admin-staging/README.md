# ZYRA website admin

Run `npm install`, copy `.env.example` to `.env`, and run `npm run dev`. Set `VITE_API_BASE_URL` to the API origin (without `/api`). The backend must allow the admin app's origin in CORS.

Blog content uses Markdown. Newsletter sending is not included in the provided backend handoff; subscriber listing and CSV export are supported. Sessions are kept in browser session storage and cleared on logout or an authenticated 401.
