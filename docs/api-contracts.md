# API Contracts

## Purpose

This document defines the REST API surface for the Resume Builder application.

It is intended as an implementation guide for backend and frontend coordination.

All endpoints below assume authenticated access unless explicitly noted otherwise.

---

## 1. Authentication

### POST /auth/google

Purpose:

- authenticate user with Google
- provision user record on first login

Request:

- Google auth token or code, depending on implementation approach

Response:

- authenticated user info
- session/token established

### GET /auth/me

Purpose:

- return currently authenticated user

Response example:

- id
- email
- full_name
- avatar_url
- role
- ui_language
- default_resume_language

### POST /auth/logout

Purpose:

- invalidate current session or auth token

Response:

- success boolean
- optional message

---

## 2. User Preferences

### GET /me

Purpose:

- return current user profile and preferences

Response fields:

- id
- email
- full_name
- avatar_url
- role
- ui_language
- default_resume_language
- default_template_id

### PATCH /me/preferences

Purpose:

- update user preferences

Request fields may include:

- ui_language
- default_resume_language
- default_template_id

Response:

- updated user preferences

### DELETE /me/account

Purpose:

- delete or deactivate account

Behavior:

- may soft-delete account
- may mark user as deleted
- may revoke access

Response:

- success boolean

---

## 3. Master Profile

### GET /profile

Purpose:

- return full master profile with nested sections

Response should include:

- base profile fields
- work experiences
- education
- projects
- skills
- certifications
- languages
- additional experiences
- custom sections

### PATCH /profile

Purpose:

- update master profile top-level fields

Request fields may include:

- headline
- summary
- city
- country
- phone
- linkedin_url
- github_url
- portfolio_url
- additional_links_json

Response:

- updated master profile

---

## 4. Work Experiences

### POST /profile/work-experiences

Purpose:

- create work experience item

Request fields:

- company_name
- role_title
- location
- employment_type
- start_date
- end_date
- is_current
- description
- technologies_json
- sort_order

Response:

- created work experience record

### PATCH /profile/work-experiences/:id

Purpose:

- update work experience item

Request fields:

- any editable work experience field

Response:

- updated work experience record

### DELETE /profile/work-experiences/:id

Purpose:

- delete work experience item

Response:

- success boolean

### POST /profile/work-experiences/:id/bullets

Purpose:

- create bullet point for a work experience

Request fields:

- text
- bullet_type
- sort_order

Response:

- created bullet record

### PATCH /profile/work-experience-bullets/:id

Purpose:

- update bullet point

### DELETE /profile/work-experience-bullets/:id

Purpose:

- delete bullet point

---

## 5. Education

### POST /profile/educations

Purpose:

- create education item

### PATCH /profile/educations/:id

Purpose:

- update education item

### DELETE /profile/educations/:id

Purpose:

- delete education item

### POST /profile/educations/:id/bullets

Purpose:

- create education bullet point

### PATCH /profile/education-bullets/:id

Purpose:

- update education bullet

### DELETE /profile/education-bullets/:id

Purpose:

- delete education bullet

---

## 6. Projects

### POST /profile/projects

Purpose:

- create project item

Request fields:

- name
- subtitle
- role_in_project
- description
- impact_text
- technologies_json
- project_url
- github_url
- start_date
- end_date
- sort_order

### PATCH /profile/projects/:id

Purpose:

- update project item

### DELETE /profile/projects/:id

Purpose:

- delete project item

### POST /profile/projects/:id/bullets

Purpose:

- create project bullet

### PATCH /profile/project-bullets/:id

Purpose:

- update project bullet

### DELETE /profile/project-bullets/:id

Purpose:

- delete project bullet

---

## 7. Skills

### POST /profile/skills

Purpose:

- create skill

Request fields:

- category
- name
- proficiency
- sort_order

### PATCH /profile/skills/:id

Purpose:

- update skill

### DELETE /profile/skills/:id

Purpose:

- delete skill

---

## 8. Certifications

### POST /profile/certifications

### PATCH /profile/certifications/:id

### DELETE /profile/certifications/:id

---

## 9. Languages

### POST /profile/languages

### PATCH /profile/languages/:id

### DELETE /profile/languages/:id

---

## 10. Additional Experiences

### POST /profile/additional-experiences

### PATCH /profile/additional-experiences/:id

### DELETE /profile/additional-experiences/:id

---

## 11. Custom Sections

### POST /profile/custom-sections

### PATCH /profile/custom-sections/:id

### DELETE /profile/custom-sections/:id

---

## 12. Resume Versions

### GET /resumes

Purpose:

- list all resume versions for current user

Query parameters may include:

- status
- language
- template_id
- search

Response should include summary cards with:

- id
- name
- language
- direction
- template_id
- target_role
- target_company
- status
- updated_at

### POST /resumes

Purpose:

- create a new resume version

Request fields:

- name
- template_id
- language
- direction
- target_role
- target_company
- job_description_text optional
- source_mode:
  - from_master_profile
  - duplicate_resume
- source_resume_id optional

Behavior:

- creates a content snapshot

Response:

