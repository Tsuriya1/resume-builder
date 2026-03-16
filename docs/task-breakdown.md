# MVP Task Breakdown

## Planning Assumptions

- Build in phases, each ending with a demoable increment.
- Keep API and schema aligned with existing docs.
- Prioritize vertical slices over broad unfinished modules.

## Workstreams

- `WS1` Platform and DevEx
- `WS2` Auth and User Management
- `WS3` Profile Domain
- `WS4` Resume Versions and Editor
- `WS5` Templates and Rendering
- `WS6` Exports
- `WS7` AI and Tailoring
- `WS8` Admin and Audit
- `WS9` QA, Security, and Release

## Phase-by-Phase Tasks

## Phase 0 - Foundations

1. `WS1` Create monorepo directories (`frontend`, `backend`, `packages`, `docs`).
2. `WS1` Initialize Next.js and NestJS apps with TypeScript.
3. `WS1` Configure linting, formatting, type checks, env loading.
4. `WS1` Set up PostgreSQL connection and migration pipeline.
5. `WS1` Create shared enums/types package for roles, language, direction, statuses.
6. `WS9` Add CI checks for lint + typecheck + tests baseline.

Dependencies: none.

## Phase 1 - Auth + Preferences

1. `WS2` Implement Google OAuth callback/login/logout flow.
2. `WS2` Add user provisioning logic and default master profile creation.
3. `WS2` Implement `/auth/me`, `/me`, `/me/preferences` APIs.
4. `WS2` Add frontend auth guards and session bootstrap.
5. `WS9` Add integration tests for login and protected route access.

Dependencies: Phase 0.

## Phase 2 - Master Profile CRUD

1. `WS3` Implement profile tables/entities and relations.
2. `WS3` Implement `/profile` read/update.
3. `WS3` Implement CRUD APIs for sections and bullet tables.
4. `WS3` Implement reorder and soft-delete behavior.
5. `WS4` Build master profile editor UI sections with validation and autosave.
6. `WS9` Add CRUD and validation tests for section records.

Dependencies: Phase 1.

## Phase 3 - Resume Versions + Editor Shell

1. `WS4` Implement `/resumes` list/create/get/update/delete.
2. `WS4` Implement duplicate, archive, restore endpoints.
3. `WS4` Implement snapshot creation from master profile.
4. `WS4` Implement `/resumes/:id/sections` for visibility/order config.
5. `WS4` Build dashboard resume cards and quick actions.
6. `WS4` Build 3-panel editor shell with basic section editing.
7. `WS9` Add isolation tests: version edits do not mutate master/other versions.

Dependencies: Phase 2.

## Phase 4 - Templates + Live Preview

1. `WS5` Define template render contract (input/output schema).
2. `WS5` Implement template metadata APIs and seed data.
3. `WS5` Build template gallery/selector.
4. `WS5` Implement preview renderer using selected template + direction.
5. `WS5` Add design settings controls (accent, font size preset, spacing preset).
6. `WS9` Add visual regression checks for one LTR and one RTL template.

Dependencies: Phase 3.

## Phase 5 - Export

1. `WS6` Implement export records/status lifecycle.
2. `WS6` Build PDF generation pipeline from render contract.
3. `WS6` Build DOCX generation pipeline from structured content.
4. `WS6` Integrate object storage and download endpoint.
5. `WS4` Implement export dialog and status feedback in UI.
6. `WS9` Add end-to-end export tests for bilingual sample resumes.

Dependencies: Phase 4.

## Phase 6 - AI + Job Tailoring

1. `WS7` Integrate AI provider client and prompt orchestration.
2. `WS7` Implement rewrite field/section, summary, translate endpoints.
3. `WS7` Implement tailor-to-job endpoint and structured suggestions.
4. `WS7` Implement AI action logs and acceptance tracking.
5. `WS4` Implement suggestion review/apply UX (non-destructive).
6. `WS9` Add safety tests for "no fabrication" and failure fallbacks.

Dependencies: Phase 3 (minimum), Phase 4 recommended.

## Phase 7 - Admin + Hardening

1. `WS8` Implement admin stats, users, templates toggle, AI usage, audit logs APIs.
2. `WS8` Build admin screens and role-gated routing.
3. `WS8` Add audit logging for admin actions.
4. `WS9` Add authorization and privacy tests for all admin endpoints.
5. `WS9` Stabilization pass: error handling, observability, performance.

Dependencies: Phases 1, 5, 6.

## Definition of Done (MVP)

1. User can complete all MVP success criteria from `docs/mvp-scope.md`.
2. Admin can complete basic operational tasks from MVP scope.
3. Core user journeys have automated integration/e2e coverage.
4. Export and AI error paths are observable and user-visible.

## Sequencing Notes

1. Do not begin broad template creation until render contract is stable.
2. Do not expand AI actions until suggestion apply/reject workflow is complete.
3. Do not ship admin endpoints before strict role authorization tests pass.

