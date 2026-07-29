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

---

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

---

  ## Module: TDD Implementation (Green & Refactor Phase) - Authentication Logic & Architecture
### Prompt: Controller Implementation and Architecture Decoupling
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Provide the controller logic for `register` and `login`, extract the token generation into a utility folder, wire up `routes` and `app.ts`, and resolve the Mongoose `findOne()` buffering timeout error during test execution.
* **Generated Output / Context**:
  > The AI provided the initial implementation for the authentication controllers, the `generateToken` utility, and the routing logic. It also identified the architectural necessity to decouple `app.ts` (Express setup) from `server.ts` (Database connection) to prevent conflicts, and supplied the Jest lifecycle hooks (`beforeAll`, `afterEach`, `afterAll`) to correctly bind Mongoose to the `mongodb-memory-server`.
* **Manual Adjustments Made**:
  > Applied the code and verified the fix for the database buffering timeout. Transferred database connection logic to `server.ts` to ensure complete isolation for the test suite.

---

## Module: TDD Implementation (Green Phase) - Authentication Debugging
### Prompt: Resolve 500 Internal Server Error and Payload Mismatch
* **Date**: 2026-07-28
* **Tool Used**: VS Code AI
* **Prompt**:
  > (Automated Context via Editor) Fix test suite failures where registration returns a 500 error instead of 400 for missing fields, and throws an "Illegal arguments: undefined, string" error from bcrypt. Also, correct the response structure to match the test expectation of `res.body.user`.
* **Generated Output / Context**:
  > The AI analyzed the authentication controller and test output, identifying that `req.body` inputs were not being validated. It patched the `register` controller by adding early-return validation (`if (!name || !email || !password)`) to prevent bcrypt from hashing an undefined password. It also restructured the successful JSON response to nest user details inside a `user` object.
* **Manual Adjustments Made**:
  > Reviewed and accepted the generated patch. Re-ran the test suite to confirm all 6 authentication integration tests now pass successfully (Green Phase achieved).

---

  ## Module: TDD Implementation (Test Infrastructure) - RBAC Authentication Helpers
### Prompt: Implement Isolated Test Helpers for User and Admin JWT Generation
* **Date**: 2026-07-28
* **Tool Used**: Gemini
* **Prompt**:
  > Create test helper functions to streamline authentication in upcoming integration tests. Specifically, implement two distinct helpers: one to create a standard user and return their JWT, and another to create a user, manually update their database role to 'admin', and return the resulting admin JWT.
