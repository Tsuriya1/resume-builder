# Resume Builder Web App – Product Specification

## 1. Overview

Resume Builder is a web application that allows individual job seekers to create, manage, tailor, and export professional resumes.

The system focuses on:

- structured resume writing
- multiple resume versions
- AI-assisted wording improvements
- tailoring resumes to specific job descriptions
- visual templates
- bilingual support (English and Hebrew)
- exporting resumes to PDF and DOCX
- Google authentication
- an admin panel for system management

The product is especially optimized for technical professionals such as software engineers, developers, and data professionals, but remains flexible for other industries.

---

# 2. Product Goals

## 2.1 Primary Goal

Enable users to create high-quality resumes quickly while maintaining multiple versions tailored to specific job opportunities.

## 2.2 Secondary Goals

The system should:

- simplify resume creation
- improve resume wording and professionalism
- enable easy job-specific tailoring
- allow users to maintain multiple resume variants
- provide visually attractive resume templates
- produce export-ready documents for employers

---

# 3. Target Users

## Primary Audience

Individual job seekers.

Examples:

- students
- junior developers
- experienced engineers
- professionals changing jobs

## Typical Use Cases

Users want to:

- create their first resume
- improve an existing resume
- tailor a resume for specific roles
- manage multiple resume versions
- export resumes to send to employers

---

# 4. Core Product Principles

## 4.1 Structured Editing

Resumes should be edited using structured sections rather than free-form document editing.

Benefits:

- consistent formatting
- easier export
- easier template rendering
- easier job tailoring

## 4.2 Separation of Content and Design

Resume content is stored independently from visual templates.

Templates define the visual layout.

This allows switching templates without rewriting content.

## 4.3 Version-Based Workflow

Users manage multiple resume versions rather than editing a single document.

Each version may differ by:

- job focus
- wording
- selected sections
- template
- language

## 4.4 AI as Assistance

AI assists with rewriting, improving, and tailoring text.

Users always approve final changes.

---

# 5. Core Features

## Authentication

- Google login only
- no password-based accounts

## Resume Creation

Users can:

- create new resume versions
- duplicate existing versions
- edit resume sections
- reorder sections
- hide or show sections

## Resume Sections

Supported sections include:

- Personal Details
- Professional Summary
- Work Experience
- Education
- Projects
- Skills
- Certifications
- Languages
- Volunteer / Additional Experience
- Custom Sections

## Version Management

Users can:

- create resume versions
- duplicate versions
- rename versions
- archive versions
- delete versions

## Template System

Users can:

- choose resume templates
- preview templates
- switch templates

Templates determine:

- layout
- typography
- spacing
- colors
- section styling

## AI Assistance

AI can help with:

- rewriting text
- improving bullet points
- grammar correction
- shortening or expanding content
- translating between languages
- tailoring resume to job descriptions

AI suggestions are shown before being applied.

## Job Tailoring

Users can paste a job description.

The system analyzes:

- keywords
- required skills
- responsibilities

The system suggests:

- summary improvements
- improved bullet points
- skills prioritization

Users may apply suggestions selectively.

## Export

Supported formats:

- PDF
- DOCX

Export should preserve:

- layout
- section structure
- correct language direction

## Language Support

Supported languages:

- English
- Hebrew

Requirements:

- full RTL support
- full LTR support
- mixed text compatibility

## Live Preview

Users can see a real-time preview of the resume while editing.

Preview updates automatically when content changes.

---

# 6. System Entities

## User

Represents an authenticated person.

Attributes include:

- name
- email
- Google ID
- preferences
- language settings

## Master Profile

A structured repository of all professional information for the user.

Contains:

- contact details
- experience
- education
- projects
- skills

The master profile allows reuse across multiple resume versions.

## Resume Version

A specific resume document derived from the master profile.

Contains:

- selected sections
- edited text
- selected template
- job tailoring
- language

Each version is stored independently.

---

# 7. Templates

Templates define visual presentation.

Each template includes:

- layout style
- column configuration
- typography rules
- color palette
- spacing rules
- section header styles

Templates may support:

- RTL
- LTR
- both directions

Templates may also be marked as:

- ATS-friendly
- developer-focused
- modern
- minimal

---

# 8. AI Capabilities

AI can perform the following actions:

### Field Level

- rewrite text
- improve clarity
- shorten text
- expand text
- correct grammar

### Section Level

- improve bullet points
- convert responsibilities into achievements
- remove repetition

### Resume Level

- generate summary
- tailor resume to job description
- suggest skill prioritization

### Translation

Translate content between:

- English
- Hebrew

AI must not fabricate experience or credentials.

---

# 9. Export Requirements

## PDF Export

Requirements:

- consistent layout
- correct page breaks
- proper font rendering
- RTL/LTR support

## DOCX Export

Requirements:

- editable document
- preserved headings and bullets
- compatibility with Microsoft Word

---

# 10. Admin Capabilities

Admins can manage:

- templates
- users
- system settings
- AI usage metrics

Admins should not access user resume content unless explicitly required.

---

# 11. Security

Authentication:

- Google OAuth

Data protection:

- HTTPS required
- encrypted data transport

User privacy:

- users can delete their account
- users can delete resumes
- minimal data collection

---

# 12. MVP Scope

The MVP should include:

- Google authentication
- dashboard
- master profile editor
- resume version management
- structured resume editor
- template selection
- PDF export
- DOCX export
- AI rewrite tools
- job description tailoring
- Hebrew and English support
- admin panel

---

# 13. Future Extensions

Possible future features include:

- LinkedIn import
- resume file import
- public resume links
- collaboration
- cover letter generation
- ATS scoring
- analytics
- template marketplace