# AI Prompt History Log

## Module: Project Initialization & Architecture Setup
### Prompt: Directory Structure Definition
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Scaffold the project directory structure. Separate the environment into `frontend` and `backend` workspaces, adhering to the Car Dealership Inventory System TDD guidelines.
* **Generated Output / Context**:
  > Received a structured directory tree separating the backend (controllers, services, routes, models, tests) and frontend (components, pages, context, hooks, services).
* **Manual Adjustments Made**:
  > Replicated the directory tree structure manually, added `.gitkeep` files to preserve empty directories for Git tracking, and initialized foundational documentation (`PROMPTS.md` and `README.md`).

---

## Module: Frontend Scaffolding & Build Configuration
### Prompt: Vite & Tailwind v4 Integration
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Provide the setup commands and base structure for the Vite React frontend. Note: Ensure the configuration aligns with the modern Tailwind CSS v4 architecture for Vite.
* **Generated Output / Context**:
  > The AI initially provided setup commands that included deprecated Tailwind v3 configuration files (e.g., `tailwind.config.js` and `postcss.config.js`). 
* **Manual Adjustments Made**:
  > Overrode the AI's legacy setup instructions to enforce Tailwind v4 standards. Manually uninstalled unnecessary `postcss` dependencies, implemented the `@tailwindcss/vite` plugin within `vite.config.js`, and updated `index.css` to use the modern `@import "tailwindcss";` directive.

  ## Module: Backend Architecture & Database Configuration
### Prompt: TypeScript Interface Optimization for Mongoose
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Scaffold the Mongoose schemas for the `User` (RBAC) and `Vehicle` models. Ensure the TypeScript interfaces are designed as pure Data Transfer Objects (DTOs) without extending Mongoose's `Document` interface to prevent `ts(2430)` type collisions with internal Mongoose properties.
* **Generated Output / Context**:
  > The AI provided the initial schema definitions and correctly structured the interfaces to rely on Mongoose's underlying type inference rather than explicit `Document` inheritance. It also generated a strict database connection utility (`config/db.ts`).
* **Manual Adjustments Made**:
  > Refined the indexing on the `Vehicle` schema specifically for inventory search optimization and fortified the `connectDB` utility to safely handle environment-agnostic database initialization.

---

## Module: Test Environment & Server Decoupling
### Prompt: Resolving Ephemeral Testing Port Collisions
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Architect the Express application to support ephemeral integration testing with `supertest`. How should we decouple the Express instance from the HTTP server binding to prevent `EADDRINUSE` (port already in use) conflicts during Jest test execution?
* **Generated Output / Context**:
  > The AI recommended a decoupled architecture, separating the application logic (`app.ts`) from the network listener (`server.ts`). It provided the module export configuration required to allow `supertest` to dynamically bind to available ports in the background.
* **Manual Adjustments Made**:
  > Restructured the backend entry points, ensuring `app.ts` utilized a clean ES6 default export. Confirmed that running tests bypassing the standard dev server allows `supertest` to manage its own lifecycle cleanly.

---

## Module: TDD Implementation (Red Phase) - Authentication
### Prompt: Integration Test Suite Isolation
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Generate the initial integration test suite for the authentication module (`/api/auth/register` and `/api/auth/login`) utilizing `supertest` and `mongodb-memory-server`. Ensure the setup guarantees complete test isolation by spinning up a pristine in-memory database instance.
* **Generated Output / Context**:
  > The AI generated the test blocks, defining the expected request payloads and asserting HTTP status codes (201 for registration, 200 for login) according to the API specification.
* **Manual Adjustments Made**:
  > Placed the file in the dedicated `tests/integration/` directory to enforce structural separation from unit tests. Executed the test suite to validate the "Red Phase" (receiving expected 404 errors as the controllers are not yet implemented), confirming the TDD environment is fully operational.