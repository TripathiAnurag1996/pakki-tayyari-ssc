# Pakki Tayyari

## What This Is

A production-grade exam practice platform for SSC/UPSC aspirants. It allows aspirants to master previous year questions (PYQs) with structured, adaptive practice, timed mock tests, auto-evaluation, and detailed performance analytics.

## Core Value

Master UPSC/SSC PYQs with structured, adaptive practice and actionable analytics to identify weak areas.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] **AUTH-01**: User can register with email and password, auto-creating a profile
- [ ] **AUTH-02**: User can log in and stay logged in across sessions
- [ ] **AUTH-03**: User can log out
- [ ] **PRAC-01**: User can filter questions by Exam, Subject, Subtopic, and Difficulty
- [ ] **PRAC-02**: User can select the number of questions and choose between Practice and Mock mode
- [ ] **PRAC-03**: User can start a practice session which initializes a test session in the database
- [ ] **TEST-01**: User can view questions, select options, and navigate between questions
- [ ] **TEST-02**: In Practice mode, user can check answers immediately and see detailed solutions
- [ ] **TEST-03**: In Mock mode, a countdown timer is enforced and answers are not revealed until submission
- [ ] **TEST-04**: User can see a question palette with status (Not visited, Answered, Skipped)
- [ ] **TEST-05**: User can submit the test session, saving responses and calculating the score
- [ ] **RSLT-01**: User can view a header scorecard with Score, Accuracy, Time Taken, and Counts
- [ ] **RSLT-02**: User can view a subject breakdown and a question-by-question review with correct answers and solutions
- [ ] **STAT-01**: User can view an analytics dashboard with accuracy charts, performance over time, difficulty distribution, and weak subtopics
- [ ] **STAT-02**: User can view a dashboard with recent test sessions and overall stats
- [ ] **DSGN-01**: Application implements a premium, minimal design system using Tailwind and shadcn/ui
- [ ] **LAND-01**: Unauthenticated users can view a landing page with a clear CTA to start practicing

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- [Billing/Payments] — Explicitly constrained to no Stripe or payment integration
- [External Question APIs] — Use only the imported JSON Supabase data
- [Redux/Zustand] — Constrained to use React state + server components + Supabase realtime

## Context

- **Tech Stack:** Next.js 14 (App Router), TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes (serverless)
- **Database/Auth:** Supabase via MCP
- **Package Manager:** pnpm
- **Data Source:** `ssc_cgl_questions.json`

## Constraints

- **[Database]**: Supabase MCP Server — ALL SQL operations, table creation, and inserts must be executed via the Supabase MCP tool, not raw fetch.
- **[Security]**: Service Role Key — Must only be used server-side, never exposed to browser.
- **[Performance]**: Lean Bundle — No heavy libraries beyond Recharts.
- **[Design]**: Mobile-First — Must be fully responsive starting from 375px viewport.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Supabase MCP | Enforces proper DB setup directly within the development loop | — Pending |
| Supabase SSR Auth | Secure, modern standard for Next.js App Router | — Pending |

---
*Last updated: 2026-04-25 after initialization*
