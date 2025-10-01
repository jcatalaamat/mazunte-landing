-- Migration 2: Create places table for retreat centers, wellness, restaurants, activities, and community spaces
-- This table stores all the conscious travel destinations in Mazunte

CREATE TABLE places (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic information
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('retreat', 'wellness', 'restaurant', 'activity', 'community')),
  category TEXT NOT NULL, -- More specific subcategory (e.g., 'Yoga Studio', 'Vegan Restaurant')
  description TEXT NOT NULL,

  -- Location details
  location_name TEXT NOT NULL,
  lat NUMERIC(10, 8) NOT NULL,
  lng NUMERIC(10, 8) NOT NULL,

  -- Operating information
  hours TEXT, -- e.g., "Mon-Fri 9am-5pm" or "By appointment"
  price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),

  -- Contact information
  contact_phone TEXT,
  contact_whatsapp TEXT,
  contact_instagram TEXT,
  contact_email TEXT,
  website_url TEXT,

  -- Media and tagging
  images TEXT[], -- Array of image URLs
  tags TEXT[], -- e.g., ['vegan', 'plastic-free', 'solar-powered']

  -- Special flags
  eco_conscious BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false, -- Premium listings
  verified BOOLEAN DEFAULT false, -- Admin-verified places

  -- Ownership and timestamps
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for common queries
CREATE INDEX idx_places_type ON places(type);
CREATE INDEX idx_places_category ON places(category);
CREATE INDEX idx_places_location ON places(lat, lng);
CREATE INDEX idx_places_created_by ON places(created_by);
CREATE INDEX idx_places_tags ON places USING gin(tags); -- GIN index for array searching
CREATE INDEX idx_places_eco_conscious ON places(eco_conscious);

-- Enable Row Level Security
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public read access (anyone can view places)
CREATE POLICY "Anyone can view places"
  ON places FOR SELECT
  USING (true);

-- RLS Policy: Authenticated users can create places
CREATE POLICY "Authenticated users can create places"
  ON places FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policy: Users can update their own places
CREATE POLICY "Users can update their own places"
  ON places FOR UPDATE
  USING (auth.uid() = created_by);

-- RLS Policy: Users can delete their own places
CREATE POLICY "Users can delete their own places"
  ON places FOR DELETE
  USING (auth.uid() = created_by);
