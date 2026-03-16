# UI Screens

## Purpose

This document describes the main screens of the Resume Builder application, their purpose, key UI components, and user interactions.

The goal is to guide implementation of the frontend UX and page structure.

---

## 1. Landing Page

### Purpose

- explain what the product does
- showcase value quickly
- display template previews
- drive the user to sign in

### Main Components

- main headline
- supporting subtitle
- Google sign-in button
- visual examples of resume templates
- short benefits section
- optional FAQ section

### Suggested Messaging Focus

- create professional resumes faster
- tailor resumes for jobs
- improve wording with AI
- export to PDF and DOCX
- support English and Hebrew

### Actions

- sign in with Google
- optionally scroll to examples and FAQ

---

## 2. Authentication Flow

### Purpose

Authenticate the user through Google.

### Behavior

- clicking sign-in starts Google OAuth
- successful authentication redirects user to dashboard
- first login creates user and empty master profile

### UI Requirements

- loading state while redirecting/authenticating
- error state if authentication fails

---

## 3. Dashboard

### Purpose

Main entry point after login.

The dashboard should help the user quickly:

- see all resume versions
- create a new resume
- duplicate, archive, or delete resumes
- navigate to the master profile editor

### Main Components

- page title
- create new resume button
- open master profile button
- list or grid of resume versions
- filters and search
- quick actions on each resume version

### Resume Card Information

Each resume card should display:

- resume version name
- template name
- language
- target role
- target company if exists
- status
- last updated date

### Card Actions

- open/edit
- duplicate
- archive
- delete
- export

### Filter Options

Recommended filters:

- status
- language
- template
- recently updated

---

## 4. Master Profile Editor

### Purpose

Allow the user to maintain the reusable professional profile from which resume versions are created.

### Layout

A practical layout is:

- left navigation for profile sections
- main form/content area
- optional save state indicator

### Supported Sections

- Personal Details
- Professional Summary
- Work Experience
- Education
- Projects
- Skills
- Certifications
- Languages
- Additional Experience
- Custom Sections

### Personal Details Fields

- full name
- headline
- email
- phone
- city
- country
- LinkedIn
- GitHub
- portfolio
- additional links

### Work Experience UI

Each work experience item should support:

- company
- role
- location
- employment type
- dates
- current role toggle
- description
- technologies
- bullet points
- reorder
- delete

### Education UI

Each education entry should support:

- institution
- degree
- field of study
- dates
- GPA optional
- honors optional
- description or bullets

### Projects UI

Each project should support:

- name
- subtitle
- description
- impact
- technologies
- project link
- GitHub link
- dates
- bullet points

### Skills UI

Skills should support:

- grouped categories
- reorder
- add/remove skill
- optional proficiency

### UX Requirements

- easy add/remove item behavior
- inline validation
- clean repeatable item cards
- reordering where useful
- save feedback or auto-save

---

## 5. Resume Builder

### Purpose

This is the core screen for editing a specific resume version.

### Recommended Layout

Three-panel layout:

- left panel: structure panel
- center panel: content editor
- right panel: live preview

### 5.1 Structure Panel

Purpose:

- show resume sections
- allow section ordering
- allow show/hide toggles
- allow adding new sections
- allow removing optional sections

Displayed items may include:

- Personal Details
- Summary
- Experience
- Education
- Projects
- Skills
- Certifications
- Languages
- Additional Experience
- Custom Sections

Interactions:

- drag and drop
- toggle visibility
- select section for editing

### 5.2 Content Editor

Purpose:

- edit the selected section

Depending on section type, the editor should support:

- text fields
- date fields
- bullet lists
- links
- tags/technologies
- repeated item blocks

AI buttons can appear contextually, such as:

- improve wording
- shorten
- expand
- translate
- make more technical
- tailor to job

### 5.3 Live Preview

Purpose:

- show the actual resume appearance in real time

Preview should include:

