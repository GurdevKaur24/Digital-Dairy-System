# API (Vercel Serverless Functions)

Backend endpoints for the Digital Dairy Management System.
On Vercel, every `.js` file in this folder becomes an endpoint, so `customers.js` is served at `/api/customers`.

## Endpoints

### `GET /api/customers`

Returns all **active** customers, sorted by name.
Code: [customers.js](customers.js)

**Success (200)**

```json
{
  "success": true,
  "count": 5,
  "customers": [
    {
      "customer_id": 4,
      "name": "Anjali Verma",
      "phone": "9814000004",
      "address": "Flat 3B, BRS Nagar, Ludhiana",
      "milk_type": "cow",
      "default_rate": 60
    }
  ]
}
```

**Errors**

| Status | When | Body |
|---|---|---|
| 405 | A method other than GET was used | `{ "success": false, "error": "Method not allowed. Use GET." }` |
| 500 | Environment variables are missing | `{ "success": false, "error": "Server is not configured correctly." }` |
| 500 | The Supabase query failed | `{ "success": false, "error": "Could not fetch customers." }` |

## Environment variables

| Name | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |

Locally, put these in `.env.local` (see [.env.example](../.env.example)). On Vercel, add them under **Project → Settings → Environment Variables**.

## Run locally

```bash
npm install
npm run local
```

Then open:
- http://localhost:3000: the customers page (from `public/`)
- http://localhost:3000/api/customers: the raw JSON

## Tech

- Node.js on Vercel Serverless Functions
- [`@supabase/supabase-js`](https://github.com/supabase/supabase-js) to query the database
