# Car Dealership Inventory System

A professional-grade, full-stack web application for managing car dealership inventory. Built utilizing the MERN stack (MongoDB, Express, React, Node.js) with strict TypeScript adherence and Test-Driven Development (TDD).

## Tech Stack
*   **Database:** MongoDB & Mongoose (Indexed for search optimization)
*   **Backend:** Node.js, Express, TypeScript
*   **Frontend:** React, TypeScript (To be implemented)
*   **Testing:** Jest, Supertest, MongoDB Memory Server
*   **Architecture:** Feature-based routing, isolated controllers, separated environment configurations.

## Development Methodology
This project strictly adheres to **Test-Driven Development (TDD)**. 
*   **Red:** Write a failing test.
*   **Green:** Write the minimum code to pass the test.
*   **Refactor:** Optimize the code while ensuring tests remain green.

## Project Structure
Currently, the backend is initialized with the following core components:
*   Mongoose schemas defined for `User` (RBAC-ready) and `Vehicle` (optimized for inventory search).
*   Database connection utility configured to handle dynamic URIs safely.
*   Express application modularized (separating `app.ts` from the server entry point).
*   Test suites configured with `supertest` and isolated memory servers.

## Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Atlas URI (or local MongoDB instance)

### Installation
1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Duplicate `.env.example` to `.env` and provide your `MONGO_URI` and `JWT_SECRET`.

### Testing
To run the integration and unit test suites:
\`\`\`bash
npm test
\`\`\`