- current template styling
- current language direction
- page boundaries
- page-like layout
- visible section ordering
- overflow awareness

### Builder Header / Toolbar

Should include:

- resume version name
- save state
- template selector
- language selector
- direction selector if needed
- export button
- open job tailoring panel
- design settings button

---

## 6. Job Tailoring Panel

### Purpose

Allow the user to tailor a resume version to a specific job description.

### Placement

Can be:

- a side drawer
- a modal
- a dedicated tab

### Main Inputs

- pasted job description text
- target role optional
- target company optional

### Main Outputs

- keyword suggestions
- summary suggestion
- section-level wording suggestions
- skill prioritization suggestion
- project highlighting suggestion
- indicative match score

### Actions

- apply summary suggestion
- apply section suggestion
- create new tailored version
- dismiss suggestions

### UX Notes

- suggestions should be grouped by section
- nothing should be applied automatically
- the user should be able to review all changes before accept

---

## 7. Template Gallery

### Purpose

Allow the user to explore and choose templates.

### Layout

Can be:

- dedicated page
- modal gallery
- side panel

### Template Card Should Show

- thumbnail
- template name
- short description
- category
- direction support
- ATS-friendly marker
- intended use such as developer-focused or minimal

### Filters

- category
- ATS-friendly
- supports Hebrew / RTL
- supports English / LTR

### Actions

- preview template
- select template

---

## 8. Design Settings Panel

### Purpose

Allow limited appearance customization while preserving template integrity.

### Controls

- accent color
- font size preset
- spacing density
- section title style
- icon visibility if supported
- compact mode if supported

### UX Principle

This must remain controlled and not turn into a full free-form design editor.

---

## 9. Export Dialog

### Purpose

Allow exporting the resume version.

### Fields / Controls

- export format:
  - PDF
  - DOCX
- custom filename
- page size for PDF
- optional ATS-safe toggle
- optional simplified layout toggle if supported

### States

- ready
- generating
- success
- failure

### Actions

- export
- cancel
- download completed file

---

## 10. Settings Screen

### Purpose

Manage user-level preferences.

### Fields

- profile photo
- full name read-only or semi-editable depending on auth design
- email read-only
- UI language
- default resume language
- default template
- delete account
- export my data

---

## 11. Admin Dashboard

### Purpose

Allow system administrators to monitor and manage the application.

### Main Sections

- overview / stats
- users
- templates
- AI usage
- audit logs

---

## 12. Admin Users Screen

### Purpose

Allow admins to inspect user-level operational data.

### Displayed Columns

- user name
- email
- role
- created date
- number of resumes
- number of exports

### Actions

- search
- filter
- inspect summary-level data
- optionally suspend if implemented later

---

## 13. Admin Templates Screen

### Purpose

Allow admins to manage resume templates.

### Fields Per Template

- name
- slug
- category
- description
- active / inactive
- RTL support
- LTR support
- ATS-friendly
- thumbnail
- renderer key

### Actions

- create template record
- edit metadata
- enable
- disable

---

## 14. Admin AI Usage Screen

### Purpose

Allow admins to monitor AI usage and health.

### Metrics to Show

- total AI actions
- actions by type
- acceptance rate
- failure rate
- usage over time

---

## 15. Admin Audit Logs Screen

### Purpose

Allow admins to inspect important administrative events.

### Log Fields

- admin user
- action
- entity type
- entity id
- timestamp
- metadata summary

---

## 16. UX Design Guidelines

### General Principles

- clean and modern
- productivity-oriented
- minimal visual clutter
- strong support for long-form structured editing
- obvious save and export actions

### Editor Principles

- reduce context switching
- keep preview visible
- keep section navigation obvious
- avoid forcing users into too many steps for simple edits

### Resume-Specific Principles

- template switching must be easy
- language switching must be explicit
- preview should inspire trust in export accuracy
- job tailoring should feel assistive, not intrusive