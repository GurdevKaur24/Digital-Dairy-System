// GET /api/customers
// Returns every active customer from the Supabase "customer" table as JSON.
//
// On Vercel, every file inside the /api folder becomes an endpoint.
// This file is api/customers.js, so its URL is /api/customers.

import { createClient } from '@supabase/supabase-js';

// Read the Supabase details from environment variables.
// Never write these values directly in the code.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create the Supabase client once, outside the handler, so it is reused
// between requests.
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Vercel calls this function on every request to /api/customers.
// req = the incoming request, res = the response we send back.
export default async function handler(req, res) {
  // 1. Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  // 2. Stop early if the environment variables are missing
  if (!supabase) {
    console.error('SUPABASE_URL or SUPABASE_ANON_KEY is not set');
    return res.status(500).json({ success: false, error: 'Server is not configured correctly.' });
  }

  try {
    // 3. Ask Supabase for active customers, sorted by name.
    //    Same as the SQL:
    //    SELECT customer_id, name, ... FROM customer WHERE is_active = true ORDER BY name;
    const { data, error } = await supabase
      .from('customer')
      .select('customer_id, name, phone, address, milk_type, default_rate')
      .eq('is_active', true)
      .order('name', { ascending: true });

    // 4. Supabase returns an error object instead of throwing, so check it
    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ success: false, error: 'Could not fetch customers.' });
    }

    // 5. Success: send the list back as JSON
    return res.status(200).json({
      success: true,
      count: data.length,
      customers: data,
    });
  } catch (err) {
    // 6. Unexpected problems, such as a network failure
    console.error('Unexpected error:', err);
    return res.status(500).json({ success: false, error: 'Something went wrong on the server.' });
  }
}
