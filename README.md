# Car Dealership Inventory System

A full-stack inventory management application for car dealerships. It allows users to browse vehicles, search and filter inventory, view vehicle details, and purchase available stock. Admin users can manage inventory, upload images, update records, and restock vehicles. The project combines a TypeScript Express backend with a React + Vite + Tailwind frontend and includes automated tests and seeded demo data.

Repository: https://github.com/SanampreetSingh/Car-Dealership-Inventory-System

Live Demo:
- Frontend: https://your-vercel-app-url.vercel.app
- Backend API: https://your-render-backend-url.onrender.com

## What the project does

- Public-facing vehicle catalog with search and filtering
- Admin dashboard for creating, editing, deleting, and restocking vehicles
- Authentication for users and admins
- Image upload support via Cloudinary
- Deterministic pagination so inventory pages remain stable
- Test suites for auth, admin operations, user flows, and cloud integration

## Tech stack

- Backend: Node.js, TypeScript, Express, Mongoose
- Frontend: React, Vite, TypeScript, Tailwind CSS, Redux Toolkit
- Authentication: JWT
- Media storage: Cloudinary
- Testing: Jest, Supertest, mongodb-memory-server

## Project structure

- `backend/` — Express + TypeScript API server
  - `src/` — controllers, models, routes, middlewares, utils
  - `seed.ts` — database seeding script for demo data
- `frontend/` — Vite + React application
  - `src/` — pages, components, services, hooks, context

## Screenshots

The app is designed to feel polished and modern. Below is a horizontally scrollable gallery of representative screenshots from the application.

<div style="display:flex; overflow-x:auto; gap:16px; padding:8px 0 12px;">
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Homepage Hero</strong>
    <a href="https://drive.google.com/file/d/1dHQoe-ekjCJv7_MmNcJLY5khwz6dgwwU/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1dHQoe-ekjCJv7_MmNcJLY5khwz6dgwwU&sz=w1000" alt="Homepage hero section" style="width:100%;  object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Featured Vehicles</strong>
    <a href="https://drive.google.com/file/d/1Nd-YFg8T0wbiMWMq8MDQ5PM8rDMxqyd3/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1Nd-YFg8T0wbiMWMq8MDQ5PM8rDMxqyd3&sz=w1000" alt="Homepage featured vehicles section" style="width:100%; object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Homepage Footer</strong>
    <a href="https://drive.google.com/file/d/1OPrn0sDPnHfrzUwH34SYWzgonl1IxvU5/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1OPrn0sDPnHfrzUwH34SYWzgonl1IxvU5&sz=w1000" alt="Homepage footer" style="width:100%;object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Search Page</strong>
    <a href="https://drive.google.com/file/d/1KNIKZDX5xdtwflFdxy4ypNDN4fZv7SV2/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1KNIKZDX5xdtwflFdxy4ypNDN4fZv7SV2&sz=w1000" alt="Search page with filters" style="width:100%; object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Admin Hero</strong>
    <a href="https://drive.google.com/file/d/11mzVB4HUBH9e5ta2dqdtvJT3HX1YIVco/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=11mzVB4HUBH9e5ta2dqdtvJT3HX1YIVco&sz=w1000" alt="Admin hero section" style="width:100%;  object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Admin Dashboard</strong>
    <a href="https://drive.google.com/file/d/1FLk9AmlxJ2Ov_eh82K8vwuJJEO08Lzo6/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1FLk9AmlxJ2Ov_eh82K8vwuJJEO08Lzo6&sz=w1000" alt="Admin dashboard" style="width:100%; object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Login</strong>
    <a href="https://drive.google.com/file/d/1D4HOewbuOAYhaENMzayWd2jNXZ8Hnlpy/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1D4HOewbuOAYhaENMzayWd2jNXZ8Hnlpy&sz=w1000" alt="Login page" style="width:100%; object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
  <div style="min-width:280px; border:1px solid #d4d4d4; border-radius:12px; padding:12px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <strong>Register</strong>
    <a href="https://drive.google.com/file/d/1i5mlIuXOSRh2Y0noqsb4DOEW6hBfEuRr/view?usp=sharing" target="_blank" rel="noreferrer">
      <img src="https://drive.google.com/thumbnail?id=1i5mlIuXOSRh2Y0noqsb4DOEW6hBfEuRr&sz=w1000" alt="Register page" style="width:100%; object-fit:cover; border-radius:10px; margin-top:8px;" />
    </a>
  </div>
