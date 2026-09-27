-- Run this in Supabase → SQL Editor AFTER dairy_schema.sql.
--
-- Why: the anon key is not a secret, and with RLS (row-level security)
-- turned OFF, anyone who has it can read AND change every table,
-- including owner.password_hash.
-- This script turns RLS on for every table. It then allows exactly one
-- thing for the anon key: reading customers.

alter table owner       enable row level security;
alter table customer    enable row level security;
alter table milk_record enable row level security;
alter table bill        enable row level security;
alter table payment     enable row level security;

-- Allow the anon key to READ the customer table (needed for GET /api/customers)
create policy "anon can read customers"
  on customer for select
  to anon
  using (true);

-- Every other table stays locked for now. Add a policy each time you
-- build a new endpoint that needs it.
