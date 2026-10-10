# InternTrack

A full-stack internship application tracker built with the MERN stack. Keep every opportunity in one place and follow it from wishlist to offer: add applications, update their status, search and filter them, and see live stats on a dashboard.

**Live demo:** https://startupmeu-intern-tracker.vercel.app/

**API health check:** https://startupmeu-intern-tracker.onrender.com/api/health


> The backend runs on a free Render instance, so the first request after a period of inactivity can take up to a minute while it wakes up.


## 📸 Dashboard Preview

<<<<<<< Updated upstream
| Dashboard 1 | Dashboard 2 |
| :---: | :---: |
| ![InternTrack Dashboard 1](./screenshots/dashboard1.png) | ![InternTrack Dashboard 2](./screenshots/dashboard2.png) |

## 📝 Form & Mobile Preview

| Add / Edit Form | Mobile View |
| :---: | :---: |
| ![Add Application Form](./screenshots/form.png) | ![InternTrack Mobile View](./screenshots/mobileview.jpeg) |
=======
|                                      Dashboard 1                                     |                                      Dashboard 2                                     |
| :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------: |
| <img src="./screenshots/dashboard1.png" width="400" alt="InternTrack Dashboard 1" /> | <img src="./screenshots/dashboard2.png" width="400" alt="InternTrack Dashboard 2" /> |

## 📝 Form & Mobile Preview

|                               Add / Edit Form                               |                                      Mobile View                                      |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| <img src="./screenshots/form.png" width="400" alt="Add Application Form" /> | <img src="./screenshots/mobileview.jpeg" width="250" alt="InternTrack Mobile View" /> |

>>>>>>> Stashed changes

## Features

- Create, read, update and delete internship applications
- Seven-stage status workflow: Wishlist, Applied, Assessment, Interview, Offer, Rejected, Withdrawn
- Dashboard cards with live totals (Total, Applied, Interviews, Offers)
- Search by company or role, filter by status, or combine both
- Add/edit modal with client-side validation and server-side error messages shown per field
- Loading, empty and error states
- Responsive layout for desktop and mobile, with a bottom navigation bar on small screens
- Consistent REST API response format with centralized error handling

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, plain CSS, Fetch API, lucide-react icons |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Deployment | Vercel (client), Render (server), MongoDB Atlas (database) |
| AI tool | Kiro |

## Project Structure

```text
startupmeu-intern-tracker/
├── client/
│   └── src/
│       ├── components/     Header, Dashboard, StatsCards, ApplicationFilters,
│       │                   ApplicationList, ApplicationForm, BottomNavigation
│       │                   (each with its own CSS file)
│       ├── hooks/          useApplications.js (data, filters, delete),
│       │                   useApplicationForm.js (add/edit form state)
│       ├── services/       applicationService.js (all API calls)
│       ├── App.jsx         composes Header, Dashboard and the form
│       └── App.css, index.css
└── server/
    ├── config/             db.js (MongoDB connection)
    ├── controllers/        applicationController.js
    ├── middleware/         errorHandler.js
    ├── models/             Application.js (Mongoose schema)
    ├── routes/             applicationRoutes.js
    ├── utils/              apiResponse.js, escapeRegex.js
    ├── .env.example
    └── server.js
```

## Getting Started

### Prerequisites

- Node.js 18 or newer and npm
- A MongoDB database: either a local instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone

```bash
git clone https://github.com/karthikyannabathina/startupmeu-intern-tracker.git
cd startupmeu-intern-tracker
```

### 2. Run the backend

```bash
cd server
npm install
cp .env.example .env      # on Windows: copy .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interntrack
NODE_ENV=development
```

Start it:

```bash
npm run dev     # with nodemon (auto-restart)
# or
npm start
```

The API is now at `http://localhost:5000`.

### 3. Run the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:3000`. In development, Vite proxies `/api` requests to the Express server, so no extra configuration is needed.

### Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `PORT` | server | Port for the API (default 5000) |
| `MONGO_URI` | server | MongoDB connection string |
| `NODE_ENV` | server | `development` or `production` |
| `CLIENT_URL` | server (production) | Allowed frontend origin(s) for CORS, comma-separated |
| `VITE_API_URL` | client (production) | Base URL of the deployed API, no trailing slash |

### Production build

```bash
cd client
npm run build
```

## API Reference

Base path: `/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/applications` | List applications (`?search=` and `?status=` supported) |
| GET | `/applications/stats` | Total and per-status counts |
| GET | `/applications/:id` | Get one application |
| POST | `/applications` | Create an application |
| PUT | `/applications/:id` | Update an application |
| PATCH | `/applications/:id/status` | Update only the status |
| DELETE | `/applications/:id` | Delete an application |
| GET | `/health` | Health check |

Search is a case-insensitive partial match on company and role. Both filters can be combined:

```text
GET /api/applications?search=developer&status=Applied
```

### Response format