</div>

## Local setup

### Prerequisites

- Node.js 18+ recommended
- MongoDB connection string (MongoDB Atlas or local MongoDB)
- Cloudinary account and credentials for image upload support

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Create environment files

Create the backend environment file:

```bash
cd backend
cp .env.example .env
cp .env.test.example .env.test
```

Populate `backend/.env` with values such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
BACKEND_URL=http://localhost:5000
SELF_PING_URL=http://localhost:5000
SELF_PING_INTERVAL_MS=900000
```

Populate `backend/.env.test` with values such as:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Create the frontend environment file:

```bash
cd ../frontend
cp .env.example .env
```

Add the backend URL to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Seed demo data (optional but recommended)

```bash
cd ../backend
npm run seed
```

This creates demo accounts and sample vehicles for local testing.

### 4. Start the application

```bash
# Backend
cd backend
npm run dev

# Frontend (in a second terminal)
cd frontend
npm run dev
```

Open the frontend at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## Demo accounts

The seeded data includes the following accounts:

- Admin
  - Email: `admin@dealership.com`
  - Password: `admin123`

- Demo user
  - Email: `user@dealership.com`
  - Password: `user123`

## Available scripts

### Backend

- `npm run dev` — start the development server
- `npm run seed` — seed demo vehicles and users
- `npm run build` — compile TypeScript
- `npm test` — run Jest test suites

### Frontend

- `npm run dev` — start Vite development server
- `npm run build` — build the frontend
- `npm run lint` — run ESLint

## Testing

Run the backend tests from the `backend` folder:

```bash
cd backend
npm test
```

The test suite covers authentication, admin vehicle management, public vehicle listing, and Cloudinary upload behavior.

## Important implementation notes

- Pagination uses a deterministic sort of `{ createdAt: -1, _id: 1 }` to avoid duplicate vehicles across pages when timestamps are identical.
- Categories are synchronized between the backend enum and frontend filter options.
- Image upload requires proper Cloudinary credentials and multipart requests handled correctly by the frontend.

## Troubleshooting

- If seeding fails, confirm that the `category` values in `backend/seed.ts` match the enum in `backend/src/models/Vehicle.ts`.
- If uploads fail, verify your Cloudinary credentials and ensure the frontend is not overriding `Content-Type` for multipart requests.
- If the frontend cannot connect to the backend, confirm that `VITE_API_BASE_URL` points to the correct backend URL and that the backend server is running.

## Keeping the backend awake

To keep the Render-hosted backend available after deployment, the repository now includes a lightweight health endpoint and a GitHub Actions cron workflow that pings it every 10 minutes.

Example:

```bash
curl -fsS https://your-render-backend-url.onrender.com/api/health
```

For the workflow to work, add a repository secret named `BACKEND_URL` with your deployed Render backend URL, for example `https://your-render-backend-url.onrender.com`.

## My AI Usage

This project used AI-assisted development throughout the build process. The AI tools were not used as a replacement for engineering judgment; they were used as accelerators for scaffolding, debugging, documentation, and code generation, while manual review and testing were always applied.

### AI tools used

- GitHub Copilot (in VS Code) for inline code suggestions, quick fixes, and small refactors.
- GitHub Copilot Chat for repository-wide debugging, patch generation, README drafting, and implementation planning.
- Gemini for initial scaffolding and architecture suggestions in the early project setup phase.
- Claude (Sonnet) for the frontend structure, UI component planning, and design-oriented implementation steps.

### How AI was used

- Gemini helped scaffold the project structure, backend schemas, testing strategy, and an initial architecture for the Express + MongoDB setup.
- VS Code AI and GitHub Copilot were used to fix backend and frontend errors, align API routes, patch type issues, and improve the reliability of the auth and inventory flows.
- Claude helped shape the frontend experience, including the homepage, navbar, auth panel, vehicle cards, search page, admin dashboard, and modal-based quick view experience.
- AI also assisted with documentation, seeded-data planning, and the creation of a detailed README and commit-message suggestions.

### Reflection

AI significantly sped up development by helping create structure quickly, suggesting implementation patterns, and reducing repetitive work. It was especially helpful for boilerplate, debugging, and documentation. However, the final result still required manual review, environment verification, and testing to make sure the application was correct, secure, and consistent with the project requirements.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them locally.
4. Open a pull request with a clear summary.

## License

This repository is intended for personal and educational use. Add a license file if you plan to publish or share it publicly beyond the current project scope.
