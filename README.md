# agile-develop

## Portfolio Task B2 - Trello Board Implementation

Use this as the exact content model for your Trello board.

### 1) Board setup

- **Board name:** `Portfolio Task B2 - Music Library Prototype`
- **Lists (minimum 3):**
  - `To Do`
  - `Doing`
  - `Done`

### 2) Labels / categories

Create and apply labels consistently:

- `API`
- `CLIENT`
- `DESIGN`
- `TESTING`
- `DOCS`
- `SCM`
- `VIDEO`

### 3) To Do cards (user stories with acceptance criteria + functionality notes)

Add these cards to **To Do**.

---

#### Card 1 - API Project Setup
**User story:**  
As a junior developer, I want to set up a Node/Express API project with npm so that the team can run and extend it easily.

**Acceptance criteria:**
- Node 20.10.0 LTS is used.
- npm scripts exist for starting the API.
- Base Express app runs locally without errors.
- API responses are JSON.

**Functionality notes:**
- Use consistent project structure (routes/controllers/services/db).
- Add `.gitignore` and keep `node_modules` excluded.
- Apply label: `API`.

---

#### Card 2 - Database Schema + Seed Data
**User story:**  
As a user, I want realistic music library data so I can test and demo the API meaningfully.

**Acceptance criteria:**
- SQLite (or approved equivalent local DB) is integrated.
- Minimum **20 realistic records** are present.
- Data includes typical fields (e.g., title, artist, genre, year).
- Database file is included in deliverables.

**Functionality notes:**
- Keep schema simple and queryable for CRUD operations.
- Seed data should reflect realistic values, not placeholders.
- Apply label: `API`.

---

#### Card 3 - CRUD Endpoints
**User story:**  
As a client app developer, I want full CRUD endpoints so the app can create, view, update, and delete records.

**Acceptance criteria:**
- `GET` endpoint(s) return records as JSON.
- `POST` creates a new record and returns result/status.
- `PUT` updates an existing record and returns result/status.
- `DELETE` removes a record and returns result/status.
- Error handling returns clear JSON messages.

**Functionality notes:**
- Use appropriate HTTP status codes.
- Validate payloads and handle not-found cases.
- Apply label: `API`.

---

#### Card 4 - API Documentation (APIDOC)
**User story:**  
As a reviewer, I want clear generated API documentation so I can test endpoints quickly.

**Acceptance criteria:**
- Every endpoint has documentation comments.
- APIDOC site is generated successfully.
- Generated APIDOC output is included in submission.
- Endpoint parameters/responses are clearly described.

**Functionality notes:**
- Keep docs synchronized with implementation.
- Include commands/scripts to regenerate docs.
- Apply labels: `API`, `DOCS`.

---

#### Card 5 - Lo-fidelity Wireframes
**User story:**  
As a designer/developer, I want lo-fi wireframes so I can validate layout and CRUD flow before high-fidelity design.

**Acceptance criteria:**
- All core screens are sketched.
- Wireframes show Create/Read/Update/Delete flow.
- Navigation between screens is represented.
- Wireframes align with API capabilities.

**Functionality notes:**
- Focus on layout and user journey, not visual polish.
- Keep artifacts ready for screencast.
- Apply label: `DESIGN`.

---

#### Card 6 - High-fidelity Figma Interactive Prototype
**User story:**  
As a stakeholder, I want an interactive high-fidelity prototype so I can preview complete app behavior.

**Acceptance criteria:**
- All CRUD-related screens are designed.
- Realistic data and high-quality imagery are used.
- Prototype mode supports navigation between screens.
- Design mode and prototype mode are both demonstrable.

**Functionality notes:**
- Keep naming conventions consistent across frames/components.
- Ensure clickable flows match final client behavior.
- Apply label: `DESIGN`.

---

#### Card 7 - Client App GET Integration
**User story:**  
As an end user, I want to view data from the API in the client so I can verify integration works.

**Acceptance criteria:**
- Client starts locally with clear instructions.
- At least one API `GET` endpoint is consumed.
- Returned data is presented cleanly in UI.
- Basic error state is handled and displayed.

**Functionality notes:**
- Keep setup straightforward for tutor review.
- Ensure API URL configuration is clear.
- Apply label: `CLIENT`.

---

#### Card 8 - Functional Tests
**User story:**  
As a tutor, I want functional tests so I can verify expected behavior reliably.

**Acceptance criteria:**
- Functional tests exist using TestCafe (or equivalent).
- Tests cover at least key happy-path behavior.
- Tests can be run via documented command(s).
- Test output clearly indicates pass/fail.

**Functionality notes:**
- Keep tests stable and reproducible locally.
- Add test execution details to README.
- Apply labels: `TESTING`, `CLIENT`.

---

#### Card 9 - Git / SCM Workflow
**User story:**  
As a reviewer, I want clear commit history and branching so I can track development process and decisions.

**Acceptance criteria:**
- Feature branches are used for meaningful changes.
- Commit messages are descriptive and frequent.
- `.git` history demonstrates progressive delivery.
- Final state is clean and organized for review.

**Functionality notes:**
- Avoid large single commits for unrelated work.
- Keep commit timestamps aligned with workflow progression.
- Apply label: `SCM`.

---

#### Card 10 - Screencast Production
**User story:**  
As an assessor, I want a narrated screencast with webcam so I can evaluate the full solution and reflection.

**Acceptance criteria:**
- Includes narration and in-screen webcam.
- Demonstrates Trello board and card back details.
- Shows Figma designs and prototype interaction.
- Shows API/client functionality and tests.
- Includes retrospective/reflection.

**Functionality notes:**
- Rehearse demo flow before recording.
- Keep all required artifacts visible and readable.
- Apply label: `VIDEO`.

---

#### Card 11 - Final Packaging and Submission
**User story:**  
As a tutor, I want the exact required folder structure so I can run and assess the project quickly.

**Acceptance criteria:**
- `cet252/API` contains API code, DB, package.json, tests, `.git`, `.gitignore`, dependencies (not `node_modules`).
- `cet252/CLIENT` contains client code, README, tests, dependencies.
- `APIDOC` generated site is included.
- Final `cet252` folder is zipped for submission.

**Functionality notes:**
- Verify paths and required files before zipping.
- Confirm excluded items are not bundled.
- Apply labels: `DOCS`, `SCM`.

### 4) Workflow usage during development

- Move cards from **To Do** -> **Doing** when actively worked on.
- Only move cards to **Done** when all acceptance criteria are satisfied.
- Add checklists per card for sub-tasks if needed.
- Use due dates for high-risk items (API CRUD, client integration, screencast).
- Keep comments on cards as a mini dev log for evidence.

### 5) Definition of done (board-level)

A card is done only when:
- Acceptance criteria are all met.
- Related files/artifacts are created and reviewable.
- Evidence is available for screencast/demo.
