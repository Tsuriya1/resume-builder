# System Architecture

## Purpose

This document defines the recommended technical architecture for the Resume Builder web application.

The system should be designed to support:

- structured resume editing
- multiple resume versions
- template-driven rendering
- bilingual support
- PDF and DOCX export
- AI-assisted editing
- admin management

---

## 1. Recommended Stack

### Frontend

Recommended:

- Next.js
- React
- TypeScript

Why:

- good support for modern web applications
- strong ecosystem
- suitable for dashboards and complex editors
- good support for server/client rendering strategies
- easy integration with authentication and APIs

### Backend

Recommended:

- Node.js
- NestJS
- TypeScript

Why:

- structured architecture
- controller/service/module pattern
- suitable for scalable REST APIs
- strong TypeScript integration
- clean dependency injection model

### Database

Recommended:

- PostgreSQL

Why:

- strong relational model
- good support for structured entities
- transactional integrity
- suitable for resume/profile/version relationships
- mature and production-proven

### Storage

Recommended:

- object storage for generated files and template assets

Examples:

- S3-compatible storage
- cloud object storage provider

Used for:

- exported PDF files
- exported DOCX files
- template thumbnails
- template previews

---

## 2. High-Level Architecture

The system should be divided into the following layers:

### Frontend Layer

Responsibilities:

- authentication UI flow
- dashboard
- master profile editor
- resume builder
- live preview
- template gallery
- export flow
- admin screens

### API Layer

Responsibilities:

- expose REST endpoints
- validate requests
- enforce authentication and authorization
- coordinate business services

### Domain / Service Layer

Responsibilities:

- user logic
- profile logic
- resume version logic
- template logic
- export orchestration
- AI orchestration
- audit logging

### Data Access Layer

Responsibilities:

- database persistence
- querying
- relations
- migrations
- repository or ORM integration

### Rendering Layer

Responsibilities:

- transform structured resume data into visual representation
- apply templates
- generate renderable HTML
- support preview and export consistency

### Export Layer

Responsibilities:

- generate PDF
- generate DOCX
- track export status
- store generated files

### AI Integration Layer

Responsibilities:

- rewrite text
- tailor text to jobs
- translate text
- log AI usage
- handle retries and failures safely

---

## 3. Architectural Principles

### 3.1 Structured Content Model

Resume data must be stored as structured content, not as raw document blobs.

Benefits:

- easier editing
- easier rendering
- easier template switching
- easier version management
- easier AI interaction
- easier export

### 3.2 Separation of Content and Presentation

Resume content should be stored independently from styling.

The same content snapshot should be renderable through different templates.

### 3.3 Snapshot-Based Resume Versions

Each resume version should store an independent content snapshot.

This ensures that changes to the master profile do not automatically break or mutate older versions.

### 3.4 Modular Services

The following services should remain decoupled:

- authentication
- profiles
- resumes
- templates
- exports
- AI
- admin analytics

### 3.5 Export as a Dedicated Pipeline

Export should not be treated as a simple frontend print action.

Instead, export should be a backend-managed rendering pipeline:

structured content → template renderer → export engine → stored file

---

## 4. Frontend Architecture

## 4.1 Main Areas

The frontend should include:

- public landing page
- authenticated app
- admin area

## 4.2 Suggested Frontend Modules

- authentication module
- dashboard module
- master profile module
- resume builder module
- template module
- export module
- admin module
- localization module

## 4.3 Resume Builder UI Structure

Recommended layout:

- left panel: structure panel
- center panel: content editor
- right panel: live preview

This layout should make it easy to edit content while seeing results immediately.

## 4.4 State Management

Frontend state should distinguish between:

- server state
- local editing state
- preview state
- UI preferences

Suggested approach:

- use a dedicated data fetching library for API state
- use local form state for editing
- keep preview data synchronized with resume editor state

## 4.5 Localization and Direction Handling

The frontend must support:

- UI language switching
- content language switching
- RTL layout support
- LTR layout support

Direction must affect:

- page layout
- alignment
- preview rendering
- export rendering assumptions

---

## 5. Backend Architecture

## 5.1 Core Modules

Recommended backend modules:

- AuthModule
- UsersModule
- ProfilesModule
- ResumesModule
- TemplatesModule
- ExportsModule
- AiModule
- AdminModule
- AuditModule

## 5.2 Service Responsibilities

### Auth Service

Responsible for:

- Google OAuth integration
- session/token verification
- user provisioning on first login

### Users Service

Responsible for:

- user records
- preferences
- roles
- account deletion

### Profiles Service

Responsible for:

- master profile CRUD
- experience records
- education records
- skills
- projects
- certifications
- languages

