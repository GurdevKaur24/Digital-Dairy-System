# Digital Dairy Management System

## Overview

Digital Dairy Management System is a simple solution designed for local dairy shops to replace manual notebook-based record keeping.
The system helps dairy owners manage customers, daily milk entries, monthly bills, and payment tracking digitally.

## Project Links

| Part | Link | What's inside |
|---|---|---|
| 📐 Architecture | [Architecture/](https://github.com/GurdevKaur24/Digital-Dairy-System/tree/main/Architecture) | System architecture diagram, ER diagram, tech stack |
| 🗄️ Supabase | [Supabase/](https://github.com/GurdevKaur24/Digital-Dairy-System/tree/main/Supabase) | SQL schema, sample data, security rules, table design |
| ⚙️ API code | [api/](https://github.com/GurdevKaur24/Digital-Dairy-System/tree/main/api) | Vercel serverless endpoint `GET /api/customers` |
| 🖥️ Frontend | [public/](https://github.com/GurdevKaur24/Digital-Dairy-System/tree/main/public) | Customers page (HTML, CSS, JS) |
| 🌐 Live API endpoint | [digital-dairy-system.vercel.app/api/customers](https://digital-dairy-system.vercel.app/api/customers) | Returns active customers as JSON |
| 🌐 Live website | [digital-dairy-system.vercel.app](https://digital-dairy-system.vercel.app) | Customers page (deployed on Vercel) |

Background: [Problem Statement](problem_statement.md) · [Solution Overview](Solution_overview.md)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |

## Folder Structure

```
Digital-Dairy-System/
├── Architecture/     diagrams and architecture explanation
├── Supabase/         database schema, sample data, security rules
├── api/              Vercel serverless endpoints
├── public/           frontend pages
├── dev-server.js     local test server (npm run local)
├── package.json      project dependencies
└── .env.example      template for Supabase keys
```

## Run Locally

1. Set up the database. See [Supabase/README.md](Supabase/README.md).
2. Copy `.env.example` to `.env.local` and add your Supabase URL and anon key.
3. Install and start:
   ```bash
   npm install
   npm run local
   ```
4. Open http://localhost:3000
