/**
 * Visitor tracking API endpoint (Vercel serverless function)
 * 
 * This endpoint tracks page visits and stores them in Supabase.
 * Deploy this as a Vercel serverless function.
 * 
 * Required environment variables:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_KEY: Your Supabase service role key (for server-side access)
 */

const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { timestamp, path } = req.body;

    // Validate input
    if (!timestamp || !path) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert visit record
    const { error } = await supabase
      .from('visits')
      .insert({
        timestamp: timestamp,
        path: path,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to record visit' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

