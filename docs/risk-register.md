# Risk Register (MVP)

## Legend

- Probability: Low / Medium / High
- Impact: Low / Medium / High / Critical

## Risks

| ID | Risk | Probability | Impact | Early Signal | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R1 | Preview and exported PDF/DOCX diverge significantly | High | Critical | User reports "looks different after export" | Single rendering contract; golden sample snapshots; export regression checks per template | Backend + Frontend |
| R2 | RTL/LTR mixed-content rendering bugs (Hebrew + English + URLs) | High | High | Broken alignment, bullets, or overflow in Hebrew docs | Add bidi test fixtures early; enforce direction-aware CSS/template rules; add explicit RTL QA checklist | Frontend + Template |
| R3 | Snapshot model leaks master profile changes into existing versions | Medium | Critical | Old resume content changes after profile edit | Version content immutable snapshot writes; isolation tests for create/duplicate/edit flows | Backend |
| R4 | DOCX quality poor due to naive HTML conversion | Medium | High | Word files lose structure/styles | Use structured DOCX generator model; define mapping from section schema to DOCX primitives | Backend |
| R5 | AI suggestions fabricate claims or overwrite content silently | Medium | Critical | Users see invented achievements or unexpected text replacement | Non-destructive suggestion workflow only; explicit apply action; content-policy guardrails; log accepted/rejected | AI + Frontend |
| R6 | Google OAuth and session handling issues delay delivery | Medium | High | Login loop, stale sessions, failed first-login provisioning | Implement auth vertical slice first; integration tests for callback/session lifecycle | Backend |
| R7 | Scope overload from "all sections + templates + admin + AI" in MVP | High | High | Milestones slip after Phase 3 | Deliver thin vertical slice first; template count can start at 3 then expand to 5-8 | PM + Tech Lead |
| R8 | Export generation is slow or unstable under concurrent usage | Medium | High | Timeouts and failed export statuses | Set timeout/retry strategy; queue-ready export abstraction; monitor failure rate and latency | Backend |
| R9 | Access control gaps expose other users' data | Low | Critical | Cross-user data visible through ID tampering | Enforce user-scoped queries everywhere; role guards on admin APIs; authz tests in CI | Backend |
| R10 | API contracts and frontend DTOs drift | Medium | Medium | Runtime validation errors or missing fields | Shared `packages/shared-types`; contract tests and schema linting in CI | Frontend + Backend |
| R11 | Template implementation debt makes adding 5-8 templates too slow | Medium | Medium | New template takes too long or breaks others | Define template SDK interface; separate template metadata from rendering logic | Template |
| R12 | AI/provider cost grows faster than expected | Medium | Medium | Large job-tailoring usage spikes | Rate limits/quotas; token budgeting; monitor cost per action type | AI + Product |

## Missing Decisions (Must Be Resolved Early)

1. Auth/session model: cookie session vs token-based API auth.
2. ORM and migration stack: Prisma vs TypeORM vs other.
3. PDF engine choice and runtime requirements.
4. DOCX generation library and fidelity target.
5. Storage provider abstraction and signed URL strategy.
6. AI provider, model tiers, and failover strategy.
7. Autosave cadence and optimistic concurrency behavior.
8. Template packaging model: code-based templates vs metadata + renderer config.
9. Admin data access policy boundaries (especially user content visibility).
10. Internationalization framework for frontend UI localization.

## Top 5 Immediate Risk-Reduction Actions

1. Build a single template render contract used by both preview and export.
2. Implement one complete LTR template and one complete RTL template before adding more.
3. Lock snapshot semantics with tests before broad editor work.
4. Decide PDF and DOCX engines in Phase 0 and validate with real bilingual samples.
5. Add role/user authorization tests as mandatory CI checks before admin rollout.

