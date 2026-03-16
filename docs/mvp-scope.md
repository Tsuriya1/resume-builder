# MVP Scope

## Purpose

This document defines the exact scope of the first working version of the Resume Builder system.

The MVP should be implementation-focused and avoid unnecessary advanced features.
Its purpose is to deliver a usable end-to-end product for individual job seekers.

---

## Included in MVP

### 1. Authentication

The MVP must support:

- Google OAuth login only
- user session management
- logout
- automatic user creation on first login

The MVP should not include:

- email/password login
- forgot password flows
- manual registration

---

### 2. User Profile and Preferences

The MVP must support:

- creating a user record after Google login
- storing user identity fields such as:
  - full name
  - email
  - avatar URL
  - role
- storing preferences such as:
  - UI language
  - default resume language
  - default template

---

### 3. Master Profile

The MVP must support a single master professional profile per user.

The master profile should include:

- personal details
- professional headline
- professional summary
- city
- country
- phone number
- LinkedIn URL
- GitHub URL
- portfolio URL
- additional links

The master profile should also support structured sub-sections:

- work experiences
- education records
- projects
- skills
- certifications
- languages
- volunteer/additional experience
- custom sections

Users must be able to create, update, delete, and reorder items where relevant.

---

### 4. Resume Versions

The MVP must support multiple resume versions per user.

Each resume version must support:

- custom version name
- selected template
- language
- direction (LTR / RTL)
- target role
- target company
- optional job description text
- status:
  - draft
  - ready
  - archived
- independent content snapshot

Users must be able to:

- create a resume version from the master profile
- duplicate an existing version
- rename a version
- archive a version
- delete a version
- edit the content of a version independently of the master profile

---

### 5. Structured Resume Editor

The MVP must use a structured editor and not a free-form document editor.

The editor must support:

- section-based editing
- drag-and-drop section ordering
- show/hide sections
- editing section content
- editing bullet points
- auto-save
- validation feedback

The editor should support these section types:

- Personal Details
- Professional Summary
- Work Experience
- Education
- Projects
- Skills
- Certifications
- Languages
- Additional Experience
- Custom Section

---

### 6. Live Resume Preview

The MVP must include a live preview panel.

The preview must:

- update automatically as the user edits content
- reflect the currently selected template
- reflect selected language direction
- show page boundaries
- help the user understand the final export layout

Preview must support both:

- English / LTR resumes
- Hebrew / RTL resumes

---

### 7. Template System

The MVP must include between 5 and 8 templates.

Recommended initial categories:

- ATS Simple
- Modern Developer
- Data / Engineering
- Minimal Professional
- Executive Clean
- Hebrew Professional

Each template must define:

- layout type
- typography settings
- spacing rules
- section styles
- column layout support
- direction support (RTL / LTR)

At least some templates must explicitly target technical candidates such as developers and engineers.

---

### 8. Design Customization

The MVP should allow controlled design customization only.

Supported controls:

- template selection
- accent color selection
- font size preset
- spacing density preset
- section title style
- show/hide icons where supported

The MVP should not include:

- arbitrary free-form drag positioning
- arbitrary font upload
- arbitrary layout editing
- full document-design mode like Word

---

### 9. AI Assistance

The MVP must include basic AI-powered assistance.

Supported actions:

- rewrite a field
- rewrite a section
- improve bullet points
- generate or improve professional summary
- shorten text
- expand text
- make text more professional
- translate between English and Hebrew
- tailor a resume version to a job description

Important rules:

- AI suggestions must be shown before apply
- the user must explicitly accept changes
- AI must not silently overwrite content
- AI must not fabricate experience, employers, degrees, or metrics

---

### 10. Job Tailoring

The MVP must support tailoring a resume to a pasted job description.

The system should analyze:

- keywords
- required skills
- responsibilities
- seniority indicators

The system should suggest:

- summary improvements
- modified experience bullets
- skill prioritization
- project prioritization

The system may also provide:

- an indicative match score
- missing keyword suggestions

This score is advisory only and should not be presented as a guaranteed ATS result.

---

### 11. Export

The MVP must support export to:

- PDF
- DOCX

Export requirements:

- preserve resume structure
- preserve selected template styling as much as possible
- preserve RTL/LTR correctness
- preserve bullet formatting
- preserve section order

The export flow must support:

- export button from resume version
- custom file name
- export success and error feedback

---

### 12. Bilingual Support

The MVP must support:

- Hebrew
- English

The system must support:

- LTR documents
- RTL documents
- mixed-content rendering
- proper formatting of URLs, dates, and contact fields

The UI itself should be capable of localization as well, but full multi-language UI completeness can be secondary to correct resume content rendering.

---

### 13. Dashboard

The MVP must include a dashboard that allows users to:

- view all resume versions
- create a new version
- duplicate a version
- archive a version
- delete a version
- export a version
- open a version for editing
- navigate to the master profile editor

---

### 14. Admin Panel

The MVP must include a basic admin panel.

Admin capabilities must include:

- viewing users
- viewing user counts
- viewing number of resumes
- viewing export counts
- managing templates
- enabling/disabling templates
- viewing AI usage metrics
- viewing audit logs for admin activity

The MVP admin panel does not need advanced business intelligence or billing features.

---

## Explicitly Out of Scope for MVP

The following features should not be implemented in the first version unless there is extra time:

- LinkedIn import
- import from existing resume files
- public resume sharing links
- collaborative editing
- recruiter review mode
- billing / subscription plans
- advanced ATS scoring engine
- visual template builder
- cover letter generation
- analytics for end users
- multiple master profiles per user
- manual account registration
- social sharing

---

## MVP Success Criteria

The MVP is considered successful if a user can:

1. sign in with Google
2. create a master profile
3. create multiple resume versions
4. edit resume sections comfortably
5. choose a template
6. tailor the resume to a pasted job description
7. preview the result live
8. export to PDF
9. export to DOCX

Additionally, an admin must be able to:

1. access the admin panel
2. manage templates
3. inspect basic usage data