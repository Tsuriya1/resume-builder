We are changing the implementation target.

Do not optimize for production deployment yet.

New goal:
Build a fully functional local MVP that runs end-to-end on a developer machine and matches the product spec functionally as much as possible.

Priorities:
1. Everything must run locally
2. Core product flows must work end-to-end
3. Prefer simpler local implementations where appropriate
4. Keep the architecture clean enough to upgrade to production later
5. Avoid unnecessary cloud or infrastructure complexity for now

Required local-first changes:

- PostgreSQL runs locally via Docker
- exported files are stored on the local filesystem
- no cloud object storage
- synchronous export flow is acceptable
- add a local development auth mode
- support AUTH_MODE=local and AUTH_MODE=google
- in local auth mode, allow login as a seeded demo user
- keep route protection and user identity structure compatible with future Google auth
- use real migrations instead of runtime CREATE TABLE IF NOT EXISTS
- keep frontend and backend separated
- keep template rendering, resume versioning, and exports architecturally clean

Do not implement production deployment, cloud storage, billing, or advanced infra yet.

Please do the following:

1. create docs/local-mvp-mode.md
2. update docs/implementation-plan.md to reflect local-first delivery
3. update backlog priorities if needed
4. implement the local-first changes required to complete authentication and prepare the project for the next phases

Also explain any tradeoffs you choose.
