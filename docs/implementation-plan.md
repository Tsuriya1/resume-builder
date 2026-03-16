# MVP Implementation Plan (Local-First)

## Goal

Deliver a fully functional local MVP that runs end-to-end on a developer machine and is architecturally clean enough to evolve into production later.

## Local-First Constraints

- PostgreSQL runs locally via Docker.
- Authentication supports `AUTH_MODE=local` and `AUTH_MODE=google`.
- In local mode, login works with a seeded demo user.
- Exports are synchronous and saved to local filesystem.
- No cloud object storage, no production infrastructure work in MVP.

## Recommended Project Structure

```
resume-builder/
  frontend/
  backend/
    migrations/
    scripts/
  docs/
```

## Delivery Strategy

1. Make auth/data foundations fully runnable locally.
2. Deliver core resume flows end-to-end with one strong template path.
3. Expand breadth (templates, admin insights, AI depth) after end-to-end stability.

## Phase Plan

## Phase 1 - Foundations (Completed)

- monorepo setup
- frontend/backend scaffolds
- env support
- lint/format/typecheck
- local Docker Postgres baseline

## Phase 2 - Authentication + Migration Baseline (Current)

- `AUTH_MODE=local|google`
- demo login for local mode
- Google login compatibility route
- JWT route protection + identity middleware
- SQL migration runner
- `users` migration + seed demo user

Exit criteria:

- user can login locally and call protected `/auth/me`
- DB schema is managed by migrations (not runtime table creation)

## Phase 3 - Master Profile Vertical Slice

- profile migrations + APIs
- frontend profile editor
- autosave/validation basics

## Phase 4 - Resume Versions + Editor Shell

- create/duplicate/archive resume versions
- snapshot model
- structure/editor/preview shell

## Phase 5 - Template + Preview Consistency

- template render contract
- initial templates (LTR + RTL first)
- live preview fidelity checks

## Phase 6 - Local Exports

- synchronous PDF and DOCX generation
- local file storage under `LOCAL_STORAGE_ROOT`
- export status/download flow

## Phase 7 - AI Assistance

- rewrite/summary/translate/tailor endpoints
- suggestion review-and-apply UX only
- AI action logging

## Phase 8 - Admin MVP

- users/templates/usage/audit screens + APIs
- role-protected endpoints

## Tradeoffs

- Local auth mode speeds development and testing but is not production-auth security.
- Synchronous exports keep implementation simple; may need async queue later.
- Local file storage avoids cloud complexity but requires migration path to object storage later.
- Real migrations are added early to avoid schema drift and painful refactors later.

