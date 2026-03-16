# Database Schema

## Purpose

This document defines the logical database schema for the Resume Builder system.

It is a product-oriented schema definition intended to guide implementation.
It does not prescribe a specific ORM, but assumes a relational database such as PostgreSQL.

---

## 1. Design Principles

The schema should support:

- one authenticated user per account
- one master profile per user
- many structured profile sub-records
- many resume versions per user
- independent resume snapshots
- template selection
- export tracking
- AI action tracking
- admin audit logging

The schema should preserve:

- relational integrity
- timestamps
- sort ordering where needed
- user ownership

---

## 2. Tables

## 2.1 users

Represents an authenticated user.

### Fields

- id
- google_id
- email
- full_name
- avatar_url
- role
- ui_language
- default_resume_language
- default_template_id
- created_at
- updated_at
- deleted_at

### Notes

- `google_id` should be unique
- `email` should be unique
- `role` should support at least:
  - user
  - admin
- `deleted_at` supports soft deletion if desired

---

## 2.2 master_profiles

Represents the primary reusable resume data source for a user.

### Fields

- id
- user_id
- headline
- summary
- city
- country
- phone
- linkedin_url
- github_url
- portfolio_url
- additional_links_json
- created_at
- updated_at

### Notes

- one-to-one with `users`
- `additional_links_json` can store extra personal links

---

## 2.3 work_experiences

Represents work experience entries inside a master profile.

### Fields

- id
- master_profile_id
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
- created_at
- updated_at
- deleted_at

### Notes

- one master profile has many work experiences
- `technologies_json` stores tags or structured technology data
- `sort_order` controls display order
- `is_current` should be true when end_date is null and employment is ongoing

---

## 2.4 work_experience_bullets

Represents bullet points for a work experience item.

### Fields

- id
- work_experience_id
- text
- bullet_type
- sort_order
- created_at
- updated_at
- deleted_at

### Notes

- allows structured bullet editing
- `bullet_type` may distinguish:
  - responsibility
  - achievement
  - general

---

## 2.5 educations

Represents education entries.

### Fields

- id
- master_profile_id
- institution
- degree
- field_of_study
- location
- start_date
- end_date
- gpa
- honors
- description
- sort_order
- created_at
- updated_at
- deleted_at

---

## 2.6 education_bullets

Optional structured bullet table for education entries.

### Fields

- id
- education_id
- text
- sort_order
- created_at
- updated_at
- deleted_at

### Notes

Useful if the UI supports bullet-based education details such as coursework or honors.

---

## 2.7 projects

Represents project entries.

### Fields

- id
- master_profile_id
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
- created_at
- updated_at
- deleted_at

### Notes

Important for technical resumes.

---

## 2.8 project_bullets

Represents bullet points for project entries.

### Fields

- id
- project_id
- text
- bullet_type
- sort_order
- created_at
- updated_at
- deleted_at

---

## 2.9 skills

Represents skills in the master profile.

### Fields

- id
- master_profile_id
- category
- name
- proficiency
- sort_order
- created_at
- updated_at
- deleted_at

### Notes

Examples of category:

- programming_languages
- frameworks
- databases
- cloud_devops
- data_tools
- testing
- soft_skills

---

## 2.10 certifications

Represents professional certifications.

### Fields

- id
- master_profile_id
- name
- issuer
- issue_date
- expiration_date
- credential_id
- credential_url
- created_at
- updated_at
- deleted_at

---

## 2.11 profile_languages

Represents languages known by the user.

### Fields

- id
- master_profile_id
- language_name
- proficiency
- sort_order
- created_at
- updated_at
- deleted_at

---

## 2.12 additional_experiences

Represents volunteer, military, community, or other additional experiences.

### Fields

- id
- master_profile_id
- title
- organization
- location
- start_date
- end_date
- description
- experience_type
- sort_order
- created_at
- updated_at
- deleted_at

### Notes

`experience_type` may include:

- volunteer
- military
- leadership
- extracurricular
- other

---

## 2.13 custom_sections

Represents user-defined custom section data in the master profile.

### Fields

- id
- master_profile_id
- title
- content_json
- sort_order
- created_at
- updated_at
- deleted_at