```json
{ "success": true, "message": "Applications retrieved successfully", "data": [], "errors": null }
```

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": [{ "field": "company", "message": "Company name is required" }]
}
```

### Data model

| Field | Type | Rules |
| --- | --- | --- |
| `company` | String | Required, max 100 characters |
| `role` | String | Required, max 100 characters |
| `status` | String | One of the seven statuses, default `Wishlist` |
| `appliedDate` | Date | Optional, no default |
| `deadline` | Date | Optional |
| `jobUrl` | String | Optional, must be a valid `http(s)` URL |
| `location` | String | Optional, max 100 characters |
| `salary` | Number | Optional, not negative |
| `notes` | String | Optional, max 2000 characters |

Timestamps (`createdAt`, `updatedAt`) are added automatically.

## Tool Used: Kiro

I used **Kiro** as my AI development tool for this project, working through its chat with one focused prompt per feature. My workflow for every step was:

1. Ask Kiro to propose or explain its plan first (architecture, or "which files will you modify and why").
2. Give tightly scoped instructions: implement only one operation or feature, reuse existing helpers and components, add no dependencies, and leave unrelated code unchanged.
3. Review the diff, run the app and test the feature myself, then commit and push a checkpoint before starting the next prompt.

Partway through the project my Kiro credits ran out, so the final round of bug fixes (task 5 below) was done manually. I have tried to be precise about what the AI did and what I did myself.

## AI Development Experience

### 1. Architecture planning before any code

- **What I asked Kiro:** To analyse the requirements and propose the architecture, folder structures, data model, REST endpoints, components, validation rules and build phases, without creating or modifying any file.
- **What I changed:** I did not accept the proposal as it was. I removed contacts and timeline from the data model, fixed the status list to seven values, removed authentication, pagination and charts from the MVP, and corrected the schema to use `{ timestamps: true }` instead of separate `createdAt`/`updatedAt` fields.
- **Where the final app differs:** Kiro proposed Axios, React Context and React Router. I built the frontend with the native Fetch API and component state instead, because that was enough for this scope and avoided extra dependencies.

### 2. Backend API, one operation at a time

- **What I asked Kiro:** To build the backend in phases: project foundation (config, model, error handler, response helpers), then read (list and by id), create, update, status update, delete and statistics. Each prompt covered exactly one operation, listed the validation and status codes I wanted, and said what not to touch.
- **What I checked:** Each endpoint was tested before the next phase. For example, in the statistics prompt I required that `/stats` be registered before `/:id`, so that "stats" is never treated as an application id, and that statuses with no applications return `0`.
- **Outcome:** A controller/route/model/middleware structure with a consistent `{ success, message, data, errors }` response format.

### 3. Frontend built incrementally

- **What I asked Kiro:** The Vite + React foundation, then a dashboard shell with placeholder values and no fake data, then API integration, then Add, Edit and Delete as separate prompts. For the integration and Add features I asked it to list the files it would change and why before writing code.
- **Constraints I set:** Native `fetch` only, no new dependencies, all network code in `applicationService.js`, and the data and form-visibility state kept in one place (later refactored into the `useApplications` and `useApplicationForm` hooks, with a separate `Dashboard` component). For Edit, I required that the existing `ApplicationForm` be reused for both modes rather than duplicated, that the entered data stay in the form when an update fails, and that search and status filters are preserved after an update.

### 4. UI review first, then controlled polish

- **What I asked Kiro:** A review-only pass first (problems found, recommended changes, files affected, what must not change), then implementation of only the changes I approved, and finally a visual refinement towards a clean SaaS-style dashboard.
- **Guardrails I added:** Because the Edit form was already working, my prompts explicitly listed the logic that must not be overwritten (`initialData`, `isEditing`, `buildInitialFields`, `toDateInputValue`, prefilled fields and dynamic title/button) and the modal scroll fix (`.modal` with `overflow: hidden`, `.app-form` with `overflow-y: auto; min-height: 0`).
- **Outcome:** Status badges, a cleaner list layout, better empty/loading/error states, Escape-to-close for the modal and a responsive layout, with no change to behaviour.

### 5. Debugging and hardening after review (done manually)

After the features were complete I reviewed the code myself and fixed several bugs without Kiro, because my credits had run out. I traced each one to its cause, fixed it in a separate commit and tested the exact failing input:

- **Search crash:** user input went straight into `new RegExp()`, so `(` or `c++` returned a 500. An earlier commit had added the `escapeRegex` helper and its import but never called it, so the bug was still there. I caught this by re-reading the diff and re-testing with `(`, then applied the helper at the call site.
- **Fields could not be cleared on edit:** the form removed empty fields from the PUT payload, so old values stayed in MongoDB. Edits now send `null` for cleared fields. I confirmed this in the browser's Network tab.
- **Hidden validation messages and strict URL check:** the client showed only "Validation failed", and the URL regex rejected real links containing `#`, `+` or `~`. I added a shared request helper that surfaces field errors, and switched to the built-in `URL` constructor on both client and server.
- **Wishlist items showed a fake "applied" date** because `appliedDate` defaulted to today. It now has no default.

**What I learned:** AI-generated changes can look finished while being only partly applied. Small, scoped prompts made each change easy to review, and reading every diff and testing the real failing input caught what the AI summary did not.

## Bugs Found and Fixed

| Bug | Fix | Commit |
| --- | --- | --- |
| Search with `(` or `c++` crashed with a 500 | Escape user input before building the RegExp | `c41993d` |
| Optional fields could not be cleared on edit | Send `null` on edit, omit on create | `03cd3be` |
| Field-level validation errors were hidden | Shared request helper surfaces `errors[]` | `18aca25` |
| Valid job URLs rejected; client and server rules differed | `URL` constructor on both sides, auto-add `https://` | `93f2703` |
| Wishlist items showed today as the applied date | `appliedDate` has no default | `93f2703` |

## Known Limitations and Future Work

- No authentication yet: all data is shared, so this is a single-user tracker. JWT login with per-user data is the next step.
- No pagination or sorting on the list.
- Status can only be changed through the edit form; the `PATCH /status` endpoint is ready for an inline status dropdown.
- Deadlines and job links are stored but not yet shown in the list.
- No automated tests yet (Jest and Supertest for the API are planned).

## Author

Karthik Yannabathina
[GitHub](https://github.com/karthikyannabathina) · karthikyannabathina4444@gmail.com
