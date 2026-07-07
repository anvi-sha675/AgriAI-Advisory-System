# AgriAI Advisory System — Backend

> Node.js + Express + MongoDB + Google Gemini AI + OpenWeatherMap

Full REST API for the AgriAI Advisory System. Handles authentication, AI-powered farming advisory, disease detection, crop and soil recommendations, weather data, bookmarks, notifications, government schemes, and admin management — all backed by a real MongoDB database.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Database](#database)
6. [API Reference](#api-reference)
7. [Authentication](#authentication)
8. [Security](#security)
9. [Deployment](#deployment)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js 18+ | Runtime |
| Express 4 | HTTP framework |
| MongoDB | Database |
| Mongoose 8 | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Google Gemini 1.5 Flash | AI advisory + disease detection |
| OpenWeatherMap API | Weather data |
| multer | Image file upload handling |
| helmet | HTTP security headers |
| cors | Cross-origin request handling |
| express-rate-limit | Brute-force protection |
| dotenv | Environment variable loading |
| nodemon | Auto-restart in development |

---

## Project Structure

```
agriai-backend/
│
├── config/
│   └── index.js                  # Loads and validates all environment variables
│
├── src/
│   ├── server.js                 # Entry point — connects to MongoDB, starts HTTP server
│   ├── app.js                    # Express setup — middleware, route registration, error handling
│   │
│   ├── models/                   # Mongoose schemas (MongoDB collections)
│   │   ├── User.js               # Farmer and admin accounts
│   │   ├── Chat.js               # AI conversations with embedded messages
│   │   ├── Bookmark.js           # Saved AI responses and disease results
│   │   ├── Notification.js       # Per-user alerts (weather, pest, scheme)
│   │   ├── DiseaseResult.js      # Disease detection history
│   │   └── index.js              # Barrel export for clean imports
│   │
│   ├── controllers/              # Business logic — one file per feature area
│   │   ├── authController.js     # register, login, getMe, updateProfile, changePassword
│   │   ├── chatController.js     # sendMessage, getChatHistory, getChat, deleteChat
│   │   ├── diseaseController.js  # detectDisease, getDiseaseHistory
│   │   ├── featureControllers.js # crop, soil, weather, notifications, bookmarks, schemes
│   │   └── adminController.js    # stats, user management, chat logs
│   │
│   ├── routes/                   # Express routers — map HTTP methods to controllers
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── disease.js
│   │   ├── features.js
│   │   └── admin.js
│   │
│   ├── services/                 # External API integrations
│   │   ├── geminiService.js      # Google Gemini API wrapper + structured fallbacks
│   │   └── weatherService.js     # OpenWeatherMap API wrapper + fallback
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.js               # JWT verification (protect) + role guard (restrictTo)
│   │   ├── errorHandler.js       # Global error handler + 404 handler
│   │   └── logger.js             # Dev request logger (color-coded by status code)
│   │
│   └── utils/
│       ├── db.js                 # MongoDB connection + graceful disconnect
│       ├── response.js           # sendSuccess, sendError, isValidEmail, paginate helpers
│       └── seed.js               # Database seeder (run once to load demo data)
│
├── .env                          # Your local env vars (never commit this)
├── .env.example                  # Template — copy to .env and fill in values
├── .gitignore
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB running locally **or** a MongoDB Atlas account (free tier)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values — see [Environment Variables](#environment-variables) below.

### 3. Seed the database (recommended for first run)

```bash
npm run seed
```

This creates demo users, sample chat conversations, and notifications in MongoDB. Safe to run multiple times — it clears and re-seeds each time.

### 4. Start the server

```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:5000`

**Startup output:**
```
✅  MongoDB connected: localhost
🌱  AgriAI Backend Server
   Environment : development
   Port        : 5000
   API Base    : http://localhost:5000/api

Demo credentials:
    Farmer : ramesh@example.com / Demo@1234
    Admin  : admin@agriai.in    / Admin@1234
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | HTTP port the server listens on |
| `NODE_ENV` | No | `development` | `development` or `production` |
| `MONGODB_URI` | **Yes** | — | MongoDB connection string |
| `JWT_SECRET` | **Yes** | — | Secret key for signing tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | No | `7d` | Token expiry e.g. `7d`, `24h`, `30d` |
| `GEMINI_API_KEY` | No | — | Google Gemini API key — app works without it |
| `WEATHER_API_KEY` | No | — | OpenWeatherMap API key — app works without it |
| `FRONTEND_URL` | No | `http://localhost:5173` | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | No | `900000` | Rate limit window in ms (default 15 min) |
| `RATE_LIMIT_MAX` | No | `100` | Max requests per window |

**Getting free API keys:**
- Gemini: https://aistudio.google.com/app/apikey
- OpenWeatherMap: https://openweathermap.org/api

**The server starts and all endpoints respond without Gemini and Weather keys.**
AI responses and weather use realistic fallback data until keys are provided.

---

## Database

### Overview

MongoDB is used as the primary database via Mongoose ODM. All data is organized into **5 collections**:

```
agriai (database)
├── users
├── chats
├── bookmarks
├── notifications
└── diseaseresults
```

### Collections

---

#### `users`

Stores all farmer and admin accounts.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated primary key |
| `name` | String | Full name — required |
| `email` | String | Lowercase, unique — used for login |
| `phone` | String | Required |
| `password` | String | bcrypt hashed (12 rounds) — never returned in API responses |
| `role` | String | `farmer` (default) or `admin` |
| `status` | String | `active` (default), `inactive`, or `suspended` |
| `location` | String | e.g. "Nashik, Maharashtra" |
| `preferredLanguage` | String | Default: "English" |
| `primaryCrops` | [String] | Array of crop names |
| `farmSize` | String | e.g. "4.5 acres" |
| `joinedOn` | String | ISO date YYYY-MM-DD |
| `createdAt` | Date | Auto-managed by Mongoose |
| `updatedAt` | Date | Auto-managed by Mongoose |

**Indexes:**
- `email` — unique index (enforces no duplicate accounts)

**Key behaviors:**
- Password is hashed via a `pre('save')` hook — you never hash manually
- `toSafeObject()` instance method strips the password before sending to frontend
- Suspended accounts are blocked at the JWT verification step

---

#### `chats`

Stores AI advisory conversations. Each chat has an embedded array of messages — there is no separate messages collection.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated primary key |
| `userId` | ObjectId | Reference to `users._id` |
| `title` | String | Auto-generated from the first user message (max 120 chars) |
| `messages` | [Message] | Embedded array — see message schema below |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Updated on every new message — used for sort order |

**Embedded message schema:**

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `role` | String | `user` or `assistant` |
| `content` | String | Raw message text |
| `reply` | String | Structured reply text — assistant only |
| `causes` | [String] | Possible causes — assistant only |
| `treatment` | [String] | Recommended treatment — assistant only |
| `prevention` | [String] | Prevention tips — assistant only |
| `createdAt` | Date | Auto-managed |

**Indexes:**
- `{ userId: 1, updatedAt: -1 }` — compound index for fast user-specific queries sorted by latest

**Key behaviors:**
- When `chatId` is included in a `/api/chat` POST, the message is appended to that chat
- When `chatId` is omitted, a new chat document is created
- Multi-turn context: the last 10 messages are sent to Gemini for conversational memory

---

#### `bookmarks`

Stores responses and results that a user has saved for later reference.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated primary key |
| `userId` | ObjectId | Reference to `users._id` |
| `type` | String | `chat`, `disease`, `crop`, or `soil` |
| `title` | String | Short display title |
| `summary` | String | Full text of the saved content |
| `tags` | [String] | Optional tags for categorization |
| `sourcePath` | String | Frontend route e.g. `/chat`, `/disease-detection` |
| `sourceId` | String | ID of the original item (message ID, result ID) |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

**Indexes:**
- `{ userId: 1, sourceId: 1 }` — unique sparse index — prevents saving the same item twice

---

#### `notifications`

Per-user alerts for weather, pest outbreaks, scheme updates, and system events.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated primary key |
| `userId` | ObjectId | Reference to `users._id` |
| `type` | String | `weather`, `pest`, `chat`, `scheme`, or `system` |
| `title` | String | Short notification heading |
| `message` | String | Full notification body |
| `read` | Boolean | Default `false` — updated when user views it |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

**Indexes:**
- `{ userId: 1, createdAt: -1 }` — compound index for fast user-specific queries sorted by newest

---

#### `diseaseresults`

Stores the result of every crop image analysis — even if AI analysis is unavailable (fallback results are also stored).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated primary key |
| `userId` | ObjectId | Reference to `users._id` |
| `disease` | String | Detected disease name e.g. "Late Blight" |
| `confidence` | Number | 0–100 confidence score |
| `crop` | String | Likely crop type e.g. "Potato / Tomato" |
| `severity` | String | `High`, `Moderate`, or `Low` |
| `causes` | [String] | Array of possible cause descriptions |
| `remedies` | [String] | Array of recommended remedies |
| `analysedByAI` | Boolean | `true` = real Gemini Vision; `false` = fallback model |
| `imageSize` | Number | Uploaded image size in bytes |
| `imageMimeType` | String | `image/jpeg`, `image/png`, or `image/webp` |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

**Indexes:**
- `{ userId: 1 }` — for fast user-specific history queries

---

### Entity Relationship Diagram

```
users
 │
 ├──< chats (userId)
 │      └──< messages [embedded array inside each chat document]
 │
 ├──< bookmarks (userId)
 │
 ├──< notifications (userId)
 │
 └──< diseaseresults (userId)
```

All relationships are one-to-many from `users` outward.
Messages are embedded inside chat documents — not a separate collection.

**dbdiagram.io schema:** see `agriai_schema.dbml` in the project root for the full diagram code.

---

### Connecting to MongoDB

#### Local MongoDB

```
MONGODB_URI=mongodb://localhost:27017/agriai
```

MongoDB creates the `agriai` database automatically on first write — no setup needed beyond having MongoDB installed and running.

#### MongoDB Atlas (free cloud)

1. Create free account at https://www.mongodb.com/atlas
2. Create a free M0 cluster
3. Add a database user (Database Access → Add New Database User)
4. Allow network access (Network Access → Add IP Address → 0.0.0.0/0)
5. Get connection string (Database → Connect → Drivers → Node.js)
6. Set in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/agriai
```

---

### Database Seeder

```bash
npm run seed
```

Runs `src/utils/seed.js` which:
1. Clears all existing documents from `users`, `chats`, and `notifications`
2. Creates 3 users (2 farmers, 1 admin) with hashed passwords
3. Creates 3 sample chat conversations with real message history
4. Creates 4 notifications across the demo accounts

**Safe to re-run** — always clears first, then re-seeds.

Demo credentials after seeding:

| Role | Email | Password |
|---|---|---|
| Farmer | ramesh@example.com | Demo@1234 |
| Farmer | sita@example.com | Demo@1234 |
| Admin | admin@agriai.in | Admin@1234 |

---

## API Reference

Base URL: `http://localhost:5000/api`

All responses:
```json
{ "success": true, "message": "...", "data": { ... } }
```

### Health Check
```
GET /api/health
```
No auth. Confirms server is running.

---

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login, get JWT |
| GET | `/api/auth/me` | Yes | Get own profile |
| PATCH | `/api/auth/me` | Yes | Update profile |
| PATCH | `/api/auth/change-password` | Yes | Change password |

---

### Chat

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/chat` | Yes | Send message (new or continue) |
| GET | `/api/chat` | Yes | List all conversations |
| GET | `/api/chat/:id` | Yes | Get single conversation |
| DELETE | `/api/chat/:id` | Yes | Delete conversation |
| PATCH | `/api/chat/:id/title` | Yes | Rename conversation |

---

### Disease Detection

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/disease-detection` | Yes | Upload image, get diagnosis |
| GET | `/api/disease-detection` | Yes | Get past results |

Request: `multipart/form-data` with field `image` (JPEG/PNG/WebP, max 10MB)

---

### Crop Recommendation
```
POST /api/crop-recommendation
Body: { soilType, season, location }
soilType: Loamy | Sandy | Clayey | Black | Red
```

### Soil Health Advisory
```
POST /api/soil-health
Body: { ph, nitrogen, phosphorus, potassium }
```

### Weather
```
GET /api/weather?location=Nashik,IN
```

---

### Notifications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/notifications` | Yes | List (filter: ?type=weather&unread=true) |
| PATCH | `/api/notifications/mark-all-read` | Yes | Mark all read |
| PATCH | `/api/notifications/:id/read` | Yes | Mark one read |

---

### Bookmarks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/bookmarks` | Yes | List saved |
| POST | `/api/bookmarks` | Yes | Save new |
| DELETE | `/api/bookmarks/:id` | Yes | Remove by ID |
| DELETE | `/api/bookmarks/source/:sourceId` | Yes | Remove by source |

---

### Government Schemes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/schemes` | Yes | List (filter: ?search=kisan&status=open) |
| GET | `/api/schemes/:id` | Yes | Get single scheme |

---

### Admin (role: admin only)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/stats` | Admin | Platform stats |
| GET | `/api/admin/users` | Admin | List all users |
| GET | `/api/admin/users/:id` | Admin | Get single user |
| PATCH | `/api/admin/users/:id/status` | Admin | Set active/inactive/suspended |
| DELETE | `/api/admin/users/:id` | Admin | Remove user + cascade delete data |
| GET | `/api/admin/chats` | Admin | All chat logs |

---

## Authentication

The API uses **JSON Web Tokens (JWT)**:

1. Call `POST /api/auth/login` with email + password
2. Receive a token valid for 7 days
3. Include in every protected request:
   ```
   Authorization: Bearer <your_token>
   ```

**Role-based access:**
- `farmer` — access to own data only
- `admin` — access to all data + admin routes

Suspended accounts receive `403 Forbidden` on every request.

---

## Security

| Measure | Implementation |
|---|---|
| Password hashing | bcrypt, 12 salt rounds, pre-save Mongoose hook |
| JWT signing | HS256, configurable expiry, verified on every protected route |
| Rate limiting | 100 req/15min general; 20 req/15min login; 10 req/15min register |
| Security headers | helmet (X-Frame-Options, CSP, HSTS, etc.) |
| CORS | Locked to `FRONTEND_URL` — rejects other origins |
| Input validation | All required fields validated in controllers before DB operations |
| Role enforcement | `restrictTo("admin")` middleware on all `/api/admin/*` routes |
| Cascade delete | Deleting a user removes their chats and disease results |
| Password never returned | Mongoose `select: false` on password field + `toSafeObject()` strips it |
| Error messages | Generic messages in production — no stack traces leaked |

---

## Deployment

### Environment for production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agriai
JWT_SECRET=a_very_long_random_string_generated_by_crypto
FRONTEND_URL=https://your-deployed-frontend.vercel.app
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Recommended platforms

| Platform | Notes |
|---|---|
| Railway | One-click Node.js deploy, add env vars in dashboard, auto-detects `npm start` |
| Render | Free tier available, set build command `npm install`, start command `npm start` |
| Fly.io | More control, Dockerfile optional |
| MongoDB Atlas | Free M0 cluster for database, works with any of the above |

### Start command for production
```bash
npm start
```
(runs `node src/server.js` — no nodemon in production)
