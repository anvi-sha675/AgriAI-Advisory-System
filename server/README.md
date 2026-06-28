# AgriAI Advisory System - Backend

## Overview

The AgriAI Advisory System backend is a RESTful API built using Node.js and Express.js. It provides endpoints for managing crop advisory queries, including creating, retrieving, updating, deleting, and searching agricultural records.

---

## Features

* Get all crop advisory queries
* Get a single query by ID
* Create a new query
* Update an existing query
* Delete a query
* Search/filter queries
* Centralized error handling
* Environment variable support

---

## Tech Stack

* Node.js
* Express.js
* Nodemon
* Dotenv

---

## Project Structure

```text
server/
│
├── controllers/
├── routes/
├── middleware/
├── data/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## API Endpoints

| Method | Endpoint                       | Description        |
| ------ | ------------------------------ | ------------------ |
| GET    | /api/queries                   | Get all queries    |
| GET    | /api/queries/:id               | Get query by ID    |
| POST   | /api/queries                   | Create a new query |
| PATCH  | /api/queries/:id               | Update a query     |
| DELETE | /api/queries/:id               | Delete a query     |
| GET    | /api/queries/search?crop=Wheat | Search queries     |

---

## How to Run Backend Locally

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the backend folder

```bash
cd server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a `.env` file in the root of the server folder and add:

```env
PORT=5000
```

### 5. Start the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on:

```text
http://localhost:5000
```

---

## Environment Variables

Refer to `.env.example` for the required environment variables.

```env
PORT=
```

---

## Error Handling

The application includes centralized error handling middleware to return meaningful JSON responses and appropriate HTTP status codes.

---

## API Testing

All endpoints were tested using Postman/Thunder Client. The exported API collection is included in the project submission.