* **Generated Output / Context**:
  > The AI generated `tests/helpers/authSetup.ts` containing `getTestUserToken()` and `getTestAdminToken()`. These isolated utilities automate the registration, role-promotion (via Mongoose `findOneAndUpdate`), and login flows, returning valid JWTs for standard and administrative roles. This keeps the test suite DRY (Don't Repeat Yourself) and enforces the Single Responsibility Principle for integration testing.
* **Manual Adjustments Made**:
  > Integrated the helper utilities into the testing directory structure, confirming they are ready to be utilized within the `beforeEach` hooks for the upcoming Vehicle and Inventory API integration tests.

  ---

## Module: Vehicle & Media Infrastructure - Cloudinary Integration
### Prompt: Setup Cloudinary Configuration and Live Integration Test Suite
* **Date**: 2026-07-29
* **Tool Used**: Gemini
* **Prompt**:
  > Help configure Cloudinary for vehicle photo management and write an integration test to verify the actual Cloudinary connection, image upload, and resource cleanup logic.
* **Generated Output / Context**:
  > The AI provided the Cloudinary v2 SDK initialization in `src/config/cloudinary.ts` along with a dedicated live integration test (`tests/integration/cloudinary.test.ts`). The test utilizes a 1x1 base64-encoded image string to execute an actual upload request to Cloudinary, verify the returning `secure_url` and `public_id`, and subsequently invoke `uploader.destroy` to ensure resource cleanup without needing physical test files on disk.
* **Manual Adjustments Made**:
  > Installed `cloudinary`, `multer`, and `multer-storage-cloudinary` packages inside the `backend` directory, added Cloudinary API credentials to `.env`, and executed targeted testing via `npx jest cloudinary.test.ts` to confirm external service connectivity.

  ---

## Module: Vehicle Inventory - Admin Test Planning
### Prompt: Outline Admin Test Scenarios
* **Date**: 2026-07-29
* **Tool Used**: Gemini
* **Prompt**:
  > Please provide a comprehensive bulleted list of all integration test scenarios for the Admin Vehicle API (Create, Update, Delete, Restock). Focus only on the test planning for now; do not generate code.
* **Generated Output / Context**:
  > The AI provided a clear, bulleted list of all the test scenarios an admin can perform on the vehicle system. This included success cases and failure cases (like missing data or wrong user roles) for creating, updating, and deleting vehicles. 
* **Manual Adjustments Made**:
  > Reviewed the test plan and decided it would be cleaner to separate the Admin actions (mutations) from the User actions (queries) into different test files.

---

## Module: Vehicle Inventory - Admin Test Suite (Red Phase)
### Prompt: Generate Admin-Only Integration Tests
* **Date**: 2026-07-29
* **Tool Used**: Gemini
* **Prompt**:
  > Let's adopt a clean architecture approach and separate the Admin and User APIs. Please generate the test suite exclusively for Admin operations (Create, Update, Delete) handling all edge cases. I will handle the User fetch/search queries separately.
* **Generated Output / Context**:
  > The AI generated the `tests/integration/admin.vehicle.test.ts` file, focusing strictly on Admin-only actions (POST, PUT, DELETE, RESTOCK). The code includes a mocked Cloudinary setup so testing doesn't make real network calls, and it tests image uploads, data validation, and role-based access control (RBAC).
* **Manual Adjustments Made**:
  > Placed `dummy-car.jpg` in the `tests/fixtures/` folder. Ran the test suite using `npx jest admin.vehicle.test.ts` to confirm it fails as expected (TDD Red Phase) since the backend controllers are not yet implemented.

---

## Module: Vehicle Inventory - Admin Test Suite (Green Phase)
### Prompt: Debug and Pass Admin Integration Tests
* **Date**: 2026-07-29
* **Tool Used**: Gemini
* **Prompt**:
  > The admin vehicle integration tests are failing with timeouts, 404s, and 500 errors. Help me debug the test environment, fix the controller logic, and properly configure the mocked Multer/Cloudinary setup so the test suite passes (transitioning to the Green Phase).
* **Generated Output / Context**:
  > The AI identified and resolved several critical testing and backend bugs:
  > 1. Controller Logic: Fixed Mongoose queries in `updateVehicle` and `restockVehicle` to use the validated `vehicleId` instead of the raw `id` parameter.
  > 2. Test DB Setup: Integrated `mongodb-memory-server` into `authSetup.ts` to prevent Mongoose buffering timeouts and isolate test data.
  > 3. Route Mounting: Added the missing `adminVehicleRoutes` to `src/app.ts` to resolve systemic 404 errors.
  > 4. Multer Stream Timeout: Updated the `multer-storage-cloudinary` Jest mock to explicitly drain the readable file stream (`file.stream.on('data', ...)`), preventing Node.js from keeping the HTTP request open indefinitely.
  > 5. Indexing: Added `await Vehicle.syncIndexes()` to the test setup to ensure the compound unique index correctly triggered the 409 Conflict duplicate test.
* **Manual Adjustments Made**:
  > Applied the revised configurations to `app.ts`, `authSetup.ts`, and the test file. Wrapped the real MongoDB connection in `app.ts` with an environment check (`process.env.NODE_ENV !== 'test'`). Executed `npx jest tests/integration/admin.vehicle.test.ts` to confirm a 100% pass rate (17/17 tests).