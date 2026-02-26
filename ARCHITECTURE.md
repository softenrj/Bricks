## 🏗️ BRICKS AI Architecture Overview

BRICKS AI is a modern, browser-first IDE that combines a rich Next.js/React frontend with a real-time backend and AI services. This document gives a high-level view of how the pieces fit together.

---

## 🔹 High-Level Diagram (Conceptual)

```text
Browser (Next.js App)
 ├─ UI Shell & Routing (app/)
 ├─ IDE Workspace (Monaco, tabs, panels)
 ├─ AI Chat & Context Panels
 ├─ State & Data (Redux Toolkit)
 └─ Realtime Channels (WebSockets)

Backend Services
 ├─ Bricks API (proprietary)
 ├─ AI Orchestration
 └─ Auth / Persistence (Firebase)
```

---

## 🌐 Frontend Stack

- **Framework**: Next.js 15.5 (App Router) with React 19.1 and TypeScript
- **Styling**: Tailwind CSS 4.0 with custom design tokens and motion via Framer Motion
- **State Management**: Redux Toolkit for global state (projects, editor, user session)
- **Editor**: Monaco Editor powering the multi-tab IDE
- **Terminal & Runtime**: XTerm.js + WebContainer for running commands directly in the browser

Key directories:

- `src/app/` – Route handlers, layouts, and page shells
- `src/components/` – Reusable UI and feature components (IDE tabs, chat, sidebars, etc.)
- `src/store/` – Redux slices and store configuration
- `src/lib/`, `src/utils/` – Helpers for API calls, formatting, and shared logic

---

## 🧩 IDE Workspace

The IDE experience is composed of multiple synchronized panels:

- **File Explorer / Context Tree** – Navigates project structure and logical context
- **Code Editor Tabs** – Monaco instances configured per file with language features
- **AI Chat Panel** – Project-aware assistant for code help and generation
- **Docs & History Tabs** – Renders project docs and timeline-style activity history
- **Terminal Panel** – Runs commands inside a WebContainer-powered environment

State (open files, active tab, layout preferences) is stored in Redux and mirrored to the backend for persistence and collaboration.

---

## 🔄 Data Flow & APIs

1. **Auth & Session**
   - Firebase Authentication manages user identity.
   - Session metadata is stored in Firestore and referenced by the client.

2. **Projects & Files**
   - Project lists, metadata, and file structures are fetched via the Bricks API.
   - File contents are streamed to the editor and synced back on save or auto-save.

3. **AI Interactions**
   - Chat messages and code generation prompts are sent to the backend AI orchestrator.
   - Responses update both the chat transcript and optionally the code/terminal.

4. **Realtime Updates**
   - WebSockets (e.g., Socket.io) keep multiple clients in sync:
     - Presence and cursors
     - Live file edits
     - Activity feed and history

---

## 🧠 Profile, Achievements & Rank

Profile data aggregates usage signals:

- Completed projects and active streaks
- Collaboration metrics (shared sessions, co-edits)
- IDE activity (time in editor, runs, AI prompts)

These are surfaced as:

- **Achievements** – Milestone-style badges
- **Progress Indicators** – Visual bars/counters on profile
- **Rank-like Signals** – Comparative stats to show growth over time (not a public leaderboard)

---

## 🛡️ Security & Privacy Highlights

- Firebase rules restrict access to user-owned or shared resources.
- Sensitive config lives in `firebaseConfig.ts` locally and in env vars in production.
- Client and backend communicate over HTTPS with authenticated requests.

For more detail, see `SECURITY.md` and `SETUP.md`.

---

## 🚀 Extensibility

The architecture is designed to support:

- New workspace tabs (e.g., tests, analytics, deployment)
- Additional AI tools (explain, refactor, test generation, migrations)
- Custom templates and project types

Feature work should aim to:

- Reuse existing layout primitives and Redux patterns
- Keep heavy logic in `lib/` or `utils/`
- Stay compatible with collaborative editing flows

