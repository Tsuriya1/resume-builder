# MVP Implementation Plan

## Goal

Deliver an end-to-end Resume Builder MVP where a user can sign in with Google, manage master profile data, create and edit multiple resume versions, use templates and AI suggestions, preview in real time, and export to PDF/DOCX; plus a basic admin panel.

## Recommended Project Structure

```
resume-builder/
  docs/
  frontend/                 # Next.js + TypeScript
    src/
      app/                  # routes and layouts
      modules/              # feature modules (dashboard, editor, etc.)
      components/           # shared UI
      lib/                  # API client, i18n, utils
      types/                # frontend models
  backend/                  # NestJS + TypeScript
    src/
      modules/
        auth/
        users/
        profiles/
        resumes/
        templates/
        exports/
        ai/
        admin/
        audit/
      common/               # guards, filters, interceptors, validators
      config/
    prisma/ or migrations/  # schema + migration files
  packages/
    shared-types/           # DTO and enum contracts shared FE/BE
    template-engine/        # render contracts and template runtime (optional in early MVP)
```

## Delivery Strategy

Prioritize one thin vertical slice first, then widen feature coverage:

1. Auth + profile + one resume + one template + PDF export.
2. Add missing sections, version operations, and DOCX.
3. Add AI suggestions, bilingual robustness, and admin essentials.

## Phased Plan

## Phase 0 - Foundations (Week 1)

Scope:

- monorepo folders and base tooling
- frontend and backend app scaffolds
- PostgreSQL setup and first migrations
- shared enums/contracts for language, direction, status, roles
- centralized env config and secrets strategy
- logging/error envelope conventions

Exit criteria:

- apps boot locally
- health endpoints and DB connectivity work
- CI runs lint + typecheck

## Phase 1 - Auth + User + Preferences (Week 2)

Scope:

- Google OAuth flow (`/auth/google`, `/auth/me`, `/auth/logout`)
- user provisioning on first login
- role and preference persistence
- protected routes (user/admin separation baseline)

Exit criteria:

- first login creates `users` and `master_profiles`
- authenticated user can read/update preferences

## Phase 2 - Master Profile CRUD (Weeks 3-4)

Scope:

- `/profile` read/update
- CRUD APIs for profile sections and bullets
- reorder support via `sort_order`
- frontend master profile editor with validation + autosave

Exit criteria:

- user can fully populate profile sections included in MVP scope
- data reload is stable and ordered

## Phase 3 - Resume Versions + Editor Shell (Weeks 5-6)

Scope:

- `/resumes` CRUD, duplicate, archive/restore, snapshot storage
- section visibility/order config (`/resumes/:id/sections`)
- 3-panel resume builder shell: structure, editor, preview
- create-from-master and duplicate flows

Exit criteria:

- user can create multiple independent versions
- edits in one version do not mutate others or master profile

## Phase 4 - Template System + Live Preview (Weeks 7-8)

Scope:

- template metadata APIs and seed templates (start with 3, expand to 5-8)
- renderer contract for LTR/RTL templates
- live preview bound to selected template and section config
- design settings (controlled options only)

Exit criteria:

- template switch updates preview reliably
- at least one strong LTR and one strong RTL template working end-to-end

## Phase 5 - Export Pipeline (Weeks 9-10)

Scope:

- export records/status model
- PDF export pipeline
- DOCX export pipeline (native structured generation, not weak HTML conversion)
- file storage integration
- export dialog UX and download flow

Exit criteria:

- user exports both PDF and DOCX from resume version
- status and failure paths are visible in UI

## Phase 6 - AI Assistance + Job Tailoring (Weeks 11-12)

Scope:

- AI endpoints for rewrite field/section, summary, translate, tailor-to-job
- suggestion-first UX (manual apply only)
- AI action logging (`accepted`, action type, scope)
- fallback/retry behavior on failures

Exit criteria:

- AI suggestions are non-destructive and reviewable
- logs support basic usage analytics

## Phase 7 - Admin MVP + Hardening (Weeks 13-14)

Scope:

- admin auth guard and screens: users, stats, template toggles, AI usage, audit logs
- audit logging for admin actions
- permission tests (user data isolation + admin restrictions)
- performance and reliability pass for editor, preview, export

Exit criteria:

- admin can view operational stats and manage templates
- security and core regression tests pass

## Cross-Phase Quality Gates

- API contract parity with `docs/api-contracts.md`
- schema-to-API validation with explicit enum constraints
- RTL/LTR checks for preview and export in every template addition
- observability for export and AI failures before release

## Explicit Deferrals (Post-MVP)

- LinkedIn/file import
- collaborative editing
- public share links
- billing/subscription
- template marketplace/builder

