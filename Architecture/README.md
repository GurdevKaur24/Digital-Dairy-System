# System Architecture Description

The Digital Dairy Management System follows a three-tier architecture.

## Architecture Diagram

```mermaid
flowchart TD
  O[👤 Dairy Owner] --> F
  C[👤 Customer - view only, optional] -.-> F
  F["🖥️ Frontend<br/>HTML · CSS · JavaScript<br/>(public/ folder)"]
  B["⚙️ Backend<br/>Vercel Serverless Functions · Node.js<br/>(api/ folder)"]
  D[("🗄️ Database<br/>Supabase · PostgreSQL")]
  F -- "HTTP request e.g. GET /api/customers" --> B
  B -- "JSON response" --> F
  B -- "Supabase JS client query" --> D
  D -- "rows of data" --> B
```

## Database (ER) Diagram

```mermaid
erDiagram
  CUSTOMER ||--o{ MILK_RECORD : buys
  CUSTOMER ||--o{ BILL : receives
  BILL ||--o{ PAYMENT : "paid by"
  OWNER {
    bigint owner_id PK
    text name
    text shop_name
    text username
    text password_hash
  }
  CUSTOMER {
    bigint customer_id PK
    text name
    text phone
    text milk_type
    numeric default_rate
    boolean is_active
  }
  MILK_RECORD {
    bigint record_id PK
    bigint customer_id FK
    date record_date
    text shift
    numeric quantity_litres
    numeric rate_per_litre
    numeric amount
  }
  BILL {
    bigint bill_id PK
    bigint customer_id FK
    smallint bill_month
    smallint bill_year
    numeric total_amount
    numeric amount_paid
    numeric pending_amount
    text status
  }
  PAYMENT {
    bigint payment_id PK
    bigint bill_id FK
    bigint customer_id FK
    numeric amount
    date payment_date
    text mode
  }
```

> The owner table only stores the shop owner's login (single-shop system), so it has no links to the other tables.
> A detailed visual version with explanations is in [dairy-architecture.html](dairy-architecture.html). Download it and open it in a browser.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| Database access | `@supabase/supabase-js` |

## 1. Frontend Layer
The frontend is responsible for user interaction.

Functions:
- Owner dashboard
- Customer management forms
- Daily milk entry page
- Billing and payment views
It collects user input and sends requests to the backend.

## 2. Backend Layer
The backend handles the main business logic.

Responsibilities:
- Process user requests
- Validate entered data
- Calculate milk amount
- Generate monthly bills
- Manage authentication

## 3. Database Layer
The database stores all system information.

Main tables:

### Owner
Stores dairy owner details.

### Customer
Stores customer information.

### Milk_Record
Stores daily milk purchase details.

### Bill
Stores monthly generated bills.

### Payment
Stores payment transactions.

## Data Flow
Dairy Owner → Frontend → Backend → Database
The owner enters daily milk details through the frontend. The backend processes the request and stores the information securely in the database.
