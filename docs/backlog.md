# Implementation Backlog (Local-First MVP)

## Priority Rules

1. Everything must run locally on a developer machine.
2. End-to-end core user flows before production hardening.
3. Prefer simple local implementations that preserve clean upgrade paths.

## Phase 1 - Project Setup (Completed)

- create monorepo structure
- setup frontend (Next.js + TypeScript)
- setup backend (NestJS + TypeScript)
- configure PostgreSQL
- configure environment variables
- add ESLint and Prettier
- add Docker support

## Phase 2 - Authentication (In Progress)

- support `AUTH_MODE=local` and `AUTH_MODE=google`
- implement local demo login flow
- keep Google login route for compatibility
- create `users` table using real SQL migrations
- seed demo user for local mode
- implement auth middleware + route protection
- frontend auth bootstrap (store/use token, me/logout flow)

## Phase 3 - Master Profile

- profile schema migrations
- profile CRUD endpoints
- frontend profile editor

## Phase 4 - Resume Versions + Editor Shell

- create/duplicate/archive resume versions
- snapshot storage strategy
- resume editor shell (structure + editor + preview layout)

## Phase 5 - Templates

- template metadata and renderer contract
- local template assets
- add initial 3 templates first, then expand to 5-8

## Phase 6 - Local Export Pipeline

- synchronous PDF export
- synchronous DOCX export
- store files on local filesystem (`LOCAL_STORAGE_ROOT`)
- export status and download endpoints

## Phase 7 - AI Integration

- rewrite field/section
- summary generation
- job-tailoring suggestions
- translation (en/he)
- suggestion approval flow and logging

## Phase 8 - Admin Panel

- user management
- template management
- usage statistics
- audit logs

## Out of Scope for Local MVP

- production deployment infrastructure
- cloud object storage
- billing/subscriptions
- advanced scaling and async job orchestration

