# Database Design - 
## Overview
The Digital Dairy Management System uses a Supabase PostgreSQL database to digitally manage daily dairy operations.
The database replaces manual notebook-based records by storing:
- Dairy owner details
- Customer information
- Daily milk records
- Monthly bills
- Payment history

# Database Tables

## 1. Owner Table
The Owner table stores login and shop details of the dairy owner.
Since this system is designed for one dairy shop, this table normally contains one owner record.

### Attributes:
- **owner_id** - Unique identifier for the owner (Primary Key)
- **name** - Owner's name
- **shop_name** - Name of the dairy shop
- **username** - Login username (unique)
- **password_hash** - Encrypted password storage
- **phone** - Owner contact number
- **created_at** - Account creation timestamp

## 2. Customer Table
The Customer table stores details of people who purchase milk from the dairy shop.
Customer records are kept even if they stop purchasing milk to maintain history.

### Attributes:
- **customer_id** - Unique customer identifier (Primary Key)
- **name** - Customer name
- **phone** - Customer contact number
- **address** - Customer address
- **milk_type** - Type of milk (cow/buffalo)
- **default_rate** - Regular milk price per litre
- **is_active** - Shows whether the customer is currently active
- **created_at** - Customer registration date
  
## 3. Milk_Record Table
The Milk_Record table stores daily milk purchase details.
Each record represents milk purchased by a customer on a specific date and shift.
The milk rate is stored with every record so previous bills remain accurate even if the price changes in future.

### Attributes:
- **record_id** - Unique milk record ID (Primary Key)
- **customer_id** - Links record with customer (Foreign Key)
- **record_date** - Date of milk purchase
- **shift** - Morning or evening milk entry
- **quantity_litres** - Amount of milk purchased
- **rate_per_litre** - Milk price at that time
- **amount** - Automatically calculated as quantity × rate
- **created_at** - Record creation time

## 4. Bill Table
The Bill table stores monthly bills generated for each customer.
One customer can have one bill for each month.
The bill keeps track of total milk quantity, total amount, paid amount, and remaining balance.

### Attributes:
- **bill_id** - Unique bill identifier (Primary Key)
- **customer_id** - Customer linked with the bill (Foreign Key)
- **bill_month** - Month of billing
- **bill_year** - Year of billing
- **total_litres** - Total milk consumed in the month
- **total_amount** - Total bill amount
- **amount_paid** - Amount already paid
- **pending_amount** - Remaining payment amount
- **status** - Payment status (Pending, Partial, Paid)
- **generated_on** - Date when bill was created

## 5. Payment Table
The Payment table stores all payments made by customers.
A single bill can have multiple payments, allowing customers to pay in parts.

### Attributes:
- **payment_id** - Unique payment identifier (Primary Key)
- **bill_id** - Related bill ID (Foreign Key)
- **customer_id** - Customer making payment (Foreign Key)
- **amount** - Payment amount
- **payment_date** - Date of payment
- **mode** - Payment method (Cash/UPI)
- **note** - Additional payment information

# Database Relationships
