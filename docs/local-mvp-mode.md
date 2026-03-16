# Local MVP Mode

## Purpose

Define how the project should run during local MVP development.

This mode optimizes for developer-machine end-to-end functionality, not production deployment.

## Operating Principles

1. Keep frontend and backend separated.
2. Keep architecture modular enough for production upgrades.
3. Use the simplest implementation that preserves future compatibility.

## Local Runtime Model

## Database

- PostgreSQL runs locally via Docker Compose.
- Database schema is managed via SQL migrations.
- No runtime table creation inside business services.

## Authentication

- `AUTH_MODE=local`:
  - login as seeded demo user
  - full protected-route behavior still enforced
- `AUTH_MODE=google`:
  - Google token login path enabled
- User identity shape remains the same in both modes.

## Storage and Exports

- file storage is local filesystem only (`LOCAL_STORAGE_ROOT`)
- synchronous export flow is acceptable for MVP
- no cloud object storage integration in local MVP

## What Is Intentionally Deferred

- production deployment setup
- cloud storage integration
- billing and subscriptions
- advanced infra (queues, autoscaling, multi-region)

## Current Technical Decisions

1. NestJS backend with JWT-protected routes.
2. Next.js frontend with environment-driven API base URL.
3. SQL migrations in backend repo to control schema evolution.
4. Demo user seeding to make local auth immediately usable.

## Tradeoffs

1. Local auth mode is fast for development but not a production security model.
2. Synchronous exports simplify MVP, but performance limits may appear with heavy usage.
3. Local filesystem storage avoids cloud complexity now, but will require a storage abstraction layer for production.
4. Keeping Google-compatible auth routes now reduces future migration cost.

## Exit Criteria for Local MVP Mode

1. Fresh clone can run with:
   - local Postgres
   - migrations
   - local login
2. Core product flow is runnable end-to-end on one machine:
   - login
   - edit profile
   - create/edit resume
   - preview
   - export

