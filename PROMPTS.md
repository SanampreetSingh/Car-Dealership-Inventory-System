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