### Resumes Service

Responsible for:

- resume version CRUD
- duplication
- archiving
- snapshot generation
- section ordering
- validation

### Templates Service

Responsible for:

- template listing
- template metadata
- template availability
- admin management of templates

### Exports Service

Responsible for:

- PDF export orchestration
- DOCX export orchestration
- file persistence
- export history/status

### AI Service

Responsible for:

- rewrite actions
- translation
- summary generation
- tailoring to job descriptions
- usage logging

### Admin Service

Responsible for:

- user counts
- resume counts
- export counts
- AI usage reports
- template administration

---

## 6. Database Architecture

The system is relational.

Key relationships:

- one user has one master profile
- one user has many resume versions
- one master profile has many experience records
- one master profile has many education records
- one master profile has many projects
- one master profile has many skills
- one resume version references one template
- one resume version has many exports
- one user has many AI actions

The database must support:

- soft deletion where appropriate
- timestamps for auditability
- foreign key integrity
- ordering fields for section items

---

## 7. Rendering Architecture

## 7.1 Resume Rendering Model

Rendering should be template-driven.

Input:

- resume version content snapshot
- selected template
- theme configuration
- language and direction

Output:

- structured rendered resume representation
- HTML for preview and export

## 7.2 Template Responsibilities

Each template should define:

- layout structure
- typography scale
- section visual style
- spacing model
- direction support
- optional features such as icons or sidebars

## 7.3 Preview vs Export Consistency

The system should aim for high consistency between:

- live preview
- exported PDF
- exported DOCX structure

Perfect pixel-identical behavior is not always required, but major layout differences are not acceptable.

---

## 8. Export Architecture

## 8.1 PDF Export

Recommended flow:

1. fetch resume version data
2. fetch template configuration
3. render HTML
4. generate PDF in backend
5. store file
6. return download reference

## 8.2 DOCX Export

Recommended flow:

1. fetch resume version data
2. transform structured resume content into document sections
3. generate DOCX using structured document primitives
4. store file
5. return download reference

DOCX should not rely on a poor-quality HTML conversion if it can be avoided.

## 8.3 Export Tracking

Each export should create a record including:

- user
- resume version
- format
- status
- file reference
- timestamp

---

## 9. AI Architecture

## 9.1 AI Interaction Types

AI requests should be categorized by action type, for example:

- rewrite-field
- rewrite-section
- improve-summary
- translate
- tailor-to-job

## 9.2 AI Safety and Guardrails

AI must not:

- invent jobs
- invent employers
- invent degrees
- invent years of experience
- invent metrics that the user did not provide

The AI layer must operate on explicit user content only.

## 9.3 AI Logging

Each AI action should be logged with:

- user
- resume version
- action type
- input
- output
- whether accepted by the user
- timestamp

## 9.4 Retry and Failure Handling

AI failures should not break editing.

If an AI action fails:

- the user should see a clear error
- the original content must remain unchanged
- the request may be retried safely

---

## 10. Authentication Architecture

Authentication should use Google OAuth only.

The system should:

- verify Google identity
- create the user if first login
- create a session or secure auth token
- load user role and preferences

No password storage is needed.

---

## 11. Authorization

The system should have at least two roles:

- user
- admin

Rules:

- users can access only their own data
- admins can access admin endpoints
- admins should not casually access user resume contents unless such access is explicitly designed and audited

---

## 12. Deployment Shape

A practical deployment can include:

- frontend app
- backend app
- PostgreSQL database
- object storage
- environment configuration
- optional reverse proxy
- optional background worker if export jobs become asynchronous later

For the MVP, synchronous export may be acceptable if performance is reasonable.

---

## 13. Scalability Considerations

While the MVP does not need extreme scale, the architecture should avoid dead ends.

Important areas:

- AI usage can become expensive
- export generation can become resource-heavy
- templates should remain modular
- multilingual rendering must be designed correctly from day one

---

## 14. Observability

The backend should provide:

- structured logging
- request IDs where possible
- export failure logs
- AI failure logs
- audit logs for admin actions

The frontend should provide:

- basic user-visible error states
- loading indicators
- validation warnings

---

## 15. Recommended Monorepo Structure

A good starting project layout can be:

- frontend/
- backend/
- docs/

Optional future improvement:

- packages/shared-types
- packages/template-engine

This is especially useful if frontend and backend share TypeScript models.

---

## 16. Final Recommendation

Recommended implementation model:

- Next.js frontend
- NestJS backend
- PostgreSQL database
- template-driven renderer
- backend-managed PDF/DOCX export
- Google-only authentication
- snapshot-based resume versioning
- AI as an explicit suggestion workflow