<p align="center">
  <img src="docs/logo.png" alt="riffbit_logo"/ width="300px">
</p>
<p align="center">
  <i>Spark deeper connections, one question at a time.</i>
</p>

---

# 🗣️ RiffBit (WIP)

**RiffBit** (tentative) is a multiplatform social app that enriches conversations with interesting, thought-provoking, and fun questions - powered by AI.  
Whether you're hanging out with friends, going on a date, or just trying to spark meaningful conversations, RiffBit helps you find the perfect question to ask.

---

## 🚀 Vision

The web is saturated with generic, static social question lists. RiffBit's vision is to leverage AI for **intelligent conversational discovery**, surfacing and generating questions that are personally relevant and contextually appropriate to spark deeper social connections.

---

## 🧩 Tech Stack Snapshot (tentative v0.1)

| 📱 Frontend | ⚙️ Backend | 🛠️ DevOps / Tooling |
| :--- | :--- | :--- |
| <ul><li>`React Native (Expo)`</li><li>`TypeScript`</li><li>`Vitest` + `RNTL`</li></ul> | <ul><li>`Node.js` + `Express`</li><li>`TypeScript`</li><li>`pino`</li><li>`Vitest`</li></ul> | <ul><li>`GitHub Actions` (CI)</li><li>`ESLint` + `Prettier` + `Husky`</li><li>`npm workspaces`</li></ul> |

---

## 📈 Development status: Road to v0.1

> -   [x] Project scaffold (frontend + backend)
> -   [x] Initial wireframes and planning
> -   [x] Detailed issues to achieve v0.1
> -   [ ] Testing, Linting, Logging and CI Setup
> -   [ ] Backend basic architecture, data source, error handling middleware
> -   [ ] Frontend network layer and UI

---

## 🚩 Tentative Roadmap

| Phase    | Focus               | Key Features                                                    |
| -------- | ------------------- | --------------------------------------------------------------- |
| **v0.1** | MVP                 | Basic UI, random question API, CI setup                         |
| **v0.2** | Tailored Experience | Categorized questions, filters                                  |
| **v0.3** | Smart Discovery     | OpenAI API integration: "similar question", "generate question" |
| **v0.4** | Social Features     | Shareable questions, group mode, favorites                      |
| **v0.5** | AI Personalization  | RAG, question retrieval and generation based on user preferences
| **v0.5+** | Polish & Expansion | Finalize UX, future-proof systems, clear backlog |


**Notes**: 
- This roadmap outlines the general direction of the project. At this point in time, there are still a lot of uncertainties regarding offline use, user accounts, use cases and other categories. Beta user feedback will be evaluated at every major release and the roadmap amended accordingly.

- UI and architecture will evolve alongside new features

- While the node backend will be sufficient for simple LLM API calls, later on a Python/FastAPI microservice is planned for better integration with the AI ecosystem.

---
## 🧭 Development Philosophy

- **Test Driven Development TDD** from minute one to ensure reliability and maintanability.
- **Git Feature Branch Workflow** as outlined in [Git Conventions](docs/git_conventions.md)
- **Issue-Driven Development:** All development work is planned and tracked via detailed GitHub Issues. This ensures every change is purposeful and aligned with the roadmap.
- **Automated Quality Gates**: Continuous Integration pipeline automatically enforces code quality. 
---

## 🧪 Running locally

### Prerequisites

-   Node.js ≥ 18.0
-   npm (comes with Node.js)
-   Expo CLI installed globally (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/leontutu/riffbit.git
cd riffbit
npm install

# Test (runs tests for frontend and backend)
npm run test

# Run Backend (Terminal 1)
npm run dev:server

# Run App     (Terminal 2)
npm run dev:app
```

**Note**: If you are using a physical device and expo go, you need ngrok (or a similar solution) to connect to your machine's localhost port the server is listening on (default 3000). For ngrok, run `npx ngrok http 3000`, then set up a `.env` file as outlined in `app/.env.example`.
