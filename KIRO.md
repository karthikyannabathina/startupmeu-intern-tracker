\# Kiro Development Documentation



\## Project



\*\*InternTrack\*\* — Internship Application Tracking Dashboard



InternTrack is a MERN-stack web application created for the StartupMeu Software Engineer Intern assessment.



The application allows users to create, manage, search, filter, and track internship applications through different stages of the application process.



\---



\## 1. Purpose of Using Kiro



Kiro was used as an AI-assisted development tool during the implementation and refinement of InternTrack.



The goal was to use AI assistance for development productivity while keeping implementation decisions, verification, debugging, and final validation under developer control.



Kiro was used particularly for:



\* Project inspection

\* Development guidance

\* Code review and implementation review

\* Frontend UI refinement

\* CSS/UI debugging

\* Responsive UI refinement

\* Project-level review and recap



\---



\## 2. Actual Development Workflow



The development process was iterative.



The project was implemented feature by feature rather than generating the entire application in one step.



The major development stages were:



1\. Backend project foundation

2\. Application creation API

3\. Application update API

4\. Application status update API

5\. Application deletion API

6\. Application statistics API

7\. React frontend foundation

8\. Dashboard shell

9\. API integration

10\. Application form

11\. Application editing

12\. Complete CRUD functionality

13\. UI refinement and responsive improvements

14\. Final documentation



Kiro was used during the development/review process to inspect the project, reason about implementation details, identify refinement opportunities, and improve the frontend presentation.



\---



\## 3. Backend Development



The backend was built using Node.js, Express, MongoDB, and Mongoose.



The backend provides:



\* Application CRUD

\* Dedicated status updates

\* Application statistics

\* Search

\* Status filtering

\* Validation

\* Centralized error handling

\* Consistent API responses



Kiro was used as a development/review assistant around the implementation and structure of these features.



The final implementation uses:



```text

Routes

&#x20;  ↓

Controllers

&#x20;  ↓

Mongoose Model

&#x20;  ↓

MongoDB

```



The developer reviewed the resulting API behavior and tested the endpoints during development.



\---



\## 4. Frontend Development



The frontend uses React and Vite.



The application was divided into reusable components including:



\* `Header`

\* `StatsCards`

\* `ApplicationFilters`

\* `ApplicationList`

\* `ApplicationForm`



API communication was separated into:



```text

client/src/services/applicationService.js

```



The main application state is coordinated from `App.jsx`.



Kiro was used during frontend development and refinement to review the UI structure and improve the dashboard presentation.



\---



\## 5. UI Refinement



A significant part of the Kiro-assisted work involved reviewing and refining the dashboard UI.



The UI was refined toward a clean SaaS-style dashboard with:



\* Neutral background

\* White content surfaces

\* Clear typography

\* Blue primary actions

\* Status badges

\* Statistics cards

\* Improved application list layout

\* Responsive behavior

\* Improved buttons

\* Loading states

\* Empty states

\* Error states

\* Mobile-friendly layout



The application list was also refined so that company, status, role, location, and application date have clear visual separation.



\---



\## 6. Modal and Form Refinement



The application form uses a modal for both creating and editing applications.



During UI refinement, the modal behavior was adjusted so that:



\* The modal itself does not become the scrolling container.

\* The form content scrolls internally.

\* The modal header remains fixed.

\* The layout remains usable on smaller screens.



The important layout behavior is:



```css

.modal {

&#x20; overflow: hidden;

&#x20; display: flex;

&#x20; flex-direction: column;

}



.app-form {

&#x20; overflow-y: auto;

&#x20; min-height: 0;

}

```



This was part of the frontend refinement process.



\---



\## 7. Add and Edit Workflow



The application form was designed to support both creation and editing.



The same form component is reused.



Conceptually:



```text

No initial application

&#x20;       ↓

Create mode



Existing application

&#x20;       ↓

Edit mode

```



When editing, existing MongoDB date values are converted into the format expected by HTML date inputs.



The form also handles optional values and client-side validation before submitting data to the backend.



\---



\## 8. Delete Workflow



The delete workflow was refined so that the UI tracks the specific application currently being deleted.



Instead of using one global boolean, the application tracks the application ID.



This allows:



\* Only the selected row to show the deleting state.

\* Other rows to remain usable.

\* The delete button to display `Deleting…`.

\* Edit/delete actions for the selected row to be disabled during deletion.



The developer verified the delete behavior against the backend API.



\---



\## 9. Search and Filtering



InternTrack supports:



\* Search by company

\* Search by role

\* Status filtering

\* Combined search and status filtering



The frontend sends the search/filter state to the backend.



The backend performs case-insensitive matching against the relevant fields.



This keeps the filtering logic connected to the persistent MongoDB data rather than filtering only an already-loaded frontend list.



\---



\## 10. Dashboard Statistics



The dashboard displays:



\* Total applications

\* Applied applications

\* Interview applications

\* Offer applications



The backend provides a dedicated statistics endpoint.



The statistics implementation uses MongoDB aggregation/counting logic and ensures that supported statuses can be represented even when their count is zero.



The frontend refreshes statistics after application mutations so that the dashboard remains synchronized with the application list.



\---



\## 11. Validation and Error Handling



The backend uses Mongoose schema validation.



The implementation also includes:



\* Status enum validation

\* Required field validation

\* URL validation

\* Salary validation

\* ObjectId validation

\* Update validation

\* Centralized error handling



The developer tested invalid inputs and API error cases during development.



\---



\## 12. Developer Review and Verification



Kiro was not treated as an authority for the final implementation.



AI-assisted suggestions were reviewed by the developer before being accepted.



The developer remained responsible for:



\* Choosing the final architecture

\* Reviewing code changes

\* Testing API behavior

\* Testing CRUD operations

\* Checking validation

\* Reviewing UI behavior

\* Fixing issues found during testing

\* Deciding which changes should be committed



The project was developed incrementally and changes were verified before being considered complete.



\---



\## 13. AI-Assisted Development Principles



The project followed these principles while using Kiro:



\### AI assistance, not AI replacement



Kiro was used to accelerate development and provide suggestions, but final implementation decisions remained with the developer.



\### Verify before accepting



Suggestions were reviewed against the existing codebase before being incorporated.



\### Preserve working functionality



Existing working features were preserved while new functionality and UI improvements were introduced.



\### Test actual behavior



API behavior and frontend functionality were checked during development instead of assuming that generated or suggested code was correct.



\### No fabricated AI contribution



This document intentionally does not claim that Kiro wrote or implemented functionality unless that contribution can be supported by the actual development context.



\---



\## 14. Limitations of This Documentation



This document describes Kiro usage at the level that can be supported by the available project development context.



It intentionally does not fabricate:



\* Exact historical prompts that are no longer available

\* Exact Kiro responses

\* Token or credit usage

\* Screenshots of Kiro

\* Actions that cannot be verified

\* Development work performed entirely without Kiro



This distinction is important because the purpose of the documentation is to accurately describe AI-assisted development rather than exaggerate AI involvement.



\---



\## 15. Final Summary



Kiro was used as an AI-assisted development and review tool during the creation of InternTrack.



Its involvement was primarily focused on development guidance, project inspection, frontend refinement, debugging/refinement, and project-level review.



The final application was reviewed and tested by the developer, who remained responsible for the architecture, implementation decisions, validation, and final code.