- created resume version

### GET /resumes/:id

Purpose:

- fetch a full resume version for editing

Response should include:

- metadata
- content snapshot
- section configuration
- template
- theme configuration

### PATCH /resumes/:id

Purpose:

- update resume version metadata and/or content snapshot

Request may include:

- name
- target_role
- target_company
- job_description_text
- language
- direction
- template_id
- theme_config_json
- content_snapshot_json
- status

Response:

- updated resume version

### POST /resumes/:id/duplicate

Purpose:

- duplicate an existing resume version

Request may include:

- new_name

Response:

- duplicated resume version

### POST /resumes/:id/archive

Purpose:

- archive a resume version

Response:

- updated status

### POST /resumes/:id/restore

Purpose:

- restore archived resume version

Response:

- updated status

### DELETE /resumes/:id

Purpose:

- delete a resume version

Response:

- success boolean

---

## 13. Resume Section Configuration

### PATCH /resumes/:id/sections

Purpose:

- update per-version section settings

Request can include list of sections with:

- section_type
- title_override
- is_visible
- sort_order
- config_json

Response:

- updated section configuration

---

## 14. Templates

### GET /templates

Purpose:

- list all active templates available to the current user

Query parameters may include:

- category
- supports_rtl
- supports_ltr
- ats_friendly

Response fields:

- id
- name
- slug
- category
- description
- thumbnail_url
- supports_rtl
- supports_ltr
- ats_friendly

### GET /templates/:id

Purpose:

- fetch template details

Response fields:

- template metadata
- config schema
- preview data
- support flags

---

## 15. AI Endpoints

### POST /resumes/:id/ai/rewrite-field

Purpose:

- rewrite a specific field

Request fields:

- field_path
- text
- tone optional
- length_preference optional
- language

Response:

- suggested_text
- metadata

### POST /resumes/:id/ai/rewrite-section

Purpose:

- rewrite a specific section

Request fields:

- section_type
- section_payload
- goal
- language

Examples of goal:

- improve_professionalism
- concise
- stronger_impact
- technical_style

Response:

- suggested_section_payload

### POST /resumes/:id/ai/generate-summary

Purpose:

- generate or improve a professional summary

Request fields:

- existing_summary optional
- resume_context
- target_role optional
- target_company optional
- language

Response:

- suggested_summary

### POST /resumes/:id/ai/translate

Purpose:

- translate content between Hebrew and English

Request fields:

- source_language
- target_language
- source_scope
- payload

Response:

- translated payload

### POST /resumes/:id/ai/tailor-to-job

Purpose:

- analyze job description and suggest resume improvements

Request fields:

- job_description_text
- target_language optional

Response fields may include:

- summary_suggestion
- section_suggestions
- skill_prioritization
- keyword_recommendations
- missing_keywords
- indicative_match_score

---

## 16. Exports

### POST /resumes/:id/export/pdf

Purpose:

- generate PDF export

Request fields may include:

- file_name
- page_size
- margin_preset
- ats_safe optional

Response:

- export record
- status
- download reference if completed synchronously

### POST /resumes/:id/export/docx

Purpose:

- generate DOCX export

Request fields may include:

- file_name
- ats_safe optional

Response:

- export record
- status
- download reference if completed synchronously

### GET /exports/:id/status

Purpose:

- get export status

Response fields:

- id
- format
- status
- error_message
- created_at
- completed_at

### GET /exports/:id/download

Purpose:

- download completed export

Behavior:

- returns file or signed file URL

---

## 17. Admin Endpoints

### GET /admin/users

Purpose:

- list users

Query parameters may include:

- search
- role
- status

Response should include:

- id
- full_name
- email
- role
- created_at
- number_of_resume_versions
- number_of_exports

### GET /admin/stats

Purpose:

- return basic platform statistics

Response may include:

- total_users
- total_resumes
- total_exports
- total_ai_actions
- active_templates

### GET /admin/ai-usage

Purpose:

- return AI usage statistics

Response may include:

- action counts by type
- accepted suggestion rate
- failure rate
- usage over time

### GET /admin/audit-logs

Purpose:

- return admin audit logs

Response fields:

- admin_user
- action
- entity_type
- entity_id
- metadata
- created_at

---

## 18. Admin Template Management

### POST /admin/templates

Purpose:

- create a template record

### PATCH /admin/templates/:id

Purpose:

- update template metadata

### POST /admin/templates/:id/enable

Purpose:

- enable template

### POST /admin/templates/:id/disable

Purpose:

- disable template

---

## 19. General API Rules

### Authentication

All authenticated endpoints must require a valid logged-in user.

### Authorization

- user endpoints must only expose the current user’s own data
- admin endpoints must require admin role

### Validation

Requests must validate:

- dates
- URLs
- email consistency where relevant
- language values
- direction values
- template compatibility where applicable

### Errors

The API should return clear structured errors for:

- validation failures
- unauthorized requests
- forbidden requests
- missing resources
- export failures
- AI failures

### Versioning

API versioning is recommended, for example under `/api/v1`, though exact routing style is implementation-dependent.