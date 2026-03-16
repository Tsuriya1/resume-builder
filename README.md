# Resume Builder

Monorepo scaffold for the Resume Builder MVP.

This setup includes:

- `frontend/`: Next.js + TypeScript app shell
- `backend/`: NestJS + TypeScript API shell
- PostgreSQL dev service via Docker Compose
- shared environment variable template (`.env.example`)
- linting + formatting scripts

No business/domain features are implemented yet.

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

4. Run apps in separate terminals:

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

Current scaffold uses:

- Frontend: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`
- Backend: `PORT`, `NODE_ENV`, `DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## Tooling Commands (Root)

```bash
npm run lint
npm run typecheck
npm run format
npm run format:check
```

## Auth Scaffold (Phase 2)

Backend now includes an authentication foundation:

- `POST /api/auth/google`
- `GET /api/auth/me` (requires `Authorization: Bearer <accessToken>`)
- `POST /api/auth/logout` (requires `Authorization: Bearer <accessToken>`)

Notes:

- `POST /api/auth/google` expects body `{ "idToken": "<google_id_token>" }`.
- User records are upserted into PostgreSQL table `users`.
- `GET /api/auth/me` and `POST /api/auth/logout` are protected by JWT middleware/guard.

## Required Backend Env For Auth

In addition to DB values, backend requires:

- `GOOGLE_CLIENT_ID`
- `JWT_SECRET`

You can keep placeholder values during scaffolding, but real Google sign-in only works with a valid `GOOGLE_CLIENT_ID` and real ID token.

## Notes

- Business profile/resume/template/export/AI features are still intentionally not implemented.
