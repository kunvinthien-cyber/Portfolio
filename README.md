# 💻 Personal Portfolio Website

A modern and responsive personal portfolio website built with **Vue 3** and **Vite** to showcase my skills, projects, experience, and web development journey.

## 🌐 Live Demo

🔗 **Portfolio:** https://thienweb.vercel.app/

## 📌 Overview

This portfolio website was created to present my work as a **Junior Web Developer** with a focus on front-end and full-stack development, and to provide an overview of my technical skills, projects, and professional background.

The project focuses on a clean, responsive, and user-friendly interface that works across desktop and mobile devices.

## ✨ Features

* 👨‍💻 Developer profile
* 🛠️ Skills and technologies
* 📂 Project showcase
* 📱 Responsive design
* 🔗 Social and professional links
* 🌐 Live deployment with Vercel
* 🧪 End-to-end testing with Playwright

## 🛠️ Tech Stack

| Technology   | Usage                   |
| ------------ | ----------------------- |
| Vue 3        | Frontend framework      |
| Vite         | Build tool              |
| JavaScript   | Application development |
| CSS          | Styling                 |
| Playwright   | End-to-end testing      |
| ESLint       | Code quality            |
| Prettier     | Code formatting         |
| Git & GitHub | Version control         |
| Vercel       | Deployment              |

## 📂 Project Structure

```text
Portfolio/
├── public/
├── src/
├── e2e/
├── .vscode/
├── index.html
├── package.json
├── vite.config.js
├── playwright.config.js
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kunvinthien-cyber/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## 🧪 Testing

Install Playwright browsers:

```bash
npx playwright install
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Run tests using Chromium:

```bash
npm run test:e2e -- --project=chromium
```

## AI Portfolio Assistant

The portfolio assistant sends requests from the browser to the server-side `/api/chat` endpoint, which calls Groq using `openai/gpt-oss-120b`. Configure `GROQ_API_KEY` only in the server or deployment environment; never expose it through a `VITE_` variable.

The endpoint limits each message to 2,000 characters, includes up to 8 history messages from completed user/assistant turns (up to 1,000 characters each and 6,000 characters total), and caps generated output at 400 tokens. Conversation history is sent with each request and is not stored by the application.

The current rate limiter allows 12 requests per client per minute **per running server process**. Its in-memory counters reset when a process restarts and are not shared across instances. This is best-effort protection for a single-instance deployment, not a global quota for serverless or horizontally scaled deployments. No shared Redis service is currently configured, so the project intentionally does not add a Redis dependency; configure shared rate-limit infrastructure before relying on a global production limit.

## 🎯 Project Goals

This project demonstrates my ability to:

* Build modern Vue.js applications
* Create responsive user interfaces
* Structure frontend projects using Vite
* Use testing tools such as Playwright
* Maintain code quality with ESLint and Prettier
* Deploy frontend applications to the web

## 👨‍💻 Author

**Kun Vinthien**

Junior Web Developer | Front-End & Full-Stack Development

* GitHub: https://github.com/kunvinthien-cyber
* Portfolio: https://thienweb.vercel.app
* LinkedIn: https://www.linkedin.com/in/kun-vinthien-830a1a404/

---

⭐ Thanks for visiting my portfolio repository!
