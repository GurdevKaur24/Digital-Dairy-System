# System Architecture Description

The Digital Dairy Management System follows a three-tier architecture.

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
