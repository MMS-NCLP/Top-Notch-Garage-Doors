-- Reviews system schema for Top-Notch Garage Doors
-- First-party, curated, ethical review sources only

-- Raw/pending submissions (pre-moderation)
CREATE TABLE IF NOT EXISTS reviews_pending (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('form', 'contractor_upload', 'editorial', 'legacy_import', 'admin', 'post_job')),
  name TEXT NOT NULL,
  email TEXT,
  city TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  service_type TEXT CHECK (service_type IN ('repair', 'installation', 'opener', 'pressure_washing', 'screen_door', 'general')),
  review_text TEXT NOT NULL,
  contractor_name TEXT,
  job_date DATE,
  photos TEXT[] DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'stale')),
  moderation_note TEXT,
  moderated_at TIMESTAMPTZ
);

-- Approved reviews (public-facing, deduplicated, normalized)
-- This extends the existing reviews table if it exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'reviews') THEN
    CREATE TABLE reviews (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
      service_type TEXT,
      review_text TEXT NOT NULL,
      approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;

-- Add columns to reviews if they don't exist
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'form';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS contractor_name TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS job_date DATE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS import_hash TEXT UNIQUE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ DEFAULT NOW();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_service_type ON reviews(service_type);
CREATE INDEX IF NOT EXISTS idx_reviews_city ON reviews(city);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_reviews_pending_status ON reviews_pending(status);
CREATE INDEX IF NOT EXISTS idx_reviews_import_hash ON reviews(import_hash);

-- RLS policies
ALTER TABLE reviews_pending ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit pending reviews" ON reviews_pending
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only service role reads pending" ON reviews_pending
  FOR SELECT USING (auth.role() = 'service_role');

-- Import execution log
CREATE TABLE IF NOT EXISTS import_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  executed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT NOT NULL,
  reviews_processed INTEGER DEFAULT 0,
  reviews_inserted INTEGER DEFAULT 0,
  reviews_deduplicated INTEGER DEFAULT 0,
  reviews_marked_stale INTEGER DEFAULT 0,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'partial', 'failed')),
  error_message TEXT,
  duration_ms INTEGER
);

ALTER TABLE import_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role manages import log" ON import_log
  FOR ALL USING (auth.role() = 'service_role');
