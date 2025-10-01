-- Migration 3: Create favorites table for bookmarking events and places
-- Users can save their favorite events and places for quick access

CREATE TABLE favorites (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User reference (with cascade delete - remove favorites when user is deleted)
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Polymorphic reference to either events or places
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('event', 'place')),

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure a user can't favorite the same item twice
  UNIQUE(user_id, item_id, item_type)
);

-- Add indexes for common queries
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_item ON favorites(item_id, item_type);

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own favorites
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can add favorites
CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can remove their own favorites
CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);
