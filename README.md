# no_doubt_mar26
> A full-stack chat application providing a real-time messaging interface for users, built with a TypeScript frontend and Python backend.

## 🧭 At a Glance
- **What it is:** A monorepo containing a Next.js client and a Python-based REST API server.
- **What problem it solves:** Provides a boilerplate foundation for integrating chat-based communication between a web client and a backend service.
- **Who uses it:** Developers looking for a structured starting point for a real-time messaging application.
- **Complexity level:** Intermediate.
- **Best way to explore:** Start by examining `server/index.py` to understand the API entry point, then trace a request to `client/src/utils/api/SendMessage.ts`.

## 💡 Why This Exists
Building a chat application requires synchronizing state between a reactive frontend and a persistent backend. This project provides a clean separation of concerns, allowing developers to manage UI logic independently from data persistence and authentication.

The architecture uses a standard client-server split. By isolating the chat logic in `server/src/router/apiChat.py` and the UI in `client/src/components/screen/ChatWindow.tsx`, it allows for modular development where the API can be scaled or updated without necessarily refactoring the entire frontend.

It serves as a reference implementation for developers who need to understand how to bridge TypeScript-based frontend frameworks with Python-based backend services, specifically focusing on JWT-based authentication and RESTful communication.

## ✨ Key Features
- **JWT Authentication** — Implements secure token-based access control via `server/src/middleware/jwt.py` to protect chat endpoints.
- **RESTful Chat Routing** — Centralized API management in `server/src/router/apiChat.py` for predictable endpoint discovery.
- **Component-Driven UI** — Uses modular React components like `ChatWindow.tsx` to encapsulate chat state and rendering.
- **Structured Data Models** — Uses `server/src/models/chat.py` to enforce consistent schema definitions for chat messages.
- **API Communication Layer** — Abstracted fetch logic in `client/src/utils/api/SendMessage.ts` to decouple UI components from network implementation details.

## 🏗️ Core Architecture
- **System Design Pattern**: Client-Server (The frontend acts as a thin client requesting data from a centralized Python API).
- **Data Flow**: User input in `ChatWindow.tsx` → `SendMessage.ts` (API call) → `apiChat.py` (Router) → `chat.py` (Model/DB) → Response returned to client.
- **Key Abstractions**: The `Chat` model (data structure) and the `JWT` middleware (security layer).
- **Boundaries & Seams**: The HTTP interface acts as the primary seam between the Next.js client and the Python server.

## 🛠️ Tech Stack
- **Languages & Frameworks:** TypeScript (Next.js), Python (Flask/FastAPI inferred).
- **Build & Tooling:** npm/yarn for frontend, pip for backend.
- **Infrastructure:** Local development environment.
- **External Runtime Requirements:** Node.js (v18+), Python (v3.10+).

## 📦 Critical Dependencies
- `next` — The React framework providing the foundation for the frontend routing and rendering.
- `flask` (or similar) — The Python web framework handling HTTP requests and routing.
- `pyjwt` — Handles the encoding and decoding of JSON Web Tokens for user authentication.

## 🗂️ Project Structure
```text
/client     → Next.js frontend application containing UI components and API utilities
/server     → Python backend service containing business logic, models, and API routes
```
*Mental Map: To understand this project, think of it as a bridge between a reactive web interface and a structured data-processing backend.*

## 🔍 Where to Start Reading

**For engineers:**
- `server/index.py` — *The entry point that initializes the backend service.*
- `client/src/app/layout.tsx` — *The root layout defining the global frontend context.*
- `server/src/router/apiChat.py` — *The core routing logic defining how chat data is handled.*

**For learners:**
- `client/src/components/screen/ChatWindow.tsx` — *Shows how to build a reactive UI component.*
- `server/src/models/chat.py` — *Teaches how to define data schemas in a backend environment.*
- `client/package.json` — *Provides a clear list of the tools and libraries used to build the frontend.*

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS)
- Python 3.10+
- A code editor (VS Code recommended)

### Setup
```bash
# Install frontend dependencies
cd client && npm install
# Run as dev
npm run dev

# Backend Virtual Environment
python -m venv venv
venv\Scripts\activate
# Install backend dependencies
cd server && pip install -r requirements.txt
# Run as dev
uvicorn index:app --reload
```

### Verify It's Working
Run both the client and server locally and navigate to `http://localhost:3000` to see the chat interface.

## 🤝 How to Contribute

**Jump right in:**
- [Open in GitHub Codespaces](https://codespaces.new/Shresht5/no_doubt_mar26)

**Contribution path for first-timers:**
1. Improve documentation in existing files.
2. The `client/src/components` folder is the lowest-risk area for UI tweaks.
3. A good PR includes a clear description of the change and updated logic in the relevant `utils` or `router` files.

**Testing & linting before you push:**
```bash
# Run frontend linting
cd client && npm run lint
```

## 🐛 Active Good First Issues
> No issues labeled **good first issue**. Check [Issues](https://github.com/Shresht5/no_doubt_mar26/issues) for `help wanted`, `docs`, or `bug`.

## 📚 What You'll Learn
- How to structure a monorepo for full-stack development.
- Implementing JWT authentication in a Python backend.
- Managing state and API requests in a Next.js application.
- Designing data models for real-time chat applications.

## 🤖 Machine-Readable Metadata [AI-READABLE]
```yaml
repo: Shresht5/no_doubt_mar26
description: ""
stars: 0
forks: 0
open_issues: 0
language: "TypeScript"
license: "none"
architecture_pattern: "Client-Server"
entry_point: "server/index.py"
external_dependencies_required: true
test_command: "npm run test"
ci_present: false
```

## 📊 Quick Stats [AI-READABLE]
| Metric | Value |
|--------|-------|
| ⭐ Stars | 0 |
| 🍴 Forks | 0 |
| 🐛 Open Issues & PRs | 0 |
| 💬 Primary Language | TypeScript |
| ⚖️ License | N/A |