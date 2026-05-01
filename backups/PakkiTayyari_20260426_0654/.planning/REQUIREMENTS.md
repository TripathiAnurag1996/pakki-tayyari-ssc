# Requirements

## v1 Requirements

### Authentication
- [ ] **AUTH-01**: User can register with email and password, auto-creating a profile
- [ ] **AUTH-02**: User can log in and stay logged in across sessions
- [ ] **AUTH-03**: User can log out

### Practice Setup
- [ ] **PRAC-01**: User can filter questions by Exam, Subject, Subtopic, and Difficulty
- [ ] **PRAC-02**: User can select the number of questions and choose between Practice and Mock mode
- [ ] **PRAC-03**: User can start a practice session which initializes a test session in the database

### Test Interface
- [ ] **TEST-01**: User can view questions, select options, and navigate between questions
- [ ] **TEST-02**: In Practice mode, user can check answers immediately and see detailed solutions
- [ ] **TEST-03**: In Mock mode, a countdown timer is enforced and answers are not revealed until submission
- [ ] **TEST-04**: User can see a question palette with status (Not visited, Answered, Skipped)
- [ ] **TEST-05**: User can submit the test session, saving responses and calculating the score

### Results & Analytics
- [ ] **RSLT-01**: User can view a header scorecard with Score, Accuracy, Time Taken, and Counts
- [ ] **RSLT-02**: User can view a subject breakdown and a question-by-question review with correct answers and solutions
- [ ] **STAT-01**: User can view an analytics dashboard with accuracy charts, performance over time, difficulty distribution, and weak subtopics
- [ ] **STAT-02**: User can view a dashboard with recent test sessions and overall stats

### Landing Page & Design
- [ ] **DSGN-01**: Application implements a premium, minimal design system using Tailwind and shadcn/ui
- [ ] **LAND-01**: Unauthenticated users can view a landing page with a clear CTA to start practicing

## v2 Requirements
(None explicitly defined yet)

## Out of Scope
- Billing and payments
- External Question APIs
- Redux/Zustand State Management

## Traceability
*(To be populated by Roadmap)*
