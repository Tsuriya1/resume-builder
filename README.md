# Resume Builder

Monorepo scaffold for the Resume Builder MVP.

This setup includes:

- `frontend/`: Next.js + TypeScript app shell
- `backend/`: NestJS + TypeScript API/auth shell
- PostgreSQL dev service via Docker Compose
- shared environment variable template (`.env.example`)
- linting + formatting scripts

## Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (or Docker Engine + Compose)

## Repository Structure

```text
resume-builder/
  docs/
  frontend/
  backend/
  docker-compose.yml
  .env.example
  package.json
```

## Setup

1. Create local env file:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

2. Install workspace dependencies from repository root:

```bash
npm install
```

3. Start PostgreSQL:

```bash
docker compose up -d postgres
```

4. Run database migrations:

```bash
npm run db:migrate --workspace backend
```

5. Run apps in separate terminals:

Terminal 1 (frontend):

```bash
npm run dev:frontend
```

Terminal 2 (backend):

```bash
npm run dev:backend
```

## Local URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000/api`
- Backend health check: `http://localhost:4000/api/health`

## Environment Variables

All variables are documented in `.env.example`.

Current local-first setup uses:

- Frontend: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`
- Backend: `PORT`, `NODE_ENV`, `AUTH_MODE`, `DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `GOOGLE_CLIENT_ID`, `JWT_SECRET`, `LOCAL_DEMO_EMAIL`, `LOCAL_STORAGE_ROOT`

## Tooling Commands (Root)

```bash
npm run lint
npm run typecheck
npm run format
npm run format:check
```

## Auth Scaffold (Phase 2)

Backend now includes an authentication foundation:

- `GET /api/auth/mode`
- `POST /api/auth/local-login` (for `AUTH_MODE=local`)
- `POST /api/auth/google`
- `GET /api/auth/me` (requires `Authorization: Bearer <accessToken>`)
- `POST /api/auth/logout` (requires `Authorization: Bearer <accessToken>`)

Notes:

- Local mode (`AUTH_MODE=local`) logs in as seeded demo user (default `demo@example.com`).
- `POST /api/auth/google` expects body `{ "idToken": "<google_id_token>" }`.
- User records are persisted in PostgreSQL table `users`.
- `GET /api/auth/me` and `POST /api/auth/logout` are protected by JWT middleware/guard.
- Migrations must be run before login endpoints.
- Frontend home page includes a local auth bootstrap panel using `local-login -> me -> logout`.

## Required Backend Env For Auth

In addition to DB values, backend requires:

- `AUTH_MODE` (`local` or `google`)
- `GOOGLE_CLIENT_ID`
- `JWT_SECRET`
- `LOCAL_DEMO_EMAIL`
- `LOCAL_STORAGE_ROOT`

You can keep placeholder values during scaffolding, but real Google sign-in only works with a valid `GOOGLE_CLIENT_ID` and real ID token.

## Notes

- This repository now follows local-first MVP mode (`docs/local-mvp-mode.md`).
- Master profile, resumes, templates, export generation, AI features, and admin modules are still pending later phases.
