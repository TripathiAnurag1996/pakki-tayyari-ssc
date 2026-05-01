# Roadmap

**10 phases** | **17 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 0 | Project Scaffold | Initialize Next.js project with dependencies and UI setup | None | 1 |
| 1 | Supabase Setup | Create tables, RLS, and functions via MCP | None | 2 |
| 2 | Data Import | Insert questions JSON via MCP | None | 2 |
| 3 | Authentication Pages | Build login, register, and callback routes | AUTH-01, AUTH-02, AUTH-03 | 2 |
| 5 | API Routes | Build backend routes for sessions and questions | PRAC-01, PRAC-03, TEST-05 | 2 |
| 6 | Middleware | Implement auth protection and session refresh | AUTH-02 | 1 |
| 8 | Types & Utilities | Define TS interfaces and helper functions | None | 1 |
| 4 | Core App Pages | Build practice, test, results, analytics, and dashboard | PRAC-02, TEST-01, TEST-02, TEST-03, TEST-04, RSLT-01, RSLT-02, STAT-01, STAT-02 | 3 |
| 7 | UI Design System | Refine premium minimal design system | DSGN-01 | 2 |
| 10| Landing Page | Build unauthenticated landing page via Stitch | LAND-01 | 1 |

*(Note: Phase execution order reflects the specific constraints in the master prompt: 0, 1, 2, 3, 5, 6, 8, 4, 7, 10)*

## Phase Details

### Phase 0: Project Scaffold
Goal: Initialize Next.js project with dependencies and UI setup
Requirements: None
Success criteria:
1. `pnpm create next-app` completes and shadcn/ui components are added
**UI hint**: no

### Phase 1: Supabase Setup
Goal: Create tables, RLS, and functions via MCP
Requirements: None
Success criteria:
1. Tables (`questions`, `profiles`, `test_sessions`, `responses`, `user_stats`) created
2. RLS policies and trigger functions active
**UI hint**: no

### Phase 2: Data Import
Goal: Insert questions JSON via MCP
Requirements: None
Success criteria:
1. All 100 questions imported into the database
2. Subject counts map correctly
**UI hint**: no

### Phase 3: Authentication Pages
Goal: Build login, register, and callback routes
Requirements: AUTH-01, AUTH-02, AUTH-03
Success criteria:
1. User can register an account
2. User can log in successfully
**UI hint**: yes

### Phase 5: API Routes
Goal: Build backend routes for sessions and questions
Requirements: PRAC-01, PRAC-03, TEST-05
Success criteria:
1. Routes fetch correct subjects/subtopics/questions
2. Submit route correctly updates session score
**UI hint**: no

### Phase 6: Middleware
Goal: Implement auth protection and session refresh
Requirements: AUTH-02
Success criteria:
1. Unauthenticated users cannot access `/dashboard` or `/practice`
**UI hint**: no

### Phase 8: Types & Utilities
Goal: Define TS interfaces and helper functions
Requirements: None
Success criteria:
1. Types match Supabase schema
**UI hint**: no

### Phase 4: Core App Pages
Goal: Build practice, test, results, analytics, and dashboard
Requirements: PRAC-02, TEST-01, TEST-02, TEST-03, TEST-04, RSLT-01, RSLT-02, STAT-01, STAT-02
Success criteria:
1. User can take a practice test
2. User can take a mock test with timer
3. Results and analytics render correctly based on session data
**UI hint**: yes

### Phase 7: UI Design System
Goal: Refine premium minimal design system
Requirements: DSGN-01
Success criteria:
1. Color palette and typography applied across all components
2. fully responsive on mobile
**UI hint**: yes

### Phase 10: Landing Page
Goal: Build unauthenticated landing page via Stitch
Requirements: LAND-01
Success criteria:
1. Premium UI with "Start Practice" CTA
**UI hint**: yes
