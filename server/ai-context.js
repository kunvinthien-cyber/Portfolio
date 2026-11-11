export const portfolioContext = `
VERIFIED PROFILE INFORMATION

- Name: Kun Vinthien; he also uses the name Vinthien.
- Positioning: Junior Web Developer focused on front-end and full-stack development.
- Location: Phnom Penh, Cambodia.
- Education: Bachelor's degree in Information Technology at the Royal University of Phnom Penh. Do not state dates; source materials have inconsistent date ranges.
- Work: Sales & Merchandiser at Big C Cambodia, 2024–2025. This is retail work, not software-development employment. Detailed duties are not documented.
- Skills listed in the portfolio: HTML5, CSS3, JavaScript ES6+, Vue.js, Tailwind CSS, Bootstrap, PHP, Laravel, REST API, MySQL, Git, GitHub, Vite, and Vercel. These are listed skills, not proficiency ratings.

PROJECT KNOWLEDGE

Use the fields below as the evidence boundary for project answers. Facts under "Documented" are verified. Anything marked "Not documented" is unknown; do not fill gaps with common patterns, assumptions, or generic descriptions of similar products. When asked how a project was built, explain the verified stack and architecture, then clearly identify the implementation details that are unavailable. Keep project status distinct from a list of working features.

1. KhMaket
- Purpose: The portfolio describes a responsive e-commerce website with a storefront, product browsing, and product presentation.
- Problem addressed: No specific problem statement is documented.
- Target users: Not explicitly documented.
- Technology stack: Vue.js, Laravel, MySQL, and Tailwind CSS (as listed in the portfolio).
- Frontend architecture: A Vue.js frontend is listed; component, routing, and state architecture are not documented.
- Backend architecture: Laravel is listed; server/API structure and responsibilities are not documented.
- Database and relationships: MySQL is listed; schema and data relationships are not documented.
- Main features: Responsive storefront, product browsing, and product presentation. Cart, checkout, payments, and other features are not documented. Available portfolio images are illustrative e-commerce visuals, not verified screenshots of the application.
- API integration: Not documented.
- Authentication and authorization: Not documented.
- Security: Project-specific security measures are not documented.
- Deployment and infrastructure: Demo link: https://smart-khmer-frontend.vercel.app. No source repository is linked in the project entry or available in this workspace.
- Development challenges: Not documented.
- Vinthien's contributions: Specific individual contributions are not documented.
- Status, limitations, and future improvements: The portfolio does not give a project status, known limitations, or planned improvements.

2. Khmer POS System
- Purpose: A point-of-sale project described as helping a business manage sales, inventory, and customer records.
- Problem addressed: Managing sales, inventory, and customer records, according to the portfolio description.
- Target users: Businesses, as stated in the portfolio description.
- Technology stack: Laravel, MySQL, REST API, and Tailwind CSS (as listed in the portfolio).
- Frontend architecture: Tailwind CSS is listed. Frontend framework, components, routes, and state architecture are not documented.
- Backend architecture: Laravel and REST API are listed; endpoint structure and request flows are not documented.
- Database and relationships: MySQL is listed; schema and data relationships are not documented.
- Main features: Sales, inventory, and customer-record management are described in the portfolio. An available dashboard image visibly shows sections labeled Dashboard, POS, Products, Categories, Orders, Customers, Reports, Backup, and Settings, plus product search and a cart. The image verifies visible interface elements only, not that every section or workflow is implemented or functional.
- API integration: REST API is listed; specific endpoints and integrations are not documented.
- Authentication and authorization: Not documented.
- Security: Project-specific security measures are not documented.
- Deployment and infrastructure: The portfolio marks the project "In progress" and links to https://pos-system-l7b1.onrender.com. No source repository is linked in the project entry or available in this workspace.
- Development challenges: Not documented.
- Vinthien's contributions: Specific individual contributions are not documented.
- Status, limitations, and future improvements: The portfolio marks it "In progress"; other limitations and planned improvements are not documented.

3. ChillStudy Cambodia
- Purpose: A study-focused platform intended to support learning resources and a simple collaborative experience for students.
- Problem addressed: The portfolio states this learning-support purpose but does not describe a more specific problem.
- Target users: Students, as stated in the portfolio description.
- Technology stack: Vue.js and Tailwind CSS (as listed in the portfolio). The public deployment HTML inspected for this review also references PeerJS 1.5.4 from a CDN; whether the application uses it is unverified. Do not claim a PeerJS feature or integration.
- Frontend architecture: Vue.js is listed; component, routing, and state architecture are not documented.
- Backend architecture: Not documented. The public page returned for inspection was an app shell, which does not establish the backend architecture.
- Database and relationships: Not documented.
- Main features: The documented goal is to support learning resources and a simple collaborative student experience. Specific implemented features are not documented.
- API integration: Not documented.
- Authentication and authorization: Not documented.
- Security: Project-specific security measures are not documented.
- Deployment and infrastructure: Demo link: https://chill-study-cam-pro.vercel.app. The portfolio marks it "Coming soon." No source repository or project screenshot is available in this workspace.
- Development challenges: Not documented.
- Vinthien's contributions: Specific individual contributions are not documented.
- Status, limitations, and future improvements: The portfolio marks it "Coming soon"; other limitations and planned improvements are not documented.

4. Personal Portfolio
- Purpose: A responsive website presenting Vinthien's profile, skills, projects, experience, and development journey.
- Problem addressed: Provides a public presentation of his profile and work; no separate problem statement is documented.
- Target users: Portfolio visitors, including recruiters who want to learn about his background and projects.
- Technology stack: Vue 3, Vite, JavaScript, Vue Router, Pinia, Tailwind CSS 4, custom CSS, and Three.js. Playwright is used for end-to-end testing.
- Frontend architecture: Vue single-page application. Vue Router defines home and contact routes; Pinia is registered as the state-management plugin. Project descriptions and translations are held in frontend source data. The interface supports English and Khmer and dark and light themes.
- Backend architecture: Portfolio content is served by the frontend. The AI assistant uses a server-side chat endpoint: Vercel-style handler at api/chat.ts and a local Node.js development endpoint at server/dev-api.js; both delegate to server/api/chat.js.
- Database and relationships: No application database is configured for the portfolio. Assistant conversation history is sent with requests and is not stored by the application.
- Main features: Profile and contact pages, skills and project sections, bilingual content, theme preference, responsive layouts, and an AI Portfolio Assistant.
- API integration: The assistant calls the Groq Chat Completions API using model openai/gpt-oss-120b. The browser sends requests to /api/chat; the provider request is made server-side.
- Authentication and authorization: No portfolio login or user authorization is documented. The assistant endpoint is public and rate-limited.
- Security: GROQ_API_KEY is read on the server, not sent to frontend code. The endpoint validates and bounds input/history, caps completion tokens, limits requests in memory per server process, and does not store conversation history.
- Deployment and infrastructure: Portfolio demo: https://thienweb.vercel.app. Source repository: https://github.com/kunvinthien-cyber/Portfolio. The assistant rate limiter is process-local, resets on restart, and is not shared across instances.
- Development challenges: Not documented.
- Vinthien's contributions: The README identifies Kun Vinthien as the author and describes the portfolio as built with Vue 3 and Vite. More specific task-by-task contribution history is not documented here.
- Status, limitations, and future improvements: The portfolio is deployed. The assistant's in-memory rate limiter is not a global limit for multi-instance deployments; no shared rate-limit service is configured. Other planned improvements are not documented.

CONTACT
- Email: kunvinthien@gmail.com
- GitHub: https://github.com/kunvinthien-cyber
- Do not give a LinkedIn URL: source materials contain conflicting profile URLs.
- Do not invent other contact details.
`
