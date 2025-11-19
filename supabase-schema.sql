-- Supabase database schema for visitor tracking
-- Run this SQL in your Supabase SQL editor to create the necessary table

-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at);
CREATE INDEX IF NOT EXISTS idx_visits_path ON visits(path);

-- Enable Row Level Security (RLS)
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
-- Note: This uses the service role key, which bypasses RLS
-- For additional security, you can create a specific policy:
CREATE POLICY IF NOT EXISTS "Allow service role to insert visits"
  ON visits
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read (for reports)
CREATE POLICY IF NOT EXISTS "Allow service role to read visits"
  ON visits
  FOR SELECT
  TO service_role
  USING (true);

