\# InternTrack



InternTrack is a full-stack internship application tracking dashboard built with the MERN stack.



It helps users keep track of internship opportunities throughout the application process, from wishlist to offer or rejection. Applications are stored persistently in MongoDB and can be created, updated, searched, filtered, and deleted through a REST API.



\## Features



\* Dashboard with live application statistics

\* Create internship applications

\* Edit existing applications

\* Delete applications with confirmation

\* Seven-stage application status workflow

\* Search applications by company or role

\* Filter applications by status

\* Combined search and status filtering

\* Form validation

\* MongoDB persistence

\* REST API

\* Centralized backend error handling

\* Loading states

\* Empty states

\* Error states

\* Responsive SaaS-style UI

\* Accessible modal application form

\* Mobile-friendly layout



\### Application Statuses



\* Wishlist

\* Applied

\* Assessment

\* Interview

\* Offer

\* Rejected

\* Withdrawn



\## Tech Stack



\### Frontend



\* React 18

\* Vite

\* JavaScript

\* HTML

\* CSS

\* Native Fetch API



\### Backend



\* Node.js

\* Express.js

\* MongoDB

\* Mongoose



\### Development



\* Git

\* GitHub

\* Kiro



\## Project Structure



```text

startupmeu-intern-tracker/

│

├── client/

│   ├── src/

│   │   ├── components/

│   │   │   ├── ApplicationFilters.jsx

│   │   │   ├── ApplicationForm.jsx

│   │   │   ├── ApplicationList.jsx

│   │   │   ├── Header.jsx

│   │   │   └── StatsCards.jsx

│   │   │

│   │   ├── services/

│   │   │   └── applicationService.js

│   │   │

│   │   ├── App.jsx

│   │   ├── App.css

│   │   └── index.css

│   │

│   ├── package.json

│   └── vite.config.js

│

├── server/

│   ├── config/

│   │   └── db.js

│   │

│   ├── controllers/

│   │   └── applicationController.js

│   │

│   ├── middleware/

│   │   └── errorHandler.js

│   │

│   ├── models/

│   │   └── Application.js

│   │

│   ├── routes/

│   │   └── applicationRoutes.js

│   │

│   ├── utils/

│   │   └── apiResponse.js

│   │

│   ├── .env.example

│   ├── package.json

│   └── server.js

│

├── KIRO.md

└── README.md

```



\## API Endpoints



Base URL:



```text

http://localhost:5000/api

```



| Method | Endpoint                   | Description               |

| ------ | -------------------------- | ------------------------- |

| GET    | `/applications`            | Get all applications      |

| GET    | `/applications/:id`        | Get one application       |

| POST   | `/applications`            | Create an application     |

| PUT    | `/applications/:id`        | Update an application     |

| PATCH  | `/applications/:id/status` | Update application status |

| DELETE | `/applications/:id`        | Delete an application     |

| GET    | `/applications/stats`      | Get dashboard statistics  |



\### Search and Filtering



Applications can be filtered using query parameters:



```text

GET /api/applications?search=google

```



```text

GET /api/applications?status=Applied

```



Both can be combined:



```text

GET /api/applications?search=developer\&status=Applied

```



Search checks the company and role fields using case-insensitive partial matching.



\## API Response Format



Successful responses use a consistent structure:



```json

{

&#x20; "success": true,

&#x20; "message": "Applications fetched successfully",

&#x20; "data": \[],

&#x20; "errors": null

}

```



Errors use:



```json

{

&#x20; "success": false,

&#x20; "message": "Validation failed",

&#x20; "data": null,

&#x20; "errors": \[]

}

```



\## Data Model



An application contains:



\* `company`

\* `role`

\* `status`

\* `appliedDate`

\* `deadline`

\* `jobUrl`

\* `location`

\* `salary`

\* `notes`

\* `createdAt`

\* `updatedAt`



Mongoose validation is used for required fields, allowed statuses, URL format, string lengths, and numeric salary values.



\## Getting Started



\### Prerequisites



Make sure the following are installed:



\* Node.js

\* npm

\* MongoDB

\* Git



\### 1. Clone the repository



```bash

git clone <your-github-repository-url>

cd startupmeu-intern-tracker

```



\### 2. Configure MongoDB



The application uses a local MongoDB database by default.



Database:



```text

interntrack

```



Default connection:



```text

mongodb://localhost:27017/interntrack

```



\### 3. Configure the backend



Navigate to the server:



```bash

cd server

npm install

```



Create a `.env` file:



```env

PORT=5000

MONGO\_URI=mongodb://localhost:27017/interntrack

NODE\_ENV=development

```



Start the backend:



```bash

npm start

```



The API runs on:



```text

http://localhost:5000

```



\### 4. Configure the frontend



Open another terminal:



```bash

cd client

npm install

npm run dev

```



The frontend runs through Vite, with API requests proxied to the Express backend.



\## Development Commands



\### Backend



```bash

cd server

npm install

npm start

```



\### Frontend



```bash

cd client

npm install

npm run dev

```



\### Production Build



```bash

cd client

npm run build

```



\## Architecture



InternTrack follows a simple separation of responsibilities.



\### Frontend



React components are responsible for presentation and user interaction.



`App.jsx` acts as the main state owner and coordinates:



\* Applications

\* Statistics

\* Search

\* Filters

\* Add/Edit modal state

\* Loading states

\* Error states

\* Delete state



Network requests are isolated in:



```text

client/src/services/applicationService.js

```



This keeps API communication separate from UI components.



\### Backend



The Express backend follows a controller/route/model structure:



```text

Routes

&#x20;  ↓

Controllers

&#x20;  ↓

Mongoose Models

&#x20;  ↓

MongoDB

```



The centralized error middleware handles validation, invalid IDs, duplicate records, and other API errors.



\## Validation and Error Handling



The backend uses Mongoose validation and `runValidators: true` during updates.



The application also validates:



\* Required company

\* Required role

\* Valid status

\* Valid job URL

\* Non-negative salary

\* Valid MongoDB ObjectIds



The server uses a centralized error handler so API errors are returned in a consistent format.



\## Dashboard Statistics



The dashboard displays: 



\* Total applications

\* Applied applications

\* Interview applications

\* Offer applications



Statistics are calculated from the MongoDB data and update after application mutations.



\## Responsive UI



The interface is designed for desktop, tablet, and mobile screens.



The application form uses an internally scrollable modal so the modal header remains fixed while the form content can scroll on smaller screens.



\## AI-Assisted Development



Kiro was used as an AI development assistant during the implementation and refinement of InternTrack.



Kiro assistance included project inspection, development guidance, UI refinement, debugging/refinement feedback, and project-level review.



AI suggestions were reviewed by the developer and adapted where necessary. Application behavior, API functionality, CRUD operations, validation, and UI behavior were manually reviewed and tested during development.



Detailed documentation of the actual Kiro-assisted workflow is available in:



```text

KIRO.md

```



\## Project Status



InternTrack implements the requested MVP functionality for tracking internship applications using the MERN stack.



The project focuses on a clean architecture, persistent data storage, RESTful API design, responsive UI, validation, and practical application workflow management.



