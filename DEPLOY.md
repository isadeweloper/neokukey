# Deployment — NEOKUKEY monorepo

Three deployables live in this repo:

| Part | Path | Host | Notes |
|------|------|------|-------|
| Marketing site | repo root | **Vercel** (already live) | `neokukey-59o8.vercel.app` |
| CMS backend | `backend/` | **Render** | Spring Boot + PostgreSQL |
| CMS frontend | `frontend/premium-website/` | **Vercel** (separate project) | Next.js, needs `BACKEND_URL` |

> The root site and the two new apps are independent deployments from the same repo.

---

## 1. Backend → Render (Blueprint)

The repo root has `render.yaml` (a Render Blueprint) that provisions the Docker
web service **and** a managed PostgreSQL, wiring the DB into the app via env vars.

1. Go to **https://dashboard.render.com → New → Blueprint**.
2. Connect the GitHub repo **`isadeweloper/neokukey`**. Render detects `render.yaml`.
3. Click **Apply** — it creates:
   - `neokukey-cms-db` (PostgreSQL, free)
   - `neokukey-backend` (Docker web service, free) built from `backend/Dockerfile`
4. Wait for the first build/deploy. The service URL will be like
   `https://neokukey-backend.onrender.com`.
5. Health check: open `https://neokukey-backend.onrender.com/api/cms/services` → `[]`.

**Notes**
- The app reads DB creds from `DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD` and the
  port from `PORT` (see `backend/src/main/resources/application.yml`). Locally these
  fall back to `localhost:5432/cms` so dev still works unchanged.
- Free plan = **no persistent disk**, so uploaded media is lost on redeploy. For
  persistence, upgrade the service and add a Render Disk mounted at `/data/uploads`,
  then set `APP_UPLOAD_DIR=/data/uploads`.
- Free Postgres on Render expires after ~30 days; upgrade for a permanent DB.
- If Render can't find the Dockerfile, set the service's **Dockerfile Path** to
  `backend/Dockerfile` and **Docker Context** to `backend`.

---

## 2. Frontend → Vercel (separate project)

1. **https://vercel.com → Add New → Project** → import **`isadeweloper/neokukey`**.
2. Set **Root Directory** = `frontend/premium-website` (the key step — it's a subfolder).
3. Framework preset: **Next.js** (auto). Node version: **22**.
4. Add an Environment Variable:
   - `BACKEND_URL` = the Render backend URL, e.g. `https://neokukey-backend.onrender.com`
5. **Deploy.** The frontend's server routes call `${BACKEND_URL}/api/cms/...`
   (server-to-server, so no CORS needed).

---

## 3. After both are up
- Pages with data (`/services`, `/doctors`, …) will be empty until content is added.
- Admin login (`/api/cms/login`) needs a user seeded in the `userss` table
  (BCrypt password) — the table starts empty.
- The marketing site at the repo root is untouched and keeps deploying on Vercel as-is.
