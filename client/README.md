# AgriAI Advisory System — Frontend

A production-quality, fully responsive React + Vite + Tailwind CSS frontend for an
AI-powered smart farming advisory platform.

**This is a frontend-only build.** There is no real backend, database, or AI model
wired up. All "AI" responses, authentication, weather, and analytics data are
mocked in `src/services/` and `src/utils/mockData.js` so every page is fully
interactive and demo-able out of the box.

## Stack

- React 18 + Vite
- Tailwind CSS (utility-first, no component libraries)
- React Router DOM (client-side routing)
- Recharts (analytics charts)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
npm run lint      # run eslint
```

## Project structure

```
src/
├── components/
│   ├── ui/          # Button, Input, Modal, Badge, Loader, EmptyState, FAQAccordion, ScrollToTop
│   ├── layout/       # Navbar, Footer, Sidebar, AdminSidebar, Topbar, Logo, PageTransition
│   └── feature/      # Hero, FeatureCard, StatsCard, WeatherCard, ChatBubble, TestimonialCard, SectionHeading
├── pages/
│   ├── auth/         # Login, Register, ForgotPassword
│   ├── admin/        # AdminDashboard, AdminUsers, AdminChats, AdminReports
│   ├── static/       # PrivacyPolicy, TermsConditions, HelpCenter
│   └── *.jsx         # Landing, Dashboard, Chat, DiseaseDetection, CropRecommendation,
│                      # SoilHealth, Weather, VoiceAssistant, Analytics, Profile, Settings,
│                      # About, Contact, NotFound
├── layouts/          # PublicLayout, AuthLayout, DashboardLayout, AdminLayout
├── context/          # ThemeContext (dark mode), AuthContext (mock auth), ToastContext
├── services/         # aiService.js — mock API layer (see below)
├── utils/            # mockData.js, helpers.js
└── App.jsx           # Route tree
```

## Connecting a real backend

The mock layer was deliberately written so the swap to a real backend touches
only two files, not the page components:

1. **`src/services/aiService.js`** — every function (`sendChatMessage`,
   `detectCropDisease`, `getCropRecommendation`, `getSoilHealthAdvisory`,
   `getWeather`, `transcribeVoice`) currently returns mock data after an
   artificial delay. Replace each function body with a real `fetch()` call to
   your Node/Express + Gemini API. Keep the same function signature and
   return shape (or update the few call-sites) and the UI keeps working.

2. **`src/context/AuthContext.jsx`** — `login`, `register`, and the stored
   `user` object are mocked with `localStorage`. Replace with real calls to
   your JWT auth endpoints and store the returned token instead of the full
   mock user object.

Suggested real endpoints to map onto, based on the original spec:

| Frontend call             | Suggested backend route                                |
| ------------------------- | ------------------------------------------------------ |
| `login()`                 | `POST /api/auth/login`                                 |
| `register()`              | `POST /api/auth/register`                              |
| `sendChatMessage()`       | `POST /api/chat`                                       |
| `detectCropDisease()`     | `POST /api/disease-detection` (multipart image upload) |
| `getCropRecommendation()` | `POST /api/crop-recommendation`                        |
| `getSoilHealthAdvisory()` | `POST /api/soil-health`                                |
| `getWeather()`            | `GET /api/weather?location=`                           |
| `transcribeVoice()`       | `POST /api/voice/transcribe`                           |

`src/utils/mockData.js` (dashboard stats, chat history, admin tables, FAQs,
testimonials) should eventually be replaced by real API responses fetched
in each page's `useEffect`, following the same pattern already used in
`Dashboard.jsx` and `Weather.jsx` for the weather widget.

## Design tokens

| Token        | Value          |
| ------------ | -------------- |
| Primary      | `#166534`      |
| Secondary    | `#22C55E`      |
| Accent       | `#0EA5E9`      |
| Background   | `#F8FAFC`      |
| Text         | `#111827`      |
| Display font | Fraunces       |
| Body font    | Inter          |
| Mono font    | JetBrains Mono |

Full token definitions live in `tailwind.config.js` and `src/index.css`.

## Notes

- Dark mode is implemented via Tailwind's `class` strategy and persisted to
  `localStorage` (`ThemeContext.jsx`).
- "Login" on the demo is mocked — any email/password combination succeeds
  and logs in as a demo farmer profile.
- Protected routes (`/dashboard`, `/chat`, `/admin`, etc.) redirect to
  `/login` if not authenticated.