### Notes

Allows flexibility for uncommon resume sections.

---

## 2.14 templates

Represents available resume templates.

### Fields

- id
- name
- slug
- category
- description
- thumbnail_url
- preview_images_json
- supports_rtl
- supports_ltr
- ats_friendly
- renderer_key
- config_schema_json
- is_active
- created_at
- updated_at

### Notes

Examples of category:

- minimal
- modern
- developer
- data_engineering
- executive
- hebrew_professional

---

## 2.15 resume_versions

Represents an independently editable resume version.

### Fields

- id
- user_id
- master_profile_id
- name
- target_role
- target_company
- job_description_text
- language
- direction
- template_id
- theme_config_json
- status
- content_snapshot_json
- created_at
- updated_at
- archived_at
- deleted_at

### Notes

- `language` may be:
  - en
  - he
- `direction` may be:
  - ltr
  - rtl
- `status` may be:
  - draft
  - ready
  - archived
- `content_snapshot_json` is critical and stores the fully resolved structured content for this version

---

## 2.16 resume_sections

Optional table for per-version section configuration.

### Fields

- id
- resume_version_id
- section_type
- title_override
- is_visible
- sort_order
- config_json
- created_at
- updated_at

### Notes

This table is useful if implementation prefers explicit per-version section metadata separate from the snapshot.

---

## 2.17 ai_actions

Tracks AI-assisted operations.

### Fields

- id
- user_id
- resume_version_id
- action_type
- source_scope
- input_text
- output_text
- prompt_metadata_json
- accepted
- created_at

### Notes

Examples of `action_type`:

- rewrite_field
- rewrite_section
- improve_summary
- translate
- tailor_to_job

Examples of `source_scope`:

- field
- section
- resume

---

## 2.18 exports

Tracks export generation events.

### Fields

- id
- user_id
- resume_version_id
- format
- file_storage_key
- file_url
- status
- error_message
- created_at
- completed_at

### Notes

`format` values:

- pdf
- docx

`status` values:

- pending
- processing
- completed
- failed

---

## 2.19 admin_audit_logs

Tracks admin operations.

### Fields

- id
- admin_user_id
- action
- entity_type
- entity_id
- metadata_json
- created_at

### Notes

Examples:

- enable_template
- disable_template
- update_template
- inspect_ai_usage
- suspend_user

---

## 3. Core Relationships

### users → master_profiles

- one-to-one

### users → resume_versions

- one-to-many

### master_profiles → work_experiences

- one-to-many

### work_experiences → work_experience_bullets

- one-to-many

### master_profiles → educations

- one-to-many

### educations → education_bullets

- one-to-many

### master_profiles → projects

- one-to-many

### projects → project_bullets

- one-to-many

### master_profiles → skills

- one-to-many

### master_profiles → certifications

- one-to-many

### master_profiles → profile_languages

- one-to-many

### master_profiles → additional_experiences

- one-to-many

### master_profiles → custom_sections

- one-to-many

### templates → resume_versions

- one-to-many

### resume_versions → exports

- one-to-many

### users → ai_actions

- one-to-many

### resume_versions → ai_actions

- one-to-many

---

## 4. Important Implementation Notes

### Snapshot Strategy

`resume_versions.content_snapshot_json` must contain the actual structured content used for that resume version.

This ensures that:

- editing the master profile later does not unexpectedly change previous resume versions
- users can keep multiple distinct versions safely
- exports are reproducible

### Ordering

Most content tables should include `sort_order` so the user can control ordering.

### Soft Deletion

Soft deletion is recommended for:

- content items
- resume versions
- users

This helps with recovery and auditability.

### Validation

Important validation rules include:

- email format
- URL format
- date consistency
- section limits where relevant
- direction-template compatibility

---

## 5. Suggested Minimal Schema for Early Development

If early implementation needs to start smaller, the first pass can include:

- users
- master_profiles
- work_experiences
- work_experience_bullets
- educations
- projects
- skills
- templates
- resume_versions
- exports
- ai_actions

Later expansion can add:

- certifications
- languages
- additional experiences
- custom sections
- admin audit logs